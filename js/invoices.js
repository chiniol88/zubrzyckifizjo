    // ── FAKTURY ───────────────────────────────────────────────────────────────
    function InvoiceRow({row,onChange,onDelete}) {
      return <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
        <input value={row.name} onChange={e=>onChange({...row,name:e.target.value})} placeholder="Nazwa faktury" style={{flex:1,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit"}}/>
        <input type="number" value={row.amount} onChange={e=>onChange({...row,amount:e.target.value})} placeholder="0" style={{width:90,padding:"10px 14px",border:"1.5px solid #E4EAF0",borderRadius:12,fontSize:14,outline:"none",background:"#FAFCFD",fontFamily:"inherit",textAlign:"right"}}/>
        <span style={{fontSize:13,color:"#7A8FA6",flexShrink:0}}>zł</span>
        <button onClick={onDelete} style={{background:"none",border:"none",color:"#E05C5C",fontSize:20,cursor:"pointer",padding:"0 2px",flexShrink:0,lineHeight:1}}>×</button>
      </div>;
    }

    function Invoices({invoices,setInvoices}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const [selMonth,setSelMonth]=useState(()=>todayLocal().slice(0,7));
      const borderC=dk?"#2A4040":"#F2F5F7";
      const textC=dk?"#C8E8E8":"#1C2B3A";
      const subC="#7A8FA6";
      const bg=dk?"#1A2A2A":"#fff";

      const rows=(invoices&&invoices[selMonth])||[];
      const total=rows.reduce((s,r)=>s+(+r.amount||0),0);

      const updateRows=newRows=>setInvoices(inv=>({...(inv||{}),[selMonth]:newRows}));
      const addRow=()=>updateRows([...rows,{id:Date.now()+Math.random(),name:"",amount:""}]);
      const changeRow=(id,patch)=>updateRows(rows.map(r=>r.id===id?patch:r));
      const deleteRow=id=>updateRows(rows.filter(r=>r.id!==id));

      return <div style={{padding:"0 20px 24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
          <button onClick={()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()-1);setSelMonth(d.toISOString().slice(0,7));}} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:`1.5px solid ${borderC}`,background:"none",cursor:"pointer",fontWeight:700,fontSize:18,color:subC,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <div style={{flex:1,textAlign:"center",fontWeight:700,fontSize:16,color:textC,fontFamily:"'Syne',sans-serif",textTransform:"capitalize"}}>
            {new Date(selMonth+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"})}
          </div>
          <button onClick={()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()+1);setSelMonth(d.toISOString().slice(0,7));}} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:`1.5px solid ${borderC}`,background:"none",cursor:"pointer",fontWeight:700,fontSize:18,color:subC,fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </div>

        <div style={{background:bg,borderRadius:14,padding:"14px 16px",border:`1.5px solid ${borderC}`,marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:11,color:subC,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Suma miesiąca</div>
          <div style={{fontSize:26,fontWeight:800,color:"#0A7C7C",fontFamily:"'Syne',sans-serif"}}>{demo?"****":total.toFixed(2)+" zł"}</div>
        </div>

        <div style={{background:bg,borderRadius:14,padding:"14px",border:`1.5px solid ${borderC}`}}>
          <SectionLabel>Faktury</SectionLabel>
          {rows.length===0
            ?<Empty text="Brak faktur w tym miesiącu"/>
            :rows.map(r=><InvoiceRow key={r.id} row={r} onChange={patch=>changeRow(r.id,patch)} onDelete={()=>deleteRow(r.id)}/>)
          }
          <button onClick={addRow} style={{marginTop:4,width:"100%",padding:"10px",borderRadius:10,border:`1.5px dashed ${borderC}`,background:"none",color:"#0A7C7C",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj fakturę</button>
        </div>
      </div>;
    }
