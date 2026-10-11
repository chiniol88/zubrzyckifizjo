    // ── PRYWATNOŚĆ DANYCH PACJENTA ───────────────────────────────────────────────
    // Jedno miejsce, które wie, gdzie mogą być dane osobowe pacjenta, i usuwa je ze WSZYSTKICH zbiorów naraz.
    // Zasada: (1) własne rekordy pacjenta (wizyty, wypożyczenia, sprawy NFZ, karta) są czyszczone z danych osobowych i notatek,
    // kwoty i daty zostają; (2) cały wolny tekst w pozostałych zbiorach (kalendarz, zadania, notatki innych rekordów,
    // uwagi w Magazynie, opisy w Finansach...) jest przeszukiwany po pełnym nazwisku, numerach telefonu, adresie i diagnozie.
    // Funkcje są czyste (nie zmieniają stanu), dzięki czemu da się je przetestować na całej kopii danych.
    const PRIV_MIN_NAME=5, PRIV_MIN_ADDR=8;
    const PRIV_LABELS={events:"wydarzenia w kalendarzu",todos:"zadania",rentals:"notatki wypożyczeń",nfzCases:"sprawy wózków",visits:"notatki wizyt",patients:"notatki innych pacjentów",finances:"opisy w Finansach",stock:"uwagi w Magazynie",machines:"karty sztuk",budget:"budżet",wealth:"majątek"};

    const privIsWord=ch=>!!ch&&/[\p{L}\p{N}]/u.test(ch);
    // 9 ostatnich cyfr numeru (bez +48 i separatorów); krótsze lub dłuższe niż telefon to nie telefon
    const privPhoneKey=s=>{const d=String(s||"").replace(/\D/g,"");return d.length>=9&&d.length<=12?d.slice(-9):"";};

    // zamienia całe wystąpienia 'needle' (bez rozróżniania wielkości liter, tylko na granicy słowa) na 'repl'
    function privReplaceWord(text,needle,repl){
      if(!needle||!text)return [text,0];
      const low=text.toLowerCase();
      const sameLen=low.length===text.length;
      const hay=sameLen?low:text, nd=sameLen?needle.toLowerCase():needle;
      let out="",i=0,cnt=0;
      for(;;){
        const j=hay.indexOf(nd,i);
        if(j<0)break;
        const before=j>0?text[j-1]:"",after=text[j+nd.length]||"";
        if(!privIsWord(before)&&!privIsWord(after)){out+=text.slice(i,j)+repl;cnt++;i=j+nd.length;}
        else{out+=text.slice(i,j+1);i=j+1;}
      }
      return [out+text.slice(i),cnt];
    }
    // zamienia numer telefonu zapisany z dowolnymi spacjami/myślnikami, o ile nie jest częścią dłuższego ciągu cyfr
    function privReplacePhone(text,key,repl){
      if(!key||!text)return [text,0];
      const re=new RegExp(key.split("").join("[\\s.\\-]?"),"g");
      let out="",last=0,cnt=0,m;
      while((m=re.exec(text))){
        const before=m.index>0?text[m.index-1]:"",after=text[m.index+m[0].length]||"";
        if(/\d/.test(before)||/\d/.test(after)){re.lastIndex=m.index+1;continue;}
        out+=text.slice(last,m.index)+repl;last=m.index+m[0].length;cnt++;
      }
      return [out+text.slice(last),cnt];
    }
    function privScrubString(s,ident){
      let t=s,c=0,r;
      if(ident.name){[t,r]=privReplaceWord(t,ident.name,ident.repl);c+=r;}
      for(const k of ident.phoneKeys){[t,r]=privReplacePhone(t,k,ident.replPhone);c+=r;}
      for(const a of ident.addrs){[t,r]=privReplaceWord(t,a,ident.replAddr);c+=r;}
      return [t,c];
    }
    // przechodzi przez dowolną strukturę; zwraca TĘ SAMĄ referencję, gdy nic się nie zmieniło (żeby nie zapisywać zbędnie)
    // onlyKeys: gdy podane, przeszukujemy tylko teksty w polach o tych nazwach (np. "notes"); pola tożsamości innych osób
    // (name, patientName, phone, address, diagnosis) zostają nietknięte, bo imiennik albo wspólny telefon rodziny to inna osoba
    function privScrubDeep(v,ident,stat,onlyKeys,key){
      if(typeof v==="string"){
        if(onlyKeys&&!onlyKeys.has(key))return v;
        const [t,c]=privScrubString(v,ident);if(c){stat.n+=c;return t;}return v;
      }
      if(Array.isArray(v)){let ch=false;const o=v.map(x=>{const y=privScrubDeep(x,ident,stat,onlyKeys,key);if(y!==x)ch=true;return y;});return ch?o:v;}
      if(v&&typeof v==="object"){let ch=false;const o={};for(const k of Object.keys(v)){const y=privScrubDeep(v[k],ident,stat,onlyKeys,k);if(y!==v[k])ch=true;o[k]=y;}return ch?o:v;}
      return v;
    }
    // które pola wolnego tekstu przeszukujemy w danym zbiorze (null = wszystkie teksty w zbiorze)
    const PRIV_TEXT_KEYS={patients:new Set(["notes"]),visits:new Set(["notes"]),rentals:new Set(["notes"]),nfzCases:new Set(["notes"]),finances:new Set(["description"]),todos:new Set(["text"]),events:null,stock:null,machines:null,budget:null,wealth:null};
    // rekord należy do pacjenta: po numerze karty, a po nazwisku tylko gdy rekord nie wskazuje żadnej istniejącej karty
    // (brak numeru albo numer-pseudonim typu "ac-Imię Nazwisko" ze starszych wpisów). cardIds = numery wszystkich kart pacjentów.
    const privOwner=(pid,pn,cardIds)=>x=>!!x&&(x.patientId===pid||((!x.patientId||!(cardIds&&cardIds.has(x.patientId)))&&!!pn&&x.patientName===pn));

    // S = {patients,visits,rentals,nfzCases,finances,events,todos,stock,machines,budget,wealth}
    // Zwraca {anon,next,stats,total}: next = nowy stan zbiorów (te same referencje, gdy bez zmian), stats = gdzie jeszcze znaleziono dane w wolnym tekście
    function privAnonymize(S,pid){
      const P=S.patients||[];
      const p=P.find(x=>x&&x.id===pid);
      if(!p)return null;
      const pn=(p.name||"").trim();
      const anon="Pacjent usunięty "+(P.filter(x=>x&&(x.name||"").startsWith("Pacjent usunięty")).length+1);
      const mine=privOwner(pid,p.name,new Set(P.map(x=>x&&x.id)));
      const myR=(S.rentals||[]).filter(mine),myN=(S.nfzCases||[]).filter(mine);
      const phones=[p.phone,...(p.phones||[]).map(x=>x&&x.number),...myR.map(r=>r.phone),...myN.map(c=>c.phone)];
      const addrs=[p.address,...myR.map(r=>r.address),...myN.map(c=>c.address)];
      const ident={
        name:pn.length>=PRIV_MIN_NAME?pn:"",
        phoneKeys:[...new Set(phones.map(privPhoneKey).filter(Boolean))],
        addrs:[...new Set(addrs.map(a=>String(a||"").trim()).filter(a=>a.length>=PRIV_MIN_ADDR))],
        repl:anon,replPhone:"(numer usunięty)",replAddr:"(adres usunięty)"
      };
      // numery wierszy finansów, które pochodzą od tego pacjenta (wizyty, wpłaty, cykle, transport, przedłużenia, wózki)
      const sids=new Set();
      (S.visits||[]).filter(mine).forEach(v=>sids.add("visit-"+v.id));
      myR.forEach(r=>{(r.payments||[]).forEach(x=>sids.add("payment-"+x.id));(r.cycles||[]).forEach(c=>sids.add("cycle-"+r.id+"-"+(c.dueDate||c.month)));sids.add("transport-"+r.id);});
      myN.forEach(c=>sids.add("wozek-"+c.id));
      const xpfx=myR.map(r=>"extend-"+r.id+"-");
      const ownSid=sid=>!!sid&&(sids.has(sid)||xpfx.some(pf=>sid.startsWith(pf)));

      const next={};
      // 1) własne rekordy: dane osobowe i notatki znikają, daty i kwoty zostają
      // numer-pseudonim "ac-Imię Nazwisko" zawiera nazwisko, więc zastępujemy go numerem (zanonimizowanej) karty
      const link=x=>(typeof x.patientId==="string"&&x.patientId.startsWith("ac-"))?{patientId:pid}:{};
      next.visits=(S.visits||[]).map(v=>mine(v)?{...v,...link(v),patientName:anon,notes:""}:v);
      next.rentals=(S.rentals||[]).map(r=>mine(r)?{...r,...link(r),patientName:anon,phone:"",address:"",notes:"",extensions:(r.extensions||[]).map(e=>({...e,notes:""}))}:r);
      next.nfzCases=(S.nfzCases||[]).map(c=>mine(c)?{...c,...link(c),patientName:anon,phone:"",address:"",notes:""}:c);
      next.finances=(S.finances||[]).map(f=>(f&&f.description&&pn&&ownSid(f.sourceId))?{...f,description:f.description.split(pn).join(anon)}:f);
      next.patients=P.map(x=>x&&x.id===pid?{id:x.id,name:anon,archived:true,anonymized:true,phone:"",phones:[],address:"",diagnosis:"",notes:"",birthday:"",defaultPrice:""}:x);
      // 2) wolny tekst we wszystkich zbiorach (kalendarz, zadania, notatki innych rekordów, uwagi, opisy...)
      next.events=S.events;next.todos=S.todos;next.stock=S.stock;next.machines=S.machines;next.budget=S.budget;next.wealth=S.wealth;
      const stats={};let total=0;
      Object.keys(PRIV_LABELS).forEach(k=>{
        if(next[k]===undefined||next[k]===null)return;
        const stat={n:0};
        // rekord anonimizowanego pacjenta jest już czysty, resztę zbioru przeszukujemy
        next[k]=privScrubDeep(next[k],ident,stat,PRIV_TEXT_KEYS[k]||null,"");
        if(stat.n){stats[k]=stat.n;total+=stat.n;}
      });
      return {anon,next,stats,total};
    }
    // tekst do okna potwierdzenia: gdzie jeszcze (poza własnymi rekordami) pojawiają się dane pacjenta
    const privDescribe=stats=>Object.keys(stats||{}).map(k=>PRIV_LABELS[k]+": "+stats[k]).join(", ");
