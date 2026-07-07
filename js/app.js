    // ── APP ───────────────────────────────────────────────────────────────────
    const TABS=[{id:"dashboard",i:I.home,l:"Pulpit"},{id:"patients",i:I.users,l:"Pacjenci"},{id:"rentals",i:I.equip,l:"Sprzęt"},{id:"nfz",i:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",l:"Wózki"},{id:"finances",i:I.fin,l:"Finanse"},{id:"serwis",i:I.wrench,l:"Serwis"},{id:"settings",i:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",l:"Ustawienia"}];

    function useIsDesktop(){
      const [desk,setDesk]=React.useState(()=>window.innerWidth>=900);
      React.useEffect(()=>{const h=()=>setDesk(window.innerWidth>=900);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
      return desk;
    }

    function App({visits,setVisits,patients,setPatients,rentals,setRentals,finances,setFinances,stock,setStock,nfzCases,setNfzCases,todos,setTodos,events,setEvents,dark,setDark,settings,setSettings,exportData,importData,demo,setDemo,budget,setBudget,machines,setMachines,wealth,setWealth}) {
      const [tab,setTab]=useState(()=>{const h=window.location.hash.replace("#","").split("-")[0];return["dashboard","patients","rentals","finances","nfz","serwis","settings"].includes(h)?h:"dashboard";});
      useEffect(()=>{if(tab!=="finances")window.location.replace("#"+tab);},[tab]);
      const [dlRental,setDlRental]=useState(null);
      const [dlReturnTab,setDlReturnTab]=useState("rentals");
      const [dlBackLabel,setDlBackLabel]=useState("Wypożyczalnia");
      const [wozkiSel,setWozkiSel]=useState(null);
      const [rentalsView,setRentalsView]=useState("aktywne");
      const goToRental=(id,returnTab="rentals")=>{setDlReturnTab(returnTab);setDlBackLabel(returnTab==="dashboard"?"Pulpit":"Wypożyczalnia");setDlRental(id);setTab("rentals");};
      const goToWozki=id=>{setWozkiSel(id);setTab("nfz");};
      const allClients=useMemo(()=>{
        const existing=new Set((patients||[]).map(p=>p.name));
        const extras=[];const seen=new Set();
        [...(rentals||[]),...(nfzCases||[])].forEach(item=>{
          const n=item.patientName;
          if(!n||existing.has(n)||seen.has(n))return;
          seen.add(n);
          extras.push({id:'ac-'+n,name:n,phone:item.phone||"",address:item.address||""});
        });
        return [...(patients||[]),...extras];
      },[patients,rentals,nfzCases]);
      const dk=dark;
      const desk=useIsDesktop();

      const [isSaving,setIsSaving]=useState(false);
      useEffect(()=>{
        const h=e=>setIsSaving(e.detail);
        window.addEventListener("fizjo-save",h);
        return()=>window.removeEventListener("fizjo-save",h);
      },[]);
      const [saveError,setSaveError]=useState(false);
      useEffect(()=>{
        const h=e=>setSaveError(e.detail);
        window.addEventListener("fizjo-save-error",h);
        return()=>window.removeEventListener("fizjo-save-error",h);
      },[]);

      const activeRentals=(rentals||[]).filter(r=>r.status==="aktywne").length;
      const todayVisits=(visits||[]).filter(v=>v.date===todayLocal()).length;
      const unpaidCount=(rentals||[]).filter(r=>r.status==="aktywne"&&r.renewable&&(r.cycles||[]).some(c=>!c.paid&&!c.cancelled)).length;

      const content = <>
        {tab==="dashboard"&&<Dashboard visits={visits} setVisits={setVisits} rentals={rentals} setRentals={setRentals} finances={finances} setFinances={setFinances} patients={patients} allClients={allClients} goToRental={id=>goToRental(id,"dashboard")} nfzCases={nfzCases} goToWozki={goToWozki} todos={todos} setTodos={setTodos} events={events} setEvents={setEvents}/>}
        {tab==="patients"&&<Patients patients={patients} setPatients={setPatients} visits={visits} setVisits={setVisits} finances={finances} setFinances={setFinances} rentals={rentals} setRentals={setRentals} nfzCases={nfzCases} allClients={allClients}/>}
        {tab==="rentals"&&<Rentals key={dlRental??0} rentals={rentals} setRentals={setRentals} finances={finances} setFinances={setFinances} patients={patients} setPatients={setPatients} allClients={allClients} initialDetail={dlRental} backLabel={dlBackLabel} onDetailClosed={()=>{setDlRental(null);setDlBackLabel("Wypożyczalnia");setDlReturnTab("rentals");setTab(dlReturnTab);}} rentalsView={rentalsView} setRentalsView={setRentalsView} stock={stock} setStock={setStock} settings={settings}/>}
        {tab==="finances"&&<Finances finances={finances} setFinances={setFinances} visits={visits} setVisits={setVisits} rentals={rentals} setRentals={setRentals} nfzCases={nfzCases} setNfzCases={setNfzCases} budget={budget} setBudget={setBudget} desk={desk} anthropicKey={settings.anthropicKey||""} stock={stock} setStock={setStock} machines={machines} setMachines={setMachines} wealth={wealth} setWealth={setWealth}/>}
        {tab==="nfz"&&<NFZ nfzCases={nfzCases} setNfzCases={setNfzCases} initialSel={wozkiSel} onSelCleared={()=>setWozkiSel(null)} setFinances={setFinances} patients={patients} setPatients={setPatients} allClients={allClients}/>}
        {tab==="serwis"&&<Service rentals={rentals} machines={machines} setMachines={setMachines} setFinances={setFinances}/>}
        {tab==="settings"&&<Settings dark={dark} setDark={setDark} settings={settings} setSettings={setSettings} exportData={exportData} importData={importData} demo={demo} setDemo={setDemo} setRentals={setRentals} setFinances={setFinances}/>}
      </>;

      if(desk) {
        const sb=dk?"#0A1818":"#0F2A2A";
        const sbHov=dk?"#1A3030":"#163333";
        const sbAct="#0A7C7C";
        return <div style={{display:"flex",minHeight:"100vh",background:dk?"#0A1A1A":"#EAEFF4",color:dk?"#E8F5F5":"#1C2B3A"}}>
          {(isSaving||saveError)&&<div style={{position:"fixed",bottom:16,right:16,zIndex:200,background:saveError?"#E05C5C":"#0A7C7C",color:"#fff",borderRadius:10,padding:"8px 14px",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6,boxShadow:"0 4px 16px rgba(0,0,0,.18)"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#fff",opacity:.85,animation:saveError?"none":"spin .8s linear infinite"}}/>
            {saveError?"⚠ Brak połączenia — próbuję dalej zapisać":"Zapisywanie…"}
          </div>}
          {/* Sidebar */}
          <div style={{width:230,flexShrink:0,background:sb,display:"flex",flexDirection:"column",position:"fixed",top:0,left:0,height:"100vh",zIndex:100,boxShadow:"4px 0 24px rgba(0,0,0,.18)",overflow:"hidden"}}>
            {/* Logo */}
            <div style={{padding:"20px 14px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:34,height:34,borderRadius:10,background:"#0A7C7C",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:13,color:"#E8F5F5",letterSpacing:0}}>ZubrzyckiFizjo</div>
                  <div style={{fontSize:11,color:"#5A9A9A",fontWeight:500}}>Panel fizjoterapeuty</div>
                </div>
              </div>
            </div>
            {/* Nav */}
            <nav style={{flex:1,padding:"0 10px",display:"flex",flexDirection:"column",gap:2}}>
              {TABS.map(t=>{
                const active=tab===t.id;
                return <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:12,border:"none",cursor:"pointer",background:active?sbAct:sbHov+"00",fontFamily:"inherit",fontWeight:600,fontSize:14,color:active?"#fff":"#7ABABA",textAlign:"left",width:"100%",transition:"background .15s",WebkitUserSelect:"none"}}
                  onMouseEnter={e=>{if(!active)e.currentTarget.style.background=sbHov;}}
                  onMouseLeave={e=>{if(!active)e.currentTarget.style.background="transparent";}}>
                  <div style={{width:32,height:32,borderRadius:9,background:active?"rgba(255,255,255,.18)":"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Ico d={t.i} s={17} c={active?"#fff":"#5A9A9A"}/>
                  </div>
                  {t.l}
                </button>;
              })}
            </nav>
            {/* Bottom bar in sidebar */}
            <div style={{padding:"16px 14px 24px",borderTop:"1px solid rgba(255,255,255,.06)"}}>
              <div style={{fontSize:11,color:"#3A6060",textAlign:"center"}}>© {new Date().getFullYear()} Patryk Zubrzycki</div>
            </div>
          </div>
          {/* Main content */}
          <div style={{marginLeft:230,flex:1,minWidth:0,minHeight:"100vh",background:dk?"#0A1A1A":"#EAEFF4"}}>
            <div style={{maxWidth:860,margin:"0 auto",minHeight:"100vh",background:dk?"#0F1F1F":"#F2F5F7",boxShadow:dk?"0 0 40px rgba(0,0,0,.18)":"0 0 40px rgba(16,40,40,.05)"}}>
              {content}
            </div>
          </div>
        </div>;
      }

      // Mobile layout
      return <>
        <div style={{maxWidth:480,margin:"0 auto",background:dk?"#0A1A1A":"#F2F5F7",minHeight:"100vh",color:dk?"#E8F5F5":"#1C2B3A",overflowX:"hidden"}}>
          <div style={{paddingBottom:80,minHeight:"100vh"}}>
            {content}
          </div>
          <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:dk?"#0F1F1F":"#fff",borderTop:`1px solid ${dk?"#1A3030":"#E4EAF0"}`,display:"flex",flexDirection:"column",padding:"0 0 16px",zIndex:50,boxShadow:"0 -4px 20px rgba(0,0,0,.08)"}}>
            <div style={{height:(isSaving||saveError)?22:0,overflow:"hidden",transition:"height .2s",background:saveError?"#E05C5C":"#0A7C7C",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#fff",opacity:.8,animation:saveError?"none":"spin .8s linear infinite"}}/>
              <span style={{fontSize:11,fontWeight:600,color:"#fff",letterSpacing:.3}}>{saveError?"⚠ Brak połączenia — próbuję dalej zapisać":"Zapisywanie…"}</span>
            </div>
            <div style={{display:"flex",paddingTop:10}}>
            {TABS.map(t=>{
              return <button key={t.id}
                onClick={()=>setTab(t.id)}
                style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"4px 0",fontFamily:"inherit",userSelect:"none",WebkitUserSelect:"none"}}>
                <div style={{width:40,height:40,borderRadius:12,background:tab===t.id?"#0A7C7C":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}><Ico d={t.i} s={20} c={tab===t.id?"#fff":dk?"#5A8A8A":"#4A6070"}/></div>
                <span style={{fontSize:12,fontWeight:600,color:tab===t.id?"#0A7C7C":dk?"#5A8A8A":"#4A6070"}}>{t.l}</span>
              </button>;
            })}
            </div>
          </div>
        </div>
      </>;
    }

    function AppWithSync({visits,setVisits,patients,setPatients,rentals,setRentals,finances,setFinances,stock,setStock,nfzCases,setNfzCases,todos,setTodos,events,setEvents,dark,setDark,settings,setSettings,exportData,importData,demo,setDemo,budget,setBudget,machines,setMachines,wealth,setWealth,rentalsLoaded,financesLoaded}) {
      // Auto-generate next cycle 30 days after the previous one (or on startDate for new rentals)
      useEffect(()=>{
        if(!rentalsLoaded||!rentals)return;
        const today=todayLocal();
        const currMonthStart=today.slice(0,7)+"-01";
        const needsUpdate=rentals.some(r=>{
          if(r.status!=="aktywne"||!r.renewable)return false;
          const cyc=r.cycles||[];
          if(cyc.length===0){
            if(r.startDate<currMonthStart)return false; // HistoryFill handles old rentals
            return r.startDate<=today;
          }
          const last=[...cyc].sort((a,b)=>(b.dueDate||b.month+"-01").localeCompare(a.dueDate||a.month+"-01"))[0];
          return addDays(last.dueDate||last.month+"-01",30)<=today;
        });
        if(!needsUpdate)return;
        setRentals(rs=>rs.map(r=>{
          if(r.status!=="aktywne"||!r.renewable)return r;
          let cyc=[...(r.cycles||[])];
          if(cyc.length===0){
            if(r.startDate<currMonthStart||r.startDate>today)return r;
            cyc=[{dueDate:r.startDate,month:r.startDate.slice(0,7),amount:+(r.amount||0),paid:false,paidDate:null}];
          }
          let last=[...cyc].sort((a,b)=>(b.dueDate||b.month+"-01").localeCompare(a.dueDate||a.month+"-01"))[0];
          let nd=addDays(last.dueDate||last.month+"-01",30);
          while(nd<=today){
            if(cyc.some(c=>(c.dueDate||c.month+"-01")===nd))break;
            cyc=[...cyc,{dueDate:nd,month:nd.slice(0,7),amount:last.amount,paid:false,paidDate:null}];
            last=cyc[cyc.length-1];nd=addDays(nd,30);
          }
          return cyc.length===(r.cycles||[]).length?r:{...r,cycles:cyc};
        }));
      },[rentalsLoaded,rentals]);
      // Jednorazowe aktywne wypożyczenia wózków → przełącz na odnawialne (cykliczne)
      useEffect(()=>{
        if(!rentalsLoaded||!rentals)return;
        const needsMigration=rentals.some(r=>r.status==="aktywne"&&!r.renewable&&WOZEK_EQUIPMENT.includes(r.equipment));
        if(!needsMigration)return;
        setRentals(rs=>rs.map(r=>(r.status==="aktywne"&&!r.renewable&&WOZEK_EQUIPMENT.includes(r.equipment))?{...r,renewable:true}:r));
      },[rentalsLoaded,rentals]);
      useEffect(()=>{
        if(!rentalsLoaded||!financesLoaded||!visits||!rentals||!finances)return;
        const now=new Date(),ex=new Set(finances.map(f=>f.sourceId).filter(Boolean)),toAdd=[];
        visits.forEach(v=>{
          const sid="visit-"+v.id; if(ex.has(sid))return;
          const done=v.status==="zakończona"||new Date(v.date+"T"+(v.time||"00:00")+":00")<=now;
          if(done)toAdd.push({id:Date.now()+Math.random(),sourceId:sid,date:v.date,type:"przychód",category:"Wizyta",amount:v.price||0,description:"Wizyta – "+v.patientName});
        });
        rentals.forEach(r=>(r.payments||[]).forEach(p=>{
          const sid="payment-"+p.id; if(ex.has(sid))return;
          toAdd.push({id:Date.now()+Math.random(),sourceId:sid,date:p.date,type:"przychód",category:"Wypożyczalnia",amount:p.amount,description:"Wypożyczenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+")"});
        }));
        rentals.forEach(r=>(r.cycles||[]).filter(c=>c.paid&&!c.cancelled).forEach(c=>{
          const sid="cycle-"+r.id+"-"+(c.dueDate||c.month); if(ex.has(sid))return;
          const dueDt=c.dueDate||c.month+"-15";
          const label=new Date(dueDt+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"});
          toAdd.push({id:Date.now()+Math.random(),sourceId:sid,date:c.paidDate||dueDt,type:"przychód",category:"Wypożyczalnia",amount:c.amount,description:"Wypożyczenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+") "+label});
        }));
        if(toAdd.length)setFinances(prev=>[...toAdd,...prev]);
      },[visits,rentals,rentalsLoaded,financesLoaded]);
      return <App visits={visits} setVisits={setVisits} patients={patients} setPatients={setPatients} rentals={rentals} setRentals={setRentals} finances={finances} setFinances={setFinances} stock={stock} setStock={setStock} nfzCases={nfzCases} setNfzCases={setNfzCases} todos={todos} setTodos={setTodos} events={events} setEvents={setEvents} dark={dark} setDark={setDark} settings={settings} setSettings={setSettings} exportData={exportData} importData={importData} demo={demo} setDemo={setDemo} budget={budget} setBudget={setBudget} machines={machines} setMachines={setMachines} wealth={wealth} setWealth={setWealth}/>;
    }
