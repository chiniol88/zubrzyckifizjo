const { useState, useEffect, useMemo, useContext, createContext, useRef } = React;
const DarkCtx = createContext(false);
const DemoCtx = createContext(false);
const MachinesCtx = createContext(null);
const FinancesCtx = createContext(null);
const RentalsCtx = createContext(null);
const StockCtx = createContext(null);
const demoName=(name,idx)=>name?`Pacjent ${idx+1}`:"—";
const demoPhone=()=>"***-***-***";
const demoAddr=()=>"*** **";
const demoAmt=()=>"****";
const useDemo=()=>useContext(DemoCtx);
const maskName=(demo,name,idx)=>demo?demoName(name,idx||0):name;
const maskPhone=(demo,phone)=>demo?demoPhone():phone;
const maskAddr=(demo,addr)=>demo?demoAddr():addr;
const maskAmt=(demo,amt)=>demo?demoAmt():amt;

const SUPA_URL = "https://xqjrlzsdfyjeajfkathx.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxanJsenNkZnlqZWFqZmthdGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NjUzMzgsImV4cCI6MjA4ODE0MTMzOH0.sFWfnIV0tpNnwB65du9dNYTMSelrlEpMXxWf4Mcww4g";

// Token sesji — ustawiany po zalogowaniu przez Supabase Auth
let _supaToken = null;
const getHeaders = () => ({
  "apikey": SUPA_ANON,
  "Authorization": `Bearer ${_supaToken || SUPA_ANON}`,
  "Content-Type": "application/json"
});

// Supabase Auth
async function supaSignIn(email, password) {
  const r = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {"apikey": SUPA_ANON, "Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  });
  const d = await r.json();
  if(d.access_token) {
    _supaToken = d.access_token;
    // Zapisz refresh token w sessionStorage (znika po zamknięciu przeglądarki)
    sessionStorage.setItem("fizjo-refresh", d.refresh_token);
    sessionStorage.setItem("fizjo-token", d.access_token);
    return {ok: true};
  }
  return {ok: false, error: d.error_description || d.msg || "Błąd logowania"};
}

async function supaRefresh() {
  const refresh = sessionStorage.getItem("fizjo-refresh");
  if(!refresh) return false;
  const r = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {"apikey": SUPA_ANON, "Content-Type": "application/json"},
    body: JSON.stringify({refresh_token: refresh})
  });
  const d = await r.json();
  if(d.access_token) {
    _supaToken = d.access_token;
    sessionStorage.setItem("fizjo-token", d.access_token);
    sessionStorage.setItem("fizjo-refresh", d.refresh_token);
    return true;
  }
  return false;
}

async function supaSignOut() {
  sessionStorage.removeItem("fizjo-token");
  sessionStorage.removeItem("fizjo-refresh");
  _supaToken = null;
}

async function dbGet(key) {
  try {
    const r = await fetch(`${SUPA_URL}/rest/v1/app_data?key=eq.${key}&select=value`,
      {headers: getHeaders()});
    if(r.status === 401) return {data: null, ts: 0, error: true};
    const d = await r.json();
    const raw = d?.[0]?.value ?? null;
    if(raw === null) return {data: null, ts: 0, error: false};
    if(raw && typeof raw === 'object' && '_ts' in raw) return {data: raw._d, ts: raw._ts, error: false};
    return {data: raw, ts: 0, error: false};
  } catch { return {data: null, ts: 0, error: true}; }
}
async function dbSet(key, value, keepalive=false) {
  try {
    const r=await fetch(`${SUPA_URL}/rest/v1/app_data`, {method: "POST",
      headers: {...getHeaders(), "Prefer": "resolution=merge-duplicates"},
      body: JSON.stringify({key, value: {_d: value, _ts: Date.now()}}),
      keepalive});
    return r.ok;
  } catch { return false; }
}
let _savingCount=0;
const _failingKeys=new Set();
const _notifySave=()=>window.dispatchEvent(new CustomEvent("fizjo-save",{detail:_savingCount>0}));
const _notifySaveError=()=>window.dispatchEvent(new CustomEvent("fizjo-save-error",{detail:_failingKeys.size>0}));

function usePersistedState(key, initial, ready=true) {
  const [state, setState] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  const userChanged = React.useRef(false);
  const stateRef = React.useRef(state);
  const loadedTsRef = React.useRef(0);
  const initialLoadOk = React.useRef(false);
  const savingRef = React.useRef(false);
  stateRef.current = state;

  // Initial load
  useEffect(()=>{
    if(!ready){setLoaded(false);userChanged.current=false;initialLoadOk.current=false;return;}
    setLoaded(false);
    userChanged.current=false;
    initialLoadOk.current=false;
    dbGet(key).then(({data:v,ts,error})=>{
      if(!error){
        initialLoadOk.current=true;
        if(!userChanged.current&&v!==null){setState(v);loadedTsRef.current=ts;}
      }
      setLoaded(true);
    });
  },[ready]);

  // Próba zapisu — NIE czyści flagi "do zapisania" jeśli zapis się nie powiódł (np. brak internetu),
  // dzięki czemu polling (niżej) nigdy nie nadpisze lokalnej, jeszcze niezapisanej zmiany danymi z serwera
  const attemptSave=React.useCallback(()=>{
    if(!loaded||!ready||!userChanged.current||!initialLoadOk.current||savingRef.current)return;
    savingRef.current=true;
    _savingCount++;_notifySave();
    const saveTs=Date.now();
    dbSet(key,stateRef.current).then(ok=>{
      if(ok){
        userChanged.current=false;
        loadedTsRef.current=saveTs;
        if(_failingKeys.delete(key))_notifySaveError();
      } else if(!_failingKeys.has(key)){
        _failingKeys.add(key);_notifySaveError();
      }
    }).finally(()=>{savingRef.current=false;_savingCount--;_notifySave();});
  },[key,loaded,ready]);

  // Save on user changes (debounced 300ms)
  useEffect(()=>{
    if(!loaded||!ready||!userChanged.current||!initialLoadOk.current)return;
    const t=setTimeout(attemptSave,300);
    return()=>clearTimeout(t);
  },[state,loaded,ready,attemptSave]);

  // Retry co 5s dopóki jest niezapisana zmiana — łapie przypadki gdy zapis nie powiódł się
  // z powodu chwilowego braku internetu, bez czekania na kolejną zmianę/zamknięcie karty
  useEffect(()=>{
    if(!loaded||!ready)return;
    const id=setInterval(()=>{if(userChanged.current)attemptSave();},5000);
    return()=>clearInterval(id);
  },[loaded,ready,attemptSave]);

  // Zapis gdy apka schodzi w tło (visibilitychange) lub strona się zamyka (pagehide)
  // pagehide używa keepalive=true — przeglądarka nie anuluje requestu przy zamknięciu karty
  useEffect(()=>{
    const flushBg=()=>{
      // Tylko przy schodzeniu w tło, nie przy powrocie — przy powrocie działa conflict check
      if(document.visibilityState!=="hidden")return;
      attemptSave();
    };
    const flushClose=()=>{
      if(loaded&&ready&&userChanged.current&&initialLoadOk.current){
        dbSet(key,stateRef.current,true);
      }
    };
    document.addEventListener("visibilitychange",flushBg);
    window.addEventListener("pagehide",flushClose);
    return()=>{
      document.removeEventListener("visibilitychange",flushBg);
      window.removeEventListener("pagehide",flushClose);
    };
  },[loaded,ready,attemptSave]);

  // Ostrzeżenie przeglądarki przy próbie zamknięcia karty z niezapisaną zmianą
  useEffect(()=>{
    const onBeforeUnload=e=>{
      if(userChanged.current){e.preventDefault();e.returnValue="";}
    };
    window.addEventListener("beforeunload",onBeforeUnload);
    return()=>window.removeEventListener("beforeunload",onBeforeUnload);
  },[]);

  // Wspólna funkcja: pobierz dane z serwera i zastosuj lokalnie jeśli inne — ale tylko gdy
  // nie mamy lokalnej niezapisanej zmiany (nigdy nie nadpisuje czegoś co czeka na zapis)
  const pullFromServer=React.useCallback(()=>{
    if(userChanged.current)return;
    dbGet(key).then(({data:v,ts})=>{
      if(v===null||userChanged.current)return;
      try{
        if(JSON.stringify(v)!==JSON.stringify(stateRef.current)){
          setState(v);
          loadedTsRef.current=ts;
        }
      }catch{}
    });
  },[key]);

  // Polling co 30s — synchronizacja między urządzeniami
  useEffect(()=>{
    if(!loaded||!ready)return;
    const interval=setInterval(pullFromServer,30000);
    return()=>clearInterval(interval);
  },[loaded,ready,pullFromServer]);

  // Natychmiastowe odświeżenie po powrocie do karty/apki (nie czekaj do 30s) — ważne przy
  // używaniu apki na 2 urządzeniach (np. telefon + laptop): po powrocie do urządzenia, które
  // długo stało w tle, dociągamy najnowsze dane ZANIM zdążysz coś na nim wpisać na nieaktualnej wersji
  useEffect(()=>{
    if(!loaded||!ready)return;
    const onResume=()=>{if(document.visibilityState==="visible")pullFromServer();};
    document.addEventListener("visibilitychange",onResume);
    return()=>document.removeEventListener("visibilitychange",onResume);
  },[loaded,ready,pullFromServer]);

  // Wykrywanie konfliktu: gdy karta staje się aktywna, sprawdź czy serwer ma nowsze dane
  useEffect(()=>{
    if(!loaded||!ready)return;
    const onVisible=()=>{
      if(document.visibilityState!=="visible"||!userChanged.current)return;
      dbGet(key).then(({ts})=>{
        if(ts>loadedTsRef.current+2000&&userChanged.current){
          window.dispatchEvent(new CustomEvent("fizjo-conflict",{detail:{key}}));
        }
      });
    };
    document.addEventListener("visibilitychange",onVisible);
    return()=>document.removeEventListener("visibilitychange",onVisible);
  },[loaded,ready]);

  const setStateUser = React.useCallback((v)=>{userChanged.current=true;setState(v);},[]);
  return [state,setStateUser,loaded];
}

// ── UTILS ─────────────────────────────────────────────────────────────────
const todayLocal = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const dateDiff = (a,b) => { const [ay,am,ad]=a.split("-").map(Number),[by,bm,bd]=b.split("-").map(Number); return Math.ceil((new Date(by,bm-1,bd)-new Date(ay,am-1,ad))/86400000); };
const visitStatus = v => {
  if(v.status==="zakończona") return "zakończona";
  if(v.status==="anulowana") return "anulowana";
  if(!v.date) return "zaplanowana";
  return new Date(v.date+"T"+(v.time||"00:00")+":00") <= new Date() ? "zakończona" : "zaplanowana";
};
const emptyVisit = () => ({date:todayLocal(),time:"15:00",type:"Rehabilitacja domowa",price:"150",status:"zaplanowana",patientName:"",patientId:null,notes:""});
const emptyRental = () => ({equipment:"",patientName:"",phone:"",address:"",startDate:todayLocal(),startTime:"10:00",startAllDay:false,endDate:"",endTime:"10:00",endAllDay:false,renewable:false,amount:"",amountPaid:"",transport:"",notes:"",source:""});

const VISIT_TYPES = ["Rehabilitacja domowa","Kinezyterapia","Masaż leczniczy","Krioterapia","Elektroterapia","Konsultacja","Inne"];
const EQUIPMENT = ["Artromot K1 2025","Artromot K1 I","Kinetec Spectra","Kinetec Spectra SZ","Optiflex","OrthoRehab","Ambonka Paula","Balkonik ortopedyczny","Wózek inwalidzki Elite Tim","Wózek Vermeiren V500"];
const WOZEK_EQUIPMENT = ["Wózek inwalidzki Elite Tim","Wózek Vermeiren V500"];
const EQUIPMENT_GROUPS = [{key:"szyny",label:"Szyny CPM"},{key:"wozki",label:"Wózki"},{key:"balkoniki",label:"Balkoniki"}];
const getActiveEquipmentNames = stock => ((stock&&stock.equipment&&stock.equipment.length) ? [...new Set([...EQUIPMENT,...stock.equipment.map(e=>e.name)])].filter(n=>{const e=(stock.equipment||[]).find(x=>x.name===n);return !e||!e.hidden;}) : EQUIPMENT);
const addDays = (d,n) => { const dt=new Date(d+"T12:00:00"); dt.setDate(dt.getDate()+n); return dt.toISOString().slice(0,10); };
const parseCycleSourceId = sid => { const rest=sid.slice(6); const di=rest.indexOf("-"); return {rentalId:+rest.slice(0,di), cycleKey:rest.slice(di+1)}; };
const calcRentalPaid = r => {
  const tp=r.transportPaid?(+r.transport||0):0;
  if(r.renewable) return tp+(r.cycles||[]).filter(c=>c.paid&&!c.cancelled).reduce((s,c)=>s+(+c.amount||0),0);
  const pp=(r.payments||[]).reduce((s,p)=>s+(+p.amount||0),0);
  const ep=(r.extensions||[]).reduce((s,e)=>s+(+e.amountPaid||0),0);
  return tp+(pp||(+r.amountPaid||0))+ep;
};
const RENTAL_SOURCES = [
  {value:"reklama",label:"📢 Reklama",color:"#7C6AF4"},
  {value:"slawek",label:"🤝 Sławek",color:"#3DAA72"},
  {value:"szpital",label:"🏥 Szpital",color:"#0A7C7C"},
  {value:"organicznie",label:"🌱 Organicznie",color:"#F4A261"},
];

// ── UI ────────────────────────────────────────────────────────────────────
const I = {
  home:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  users:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  equip:"M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  fin:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  mkt:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  wrench:"M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  plus:"M12 5v14 M5 12h14",back:"M19 12H5 M12 19l-7-7 7-7",chk:"M20 6L9 17l-5-5",
  ph:"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  sp:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};
const Ico = ({d,s=20,c="#1C2B3A",f="none"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={f} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d.split(" M").map((p,i)=><path key={i} d={(i?"M":"")+p}/>)}</svg>;

const Btn = ({children,onClick,variant="primary",small,disabled,style={}}) => {
  const dk=useContext(DarkCtx);
  const v={primary:{background:"#0A7C7C",color:"#fff"},secondary:{background:dk?"#1E3A3A":"#E6F4F4",color:"#0A7C7C"},orange:{background:"#F4A261",color:"#fff"},danger:{background:dk?"#3A1C1C":"#FEE2E2",color:"#E05C5C"}};
  return <button onClick={onClick} disabled={disabled} style={{...v[variant],border:"none",borderRadius:12,padding:small?"10px 18px":"14px 22px",fontSize:small?14:16,fontWeight:600,cursor:disabled?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:6,opacity:disabled?.5:1,fontFamily:"inherit",transition:"opacity .15s, transform .1s",...style}}>{children}</button>;
};
const Card = ({children,onClick,style={}}) => {
  const dk=useContext(DarkCtx);
  return <div onClick={onClick} style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,padding:"18px 20px",marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",border:dk?"1px solid #1E3232":"1px solid rgba(16,40,40,.04)",cursor:onClick?"pointer":"default",...style}}>{children}</div>;
};
const Badge = ({children,color="#0A7C7C"}) => <span style={{background:color+"28",color,borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:700}}>{children}</span>;
const Empty = ({text}) => <div style={{textAlign:"center",padding:"40px 20px",color:"#7A8FA6",fontSize:14}}>{text}</div>;
const Av = ({name}) => { const i=(name||"?").split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); return <div style={{width:44,height:44,borderRadius:12,background:"#E6F4F4",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:15,color:"#0A7C7C",flexShrink:0}}>{i}</div>; };

// Etykieta nagłówka sekcji — zastępuje powtarzany wszędzie inline styl
const SectionLabel = ({children,style={}}) => {
  const dk=useContext(DarkCtx);
  return <div style={{fontSize:11,fontWeight:700,color:dk?"#5A8A8A":"#7A8FA6",textTransform:"uppercase",letterSpacing:.5,marginBottom:10,...style}}>{children}</div>;
};

// Karta metryki (etykieta + duża wartość), do rzędów statystyk
const StatCard = ({label,value,accent,style={}}) => {
  const dk=useContext(DarkCtx);
  return <div style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,padding:"16px 18px",boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",border:dk?"1px solid #1E3232":"1px solid rgba(16,40,40,.04)",...style}}>
    <div style={{fontSize:12,color:dk?"#7AA8A8":"#7A8FA6",marginBottom:6,fontWeight:600}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:accent||(dk?"#E8F5F5":"#1C2B3A")}}>{value}</div>
  </div>;
};

// Wiersz listy: ikona w kolorowym kółku + tytuł + podtytuł + treść na końcu
const ListRow = ({icon,iconBg,iconColor,title,subtitle,trailing,onClick,last,style={}}) => {
  const dk=useContext(DarkCtx);
  return <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 2px",borderBottom:last?"none":`1px solid ${dk?"#20302E":"#F0F3F5"}`,cursor:onClick?"pointer":"default",...style}}>
    {icon&&<div style={{width:34,height:34,borderRadius:10,background:iconBg||(dk?"#1E3A3A":"#E6F4F4"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16,color:iconColor||"#0A7C7C"}}>{icon}</div>}
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontSize:14,color:dk?"#E8F5F5":"#1C2B3A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</div>
      {subtitle&&<div style={{fontSize:12,marginTop:2,color:dk?"#6A9A9A":"#7A8FA6"}}>{subtitle}</div>}
    </div>
    {trailing&&<div style={{flexShrink:0}}>{trailing}</div>}
  </div>;
};
