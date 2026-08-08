function nextCycleEnd(r, today) {
  const activeCycles=(r.cycles||[]).filter(c=>!c.cancelled);
  const lastCycle=activeCycles.length?activeCycles.reduce((a,b)=>(b.dueDate||b.month+"-01")>(a.dueDate||a.month+"-01")?b:a):null;
  const lastDue=lastCycle?(lastCycle.dueDate||lastCycle.month+"-01"):null;
  if(lastCycle&&lastDue>=today) return {date:lastDue,cycle:lastCycle};
  const base=lastDue||r.startDate;
  const steps=Math.max(1,Math.ceil(dateDiff(base,today)/30));
  return {date:addDays(base,steps*30),cycle:null};
}

function MiniCalendar({visits,rentals,today,onEditVisit,onAddVisit,onGoToRental,events,setEvents,patients}) {
  const dk=useContext(DarkCtx);
  const demo=useDemo();
  const [calYear,setCalYear]=useState(()=>+today.slice(0,4));
  const [calMonth,setCalMonth]=useState(()=>+today.slice(5,7));
  const [openDay,setOpenDay]=useState(null);
  const [showEvtModal,setShowEvtModal]=useState(false);
  const [evtForm,setEvtForm]=useState({title:"",date:"",allDay:false,time:"10:00",notes:"",address:"",editId:null});
  const [quickRental,setQuickRental]=useState(null);

  const daysInMonth=new Date(calYear,calMonth,0).getDate();
  const firstDow=new Date(calYear,calMonth-1,1).getDay();
  const startOffset=(firstDow+6)%7;
  const monthStr=calYear+"-"+String(calMonth).padStart(2,"0");
  const prevMonthStr=calMonth===1?`${calYear-1}-12`:`${calYear}-${String(calMonth-1).padStart(2,"0")}`;
  const nextMonthStr=calMonth===12?`${calYear+1}-01`:`${calYear}-${String(calMonth+1).padStart(2,"0")}`;
  const prevMonthDays=new Date(calYear,calMonth-1,0).getDate();

  const prevMonth=()=>{if(calMonth===1){setCalYear(y=>y-1);setCalMonth(12);}else setCalMonth(m=>m-1);setOpenDay(null);};
  const nextMonth=()=>{if(calMonth===12){setCalYear(y=>y+1);setCalMonth(1);}else setCalMonth(m=>m+1);setOpenDay(null);};

  const rentalEventsByDay=useMemo(()=>{
    const m={};
    const add=(dateStr,ev)=>{if(!m[dateStr])m[dateStr]=[];m[dateStr].push(ev);};
    const visibleMonths=[prevMonthStr,monthStr,nextMonthStr];
    rentals.forEach(r=>{
      if(r.status==="zakończone"&&!visibleMonths.some(ms=>r.startDate.startsWith(ms))&&!visibleMonths.some(ms=>(r.endDate||"").startsWith(ms)))return;
      if(!r.renewable){
        if(visibleMonths.some(ms=>(r.startDate||"").startsWith(ms)))add(r.startDate,{type:"start",r});
        if(visibleMonths.some(ms=>(r.endDate||"").startsWith(ms)))add(r.endDate,{type:"end",r});
        if(r.plannedReturn&&visibleMonths.some(ms=>r.plannedReturn.startsWith(ms)))add(r.plannedReturn,{type:"plannedReturn",r});
      } else {
        (r.cycles||[]).filter(c=>!c.cancelled).forEach(c=>{
          const cd=c.dueDate||c.month+"-01";
          if(visibleMonths.includes(cd.slice(0,7))){
            add(cd,{type:"cycle",c,r});
          }
        });
        if(visibleMonths.some(ms=>r.startDate.startsWith(ms))&&!(r.cycles||[]).some(c=>(c.dueDate||c.month+"-01").startsWith(r.startDate.slice(0,7)))){
          add(r.startDate,{type:"start",r});
        }
        if(r.plannedReturn&&visibleMonths.some(ms=>r.plannedReturn.startsWith(ms))){
          add(r.plannedReturn,{type:"plannedReturn",r});
        }
        if(r.status==="aktywne"){
          const nce=nextCycleEnd(r,today);
          if(!nce.cycle&&visibleMonths.includes(nce.date.slice(0,7))){
            add(nce.date,{type:"cycleEnd",r});
          }
        }
      }
    });
    return m;
  },[rentals,monthStr,prevMonthStr,nextMonthStr,today]);

  const visitsByDay=useMemo(()=>{
    const m={};
    const visibleMonths=[prevMonthStr,monthStr,nextMonthStr];
    visits.filter(v=>v.date&&visibleMonths.some(ms=>v.date.startsWith(ms))).forEach(v=>{
      if(!m[v.date])m[v.date]=[];
      m[v.date].push(v);
    });
    return m;
  },[visits,monthStr,prevMonthStr,nextMonthStr]);

  const eventsByDay=useMemo(()=>{
    const m={};
    const visibleMonths=[prevMonthStr,monthStr,nextMonthStr];
    (events||[]).filter(e=>e.date&&visibleMonths.some(ms=>e.date.startsWith(ms))).forEach(e=>{
      if(!m[e.date])m[e.date]=[];
      m[e.date].push(e);
    });
    return m;
  },[events,monthStr,prevMonthStr,nextMonthStr]);

  const saveEvt=()=>{
    if(!evtForm.title.trim()||!evtForm.date)return;
    if(evtForm.editId){
      setEvents(es=>(es||[]).map(e=>e.id===evtForm.editId?{...e,title:evtForm.title.trim(),date:evtForm.date,allDay:evtForm.allDay,time:evtForm.allDay?"":evtForm.time,notes:evtForm.notes,address:evtForm.address||""}:e));
    } else {
      setEvents(es=>[...(es||[]),{id:Date.now(),title:evtForm.title.trim(),date:evtForm.date,allDay:evtForm.allDay,time:evtForm.allDay?"":evtForm.time,notes:evtForm.notes,address:evtForm.address||""}]);
    }
    setShowEvtModal(false);
  };

  const DOW=["Pn","Wt","Śr","Cz","Pt","Sb","Nd"];
  const cells=[];
  for(let i=0;i<startOffset;i++)cells.push({d:prevMonthDays-startOffset+1+i,overflow:"prev",ms:prevMonthStr});
  for(let d=1;d<=daysInMonth;d++)cells.push({d,overflow:null,ms:monthStr});
  const remaining=(7-cells.length%7)%7;
  for(let d=1;d<=remaining;d++)cells.push({d,overflow:"next",ms:nextMonthStr});

  const holidays=useMemo(()=>getHolidays(calYear),[calYear]);

  const openDateStr=openDay||null;
  const dayVisits=openDay?(visitsByDay[openDay]||[]).sort((a,b)=>(a.time||"").localeCompare(b.time||"")):[];
  const dayRentals=openDay?(rentalEventsByDay[openDay]||[]):[];
  const dayEvents=openDay?(eventsByDay[openDay]||[]):[];
  const dayAllDay=[
    ...dayEvents.filter(e=>e.allDay).map(x=>({_kind:"event",e:x})),
    ...dayVisits.filter(v=>v.allDay).map(v=>({_kind:"visit",v})),
    ...dayRentals.filter(ev=>(ev.type==="start"?(ev.r.startAllDay||ev.r.allDay):ev.type==="end"?(ev.r.endAllDay||ev.r.allDay):ev.type==="plannedReturn"?(ev.r.plannedReturnAllDay!==false):false)).map(ev=>({_kind:"rental",ev}))
  ].sort((a,b)=>{
    const ta=a._kind==="event"?a.e.title:a._kind==="visit"?a.v.patientName:a.ev.r.patientName;
    const tb=b._kind==="event"?b.e.title:b._kind==="visit"?b.v.patientName:b.ev.r.patientName;
    return ta.localeCompare(tb);
  });
  const dayTimedAll=openDay?[
    ...dayVisits.filter(v=>!v.allDay).map(v=>({_kind:"visit",_time:v.time||"00:00",v})),
    ...dayEvents.filter(e=>!e.allDay).map(e=>({_kind:"event",_time:e.time||"00:00",e})),
    ...dayRentals.filter(ev=>!(ev.type==="start"?(ev.r.startAllDay||ev.r.allDay):ev.type==="end"?(ev.r.endAllDay||ev.r.allDay):ev.type==="plannedReturn"?(ev.r.plannedReturnAllDay!==false):false)).map(ev=>({_kind:"rental",_time:ev.type==="start"?(ev.r.startTime||"00:00"):ev.type==="end"?(ev.r.endTime||"00:00"):ev.type==="plannedReturn"?(ev.r.plannedReturnTime||"00:00"):"00:00",ev}))
  ].sort((a,b)=>a._time.localeCompare(b._time)):[];

  return <div style={{marginTop:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700}}>Kalendarz</div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={prevMonth} style={{background:"#E4EAF0",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <span style={{fontSize:13,fontWeight:600,color:"#1C2B3A",minWidth:100,textAlign:"center",textTransform:"capitalize"}}>{new Date(calYear,calMonth-1,15).toLocaleDateString("pl-PL",{month:"long",year:"numeric"})}</span>
        <button onClick={nextMonth} style={{background:"#E4EAF0",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
      </div>
    </div>

    <div style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,padding:"12px 10px",boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:6}}>
        {DOW.map((d,i)=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:i>=5?(dk?"#F4A261":"#D0622A"):"#7A8FA6",padding:"2px 0"}}>{d}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
        {cells.map(({d,overflow,ms},i)=>{
          const isOverflow=overflow!==null;
          const dateStr=ms+"-"+String(d).padStart(2,"0");
          const vc=(visitsByDay[dateStr]||[]).length;
          const rc=(rentalEventsByDay[dateStr]||[]).length;
          const ec=(eventsByDay[dateStr]||[]).length;
          const isToday=dateStr===today;
          const isOpen=dateStr===openDay;
          const colIndex=i%7;
          const isWeekend=colIndex>=5;
          const isHoliday=!isOverflow&&holidays.has(dateStr);
          const overflowColor=dk?"#2A3A3A":"#C8D4D8";
          const normalBg=isHoliday?(dk?"#5A0A0A":"#FCCFCF"):isWeekend?(dk?"rgba(244,162,97,0.22)":"rgba(244,162,97,0.28)"):"transparent";
          const normalColor=isHoliday?"#B71C1C":isWeekend?(dk?"#F4A261":"#C0622A"):(dk?"#C8E8E8":"#1C2B3A");
          return <div key={dateStr} onClick={()=>setOpenDay(isOpen?null:dateStr)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"5px 2px",borderRadius:10,cursor:"pointer",opacity:isOverflow?0.45:1,background:isOpen?"#0A7C7C":isToday?(dk?"#0A3030":"#E6F4F4"):isOverflow?"transparent":normalBg}}>
            <span style={{fontSize:13,fontWeight:isToday||isOpen?700:400,color:isOpen?"#fff":isToday?"#0A7C7C":isOverflow?overflowColor:normalColor}}>{d}</span>
            <div style={{display:"flex",gap:2,marginTop:2,minHeight:6}}>
              {vc>0&&[...Array(Math.min(vc,2))].map((_,j)=><div key={"v"+j} style={{width:4,height:4,borderRadius:"50%",background:isOpen?"rgba(255,255,255,.8)":"#0A7C7C"}}/>)}
              {rc>0&&[...Array(Math.min(rc,2))].map((_,j)=><div key={"r"+j} style={{width:4,height:4,borderRadius:"50%",background:isOpen?"rgba(255,255,255,.6)":"#7C6AF4"}}/>)}
              {ec>0&&[...Array(Math.min(ec,2))].map((_,j)=><div key={"e"+j} style={{width:4,height:4,borderRadius:"50%",background:isOpen?"rgba(255,255,255,.6)":"#F4A261"}}/>)}
            </div>
          </div>;
        })}
      </div>
      <div style={{display:"flex",gap:12,marginTop:10,paddingTop:8,borderTop:`1px solid ${dk?"#2A4040":"#F2F5F7"}`,justifyContent:"center"}}>
        <span style={{fontSize:11,color:"#7A8FA6",display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:8,borderRadius:"50%",background:"#0A7C7C",display:"inline-block"}}/>Wizyty</span>
        <span style={{fontSize:11,color:"#7A8FA6",display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:8,borderRadius:"50%",background:"#7C6AF4",display:"inline-block"}}/>Wypożyczenia</span>
        <span style={{fontSize:11,color:"#7A8FA6",display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:8,borderRadius:"50%",background:"#F4A261",display:"inline-block"}}/>Wydarzenia</span>
      </div>
    </div>

    {openDay&&<div style={{marginTop:8,background:dk?"#1A2A2A":"#fff",borderRadius:16,padding:"14px 16px",boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontWeight:700,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>{new Date(openDateStr+"T12:00:00").toLocaleDateString("pl-PL",{weekday:"long",day:"numeric",month:"long"})}</div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{setEvtForm({title:"",date:openDateStr,allDay:false,time:"10:00",notes:"",address:"",editId:null});setShowEvtModal(true);}} style={{background:"#FFF4E8",color:"#F4A261",border:"none",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Wydarzenie</button>
          <button onClick={()=>onAddVisit(openDateStr)} style={{background:"#0A7C7C",color:"#fff",border:"none",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Wizyta</button>
        </div>
      </div>

      {openDateStr&&holidays.has(openDateStr)&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`,marginBottom:2}}>
        <span style={{fontSize:16}}>🔴</span>
        <span style={{fontWeight:700,fontSize:14,color:"#B71C1C"}}>{holidays.get(openDateStr)}</span>
      </div>}

      {dayAllDay.length===0&&dayTimedAll.length===0&&
        <div style={{fontSize:13,color:"#7A8FA6",textAlign:"center",padding:"10px 0"}}>Brak zdarzeń tego dnia</div>}

      {dayAllDay.map((item,idx)=>{
        if(item._kind==="event"){const ev=item.e;return <div key={"ad-e"+ev.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
            <div style={{width:6,height:6,borderRadius:2,background:"#F4A261",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>🗓 {ev.title}</div>{ev.notes&&<div style={{fontSize:12,color:"#7A8FA6",whiteSpace:"pre-wrap"}}>{ev.notes}</div>}</div>
          </div>
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            <button onClick={()=>openICS(makeICS(ev.title, ev.date, ev.date, ev.notes||"", true))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#7A8FA6",padding:"2px 4px"}}>📅</button>
            <button onClick={()=>{setEvtForm({title:ev.title,date:ev.date,allDay:ev.allDay,time:ev.time||"10:00",notes:ev.notes||"",address:ev.address||"",editId:ev.id});setShowEvtModal(true);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#7A8FA6",padding:"2px 4px"}}>✏️</button>
            <button onClick={()=>setEvents(es=>(es||[]).filter(e=>e.id!==ev.id))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#E05C5C",padding:"2px 4px"}}>×</button>
          </div>
        </div>;}
        if(item._kind==="visit"){const v=item.v;const pat=(patients||[]).find(p=>p.id===v.patientId);const addr=pat?.address||"";return <div key={"ad-v"+v.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
          <div onClick={()=>onEditVisit(v)} style={{display:"flex",alignItems:"center",gap:10,flex:1,cursor:"pointer"}}>
            <div style={{width:6,height:6,borderRadius:2,background:"#0A7C7C",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>🗓 {demo?"Pacjent":v.patientName}</div>{addr&&<div style={{fontSize:12,color:"#7A8FA6"}}>📍 {addr}</div>}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <Badge color={visitStatus(v)==="zakończona"?"#3DAA72":"#0A7C7C"}>{visitStatus(v)}</Badge>
          </div>
        </div>;}
        if(item._kind==="rental"){const ev=item.ev;const label=ev.type==="start"?"📦 Wydanie":ev.type==="end"?"🔙 Zwrot":ev.type==="plannedReturn"?"🔙 Planowany odbiór":"🔄 Opłata";
          const extDue2=(ev.r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||0),0);
          const totalAmt2=(+ev.r.amount||0)+extDue2;
          const totalPaid2=calcRentalPaid(ev.r);
          const remaining2=totalAmt2-totalPaid2;
          const adSub=ev.r.renewable?null:ev.type==="end"?(remaining2>0?`do zapłaty: ${remaining2} zł`:null):ev.type==="start"?totalAmt2+" zł":null;
          return <div key={"ad-r"+idx} onClick={()=>setQuickRental(ev.r)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`,cursor:"pointer"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
            <div style={{width:6,height:6,borderRadius:2,background:"#7C6AF4",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>🗓 {label} · {ev.r.patientName}</div>{ev.r.address&&<div style={{fontSize:12,color:"#7A8FA6"}}>📍 {ev.r.address}</div>}<div style={{fontSize:12,color:"#7A8FA6"}}>{ev.r.equipment||"❓ Do ustalenia"}</div></div>
          </div>
          {adSub&&<Badge color={ev.type==="end"?"#F4A261":"#7C6AF4"}>{adSub}</Badge>}
        </div>;}
        return null;
      })}

      {dayTimedAll.map((item,idx)=>{
        if(item._kind==="visit"){const v=item.v;const pat=(patients||[]).find(p=>p.id===v.patientId);const addr=pat?.address||"";return <div key={"v"+v.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
          <div onClick={()=>onEditVisit(v)} style={{display:"flex",alignItems:"center",gap:10,flex:1,cursor:"pointer"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#0A7C7C",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>{v.time} · {demo?"Pacjent":v.patientName}</div>{addr&&<div style={{fontSize:12,color:"#7A8FA6"}}>📍 {addr}</div>}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{textAlign:"right"}}><div style={{fontWeight:600,fontSize:13,marginBottom:3,color:dk?"#E8F5F5":"#1C2B3A"}}>{v.price} zł</div><Badge color={visitStatus(v)==="zakończona"?"#3DAA72":"#0A7C7C"}>{visitStatus(v)}</Badge></div>
            <button onClick={()=>openICS(makeICS(v.patientName+" – "+v.type, v.date+"T"+v.time, v.date+"T"+(()=>{const[h,m]=v.time.split(":").map(Number);const e=h*60+m+60;return String(Math.floor(e/60)%24).padStart(2,"0")+":"+String(e%60).padStart(2,"0");})(), "Cena: "+v.price+" zł"+(addr?"\\nAdres: "+addr:""), false))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,padding:"2px 4px",color:"#7A8FA6"}}>📅</button>
          </div>
        </div>;}
        if(item._kind==="event"){const ev=item.e;return <div key={"e"+ev.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#F4A261",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>{ev.time} · {ev.title}</div>{ev.notes&&<div style={{fontSize:12,color:"#7A8FA6",whiteSpace:"pre-wrap"}}>{ev.notes}</div>}</div>
          </div>
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            <button onClick={()=>openICS(makeICS(ev.title, ev.date+"T"+ev.time, ev.date+"T"+ev.time, ev.notes||"", false))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#7A8FA6",padding:"2px 4px"}}>📅</button>
            <button onClick={()=>{setEvtForm({title:ev.title,date:ev.date,allDay:ev.allDay,time:ev.time||"10:00",notes:ev.notes||"",address:ev.address||"",editId:ev.id});setShowEvtModal(true);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#7A8FA6",padding:"2px 4px"}}>✏️</button>
            <button onClick={()=>setEvents(es=>(es||[]).filter(e=>e.id!==ev.id))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#E05C5C",padding:"2px 4px"}}>×</button>
          </div>
        </div>;}
        if(item._kind==="rental"){const ev=item.ev;
          const label=ev.type==="start"?"📦 Wydanie":ev.type==="end"?"🔙 Zwrot":ev.type==="plannedReturn"?"🔙 Planowany odbiór":(ev.type==="cycle"||ev.type==="cycleEnd")?"🔁 Koniec cyklu":"🔄 Opłata";
          const color=ev.type==="end"||ev.type==="plannedReturn"?"#F4A261":ev.type==="cycle"?(ev.c.cancelled?"#7A8FA6":ev.c.paid?"#3DAA72":"#E05C5C"):"#7C6AF4";
          const extDue=(ev.r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||0),0);
          const totalAmt=(+ev.r.amount||0)+extDue;
          const totalPaid=calcRentalPaid(ev.r);
          const remaining=totalAmt-totalPaid;
          const endSub=remaining>0?`do zapłaty: ${remaining} zł`:null;
          const sub=ev.type==="cycle"?(ev.c.cancelled?"anulowany":ev.c.paid?`opłacono ${ev.c.amount} zł`:`do opłacenia ${ev.c.amount} zł`):ev.type==="cycleEnd"?"zbliża się koniec okresu":ev.type==="end"?endSub:ev.type==="plannedReturn"?(remaining>0?`do zapłaty: ${remaining} zł`:null):totalAmt+" zł";
          const timeLabel=ev.type==="start"?(ev.r.startTime||""):ev.type==="end"?(ev.r.endTime||""):ev.type==="plannedReturn"?(ev.r.plannedReturnAllDay===false?(ev.r.plannedReturnTime||"10:00"):""):"";

          const icsStart=ev.type==="start"?ev.r.startDate+"T"+(ev.r.startTime||"10:00"):ev.type==="plannedReturn"?ev.r.plannedReturn+"T"+(ev.r.plannedReturnTime||"10:00"):ev.r.endDate+"T"+(ev.r.endTime||"10:00");
          const icsEnd=ev.type==="start"?ev.r.startDate+"T"+(ev.r.startTime||"10:00"):ev.type==="plannedReturn"?ev.r.plannedReturn+"T"+(ev.r.plannedReturnTime||"10:00"):ev.r.endDate+"T"+(ev.r.endTime||"10:00");
          return <div key={"r"+idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
            <div onClick={()=>setQuickRental(ev.r)} style={{display:"flex",alignItems:"center",gap:10,flex:1,cursor:"pointer"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#7C6AF4",flexShrink:0}}/>
              <div><div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>{timeLabel?timeLabel+" · ":""}{label} · {ev.r.patientName}</div><div style={{fontSize:12,color:"#7A8FA6"}}>{ev.r.equipment||"❓ Do ustalenia"}{ev.r.address?" · 📍"+ev.r.address:""}</div></div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              {sub&&<Badge color={color}>{sub}</Badge>}
              <button onClick={()=>openICS(makeICS(label+" – "+ev.r.patientName+" ("+(ev.r.equipment||"Do ustalenia")+")", icsStart, icsEnd, "Tel: "+(ev.r.phone||"brak")+(ev.r.address?"\\nAdres: "+ev.r.address:""), false))} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#7A8FA6",padding:"2px 4px"}}>📅</button>
            </div>
          </div>;
        }
        return null;
      })}
    </div>}

    {quickRental&&(()=>{const r=quickRental;
      const extDue=(r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||0),0);
      const totalAmt=r.renewable?(+r.amount||0):(+r.amount||0)+extDue;
      const totalPaid=calcRentalPaid(r);
      const remaining=totalAmt-totalPaid;
      const statusColor=r.status==="aktywne"?"#3DAA72":r.status==="zakończone"?"#7A8FA6":"#F4A261";
      return <Modal title="Podgląd wypożyczenia" onClose={()=>setQuickRental(null)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:18,fontWeight:700,color:dk?"#E8F5F5":"#1C2B3A"}}>{r.patientName}</div>
          <Badge color={statusColor}>{r.status}</Badge>
        </div>
        <div style={{background:dk?"#1A3030":"#F7FAFC",borderRadius:12,padding:"12px 14px",marginBottom:12,display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:15}}>📦</span><span style={{fontWeight:600,color:dk?"#E8F5F5":"#1C2B3A"}}>{r.equipment||"❓ Do ustalenia"}</span></div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:13}}>📅</span><span style={{fontSize:13,color:"#7A8FA6"}}>{r.startDate||"—"} → {r.endDate||"—"}</span></div>
          {r.address&&<div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:13}}>📍</span><a href={"https://maps.google.com/?q="+encodeURIComponent(r.address)} target="_blank" rel="noreferrer" style={{fontSize:13,color:"#0A7C7C",textDecoration:"none"}}>{r.address}</a></div>}
          {r.phone&&<div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:13}}>📞</span><a href={"tel:"+r.phone} style={{fontSize:13,color:"#0A7C7C",textDecoration:"none",fontWeight:600}}>{r.phone}</a></div>}
        </div>
        <div style={{background:dk?"#0F2020":"#EFF6FF",borderRadius:12,padding:"12px 14px",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:"#7A8FA6"}}>{r.renewable?"Stawka / mies.":"Kwota całkowita"}</span><span style={{fontWeight:700,color:dk?"#E8F5F5":"#1C2B3A"}}>{totalAmt} zł</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,color:"#7A8FA6"}}>Wpłacono</span><span style={{fontWeight:700,color:"#3DAA72"}}>{totalPaid} zł</span></div>
          {!r.renewable&&remaining>0&&<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,color:"#7A8FA6"}}>Pozostało</span><span style={{fontWeight:700,color:"#E05C5C"}}>{remaining} zł</span></div>}
        </div>
        {r.notes&&<div style={{fontSize:13,color:"#7A8FA6",marginBottom:12,padding:"8px 12px",background:dk?"#1A3030":"#F7FAFC",borderRadius:10,whiteSpace:"pre-wrap"}}>📝 {r.notes}</div>}
        <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>{setQuickRental(null);onGoToRental(r.id);}}>Otwórz pełny widok →</Btn>
      </Modal>;})()}

    {showEvtModal&&<Modal title={evtForm.editId?"Edytuj wydarzenie":"Nowe wydarzenie"} onClose={()=>setShowEvtModal(false)}>
      <Inp label="Tytuł *" value={evtForm.title} onChange={v=>setEvtForm(f=>({...f,title:v}))} placeholder="np. Konferencja, Urlop..."/>
      <Inp label="Data *" value={evtForm.date} onChange={v=>setEvtForm(f=>({...f,date:v}))} type="date"/>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:600,color:"#7A8FA6",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Typ</div>
        <div style={{display:"flex",gap:8}}>
          {[{v:false,l:"⏰ Z godziną"},{v:true,l:"🗓 Całodniowe"}].map(o=><button key={String(o.v)} onClick={()=>setEvtForm(f=>({...f,allDay:o.v}))} style={{flex:1,padding:"10px 8px",borderRadius:12,border:`2px solid ${evtForm.allDay===o.v?"#F4A261":"#E4EAF0"}`,background:evtForm.allDay===o.v?"#FFF4E8":"#fff",color:evtForm.allDay===o.v?"#F4A261":"#7A8FA6",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}
        </div>
      </div>
      {!evtForm.allDay&&<TimeSel label="Godzina" value={evtForm.time||"10:00"} onChange={v=>setEvtForm(f=>({...f,time:v}))}/>}
      <Txa label="Notatka" value={evtForm.notes||""} onChange={v=>setEvtForm(f=>({...f,notes:v}))} rows={2} placeholder="Opcjonalnie..."/>
      <Inp label="Adres" value={evtForm.address||""} onChange={v=>setEvtForm(f=>({...f,address:v}))} placeholder="Opcjonalnie..."/>
      <Btn disabled={!evtForm.title.trim()||!evtForm.date} style={{width:"100%",justifyContent:"center"}} onClick={saveEvt}>{evtForm.editId?"Zapisz zmiany":"Dodaj wydarzenie"}</Btn>
    </Modal>}
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard({visits,setVisits,rentals,setRentals,finances,setFinances,patients,allClients,goToRental,nfzCases,goToWozki,todos,setTodos,events,setEvents}) {
  const demo=useDemo();
  const today = todayLocal();
  const dk=useContext(DarkCtx);
  const [showAdd,setShowAdd]=useState(false);
  const [vf,setVf]=useState(emptyVisit);
  const [editV,setEditV]=useState(null);
  const [confirmDel,setConfirmDel]=useState(null);
  const [toast,setToast]=useState(null);

  const todayV = visits.filter(v=>v.date===today).sort((a,b)=>(a.time||"").localeCompare(b.time||""));
  const reservedRentals = rentals.filter(r=>r.status==="aktywne"&&r.reserved).sort((a,b)=>(a.startDate||"9999").localeCompare(b.startDate||"9999"));
  const upcoming = useMemo(()=>{
    const szyny=rentals.filter(r=>r.status==="aktywne"&&r.endDate&&!r.renewable&&!r.reserved).map(r=>({kind:"szyny",r,date:r.endDate}));
    const cykle=rentals.filter(r=>r.status==="aktywne"&&r.renewable&&!r.reserved).map(r=>({kind:"cykl",r,date:nextCycleEnd(r,today).date}));
    return [...szyny,...cykle].sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
  },[rentals,today]);

  const wózkiReminders = useMemo(()=>{
    if(!nfzCases) return [];
    return (nfzCases).filter(cas=>{
      if(!cas.orderDate) return false;
      const nd = nextOrderDate(cas);
      if(!nd) return false;
      const dl = dateDiff(today, nd);
      return dl <= 14;
    }).sort((a,b)=>nextOrderDate(a).localeCompare(nextOrderDate(b)));
  },[nfzCases, today]);

  const birthdayReminders = useMemo(()=>{
    return (patients||[]).filter(p=>{
      if(!p.birthday||p.archived) return false;
      const mmdd=p.birthday.length===5?p.birthday:p.birthday.slice(5);
      const b=new Date(todayLocal().slice(0,4)+"-"+mmdd+"T12:00:00");
      const t=new Date(todayLocal()+"T12:00:00");
      if(b<t) b.setFullYear(b.getFullYear()+1);
      return Math.round((b-t)/86400000)<=7;
    }).map(p=>{
      const mmdd=p.birthday.length===5?p.birthday:p.birthday.slice(5);
      const b=new Date(todayLocal().slice(0,4)+"-"+mmdd+"T12:00:00");
      const t=new Date(todayLocal()+"T12:00:00");
      if(b<t) b.setFullYear(b.getFullYear()+1);
      const days=Math.round((b-t)/86400000);
      const hasYear=p.birthday.length===10;
      const age=hasYear?+todayLocal().slice(0,4)-+p.birthday.slice(0,4)-(mmdd<todayLocal().slice(5)?0:mmdd===todayLocal().slice(5)?0:1):null;
      return {...p,_days:days,_age:age};
    }).sort((a,b)=>a._days-b._days);
  },[patients,today]);

  const syncFinance = (v, isNew=false) => {
    const done = v.status==="zakończona" || new Date(v.date+"T"+(v.time||"00:00")+":00")<=new Date();
    if(!done) return;
    const sid = "visit-"+v.id;
    setFinances(fs=>{
      const exists = fs.some(f=>f.sourceId===sid);
      if(isNew && !exists) return [{id:Date.now()+Math.random(),sourceId:sid,date:v.date,type:"przychód",category:"Wizyta",amount:v.price||0,description:"Wizyta – "+v.patientName},...fs];
      if(!isNew && exists) return fs.map(f=>f.sourceId===sid?{...f,amount:v.price,description:"Wizyta – "+v.patientName,date:v.date}:f);
      if(!isNew && !exists) return [{id:Date.now()+Math.random(),sourceId:sid,date:v.date,type:"przychód",category:"Wizyta",amount:v.price||0,description:"Wizyta – "+v.patientName},...fs];
      return fs;
    });
  };

  const saveNew = () => {
    if(!vf.patientName) return;
    const pat=patients.find(p=>p.name===vf.patientName);
    const nv={id:Date.now(),...vf,price:+vf.price,patientId:pat?.id||null};
    setVisits(vs=>[...vs,nv]);
    syncFinance(nv,true);
    setShowAdd(false); setVf(emptyVisit()); setToast("Wizyta zapisana");
  };
  const saveEdit = () => {
    if(!editV) return;
    const u={...editV,price:+editV.price};
    if(u.id) {
      setVisits(vs=>vs.map(v=>v.id===u.id?{...v,...u}:v));
    } else {
      // stara wizyta bez id — dopasuj po date+time+patientName
      setVisits(vs=>vs.map(v=>(!v.id&&v.date===u.date&&v.time===u.time&&v.patientName===u.patientName)?{...v,...u}:v));
    }
    syncFinance(u,false);
    setEditV(null); setToast("Zmiany zapisane");
  };
  const delVisit = id => {
    if(id && id!=="__DEL__") {
      setVisits(vs=>vs.filter(v=>v.id!==id));
      setFinances(fs=>fs.filter(f=>f.sourceId!=="visit-"+id));
    } else if(editV) {
      const {date,time,patientName}=editV;
      setVisits(vs=>vs.filter(v=>!(v.date===date&&v.time===time&&v.patientName===patientName)));
    }
    setConfirmDel(null); setEditV(null);
  };

  const [searchQ,setSearchQ]=useState("");
  const searchResults=useMemo(()=>{
    const q=(searchQ||"").trim().toLowerCase();
    if(q.length<2) return null;
    const res=[];
    const patByName=Object.fromEntries((allClients||patients||[]).map(p=>[p.name,p]));
    // wizyty
    visits.filter(v=>{
      const pat=patByName[v.patientName]||{};
      return (v.patientName||"").toLowerCase().includes(q)||(v.notes||"").toLowerCase().includes(q)||(v.type||"").toLowerCase().includes(q)||((pat.phone||"").replace(/\s/g,"").includes(q.replace(/\s/g,"")));
    }).slice(0,5).forEach(v=>{
      const pat=patByName[v.patientName]||{};
      res.push({kind:"visit",label:"Wizyta",title:(v.allDay?"🗓 ":"⏰ ")+(v.time?v.time+" · ":"")+v.patientName,sub:v.date+" · "+v.type+(v.price?" · "+v.price+" zł":"")+(pat.phone?" · 📞 "+pat.phone:""),item:v});
    });
    // wypożyczenia
    rentals.filter(r=>(r.patientName||"").toLowerCase().includes(q)||(r.equipment||"").toLowerCase().includes(q)||(r.address||"").toLowerCase().includes(q)||((r.phone||"").replace(/\s/g,"").includes(q.replace(/\s/g,"")))).slice(0,5).forEach(r=>res.push({kind:"rental",label:"Sprzęt",title:"📦 "+r.patientName+" – "+(r.equipment||"Do ustalenia"),sub:r.startDate+(r.endDate?" → "+r.endDate:"")+" · "+(r.status||"")+(r.phone?" · 📞 "+r.phone:""),item:r}));
    // pacjenci
    (allClients||patients||[]).filter(p=>(p.name||"").toLowerCase().includes(q)||(p.phone||"").replace(/\s/g,"").includes(q.replace(/\s/g,""))||(p.address||"").toLowerCase().includes(q)).slice(0,3).forEach(p=>res.push({kind:"patient",label:"Klient",title:"👤 "+p.name,sub:(p.phone?"📞 "+p.phone:"")+(p.address?" · "+p.address:""),item:p}));
    // wydarzenia
    events.filter(e=>(e.title||"").toLowerCase().includes(q)||(e.notes||"").toLowerCase().includes(q)).slice(0,3).forEach(e=>res.push({kind:"event",label:"Wydarzenie",title:"📌 "+e.title,sub:e.date+(e.time?" · "+e.time:""),item:e}));
    return res;
  },[searchQ,visits,rentals,patients,events]);
  const [todoInput,setTodoInput]=useState("");
  const [todoOpen,setTodoOpen]=useState(false);
  const [editTodoId,setEditTodoId]=useState(null);
  const [editTodoText,setEditTodoText]=useState("");

  return <>
    <div>
      <div style={{padding:"28px 20px 18px"}}>
        <div style={{fontSize:13,color:"#7A8FA6",textTransform:"capitalize"}}>{new Date(today+"T12:00:00").toLocaleDateString("pl-PL",{weekday:"long",day:"numeric",month:"long"})}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:2}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800}}>{dk?"🌙 Cześć, Patryk":"Cześć, Patryk"}</div>
          <span style={{fontWeight:600,color:"#0A7C7C",fontSize:14}}><ClockDisplay/></span>
        </div>
      </div>
      <div style={{padding:"0 20px 12px"}}>
        <div style={{position:"relative"}}>
          <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="🔍 Szukaj wizyt, sprzętu, pacjentów..." style={{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:12,border:"1.5px solid "+(dk?"#2A4040":"#E4EAF0"),background:dk?"#1A2A2A":"#F7FAFA",fontSize:14,color:dk?"#E0F0F0":"#1A2E35",fontFamily:"inherit",outline:"none"}}/>
          {searchQ&&<button onClick={()=>setSearchQ("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:16,cursor:"pointer",color:"#7A8FA6"}}>✕</button>}
        </div>
        {searchResults&&searchResults.length===0&&<div style={{padding:"10px 4px",fontSize:13,color:"#7A8FA6"}}>Brak wyników</div>}
        {searchResults&&searchResults.length>0&&<div style={{background:dk?"#1A2A2A":"#fff",borderRadius:12,boxShadow:dk?"0 4px 20px rgba(0,0,0,.3)":"0 4px 20px rgba(16,40,40,.1)",marginTop:6,overflow:"hidden"}}>
          {searchResults.map((r,i)=><div key={i} onClick={()=>{
            if(r.kind==="rental") goToRental(r.item.id);
            else if(r.kind==="visit") setEditV(r.item);
            setSearchQ("");
          }} style={{padding:"10px 14px",borderBottom:i<searchResults.length-1?"1px solid "+(dk?"#2A4040":"#F0F4F8"):"none",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10,fontWeight:700,color:"#0A7C7C",background:"#E6F4F4",padding:"2px 6px",borderRadius:6}}>{r.label}</span>
              <span style={{fontSize:13,fontWeight:600,color:dk?"#E0F0F0":"#1A2E35"}}>{r.title}</span>
            </div>
            <div style={{fontSize:12,color:"#7A8FA6",marginTop:2}}>{r.sub}</div>
          </div>)}
        </div>}
      </div>
      <div style={{padding:"0 20px 4px"}}>
        <div style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden",marginBottom:10}}>
          <div onClick={()=>setTodoOpen(o=>!o)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <SectionLabel style={{marginBottom:0}}>Do zrobienia</SectionLabel>
              {(todos||[]).filter(t=>!t.done).length>0&&<span style={{background:"#0A7C7C",color:"#fff",borderRadius:20,fontSize:11,fontWeight:700,padding:"1px 7px"}}>{(todos||[]).filter(t=>!t.done).length}</span>}
            </div>
            <span style={{fontSize:11,color:"#7A8FA6"}}>{todoOpen?"▲":"▼"}</span>
          </div>
          {todoOpen&&<div style={{borderTop:`1px solid ${dk?"#2A4040":"#F2F5F7"}`,padding:"10px 16px 14px"}}>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input value={todoInput} onChange={e=>setTodoInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&todoInput.trim()){setTodos(ts=>[...(ts||[]),{id:Date.now(),text:todoInput.trim(),done:false}]);setTodoInput("");}}}
                placeholder="Wpisz zadanie i naciśnij Enter..."
                style={{flex:1,padding:"9px 12px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:10,fontSize:14,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
              <button onClick={()=>{if(todoInput.trim()){setTodos(ts=>[...(ts||[]),{id:Date.now(),text:todoInput.trim(),done:false}]);setTodoInput("");}}}
                style={{background:"#0A7C7C",color:"#fff",border:"none",borderRadius:10,padding:"9px 14px",fontSize:18,cursor:"pointer",lineHeight:1}}>+</button>
            </div>
            {(todos||[]).length===0&&<div style={{fontSize:13,color:"#7A8FA6",textAlign:"center",padding:"8px 0"}}>Brak zadań</div>}
            {(todos||[]).map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
              <div onClick={()=>setTodos(ts=>(ts||[]).map(x=>x.id===t.id?{...x,done:!x.done}:x))}
                style={{width:20,height:20,borderRadius:6,border:`2px solid ${t.done?"#3DAA72":"#E4EAF0"}`,background:t.done?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer"}}>
                {t.done&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
              </div>
              {editTodoId===t.id
                ? <input autoFocus value={editTodoText} onChange={e=>setEditTodoText(e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter"&&editTodoText.trim()){setTodos(ts=>(ts||[]).map(x=>x.id===t.id?{...x,text:editTodoText.trim()}:x));setEditTodoId(null);}if(e.key==="Escape")setEditTodoId(null);}}
                    onBlur={()=>{if(editTodoText.trim())setTodos(ts=>(ts||[]).map(x=>x.id===t.id?{...x,text:editTodoText.trim()}:x));setEditTodoId(null);}}
                    style={{flex:1,padding:"4px 8px",border:`1.5px solid #0A7C7C`,borderRadius:8,fontSize:14,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
                : <span onDoubleClick={()=>{setEditTodoId(t.id);setEditTodoText(t.text);}} style={{flex:1,fontSize:14,color:t.done?"#7A8FA6":(dk?"#E8F5F5":"#1C2B3A"),textDecoration:t.done?"line-through":"none",cursor:"text"}}>{t.text}</span>
              }
              <button onClick={()=>setTodos(ts=>(ts||[]).filter(x=>x.id!==t.id))}
                style={{background:"none",border:"none",color:"#7A8FA6",fontSize:16,cursor:"pointer",padding:"0 2px",lineHeight:1}}>×</button>
            </div>)}
            {(todos||[]).some(t=>t.done)&&<button onClick={()=>setTodos(ts=>(ts||[]).filter(x=>!x.done))}
              style={{background:"none",border:"none",fontSize:12,color:"#7A8FA6",cursor:"pointer",fontFamily:"inherit",padding:"8px 0 0",fontWeight:600}}>Usuń ukończone</button>}
          </div>}
        </div>
      </div>
      <div style={{padding:"0 20px"}}>
        <MiniCalendar visits={visits} rentals={rentals} today={today} events={events} setEvents={setEvents} patients={patients}
          onEditVisit={v=>setEditV({...v,price:String(v.price)})}
          onAddVisit={date=>{ setVf({...emptyVisit(),date}); setShowAdd(true); }}
          onGoToRental={goToRental}
        />
        {(upcoming.length>0||wózkiReminders.length>0||birthdayReminders.length>0||reservedRentals.length>0)&&<>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,marginBottom:10,marginTop:8}}>Nadchodzące</div>
          {reservedRentals.map(r=>{
            const startDl=r.startDate?dateDiff(today,r.startDate):null;
            const waitDays=r.reservedAt?dateDiff(r.reservedAt,today):0;
            return <Card key={"res-"+r.id} onClick={()=>goToRental(r.id)} style={{borderLeft:"3px solid #7C6AF4"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:600}}>📋 {r.equipment||"❓ Do ustalenia"}</div>
                  <div style={{fontSize:13,color:"#7A8FA6"}}>{demo?"Pacjent":r.patientName}{r.startDate?" · od "+r.startDate:""}</div>
                </div>
                <Badge color={startDl!==null?(startDl<0?"#E05C5C":startDl===0?"#F4A261":"#7C6AF4"):"#F4A261"}>
                  {startDl!==null?(startDl<0?Math.abs(startDl)+"d po term.":startDl===0?"Dziś!":"za "+startDl+"d"):"czeka "+waitDays+"d"}
                </Badge>
              </div>
            </Card>;
          })}
          {birthdayReminders.map(p=><Card key={"bd-"+p.id} style={{background:"#FFF5F0",border:"1.5px solid #F4A26130"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontWeight:600}}>🎂 {demo?"Pacjent":p.name}</div>
                <div style={{fontSize:13,color:"#7A8FA6"}}>{p._age} lat · {p.birthday.slice(5).split("-").reverse().join(".")}</div>
              </div>
              <Badge color={p._days===0?"#F4A261":p._days<=3?"#F4A261":"#3DAA72"}>{p._days===0?"Dziś!":p._days===1?"Jutro":"Za "+p._days+" dni"}</Badge>
            </div>
          </Card>)}
          {upcoming.map(({kind,r,date})=>{const d=dateDiff(today,date);
            const extDue=(r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||0),0);
            const totalAmt=(+r.amount||0)+extDue;
            const totalPaid=calcRentalPaid(r);
            const remaining=totalAmt-totalPaid;
            return(
            <Card key={kind+"-"+r.id} onClick={()=>goToRental(r.id)} style={kind==="cykl"?{borderLeft:"3px solid #7C6AF4"}:undefined}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:600}}>{kind==="cykl"?"🔁 ":""}{r.equipment||"❓ Do ustalenia"}</div><div style={{fontSize:13,color:"#7A8FA6"}}>{demo?"Pacjent":r.patientName} · {date}</div></div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                  <Badge color={d<0?"#E05C5C":d===0?"#F4A261":d<7?"#F4A261":"#3DAA72"}>{d<0?Math.abs(d)+"d po term.":d===0?"Dziś!":d+"d"}</Badge>
                  {kind==="szyny"&&remaining>0&&<Badge color="#E05C5C">{demo?"****":remaining+" zł"}</Badge>}
                </div>
              </div>
            </Card>
          );})}
          {wózkiReminders.map(cas=>{
            const nd=nextOrderDate(cas);
            const dl=dateDiff(today,nd);
            return <Card key={cas.id} onClick={()=>goToWozki(cas.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:600}}>🦽 {cas.patientName}</div>
                  <div style={{fontSize:13,color:"#7A8FA6"}}>{cas.hasDisabilityCert?"Z orzeczeniem":"Bez orzeczenia"} · kolejne od {nd}</div>
                </div>
                <span style={{fontSize:13,fontWeight:600,color:"#1C2B3A"}}>{dl<=0?"można złożyć":"za "+dl+"d"}</span>
              </div>
            </Card>;
          })}
        </>}
      </div>
    </div>

    {showAdd&&<Modal title="Nowa wizyta" onClose={()=>setShowAdd(false)}>
      <PatientPicker label="Pacjent *" value={vf.patientName} onChange={v=>setVf(f=>({...f,patientName:v}))} onSelect={p=>setVf(f=>({...f,patientName:p.name,patientId:p.id,price:p.defaultPrice?String(p.defaultPrice):f.price}))} patients={allClients||patients}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Inp label="Data" value={vf.date} onChange={v=>setVf(f=>({...f,date:v}))} type="date"/>
        {!vf.allDay&&<TimeSel label="Godzina" value={vf.time} onChange={v=>setVf(f=>({...f,time:v}))}/>}
      </div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",gap:8}}>{[{v:false,l:"⏰ Z godziną"},{v:true,l:"🗓 Całodniowe"}].map(o=><button key={String(o.v)} onClick={()=>setVf(f=>({...f,allDay:o.v}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${(vf.allDay||false)===o.v?"#0A7C7C":"#E4EAF0"}`,background:(vf.allDay||false)===o.v?"#E6F4F4":"#fff",color:(vf.allDay||false)===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
      </div>
      <Sel label="Typ" value={vf.type} onChange={v=>setVf(f=>({...f,type:v}))} options={VISIT_TYPES.map(x=>({value:x,label:x}))}/>
      <Inp label="Cena (zł)" value={vf.price} onChange={v=>setVf(f=>({...f,price:v}))} type="number"/>
      <Sel label="Status" value={vf.status} onChange={v=>setVf(f=>({...f,status:v}))} options={[{value:"zaplanowana",label:"📅 Zaplanowana"},{value:"zakończona",label:"✅ Zakończona"}]}/>
      <Txa label="Notatka" value={vf.notes||""} onChange={v=>setVf(f=>({...f,notes:v}))} rows={2} placeholder="Przebieg wizyty, zalecenia..."/>
      <Btn onClick={saveNew} disabled={!vf.patientName} style={{width:"100%",justifyContent:"center"}}>Zapisz wizytę</Btn>
    </Modal>}

    {editV&&<Modal title="Edytuj wizytę" onClose={()=>setEditV(null)}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Inp label="Data" value={editV.date} onChange={v=>setEditV(f=>({...f,date:v}))} type="date"/>
        {!editV.allDay&&<TimeSel label="Godzina" value={editV.time} onChange={v=>setEditV(f=>({...f,time:v}))}/>}
      </div>
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",gap:8}}>{[{v:false,l:"⏰ Z godziną"},{v:true,l:"🗓 Całodniowe"}].map(o=><button key={String(o.v)} onClick={()=>setEditV(f=>({...f,allDay:o.v}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${(editV.allDay||false)===o.v?"#0A7C7C":"#E4EAF0"}`,background:(editV.allDay||false)===o.v?"#E6F4F4":"#fff",color:(editV.allDay||false)===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
      </div>
      <Sel label="Typ" value={editV.type} onChange={v=>setEditV(f=>({...f,type:v}))} options={VISIT_TYPES.map(x=>({value:x,label:x}))}/>
      <Inp label="Cena (zł)" value={editV.price} onChange={v=>setEditV(f=>({...f,price:v}))} type="number"/>
      <Sel label="Status" value={editV.status||"zaplanowana"} onChange={v=>setEditV(f=>({...f,status:v}))} options={[{value:"zaplanowana",label:"📅 Zaplanowana"},{value:"zakończona",label:"✅ Zakończona"}]}/>
      <Txa label="Notatka" value={editV.notes||""} onChange={v=>setEditV(f=>({...f,notes:v}))} rows={2} placeholder="Przebieg wizyty, zalecenia..."/>          <Btn onClick={saveEdit} style={{width:"100%",justifyContent:"center",marginBottom:8}}>Zapisz zmiany</Btn>
      <Btn variant="secondary" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{setVf({...editV,id:undefined,date:todayLocal(),status:"zaplanowana",price:String(editV.price)});setEditV(null);setShowAdd(true);}}>📋 Powiel wizytę</Btn>
      <Btn variant="danger" onClick={()=>setConfirmDel(editV.id||"__DEL__")} style={{width:"100%",justifyContent:"center"}}>🗑️ Usuń wizytę</Btn>
    </Modal>}

    {confirmDel&&<Modal title="Usuń wizytę" onClose={()=>setConfirmDel(null)}>
      <div style={{fontSize:15,marginBottom:20}}>Na pewno usunąć tę wizytę?</div>
      <div style={{display:"flex",gap:10}}>
        <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(null)}>Anuluj</Btn>
        <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>delVisit(confirmDel)}>Usuń</Btn>
      </div>
    </Modal>}
    {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
  </>;
}
