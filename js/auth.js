    function PasswordResetScreen() {
      const dk=useContext(DarkCtx);
      const [pwd,setPwd]=React.useState("");
      const [pwd2,setPwd2]=React.useState("");
      const [status,setStatus]=React.useState(null);
      const [error,setError]=React.useState("");
      const handleSave=async()=>{
        if(pwd.length<6){setError("Hasło musi mieć min. 6 znaków");return;}
        if(pwd!==pwd2){setError("Hasła nie są identyczne");return;}
        setStatus("saving");setError("");
        try{
          const r=await fetch(`${SUPA_URL}/auth/v1/user`,{
            method:"PUT",
            headers:{"Content-Type":"application/json","apikey":SUPA_ANON,"Authorization":`Bearer ${_supaToken}`},
            body:JSON.stringify({password:pwd})
          });
          if(r.ok){setStatus("done");}
          else{const d=await r.json();setError(d.message||"Błąd");setStatus(null);}
        }catch{setError("Błąd połączenia");setStatus(null);}
      };
      const inputStyle={width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${error?"#E05C5C":dk?"#2A3A56":"#D9E2F0"}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:16,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10};
      return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:dk?"#0E141F":"#EFF3FA",padding:24}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#3E6FB0",marginBottom:8}}>ZubrzyckiFizjo</div>
        <div style={{fontSize:14,color:"#7A8FA6",marginBottom:32}}>Ustaw nowe hasło</div>
        <div style={{background:dk?"#18202F":"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:320,boxShadow:dk?"0 4px 24px rgba(0,0,0,.3)":"0 4px 24px rgba(16,40,40,.08)"}}>
          {status==="done"
            ? <div style={{textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:12}}>✅</div>
                <div style={{fontWeight:700,fontSize:16,color:dk?"#E8F5F5":"#1C2B3A",marginBottom:8}}>Hasło zmienione!</div>
                <button onClick={()=>{_supaToken=null;sessionStorage.removeItem("fizjo-token");sessionStorage.removeItem("fizjo-refresh");window.location.href=window.location.pathname;}} style={{width:"100%",padding:"13px",borderRadius:12,background:"#3E6FB0",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Zaloguj się</button>
              </div>
            : <>
                <input type="password" value={pwd} onChange={e=>{setPwd(e.target.value);setError("");}} placeholder="Nowe hasło" style={inputStyle}/>
                <input type="password" value={pwd2} onChange={e=>{setPwd2(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSave()} placeholder="Powtórz hasło" style={{...inputStyle,marginBottom:error?6:16}}/>
                {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
                <button onClick={handleSave} disabled={status==="saving"||!pwd||!pwd2} style={{width:"100%",padding:"13px",borderRadius:12,background:"#3E6FB0",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:status==="saving"?"wait":"pointer",fontFamily:"inherit",opacity:status==="saving"?0.7:1}}>
                  {status==="saving"?"Zapisywanie...":"Zapisz hasło"}
                </button>
              </>
          }
        </div>
      </div>;
    }

    function LockScreen({onUnlock}) {
      const dk=useContext(DarkCtx);
      const [email,setEmail]=React.useState("");
      const [pwd,setPwd]=React.useState("");
      const [error,setError]=React.useState("");
      const [loading,setLoading]=React.useState(false);
      const check=async()=>{
        if(!email||!pwd)return;
        setLoading(true);setError("");
        const res=await supaSignIn(email,pwd);
        setLoading(false);
        if(res.ok){onUnlock();}
        else{setError(res.error);setPwd("");}
      };
      const inputStyle={width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${error?"#E05C5C":dk?"#2A3A56":"#D9E2F0"}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:16,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10};
      return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:dk?"#0E141F":"#EFF3FA",padding:24}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#3E6FB0",marginBottom:8}}>ZubrzyckiFizjo</div>
        <div style={{fontSize:14,color:"#7A8FA6",marginBottom:32}}>Zaloguj się aby kontynuować</div>
        <div style={{background:dk?"#18202F":"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:320,boxShadow:dk?"0 4px 24px rgba(0,0,0,.3)":"0 4px 24px rgba(16,40,40,.08)"}}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&check()}
            autoFocus placeholder="Email" style={inputStyle}/>
          <input type="password" value={pwd} onChange={e=>{setPwd(e.target.value);setError("");}}
            onKeyDown={e=>e.key==="Enter"&&check()}
            placeholder="Hasło" style={inputStyle}/>
          {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
          <button onClick={check} disabled={loading||!email||!pwd}
            style={{width:"100%",padding:"13px",borderRadius:12,background:"#3E6FB0",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:loading?"wait":"pointer",fontFamily:"inherit",opacity:loading?0.7:1}}>
            {loading?"Logowanie...":"Zaloguj się"}
          </button>
        </div>
      </div>;
    }

    function CryptoUnlockScreen({onDone}) {
      const dk=useContext(DarkCtx);
      const [mode,setMode]=React.useState("pass");      // pass | recovery | newpass
      const [secret,setSecret]=React.useState("");
      const [np1,setNp1]=React.useState("");
      const [np2,setNp2]=React.useState("");
      const [remember,setRemember]=React.useState(true);
      const [error,setError]=React.useState("");
      const [busy,setBusy]=React.useState(false);
      const inputStyle={width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${error?"#E05C5C":dk?"#2A3A56":"#D9E2F0"}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:16,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10,outline:"none"};
      const btn={width:"100%",padding:"13px",borderRadius:12,background:"#3E6FB0",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:busy?"wait":"pointer",fontFamily:"inherit",opacity:busy?0.7:1};
      const link={background:"none",border:"none",color:"#3E6FB0",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginTop:12,padding:0};
      const unlockPass=async()=>{
        if(!secret)return;
        setBusy(true);setError("");
        const ok=await czUnlock(secret,{remember});
        setBusy(false);
        if(ok)onDone();else{setError("Nieprawidłowe hasło szyfrowania.");setSecret("");}
      };
      const checkRecovery=async()=>{
        if(!secret)return;
        setBusy(true);setError("");
        try{await czDekFromRecovery(FZ_CRYPTO.meta,secret,false);setBusy(false);setMode("newpass");}
        catch{setBusy(false);setError("Nieprawidłowy klucz awaryjny.");}
      };
      const setNewPass=async()=>{
        if(np1.length<12){setError("Nowe hasło musi mieć co najmniej 12 znaków.");return;}
        if(np1!==np2){setError("Hasła nie są identyczne.");return;}
        setBusy(true);setError("");
        try{await czChangePass(secret,np1,{viaRecovery:true});setBusy(false);onDone();}
        catch(e){setBusy(false);setError("Nie udało się ustawić nowego hasła: "+(e.message||"błąd"));}
      };
      return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:dk?"#0E141F":"#EFF3FA",padding:24}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#3E6FB0",marginBottom:8}}>ZubrzyckiFizjo</div>
        <div style={{fontSize:14,color:"#7A8FA6",marginBottom:24,textAlign:"center",maxWidth:300}}>
          {mode==="newpass"?"Klucz awaryjny przyjęty. Ustaw nowe hasło szyfrowania.":"Dane są zaszyfrowane. Wpisz hasło szyfrowania, żeby je odblokować."}
        </div>
        <div style={{background:dk?"#18202F":"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:320,boxShadow:dk?"0 4px 24px rgba(0,0,0,.3)":"0 4px 24px rgba(16,40,40,.08)"}}>
          {mode==="pass"&&<>
            <input type="password" value={secret} autoFocus onChange={e=>{setSecret(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&unlockPass()} placeholder="Hasło szyfrowania" style={inputStyle}/>
            <label style={{display:"flex",gap:8,alignItems:"center",fontSize:13,color:dk?"#C8E8E8":"#1C2B3A",marginBottom:12}}>
              <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Zapamiętaj na tym urządzeniu
            </label>
            {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
            <button onClick={unlockPass} disabled={busy||!secret} style={btn}>{busy?"Odblokowuję…":"Odblokuj"}</button>
            <div style={{textAlign:"center"}}><button style={link} onClick={()=>{setMode("recovery");setSecret("");setError("");}}>Nie pamiętam hasła, mam klucz awaryjny</button></div>
          </>}
          {mode==="recovery"&&<>
            <input type="text" value={secret} autoFocus onChange={e=>{setSecret(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&checkRecovery()} placeholder="Klucz awaryjny (XXXX-XXXX-…)" style={inputStyle}/>
            {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
            <button onClick={checkRecovery} disabled={busy||!secret} style={btn}>{busy?"Sprawdzam…":"Dalej"}</button>
            <div style={{textAlign:"center"}}><button style={link} onClick={()=>{setMode("pass");setSecret("");setError("");}}>Wróć</button></div>
          </>}
          {mode==="newpass"&&<>
            <input type="password" value={np1} autoFocus onChange={e=>{setNp1(e.target.value);setError("");}} placeholder="Nowe hasło (min. 12 znaków)" style={inputStyle}/>
            <input type="password" value={np2} onChange={e=>{setNp2(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&setNewPass()} placeholder="Powtórz nowe hasło" style={inputStyle}/>
            {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
            <button onClick={setNewPass} disabled={busy||!np1||!np2} style={btn}>{busy?"Zapisuję…":"Ustaw hasło i odblokuj"}</button>
          </>}
        </div>
        <button style={{...link,marginTop:20}} onClick={()=>{supaSignOut();window.location.reload();}}>Wyloguj się</button>
      </div>;
    }

    function AppWrapper() {
      const [unlocked,setUnlocked]=React.useState(false);
      const [authChecked,setAuthChecked]=React.useState(false);
      const [isRecovery,setIsRecovery]=React.useState(false);

      React.useEffect(()=>{
        const hash=window.location.hash;
        if(hash&&hash.includes("type=recovery")&&hash.includes("access_token=")){
          try{
            const params=new URLSearchParams(hash.slice(1));
            const token=params.get("access_token");
            if(token){_supaToken=token;setIsRecovery(true);setAuthChecked(true);return;}
          }catch{}
        }
        const t=sessionStorage.getItem("fizjo-token");
        if(t){
          // Weryfikuj token przez testowe zapytanie
          _supaToken=t;
          fetch(`${SUPA_URL}/rest/v1/app_data?key=eq.fizjo-settings&select=key`,
            {headers:{"apikey":SUPA_ANON,"Authorization":`Bearer ${t}`}})
          .then(r=>{
            if(r.status===200||r.status===201){
              setUnlocked(true);setAuthChecked(true);
            } else {
              // Token wygasł — spróbuj refresh
              supaRefresh().then(ok=>{
                if(ok){setUnlocked(true);}
                else{sessionStorage.removeItem("fizjo-token");sessionStorage.removeItem("fizjo-refresh");}
                setAuthChecked(true);
              });
            }
          }).catch(()=>{setAuthChecked(true);});
        } else {
          setAuthChecked(true);
        }
      },[]);

      // Szyfrowanie: po zalogowaniu ustalamy, czy dane są zaszyfrowane; dopóki to nie jest jasne, niczego nie wczytujemy ani nie zapisujemy
      const [cryptoState,setCryptoState]=useState("checking");
      const [cryptoTick,setCryptoTick]=useState(0);
      const cryptoFails=React.useRef(0);
      React.useEffect(()=>{
        if(!unlocked)return;
        let dead=false,timer=null;
        czInit().then(st=>{
          if(dead)return;
          if(st==="error"){
            // 3 nieudane próby: nie blokujemy apki (zapisy i tak ruszą dopiero po poprawnym wczytaniu danych, a zaszyfrowany wiersz bez klucza się nie wczyta)
            if(++cryptoFails.current>=3){FZ_CRYPTO.state="off";setCryptoState("off");return;}
            timer=setTimeout(()=>setCryptoTick(n=>n+1),3000);
            return;
          }
          cryptoFails.current=0;
          setCryptoState(st);
        });
        return()=>{dead=true;clearTimeout(timer);};
      },[unlocked,cryptoTick]);
      React.useEffect(()=>{
        const h=()=>{setCryptoState("checking");setCryptoTick(n=>n+1);};
        window.addEventListener("fizjo-crypto-changed",h);
        return()=>window.removeEventListener("fizjo-crypto-changed",h);
      },[]);
      const dataReady=unlocked&&(cryptoState==="off"||cryptoState==="on");
      const [visits,setVisits,v1]=usePersistedState("fizjo-visits",[],dataReady);
      const [patients,setPatients,v2]=usePersistedState("fizjo-patients",[],dataReady);
      // Migracja: nadaj id wizytom które go nie mają — uruchamia się po załadowaniu z Supabase
      // Zapis tylko gdy naprawdę jest co uzupełnić (inaczej każde otwarcie apki przepisywałoby dane w bazie)
      React.useEffect(()=>{
        if(!v1) return; // czekaj na załadowanie
        if(!(visits||[]).some(v=>!v.id)) return;
        setVisits(vs=>vs.map(v=>v.id?v:{...v,id:Date.now()+Math.random()}));
      },[v1]);
      React.useEffect(()=>{
        if(!v2) return;
        if(!(patients||[]).some(p=>!p.id)) return;
        setPatients(ps=>ps.map(p=>p.id?p:{...p,id:Date.now()+Math.random()}));
      },[v2]);
      const [rentals,setRentals,v3]=usePersistedState("fizjo-rentals",[],dataReady);
      const [finances,setFinances,v4]=usePersistedState("fizjo-finances",[],dataReady);
      const [stock,setStock,v5]=usePersistedState("fizjo-stock",{},dataReady);
      const [nfzCases,setNfzCases,v6]=usePersistedState("fizjo-nfz",[],dataReady);
      const [todos,setTodos,v7]=usePersistedState("fizjo-todos",[],dataReady);
      const [events,setEvents,v9]=usePersistedState("fizjo-events",[],dataReady);
      const [settings,setSettings,v8]=usePersistedState("fizjo-settings",{backupReminder:true},dataReady);
      const [budget,setBudget,v10]=usePersistedState("fizjo-budget",{},dataReady);
      const [machines,setMachines,v11]=usePersistedState("fizjo-machines",[],dataReady);
      const [wealth,setWealth,v12]=usePersistedState("fizjo-wealth",emptyWealth(),dataReady);
      const [dark,setDark]=useState(false);
      const [demo,setDemo]=useState(false);

      // Jednorazowe czyszczenie: klucz Anthropic API nie jest już trzymany w bazie
      // (przeniesiony na serwer w api/scan-receipt.js) — usuń stary, jeśli został zapisany wcześniej
      React.useEffect(()=>{
        if(settings&&settings.anthropicKey!==undefined){
          setSettings(s=>{const {anthropicKey,...rest}=s;return rest;});
        }
      },[settings]);
      const [showBackupBanner,setShowBackupBanner]=useState(false);
      const [showConflictBanner,setShowConflictBanner]=useState(false);
      const [sessionExpired,setSessionExpired]=useState(false);
      React.useEffect(()=>{
        const h=()=>setSessionExpired(true);
        window.addEventListener("fizjo-session-expired",h);
        return()=>window.removeEventListener("fizjo-session-expired",h);
      },[]);
      // Cichy keep-alive: odnawia logowanie, dopóki apka jest otwarta (nic nie wylogowuje)
      React.useEffect(()=>{ if(unlocked) return startAuthKeepAlive(); },[unlocked]);
      const [loadFail,setLoadFail]=useState([]);
      React.useEffect(()=>{
        const h=e=>setLoadFail(e.detail||[]);
        window.addEventListener("fizjo-load-error",h);
        return()=>window.removeEventListener("fizjo-load-error",h);
      },[]);

      React.useEffect(()=>{
        const h=()=>setShowConflictBanner(true);
        window.addEventListener("fizjo-conflict",h);
        return()=>window.removeEventListener("fizjo-conflict",h);
      },[]);

      const buildBackup=()=>({visits,patients,rentals,finances,stock,nfzCases,todos,events,budget,wealth,machines,exportedAt:new Date().toISOString()});
      const downloadJson=(data,name)=>{
        const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=url;
        a.download=name;
        a.click();
        URL.revokeObjectURL(url);
      };
      // kopia bezpieczeństwa: gdy dane są szyfrowane, plik też jest zaszyfrowany (stan zrzucamy od razu, zapis pliku może chwilę potrwać)
      const downloadSafetyBackup=(name)=>{
        const snap=buildBackup();
        if(FZ_CRYPTO.state==="on"&&FZ_CRYPTO.meta){
          const m=FZ_CRYPTO.meta;
          czEncrypt("fizjo-export",snap).then(env=>downloadJson({format:"fizjo-enc-backup",v:1,kdf:m.kdf,wrapPass:m.wrapPass,wrapRec:m.wrapRec,check:m.check,env},name.replace(".json","-ZASZYFROWANA.json")));
        } else downloadJson(snap,name);
      };
      const exportData=()=>{
        downloadSafetyBackup("fizjo-backup-"+new Date().toISOString().slice(0,10)+".json");
        setShowBackupBanner(false);
      };

      // Wczytanie kopii: sprawdza dane, pokazuje co zostanie zastąpione, prosi o zgodę i zapisuje kopię obecnych danych
      // (używane przez import z pliku i przez przywracanie kopii automatycznej)
      const applyBackup=(d)=>{
        try{
          const LISTS=[["visits","wizyty",visits],["patients","pacjenci",patients],["rentals","wypożyczenia",rentals],["finances","wpisy finansowe",finances],["nfzCases","sprawy wózków",nfzCases],["todos","zadania",todos],["events","wydarzenia",events],["machines","sztuki sprzętu",machines]];
          const OBJS=[["stock","magazyn",stock],["budget","budżet",budget],["wealth","majątek",wealth]];
          if(!d||typeof d!=="object"||Array.isArray(d)||![...LISTS,...OBJS].some(([k])=>d[k]!==undefined)){alert("W tym pliku nie ma danych z tej aplikacji. Nic nie zostało zmienione.");return;}
          const bad=[...LISTS.filter(([k])=>d[k]!==undefined&&!Array.isArray(d[k])),...OBJS.filter(([k])=>d[k]!==undefined&&(d[k]===null||typeof d[k]!=="object"||Array.isArray(d[k])))];
          if(bad.length){alert("Plik jest uszkodzony (zły format: "+bad.map(x=>x[1]).join(", ")+"). Nic nie zostało zmienione.");return;}
          const lines=LISTS.filter(([k])=>d[k]!==undefined).map(([k,label,cur])=>"• "+label+": teraz "+(cur||[]).length+", w pliku "+d[k].length);
          const objNames=OBJS.filter(([k])=>d[k]!==undefined).map(x=>x[1]);
          const when=d.exportedAt?String(d.exportedAt).slice(0,10):"nieznanej daty";
          const msg="Wczytujesz kopię z dnia "+when+".\n\nTo ZASTĄPI obecne dane:\n"+lines.join("\n")+(objNames.length?"\n• oraz: "+objNames.join(", "):"")+"\n\nPrzed wczytaniem pobiorę kopię obecnych danych. Kontynuować?";
          if(!window.confirm(msg))return;
          try{downloadSafetyBackup("fizjo-backup-PRZED-importem-"+new Date().toISOString().slice(0,16).replace(":","-")+".json");}catch{}
          allowShrinkFor(15000);
          if(d.visits)setVisits(d.visits);
          if(d.patients)setPatients(d.patients);
          if(d.rentals)setRentals(d.rentals);
          if(d.finances)setFinances(d.finances);
          if(d.stock)setStock(d.stock);
          if(d.nfzCases)setNfzCases(d.nfzCases);
          if(d.todos)setTodos(d.todos);
          if(d.events)setEvents(d.events);
          if(d.budget)setBudget(d.budget);
          if(d.wealth)setWealth(d.wealth);
          if(d.machines)setMachines(d.machines);
          alert("Kopia wczytana. Kopia poprzednich danych została pobrana jako plik fizjo-backup-PRZED-importem-….");
        }catch(err){alert("Błąd importu: "+err.message);}
      };
      // plik z kopią zaszyfrowaną: hasło szyfrowania albo klucz awaryjny; zwraca dane jawne albo null
      const readEncryptedBackup=async(f)=>{
        const meta={kdf:f.kdf,wrapPass:f.wrapPass,wrapRec:f.wrapRec,check:f.check};
        const secret=window.prompt("Ta kopia jest zaszyfrowana. Wpisz hasło szyfrowania (albo klucz awaryjny):");
        if(!secret)return null;
        let dek=null;
        try{dek=await czDekFromPass(meta,secret,false);}catch{}
        if(!dek){try{dek=await czDekFromRecovery(meta,secret,false);}catch{}}
        if(!dek){alert("Nieprawidłowe hasło lub klucz. Nic nie zostało zmienione.");return null;}
        try{return await czDecrypt("fizjo-export",f.env,dek);}
        catch{alert("Nie udało się odszyfrować pliku (może być uszkodzony). Nic nie zostało zmienione.");return null;}
      };
      const importData=(e)=>{
        const input=e.target;
        const file=input.files[0];
        if(!file)return;
        const reader=new FileReader();
        reader.onload=async(ev)=>{
          let d;
          try{d=JSON.parse(ev.target.result);}catch{alert("To nie jest poprawny plik kopii (nie da się go odczytać). Nic nie zostało zmienione.");return;}
          if(d&&d.format==="fizjo-enc-backup"){d=await readEncryptedBackup(d);if(!d)return;}
          applyBackup(d);
        };
        reader.readAsText(file);
        input.value="";
      };
      // Codzienna kopia w bazie (7 miejsc według dnia tygodnia, nadpisywane co tydzień) — chroni przed błędem apki i pomyłką
      const allLoaded=!!(v1&&v2&&v3&&v4&&v5&&v6&&v7&&v8&&v9&&v10&&v11&&v12);
      React.useEffect(()=>{
        if(!dataReady||!allLoaded)return;
        if((visits||[]).length===0&&(patients||[]).length===0)return;   // pusty stan nigdy nie nadpisuje dobrych kopii
        const today=todayLocal();
        try{if(localStorage.getItem("fizjo-snap-last")===today)return;}catch{}
        let dead=false;
        const slot=new Date().getDay();
        (async()=>{
          const ts=await czSlotTs(slot);
          if(dead||ts===null)return;                                   // nie wiemy, co jest w bazie: nie ryzykujemy
          const done=()=>{try{localStorage.setItem("fizjo-snap-last",today);}catch{}};
          if(ts>0&&new Date(ts).toLocaleDateString("sv-SE")===today){done();return;}
          const ok=await dbSet("fizjo-backup-"+slot,{savedAt:new Date().toISOString(),data:buildBackup()});
          if(ok&&!dead)done();
        })();
        return()=>{dead=true;};
      },[dataReady,allLoaded]);

      // Operacje dla Ustawień (szyfrowanie i kopie), udostępnione przez kontekst
      const getAllData=()=>({"fizjo-visits":visits,"fizjo-patients":patients,"fizjo-rentals":rentals,"fizjo-finances":finances,"fizjo-stock":stock,"fizjo-nfz":nfzCases,"fizjo-todos":todos,"fizjo-events":events,"fizjo-settings":settings,"fizjo-budget":budget,"fizjo-machines":machines,"fizjo-wealth":wealth});
      const withSnaps=async()=>{
        const all=getAllData();
        for(const k of FZ_SNAP_KEYS){const {data,error}=await dbGet(k);if(error)throw new Error("Nie udało się odczytać kopii automatycznych. Spróbuj za chwilę.");if(data)all[k]=data;}
        return all;
      };
      const sec={
        state:cryptoState,
        prepare:(pass)=>czCreateMeta(pass),
        enable:async(pass,onProgress,opts)=>{const all=await withSnaps();const r=await czEnable(pass,()=>all,onProgress,opts);setCryptoState("on");return r;},
        disable:async(onProgress)=>{const all=await withSnaps();await czDisable(()=>all,onProgress);setCryptoState("off");return true;},
        changePass:async(oldPass,newPass)=>czChangePass(oldPass,newPass),
        forgetKey:async()=>{await czForgetKey();FZ_CRYPTO.dek=null;FZ_CRYPTO.state="locked";setCryptoState("locked");},
        audit:czAudit,
        listSnaps:czListSnapshots,
        restoreSnap:(snap)=>applyBackup(snap.data),
        snapshotNow:async()=>{const slot=new Date().getDay();return dbSet("fizjo-backup-"+slot,{savedAt:new Date().toISOString(),data:buildBackup()});},
        exportPlain:()=>{downloadJson(buildBackup(),"fizjo-backup-JAWNA-"+new Date().toISOString().slice(0,10)+".json");},
        buildBackup,downloadJson
      };

      // Backup reminder at 20:00 Warsaw time
      React.useEffect(()=>{
        if(settings&&settings.backupReminder===false)return;
        const check=()=>{
          const now=new Date();
          const warsaw=new Date(now.toLocaleString("en-US",{timeZone:"Europe/Warsaw"}));
          const h=warsaw.getHours();
          const m=warsaw.getMinutes();
          if(h===20&&m<5)setShowBackupBanner(true);
        };
        check();
        const id=setInterval(check,60000);
        return()=>clearInterval(id);
      },[settings]);

      if(!authChecked)return<div className="loader"><div className="spinner"/><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#3E6FB0",fontSize:18}}>ZubrzyckiFizjo</div></div>;
      if(isRecovery)return<DarkCtx.Provider value={dark}><PasswordResetScreen/></DarkCtx.Provider>;
      if(!unlocked)return<DarkCtx.Provider value={dark}><LockScreen onUnlock={()=>{setSessionExpired(false);setUnlocked(true);}}/></DarkCtx.Provider>;
      if(cryptoState==="locked")return<DarkCtx.Provider value={dark}><CryptoUnlockScreen onDone={()=>setCryptoState("on")}/></DarkCtx.Provider>;
      if(cryptoState==="checking"||cryptoState==="error")return<div className="loader"><div className="spinner"/><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#3E6FB0",fontSize:18}}>ZubrzyckiFizjo</div><div style={{fontSize:13,color:"#7A8FA6",textAlign:"center",maxWidth:300}}>{cryptoState==="error"?"Nie udało się sprawdzić ustawień szyfrowania. Nic nie zostało zmienione. Próbuję ponownie…":"Wczytywanie…"}</div></div>;
      if(!v1||!v2||!v3||!v4||!v5||!v6||!v7||!v10||!v11)return<div className="loader"><div className="spinner"/><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#3E6FB0",fontSize:18}}>ZubrzyckiFizjo</div>{loadFail.length>0
        ? <div style={{maxWidth:320,textAlign:"center",padding:"0 20px"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#E05C5C",marginBottom:6}}>Nie udało się wczytać danych</div>
            <div style={{fontSize:13,color:"#7A8FA6",marginBottom:12}}>Nic nie zostało zmienione ani zapisane. Próbuję ponownie co kilka sekund.</div>
            <button onClick={()=>window.location.reload()} style={{background:"#3E6FB0",color:"#fff",border:"none",borderRadius:10,padding:"9px 18px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Spróbuj teraz</button>
          </div>
        : <div style={{fontSize:13,color:"#7A8FA6"}}>Wczytywanie danych...</div>}</div>;
      return <DarkCtx.Provider value={dark}><DemoCtx.Provider value={demo}>
      <MachinesCtx.Provider value={{machines,setMachines}}>
      <FinancesCtx.Provider value={{finances,setFinances}}>
      <RentalsCtx.Provider value={{rentals,setRentals}}>
      <StockCtx.Provider value={{stock,setStock}}>
      <SecCtx.Provider value={sec}>
        <div>
          {showConflictBanner&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#E05C5C",zIndex:10000,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <span style={{fontWeight:700,fontSize:13,color:"#fff",flex:1}}>⚠️ Inne urządzenie zapisało zmiany. Możesz stracić swoje dane.</span>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>window.location.reload()} style={{background:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Odśwież</button>
              <button onClick={()=>setShowConflictBanner(false)} style={{background:"transparent",border:"none",fontSize:18,cursor:"pointer",color:"#fff"}}>×</button>
            </div>
          </div>}
          {sessionExpired&&<div style={{position:"fixed",inset:0,zIndex:20000,background:dark?"#0E141F":"#EFF3FA",overflowY:"auto"}}>
            <div style={{background:"#E05C5C",color:"#fff",padding:"10px 16px",fontSize:13,fontWeight:700,textAlign:"center"}}>Sesja wygasła. Zaloguj się ponownie. Wpisane zmiany czekają i zapiszą się zaraz po zalogowaniu.</div>
            <LockScreen onUnlock={()=>setSessionExpired(false)}/>
          </div>}
          {loadFail.length>0&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#E05C5C",zIndex:10001,padding:"10px 16px"}}>
            <span style={{fontWeight:700,fontSize:13,color:"#fff"}}>⚠️ Nie udało się wczytać części danych. Zmiany w tej części nie będą zapisane. Próbuję ponownie…</span>
          </div>}
          {showBackupBanner&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#F4A261",zIndex:9999,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:13,color:"#1C2B3A"}}>💾 Czas na backup!</span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={exportData} style={{background:"#1C2B3A",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>Pobierz</button>
              <button onClick={()=>setShowBackupBanner(false)} style={{background:"transparent",border:"none",fontSize:18,cursor:"pointer",color:"#1C2B3A"}}>×</button>
            </div>
          </div>}
          <AppWithSync visits={visits} setVisits={setVisits} patients={patients} setPatients={setPatients} rentals={rentals} setRentals={setRentals} finances={finances} setFinances={setFinances} stock={stock} setStock={setStock} nfzCases={nfzCases} setNfzCases={setNfzCases} todos={todos} setTodos={setTodos} events={events} setEvents={setEvents} dark={dark} setDark={setDark} settings={settings} setSettings={setSettings} exportData={exportData} importData={importData} demo={demo} setDemo={setDemo} budget={budget} setBudget={setBudget} machines={machines} setMachines={setMachines} wealth={wealth} setWealth={setWealth} rentalsLoaded={v3} financesLoaded={v4}/>
        </div>
      </SecCtx.Provider></StockCtx.Provider></RentalsCtx.Provider></FinancesCtx.Provider></MachinesCtx.Provider>
      </DemoCtx.Provider></DarkCtx.Provider>;
    }
