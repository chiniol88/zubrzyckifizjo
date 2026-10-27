    function SocialLinks({settings,setSettings,dk,txt,sub,border}) {
      const [links,setLinks]=React.useState(()=>settings.socialLinks||[]);
      const saveToSettings=(newLinks)=>setSettings(s=>({...s,socialLinks:newLinks}));
      const add=()=>{const newLinks=[...links,{id:Date.now(),name:"",url:""}];setLinks(newLinks);saveToSettings(newLinks);};
      const upd=(id,field,val)=>setLinks(ls=>ls.map(l=>l.id===id?{...l,[field]:val}:l));
      const blur=(newLinks)=>saveToSettings(newLinks);
      const del=(id)=>{const newLinks=links.filter(l=>l.id!==id);setLinks(newLinks);saveToSettings(newLinks);};
      const inp=(extra={})=>({padding:"9px 12px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit",outline:"none",...extra});
      return <div style={{paddingTop:8,paddingBottom:4}}>
        {links.length===0&&<div style={{fontSize:13,color:sub,padding:"8px 0 12px"}}>Brak linków — dodaj pierwszy poniżej.</div>}
        {links.map((l,i)=><div key={l.id} style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:13,color:sub,minWidth:20,textAlign:"right"}}>{i+1}.</span>
          <input value={l.name} onChange={e=>upd(l.id,"name",e.target.value)} onBlur={()=>blur(links.map(x=>x.id===l.id?{...x,name:x.name}:x))} placeholder="Nazwa (np. Facebook)" style={{...inp(),flex:"0 0 120px"}}/>
          <input value={l.url} onChange={e=>upd(l.id,"url",e.target.value)} onBlur={()=>blur(links.map(x=>x.id===l.id?{...x,url:x.url}:x))} placeholder="https://..." style={{...inp(),flex:1,minWidth:0}}/>
          {l.url&&<a href={l.url} target="_blank" rel="noreferrer" style={{fontSize:18,textDecoration:"none"}}>🔗</a>}
          <button onClick={()=>del(l.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#E05C5C",padding:"0 2px",flexShrink:0}}>×</button>
        </div>)}
        <button onClick={add} style={{background:dk?"#1E2F4A":"#EFF3FA",border:"none",borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:600,color:"#3E6FB0",cursor:"pointer",fontFamily:"inherit",width:"100%",textAlign:"left"}}>+ Dodaj kolejny</button>
      </div>;
    }

    function SecuritySection({dk,txt,sub,Row,Sec}) {
      const sec=useContext(SecCtx);
      const [wiz,setWiz]=useState(null);           // null | {step,...}
      const [msg,setMsg]=useState("");
      const [audit,setAudit]=useState(null);
      const [snaps,setSnaps]=useState(null);
      const [busy,setBusy]=useState(false);
      const [pw,setPw]=useState({old:"",n1:"",n2:"",open:false,err:""});
      if(!sec)return null;
      const on=sec.state==="on";
      const border=dk?"#2A3A56":"#D9E2F0";
      const inp={width:"100%",padding:"11px 14px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:txt,fontSize:15,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10,outline:"none"};
      const btn=(bg,fg)=>({background:bg,border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:fg,cursor:"pointer",fontFamily:"inherit"});
      const big={width:"100%",padding:"12px",borderRadius:12,background:"#3E6FB0",color:"#fff",border:"none",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"};
      const note={fontSize:13,color:sub,lineHeight:1.5,marginBottom:12};

      const startWizard=()=>setWiz({step:0,consent:false,p1:"",p2:"",err:"",prepared:null,recovery:"",saved:false,backedUp:false,progress:0,total:0,done:false});
      const next=async()=>{
        const w=wiz;
        if(w.step===1){
          if(w.p1.length<12){setWiz({...w,err:"Hasło musi mieć co najmniej 12 znaków."});return;}
          if(w.p1!==w.p2){setWiz({...w,err:"Hasła nie są identyczne."});return;}
          setBusy(true);
          try{const prepared=await sec.prepare(w.p1);setWiz({...w,step:2,err:"",prepared,recovery:prepared.recovery});}
          catch(e){setWiz({...w,err:"Nie udało się przygotować szyfrowania: "+(e.message||"błąd")});}
          setBusy(false);return;
        }
        setWiz({...w,step:w.step+1,err:""});
      };
      const runEncrypt=async()=>{
        setBusy(true);
        setWiz(w=>({...w,step:4,err:""}));
        try{
          await sec.enable(wiz.p1,(i,total)=>setWiz(w=>w?{...w,progress:i,total}:w),{prepared:wiz.prepared,remember:true});
          setWiz(w=>({...w,step:5,done:true}));
        }catch(e){setWiz(w=>({...w,step:3,err:e.message||"Błąd szyfrowania. Dane nie zostały zmienione."}));}
        setBusy(false);
      };
      const runDisable=async()=>{
        if(!window.confirm("Wyłączyć szyfrowanie? Dane w bazie wrócą do zwykłego, niezaszyfrowanego zapisu. Przed wyłączeniem pobierz kopię."))return;
        setBusy(true);setMsg("Wyłączam szyfrowanie…");
        try{await sec.disable((i,t)=>setMsg("Wyłączam szyfrowanie… "+i+" z "+t));setMsg("Szyfrowanie wyłączone.");}
        catch(e){setMsg("Nie udało się: "+e.message);}
        setBusy(false);
      };
      const runAudit=async()=>{setBusy(true);setAudit(null);try{setAudit(await sec.audit());}catch{setAudit({error:true});}setBusy(false);};
      const savePw=async()=>{
        if(pw.n1.length<12){setPw({...pw,err:"Nowe hasło musi mieć co najmniej 12 znaków."});return;}
        if(pw.n1!==pw.n2){setPw({...pw,err:"Nowe hasła nie są identyczne."});return;}
        setBusy(true);
        try{await sec.changePass(pw.old,pw.n1);setPw({old:"",n1:"",n2:"",open:false,err:""});setMsg("Hasło szyfrowania zmienione.");}
        catch{setPw({...pw,err:"Stare hasło jest nieprawidłowe."});}
        setBusy(false);
      };
      const loadSnaps=async()=>{setBusy(true);setSnaps(null);try{setSnaps(await sec.listSnaps());}catch{setSnaps([]);}setBusy(false);};
      const downloadRecovery=()=>{const b=new Blob(["Klucz awaryjny ZubrzyckiFizjo (do odblokowania danych, gdy zapomnisz hasła szyfrowania)\n\n"+wiz.recovery+"\n\nPrzechowuj poza komputerem, w bezpiecznym miejscu. Kto ma ten klucz i dostęp do bazy, może odczytać dane.\n"],{type:"text/plain"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download="klucz-awaryjny-zubrzyckifizjo.txt";a.click();URL.revokeObjectURL(u);};

      const stepBox=(children)=><Modal title="Włączanie szyfrowania danych" onClose={()=>{if(!busy)setWiz(null);}}>{children}</Modal>;
      return <>
        <Sec title="BEZPIECZEŃSTWO DANYCH">
          <Row label="Szyfrowanie danych w bazie">
            {on?<span style={{fontSize:13,color:"#3DAA72",fontWeight:700}}>✓ włączone</span>
               :sec.state==="locked"?<span style={{fontSize:13,color:"#E05C5C",fontWeight:700}}>zablokowane</span>
               :<button onClick={startWizard} style={btn("#3E6FB0","#fff")}>Włącz…</button>}
          </Row>
          {!on&&sec.state==="off"&&<div style={{...note,paddingTop:10}}>Dane są dziś zapisane w bazie jawnym tekstem (chroni je logowanie). Szyfrowanie sprawia, że w bazie, w historii zmian i w kopiach leży nieczytelny szyfr, a klucz masz tylko Ty.</div>}
          {on&&<>
            <Row label="Sprawdź szyfrowanie"><button onClick={runAudit} disabled={busy} style={btn("#E1E9F5","#3E6FB0")}>{busy?"…":"Sprawdź"}</button></Row>
            {audit&&<div style={{...note,paddingTop:8}}>{audit.error?"Nie udało się sprawdzić.":("Zaszyfrowane: "+audit.enc.length+" zbiorów"+(audit.plain.length?" · NIEzaszyfrowane: "+audit.plain.join(", "):"")+(audit.missing.length?" · jeszcze puste: "+audit.missing.length:"")+(audit.unreadable.length?" · nieodczytane: "+audit.unreadable.length:""))}</div>}
            <Row label="Zmień hasło szyfrowania"><button onClick={()=>setPw({...pw,open:!pw.open,err:""})} style={btn("#E1E9F5","#3E6FB0")}>{pw.open?"Anuluj":"Zmień"}</button></Row>
            {pw.open&&<div style={{padding:"12px 0"}}>
              <input type="password" placeholder="Obecne hasło szyfrowania" value={pw.old} onChange={e=>setPw({...pw,old:e.target.value,err:""})} style={inp}/>
              <input type="password" placeholder="Nowe hasło (min. 12 znaków)" value={pw.n1} onChange={e=>setPw({...pw,n1:e.target.value,err:""})} style={inp}/>
              <input type="password" placeholder="Powtórz nowe hasło" value={pw.n2} onChange={e=>setPw({...pw,n2:e.target.value,err:""})} style={inp}/>
              {pw.err&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:8}}>{pw.err}</div>}
              <button onClick={savePw} disabled={busy||!pw.old||!pw.n1} style={big}>{busy?"Zapisuję…":"Zapisz nowe hasło"}</button>
            </div>}
            <Row label="Zapomnij klucz na tym urządzeniu"><button onClick={()=>{if(window.confirm("Na tym urządzeniu apka znów poprosi o hasło szyfrowania. Kontynuować?"))sec.forgetKey();}} style={btn("#E1E9F5","#3E6FB0")}>Zapomnij</button></Row>
            <Row label="Kopia jawna (bez szyfrowania)"><button onClick={()=>{if(window.confirm("Plik będzie zawierał dane pacjentów jawnym tekstem. Zadbaj o jego bezpieczne przechowywanie i usuń, gdy przestanie być potrzebny. Pobrać?"))sec.exportPlain();}} style={btn("#FEE2E2","#E05C5C")}>Pobierz</button></Row>
            <Row label="Wyłącz szyfrowanie"><button onClick={runDisable} disabled={busy} style={btn("#FEE2E2","#E05C5C")}>Wyłącz…</button></Row>
          </>}
          {msg&&<div style={{...note,paddingTop:8}}>{msg}</div>}
        </Sec>
        <Sec title="KOPIE AUTOMATYCZNE W BAZIE">
          <div style={{...note,paddingTop:10}}>Raz dziennie apka zapisuje w bazie kopię wszystkich danych (ostatnie 7 dni). Chroni przed błędem aplikacji i pomyłką. To nie zastępuje kopii poza bazą.</div>
          <Row label="Zrób kopię teraz"><button disabled={busy} onClick={async()=>{setBusy(true);const ok=await sec.snapshotNow();setMsg(ok?"Kopia zapisana.":"Nie udało się zapisać kopii.");setBusy(false);}} style={btn("#E1E9F5","#3E6FB0")}>Zapisz</button></Row>
          <Row label="Dostępne kopie"><button onClick={loadSnaps} disabled={busy} style={btn("#E1E9F5","#3E6FB0")}>{busy?"…":"Pokaż"}</button></Row>
          {snaps&&snaps.length===0&&<div style={{...note,paddingTop:8}}>Brak kopii. Pierwsza zapisze się przy najbliższym otwarciu apki.</div>}
          {snaps&&snaps.map(sn=><div key={sn.slot} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,padding:"10px 0",borderBottom:`1px solid ${dk?"#1A2840":"#F0F4F8"}`}}>
            <div style={{minWidth:0}}>
              <div style={{fontSize:14,color:txt,fontWeight:600}}>{sn.error?"nie udało się odczytać":new Date(sn.savedAt).toLocaleString("pl-PL",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"})}</div>
              {!sn.error&&<div style={{fontSize:12,color:sub}}>wizyty {sn.counts.visits} · pacjenci {sn.counts.patients} · wypożyczenia {sn.counts.rentals} · finanse {sn.counts.finances}</div>}
            </div>
            {!sn.error&&<button onClick={()=>sec.restoreSnap(sn)} style={btn("#FEE2E2","#E05C5C")}>Przywróć</button>}
          </div>)}
        </Sec>
        {wiz&&wiz.step===0&&stepBox(<>
          <div style={note}>Dane pacjentów będą szyfrowane na tym urządzeniu, zanim trafią do bazy. W bazie zostanie nieczytelny szyfr. Klucz będzie tylko u Ciebie.</div>
          <div style={{...note,color:"#E05C5C",fontWeight:600}}>Jeśli zgubisz hasło szyfrowania i klucz awaryjny, nikt nie odzyska danych: ani Ty, ani twórca apki, ani Supabase.</div>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:txt,marginBottom:14}}><input type="checkbox" checked={wiz.consent} onChange={e=>setWiz({...wiz,consent:e.target.checked})} style={{marginTop:3}}/> Rozumiem i chcę włączyć szyfrowanie.</label>
          <button disabled={!wiz.consent} onClick={next} style={{...big,opacity:wiz.consent?1:0.5}}>Dalej</button>
        </>)}
        {wiz&&wiz.step===1&&stepBox(<>
          <div style={note}>Wymyśl hasło szyfrowania. To inne hasło niż do logowania. Najlepiej długa fraza z kilku słów (min. 12 znaków). Nie zapisuj go w apce.</div>
          <input type="password" autoFocus placeholder="Hasło szyfrowania" value={wiz.p1} onChange={e=>setWiz({...wiz,p1:e.target.value,err:""})} style={inp}/>
          <input type="password" placeholder="Powtórz hasło" value={wiz.p2} onChange={e=>setWiz({...wiz,p2:e.target.value,err:""})} style={inp}/>
          {wiz.err&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{wiz.err}</div>}
          <button onClick={next} disabled={busy||!wiz.p1||!wiz.p2} style={big}>{busy?"Przygotowuję…":"Dalej"}</button>
        </>)}
        {wiz&&wiz.step===2&&stepBox(<>
          <div style={note}>To jest Twój <b>klucz awaryjny</b>. Pozwoli odblokować dane, gdy zapomnisz hasła. Zapisz go w bezpiecznym miejscu poza komputerem (kartka w szufladzie, sejf). Pokazuję go tylko raz.</div>
          <div style={{background:dk?"#0E141F":"#EFF3FA",borderRadius:10,padding:"14px",fontFamily:"monospace",fontSize:16,letterSpacing:1,textAlign:"center",color:txt,wordBreak:"break-all",marginBottom:12,userSelect:"all"}}>{wiz.recovery}</div>
          <button onClick={downloadRecovery} style={{...btn("#E1E9F5","#3E6FB0"),marginBottom:12}}>⬇️ Pobierz jako plik</button>
          <label style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:txt,marginBottom:14}}><input type="checkbox" checked={wiz.saved} onChange={e=>setWiz({...wiz,saved:e.target.checked})} style={{marginTop:3}}/> Zapisałem klucz awaryjny w bezpiecznym miejscu.</label>
          <button disabled={!wiz.saved} onClick={next} style={{...big,opacity:wiz.saved?1:0.5}}>Dalej</button>
        </>)}
        {wiz&&wiz.step===3&&stepBox(<>
          <div style={note}>Zanim zaszyfrujemy dane, pobierz kopię bezpieczeństwa. Jeśli coś pójdzie nie tak, będziesz miał pełną kopię w pliku.</div>
          <button onClick={()=>{sec.exportPlain();setWiz({...wiz,backedUp:true});}} style={{...btn("#E1E9F5","#3E6FB0"),marginBottom:12}}>⬇️ Pobierz kopię bezpieczeństwa</button>
          {wiz.err&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{wiz.err}</div>}
          <button disabled={!wiz.backedUp||busy} onClick={runEncrypt} style={{...big,opacity:wiz.backedUp?1:0.5}}>Zaszyfruj dane</button>
        </>)}
        {wiz&&wiz.step===4&&stepBox(<>
          <div style={note}>Szyfruję i sprawdzam każdy zbiór danych. Nie zamykaj apki.</div>
          <div style={{height:8,borderRadius:4,background:dk?"#2A3A56":"#D9E2F0"}}><div style={{height:"100%",width:(wiz.total?Math.round(wiz.progress/wiz.total*100):0)+"%",background:"#3E6FB0",borderRadius:4,transition:"width .2s"}}/></div>
          <div style={{...note,marginTop:8}}>{wiz.progress} z {wiz.total||"…"}</div>
        </>)}
        {wiz&&wiz.step===5&&stepBox(<>
          <div style={{fontSize:40,textAlign:"center",marginBottom:8}}>✅</div>
          <div style={{...note,textAlign:"center",color:txt}}>Dane są zaszyfrowane. Na tym urządzeniu klucz jest zapamiętany, więc nie musisz wpisywać hasła przy każdym otwarciu.</div>
          <div style={note}>Na innych urządzeniach apka poprosi o hasło szyfrowania. Odśwież je i zamknij stare karty z apką.</div>
          <button onClick={()=>setWiz(null)} style={big}>Gotowe</button>
        </>)}
      </>;
    }

    // pole "minuty" z zatwierdzaniem po wyjściu z pola (żeby wpisywanie np. "45" nie skakało po drodze)
    // ── Miasta: przegląd, co apka wyłuskała z adresów (do wspólnego kalendarza rodzinnego idzie samo miasto) ──
    // Własna ramka i własne komponenty (nie "Sec"/"Row" z Settings), żeby pola nie traciły fokusu przy zapisie.
    function CityRowInput({row,onCommit,extra}) {
      const [val,setVal]=useState(row.res.city||"");
      useEffect(()=>{setVal(row.res.city||"");},[row.res.city]);
      const idRef=useRef("fz-cr-"+Math.random().toString(36).slice(2,9));
      return <input list={idRef.current} value={val} placeholder="wpisz miasto" onChange={e=>setVal(e.target.value)} onBlur={()=>{if(val.trim()!==(row.res.city||""))onCommit(row,val.trim());}} onKeyDown={e=>{if(e.key==="Enter")e.target.blur();}} style={{width:150,padding:"8px 10px",border:"1.5px solid #D9E2F0",borderRadius:10,fontSize:14,fontFamily:"inherit",outline:"none",flexShrink:0}}/>;
    }
    function CitySection({patients,setPatients,rentals,setRentals,dk,txt,sub,bg,demo}) {
      const [open,setOpen]=useState(false);
      const [showOk,setShowOk]=useState(false);
      const extra=useMemo(()=>cityCollect(patients,rentals),[patients,rentals]);
      const K=useMemo(()=>cityKnown(extra),[extra]);
      const rows=useMemo(()=>{
        const out=[];
        (patients||[]).filter(p=>p&&!p.anonymized&&!p.archived&&(p.address||cityStored(p))).forEach(p=>out.push({key:"p"+p.id,kind:"p",id:p.id,name:p.name||"",address:p.address||"",res:cityOfPatient(p,K)}));
        // aktywne wypożyczenia klientów bez karty pacjenta
        (rentals||[]).filter(r=>r&&r.status==="aktywne"&&r.address&&!(patients||[]).some(p=>(r.patientId!=null&&p.id===r.patientId)||(r.patientName&&p.name===r.patientName))).forEach(r=>out.push({key:"r"+r.id,kind:"r",id:r.id,name:r.patientName||"",address:r.address,res:cityOfRental(r,patients,K)}));
        return out;
      },[patients,rentals,K]);
      const todo=rows.filter(r=>!r.res.city||r.res.conf!=="ok");
      const sure=rows.filter(r=>r.res.city&&r.res.conf==="ok");
      const commit=(row,v)=>{
        if(row.kind==="p")setPatients(ps=>ps.map(p=>p.id===row.id?{...p,city:v}:p));
        else setRentals(rs=>rs.map(r=>r.id===row.id?{...r,city:v}:r));
      };
      const line=row=><div key={row.key} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid #EFF3FA"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,fontWeight:600}}>{demo?"Pacjent":(row.name||"(bez nazwy)")}</div>
          <div style={{fontSize:12,color:"#7A8FA6",overflowWrap:"anywhere"}}>{maskAddr(demo,row.address)||"brak adresu"}</div>
          {row.res.city&&row.res.conf==="guess"&&<div style={{fontSize:11,color:"#D9822B"}}>domysł z adresu</div>}
        </div>
        <CityRowInput row={row} extra={extra} onCommit={commit}/>
        {row.res.city&&row.res.conf==="guess"&&<button onClick={()=>commit(row,row.res.city)} style={{background:"#3E6FB0",color:"#fff",border:"none",borderRadius:8,padding:"7px 10px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>OK</button>}
      </div>;
      return <div style={{background:bg,borderRadius:16,padding:"4px 16px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:sub,letterSpacing:1,paddingTop:12,paddingBottom:4}}>MIASTA (WSPÓLNY KALENDARZ RODZINNY)</div>
        <div style={{fontSize:13,color:txt,padding:"8px 0",lineHeight:1.5}}>Do kalendarza rodzinnego trafia z pracy samo miasto, wyłuskane z adresów w bazie. Rozpoznane: <b>{sure.length}</b> · do sprawdzenia: <b style={{color:todo.length?"#D9822B":"#3DAA72"}}>{todo.length}</b></div>
        <div style={{paddingBottom:12}}><button onClick={()=>setOpen(true)} style={{background:"#E1E9F5",border:"none",borderRadius:8,padding:"8px 14px",fontSize:13,fontWeight:700,color:"#3E6FB0",cursor:"pointer",fontFamily:"inherit"}}>Sprawdź miasta{todo.length?" ("+todo.length+")":""}</button></div>
        {open&&<Modal title="Miasta z adresów" onClose={()=>setOpen(false)}>
          <div style={{fontSize:13,color:"#7A8FA6",marginBottom:10,lineHeight:1.5}}>Wpisz albo popraw miasto. Puste pole = miasto z adresu. „OK" przy domyśle zatwierdza podpowiedź.</div>
          {todo.length===0&&<div style={{fontSize:14,color:"#3DAA72",fontWeight:600,padding:"8px 0"}}>Wszystkie adresy mają rozpoznane miasto.</div>}
          {todo.map(line)}
          {sure.length>0&&<div style={{marginTop:12}}>
            <button onClick={()=>setShowOk(v=>!v)} style={{background:"none",border:"none",color:"#3E6FB0",fontWeight:600,fontSize:13,cursor:"pointer",padding:0,fontFamily:"inherit"}}>{showOk?"Ukryj rozpoznane":"Pokaż rozpoznane ("+sure.length+")"}</button>
            {showOk&&sure.map(line)}
          </div>}
        </Modal>}
      </div>;
    }
    // Sekcja domyślnych czasów trwania. Celowo osobny komponent z własną ramką (a nie "Sec"/"Row" zdefiniowane wewnątrz Settings,
    // które po każdej zmianie ustawień tworzą się na nowo i zabierałyby fokus z pola, do którego użytkownik właśnie przeszedł)
    function DurSection({settings,setSettings,dk,txt,sub,bg}) {
      const cur=durFromSettings(settings);
      const changed=JSON.stringify(cur)!==JSON.stringify(DUR_DEFAULTS);
      return <div style={{background:bg,borderRadius:16,padding:"4px 16px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,color:sub,letterSpacing:1,paddingTop:12,paddingBottom:4}}>KALENDARZ — DOMYŚLNY CZAS TRWANIA</div>
        {Object.keys(DUR_DEFAULTS).map(k=><DurRow key={k} kind={k} cur={cur[k]} setSettings={setSettings} dk={dk} txt={txt}/>)}
        <div style={{fontSize:12,color:sub,padding:"10px 0 12px",lineHeight:1.5}}>Tyle minut trwa nowy wpis, gdy nie ustawisz inaczej. Przy każdym wpisie godzinę końca można zmienić. Zmiana tutaj nie rusza wpisów z już zapisaną godziną końca.</div>
        {changed&&<div style={{paddingBottom:12}}><button onClick={()=>setSettings(s=>({...s,durations:{...DUR_DEFAULTS}}))} style={{background:"none",border:"none",color:"#3E6FB0",fontWeight:600,fontSize:13,cursor:"pointer",padding:0,fontFamily:"inherit"}}>Przywróć domyślne (60 / 30 / 10 / 60)</button></div>}
      </div>;
    }
    function DurRow({kind,cur,setSettings,dk,txt}) {
      const [val,setVal]=useState(String(cur));
      useEffect(()=>{setVal(String(cur));},[cur]);
      const commit=()=>{const n=durClamp(val);setVal(String(n||cur));if(n&&n!==cur)setSettings(s=>({...s,durations:{...durFromSettings(s),[kind]:n}}));};
      return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${dk?"#1A2840":"#F0F4F8"}`}}>
        <span style={{fontSize:14,color:txt}}>{DUR_LABELS[kind]}</span>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <input inputMode="numeric" value={val} onChange={e=>setVal(e.target.value.replace(/\D/g,"").slice(0,3))} onBlur={commit} onKeyDown={e=>{if(e.key==="Enter")e.target.blur();}} style={{width:64,padding:"7px 8px",textAlign:"right",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:10,fontSize:15,background:dk?"#111826":"#FAFCFD",color:txt,fontFamily:"inherit"}}/>
          <span style={{fontSize:13,color:"#7A8FA6"}}>min</span>
        </div>
      </div>;
    }
    function Settings({dark,setDark,settings,setSettings,exportData,importData,demo,setDemo,setRentals,setFinances,patients,setPatients,rentals}) {
      const dk=dark;
      const bg=dk?"#111826":"#fff";
      const sec=dk?"#0E141F":"#EFF3FA";
      const txt=dk?"#E8F5F5":"#1C2B3A";
      const sub="#7A8FA6";
      const Row=({label,children})=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${dk?"#1A2840":"#F0F4F8"}`}}><span style={{fontSize:14,color:txt}}>{label}</span>{children}</div>;
      const Toggle=({val,onToggle})=><div onClick={onToggle} style={{width:44,height:24,borderRadius:12,background:val?"#3E6FB0":"#D0DCE8",cursor:"pointer",position:"relative",transition:"background 0.2s"}}><div style={{position:"absolute",top:3,left:val?23:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/></div>;
      const Sec=({title,children})=><div style={{background:bg,borderRadius:16,padding:"4px 16px",marginBottom:12}}><div style={{fontSize:11,fontWeight:700,color:sub,letterSpacing:1,paddingTop:12,paddingBottom:4}}>{title}</div>{children}</div>;
      return <div style={{padding:"16px 12px 20px",background:sec,minHeight:"100vh"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:txt,marginBottom:16}}>Ustawienia</div>

        <Sec title="KONTO">
          <Row label="Zalogowany"><span style={{fontSize:13,color:sub}}>✓ aktywna sesja</span></Row>
          <Row label="Wyloguj się">
            <button onClick={()=>{supaSignOut();window.location.reload();}} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Wyloguj</button>
          </Row>
        </Sec>
        <Sec title="WYGLĄD">
          <Row label="Tryb ciemny"><Toggle val={dark} onToggle={()=>setDark(d=>!d)}/></Row>
          <Row label="Tryb demo (ukryj dane)"><Toggle val={demo} onToggle={()=>setDemo(d=>!d)}/></Row>
        </Sec>
        <Sec title="DANE">
          <Row label="Eksport kopii zapasowej">
            <button onClick={exportData} style={{background:"#3E6FB0",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>⬇️ Pobierz JSON</button>
          </Row>
          <Row label="Importuj kopię zapasową">
            <label style={{background:"#E1E9F5",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#3E6FB0",cursor:"pointer"}}>
              ⬆️ Wgraj JSON
              <input type="file" accept=".json" onChange={importData} style={{display:"none"}}/>
            </label>
          </Row>
          <Row label="Ostatnia pobrana kopia">
            <span style={{fontSize:13,color:sub}}>{settings.lastBackupAt?(()=>{const d=Math.floor((Date.now()-new Date(settings.lastBackupAt).getTime())/86400000);return (d<=0?"dziś":d===1?"wczoraj":d+" dni temu")+" ("+new Date(settings.lastBackupAt).toLocaleDateString("pl-PL")+")";})():"jeszcze nie pobrano"}</span>
          </Row>
          <Row label="Przypomnienie o kopii (raz w tygodniu)">
            <Toggle val={settings.backupReminder!==false} onToggle={()=>setSettings(s=>({...s,backupReminder:s.backupReminder===false?true:false}))}/>
          </Row>
        </Sec>
        <DurSection settings={settings} setSettings={setSettings} dk={dk} txt={txt} sub={sub} bg={bg}/>
        <CitySection patients={patients} setPatients={setPatients} rentals={rentals} setRentals={setRentals} dk={dk} txt={txt} sub={sub} bg={bg} demo={demo}/>
        <SecuritySection dk={dk} txt={txt} sub={sub} Row={Row} Sec={Sec}/>
        <Sec title="LINKI — MEDIA SPOŁECZNOŚCIOWE"><SocialLinks settings={settings} setSettings={setSettings} dk={dk} txt={txt} sub={sub} border={dk?"#2A3A56":"#D9E2F0"}/></Sec>
        <Sec title="INFORMACJE">
          <Row label="Wersja aplikacji"><span style={{fontSize:13,color:sub}}>ZubrzyckiFizjo 1.0</span></Row>
        </Sec>
      </div>;
    }
