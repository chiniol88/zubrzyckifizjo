    // ── BUDGET ────────────────────────────────────────────────────────────────
    function CatMgrSection({type,cats,color,border,sub,dk,editCat,setEditCat,moveCat,renameCat,delCat,addSub,moveSub,renameSub,delSub,addCat}) {
      const nameRef=useRef(null);
      const subRefs=useRef({});
      return (
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,color,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>{type==="income"?"Przychody":"Koszty"}</div>
          {cats.map((cat,ci)=>(
            <div key={ci} style={{marginBottom:8,border:`1px solid ${border}`,borderRadius:10,overflow:"hidden"}}>
              <div style={{display:"flex",alignItems:"center",gap:4,padding:"8px 10px",background:dk?"#0F1F1F":"#F7F9FB"}}>
                <div style={{display:"flex",flexDirection:"column",gap:0}}>
                  <button onClick={()=>moveCat(type,ci,-1)} disabled={ci===0} style={{background:"none",border:"none",cursor:ci===0?"default":"pointer",color:ci===0?border:sub,fontSize:11,lineHeight:1,padding:"1px 3px"}}>▲</button>
                  <button onClick={()=>moveCat(type,ci,1)} disabled={ci===cats.length-1} style={{background:"none",border:"none",cursor:ci===cats.length-1?"default":"pointer",color:ci===cats.length-1?border:sub,fontSize:11,lineHeight:1,padding:"1px 3px"}}>▼</button>
                </div>
                {editCat&&editCat.type===type&&editCat.catIdx===ci&&editCat.field==="name"
                  ?<><input autoFocus value={editCat.value} onChange={e=>setEditCat(ec=>({...ec,value:e.target.value}))}
                      style={{flex:1,padding:"5px 8px",borderRadius:7,border:`1.5px solid ${color}`,background:dk?"#0F1F1F":"#fff",color:dk?"#E8F5F5":"#1C2B3A",fontSize:14,fontFamily:"inherit"}}/>
                    <button onClick={()=>renameCat(type,ci,editCat.value)} style={{background:color,color:"#fff",border:"none",borderRadius:7,padding:"5px 10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓</button>
                    <button onClick={()=>setEditCat(null)} style={{background:"none",border:"none",color:sub,cursor:"pointer",fontSize:16}}>×</button></>
                  :<><span style={{flex:1,fontSize:14,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A"}}>{cat.name}</span>
                    <button onClick={()=>setEditCat({type,catIdx:ci,field:"name",value:cat.name})} style={{background:"none",border:"none",color:sub,cursor:"pointer",padding:"0 4px",fontSize:13}}>✏️</button>
                    <button onClick={()=>delCat(type,ci)} style={{background:"none",border:"none",color:"#E05C5C",cursor:"pointer",fontSize:16,lineHeight:1}}>×</button></>
                }
              </div>
              {(cat.subs||[]).map((s2,si)=>(
                <div key={si} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 10px 6px 28px",borderTop:`1px solid ${border}`}}>
                  <div style={{display:"flex",flexDirection:"column",gap:0}}>
                    <button onClick={()=>moveSub(type,ci,si,-1)} disabled={si===0} style={{background:"none",border:"none",cursor:si===0?"default":"pointer",color:si===0?border:sub,fontSize:10,lineHeight:1,padding:"1px 2px"}}>▲</button>
                    <button onClick={()=>moveSub(type,ci,si,1)} disabled={si===(cat.subs.length-1)} style={{background:"none",border:"none",cursor:si===(cat.subs.length-1)?"default":"pointer",color:si===(cat.subs.length-1)?border:sub,fontSize:10,lineHeight:1,padding:"1px 2px"}}>▼</button>
                  </div>
                  {editCat&&editCat.type===type&&editCat.catIdx===ci&&editCat.field==="sub"&&editCat.subIdx===si
                    ?<><input autoFocus value={editCat.value} onChange={e=>setEditCat(ec=>({...ec,value:e.target.value}))}
                        style={{flex:1,padding:"4px 8px",borderRadius:6,border:`1.5px solid ${color}`,background:dk?"#0F1F1F":"#fff",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit"}}/>
                      <button onClick={()=>renameSub(type,ci,si,editCat.value)} style={{background:color,color:"#fff",border:"none",borderRadius:6,padding:"4px 10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓</button>
                      <button onClick={()=>setEditCat(null)} style={{background:"none",border:"none",color:sub,cursor:"pointer",fontSize:16}}>×</button></>
                    :<><span style={{flex:1,fontSize:13,color:dk?"#A0C8C8":"#4A6070"}}>↳ {s2}</span>
                      <button onClick={()=>setEditCat({type,catIdx:ci,field:"sub",subIdx:si,value:s2})} style={{background:"none",border:"none",color:sub,cursor:"pointer",padding:"0 4px",fontSize:12}}>✏️</button>
                      <button onClick={()=>delSub(type,ci,si)} style={{background:"none",border:"none",color:"#E05C5C",cursor:"pointer",fontSize:15,lineHeight:1}}>×</button></>
                  }
                </div>
              ))}
              <div style={{display:"flex",gap:6,padding:"6px 10px 6px 28px",borderTop:`1px solid ${border}`,background:dk?"#111E1E":"#FAFCFD"}}>
                <input ref={el=>subRefs.current[ci]=el} defaultValue=""
                  onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){addSub(type,ci,e.target.value);e.target.value="";}}}
                  placeholder="Dodaj podkategorię..." style={{flex:1,padding:"5px 8px",borderRadius:7,border:`1px solid ${border}`,background:"transparent",color:dk?"#E8F5F5":"#1C2B3A",fontSize:12,fontFamily:"inherit"}}/>
                <button onClick={()=>{const el=subRefs.current[ci];if(el&&el.value.trim()){addSub(type,ci,el.value);el.value="";}}} style={{background:color+"30",color,border:"none",borderRadius:7,padding:"5px 10px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>+</button>
              </div>
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <input ref={nameRef} defaultValue=""
              onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){addCat(type,e.target.value);e.target.value="";}}}
              placeholder="Nowa kategoria..." style={{flex:1,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:14,fontFamily:"inherit"}}/>
            <button onClick={()=>{if(nameRef.current&&nameRef.current.value.trim()){addCat(type,nameRef.current.value);nameRef.current.value="";}}} style={{background:color,color:"#fff",border:"none",borderRadius:10,padding:"9px 14px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+</button>
          </div>
        </div>
      );
    }

    function BudgetEditItemForm({cats,initial,selMonth,onSave,onDelete,onClose,onFormChange}) {
      const dk=useContext(DarkCtx);
      const border=dk?"#2A4040":"#E4EAF0";
      const sub="#7A8FA6";
      const [form,setFormLocal]=useState(initial);
      const setForm=(fn)=>{const next=typeof fn==="function"?fn(form):fn;setFormLocal(next);onFormChange(next);};
      const selCat=cats.find(c=>c.name===form.cat);
      const hasSubs=selCat&&(selCat.subs||[]).length>0;
      return <Modal title="Edytuj wpis" onClose={onClose}>
        <Sel label="Kategoria" value={form.cat} onChange={v=>setForm(f=>({...f,cat:v,subcat:""}))} options={cats.map(c=>({value:c.name,label:c.name}))}/>
        {hasSubs&&<Sel label="Podkategoria" value={form.subcat} onChange={v=>setForm(f=>({...f,subcat:v}))} options={[{value:"",label:"— brak —"},...(selCat.subs||[]).map(s=>({value:s,label:s}))]}/>}
        <Inp label="Opis" value={form.desc} onChange={v=>setForm(f=>({...f,desc:v}))}/>
        <Inp label="Kwota (zł)" value={form.amount} onChange={v=>setForm(f=>({...f,amount:v}))} type="number"/>
        <Inp label="Data" value={form.date||""} onChange={v=>setForm(f=>({...f,date:v}))} type="date"/>
        <Btn style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={onSave}>Zapisz zmiany</Btn>
        <Btn variant="danger" style={{width:"100%",justifyContent:"center"}} onClick={onDelete}>🗑️ Usuń</Btn>
      </Modal>;
    }

    function BudgetRecurringForm({type,cats,initial,selMonth,dk,border,onSave,onClose,title}) {
      const [form,setForm]=useState(initial);
      const selCat=cats.find(c=>c.name===form.cat);
      const hasSubs=selCat&&(selCat.subs||[]).length>0;
      const sub="#7A8FA6";
      return <Modal title={title} onClose={onClose}>
        <Sel label="Kategoria" value={form.cat} onChange={v=>setForm(f=>({...f,cat:v,subcat:""}))} options={cats.map(c=>({value:c.name,label:c.name}))}/>
        {hasSubs&&<Sel label="Podkategoria" value={form.subcat} onChange={v=>setForm(f=>({...f,subcat:v}))} options={[{value:"",label:"— brak —"},...(selCat.subs||[]).map(s=>({value:s,label:s}))]}/>}
        <Inp label="Opis" value={form.desc} onChange={v=>setForm(f=>({...f,desc:v}))} placeholder="np. Czynsz, Rata kredytu"/>
        <Inp label="Kwota (zł) *" value={form.amount} onChange={v=>setForm(f=>({...f,amount:v}))} type="number" placeholder="0"/>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Dzień miesiąca</div>
            <select value={form.dayOfMonth||1} onChange={e=>setForm(f=>({...f,dayOfMonth:+e.target.value}))}
              style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}>
              {Array.from({length:28},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Miesiąc startu</div>
            <input type="month" value={(form.startMonth||(selMonth)).length>7?(form.startMonth||selMonth).slice(0,7):(form.startMonth||selMonth)} onChange={e=>setForm(f=>({...f,startMonth:e.target.value}))} style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Dzień zakończenia <span style={{fontWeight:400,fontSize:12,color:sub}}>(opcjonalnie)</span></div>
            <select value={form.endDayOfMonth||""} onChange={e=>setForm(f=>({...f,endDayOfMonth:e.target.value?+e.target.value:null}))}
              style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}>
              <option value="">— brak —</option>
              {Array.from({length:28},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Miesiąc zakończenia <span style={{fontWeight:400,fontSize:12,color:sub}}>(opcjonalnie)</span></div>
            <input type="month" value={form.endMonth?(form.endMonth.length>7?form.endMonth.slice(0,7):form.endMonth):""} onChange={e=>setForm(f=>({...f,endMonth:e.target.value||null}))} style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
          </div>
        </div>
        <Btn disabled={!form.cat||!form.amount} style={{width:"100%",justifyContent:"center"}} onClick={()=>onSave(form)}>Zapisz</Btn>
      </Modal>;
    }

    function BudgetEditRecurringForm({type,cats,initial,selMonth,dk,border,onSave,onDelete,onClose}) {
      const [form,setForm]=useState(initial);
      const selCat=cats.find(c=>c.name===form.cat);
      const hasSubs=selCat&&(selCat.subs||[]).length>0;
      const sub="#7A8FA6";
      return <Modal title="Edytuj cykliczny" onClose={onClose}>
        <Sel label="Kategoria" value={form.cat} onChange={v=>setForm(f=>({...f,cat:v,subcat:""}))} options={cats.map(c=>({value:c.name,label:c.name}))}/>
        {hasSubs&&<Sel label="Podkategoria" value={form.subcat} onChange={v=>setForm(f=>({...f,subcat:v}))} options={[{value:"",label:"— brak —"},...(selCat.subs||[]).map(s=>({value:s,label:s}))]}/>}
        <Inp label="Opis" value={form.desc} onChange={v=>setForm(f=>({...f,desc:v}))}/>
        <Inp label="Kwota (zł)" value={form.amount} onChange={v=>setForm(f=>({...f,amount:v}))} type="number"/>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Dzień miesiąca</div>
            <select value={form.dayOfMonth||1} onChange={e=>setForm(f=>({...f,dayOfMonth:+e.target.value}))}
              style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}>
              {Array.from({length:28},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Miesiąc startu</div>
            <input type="month" value={(form.startMonth||(selMonth)).length>7?(form.startMonth||selMonth).slice(0,7):(form.startMonth||selMonth)} onChange={e=>setForm(f=>({...f,startMonth:e.target.value}))} style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Dzień zakończenia <span style={{fontWeight:400,fontSize:12,color:sub}}>(opcjonalnie)</span></div>
            <select value={form.endDayOfMonth||""} onChange={e=>setForm(f=>({...f,endDayOfMonth:e.target.value?+e.target.value:null}))}
              style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}>
              <option value="">— brak —</option>
              {Array.from({length:28},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:dk?"#5A8A8A":"#4A6070",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>Miesiąc zakończenia <span style={{fontWeight:400,fontSize:12,color:sub}}>(opcjonalnie)</span></div>
            <input type="month" value={form.endMonth?(form.endMonth.length>7?form.endMonth.slice(0,7):form.endMonth):""} onChange={e=>setForm(f=>({...f,endMonth:e.target.value||null}))} style={{width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit"}}/>
          </div>
        </div>
        <Btn style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>onSave(form)}>Zapisz zmiany</Btn>
        <Btn variant="danger" style={{width:"100%",justifyContent:"center"}} onClick={onDelete}>🗑️ Usuń</Btn>
      </Modal>;
    }

    function BudgetRecurringOverrideForm({r,selMonth,overrideVal,dk,border,onSave,onReset,onEditGlobal,onClose}) {
      const sub="#7A8FA6";
      const hasOverride=overrideVal!==undefined;
      const [amount,setAmount]=useState(hasOverride?String(overrideVal.amount):String(r.amount));
      const [desc,setDesc]=useState(hasOverride?(overrideVal.desc||r.desc||""):(r.desc||""));
      const monthLabel=new Date(selMonth+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"});
      const inputStyle={width:"100%",padding:"13px 16px",border:`1.5px solid ${border}`,borderRadius:12,fontSize:16,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"inherit",boxSizing:"border-box"};
      return <Modal title={"Cykliczny · "+monthLabel} onClose={onClose}>
        {hasOverride&&<div style={{background:dk?"#1A3030":"#FFF8E1",border:"1px solid #F0C040",borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:"#8A6A00"}}>↻* Nadpisano dla tego miesiąca</div>}
        <Inp label="Opis (dla tego miesiąca)" value={desc} onChange={v=>setDesc(v)}/>
        <Inp label="Kwota (zł) *" value={amount} onChange={v=>setAmount(v)} type="number"/>
        <Btn disabled={!amount} style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={()=>onSave({amount:+amount,desc})}>Zapisz dla tego miesiąca</Btn>
        {hasOverride&&<Btn variant="secondary" style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={onReset}>↺ Resetuj do domyślnej ({r.amount} zł)</Btn>}
        <Btn variant="secondary" style={{width:"100%",justifyContent:"center"}} onClick={onEditGlobal}>⚙ Edytuj globalnie →</Btn>
      </Modal>;
    }

    function BudgetItemForm({type,cats,form,setForm,onSave,onSaveAndNext,onClose,title}) {
      const selCat=cats.find(c=>c.name===form.cat);
      const hasSubs=selCat&&(selCat.subs||[]).length>0;
      return <Modal title={title} onClose={onClose}>
        <Sel label="Kategoria" value={form.cat} onChange={v=>setForm(f=>({...f,cat:v,subcat:""}))} options={cats.map(c=>({value:c.name,label:c.name}))}/>
        {hasSubs&&<Sel label="Podkategoria" value={form.subcat} onChange={v=>setForm(f=>({...f,subcat:v}))} options={[{value:"",label:"— brak —"},...(selCat.subs||[]).map(s=>({value:s,label:s}))]}/>}
        <Inp label="Opis" value={form.desc} onChange={v=>setForm(f=>({...f,desc:v}))} placeholder="np. Wypłata marzec"/>
        <Inp label="Kwota (zł) *" value={form.amount} onChange={v=>setForm(f=>({...f,amount:v}))} type="number" placeholder="0"/>
        <Inp label="Data *" value={form.date||""} onChange={v=>setForm(f=>({...f,date:v}))} type="date"/>
        <Btn disabled={!form.cat||!form.amount||!form.date} style={{width:"100%",justifyContent:"center",marginBottom:8}} onClick={onSave}>Zapisz</Btn>
        <Btn disabled={!form.cat||!form.amount||!form.date} variant="secondary" style={{width:"100%",justifyContent:"center"}} onClick={onSaveAndNext}>Zapisz i dodaj kolejny</Btn>
      </Modal>;
    }

    // ── BUDGET ────────────────────────────────────────────────────────────────
    // Struktura kategorii: [{name: "Wynagrodzenie", subs: ["Patryk", "Ania"]}, ...]
    // Migracja: stare string[] -> [{name, subs:[]}]
    function normCats(arr) {
      if(!arr||!arr.length) return [];
      return arr.map(c=>typeof c==="string"?{name:c,subs:[]}:c);
    }

    function Budget({finances,visits,rentals,budget,setBudget,desk,anthropicKey}) {
      const dk=useContext(DarkCtx);
      const demo=useDemo();
      const bg2=dk?"#1A2A2A":"#fff";
      const border=dk?"#2A4040":"#E4EAF0";
      const sub="#7A8FA6";

      const [selMonth,setSelMonth]=useState(()=>todayLocal().slice(0,7));
      const [showCatMgr,setShowCatMgr]=useState(false);
      const [showScanner,setShowScanner]=useState(false);
      const receiptMemory=useMemo(()=>budget.receiptMemory||{},[budget]);
      const setReceiptMemory=(m)=>setBudget(b=>({...b,receiptMemory:m}));
      const [showAdd,setShowAdd]=useState(null); // "income"|"expense"
      const [editItem,setEditItem]=useState(null);
      const [form,setForm]=useState({cat:"",subcat:"",desc:"",amount:""});
      // cat manager state
      const [editCat,setEditCat]=useState(null); // {type, catIdx, field:"name"|"sub", subIdx, value}
      const [newCatName,setNewCatName]=useState({income:"",expense:""});
      const [newSubName,setNewSubName]=useState({}); // {`${type}-${catIdx}`: ""}
      const [newCatType,setNewCatType]=useState("expense");

      // Normalize cats on read
      const rawIncCats=useMemo(()=>normCats(budget.incomeCategories||[{name:"Wynagrodzenie",subs:[]},{name:"Inne",subs:[]}]),[budget]);
      const rawExpCats=useMemo(()=>normCats(budget.expenseCategories||[{name:"Mieszkanie",subs:[]},{name:"Jedzenie",subs:[]},{name:"Transport",subs:[]},{name:"Inne",subs:[]}]),[budget]);
      const incCats=useMemo(()=>rawIncCats.slice().sort((a,b)=>a.name.localeCompare(b.name,"pl")),[rawIncCats]);
      const expCats=useMemo(()=>rawExpCats.slice().sort((a,b)=>a.name.localeCompare(b.name,"pl")),[rawExpCats]);

      const monthData=useMemo(()=>(budget.months||{})[selMonth]||{income:[],expenses:[]},[budget,selMonth]);

      const setMonthData=(fn)=>{
        setBudget(b=>{
          const prev=b.months||{};
          const cur=prev[selMonth]||{income:[],expenses:[]};
          return {...b,months:{...prev,[selMonth]:typeof fn==="function"?fn(cur):fn}};
        });
      };

      // Practice income for selMonth
      const practiceCats=useMemo(()=>{
        const map={Wizyta:0,Wypożyczalnia:0};
        // Wizyty: liczymy bezpośrednio z visits (tak jak zakładka Finanse)
        // żeby uwzględnić wizyty zakończone które nie mają jeszcze wpisu w finances
        (visits||[]).filter(v=>v.date&&v.date.startsWith(selMonth)&&visitStatus(v)==="zakończona").forEach(v=>{
          map["Wizyta"]+=(+v.price||0);
        });
        // Wypożyczalnia i reszta: z finances (nie-wizytowe)
        (finances||[]).filter(f=>{
          if(f.type!=="przychód")return false;
          const sid=f.sourceId||"";
          const cat=(f.category||"").toLowerCase();
          if(cat==="wózek"||sid.startsWith("wozek-"))return false;
          if(cat==="wizyta"||sid.startsWith("visit-"))return false; // wizyty już policzone wyżej
          return f.date&&f.date.startsWith(selMonth);
        }).forEach(f=>{
          map["Wypożyczalnia"]+=(+f.amount||0);
        });
        return Object.entries(map).filter(([,v])=>v>0).map(([label,v])=>({label,v}));
      },[finances,visits,selMonth]);

      // Cat helpers
      const setCats=(type,fn)=>{
        const key=type==="income"?"incomeCategories":"expenseCategories";
        setBudget(b=>{const cur=normCats(b[key]||[]);return {...b,[key]:fn(cur)};});
      };

      const addCat=(type,name)=>{
        if(!(name||"").trim())return;
        setCats(type,cats=>[...cats,{name:name.trim(),subs:[]}]);
      };
      const delCat=(type,catIdx)=>{
        const key=type==="income"?"incomeCategories":"expenseCategories";
        const mkey=type==="income"?"income":"expenses";
        setBudget(b=>{
          const cats=normCats(b[key]||[]);
          const delName=cats[catIdx].name;
          const fallback=cats.find((c,i)=>i!==catIdx&&c.name==="Inne")?"Inne":(cats.find((_,i)=>i!==catIdx)||{}).name||"Inne";
          const newCats=cats.filter((_,i)=>i!==catIdx);
          const months={};
          Object.entries(b.months||{}).forEach(([m,md])=>{
            months[m]={...md,[mkey]:(md[mkey]||[]).map(it=>it.cat===delName?{...it,cat:fallback,subcat:""}:it)};
          });
          const recurring=(b.recurring||[]).map(r=>(r.type===type&&r.cat===delName)?{...r,cat:fallback,subcat:""}:r);
          return {...b,[key]:newCats,months,recurring};
        });
      };
      const moveCat=(type,idx,dir)=>{
        setCats(type,cats=>{
          const a=[...cats];const ni=idx+dir;
          if(ni<0||ni>=a.length)return a;
          [a[idx],a[ni]]=[a[ni],a[idx]];return a;
        });
      };
      const renameCat=(type,catIdx,newName)=>{
        if(!newName.trim())return;
        const key=type==="income"?"incomeCategories":"expenseCategories";
        const mkey=type==="income"?"income":"expenses";
        setBudget(b=>{
          const cats=normCats(b[key]||[]);
          const oldName=cats[catIdx].name;
          const newCats=cats.map((c,i)=>i===catIdx?{...c,name:newName.trim()}:c);
          const months={};
          Object.entries(b.months||{}).forEach(([m,md])=>{
            months[m]={...md,[mkey]:(md[mkey]||[]).map(i=>i.cat===oldName?{...i,cat:newName.trim()}:i)};
          });
          return {...b,[key]:newCats,months};
        });
        setEditCat(null);
      };
      const addSub=(type,catIdx,name)=>{
        if(!(name||"").trim())return;
        setCats(type,cats=>cats.map((c,i)=>i===catIdx?{...c,subs:[...(c.subs||[]),(name||"").trim()]}:c));
      };
      const delSub=(type,catIdx,subIdx)=>{
        setCats(type,cats=>cats.map((c,i)=>i===catIdx?{...c,subs:(c.subs||[]).filter((_,j)=>j!==subIdx)}:c));
      };
      const moveSub=(type,catIdx,subIdx,dir)=>{
        setCats(type,cats=>cats.map((c,i)=>{
          if(i!==catIdx)return c;
          const a=[...(c.subs||[])];const ni=subIdx+dir;
          if(ni<0||ni>=a.length)return c;
          [a[subIdx],a[ni]]=[a[ni],a[subIdx]];
          return {...c,subs:a};
        }));
      };
      const renameSub=(type,catIdx,subIdx,newName)=>{
        if(!newName.trim())return;
        const key=type==="income"?"incomeCategories":"expenseCategories";
        const mkey=type==="income"?"income":"expenses";
        setBudget(b=>{
          const cats=normCats(b[key]||[]);
          const oldName=cats[catIdx].subs[subIdx];
          const newCats=cats.map((c,i)=>i===catIdx?{...c,subs:c.subs.map((s,j)=>j===subIdx?newName.trim():s)}:c);
          const months={};
          Object.entries(b.months||{}).forEach(([m,md])=>{
            months[m]={...md,[mkey]:(md[mkey]||[]).map(it=>it.cat===cats[catIdx].name&&it.subcat===oldName?{...it,subcat:newName.trim()}:it)};
          });
          return {...b,[key]:newCats,months};
        });
        setEditCat(null);
      };

      // Item helpers
      const saveAdd=()=>{
        if(!form.cat||!form.amount||!form.date)return;
        const item={id:Date.now(),cat:form.cat,subcat:form.subcat||"",desc:form.desc,amount:+form.amount,date:form.date};
        const targetMonth=form.date.slice(0,7);
        const mkey=showAdd==="income"?"income":"expenses";
        if(targetMonth!==selMonth){
          setBudget(b=>{
            const tgt=(b.months||{})[targetMonth]||{income:[],expenses:[]};
            return {...b,months:{...(b.months||{}),[targetMonth]:{...tgt,[mkey]:[...(tgt[mkey]||[]),item]}}};
          });
          setSelMonth(targetMonth);
        } else {
          setMonthData(d=>showAdd==="income"
            ?{...d,income:[...(d.income||[]),item]}
            :{...d,expenses:[...(d.expenses||[]),item]});
        }
        setShowAdd(null);
      };
      const saveAddAndNext=()=>{
        if(!form.cat||!form.amount||!form.date)return;
        const item={id:Date.now(),cat:form.cat,subcat:form.subcat||"",desc:form.desc,amount:+form.amount,date:form.date};
        const targetMonth=form.date.slice(0,7);
        const mkey=showAdd==="income"?"income":"expenses";
        if(targetMonth!==selMonth){
          setBudget(b=>{
            const tgt=(b.months||{})[targetMonth]||{income:[],expenses:[]};
            return {...b,months:{...(b.months||{}),[targetMonth]:{...tgt,[mkey]:[...(tgt[mkey]||[]),item]}}};
          });
          setSelMonth(targetMonth);
        } else {
          setMonthData(d=>showAdd==="income"
            ?{...d,income:[...(d.income||[]),item]}
            :{...d,expenses:[...(d.expenses||[]),item]});
        }
        setForm(f=>({...f,desc:"",amount:"",date:targetMonth===selMonth?f.date:todayLocal()}));
      };
      const saveEdit=()=>{
        if(!editItem)return;
        const updated={...editItem.item,cat:form.cat,subcat:form.subcat||"",desc:form.desc,amount:+form.amount,date:form.date||editItem.item.date||selMonth+"-01"};
        const targetMonth=updated.date.slice(0,7);
        const mkey=editItem.type==="income"?"income":"expenses";
        if(targetMonth!==selMonth){
          setBudget(b=>{
            const cur=(b.months||{})[selMonth]||{income:[],expenses:[]};
            const tgt=(b.months||{})[targetMonth]||{income:[],expenses:[]};
            const newCur={...cur,[mkey]:(cur[mkey]||[]).filter(i=>i.id!==updated.id)};
            const newTgt={...tgt,[mkey]:[...(tgt[mkey]||[]),updated]};
            return {...b,months:{...(b.months||{}),[selMonth]:newCur,[targetMonth]:newTgt}};
          });
        } else {
          setMonthData(d=>editItem.type==="income"
            ?{...d,income:(d.income||[]).map(i=>i.id===updated.id?updated:i)}
            :{...d,expenses:(d.expenses||[]).map(i=>i.id===updated.id?updated:i)});
        }
        setEditItem(null);
      };
      const delItem=(type,id)=>{
        setMonthData(d=>type==="income"
          ?{...d,income:(d.income||[]).filter(i=>i.id!==id)}
          :{...d,expenses:(d.expenses||[]).filter(i=>i.id!==id)});
        setEditItem(null);
      };

      const practiceTotal=practiceCats.reduce((s,c)=>s+(c.v||0),0);
      const manualIncTotal=(monthData.income||[]).reduce((s,i)=>s+(+i.amount||0),0);
      // totalInc/Exp including recurring — defined below after recurring state
      const recurringIncTotalEarly=(budget.recurring||[]).filter(r=>r.type==="income"&&(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth)).reduce((s,r)=>{const ov=(monthData.recurringOverrides||{})[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0);
      const recurringExpTotalEarly=(budget.recurring||[]).filter(r=>r.type==="expense"&&(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth)).reduce((s,r)=>{const ov=(monthData.recurringOverrides||{})[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0);
      const totalInc=practiceTotal+manualIncTotal+recurringIncTotalEarly;
      const totalExp=(monthData.expenses||[]).reduce((s,i)=>s+(+i.amount||0),0)+recurringExpTotalEarly;

      const [showYear,setShowYear]=useState(false);
      const [showCompare,setShowCompare]=useState(false);
      const [showRecurringList,setShowRecurringList]=useState(false);
      const [showAnalysis,setShowAnalysis]=useState(false);

      const analysisData=useMemo(()=>{
        const months=[];
        for(let i=5;i>=0;i--){
          const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()-i);
          const m=d.toISOString().slice(0,7);
          const mData=(budget.months||{})[m]||{};
          const mOverrides=(mData.recurringOverrides||{});
          const mRecExp=(budget.recurring||[]).filter(r=>r.type==="expense"&&(!r.startMonth||r.startMonth.slice(0,7)<=m)&&(!r.endMonth||r.endMonth.slice(0,7)>=m)).reduce((s,r)=>{const ov=mOverrides[r.id];return s+(ov!==undefined?+ov.amount:+r.amount||0)*(r.cycle==="weekly"?4:1);},0);
          const mRecInc=(budget.recurring||[]).filter(r=>r.type==="income"&&(!r.startMonth||r.startMonth.slice(0,7)<=m)&&(!r.endMonth||r.endMonth.slice(0,7)>=m)).reduce((s,r)=>{const ov=mOverrides[r.id];return s+(ov!==undefined?+ov.amount:+r.amount||0)*(r.cycle==="weekly"?4:1);},0);
          const mManInc=(mData.income||[]).reduce((s,i)=>s+(+i.amount||0),0);
          const mExp=(mData.expenses||[]).reduce((s,i)=>s+(+i.amount||0),0);
          let mPrac=0;
          (visits||[]).filter(v=>v.date&&v.date.startsWith(m)&&visitStatus(v)==="zakończona").forEach(v=>{mPrac+=(+v.price||0);});
          (finances||[]).filter(f=>{
            if(f.type!=="przychód")return false;
            const sid=f.sourceId||"";const cat=(f.category||"").toLowerCase();
            if(cat==="wózek"||sid.startsWith("wozek-"))return false;
            if(cat==="wizyta"||sid.startsWith("visit-"))return false;
            return f.date&&f.date.startsWith(m);
          }).forEach(f=>{mPrac+=(+f.amount||0);});
          const mTotalInc=mPrac+mManInc+mRecInc;
          const mTotalExp=mExp+mRecExp;
          months.push({m,mRecExp,mTotalInc,mTotalExp,pctInc:mTotalInc>0?Math.round(mRecExp/mTotalInc*100):null,pctExp:mTotalExp>0?Math.round(mRecExp/mTotalExp*100):null});
        }
        return months;
      },[budget,selMonth,visits,finances]);
      const [compareMonth,setCompareMonth]=useState(()=>{const d=new Date(todayLocal().slice(0,7)+"-15");d.setMonth(d.getMonth()-1);return d.toISOString().slice(0,7);});
      // If selMonth changes to equal compareMonth, shift compareMonth one month back
      const safeCompareMonth=compareMonth===selMonth?(()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()-1);return d.toISOString().slice(0,7);})():compareMonth;
      const [showRecurring,setShowRecurring]=useState(null); // "income"|"expense"|null - add modal
      const [editRecurring,setEditRecurring]=useState(null);
      const [rForm,setRForm]=useState({type:"expense",cat:"",subcat:"",desc:"",amount:"",cycle:"monthly",startMonth:selMonth});
      const [editRecurringOverride,setEditRecurringOverride]=useState(null);
      const [openRecurringCats,setOpenRecurringCats]=useState(new Set());

      const recurring=useMemo(()=>budget.recurring||[],[budget]);
      const recurringInc=useMemo(()=>recurring.filter(r=>r.type==="income"&&(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth)),[recurring,selMonth]);
      const recurringExp=useMemo(()=>recurring.filter(r=>r.type==="expense"&&(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth)),[recurring,selMonth]);
      const recOverrides=useMemo(()=>monthData.recurringOverrides||{},[monthData]);
      const recAmt=(r)=>recOverrides[r.id]!==undefined?+recOverrides[r.id].amount:+r.amount;
      const recDesc=(r)=>recOverrides[r.id]!==undefined?(recOverrides[r.id].desc||r.desc||r.cat):(r.desc||r.cat);
      // monthly equivalent: weekly×4, monthly×1
      const recurringIncTotal=recurringInc.reduce((s,r)=>s+recAmt(r)*(r.cycle==="weekly"?4:1),0);
      const recurringExpTotal=recurringExp.reduce((s,r)=>s+recAmt(r)*(r.cycle==="weekly"?4:1),0);

      const saveRecurring=()=>{
        if(!rForm.cat||!rForm.amount)return;
        const item={id:Date.now(),type:rForm.type,cat:rForm.cat,subcat:rForm.subcat||"",desc:rForm.desc,amount:+rForm.amount,cycle:rForm.cycle,startMonth:rForm.startMonth||selMonth};
        setBudget(b=>({...b,recurring:[...(b.recurring||[]),item]}));
        setShowRecurring(null);
      };
      const updateRecurring=()=>{
        if(!editRecurring)return;
        setBudget(b=>({...b,recurring:(b.recurring||[]).map(r=>r.id===editRecurring.id?{...editRecurring,...rForm,amount:+rForm.amount,startMonth:rForm.startMonth||selMonth}:r)}));
        setEditRecurring(null);
      };
      const deleteRecurring=(id)=>{
        setBudget(b=>({...b,recurring:(b.recurring||[]).filter(r=>r.id!==id)}));
        setEditRecurring(null);
      };

      // Previous month helpers
      const prevMonth=useMemo(()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()-1);return d.toISOString().slice(0,7);},[selMonth]);
      const prevMonthData=useMemo(()=>(budget.months||{})[prevMonth]||{income:[],expenses:[]},[budget,prevMonth]);
      const prevPracticeTotal=useMemo(()=>{
        let total=0;
        (visits||[]).filter(v=>v.date&&v.date.startsWith(prevMonth)&&visitStatus(v)==="zakończona").forEach(v=>{total+=(+v.price||0);});
        (finances||[]).filter(f=>{
          if(f.type!=="przychód")return false;
          const sid=f.sourceId||"";const cat=(f.category||"").toLowerCase();
          if(cat==="wózek"||sid.startsWith("wozek-"))return false;
          if(cat==="wizyta"||sid.startsWith("visit-"))return false;
          return f.date&&f.date.startsWith(prevMonth);
        }).forEach(f=>{total+=(+f.amount||0);});
        return total;
      },[finances,visits,prevMonth]);
      const prevOv=useMemo(()=>prevMonthData.recurringOverrides||{},[prevMonthData]);
      const prevRecInc=useMemo(()=>(budget.recurring||[]).filter(r=>r.type==="income"&&(!r.startMonth||r.startMonth.slice(0,7)<=prevMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=prevMonth)).reduce((s,r)=>{const ov=prevOv[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0),[budget,prevMonth,prevOv]);
      const prevRecExp=useMemo(()=>(budget.recurring||[]).filter(r=>r.type==="expense"&&(!r.startMonth||r.startMonth.slice(0,7)<=prevMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=prevMonth)).reduce((s,r)=>{const ov=prevOv[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0),[budget,prevMonth,prevOv]);
      const prevTotalInc=prevPracticeTotal+(prevMonthData.income||[]).reduce((s,i)=>s+(+i.amount||0),0)+prevRecInc;
      const prevTotalExp=(prevMonthData.expenses||[]).reduce((s,i)=>s+(+i.amount||0),0)+prevRecExp;
      const diffInc=prevTotalInc>0?Math.round((totalInc-prevTotalInc)/prevTotalInc*100):null;
      const diffExp=prevTotalExp>0?Math.round((totalExp-prevTotalExp)/prevTotalExp*100):null;

      const onScannerConfirm=(items,date)=>{
        const targetMonth=date?date.slice(0,7):selMonth;
        setBudget(b=>{
          const prev=b.months||{};
          const cur=prev[targetMonth]||{income:[],expenses:[]};
          return {...b,months:{...prev,[targetMonth]:{...cur,expenses:[...(cur.expenses||[]),...items.map(i=>({id:Date.now()+Math.random(),cat:i.cat,subcat:i.subcat||"",desc:i.desc,amount:i.amount,date}))]}}};
        });
        setShowScanner(false);
      };

      // Year summary
      const yearMonths=useMemo(()=>{
        const yr=selMonth.slice(0,4);
        const all=new Set();
        for(let m=1;m<=12;m++)all.add(yr+"-"+String(m).padStart(2,"0"));
        Object.keys(budget.months||{}).filter(m=>m.startsWith(yr)).forEach(m=>all.add(m));
        return Array.from(all).sort();
      },[selMonth,budget]);

      const monthsList=useMemo(()=>{
        const s=new Set();
        const cur=todayLocal().slice(0,7);s.add(cur);s.add(selMonth);
        Object.keys(budget.months||{}).forEach(m=>s.add(m));
        for(let i=1;i<=5;i++){const d=new Date(cur+"-15");d.setMonth(d.getMonth()-i);s.add(d.toISOString().slice(0,7));}
        for(let i=1;i<=3;i++){const d=new Date(cur+"-15");d.setMonth(d.getMonth()+i);s.add(d.toISOString().slice(0,7));}
        return Array.from(s).sort((a,b)=>b.localeCompare(a));
      },[budget,selMonth]);

      const getCats=(type)=>type==="income"?incCats:expCats;
      const getColor=(type)=>type==="income"?"#3DAA72":"#E05C5C";

      // CatMgrSection is defined outside Budget to prevent remount on keystroke

      // ItemForm defined outside Budget

      const [expandedCats,setExpandedCats]=useState({});
      const toggleCat=(key)=>setExpandedCats(e=>({...e,[key]:!e[key]}));

      const renderItems=(type,cats,color)=>{
        const items=type==="income"?monthData.income||[]:monthData.expenses||[];
        const recItems=type==="income"?recurringInc:recurringExp;
        const catsWithTotals=cats.map(cat=>{
          const catItems=items.filter(i=>i.cat===cat.name);
          const catRec=recItems.filter(r=>r.cat===cat.name);
          const catTotal=catItems.reduce((s,i)=>s+(+i.amount||0),0)+catRec.reduce((s,r)=>s+recAmt(r),0);
          return {cat,catItems,catRec,catTotal};
        }).filter(({catItems,catRec})=>catItems.length||catRec.length);
        const sorted=type==="expense"?[...catsWithTotals].sort((a,b)=>b.catTotal-a.catTotal):catsWithTotals;
        return sorted.map(({cat,catItems,catRec,catTotal})=>{
          if(!catItems.length&&!catRec.length)return null;
          const hasSubs=(cat.subs||[]).length>0;
          const expKey=type+"-"+cat.name;
          const isOpen=!!expandedCats[expKey];
          return <div key={cat.name}>
            {/* Category header — clickable, shows only sum */}
            <div onClick={()=>toggleCat(expKey)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",background:dk?"#111E1E":type==="income"?"#F0F9F5":"#FDF7F7",cursor:"pointer",borderBottom:`1px solid ${border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:11,color:isOpen?color:sub,transition:"transform .2s",display:"inline-block",transform:isOpen?"rotate(90deg)":"rotate(0deg)"}}>▶</span>
                <span style={{fontSize:13,fontWeight:700,color:dk?"#C8E8E8":"#1C2B3A"}}>{cat.name}</span>
                <span style={{fontSize:11,color:sub}}>{catItems.length+catRec.length} {(catItems.length+catRec.length)===1?"wpis":"wpisów"}</span>
              </div>
              <span style={{fontWeight:800,fontSize:14,color}}>{demo?"****":catTotal.toFixed(2)} zł</span>
            </div>
            {/* Expanded: subcategories as sums, or items if no subcats */}
            {isOpen&&<div style={{background:dk?"#0D1A1A":type==="income"?"#F7FCF9":"#FDF5F5"}}>
              {hasSubs
                ? (cat.subs||[]).map(s=>{
                    const subItems=catItems.filter(i=>i.subcat===s);
                    const subRec=catRec.filter(r=>r.subcat===s);
                    if(!subItems.length&&!subRec.length)return null;
                    const subTotal=subItems.reduce((a,i)=>a+(+i.amount||0),0)+subRec.reduce((a,r)=>a+recAmt(r),0);
                    const subKey=expKey+"-"+s;
                    const subOpen=!!expandedCats[subKey];
                    const subCount=subItems.length+subRec.length;
                    return <div key={s}>
                      {/* Subcategory row — shows sum, click to expand items */}
                      <div onClick={()=>setExpandedCats(e=>({...e,[subKey]:!e[subKey]}))}
                        style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 16px 9px 28px",background:dk?"#0F1B1B":type==="income"?"#EBF7F1":"#FAF0F0",borderBottom:`1px solid ${border}`,cursor:"pointer"}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:10,color:subOpen?color:sub,display:"inline-block",transform:subOpen?"rotate(90deg)":"rotate(0deg)"}}>▶</span>
                          <span style={{fontSize:13,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A"}}>↳ {s}</span>
                          <span style={{fontSize:10,color:sub}}>{subCount} {subCount===1?"wpis":"wpisów"}</span>
                        </div>
                        <span style={{fontWeight:700,fontSize:13,color}}>{demo?"****":subTotal.toFixed(2)} zł</span>
                      </div>
                      {/* Expanded subcategory items */}
                      {subOpen&&<>
                        {subItems.slice().sort((a,b)=>(a.date||"").localeCompare(b.date||"")).map(item=><div key={item.id} onClick={()=>{setForm({cat:item.cat,subcat:item.subcat||"",desc:item.desc||"",amount:String(item.amount),date:item.date||selMonth+"-01"});setEditItem({type,item});}}
                          style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px 8px 44px",borderBottom:`1px solid ${border}`,cursor:"pointer"}}>
                          <div style={{minWidth:0,flex:1}}>
                            <span style={{fontSize:12,color:sub}}>{demo?"••••":item.desc||item.subcat||item.cat}</span>
                            {item.date&&<span style={{fontSize:10,color:sub,marginLeft:6,opacity:.7}}>{new Date(item.date+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"short"})}</span>}
                          </div>
                          <span style={{fontWeight:600,fontSize:12,color,flexShrink:0}}>{demo?"****":(+item.amount).toFixed(2)} zł</span>
                        </div>)}
                        {catRec.filter(r=>r.subcat===s).map(r=><div key={r.id} onClick={()=>setEditRecurringOverride({r,type})}
                          style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px 8px 44px",borderBottom:`1px solid ${border}`,cursor:"pointer"}}>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <span style={{fontSize:11,color,opacity:.6}}>{recOverrides[r.id]!==undefined?"↻*":"↻"}</span>
                            <span style={{fontSize:12,color:sub}}>{demo?"••••":recDesc(r)}</span>
                          </div>
                          <span style={{fontWeight:600,fontSize:12,color}}>{demo?"****":recAmt(r).toFixed(2)} zł</span>
                        </div>)}
                      </>}
                    </div>;
                  })
                : null
              }
              {catItems.filter(i=>!i.subcat).slice().sort((a,b)=>(a.date||"").localeCompare(b.date||"")).map(item=><div key={item.id} onClick={()=>{setForm({cat:item.cat,subcat:"",desc:item.desc||"",amount:String(item.amount),date:item.date||selMonth+"-01"});setEditItem({type,item});}}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px",borderBottom:`1px solid ${border}`,cursor:"pointer"}}>
                <div style={{minWidth:0,flex:1}}>
                  <span style={{fontSize:12,color:sub}}>{demo?"••••":item.desc||item.cat}</span>
                  {item.date&&<span style={{fontSize:10,color:sub,marginLeft:6,opacity:.7}}>{new Date(item.date+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"short"})}</span>}
                </div>
                <span style={{fontWeight:600,fontSize:12,color,flexShrink:0}}>{demo?"****":(+item.amount).toFixed(2)} zł</span>
              </div>)}
              {catRec.filter(r=>!r.subcat).map(r=><div key={r.id} onClick={()=>setEditRecurringOverride({r,type})}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px",borderBottom:`1px solid ${border}`,cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:12,color,opacity:.6}}>{recOverrides[r.id]!==undefined?"↻*":"↻"}</span>
                  <span style={{fontSize:12,color:sub}}>{demo?"••••":recDesc(r)}</span>
                </div>
                <span style={{fontWeight:600,fontSize:12,color}}>{demo?"****":recAmt(r).toFixed(2)} zł</span>
              </div>)}
            </div>}
          </div>;
        });
      };

      return <div style={{padding:"0 20px 40px"}}>
        {/* Month selector — kompaktowy */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
          <button onClick={()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()-1);setSelMonth(d.toISOString().slice(0,7));}} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:`1.5px solid ${border}`,background:"none",cursor:"pointer",fontWeight:700,fontSize:18,color:dk?"#7ABABA":"#4A6070",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <div style={{flex:1,textAlign:"center",fontWeight:700,fontSize:16,color:dk?"#E8F5F5":"#1C2B3A",fontFamily:"'Syne',sans-serif"}}>
            {new Date(selMonth+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"})}
          </div>
          <button onClick={()=>{const d=new Date(selMonth+"-15");d.setMonth(d.getMonth()+1);setSelMonth(d.toISOString().slice(0,7));}} style={{flexShrink:0,width:36,height:36,borderRadius:10,border:`1.5px solid ${border}`,background:"none",cursor:"pointer",fontWeight:700,fontSize:18,color:dk?"#7ABABA":"#4A6070",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </div>

        {/* D — badge kosztów stałych */}
        {recurringExpTotalEarly>0&&<div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
          <div style={{padding:"5px 12px",borderRadius:20,background:dk?"#1A2A2A":"#F8FAFB",border:`1px solid ${border}`,fontSize:12,color:sub}}>
            Stałe: <strong style={{color:dk?"#E8F5F5":"#1C2B3A"}}>{demo?"****":recurringExpTotalEarly.toFixed(0)} zł</strong>
          </div>
          {totalInc>0&&<div style={{padding:"5px 12px",borderRadius:20,background:dk?"#1A2A2A":"#F8FAFB",border:`1px solid ${border}`,fontSize:12,color:sub}}>
            {Math.round(recurringExpTotalEarly/totalInc*100)}% przychodów
          </div>}
          {totalExp>0&&<div style={{padding:"5px 12px",borderRadius:20,background:dk?"#1A2A2A":"#F8FAFB",border:`1px solid ${border}`,fontSize:12,color:sub}}>
            {Math.round(recurringExpTotalEarly/totalExp*100)}% kosztów ogółem
          </div>}
        </div>}

        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12}}>
          {[
            {icon:"📷",label:"Paragon",onClick:()=>setShowScanner(true),active:false,color:"#0A7C7C"},
            {icon:"⚖️",label:"Porównaj",onClick:()=>setShowCompare(v=>!v),active:showCompare,color:"#2E86AB"},
            {icon:"📅",label:"Rok "+selMonth.slice(0,4),onClick:()=>setShowYear(v=>!v),active:showYear,color:"#0A7C7C"},
            {icon:"↻",label:"Cykliczne",onClick:()=>setShowRecurringList(v=>!v),active:showRecurringList,color:"#8B5CF6"},
            {icon:"⚙️",label:"Kat.",onClick:()=>setShowCatMgr(true),active:false,color:sub},
          ].map(b=>(
            <button key={b.label} onClick={b.onClick} style={{
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              gap:3,padding:"10px 4px",borderRadius:12,cursor:"pointer",fontFamily:"inherit",
              background:b.active?b.color:(dk?"#1A2A2A":"#fff"),
              border:`1.5px solid ${b.active?b.color:border}`,
              boxShadow:"0 1px 3px rgba(0,0,0,.06)"
            }}>
              <span style={{fontSize:18,lineHeight:1}}>{b.icon}</span>
              <span style={{fontSize:10,fontWeight:600,color:b.active?"#fff":(dk?"#7ABABA":"#4A6070"),whiteSpace:"nowrap"}}>{b.label}</span>
            </button>
          ))}
        </div>

        {/* PANEL B — ANALIZA KOSZTÓW STAŁYCH */}
        <div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
          <div onClick={()=>setShowAnalysis(v=>!v)} style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
            <SectionLabel style={{marginBottom:0}}>📊 Analiza kosztów stałych</SectionLabel>
            <span style={{fontSize:12,color:sub}}>{showAnalysis?"▲":"▼"}</span>
          </div>
          {showAnalysis&&(()=>{const maxRecExp=Math.max(...analysisData.map(x=>x.mRecExp),1);return <div style={{borderTop:`1px solid ${border}`}}>
            <div style={{display:"grid",gridTemplateColumns:"70px 1fr 60px 50px 50px",gap:0}}>
              {["Miesiąc","","Stałe","% prych.","% kost."].map((h,i)=><div key={i} style={{padding:"6px 10px",fontSize:10,fontWeight:700,color:sub,textTransform:"uppercase",letterSpacing:.3,borderBottom:`1px solid ${border}`,background:dk?"#111E1E":"#F8FAFB"}}>{h}</div>)}
              {analysisData.map(({m,mRecExp,mTotalInc,mTotalExp,pctInc,pctExp})=>{
                const isCur=m===selMonth;
                const barW=maxRecExp>0?Math.round(mRecExp/maxRecExp*100):0;
                return <React.Fragment key={m}>
                  <div style={{padding:"8px 10px",fontSize:12,fontWeight:isCur?700:400,color:isCur?"#0A7C7C":dk?"#C8E8E8":"#1C2B3A",borderBottom:`1px solid ${border}`,background:isCur?(dk?"#0A2020":"#E6F4F4"):"transparent"}}>{new Date(m+"-15").toLocaleDateString("pl-PL",{month:"short",year:"2-digit"})}</div>
                  <div style={{padding:"8px 6px",borderBottom:`1px solid ${border}`,display:"flex",alignItems:"center",background:isCur?(dk?"#0A2020":"#E6F4F4"):"transparent"}}>
                    <div style={{height:6,borderRadius:3,background:"#E05C5C",width:barW+"%",minWidth:mRecExp>0?4:0,transition:"width .3s"}}/>
                  </div>
                  <div style={{padding:"8px 10px",fontSize:12,fontWeight:600,color:"#E05C5C",borderBottom:`1px solid ${border}`,background:isCur?(dk?"#0A2020":"#E6F4F4"):"transparent",textAlign:"right"}}>{demo?"***":mRecExp>0?mRecExp.toFixed(0)+"zł":"—"}</div>
                  <div style={{padding:"8px 6px",fontSize:12,color:pctInc!=null?(pctInc>80?"#E05C5C":pctInc>50?"#F4A261":"#3DAA72"):sub,fontWeight:600,borderBottom:`1px solid ${border}`,background:isCur?(dk?"#0A2020":"#E6F4F4"):"transparent",textAlign:"center"}}>{pctInc!=null?pctInc+"%":"—"}</div>
                  <div style={{padding:"8px 6px",fontSize:12,color:pctExp!=null?(pctExp>80?"#E05C5C":pctExp>50?"#F4A261":"#3DAA72"):sub,fontWeight:600,borderBottom:`1px solid ${border}`,background:isCur?(dk?"#0A2020":"#E6F4F4"):"transparent",textAlign:"center"}}>{pctExp!=null?pctExp+"%":"—"}</div>
                </React.Fragment>;
              })}
            </div>
            <div style={{padding:"8px 12px",fontSize:11,color:sub,fontStyle:"italic"}}>Aktualny miesiąc podświetlony. Kolor % przychodów: zielony &lt;50%, pomarańczowy &lt;80%, czerwony &gt;80%.</div>
          </div>;})()}
        </div>

        {/* LISTA CYKLICZNYCH */}
        {showRecurringList&&<div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <SectionLabel style={{marginBottom:0}}>Cykliczne ({(budget.recurring||[]).length})</SectionLabel>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{const c=incCats[0];setRForm({type:"income",cat:c?c.name:"",subcat:"",desc:"",amount:"",cycle:"monthly",startMonth:todayLocal()});setShowRecurring("income");}} style={{padding:"4px 10px",borderRadius:8,border:"none",background:"#3DAA72",color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>+ Przychód</button>
              <button onClick={()=>{const c=expCats[0];setRForm({type:"expense",cat:c?c.name:"",subcat:"",desc:"",amount:"",cycle:"monthly",startMonth:todayLocal()});setShowRecurring("expense");}} style={{padding:"4px 10px",borderRadius:8,border:"none",background:"#E05C5C",color:"#fff",fontWeight:600,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>+ Koszt</button>
            </div>
          </div>
          {(budget.recurring||[]).length===0&&<div style={{padding:16,textAlign:"center",color:sub,fontSize:13}}>Brak wpisów cyklicznych</div>}
          {["income","expense"].map(typ=>{
            const recs=(budget.recurring||[]).filter(r=>r.type===typ);
            if(!recs.length)return null;
            const col=typ==="income"?"#3DAA72":"#E05C5C";
            const label=typ==="income"?"Przychody cykliczne":"Koszty cykliczne";
            // Buduj grupy kategorii z sumami, sortuj od największej
            const catGroups=[...new Set(recs.map(r=>r.cat))].map(cat=>{
              const catRecs=recs.filter(r=>r.cat===cat).slice().sort((a,b)=>(+b.amount||0)-(+a.amount||0));
              const catActiveSum=catRecs.filter(r=>(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth)).reduce((s,r)=>s+(+r.amount||0)*(r.cycle==="weekly"?4:1),0);
              return {cat,catRecs,catActiveSum};
            }).sort((a,b)=>b.catActiveSum-a.catActiveSum);
            const totalActiveSum=recs.filter(r=>(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth)).reduce((s,r)=>s+(+r.amount||0)*(r.cycle==="weekly"?4:1),0);
            return <div key={typ}>
              <div style={{padding:"6px 16px",background:dk?"#0F1F1F":typ==="income"?"#F0F9F5":"#FDF7F7",fontSize:10,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:.5}}>{label}</div>
              {catGroups.map(({cat,catRecs,catActiveSum})=>{
                const key=typ+"-"+cat;
                const isOpen=openRecurringCats.has(key);
                const toggle=()=>setOpenRecurringCats(s=>{const n=new Set(s);n.has(key)?n.delete(key):n.add(key);return n;});
                return <div key={cat}>
                  <div onClick={toggle} style={{padding:"10px 16px",background:dk?"#162828":typ==="income"?"#E8F7F0":"#FEF0F0",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderBottom:`1px solid ${border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:12,color:col,fontWeight:500}}>{isOpen?"▾":"▸"}</span>
                      <span style={{fontSize:13,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A"}}>{cat}</span>
                      <span style={{fontSize:11,color:sub}}>({catRecs.length})</span>
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:col}}>{demo?"****":catActiveSum.toFixed(2)} zł</span>
                  </div>
                  {isOpen&&catRecs.map(r=>{
                    const isActive=(!r.startMonth||r.startMonth.slice(0,7)<=selMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=selMonth);
                    return <div key={r.id} onClick={()=>{setRForm({type:r.type,cat:r.cat,subcat:r.subcat||"",desc:r.desc,amount:String(r.amount),cycle:"monthly",startMonth:(r.startMonth||selMonth+"-01").length===7?(r.startMonth||selMonth)+"-01":(r.startMonth||selMonth+"-01"),endMonth:r.endMonth?(r.endMonth.length===7?r.endMonth+"-01":r.endMonth):""});setEditRecurring(r);}}
                      style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 16px 9px 32px",borderBottom:`1px solid ${border}`,cursor:"pointer",opacity:isActive?1:.45}}>
                      <div style={{minWidth:0,flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:13,fontWeight:500,color:dk?"#C8E8E8":"#1C2B3A"}}>{demo?"••••":r.desc||r.cat}</span>
                          {!isActive&&<span style={{fontSize:10,color:sub,background:dk?"#2A3A3A":"#F0F0F0",borderRadius:4,padding:"1px 5px"}}>nieaktywny</span>}
                        </div>
                        <div style={{fontSize:11,color:sub,marginTop:1}}>
                          {r.subcat?""+r.subcat+" · ":""}{r.dayOfMonth||1}. każdego miesiąca
                          {r.startMonth?" · od "+new Date(r.startMonth.slice(0,7)+"-15").toLocaleDateString("pl-PL",{month:"short",year:"numeric"}):""}
                          {r.endMonth?" · do "+new Date(r.endMonth.slice(0,7)+"-15").toLocaleDateString("pl-PL",{month:"short",year:"numeric"}):""}
                        </div>
                      </div>
                      <span style={{fontWeight:700,fontSize:13,color:col,flexShrink:0,marginLeft:8}}>{demo?"****":(+r.amount).toFixed(2)} zł</span>
                    </div>;
                  })}
                </div>;
              })}
              <div style={{padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",background:dk?"#0F1F1F":typ==="income"?"#E8F7F0":"#FEF0F0"}}>
                <SectionLabel style={{marginBottom:0}}>Suma miesięczna</SectionLabel>
                <span style={{fontSize:14,fontWeight:800,color:col}}>{demo?"****":totalActiveSum.toFixed(2)} zł</span>
              </div>
            </div>;
          })}
        </div>}

        {/* ROK */}
        {showCompare&&<div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <SectionLabel style={{marginBottom:0}}>Porównaj miesiące</SectionLabel>
            <select value={safeCompareMonth} onChange={e=>setCompareMonth(e.target.value)}
              style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${border}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:12,fontFamily:"inherit"}}>
              {monthsList.filter(m=>m!==selMonth).map(m=><option key={m} value={m}>{new Date(m+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"})}</option>)}
            </select>
          </div>
          {(()=>{
            const md2=(budget.months||{})[safeCompareMonth]||{income:[],expenses:[]};
            let prac2=0;
            (visits||[]).filter(v=>v.date&&v.date.startsWith(safeCompareMonth)&&visitStatus(v)==="zakończona").forEach(v=>{prac2+=(+v.price||0);});
            (finances||[]).filter(f=>{
              if(f.type!=="przychód")return false;
              const sid=f.sourceId||"";const cat=(f.category||"").toLowerCase();
              if(cat==="wózek"||sid.startsWith("wozek-"))return false;
              if(cat==="wizyta"||sid.startsWith("visit-"))return false;
              return f.date&&f.date.startsWith(safeCompareMonth);
            }).forEach(f=>{prac2+=(+f.amount||0);});
            const ov2=(md2.recurringOverrides||{});
            const recInc2=(budget.recurring||[]).filter(r=>r.type==="income"&&(!r.startMonth||r.startMonth.slice(0,7)<=safeCompareMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=safeCompareMonth)).reduce((s,r)=>{const ov=ov2[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0);
            const recExp2=(budget.recurring||[]).filter(r=>r.type==="expense"&&(!r.startMonth||r.startMonth.slice(0,7)<=safeCompareMonth)&&(!r.endMonth||r.endMonth.slice(0,7)>=safeCompareMonth)).reduce((s,r)=>{const ov=ov2[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0);
            const inc2=prac2+(md2.income||[]).reduce((s,i)=>s+(+i.amount||0),0)+recInc2;
            const exp2=(md2.expenses||[]).reduce((s,i)=>s+(+i.amount||0),0)+recExp2;
            const rows=[
              {label:"Przychody",a:totalInc,b:inc2,color:"#3DAA72"},
              {label:"Koszty",a:totalExp,b:exp2,color:"#E05C5C"},
            ];
            const fmtDiff=(a,b,invert)=>{const d=a-b;if(d===0)return null;const pct=b>0?Math.round(Math.abs(d)/b*100):null;const better=invert?d<0:d>0;return {val:d,pct,better};};
            return <div style={{padding:"12px 16px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:8,textAlign:"center"}}>
                <div style={{fontSize:11,color:sub}}></div>
                <div style={{fontSize:11,fontWeight:700,color:"#0A7C7C"}}>{new Date(selMonth+"-15").toLocaleDateString("pl-PL",{month:"short",year:"numeric"})}</div>
                <div style={{fontSize:11,fontWeight:700,color:"#2E86AB"}}>{new Date(safeCompareMonth+"-15").toLocaleDateString("pl-PL",{month:"short",year:"numeric"})}</div>
              </div>
              {rows.map(row=>{
                const diff=fmtDiff(row.a,row.b,row.label==="Koszty");
                return <div key={row.label} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:10,alignItems:"center"}}>
                  <div style={{fontSize:12,fontWeight:600,color:dk?"#C8E8E8":"#1C2B3A"}}>{row.label}</div>
                  <div style={{textAlign:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:row.color}}>{row.a.toFixed(0)} zł</div>
                  <div style={{textAlign:"center",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:row.color}}>{row.b.toFixed(0)} zł</div>
                  {diff&&<div style={{gridColumn:"1/-1",textAlign:"right",fontSize:11,color:diff.better?"#3DAA72":"#E05C5C",marginTop:-4}}>
                    {diff.better?"↑ lepiej":"↓ gorzej"} o {Math.abs(diff.val).toFixed(0)} zł{diff.pct?` (${diff.pct}%)`:""}
                  </div>}
                </div>;
              })}
            </div>;
          })()}
        </div>}

        {showYear&&<div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
          <SectionLabel style={{padding:"12px 16px",borderBottom:`1px solid ${border}`,marginBottom:0}}>Rok {selMonth.slice(0,4)}</SectionLabel>
          {yearMonths.map(m=>{
            const md=(budget.months||{})[m]||{income:[],expenses:[]};
            let prac=0;
            (visits||[]).filter(v=>v.date&&v.date.startsWith(m)&&visitStatus(v)==="zakończona").forEach(v=>{prac+=(+v.price||0);});
            (finances||[]).filter(f=>{
              if(f.type!=="przychód")return false;
              const sid=f.sourceId||"";const cat=(f.category||"").toLowerCase();
              if(cat==="wózek"||sid.startsWith("wozek-"))return false;
              if(cat==="wizyta"||sid.startsWith("visit-"))return false;
              return f.date&&f.date.startsWith(m);
            }).forEach(f=>{prac+=(+f.amount||0);});
            const ovm=(md.recurringOverrides||{});
            const recInc=(budget.recurring||[]).filter(r=>r.type==="income"&&(!r.startMonth||r.startMonth.slice(0,7)<=m)&&(!r.endMonth||r.endMonth.slice(0,7)>=m)).reduce((s,r)=>{const ov=ovm[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0);
            const recExp=(budget.recurring||[]).filter(r=>r.type==="expense"&&(!r.startMonth||r.startMonth.slice(0,7)<=m)&&(!r.endMonth||r.endMonth.slice(0,7)>=m)).reduce((s,r)=>{const ov=ovm[r.id];const amt=ov!==undefined?+ov.amount:+r.amount||0;return s+amt*(r.cycle==="weekly"?4:1);},0);
            const inc2=prac+(md.income||[]).reduce((s,i)=>s+(+i.amount||0),0)+recInc;
            const exp2=(md.expenses||[]).reduce((s,i)=>s+(+i.amount||0),0)+recExp;
            const isSelected=m===selMonth;
            return <div key={m} onClick={()=>{setSelMonth(m);setShowYear(false);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${border}`,cursor:"pointer",background:isSelected?(dk?"#1A3030":"#F0FAF6"):"transparent"}}>
              <span style={{fontSize:13,fontWeight:isSelected?700:500,color:dk?"#C8E8E8":"#1C2B3A",textTransform:"capitalize"}}>{new Date(m+"-15").toLocaleDateString("pl-PL",{month:"long"})}</span>
              <div style={{display:"flex",gap:16}}>
                <span style={{fontSize:13,fontWeight:600,color:"#3DAA72"}}>{demo?"**":inc2>0?"+"+inc2.toFixed(0):"—"}</span>
                <span style={{fontSize:13,fontWeight:600,color:"#E05C5C"}}>{demo?"**":exp2>0?"-"+exp2.toFixed(0):"—"}</span>
              </div>
            </div>;
          })}
        </div>}

        <div style={{display:desk?"grid":"block",gridTemplateColumns:desk?"1fr 1fr":"unset",gap:desk?16:0,alignItems:"start"}}>
        {/* PRZYCHODY */}
        <div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div>
                <SectionLabel style={{marginBottom:0}}>Przychody</SectionLabel>
                {diffInc!==null&&<span style={{marginLeft:6,background:diffInc>=0?"#3DAA7220":"#E05C5C20",borderRadius:6,padding:"2px 6px",fontSize:10,fontWeight:700,color:diffInc>=0?"#3DAA72":"#E05C5C"}}>{diffInc>=0?"+":""}{diffInc}%</span>}
              </div>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,color:"#3DAA72",whiteSpace:"nowrap"}}>{demo?"****":totalInc.toFixed(2)} zł</span>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{const c=incCats[0];setForm({cat:c?c.name:"",subcat:"",desc:"",amount:"",date:selMonth===todayLocal().slice(0,7)?todayLocal():selMonth+"-01"});setShowAdd("income");}} style={{flex:1,padding:"8px 10px",borderRadius:10,border:"none",background:"#0A7C7C",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj</button>
              <button onClick={()=>{const c=incCats[0];setRForm({type:"income",cat:c?c.name:"",subcat:"",desc:"",amount:"",cycle:"monthly",startMonth:selMonth});setShowRecurring("income");}} style={{padding:"8px 12px",borderRadius:10,border:`1.5px solid ${border}`,background:"none",color:sub,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>↻</button>
            </div>
          </div>
          {practiceCats.length>0&&<>
            <div style={{padding:"6px 16px",background:dk?"#0F1F1F":"#F0F9F5",fontSize:10,fontWeight:700,color:"#3DAA72",textTransform:"uppercase",letterSpacing:.5}}>Praktyka (auto)</div>
            {practiceCats.map(c=><div key={c.label} style={{display:"flex",justifyContent:"space-between",padding:"9px 16px",borderBottom:`1px solid ${border}`}}>
              <span style={{fontSize:13,color:dk?"#C8E8E8":"#1C2B3A"}}>{c.label}</span>
              <span style={{fontWeight:700,fontSize:13,color:"#3DAA72"}}>{demo?"****":c.v.toFixed(2)} zł</span>
            </div>)}
          </>}
          {renderItems("income",incCats,"#3DAA72")}
          {(monthData.income||[]).length===0&&practiceCats.length===0&&recurringInc.length===0&&<div style={{padding:16,textAlign:"center",color:sub,fontSize:13}}>Brak przychodów</div>}
        </div>

        {/* KOSZTY */}
        <div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div>
                <SectionLabel style={{marginBottom:0}}>Koszty</SectionLabel>
                {diffExp!==null&&<span style={{marginLeft:6,background:diffExp<=0?"#3DAA7220":"#E05C5C20",borderRadius:6,padding:"2px 6px",fontSize:10,fontWeight:700,color:diffExp<=0?"#3DAA72":"#E05C5C"}}>{diffExp>=0?"+":""}{diffExp}%</span>}
              </div>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,color:"#E05C5C",whiteSpace:"nowrap"}}>{demo?"****":totalExp.toFixed(2)} zł</span>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{const c=expCats[0];setForm({cat:c?c.name:"",subcat:"",desc:"",amount:"",date:selMonth===todayLocal().slice(0,7)?todayLocal():selMonth+"-01"});setShowAdd("expense");}} style={{flex:1,padding:"8px 10px",borderRadius:10,border:"none",background:"#E05C5C",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>+ Dodaj</button>
              <button onClick={()=>{const c=expCats[0];setRForm({type:"expense",cat:c?c.name:"",subcat:"",desc:"",amount:"",cycle:"monthly",startMonth:selMonth});setShowRecurring("expense");}} style={{padding:"8px 12px",borderRadius:10,border:`1.5px solid ${border}`,background:"none",color:sub,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>↻</button>
            </div>
          </div>
          {renderItems("expense",expCats,"#E05C5C")}
          {(monthData.expenses||[]).length===0&&recurringExp.length===0&&<div style={{padding:16,textAlign:"center",color:sub,fontSize:13}}>Brak kosztów</div>}
        </div>
        </div>{/* end side-by-side grid */}

        {/* HISTORIA MIESIĄCA */}
        {(()=>{
          const allEntries=[
            ...(practiceCats.map(c=>({id:"prac-"+c.label,date:selMonth+"-01",cat:"Praktyka",subcat:c.label,desc:c.label+" (auto)",amount:c.v,type:"income"}))),
            ...(recurringInc.map(r=>({id:"rec-"+r.id,date:selMonth+"-"+(r.dayOfMonth||1).toString().padStart(2,"0"),cat:r.cat,subcat:r.subcat||"",desc:recDesc(r),amount:recAmt(r),type:"income"}))),
            ...(recurringExp.map(r=>({id:"rec-"+r.id,date:selMonth+"-"+(r.dayOfMonth||1).toString().padStart(2,"0"),cat:r.cat,subcat:r.subcat||"",desc:recDesc(r),amount:recAmt(r),type:"expense"}))),
            ...(monthData.income||[]).map(i=>({...i,type:"income",date:i.date||selMonth+"-01"})),
            ...(monthData.expenses||[]).map(e=>({...e,type:"expense",date:e.date||selMonth+"-01"})),
          ].sort((a,b)=>b.date.localeCompare(a.date)||(a.type==="income"?-1:1));
          if(!allEntries.length)return null;
          return <div style={{background:bg2,borderRadius:16,marginBottom:12,boxShadow:dk?"0 2px 14px rgba(0,0,0,.22)":"0 2px 14px rgba(16,40,40,.06)",overflow:"hidden"}}>
            <SectionLabel style={{padding:"10px 16px",borderBottom:`1px solid ${border}`,marginBottom:0}}>Wszystkie wpisy</SectionLabel>
            {allEntries.map((e,i)=>{
              const isPrac=String(e.id).startsWith("prac-");
              const isRec=String(e.id).startsWith("rec-");
              const handleClick=isPrac?null:isRec?()=>{
                const rid=+String(e.id).slice(4);
                const r=(budget.recurring||[]).find(x=>x.id===rid);
                if(r)setEditRecurringOverride({r,type:e.type});
              }:()=>{
                setForm({cat:e.cat,subcat:e.subcat||"",desc:e.desc||"",amount:String(e.amount),date:e.date||selMonth+"-01"});
                setEditItem({type:e.type,item:e});
              };
              return <div key={e.id||i} onClick={handleClick||undefined}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 16px",borderBottom:i<allEntries.length-1?`1px solid ${border}`:"none",cursor:isPrac?"default":"pointer"}}>
                <div style={{minWidth:0,flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:dk?"#C8E8E8":"#1C2B3A",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{demo?"••••":e.desc||e.cat}</div>
                  <div style={{fontSize:11,color:sub,marginTop:1}}>{e.cat}{e.subcat?" · "+e.subcat:""} · {new Date(e.date+"T12:00:00").toLocaleDateString("pl-PL",{day:"numeric",month:"short"})}{isRec?" · ↻":isPrac?" · auto":""}</div>
                </div>
                <span style={{fontWeight:700,fontSize:13,color:e.type==="income"?"#3DAA72":"#E05C5C",flexShrink:0,marginLeft:8}}>{e.type==="income"?"+":"-"}{demo?"****":(+e.amount).toFixed(2)} zł</span>
              </div>;
            })}
          </div>;
        })()}

        {showAdd&&<BudgetItemForm type={showAdd} cats={showAdd==="income"?incCats:expCats} form={form} setForm={setForm} title={showAdd==="income"?"Nowy przychód":"Nowy koszt"} onSave={saveAdd} onSaveAndNext={saveAddAndNext} onClose={()=>setShowAdd(null)}/>}

        {editItem&&<BudgetEditItemForm
          cats={getCats(editItem.type)}
          initial={form}
          selMonth={selMonth}
          onSave={saveEdit}
          onDelete={()=>delItem(editItem.type,editItem.item.id)}
          onClose={()=>setEditItem(null)}
          onFormChange={setForm}
        />}

        {showRecurring&&<BudgetRecurringForm
          type={showRecurring}
          cats={getCats(showRecurring)}
          initial={rForm}
          selMonth={selMonth}
          dk={dk}
          border={border}
          title={showRecurring==="income"?"Nowy cykliczny przychód":"Nowy cykliczny koszt"}
          onSave={(f)=>{setBudget(b=>({...b,recurring:[...(b.recurring||[]),{...f,id:Date.now(),amount:+f.amount}]}));setShowRecurring(null);}}
          onClose={()=>setShowRecurring(null)}
        />}

        {editRecurringOverride&&<BudgetRecurringOverrideForm
          r={editRecurringOverride.r}
          selMonth={selMonth}
          overrideVal={recOverrides[editRecurringOverride.r.id]}
          dk={dk}
          border={border}
          onSave={(ov)=>{
            setMonthData(d=>({...d,recurringOverrides:{...(d.recurringOverrides||{}),[editRecurringOverride.r.id]:ov}}));
            setEditRecurringOverride(null);
          }}
          onReset={()=>{
            const ov={...(monthData.recurringOverrides||{})};
            delete ov[editRecurringOverride.r.id];
            setMonthData(d=>({...d,recurringOverrides:ov}));
            setEditRecurringOverride(null);
          }}
          onEditGlobal={()=>{
            const r=editRecurringOverride.r;
            setRForm({type:r.type,cat:r.cat,subcat:r.subcat||"",desc:r.desc,amount:String(r.amount),cycle:"monthly",startMonth:(r.startMonth||selMonth+"-01").length===7?(r.startMonth||selMonth)+"-01":(r.startMonth||selMonth+"-01"),endMonth:r.endMonth?(r.endMonth.length===7?r.endMonth+"-01":r.endMonth):""});
            setEditRecurring(r);
            setEditRecurringOverride(null);
          }}
          onClose={()=>setEditRecurringOverride(null)}
        />}

        {editRecurring&&<BudgetEditRecurringForm
          type={editRecurring.type}
          cats={getCats(editRecurring.type)}
          initial={rForm}
          selMonth={selMonth}
          dk={dk}
          border={border}
          onSave={(f)=>{setBudget(b=>({...b,recurring:(b.recurring||[]).map(r=>r.id===editRecurring.id?{...r,...f,amount:+f.amount}:r)}));setEditRecurring(null);}}
          onDelete={()=>deleteRecurring(editRecurring.id)}
          onClose={()=>setEditRecurring(null)}
        />}

        {showScanner&&<ReceiptScanner
          onClose={()=>setShowScanner(false)}
          onConfirm={onScannerConfirm}
          expCats={expCats}
          incCats={incCats}
          memory={receiptMemory}
          setMemory={setReceiptMemory}
          selMonth={selMonth}
          existingExpenses={(monthData.expenses||[])}
          anthropicKey={anthropicKey}
        />}

        {showCatMgr&&<Modal title="Zarządzaj kategoriami" onClose={()=>setShowCatMgr(false)}>
          <CatMgrSection type="income" cats={rawIncCats} color="#3DAA72" border={border} sub={sub} dk={dk} editCat={editCat} setEditCat={setEditCat} moveCat={moveCat} renameCat={renameCat} delCat={delCat} addSub={addSub} moveSub={moveSub} renameSub={renameSub} delSub={delSub} addCat={addCat}/>
          <CatMgrSection type="expense" cats={rawExpCats} color="#E05C5C" border={border} sub={sub} dk={dk} editCat={editCat} setEditCat={setEditCat} moveCat={moveCat} renameCat={renameCat} delCat={delCat} addSub={addSub} moveSub={moveSub} renameSub={renameSub} delSub={delSub} addCat={addCat}/>
        </Modal>}
      </div>;
    }


    const emptyNFZ = () => ({patientName:"",address:"",phone:"",hasDisabilityCert:false,wheelchairModel:"",orderDate:"",notes:"",source:""});
