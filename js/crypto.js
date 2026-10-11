    // ── SZYFROWANIE DANYCH NA URZĄDZENIU ─────────────────────────────────────────
    // Dane są szyfrowane w przeglądarce (AES-GCM 256) ZANIM trafią do bazy. W bazie, w historii zmian i w kopiach leży szyfr.
    // Klucz danych (DEK) jest losowy; zapisany w bazie tylko w postaci "zapakowanej" dwoma kluczami:
    //   1) hasło szyfrowania Patryka (PBKDF2-SHA256, 600 000 iteracji) i 2) klucz awaryjny (losowy, 160 bitów, pokazany raz).
    // Bez hasła i bez klucza awaryjnego danych nie odzyska nikt (ani Supabase, ani autor apki).
    // Stan: "checking" (jeszcze nie wiemy) | "off" (brak szyfrowania) | "locked" (jest szyfrowanie, brak klucza na tym urządzeniu)
    //       | "on" (klucz dostępny) | "error" (nie udało się ustalić — nie zapisujemy niczego).
    const FZ_DATA_KEYS=["fizjo-visits","fizjo-patients","fizjo-rentals","fizjo-finances","fizjo-stock","fizjo-nfz","fizjo-todos","fizjo-events","fizjo-settings","fizjo-budget","fizjo-machines","fizjo-wealth"];
    const FZ_SNAP_KEYS=[0,1,2,3,4,5,6].map(i=>"fizjo-backup-"+i);
    const FZ_META_KEY="fizjo-crypto";
    const FZ_PBKDF2_ITER=600000;
    const FZ_CRYPTO={state:"checking",dek:null,meta:null};

    const _cte=new TextEncoder(),_ctd=new TextDecoder();
    const _crand=n=>crypto.getRandomValues(new Uint8Array(n));
    function _b64e(u8){let s="";const CH=0x8000;for(let i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
    function _b64d(str){const s=atob(str);const u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
    const _cnorm=s=>String(s||"").normalize("NFKC");
    const _B32="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    function _b32(u8){let bits=0,val=0,out="";for(const b of u8){val=((val<<8)|b)>>>0;bits+=8;while(bits>=5){out+=_B32[(val>>>(bits-5))&31];bits-=5;}val&=(1<<bits)-1;}if(bits>0)out+=_B32[(val<<(5-bits))&31];return out;}
    const czNewRecovery=()=>_b32(_crand(20)).match(/.{1,4}/g).join("-");   // 32 znaki w 8 grupach

    async function _kekFromPass(pass,salt,iter){
      const base=await crypto.subtle.importKey("raw",_cte.encode(_cnorm(pass)),"PBKDF2",false,["deriveKey"]);
      return crypto.subtle.deriveKey({name:"PBKDF2",hash:"SHA-256",salt,iterations:iter},base,{name:"AES-GCM",length:256},false,["wrapKey","unwrapKey"]);
    }
    async function _kekFromRecovery(rec){
      const clean=_cnorm(rec).toUpperCase().replace(/[^A-Z2-7]/g,"");
      const h=await crypto.subtle.digest("SHA-256",_cte.encode("fizjo-recovery:"+clean));
      return crypto.subtle.importKey("raw",h,{name:"AES-GCM"},false,["wrapKey","unwrapKey"]);
    }
    async function _cwrap(dek,kek){const iv=_crand(12);const w=await crypto.subtle.wrapKey("raw",dek,kek,{name:"AES-GCM",iv});return {iv:_b64e(iv),ct:_b64e(new Uint8Array(w))};}
    function _cunwrap(env,kek,extractable){return crypto.subtle.unwrapKey("raw",_b64d(env.ct),kek,{name:"AES-GCM",iv:_b64d(env.iv)},{name:"AES-GCM"},!!extractable,["encrypt","decrypt"]);}

    // szyfrowanie jednej wartości; nazwa klucza jest "dołączonym dowodem", więc nie da się podmienić wierszy między sobą
    async function czEncrypt(key,value,dek){
      const iv=_crand(12);
      const ct=await crypto.subtle.encrypt({name:"AES-GCM",iv,additionalData:_cte.encode(key)},dek||FZ_CRYPTO.dek,_cte.encode(JSON.stringify(value)));
      return {v:1,iv:_b64e(iv),ct:_b64e(new Uint8Array(ct))};
    }
    async function czDecrypt(key,env,dek){
      const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:_b64d(env.iv),additionalData:_cte.encode(key)},dek||FZ_CRYPTO.dek,_b64d(env.ct));
      return JSON.parse(_ctd.decode(pt));
    }

    // nowe szyfrowanie: zwraca meta (do zapisania w bazie), klucz roboczy i klucz awaryjny (pokazać użytkownikowi raz)
    async function czCreateMeta(passphrase){
      const dekX=await crypto.subtle.generateKey({name:"AES-GCM",length:256},true,["encrypt","decrypt"]);
      const salt=_crand(16);
      const kek=await _kekFromPass(passphrase,salt,FZ_PBKDF2_ITER);
      const recovery=czNewRecovery();
      const rk=await _kekFromRecovery(recovery);
      const wrapPass=await _cwrap(dekX,kek),wrapRec=await _cwrap(dekX,rk);
      const dek=await _cunwrap(wrapPass,kek,false);          // klucz roboczy jest nieeksportowalny
      const check=await czEncrypt("fizjo-crypto-check","ok",dek);
      const meta={v:1,id:_b64e(_crand(9)),kdf:{alg:"PBKDF2-SHA256",iter:FZ_PBKDF2_ITER,salt:_b64e(salt)},wrapPass,wrapRec,check,createdAt:new Date().toISOString()};
      return {meta,dek,recovery};
    }
    async function czVerifyDek(meta,dek){try{return (await czDecrypt("fizjo-crypto-check",meta.check,dek))==="ok";}catch{return false;}}
    // odblokowanie hasłem albo kluczem awaryjnym; rzuca wyjątek przy złym haśle/kluczu
    async function czDekFromPass(meta,pass,extractable){return _cunwrap(meta.wrapPass,await _kekFromPass(pass,_b64d(meta.kdf.salt),meta.kdf.iter),extractable);}
    async function czDekFromRecovery(meta,rec,extractable){return _cunwrap(meta.wrapRec,await _kekFromRecovery(rec),extractable);}

    // klucz roboczy zapamiętany na tym urządzeniu (nieeksportowalny obiekt w IndexedDB) — bez logowania do bazy jest bezużyteczny
    function _cidb(){return new Promise((res,rej)=>{const r=indexedDB.open("fizjo-sec",1);r.onupgradeneeded=()=>r.result.createObjectStore("keys");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
    async function czSaveKey(id,dek){try{const db=await _cidb();await new Promise((res,rej)=>{const tx=db.transaction("keys","readwrite");tx.objectStore("keys").put(dek,id);tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});db.close();return true;}catch{return false;}}
    async function czLoadKey(id){try{const db=await _cidb();const v=await new Promise((res,rej)=>{const tx=db.transaction("keys","readonly");const q=tx.objectStore("keys").get(id);q.onsuccess=()=>res(q.result||null);q.onerror=()=>rej(q.error);});db.close();return v;}catch{return null;}}
    async function czForgetKey(){try{const db=await _cidb();await new Promise((res,rej)=>{const tx=db.transaction("keys","readwrite");tx.objectStore("keys").clear();tx.oncomplete=res;tx.onerror=()=>rej(tx.error);});db.close();}catch{}}

    // ── meta w bazie (wiersz "fizjo-crypto": tylko zapakowane klucze, nigdy klucz jawny) ──
    async function czFetchMeta(){
      try{
        const r=await apiFetch(`${SUPA_URL}/rest/v1/app_data?key=eq.${FZ_META_KEY}&select=value`,()=>({headers:getHeaders()}));
        if(!r.ok)return {meta:null,error:true};
        const d=await r.json();
        if(!Array.isArray(d))return {meta:null,error:true};
        const v=d[0]?d[0].value:null;
        return {meta:(v&&!v.disabled&&v.wrapPass)?v:null,error:false};
      }catch{return {meta:null,error:true};}
    }
    async function czWriteMeta(meta){
      try{
        const r=await apiFetch(`${SUPA_URL}/rest/v1/app_data`,()=>({method:"POST",headers:{...getHeaders(),"Prefer":"resolution=merge-duplicates"},body:JSON.stringify({key:FZ_META_KEY,value:meta})}));
        return r.ok;
      }catch{return false;}
    }
    // surowy odczyt wiersza (do weryfikacji i kontroli): {row} albo {error}
    async function czRawRow(key){
      try{
        const r=await apiFetch(`${SUPA_URL}/rest/v1/app_data?key=eq.${key}&select=value`,()=>({headers:getHeaders()}));
        if(!r.ok)return {error:true};
        const d=await r.json();
        if(!Array.isArray(d))return {error:true};
        return {row:d[0]?d[0].value:null};
      }catch{return {error:true};}
    }

    // ustalenie stanu po zalogowaniu
    async function czInit(){
      FZ_CRYPTO.state="checking";
      const {meta,error}=await czFetchMeta();
      if(error){FZ_CRYPTO.state="error";return "error";}
      if(!meta){FZ_CRYPTO.meta=null;FZ_CRYPTO.dek=null;FZ_CRYPTO.state="off";return "off";}
      FZ_CRYPTO.meta=meta;
      const dek=await czLoadKey(meta.id);
      if(dek&&await czVerifyDek(meta,dek)){FZ_CRYPTO.dek=dek;FZ_CRYPTO.state="on";return "on";}
      FZ_CRYPTO.dek=null;FZ_CRYPTO.state="locked";return "locked";
    }
    // odblokowanie na tym urządzeniu; viaRecovery=true: argument to klucz awaryjny. Zwraca true/false.
    async function czUnlock(secret,{viaRecovery=false,remember=true}={}){
      const meta=FZ_CRYPTO.meta;
      if(!meta)return false;
      try{
        const dek=viaRecovery?await czDekFromRecovery(meta,secret,false):await czDekFromPass(meta,secret,false);
        if(!(await czVerifyDek(meta,dek)))return false;
        FZ_CRYPTO.dek=dek;FZ_CRYPTO.state="on";
        if(remember)await czSaveKey(meta.id,dek);
        return true;
      }catch{return false;}
    }

    // ── włączenie: getAll() zwraca {klucz: wartość} z pamięci aplikacji (aktualny stan wszystkich zbiorów) ──
    async function czEnable(passphrase,getAll,onProgress,{remember=true,prepared=null}={}){
      if(FZ_CRYPTO.state!=="off")throw new Error("Szyfrowanie jest już włączone albo nie wiadomo, jaki jest jego stan.");
      const created=prepared||await czCreateMeta(passphrase);
      const all=getAll();
      const keys=[...FZ_DATA_KEYS,...FZ_SNAP_KEYS].filter(k=>all[k]!==undefined&&all[k]!==null);
      const done=[];
      const rollback=async()=>{
        FZ_CRYPTO.state="off";
        for(const k of done){try{await dbSet(k,all[k]);}catch{}}
        await czWriteMeta({v:1,disabled:true});
        FZ_CRYPTO.meta=null;FZ_CRYPTO.dek=null;
      };
      FZ_CRYPTO.meta=created.meta;FZ_CRYPTO.dek=created.dek;
      // 1) znacznik w bazie: od teraz inne urządzenia wiedzą, że dane są szyfrowane
      if(!(await czWriteMeta(created.meta))){FZ_CRYPTO.meta=null;FZ_CRYPTO.dek=null;throw new Error("Nie udało się zapisać ustawień szyfrowania w bazie. Nic nie zostało zmienione.");}
      FZ_CRYPTO.state="on";
      // 2) każdy zbiór: zapis zaszyfrowany + odczyt kontrolny (musi dać dokładnie te same dane)
      for(let i=0;i<keys.length;i++){
        const k=keys[i];
        if(onProgress)onProgress(i,keys.length,k);
        const ok=await dbSet(k,all[k]);
        let verified=false;
        if(ok){
          const raw=await czRawRow(k);
          if(raw.row&&raw.row._e){
            try{verified=JSON.stringify(await czDecrypt(k,raw.row._e))===JSON.stringify(all[k]);}catch{}
          }
        }
        if(!verified){await rollback();throw new Error("Kontrola zbioru „"+k+"” nie powiodła się. Wszystko zostało przywrócone do stanu sprzed szyfrowania.");}
        done.push(k);
      }
      if(remember)await czSaveKey(created.meta.id,created.dek);
      if(onProgress)onProgress(keys.length,keys.length,"");
      return {recovery:created.recovery,count:keys.length};
    }

    // ── wyłączenie: wszystkie zbiory wracają do jawnego zapisu, meta jest wyłączone ──
    async function czDisable(getAll,onProgress){
      if(FZ_CRYPTO.state!=="on"||!FZ_CRYPTO.dek)throw new Error("Najpierw odblokuj dane.");
      const all=getAll();
      const keys=[...FZ_DATA_KEYS,...FZ_SNAP_KEYS].filter(k=>all[k]!==undefined&&all[k]!==null);
      FZ_CRYPTO.state="off";                       // zapisy jawne; klucz zostaje w pamięci do odczytu
      for(let i=0;i<keys.length;i++){
        const k=keys[i];
        if(onProgress)onProgress(i,keys.length,k);
        const ok=await dbSet(k,all[k]);
        let verified=false;
        if(ok){const raw=await czRawRow(k);verified=!!(raw.row&&raw.row._d!==undefined&&JSON.stringify(raw.row._d)===JSON.stringify(all[k]));}
        if(!verified){FZ_CRYPTO.state="on";throw new Error("Nie udało się zapisać zbioru „"+k+"” bez szyfrowania. Szyfrowanie zostaje włączone, nic nie zostało utracone.");}
      }
      await czWriteMeta({v:1,disabled:true});
      await czForgetKey();
      FZ_CRYPTO.meta=null;FZ_CRYPTO.dek=null;
      return true;
    }

    // ── zmiana hasła: stare hasło albo klucz awaryjny + nowe hasło; dane nie są szyfrowane ponownie ──
    async function czChangePass(oldSecret,newPass,{viaRecovery=false}={}){
      const meta=FZ_CRYPTO.meta;
      if(!meta)throw new Error("Szyfrowanie nie jest włączone.");
      const dekX=viaRecovery?await czDekFromRecovery(meta,oldSecret,true):await czDekFromPass(meta,oldSecret,true);   // rzuca przy złym haśle/kluczu
      const salt=_crand(16);
      const kek=await _kekFromPass(newPass,salt,FZ_PBKDF2_ITER);
      const wrapPass=await _cwrap(dekX,kek);
      const nm={...meta,kdf:{...meta.kdf,iter:FZ_PBKDF2_ITER,salt:_b64e(salt)},wrapPass};
      if(!(await czWriteMeta(nm)))throw new Error("Nie udało się zapisać nowego hasła.");
      FZ_CRYPTO.meta=nm;
      const dek=await _cunwrap(wrapPass,kek,false);
      FZ_CRYPTO.dek=dek;FZ_CRYPTO.state="on";
      await czSaveKey(nm.id,dek);
      return true;
    }

    // ── kontrola: ile zbiorów jest naprawdę zaszyfrowanych w bazie ──
    async function czAudit(){
      const out={enc:[],plain:[],missing:[],unreadable:[]};
      for(const k of [...FZ_DATA_KEYS,...FZ_SNAP_KEYS]){
        const r=await czRawRow(k);
        if(r.error)out.unreadable.push(k);
        else if(!r.row)out.missing.push(k);
        else if(r.row._e)out.enc.push(k);
        else out.plain.push(k);
      }
      return out;
    }

    // ── kopie dzienne w bazie: 7 miejsc (dzień tygodnia), nadpisywane co tydzień ──
    async function czSlotTs(slot){
      try{
        const r=await apiFetch(`${SUPA_URL}/rest/v1/app_data?key=eq.fizjo-backup-${slot}&select=ts:value->>_ts`,()=>({headers:getHeaders()}));
        if(!r.ok)return null;
        const d=await r.json();
        if(!Array.isArray(d))return null;
        if(!d[0])return 0;
        return +d[0].ts||0;
      }catch{return null;}
    }
    async function czListSnapshots(){
      const out=[];
      for(let i=0;i<7;i++){
        const {data,error}=await dbGet("fizjo-backup-"+i);
        if(error){out.push({slot:i,error:true});continue;}
        if(!data||!data.data){continue;}
        const c=k=>Array.isArray(data.data[k])?data.data[k].length:null;
        out.push({slot:i,savedAt:data.savedAt,counts:{visits:c("visits"),patients:c("patients"),rentals:c("rentals"),finances:c("finances")},data:data.data});
      }
      return out.sort((a,b)=>String(b.savedAt||"").localeCompare(String(a.savedAt||"")));
    }
