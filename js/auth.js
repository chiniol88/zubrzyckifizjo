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
      const inputStyle={width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${error?"#E05C5C":dk?"#2A4040":"#E4EAF0"}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:16,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10};
      return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:dk?"#0A1A1A":"#F2F5F7",padding:24}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#0A7C7C",marginBottom:8}}>ZubrzyckiFizjo</div>
        <div style={{fontSize:14,color:"#7A8FA6",marginBottom:32}}>Ustaw nowe hasło</div>
        <div style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:320,boxShadow:"0 4px 20px rgba(0,0,0,.1)"}}>
          {status==="done"
            ? <div style={{textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:12}}>✅</div>
                <div style={{fontWeight:700,fontSize:16,color:dk?"#E8F5F5":"#1C2B3A",marginBottom:8}}>Hasło zmienione!</div>
                <button onClick={()=>{_supaToken=null;sessionStorage.removeItem("fizjo-token");sessionStorage.removeItem("fizjo-refresh");window.location.href=window.location.pathname;}} style={{width:"100%",padding:"13px",borderRadius:12,background:"#0A7C7C",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Zaloguj się</button>
              </div>
            : <>
                <input type="password" value={pwd} onChange={e=>{setPwd(e.target.value);setError("");}} placeholder="Nowe hasło" style={inputStyle}/>
                <input type="password" value={pwd2} onChange={e=>{setPwd2(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSave()} placeholder="Powtórz hasło" style={{...inputStyle,marginBottom:error?6:16}}/>
                {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
                <button onClick={handleSave} disabled={status==="saving"||!pwd||!pwd2} style={{width:"100%",padding:"13px",borderRadius:12,background:"#0A7C7C",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:status==="saving"?"wait":"pointer",fontFamily:"inherit",opacity:status==="saving"?0.7:1}}>
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
      const inputStyle={width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${error?"#E05C5C":dk?"#2A4040":"#E4EAF0"}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:16,fontFamily:"inherit",boxSizing:"border-box",marginBottom:10};
      return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:dk?"#0A1A1A":"#F2F5F7",padding:24}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#0A7C7C",marginBottom:8}}>ZubrzyckiFizjo</div>
        <div style={{fontSize:14,color:"#7A8FA6",marginBottom:32}}>Zaloguj się aby kontynuować</div>
        <div style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:320,boxShadow:"0 4px 20px rgba(0,0,0,.1)"}}>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&check()}
            autoFocus placeholder="Email" style={inputStyle}/>
          <input type="password" value={pwd} onChange={e=>{setPwd(e.target.value);setError("");}}
            onKeyDown={e=>e.key==="Enter"&&check()}
            placeholder="Hasło" style={inputStyle}/>
          {error&&<div style={{fontSize:13,color:"#E05C5C",marginBottom:10}}>{error}</div>}
          <button onClick={check} disabled={loading||!email||!pwd}
            style={{width:"100%",padding:"13px",borderRadius:12,background:"#0A7C7C",color:"#fff",border:"none",fontSize:16,fontWeight:700,cursor:loading?"wait":"pointer",fontFamily:"inherit",opacity:loading?0.7:1}}>
            {loading?"Logowanie...":"Zaloguj się"}
          </button>
        </div>
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

      const [visits,setVisits,v1]=usePersistedState("fizjo-visits",[],unlocked);
      const [patients,setPatients,v2]=usePersistedState("fizjo-patients",[],unlocked);
      // Migracja: nadaj id wizytom które go nie mają — uruchamia się po załadowaniu z Supabase
      React.useEffect(()=>{
        if(!v1) return; // czekaj na załadowanie
        setVisits(vs=>{
          const needsMigration=vs.some(v=>!v.id);
          if(!needsMigration) return vs;
          return vs.map(v=>v.id?v:{...v,id:Date.now()+Math.random()});
        });
      },[v1]);
      React.useEffect(()=>{
        if(!v2) return;
        setPatients(ps=>{
          const needsMigration=ps.some(p=>!p.id);
          if(!needsMigration) return ps;
          return ps.map(p=>p.id?p:{...p,id:Date.now()+Math.random()});
        });
      },[v2]);
      const [rentals,setRentals,v3]=usePersistedState("fizjo-rentals",[],unlocked);
      const [finances,setFinances,v4]=usePersistedState("fizjo-finances",[],unlocked);
      const [stock,setStock,v5]=usePersistedState("fizjo-stock",{},unlocked);
      const [nfzCases,setNfzCases,v6]=usePersistedState("fizjo-nfz",[],unlocked);
      const [todos,setTodos,v7]=usePersistedState("fizjo-todos",[],unlocked);
      const [events,setEvents,v9]=usePersistedState("fizjo-events",[],unlocked);
      const [settings,setSettings,v8]=usePersistedState("fizjo-settings",{backupReminder:true},unlocked);
      const [budget,setBudget,v10]=usePersistedState("fizjo-budget",{},unlocked);
      const [machines,setMachines,v11]=usePersistedState("fizjo-machines",[],unlocked);
      const [dark,setDark]=useState(false);
      const [demo,setDemo]=useState(false);
      const [showBackupBanner,setShowBackupBanner]=useState(false);
      const [showConflictBanner,setShowConflictBanner]=useState(false);

      React.useEffect(()=>{
        const h=()=>setShowConflictBanner(true);
        window.addEventListener("fizjo-conflict",h);
        return()=>window.removeEventListener("fizjo-conflict",h);
      },[]);

      const exportData=()=>{
        const data={visits,patients,rentals,finances,stock,nfzCases,todos,events,budget,exportedAt:new Date().toISOString()};
        const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=url;
        a.download="fizjo-backup-"+new Date().toISOString().slice(0,10)+".json";
        a.click();
        URL.revokeObjectURL(url);
        setShowBackupBanner(false);
      };

      const importData=(e)=>{
        const file=e.target.files[0];
        if(!file)return;
        const reader=new FileReader();
        reader.onload=(ev)=>{
          try{
            const d=JSON.parse(ev.target.result);
            if(d.visits)setVisits(d.visits);
            if(d.patients)setPatients(d.patients);
            if(d.rentals)setRentals(d.rentals);
            if(d.finances)setFinances(d.finances);
            if(d.stock)setStock(d.stock);
            if(d.nfzCases)setNfzCases(d.nfzCases);
            if(d.todos)setTodos(d.todos);
            if(d.events)setEvents(d.events);
            if(d.budget)setBudget(d.budget);
            alert("Import zakończony pomyślnie!");
          }catch(err){alert("Błąd importu: "+err.message);}
        };
        reader.readAsText(file);
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

      if(!authChecked)return<div className="loader"><div className="spinner"/><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#0A7C7C",fontSize:18}}>ZubrzyckiFizjo</div></div>;
      if(isRecovery)return<DarkCtx.Provider value={dark}><PasswordResetScreen/></DarkCtx.Provider>;
      if(!unlocked)return<DarkCtx.Provider value={dark}><LockScreen onUnlock={()=>setUnlocked(true)}/></DarkCtx.Provider>;
      if(!v1||!v2||!v3||!v4||!v5||!v6||!v7||!v10)return<div className="loader"><div className="spinner"/><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#0A7C7C",fontSize:18}}>ZubrzyckiFizjo</div><div style={{fontSize:13,color:"#7A8FA6"}}>Wczytywanie danych...</div></div>;
      return <DarkCtx.Provider value={dark}><DemoCtx.Provider value={demo}>
        <div>
          {showConflictBanner&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#E05C5C",zIndex:10000,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
            <span style={{fontWeight:700,fontSize:13,color:"#fff",flex:1}}>⚠️ Inne urządzenie zapisało zmiany. Możesz stracić swoje dane.</span>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>window.location.reload()} style={{background:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Odśwież</button>
              <button onClick={()=>setShowConflictBanner(false)} style={{background:"transparent",border:"none",fontSize:18,cursor:"pointer",color:"#fff"}}>×</button>
            </div>
          </div>}
          {showBackupBanner&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#F4A261",zIndex:9999,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:13,color:"#1C2B3A"}}>💾 Czas na backup!</span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={exportData} style={{background:"#1C2B3A",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>Pobierz</button>
              <button onClick={()=>setShowBackupBanner(false)} style={{background:"transparent",border:"none",fontSize:18,cursor:"pointer",color:"#1C2B3A"}}>×</button>
            </div>
          </div>}
          <AppWithSync visits={visits} setVisits={setVisits} patients={patients} setPatients={setPatients} rentals={rentals} setRentals={setRentals} finances={finances} setFinances={setFinances} stock={stock} setStock={setStock} nfzCases={nfzCases} setNfzCases={setNfzCases} todos={todos} setTodos={setTodos} events={events} setEvents={setEvents} dark={dark} setDark={setDark} settings={settings} setSettings={setSettings} exportData={exportData} importData={importData} demo={demo} setDemo={setDemo} budget={budget} setBudget={setBudget} machines={machines} setMachines={setMachines} rentalsLoaded={v3} financesLoaded={v4}/>
        </div>
      </DemoCtx.Provider></DarkCtx.Provider>;
    }
