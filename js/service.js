    // ── SERVICE ───────────────────────────────────────────────────────────────

    function Service({rentals,machines,setMachines,setFinances,stock}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const [selId,setSelId]=useState(null);
      const [showAdd,setShowAdd]=useState(false);
      const [showAddSrv,setShowAddSrv]=useState(null);
      const [editId,setEditId]=useState(null);
      const [confirmDel,setConfirmDel]=useState(null);
      const today=todayLocal();
      const bg=dk?"#111826":"#F4F7FC";
      const borderC=dk?"#1A2840":"#D9E2F0";
      const textC=dk?"#E8F5F5":"#1C2B3A";
      const subC=dk?"#6B84AC":"#7A8FA6";
      const activeEq=getActiveEquipmentNames(stock);

      const emptyMachine=()=>({type:activeEq[0],name:"",serialNo:"",purchaseDate:"",lastServiceDate:"",servicePeriodDays:365,notes:""});
      const emptySrv=()=>({date:today,type:"Przegląd",notes:"",cost:""});
      const [form,setForm]=useState(emptyMachine);
      const [srvForm,setSrvForm]=useState(emptySrv);

      const getStatus=m=>{
        if(!m.lastServiceDate)return "brak";
        const days=Math.round((new Date(today)-new Date(m.lastServiceDate))/86400000);
        const left=(+m.servicePeriodDays||365)-days;
        if(left<0)return "zaległy";
        if(left<30)return "wkrótce";
        return "ok";
      };
      const getDaysLeft=m=>{
        if(!m.lastServiceDate)return null;
        const days=Math.round((new Date(today)-new Date(m.lastServiceDate))/86400000);
        return (+m.servicePeriodDays||365)-days;
      };

      const activeByType=useMemo(()=>{
        const map={};
        (rentals||[]).filter(r=>r.status!=="zakończone"&&(!r.endDate||r.endDate>=today)).forEach(r=>{
          if(!r.equipment)return;
          if(!map[r.equipment])map[r.equipment]=[];
          map[r.equipment].push(r);
        });
        return map;
      },[rentals,today]);

      const rentalCountByType=useMemo(()=>{
        const map={};
        (rentals||[]).forEach(r=>{if(r.equipment)map[r.equipment]=(map[r.equipment]||0)+1;});
        return map;
      },[rentals]);

      const getMachineLoc=m=>{
        const sameType=(machines||[]).filter(x=>x.type===m.type);
        const idx=sameType.findIndex(x=>x.id===m.id);
        const active=[...(activeByType[m.type]||[])].sort((a,b)=>(a.startDate||"").localeCompare(b.startDate||""));
        return active[idx]||null;
      };

      const deleteSrvEntry=(machineId,entryId)=>{
        setMachines(ms=>ms.map(m=>{
          if(m.id!==machineId)return m;
          const log=(m.serviceLog||[]).filter(s=>s.id!==entryId);
          const lastServiceDate=log.length>0?log.reduce((a,b)=>(a.date>b.date?a:b)).date:null;
          return{...m,serviceLog:log,lastServiceDate};
        }));
        setFinances(fs=>fs.filter(f=>f.sourceId!==("serwis-"+machineId+"-"+entryId)));
      };

      const stCol=s=>s==="zaległy"?"#E05C5C":s==="wkrótce"?"#F4A261":s==="ok"?"#3DAA72":"#7A8FA6";
      const stLbl=s=>s==="zaległy"?"zaległy":s==="wkrótce"?"wkrótce":s==="ok"?"OK":"brak danych";

      const needSrv=(machines||[]).filter(m=>["zaległy","wkrótce"].includes(getStatus(m))).length;
      const occupied=(machines||[]).filter(m=>getMachineLoc(m)).length;
      const total=(machines||[]).filter(m=>!m.archived).length;
      const archivedCount=(machines||[]).filter(m=>m.archived).length;
      const [toast,setToast]=useState(null);
      const [showArchived,setShowArchived]=useState(false);

      return <div style={{padding:"0 0 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
          {[{l:"Maszyn",v:total,c:"#3E6FB0"},{l:"U klientów",v:occupied,c:"#2E86AB"},{l:"Serwis",v:needSrv,c:needSrv>0?"#E05C5C":"#3DAA72"}].map((x,i)=>(
            <div key={i} style={{background:x.c+"14",borderRadius:12,padding:"10px 8px",textAlign:"center",border:`1.5px solid ${x.c}30`}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:x.c}}>{demo?"?":x.v}</div>
              <div style={{fontSize:10,color:subC,marginTop:2}}>{x.l}</div>
            </div>
          ))}
        </div>

        {archivedCount>0&&<button onClick={()=>setShowArchived(a=>!a)} style={{display:"block",marginLeft:"auto",marginBottom:10,padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:showArchived?"#7A8FA6":"#D9E2F0",color:showArchived?"#fff":"#7A8FA6",fontFamily:"inherit"}}>📦 {showArchived?"Aktywne":"Archiwum ("+archivedCount+")"}</button>}

        {total===0&&!showArchived&&<Card style={{textAlign:"center",color:subC,padding:28}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Brak maszyn</div>
          <div style={{fontSize:12}}>Dodaj swój sprzęt żeby śledzić serwisy i lokalizację</div>
        </Card>}

        {(machines||[]).filter(m=>!!m.archived===showArchived).map(m=>{
          const status=getStatus(m);
          const loc=getMachineLoc(m);
          const daysLeft=getDaysLeft(m);
          const isSel=selId===m.id;
          const sColor=stCol(status);
          const rentCount=rentalCountByType[m.type]||0;
          return <Card key={m.id} style={{marginBottom:8,padding:0,overflow:"hidden"}}>
            <div onClick={()=>setSelId(isSel?null:m.id)} style={{cursor:"pointer",padding:"12px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:sColor,flexShrink:0,marginTop:2}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:14,color:textC}}>{m.name||m.type}</div>
                  <div style={{fontSize:12,color:subC,marginTop:1}}>
                    {loc?<span style={{color:"#3E6FB0"}}>u {demo?"[klient]":loc.patientName} · zwrot {loc.endDate||"?"}</span>:<span>Wolny</span>}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <Badge color={sColor}>{stLbl(status)}</Badge>
                  <div style={{fontSize:10,color:subC,marginTop:3}}>{rentCount} wynaj.</div>
                </div>
              </div>
              {m.lastServiceDate&&<div style={{marginTop:8,fontSize:11,color:subC}}>
                Ostatni serwis: {m.lastServiceDate}
                {daysLeft!==null&&<span style={{marginLeft:6,color:daysLeft<0?"#E05C5C":daysLeft<30?"#F4A261":subC}}>
                  ({daysLeft<0?Math.abs(daysLeft)+" dni po terminie":daysLeft===0?"dziś":daysLeft+" dni do serwisu"})
                </span>}
              </div>}
            </div>

            {isSel&&<div style={{borderTop:`1px solid ${borderC}`,padding:"12px 14px",background:dk?"#0A1220":"#FAFCFC"}}>
              {(m.serialNo||m.purchaseDate||m.notes)&&<div style={{marginBottom:10}}>
                {m.serialNo&&<div style={{fontSize:12,color:subC,marginBottom:2}}>S/N: {m.serialNo}</div>}
                {m.purchaseDate&&<div style={{fontSize:12,color:subC,marginBottom:2}}>Zakup: {m.purchaseDate}</div>}
                {m.notes&&<div style={{fontSize:12,color:subC}}>{m.notes}</div>}
              </div>}

              <SectionLabel style={{marginBottom:8}}>Historia serwisów</SectionLabel>
              {(m.serviceLog||[]).length===0
                ?<div style={{fontSize:12,color:subC,marginBottom:10}}>Brak wpisów</div>
                :(m.serviceLog||[]).slice().sort((a,b)=>b.date.localeCompare(a.date)).map(s=>(
                  <div key={s.id} style={{background:bg,borderRadius:8,padding:"8px 10px",marginBottom:6,border:`1px solid ${borderC}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontSize:13,fontWeight:600,color:textC}}>{s.type}</div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{fontSize:11,color:subC}}>{s.date}</div>
                        <button onClick={e=>{e.stopPropagation();deleteSrvEntry(m.id,s.id);}} style={{background:"none",border:"none",color:"#E05C5C",fontSize:16,cursor:"pointer",padding:"2px 4px",lineHeight:1}}>×</button>
                      </div>
                    </div>
                    {s.notes&&<div style={{fontSize:12,color:subC,marginTop:2}}>{s.notes}</div>}
                    {+s.cost>0&&<div style={{fontSize:12,color:"#3E6FB0",marginTop:2}}>{s.cost} zł</div>}
                  </div>
              ))}

              {m.archived
                ? <Btn small style={{width:"100%",justifyContent:"center",marginTop:8}} onClick={()=>{setMachines(ms=>ms.map(x=>x.id===m.id?{...x,archived:false}:x));setSelId(null);setToast("Przywrócono maszynę");}}>📦 Przywróć maszynę</Btn>
                : <div style={{display:"flex",gap:8,marginTop:8}}>
                    <Btn small onClick={()=>{setSrvForm(emptySrv());setShowAddSrv(m.id);}} style={{flex:1,justifyContent:"center"}}>+ Serwis</Btn>
                    <Btn small variant="secondary" onClick={()=>{setEditId(m.id);setForm({type:m.type,name:m.name||"",serialNo:m.serialNo||"",purchaseDate:m.purchaseDate||"",lastServiceDate:m.lastServiceDate||"",servicePeriodDays:String(m.servicePeriodDays||365),notes:m.notes||""});}} style={{flex:1,justifyContent:"center"}}>Edytuj</Btn>
                    <Btn small variant="danger" onClick={()=>setConfirmDel(m.id)} style={{justifyContent:"center"}}>Usuń</Btn>
                  </div>
              }
            </div>}
          </Card>;
        })}

        <Btn onClick={()=>{setForm(emptyMachine());setShowAdd(true);}} style={{width:"100%",justifyContent:"center",marginTop:4}}>+ Dodaj maszynę</Btn>

        {(showAdd||editId!==null)&&<Modal title={editId!==null?"Edytuj maszynę":"Nowa maszyna"} onClose={()=>{setShowAdd(false);setEditId(null);}}>
          <Sel label="Typ sprzętu" value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={activeEq.map(e=>({value:e,label:e}))}/>
          <Inp label="Nazwa własna (np. CPM #1)" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="CPM #1"/>
          <Inp label="Numer seryjny" value={form.serialNo} onChange={v=>setForm(f=>({...f,serialNo:v}))} placeholder="opcjonalnie"/>
          <Inp label="Data zakupu" value={form.purchaseDate} onChange={v=>setForm(f=>({...f,purchaseDate:v}))} type="date"/>
          <Inp label="Ostatni serwis" value={form.lastServiceDate} onChange={v=>setForm(f=>({...f,lastServiceDate:v}))} type="date"/>
          <Inp label="Serwis co ile dni" value={String(form.servicePeriodDays)} onChange={v=>setForm(f=>({...f,servicePeriodDays:v}))} type="number"/>
          <Txa label="Notatki" value={form.notes||""} onChange={v=>setForm(f=>({...f,notes:v}))} rows={2}/>
          <Btn onClick={()=>{
            if(editId!==null){
              setMachines(ms=>ms.map(m=>m.id===editId?{...m,...form,servicePeriodDays:+form.servicePeriodDays||365}:m));
              setEditId(null);
            } else {
              setMachines(ms=>[...(ms||[]),{...form,id:Date.now(),servicePeriodDays:+form.servicePeriodDays||365,serviceLog:[]}]);
              setShowAdd(false);
            }
            setToast("Zapisano");
          }} style={{width:"100%",justifyContent:"center"}}>Zapisz</Btn>
        </Modal>}

        {showAddSrv&&<Modal title="Wpis serwisowy" onClose={()=>setShowAddSrv(null)}>
          <Inp label="Data" value={srvForm.date} onChange={v=>setSrvForm(f=>({...f,date:v}))} type="date"/>
          <Sel label="Typ" value={srvForm.type} onChange={v=>setSrvForm(f=>({...f,type:v}))} options={["Przegląd","Naprawa","Wymiana części","Kalibracja","Czyszczenie","Inne"].map(x=>({value:x,label:x}))}/>
          <Txa label="Opis" value={srvForm.notes||""} onChange={v=>setSrvForm(f=>({...f,notes:v}))} rows={2}/>
          <Inp label="Koszt (zł)" value={srvForm.cost} onChange={v=>setSrvForm(f=>({...f,cost:v}))} type="number" placeholder="0"/>
          <Btn onClick={()=>{
            const entry={id:Date.now(),date:srvForm.date,type:srvForm.type,notes:srvForm.notes,cost:+srvForm.cost||0};
            const mach=(machines||[]).find(m=>m.id===showAddSrv);
            setMachines(ms=>ms.map(m=>m.id===showAddSrv?{...m,lastServiceDate:srvForm.date,serviceLog:[...(m.serviceLog||[]),entry]}:m));
            if(+srvForm.cost>0&&mach&&setFinances){
              setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"serwis-"+showAddSrv+"-"+entry.id,date:srvForm.date,type:"koszt",category:"Serwis",amount:+srvForm.cost,description:srvForm.type+(srvForm.notes?" – "+srvForm.notes:"")+" ("+(mach.name||mach.type)+")"},...(fs||[])]);
            }
            setShowAddSrv(null);
            setToast("Serwis dodany");
          }} style={{width:"100%",justifyContent:"center"}}>Zapisz</Btn>
        </Modal>}

        {confirmDel&&<Modal title="Usunąć maszynę?" onClose={()=>setConfirmDel(null)}>
          <div style={{fontSize:14,color:subC,marginBottom:16}}>Maszyna zniknie z listy, ale nic się nie skasuje — historia serwisów i koszty zostają, a maszynę można w każdej chwili przywrócić z Archiwum.</div>
          <div style={{display:"flex",gap:10}}>
            <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(null)}>Anuluj</Btn>
            <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>{setMachines(ms=>ms.map(x=>x.id===confirmDel?{...x,archived:true}:x));setSelId(null);setConfirmDel(null);setToast("Zarchiwizowano maszynę");}}>Usuń</Btn>
          </div>
        </Modal>}

        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      </div>;
    }
