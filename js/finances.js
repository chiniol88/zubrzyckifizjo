    // ── OBŁOŻENIE SPRZĘTU — liczone dzień po dniu ────────────────────────────
    // Zajętość dnia = liczba wypożyczeń naraz, ale nie więcej niż sztuk z magazynu (z historią zmian),
    // więc wynik nie może przekroczyć 100%; nakładanie się wypożyczeń ponad liczbę sztuk jest zliczane osobno (overlapDays). Start liczenia = data dodania albo pierwsze wypożyczenie (co wcześniej).
    function occupancyForEq(eq,rentals,stock,from,to,today) {
      const DAY=864e5,ts=d=>Date.parse(d+"T12:00:00Z"),fmtD=t=>new Date(t).toISOString().slice(0,10);
      const added=(stock&&stock.addedDate&&stock.addedDate[eq])||"";
      const rs=rentals.filter(r=>r.equipment===eq&&r.startDate&&!r.reserved);
      const firstRent=rs.reduce((m,r)=>(!m||r.startDate<m)?r.startDate:m,"");
      const start=[added,firstRent].filter(Boolean).sort()[0]||"";
      const out={start,missingAdded:!added,days:[],booked:0,cap:0,overlapDays:0,pct:0,noData:true};
      if(!start)return out;
      const lo=from>start?from:start,hi=to<today?to:today;
      if(lo>hi)return out;
      const n=Math.round((ts(hi)-ts(lo))/DAY)+1,diff=new Array(n+2).fill(0);
      // Okres wypożyczenia = czas, w którym sprzęt ma pacjent (i za który płaci) — NIE moment fizycznego odbioru.
      // Jednorazowe: start → data końca (z przedłużeniami). Cykliczne: okresy rozliczeniowe (po 30 dni), po zakończeniu ucięte datą końca.
      const spansOf=r=>{
        const cyc=(r.cycles||[]).filter(c=>!c.cancelled);
        if(!r.renewable||!cyc.length)return [[r.startDate,r.endDate||(r.status==="aktywne"?today:r.startDate)]];
        const closed=r.status!=="aktywne";
        return cyc.map(c=>{
          let cs,ce;
          if(c.dueDate){cs=c.dueDate;ce=addDays(c.dueDate,30);}
          else{cs=c.month+"-01";ce=c.month+"-"+String(new Date(+c.month.slice(0,4),+c.month.slice(5,7),0).getDate()).padStart(2,"0");}
          if(closed&&r.endDate&&ce>r.endDate)ce=r.endDate;
          return [cs,ce];
        });
      };
      rs.forEach(r=>{
        const spans=spansOf(r).filter(x=>x[1]>=x[0]).sort((a,b)=>a[0].localeCompare(b[0]));
        const merged=[];
        spans.forEach(x=>{const l=merged[merged.length-1];if(l&&x[0]<=addDays(l[1],1)){if(x[1]>l[1])l[1]=x[1];}else merged.push([x[0],x[1]]);});
        merged.forEach(([s,e])=>{
          const cs=s>lo?s:lo,ce=e<hi?e:hi;
          if(cs>ce)return;
          diff[Math.round((ts(cs)-ts(lo))/DAY)]++;
          diff[Math.round((ts(ce)-ts(lo))/DAY)+1]--;
        });
      });
      const hist=((stock&&stock.history)||[]).filter(h=>h.eq===eq&&h.from).sort((a,b)=>a.from.localeCompare(b.from));
      const curQty=(stock&&stock.qty&&stock.qty[eq])||1;
      const capAt=d=>{
        let q=null;hist.forEach(h=>{if(h.from<=d)q=+h.qty||1;});
        if(q!==null)return q;
        return hist.length?(hist[0].prev!=null?+hist[0].prev||1:+hist[0].qty||1):curQty;
      };
      let c=0;
      for(let i=0;i<n;i++){
        c+=diff[i];
        const d=fmtD(ts(lo)+i*DAY),rec=capAt(d);
        if(c>rec)out.overlapDays++;
        out.days.push({d,c,cap:rec});
        out.booked+=Math.min(c,rec);out.cap+=rec;
      }
      out.noData=false;
      out.pct=out.cap>0?Math.round(out.booked/out.cap*100):0;
      return out;
    }

    // ── pomocnicze: miesiące jako tekst "RRRR-MM" (bez Date — brak błędu 29-31 dnia miesiąca) ──
    const ymAdd=(ym,n)=>{let y=+ym.slice(0,4),m=+ym.slice(5,7)-1+n;y+=Math.floor(m/12);m=((m%12)+12)%12;return y+"-"+String(m+1).padStart(2,"0");};
    const PL_MON=["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
    const fmtNum=n=>{const s=String(Math.round(Math.abs(n)));let o="";for(let i=0;i<s.length;i++){if(i&&(s.length-i)%3===0)o+=String.fromCharCode(160);o+=s[i];}return (n<0?"-":"")+o;};
    const plWozek=n=>n===1?"wózek":(n%10>=2&&n%10<=4&&(n%100<10||n%100>=20))?"wózki":"wózków";
    // procenty sumujące się do 100 (metoda największych reszt)
    const pctSplit=vals=>{const t=vals.reduce((a,b)=>a+b,0);if(t<=0)return vals.map(()=>0);const raw=vals.map(v=>v/t*100),fl=raw.map(Math.floor);let rest=100-fl.reduce((a,b)=>a+b,0);raw.map((r,i)=>[r-fl[i],i]).sort((a,b)=>b[0]-a[0]).forEach(([,i])=>{if(rest>0){fl[i]++;rest--;}});return fl;};

    // ── STATYSTYKI (dawniej Sprzęt) — lista rozwijana ────────────────────────
    function StatSpark({vals,w,h,color,sel}) {
      const mx=Math.max(1,...vals)*1.08;
      const pts=vals.map((v,i)=>[2+i/Math.max(1,vals.length-1)*(w-4),h-2-(v/mx)*(h-6)]);
      const line=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
      const area=line+" L"+pts[pts.length-1][0].toFixed(1)+" "+h+" L"+pts[0][0].toFixed(1)+" "+h+" Z";
      const gid="sg"+color.slice(1)+w;
      return <svg width={w} height={h} viewBox={"0 0 "+w+" "+h} aria-hidden="true"><defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".32"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs><path d={area} fill={"url(#"+gid+")"}/><path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>{sel!=null&&pts[sel]&&<circle cx={pts[sel][0]} cy={pts[sel][1]} r="3.6" fill={color}/>}</svg>;
    }

    function StatDonut({rows,size,top,bottom,track,ink,sub}) {
      const r=size/2-9,c=2*Math.PI*r;
      const tot=rows.reduce((s,x)=>s+x.v,0)||1;
      let off=0;
      return <svg width={size} height={size} viewBox={"0 0 "+size+" "+size} role="img" aria-label="Udział źródeł">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth="13"/>
        {rows.filter(x=>x.v>0).map(x=>{
          const l=x.v/tot*c,g=Math.min(2,l*.2);
          const el=<circle key={x.k} cx={size/2} cy={size/2} r={r} fill="none" stroke={x.c} strokeWidth="13" strokeDasharray={Math.max(0,l-g).toFixed(1)+" "+(c-l+g).toFixed(1)} strokeDashoffset={(-off).toFixed(1)} transform={"rotate(-90 "+size/2+" "+size/2+")"}/>;
          off+=l;return el;
        })}
        <text x="50%" y={size/2-1} textAnchor="middle" fontFamily="Syne" fontWeight="800" fontSize="20" fill={ink}>{top}</text>
        <text x="50%" y={size/2+14} textAnchor="middle" fontSize="10" fill={sub} fontFamily="DM Sans">{bottom}</text>
      </svg>;
    }

    function StatAcc({open,onToggle,title,sub,mini,keyVal,keyColor,children,dk}) {
      const bd=dk?"#2A3A56":"#E4EAF3";
      return <div style={{background:dk?"#18202F":"#fff",border:"1px solid "+bd,borderRadius:18,marginBottom:10,overflow:"hidden"}}>
        <button onClick={onToggle} aria-expanded={open} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",border:"none",background:"none",textAlign:"left",cursor:"pointer",fontFamily:"inherit",color:dk?"#C8E8E8":"#1C2B3A"}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:14,fontWeight:700}}>{title}</div>
            <div style={{fontSize:11,color:"#7A8FA6",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{sub}</div>
          </div>
          {mini&&<div style={{flexShrink:0,display:"flex",alignItems:"center"}}>{mini}</div>}
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:keyColor||"inherit",whiteSpace:"nowrap",textAlign:"right",minWidth:48}}>{keyVal}</div>
          <div style={{color:"#7A8FA6",fontSize:10,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</div>
        </button>
        {open&&<div style={{padding:"14px 16px 16px",borderTop:"1px solid "+bd}}>{children}</div>}
      </div>;
    }

    function RentalStats({rentals,stock,setStock,finances,setFinances,budget,machines,setMachines,nfzCases}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const [scope,setScope]=useState("month");
      const [selMonth,setSelMonth]=useState(()=>todayLocal().slice(0,7));
      const [statsYear,setStatsYear]=useState(()=>new Date().getFullYear());
      const [openSec,setOpenSec]=useState("rev");
      const [roiEq,setRoiEq]=useState(null);
      const [showAllRoi,setShowAllRoi]=useState(false);
      const [repairForm,setRepairForm]=useState(null);
      const [showRentalList,setShowRentalList]=useState(false);
      const [srcTab,setSrcTab]=useState("all");
      const equipmentAll=getActiveEquipmentNames(stock);
      const SZYNY_EQ=["Artromot K1 2025","Artromot K1 I","Kinetec Spectra","Kinetec Spectra SZ","Optiflex","OrthoRehab"];
      const BALKONIKI_EQ=["Ambonka Paula","Balkonik ortopedyczny"];
      const catOf=eq=>{
        const entry=((stock&&stock.equipment)||[]).find(e=>e.name===eq);
        if(entry&&entry.category)return entry.category;
        return SZYNY_EQ.includes(eq)?"szyny":WOZEK_EQUIPMENT.includes(eq)?"wozki":BALKONIKI_EQ.includes(eq)?"balkoniki":"inne";
      };
      const today=todayLocal();
      const borderC=dk?"#2A3A56":"#E4EAF3";
      const textC=dk?"#C8E8E8":"#1C2B3A";
      const subC="#7A8FA6";
      const bg=dk?"#18202F":"#fff";
      const trackC=dk?"#22304B":"#EAEFF6";
      const Z=n=>demo?"****":fmtNum(n)+" zł";
      const PURPLE=dk?"#9A78DB":"#7B4FBF",BLUE="#2E86AB",GREEN="#3DAA72",ORANGE="#F4A261",RED="#E05C5C";

      // Okres: miesiąc albo cały rok
      const isYear=scope==="year";
      const monthLastDay=new Date(+selMonth.slice(0,4),+selMonth.slice(5,7),0).getDate();
      const pStart=isYear?statsYear+"-01-01":selMonth+"-01";
      const pEnd=isYear?statsYear+"-12-31":selMonth+"-"+String(monthLastDay).padStart(2,"0");
      const periodLabel=isYear?String(statsYear):new Date(selMonth+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"});

      // Mapa: rentalId → sprzęt
      const rentalEquipMap=useMemo(()=>{const m={};rentals.forEach(r=>{if(r.equipment)m[r.id]=r.equipment;});return m;},[rentals]);
      // Mapa: paymentId → rentalId
      const paymentRentalMap=useMemo(()=>{const m={};rentals.forEach(r=>{(r.payments||[]).forEach(p=>{m[String(p.id)]=r.id;});});return m;},[rentals]);
      // Wyciąg rentalId z sourceId finansów
      const rentalIdSet=useMemo(()=>new Set(rentals.map(r=>r.id)),[rentals]);
      const getRid=sid=>{
        if(!sid)return null;
        let id=null;
        if(sid.startsWith("payment-"))id=paymentRentalMap[sid.replace("payment-","")]||null;
        else if(sid.startsWith("cycle-"))id=+sid.slice(6).split("-")[0]||null;
        else if(sid.startsWith("extend-"))id=+sid.slice(7).split("-")[0]||null;
        else if(sid.startsWith("transport-"))id=+sid.slice(10)||null;
        return id!==null&&rentalIdSet.has(id)?id:null;
      };

      // All-time przychód per sprzęt — z RZECZYWISTYCH wpłat w finansach
      const allTimeRevenue=useMemo(()=>{
        const rev={};equipmentAll.forEach(eq=>rev[eq]=0);
        const counted=new Set();
        (finances||[]).forEach(f=>{
          if(f.type!=="przychód")return;
          const rid=getRid(f.sourceId);if(!rid)return;
          counted.add(rid);
          const eq=rentalEquipMap[rid];
          if(eq&&rev.hasOwnProperty(eq))rev[eq]+=(+f.amount||0);
        });
        rentals.forEach(r=>{
          if(counted.has(r.id)||(r.payments||[]).length>0||(r.cycles||[]).length>0)return;
          const paid=+r.amountPaid||0;
          if(paid>0&&r.equipment&&rev.hasOwnProperty(r.equipment))rev[r.equipment]+=paid;
        });
        return rev;
      },[finances,rentals,rentalEquipMap,paymentRentalMap,rentalIdSet,stock]);

      // All-time śr. czas wypożyczenia per sprzęt (zakończone, z datą od i do)
      const avgDurationByEq=useMemo(()=>{
        const map={};
        equipmentAll.forEach(eq=>{
          const finished=rentals.filter(r=>r.equipment===eq&&r.status==="zakończone"&&r.startDate&&r.endDate);
          map[eq]=finished.length>0?Math.round(finished.reduce((s,r)=>s+Math.max(1,Math.round((new Date(r.endDate)-new Date(r.startDate))/(1000*60*60*24))),0)/finished.length):null;
        });
        return map;
      },[rentals,stock]);

      // Statystyki okresu (miesiąc lub rok)
      const stats=useMemo(()=>{
        const cutStr=pStart,cutEnd=pEnd;

        // Wózki z refundacji — przychód zrealizowany (finances z sourceId "wozek-<id>")
        const wozkiF=(finances||[]).filter(f=>{
          if(f.type!=="przychód")return false;
          const sid=f.sourceId||"";if(!sid.startsWith("wozek-"))return false;
          const cid=+sid.slice(6);return !!cid&&(nfzCases||[]).some(x=>x.id===cid);
        });

        // Wykres 12 miesięcy: w skali rocznej styczeń–grudzień wybranego roku; w miesięcznej okno kończy się na bieżącym miesiącu
        // (albo zaczyna na wybranym, gdy wybrano miesiąc starszy niż 12 mies. temu)
        const monthlyRev={},monthlyWoz={};
        const curYM=today.slice(0,7);
        const winEnd=isYear?statsYear+"-12":(selMonth<ymAdd(curYM,-11)?ymAdd(selMonth,11):curYM);
        for(let i=0;i<12;i++){const k=ymAdd(winEnd,i-11);monthlyRev[k]=0;monthlyWoz[k]=0;}

        // 1) Wpłaty z tablicy finances (mają właściwy sourceId linkujący do rental)
        const countedRids=new Set();
        let totalRevenue=0;
        (finances||[]).forEach(f=>{
          if(f.type!=="przychód")return;
          const rid=getRid(f.sourceId);if(!rid)return;
          countedRids.add(rid);
          if((f.date||"")>=cutStr&&(f.date||"")<=cutEnd)totalRevenue+=(+f.amount||0);
          const m=(f.date||"").slice(0,7);
          if(monthlyRev.hasOwnProperty(m))monthlyRev[m]+=(+f.amount||0);
        });

        // 2) Legacy: rental z amountPaid > 0 ale bez tablicy payments
        rentals.forEach(r=>{
          if(countedRids.has(r.id))return;
          if((r.payments||[]).length>0)return;
          if((r.cycles||[]).length>0)return;
          const paid=+r.amountPaid||0;if(paid<=0)return;
          const d=r.startDate||"";
          if(d>=cutStr&&d<=cutEnd)totalRevenue+=paid;
          const m=d.slice(0,7);
          if(monthlyRev.hasOwnProperty(m))monthlyRev[m]+=paid;
        });

        // 3) Wózki (refundacje)
        let wozkiRevenue=0,wozkiCount=0;
        wozkiF.forEach(f=>{
          const d=f.date||"";
          if(d>=cutStr&&d<=cutEnd){wozkiRevenue+=(+f.amount||0);wozkiCount++;}
          const m=d.slice(0,7);
          if(monthlyWoz.hasOwnProperty(m))monthlyWoz[m]+=(+f.amount||0);
        });

        // Liczba wypożyczeń które ZACZĘŁY SIĘ w okresie (nie rezerwacje)
        const totalCount=rentals.filter(r=>(r.startDate||"")>=cutStr&&(r.startDate||"")<=cutEnd&&!r.reserved).length;

        const monthlyArr=Object.keys(monthlyRev).sort().map(m=>[m,monthlyRev[m],monthlyWoz[m]]);
        const maxMonthly=Math.max(...monthlyArr.map(x=>x[1]+x[2]),1);
        const durationIncludeMap=(stock&&stock.durationInclude)||{};
        const DURATION_OFF_DEF=["Ambonka Paula","Balkonik ortopedyczny","Wózek inwalidzki Elite Tim"];
        const isDurIncluded=eq=>(durationIncludeMap[eq]!==undefined)?durationIncludeMap[eq]:!DURATION_OFF_DEF.includes(eq);
        const finished=rentals.filter(r=>r.status==="zakończone"&&r.startDate&&r.endDate&&isDurIncluded(r.equipment)&&r.startDate>=cutStr&&r.startDate<=cutEnd);
        const avgDuration=finished.length>0?Math.round(finished.reduce((s,r)=>s+Math.max(1,Math.round((new Date(r.endDate)-new Date(r.startDate))/(1000*60*60*24))),0)/finished.length):null;
        const marketingSpend=isYear
          ?Array.from({length:12},(_,i)=>marketingSpendForMonth(budget,stock,statsYear+"-"+String(i+1).padStart(2,"0"))).reduce((a,b)=>a+b,0)
          :marketingSpendForMonth(budget,stock,selMonth);

        return {totalRevenue,wozkiRevenue,wozkiCount,totalCount,monthlyArr,maxMonthly,cutStr,cutEnd,avgDuration,marketingSpend};
      },[rentals,finances,nfzCases,pStart,pEnd,isYear,statsYear,selMonth,today,rentalEquipMap,paymentRentalMap,rentalIdSet,stock,budget]);
      const totalAll=stats.totalRevenue+stats.wozkiRevenue;

      const costs=(stock&&stock.costs)||{};
      const getCosts=eq=>costs[eq]||{purchase:0,repairs:[]};
      const getQty=eq=>(stock&&stock.qty&&stock.qty[eq])||1;
      const DURATION_OFF_BY_DEFAULT=["Ambonka Paula","Balkonik ortopedyczny","Wózek inwalidzki Elite Tim"];
      const getDurationInclude=eq=>(stock&&stock.durationInclude&&stock.durationInclude[eq]!==undefined)?stock.durationInclude[eq]:!DURATION_OFF_BY_DEFAULT.includes(eq);
      const setDurationInclude=(eq,val)=>setStock(s=>({...s,durationInclude:{...(s.durationInclude||{}),[eq]:val}}));
      const getMachineSrvForEq=eq=>(machines||[]).filter(m=>m.type===eq).flatMap(m=>(m.serviceLog||[]).filter(s=>+s.cost>0).map(s=>({id:"srv-"+s.id,date:s.date,amount:+s.cost,desc:(s.type+(s.notes?" – "+s.notes:""))+" ("+(m.name||m.type)+")",fromService:true})));
      const getTotalInvestment=eq=>{const c=getCosts(eq);const qty=getQty(eq);const machineSrv=getMachineSrvForEq(eq).reduce((s,x)=>s+x.amount,0);return(+c.purchase||0)*qty+(c.repairs||[]).reduce((s,r)=>s+(+r.amount||0),0)+machineSrv;};
      const setPurchase=(eq,val)=>setStock(s=>{const ex=(s.costs||{})[eq]||{purchase:0,repairs:[]};return{...s,costs:{...(s.costs||{}),[eq]:{...ex,purchase:+val||0}}};});
      const setQtyInStats=(eq,val)=>setStock(s=>({...s,qty:{...(s.qty||{}),[eq]:Math.max(1,+val||1)}}));
      const saveRepair=(eq,rep)=>setStock(s=>{const ex=(s.costs||{})[eq]||{purchase:0,repairs:[]};return{...s,costs:{...(s.costs||{}),[eq]:{...ex,repairs:[...(ex.repairs||[]).filter(r=>r.id!==rep.id),rep]}}};});
      const deleteRepair=(eq,id)=>setStock(s=>{const ex=(s.costs||{})[eq]||{purchase:0,repairs:[]};return{...s,costs:{...(s.costs||{}),[eq]:{...ex,repairs:(ex.repairs||[]).filter(r=>r.id!==id)}}};});

      // Obłożenie — tylko szyny CPM, liczone dzień po dniu (patrz occupancyForEq)
      const occStats=useMemo(()=>equipmentAll.filter(eq=>catOf(eq)==="szyny")
        .map(eq=>({eq,qty:getQty(eq),...occupancyForEq(eq,rentals,stock,pStart,pEnd,today)}))
        .filter(x=>!x.noData),[rentals,pStart,pEnd,stock,today]);
      const occBooked=occStats.reduce((s,x)=>s+x.booked,0),occCap=occStats.reduce((s,x)=>s+x.cap,0);
      const avgOcc=occCap>0?Math.round(occBooked/occCap*100):0;
      const occCol=p=>p>=70?GREEN:p>=40?ORANGE:RED;

      // ROI — wiersze
      const roiRows=equipmentAll.map(eq=>{
        const earned=allTimeRevenue[eq]||0,investment=getTotalInvestment(eq);
        return {eq,earned,investment,roi:investment>0?Math.round(earned/investment*100):null};
      });
      const roiShown=roiRows.filter(x=>showAllRoi||x.earned>0||x.investment>0||roiEq===x.eq);
      const roiHidden=roiRows.length-roiShown.length;
      const roiKnown=roiRows.filter(x=>x.investment>0);
      const roiDone=roiKnown.filter(x=>x.earned>=x.investment).length;

      // Marketing — picker kategorii z budżetu (Dom)
      const mktgCat=(stock&&stock.marketingCat)||"";
      const mktgSub=(stock&&stock.marketingSub)||"";
      const budgetCatMap={};
      Object.values((budget&&budget.months)||{}).forEach(function(data){
        (data.expenses||[]).forEach(function(e){if(e.cat){if(!budgetCatMap[e.cat])budgetCatMap[e.cat]=[];if(e.subcat&&budgetCatMap[e.cat].indexOf(e.subcat)<0)budgetCatMap[e.cat].push(e.subcat);}});
      });
      ((budget&&budget.recurring)||[]).forEach(function(r){if(r.type==="expense"&&r.cat){if(!budgetCatMap[r.cat])budgetCatMap[r.cat]=[];if(r.subcat&&budgetCatMap[r.cat].indexOf(r.subcat)<0)budgetCatMap[r.cat].push(r.subcat);}});
      const budgetCatNames=Object.keys(budgetCatMap).sort();
      const budgetSubNames=mktgCat&&budgetCatMap[mktgCat]?budgetCatMap[mktgCat].sort():[];

      // Źródła klientów w okresie (wypożyczenia + wózki z refundacji)
      const src=(()=>{
        const periodRentalsAll=rentals.filter(r=>(r.startDate||"")>=pStart&&(r.startDate||"")<=pEnd&&!r.reserved);
        const listItemsAll=[];
        (finances||[]).forEach(f=>{
          if(f.type!=="przychód"||(f.date||"")<pStart||(f.date||"")>pEnd)return;
          const rid=getRid(f.sourceId);if(!rid)return;
          const r=rentals.find(x=>x.id===rid);if(!r)return;
          const isExt=(f.sourceId||"").startsWith("extend-");
          const isCycle=(f.sourceId||"").startsWith("cycle-");
          listItemsAll.push({key:"f"+f.id,date:f.date,patientName:r.patientName,equipment:r.equipment,amount:+f.amount||0,source:r.source,type:isExt?"↪ Przedłużenie":isCycle?"↻ Cykl":"Wpłata",cat:catOf(r.equipment)});
        });
        rentals.forEach(r=>{
          if((r.payments||[]).length>0||(r.cycles||[]).length>0)return;
          const paid=+r.amountPaid||0;if(!paid)return;
          const d=r.startDate||"";
          if(d>=pStart&&d<=pEnd)listItemsAll.push({key:"l"+r.id,date:d,patientName:r.patientName,equipment:r.equipment,amount:paid,source:r.source,type:"Wpłata",cat:catOf(r.equipment)});
        });
        const periodWozkiAll=[];
        (finances||[]).forEach(f=>{
          if(f.type!=="przychód"||(f.date||"")<pStart||(f.date||"")>pEnd)return;
          const sid=f.sourceId||"";if(!sid.startsWith("wozek-"))return;
          const cid=+sid.slice(6);if(!cid)return;
          const cas=(nfzCases||[]).find(x=>x.id===cid);if(!cas)return;
          listItemsAll.push({key:"w"+f.id,date:f.date,patientName:cas.patientName,equipment:cas.wheelchairModel||"Wózek",amount:+f.amount||0,source:cas.source,type:"🦽 Wózek",cat:"wozki"});
          periodWozkiAll.push(cas);
        });
        listItemsAll.sort((a,b)=>(b.date||"").localeCompare(a.date||""));
        const listItems=srcTab==="all"?listItemsAll:listItemsAll.filter(i=>i.cat===srcTab);
        const periodRentals=srcTab==="all"?periodRentalsAll:periodRentalsAll.filter(r=>catOf(r.equipment)===srcTab);
        const periodWozki=(srcTab==="szyny"||srcTab==="balkoniki")?[]:periodWozkiAll;
        const revBy={},cntBy={},wCntBy={};
        RENTAL_SOURCES.forEach(s=>{revBy[s.value]=0;cntBy[s.value]=0;wCntBy[s.value]=0;});
        let unknownRev=0;
        listItems.forEach(item=>{
          if(item.source&&revBy.hasOwnProperty(item.source))revBy[item.source]+=item.amount;
          else unknownRev+=item.amount;
        });
        periodRentals.forEach(r=>{if(r.source&&cntBy.hasOwnProperty(r.source))cntBy[r.source]++;});
        const seen=new Set();
        periodWozki.forEach(cas=>{if(seen.has(cas.id))return;seen.add(cas.id);if(cas.source&&wCntBy.hasOwnProperty(cas.source))wCntBy[cas.source]++;});
        const rows=RENTAL_SOURCES.map(s=>({k:s.value,l:s.label,c:s.color,rev:revBy[s.value]||0,cnt:cntBy[s.value]||0,wc:wCntBy[s.value]||0}))
          .filter(x=>x.rev>0||x.cnt>0||x.wc>0).sort((a,b)=>b.rev-a.rev);
        const withoutSrc=listItems.filter(item=>!item.source).length;
        const unknownCnt=periodRentals.filter(r=>!r.source||!cntBy.hasOwnProperty(r.source)).length;
        if(unknownRev>0||unknownCnt>0)rows.push({k:"_none",l:"Nieznane",c:"#8A9BB0",rev:unknownRev,cnt:unknownCnt,wc:0});
        return {listItems,rows,totalRev:listItems.reduce((s,i)=>s+i.amount,0),totalCnt:rows.reduce((s,r)=>s+r.cnt,0),totalW:rows.reduce((s,r)=>s+r.wc,0),withoutSrc};
      })();

      const srcPct=pctSplit(src.rows.map(r=>r.rev));
      const tog=id=>()=>setOpenSec(o=>o===id?null:id);
      const kv=(l,v,c,key)=><div key={key||l} style={{display:"flex",justifyContent:"space-between",gap:8,padding:"9px 0",borderBottom:"1px solid "+borderC,fontSize:13}}><span style={{color:c||textC}}>{l}</span><b style={{color:c||textC,fontVariantNumeric:"tabular-nums",textAlign:"right"}}>{v}</b></div>;
      const navBtn=(fn,ch,dis)=><button onClick={dis?undefined:fn} disabled={!!dis} aria-label={ch==="‹"?"Wstecz":"Dalej"} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:"1.5px solid "+borderC,background:bg,opacity:dis?.35:1,cursor:dis?"default":"pointer",fontWeight:700,fontSize:18,color:subC,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>{ch}</button>;
      const shiftMonth=n=>setSelMonth(m=>{const t=ymAdd(m,n);return t>today.slice(0,7)?m:t;});
      const switchScope=s=>{if(s==="year")setStatsYear(+selMonth.slice(0,4));setScope(s);};

      // ── mini-wizualizacje w nagłówkach ──
      const miniSrc=(()=>{let x=0;const t=src.rows.reduce((s,r)=>s+r.rev,0)||1;
        return <svg width="54" height="16" aria-hidden="true">{src.rows.map(r=>{const w=r.rev/t*54;const el=<rect key={r.k} x={x} y="0" width={Math.max(0,w-1.5)} height="16" rx="3" fill={r.c}/>;x+=w;return el;})}</svg>;})();
      const miniOcc=<svg width={Math.max(9,Math.min(6,occStats.length)*9)} height="22" aria-hidden="true">{occStats.slice(0,6).map((x,i)=><rect key={x.eq} x={i*9} y={22-Math.max(2,x.pct/100*22)} width="6" height={Math.max(2,x.pct/100*22)} rx="2" fill={occCol(x.pct)}/>)}</svg>;
      const miniRoi=<span>{roiKnown.slice(0,6).map(x=><i key={x.eq} style={{display:"inline-block",width:8,height:8,borderRadius:"50%",marginLeft:3,background:x.earned>=x.investment?GREEN:ORANGE}}/>)}</span>;
      const selIdx=stats.monthlyArr.findIndex(x=>x[0]===selMonth);

      return <div style={{padding:"0 20px 24px"}}>
        {/* Okres: miesiąc / rok — wspólny dla wszystkich sekcji */}
        <div style={{display:"flex",background:dk?"#1E2F4A":"#DCE5F1",borderRadius:12,padding:3,marginBottom:10}}>
          {[["month","Miesiąc"],["year","Rok"]].map(([k,l])=><button key={k} onClick={()=>switchScope(k)} style={{flex:1,border:"none",borderRadius:10,padding:8,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",background:scope===k?(dk?"#18202F":"#fff"):"none",color:scope===k?"#3E6FB0":(dk?"#93A9CE":"#3E5578"),boxShadow:scope===k?"0 1px 4px rgba(0,0,0,.14)":"none"}}>{l}</button>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          {navBtn(()=>isYear?setStatsYear(y=>y-1):shiftMonth(-1),"‹")}
          <div style={{flex:1,textAlign:"center",fontWeight:700,fontSize:16,color:textC,fontFamily:"'Syne',sans-serif",textTransform:"capitalize"}}>{periodLabel}</div>
          {navBtn(()=>isYear?setStatsYear(y=>y+1):shiftMonth(1),"›",isYear?statsYear>=+today.slice(0,4):selMonth>=today.slice(0,7))}
        </div>

        {/* 1. Przychód */}
        <StatAcc dk={dk} open={openSec==="rev"} onToggle={tog("rev")} title="Przychód ze sprzętu" sub="wypożyczenia i wózki"
          mini={<StatSpark vals={stats.monthlyArr.map(x=>x[1]+x[2])} w={58} h={24} color={BLUE} sel={selIdx>=0&&!isYear?selIdx:null}/>}
          keyVal={Z(totalAll)} keyColor={GREEN}>
          {kv("Wypożyczenia (wpłaty)",Z(stats.totalRevenue))}
          {kv("Wózki – refundacje NFZ ("+stats.wozkiCount+" szt.)",Z(stats.wozkiRevenue),PURPLE)}
          {kv("Nowych wypożyczeń",stats.totalCount)}
          {kv("Śr. czas wypożyczenia",stats.avgDuration!==null?stats.avgDuration+" dni":"brak danych")}
          {stats.marketingSpend>0?kv("Marketing (wydatki)",Z(stats.marketingSpend),RED):kv("Marketing (wydatki)","brak wpisów w budżecie",subC)}
          <div style={{textAlign:"right",marginTop:2}}>
            <button onClick={()=>setStock(s=>({...s,_mktgOpen:!(s&&s._mktgOpen)}))} style={{fontSize:11,color:subC,background:"transparent",border:"none",cursor:"pointer",padding:"2px 0",fontFamily:"inherit"}}>{(stock&&stock._mktgOpen)?"zamknij wybór kategorii":"zmień kategorię marketingu"}</button>
          </div>
          {stock&&stock._mktgOpen&&<div style={{marginBottom:6}}>
            <div style={{fontSize:11,color:subC,marginBottom:4}}>Kategoria w budżecie (Dom):</div>
            <select value={mktgCat} onChange={e=>setStock(s=>({...s,marketingCat:e.target.value,marketingSub:""}))} style={{width:"100%",padding:"7px",borderRadius:8,border:"1px solid "+borderC,background:bg,color:textC,fontSize:13,fontFamily:"inherit",marginBottom:6}}>
              <option value="">-- domyślnie: Firma / Marketing --</option>
              {budgetCatNames.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            {mktgCat&&<select value={mktgSub} onChange={e=>setStock(s=>({...s,marketingSub:e.target.value}))} style={{width:"100%",padding:"7px",borderRadius:8,border:"1px solid "+borderC,background:bg,color:textC,fontSize:13,fontFamily:"inherit"}}>
              <option value="">-- cała kategoria --</option>
              {budgetSubNames.map(s=><option key={s} value={s}>{s}</option>)}
            </select>}
          </div>}
          <div style={{fontSize:11,fontWeight:700,color:subC,textTransform:"uppercase",letterSpacing:".07em",margin:"14px 0 4px"}}>{isYear?"Rok "+statsYear:"12 miesięcy"} · dotknij słupka</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:4,height:112,paddingTop:14}}>
            {stats.monthlyArr.map(([m,v,w])=>{
              const t=v+w,h=Math.max(t>0?3:0,Math.round(t/stats.maxMonthly*80)),hw=t>0?w/t*100:0;
              const sel=isYear?m.startsWith(String(statsYear)):m===selMonth;
              return <button key={m} onClick={()=>{setSelMonth(m);setScope("month");}} aria-label={m+": "+(demo?"":Math.round(t)+" zł")} style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",gap:4,height:"100%",border:"none",background:"none",padding:0,cursor:"pointer",fontFamily:"inherit"}}>
                <div style={{fontSize:9,fontWeight:700,color:textC,minHeight:11,whiteSpace:"nowrap"}}>{!demo&&!isYear&&m===selMonth&&t>0?(t>=1000?(t/1000).toFixed(1)+"k":Math.round(t)):""}</div>
                <div style={{width:"100%",height:h,display:"flex",flexDirection:"column",justifyContent:"flex-end",borderRadius:"5px 5px 0 0",overflow:"hidden",opacity:sel?1:.4}}>
                  <div style={{height:hw+"%",background:PURPLE}}/><div style={{flex:1,background:BLUE}}/>
                </div>
                <div style={{fontSize:9,lineHeight:1.15,textAlign:"center",color:sel?"#3E6FB0":subC,fontWeight:sel?700:400}}>{PL_MON[+m.slice(5)-1]}{(m.slice(5)==="01"||m===stats.monthlyArr[0][0])&&<div style={{fontSize:8,opacity:.8}}>{"'"+m.slice(2,4)}</div>}</div>
              </button>;
            })}
          </div>
          <div style={{display:"flex",gap:14,fontSize:11,color:subC,marginTop:8,flexWrap:"wrap"}}>
            <span><i style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:BLUE,marginRight:5}}/>Wypożyczenia</span>
            <span><i style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:PURPLE,marginRight:5}}/>Wózki (refundacje)</span>
          </div>
        </StatAcc>

        {/* 2. Skąd trafiają klienci */}
        <StatAcc dk={dk} open={openSec==="src"} onToggle={tog("src")} title="Skąd trafiają klienci" sub={src.rows.length>0?"najlepsze: "+src.rows[0].l:"brak danych w okresie"}
          mini={src.rows.length>0?miniSrc:null} keyVal={src.totalCnt+" wyp."}>
          <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
            {[{k:"all",l:"Wszystko"},{k:"szyny",l:"Szyny"},{k:"wozki",l:"Wózki"},{k:"balkoniki",l:"Balkoniki"}].map(t=>
              <button key={t.k} onClick={()=>setSrcTab(t.k)} style={{padding:"5px 12px",borderRadius:14,border:"none",cursor:"pointer",fontWeight:600,fontSize:11,background:srcTab===t.k?"#3E6FB0":dk?"#1E2F4A":"#D9E2F0",color:srcTab===t.k?"#fff":subC,fontFamily:"inherit"}}>{t.l}</button>
            )}
          </div>
          {src.totalRev===0&&src.totalCnt===0
            ?<div style={{fontSize:12,color:subC}}>Brak danych{srcTab!=="all"?" w tej kategorii":""} — uzupełnij źródło przy dodawaniu {srcTab==="wozki"?"wózków":"wypożyczeń"}</div>
            :<>
              <div style={{display:"grid",gridTemplateColumns:"132px 1fr",gap:14,alignItems:"center",marginBottom:8}}>
                <StatDonut rows={src.rows.map(r=>({k:r.k,v:r.rev,c:r.c}))} size={132} top={src.totalCnt+(src.totalW?"+"+src.totalW:"")} bottom="klientów" track={trackC} ink={textC} sub={subC}/>
                <div style={{display:"flex",flexDirection:"column",gap:7,minWidth:0}}>
                  {src.rows.map(r=><div key={r.k} style={{display:"flex",alignItems:"center",gap:8,fontSize:12,minWidth:0}}>
                    <i style={{width:9,height:9,borderRadius:3,background:r.c,flexShrink:0}}/>
                    <span style={{flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:textC}}>{r.l}</span>
                    <b style={{fontVariantNumeric:"tabular-nums",color:textC}}>{srcPct[src.rows.indexOf(r)]}%</b>
                  </div>)}
                </div>
              </div>
              {src.rows.map(r=><div key={"d"+r.k} style={{display:"flex",justifyContent:"space-between",gap:8,padding:"9px 0",borderBottom:"1px solid "+borderC,fontSize:13}}>
                <span style={{display:"flex",gap:8,alignItems:"center",minWidth:0,color:textC}}><i style={{width:9,height:9,borderRadius:3,background:r.c,flexShrink:0}}/>{r.l}</span>
                <span style={{textAlign:"right",fontVariantNumeric:"tabular-nums",color:subC}}>{r.cnt>0&&r.cnt+" wyp."}{r.wc>0&&<span style={{color:PURPLE,fontWeight:600}}>{r.cnt>0?" + ":""}{r.wc} {plWozek(r.wc)}</span>} · <b style={{color:GREEN}}>{Z(r.rev)}</b></span>
              </div>)}
              <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 0",fontSize:13}}>
                <b style={{color:textC}}>Łącznie</b><b style={{color:textC}}>{src.totalCnt} wyp.{src.totalW>0?" + "+src.totalW+" wóz.":""} · <span style={{color:GREEN}}>{Z(src.totalRev)}</span></b>
              </div>
            </>
          }
          {src.withoutSrc>0&&<div style={{fontSize:11,color:subC,marginTop:8}}>{src.withoutSrc} z {src.listItems.length} wpłat bez oznaczonego źródła</div>}
          <button onClick={()=>setShowRentalList(v=>!v)} style={{marginTop:10,width:"100%",padding:"6px",borderRadius:8,border:"1px solid "+borderC,background:"transparent",color:subC,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            {showRentalList?"▲ Ukryj listę":"▼ Lista wpłat ("+src.listItems.length+")"}
          </button>
          {showRentalList&&<div style={{marginTop:8}}>
            {src.listItems.map(item=>{
              const s=RENTAL_SOURCES.find(x=>x.value===item.source);
              const eq=(item.equipment||"?").replace("Artromot K1","AK1").replace("Kinetec Spectra","KS").replace("Optiflex","OPT").replace("Ambonka Paula","AMB").replace("Balkonik ortopedyczny","BAL").replace("Wózek inwalidzki Elite Tim","TIM");
              const isExt=item.type!=="Wpłata";
              return <div key={item.key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid "+borderC,fontSize:12,gap:6}}>
                <span style={{color:subC,flexShrink:0,fontSize:11}}>{item.date?.slice(5)}</span>
                <span style={{color:textC,fontWeight:600,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{demo?"Pacjent":item.patientName}</span>
                <span style={{color:subC,flexShrink:0,fontSize:11}}>{eq}</span>
                {isExt&&<span style={{color:"#7C6AF4",fontWeight:700,fontSize:10,flexShrink:0}}>{item.type}</span>}
                <span style={{color:GREEN,fontWeight:700,flexShrink:0}}>{demo?"****":item.amount+" zł"}</span>
                {s?<span style={{color:s.color,fontWeight:700,fontSize:10,flexShrink:0}}>{s.label.split(" ")[0]}</span>:<span style={{color:subC,fontSize:10,flexShrink:0}}>—</span>}
              </div>;
            })}
          </div>}
        </StatAcc>

        {/* 3. Obłożenie szyn CPM */}
        <StatAcc dk={dk} open={openSec==="occ"} onToggle={tog("occ")} title="Obłożenie szyn CPM" sub={occStats.length>0?"średnio "+avgOcc+"% dni w okresie":"brak danych w okresie"}
          mini={occStats.length>0?miniOcc:null} keyVal={occStats.length>0?avgOcc+"%":"—"} keyColor={occStats.length>0?occCol(avgOcc):subC}>
          {occStats.length===0&&<div style={{fontSize:13,color:subC,textAlign:"center",padding:"8px 0"}}>Brak danych o szynach CPM w tym okresie</div>}
          {occStats.map(x=>{
            const col=occCol(x.pct);
            const preStyle={height:16,borderRadius:3,background:"transparent",boxShadow:"inset 0 0 0 1px "+trackC};
            let strip;
            if(!isYear){
              const byDate={};x.days.forEach(d=>{byDate[d.d]=d;});
              const cells=Array.from({length:monthLastDay},(_,i)=>{
                const ds=selMonth+"-"+String(i+1).padStart(2,"0");
                const d=byDate[ds];
                if(d)return <i key={i} style={{height:16,borderRadius:3,background:d.c>0?col:trackC}}/>;
                return <i key={i} style={ds>today?{height:16,borderRadius:3,background:trackC,opacity:.4}:preStyle}/>;
              });
              strip=<><div style={{display:"grid",gridTemplateColumns:"repeat("+monthLastDay+",1fr)",gap:2}}>{cells}</div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:subC,marginTop:3}}><span>1</span><span>10</span><span>20</span><span>{monthLastDay}</span></div></>;
            }else{
              const cells=Array.from({length:12},(_,i)=>{
                const ym=statsYear+"-"+String(i+1).padStart(2,"0");
                const me=ym+"-"+String(new Date(statsYear,i+1,0).getDate()).padStart(2,"0");
                const o=occupancyForEq(x.eq,rentals,stock,ym+"-01",me,today);
                if(o.noData)return <i key={i} style={me>today?{height:16,borderRadius:3,background:trackC,opacity:.4}:preStyle}/>;
                return <i key={i} style={{height:16,borderRadius:3,background:"color-mix(in srgb,"+col+" "+Math.max(o.pct>0?14:0,o.pct)+"%,"+trackC+")"}}/>;
              });
              strip=<><div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:2}}>{cells}</div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:subC,marginTop:3}}>{["S","L","M","K","M","C","L","S","W","P","L","G"].map((l,i)=><span key={i}>{l}</span>)}</div></>;
            }
            const fmtPl=d=>d.slice(8)+"."+d.slice(5,7)+"."+d.slice(0,4);
            return <div key={x.eq} style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:5,gap:8}}>
                <b style={{fontSize:13,fontWeight:600,color:textC,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{x.eq}{x.qty>1&&<span style={{color:subC,fontWeight:400}}> ({x.qty} szt.)</span>}</b>
                <b style={{color:col,fontVariantNumeric:"tabular-nums"}}>{x.pct}%</b>
              </div>
              {strip}
              <div style={{fontSize:10,color:subC,marginTop:4,lineHeight:1.45}}>
                {x.start>pStart&&<div>liczone od {fmtPl(x.start)}</div>}
                {x.missingAdded&&<div>brak daty dodania — start = pierwsze wypożyczenie ({fmtPl(x.start)}). Uzupełnij w Sprzęt → Edytuj.</div>}
                {x.overlapDays>0&&<div style={{color:ORANGE}}>⚠ {x.overlapDays} dni: więcej wypożyczeń naraz niż sztuk ({x.qty}) — sprawdź daty lub liczbę sztuk</div>}
              </div>
            </div>;
          })}
          <div style={{fontSize:11,color:subC,marginTop:6,lineHeight:1.5}}>Tylko szyny CPM. {isYear?"Każdy kwadracik to jeden miesiąc — ciemniejszy = większe obłożenie.":"Każdy kwadracik to jeden dzień — zapełniony, gdy szyna była wypożyczona."} Liczone jest wypożyczenie pacjenta (od startu do końca okresu, za który płaci), a nie moment odbioru sprzętu. Start = data dodania sprzętu albo pierwsze wypożyczenie; rezerwacje się nie liczą. Pusta ramka = przed dodaniem sprzętu.</div>
        </StatAcc>

        {/* 4. Opłacalność sprzętu */}
        <StatAcc dk={dk} open={openSec==="roi"} onToggle={tog("roi")} title="Opłacalność sprzętu" sub="zakup, naprawy, zwrot (cały czas)"
          mini={roiKnown.length>0?miniRoi:null} keyVal={roiKnown.length>0?roiDone+"/"+roiKnown.length:"—"}>
          {roiShown.length===0&&<div style={{fontSize:13,color:subC,textAlign:"center",padding:"8px 0"}}>Brak sprzętu z przychodem lub kosztem zakupu</div>}
          {roiShown.map(({eq,earned,investment,roi})=>{
            const isOpen=roiEq===eq;
            const c=getCosts(eq);
            const qty=getQty(eq);
            const machineSrvEntries=getMachineSrvForEq(eq);
            const repairsTotal=(c.repairs||[]).reduce((s,r)=>s+(+r.amount||0),0)+machineSrvEntries.reduce((s,x)=>s+x.amount,0);
            // Szacunek zwrotu: średnia z ostatnich 3 miesięcy, ale dzielona przez faktyczny czas działania sprzętu (nowy sprzęt nie jest "rozwodniony")
            const cut3=ymAdd(today.slice(0,7),-3)+"-"+today.slice(8,10);
            const eqRev=(finances||[]).filter(f=>{if(f.type!=="przychód"||!f.date)return false;const rid=getRid(f.sourceId);return !!rid&&rentalEquipMap[rid]===eq;});
            let avgMonthly=0;
            if(eqRev.length){
              const first=eqRev.reduce((m,f)=>f.date<m?f.date:m,"9999-12-31");
              const from=first>cut3?first:cut3;
              const sum3=eqRev.filter(f=>f.date>=cut3).reduce((sm,f)=>sm+(+f.amount||0),0);
              avgMonthly=Math.round(sum3/Math.min(3,Math.max(1,dateDiff(from,today)/30.4)));
            }
            const remaining=investment-earned;
            const monthsLeft=avgMonthly>0&&remaining>0?Math.ceil(remaining/avgMonthly):null;
            const avgDur=getDurationInclude(eq)?avgDurationByEq[eq]:null;
            const ok=investment>0&&earned>=investment;
            const scale=Math.max(earned,investment,1)*1.08;
            return <div key={eq} style={{marginBottom:10,background:dk?"#0F1E1E":"#F6F9FC",borderRadius:14,overflow:"hidden"}}>
              <div onClick={()=>setRoiEq(isOpen?null:eq)} style={{padding:"10px 12px",cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,gap:8}}>
                  <div style={{fontSize:13,fontWeight:700,color:textC,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{eq}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                    {roi!==null
                      ?<span style={{borderRadius:8,padding:"3px 9px",fontSize:11,fontWeight:700,background:(ok?GREEN:ORANGE)+"26",color:ok?GREEN:ORANGE}}>{ok?"zwrócony · "+roi+"%":roi+"% zwrotu"}</span>
                      :<span style={{fontSize:11,color:subC}}>wpisz koszt zakupu</span>}
                    <span style={{fontSize:10,color:subC}}>{isOpen?"▲":"▼"}</span>
                  </div>
                </div>
                {investment>0&&<>
                  <div style={{position:"relative",height:12,borderRadius:6,background:trackC,marginBottom:6}}>
                    <div style={{position:"absolute",top:0,bottom:0,left:0,width:(investment/scale*100)+"%",borderRadius:"6px 0 0 6px",background:"rgba(122,143,166,.35)"}}/>
                    <div style={{position:"absolute",top:3,bottom:3,left:0,width:Math.min(100,earned/scale*100)+"%",borderRadius:3,background:ok?GREEN:ORANGE}}/>
                    <div style={{position:"absolute",top:-3,bottom:-3,left:(investment/scale*100)+"%",width:2,borderRadius:1,background:textC}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:subC,gap:8}}>
                    <span>{demo?"****":"Zarobiono: "+Math.round(earned)+" zł"}</span>
                    <span>{demo?"****":"Inwest.: "+Math.round(investment)+" zł"+(qty>1?" ("+qty+"×"+(+c.purchase||0)+(repairsTotal>0?"+"+repairsTotal+"nap.":"")+")":(repairsTotal>0?" (w tym "+repairsTotal+" nap.)":""))}</span>
                  </div>
                  {monthsLeft!==null&&remaining>0&&<div style={{fontSize:11,color:ORANGE,marginTop:3}}>⏳ Zwrot za ~{monthsLeft} mies.</div>}
                  {ok&&<div style={{fontSize:11,color:GREEN,marginTop:3}}>✅ Zwróciło się w całości!</div>}
                </>}
                {avgDur!==null&&<div style={{fontSize:11,color:subC,marginTop:investment>0?3:0}}>⏱ Śr. czas wypożyczenia: {avgDur} dni</div>}
              </div>
              {isOpen&&<div style={{padding:"0 12px 12px",borderTop:"1px solid "+borderC}}>
                <div style={{marginTop:10}}>
                  <SectionLabel style={{marginBottom:6}}>Koszt zakupu (za 1 szt.)</SectionLabel>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input type="number" value={c.purchase||""} onChange={e=>setPurchase(eq,e.target.value)} placeholder="0 zł"
                      style={{flex:1,padding:"8px 12px",border:"1.5px solid "+(dk?"#2A3A56":"#D9E2F0"),borderRadius:10,fontSize:14,background:dk?"#18202F":"#fff",color:textC,fontFamily:"inherit",outline:"none"}}/>
                    <span style={{fontSize:13,color:subC}}>zł</span>
                  </div>
                </div>
                <div style={{marginTop:10}}>
                  <SectionLabel style={{marginBottom:6}}>Liczba sztuk</SectionLabel>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <input type="number" min="1" value={qty} onChange={e=>setQtyInStats(eq,e.target.value)}
                      style={{width:80,padding:"8px 12px",border:"1.5px solid "+(dk?"#2A3A56":"#D9E2F0"),borderRadius:10,fontSize:14,background:dk?"#18202F":"#fff",color:textC,fontFamily:"inherit",outline:"none"}}/>
                    <span style={{fontSize:12,color:subC}}>szt. → łączny koszt: <b style={{color:textC}}>{(+c.purchase||0)*qty} zł</b></span>
                  </div>
                </div>
                <div style={{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <SectionLabel style={{marginBottom:0}}>Wliczaj do śr. czasu wyp.</SectionLabel>
                  <button onClick={()=>setDurationInclude(eq,!getDurationInclude(eq))} style={{padding:"5px 14px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:getDurationInclude(eq)?"#3E6FB0":"#D9E2F0",color:getDurationInclude(eq)?"#fff":"#7A8FA6"}}>
                    {getDurationInclude(eq)?"✓ Tak":"✗ Nie"}
                  </button>
                </div>
                <div style={{marginTop:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <SectionLabel style={{marginBottom:0}}>
                      Naprawy / serwis{repairsTotal>0&&<span style={{color:RED,marginLeft:4}}>({repairsTotal} zł)</span>}
                    </SectionLabel>
                    <button onClick={()=>setRepairForm({eq,id:Date.now()+"",date:todayLocal(),amount:"",desc:""})}
                      style={{background:"#E1E9F5",border:"none",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,color:"#3E6FB0",cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj</button>
                  </div>
                  {(()=>{const allRep=[...(c.repairs||[]),...machineSrvEntries].sort((a,b)=>(b.date||"").localeCompare(a.date||""));
                  if(allRep.length===0)return<div style={{fontSize:12,color:subC}}>Brak wpisanych napraw</div>;
                  return allRep.map(rep=><div key={rep.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid "+borderC}}>
                    <div>
                      <div style={{fontSize:13,color:textC,fontWeight:600}}>{demo?"****":rep.amount+" zł"}{rep.desc&&<span style={{fontWeight:400,color:subC}}> · {rep.desc}</span>}</div>
                      {rep.date&&<div style={{fontSize:11,color:subC}}>{rep.date}{rep.fromService&&<span style={{marginLeft:6,color:"#3E6FB0",fontSize:10}}>z Serwisu</span>}</div>}
                    </div>
                    {rep.fromService
                      ?<span style={{fontSize:10,color:"#7A8FA6",padding:"2px 8px"}}>🔧</span>
                      :<button onClick={()=>deleteRepair(eq,rep.id)} style={{background:"none",border:"none",color:RED,fontSize:18,cursor:"pointer",padding:"2px 6px"}}>×</button>}
                  </div>);})()}
                </div>
              </div>}
            </div>;
          })}
          {(roiHidden>0||showAllRoi)&&<button onClick={()=>setShowAllRoi(v=>!v)} style={{width:"100%",padding:"8px",borderRadius:10,border:"1px dashed "+borderC,background:"none",color:"#3E6FB0",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit",marginBottom:6}}>{showAllRoi?"Ukryj sprzęt bez danych":"Pokaż resztę sprzętu ("+roiHidden+") — aby wpisać koszt zakupu"}</button>}
          <div style={{fontSize:11,color:subC,marginTop:6,lineHeight:1.5}}>Kreska = punkt zwrotu (zakup + naprawy). Nie zależy od wybranego okresu. Dotknij sprzętu, aby wpisać zakup i naprawy.</div>
        </StatAcc>

        {repairForm&&(()=>{
          const eqMachines=(machines||[]).filter(m=>m.type===repairForm.eq);
          const targetId=eqMachines.length===1?eqMachines[0].id:repairForm.machineId;
          return <Modal title="Naprawa / serwis" onClose={()=>setRepairForm(null)}>
            <div style={{fontSize:13,fontWeight:600,color:subC,marginBottom:12}}>{repairForm.eq}</div>
            <Inp label="Kwota (zł)" value={repairForm.amount} onChange={v=>setRepairForm(f=>({...f,amount:v}))} type="number"/>
            <Inp label="Opis (opcjonalnie)" value={repairForm.desc} onChange={v=>setRepairForm(f=>({...f,desc:v}))}/>
            <Inp label="Data" value={repairForm.date} onChange={v=>setRepairForm(f=>({...f,date:v}))} type="date"/>
            {eqMachines.length>1&&<Sel label="Maszyna (zakładka Serwis)" value={String(repairForm.machineId||eqMachines[0].id)} onChange={v=>setRepairForm(f=>({...f,machineId:+v}))} options={eqMachines.map(m=>({value:String(m.id),label:m.name||m.type}))}/>}
            {eqMachines.length===1&&<div style={{fontSize:12,color:subC,marginBottom:10}}>📍 Doda się też do maszyny "{eqMachines[0].name||eqMachines[0].type}" w zakładce Serwis</div>}
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>{
              if(!repairForm.amount)return;
              const target=eqMachines.find(m=>m.id===(targetId||eqMachines[0]?.id));
              if(target){
                const entry={id:Date.now(),date:repairForm.date,type:"Naprawa",notes:repairForm.desc,cost:+repairForm.amount};
                setMachines(ms=>ms.map(m=>m.id===target.id?{...m,lastServiceDate:repairForm.date,serviceLog:[...(m.serviceLog||[]),entry]}:m));
                setFinances(fs=>[{id:Date.now()+Math.random(),sourceId:"serwis-"+target.id+"-"+entry.id,date:repairForm.date,type:"koszt",category:"Serwis",amount:+repairForm.amount,description:"Naprawa"+(repairForm.desc?" – "+repairForm.desc:"")+" ("+(target.name||target.type)+")"},...(fs||[])]);
              }else{
                saveRepair(repairForm.eq,{id:repairForm.id,date:repairForm.date,amount:+repairForm.amount,desc:repairForm.desc});
              }
              setRepairForm(null);
            }}>Zapisz</Btn>
          </Modal>;
        })()}
      </div>;
    }

    // ── FINANCES ──────────────────────────────────────────────────────────────

    function Finances({finances,setFinances,visits,setVisits,rentals,setRentals,nfzCases,setNfzCases,budget,setBudget,desk,stock,setStock,machines,setMachines,wealth,setWealth}) {
      const demo=useDemo();
      const dk=useContext(DarkCtx);
      const [showAdd,setShowAdd]=useState(false);
      const [editE,setEditE]=useState(null);
      const [viewMode,setViewMode]=useState(()=>{const h=window.location.hash.replace("#","").split("-");return h[1]||"month";});
      useEffect(()=>{window.location.replace("#finances-"+viewMode);},[viewMode]);
      const [month,setMonth]=useState(()=>todayLocal().slice(0,7));
      const [year,setYear]=useState(()=>todayLocal().slice(0,4));
      const [weekStart,setWeekStart]=useState(()=>{const d=new Date();const day=d.getDay()||7;d.setDate(d.getDate()-day+1);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");});
      const [rangeFrom,setRangeFrom]=useState(()=>todayLocal().slice(0,7)+"-01");
      const [rangeTo,setRangeTo]=useState(()=>todayLocal());
      const [toast,setToast]=useState(null);
      const [showAllPats,setShowAllPats]=useState(false);
      const [expandedCat,setExpandedCat]=useState(null);
      const cats=["Wizyta","Wypożyczalnia","Wózek","Inne"];
      const ef=()=>({date:todayLocal(),category:"Wizyta",amount:"",description:""});
      const [form,setForm]=useState(ef);

      const weekEnd=useMemo(()=>{const d=new Date(weekStart+"T12:00:00");d.setDate(d.getDate()+6);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");},[weekStart]);

      // visitMap: sourceId -> actual visit date
      const visitMap=useMemo(()=>{
        const m={};
        (visits||[]).forEach(v=>{if(v.id)m["visit-"+v.id]=v.date;});
        return m;
      },[visits]);

      const inPeriod=(date)=>{
        if(!date)return false;
        if(viewMode==="month")return date.startsWith(month);
        if(viewMode==="week")return date>=weekStart&&date<=weekEnd;
        if(viewMode==="range")return date>=rangeFrom&&date<=rangeTo;
        return date.startsWith(year);
      };
      const inPrevPeriod=(date)=>{
        if(!date)return false;
        if(viewMode==="month"){const d=new Date(month+"-15");d.setMonth(d.getMonth()-1);return date.startsWith(d.toISOString().slice(0,7));}
        if(viewMode==="week"){const ps=new Date(weekStart);ps.setDate(ps.getDate()-7);const pe=new Date(weekEnd);pe.setDate(pe.getDate()-7);return date>=ps.toISOString().slice(0,10)&&date<=pe.toISOString().slice(0,10);}
        if(viewMode==="range")return false;
        return date.startsWith(String(+year-1));
      };

      const inc=useMemo(()=>finances.filter(f=>{
        if(f.type!=="przychód")return false;
        const d=(f.sourceId||"").startsWith("visit-")?(visitMap[f.sourceId]||f.date):f.date;
        return inPeriod(d);
      }).reduce((s,f)=>s+(+f.amount||0),0),[finances,visits,visitMap,viewMode,month,year,weekStart,weekEnd,rangeFrom,rangeTo]);
      const prevInc=useMemo(()=>finances.filter(f=>{
        if(f.type!=="przychód")return false;
        const d=(f.sourceId||"").startsWith("visit-")?(visitMap[f.sourceId]||f.date):f.date;
        return inPrevPeriod(d);
      }).reduce((s,f)=>s+(+f.amount||0),0),[finances,visits,visitMap,viewMode,month,year,weekStart,weekEnd,rangeFrom,rangeTo]);
      const diff=prevInc>0?Math.round((inc-prevInc)/prevInc*100):null; // prevInc still from finances for comparison
      // ── SPÓJNA LOGIKA FILTROWANIA ────────────────────────────────────────────
      // Reguła: dla wpisów visit-* data = visits[id].date (aktualna data wizyty)
      //         dla reszty (payment, cycle, extend, wozek) = f.date z finances
      // visitMap już zbudowany wyżej

      // Wizyty w okresie (źródło: visits)
      const periodVisits=useMemo(()=>(visits||[]).filter(v=>inPeriod(v.date)&&v.status!=="anulowana"&&visitStatus(v)==="zakończona"),[visits,viewMode,month,year,weekStart,weekEnd,rangeFrom,rangeTo]);
      const visitCount=periodVisits.length;
      const visitAvg=visitCount>0?periodVisits.reduce((s,v)=>s+(+v.price||0),0)/visitCount:0;

      // Finanse nie-wizytowe w okresie (payment, cycle, extend, wozek, ręczne)
      const periodNonVisitFinances=useMemo(()=>finances.filter(f=>{
        if(f.type!=="przychód")return false;
        if((f.sourceId||"").startsWith("visit-"))return false; // wizyty liczymy z visits
        return inPeriod(f.date);
      }),[finances,viewMode,month,year,weekStart,weekEnd,rangeFrom,rangeTo]);

      // Łączny przychód: wizyty (z visits.price) + reszta (z finances)
      // inc już wyliczony wyżej przez finances — nadpisujemy spójnie
      const incVisits=periodVisits.reduce((s,v)=>s+(+v.price||0),0);
      const incOther=periodNonVisitFinances.reduce((s,f)=>s+(+f.amount||0),0);
      const incTotal=incVisits+incOther;

      // Kategorie
      const catBreakdown=useMemo(()=>{
        const map={Wizyta:incVisits,Wypożyczalnia:0,Wózek:0,Inne:0};
        periodNonVisitFinances.forEach(f=>{
          const c=f.category||"Inne";
          if(map[c]!==undefined)map[c]+=+f.amount||0;
          else map["Inne"]+=+f.amount||0;
        });
        const colors={Wizyta:"#3E6FB0",Wypożyczalnia:"#2E86AB",Wózek:"#7B4FBF",Inne:"#7A8FA6"};
        return Object.entries(map).filter(([,v])=>v>0).map(([k,v])=>({label:k,v,color:colors[k]||"#7A8FA6"}));
      },[periodVisits,periodNonVisitFinances,incVisits]);

      // Pacjenci (wizyty + wypożyczenia + wózki)
      const topPats=useMemo(()=>{
        const map={};const cnt={};
        periodVisits.forEach(v=>{
          const name=v.patientName||"Nieznany";
          if(name==="Nieznany")return;
          cnt[name]=(cnt[name]||0)+1;
          map[name]=(map[name]||0)+(+v.price||0);
        });
        periodNonVisitFinances.forEach(f=>{
          const raw=(f.description||"").split(" – ")[1];
          if(!raw)return;
          const name=raw.split(" (")[0].trim();
          if(!name)return;
          map[name]=(map[name]||0)+(+f.amount||0);
        });
        return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([n,v])=>([n,v,cnt[n]||0]));
      },[periodVisits,periodNonVisitFinances]);
      const visiblePats=showAllPats?topPats:topPats.slice(0,5);

      // Lista wpisów: wizyty z visits + reszta z finances
      const listEntries=useMemo(()=>{
        const visitRows=periodVisits.map(v=>({
          id:"v-"+v.id,sourceId:"visit-"+v.id,date:v.date,
          category:"Wizyta",amount:v.price||0,
          description:"Wizyta – "+v.patientName,type:"przychód"
        }));
        const otherRows=periodNonVisitFinances;
        return [...visitRows,...otherRows].sort((a,b)=>b.date.localeCompare(a.date));
      },[periodVisits,periodNonVisitFinances]);

      // Wpisy pogrupowane po kategorii (do rozwijanej listy w karcie "Kategorie"), już sort. po dacie (najnowsze pierwsze)
      const catEntries=useMemo(()=>{
        const known=new Set(["Wizyta","Wypożyczalnia","Wózek"]);
        const map={};
        listEntries.forEach(f=>{
          const c=known.has(f.category)?f.category:"Inne";
          (map[c]=map[c]||[]).push(f);
        });
        return map;
      },[listEntries]);

      // Koszt marketingu w całym roku / w wybranym miesiącu (ta sama reguła dopasowania co w zakładce Sprzęt)
      const yearMarketingSpend=useMemo(()=>{
        let total=0;
        for(let m=1;m<=12;m++)total+=marketingSpendForMonth(budget,stock,year+"-"+String(m).padStart(2,"0"));
        return total;
      },[year,budget,stock]);
      const monthMarketingSpend=useMemo(()=>marketingSpendForMonth(budget,stock,month),[month,budget,stock]);

      const months=useMemo(()=>{const c=todayLocal().slice(0,7),s=new Set([c]);finances.forEach(f=>{if(f.date)s.add(f.date.slice(0,7));});return Array.from(s).sort((a,b)=>b.localeCompare(a));},[finances]);
      const years=useMemo(()=>{const c=todayLocal().slice(0,4),s=new Set([c]);finances.forEach(f=>{if(f.date)s.add(f.date.slice(0,4));});return Array.from(s).sort((a,b)=>b.localeCompare(a));},[finances]);

      const deleteWithSource=(entry)=>{
        const sid=entry.sourceId;
        if(!sid){setFinances(fs=>fs.filter(f=>f.id!==entry.id));return;}
        if(sid.startsWith("visit-")){const vid=+sid.replace("visit-","");setVisits(vs=>vs.filter(v=>+v.id!==vid));}
        else if(sid.startsWith("payment-")){const pid=+sid.replace("payment-","");setRentals(rs=>rs.map(r=>{const found=(r.payments||[]).find(p=>+p.id===pid);if(!found)return r;const newPmts=(r.payments||[]).filter(p=>+p.id!==pid);return{...r,payments:newPmts,amountPaid:newPmts.reduce((s,p)=>s+(+p.amount||0),0)};}));}
        else if(sid.startsWith("extend-")){const rest=sid.slice(7);const di=rest.indexOf("-");const rid=+rest.slice(0,di);const eid=+rest.slice(di+1);setRentals(rs=>rs.map(r=>+r.id!==rid?r:{...r,extensions:(r.extensions||[]).map(e=>+e.id===eid?{...e,amountPaid:0,paidDate:null}:e)}));}
        else if(sid.startsWith("cycle-")){const {rentalId,cycleKey}=parseCycleSourceId(sid);setRentals(rs=>rs.map(r=>+r.id!==rentalId?r:{...r,cycles:(r.cycles||[]).map(c=>(c.dueDate||c.month)===cycleKey?{...c,paid:false,paidDate:null}:c)}));}
        else if(sid.startsWith("wozek-")){const cid=+sid.replace("wozek-","");setNfzCases(cs=>(cs||[]).map(c=>+c.id===cid?{...c,realized:false}:c));}
        else if(sid.startsWith("transport-")){const rid=+sid.slice(10);setRentals(rs=>rs.map(r=>+r.id===rid?{...r,transportPaid:false,transportPaidDate:null}:r));}
        else if(sid.startsWith("serwis-")){const rest=sid.slice(7);const di=rest.indexOf("-");const mid=+rest.slice(0,di);const eid=+rest.slice(di+1);setMachines(ms=>(ms||[]).map(m=>{if(m.id!==mid)return m;const log=(m.serviceLog||[]).filter(s=>s.id!==eid);const lastServiceDate=log.length>0?log.reduce((a,b)=>(a.date>b.date?a:b)).date:null;return{...m,serviceLog:log,lastServiceDate};}));}
        setFinances(fs=>fs.filter(f=>f.id!==entry.id));
      };

      const bg2=dk?"#18202F":"#fff";
      const border=dk?"#2A3A56":"#D9E2F0";
      const sub="#7A8FA6";
      const catColors={Wizyta:"#3E6FB0",Wypożyczalnia:"#2E86AB",Wózek:"#7B4FBF",Inne:"#7A8FA6"};

      return <>
        <div>
          <div style={{padding:"28px 20px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800}}>Finanse</div>
            {viewMode!=="sprzet"&&viewMode!=="wealth"&&<Btn small onClick={()=>{setForm(ef());setShowAdd(true);}}><Ico d={I.plus} s={16} c="#fff"/> Dodaj</Btn>}
          </div>
          <div style={{padding:"0 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,gap:8}}>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[{k:"week",l:"Tydzień"},{k:"month",l:"Miesiąc"},{k:"year",l:"Rok"},{k:"range",l:"Zakres"}].map(x=>
                  <button key={x.k} onClick={()=>setViewMode(x.k)} style={{padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,whiteSpace:"nowrap",background:viewMode===x.k?"#3E6FB0":dk?"#1E2F4A":"#D9E2F0",color:viewMode===x.k?"#fff":dk?"#6B84AC":"#3E5578",fontFamily:"inherit"}}>{x.l}</button>
                )}
              </div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                {[{k:"budget",l:"🏠",t:"Dom"},{k:"sprzet",l:"📊",t:"Statystyki"},{k:"wealth",l:"💼",t:"Majątek"}].map(x=>
                  <button key={x.k} onClick={()=>setViewMode(x.k)} title={x.t} style={{width:36,height:34,borderRadius:10,border:`1.5px solid ${viewMode===x.k?"#3E6FB0":border}`,cursor:"pointer",fontSize:16,background:viewMode===x.k?(dk?"#0A3030":"#E1E9F5"):dk?"#18202F":"#fff",color:viewMode===x.k?"#3E6FB0":sub,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>{x.l}</button>
                )}
              </div>
            </div>

            {(viewMode==="week"||viewMode==="month"||viewMode==="year")&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <button onClick={()=>{
                if(viewMode==="week"){const d=new Date(weekStart);d.setDate(d.getDate()-7);setWeekStart(d.toISOString().slice(0,10));}
                else if(viewMode==="month"){const d=new Date(month+"-15");d.setMonth(d.getMonth()-1);setMonth(d.toISOString().slice(0,7));}
                else setYear(String(+year-1));
              }} style={{width:34,height:34,borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#18202F":"#EFF3FA",cursor:"pointer",fontSize:18,color:sub,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>‹</button>
              <div style={{flex:1,textAlign:"center",fontWeight:600,fontSize:13,color:dk?"#C8E8E8":"#1C2B3A",textTransform:"capitalize"}}>
                {viewMode==="week"?weekStart+" – "+weekEnd:viewMode==="month"?new Date(month+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"}):year}
              </div>
              <button onClick={()=>{
                if(viewMode==="week"){const d=new Date(weekStart);d.setDate(d.getDate()+7);setWeekStart(d.toISOString().slice(0,10));}
                else if(viewMode==="month"){const d=new Date(month+"-15");d.setMonth(d.getMonth()+1);setMonth(d.toISOString().slice(0,7));}
                else setYear(String(+year+1));
              }} style={{width:34,height:34,borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#18202F":"#EFF3FA",cursor:"pointer",fontSize:18,color:sub,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>›</button>
            </div>}
            {viewMode==="budget"&&<Budget finances={finances} visits={visits} rentals={rentals} budget={budget} setBudget={setBudget} desk={desk}/>}
            {viewMode==="sprzet"&&<RentalStats rentals={rentals} stock={stock} setStock={setStock} finances={finances} setFinances={setFinances} budget={budget} machines={machines} setMachines={setMachines} nfzCases={nfzCases}/>}
            {viewMode==="wealth"&&<Wealth wealth={wealth} setWealth={setWealth}/>}
            {viewMode==="range"&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,flexWrap:"wrap"}}>
              <input type="date" value={rangeFrom} onChange={e=>setRangeFrom(e.target.value)} style={{flex:1,minWidth:120,padding:"9px 12px",borderRadius:12,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:14,fontFamily:"inherit"}}/>
              <span style={{color:sub,fontWeight:600}}>—</span>
              <input type="date" value={rangeTo} onChange={e=>setRangeTo(e.target.value)} style={{flex:1,minWidth:120,padding:"9px 12px",borderRadius:12,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:14,fontFamily:"inherit"}}/>
            </div>}

            {viewMode!=="budget"&&viewMode!=="sprzet"&&viewMode!=="wealth"&&<>
              <div style={{background:bg2,borderRadius:16,padding:"16px",marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div>
                    <div style={{fontSize:11,color:sub,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Przychód</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28,color:"#3DAA72",lineHeight:1}}>{demo?"****":incTotal.toFixed(2)} zł</div>
                    {visitCount>0&&<div style={{fontSize:12,color:sub,marginTop:6}}>{visitCount} {visitCount===1?"wizyta":visitCount<5?"wizyty":"wizyt"} · śr. <b style={{color:dk?"#C8E8E8":"#1C2B3A"}}>{demo?"**":Math.round(visitAvg)} zł</b></div>}
                  </div>
                  {diff!==null&&<div style={{background:diff>=0?"#3DAA7220":"#E05C5C20",borderRadius:10,padding:"6px 10px",textAlign:"center"}}>
                    <div style={{fontWeight:700,fontSize:14,color:diff>=0?"#3DAA72":"#E05C5C"}}>{diff>=0?"+":""}{diff}%</div>
                    <div style={{fontSize:10,color:sub}}>vs poprz.</div>
                  </div>}
                </div>
                {(viewMode==="month"||viewMode==="year")&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10,paddingTop:10,borderTop:`1px solid ${border}`}}>
                  <span style={{fontSize:12,color:sub,fontWeight:600}}>📣 Koszt marketingu ({viewMode==="month"?"ten miesiąc":"cały rok"})</span>
                  <span style={{fontSize:14,fontWeight:800,color:"#E05C5C"}}>{demo?"****":(viewMode==="month"?monthMarketingSpend:yearMarketingSpend).toFixed(2)+" zł"}</span>
                </div>}
              </div>

              {catBreakdown.length>0&&<div style={{background:bg2,borderRadius:16,padding:"16px",marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
                <SectionLabel style={{marginBottom:12}}>Kategorie</SectionLabel>
                {catBreakdown.map(c=>{
                  const pct=inc>0?(c.v/inc*100):0;
                  const isOpen=expandedCat===c.label;
                  const entries=catEntries[c.label]||[];
                  return <div key={c.label} style={{marginBottom:10}}>
                    <div onClick={()=>setExpandedCat(isOpen?null:c.label)} style={{cursor:"pointer"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:13,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A"}}>{c.label} <span style={{color:sub,fontSize:10}}>{isOpen?"▲":"▼"}</span></span>
                        <span style={{fontSize:13,color:sub}}>{demo?"****":c.v.toFixed(2)} zł <span style={{color:c.color,fontWeight:700}}>({pct.toFixed(0)}%)</span></span>
                      </div>
                      <div style={{height:7,borderRadius:4,background:dk?"#2A3A56":"#F0F4F8"}}>
                        <div style={{height:"100%",width:pct+"%",background:c.color,borderRadius:4,transition:"width .3s"}}/>
                      </div>
                    </div>
                    {isOpen&&<div style={{marginTop:8,paddingLeft:2}}>
                      {entries.length===0&&<div style={{fontSize:12,color:sub,padding:"4px 0"}}>Brak wpisów</div>}
                      {entries.map((f,i)=>(
                        <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<entries.length-1?`1px solid ${border}`:"none"}}>
                          <div style={{minWidth:0,flex:1,paddingRight:8}}>
                            <div style={{fontSize:12,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{demo?c.label:(f.description||f.category)}</div>
                            <div style={{fontSize:11,color:sub}}>{f.date}</div>
                          </div>
                          <span style={{fontSize:12,fontWeight:700,color:"#3DAA72",flexShrink:0}}>+{demo?"****":(+f.amount).toFixed(2)} zł</span>
                        </div>
                      ))}
                    </div>}
                  </div>;
                })}
              </div>}

              {topPats.length>0&&<div style={{background:bg2,borderRadius:16,padding:"16px",marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
                <SectionLabel style={{marginBottom:12}}>Pacjenci</SectionLabel>
                {visiblePats.map(([name,v,c],i)=>(
                  <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<visiblePats.length-1?`1px solid ${border}`:"none"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:22,height:22,borderRadius:7,background:"#3E6FB020",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#3E6FB0"}}>{i+1}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A"}}>{demo?"Pacjent "+String.fromCharCode(65+i):name}</div>
                        <div style={{fontSize:11,color:sub}}>{c} {c===1?"wizyta":c<5?"wizyty":"wizyt"}</div>
                      </div>
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:"#3DAA72"}}>{demo?"****":v.toFixed(2)} zł</span>
                  </div>
                ))}
                {topPats.length>5&&<button onClick={()=>setShowAllPats(v=>!v)} style={{width:"100%",marginTop:10,padding:"8px 0",borderRadius:10,border:"none",background:"none",cursor:"pointer",fontWeight:600,fontSize:12,color:"#3E6FB0",fontFamily:"inherit"}}>{showAllPats?"Pokaż mniej ↑":"Pokaż wszystkich ("+topPats.length+") ↓"}</button>}
              </div>}

              <SectionLabel style={{margin:"16px 0 8px"}}>Wpisy</SectionLabel>
              {listEntries.length===0&&<Empty text="Brak przychodów w tym okresie"/>}
              {listEntries.map(f=>(
                <Card key={f.id} onClick={()=>setEditE({...f,amount:String(f.amount)})}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{minWidth:0,flex:1}}>
                      <div style={{fontWeight:600,fontSize:14,color:dk?"#E8F5F5":"#1C2B3A"}}>{demo?f.category:f.description||f.category}</div>
                      <div style={{fontSize:12,color:sub,marginTop:2,display:"flex",alignItems:"center",gap:6}}>{f.date} · <Badge color={catColors[f.category]||"#7A8FA6"}>{f.category}</Badge></div>
                    </div>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16,color:"#3DAA72",marginLeft:8,flexShrink:0}}>+{demo?"****":f.amount} zł</span>
                  </div>
                </Card>
              ))}
            </>}

          </div>
        </div>

        {showAdd&&<Modal title="Nowy przychód" onClose={()=>setShowAdd(false)}>
          <Sel label="Kategoria" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={cats.map(c=>({value:c,label:c}))}/>
          <Inp label="Kwota (zł) *" value={form.amount} onChange={v=>setForm(f=>({...f,amount:v}))} type="number" placeholder="150"/>
          <Inp label="Opis" value={form.description} onChange={v=>setForm(f=>({...f,description:v}))} placeholder="np. wizyta u Jana Kowalskiego"/>
          <Inp label="Data" value={form.date} onChange={v=>setForm(f=>({...f,date:v}))} type="date"/>
          <Btn disabled={!form.amount} style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(!form.amount)return;setFinances(fs=>[{...form,id:Date.now(),type:"przychód",amount:+form.amount},...fs]);setForm(ef());setShowAdd(false);setToast("Wpis dodany");}}>Zapisz</Btn>
        </Modal>}

        {editE&&<Modal title="Edytuj wpis" onClose={()=>setEditE(null)}>
          <Sel label="Kategoria" value={editE.category||"Wizyta"} onChange={v=>setEditE(f=>({...f,category:v}))} options={cats.map(c=>({value:c,label:c}))}/>
          <Inp label="Kwota (zł)" value={editE.amount} onChange={v=>setEditE(f=>({...f,amount:v}))} type="number"/>
          <Inp label="Opis" value={editE.description||""} onChange={v=>setEditE(f=>({...f,description:v}))}/>
          <Inp label="Data" value={editE.date} onChange={v=>setEditE(f=>({...f,date:v}))} type="date"/>
          <Btn style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>{
            setFinances(fs=>fs.map(f=>f.id===editE.id?{...f,...editE,amount:+editE.amount}:f));
            if((editE.sourceId||"").startsWith("cycle-")){
              const {rentalId,cycleKey}=parseCycleSourceId(editE.sourceId);
              setRentals(rs=>rs.map(r=>+r.id!==rentalId?r:{...r,cycles:(r.cycles||[]).map(c=>(c.dueDate||c.month)===cycleKey?{...c,amount:+editE.amount,paidDate:editE.date}:c)}));
            }
            setEditE(null);setToast("Zmiany zapisane");
          }}>Zapisz zmiany</Btn>
          <Btn variant="danger" style={{width:"100%",justifyContent:"center"}} onClick={()=>{deleteWithSource(editE);setEditE(null);}}>🗑️ Usuń wpis</Btn>
        </Modal>}
        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      </>;
    }

    

    // ── RECEIPT SCANNER ───────────────────────────────────────────────────────
    function ReceiptScanner({onClose,onConfirm,expCats,incCats,memory,setMemory,selMonth,existingExpenses}) {
      const dk=useContext(DarkCtx);
      const bg2=dk?"#18202F":"#fff";
      const border=dk?"#2A3A56":"#D9E2F0";
      const sub="#7A8FA6";

      const [images,setImages]=useState([]); // base64 strings
      const [step,setStep]=useState("upload"); // upload | analyzing | review | done
      const [items,setItems]=useState([]); // {id, name, amount, cat, subcat, confidence, discount, isDiscount}
      const [receiptDate,setReceiptDate]=useState(todayLocal());
      const [receiptTotal,setReceiptTotal]=useState("");
      const [aiError,setAiError]=useState(null);
      const [dupWarning,setDupWarning]=useState(false);

      const allExpCatNames=expCats.flatMap(c=>[c.name,...(c.subs||[]).map(s=>c.name+"/"+s)]);

      const addImage=(e)=>{
        const files=Array.from(e.target.files);
        files.forEach(file=>{
          const reader=new FileReader();
          reader.onload=ev=>{
            const b64=ev.target.result.split(",")[1];
            setImages(prev=>[...prev,{b64,mime:file.type,preview:ev.target.result}]);
          };
          reader.readAsDataURL(file);
        });
      };

      const removeImage=(i)=>setImages(prev=>prev.filter((_,j)=>j!==i));

      const analyze=async()=>{
        if(!images.length)return;
        setStep("analyzing");
        setAiError(null);

        const memoryHints=Object.entries(memory||{}).slice(0,40).map(([k,v])=>`"${k}" => "${v}"`).join(", ");
        const catList=allExpCatNames.join(", ");

        const prompt=`Jesteś asystentem do analizy paragonów. Przeanalizuj paragon(y) na zdjęciach.

Dostępne kategorie kosztów: ${catList}
${memoryHints?`Zapamiętane przypisania produktów: ${memoryHints}`:""}

Zwróć TYLKO JSON (bez markdown) w formacie:
{
  "date": "YYYY-MM-DD lub null jeśli nieczytelna",
  "total": liczba (suma z paragonu, pole SUMA/RAZEM/DO ZAPŁATY),
  "items": [
    {
      "name": "nazwa z paragonu",
      "amount": liczba (kwota po rabacie),
      "cat": "kategoria z listy lub null",
      "subcat": "podkategoria lub null",
      "confidence": "high|medium|low",
      "isDiscount": false,
      "discountApplied": liczba lub 0
    }
  ],
  "unreadable": ["linia której nie mogłem odczytać"]
}

Zasady:
- Jeśli pozycja to rabat/promocja/zniżka: isDiscount=true, amount=wartość rabatu (ujemna liczba), odejmij od poprzedniej pozycji
- Nie wliczaj linii z VAT, numerem NIP, adresem sklepu, podsumowaniami
- Dla pozycji ilość×cena: amount = wynik mnożenia
- Jeśli nie możesz przypisać kategorii: cat=null
- Data: szukaj na paragonie w formatach DD.MM.YYYY, DD-MM-YYYY, YYYY-MM-DD — zwróć jako YYYY-MM-DD. Jeśli data nieczytelna lub jej nie ma — zwróć null (NIE zgaduj daty)`;

        try {
          const content=[
            {type:"text",text:prompt},
            ...images.map(img=>({type:"image",source:{type:"base64",media_type:img.mime,data:img.b64}}))
          ];

          const resp=await fetch("/api/scan-receipt",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({content})
          });

          const data=await resp.json();
          if(!resp.ok||data.error){
            setAiError("Błąd API: "+(data.error?.message||data.error||resp.status));
            setStep("upload");
            return;
          }
          const text=data.content?.[0]?.text||"";
          if(!text){
            setAiError("Pusta odpowiedź — spróbuj ponownie");
            setStep("upload");
            return;
          }
          // Extract JSON - find first { and last }
          const jsonStart=text.indexOf("{");
          const jsonEnd=text.lastIndexOf("}");
          if(jsonStart===-1||jsonEnd===-1){
            setAiError("AI nie zwrócił poprawnych danych. Spróbuj z wyraźniejszym zdjęciem.");
            setStep("upload");
            return;
          }
          const clean=text.slice(jsonStart,jsonEnd+1);
          let parsed;
          try {
            parsed=JSON.parse(clean);
          } catch(pe) {
            setAiError("Błąd parsowania. Spróbuj z lepszym zdjęciem.");
            setStep("upload");
            return;
          }

          // Build items list
          const newItems=(parsed.items||[]).filter(i=>!i.isDiscount).map((i,idx)=>({
            id:idx,
            name:i.name||"?",
            amount:Math.max(0,+i.amount||0),
            cat:i.cat||null,
            subcat:i.subcat||null,
            confidence:i.confidence||"low",
            discountApplied:i.discountApplied||0,
            unreadable:false
          }));

          // Add unreadable items
          (parsed.unreadable||[]).forEach((line,idx)=>{
            newItems.push({id:1000+idx,name:line,amount:0,cat:null,subcat:null,confidence:"low",unreadable:true});
          });

          setItems(newItems);
          if(parsed.date)setReceiptDate(parsed.date);
          else setReceiptDate(todayLocal());
          if(parsed.total)setReceiptTotal(String(parsed.total));

          // Check duplicate — sprawdź w miesiącu daty paragonu
          const day=parsed.date||receiptDate;
          const sameDayTotal=existingExpenses.filter(e=>e.date===day).reduce((s,e)=>s+(+e.amount||0),0);
          if(parsed.total&&sameDayTotal>0&&day.slice(0,7)===selMonth)setDupWarning(true);

          setStep("review");
        } catch(err) {
          setAiError("Błąd analizy: "+err.message);
          setStep("upload");
        }
      };

      const updateItem=(id,field,val)=>{
        setItems(prev=>prev.map(i=>i.id===id?{...i,[field]:val}:i));
      };
      const updateItemFields=(id,fields)=>{
        setItems(prev=>prev.map(i=>i.id===id?{...i,...fields}:i));
      };
      const removeItem=(id)=>setItems(prev=>prev.filter(i=>i.id!==id));
      const addItem=()=>setItems(prev=>[...prev,{id:Date.now(),name:"",amount:0,cat:null,subcat:null,confidence:"high",unreadable:false,discountApplied:0}]);

      const itemsSum=items.reduce((s,i)=>s+(+i.amount||0),0);
      const totalNum=+receiptTotal||0;
      const diff=totalNum>0?Math.abs(itemsSum-totalNum):0;
      const diffOk=diff<=0.05;

      const confirm=()=>{
        // Group by cat/subcat
        const groups={};
        items.forEach(i=>{
          if(!i.amount||!i.cat)return;
          const key=(i.cat+(i.subcat?"/"+i.subcat:""));
          groups[key]=(groups[key]||{cat:i.cat,subcat:i.subcat||"",total:0});
          groups[key].total+=(+i.amount||0);
        });

        // Save memory — only high/medium confidence corrections
        const newMem={...memory};
        items.forEach(i=>{
          if(i.cat&&i.name&&i.name!=="?")newMem[i.name.toUpperCase()]=i.cat+(i.subcat?"/"+i.subcat:"");
        });
        setMemory(newMem);

        const store=Object.values(groups)
          .filter(g=>g.total>0)
          .map(g=>({
            id:Date.now()+Math.random(),
            cat:g.cat,subcat:g.subcat,
            desc:"Paragon "+receiptDate,
            amount:Math.round(g.total*100)/100,
            date:receiptDate
          }));

        onConfirm(store,receiptDate);
      };

      const catOptions=(type)=>{
        const cats=type==="exp"?expCats:incCats;
        const opts=[{value:"",label:"— wybierz —"}];
        cats.forEach(c=>{
          opts.push({value:c.name,label:c.name});
          (c.subs||[]).forEach(s=>opts.push({value:c.name+"\x1F"+s,label:"  ↳ "+s}));
        });
        return opts;
      };

      const inputStyle={padding:"6px 10px",borderRadius:8,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit",width:"100%"};

      return <Modal title="📷 Skanuj paragon" onClose={onClose}>
        {step==="upload"&&<>
          <div style={{marginBottom:12}}>
            <div style={{fontSize:13,color:sub,marginBottom:10}}>Dodaj zdjęcie(a) paragonu. Możesz dodać kilka dla długich paragonów.</div>
            <label style={{display:"block",border:`2px dashed ${border}`,borderRadius:12,padding:"20px",textAlign:"center",cursor:"pointer",background:dk?"#111826":"#F4F7FC"}}>
              <div style={{fontSize:24,marginBottom:4}}>📷</div>
              <div style={{fontSize:13,fontWeight:600,color:"#3E6FB0"}}>Dodaj zdjęcie</div>
              <div style={{fontSize:11,color:sub,marginTop:2}}>lub kilka zdjęć naraz</div>
              <input type="file" accept="image/*" multiple onChange={addImage} style={{display:"none"}}/>
            </label>
          </div>
          {images.length>0&&<>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              {images.map((img,i)=><div key={i} style={{position:"relative",width:70,height:70}}>
                <img src={img.preview} style={{width:70,height:70,objectFit:"cover",borderRadius:8,border:`1px solid ${border}`}}/>
                <button onClick={()=>removeImage(i)} style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:10,background:"#E05C5C",color:"#fff",border:"none",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
              </div>)}
            </div>
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={analyze}>Analizuj paragon{images.length>1?"y":""}</Btn>
          </>}
          {aiError&&<div style={{color:"#E05C5C",fontSize:13,marginTop:8,padding:"10px 12px",background:"#FEE2E2",borderRadius:10}}>{aiError}</div>}
        </>}

        {step==="analyzing"&&<div style={{textAlign:"center",padding:"40px 20px"}}>
          <div style={{fontSize:32,marginBottom:12}}>🔍</div>
          <div style={{fontWeight:600,fontSize:15,marginBottom:6}}>Analizuję paragon...</div>
          <div style={{fontSize:13,color:sub}}>Rozpoznaję pozycje i przypisuję kategorie</div>
        </div>}

        {step==="review"&&<>
          {dupWarning&&<div style={{background:"#FEF3C7",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:"#92400E"}}>
            ⚠️ W tym dniu masz już wpisy kosztów. Możliwy duplikat — sprawdź.
          </div>}

          <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:sub,fontWeight:600,marginBottom:3}}>DATA PARAGONU</div>
              <input type="date" value={receiptDate} onChange={e=>setReceiptDate(e.target.value)} style={inputStyle}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:sub,fontWeight:600,marginBottom:3}}>KWOTA Z PARAGONU</div>
              <input type="number" value={receiptTotal} onChange={e=>setReceiptTotal(e.target.value)} placeholder="0.00" style={inputStyle}/>
            </div>
          </div>

          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:11,color:sub,fontWeight:600}}>POZYCJE ({items.length})</div>
              <button onClick={addItem} style={{background:"#3E6FB0",color:"#fff",border:"none",borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj</button>
            </div>
            {items.map(item=>(
              <div key={item.id} style={{background:item.unreadable?(dk?"#2A1A1A":"#FFF5F5"):(item.cat?( dk?"#111826":"#F7FAF9"):(dk?"#1A1A2A":"#F5F5FF")),borderRadius:10,padding:"10px 12px",marginBottom:6,border:`1px solid ${item.unreadable?"#E05C5C":item.cat?border:"#A78BFA"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
                  <div style={{flex:1}}>
                    <input value={item.name} onChange={e=>updateItem(item.id,"name",e.target.value)} style={{width:"100%",padding:"4px 8px",borderRadius:7,border:`1px solid ${border}`,background:"transparent",color:dk?"#E8F5F5":"#1C2B3A",fontSize:12,fontWeight:600,fontFamily:"inherit"}}/>
                    {item.discountApplied>0&&<div style={{fontSize:10,color:"#3DAA72"}}>rabat: -{item.discountApplied.toFixed(2)} zł</div>}
                    {item.unreadable&&<div style={{fontSize:10,color:"#E05C5C"}}>⚠️ Nieodczytana pozycja — wpisz kwotę ręcznie</div>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <input type="number" value={item.amount||""} onChange={e=>updateItem(item.id,"amount",+e.target.value)} placeholder="0.00"
                      style={{width:75,padding:"4px 8px",borderRadius:7,border:`1.5px solid ${border}`,background:dk?"#111826":"#fff",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit",textAlign:"right"}}/>
                    <button onClick={()=>removeItem(item.id)} style={{width:26,height:26,borderRadius:7,background:"#FEE2E2",border:"none",color:"#E05C5C",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
                  </div>
                </div>
                <select value={(item.cat&&item.subcat)?item.cat+"\x1F"+item.subcat:(item.cat||"")}
                  onChange={e=>{const val=e.target.value;if(!val){updateItemFields(item.id,{cat:null,subcat:null});}else if(val.includes("\x1F")){const idx=val.indexOf("\x1F");updateItemFields(item.id,{cat:val.slice(0,idx),subcat:val.slice(idx+1)});}else{updateItemFields(item.id,{cat:val,subcat:null});}}}
                  style={{...inputStyle,fontSize:12}}>
                  {catOptions("exp").map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {item.confidence==="low"&&item.cat&&<div style={{fontSize:10,color:"#F59E0B",marginTop:3}}>⚡ Niska pewność — sprawdź kategorię</div>}
              </div>
            ))}
          </div>

          <div style={{background:dk?"#18202F":"#F0F9F5",borderRadius:10,padding:"12px 14px",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:13,color:sub}}>Suma pozycji:</span>
              <span style={{fontWeight:700,fontSize:13,color:dk?"#E8F5F5":"#1C2B3A"}}>{itemsSum.toFixed(2)} zł</span>
            </div>
            {totalNum>0&&<div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:13,color:sub}}>Kwota z paragonu:</span>
              <span style={{fontWeight:700,fontSize:13,color:dk?"#E8F5F5":"#1C2B3A"}}>{totalNum.toFixed(2)} zł</span>
            </div>}
            {totalNum>0&&!diffOk&&<div style={{marginTop:6,padding:"6px 10px",background:"#FEF3C7",borderRadius:8,fontSize:12,color:"#92400E"}}>
              ⚠️ Różnica: {diff.toFixed(2)} zł — sprawdź pozycje lub skoryguj kwoty
            </div>}
            {totalNum>0&&diffOk&&<div style={{marginTop:6,fontSize:12,color:"#3DAA72",fontWeight:600}}>✓ Kwoty się zgadzają</div>}
          </div>

          {items.some(i=>!i.cat&&i.amount>0)&&<div style={{background:"#FEF3C7",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#92400E"}}>
            ⚠️ {items.filter(i=>!i.cat&&i.amount>0).length} pozycji bez kategorii — nie zostaną dodane do budżetu
          </div>}

          <div style={{display:"flex",gap:8}}>
            <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep("upload")}>← Wróć</Btn>
            <Btn style={{flex:1,justifyContent:"center"}} onClick={confirm}>Dodaj do budżetu ✓</Btn>
          </div>
        </>}
      </Modal>;
    }


