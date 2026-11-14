    // ── NOWE STATYSTYKI (2026-11-14) ─────────────────────────────────────────────
    // Dokładki do zakładki Statystyki (nic ze starych sekcji nie zmieniają): zysk i koszt klienta z reklamy w ciągu roku, źródła klientów
    // miesiąc po miesiącu, wyniki CPM (stawka za dzień, puste dni, wynik) oraz "Rok w liczbach" (rok do roku, mapa obłożenia).
    // Komponenty dostają obiekt `c` z RentalStats (kolory, funkcje pomocnicze, dane). Wszystko liczone z danych, które aplikacja już ma.
    const ST_YMS=year=>Array.from({length:12},(_,i)=>year+"-"+String(i+1).padStart(2,"0"));
    const ST_LAST=ym=>new Date(+ym.slice(0,4),+ym.slice(5,7),0).getDate();

    // Słupki: wartości mogą być ujemne (zysk) lub null (brak danych). fmt = podpis nad słupkiem (opcjonalnie).
    function StatBars({vals,h,color,negColor,fmt,labels,sub,track,sel,onSel}) {
      const max=Math.max(0,...vals.map(v=>v!=null&&v>0?v:0));
      const min=Math.max(0,...vals.map(v=>v!=null&&v<0?-v:0));
      const tot=(max+min)||1,hp=Math.max(6,Math.round(h*max/tot)),hn=min>0?Math.max(6,h-hp):0;
      return <div style={{display:"flex",gap:3}}>
        {vals.map((v,i)=>{
          const up=v!=null&&v>0?Math.max(2,Math.round(v/(max||1)*hp)):0;
          const dn=v!=null&&v<0?Math.max(2,Math.round(-v/(min||1)*hn)):0;
          const dim=sel!=null&&sel!==i;
          return <button key={i} type="button" onClick={onSel?()=>onSel(sel===i?null:i):undefined} aria-label={labels[i]+(v!=null?": "+v:"")} aria-pressed={sel===i} style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",alignItems:"center",border:"none",background:sel===i?(track||"transparent"):"transparent",borderRadius:6,padding:0,cursor:onSel?"pointer":"default",fontFamily:"inherit",opacity:dim?.45:1}}>
            <div style={{height:hp+(fmt?11:0),width:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              {fmt&&<div style={{fontSize:8,color:sub,textAlign:"center",height:11,whiteSpace:"nowrap",overflow:"hidden"}}>{v!=null&&v!==0?fmt(v):""}</div>}
              <div style={{height:up,background:color,borderRadius:"3px 3px 0 0"}}/>
            </div>
            {hn>0&&<div style={{height:hn,width:"100%"}}><div style={{height:dn,background:negColor||color,borderRadius:"0 0 3px 3px"}}/></div>}
            <div style={{fontSize:8,color:sub,marginTop:2}}>{labels[i]}</div>
          </button>;
        })}
      </div>;
    }
    // podpis wybranego słupka (po dotknięciu) — wspólny wygląd dla wykresów w Reklamie
    function StatPick({text,subC,textC,trackC}) {
      return <div style={{minHeight:30,marginTop:6,padding:"6px 10px",borderRadius:10,background:trackC,fontSize:12,color:text?textC:subC,lineHeight:1.4}}>{text||"Dotknij słupka, żeby zobaczyć szczegóły."}</div>;
    }

    // ── REKLAMA: rok w miesiącach (zysk narastająco, koszt klienta, źródła klientów) ──
    function AdsYear({c}) {
      const {year,today,rentals,finances,nfzCases,budget,stock,getRid,catOf,demo,Z,subC,textC,borderC,trackC,GREEN,RED,BLUE,PURPLE,ORANGE}=c;
      const [selCum,setSelCum]=useState(null),[selSrc,setSelSrc]=useState(null),[selCac,setSelCac]=useState({});
      const d=useMemo(()=>{
        const yms=ST_YMS(year),idx={};yms.forEach((ym,i)=>{idx[ym]=i;});
        const types={szyny:{spend:Array(12).fill(0),cnt:Array(12).fill(0)},wozki:{spend:Array(12).fill(0),cnt:Array(12).fill(0)},balkoniki:{spend:Array(12).fill(0),cnt:Array(12).fill(0)}};
        const tk=eq=>{const x=catOf(eq);return types[x]?x:"szyny";};
        const rev=Array(12).fill(0);
        const srcKeys=[...RENTAL_SOURCES.map(s=>s.value),"_none"];
        const src={};srcKeys.forEach(k=>{src[k]=Array(12).fill(0);});
        yms.forEach((ym,i)=>{const o=marketingSpendByType(budget,stock,ym);MKTG_TYPES.forEach(t=>{types[t.k].spend[i]=o[t.k];});});
        const sk=s=>src.hasOwnProperty(s||"")&&s?s:"_none";
        rentals.forEach(r=>{
          if(r.reserved||!r.startDate)return;
          const i=idx[r.startDate.slice(0,7)];if(i===undefined)return;
          src[sk(r.source)][i]++;
          if(r.source==="reklama")types[tk(r.equipment)].cnt[i]++;
        });
        (nfzCases||[]).forEach(cas=>{
          const i=idx[(cas.orderDate||"").slice(0,7)];if(i===undefined)return;
          src[sk(cas.source)][i]++;
          if(cas.source==="reklama")types.wozki.cnt[i]++;
        });
        const adRental=rid=>{const r=rentals.find(x=>x.id===rid);return r&&r.source==="reklama";};
        (finances||[]).forEach(f=>{
          if(f.type!=="przychód")return;
          const i=idx[(f.date||"").slice(0,7)];if(i===undefined)return;
          const rid=getRid(f.sourceId),sid=f.sourceId||"";
          if(rid){if(adRental(rid))rev[i]+=(+f.amount||0);return;}
          if(sid.startsWith("wozek-")){const cid=+sid.slice(6);const cas=(nfzCases||[]).find(x=>x.id===cid);if(cas&&cas.source==="reklama")rev[i]+=(+f.amount||0);}
        });
        rentals.forEach(r=>{
          if((r.payments||[]).length>0||(r.cycles||[]).length>0||r.source!=="reklama")return;
          const paid=+r.amountPaid||0,i=idx[(r.startDate||"").slice(0,7)];
          if(paid>0&&i!==undefined)rev[i]+=paid;
        });
        const spendTot=yms.map((_,i)=>MKTG_TYPES.reduce((s,t)=>s+types[t.k].spend[i],0));
        const curYM=today.slice(0,7);
        const lastIdx=year<+curYM.slice(0,4)?11:year>+curYM.slice(0,4)?-1:+curYM.slice(5,7)-1;
        let run=0;const cum=yms.map((_,i)=>{if(i>lastIdx)return null;run+=rev[i]-spendTot[i];return Math.round(run);});
        return {types,rev,src,srcKeys,spendTot,cum,lastIdx,sumSpend:spendTot.reduce((a,b)=>a+b,0),sumRev:rev.reduce((a,b)=>a+b,0)};
      },[year,rentals,finances,nfzCases,budget,stock,today]);
      const labels=PL_MON.map(m=>m);
      const any=d.sumSpend>0||d.sumRev>0;
      const srcTot=d.srcKeys.map(k=>d.src[k].reduce((a,b)=>a+b,0)),srcAll=srcTot.reduce((a,b)=>a+b,0);
      const srcMeta=k=>{const s=RENTAL_SOURCES.find(x=>x.value===k);return s?{l:s.label,c:s.color}:{l:"Nieznane",c:"#8A9BB0"};};
      const head={fontSize:11,fontWeight:700,color:subC,textTransform:"uppercase",letterSpacing:".07em",margin:"18px 0 8px"};
      const profit=d.sumRev-d.sumSpend;
      return <div>
        <div style={{borderTop:"1px solid "+borderC,margin:"16px 0 0"}}/>
        <div style={head}>📅 Reklama w roku {year}</div>
        {!any&&<div style={{fontSize:12,color:subC}}>Brak wydatków i przychodu z reklamy w tym roku.</div>}
        {any&&<>
          <div style={{display:"flex",gap:8,marginBottom:4}}>
            {[["Wydano",Z(d.sumSpend),RED],["Przychód",Z(d.sumRev),GREEN],["Zysk",(profit>=0?"+":"−")+Z(Math.abs(profit)),profit>=0?GREEN:RED]].map(([l,v,col])=><div key={l} style={{flex:"1 1 0",minWidth:0,background:trackC,borderRadius:12,padding:"8px 8px"}}>
              <div style={{fontSize:10,color:subC,marginBottom:2}}>{l}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:12,color:col,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{v}</div>
            </div>)}
          </div>
          <div style={head}>Zysk z reklamy narastająco (przychód − koszt)</div>
          <StatBars vals={d.cum} h={64} color={GREEN} negColor={RED} labels={labels} sub={subC} track={trackC} sel={selCum} onSel={setSelCum}/>
          <StatPick subC={subC} textC={textC} trackC={trackC} text={selCum!=null&&d.cum[selCum]!=null?PL_MON[selCum]+" "+year+": narastająco "+(d.cum[selCum]>=0?"+":"−")+Z(Math.abs(d.cum[selCum]))+" · w tym miesiącu przychód "+Z(d.rev[selCum])+", koszt "+Z(d.spendTot[selCum]):null}/>
          <div style={{fontSize:10,color:subC,marginTop:4,lineHeight:1.5}}>Każdy słupek to stan od początku roku do końca danego miesiąca. Zielony = reklama już się zwróciła, czerwony = jeszcze nie. Przychód liczony wg daty wpłaty od klientów oznaczonych „reklama”.</div>
          {MKTG_TYPES.map(t=>{
            const sp=d.types[t.k].spend,cn=d.types[t.k].cnt,sS=sp.reduce((a,b)=>a+b,0),sC=cn.reduce((a,b)=>a+b,0);
            if(!(sS>0||sC>0))return null;
            const cac=sp.map((s,i)=>(cn[i]>0&&s>0)?Math.round(s/cn[i]):null);
            return <div key={t.k}>
              <div style={head}>Koszt klienta w miesiącach — {t.l}</div>
              {cac.every(v=>v===null)
                ?<div style={{fontSize:12,color:subC}}>Brak miesiąca, w którym był i wydatek na reklamę, i nowy klient z reklamy (wydatek i klient wypadły w różnych miesiącach).</div>
                :<><StatBars vals={cac} h={48} color={t.k==="wozki"?PURPLE:t.k==="balkoniki"?ORANGE:BLUE} labels={labels} sub={subC} track={trackC} sel={selCac[t.k]==null?null:selCac[t.k]} onSel={i=>setSelCac(m=>({...m,[t.k]:i}))} fmt={demo?null:(v=>v>=1000?(v/1000).toFixed(1).replace(".0","")+"k":String(v))}/>
                  <StatPick subC={subC} textC={textC} trackC={trackC} text={selCac[t.k]!=null?PL_MON[selCac[t.k]]+" "+year+": wydano "+Z(sp[selCac[t.k]])+", nowych klientów z reklamy "+cn[selCac[t.k]]+(cac[selCac[t.k]]!=null?", koszt klienta "+Z(cac[selCac[t.k]]):""):null}/></>}
              <div style={{fontSize:10,color:subC,marginTop:4}}>W roku: wydano {Z(sS)}, nowych klientów z reklamy {sC}{sC>0&&sS>0?", średnio "+Z(Math.round(sS/sC))+" na klienta":""}. Pusty słupek = brak wydatku albo brak klienta w tym miesiącu.</div>
            </div>;
          })}
          <div style={head}>Skąd trafiają nowi klienci — udział w miesiącach</div>
          {srcAll===0?<div style={{fontSize:12,color:subC}}>Brak nowych klientów w tym roku.</div>:<>
            <div style={{display:"flex",gap:3,height:64}}>
              {labels.map((_,i)=>{
                const tot=d.srcKeys.reduce((s,k)=>s+d.src[k][i],0);
                return <button key={i} type="button" onClick={()=>setSelSrc(selSrc===i?null:i)} aria-pressed={selSrc===i} aria-label={labels[i]+": "+tot+" klientów"} style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",border:"none",background:"transparent",padding:0,cursor:"pointer",fontFamily:"inherit",opacity:selSrc!=null&&selSrc!==i?.45:1}}>
                  <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%",borderRadius:3,overflow:"hidden",background:tot?"transparent":trackC,opacity:tot?1:.5}}>
                    {d.srcKeys.map(k=>d.src[k][i]>0&&<div key={k} style={{height:(d.src[k][i]/tot*100)+"%",background:srcMeta(k).c}}/>)}
                  </div>
                </button>;
              })}
            </div>
            <div style={{display:"flex",gap:3,marginTop:2}}>{labels.map((l,i)=><div key={i} style={{flex:1,fontSize:8,color:subC,textAlign:"center"}}>{l}</div>)}</div>
            <StatPick subC={subC} textC={textC} trackC={trackC} text={selSrc!=null?(()=>{const tot=d.srcKeys.reduce((s,k)=>s+d.src[k][selSrc],0);return tot?PL_MON[selSrc]+" "+year+": "+tot+" nowych klientów — "+d.srcKeys.filter(k=>d.src[k][selSrc]>0).map(k=>srcMeta(k).l+" "+d.src[k][selSrc]+" ("+Math.round(d.src[k][selSrc]/tot*100)+"%)").join(", "):PL_MON[selSrc]+" "+year+": brak nowych klientów";})():null}/>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:8,fontSize:11,color:subC}}>
              {d.srcKeys.map((k,i)=>srcTot[i]>0&&<span key={k}><i style={{display:"inline-block",width:8,height:8,borderRadius:2,background:srcMeta(k).c,marginRight:5}}/>{srcMeta(k).l} · {srcTot[i]} ({Math.round(srcTot[i]/srcAll*100)}%)</span>)}
            </div>
            <div style={{fontSize:10,color:subC,marginTop:4,lineHeight:1.5}}>Liczone nowi klienci (start wypożyczenia lub zamówienie wózka). Jeśli udział reklamy rośnie, a „organicznie” maleje, reklama może tylko zabierać klientów, którzy i tak by przyszli.</div>
          </>}
        </>}
      </div>;
    }

    // ── WYNIKI CPM: wynik, stawka za dzień, puste dni ──
    function CpmResults({c}) {
      const {rentals,stock,machines,finances,today,pStart,pEnd,periodLabel,equipmentAll,catOf,revenueInRange,getMachineSrvForEq,getCosts,marketingSzyny,Z,kv,subC,textC,borderC,GREEN,RED,ORANGE,BLUE}=c;
      const d=useMemo(()=>{
        const eqs=equipmentAll.filter(eq=>catOf(eq)==="szyny");
        const cutEnd=pEnd<today?pEnd:today;
        // stawka za dzień wypożyczenia = należność / dni (jednorazowe), cykl / 30 dni (cykliczne); wypożyczenia rozpoczęte w okresie
        const acc={};const A=eq=>acc[eq]||(acc[eq]={oneT:0,oneD:0,cycT:0,cycD:0});
        rentals.forEach(r=>{
          if(!r.equipment||catOf(r.equipment)!=="szyny"||r.reserved||!r.startDate||r.startDate<pStart||r.startDate>pEnd)return;
          if(r.renewable){
            const cy=(r.cycles||[]).filter(x=>!x.cancelled&&+x.amount>0);
            const n=cy.length||1,tot=cy.length?cy.reduce((s,x)=>s+(+x.amount||0),0):(+r.amount||0);
            if(tot>0){const a=A(r.equipment);a.cycT+=tot;a.cycD+=n*30;}
          } else {
            const end=r.endDate||r.plannedReturn;if(!end)return;
            const days=Math.max(1,dateDiff(r.startDate,end));
            const tot=(+r.amount||0)+(r.extensions||[]).reduce((s,e)=>s+(+e.amountDue||+e.amount||0),0);
            if(tot>0){const a=A(r.equipment);a.oneT+=tot;a.oneD+=days;}
          }
        });
        const rate=(T,D)=>D>0?T/D:null;
        const all={oneT:0,oneD:0,cycT:0,cycD:0};Object.values(acc).forEach(a=>{all.oneT+=a.oneT;all.oneD+=a.oneD;all.cycT+=a.cycT;all.cycD+=a.cycD;});
        const overall=rate(all.oneT+all.cycT,all.oneD+all.cycD);
        // obłożenie, puste dni, wynik
        let revSum=0,srvSum=0,amortSum=0,emptySum=0,lostSum=0,capSum=0,bookedSum=0;
        const rows=eqs.map(eq=>{
          const o=occupancyForEq(eq,rentals,stock,pStart,pEnd,today);
          const a=acc[eq]||{oneT:0,oneD:0,cycT:0,cycD:0};
          const r=rate(a.oneT+a.cycT,a.oneD+a.cycD);
          const useRate=r!=null?r:overall;
          const empty=o.noData?0:Math.max(0,o.cap-o.booked);
          const lost=useRate!=null?Math.round(empty*useRate):null;
          const rev=revenueInRange(pStart,cutEnd,eq);
          const srv=[...getMachineSrvForEq(eq),...((getCosts(eq).repairs)||[]).map(x=>({date:x.date,amount:+x.amount||0}))].filter(x=>x.date&&x.date>=pStart&&x.date<=cutEnd).reduce((s,x)=>s+(+x.amount||0),0);
          let amort=0;const pt=whPurchaseTotal(stock,machines,eq);
          if(pt>0&&!o.noData){const from=(o.start&&o.start>pStart)?o.start:pStart;if(from<=cutEnd)amort=pt/36*((dateDiff(from,cutEnd)+1)/30.4);}
          revSum+=rev;srvSum+=srv;amortSum+=amort;emptySum+=empty;if(lost!=null)lostSum+=lost;capSum+=o.cap;bookedSum+=o.booked;
          return {eq,noData:o.noData,cap:o.cap,booked:o.booked,empty,rate:r,rateOne:rate(a.oneT,a.oneD),rateCyc:rate(a.cycT,a.cycD),lost,rev};
        }).filter(x=>!x.noData||x.rev>0);
        return {rows,overall,all,revSum,srvSum,amortSum,emptySum,lostSum,capSum,bookedSum};
      },[rentals,stock,machines,finances,today,pStart,pEnd,equipmentAll]);
      const head={fontSize:11,fontWeight:700,color:subC,textTransform:"uppercase",letterSpacing:".07em",margin:"16px 0 6px"};
      const note={fontSize:10,color:subC,marginTop:6,lineHeight:1.5};
      const wynik=d.revSum-marketingSzyny-d.srvSum;
      const wynikPo=wynik-d.amortSum;
      const fmtD=x=>x.slice(8)+"."+x.slice(5,7);
      const rowSt={display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8,flexWrap:"wrap",padding:"7px 0",borderBottom:"1px solid "+borderC,fontSize:12};
      const col=p=>p>=70?GREEN:p>=40?ORANGE:RED;
      return <div>
        <div style={{...head,marginTop:0}}>Wynik szyn CPM — {periodLabel}</div>
        {kv("Przychód z szyn (wpłaty)",Z(d.revSum),GREEN)}
        {kv("− Reklama szyn",marketingSzyny>0?Z(marketingSzyny):"0 zł",RED)}
        {kv("− Serwis i naprawy",d.srvSum>0?Z(d.srvSum):"0 zł",RED)}
        {kv("= Wynik",(wynik>=0?"+":"−")+Z(Math.abs(wynik)),wynik>=0?GREEN:RED)}
        {kv("Po odjęciu części zakupu*",(wynikPo>=0?"+":"−")+Z(Math.abs(wynikPo)),wynikPo>=0?GREEN:RED)}
        <div style={note}>* Koszt zakupu szyn rozłożony równo na 36 miesięcy (od daty dodania sprzętu). Przychód to wpłaty z okresu, reklama wg podkategorii „Marketing szyny” w budżecie, serwis z kart sztuk i napraw typu.</div>

        <div style={head}>Stawka za dzień wypożyczenia</div>
        {d.overall==null?<div style={{fontSize:12,color:subC}}>Brak wypożyczeń szyn rozpoczętych w tym okresie.</div>:<>
          {kv("Średnio",Z(Math.round(d.overall))+"/dzień")}
          {d.all.oneD>0&&kv("Jednorazowe",Z(Math.round(d.all.oneT/d.all.oneD))+"/dzień ("+d.all.oneD+" dni)")}
          {d.all.cycD>0&&kv("Cykliczne",Z(Math.round(d.all.cycT/d.all.cycD))+"/dzień ("+d.all.cycD+" dni)")}
          {d.rows.filter(x=>x.rate!=null).map(x=><div key={x.eq} style={rowSt}><span style={{color:textC}}>{x.eq}</span><b style={{color:textC}}>{Z(Math.round(x.rate))}/dzień</b></div>)}
        </>}
        <div style={note}>Cena umówiona ÷ liczba dni wypożyczenia (z przedłużeniami); cykl = 30 dni. To realna stawka, niezależna od tego, kiedy klient zapłacił.</div>

        <div style={head}>Puste dni szyn (potencjalny przychód)</div>
        {d.capSum===0?<div style={{fontSize:12,color:subC}}>Brak danych o obłożeniu w tym okresie.</div>:<>
          {kv("Dni dostępności / zajęte",d.capSum+" / "+d.bookedSum+" ("+(d.capSum?Math.round(d.bookedSum/d.capSum*100):0)+"%)")}
          {kv("Puste dni (sztuko-dni)",String(d.emptySum),ORANGE)}
          {kv("Szacunkowo utracone",d.lostSum>0?"~ "+Z(d.lostSum):"—",ORANGE)}
          {d.rows.filter(x=>x.empty>0).map(x=><div key={x.eq} style={rowSt}><span style={{color:textC}}>{x.eq}</span><span style={{color:subC}}>{x.empty} dni{x.lost!=null?" · ~ "+Z(x.lost):""}</span></div>)}
        </>}
        <div style={note}>Puste dni × stawka za dzień. To górna granica: nie każdy pusty dzień dałoby się wypełnić (zależy od popytu i dojazdów).</div>
      </div>;
    }
    // ── ROK W LICZBACH: rok do roku (YTD), tempo roczne, najlepszy/najsłabszy miesiąc, mapa obłożenia ──
    function YearInNumbers({c}) {
      const {year,today,rentals,stock,equipmentAll,catOf,revenueInRangeCat,finances,Z,kv,subC,textC,trackC,GREEN,RED,ORANGE,dk}=c;
      const [cat,setCat]=useState("all");   // filtr: wszystko / szyny / wózki / balkoniki
      const d=useMemo(()=>{
        const yms=ST_YMS(year),py=year-1;
        const thisYear=+today.slice(0,4);
        const curYM=today.slice(0,7);
        const monthRev=ys=>ys.map(ym=>ym>curYM?null:revenueInRangeCat(ym+"-01",ym+"-"+String(ST_LAST(ym)).padStart(2,"0"),cat));
        const cur=monthRev(yms),prev=monthRev(ST_YMS(py));
        // do dziś (bieżący rok) albo cały rok (rok zamknięty)
        const toCur=year===thisYear?today:year+"-12-31";
        const toPrev=year===thisYear?(py+"-"+(today.slice(5)==="02-29"?"02-28":today.slice(5))):py+"-12-31";
        const ytd=revenueInRangeCat(year+"-01-01",toCur,cat),ytdPrev=revenueInRangeCat(py+"-01-01",toPrev,cat);
        const dayOfYear=dateDiff(year+"-01-01",toCur)+1;
        const pace=year===thisYear&&dayOfYear>=30?Math.round(ytd/dayOfYear*(year%4===0?366:365)):null;
        // pełne miesiące: do poprzedniego (bieżący rok) albo wszystkie 12
        const firstIdx=cur.findIndex(v=>v!=null&&v>0);   // miesiące sprzed pierwszego przychodu nie liczą się do "najsłabszego"
        const full=yms.map((ym,i)=>({ym,i,v:cur[i]})).filter(x=>x.v!=null&&firstIdx>=0&&x.i>=firstIdx&&(year!==thisYear||x.ym<curYM));
        const best=full.length?full.reduce((a,b)=>b.v>a.v?b:a):null;
        const worst=full.length>1?full.reduce((a,b)=>b.v<a.v?b:a):null;
        // mapa obłożenia: szyna × miesiąc
        const eqs=(cat==="all"||cat==="szyny")?equipmentAll.filter(eq=>catOf(eq)==="szyny"):[];
        const heat=eqs.map(eq=>{
          let B=0,C=0;
          const cells=yms.map(ym=>{
            if(ym>curYM)return null;
            const o=occupancyForEq(eq,rentals,stock,ym+"-01",ym+"-"+String(ST_LAST(ym)).padStart(2,"0"),today);
            if(o.noData||!o.cap)return null;
            B+=o.booked;C+=o.cap;return o.pct;
          });
          return {eq,cells,avg:C?Math.round(B/C*100):null};
        }).filter(x=>x.cells.some(v=>v!=null));
        return {ytd,ytdPrev,pace,best,worst,heat,toCur,toPrev,cur};
      },[year,today,cat,rentals,stock,equipmentAll,finances]);
      const head={fontSize:11,fontWeight:700,color:subC,textTransform:"uppercase",letterSpacing:".07em",margin:"16px 0 6px"};
      const note={fontSize:10,color:subC,marginTop:6,lineHeight:1.5};
      const diff=d.ytd-d.ytdPrev,diffPct=d.ytdPrev>0?Math.round(diff/d.ytdPrev*100):null;
      const fmtD=x=>x.slice(8)+"."+x.slice(5,7)+"."+x.slice(0,4);
      const monthName=ym=>PL_MON[+ym.slice(5,7)-1]+" "+ym.slice(0,4);
      const cellCol=p=>p>=70?GREEN:p>=40?ORANGE:RED;
      return <div>
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          {[{k:"all",l:"Wszystko"},{k:"szyny",l:"Szyny"},{k:"wozki",l:"Wózki"},{k:"balkoniki",l:"Balkoniki"}].map(t=>
            <button key={t.k} onClick={()=>setCat(t.k)} aria-pressed={cat===t.k} style={{padding:"5px 12px",borderRadius:14,border:"none",cursor:"pointer",fontWeight:600,fontSize:11,background:cat===t.k?"#3E6FB0":dk?"#1E2F4A":"#D9E2F0",color:cat===t.k?"#fff":subC,fontFamily:"inherit"}}>{t.l}</button>
          )}
        </div>
        <div style={{...head,marginTop:0}}>Rok {year} do dziś vs rok {year-1}</div>
        {kv(year+" (do "+fmtD(d.toCur)+")",Z(d.ytd),GREEN)}
        {kv((year-1)+" (do "+fmtD(d.toPrev)+")",Z(d.ytdPrev))}
        {kv("Różnica",(diff>=0?"+":"−")+Z(Math.abs(diff))+(diffPct!==null?" ("+(diff>=0?"+":"")+diffPct+"%)":""),diff>=0?GREEN:RED)}
        {d.pace!=null&&kv("Tempo roczne (przy obecnym)",Z(d.pace))}
        {d.best&&kv("Najlepszy pełny miesiąc",monthName(d.best.ym)+" · "+Z(d.best.v),GREEN)}
        {d.worst&&kv("Najsłabszy pełny miesiąc",monthName(d.worst.ym)+" · "+Z(d.worst.v),RED)}
        <div style={note}>Przychód {cat==="all"?"ze sprzętu":cat==="szyny"?"z szyn":cat==="wozki"?"z wózków":"z balkoników"} (wpłaty z wypożyczeń, transportu{cat==="all"||cat==="wozki"?" i wózków NFZ":""}). Bieżący miesiąc nie jest brany do najlepszego/najsłabszego, bo jeszcze trwa.</div>

        <div style={head}>Mapa obłożenia szyn w roku {year}</div>
        {(cat==="wozki"||cat==="balkoniki")?<div style={{fontSize:12,color:subC}}>Mapa obłożenia jest liczona tylko dla szyn CPM. Wybierz „Wszystko” albo „Szyny”.</div>:d.heat.length===0?<div style={{fontSize:12,color:subC}}>Brak danych o obłożeniu w tym roku.</div>:<>
          {d.heat.map(h=><div key={h.eq} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{color:textC,fontWeight:600}}>{h.eq}</span><span style={{color:subC}}>{h.avg!=null?"średnio "+h.avg+"%":""}</span></div>
            <div style={{display:"flex",gap:2}}>
              {h.cells.map((p,i)=><div key={i} title={PL_MON[i]+(p!=null?": "+p+"%":"")} style={{flex:1,minWidth:0,height:24,borderRadius:4,background:p==null?trackC:cellCol(p),opacity:p==null?.6:.45+p/200,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:p==null?subC:"#fff"}}>{p==null?"":p}</div>)}
            </div>
            <div style={{display:"flex",gap:2}}>{PL_MON.map((m,i)=><div key={i} style={{flex:1,fontSize:8,color:subC,textAlign:"center"}}>{m}</div>)}</div>
          </div>)}
          <div style={note}>Procent dni, w których szyna była wypożyczona, w każdym miesiącu. Zielony ≥ 70%, pomarańczowy 40–69%, czerwony poniżej. Pokazuje, kiedy w roku jest popyt, a kiedy luka.</div>
        </>}
      </div>;
    }
