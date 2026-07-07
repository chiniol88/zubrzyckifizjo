    // ── RENTALS ───────────────────────────────────────────────────────────────
    function PaymentForm({rentalId,rentalAmount,amountPaid,patientName,equipment,setRentals,setFinances}) {
      const [amt,setAmt]=useState("");
      const [date,setDate]=useState(todayLocal);
      const add=()=>{
        const v=+amt; if(!v) return;
        const rem=rentalAmount-(amountPaid||0);
        if(v>rem+0.01){alert(`Wpłata (${v} zł) przekracza pozostałą kwotę (${rem} zł)`);return;}
        const np={id:Date.now(),amount:v,date};
        setRentals(rs=>rs.map(x=>{
          if(x.id!==rentalId)return x;
          const newPayments=[...(x.payments||[]),np];
          const newPaid=newPayments.reduce((s,q)=>s+(+q.amount||0),0);
          return {...x,payments:newPayments,amountPaid:newPaid};
        }));
        setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"payment-"+np.id,date,type:"przychód",category:"Wypożyczalnia",amount:v,description:"Wypożyczenie – "+patientName+" ("+equipment+")"},...fs]);
        setAmt("");
      };
      return <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{display:"flex",gap:8}}>
          <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Kwota wpłaty..." style={{flex:1,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{flex:1,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
        </div>
        <button onClick={add} style={{background:"#0A7C7C",color:"#fff",border:"none",borderRadius:12,padding:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj wpłatę</button>
      </div>;
    }

    function HistoryFill({r,setRentals,setFinances}) {
      const cm=todayLocal().slice(0,7);
      // Generate all months from startDate month to current month
      const months=[];
      const [sy,sm]=r.startDate.split("-").map(Number);
      const [cy,cmn]=cm.split("-").map(Number);
      const startDay=r.startDate.split("-")[2]; // e.g. "08"
      let y=sy,m=sm;
      while(y<cy||(y===cy&&m<=cmn)){
        const mStr=y+"-"+String(m).padStart(2,"0");
        // paidDate = same day as startDate but capped to last day of that month
        const lastDay=new Date(y,m,0).getDate();
        const day=Math.min(+startDay,lastDay);
        const paidDate=mStr+"-"+String(day).padStart(2,"0");
        months.push({month:mStr,dueDate:paidDate,paidDate});
        m++;if(m>12){m=1;y++;}
      }
      const [checked,setChecked]=useState(()=>Object.fromEntries(months.map(x=>[x.month,true])));
      const [amounts,setAmounts]=useState(()=>Object.fromEntries(months.map(x=>[x.month,String(r.amount||"")])));
      const [bulkAmt,setBulkAmt]=useState(String(r.amount||""));
      const allChecked=months.every(x=>checked[x.month]);
      return <div>
        <div style={{background:"#FFF8E6",border:"1.5px solid #F4A26140",borderRadius:14,padding:14,marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>📋 Uzupełnij historię płatności</div>
          <div style={{fontSize:13,color:"#7A8FA6",lineHeight:1.5}}>To wypożyczenie trwa od {r.startDate}. Zaznacz które miesiące zostały opłacone i podaj kwoty, następnie zatwierdź.</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center"}}>
          <input type="number" value={bulkAmt} onChange={e=>{setBulkAmt(e.target.value);setAmounts(a=>Object.fromEntries(Object.keys(a).map(k=>[k,e.target.value])));}} placeholder="Kwota dla wszystkich..." style={{flex:1,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
          <button onClick={()=>setChecked(c=>Object.fromEntries(Object.keys(c).map(k=>[k,!allChecked])))} style={{padding:"10px 14px",borderRadius:12,border:"1.5px solid #E4EAF0",background:allChecked?"#0A7C7C":"#fff",color:allChecked?"#fff":"#7A8FA6",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{allChecked?"✓ Wszystkie":"Zaznacz wszystkie"}</button>
        </div>
        <div style={{borderRadius:12,border:"1.5px solid #E4EAF0",overflow:"hidden",marginBottom:14}}>
          {months.map((x,i)=>{
            const label=new Date(x.month+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"});
            return <div key={x.month} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:i<months.length-1?"1px solid #F2F5F7":"none",background:checked[x.month]?"#F6FFF9":"#FAFCFD"}}>
              <button onClick={()=>setChecked(c=>({...c,[x.month]:!c[x.month]}))} style={{width:22,height:22,borderRadius:6,border:`2px solid ${checked[x.month]?"#3DAA72":"#E4EAF0"}`,background:checked[x.month]?"#3DAA72":"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,padding:0}}>
                {checked[x.month]&&<span style={{color:"#fff",fontSize:13,lineHeight:1}}>✓</span>}
              </button>
              <div style={{flex:1,fontSize:14,fontWeight:checked[x.month]?600:400,color:checked[x.month]?"#1C2B3A":"#7A8FA6",textTransform:"capitalize"}}>{label}<div style={{fontSize:11,color:"#7A8FA6",fontWeight:400}}>{x.paidDate}</div></div>
              <input type="number" value={amounts[x.month]||""} onChange={e=>setAmounts(a=>({...a,[x.month]:e.target.value}))} disabled={!checked[x.month]} style={{width:80,padding:"7px 10px",border:"1.5px solid #E4EAF0",borderRadius:10,fontSize:13,outline:"none",background:checked[x.month]?"#FAFCFD":"#F2F5F7",fontFamily:"inherit",textAlign:"right",color:checked[x.month]?"#1C2B3A":"#7A8FA6"}}/>
              <span style={{fontSize:13,color:"#7A8FA6"}}>zł</span>
            </div>;
          })}
        </div>
        <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>{
          const newCycles=months.map(x=>({month:x.month,dueDate:x.dueDate,amount:+(amounts[x.month]||0),paid:!!checked[x.month],paidDate:checked[x.month]?x.paidDate:null}));
          setRentals(rs=>rs.map(rr=>rr.id===r.id?{...rr,cycles:newCycles}:rr));
          const newFinances=months.filter(x=>checked[x.month]&&+(amounts[x.month]||0)>0).map(x=>{
            const label=new Date(x.month+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"});
            return {id:Date.now()+Math.random(),sourceId:"cycle-"+r.id+"-"+x.dueDate,date:x.paidDate,type:"przychód",category:"Wypożyczalnia",amount:+(amounts[x.month]||0),description:"Wypożyczenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+") "+label};
          });
          if(newFinances.length)setFinances(fs=>[...newFinances,...fs]);
        }}>✓ Zatwierdź historię ({months.filter(x=>checked[x.month]).length} mies.)</Btn>
      </div>;
    }

    function CycleRow({r,cycle,setRentals,setFinances}) {
      const [amt,setAmt]=useState(String(cycle.amount||""));
      const [payDate,setPayDate]=useState(todayLocal);
      const dueDt=cycle.dueDate||cycle.month+"-15";
      const label=new Date(dueDt+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"long",year:"numeric"});
      const sid="cycle-"+r.id+"-"+(cycle.dueDate||cycle.month);
      if(cycle.cancelled) return (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #F2F5F7",opacity:.5}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#7A8FA6",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,textTransform:"capitalize",textDecoration:"line-through"}}>{label}</div><div style={{fontSize:12,color:"#7A8FA6"}}>Anulowany</div></div>
          </div>
          <button onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,cycles:(x.cycles||[]).map(c=>(c.dueDate||c.month)===(cycle.dueDate||cycle.month)?{...c,cancelled:false}:c)}:x))} style={{background:"#F2F5F7",border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,fontWeight:600,color:"#7A8FA6",cursor:"pointer",fontFamily:"inherit"}}>Przywróć</button>
        </div>
      );
      if(cycle.paid) return (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #F2F5F7"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#3DAA72",flexShrink:0}}/>
            <div><div style={{fontWeight:600,fontSize:14,textTransform:"capitalize"}}>{label}</div><div style={{fontSize:12,color:"#7A8FA6"}}>{cycle.amount>0?cycle.amount+" zł · "+cycle.paidDate:"🏥 NFZ — bez opłaty · "+cycle.paidDate}</div></div>
          </div>
          <button onClick={()=>{setRentals(rs=>rs.map(x=>x.id===r.id?{...x,cycles:(x.cycles||[]).map(c=>(c.dueDate||c.month)===(cycle.dueDate||cycle.month)?{...c,paid:false,paidDate:null}:c)}:x));setFinances(fs=>fs.filter(f=>f.sourceId!==sid));}} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,fontWeight:600,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Anuluj</button>
        </div>
      );
      return (
        <div style={{padding:"10px 0",borderBottom:"1px solid #F2F5F7"}}>
          <div style={{fontWeight:600,fontSize:14,textTransform:"capitalize",marginBottom:8,color:"#E05C5C"}}>⚠️ {label}</div>
          <div style={{display:"flex",gap:8,marginBottom:6}}>
            <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Kwota..." style={{flex:1,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
            <input type="date" value={payDate} onChange={e=>setPayDate(e.target.value)} style={{flex:1,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{const v=+amt;if(!v)return;const pd=payDate||todayLocal();setRentals(rs=>rs.map(x=>x.id===r.id?{...x,cycles:(x.cycles||[]).map(c=>(c.dueDate||c.month)===(cycle.dueDate||cycle.month)?{...c,amount:v,paid:true,paidDate:pd}:c)}:x));setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:sid,date:pd,type:"przychód",category:"Wypożyczalnia",amount:v,description:"Wypożyczenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+") "+label},...fs]);}} style={{flex:1,background:"#0A7C7C",color:"#fff",border:"none",borderRadius:12,padding:"10px 16px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✓ Opłać</button>
            <button onClick={()=>{const pd=payDate||todayLocal();setRentals(rs=>rs.map(x=>x.id===r.id?{...x,cycles:(x.cycles||[]).map(c=>(c.dueDate||c.month)===(cycle.dueDate||cycle.month)?{...c,amount:0,paid:true,paidDate:pd}:c)}:x));}} style={{background:"#FFF3E0",border:"none",borderRadius:12,padding:"10px 12px",fontSize:13,fontWeight:600,color:"#F4A261",cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>🏥 NFZ (0 zł)</button>
            <button onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,cycles:(x.cycles||[]).map(c=>(c.dueDate||c.month)===(cycle.dueDate||cycle.month)?{...c,cancelled:true}:c)}:x))} style={{background:"#FEE2E2",border:"none",borderRadius:12,padding:"10px 14px",fontSize:14,fontWeight:600,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Anuluj</button>
          </div>
        </div>
      );
    }

    // Pomocnik: ile sztuk danego sprzętu było w danym dniu
    // stock = {qty:{eq:n}, history:[{eq,qty,from}]}
    // Migracja ze starego formatu (plain {eq:n}) odbywa się w StockPanel przy zapisie
    function qtyAt(stock, eq, dateStr) {
      // stary format (brak history) — zwróć qty lub 1
      const qty = stock && stock.qty ? stock.qty : stock;
      const history = (stock && stock.history) || [];
      // wpisy dla tego urządzenia posortowane rosnąco po dacie
      const entries = history.filter(h=>h.eq===eq).sort((a,b)=>a.from.localeCompare(b.from));
      if(entries.length===0) return (qty&&qty[eq])||1;
      // znajdź ostatni wpis który był <= dateStr
      let result = (qty&&qty[eq])||1;
      for(const e of entries){
        if(e.from<=dateStr) result=e.qty;
        else break;
      }
      return result;
    }

    function StockPanel({rentals,stock,setStock}) {
      const dk=useContext(DarkCtx);
      const [open,setOpen]=useState(false);
      const [showEdit,setShowEdit]=useState(false);
      const [draft,setDraft]=useState({});

      // normalizuj stock do nowego formatu jeśli stary
      const qty = stock && stock.qty ? stock.qty : (stock||{});

      const activeCount=useMemo(()=>{
        const m={};
        rentals.filter(r=>r.status==="aktywne").forEach(r=>{m[r.equipment]=(m[r.equipment]||0)+1;});
        return m;
      },[rentals]);

      const total=eq=>qty[eq]||1;

      const summary=useMemo(()=>{
        let free=0,warn=0,occupied=0;
        EQUIPMENT.forEach(eq=>{const tot=total(eq),fr=tot-(activeCount[eq]||0);if(fr===0)occupied++;else if(fr===1&&tot>1)warn++;else free++;});
        return {free,warn,occupied};
      },[activeCount,qty]);

      const saveStock=()=>{
        const today=todayLocal();
        const prevQty=qty;
        const history=[...((stock&&stock.history)||[])];
        // dla każdego eq które się zmieniło — dodaj wpis historii
        EQUIPMENT.forEach(eq=>{
          const newQty=+draft[eq]||1;
          const oldQty=prevQty[eq]||1;
          if(newQty!==oldQty){
            history.push({eq,qty:newQty,from:today});
          }
        });
        const newQty=Object.fromEntries(EQUIPMENT.map(eq=>[eq,+draft[eq]||1]));
        setStock({qty:newQty,history});
        setShowEdit(false);
      };

      return <>
        <div style={{padding:"0 20px 12px"}}>
          <div style={{background:dk?"#1A2A2A":"#fff",borderRadius:16,overflow:"hidden",boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
            <div onClick={()=>setOpen(o=>!o)} style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"13px 16px",cursor:"pointer",position:"relative"}}>
              <span style={{fontSize:13,fontWeight:700,color:dk?"#8ABABA":"#4A6070",textTransform:"uppercase",letterSpacing:.8}}>Stan magazynu</span>
              <span style={{position:"absolute",right:16,fontSize:12,color:dk?"#5A8A8A":"#7A8FA6"}}>{open?"▲":"▼"}</span>
            </div>
            {open&&<div style={{borderTop:`1px solid ${dk?"#2A4040":"#F2F5F7"}`,padding:"12px 16px 14px"}}>
              {EQUIPMENT.map(eq=>{
                const active=activeCount[eq]||0,tot=total(eq),fr=tot-active;
                return <div key={eq} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${dk?"#2A4040":"#F2F5F7"}`}}>
                  <span style={{fontSize:14,fontWeight:500,color:dk?"#C8E8E8":"#1C2B3A"}}>{eq}</span>
                  <span style={{fontSize:13,fontWeight:700,color:dk?"#C8E8E8":"#1C2B3A"}}>{fr}/{tot}</span>
                </div>;
              })}
              <button onClick={e=>{e.stopPropagation();setDraft(Object.fromEntries(EQUIPMENT.map(eq=>[eq,String(qty[eq]||1)])));setShowEdit(true);}} style={{background:"none",border:"none",fontSize:12,color:"#0A7C7C",fontWeight:600,cursor:"pointer",fontFamily:"inherit",padding:"8px 0 0",marginTop:2}}>Edytuj stany magazynowe</button>
            </div>}
          </div>
        </div>
        {showEdit&&<Modal title="Edytuj stany magazynowe" onClose={()=>setShowEdit(false)}>
          <div style={{fontSize:13,color:"#7A8FA6",marginBottom:16}}>Podaj ile sztuk każdego sprzętu posiadasz łącznie. Zmiany są zapisywane z datą dzisiejszą i uwzględniane w statystykach historycznych.</div>
          {EQUIPMENT.map(eq=><div key={eq} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontSize:14,fontWeight:500,flex:1,paddingRight:12}}>{eq}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <button onClick={()=>setDraft(d=>({...d,[eq]:String(Math.max(1,(+d[eq]||1)-1))}))} style={{width:30,height:30,borderRadius:8,border:"1.5px solid #E4EAF0",background:"#F2F5F7",fontSize:18,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{fontSize:16,fontWeight:700,minWidth:24,textAlign:"center"}}>{draft[eq]||1}</span>
              <button onClick={()=>setDraft(d=>({...d,[eq]:String((+d[eq]||1)+1)}))} style={{width:30,height:30,borderRadius:8,border:"1.5px solid #E4EAF0",background:"#F2F5F7",fontSize:18,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          </div>)}
          <Btn style={{width:"100%",justifyContent:"center",marginTop:8}} onClick={saveStock}>Zapisz stany</Btn>
        </Modal>}
      </>;
    }


    function RCard({r,onClick}) {
      const demo=useDemo();
      const today=todayLocal(),dl=r.endDate?dateDiff(today,r.endDate):null,ov=dl!==null&&dl<0;
      const waitDays=r.reserved&&r.reservedAt?dateDiff(r.reservedAt,today):0;
      const startDl=r.reserved&&r.startDate?dateDiff(today,r.startDate):null;
      const unpaid=(r.cycles||[]).filter(c=>!c.paid&&!c.cancelled).length;
      const extDue=(r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||0),0);
      const totalAmount=(+r.amount||0)+extDue;
      const totalPaid=calcRentalPaid(r);

      // Zbierz wszystkie dokumenty (z payments + extensions)
      const allDocs=new Set([
        ...(r.payments||[]).map(p=>p.doc).filter(Boolean),
        ...(r.extensions||[]).map(e=>e.doc).filter(Boolean),
        ...(r.cycles||[]).map(c=>c.doc).filter(Boolean)
      ]);
      const hasReceipt=allDocs.has("receipt");
      const hasInvoice=allDocs.has("invoice");
      const needsName=r.patientName&&r.address&&r.patientName.trim()===r.address.trim();

      return <Card onClick={onClick}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2,flexWrap:"wrap"}}><div style={{fontWeight:700,fontSize:15}}>{r.equipment||"❓ Do ustalenia"}</div>{r.renewable&&<Badge color="#7C6AF4">🔄</Badge>}{r.reserved&&<Badge color="#7C6AF4">📋</Badge>}{r.reviewRequested&&<Badge color="#F4A261">⭐ opinia</Badge>}{r.plannedReturn&&<Badge color="#3DAA72">📅 {r.plannedReturn}</Badge>}{needsName&&<Badge color="#E05C5C">⚠️ brak nazwiska</Badge>}</div><div style={{fontSize:14}}>{demo?"Pacjent":r.patientName}</div></div>
          {r.status==="aktywne"&&(r.reserved?(startDl!==null?<Badge color={startDl<0?"#E05C5C":startDl===0?"#F4A261":"#7C6AF4"}>{startDl<0?Math.abs(startDl)+"d po term.":startDl===0?"Start dziś!":"za "+startDl+"d"}</Badge>:<Badge color="#F4A261">czeka {waitDays}d</Badge>):(r.renewable?<Badge color={unpaid>0?"#E05C5C":"#3DAA72"}>{unpaid>0?unpaid+" nieopłacone":"✓ opłacone"}</Badge>:dl!==null?<Badge color={ov?"#E05C5C":dl<7?"#F4A261":"#3DAA72"}>{ov?Math.abs(dl)+"d po term.":dl===0?"Dziś!":dl+"d"}</Badge>:<Badge color="#7A8FA6">brak terminu</Badge>))}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px 16px",fontSize:12,color:"#7A8FA6"}}>
          <span>📅 {r.startDate}{r.renewable?" → odnawialne":r.endDate?" → "+r.endDate:""}</span>
          <span>💰 {maskAmt(demo,totalAmount)} zł{r.renewable?"/mies.":""}</span>
          {r.renewable?(unpaid>0?<span style={{color:"#E05C5C",fontWeight:600}}>⚠️ {unpaid} {unpaid===1?"miesiąc":"mies."} do opłacenia</span>:<span style={{color:"#3DAA72",fontWeight:600}}>✓ wszystko opłacone</span>):(totalAmount-totalPaid)>0?<span style={{color:"#E05C5C",fontWeight:600}}>⚠️ do zapłaty: {demo?"****":totalAmount-totalPaid} zł</span>:<span style={{color:"#3DAA72",fontWeight:600}}>✓ opłacone</span>}
          {!demo&&r.address&&<span>📍 {r.address}</span>}
        </div>
        {(r.notes||hasReceipt||hasInvoice)&&<div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #F2F5F7",display:"flex",flexDirection:"column",gap:4}}>
          {(hasReceipt||hasInvoice)&&<div style={{display:"flex",gap:6}}>
            {hasReceipt&&<span style={{fontSize:11,fontWeight:600,color:"#0A7C7C",background:"#E6F4F4",borderRadius:6,padding:"2px 8px"}}>🧾 Paragon</span>}
            {hasInvoice&&<span style={{fontSize:11,fontWeight:600,color:"#7C6AF4",background:"#F0EEFF",borderRadius:6,padding:"2px 8px"}}>📄 Faktura</span>}
          </div>}
          {r.notes&&<div style={{fontSize:12,color:"#7A8FA6",lineHeight:1.4,whiteSpace:"pre-wrap"}}>📝 {r.notes}</div>}
        </div>}
      </Card>;
    }

    function generateUmowa(r) {
      const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      const today=new Date();
      const todayStr=today.getDate()+' '+['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'][today.getMonth()]+' '+today.getFullYear()+' r.';
      const eq=r.equipment||'';
      const isAK1=eq.includes('Artromot')||eq.includes('artromot');
      const isKinetec=eq.includes('Kinetec')||eq.includes('kinetec')||eq.includes('Optiflex');
      const isBalk=eq.includes('Balkonik')||eq.includes('balkonik')||eq.includes('Ambonka');
      const isInne=!isAK1&&!isKinetec&&!isBalk;
      const isCPM=isAK1||isKinetec||(isInne&&!isBalk);
      const ch=v=>v?'&#9745;':'&#9744;';
      const fmtDate=d=>d?d.split('-').reverse().join('.'):'___________';
      let duration='',dailyRate='';
      if(r.startDate&&r.endDate){
        const days=Math.round((new Date(r.endDate)-new Date(r.startDate))/(1000*60*60*24));
        duration=days>0?days:'';
        if(r.amount&&days>0){const net=(+r.amount)-(+r.transport||0);dailyRate=(net/days).toFixed(2);}
      }
      const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Umowa wypożyczenia</title><style>
@media print{@page{margin:1.5cm 2cm}body{-webkit-print-color-adjust:exact}}
body{font-family:Arial,sans-serif;font-size:9pt;line-height:1.3;color:#000;margin:1.5cm 2cm}
.hdr{text-align:center;margin-bottom:8px}.hdr b{font-size:12pt}
.hdr p{font-size:8.5pt;margin:1px 0}
h1{font-size:11pt;font-weight:bold;text-align:center;color:#003399;text-decoration:underline;border-bottom:2px solid #003399;padding-bottom:3px;margin:7px 0 10px}
.sec{font-weight:bold;text-align:center;border-bottom:2px solid #003399;margin:8px 0 4px;padding-bottom:2px;font-size:10pt}
.bl{display:inline-block;border-bottom:1px solid #000;min-width:110px}
.bl2{min-width:200px}.bl3{min-width:280px}
p{margin:2px 0}.bold7{font-weight:bold}
.row{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap;margin:2px 0}
.dim{color:#aaa}
.sigs{margin-top:32px;display:flex;justify-content:space-between}
.sig{width:44%}.sig-line{border-top:1px solid #000;margin-top:36px;padding-top:3px;font-weight:bold;font-size:9pt}
</style></head><body>
<div class="hdr"><b>ZubrzyckiPatrykFizjo</b>
<p>ul. Mysłowicka 14/37, 40-487 Katowice &nbsp;|&nbsp; NIP: 9542788785 &nbsp;|&nbsp; tel. 601 668 535</p>
<p>Konto: 27 1870 1045 2078 1085 9811 0001</p></div>
<h1>UMOWA WYPOŻYCZENIA SPRZĘTU REHABILITACYJNEGO</h1>
<p>Zawarta w <span class="bl bl2"></span>, dnia ${todayStr} pomiędzy:</p>
<p><b>Właścicielem:</b> ZubrzyckiPatrykFizjo, Patryk Zubrzycki, ul. Mysłowicka 14/37, 40-487 Katowice, NIP: 9542788785</p>
<p style="text-align:center;margin:4px 0">a</p>
<p><b>Wypożyczającym:</b> Imię i nazwisko: <b>${esc(r.patientName)||'<span class="bl bl2"></span>'}</b> &nbsp; PESEL: <span class="bl" style="min-width:140px"></span></p>
<p>Adres: <b>${esc(r.address)||'<span class="bl bl3"></span>'}</b></p>
<p>Tel.: <b>${esc(r.phone)||'<span class="bl" style="min-width:140px"></span>'}</b></p>
<div class="sec">§1 &nbsp; Przedmiot umowy</div>
<p>Właściciel oddaje Wypożyczającemu do używania urządzenie rehabilitacyjne:</p>
<table style="margin:6px 0;width:100%"><tr>
<td style="width:50%">${ch(isAK1)} CPM artromot K1</td><td>${ch(isKinetec)} CPM Kinetec</td></tr><tr>
<td>${ch(isBalk)} Balkonik</td><td>${ch(isInne)} Inne: ${isInne?'<b>'+esc(eq)+'</b>':'<span class="bl" style="min-width:140px"></span>'}</td></tr></table>
<p>Urządzenie zostaje wydane w stanie sprawnym, kompletnym i czystym. Wypożyczający potwierdza odbiór sprzętu i zapoznanie się z zasadami jego obsługi.</p>
<div class="sec">§2 &nbsp; Okres wypożyczenia i stawka</div>
<p class="${isCPM?'':'dim'}"><b>Aparat CPM (rozliczenie w dobach):</b></p>
<div class="row">Okres: <b>${isCPM&&duration?duration:'<span class="bl" style="min-width:30px"></span>'}</b> dób,&nbsp; od <b>${isCPM?fmtDate(r.startDate):'<span class="bl" style="min-width:80px"></span>'}</b> do <b>${isCPM?fmtDate(r.endDate):'<span class="bl" style="min-width:80px"></span>'}</b>&nbsp; Stawka: <b>${isCPM&&dailyRate?dailyRate:'<span class="bl" style="min-width:50px"></span>'}</b> zł / dobę</div>
<p style="margin-top:6px" class="${isBalk?'':'dim'}"><b>Balkonik / inny sprzęt (rozliczenie w miesiącach):</b></p>
<div class="row">Okres: <span class="bl" style="min-width:30px"></span> mies.,&nbsp; od <span class="bl" style="min-width:80px"></span> do <span class="bl" style="min-width:80px"></span>&nbsp; Stawka: <span class="bl" style="min-width:50px"></span> zł / mies.</div>
<div class="sec">§3 &nbsp; Wynagrodzenie i płatność</div>
<p><b>1.</b> Opłata za dowóz i odbiór urządzenia: <b>${r.transport&&+r.transport>0?esc(String(r.transport)):'<span class="bl" style="min-width:50px"></span>'}</b> zł</p>
<p><b>2.</b> Wynagrodzenie za cały okres wypożyczenia wynosi: <b>${r.amount?esc(String(r.amount)):'<span class="bl" style="min-width:60px"></span>'}</b> zł (słownie: <span class="bl bl2"></span>).</p>
<p><b>3.</b> Płatność następuje z góry w dniu podpisania umowy w formie: &#9744; gotówka &nbsp; &#9744; przelew &nbsp; &#9744; BLIK</p>
<p><b>4.</b> W przypadku płatności przelewem lub BLIK, za datę zapłaty uznaje się dzień wpływu środków na rachunek Właściciela.</p>
<p><b>5.</b> Dane do przelewu: ZubrzyckiPatrykFizjo — 27 1870 1045 2078 1085 9811 0001</p>
<div class="sec">§4 &nbsp; Obowiązki Wypożyczającego i odpowiedzialność</div>
<p><b>1.</b> Wypożyczający zobowiązuje się do używania urządzenia zgodnie z jego przeznaczeniem i instrukcją obsługi.</p>
<p><b>2.</b> Wypożyczający zobowiązuje się do przechowywania urządzenia w odpowiednich warunkach, chroniąc je przed uszkodzeniem, zawilgoceniem i kradzieżą.</p>
<p><b>3.</b> Wypożyczający ponosi pełną odpowiedzialność materialną za uszkodzenie, zniszczenie lub utratę urządzenia w czasie trwania umowy, w tym kradzież.</p>
<p><b>4.</b> W przypadku awarii lub uszkodzenia Wypożyczający niezwłocznie powiadamia Właściciela.</p>
<p><b>5.</b> Wypożyczający nie może oddawać urządzenia w podnajem ani użyczać osobom trzecim bez pisemnej zgody Właściciela.</p>
<p><b>6.</b> W przypadku stwierdzenia przy zwrocie uszkodzeń przekraczających normalne zużycie eksploatacyjne, Wypożyczający zobowiązuje się pokryć koszty naprawy według wyceny serwisowej.</p>
<p class="bold7"><b>7. Aparaty CPM — podczas użytkowania należy obowiązkowo stosować długie spodnie lub podłożyć ręcznik/ścierkę pod kończynę, celem ochrony podkładek urządzenia przed zabrudzeniem. Niestosowanie się do powyższego wymogu i stwierdzenie przy zwrocie zabrudzeń lub odbarwień podkładek jest równoznaczne z obowiązkiem pokrycia przez Wypożyczającego kosztów ich czyszczenia lub wymiany.</b></p>
<div class="sec">§5 &nbsp; Przedłużenie okresu wypożyczenia</div>
<p><b>1.</b> Wypożyczający może przedłużyć okres wypożyczenia po uprzednim uzgodnieniu z Właścicielem i uiszczeniu stosownej opłaty.</p>
<p><b>2.</b> Prośba o przedłużenie powinna być zgłoszona najpóźniej na 5 dni przed upływem pierwotnego terminu zwrotu.</p>
<p><b>3.</b> Okres przedłużenia ustalany jest indywidualnie przez Strony.</p>
<div class="sec">§6 &nbsp; Zwrot urządzenia</div>
<p><b>1.</b> Wypożyczający zobowiązuje się do zwrotu urządzenia w terminie określonym w §2, w stanie niepogorszonym ponad normalne zużycie eksploatacyjne.</p>
<p><b>2.</b> Urządzenie należy zwrócić kompletne, czyste i sprawne.</p>
<p><b>3.</b> Zwrot urządzenia następuje poprzez odbiór przez Właściciela w miejscu, w którym zostało ono dostarczone, chyba że Strony uzgodniły inaczej.</p>
<p><b>4.</b> Za każdy dzień opóźnienia w zwrocie ponad pierwotny termin, Wypożyczający uiszcza opłatę w wysokości stawki dobowej / dziennej wynikającej z §2.</p>
<p><b>5.</b> W przypadku gdy odbiór urządzenia przez Właściciela nastąpi po upływie ustalonego terminu z przyczyn leżących po stronie Właściciela, Wypożyczający nie ponosi z tego tytułu żadnych dodatkowych kosztów.</p>
<div class="sec">§7 &nbsp; Ochrona danych osobowych (RODO)</div>
<p><b>1.</b> Administratorem danych osobowych Wypożyczającego jest ZubrzyckiPatrykFizjo, Patryk Zubrzycki, ul. Mysłowicka 14/37, 40-487 Katowice, NIP: 9542788785.</p>
<p><b>2.</b> Dane osobowe przetwarzane są na podstawie art. 6 ust. 1 lit. b RODO (realizacja umowy) oraz art. 6 ust. 1 lit. c RODO (obowiązki prawne).</p>
<p><b>3.</b> Dane przechowywane są przez okres niezbędny do realizacji umowy oraz wynikający z przepisów prawa (w szczególności podatkowych).</p>
<p><b>4.</b> Wypożyczającemu przysługuje prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania.</p>
<div class="sec">§8 &nbsp; Postanowienia końcowe</div>
<p><b>1.</b> Umowa sporządzona w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.</p>
<p><b>2.</b> Wszelkie zmiany umowy wymagają formy pisemnej pod rygorem nieważności.</p>
<p><b>3.</b> W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu Cywilnego.</p>
<p><b>4.</b> Spory wynikłe z umowy Strony zobowiązują się rozstrzygać polubownie, a w razie braku porozumienia — przed sądem właściwym dla siedziby Właściciela.</p>
<div class="sigs">
<div class="sig"><div class="sig-line">Podpis WYPOŻYCZAJĄCEGO</div></div>
<div class="sig" style="text-align:right"><div class="sig-line">Podpis WŁAŚCICIELA</div></div>
</div>
<script>window.onload=function(){window.print();}<\/script>
</body></html>`;
      const win=window.open('','_blank');
      if(win){win.document.write(html);win.document.close();}
      else alert('Zezwól na otwieranie nowych okien w przeglądarce.');
    }

    function Rentals({rentals,setRentals,finances,setFinances,patients,setPatients,allClients,initialDetail,onDetailClosed,backLabel,rentalsView,setRentalsView,stock,setStock,settings}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const view=rentalsView||"aktywne",setView=setRentalsView;
      const [showAdd,setShowAdd]=useState(false);
      const [showEdit,setShowEdit]=useState(false);
      const [detail,setDetail]=useState(null);
      const [showExtend,setShowExtend]=useState(false);
      const [extForm,setExtForm]=useState({newEndDate:"",endTime:"10:00",amountDue:"",amountPaid:"",payDate:"",notes:"",editId:null});
      const [form,setForm]=useState(emptyRental);
      const [ef,setEf]=useState(null);
      const [confirmDel,setConfirmDel]=useState(false);
      const [closeDate,setCloseDate]=useState("");
      const [toast,setToast]=useState(null);
      const [zakSubView,setZakSubView]=useState("wszystkie");
      const [showImport,setShowImport]=useState(false);
      const [csvRows,setCsvRows]=useState([]);
      const [csvError,setCsvError]=useState("");
      const importRef=useRef(null);

      const effectiveDetail = detail !== null ? detail : (initialDetail ?? null);
      const close=()=>{setDetail(null);if(onDetailClosed)onDetailClosed();};

      const cnt={aktywne:rentals.filter(r=>r.status==="aktywne"&&!r.renewable&&!r.reserved).length,odnawialne:rentals.filter(r=>r.status==="aktywne"&&r.renewable&&!r.reserved).length,oczekujace:rentals.filter(r=>r.status==="aktywne"&&r.reserved).length,zakończone:rentals.filter(r=>r.status==="zakończone").length};
      const cntZakOkres=rentals.filter(r=>r.status==="zakończone"&&!r.renewable).length;
      const cntZakCykl=rentals.filter(r=>r.status==="zakończone"&&r.renewable).length;
      const zakBase=rentals.filter(r=>r.status==="zakończone");
      const zakFiltered=zakSubView==="cykliczne"?zakBase.filter(r=>r.renewable):zakSubView==="okresowe"?zakBase.filter(r=>!r.renewable):zakBase;
      const filt=view==="aktywne"?rentals.filter(r=>r.status==="aktywne"&&!r.renewable&&!r.reserved).sort((a,b)=>(a.endDate||"9999-99-99").localeCompare(b.endDate||"9999-99-99"))
      :view==="odnawialne"?rentals.filter(r=>r.status==="aktywne"&&r.renewable&&!r.reserved)
      :view==="oczekujace"?rentals.filter(r=>r.status==="aktywne"&&r.reserved).sort((a,b)=>(a.startDate||"9999").localeCompare(b.startDate||"9999"))
      :zakFiltered.slice().sort((a,b)=>(b.endDate||b.startDate||"").localeCompare(a.endDate||a.startDate||""));

      if(effectiveDetail!==null) {
        const r=rentals.find(x=>x.id===effectiveDetail);
        if(!r){setDetail(null);return null;}
        const today=todayLocal(),dl=r.endDate?dateDiff(today,r.endDate):null,ov=dl!==null&&dl<0;
        const maps=r.address?`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(r.address)}`:null;
        return <>
          <div>
            <button onClick={close} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,color:"#0A7C7C",fontWeight:600,cursor:"pointer",padding:"20px 20px 0",fontFamily:"inherit",fontSize:14}}><Ico d={I.back} s={18} c="#0A7C7C"/> {backLabel||"Wypożyczalnia"}</button>
            <div style={{padding:"16px 20px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800}}>{r.equipment||"❓ Do ustalenia"}</div>
                  {r.renewable?<Badge color="#7C6AF4">🔄 Odnawialne miesięcznie</Badge>:dl!==null&&<Badge color={ov?"#E05C5C":dl<7?"#F4A261":"#3DAA72"}>{ov?Math.abs(dl)+"d po terminie":dl===0?"Termin dziś!":dl+" dni"}</Badge>}
                </div>
                <div style={{display:"flex",gap:6}}>
                  {!demo&&<Btn small variant="secondary" onClick={()=>generateUmowa(r)}>📄 Umowa</Btn>}
                  <Btn small variant="secondary" onClick={()=>{setEf({...r,amount:String(r.amount),amountPaid:String(calcRentalPaid(r))});setShowEdit(true);}}>✏️ Edytuj</Btn>
                </div>
              </div>

              <Card style={{marginBottom:10}}>
                <SectionLabel>Pacjent</SectionLabel>
                <div style={{fontWeight:700,fontSize:16,marginBottom:12}}>{demo?"Pacjent":r.patientName}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:r.address?10:0}}>
                  <div style={{fontSize:14,color:"#7A8FA6"}}>{maskPhone(demo,r.phone)}</div>
                  {r.phone&&!demo&&<div style={{display:"flex",gap:6}}>
                    <a href={`tel:${r.phone.replace(/\s/g,"")}`} style={{textDecoration:"none"}}><Btn small variant="secondary"><Ico d={I.ph} s={15} c="#0A7C7C"/> Zadzwoń</Btn></a>
                    <a href={`sms:${r.phone.replace(/\s/g,"")}`} style={{textDecoration:"none"}}><Btn small variant="secondary"><Ico d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" s={15} c="#0A7C7C"/> SMS</Btn></a>
                  </div>}
                </div>
                {r.address&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:14,color:"#7A8FA6",flex:1,paddingRight:8}}>{maskAddr(demo,r.address)}</div>
                  {maps&&!demo&&<a href={maps} target="_blank" rel="noreferrer" style={{textDecoration:"none",flexShrink:0}}><Btn small variant="secondary">🗺️ Trasa</Btn></a>}
                </div>}
              </Card>

              <Card style={{marginBottom:10}}>
                <SectionLabel>Wypożyczenie</SectionLabel>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                  <div><div style={{fontSize:11,color:"#7A8FA6",marginBottom:3}}>Data od</div><div style={{fontWeight:600}}>{r.startDate}</div></div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                    <div><div style={{fontSize:11,color:"#7A8FA6",marginBottom:3}}>Data do</div><div style={{fontWeight:600}}>{r.endDate||"—"}</div></div>
                    {r.status==="aktywne"&&!r.renewable&&r.endDate&&<button onClick={()=>{setExtForm({newEndDate:"",endTime:"10:00",amountDue:"",amountPaid:"",payDate:"",notes:"",editId:null});setShowExtend(true);}} style={{background:"#E6F4F4",border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,fontWeight:600,color:"#0A7C7C",cursor:"pointer",fontFamily:"inherit"}}>+ Przedłuż</button>}
                  </div>
                  <div><div style={{fontSize:11,color:"#7A8FA6",marginBottom:3}}>Typ</div><div style={{fontWeight:600}}>{r.renewable?"Odnawialne":"Jednorazowe"}</div></div>
                  {r.transport>0&&<div><div style={{fontSize:11,color:"#7A8FA6",marginBottom:3}}>Transport</div><div style={{fontWeight:600,color:"#F4A261"}}>{demo?"****":r.transport+" zł"}</div></div>}
                </div>
                {r.renewable&&r.transport>0&&<div style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid #E4EAF0",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                  <div style={{fontSize:13,color:"#7A8FA6"}}>{r.transportPaid?"Transport opłacony "+r.transportPaidDate:"Transport jeszcze nieopłacony"}</div>
                  {r.transportPaid
                    ? <button onClick={()=>{setRentals(rs=>rs.map(x=>x.id===r.id?{...x,transportPaid:false,transportPaidDate:null}:x));setFinances(fs=>fs.filter(f=>f.sourceId!=="transport-"+r.id));}} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Anuluj</button>
                    : <button onClick={()=>{const pd=todayLocal();setRentals(rs=>rs.map(x=>x.id===r.id?{...x,transportPaid:true,transportPaidDate:pd}:x));setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"transport-"+r.id,date:pd,type:"przychód",category:"Wypożyczalnia",amount:+r.transport,description:"Transport – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+")"},...fs]);}} style={{background:"#0A7C7C",color:"#fff",border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>✓ Opłacono</button>
                  }
                </div>}
                {(r.extensions||[]).length>0&&<div style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid #E4EAF0"}}>
                  <SectionLabel style={{marginBottom:8}}>Historia przedłużeń</SectionLabel>
                  <div style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6,paddingBottom:6,borderBottom:"1px solid #F2F5F7"}}>
                    <div style={{width:3,borderRadius:2,background:"#E4EAF0",alignSelf:"stretch",minHeight:32,marginTop:2,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:"#7A8FA6"}}>Okres oryginalny</div>
                      <div style={{fontSize:13,fontWeight:600}}>{r.startDate} → {(r.extensions||[])[0]?.prevEndDate||r.endDate} · <span style={{color:"#1C2B3A"}}>{demo?"****":r.amount+" zł"}</span></div>
                    </div>
                  </div>
                  {(r.extensions||[]).map((ext,i)=><div key={ext.id||i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6,paddingBottom:6,borderBottom:"1px solid #F2F5F7"}}>
                    <div style={{width:3,borderRadius:2,background:"#0A7C7C",alignSelf:"stretch",minHeight:32,marginTop:2,flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:"#0A7C7C",fontWeight:600}}>Przedłużenie {i+1}</div>
                      <div style={{fontSize:13}}>{ext.prevEndDate} → {ext.newEndDate}</div>
                      {(ext.amountDue||ext.amount||0)>0&&<div style={{fontSize:12,marginTop:2}}>
                        <span style={{color:"#7A8FA6"}}>Należne: </span><span style={{fontWeight:600}}>{ext.amountDue||ext.amount} zł</span>
                        {(()=>{
                          const cd=(+r.amount||0)+(r.extensions||[]).slice(0,i+1).reduce((s,e)=>s+(+e.amountDue||+e.amount||0),0);
                          const cov=calcRentalPaid(r)>=cd;
                          return (ext.amountPaid||0)>0
                            ? <><span style={{color:"#3DAA72",marginLeft:8}}>✓ Zapłacono: {ext.amountPaid} zł</span>{(ext.amountPaid)<(ext.amountDue||ext.amount||0)&&<span style={{color:"#E05C5C",marginLeft:8}}>Pozostało: {(ext.amountDue||ext.amount||0)-ext.amountPaid} zł</span>}</>
                            : cov
                              ? <span style={{color:"#3DAA72",marginLeft:8}}>✓ pokryte wpłatą</span>
                              : <span style={{color:"#F4A261",marginLeft:8}}>· do zapłaty</span>;
                        })()}
                      </div>}
                      {ext.notes&&<div style={{fontSize:12,color:"#7A8FA6",marginTop:2,fontStyle:"italic",whiteSpace:"pre-wrap"}}>{ext.notes}</div>}
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button onClick={()=>{setExtForm({newEndDate:ext.newEndDate,endTime:ext.endTime||"10:00",amountDue:String(ext.amountDue||ext.amount||""),amountPaid:String(ext.amountPaid||""),payDate:ext.paidDate||"",notes:ext.notes||"",editId:ext.id||i});setShowExtend(true);}} style={{background:"#E6F4F4",border:"none",borderRadius:8,padding:"5px 9px",fontSize:12,fontWeight:600,color:"#0A7C7C",cursor:"pointer",fontFamily:"inherit"}}>✏️</button>
                      <button onClick={()=>{
                        const prevEnd = i===0 ? (r.extensions||[])[0].prevEndDate : (r.extensions||[])[i-1].newEndDate;
                        const newExts = (r.extensions||[]).filter((_,j)=>j!==i);
                        const newEndDate = newExts.length>0 ? newExts[newExts.length-1].newEndDate : prevEnd;
                        setRentals(rs=>rs.map(x=>x.id===r.id?{...x,endDate:newEndDate,extensions:newExts}:x));
                        if(ext.amount>0||(ext.amountPaid||0)>0){
                          if(ext.id){
                            setFinances(fs=>fs.filter(f=>f.sourceId!=="extend-"+r.id+"-"+ext.id));
                          } else {
                            // Stare przedłużenie bez id — szukamy po opisie i kwocie
                            setFinances(fs=>{
                              const toRemove=fs.findIndex(f=>f.sourceId&&f.sourceId.startsWith("extend-"+r.id+"-")&&f.amount===(ext.amountPaid||ext.amount)&&!newExts.some(e=>e.id&&f.sourceId==="extend-"+r.id+"-"+e.id));
                              return toRemove>=0?fs.filter((_,j)=>j!==toRemove):fs;
                            });
                          }
                        }
                      }} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"5px 9px",fontSize:12,fontWeight:600,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>✕</button>
                    </div>
                  </div>)}
                </div>}
                <div style={{borderTop:"1px solid #E4EAF0",paddingTop:12}}>
                  {r.renewable ? <>
                    <SectionLabel>Cykle miesięczne</SectionLabel>
                    {(r.cycles||[]).length===0&&r.startDate<todayLocal().slice(0,7)
                      ? <HistoryFill r={r} setRentals={setRentals} setFinances={setFinances}/>
                      : <>
                          {(r.cycles||[]).length===0&&<div style={{fontSize:14,color:"#7A8FA6",textAlign:"center",padding:"12px 0"}}>Brak cykli — pojawią się automatycznie</div>}
                          {[...(r.cycles||[])].sort((a,b)=>(b.dueDate||b.month).localeCompare(a.dueDate||a.month)).map(c=><CycleRow key={c.dueDate||c.month} r={r} cycle={c} setRentals={setRentals} setFinances={setFinances}/>)}
                        </>
                    }
                  </> : (()=>{
                    // Łączna należność = oryginał + amountDue ze wszystkich przedłużeń
                    const extDue = (r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||+e.amount||0),0);
                    const totalAmount = (+r.amount||0) + extDue;
                    // Zapłacono = wpłaty z payments + amountPaid z przedłużeń
                    const paymentsPaid = (r.payments||[]).reduce((s,p)=>s+p.amount,0);
                    const extPaid = (r.extensions||[]).reduce((s,e)=>s+(e.amountPaid||0),0);
                    const totalPaid = calcRentalPaid(r);
                    const remaining = totalAmount - totalPaid;

                    // Historia wpłat: normalne wpłaty + przedłużenia które mają amountPaid>0
                    const allPayments = [
                      ...(r.payments||[]).map(p=>({...p,_type:"payment"})),
                      ...(r.extensions||[]).filter(e=>(e.amountPaid||0)>0).map(e=>({
                        id:"ext-"+e.id, amount:e.amountPaid, date:e.paidDate||e.date||r.startDate,
                        doc:e.doc, _type:"extension", _extId:e.id,
                        _label:"Przedłużenie → "+e.newEndDate,
                        _due:e.amountDue||e.amount||0
                      }))
                    ].sort((a,b)=>b.date.localeCompare(a.date));

                    return <>
                      <SectionLabel>Płatność</SectionLabel>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                        {[{l:"Łącznie",v:demo?"****":totalAmount+" zł",c:"#1C2B3A"},{l:"Zapłacono",v:demo?"****":totalPaid+" zł",c:"#3DAA72"},{l:"Pozostało",v:demo?"****":remaining+" zł",c:remaining>0?"#E05C5C":"#3DAA72"}].map((x,i)=>(
                          <div key={i} style={{background:x.c==="#1C2B3A"?"#F2F5F7":x.c+"14",borderRadius:12,padding:"10px 8px",textAlign:"center",border:`1.5px solid ${x.c==="#1C2B3A"?"#E4EAF0":x.c+"30"}`}}>
                            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:x.c}}>{x.v}</div>
                            <div style={{fontSize:11,color:"#7A8FA6",marginTop:2}}>{x.l}</div>
                          </div>
                        ))}
                      </div>
                      <PaymentForm rentalId={r.id} rentalAmount={totalAmount} amountPaid={totalPaid} patientName={r.patientName} equipment={r.equipment} setRentals={setRentals} setFinances={setFinances}/>
                      {allPayments.length>0&&<div style={{marginTop:14,paddingTop:12,borderTop:"1px solid #E4EAF0"}}>
                        <SectionLabel style={{marginBottom:8}}>Historia wpłat</SectionLabel>
                        {allPayments.map(p=>(
                          <div key={p.id} style={{padding:"10px 0",borderBottom:"1px solid #F2F5F7"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                                <div style={{width:8,height:8,borderRadius:"50%",background:p._type==="extension"?"#7C6AF4":"#3DAA72",flexShrink:0}}/>
                                <div>
                                  <div style={{fontWeight:600,fontSize:14}}>{demo?"****":p.amount+" zł"}{p._label&&<span style={{fontSize:12,color:"#7C6AF4",fontWeight:400,marginLeft:6}}>{p._label}</span>}</div>
                                  <div style={{fontSize:12,color:"#7A8FA6"}}>{p.date}{p._due>0&&p._due!==p.amount&&<span style={{marginLeft:6,color:"#F4A261"}}>należne: {p._due} zł</span>}</div>
                                </div>
                              </div>
                              <button onClick={()=>{
                                if(p._type==="payment"){
                                  setRentals(rs=>rs.map(x=>{
                                    if(x.id!==r.id)return x;
                                    const newPayments=(x.payments||[]).filter(q=>q.id!==p.id);
                                    const newPaid=newPayments.reduce((s,q)=>s+(+q.amount||0),0);
                                    return {...x,payments:newPayments,amountPaid:newPaid};
                                  }));
                                  setFinances(fs=>fs.filter(f=>f.sourceId!=="payment-"+p.id));
                                } else {
                                  // Usuń wpłatę za przedłużenie — zeruj amountPaid, zachowaj amountDue
                                  setRentals(rs=>rs.map(x=>x.id===r.id?{...x,extensions:(x.extensions||[]).map(e=>e.id===p._extId?{...e,amountPaid:0,paidDate:null,doc:null}:e)}:x));
                                  setFinances(fs=>fs.filter(f=>f.sourceId!=="extend-"+r.id+"-"+p._extId));
                                }
                              }} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,fontWeight:600,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Usuń</button>
                            </div>
                            <div style={{display:"flex",gap:8}}>
                              {[{k:"receipt",l:"🧾 Paragon"},{k:"invoice",l:"📄 Faktura"}].map(opt=>{
                                const ac=p.doc===opt.k;
                                const toggle=()=>{
                                  if(p._type==="payment"){
                                    setRentals(rs=>rs.map(x=>x.id===r.id?{...x,payments:(x.payments||[]).map(q=>q.id===p.id?{...q,doc:ac?null:opt.k}:q)}:x));
                                  } else {
                                    setRentals(rs=>rs.map(x=>x.id===r.id?{...x,extensions:(x.extensions||[]).map(e=>e.id===p._extId?{...e,doc:ac?null:opt.k}:e)}:x));
                                  }
                                };
                                return <button key={opt.k} onClick={toggle} style={{flex:1,padding:"7px 8px",borderRadius:10,fontFamily:"inherit",fontSize:12,fontWeight:600,cursor:"pointer",border:`1.5px solid ${ac?"#0A7C7C":"#E4EAF0"}`,background:ac?"#E6F4F4":"#fff",color:ac?"#0A7C7C":"#7A8FA6",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>{ac&&<span style={{fontSize:10}}>✓</span>}{opt.l}</button>;
                              })}
                            </div>
                          </div>
                        ))}
                      </div>}
                    </>;
                  })()}
                </div>
              </Card>

              {r.renewable&&(r.cycles||[]).length>0&&(()=>{
                const paid=(r.cycles||[]).filter(c=>c.paid);
                const total=calcRentalPaid(r);
                const unpaidN=(r.cycles||[]).filter(c=>!c.paid&&!c.cancelled).length;
                return <Card style={{marginBottom:10,background:"#E6F4F4",border:"1.5px solid #0A7C7C30"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#0A7C7C",textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Podsumowanie wypożyczenia</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {[{l:"Mies. łącznie",v:paid.length,c:"#0A7C7C",suf:""},{l:"Łącznie wpłacono",v:total,c:"#3DAA72",suf:" zł"},{l:"Do opłacenia",v:unpaidN,c:unpaidN>0?"#E05C5C":"#3DAA72",suf:" mies."}].map((x,i)=>(
                      <div key={i} style={{background:"#fff",borderRadius:12,padding:"10px 8px",textAlign:"center",border:"1.5px solid #E4EAF0"}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:x.c}}>{x.v}{x.suf}</div>
                        <div style={{fontSize:11,color:"#7A8FA6",marginTop:2}}>{x.l}</div>
                      </div>
                    ))}
                  </div>
                </Card>;
              })()}

              {r.notes&&<Card style={{marginBottom:10,background:"#FFFBF5",border:"1.5px solid #F4A26130"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#F4A261",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Notatki</div>
                <div style={{fontSize:14,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{r.notes}</div>
              </Card>}

              {r.status==="aktywne"&&<>
                <div style={{marginBottom:14}}>
                  <button onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,reserved:!x.reserved,reservedAt:!x.reserved?todayLocal():x.reservedAt}:x))}
                    style={{width:"100%",padding:"10px 14px",borderRadius:12,border:`1.5px solid ${r.reserved?"#7C6AF4":"#E4EAF0"}`,background:r.reserved?"#F0EEFF":dk?"#1A2A3A":"#fff",color:r.reserved?"#7C6AF4":"#7A8FA6",fontFamily:"inherit",fontWeight:600,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    {r.reserved&&<span>✓</span>}📋 Do potwierdzenia
                    {r.reserved&&<span style={{fontSize:11,fontWeight:400,marginLeft:4}}>{r.startDate?"· start "+r.startDate:"· czeka "+(r.reservedAt?dateDiff(r.reservedAt,todayLocal()):0)+"d"}</span>}
                  </button>
                </div>
                <div style={{marginBottom:14,background:dk?"#0F2020":"#F0F9F5",borderRadius:12,padding:"12px 14px"}}>
                  <div style={{fontSize:12,color:"#3DAA72",marginBottom:8,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>📅 Planowany odbiór</div>
                  <Inp label="" value={r.plannedReturn||""} onChange={v=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,plannedReturn:v||null}:x))} type="date"/>
                  {r.plannedReturn&&<><div style={{marginBottom:6,fontSize:12,fontWeight:600,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5}}>Odbiór</div>
                  <div style={{display:"flex",gap:6,marginBottom:8}}>{[{v:true,l:"🗓 Całodniowy"},{v:false,l:"⏰ Konkretna godzina"}].map(o=><button key={String(o.v)} onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,plannedReturnAllDay:o.v,...(o.v===false?{plannedReturnTime:x.plannedReturnTime||"10:00"}:{})}:x))} style={{flex:1,padding:"7px",borderRadius:10,border:`2px solid ${(r.plannedReturnAllDay!==false)===o.v?"#0A7C7C":"#E4EAF0"}`,background:(r.plannedReturnAllDay!==false)===o.v?"#E6F4F4":"#fff",color:(r.plannedReturnAllDay!==false)===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
                  {r.plannedReturnAllDay===false&&<TimeSel label="Godzina odbioru" value={r.plannedReturnTime||"10:00"} onChange={v=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,plannedReturnTime:v}:x))}/>}
                  <button onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,plannedReturn:null,plannedReturnAllDay:undefined,plannedReturnTime:undefined}:x))} style={{background:"none",border:"none",fontSize:12,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit",padding:"4px 0"}}>× Usuń planowany odbiór</button>
                  </>}
                </div>
                {r.renewable&&<div style={{marginBottom:10}}>
                  <div style={{fontSize:12,color:"#7A8FA6",marginBottom:6,fontWeight:600}}>Data zakończenia wypożyczenia</div>
                  <Inp label="" value={closeDate||r.plannedReturn||""} onChange={v=>setCloseDate(v)} type="date"/>
                </div>}
                <Btn style={{width:"100%",justifyContent:"center",marginBottom:10}} onClick={()=>{
                  const extTotal=(r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||0),0);
                  const totalAmount=(+r.amount||0)+extTotal;
                  const paymentsPaid=(r.payments||[]).reduce((s,p)=>s+p.amount,0);
                  const extPaid=(r.extensions||[]).reduce((s,e)=>s+(+e.amountPaid||0),0);
                  const remaining=totalAmount-calcRentalPaid(r);
                  const effectiveCloseDate=closeDate||r.plannedReturn||"";
                  if(r.renewable&&!effectiveCloseDate){alert("Podaj datę zakończenia");return;}
                  if(remaining>0&&!window.confirm(`Pozostało ${remaining} zł do zapłaty. Zakończyć mimo to?`))return;
                  const endMonth=r.renewable&&effectiveCloseDate?effectiveCloseDate.slice(0,7):null;
                  setRentals(rs=>rs.map(x=>x.id===r.id?{...x,status:"zakończone",endDate:r.renewable?effectiveCloseDate:x.endDate,
                    cycles:endMonth?((x.cycles||[]).filter(c=>c.paid||c.cancelled||c.month<=endMonth)):x.cycles
                  }:x));
                  if(endMonth){
                    const toRemove=new Set((r.cycles||[]).filter(c=>!c.paid&&c.month>endMonth).map(c=>"cycle-"+r.id+"-"+(c.dueDate||c.month)));
                    if(toRemove.size>0)setFinances(fs=>fs.filter(f=>!toRemove.has(f.sourceId)));
                  }
                  close();
                }}><Ico d={I.chk} s={16} c="#fff"/> Sprzęt zwrócony — zakończ</Btn>
              </>}
              {r.status==="zakończone"&&<Btn variant="secondary" style={{width:"100%",justifyContent:"center",marginBottom:10}} onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,status:"aktywne"}:x))}>↩️ Cofnij zakończenie</Btn>}
              {!r.renewable&&(()=>{
                const lastExt=(r.extensions||[]).at(-1);
                const dtStart=r.startDate+"T"+(r.startTime||"10:00")+":00";
                const endDate=lastExt?lastExt.newEndDate:r.endDate;
                const endTime=lastExt?(lastExt.endTime||"10:00"):(r.endTime||"10:00");
                const dtEnd=endDate?""+endDate+"T"+endTime+":00":dtStart;
                const desc="Tel: "+(r.phone||"brak")+(r.address?"\nAdres: "+r.address:"")+(r.notes?"\nNotatki: "+r.notes:"");
                return <Btn variant="secondary" style={{width:"100%",justifyContent:"center",marginBottom:10}} onClick={()=>openGCal("Wypożyczenie \u2013 "+r.patientName+" ("+r.equipment+")", dtStart, dtEnd, desc, false)}>📅 Dodaj do kalendarza</Btn>;
              })()}
              {(()=>{
                const tpl=(settings&&settings.reviewTemplate)||"Hej, dziękuję za wypożyczenie! Będę wdzięczny za opinię:";
                const msg=tpl;
                const smsHref="sms:"+(r.phone?r.phone.replace(/\s/g,""):"")+"?body="+encodeURIComponent(msg);
                return <div style={{marginBottom:10}}>
                  {r.reviewRequested&&<div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{fontSize:12,color:"#F4A261",fontWeight:600}}>⭐ Prośba o opinię wysłana</span>
                    <button onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,reviewRequested:false}:x))} style={{background:"none",border:"none",color:"#7A8FA6",fontSize:11,cursor:"pointer",fontFamily:"inherit",padding:"2px 6px",borderRadius:6,textDecoration:"underline"}}>× odznacz</button>
                  </div>}
                  <div style={{display:"flex",gap:8}}>
                    <a href={smsHref} style={{flex:1,textDecoration:"none"}} onClick={()=>setRentals(rs=>rs.map(x=>x.id===r.id?{...x,reviewRequested:true}:x))}>
                      <Btn variant="secondary" style={{width:"100%",justifyContent:"center",background:r.reviewRequested?"#F0FAF5":undefined,borderColor:r.reviewRequested?"#3DAA72":undefined}}>
                        ⭐ {r.reviewRequested?"Wyślij ponownie":"Poproś o opinię"} → SMS
                      </Btn>
                    </a>
                    <Btn variant="secondary" style={{flexShrink:0,padding:"0 14px"}} onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(msg).then(()=>alert("Skopiowano!"));setRentals(rs=>rs.map(x=>x.id===r.id?{...x,reviewRequested:true}:x));}}>📋</Btn>
                  </div>
                </div>;
              })()}
              <Btn variant="danger" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={()=>setConfirmDel(true)}>🗑️ Usuń wypożyczenie</Btn>
            </div>
          </div>

          {showEdit&&ef&&<Modal title="Edytuj wypożyczenie" onClose={()=>setShowEdit(false)}>
            <Sel label="Sprzęt" value={ef.equipment} onChange={v=>setEf(f=>({...f,equipment:v}))} options={[{value:"",label:"❓ Do ustalenia"},...EQUIPMENT.map(x=>({value:x,label:x}))]}/>
            <PatientPicker label="Pacjent" value={ef.patientName} onChange={v=>setEf(f=>({...f,patientName:v}))} onSelect={p=>setEf(f=>({...f,patientName:p.name,phone:p.phone,address:p.address,patientId:p.id}))} patients={allClients||patients}/>
            <Inp label="Telefon" value={ef.phone||""} onChange={v=>setEf(f=>({...f,phone:v}))} type="tel"/>
            <Inp label="Adres" value={ef.address||""} onChange={v=>setEf(f=>({...f,address:v}))}/>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:600,color:"#7A8FA6",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Typ</div>
              <div style={{display:"flex",gap:8}}>{[{v:false,l:"Jednorazowe"},{v:true,l:"Odnawialne"}].map(o=><button key={String(o.v)} onClick={()=>setEf(f=>({...f,renewable:o.v}))} style={{flex:1,padding:"10px 8px",borderRadius:12,border:`2px solid ${ef.renewable===o.v?"#0A7C7C":"#E4EAF0"}`,background:ef.renewable===o.v?"#E6F4F4":"#fff",color:ef.renewable===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
            </div>
            <Inp label="Data od" value={ef.startDate} onChange={v=>setEf(f=>({...f,startDate:v}))} type="date"/>
            <div style={{marginBottom:6,fontSize:12,fontWeight:600,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5}}>Dowóz</div>
            <div style={{display:"flex",gap:6,marginBottom:10}}>
              {[{v:false,l:"⏰ Konkretna godzina"},{v:true,l:"🗓 Całodniowy"}].map(o=>{const cur=ef.startAllDay!==undefined?ef.startAllDay:(ef.allDay||false);return <button key={String(o.v)} onClick={()=>setEf(f=>({...f,startAllDay:o.v,allDay:undefined}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${cur===o.v?"#0A7C7C":"#E4EAF0"}`,background:cur===o.v?"#E6F4F4":"#fff",color:cur===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>;})}
            </div>
            {!(ef.startAllDay!==undefined?ef.startAllDay:(ef.allDay||false))&&<TimeSel label="Godzina dowozu" value={ef.startTime||"10:00"} onChange={v=>setEf(f=>({...f,startTime:v}))}/>}
            {!ef.renewable&&<Inp label="Data do" value={ef.endDate||""} onChange={v=>setEf(f=>({...f,endDate:v}))} type="date"/>}
            {!ef.renewable&&ef.endDate&&<><div style={{marginBottom:6,fontSize:12,fontWeight:600,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5}}>Odbiór</div>
            <div style={{display:"flex",gap:6,marginBottom:10}}>
              {[{v:false,l:"⏰ Konkretna godzina"},{v:true,l:"🗓 Całodniowy"}].map(o=>{const cur=ef.endAllDay!==undefined?ef.endAllDay:(ef.allDay||false);return <button key={String(o.v)} onClick={()=>setEf(f=>({...f,endAllDay:o.v,allDay:undefined}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${cur===o.v?"#0A7C7C":"#E4EAF0"}`,background:cur===o.v?"#E6F4F4":"#fff",color:cur===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>;})}
            </div>
            {!(ef.endAllDay!==undefined?ef.endAllDay:(ef.allDay||false))&&<TimeSel label="Godzina odbioru" value={ef.endTime||"10:00"} onChange={v=>setEf(f=>({...f,endTime:v}))}/>}</>}
            <Inp label="Kwota (zł)" value={ef.amount} onChange={v=>setEf(f=>({...f,amount:v}))} type="number"/>
            {!ef.renewable&&<Inp label="Zapłacono (zł)" value={ef.amountPaid} onChange={v=>setEf(f=>({...f,amountPaid:v}))} type="number"/>}
            {ef.renewable&&<div style={{fontSize:12,color:"#7A8FA6",padding:"10px 14px",background:"#F2F5F7",borderRadius:12,marginBottom:14}}>Płatności zarządzane przez cykle miesięczne</div>}
            <Inp label="Transport (zł)" value={ef.transport||""} onChange={v=>setEf(f=>({...f,transport:v}))} type="number" placeholder="0"/>
            <Txa label="Notatki" value={ef.notes||""} onChange={v=>setEf(f=>({...f,notes:v}))} rows={2}/>
            <Sel label="Skąd dowiedział się o wypożyczeniu?" value={ef.source||""} onChange={v=>setEf(f=>({...f,source:v}))} options={[{value:"",label:"— nie wiem / nie podał"},...RENTAL_SOURCES.map(s=>({value:s.value,label:s.label}))]}/>
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>{
              const raw=+ef.amount,pat=patients.find(p=>p.name===ef.patientName);
              const cur=rentals.find(x=>x.id===effectiveDetail);
              const newPaid=ef.renewable?(cur?.amountPaid||0):Math.min(+(ef.amountPaid||0),raw);
              const u={...ef,amount:raw,amountPaid:newPaid,patientId:pat?.id||ef.patientId||null};
              // Dla jednorazowych bez payments: jeśli wpisano zapłacono → utwórz wpłatę i wpis finansowy
              const hasPayments=cur&&(cur.payments||[]).length>0;
              if(!ef.renewable&&!hasPayments&&newPaid>0){
                const npid=Date.now();
                const np={id:npid,amount:newPaid,date:u.startDate||todayLocal()};
                setRentals(rs=>rs.map(x=>x.id===effectiveDetail?{...x,...u,payments:[np]}:x));
                setFinances(fs=>[{id:Date.now()+1,sourceId:"payment-"+npid,date:u.startDate||todayLocal(),type:"przychód",category:"Wypożyczalnia",amount:newPaid,description:"Wypożyczenie – "+u.patientName+" ("+(u.equipment||"Do ustalenia")+")"},...fs]);
              } else {
                setRentals(rs=>rs.map(x=>x.id===effectiveDetail?{...x,...u}:x));
              }
              // Sync opisy finansów: normalne wpłaty + przedłużenia
              setFinances(fs=>fs.map(f=>{
                if(!cur)return f;
                const isPayment=(cur.payments||[]).some(p=>f.sourceId==="payment-"+p.id);
                const isExtension=f.sourceId&&f.sourceId.startsWith("extend-"+effectiveDetail+"-");
                if(isPayment) return{...f,description:"Wypożyczenie – "+u.patientName+" ("+u.equipment+")"};
                if(isExtension) return{...f,description:"Przedłużenie – "+u.patientName+" ("+u.equipment+")"};
                return f;
              }));
              setShowEdit(false);setToast("Zmiany zapisane");
            }}>Zapisz zmiany</Btn>
          </Modal>}

          {showExtend&&<Modal title={extForm.editId!=null?"Edytuj przedłużenie":"Przedłuż wypożyczenie"} onClose={()=>setShowExtend(false)}>
            <div style={{fontSize:14,color:"#7A8FA6",marginBottom:14}}>{r.patientName} · {r.equipment||"❓ Do ustalenia"}</div>
            {extForm.editId==null&&<div style={{marginBottom:12,padding:"10px 14px",background:"#F2F5F7",borderRadius:10,fontSize:13}}>
              <span style={{color:"#7A8FA6"}}>Aktualna data do: </span><span style={{fontWeight:700}}>{r.endDate}</span>
            </div>}
            <Inp label="Nowa data końca *" value={extForm.newEndDate} onChange={v=>setExtForm(f=>({...f,newEndDate:v}))} type="date"/>
            {extForm.newEndDate&&<><div style={{marginBottom:6,fontSize:12,fontWeight:600,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5}}>Odbiór</div>
            <div style={{display:"flex",gap:6,marginBottom:10}}>{[{v:true,l:"🗓 Całodniowy"},{v:false,l:"⏰ Konkretna godzina"}].map(o=><button key={String(o.v)} onClick={()=>setExtForm(f=>({...f,endAllDay:o.v}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${(extForm.endAllDay!==false)===o.v?"#0A7C7C":"#E4EAF0"}`,background:(extForm.endAllDay!==false)===o.v?"#E6F4F4":"#fff",color:(extForm.endAllDay!==false)===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
            {extForm.endAllDay===false&&<TimeSel label="Godzina odbioru" value={extForm.endTime||"10:00"} onChange={v=>setExtForm(f=>({...f,endTime:v}))}/>}</>}
            <Inp label="Kwota do zapłaty (zł)" value={extForm.amountDue||""} onChange={v=>setExtForm(f=>({...f,amountDue:v}))} type="number" placeholder="zostaw puste jeśli nieznana"/>
            <Inp label="Zapłacono (zł)" value={extForm.amountPaid||""} onChange={v=>setExtForm(f=>({...f,amountPaid:v}))} type="number" placeholder="0 = jeszcze nie zapłacił"/>
            <Inp label="Data zapłaty" value={extForm.payDate||""} onChange={v=>setExtForm(f=>({...f,payDate:v}))} type="date" placeholder=""/>
            <Txa label="Notatka" value={extForm.notes||""} onChange={v=>setExtForm(f=>({...f,notes:v}))} rows={2} placeholder="np. pacjent prosi o fakturę..."/>
            <Btn disabled={!extForm.newEndDate} style={{width:"100%",justifyContent:"center"}} onClick={()=>{
              const due = +extForm.amountDue||0;
              const paid = Math.min(+extForm.amountPaid||0, due||Infinity);
              const sid = extForm.editId!=null ? "extend-"+r.id+"-"+extForm.editId : "extend-"+r.id+"-"+Date.now();

              if(extForm.editId!=null){
                const oldExt = (r.extensions||[]).find(e=>(e.id||e._fallbackId)===extForm.editId)||{};
                const oldPaid = oldExt.amountPaid||0;
                const isLast = (r.extensions||[]).at(-1)?.id===extForm.editId;
                setRentals(rs=>rs.map(x=>x.id===r.id?{
                  ...x,
                  endDate: isLast ? extForm.newEndDate : x.endDate,
                  ...(isLast?{plannedReturn:null,plannedReturnAllDay:undefined,plannedReturnTime:undefined}:{}),
                  extensions:(x.extensions||[]).map(e=>e.id===extForm.editId?{...e,newEndDate:extForm.newEndDate,endTime:extForm.endTime||"10:00",amountDue:due,amountPaid:paid,notes:extForm.notes||"",paidDate:paid>0?(extForm.payDate||todayLocal()):e.paidDate}:e)
                }:x));
                // Sync finansów — wpis dotyczy amountPaid
                const extSid="extend-"+r.id+"-"+extForm.editId;
                if(oldPaid>0&&paid>0) setFinances(fs=>fs.map(f=>f.sourceId===extSid?{...f,amount:paid,description:"Przedłużenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+")"}:f));
                else if(oldPaid>0&&paid===0) setFinances(fs=>fs.filter(f=>f.sourceId!==extSid));
                else if(oldPaid===0&&paid>0) setFinances(fs=>[{id:Date.now(),sourceId:extSid,date:extForm.payDate||todayLocal(),type:"przychód",category:"Wypożyczalnia",amount:paid,description:"Przedłużenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+")"},...(fs||[])]);
                setToast("Przedłużenie zaktualizowane");
              } else {
                const extId = Date.now();
                const ext={id:extId,prevEndDate:r.endDate,newEndDate:extForm.newEndDate,endTime:extForm.endTime||"10:00",amountDue:due,amountPaid:paid,notes:extForm.notes||"",date:todayLocal(),paidDate:paid>0?(extForm.payDate||todayLocal()):null};
                setRentals(rs=>rs.map(x=>x.id===r.id?{...x,endDate:extForm.newEndDate,extensions:[...(x.extensions||[]),ext],plannedReturn:null,plannedReturnAllDay:undefined,plannedReturnTime:undefined}:x));
                if(paid>0){
                  setFinances(fs=>[{id:Date.now()+1,sourceId:"extend-"+r.id+"-"+extId,date:extForm.payDate||todayLocal(),type:"przychód",category:"Wypożyczalnia",amount:paid,description:"Przedłużenie – "+r.patientName+" ("+(r.equipment||"Do ustalenia")+")"},...(fs||[])]);
                }
                setToast("Przedłużono do "+extForm.newEndDate);
              }
              setShowExtend(false);
            }}>Zatwierdź</Btn>
          </Modal>}

          {confirmDel&&<Modal title="Usuń wypożyczenie" onClose={()=>setConfirmDel(false)}>
            <div style={{fontSize:15,marginBottom:20}}>Na pewno usunąć to wypożyczenie?</div>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(false)}>Anuluj</Btn>
              <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>{const cur=rentals.find(x=>x.id===effectiveDetail);if(cur){const pids=new Set((cur.payments||[]).map(p=>"payment-"+p.id));const cids=new Set((cur.cycles||[]).map(c=>"cycle-"+cur.id+"-"+(c.dueDate||c.month)));setFinances(fs=>fs.filter(f=>!pids.has(f.sourceId)&&!cids.has(f.sourceId)&&!(f.sourceId&&f.sourceId.startsWith("extend-"+cur.id+"-"))));}setRentals(rs=>rs.filter(x=>x.id!==effectiveDetail));setConfirmDel(false);close();}}>Usuń</Btn>
            </div>
          </Modal>}
        </>;
      }

      return <div>
        <div style={{padding:"28px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <div style={{minWidth:0}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800}}>Wypożyczalnia</div><div style={{fontSize:13,color:"#7A8FA6"}}>{cnt.aktywne+cnt.odnawialne+cnt.oczekujace} aktywnych</div></div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={()=>{setCsvRows([]);setCsvError("");setShowImport(true);}} style={{height:34,padding:"0 12px",borderRadius:20,border:"1.5px solid #0A7C7C",background:"transparent",color:"#0A7C7C",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>📥 Import</button>
            <button title="Usuń duplikaty" onClick={()=>{
              const seen=new Set();const toRemove=[];
              [...rentals].sort((a,b)=>a.id-b.id).forEach(r=>{const k=(r.patientName||"")+"|"+(r.startDate||"");if(seen.has(k))toRemove.push(r.id);else seen.add(k);});
              if(toRemove.length===0){setToast("Brak duplikatów ✅");return;}
              const rem=new Set(toRemove);
              const srcIds=new Set(rentals.filter(r=>rem.has(r.id)).flatMap(r=>(r.payments||[]).map(p=>"payment-"+p.id)));
              setRentals(rs=>rs.filter(r=>!rem.has(r.id)));
              setFinances(fs=>fs.filter(f=>!srcIds.has(f.sourceId)));
              setToast("Usunięto "+toRemove.length+" duplikatów ✅");
            }} style={{height:34,padding:"0 10px",borderRadius:20,border:"1.5px solid #E05C5C",background:"transparent",color:"#E05C5C",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>🗑 Duplikaty</button>
            <Btn small onClick={()=>{setForm(emptyRental());setShowAdd(true);}}><Ico d={I.plus} s={16} c="#fff"/> Nowe</Btn>
          </div>
        </div>
        <div style={{display:"flex",gap:6,padding:"0 20px 16px"}}>
          {[{k:"aktywne",l:`Szyny CPM (${cnt.aktywne})`},{k:"odnawialne",l:`🔄 Odn. (${cnt.odnawialne})`},{k:"oczekujace",l:`📋 Oczek. (${cnt.oczekujace})`},{k:"zakończone",l:`Zakończone (${cnt.zakończone})`}].map(x=>
            <button key={x.k} onClick={()=>setView(x.k)} style={{flex:1,padding:"8px 6px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,whiteSpace:"nowrap",background:view===x.k?"#0A7C7C":dk?"#1E3A3A":"#E4EAF0",color:view===x.k?"#fff":dk?"#5A8A8A":"#4A6070",fontFamily:"inherit",textAlign:"center"}}>{x.l}</button>
          )}
        </div>
        {view==="zakończone"&&<div style={{display:"flex",gap:6,padding:"0 20px 12px"}}>
          {[{k:"wszystkie",l:`Wszystkie (${cnt.zakończone})`},{k:"okresowe",l:`Okresowe (${cntZakOkres})`},{k:"cykliczne",l:`🔄 Cykl. (${cntZakCykl})`}].map(x=>
            <button key={x.k} onClick={()=>setZakSubView(x.k)} style={{flex:1,padding:"6px 4px",borderRadius:16,border:"none",cursor:"pointer",fontWeight:600,fontSize:11,whiteSpace:"nowrap",background:zakSubView===x.k?"#5A7A9A":dk?"#1A2A2A":"#EAF0F5",color:zakSubView===x.k?"#fff":dk?"#5A8A8A":"#4A6070",fontFamily:"inherit",textAlign:"center"}}>{x.l}</button>
          )}
        </div>}
        <StockPanel rentals={rentals} stock={stock} setStock={setStock}/>
        <div style={{padding:"0 20px"}}>
          {filt.length===0?<Empty text="Brak wypożyczeń w tej kategorii"/>:filt.map(r=><RCard key={r.id} r={r} onClick={()=>setDetail(r.id)}/>)}
        </div>
        {showAdd&&<Modal title="Nowe wypożyczenie" onClose={()=>setShowAdd(false)}>
          <Sel label="Sprzęt" value={form.equipment} onChange={v=>setForm(f=>({...f,equipment:v}))} options={[{value:"",label:"❓ Do ustalenia"},...EQUIPMENT.map(x=>({value:x,label:x}))]}/>

          <PatientPicker label="Pacjent *" value={form.patientName} onChange={v=>setForm(f=>({...f,patientName:v}))} onSelect={p=>setForm(f=>({...f,patientName:p.name,phone:p.phone,address:p.address,patientId:p.id}))} patients={allClients||patients}/>
          <Inp label="Telefon" value={form.phone} onChange={v=>setForm(f=>({...f,phone:v}))} type="tel"/>
          <Inp label="Adres" value={form.address} onChange={v=>setForm(f=>({...f,address:v}))}/>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:600,color:"#7A8FA6",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Typ</div>
            <div style={{display:"flex",gap:8}}>{[{v:false,l:"Jednorazowe"},{v:true,l:"🔄 Odnawialne miesięcznie"}].map(o=><button key={String(o.v)} onClick={()=>setForm(f=>({...f,renewable:o.v,endDate:o.v?"":f.endDate}))} style={{flex:1,padding:"10px 8px",borderRadius:12,border:`2px solid ${form.renewable===o.v?"#0A7C7C":"#E4EAF0"}`,background:form.renewable===o.v?"#E6F4F4":"#fff",color:form.renewable===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
          </div>
          <Inp label="Data od" value={form.startDate} onChange={v=>setForm(f=>({...f,startDate:v}))} type="date"/>
          <div style={{marginBottom:6,fontSize:12,fontWeight:600,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5}}>Dowóz</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>{[{v:false,l:"⏰ Konkretna godzina"},{v:true,l:"🗓 Całodniowy"}].map(o=><button key={String(o.v)} onClick={()=>setForm(f=>({...f,startAllDay:o.v}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${(form.startAllDay||false)===o.v?"#0A7C7C":"#E4EAF0"}`,background:(form.startAllDay||false)===o.v?"#E6F4F4":"#fff",color:(form.startAllDay||false)===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
          {!form.startAllDay&&<TimeSel label="Godzina dowozu" value={form.startTime||"10:00"} onChange={v=>setForm(f=>({...f,startTime:v}))}/>}
          {!form.renewable&&<Inp label="Data do (opcjonalna)" value={form.endDate} onChange={v=>setForm(f=>({...f,endDate:v}))} type="date"/>}
          {!form.renewable&&form.endDate&&<><div style={{marginBottom:6,fontSize:12,fontWeight:600,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5}}>Odbiór</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>{[{v:false,l:"⏰ Konkretna godzina"},{v:true,l:"🗓 Całodniowy"}].map(o=><button key={String(o.v)} onClick={()=>setForm(f=>({...f,endAllDay:o.v}))} style={{flex:1,padding:"8px",borderRadius:10,border:`2px solid ${(form.endAllDay||false)===o.v?"#0A7C7C":"#E4EAF0"}`,background:(form.endAllDay||false)===o.v?"#E6F4F4":"#fff",color:(form.endAllDay||false)===o.v?"#0A7C7C":"#7A8FA6",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{o.l}</button>)}</div>
          {!form.endAllDay&&<TimeSel label="Godzina odbioru" value={form.endTime||"10:00"} onChange={v=>setForm(f=>({...f,endTime:v}))}/>}</>}
          <Inp label="Kwota (zł)" value={form.amount} onChange={v=>setForm(f=>({...f,amount:v}))} type="number" placeholder="400"/>
          {!form.renewable&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Inp label="Zapłacono (zł)" value={form.amountPaid} onChange={v=>setForm(f=>({...f,amountPaid:v}))} type="number" placeholder="0"/>
            <div style={{marginBottom:14}}><div style={{fontSize:12,fontWeight:600,color:"#7A8FA6",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Pozostało</div><div style={{padding:"11px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:15,background:"#F2F5F7",color:(+form.amount-(+form.amountPaid||0))>0?"#E05C5C":"#3DAA72",fontWeight:700}}>{form.amount?(+form.amount-(+form.amountPaid||0))+" zł":"—"}</div></div>
          </div>}
          <Inp label="Transport (zł)" value={form.transport||""} onChange={v=>setForm(f=>({...f,transport:v}))} type="number" placeholder="0"/>
          <Txa label="Notatki" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} rows={2}/>
          <Sel label="Skąd dowiedział się o wypożyczeniu?" value={form.source||""} onChange={v=>setForm(f=>({...f,source:v}))} options={[{value:"",label:"— nie wiem / nie podał"},...RENTAL_SOURCES.map(s=>({value:s.value,label:s.label}))]}/>
          <Btn disabled={!form.patientName} style={{width:"100%",justifyContent:"center"}} onClick={()=>{
            const pid=Date.now(),rid=Date.now()+1,paid=form.renewable?0:+(form.amountPaid||0);
            const pat=patients.find(p=>p.name===form.patientName);
            const nr={...form,id:rid,patientId:pat?.id||null,amount:+form.amount,amountPaid:paid,payments:paid>0?[{id:pid,amount:paid,date:form.startDate}]:[],cycles:[],status:"aktywne",startAllDay:form.startAllDay||false,endAllDay:form.endAllDay||false,allDay:undefined};
            setRentals(r=>[nr,...r]);
            if(paid>0)setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"payment-"+pid,date:form.startDate,type:"przychód",category:"Wypożyczalnia",amount:paid,description:"Wypożyczenie – "+form.patientName+" ("+form.equipment+")"},...fs]);
            if(setPatients&&!pat){setPatients(ps=>[...(ps||[]),{id:Date.now()+2,name:form.patientName,phone:form.phone||"",address:form.address||"",diagnosis:"",notes:"",defaultPrice:"",birthday:""}]);}
            setShowAdd(false);setToast("Wypożyczenie dodane");
          }}>Zapisz wypożyczenie</Btn>
        </Modal>}
        {showImport&&<Modal title="Import CSV" onClose={()=>{setShowImport(false);setCsvRows([]);setCsvError("");}}>
          <div style={{marginBottom:14,background:dk?"#0F2020":"#F0F9F5",borderRadius:12,padding:"12px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>1. Pobierz szablon Excel/CSV</div>
            <div style={{fontSize:12,color:"#7A8FA6",marginBottom:10}}>Otwórz w Excelu, uzupełnij, zapisz jako CSV UTF-8</div>
            <button onClick={()=>{
              const h="Pacjent;Telefon;Adres;Sprzęt;Data od;Data do;Kwota;Zapłacono;Dowóz;Skąd;Notatki";
              const ex1="Jan Kowalski;600123456;Ulica 1 Katowice;Artromot K1 2025;09-01-2025;23-01-2025;540;540;0;slawek;przykład";
              const ex2="Anna Nowak;601234567;Nowa 5 Sosnowiec;;01-02-2025;14-02-2025;480;480;50;reklama;";
              const ex3=";;Sprzęt: Artromot K1 2025 / Artromot K1 I / Kinetec Spectra / Kinetec Spectra SZ / Optiflex;;;;;;Skąd: slawek / reklama / szpital / organicznie;;";
              const blob=new Blob(["﻿"+h+"\n"+ex1+"\n"+ex2+"\n"+ex3],{type:"text/csv;charset=utf-8"});
              const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="szablon_wypozyczenia.csv";a.click();URL.revokeObjectURL(url);
            }} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:"#0A7C7C",color:"#fff",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>📥 Pobierz szablon</button>
          </div>
          <div style={{marginBottom:14,background:dk?"#0F2020":"#F0F9F5",borderRadius:12,padding:"12px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:4}}>2. Wgraj wypełniony plik</div>
            <input ref={importRef} type="file" accept=".csv,.xlsx,.xls,text/csv" style={{display:"none"}} onChange={e=>{
              const f=e.target.files?.[0];if(!f)return;
              const toYMD=v=>{
                if(!v&&v!==0)return"";
                if(typeof v==="number"){const d=new Date(Math.round((v-25569)*86400*1000));return d.toISOString().slice(0,10);}
                const s=String(v).trim();
                if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;
                const dm=s.match(/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{4})$/);
                if(dm)return`${dm[3]}-${dm[2].padStart(2,"0")}-${dm[1].padStart(2,"0")}`;
                return s;
              };
              const processRows=rawRows=>{
                try{
                  if(rawRows.length<2){setCsvError("Brak danych poza nagłówkiem");setCsvRows([]);return;}
                  const rows=[],errs=[];
                  const skadMap={"slawek":"slawek","sławek":"slawek","reklama":"reklama","szpital":"szpital","organicznie":"organicznie","organiczne":"organicznie","organic":"organicznie"};
                  for(let i=1;i<rawRows.length;i++){
                    const cells=rawRows[i];
                    const rowHasData=cells.some(c=>String(c||"").trim()!=="");
                    if(!rowHasData)continue;
                    const adres=String(cells[2]||"").trim();
                    const pacjentRaw=String(cells[0]||"").trim();
                    const pacjent=pacjentRaw||adres||"(brak danych — wiersz "+(i+1)+")";
                    if(!pacjentRaw)errs.push("Wiersz "+(i+1)+": brak nazwiska — użyto adresu jako tymczasowej nazwy");
                    const sprzet=String(cells[3]||"").trim();
                    const dataOdRaw=toYMD(cells[4]);
                    const dataOd=/^\d{4}-\d{2}-\d{2}$/.test(dataOdRaw)?dataOdRaw:"";
                    const dataDoRaw=toYMD(cells[5]);
                    const dataDo=/^\d{4}-\d{2}-\d{2}$/.test(dataDoRaw)?dataDoRaw:"";
                    const skadRaw=String(cells[9]||"").trim().toLowerCase();
                    rows.push({pacjent,telefon:String(cells[1]||"").trim(),adres,sprzet,dataOd,dataDo:dataDo||dataOd,kwota:+(cells[6]||0),zaplacono:+(cells[7]||0),dowoz:+(cells[8]||0),skad:skadMap[skadRaw]||"",notatki:String(cells[10]||"").trim()});
                  }
                  setCsvRows(rows);setCsvError(errs.length?"⚠️ "+errs.join("\n"):"");
                  if(importRef.current)importRef.current.value="";
                }catch(ex){setCsvError("Błąd przetwarzania: "+ex.message);setCsvRows([]);}
              };
              const isExcel=f.name.match(/\.(xlsx|xls)$/i);
              if(isExcel){
                const reader=new FileReader();
                reader.onload=ev=>{
                  try{
                    const wb=window.XLSX.read(new Uint8Array(ev.target.result),{type:"array",cellDates:false});
                    let bodyRows=[];
                    wb.SheetNames.forEach(sn=>{
                      const sheetRows=window.XLSX.utils.sheet_to_json(wb.Sheets[sn],{header:1,raw:true,defval:""});
                      if(sheetRows.length>1)bodyRows=bodyRows.concat(sheetRows.slice(1)); // pomija nagłówek KAŻDEJ zakładki
                    });
                    processRows([[],...bodyRows]); // sztuczny nagłówek na pozycji 0, dane już bez nagłówków arkuszy
                  }catch(ex){setCsvError("Błąd odczytu Excela: "+ex.message);setCsvRows([]);}
                };
                reader.readAsArrayBuffer(f);
              }else{
                const reader=new FileReader();
                reader.onload=ev=>{
                  const text=ev.target.result;
                  const lines=text.trim().split(/\r?\n/).filter(l=>l.trim());
                  if(lines.length<2){setCsvError("Plik jest pusty lub brak danych");setCsvRows([]);return;}
                  const sep=lines[0].includes(";")?";":",";
                  const rawRows=lines.map(ln=>{const cells=[];let cur="",inQ=false;for(let c=0;c<ln.length;c++){if(ln[c]==='"'){inQ=!inQ;}else if(ln[c]===sep&&!inQ){cells.push(cur.trim().replace(/^"|"$/g,""));cur="";}else cur+=ln[c];}cells.push(cur.trim().replace(/^"|"$/g,""));return cells;});
                  processRows(rawRows);
                };
                reader.readAsText(f,"UTF-8");
              }
            }}/>
            <button onClick={()=>importRef.current&&importRef.current.click()} style={{width:"100%",padding:"10px",borderRadius:10,border:"2px dashed #0A7C7C",background:"transparent",color:"#0A7C7C",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>📂 Wybierz plik Excel (.xlsx) lub CSV</button>
          </div>
          {csvError&&<div style={{marginBottom:12,background:"#FFF0F0",borderRadius:10,padding:"10px 12px",fontSize:12,color:"#E05C5C",whiteSpace:"pre-wrap"}}>{csvError}</div>}
          {csvRows.length>0&&<div style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:600,marginBottom:8,color:"#3DAA72"}}>✅ Załadowano {csvRows.length} wierszy:</div>
            <div style={{maxHeight:180,overflowY:"auto",display:"flex",flexDirection:"column",gap:5}}>
              {csvRows.slice(0,25).map((row,i)=><div key={i} style={{background:dk?"#1A2A2A":"#F0F9F5",borderRadius:8,padding:"7px 10px",fontSize:12,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontWeight:600}}>{row.pacjent}</span>
                <span style={{color:"#7A8FA6"}}>{row.dataOd}→{row.dataDo}</span>
                <span style={{color:"#3DAA72",fontWeight:600}}>{row.kwota} zł</span>
                {row.skad&&<span style={{color:"#7C6AF4",fontSize:11}}>({row.skad})</span>}
              </div>)}
              {csvRows.length>25&&<div style={{fontSize:12,color:"#7A8FA6",textAlign:"center",padding:"4px"}}>...i {csvRows.length-25} więcej</div>}
            </div>
          </div>}
          <Btn disabled={csvRows.length===0} style={{width:"100%",justifyContent:"center"}} onClick={()=>{
            const now=Date.now();
            const existingByKey={};
            rentals.forEach(r=>{const k=(r.patientName||"")+"|"+(r.startDate||"");if(!existingByKey[k])existingByKey[k]=r;});
            const newRentals=[];
            const updatedMap={};
            const financeUpserts=[];
            const seenInBatch=new Set();
            let dupSkipped=0;
            csvRows.forEach((row,i)=>{
              const k=(row.pacjent||"")+"|"+(row.dataOd||"");
              if(seenInBatch.has(k)){dupSkipped++;return;} // ten sam pacjent+data już w tym imporcie — pomija powtórzony wiersz
              seenInBatch.add(k);
              const paid=+row.zaplacono;
              const existing=existingByKey[k];
              if(existing){
                const payId=(existing.payments&&existing.payments[0]&&existing.payments[0].id)||(now+i*100+1);
                updatedMap[existing.id]={...existing,
                  phone:row.telefon||existing.phone,
                  address:row.adres||existing.address,
                  equipment:row.sprzet||existing.equipment,
                  endDate:row.dataDo||existing.endDate,
                  amount:row.kwota?+row.kwota:existing.amount,
                  amountPaid:paid||existing.amountPaid,
                  payments:paid>0?[{id:payId,amount:paid,date:row.dataOd}]:(existing.payments||[]),
                  transport:row.dowoz?+row.dowoz:existing.transport,
                  source:row.skad||existing.source,
                  notes:row.notatki||existing.notes};
                if(paid>0)financeUpserts.push({sourceId:"payment-"+payId,date:row.dataOd,amount:paid,description:"Wypożyczenie – "+row.pacjent+" (import)"});
              }else{
                const payId=now+i*100+1;
                newRentals.push({id:now+i*100,patientId:null,patientName:row.pacjent,phone:row.telefon,address:row.adres,equipment:row.sprzet||"",startDate:row.dataOd,endDate:row.dataDo,amount:+row.kwota,amountPaid:paid,payments:paid>0?[{id:payId,amount:paid,date:row.dataOd}]:[],cycles:[],status:"zakończone",renewable:false,startAllDay:true,endAllDay:true,transport:+row.dowoz,source:row.skad,notes:row.notatki});
                if(paid>0)financeUpserts.push({sourceId:"payment-"+payId,date:row.dataOd,amount:paid,description:"Wypożyczenie – "+row.pacjent+" (import)"});
              }
            });
            const updatedCount=Object.keys(updatedMap).length;
            setRentals(rs=>[...newRentals,...rs.map(r=>updatedMap[r.id]||r)]);
            setFinances(fs=>{
              const existingSids=new Set(fs.map(f=>f.sourceId));
              const merged=fs.map(f=>{const u=financeUpserts.find(x=>x.sourceId===f.sourceId);return u?{...f,date:u.date,amount:u.amount,description:u.description}:f;});
              const toAdd=financeUpserts.filter(u=>!existingSids.has(u.sourceId)).map((u,i)=>({id:now+90000+i,sourceId:u.sourceId,date:u.date,type:"przychód",category:"Wypożyczalnia",amount:u.amount,description:u.description}));
              return [...toAdd,...merged];
            });
            setShowImport(false);setCsvRows([]);setCsvError("");
            setToast("Zaimportowano "+newRentals.length+(updatedCount>0?", zaktualizowano "+updatedCount:"")+(dupSkipped>0?", pominięto "+dupSkipped+" duplikatów":"")+" ✅");
          }}>Importuj {csvRows.length > 0 ? csvRows.length+" " : ""}wypożyczeń →</Btn>
        </Modal>}
        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      </div>;
    }

