function Toast({msg,onDone}) {
  useEffect(()=>{const t=setTimeout(onDone,2200);return()=>clearTimeout(t);},[]);
  return <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",background:"#1C2B3A",color:"#fff",borderRadius:14,padding:"12px 20px",fontSize:14,fontWeight:600,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,.25)",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8}}><span style={{color:"#3DAA72",fontSize:16}}>✓</span>{msg}</div>;
}

function Modal({title,onClose,children}) {
  const dk=useContext(DarkCtx);
  const scrollRef=useRef(null);
  const scrollPos=useRef(0);
  useEffect(()=>{
    const el=scrollRef.current;
    if(!el)return;
    const save=()=>{scrollPos.current=el.scrollTop;};
    el.addEventListener("scroll",save,{passive:true});
    return()=>el.removeEventListener("scroll",save);
  },[]);
  useEffect(()=>{
    if(scrollRef.current)scrollRef.current.scrollTop=scrollPos.current;
  });
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div ref={scrollRef} style={{background:dk?"#0F1F1F":"#fff",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",padding:"20px 20px 40px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:19,fontWeight:700,color:dk?"#E8F5F5":"#1C2B3A"}}>{title}</div>
        <button onClick={onClose} style={{background:dk?"#1A2A2A":"#F2F5F7",border:"none",borderRadius:10,width:32,height:32,cursor:"pointer",fontSize:18,color:"#7A8FA6",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>
      {children}
    </div>
  </div>;
}

function ContactSyncModal({items,onConfirm,onClose}) {
  const [checked,setChecked]=useState(()=>items.map(()=>true));
  const grouped={};
  items.forEach((it,i)=>{(grouped[it.field]=grouped[it.field]||[]).push({...it,_i:i});});
  return <Modal title="Zaktualizować też w innych miejscach?" onClose={onClose}>
    <div style={{fontSize:13,color:"#7A8FA6",marginBottom:16}}>Tu jest zapisana inna wartość. Odznacz to, co ma zostać bez zmian.</div>
    {Object.entries(grouped).map(([field,rows])=>
      <div key={field} style={{marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:"#0A7C7C",textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{(CONTACT_FIELDS[field]||field)+" → "+rows[0].value}</div>
        {rows.map(it=>
          <div key={it._i} onClick={()=>setChecked(c=>c.map((v,i)=>i===it._i?!v:v))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #F2F5F7",cursor:"pointer"}}>
            <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${checked[it._i]?"#3DAA72":"#E4EAF0"}`,background:checked[it._i]?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {checked[it._i]&&<span style={{color:"#fff",fontSize:13}}>✓</span>}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:600}}>{it.label}</div>
              <div style={{fontSize:12,color:"#7A8FA6"}}>było: {it.oldValue}</div>
            </div>
          </div>
        )}
      </div>
    )}
    <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>onConfirm(items.filter((_,i)=>checked[i]))}>Zapisz zaznaczone</Btn>
  </Modal>;
}

function Inp({label,value,onChange,type="text",placeholder=""}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <input type={type} value={value||""} placeholder={placeholder} onChange={e=>onChange(e.target.value)} style={{...s,flex:1}}/>
      {type==="date"&&value&&<button onClick={()=>onChange("")} style={{flexShrink:0,background:"none",border:"none",color:"#E05C5C",fontSize:22,cursor:"pointer",padding:"0 2px",lineHeight:1,fontFamily:"inherit"}}>×</button>}
    </div>
  </div>;
}
function Txa({label,value,onChange,rows=3,placeholder=""}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit",resize:"vertical"};
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <textarea value={value||""} rows={rows} placeholder={placeholder} onChange={e=>onChange(e.target.value)} style={s}/>
  </div>;
}
function Sel({label,value,onChange,options}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={s}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>;
}
function TimeSel({label,value,onChange}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  const opts=[];
  for(let h=0;h<24;h++)for(let m=0;m<60;m+=5){const hh=String(h).padStart(2,"0"),mm=String(m).padStart(2,"0");opts.push(hh+":"+mm);}
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <select value={value||"10:00"} onChange={e=>onChange(e.target.value)} style={s}>
      {opts.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  </div>;
}
function PatientPicker({label,value,onChange,onSelect,patients}) {
  const dk=useContext(DarkCtx);
  const [open,setOpen]=useState(false);
  const matches=(patients||[]).filter(p=>value&&p.name.toLowerCase().includes(value.toLowerCase())).slice(0,6);
  return <div style={{marginBottom:14,position:"relative"}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <input value={value||""} placeholder="Wpisz imię pacjenta..." onChange={e=>{onChange(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),150)}
      style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
    {open&&matches.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:dk?"#1A2A2A":"#fff",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.18)",zIndex:200,overflow:"hidden"}}>
      {matches.map(p=><div key={p.id} onPointerDown={e=>{e.preventDefault();onChange(p.name);if(onSelect)onSelect(p);setOpen(false);}} style={{padding:"12px 16px",cursor:"pointer",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`,fontSize:14,fontWeight:500,color:dk?"#E8F5F5":"#1C2B3A"}}>
        {p.name} <span style={{color:"#7A8FA6",fontSize:12}}>{p.phone}</span>
      </div>)}
    </div>}
  </div>;
}
function EquipmentPicker({label,value,onChange,options}) {
  const dk=useContext(DarkCtx);
  const [open,setOpen]=useState(false);
  const current=options.find(o=>o.value===value);
  return <div style={{marginBottom:14,position:"relative"}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <div onClick={()=>setOpen(o=>!o)} tabIndex={0} onBlur={()=>setTimeout(()=>setOpen(false),150)}
      style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",boxSizing:"border-box"}}>
      <span>{current?current.label:"—"}</span><span style={{color:"#7A8FA6",fontSize:12}}>▾</span>
    </div>
    {open&&<div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:dk?"#1A2A2A":"#fff",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.18)",zIndex:200,overflow:"hidden",maxHeight:280,overflowY:"auto"}}>
      {options.map(o=><div key={o.value} onPointerDown={e=>{e.preventDefault();onChange(o.value);setOpen(false);}} style={{padding:"10px 16px",cursor:"pointer",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
        <div style={{fontSize:14,fontWeight:500,color:dk?"#E8F5F5":"#1C2B3A"}}>{o.label}</div>
        {o.sub&&<div style={{fontSize:11,color:"#7A8FA6",marginTop:1}}>{o.sub}</div>}
      </div>)}
    </div>}
  </div>;
}
function ClockDisplay() {
  const [t,setT]=useState(()=>new Date().toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"}));
  useEffect(()=>{const i=setInterval(()=>setT(new Date().toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"})),1000);return()=>clearInterval(i);},[]);
  return <span>{t}</span>;
}

const ICS_URL = "https://xqjrlzsdfyjeajfkathx.supabase.co/functions/v1/ics";
function openICS(arg) {
  const p = new URLSearchParams();
  p.set("title", arg.summary||"");
  const hasTime = (arg.dtStart||"").includes("T");
  if(hasTime) {
    const [d,t] = arg.dtStart.split("T");
    p.set("date", d); p.set("time", t.slice(0,5));
    if(arg.dtEnd&&arg.dtEnd.includes("T")){const[d2,t2]=arg.dtEnd.split("T");p.set("endDate",d2);p.set("endTime",t2.slice(0,5));}
  } else {
    p.set("date", arg.dtStart||""); p.set("allDay","1");
  }
  if(arg.description) p.set("desc", arg.description);
  // Use <a> click — Safari handles text/calendar from real URL correctly
  const a = document.createElement("a");
  a.href = ICS_URL+"?"+p.toString();
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>document.body.removeChild(a), 1000);
}
function makeICS(summary, dtStart, dtEnd, description, allDay) {
  return {summary, dtStart, dtEnd, description, allDay};
}
function openGCal(summary, dtStart, dtEnd, description, allDay) {
  openICS({summary, dtStart, dtEnd, description, allDay});
}

function getHolidays(year) {
  const a=year%19,b=Math.floor(year/100),c=year%100;
  const d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25);
  const g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30;
  const i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7;
  const m=Math.floor((a+11*h+22*l)/451);
  const month=Math.floor((h+l-7*m+114)/31);
  const day=((h+l-7*m+114)%31)+1;
  const easter=new Date(year,month-1,day);
  const fmt=(d)=>{const y=d.getFullYear(),mo=String(d.getMonth()+1).padStart(2,"0"),dd=String(d.getDate()).padStart(2,"0");return y+"-"+mo+"-"+dd;};
  const add=(d,n)=>{const r=new Date(d);r.setDate(r.getDate()+n);return r;};
  // Mapa: "YYYY-MM-DD" -> nazwa święta
  const holidays=new Map([
    [year+"-01-01","Nowy Rok"],
    [year+"-01-06","Trzech Króli"],
    [fmt(easter),"Wielkanoc"],
    [fmt(add(easter,1)),"Lany Poniedziałek"],
    [year+"-05-01","Święto Pracy"],
    [year+"-05-03","Święto Konstytucji 3 Maja"],
    [fmt(add(easter,60)),"Boże Ciało"],
    [year+"-08-15","Wniebowzięcie NMP"],
    [year+"-11-01","Wszystkich Świętych"],
    [year+"-11-11","Święto Niepodległości"],
    [year+"-12-24","Wigilia"],
    [year+"-12-25","Boże Narodzenie"],
    [year+"-12-26","Drugi dzień Bożego Narodzenia"],
  ]);
  return holidays;
}
