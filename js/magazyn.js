    // ── MAGAZYN ───────────────────────────────────────────────────────────────
    // Jedna zakładka zamiast okienka "Zarządzaj sprzętem" i dawnej zakładki Serwis.
    // Liczenie sztuk, kart, historii pojemności, kolejności, serwisu i uwag: warehouse.js (zasady opisane na górze tamtego pliku).

    // Wybór konkretnej sztuki przy wypożyczeniu (formularz nowego wypożyczenia i edycji)
    function CardPicker({eq,value,onChange,stock,rentals,excludeId}) {
      const mctx=useContext(MachinesCtx);
      const demo=useDemo();
      const machines=(mctx&&mctx.machines)||[];
      if(!eq)return null;
      const info=whPickerInfo(machines,rentals,stock,eq,excludeId);
      if(info.cards.length===0)return null;
      const who=r=>demo?"klient":(r.patientName||"?");
      const issueN=id=>((((stock||{}).issues||{})[eq])||[]).filter(i=>!i.done&&i.machineId===id).length;
      const opts=[{value:"",label:info.legacy>0?"Starsza sztuka (bez karty)":"— jeszcze nie wybrano"},
        ...info.cards.map(c=>{const b=info.busy[c.id];const n=issueN(c.id);return {value:String(c.id),label:c.code+(c.serialNo?" · "+c.serialNo:"")+" — "+(b?"zajęta ("+who(b)+(b.endDate?" do "+b.endDate:"")+")":"wolna")+(n>0?" · uwagi: "+n:"")};})];
      const busyNow=value?info.busy[value]:null;
      return <>
        <Sel label="Która sztuka?" value={value?String(value):""} onChange={v=>onChange(v?+v:null)} options={opts}/>
        {busyNow&&<div style={{fontSize:12,color:"#F4A261",marginTop:-6,marginBottom:12}}>⚠ Ta sztuka jest teraz zajęta ({who(busyNow)}). Zapisz tylko, jeśli to rezerwacja na później.</div>}
      </>;
    }

    // Przy wypożyczeniu: otwarte uwagi do tego sprzętu (np. "wymienić rzepy"), żeby załatwić je przed dowozem
    function EqIssueHint({eq,machineId,stock}) {
      const dk=useContext(DarkCtx);
      const list=eq?((((stock||{}).issues||{})[eq])||[]).filter(i=>!i.done&&(!i.machineId||i.machineId===machineId)):[];
      if(list.length===0)return null;
      return <div style={{background:dk?"#3A2A14":"#FDF0E3",borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:13,color:dk?"#F4C48A":"#9A5A12"}}>
        <div style={{fontWeight:700,marginBottom:2}}>🔧 Do załatwienia przy tym sprzęcie ({list.length})</div>
        {list.slice(0,4).map(i=><div key={i.id}>• {i.text}</div>)}
        {list.length>4&&<div>…i {list.length-4} więcej</div>}
      </div>;
    }

    function Magazyn({rentals,setRentals,machines,setMachines,stock,setStock,setFinances,goToRental}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const today=todayLocal();
      const subC=dk?"#6B84AC":"#7A8FA6",lineC=dk?"#2A3A56":"#EFF3FA",boxBg=dk?"#111826":"#F7F9FB";
      const [group,setGroup]=useState("all");
      const [open,setOpen]=useState({});
      const [cfg,setCfg]=useState({});
      const [selCard,setSelCard]=useState(null);
      const [cardForm,setCardForm]=useState(null);
      const [srvForm,setSrvForm]=useState(null);
      const [issueForm,setIssueForm]=useState(null);
      const [retireForm,setRetireForm]=useState(null);
      const [typeForm,setTypeForm]=useState(null);
      const [confirmDel,setConfirmDel]=useState(null);
      const [confirmPurge,setConfirmPurge]=useState(null);
      const [reorder,setReorder]=useState(null);
      const [allEntries,setAllEntries]=useState({});
      const [doneOpen,setDoneOpen]=useState({});
      const [formError,setFormError]=useState("");
      const [toast,setToast]=useState(null);
      const [showRetired,setShowRetired]=useState(false);

      const catalog=(stock&&stock.equipment)||[];
      const activeNames=getActiveEquipmentNames(stock);
      const deletedSet=new Set(catalog.filter(e=>e.deleted).map(e=>e.name));
      const hiddenNames=[...new Set(catalog.map(e=>e.name))].filter(n=>!activeNames.includes(n)&&!deletedSet.has(n));
      const categoryOf=name=>whCatOf(stock,name);
      const seatWidth=(stock&&stock.seatWidth)||{},totalWidth=(stock&&stock.totalWidth)||{},addedDate=(stock&&stock.addedDate)||{};
      const costs=(stock&&stock.costs)||{};
      // Zajętość: wszystkie aktywne wypożyczenia danego typu (tak samo liczą to Statystyki i formularz wypożyczenia)
      const activeCount=useMemo(()=>{const m={};(rentals||[]).filter(r=>r.status==="aktywne").forEach(r=>{m[r.equipment]=(m[r.equipment]||0)+1;});return m;},[rentals]);
      const totalQty=activeNames.reduce((s,eq)=>s+whQty(stock,eq),0);
      const totalOut=activeNames.reduce((s,eq)=>s+(activeCount[eq]||0),0);
      const att=whAttention(stock,machines,today,activeNames);
      const archivedCards=(machines||[]).filter(m=>m.archived).sort((a,b)=>(b.retiredDate||"").localeCompare(a.retiredDate||"")||(b.id-a.id));
      const issuesOf=eq=>((((stock||{}).issues||{})[eq])||[]);

      const flash=msg=>setToast(msg);
      const who=r=>demo?"[klient]":(r.patientName||"?");

      // ── karty (sztuki z kodem) ──
      const openNewCard=eq=>{setFormError("");setCardForm({mode:"new",eq,code:"",serialNo:"",purchaseDate:today,price:"",notes:"",period:"365",where:""});};
      const openConvert=eq=>{setFormError("");setCardForm({mode:"convert",eq,code:"",serialNo:"",purchaseDate:"",price:"",notes:"",period:"365",where:""});};
      const openEditCard=c=>{setFormError("");setCardForm({mode:"edit",eq:c.type,id:c.id,code:c.code||"",serialNo:c.serialNo||"",purchaseDate:c.purchaseDate||"",price:c.price?String(c.price):"",notes:c.notes||"",period:String(c.servicePeriodDays||365),where:""});};
      const saveCard=()=>{
        const f=cardForm;
        const err=whCodeError(machines,f.code,f.id);
        if(err){setFormError(err);return;}
        if(f.mode==="new"){
          const res=whAddCard(stock,machines,f.eq,f,today);
          setStock(res.stock);setMachines(res.machines);
          setOpen(o=>({...o,[f.eq]:true}));flash("Dodano sztukę "+res.card.code);
        } else if(f.mode==="convert"){
          const res=whConvertLegacy(stock,machines,f.eq,f,today);
          if(!res){setFormError("W tym typie nie ma już starszych sztuk bez karty");return;}
          setMachines(res.machines);
          if(f.where)setRentals(rs=>rs.map(x=>x.id===+f.where?{...x,machineId:res.card.id}:x));
          setOpen(o=>({...o,[f.eq]:true}));flash("Utworzono kartę "+res.card.code);
        } else {
          setMachines(ms=>ms.map(m=>m.id===f.id?{...m,code:f.code.trim(),serialNo:f.serialNo.trim(),purchaseDate:f.purchaseDate||"",price:+f.price||0,notes:f.notes||"",servicePeriodDays:+f.period||365}:m));
          flash("Zapisano");
        }
        setCardForm(null);
      };
      const doRetire=()=>{
        const f=retireForm;
        const res=whRetireCard(stock,machines,rentals,f.id,f.date,f.reason,today);
        if(res.error){setFormError(res.error);return;}
        setStock(res.stock);setMachines(res.machines);setRetireForm(null);setSelCard(null);flash("Sztuka wycofana");
      };
      const doRestore=id=>{
        const res=whRestoreCard(stock,machines,id,today);
        if(res.error){flash(res.error);return;}
        setStock(res.stock);setMachines(res.machines);flash("Przywrócono sztukę");
      };
      const doDelete=()=>{
        const ms=whDeleteCard(machines,rentals,confirmDel);
        setConfirmDel(null);
        if(!ms){flash("Tej karty nie da się usunąć (ma historię)");return;}
        setMachines(ms);setSelCard(null);flash("Karta usunięta, sztuka zostaje jako starsza bez karty");
      };

      // ── serwis i naprawy: wpis przy konkretnej sztuce albo przy całym sprzęcie; koszt zawsze trafia do Finansów ──
      const openSrv=(eq,cardId)=>{setFormError("");setSrvForm({eq,cardId:cardId?String(cardId):"",date:today,type:"Przegląd",notes:"",cost:""});};
      const saveSrv=()=>{
        const f=srvForm;
        if(!f.date){setFormError("Podaj datę");return;}
        const cost=+f.cost||0;
        if(f.cardId){
          const c=(machines||[]).find(m=>m.id===+f.cardId);
          if(!c)return;
          const entry={id:Date.now(),date:f.date,type:f.type,notes:f.notes,cost};
          setMachines(ms=>ms.map(m=>m.id===c.id?{...m,lastServiceDate:(m.lastServiceDate&&m.lastServiceDate>f.date)?m.lastServiceDate:f.date,serviceLog:[...(m.serviceLog||[]),entry]}:m));
          if(cost>0)setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"serwis-"+c.id+"-"+entry.id,date:f.date,type:"koszt",category:"Serwis",amount:cost,description:f.type+(f.notes?" – "+f.notes:"")+" ("+(c.code||c.type)+")"},...fs]);
        } else {
          const res=whAddTypeRepair(stock,f.eq,{date:f.date,type:f.type,notes:f.notes,cost});
          setStock(res.stock);
          if(cost>0)setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"naprawa-"+res.id,date:f.date,type:"koszt",category:"Serwis",amount:cost,description:f.type+(f.notes?" – "+f.notes:"")+" ("+f.eq+")"},...fs]);
        }
        setSrvForm(null);setOpen(o=>({...o,[f.eq]:true}));flash("Wpis serwisowy zapisany");
      };
      const deleteEntry=(eq,e)=>{
        if(e.src==="card"){
          setMachines(ms=>ms.map(m=>{if(m.id!==e.cardId)return m;const log=(m.serviceLog||[]).filter(s=>s.id!==e.entryId);const last=log.length?log.reduce((a,b)=>a.date>b.date?a:b).date:"";return {...m,serviceLog:log,lastServiceDate:last};}));
          setFinances(fs=>fs.filter(f=>f.sourceId!==("serwis-"+e.cardId+"-"+e.entryId)));
        } else {
          setStock(s=>whRemoveTypeRepair(s,eq,e.entryId));
          setFinances(fs=>fs.filter(f=>f.sourceId!==("naprawa-"+e.entryId)));
        }
      };

      // ── uwagi do sprzętu ("wymienić rzepy", "dokręcić śrubki") ──
      const openIssue=(eq,cardId)=>{setFormError("");setIssueForm({eq,cardId:cardId?String(cardId):"",text:""});};
      const saveIssue=()=>{
        const f=issueForm;
        if(!f.text.trim()){setFormError("Wpisz, co trzeba zrobić");return;}
        setStock(s=>whAddIssue(s,f.eq,f.text,f.cardId?+f.cardId:null,today));
        setIssueForm(null);setOpen(o=>({...o,[f.eq]:true}));flash("Dodano uwagę");
      };
      const toggleIssue=(eq,i)=>setStock(s=>whSetIssue(s,eq,i.id,i.done?{done:false,doneDate:""}:{done:true,doneDate:today}));
      const removeIssue=(eq,id)=>setStock(s=>whRemoveIssue(s,eq,id));

      // ── liczba sztuk w typach liczonych ilościowo (balkoniki, ambonki) ──
      const changeQty=(eq,delta)=>{
        if(delta<0&&whQty(stock,eq)-1<(activeCount[eq]||0)){flash("Tyle sztuk jest teraz wypożyczonych");return;}
        const ns=whChangeQty(stock,eq,delta,today);
        if(ns===stock){flash("Nie można zejść poniżej 1 sztuki");return;}
        setStock(ns);
      };

      // ── typy sprzętu (katalog), kolejność, archiwum ──
      const setCatalog=fn=>setStock(s=>({...(s||{}),equipment:fn([...(((s||{}).equipment)||[])])}));
      const assignCategory=(name,category)=>setCatalog(cat=>{const i=cat.findIndex(x=>x.name===name);if(i>=0)cat[i]={...cat[i],category};else cat.push({name,category,hidden:false});return cat;});
      const archiveType=name=>setCatalog(cat=>{const i=cat.findIndex(x=>x.name===name);if(i>=0)cat[i]={...cat[i],hidden:true};else cat.push({name,category:categoryOf(name),hidden:true});return cat;});
      const restoreType=name=>setStock(s=>({...(s||{}),equipment:(((s||{}).equipment)||[]).map(x=>x.name===name?{...x,hidden:false}:x)}));
      const moveType=(key,name,dir)=>setStock(s=>whMoveType(s,key,name,dir));
      const doPurge=()=>{
        const p=confirmPurge;
        if(p.kind==="type"){
          const res=whDeleteType(stock,machines,rentals,p.name);
          if(res.error){setConfirmPurge(null);flash(res.error);return;}
          setStock(res.stock);setMachines(res.machines);flash("Usunięto na stałe: "+p.name);
        } else {
          const res=whPurgeCard(stock,machines,p.id);
          if(res){
            setStock(res.stock);setMachines(res.machines);
            if(res.finMap.length)setFinances(fs=>fs.map(f=>{const m=res.finMap.find(x=>x.from===f.sourceId);return m?{...f,sourceId:m.to}:f;}));
          }
          flash("Karta usunięta na stałe");
        }
        setConfirmPurge(null);
      };
      const openNewType=category=>{setFormError("");setTypeForm({category:category||"szyny",name:"",code:"",serialNo:"",purchaseDate:today,price:"",qty:"1"});};
      const saveType=()=>{
        const f=typeForm,name=f.name.trim();
        if(!name){setFormError("Wpisz nazwę sprzętu");return;}
        if(activeNames.includes(name)){setFormError("Taki sprzęt już jest w magazynie");return;}
        if(hiddenNames.includes(name)){setFormError("Ten sprzęt jest w archiwum. Przywróć go na dole strony.");return;}
        const isCard=f.category==="szyny"||f.category==="wozki";
        if(isCard){const e=whCodeError(machines,f.code,null);if(e){setFormError(e);return;}}
        const date=f.purchaseDate&&f.purchaseDate<=today?f.purchaseDate:today;
        setStock(s=>{
          const cur=s||{};
          return {...cur,equipment:[...(cur.equipment||[]).filter(e=>e.name!==name),{name,category:f.category,hidden:false}],
            addedDate:{...(cur.addedDate||{}),[name]:date},
            qty:{...(cur.qty||{}),[name]:isCard?1:Math.max(1,Math.round(+f.qty||1))}};
        });
        if(isCard)setMachines(ms=>[...(ms||[]),whMakeCard(ms,name,{...f,purchaseDate:f.purchaseDate||today},today)]);
        setOpen(o=>({...o,[name]:true}));setTypeForm(null);flash("Dodano sprzęt: "+name);
      };

      const GROUP_COLORS={szyny:"#3E6FB0",wozki:"#7C6AF4",balkoniki:"#F4A261"};
      const groupHeader=(key,label,action)=>{
        const color=GROUP_COLORS[key]||"#7A8FA6";
        return <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:2}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}}/>
          <div style={{fontSize:14,fontWeight:800,color,textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{label}</div>
          <div style={{flex:1,height:1,background:dk?"#2A3A56":"#D9E2F0"}}/>
          {action}
        </div>;
      };
      const linkBtn={background:"none",border:"none",fontSize:12,color:"#3E6FB0",fontWeight:600,cursor:"pointer",fontFamily:"inherit",padding:"6px 0"};
      const arrowBtn=off=>({width:44,height:44,borderRadius:12,border:"1.5px solid "+(dk?"#2A3A56":"#D9E2F0"),background:dk?"#18202F":"#EFF3FA",color:off?(dk?"#3A4A66":"#B9C6D6"):"#3E6FB0",fontSize:16,cursor:off?"default":"pointer",fontFamily:"inherit",flexShrink:0});

      // wpisy serwisowe (karty + naprawy typu) i uwagi — wspólne dla typu i dla karty
      const renderEntries=(eq,list)=>list.map(e=><div key={e.key} style={{background:dk?"#18202F":"#fff",border:`1px solid ${lineC}`,borderRadius:8,padding:"7px 10px",marginBottom:6}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <div style={{fontSize:13,fontWeight:600}}>{e.kind}{e.code&&<span style={{fontWeight:500,color:subC}}> · {e.code}</span>}</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{fontSize:11,color:subC}}>{e.date}</div><button onClick={()=>deleteEntry(eq,e)} aria-label="Usuń wpis" style={{background:"none",border:"none",color:"#E05C5C",fontSize:16,cursor:"pointer",padding:"2px 4px",lineHeight:1}}>×</button></div>
        </div>
        {e.notes&&<div style={{fontSize:12,color:subC,marginTop:2}}>{e.notes}</div>}
        {e.cost>0&&<div style={{fontSize:12,color:"#3E6FB0",marginTop:2}}>{demo?"****":e.cost+" zł"}</div>}
      </div>);
      const renderIssue=(eq,i)=>{
        const card=i.machineId?(machines||[]).find(m=>m.id===i.machineId):null;
        return <div key={i.id} style={{display:"flex",gap:6,alignItems:"flex-start",padding:"2px 0",borderBottom:`1px solid ${lineC}`}}>
          <button onClick={()=>toggleIssue(eq,i)} aria-label={i.done?"Oznacz jako niezrobione":"Oznacz jako zrobione"} style={{width:38,height:38,background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{width:22,height:22,borderRadius:7,border:`2px solid ${i.done?"#3DAA72":(dk?"#4A5C7A":"#B9C6D6")}`,background:i.done?"#3DAA72":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{i.done&&<span style={{color:"#fff",fontSize:13}}>✓</span>}</span>
          </button>
          <div style={{flex:1,minWidth:0,padding:"8px 0"}}>
            <div style={{fontSize:14,textDecoration:i.done?"line-through":"none",color:i.done?subC:undefined}}>{i.text}</div>
            <div style={{fontSize:11,color:subC}}>{card?(card.code||"sztuka")+" · ":""}{i.done?"zrobione "+i.doneDate:"dodano "+i.created}</div>
          </div>
          <button onClick={()=>removeIssue(eq,i.id)} aria-label="Usuń uwagę" style={{background:"none",border:"none",color:subC,fontSize:16,cursor:"pointer",padding:"8px 6px",lineHeight:1}}>×</button>
        </div>;
      };

      const renderCard=c=>{
        const st=whCardState(c,rentals),sv=whServiceInfo(c,today),isSel=selCard===c.id;
        const svCol=sv.status==="zaległy"?"#E05C5C":sv.status==="wkrótce"?"#F4A261":sv.status==="ok"?"#3DAA72":"#7A8FA6";
        const history=(rentals||[]).filter(r=>r.machineId===c.id).sort((a,b)=>(b.startDate||"").localeCompare(a.startDate||""));
        const canDelete=whDeleteCard(machines,rentals,c.id)!==null;
        const cardIssues=issuesOf(c.type).filter(i=>i.machineId===c.id);
        const openIss=cardIssues.filter(i=>!i.done);
        const cardEntries=whServiceEntries(stock,machines,c.type).filter(e=>e.cardId===c.id);
        return <div key={c.id} style={{border:`1px solid ${lineC}`,borderRadius:12,marginBottom:8,overflow:"hidden",background:dk?"#111826":"#FAFCFD"}}>
          <div onClick={()=>setSelCard(isSel?null:c.id)} style={{padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:800,fontSize:14,letterSpacing:.3}}>{c.code||"(uzupełnij kod)"}</div>
              <div style={{fontSize:11,color:subC,marginTop:1}}>{c.serialNo?"nr fabryczny "+c.serialNo:"bez numeru fabrycznego"}{openIss.length>0&&<span style={{color:"#D9822B",marginLeft:6}}>uwagi: {openIss.length}</span>}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <Badge color={st.kind==="free"?"#3DAA72":"#3E6FB0"}>{st.kind==="free"?"Wolna":st.kind==="out"?"U klienta":"Zarezerwowana"}</Badge>
              {sv.status!=="brak"&&<div style={{fontSize:10,color:svCol,marginTop:3}}>serwis: {sv.status==="zaległy"?Math.abs(sv.left)+" dni po terminie":sv.status==="wkrótce"?"za "+sv.left+" dni":"w porządku"}</div>}
            </div>
          </div>
          {isSel&&<div style={{borderTop:`1px solid ${lineC}`,padding:"10px 12px 12px"}}>
            {st.rental&&<div onClick={()=>goToRental&&goToRental(st.rental.id)} style={{fontSize:13,color:"#3E6FB0",fontWeight:600,cursor:"pointer",marginBottom:8}}>📍 {who(st.rental)} · {st.rental.startDate||"?"} → {st.rental.endDate||"bez końca"} ›</div>}
            <div style={{fontSize:12,color:subC,lineHeight:1.7,marginBottom:10}}>
              {c.purchaseDate&&<div>W obiegu od: <b>{c.purchaseDate}</b></div>}
              {c.price>0&&<div>Cena zakupu: <b>{demo?"****":c.price+" zł"}</b></div>}
              {c.notes&&<div>{c.notes}</div>}
            </div>
            <SectionLabel style={{marginBottom:6}}>Serwis (co {c.servicePeriodDays||365} dni)</SectionLabel>
            <div style={{fontSize:12,color:subC,marginBottom:6}}>{c.lastServiceDate?"Ostatni serwis: "+c.lastServiceDate:"Brak wpisów serwisowych, nic nie przypomina."}</div>
            {renderEntries(c.type,cardEntries)}
            <button onClick={()=>openSrv(c.type,c.id)} style={linkBtn}>+ Wpis serwisowy dla tej sztuki</button>
            <SectionLabel style={{marginBottom:2,marginTop:8}}>Uwagi do tej sztuki</SectionLabel>
            {cardIssues.length===0&&<div style={{fontSize:12,color:subC,marginBottom:2}}>Brak uwag.</div>}
            {cardIssues.map(i=>renderIssue(c.type,i))}
            <button onClick={()=>openIssue(c.type,c.id)} style={linkBtn}>+ Dodaj uwagę do tej sztuki</button>
            <SectionLabel style={{marginBottom:6,marginTop:8}}>Kto miał tę sztukę</SectionLabel>
            {history.length===0&&<div style={{fontSize:12,color:subC,marginBottom:6}}>Jeszcze nie wypożyczana (liczy się od chwili wskazania sztuki przy wypożyczeniu).</div>}
            {history.slice(0,8).map(r=><div key={r.id} onClick={()=>goToRental&&goToRental(r.id)} style={{fontSize:12,padding:"5px 0",borderBottom:`1px solid ${lineC}`,cursor:"pointer",display:"flex",justifyContent:"space-between",gap:8}}>
              <span>{who(r)}</span><span style={{color:subC}}>{r.startDate||"?"} → {r.endDate||(r.status==="aktywne"?"trwa":"?")}</span>
            </div>)}
            {history.length>8&&<div style={{fontSize:11,color:subC,marginTop:4}}>…i {history.length-8} wcześniejszych</div>}
            <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
              <Btn small variant="secondary" onClick={()=>openEditCard(c)}>Edytuj</Btn>
              <Btn small variant="secondary" onClick={()=>{setFormError("");setRetireForm({id:c.id,date:today,reason:""});}}>Wycofaj sztukę</Btn>
              {canDelete&&<Btn small variant="danger" onClick={()=>setConfirmDel(c.id)}>Usuń kartę</Btn>}
            </div>
          </div>}
        </div>;
      };

      const renderType=(eq,idx,names)=>{
        const cat=categoryOf(eq);
        if(reorder!==null&&reorder===cat){
          return <Card key={eq} style={{padding:"8px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1,minWidth:0,fontSize:15,fontWeight:700}}>{eq}</div>
            <button onClick={()=>moveType(cat,eq,-1)} disabled={idx===0} aria-label="Przesuń w górę" style={arrowBtn(idx===0)}>▲</button>
            <button onClick={()=>moveType(cat,eq,1)} disabled={idx===names.length-1} aria-label="Przesuń w dół" style={arrowBtn(idx===names.length-1)}>▼</button>
          </Card>;
        }
        const qty=whQty(stock,eq),cards=whCards(machines,eq),legacy=whLegacy(stock,machines,eq);
        const act=activeCount[eq]||0,free=qty-act;
        const cardType=cat==="szyny"||cat==="wozki"||cards.length>0;
        const isOpen=!!open[eq];
        const due=cards.filter(c=>{const s=whServiceInfo(c,today).status;return s==="zaległy"||s==="wkrótce";}).length;
        const iss=issuesOf(eq),issOpen=iss.filter(i=>!i.done),issDone=iss.filter(i=>i.done);
        const entries=whServiceEntries(stock,machines,eq);
        const shownEntries=allEntries[eq]?entries:entries.slice(0,5);
        const sw=seatWidth[eq],tw=totalWidth[eq];
        return <Card key={eq} style={{padding:0,overflow:"hidden",marginBottom:10}}>
          <div onClick={()=>setOpen(o=>({...o,[eq]:!o[eq]}))} style={{padding:"13px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:15,fontWeight:700}}>{eq}</div>
              <div style={{fontSize:11,color:subC,marginTop:1}}>
                {cat==="wozki"&&(sw||tw)?(sw?"siedzisko "+sw+" cm":"")+(sw&&tw?" · ":"")+(tw?"całk. "+tw+" cm":""):cardType?cards.length+" z kartą"+(legacy>0?" · "+legacy+" starszych bez karty":""):"liczone ilościowo"}
                {due>0&&<span style={{color:"#E05C5C",marginLeft:8}}>🔧 serwis: {due}</span>}
                {issOpen.length>0&&<span style={{color:"#D9822B",marginLeft:8}}>uwagi: {issOpen.length}</span>}
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18}}>{free}/{qty}</div><div style={{fontSize:10,color:subC}}>wolne</div></div>
            <span style={{fontSize:12,color:subC}}>{isOpen?"▲":"▼"}</span>
          </div>
          {isOpen&&<div style={{borderTop:`1px solid ${lineC}`,padding:"12px 16px 14px"}}>
            {cat===null&&<div style={{fontSize:12,color:"#F4A261",marginBottom:10}}>Ten sprzęt nie ma jeszcze grupy. Wybierz ją w ustawieniach poniżej.</div>}
            {cardType?<>
              {cards.length>qty&&<div style={{background:dk?"#3A2A14":"#FEF3E2",borderRadius:10,padding:"10px 12px",marginBottom:10,fontSize:12}}>
                ⚠ Kart ({cards.length}) jest więcej niż sztuk w stanie ({qty}). <button onClick={()=>setStock(s=>whChangeQty(s,eq,cards.length-qty,today))} style={{...linkBtn,padding:0}}>Dopasuj liczbę sztuk</button>
              </div>}
              {cards.map(renderCard)}
              {legacy>0&&<div style={{border:`1px dashed ${dk?"#2A3A56":"#C9D6E8"}`,background:boxBg,borderRadius:12,padding:"10px 12px",marginBottom:8,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:180}}>
                  <div style={{fontSize:13,fontWeight:700}}>Starsze sztuki bez karty: {legacy}</div>
                  <div style={{fontSize:11,color:subC,marginTop:2}}>Liczone jak dotąd, bez numerów. Kartę utworzysz, kiedy zechcesz je śledzić (liczba sztuk się nie zmieni).</div>
                </div>
                <Btn small variant="secondary" onClick={()=>openConvert(eq)}>Utwórz kartę</Btn>
              </div>}
              <Btn small style={{marginTop:4}} onClick={()=>openNewCard(eq)}><Ico d={I.plus} s={16} c="#fff"/> Nowa sztuka</Btn>
            </>:<div style={{display:"flex",alignItems:"center",gap:12}}>
              <button onClick={()=>changeQty(eq,-1)} style={{width:44,height:44,borderRadius:10,border:"1.5px solid #D9E2F0",background:dk?"#18202F":"#EFF3FA",fontSize:20,cursor:"pointer",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}>−</button>
              <span style={{fontSize:18,fontWeight:800,minWidth:28,textAlign:"center"}}>{qty}</span>
              <button onClick={()=>changeQty(eq,1)} style={{width:44,height:44,borderRadius:10,border:"1.5px solid #D9E2F0",background:dk?"#18202F":"#EFF3FA",fontSize:20,cursor:"pointer",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}>+</button>
              <span style={{fontSize:12,color:subC}}>sztuk w magazynie, zapis od razu</span>
            </div>}

            <div style={{marginTop:16,borderTop:`1px solid ${lineC}`,paddingTop:12}}>
              <SectionLabel style={{marginBottom:6}}>Serwis i naprawy{entries.length>0?" ("+entries.length+")":""}</SectionLabel>
              {entries.length===0&&<div style={{fontSize:12,color:subC,marginBottom:4}}>Brak wpisów. Przeglądy i naprawy zapisane tu z kosztem trafiają do Finansów i Statystyk.</div>}
              {renderEntries(eq,shownEntries)}
              {entries.length>5&&<button onClick={()=>setAllEntries(a=>({...a,[eq]:!a[eq]}))} style={linkBtn}>{allEntries[eq]?"Pokaż mniej":"Pokaż wszystkie ("+entries.length+")"}</button>}
              <div><button onClick={()=>openSrv(eq,"")} style={linkBtn}>+ Wpis serwisowy</button></div>
            </div>

            <div style={{marginTop:10}}>
              <SectionLabel style={{marginBottom:2}}>Uwagi do załatwienia{issOpen.length>0?" ("+issOpen.length+")":""}</SectionLabel>
              {issOpen.length===0&&<div style={{fontSize:12,color:subC,padding:"4px 0"}}>Nic do załatwienia. Zapisz tu np. "wymienić rzepy" albo "dokręcić śrubki przy najbliższej okazji".</div>}
              {issOpen.map(i=>renderIssue(eq,i))}
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                <button onClick={()=>openIssue(eq,"")} style={linkBtn}>+ Dodaj uwagę</button>
                {issDone.length>0&&<button onClick={()=>setDoneOpen(d=>({...d,[eq]:!d[eq]}))} style={{...linkBtn,color:subC}}>{doneOpen[eq]?"Ukryj zrobione":"Zrobione ("+issDone.length+")"}</button>}
              </div>
              {doneOpen[eq]&&issDone.map(i=>renderIssue(eq,i))}
            </div>

            <div style={{marginTop:12}}>
              <button onClick={()=>setCfg(c=>({...c,[eq]:!c[eq]}))} style={linkBtn}>{cfg[eq]?"▲ Ukryj ustawienia sprzętu":"⚙ Ustawienia sprzętu"}</button>
              {cfg[eq]&&<div style={{marginTop:6,padding:12,background:boxBg,borderRadius:12}}>
                <SectionLabel style={{marginBottom:6}}>Grupa</SectionLabel>
                <div style={{display:"flex",gap:6,marginBottom:14}}>{EQUIPMENT_GROUPS.map(g=><button key={g.key} onClick={()=>assignCategory(eq,g.key)} style={{flex:1,padding:"10px 4px",borderRadius:8,border:"1px solid "+(cat===g.key?"#3E6FB0":"#D9E2F0"),background:cat===g.key?"#3E6FB0":"none",color:cat===g.key?"#fff":"#3E6FB0",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{g.label}</button>)}</div>
                <Inp label="Dodano do magazynu (od kiedy liczyć obłożenie)" value={addedDate[eq]||""} onChange={v=>{if(v)setStock(s=>({...(s||{}),addedDate:{...((s||{}).addedDate||{}),[eq]:v}}));}} type="date"/>
                {cat==="wozki"&&<div style={{display:"flex",gap:8}}>
                  <div style={{flex:1}}><Inp label="Siedzisko (cm)" value={seatWidth[eq]||""} onChange={v=>setStock(s=>({...(s||{}),seatWidth:{...((s||{}).seatWidth||{}),[eq]:v}}))} type="number"/></div>
                  <div style={{flex:1}}><Inp label="Całkowita (cm)" value={totalWidth[eq]||""} onChange={v=>setStock(s=>({...(s||{}),totalWidth:{...((s||{}).totalWidth||{}),[eq]:v}}))} type="number"/></div>
                </div>}
                <Inp label="Domyślny koszt zakupu 1 szt. (zł)" value={demo?"":((costs[eq]||{}).purchase||"")} onChange={v=>setStock(s=>{const cur=s||{};const ex=(cur.costs||{})[eq]||{purchase:0,repairs:[]};return {...cur,costs:{...(cur.costs||{}),[eq]:{...ex,purchase:+v||0}}};})} type="number"/>
                <div style={{fontSize:11,color:subC,marginBottom:12}}>Ta sama wartość jest w Statystykach (Opłacalność). Sztuki z własną ceną na karcie liczą się po swojej cenie.</div>
                <Btn small variant="danger" onClick={()=>archiveType(eq)}>Archiwizuj sprzęt</Btn>
              </div>}
            </div>
          </div>}
        </Card>;
      };

      const groupsAll=[...EQUIPMENT_GROUPS,{key:null,label:"Nieprzypisane"}];
      const shownGroups=group==="all"?groupsAll:groupsAll.filter(g=>g.key===group);
      const groupQty=key=>activeNames.filter(n=>categoryOf(n)===key).reduce((s,n)=>s+whQty(stock,n),0);

      // opis potwierdzenia trwałego usunięcia
      const purgeInfo=(()=>{
        if(!confirmPurge)return null;
        if(confirmPurge.kind==="type"){
          const name=confirmPurge.name;
          const cards=(machines||[]).filter(m=>m.type===name).length;
          const hist=(rentals||[]).filter(r=>r.equipment===name).length;
          const act=(rentals||[]).filter(r=>r.equipment===name&&r.status==="aktywne").length;
          const iss=issuesOf(name).length;
          return {kind:"type",title:"Usunąć na stałe?",name,cards,hist,act,iss};
        }
        const c=(machines||[]).find(m=>m.id===confirmPurge.id);
        if(!c)return null;
        const costly=(c.serviceLog||[]).filter(e=>+e.cost>0);
        return {kind:"card",title:"Usunąć kartę na stałe?",c,entries:(c.serviceLog||[]).length,costly:costly.length,sum:costly.reduce((a,e)=>a+(+e.cost||0),0)};
      })();

      return <div style={{paddingBottom:80}}>
        <div style={{padding:"28px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <div style={{minWidth:0}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800}}>Magazyn</div><div style={{fontSize:13,color:"#7A8FA6"}}>{demo?"?":totalQty} sztuk · {demo?"?":totalOut} wypożyczonych</div></div>
          <Btn small onClick={()=>openNewType(group==="all"?"szyny":group)}><Ico d={I.plus} s={16} c="#fff"/> Nowy sprzęt</Btn>
        </div>
        <div style={{display:"flex",gap:6,padding:"0 20px 14px",flexWrap:"wrap"}}>
          {[{k:"all",l:"Wszystko ("+totalQty+")"},...EQUIPMENT_GROUPS.map(g=>({k:g.key,l:g.label+" ("+groupQty(g.key)+")"}))].map(x=>
            <button key={x.k} onClick={()=>setGroup(x.k)} style={{flex:"1 1 auto",padding:"8px 10px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,whiteSpace:"nowrap",background:group===x.k?"#3E6FB0":dk?"#1E2F4A":"#D9E2F0",color:group===x.k?"#fff":dk?"#6B84AC":"#3E5578",fontFamily:"inherit",textAlign:"center"}}>{x.l}</button>
          )}
        </div>
        {att.due.length>0&&<div style={{padding:"0 20px"}}><Card style={{padding:"12px 16px"}}>
          <SectionLabel style={{marginBottom:6}}>Do serwisu</SectionLabel>
          {att.due.map(({c,s})=><div key={c.id} onClick={()=>{setOpen(o=>({...o,[c.type]:true}));setSelCard(c.id);setGroup("all");}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",cursor:"pointer",gap:8}}>
            <span style={{fontSize:13}}><b>{c.code||"(bez kodu)"}</b> · {c.type}</span>
            <Badge color={s.status==="zaległy"?"#E05C5C":"#F4A261"}>{s.status==="zaległy"?Math.abs(s.left)+" dni po terminie":"za "+s.left+" dni"}</Badge>
          </div>)}
        </Card></div>}
        {att.issues.length>0&&<div style={{padding:"0 20px"}}><Card style={{padding:"12px 16px"}}>
          <SectionLabel style={{marginBottom:6}}>Do załatwienia przy sprzęcie ({att.issues.length})</SectionLabel>
          {att.issues.slice(0,5).map(i=><div key={i.eq+"-"+i.id} onClick={()=>{setOpen(o=>({...o,[i.eq]:true}));setGroup("all");}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",cursor:"pointer",gap:8}}>
            <span style={{fontSize:13,minWidth:0}}>{i.text}</span>
            <span style={{fontSize:11,color:subC,flexShrink:0,textAlign:"right"}}>{i.eq}</span>
          </div>)}
          {att.issues.length>5&&<div style={{fontSize:11,color:subC,marginTop:2}}>…i {att.issues.length-5} więcej</div>}
        </Card></div>}
        {shownGroups.map(g=>{
          const names=activeNames.filter(n=>categoryOf(n)===g.key);
          if(names.length===0&&g.key===null)return null;
          const isReorder=reorder!==null&&reorder===g.key;
          const action=g.key!==null&&names.length>1?<button onClick={()=>setReorder(isReorder?null:g.key)} style={{...linkBtn,whiteSpace:"nowrap",padding:"6px 4px"}}>{isReorder?"Gotowe":"Kolejność"}</button>:null;
          return <div key={g.key||"none"} style={{padding:"0 20px",marginBottom:14}}>
            {groupHeader(g.key,g.label,action)}
            {names.length===0&&<div style={{fontSize:12,color:subC,marginBottom:8}}>Brak sprzętu w tej grupie</div>}
            {names.map((eq,idx)=>renderType(eq,idx,names))}
          </div>;
        })}
        {archivedCards.length>0&&<div style={{padding:"0 20px",marginBottom:14}}>
          <button onClick={()=>setShowRetired(v=>!v)} style={linkBtn}>{showRetired?"▲":"▼"} Archiwum sztuk ({archivedCards.length})</button>
          {showRetired&&archivedCards.map(c=><div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${lineC}`,gap:8}}>
            <div style={{minWidth:0}}><div style={{fontSize:13,fontWeight:600}}>{c.code||"(bez kodu)"} · {c.type}</div><div style={{fontSize:11,color:subC}}>{c.retired?"wycofana "+(c.retiredDate||"?")+(c.retiredReason?" · "+c.retiredReason:""):"stary wpis z dawnej zakładki Serwis"}</div></div>
            <div style={{display:"flex",gap:10,flexShrink:0}}>
              {c.retired&&<button onClick={()=>doRestore(c.id)} style={linkBtn}>Przywróć</button>}
              <button onClick={()=>setConfirmPurge({kind:"card",id:c.id})} style={{...linkBtn,color:"#E05C5C"}}>Usuń</button>
            </div>
          </div>)}
        </div>}
        {hiddenNames.length>0&&<div style={{padding:"0 20px",marginBottom:14}}>
          {groupHeader(null,"Zarchiwizowany sprzęt")}
          {hiddenNames.map(eq=><div key={eq} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${lineC}`,gap:8}}>
            <span style={{fontSize:13,color:subC,minWidth:0}}>{eq}</span>
            <div style={{display:"flex",gap:12,flexShrink:0}}>
              <button onClick={()=>restoreType(eq)} style={linkBtn}>Przywróć</button>
              <button onClick={()=>setConfirmPurge({kind:"type",name:eq})} style={{...linkBtn,color:"#E05C5C"}}>Usuń na stałe</button>
            </div>
          </div>)}
        </div>}

        {cardForm&&<Modal title={cardForm.mode==="new"?"Nowa sztuka":cardForm.mode==="convert"?"Karta dla starszej sztuki":"Edytuj kartę"} onClose={()=>setCardForm(null)}>
          <div style={{fontSize:13,color:"#7A8FA6",marginBottom:14}}>{cardForm.eq}{cardForm.mode==="convert"?" · liczba sztuk się nie zmieni":""}</div>
          <Inp label="Kod magazynowy *" value={cardForm.code} onChange={v=>{setFormError("");setCardForm(f=>({...f,code:v}));}} placeholder="dowolny, ale niepowtarzalny"/>
          {formError&&<div style={{fontSize:12,color:"#E05C5C",margin:"-8px 0 12px"}}>{formError}</div>}
          <Inp label="Numer fabryczny" value={cardForm.serialNo} onChange={v=>setCardForm(f=>({...f,serialNo:v}))} placeholder="z tabliczki urządzenia, opcjonalnie"/>
          <Inp label={cardForm.mode==="new"?"Data zakupu":"Data zakupu (opcjonalnie)"} value={cardForm.purchaseDate} onChange={v=>setCardForm(f=>({...f,purchaseDate:v}))} type="date"/>
          {cardForm.mode==="new"&&<div style={{fontSize:11,color:"#7A8FA6",margin:"-8px 0 14px"}}>Od tej daty sztuka liczy się do obłożenia. Wcześniejsze dni zostają bez zmian.</div>}
          <Inp label="Cena zakupu (zł)" value={cardForm.price} onChange={v=>setCardForm(f=>({...f,price:v}))} type="number" placeholder="puste = domyślna cena typu"/>
          {cardForm.mode==="convert"&&(()=>{
            const out=(rentals||[]).filter(r=>r.status==="aktywne"&&r.equipment===cardForm.eq&&!r.machineId);
            return <Sel label="Gdzie jest ta sztuka teraz?" value={cardForm.where} onChange={v=>setCardForm(f=>({...f,where:v}))} options={[{value:"",label:"W magazynie (wolna)"},...out.map(r=>({value:String(r.id),label:who(r)+(r.endDate?" · do "+r.endDate:"")}))]}/>;
          })()}
          {cardForm.mode==="edit"&&<Inp label="Serwis co ile dni" value={cardForm.period} onChange={v=>setCardForm(f=>({...f,period:v}))} type="number"/>}
          <Txa label="Notatki" value={cardForm.notes} onChange={v=>setCardForm(f=>({...f,notes:v}))} rows={2}/>
          <Btn style={{width:"100%",justifyContent:"center"}} onClick={saveCard}>{cardForm.mode==="new"?"Dodaj sztukę":cardForm.mode==="convert"?"Utwórz kartę":"Zapisz"}</Btn>
        </Modal>}

        {srvForm&&(()=>{
          const cards=whCards(machines,srvForm.eq);
          return <Modal title="Wpis serwisowy" onClose={()=>setSrvForm(null)}>
            <div style={{fontSize:13,color:"#7A8FA6",marginBottom:14}}>{srvForm.eq}</div>
            <Inp label="Data" value={srvForm.date} onChange={v=>{setFormError("");setSrvForm(f=>({...f,date:v}));}} type="date"/>
            <Sel label="Rodzaj" value={srvForm.type} onChange={v=>setSrvForm(f=>({...f,type:v}))} options={["Przegląd","Naprawa","Wymiana części","Kalibracja","Czyszczenie","Inne"].map(x=>({value:x,label:x}))}/>
            {cards.length>0&&<Sel label="Której sztuki dotyczy?" value={srvForm.cardId} onChange={v=>setSrvForm(f=>({...f,cardId:v}))} options={[{value:"",label:"Nie wskazuję (cały sprzęt)"},...cards.map(c=>({value:String(c.id),label:(c.code||"(bez kodu)")+(c.serialNo?" · "+c.serialNo:"")}))]}/>}
            <Txa label="Opis" value={srvForm.notes} onChange={v=>setSrvForm(f=>({...f,notes:v}))} rows={2} placeholder="np. wymiana rzepów, nowy silnik"/>
            <Inp label="Koszt (zł)" value={srvForm.cost} onChange={v=>setSrvForm(f=>({...f,cost:v}))} type="number" placeholder="0"/>
            <div style={{fontSize:11,color:"#7A8FA6",margin:"-6px 0 14px"}}>Koszt trafia do Finansów (kategoria Serwis) i do zwrotu z inwestycji w Statystykach.</div>
            {formError&&<div style={{fontSize:12,color:"#E05C5C",marginBottom:12}}>{formError}</div>}
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={saveSrv}>Zapisz</Btn>
          </Modal>;
        })()}

        {issueForm&&(()=>{
          const cards=whCards(machines,issueForm.eq);
          return <Modal title="Nowa uwaga" onClose={()=>setIssueForm(null)}>
            <div style={{fontSize:13,color:"#7A8FA6",marginBottom:14}}>{issueForm.eq}</div>
            <Txa label="Co trzeba zrobić?" value={issueForm.text} onChange={v=>{setFormError("");setIssueForm(f=>({...f,text:v}));}} rows={3} placeholder="np. wymienić rzepy, dokręcić śrubki przy najbliższej okazji"/>
            {cards.length>0&&<Sel label="Której sztuki dotyczy?" value={issueForm.cardId} onChange={v=>setIssueForm(f=>({...f,cardId:v}))} options={[{value:"",label:"Cały sprzęt / nie wiem"},...cards.map(c=>({value:String(c.id),label:(c.code||"(bez kodu)")+(c.serialNo?" · "+c.serialNo:"")}))]}/>}
            {formError&&<div style={{fontSize:12,color:"#E05C5C",marginBottom:12}}>{formError}</div>}
            <div style={{fontSize:11,color:"#7A8FA6",margin:"-4px 0 14px"}}>Uwaga będzie widoczna na Pulpicie i przy wypożyczaniu tego sprzętu, dopóki jej nie odhaczysz.</div>
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={saveIssue}>Dodaj uwagę</Btn>
          </Modal>;
        })()}

        {retireForm&&<Modal title="Wycofaj sztukę" onClose={()=>setRetireForm(null)}>
          <div style={{fontSize:13,color:"#7A8FA6",marginBottom:14}}>Sztuka trafi do archiwum, a liczba sztuk spadnie o 1 od wybranej daty. Dni sprzed tej daty zostają bez zmian, historia wypożyczeń i serwisu też.</div>
          <Inp label="Data wycofania" value={retireForm.date} onChange={v=>{setFormError("");setRetireForm(f=>({...f,date:v}));}} type="date"/>
          <Txa label="Powód (opcjonalnie)" value={retireForm.reason} onChange={v=>setRetireForm(f=>({...f,reason:v}))} rows={2} placeholder="np. sprzedana, zepsuta"/>
          {formError&&<div style={{fontSize:12,color:"#E05C5C",marginBottom:12}}>{formError}</div>}
          <Btn variant="danger" style={{width:"100%",justifyContent:"center"}} onClick={doRetire}>Wycofaj sztukę</Btn>
        </Modal>}

        {confirmDel!==null&&<Modal title="Usunąć kartę?" onClose={()=>setConfirmDel(null)}>
          <div style={{fontSize:14,color:"#7A8FA6",marginBottom:16}}>Karta zniknie, ale sztuka nie: wróci do "starszych sztuk bez karty" i liczba sztuk się nie zmieni. Karty z historią serwisu lub wypożyczeń usunąć się nie da.</div>
          <div style={{display:"flex",gap:10}}>
            <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(null)}>Anuluj</Btn>
            <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={doDelete}>Usuń kartę</Btn>
          </div>
        </Modal>}

        {purgeInfo&&<Modal title={purgeInfo.title} onClose={()=>setConfirmPurge(null)}>
          {purgeInfo.kind==="type"?<>
            <div style={{fontSize:15,fontWeight:700,marginBottom:10}}>{purgeInfo.name}</div>
            {purgeInfo.act>0
              ?<div style={{fontSize:14,color:"#E05C5C",marginBottom:16}}>Ten sprzęt ma aktywne wypożyczenie ({purgeInfo.act}). Najpierw je zakończ, potem będzie można go usunąć.</div>
              :<div style={{fontSize:14,color:"#7A8FA6",marginBottom:16,lineHeight:1.55}}>
                Zniknie z magazynu razem z ustawieniami: liczbą sztuk, datami, kosztem zakupu, historią liczby sztuk{purgeInfo.cards>0?", "+purgeInfo.cards+" kartami":""}{purgeInfo.iss>0?" i "+purgeInfo.iss+" uwagami":""}.
                {purgeInfo.hist>0?" Wypożyczenia z historii ("+purgeInfo.hist+") zostają, ale nie będą już przypisane do sprzętu w magazynie.":""} Tego nie da się cofnąć.
              </div>}
          </>:<>
            <div style={{fontSize:15,fontWeight:700,marginBottom:10}}>{purgeInfo.c.code||"(bez kodu)"} · {purgeInfo.c.type}</div>
            <div style={{fontSize:14,color:"#7A8FA6",marginBottom:16,lineHeight:1.55}}>
              {purgeInfo.entries>0?"Historia serwisu tej sztuki znika ("+purgeInfo.entries+" wpisów). ":"Karta nie ma wpisów serwisowych. "}
              {purgeInfo.costly>0?"Koszty ("+(demo?"****":purgeInfo.sum+" zł")+") zostają jako naprawy całego sprzętu, więc Finanse i Statystyki się nie zmienią. ":""}Tego nie da się cofnąć.
            </div>
          </>}
          <div style={{display:"flex",gap:10}}>
            <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmPurge(null)}>{purgeInfo.act>0?"Zamknij":"Anuluj"}</Btn>
            {!(purgeInfo.act>0)&&<Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={doPurge}>Usuń na stałe</Btn>}
          </div>
        </Modal>}

        {typeForm&&<Modal title="Nowy sprzęt" onClose={()=>setTypeForm(null)}>
          <Sel label="Grupa" value={typeForm.category} onChange={v=>setTypeForm(f=>({...f,category:v}))} options={EQUIPMENT_GROUPS.map(g=>({value:g.key,label:g.label}))}/>
          <Inp label="Nazwa sprzętu *" value={typeForm.name} onChange={v=>{setFormError("");setTypeForm(f=>({...f,name:v}));}} placeholder="np. Artromot K1 2027"/>
          {(typeForm.category==="szyny"||typeForm.category==="wozki")?<>
            <Inp label="Kod magazynowy pierwszej sztuki *" value={typeForm.code} onChange={v=>{setFormError("");setTypeForm(f=>({...f,code:v}));}} placeholder="dowolny, ale niepowtarzalny"/>
            <Inp label="Numer fabryczny" value={typeForm.serialNo} onChange={v=>setTypeForm(f=>({...f,serialNo:v}))} placeholder="opcjonalnie"/>
            <Inp label="Cena zakupu (zł)" value={typeForm.price} onChange={v=>setTypeForm(f=>({...f,price:v}))} type="number" placeholder="opcjonalnie"/>
          </>:<Inp label="Liczba sztuk" value={typeForm.qty} onChange={v=>setTypeForm(f=>({...f,qty:v}))} type="number"/>}
          <Inp label="Data zakupu / dodania do magazynu" value={typeForm.purchaseDate} onChange={v=>setTypeForm(f=>({...f,purchaseDate:v}))} type="date"/>
          {formError&&<div style={{fontSize:12,color:"#E05C5C",margin:"-4px 0 12px"}}>{formError}</div>}
          <Btn style={{width:"100%",justifyContent:"center"}} onClick={saveType}>Dodaj sprzęt</Btn>
        </Modal>}

        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      </div>;
    }
