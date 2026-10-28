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
    <div ref={scrollRef} style={{background:dk?"#111826":"#fff",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",padding:"20px 20px 40px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:19,fontWeight:700,color:dk?"#E8F5F5":"#1C2B3A"}}>{title}</div>
        <button onClick={onClose} style={{background:dk?"#18202F":"#EFF3FA",border:"none",borderRadius:10,width:32,height:32,cursor:"pointer",fontSize:18,color:"#7A8FA6",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
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
        <div style={{fontSize:12,fontWeight:700,color:"#3E6FB0",textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{(CONTACT_FIELDS[field]||field)+" → "+rows[0].value}</div>
        {rows.map(it=>
          <div key={it._i} onClick={()=>setChecked(c=>c.map((v,i)=>i===it._i?!v:v))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #EFF3FA",cursor:"pointer"}}>
            <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${checked[it._i]?"#3DAA72":"#D9E2F0"}`,background:checked[it._i]?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
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
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <input type={type} value={value||""} placeholder={placeholder} onChange={e=>onChange(e.target.value)} style={{...s,flex:1}}/>
      {type==="date"&&value&&<button onClick={()=>onChange("")} style={{flexShrink:0,background:"none",border:"none",color:"#E05C5C",fontSize:22,cursor:"pointer",padding:"0 2px",lineHeight:1,fontFamily:"inherit"}}>×</button>}
    </div>
  </div>;
}
function Txa({label,value,onChange,rows=3,placeholder=""}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit",resize:"vertical"};
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <textarea value={value||""} rows={rows} placeholder={placeholder} onChange={e=>onChange(e.target.value)} style={s}/>
  </div>;
}
function Sel({label,value,onChange,options}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={s}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>;
}
function TimeSel({label,value,onChange,allowEmpty,options}) {
  const dk=useContext(DarkCtx);
  const s={width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  let opts=[];
  if(Array.isArray(options))opts=options.slice();
  else for(let h=0;h<24;h++)for(let m=0;m<60;m+=5){const hh=String(h).padStart(2,"0"),mm=String(m).padStart(2,"0");opts.push(hh+":"+mm);}
  // wartość spoza siatki co 5 minut (np. ze starego wpisu) zostaje na liście, żeby nic się nie zmieniło po cichu
  if(value&&!opts.includes(value)){opts.push(value);opts.sort();}
  return <div style={{marginBottom:14}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <select value={allowEmpty?(value||""):(value||"10:00")} onChange={e=>onChange(e.target.value)} style={s}>
      {allowEmpty&&<option value="">— brak —</option>}
      {opts.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  </div>;
}
function PatientPicker({label,value,onChange,onSelect,patients}) {
  const dk=useContext(DarkCtx);
  const [open,setOpen]=useState(false);
  const matches=(patients||[]).filter(p=>value&&p.name.toLowerCase().includes(value.toLowerCase())).slice(0,6);
  return <div style={{marginBottom:14,position:"relative"}}>
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <input value={value||""} placeholder="Wpisz imię pacjenta..." onChange={e=>{onChange(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),150)}
      style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
    {open&&matches.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:dk?"#18202F":"#fff",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.18)",zIndex:200,overflow:"hidden"}}>
      {matches.map(p=><div key={p.id} onPointerDown={e=>{e.preventDefault();onChange(p.name);if(onSelect)onSelect(p);setOpen(false);}} style={{padding:"12px 16px",cursor:"pointer",borderBottom:`1px solid ${dk?"#2A3A56":"#EFF3FA"}`,fontSize:14,fontWeight:500,color:dk?"#E8F5F5":"#1C2B3A"}}>
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
    {label&&<div style={{fontSize:13,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>}
    <div onClick={()=>setOpen(o=>!o)}
      style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",boxSizing:"border-box"}}>
      <span>{current?current.label:"—"}</span><span style={{color:"#7A8FA6",fontSize:12}}>▾</span>
    </div>
    {open&&<>
      <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:190}}/>
      <div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:dk?"#18202F":"#fff",borderRadius:12,boxShadow:"0 4px 20px rgba(0,0,0,.18)",zIndex:200,overflow:"hidden",maxHeight:280,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
        {options.map(o=><div key={o.value} onClick={()=>{onChange(o.value);setOpen(false);}} style={{padding:"10px 16px",cursor:"pointer",borderBottom:`1px solid ${dk?"#2A3A56":"#EFF3FA"}`}}>
          <div style={{fontSize:14,fontWeight:500,color:dk?"#E8F5F5":"#1C2B3A"}}>{o.label}</div>
          {o.sub&&<div style={{fontSize:11,color:"#7A8FA6",marginTop:1}}>{o.sub}</div>}
        </div>)}
      </div>
    </>}
  </div>;
}
function ClockDisplay() {
  const [t,setT]=useState(()=>new Date().toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"}));
  useEffect(()=>{const i=setInterval(()=>setT(new Date().toLocaleTimeString("pl-PL",{hour:"2-digit",minute:"2-digit"})),1000);return()=>clearInterval(i);},[]);
  return <span>{t}</span>;
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

// ── Bezpiecznik jednej zakładki ──────────────────────────────────────────────
// Błąd w wyświetlaniu jednej zakładki (np. przez uszkodzony wpis) nie zabiera reszty apki:
// nawigacja zostaje, a zakładka pokazuje komunikat. Dane w bazie nie są ruszane.
class TabBoundary extends React.Component {
  constructor(props){super(props);this.state={err:null};}
  static getDerivedStateFromError(e){return {err:e};}
  componentDidCatch(e){try{console.error("Błąd zakładki "+(this.props.name||""),e);}catch{}}
  render(){
    if(!this.state.err)return this.props.children;
    const msg=String((this.state.err&&this.state.err.message)||this.state.err);
    return <div style={{padding:20,margin:16,background:"#FEE2E2",border:"1.5px solid #E05C5C",borderRadius:14,color:"#1C2B3A"}}>
      <div style={{fontWeight:700,fontSize:16,color:"#B3261E",marginBottom:8}}>Ta zakładka nie mogła się wyświetlić</div>
      <div style={{fontSize:14,lineHeight:1.5,marginBottom:10}}>Prawdopodobnie któryś zapis ma uszkodzone dane. Nic nie zostało usunięte ani zmienione, a pozostałe zakładki działają.</div>
      <div style={{fontSize:12,fontFamily:"monospace",color:"#4E5D6E",wordBreak:"break-all",marginBottom:12}}>{msg}</div>
      <button onClick={()=>this.setState({err:null})} style={{background:"#3E6FB0",color:"#fff",border:"none",borderRadius:10,padding:"9px 16px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Spróbuj ponownie</button>
    </div>;
  }
}

// ── Ustawienia szyny CPM: marka + udo + podudzie (pełne cm) + podpowiedź "ostatnio" ───────────────────
// value = {brand,thigh,shank}; autoBrand = marka wynikająca z wybranego sprzętu (wtedy nie da się jej zmienić);
// entries = historia ustawień pacjenta (cpmEntries). Podpowiedź niczego nie wpisuje sama: dopiero przycisk "Użyj".
function CpmFields({value,onChange,autoBrand,entries}) {
  const dk=useContext(DarkCtx);
  const demo=useDemo();
  const v=value||{};
  const brand=autoBrand||(CPM_BRANDS.includes(v.brand)?v.brand:null);
  const last=brand?cpmLast(entries||[],brand):null;
  const other=(!last&&brand)||(!brand)?(entries||[]).find(e=>e.brand&&e.brand!==brand):null;
  const same=!!last&&cpmInt(v.thigh)===last.thigh&&cpmInt(v.shank)===last.shank;
  const set=patch=>onChange({...v,...patch});
  const inp={width:"100%",padding:"11px 14px",border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,borderRadius:12,fontSize:16,outline:"none",background:dk?"#111826":"#FFFFFF",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"};
  const lbl={fontSize:12,fontWeight:600,color:dk?"#6B84AC":"#3E5578",marginBottom:4,textTransform:"uppercase",letterSpacing:.5};
  return <div style={{marginBottom:14,padding:"12px 14px",borderRadius:12,border:`1.5px solid ${dk?"#2A3A56":"#D9E2F0"}`,background:dk?"#141C2B":"#F7FAFD"}}>
    <div style={{fontSize:12,fontWeight:700,color:"#7C6AF4",textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>🦿 Ustawienia szyny (opcjonalnie)</div>
    <div style={{display:"flex",gap:8,marginBottom:10}}>
      {CPM_BRANDS.map(b=>{const on=brand===b,off=!!autoBrand&&autoBrand!==b;
        return <button key={b} type="button" disabled={off} onClick={()=>set({brand:b})} style={{flex:1,padding:"9px 6px",borderRadius:10,border:`1.5px solid ${on?"#7C6AF4":dk?"#2A3A56":"#D9E2F0"}`,background:on?"#7C6AF4":dk?"#111826":"#fff",color:on?"#fff":dk?"#E8F5F5":"#1C2B3A",fontWeight:600,fontSize:14,cursor:off?"default":"pointer",opacity:off?.4:1,fontFamily:"inherit"}}>{b}</button>;})}
    </div>
    {last&&!same&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 10px",borderRadius:10,background:dk?"#1B2740":"#EEF3FB"}}>
      <div style={{flex:1,fontSize:13,color:dk?"#B8C8E0":"#3E5578"}}>Ostatnio ({brand}, {cpmDate(last.date)}): <b>{cpmText(last,demo)}</b></div>
      <button type="button" onClick={()=>set({brand,thigh:last.thigh?String(last.thigh):"",shank:last.shank?String(last.shank):""})} style={{flexShrink:0,background:"#3E6FB0",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Użyj</button>
    </div>}
    {last&&same&&<div style={{fontSize:12,color:"#3DAA72",fontWeight:600,marginBottom:8}}>✓ tak samo jak ostatnio ({cpmDate(last.date)})</div>}
    {other&&<div style={{fontSize:12,color:dk?"#8FA3C0":"#5A6F8C",marginBottom:10}}>Na {other.brand} było ({cpmDate(other.date)}): {cpmText(other,demo)} (inna skala, nie przenoszę)</div>}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div><div style={lbl}>Udo (cm)</div><input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={v.thigh||""} placeholder="np. 45" onChange={e=>set({thigh:cpmDigits(e.target.value)})} style={inp}/></div>
      <div><div style={lbl}>Podudzie (cm)</div><input inputMode="numeric" pattern="[0-9]*" maxLength={6} value={v.shank||""} placeholder="np. 38" onChange={e=>set({shank:cpmDigits(e.target.value)})} style={inp}/></div>
    </div>
    {(v.thigh||v.shank)&&<button type="button" onClick={()=>set({thigh:"",shank:""})} style={{marginTop:8,background:"none",border:"none",color:"#E05C5C",fontSize:13,fontWeight:600,cursor:"pointer",padding:0,fontFamily:"inherit"}}>× wyczyść</button>}
  </div>;
}

// ── Od godziny / Do godziny z domyślnym czasem trwania ────────────────────────────────────────────────
// kind: visit | delivery | pickup | event. Godzina końca jest zawsze ustawiona (domyślnie początek + czas z Ustawień),
// zmiana początku przesuwa koniec o tyle samo, a lista "Do godziny" zawiera tylko godziny późniejsze niż początek.
function TimeRange({kind,start,end,onChange,labelStart,labelEnd,autofill}) {
  const durs=useContext(DurCtx);
  const def=(durs&&durs[kind])||DUR_DEFAULTS[kind];
  const s=hmToMin(start),e=hmToMin(end);
  const validEnd=s!==null&&e!==null&&e>s;
  const effEnd=s===null?"":(validEnd?end:minToHm(s+def));
  // domyślną godzinę końca wpisujemy do formularza od razu, żeby trafiła do zapisu (i nie zmieniała się po zmianie ustawień)
  useEffect(()=>{if(autofill!==false&&s!==null&&!validEnd&&effEnd)onChange(start,effEnd);},[start,end,def]);
  const endOpts=[];
  if(s!==null){for(let m=Math.floor(s/5)*5+5;m<24*60;m+=5)endOpts.push(minToHm(m));if(endOpts.length===0)endOpts.push("23:59");}
  const changeStart=v=>{const ns=hmToMin(v);if(ns===null){onChange(v,end);return;}onChange(v,minToHm(ns+(validEnd?e-s:def)));};
  return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
    <TimeSel label={labelStart||"Od godziny"} value={start||"10:00"} onChange={changeStart}/>
    <TimeSel label={labelEnd||"Do godziny"} value={effEnd} options={endOpts.length?endOpts:undefined} onChange={v=>onChange(start,v)}/>
  </div>;
}
