    // ── WEALTH (Majątek netto) ───────────────────────────────────────────────
    const WEALTH_CURRENCIES = ["PLN","USD","EUR","GBP","CHF"];

    function emptyWealth() {
      return {
        categories: {
          assets: [
            {id:"cash",name:"Gotówka i konta"},
            {id:"stocks",name:"Inwestycje - akcje/ETF"},
            {id:"crypto",name:"Inwestycje - krypto"},
            {id:"realestate",name:"Nieruchomości"},
            {id:"cars",name:"Samochody"},
            {id:"equipment",name:"Sprzęt"},
            {id:"other",name:"Inne"},
          ],
          liabilities: [
            {id:"mortgage",name:"Kredyt hipoteczny"},
            {id:"loan",name:"Kredyt gotówkowy/konsumpcyjny"},
            {id:"creditcard",name:"Karta kredytowa"},
            {id:"otherliab",name:"Inne zobowiązania"},
          ],
        },
        snapshots: [],
      };
    }

    const emptyWealthAsset = (categoryId) => ({
      id:Date.now()+Math.random(),
      categoryId:categoryId||"cash",
      name:"",
      amount:"",
      currency:"PLN",
      note:"",
      // pod przyszły automat cen akcji/krypto — nieużywane w UI teraz, ale zapisane od razu żeby nie trzeba było migrować danych
      ticker:"",
      quantity:"",
      unitPrice:"",
      priceSource:"manual",
    });
    const emptyWealthLiability = (categoryId) => ({
      id:Date.now()+Math.random(),
      categoryId:categoryId||"mortgage",
      name:"",
      amount:"",
      note:"",
    });

    const wealthAssetPln = (a,rates) => {
      const amt=+a.amount||0;
      if(!a.currency||a.currency==="PLN")return amt;
      const rate=+((rates&&rates[a.currency])||0);
      return amt*rate;
    };
    const wealthSnapshotTotals = (snap) => {
      const assetsTotal=(snap.assets||[]).reduce((s,a)=>s+wealthAssetPln(a,snap.exchangeRates),0);
      const liabTotal=(snap.liabilities||[]).reduce((s,l)=>s+(+l.amount||0),0);
      return {assetsTotal,liabTotal,net:assetsTotal-liabTotal};
    };
    const wealthDistinctCurrencies = (draft) => {
      const set=new Set();
      (draft.assets||[]).forEach(a=>{if(a.currency&&a.currency!=="PLN")set.add(a.currency);});
      return [...set];
    };
    const newSnapshotFromPrev = (prev) => {
      const today=todayLocal();
      if(!prev)return {id:Date.now(),date:today,note:"",exchangeRates:{},assets:[],liabilities:[]};
      return {
        id:Date.now(),
        date:today,
        note:"",
        exchangeRates:{...(prev.exchangeRates||{})},
        assets:(prev.assets||[]).map(a=>({...a,id:Date.now()+Math.random()})),
        liabilities:(prev.liabilities||[]).map(l=>({...l,id:Date.now()+Math.random()})),
      };
    };

    function WealthCategoriesModal({wealth,setWealth,onClose}) {
      const dk=useContext(DarkCtx);
      const border=dk?"#2A3A56":"#D9E2F0";
      const sub="#7A8FA6";
      const textC=dk?"#E8F5F5":"#1C2B3A";
      const [editCat,setEditCat]=useState(null); // {kind,id,value}
      const nameRefs=useRef({});

      const countUsage=(kind,id)=>(wealth.snapshots||[]).reduce((n,s)=>n+(s[kind]||[]).filter(e=>e.categoryId===id).length,0);

      const addCat=(kind,name)=>{
        if(!name.trim())return;
        setWealth(w=>({...w,categories:{...w.categories,[kind]:[...(w.categories[kind]||[]),{id:"c"+Date.now(),name:name.trim()}]}}));
      };
      const renameCat=(kind,id,name)=>{
        if(!name.trim())return;
        setWealth(w=>({...w,categories:{...w.categories,[kind]:w.categories[kind].map(c=>c.id===id?{...c,name:name.trim()}:c)}}));
        setEditCat(null);
      };
      const delCat=(kind,id)=>{
        const n=countUsage(kind,id);
        if(n>0&&!window.confirm(`Ta kategoria jest użyta w ${n} pozycjach w historii snapshotów. Usunąć mimo to? (te pozycje zostaną, ale bez przypisanej kategorii)`))return;
        setWealth(w=>({...w,categories:{...w.categories,[kind]:w.categories[kind].filter(c=>c.id!==id)}}));
      };
      const moveCat=(kind,id,dir)=>{
        setWealth(w=>{
          const arr=[...(w.categories[kind]||[])];
          const idx=arr.findIndex(c=>c.id===id);
          const newIdx=idx+dir;
          if(idx<0||newIdx<0||newIdx>=arr.length)return w;
          [arr[idx],arr[newIdx]]=[arr[newIdx],arr[idx]];
          return {...w,categories:{...w.categories,[kind]:arr}};
        });
      };

      const Section=({kind,label,color})=>(
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,color,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{label}</div>
          {(wealth.categories[kind]||[]).map((c,i,arr)=>(
            <div key={c.id} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 10px",border:`1px solid ${border}`,borderRadius:10,marginBottom:6,background:dk?"#111826":"#F7F9FB"}}>
              {editCat&&editCat.kind===kind&&editCat.id===c.id
                ?<>
                  <input autoFocus value={editCat.value} onChange={e=>setEditCat(ec=>({...ec,value:e.target.value}))}
                    onKeyDown={e=>e.key==="Enter"&&renameCat(kind,c.id,editCat.value)}
                    style={{flex:1,padding:"5px 8px",borderRadius:7,border:`1.5px solid ${color}`,background:dk?"#111826":"#fff",color:textC,fontSize:14,fontFamily:"inherit"}}/>
                  <button onClick={()=>renameCat(kind,c.id,editCat.value)} style={{background:color,color:"#fff",border:"none",borderRadius:7,padding:"5px 10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓</button>
                  <button onClick={()=>setEditCat(null)} style={{background:"none",border:"none",color:sub,cursor:"pointer",fontSize:16}}>×</button>
                </>
                :<>
                  <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
                    <button onClick={()=>moveCat(kind,c.id,-1)} disabled={i===0} style={{background:"none",border:"none",color:i===0?(dk?"#1E3030":"#DCE3E9"):sub,cursor:i===0?"default":"pointer",fontSize:10,lineHeight:1,padding:"2px 3px"}}>▲</button>
                    <button onClick={()=>moveCat(kind,c.id,1)} disabled={i===arr.length-1} style={{background:"none",border:"none",color:i===arr.length-1?(dk?"#1E3030":"#DCE3E9"):sub,cursor:i===arr.length-1?"default":"pointer",fontSize:10,lineHeight:1,padding:"2px 3px"}}>▼</button>
                  </div>
                  <span style={{flex:1,fontSize:14,fontWeight:600,color:textC}}>{c.name}</span>
                  <button onClick={()=>setEditCat({kind,id:c.id,value:c.name})} style={{background:"none",border:"none",color:sub,cursor:"pointer",padding:"0 4px",fontSize:13}}>✏️</button>
                  <button onClick={()=>delCat(kind,c.id)} style={{background:"none",border:"none",color:"#E05C5C",cursor:"pointer",fontSize:16,lineHeight:1}}>×</button>
                </>
              }
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <input ref={el=>nameRefs.current[kind]=el} defaultValue=""
              onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){addCat(kind,e.target.value);e.target.value="";}}}
              placeholder="Nowa kategoria..." style={{flex:1,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:textC,fontSize:14,fontFamily:"inherit"}}/>
            <button onClick={()=>{const el=nameRefs.current[kind];if(el&&el.value.trim()){addCat(kind,el.value);el.value="";}}} style={{background:color,color:"#fff",border:"none",borderRadius:10,padding:"9px 14px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+</button>
          </div>
        </div>
      );

      return <Modal title="Zarządzaj kategoriami" onClose={onClose}>
        <Section kind="assets" label="Aktywa" color="#3DAA72"/>
        <Section kind="liabilities" label="Zobowiązania" color="#E05C5C"/>
      </Modal>;
    }

    function WealthSnapshotForm({wealth,setWealth,initial,onClose}) {
      const dk=useContext(DarkCtx);
      const border=dk?"#2A3A56":"#D9E2F0";
      const sub="#7A8FA6";
      const textC=dk?"#E8F5F5":"#1C2B3A";
      const [draft,setDraft]=useState(initial);
      const [confirmDel,setConfirmDel]=useState(false);
      const isEdit=(wealth.snapshots||[]).some(s=>s.id===initial.id);

      const assetCats=wealth.categories.assets||[];
      const liabCats=wealth.categories.liabilities||[];
      const currencies=wealthDistinctCurrencies(draft);
      const totals=wealthSnapshotTotals(draft);

      const updAsset=(id,patch)=>setDraft(d=>({...d,assets:d.assets.map(a=>a.id===id?{...a,...patch}:a)}));
      const rmAsset=(id)=>setDraft(d=>({...d,assets:d.assets.filter(a=>a.id!==id)}));
      const addAsset=()=>setDraft(d=>({...d,assets:[...d.assets,emptyWealthAsset(assetCats[0]?.id)]}));

      const updLiab=(id,patch)=>setDraft(d=>({...d,liabilities:d.liabilities.map(l=>l.id===id?{...l,...patch}:l)}));
      const rmLiab=(id)=>setDraft(d=>({...d,liabilities:d.liabilities.filter(l=>l.id!==id)}));
      const addLiab=()=>setDraft(d=>({...d,liabilities:[...d.liabilities,emptyWealthLiability(liabCats[0]?.id)]}));

      const setRate=(cur,val)=>setDraft(d=>({...d,exchangeRates:{...(d.exchangeRates||{}),[cur]:val}}));

      const sortedAssets=useMemo(()=>[...draft.assets].sort((a,b)=>(+b.amount||0)-(+a.amount||0)),[draft.assets]);
      const sortedLiabilities=useMemo(()=>[...draft.liabilities].sort((a,b)=>(+b.amount||0)-(+a.amount||0)),[draft.liabilities]);

      const save=()=>{
        if(!draft.date)return;
        const clean={
          ...draft,
          assets:draft.assets.filter(a=>a.name.trim()||+a.amount>0).map(a=>({...a,amount:+a.amount||0})),
          liabilities:draft.liabilities.filter(l=>l.name.trim()||+l.amount>0).map(l=>({...l,amount:+l.amount||0})),
        };
        setWealth(w=>{
          const exists=(w.snapshots||[]).some(s=>s.id===clean.id);
          const snaps=exists?w.snapshots.map(s=>s.id===clean.id?clean:s):[...(w.snapshots||[]),clean];
          return {...w,snapshots:snaps};
        });
        onClose();
      };
      const del=()=>{
        setWealth(w=>({...w,snapshots:(w.snapshots||[]).filter(s=>s.id!==draft.id)}));
        onClose();
      };

      const rowStyle={display:"flex",gap:6,marginBottom:8,alignItems:"center",flexWrap:"wrap"};
      const selStyle={padding:"9px 10px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:textC,fontSize:13,fontFamily:"inherit"};
      const inpStyle={padding:"9px 10px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#111826":"#FAFCFD",color:textC,fontSize:13,fontFamily:"inherit"};

      return <Modal title={isEdit?"Edytuj snapshot":"Nowy snapshot"} onClose={onClose}>
        <Inp label="Data" value={draft.date} onChange={v=>setDraft(d=>({...d,date:v}))} type="date"/>
        <Txa label="Notatka (opcjonalnie)" value={draft.note} onChange={v=>setDraft(d=>({...d,note:v}))} rows={2} placeholder="np. po sprzedaży auta"/>

        <div style={{fontSize:12,fontWeight:700,color:"#3DAA72",textTransform:"uppercase",letterSpacing:.5,margin:"16px 0 8px"}}>Aktywa</div>
        {sortedAssets.map(a=>(
          <div key={a.id} style={{border:`1px solid ${border}`,borderRadius:10,padding:8,marginBottom:8}}>
            <div style={rowStyle}>
              <select value={a.categoryId} onChange={e=>updAsset(a.id,{categoryId:e.target.value})} style={{...selStyle,flex:"1 1 140px"}}>
                {assetCats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button onClick={()=>rmAsset(a.id)} style={{background:"none",border:"none",color:"#E05C5C",fontSize:18,cursor:"pointer",padding:"0 4px"}}>×</button>
            </div>
            <div style={rowStyle}>
              <input value={a.name} onChange={e=>updAsset(a.id,{name:e.target.value})} placeholder="Nazwa / opis" style={{...inpStyle,flex:"2 1 140px"}}/>
              <input type="number" value={a.amount} onChange={e=>updAsset(a.id,{amount:e.target.value})} placeholder="Kwota" style={{...inpStyle,flex:"1 1 90px"}}/>
              <select value={a.currency} onChange={e=>updAsset(a.id,{currency:e.target.value})} style={{...selStyle,flex:"0 0 76px"}}>
                {WEALTH_CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        ))}
        <button onClick={addAsset} style={{width:"100%",padding:"9px",borderRadius:10,border:`1.5px dashed ${border}`,background:"transparent",color:"#3DAA72",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:12}}>+ Dodaj pozycję aktywów</button>

        {currencies.length>0&&<div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:700,color:sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Kursy walut na dzień snapshotu</div>
          {currencies.map(cur=>(
            <div key={cur} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:13,color:textC,fontWeight:600,width:110,flexShrink:0}}>Kurs {cur} → PLN</span>
              <input type="number" step="0.0001" value={(draft.exchangeRates&&draft.exchangeRates[cur])||""} onChange={e=>setRate(cur,e.target.value)} placeholder="np. 4.02" style={{...inpStyle,flex:1}}/>
            </div>
          ))}
        </div>}

        <div style={{fontSize:12,fontWeight:700,color:"#E05C5C",textTransform:"uppercase",letterSpacing:.5,margin:"16px 0 8px"}}>Zobowiązania</div>
        {sortedLiabilities.map(l=>(
          <div key={l.id} style={{border:`1px solid ${border}`,borderRadius:10,padding:8,marginBottom:8}}>
            <div style={rowStyle}>
              <select value={l.categoryId} onChange={e=>updLiab(l.id,{categoryId:e.target.value})} style={{...selStyle,flex:"1 1 140px"}}>
                {liabCats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button onClick={()=>rmLiab(l.id)} style={{background:"none",border:"none",color:"#E05C5C",fontSize:18,cursor:"pointer",padding:"0 4px"}}>×</button>
            </div>
            <div style={rowStyle}>
              <input value={l.name} onChange={e=>updLiab(l.id,{name:e.target.value})} placeholder="Nazwa / opis" style={{...inpStyle,flex:"2 1 140px"}}/>
              <input type="number" value={l.amount} onChange={e=>updLiab(l.id,{amount:e.target.value})} placeholder="Kwota pozostała" style={{...inpStyle,flex:"1 1 120px"}}/>
            </div>
          </div>
        ))}
        <button onClick={addLiab} style={{width:"100%",padding:"9px",borderRadius:10,border:`1.5px dashed ${border}`,background:"transparent",color:"#E05C5C",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:16}}>+ Dodaj zobowiązanie</button>

        <div style={{background:dk?"#0F1E1E":"#F8FAFB",borderRadius:12,padding:"12px 14px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:sub,marginBottom:4}}><span>Suma aktywów</span><span style={{color:"#3DAA72",fontWeight:700}}>{totals.assetsTotal.toFixed(2)} zł</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:sub,marginBottom:8}}><span>Suma zobowiązań</span><span style={{color:"#E05C5C",fontWeight:700}}>{totals.liabTotal.toFixed(2)} zł</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:800,paddingTop:8,borderTop:`1px solid ${border}`}}><span style={{color:textC,fontFamily:"'Syne',sans-serif"}}>Majątek netto</span><span style={{color:totals.net>=0?"#3E6FB0":"#E05C5C",fontFamily:"'Syne',sans-serif"}}>{totals.net.toFixed(2)} zł</span></div>
        </div>

        {!confirmDel
          ? <>
              <Btn style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={save}>Zapisz snapshot</Btn>
              {isEdit&&<Btn variant="danger" style={{width:"100%",justifyContent:"center"}} onClick={()=>setConfirmDel(true)}>🗑️ Usuń snapshot</Btn>}
            </>
          : <>
              <div style={{background:"#FEE2E2",borderRadius:12,padding:14,marginBottom:12,fontSize:14,color:"#E05C5C",textAlign:"center",fontWeight:600}}>Na pewno usunąć ten snapshot? Tej operacji nie można cofnąć.</div>
              <div style={{display:"flex",gap:10}}>
                <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(false)}>Anuluj</Btn>
                <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={del}>Tak, usuń</Btn>
              </div>
            </>
        }
      </Modal>;
    }

    function Wealth({wealth,setWealth}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const border=dk?"#2A3A56":"#EFF3FA";
      const textC=dk?"#C8E8E8":"#1C2B3A";
      const sub="#7A8FA6";
      const bg=dk?"#18202F":"#fff";
      const [view,setView]=useState("dashboard"); // dashboard | history
      const [showForm,setShowForm]=useState(null);
      const [showCats,setShowCats]=useState(false);

      const snapshots=useMemo(()=>[...(wealth.snapshots||[])].sort((a,b)=>(a.date||"").localeCompare(b.date||"")),[wealth.snapshots]);
      const latest=snapshots[snapshots.length-1]||null;
      const latestTotals=latest?wealthSnapshotTotals(latest):null;
      const prevSnap=snapshots.length>1?snapshots[snapshots.length-2]:null;
      const prevTotals=prevSnap?wealthSnapshotTotals(prevSnap):null;

      const catName=(kind,id)=>{const c=(wealth.categories[kind]||[]).find(x=>x.id===id);return c?c.name:"—";};

      const allocation=useMemo(()=>{
        if(!latest)return[];
        const map={};
        (latest.assets||[]).forEach(a=>{map[a.categoryId]=(map[a.categoryId]||0)+wealthAssetPln(a,latest.exchangeRates);});
        const total=Object.values(map).reduce((s,v)=>s+v,0);
        return Object.entries(map).map(([catId,v])=>({catId,name:catName("assets",catId),v,pct:total>0?Math.round(v/total*100):0})).sort((a,b)=>b.v-a.v);
      },[latest,wealth.categories]);

      const maxTrend=Math.max(...snapshots.map(s=>wealthSnapshotTotals(s).net),1);
      const palette=["#3E6FB0","#3DAA72","#2E86AB","#F4A261","#7C6AF4","#E05C5C","#7A8FA6"];

      if(snapshots.length===0){
        return <div style={{padding:"0 20px 24px"}}>
          <Card style={{textAlign:"center",padding:32}}>
            <div style={{fontSize:32,marginBottom:10}}>💼</div>
            <div style={{fontWeight:700,fontSize:15,color:textC,marginBottom:6}}>Brak snapshotów majątku</div>
            <div style={{fontSize:13,color:sub,marginBottom:18}}>Dodaj pierwszy snapshot, żeby zacząć śledzić majątek netto w czasie.</div>
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>setShowForm(newSnapshotFromPrev(null))}>+ Dodaj pierwszy snapshot</Btn>
          </Card>
          {showForm&&<WealthSnapshotForm wealth={wealth} setWealth={setWealth} initial={showForm} onClose={()=>setShowForm(null)}/>}
        </div>;
      }

      return <div style={{padding:"0 20px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          {[
            {l:"Majątek netto",v:demo?"****":latestTotals.net.toFixed(2)+" zł",c:latestTotals.net>=0?"#3E6FB0":"#E05C5C"},
            {l:"Aktywa",v:demo?"****":latestTotals.assetsTotal.toFixed(2)+" zł",c:"#3DAA72"},
            {l:"Zobowiązania",v:demo?"****":latestTotals.liabTotal.toFixed(2)+" zł",c:"#E05C5C"},
            {l:"Ostatni snapshot",v:latest.date,c:"#2E86AB"},
          ].map((k,i)=>
            <div key={i} style={{background:bg,borderRadius:14,padding:"12px 14px",border:`1.5px solid ${border}`}}>
              <div style={{fontSize:11,color:sub,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{k.l}</div>
              <div style={{fontSize:18,fontWeight:800,color:k.c,fontFamily:"'Syne',sans-serif"}}>{k.v}</div>
            </div>
          )}
        </div>

        {prevTotals&&(()=>{
          const diff=latestTotals.net-prevTotals.net;
          return <div style={{background:diff>=0?(dk?"#0A2A1A":"#E8F7ED"):(dk?"#2A0A0A":"#FEE8E8"),borderRadius:12,padding:"10px 14px",marginBottom:14,textAlign:"center"}}>
            <span style={{fontSize:13,fontWeight:700,color:diff>=0?"#3DAA72":"#E05C5C"}}>{diff>=0?"▲ +":"▼ "}{demo?"****":diff.toFixed(2)+" zł"}</span>
            <span style={{fontSize:12,color:sub}}> vs poprzedni snapshot ({prevSnap.date})</span>
          </div>;
        })()}

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          {[
            {icon:"➕",label:"Nowy snapshot",onClick:()=>setShowForm(newSnapshotFromPrev(latest))},
            {icon:"📜",label:view==="history"?"Pulpit":"Historia",onClick:()=>setView(v=>v==="history"?"dashboard":"history")},
            {icon:"⚙️",label:"Kategorie",onClick:()=>setShowCats(true)},
          ].map(b=>(
            <button key={b.label} onClick={b.onClick} style={{
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              gap:3,padding:"10px 4px",borderRadius:12,cursor:"pointer",fontFamily:"inherit",
              background:dk?"#18202F":"#fff",border:`1.5px solid ${border}`,boxShadow:"0 1px 3px rgba(0,0,0,.06)"
            }}>
              <span style={{fontSize:18,lineHeight:1}}>{b.icon}</span>
              <span style={{fontSize:10,fontWeight:600,color:dk?"#7A93B8":"#3E5578",whiteSpace:"nowrap"}}>{b.label}</span>
            </button>
          ))}
        </div>

        {view==="dashboard"&&<>
          <div style={{background:bg,borderRadius:14,padding:"14px",marginBottom:12,border:`1.5px solid ${border}`}}>
            <div style={{fontSize:11,fontWeight:700,color:sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Trend majątku netto</div>
            <div style={{overflowX:"auto",paddingBottom:2}}>
              <div style={{display:"flex",alignItems:"flex-end",gap:6,height:100,minWidth:snapshots.length*40}}>
                {snapshots.map(s=>{
                  const net=wealthSnapshotTotals(s).net;
                  const pct=maxTrend>0?Math.round((Math.max(0,net)/maxTrend)*100):0;
                  const barH=Math.max(3,Math.round(pct*0.8));
                  const isLatest=s.id===latest.id;
                  return <div key={s.id} onClick={()=>setShowForm(s)} style={{minWidth:36,flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer"}}>
                    <div style={{fontSize:9,color:isLatest?"#3E6FB0":sub,fontWeight:isLatest?700:600,minHeight:12,textAlign:"center"}}>{demo?"?":(Math.abs(net)>=1000?(net/1000).toFixed(1)+"k":net.toFixed(0))}</div>
                    <div style={{width:"100%",height:barH+"px",borderRadius:4,background:net<0?"#E05C5C":isLatest?"#3E6FB0":dk?"#2A5A5A":"#B8D8D8",transition:"height .3s"}}/>
                    <div style={{fontSize:8,color:isLatest?"#3E6FB0":sub,fontWeight:isLatest?700:400}}>{s.date.slice(5)}</div>
                  </div>;
                })}
              </div>
            </div>
          </div>

          {allocation.length>0&&<div style={{background:bg,borderRadius:14,padding:"14px",border:`1.5px solid ${border}`}}>
            <div style={{fontSize:11,fontWeight:700,color:sub,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Alokacja aktywów</div>
            {allocation.map((a,i)=>{
              const color=palette[i%palette.length];
              return <div key={a.catId} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",fontSize:12,marginBottom:3}}>
                  <span style={{color:textC,fontWeight:600}}>{a.name}</span>
                  <span><span style={{color,fontWeight:800,fontSize:13}}>{demo?"****":a.v.toFixed(0)+" zł"}</span><span style={{color:sub}}> · {a.pct}%</span></span>
                </div>
                <div style={{height:6,borderRadius:3,background:dk?"#1E2F4A":"#D9E2F0",overflow:"hidden"}}>
                  <div style={{height:"100%",width:a.pct+"%",background:color,borderRadius:3,transition:"width .5s"}}/>
                </div>
              </div>;
            })}
          </div>}
        </>}

        {view==="history"&&<div>
          {[...snapshots].reverse().map(s=>{
            const t=wealthSnapshotTotals(s);
            const idx=snapshots.findIndex(x=>x.id===s.id)-1;
            const prev=idx>=0?snapshots[idx]:null;
            const pdiff=prev?t.net-wealthSnapshotTotals(prev).net:null;
            return <Card key={s.id} onClick={()=>setShowForm(s)} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:14,color:textC}}>{s.date}</div>
                  {s.note&&<div style={{fontSize:12,color:sub,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.note}</div>}
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
                  <div style={{fontWeight:800,fontSize:15,color:t.net>=0?"#3E6FB0":"#E05C5C",fontFamily:"'Syne',sans-serif"}}>{demo?"****":t.net.toFixed(2)+" zł"}</div>
                  {pdiff!==null&&<div style={{fontSize:11,color:pdiff>=0?"#3DAA72":"#E05C5C",marginTop:2}}>{pdiff>=0?"▲":"▼"} {demo?"**":Math.abs(pdiff).toFixed(0)+" zł"}</div>}
                </div>
              </div>
            </Card>;
          })}
        </div>}

        {showForm&&<WealthSnapshotForm wealth={wealth} setWealth={setWealth} initial={showForm} onClose={()=>setShowForm(null)}/>}
        {showCats&&<WealthCategoriesModal wealth={wealth} setWealth={setWealth} onClose={()=>setShowCats(false)}/>}
      </div>;
    }
