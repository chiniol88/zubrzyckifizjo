    // ── FAKTURY ───────────────────────────────────────────────────────────────
    const INVOICE_PCT_PRESETS=[100,75,50,25];

    function InvoiceRow({row,onChange,onDelete,onCopyNext,onMoveUp,onMoveDown,canMoveUp,canMoveDown}) {
      const [customPct,setCustomPct]=useState(false);
      const pct=row.percent===undefined||row.percent===null||row.percent===""?100:+row.percent;
      const counted=(+row.amount||0)*(pct/100);
      return <div style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid #D9E2F0"}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
          <div style={{display:"flex",flexDirection:"column",gap:1,flexShrink:0}}>
            <button onClick={onMoveUp} disabled={!canMoveUp} style={{width:20,height:16,padding:0,border:"none",background:"none",cursor:canMoveUp?"pointer":"default",color:canMoveUp?"#7A8FA6":"#D8E0E6",fontSize:10,lineHeight:1,fontFamily:"inherit"}}>▲</button>
            <button onClick={onMoveDown} disabled={!canMoveDown} style={{width:20,height:16,padding:0,border:"none",background:"none",cursor:canMoveDown?"pointer":"default",color:canMoveDown?"#7A8FA6":"#D8E0E6",fontSize:10,lineHeight:1,fontFamily:"inherit"}}>▼</button>
          </div>
          <input value={row.name} onChange={e=>onChange({...row,name:e.target.value})} placeholder="Nazwa faktury" style={{flex:1,padding:"10px 14px",border:"1.5px solid #D9E2F0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
          <input type="number" value={row.amount} onChange={e=>onChange({...row,amount:e.target.value})} placeholder="0" style={{width:90,padding:"10px 14px",border:"1.5px solid #D9E2F0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit",textAlign:"right"}}/>
          <span style={{fontSize:13,color:"#7A8FA6",flexShrink:0}}>zł</span>
          <button onClick={onDelete} style={{background:"none",border:"none",color:"#E05C5C",fontSize:20,cursor:"pointer",padding:"0 2px",flexShrink:0,lineHeight:1}}>×</button>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {!customPct
            ? <select value={pct} onChange={e=>{if(e.target.value==="custom"){setCustomPct(true);}else{onChange({...row,percent:+e.target.value});}}}
                style={{padding:"3px 6px",borderRadius:8,border:"1px solid #D9E2F0",background:"#fff",fontSize:11,fontWeight:600,color:pct!==100?"#F4A261":"#B8C4CC",fontFamily:"inherit",cursor:"pointer"}}>
                {INVOICE_PCT_PRESETS.map(p=><option key={p} value={p}>{p}% wliczane</option>)}
                {!INVOICE_PCT_PRESETS.includes(pct)&&<option value={pct}>{pct}% wliczane</option>}
                <option value="custom">inny %...</option>
              </select>
            : <div style={{display:"flex",alignItems:"center",gap:4}}>
                <input type="number" autoFocus value={row.percent??""} onChange={e=>onChange({...row,percent:e.target.value})} placeholder="np. 60" style={{width:52,padding:"3px 6px",borderRadius:8,border:"1px solid #D9E2F0",fontSize:11,fontFamily:"inherit",textAlign:"center"}}/>
                <span style={{fontSize:11,color:"#7A8FA6"}}>%</span>
                <button onClick={()=>setCustomPct(false)} style={{background:"none",border:"none",color:"#3DAA72",fontSize:15,cursor:"pointer",padding:"0 2px",lineHeight:1}}>✓</button>
              </div>
          }
          {pct!==100&&<span style={{fontSize:11,color:"#7A8FA6"}}>→ {counted.toFixed(2)} zł do kosztów</span>}
          <button onClick={onCopyNext} style={{marginLeft:"auto",background:"none",border:"none",padding:0,cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:600,color:"#3E6FB0",whiteSpace:"nowrap"}}>+ do następnego miesiąca</button>
        </div>
      </div>;
    }

    function Invoices({invoices,setInvoices}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const [selMonth,setSelMonth]=useState(()=>todayLocal().slice(0,7));
      const [toast,setToast]=useState(null);
      const [confirmDel,setConfirmDel]=useState(null);
      const borderC=dk?"#2A3A56":"#EFF3FA";
      const textC=dk?"#C8E8E8":"#1C2B3A";
      const subC="#7A8FA6";
      const bg=dk?"#18202F":"#fff";

      const rows=(invoices&&invoices[selMonth])||[];
      const pctOf=r=>r.percent===undefined||r.percent===null||r.percent===""?100:+r.percent;
      const total=rows.reduce((s,r)=>s+(+r.amount||0)*(pctOf(r)/100),0);
      const rawTotal=rows.reduce((s,r)=>s+(+r.amount||0),0);
      const hasPartial=rows.some(r=>pctOf(r)!==100);

      const monthKey=d=>d.toISOString().slice(0,7);
      const monthLabel=k=>new Date(k+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"});

      const updateRows=(month,newRows)=>setInvoices(inv=>({...(inv||{}),[month]:newRows}));
      const addRow=()=>updateRows(selMonth,[...rows,{id:Date.now()+Math.random(),name:"",amount:""}]);
      const changeRow=(id,patch)=>updateRows(selMonth,rows.map(r=>r.id===id?patch:r));
      const deleteRow=id=>updateRows(selMonth,rows.filter(r=>r.id!==id));
      const moveRow=(id,dir)=>{
        const idx=rows.findIndex(r=>r.id===id);
        const newIdx=idx+dir;
        if(idx<0||newIdx<0||newIdx>=rows.length)return;
        const newRows=[...rows];
        [newRows[idx],newRows[newIdx]]=[newRows[newIdx],newRows[idx]];
        updateRows(selMonth,newRows);
      };
      const copyToNextMonth=id=>{
        const row=rows.find(r=>r.id===id);
        if(!row)return;
        const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()+1);
        const nextMonth=monthKey(d);
        const copy={...row,id:Date.now()+Math.random()};
        setInvoices(inv=>{
          const nextRows=(inv&&inv[nextMonth])||[];
          return {...(inv||{}),[nextMonth]:[...nextRows,copy]};
        });
        setToast("Skopiowano do: "+monthLabel(nextMonth));
      };

      return <div style={{padding:"0 20px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
          <button onClick={()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()-1);setSelMonth(monthKey(d));}} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:`1.5px solid ${borderC}`,background:"none",cursor:"pointer",fontWeight:700,fontSize:18,color:subC,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <div style={{flex:1,textAlign:"center",fontWeight:700,fontSize:16,color:textC,fontFamily:"'Syne',sans-serif",textTransform:"capitalize"}}>
            {monthLabel(selMonth)}
          </div>
          <button onClick={()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()+1);setSelMonth(monthKey(d));}} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:`1.5px solid ${borderC}`,background:"none",cursor:"pointer",fontWeight:700,fontSize:18,color:subC,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </div>

        <div style={{background:bg,borderRadius:14,padding:"14px 16px",border:`1.5px solid ${borderC}`,marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:11,color:subC,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Suma miesiąca</div>
          <div style={{fontSize:26,fontWeight:800,color:"#3E6FB0",fontFamily:"'Syne',sans-serif"}}>{demo?"****":total.toFixed(2)+" zł"}</div>
          {hasPartial&&<div style={{fontSize:12,color:subC,marginTop:4}}>{demo?"****":"z faktur łącznie: "+rawTotal.toFixed(2)+" zł"}</div>}
        </div>

        <div style={{background:bg,borderRadius:14,padding:"14px",border:`1.5px solid ${borderC}`}}>
          <SectionLabel>Faktury</SectionLabel>
          {rows.length===0
            ?<Empty text="Brak faktur w tym miesiącu"/>
            :rows.map((r,i)=><InvoiceRow key={r.id} row={r} onChange={patch=>changeRow(r.id,patch)} onDelete={()=>setConfirmDel({id:r.id,name:r.name})} onCopyNext={()=>copyToNextMonth(r.id)} onMoveUp={()=>moveRow(r.id,-1)} onMoveDown={()=>moveRow(r.id,1)} canMoveUp={i>0} canMoveDown={i<rows.length-1}/>)
          }
          <button onClick={addRow} style={{marginTop:4,width:"100%",padding:"10px",borderRadius:10,border:`1.5px dashed ${borderC}`,background:"none",color:"#3E6FB0",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj fakturę</button>
        </div>
        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
        {confirmDel&&<Modal title="Usuń fakturę" onClose={()=>setConfirmDel(null)}>
          <div style={{fontSize:15,marginBottom:20}}>Na pewno usunąć fakturę{confirmDel.name?" „"+confirmDel.name+"”":""}?</div>
          <div style={{display:"flex",gap:10}}>
            <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(null)}>Anuluj</Btn>
            <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>{deleteRow(confirmDel.id);setConfirmDel(null);}}>Usuń</Btn>
          </div>
        </Modal>}
      </div>;
    }
