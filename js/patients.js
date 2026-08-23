    // ── PATIENTS ──────────────────────────────────────────────────────────────
    function BirthdayInput({value, onChange}) {
      const dk=useContext(DarkCtx);
      const hasYear=value.length===10;
      const knowYear=value===""?true:hasYear;
      const mmdd=hasYear?value.slice(5):value;
      const mm=mmdd?mmdd.slice(0,2):"";
      const dd=mmdd?mmdd.slice(3):"";
      const sel=(extra={})=>({padding:"9px 12px",borderRadius:10,border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit",outline:"none",...extra});
      const months=["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
      const setMM=(v)=>{const d=dd||"01";knowYear?onChange(value.slice(0,5)+v+"-"+d):onChange(v+"-"+d);};
      const setDD=(v)=>{knowYear?onChange(value.slice(0,8)+v):onChange(mm?mm+"-"+v:"");};
      const setYear=(v)=>{if(mm&&dd)onChange(v+"-"+mm+"-"+dd);};
      const toggleKnowYear=(checked)=>{if(checked){onChange(mm&&dd?todayLocal().slice(0,4)+"-"+mm+"-"+dd:"");}else{onChange(mm&&dd?mm+"-"+dd:"");}};
      return <div style={{marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Data urodzin</div>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <select value={mm} onChange={e=>setMM(e.target.value)} style={{...sel(),flex:2}}>
            <option value="">Miesiąc</option>
            {months.map((m,i)=><option key={i} value={String(i+1).padStart(2,"0")}>{m}</option>)}
          </select>
          <select value={dd} onChange={e=>setDD(e.target.value)} style={{...sel(),flex:1}}>
            <option value="">Dzień</option>
            {Array.from({length:31},(_,i)=><option key={i} value={String(i+1).padStart(2,"0")}>{i+1}</option>)}
          </select>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:knowYear?8:0}}>
          <input type="checkbox" checked={knowYear} onChange={e=>toggleKnowYear(e.target.checked)} style={{width:15,height:15,cursor:"pointer"}}/>
          <span style={{fontSize:12,color:"#7A8FA6",cursor:"pointer"}} onClick={()=>toggleKnowYear(!knowYear)}>Znam rok urodzenia</span>
        </div>
        {knowYear&&<input type="number" min="1900" max={new Date().getFullYear()} value={hasYear?value.slice(0,4):""} onChange={e=>setYear(e.target.value)} placeholder="Rok (np. 1985)" style={{...sel(),width:"100%",boxSizing:"border-box"}}/>}
      </div>;
    }

    function BirthdayCard({birthday, dk}) {
      const today = todayLocal();
      const mmdd=birthday.length===5?birthday:birthday.slice(5);
      const hasYear=birthday.length===10;
      const age=hasYear?+today.slice(0,4)-+birthday.slice(0,4)-(mmdd>today.slice(5)?1:0):null;
      const thisYearBd = today.slice(0,4) + "-" + mmdd;
      const bdDate = new Date(thisYearBd + "T12:00:00");
      const todayDate = new Date(today + "T12:00:00");
      if(bdDate < todayDate) bdDate.setFullYear(bdDate.getFullYear() + 1);
      const daysTo = Math.round((bdDate - todayDate) / 86400000);
      return <Card style={{marginBottom:10,background:"#FFF5F0",border:"1.5px solid #F4A26130"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#F4A261",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Urodziny</div>
        <div style={{fontSize:14,fontWeight:600,color:dk?"#E0F0F0":"#1A2E35"}}>
          {hasYear?new Date(birthday+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"})+" · "+age+" lat":new Date(today.slice(0,4)+"-"+mmdd+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"long"})}
        </div>
        {daysTo<=7&&<div style={{fontSize:12,color:"#F4A261",fontWeight:700,marginTop:4}}>{daysTo===0?"🎂 Dzisiaj!":daysTo===1?"🎂 Jutro!":"🎂 Za "+daysTo+" dni"}</div>}
      </Card>;
    }

    function Patients({patients,setPatients,visits,setVisits,finances,setFinances,rentals,setRentals,nfzCases,setNfzCases,allClients}) {
      const demo=useDemo();
      const dk=useContext(DarkCtx);
      const [selId,setSelId]=useState(null);
      const [showAdd,setShowAdd]=useState(false);
      const [showEdit,setShowEdit]=useState(false);
      const [confirmDelPat,setConfirmDelPat]=useState(false);
      const [editForm,setEditForm]=useState(null);
      const [newForm,setNewForm]=useState({name:"",phone:"",address:"",diagnosis:"",notes:"",defaultPrice:"",birthday:""});
      const [showAddV,setShowAddV]=useState(false);
      const [vf,setVf]=useState(emptyVisit);
      const [editV,setEditV]=useState(null);
      const [confirmDelV,setConfirmDelV]=useState(null);
      const [search,setSearch]=useState("");
      const [sort,setSort]=useState("alpha");
      const [histFilter,setHistFilter]=useState("all");
      const [showArchived,setShowArchived]=useState(false);
      const [pTab,setPTab]=useState("fizjo");
      const [toast,setToast]=useState(null);
      const [showQuickV,setShowQuickV]=useState(false);
      const [quickV,setQuickV]=useState(null);
      const [contactSyncPending,setContactSyncPending]=useState(null);

      const equipClients=useMemo(()=>{
        const byName={};
        (rentals||[]).forEach(r=>{
          if(!r.patientName)return;
          const n=r.patientName;
          if(!byName[n])byName[n]={name:n,phone:"",address:"",rc:0,wc:0,lastDate:""};
          if(r.phone&&!byName[n].phone)byName[n].phone=r.phone;
          if(r.address&&!byName[n].address)byName[n].address=r.address;
          byName[n].rc++;
          if((r.startDate||"")>byName[n].lastDate)byName[n].lastDate=r.startDate||"";
        });
        (nfzCases||[]).forEach(c=>{
          if(!c.patientName)return;
          const n=c.patientName;
          if(!byName[n])byName[n]={name:n,phone:"",address:"",rc:0,wc:0,lastDate:""};
          if(c.phone&&!byName[n].phone)byName[n].phone=c.phone;
          if(c.address&&!byName[n].address)byName[n].address=c.address;
          byName[n].wc++;
          if((c.orderDate||"")>byName[n].lastDate)byName[n].lastDate=c.orderDate||"";
        });
        return Object.values(byName).sort((a,b)=>a.name.localeCompare(b.name,"pl"));
      },[rentals,nfzCases]);

      const pat = selId ? patients.find(p=>p.id===selId) : null;
      if(selId && !pat) { setSelId(null); return null; }

      const patVisits = pat ? visits.filter(v=>v.patientId===pat.id||(v.patientName===pat.name&&!v.patientId)) : [];
      const patRentals = pat ? rentals.filter(r=>r.patientId===pat.id||r.patientName===pat.name) : [];
      const patWozki = pat ? (nfzCases||[]).filter(c=>c.patientId===pat.id||c.patientName===pat.name) : [];
      const history = [...patVisits.map(v=>({...v,_t:"v",_d:v.date||"",_time:v.time||"00:00"})),...patRentals.map(r=>({...r,_t:"r",_d:r.startDate||"",_time:"00:00"})),...patWozki.map(c=>({...c,_t:"w",_d:c.orderDate||"",_time:"00:00"}))].sort((a,b)=>(b._d||"").localeCompare(a._d||"")||(b._time||"").localeCompare(a._time||""));

      const patTotalVisits = pat ? patVisits.filter(v=>visitStatus(v)==="zakończona").reduce((s,v)=>s+(+v.price||0),0) : 0;
      const patTotalRentals = pat ? patRentals.reduce((s,r)=>s+calcRentalPaid(r),0) : 0;
      const patTotalWozki = pat ? patWozki.filter(c=>c.realized).reduce((s,c)=>{const fin=(finances||[]).find(f=>f.sourceId==="wozek-"+c.id);return s+(fin?fin.amount:0);},0) : 0;
      const patTotal = patTotalVisits + patTotalRentals + patTotalWozki;
      const patDoneVisits = pat ? patVisits.filter(v=>visitStatus(v)==="zakończona") : [];
      const patAvgPrice = patDoneVisits.length ? Math.round(patDoneVisits.reduce((s,v)=>s+(+v.price||0),0)/patDoneVisits.length) : 0;
      const patFirstDate = pat ? [...patDoneVisits.map(v=>v.date),...patRentals.map(r=>r.startDate||""),...patWozki.map(c=>c.orderDate||"")].filter(Boolean).sort()[0]||null : null;
      const patSinceMonths = patFirstDate ? Math.round((new Date(todayLocal())-new Date(patFirstDate))/2592000000) : 0;

      const syncFinance = (v,isNew) => {
        const done = v.status==="zakończona"||new Date(v.date+"T"+(v.time||"00:00")+":00")<=new Date();
        if(!done) return;
        const sid="visit-"+v.id;
        setFinances(fs=>{
          const ex=fs.some(f=>f.sourceId===sid);
          if(isNew&&!ex) return [{id:Date.now()+Math.random(),sourceId:sid,date:v.date,type:"przychód",category:"Wizyta",amount:v.price||0,description:"Wizyta – "+v.patientName},...fs];
          if(!isNew) return ex?fs.map(f=>f.sourceId===sid?{...f,amount:v.price,description:"Wizyta – "+v.patientName,date:v.date}:f):[{id:Date.now()+Math.random(),sourceId:sid,date:v.date,type:"przychód",category:"Wizyta",amount:v.price||0,description:"Wizyta – "+v.patientName},...fs];
          return fs;
        });
      };



      if(pat) {
        const maps=pat.address?`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pat.address)}`:null;
        return <>
          <div>
            <button onClick={()=>setSelId(null)} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,color:"#3E6FB0",fontWeight:600,cursor:"pointer",padding:"20px 20px 0",fontFamily:"inherit",fontSize:14}}>
              <Ico d={I.back} s={18} c="#3E6FB0"/> Pacjenci
            </button>
            <div style={{padding:"16px 20px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={pat.name}/>
                  <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800}}>{pat.name}</div><div style={{fontSize:13,color:"#7A8FA6"}}>{pat.phone}</div></div>
                </div>
                <Btn small variant="secondary" onClick={()=>{setEditForm({...pat});setConfirmDelPat(false);setShowEdit(true);}}>✏️ Edytuj</Btn>
              </div>

              <Card style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:pat.address?10:0}}>
                  <div style={{fontSize:14,color:"#7A8FA6"}}>{pat.phone||"Brak telefonu"}</div>
                  {pat.phone&&<div style={{display:"flex",gap:6}}>
                    <a href={`tel:${pat.phone.replace(/\s/g,"")}`} style={{textDecoration:"none"}}><Btn small variant="secondary"><Ico d={I.ph} s={15} c="#3E6FB0"/> Zadzwoń</Btn></a>
                    <a href={`sms:${pat.phone.replace(/\s/g,"")}`} style={{textDecoration:"none"}}><Btn small variant="secondary"><Ico d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" s={15} c="#3E6FB0"/> SMS</Btn></a>
                  </div>}
                </div>
                {pat.address&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:14,color:"#7A8FA6",flex:1,paddingRight:8}}>{pat.address}</div>
                  {maps&&<a href={maps} target="_blank" rel="noreferrer" style={{textDecoration:"none",flexShrink:0}}><Btn small variant="secondary">🗺️ Trasa</Btn></a>}
                </div>}
              </Card>
              {pat.diagnosis&&<Card style={{marginBottom:10,background:"#F0EDFF",border:"1.5px solid #7C6AF430"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#7C6AF4",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Diagnoza</div>
                <div style={{fontSize:14,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{pat.diagnosis}</div>
              </Card>}
              {pat.notes&&<Card style={{marginBottom:10,background:"#FFFBF5",border:"1.5px solid #F4A26130"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#F4A261",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Notatki</div>
                <div style={{fontSize:14,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{pat.notes}</div>
              </Card>}
              {pat.defaultPrice&&<Card style={{marginBottom:10,background:"#F0FFF8",border:"1.5px solid #3DAA7230"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#3DAA72",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Domyślna cena wizyty</div>
                <div style={{fontSize:18,fontWeight:800,color:"#3DAA72"}}>{pat.defaultPrice} zł</div>
              </Card>}
              {pat.birthday&&<BirthdayCard birthday={pat.birthday} dk={dk}/>}

              {(patDoneVisits.length>0||patRentals.length>0||patWozki.length>0)&&<Card style={{marginBottom:10,background:dk?"#18202F":"#F4F7FC",border:"1.5px solid #D9E2F0"}}>
                <SectionLabel>Statystyki</SectionLabel>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[
                    patDoneVisits.length>0?{l:"Wizyty",v:patDoneVisits.length,c:"#3E6FB0"}:{l:"Wypożyczenia",v:patRentals.length,c:"#7C6AF4"},
                    patDoneVisits.length>0?{l:"Śr. cena",v:patAvgPrice+" zł",c:"#7C6AF4"}:{l:"Wózki NFZ",v:patWozki.length,c:"#F4A261"},
                    {l:"Klient od",v:patSinceMonths<1?"<1 mies.":patSinceMonths<12?patSinceMonths+" mies.":(patSinceMonths/12).toFixed(1).replace(".0","")+" lat",c:"#F4A261"},
                  ].map((x,i)=><div key={i} style={{background:x.c+"14",borderRadius:12,padding:"10px 8px",textAlign:"center",border:`1.5px solid ${x.c}30`}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,color:x.c}}>{x.v}</div>
                    <div style={{fontSize:11,color:"#7A8FA6",marginTop:2}}>{x.l}</div>
                  </div>)}
                </div>
              </Card>}
              {patTotal>0&&<Card style={{marginBottom:10,background:"#E1E9F5",border:"1.5px solid #3E6FB030"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#3E6FB0",textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Łącznie zapłacono</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[{l:"Wizyty",v:patTotalVisits,c:"#3E6FB0"},{l:"Wypożyczenia",v:patTotalRentals,c:"#7C6AF4"},{l:"Wózki",v:patTotalWozki,c:"#F4A261"},{l:"Razem",v:patTotal,c:"#1C2B3A"}].map((x,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 8px",textAlign:"center",border:"1.5px solid #D9E2F0"}}>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:x.c}}>{x.v} zł</div>
                      <div style={{fontSize:11,color:"#7A8FA6",marginTop:2}}>{x.l}</div>
                    </div>
                  ))}
                </div>
              </Card>}

              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700}}>Historia ({history.length})</div>
                <Btn small onClick={()=>{setVf({...emptyVisit(),patientName:pat.name,patientId:pat.id,price:pat.defaultPrice?String(pat.defaultPrice):"150"});setShowAddV(true);}}><Ico d={I.plus} s={15} c="#fff"/> Wizyta</Btn>
              </div>
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                {[{k:"all",l:"Wszystko"},{k:"v",l:"Wizyty"},{k:"r",l:"Wypożyczenia"},{k:"w",l:"Wózki"}].map(x=><button key={x.k} onClick={()=>setHistFilter(x.k)} style={{padding:"6px 12px",borderRadius:16,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:histFilter===x.k?"#3E6FB0":"#D9E2F0",color:histFilter===x.k?"#fff":"#7A8FA6",fontFamily:"inherit"}}>{x.l}</button>)}
              </div>
              {history.filter(item=>histFilter==="all"||item._t===histFilter).length===0
                ?<Empty text="Brak wpisów"/>
                :history.filter(item=>histFilter==="all"||item._t===histFilter).map(item=>
                item._t==="v"
                ? <Card key={"v"+item.id} onClick={()=>setEditV({...item,price:String(item.price)})}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:11,fontWeight:700,color:"#3E6FB0",textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Wizyta</div><div style={{fontWeight:600}}>{item.date} · {item.time}</div><div style={{fontSize:13,color:"#7A8FA6"}}>{item.type}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontWeight:600,marginBottom:4}}>{item.price} zł</div><Badge color={visitStatus(item)==="zakończona"?"#3DAA72":"#3E6FB0"}>{visitStatus(item)}</Badge></div>
                    </div>
                    {item.notes&&<div style={{fontSize:12,color:"#7A8FA6",marginTop:8,paddingTop:8,borderTop:"1px solid #EFF3FA",fontStyle:"italic",whiteSpace:"pre-wrap"}}>📝 {item.notes}</div>}
                  </Card>
                : item._t==="r"
                ? <Card key={"r"+item.id} style={{background:"#F0EDFF"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:11,fontWeight:700,color:"#7C6AF4",textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Wypożyczenie</div><div style={{fontWeight:600}}>{item.equipment}</div><div style={{fontSize:13,color:"#7A8FA6"}}>{item.startDate}{item.endDate?" → "+item.endDate:""}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontWeight:600,marginBottom:4}}>{item.amount} zł</div><Badge color={item.status==="zakończone"?"#7A8FA6":"#7C6AF4"}>{item.status}</Badge></div>
                    </div>
                  </Card>
                : <Card key={"w"+item.id} style={{background:"#FFF7ED"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:11,fontWeight:700,color:"#F4A261",textTransform:"uppercase",letterSpacing:.5,marginBottom:2}}>Wózek NFZ</div><div style={{fontWeight:600}}>{item.wheelchairModel||"Model nieznany"}</div><div style={{fontSize:13,color:"#7A8FA6"}}>{item.orderDate||"Brak daty"}{item.hasDisabilityCert?" · orzeczenie":""}</div></div>
                      <Badge color={item.realized?"#3DAA72":"#F4A261"}>{item.realized?"zrealizowany":"oczekuje"}</Badge>
                    </div>
                    {item.notes&&<div style={{fontSize:12,color:"#7A8FA6",marginTop:8,paddingTop:8,borderTop:"1px solid #EFF3FA",fontStyle:"italic",whiteSpace:"pre-wrap"}}>📝 {item.notes}</div>}
                  </Card>
              )}
            </div>
          </div>

          {/* Modal: edytuj pacjenta */}
          {showEdit&&editForm&&<Modal title="Edytuj pacjenta" onClose={()=>{setShowEdit(false);setEditForm(null);setConfirmDelPat(false);}}>
            <Inp label="Imię i nazwisko" value={editForm.name||""} onChange={v=>setEditForm(f=>({...f,name:v}))} placeholder="Jan Kowalski"/>
            <Inp label="Telefon" value={editForm.phone||""} onChange={v=>setEditForm(f=>({...f,phone:v}))} placeholder="600 000 000" type="tel"/>
            <Inp label="Adres" value={editForm.address||""} onChange={v=>setEditForm(f=>({...f,address:v}))} placeholder="ul. Przykładowa 1, Gliwice"/>
            <Txa label="Diagnoza" value={editForm.diagnosis||""} onChange={v=>setEditForm(f=>({...f,diagnosis:v}))} rows={2}/>
            <Txa label="Notatki" value={editForm.notes||""} onChange={v=>setEditForm(f=>({...f,notes:v}))} rows={2}/>
            <Inp label="Domyślna cena wizyty (zł)" value={editForm.defaultPrice||""} onChange={v=>setEditForm(f=>({...f,defaultPrice:v}))} type="number" placeholder="np. 150"/>
            <BirthdayInput value={editForm.birthday||""} onChange={v=>setEditForm(f=>({...f,birthday:v}))}/>
            {!confirmDelPat
              ? <>
                  <Btn style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{
                    const _pid=editForm.id;
                    const orig=patients.find(p=>p.id===_pid);
                    const _old=orig?.name||editForm.name;
                    const _new=editForm.name||_old;
                    setPatients(ps=>ps.map(p=>p.id===_pid?{...p,...editForm}:p));
                    if(_new!==_old){
                      setVisits(vs=>vs.map(v=>v.patientId===_pid?{...v,patientName:_new}:v));
                      setFinances(fs=>fs.map(f=>f.description?{...f,description:f.description.split(_old).join(_new)}:f));
                    }
                    // dowiąż patientId + zaktualizuj nazwę wszędzie, gdzie ta osoba jest rozpoznana (po ID lub starej nazwie)
                    setRentals(rs=>rs.map(r=>(r.patientId===_pid||r.patientName===_old)?{...r,patientName:_new,patientId:_pid}:r));
                    if(setNfzCases)setNfzCases(cs=>(cs||[]).map(c=>(c.patientId===_pid||c.patientName===_old)?{...c,patientName:_new,patientId:_pid}:c));
                    const pending=syncContactOnSave(
                      {kind:"patient",id:_pid,patientId:_pid,patientName:_new,original:{phone:orig?.phone||"",address:orig?.address||""},updated:{phone:editForm.phone||"",address:editForm.address||""}},
                      {patients,setPatients,rentals,setRentals,nfzCases,setNfzCases}
                    );
                    if(pending.length)setContactSyncPending(pending);
                    setShowEdit(false);
                    setEditForm(null);
                    setToast("Zapisano zmiany");
                  }}>Zapisz zmiany</Btn>
                  <Btn variant="secondary" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{setPatients(ps=>ps.map(p=>p.id===editForm.id?{...p,archived:!p.archived}:p));setShowEdit(false);setEditForm(null);setSelId(null);setToast(editForm.archived?"Pacjent przywrócony":"Pacjent zarchiwizowany");}}>📦 {editForm.archived?"Przywróć pacjenta":"Archiwizuj pacjenta"}</Btn>
                  <Btn variant="danger" style={{width:"100%",justifyContent:"center"}} onClick={()=>setConfirmDelPat(true)}>🗑️ Usuń pacjenta</Btn>
                </>
              : <>
                  <div style={{background:"#FEE2E2",borderRadius:12,padding:14,marginBottom:12,fontSize:14,color:"#E05C5C",textAlign:"center",fontWeight:600}}>Na pewno usunąć pacjenta i wszystkie jego dane?</div>
                  <div style={{display:"flex",gap:10}}>
                    <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDelPat(false)}>Anuluj</Btn>
                    <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>{
                      const _pid=editForm.id;
                      const _pn=editForm.name;
                      const _pr=rentals.filter(r=>r.patientId===_pid||r.patientName===_pn);
                      const _vids=visits.filter(v=>v.patientId===_pid).map(v=>v.id);
                      const _pids=_pr.flatMap(r=>(r.payments||[]).map(p=>p.id));
                      const _cids=_pr.flatMap(r=>(r.cycles||[]).map(c=>"cycle-"+r.id+"-"+(c.dueDate||c.month)));
                      const _extPrefixes=_pr.map(r=>"extend-"+r.id+"-");
                      const _transportIds=new Set(_pr.filter(r=>r.transport>0).map(r=>"transport-"+r.id));
                      const _nfzIds=(nfzCases||[]).filter(c=>c.patientId===_pid||c.patientName===_pn).map(c=>"wozek-"+c.id);
                      setVisits(vs=>vs.filter(v=>v.patientId!==_pid));
                      setRentals(rs=>rs.filter(r=>r.patientId!==_pid&&r.patientName!==_pn));
                      setFinances(fs=>fs.filter(f=>!_vids.some(id=>f.sourceId==="visit-"+id)&&!_pids.some(id=>f.sourceId==="payment-"+id)&&!_cids.some(cid=>f.sourceId===cid)&&!_transportIds.has(f.sourceId)&&!_nfzIds.includes(f.sourceId)&&!_extPrefixes.some(pfx=>f.sourceId&&f.sourceId.startsWith(pfx))));
                      if(setNfzCases)setNfzCases(cs=>(cs||[]).filter(c=>c.patientId!==_pid&&c.patientName!==_pn));
                      setPatients(ps=>ps.filter(p=>p.id!==_pid));
                      setShowEdit(false);
                      setEditForm(null);
                      setSelId(null);
                    }}>Tak, usuń</Btn>
                  </div>
                </>
            }
          </Modal>}

          {showAddV&&<Modal title="Nowa wizyta" onClose={()=>setShowAddV(false)}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Inp label="Data" value={vf.date} onChange={v=>setVf(f=>({...f,date:v}))} type="date"/>
              <TimeSel label="Godzina" value={vf.time} onChange={v=>setVf(f=>({...f,time:v}))}/>
            </div>
            <Sel label="Typ" value={vf.type} onChange={v=>setVf(f=>({...f,type:v}))} options={VISIT_TYPES.map(x=>({value:x,label:x}))}/>
            <Inp label="Cena (zł)" value={vf.price} onChange={v=>setVf(f=>({...f,price:v}))} type="number"/>
            <Sel label="Status" value={vf.status} onChange={v=>setVf(f=>({...f,status:v}))} options={[{value:"zaplanowana",label:"📅 Zaplanowana"},{value:"zakończona",label:"✅ Zakończona"}]}/>
            <Txa label="Notatka" value={vf.notes||""} onChange={v=>setVf(f=>({...f,notes:v}))} rows={2} placeholder="Przebieg wizyty, zalecenia..."/>
            <Btn onClick={()=>{const nv={id:Date.now(),patientId:pat.id,patientName:pat.name,...vf,price:+vf.price};setVisits(vs=>[...vs,nv]);syncFinance(nv,true);setShowAddV(false);setToast("Wizyta dodana");}} style={{width:"100%",justifyContent:"center"}}>Zapisz wizytę</Btn>
          </Modal>}

          {editV&&<Modal title="Edytuj wizytę" onClose={()=>setEditV(null)}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Inp label="Data" value={editV.date} onChange={v=>setEditV(f=>({...f,date:v}))} type="date"/>
              <TimeSel label="Godzina" value={editV.time} onChange={v=>setEditV(f=>({...f,time:v}))}/>
            </div>
            <Sel label="Typ" value={editV.type} onChange={v=>setEditV(f=>({...f,type:v}))} options={VISIT_TYPES.map(x=>({value:x,label:x}))}/>
            <Inp label="Cena (zł)" value={editV.price} onChange={v=>setEditV(f=>({...f,price:v}))} type="number"/>
            <Sel label="Status" value={editV.status||"zaplanowana"} onChange={v=>setEditV(f=>({...f,status:v}))} options={[{value:"zaplanowana",label:"📅 Zaplanowana"},{value:"zakończona",label:"✅ Zakończona"}]}/>
            <Txa label="Notatka" value={editV.notes||""} onChange={v=>setEditV(f=>({...f,notes:v}))} rows={2} placeholder="Przebieg wizyty, zalecenia..."/>
            <Btn onClick={()=>{const u={...editV,price:+editV.price};setVisits(vs=>vs.map(v=>v.id===u.id?{...v,...u}:v));syncFinance(u,false);setEditV(null);setToast("Zmiany zapisane");}} style={{width:"100%",justifyContent:"center",marginBottom:8}}>Zapisz zmiany</Btn>
            <Btn variant="secondary" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{setVf({...editV,date:todayLocal(),status:"zaplanowana",price:String(editV.price)});setEditV(null);setShowAddV(true);}}>📋 Powiel wizytę</Btn>
            <Btn variant="danger" onClick={()=>setConfirmDelV(editV.id||"__DEL__")} style={{width:"100%",justifyContent:"center"}}>🗑️ Usuń wizytę</Btn>
          </Modal>}

          {confirmDelV&&<Modal title="Usuń wizytę" onClose={()=>setConfirmDelV(null)}>
            <div style={{fontSize:15,marginBottom:20}}>Na pewno usunąć tę wizytę?</div>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDelV(null)}>Anuluj</Btn>
              <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>{
                if(confirmDelV && confirmDelV!=="__DEL__"){
                  setVisits(vs=>vs.filter(v=>v.id!==confirmDelV));
                  setFinances(fs=>fs.filter(f=>f.sourceId!=="visit-"+confirmDelV));
                } else if(editV){
                  const {date,time,patientName}=editV;
                  setVisits(vs=>vs.filter(v=>!(v.date===date&&v.time===time&&v.patientName===patientName)));
                }
                setConfirmDelV(null);setEditV(null);}}>Usuń</Btn>
            </div>
          </Modal>}
          {contactSyncPending&&<ContactSyncModal items={contactSyncPending} onClose={()=>setContactSyncPending(null)} onConfirm={items=>{applyContactUpdates(items,{setPatients,setRentals,setNfzCases});setContactSyncPending(null);}}/>}
          {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
        </>;
      }

      // Lista pacjentów
      const sl=search.toLowerCase(),sn=search.replace(/\s/g,"");
      const filtered=patients.filter(p=>(!!p.archived)===showArchived&&(p.name.toLowerCase().includes(sl)||(p.phone||"").replace(/\s/g,"").includes(sn)||(p.address||"").toLowerCase().includes(sl)||(p.diagnosis||"").toLowerCase().includes(sl)||(p.notes||"").toLowerCase().includes(sl)));
      const lastVisitDate=p=>visits.filter(v=>v.patientId===p.id).map(v=>v.date).sort((a,b)=>b.localeCompare(a))[0]||"";
      const sorted=[...filtered].sort((a,b)=>sort==="alpha"?a.name.localeCompare(b.name,"pl"):lastVisitDate(b).localeCompare(lastVisitDate(a)));

      const equipFiltered=equipClients.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||(c.phone||"").includes(search));
      return <div>
        <div style={{padding:"28px 20px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800}}>Pacjenci</div>
            <div style={{fontSize:13,color:"#7A8FA6"}}>{patients.filter(p=>!p.archived).length} aktywnych · {patients.filter(p=>p.archived).length} w archiwum</div>
          </div>
          {pTab==="fizjo"&&<Btn small onClick={()=>setShowAdd(true)}><Ico d={I.plus} s={16} c="#fff"/> Nowy</Btn>}
        </div>
        <div style={{display:"flex",gap:6,padding:"0 20px 14px"}}>
          {[{k:"fizjo",l:"Pacjenci"},{k:"sprzet",l:"Klienci sprzętu"}].map(t=><button key={t.k} onClick={()=>{setPTab(t.k);setSearch("");}} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,background:pTab===t.k?"#3E6FB0":"#D9E2F0",color:pTab===t.k?"#fff":"#7A8FA6",fontFamily:"inherit"}}>{t.l}</button>)}
        </div>
        <div style={{padding:"0 20px"}}>
          <Inp value={search} onChange={setSearch} placeholder="🔍 Szukaj..."/>
          {pTab==="fizjo"&&<>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {[{k:"alpha",l:"A–Z"},{k:"recent",l:"Ostatnio aktywni"}].map(x=><button key={x.k} onClick={()=>setSort(x.k)} style={{padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:sort===x.k?"#3E6FB0":"#D9E2F0",color:sort===x.k?"#fff":"#7A8FA6",fontFamily:"inherit"}}>{x.l}</button>)}
              <button onClick={()=>setShowArchived(a=>!a)} style={{padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:showArchived?"#7A8FA6":"#D9E2F0",color:showArchived?"#fff":"#7A8FA6",fontFamily:"inherit",marginLeft:"auto"}}>📦 {showArchived?"Aktywni":"Archiwum"}</button>
            </div>
            {search&&sorted.length===0&&<Empty text="Nie znaleziono pacjenta"/>}
            {sorted.map((p,pi)=>{const lv=lastVisitDate(p);return(<Card key={p.id} onClick={()=>setSelId(p.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <Av name={p.name}/>
                  <div>
                    <div style={{fontWeight:600}}>{maskName(demo,p.name,pi)}</div>
                    <div style={{fontSize:13,color:"#7A8FA6"}}>{maskPhone(demo,p.phone)}</div>
                    {sort==="recent"&&lv&&<div style={{fontSize:11,color:"#3E6FB0",marginTop:2}}>ostatnia wizyta: {lv}</div>}
                  </div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <button onClick={e=>{e.stopPropagation();setQuickV({...emptyVisit(),patientName:p.name,patientId:p.id,price:p.defaultPrice?String(p.defaultPrice):"150"});setShowQuickV(true);}} style={{width:30,height:30,borderRadius:10,background:"#3E6FB0",border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,lineHeight:1}}>+</button>
                  <Ico d="M9 18l6-6-6-6" s={20} c="#7A8FA6"/>
                </div>
              </div>
              {p.diagnosis&&<div style={{fontSize:12,color:"#7A8FA6",marginTop:8,paddingTop:8,borderTop:"1px solid #D9E2F0",whiteSpace:"pre-wrap"}}>{p.diagnosis}</div>}
            </Card>);})}
          </>}
          {pTab==="sprzet"&&<>
            {equipClients.length===0&&<Empty text="Brak klientów sprzętu"/>}
            {search&&equipFiltered.length===0&&equipClients.length>0&&<Empty text="Nie znaleziono"/>}
            {equipFiltered.map((c,ci)=>{
              const inBase=patients.some(p=>p.name===c.name);
              return <Card key={c.name} onClick={()=>{
                const ex=patients.find(p=>p.name===c.name);
                if(ex){setSelId(ex.id);}
                else{const nid=Date.now()+ci;setPatients(ps=>[...(ps||[]),{id:nid,name:c.name,phone:c.phone||"",address:c.address||"",diagnosis:"",notes:"",defaultPrice:"",birthday:""}]);setSelId(nid);}
              }}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <Av name={c.name}/>
                    <div>
                      <div style={{fontWeight:600}}>{demo?"Klient":c.name}</div>
                      <div style={{fontSize:13,color:"#7A8FA6"}}>{demo?"***-***-***":c.phone||"Brak telefonu"}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                    <div style={{display:"flex",gap:4}}>
                      {c.rc>0&&<span style={{fontSize:11,fontWeight:700,background:"#F0EDFF",color:"#7C6AF4",borderRadius:8,padding:"2px 7px"}}>🦾 {c.rc}</span>}
                      {c.wc>0&&<span style={{fontSize:11,fontWeight:700,background:"#FFF7ED",color:"#F4A261",borderRadius:8,padding:"2px 7px"}}>🦽 {c.wc}</span>}
                    </div>
                    {!inBase&&<span style={{fontSize:10,color:"#7A8FA6"}}>kliknij → dodaj profil</span>}
                  </div>
                </div>
              </Card>;
            })}
          </>}
        </div>
        {showAdd&&<Modal title="Nowy pacjent" onClose={()=>setShowAdd(false)}>
          <Inp label="Imię i nazwisko *" value={newForm.name} onChange={v=>setNewForm(f=>({...f,name:v}))} placeholder="Jan Kowalski"/>
          <Inp label="Telefon" value={newForm.phone} onChange={v=>setNewForm(f=>({...f,phone:v}))} placeholder="600 000 000" type="tel"/>
          <Inp label="Adres" value={newForm.address} onChange={v=>setNewForm(f=>({...f,address:v}))} placeholder="ul. Przykładowa 1, Gliwice"/>
          <Txa label="Diagnoza" value={newForm.diagnosis} onChange={v=>setNewForm(f=>({...f,diagnosis:v}))} rows={2}/>
          <Txa label="Notatki" value={newForm.notes} onChange={v=>setNewForm(f=>({...f,notes:v}))} rows={2}/>
          <Inp label="Domyślna cena wizyty (zł)" value={newForm.defaultPrice||""} onChange={v=>setNewForm(f=>({...f,defaultPrice:v}))} type="number" placeholder="np. 150"/>
          <BirthdayInput value={newForm.birthday||""} onChange={v=>setNewForm(f=>({...f,birthday:v}))}/>
          <Btn disabled={!newForm.name} style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(!newForm.name)return;setPatients(ps=>[...ps,{...newForm,id:Date.now()}]);setNewForm({name:"",phone:"",address:"",diagnosis:"",notes:"",defaultPrice:"",birthday:""});setShowAdd(false);}}>Dodaj pacjenta</Btn>
        </Modal>}
        {showQuickV&&quickV&&<Modal title={"Wizyta – "+quickV.patientName} onClose={()=>setShowQuickV(false)}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Inp label="Data" value={quickV.date} onChange={v=>setQuickV(f=>({...f,date:v}))} type="date"/>
            <TimeSel label="Godzina" value={quickV.time} onChange={v=>setQuickV(f=>({...f,time:v}))}/>
          </div>
          <Sel label="Typ" value={quickV.type} onChange={v=>setQuickV(f=>({...f,type:v}))} options={VISIT_TYPES.map(x=>({value:x,label:x}))}/>
          <Inp label="Cena (zł)" value={quickV.price} onChange={v=>setQuickV(f=>({...f,price:v}))} type="number"/>
          <Sel label="Status" value={quickV.status} onChange={v=>setQuickV(f=>({...f,status:v}))} options={[{value:"zaplanowana",label:"📅 Zaplanowana"},{value:"zakończona",label:"✅ Zakończona"}]}/>
          <Txa label="Notatka" value={quickV.notes||""} onChange={v=>setQuickV(f=>({...f,notes:v}))} rows={2} placeholder="Przebieg wizyty, zalecenia..."/>
          <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>{
            const nv={...quickV,id:Date.now(),price:+quickV.price};
            setVisits(vs=>[...vs,nv]);
            const done=nv.status==="zakończona"||new Date(nv.date+"T"+(nv.time||"00:00")+":00")<=new Date();
            if(done)setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"visit-"+nv.id,date:nv.date,type:"przychód",category:"Wizyta",amount:nv.price,description:"Wizyta – "+nv.patientName},...fs]);
            setShowQuickV(false);setToast("Wizyta dodana");
          }}>Zapisz wizytę</Btn>
        </Modal>}
      </div>;
    }
