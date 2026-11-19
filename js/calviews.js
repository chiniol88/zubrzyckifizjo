    // ── KALENDARZ: widoki Tydzień i Agenda (2026-11-19) ──────────────────────────────────────────────────────────────
    // Dostają znormalizowane wpisy z MiniCalendar (funkcja itemsFor(data) → [{key,kind,title,sub,color,allDay,start,end,done,open}]),
    // start/end w minutach od północy (null = bez godziny). Same nic nie zapisują, tylko pokazują i wywołują open() po kliknięciu.
    const CAL_DOW=["Nd","Pn","Wt","Śr","Cz","Pt","Sb"];
    const calMondayOf=ds=>{const d=new Date(ds+"T12:00:00");return addDays(ds,-((d.getDay()+6)%7));};
    const calHm=m=>String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
    const calDayLong=ds=>new Date(ds+"T12:00:00").toLocaleDateString("pl-PL",{weekday:"long",day:"numeric",month:"long"});
    const CAL_MON=["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
    const calRangeLabel=days=>{
      const a=days[0],b=days[days.length-1];if(!a)return "";
      const da=+a.slice(8),db=+b.slice(8),ma=+a.slice(5,7)-1,mb=+b.slice(5,7)-1;
      if(a.slice(0,7)===b.slice(0,7))return da+"–"+db+" "+CAL_MON[ma]+" "+a.slice(0,4);
      return da+" "+CAL_MON[ma]+" – "+db+" "+CAL_MON[mb]+" "+b.slice(0,4);
    };
    // szeroki ekran (≥640 px): w Tygodniu 7 dni, na telefonie 3 dni
    function useCalWide(){
      const [w,setW]=React.useState(()=>window.innerWidth>=640);
      React.useEffect(()=>{const h=()=>setW(window.innerWidth>=640);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
      return w;
    }

    // ułożenie zachodzących na siebie bloków obok siebie (kolumny w obrębie dnia)
    function calLanes(list){
      const s=list.slice().sort((a,b)=>a.start-b.start||b.end-a.end);
      const res=[];let cluster=[],clusterEnd=-1;
      const flush=()=>{
        if(!cluster.length)return;
        const lanesEnd=[];
        cluster.forEach(it=>{
          let l=lanesEnd.findIndex(e=>e<=it.start);
          if(l<0){l=lanesEnd.length;lanesEnd.push(it.end);}else lanesEnd[l]=it.end;
          it._lane=l;
        });
        cluster.forEach(it=>{it._lanes=lanesEnd.length;res.push(it);});
        cluster=[];
      };
      s.forEach(it=>{
        if(cluster.length&&it.start>=clusterEnd)flush();
        cluster.push(it);clusterEnd=Math.max(clusterEnd,it.end);
      });
      flush();
      return res;
    }

    function CalWeekView({days,itemsFor,today,holidays,openDay,onPickDay}) {
      const dk=useContext(DarkCtx);
      const PX=44;   // wysokość jednej godziny
      const data=useMemo(()=>days.map(ds=>{
        const all=itemsFor(ds);
        const timed=all.filter(x=>!x.allDay&&x.start!=null).map(x=>({...x,end:Math.max(x.end!=null?x.end:x.start+30,x.start+20)}));
        return {ds,allDay:all.filter(x=>x.allDay||x.start==null),timed:calLanes(timed)};
      }),[days,itemsFor]);
      let minH=8,maxH=20;
      data.forEach(d=>d.timed.forEach(x=>{minH=Math.min(minH,Math.floor(x.start/60));maxH=Math.max(maxH,Math.ceil(Math.min(x.end,24*60)/60));}));
      minH=Math.max(0,minH);maxH=Math.min(24,Math.max(maxH,minH+4));
      const hours=Array.from({length:maxH-minH},(_,i)=>minH+i);
      const border=dk?"#2A3A56":"#E4EAF3",sub="#7A8FA6",txt=dk?"#E8F5F5":"#1C2B3A";
      const nowMin=(()=>{const n=new Date();return n.getHours()*60+n.getMinutes();})();
      const cols="34px repeat("+days.length+",minmax(0,1fr))";
      return <div style={{background:dk?"#18202F":"#fff",borderRadius:16,padding:"10px 8px 12px",boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
        <div style={{display:"grid",gridTemplateColumns:cols,gap:2,marginBottom:4}}>
          <div/>
          {data.map(({ds})=>{
            const isToday=ds===today,isOpen=ds===openDay,dow=new Date(ds+"T12:00:00").getDay(),we=dow===0||dow===6,hol=holidays&&holidays.has(ds);
            return <button key={ds} onClick={()=>onPickDay(ds)} title={hol?holidays.get(ds):""} style={{border:"none",borderRadius:10,padding:"4px 0",cursor:"pointer",fontFamily:"inherit",background:isOpen?"#3E6FB0":isToday?(dk?"#0A3030":"#E1E9F5"):"transparent",color:isOpen?"#fff":hol?"#B71C1C":we?(dk?"#F4A261":"#C0622A"):txt,display:"flex",flexDirection:"column",alignItems:"center",lineHeight:1.2}}>
              <span style={{fontSize:10,fontWeight:700,opacity:.85}}>{CAL_DOW[dow]}</span>
              <span style={{fontSize:15,fontWeight:isToday||isOpen?800:600,color:isOpen?"#fff":isToday?"#3E6FB0":undefined}}>{+ds.slice(8)}</span>
            </button>;
          })}
        </div>
        {data.some(d=>d.allDay.length>0)&&<div style={{display:"grid",gridTemplateColumns:cols,gap:2,marginBottom:4,paddingBottom:4,borderBottom:"1px solid "+border}}>
          <div style={{fontSize:8,color:sub,paddingTop:3,textAlign:"right",paddingRight:4}}>cały dzień</div>
          {data.map(({ds,allDay})=><div key={ds} style={{display:"flex",flexDirection:"column",gap:2,minWidth:0}}>
            {allDay.map(it=><div key={it.key} onClick={it.open} title={it.title} style={{fontSize:10,lineHeight:1.25,padding:"2px 4px",borderRadius:5,background:it.color+"26",borderLeft:"3px solid "+it.color,color:txt,cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.title}</div>)}
          </div>)}
        </div>}
        <div style={{display:"grid",gridTemplateColumns:cols,gap:2}}>
          <div style={{position:"relative",height:hours.length*PX}}>
            {hours.map((h,i)=><div key={h} style={{position:"absolute",top:i===0?1:i*PX-6,right:4,fontSize:9,color:sub}}>{String(h).padStart(2,"0")}</div>)}
          </div>
          {data.map(({ds,timed})=><div key={ds} style={{position:"relative",height:hours.length*PX,borderLeft:"1px solid "+border,minWidth:0,background:ds===today?(dk?"rgba(62,111,176,.10)":"rgba(62,111,176,.05)"):"transparent"}}>
            {hours.map((h,i)=><div key={h} style={{position:"absolute",left:0,right:0,top:i*PX,borderTop:"1px solid "+border,opacity:.7}}/>)}
            {ds===today&&nowMin>=minH*60&&nowMin<=maxH*60&&<div style={{position:"absolute",left:0,right:0,top:(nowMin-minH*60)/60*PX,height:2,background:"#E05C5C",zIndex:2,borderRadius:1}}/>}
            {timed.map(it=>{
              const top=(it.start-minH*60)/60*PX,h=Math.max(20,(it.end-it.start)/60*PX-1);
              return <div key={it.key} onClick={it.open} title={calHm(it.start)+"–"+calHm(it.end)+" · "+it.title+(it.sub?" · "+it.sub:"")} style={{position:"absolute",top,height:h,left:(it._lane/it._lanes*100)+"%",width:"calc("+(100/it._lanes)+"% - 2px)",boxSizing:"border-box",background:it.color+"2E",borderLeft:"3px solid "+it.color,borderRadius:5,padding:"1px 3px",overflow:"hidden",cursor:"pointer",zIndex:1,opacity:it.done?.7:1}}>
                <div style={{fontSize:9,color:sub,lineHeight:1.2}}>{calHm(it.start)}</div>
                <div style={{fontSize:10.5,fontWeight:600,color:txt,lineHeight:1.2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:Math.max(1,Math.floor((h-12)/13)),WebkitBoxOrient:"vertical",wordBreak:"break-word"}}>{it.title}</div>
              </div>;
            })}
          </div>)}
        </div>
      </div>;
    }

    function CalAgenda({days,itemsFor,today,holidays}) {
      const dk=useContext(DarkCtx);
      const border=dk?"#2A3A56":"#EFF3FA",sub="#7A8FA6",txt=dk?"#E8F5F5":"#1C2B3A";
      const groups=useMemo(()=>days.map(ds=>({ds,items:itemsFor(ds).sort((a,b)=>{
        const aa=a.allDay||a.start==null,bb=b.allDay||b.start==null;
        if(aa!==bb)return aa?-1:1;
        return (a.start||0)-(b.start||0);
      })})).filter(g=>g.items.length>0||(holidays&&holidays.has(g.ds))),[days,itemsFor,holidays]);
      const tag=ds=>ds===today?"dziś":ds===addDays(today,1)?"jutro":ds===addDays(today,-1)?"wczoraj":"";
      return <div style={{background:dk?"#18202F":"#fff",borderRadius:16,padding:"6px 16px 10px",boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)"}}>
        {groups.length===0&&<div style={{fontSize:13,color:sub,textAlign:"center",padding:"18px 0"}}>Brak zdarzeń w tym okresie</div>}
        {groups.map(({ds,items})=>{
          const hol=holidays&&holidays.get(ds);
          return <div key={ds} style={{padding:"10px 0 4px",borderBottom:"1px solid "+border}}>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:4}}>
              <span style={{fontWeight:800,fontSize:14,color:ds===today?"#3E6FB0":txt,textTransform:"capitalize"}}>{calDayLong(ds)}</span>
              {tag(ds)&&<span style={{fontSize:11,fontWeight:700,color:ds===today?"#3E6FB0":sub}}>{tag(ds)}</span>}
              {hol&&<span style={{fontSize:11,fontWeight:700,color:"#B71C1C"}}>🔴 {hol}</span>}
            </div>
            {items.map(it=><div key={it.key} onClick={it.open} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"6px 0",cursor:"pointer",opacity:it.done?.75:1}}>
              <div style={{width:74,flexShrink:0,fontSize:12,fontWeight:700,color:sub,paddingTop:1}}>{(it.allDay||it.start==null)?"cały dzień":calHm(it.start)+(it.end!=null?"–"+calHm(it.end):"")}</div>
              <div style={{width:4,alignSelf:"stretch",borderRadius:2,background:it.color,flexShrink:0}}/>
              <div style={{minWidth:0,flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:txt,overflowWrap:"anywhere"}}>{it.title}</div>
                {it.sub&&<div style={{fontSize:12,color:sub,overflowWrap:"anywhere"}}>{it.sub}</div>}
              </div>
            </div>)}
          </div>;
        })}
      </div>;
    }
