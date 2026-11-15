    // ── ZAMKNIĘCIE MIESIĄCA (Finanse → ✅): własna lista powtarzalnych spraw do ogarnięcia po każdym miesiącu ──────────────
    // Wzór listy (settings.monthClose.items) tworzy użytkownik; dla każdego miesiąca ta sama lista jest odhaczana osobno
    // (settings.monthClose.done["RRRR-MM"][idPunktu] = data odhaczenia). Zapis idzie do ustawień aplikacji (wspólne na urządzeniach).
    const MC_SEED=[
      {id:"s1",text:"Wpisać koszty reklamy z Google Ads (szyny / wózki / balkoniki, z VAT)",note:"Budżet → Firma → Marketing szyny / wózki / balkoniki. Przycisk × 1,23 doda VAT do kwoty netto."},
      {id:"s2",text:"Sprawdzić i przypisać faktury kosztowe",note:""},
      {id:"s3",text:"Opłacić wszystkie koszty i zobowiązania",note:""},
      {id:"s4",text:"Porównać raport miesięczny z kasy fiskalnej (Novitus) z przychodem w apce",note:"Raport miesięczny (251) zdejmuje się po zakończeniu miesiąca."},
      {id:"s5",text:"VAT-9M za usługi z Google (import usług z UE)",note:"Zwykle do 25. następnego miesiąca — sprawdź termin u księgowej."},
      {id:"s6",text:"Opłacić składki ZUS i podatek",note:""},
      {id:"s7",text:"Wysłać dokumenty księgowej",note:""},
      {id:"s8",text:"Sprawdzić nieopłacone wypożyczenia i zaległe okresy cykliczne",note:""},
      {id:"s9",text:"Sprawdzić przeglądy i uwagi do szyn w Magazynie",note:""},
      {id:"s10",text:"Sprawdzić, czy daty zwrotów szyn są aktualne",note:"Wypożyczenia zwrócone wcześniej mają skrócić datę końca (inaczej obłożenie jest zawyżone)."},
      {id:"s11",text:"Dodać migawkę majątku (Finanse → 💼)",note:""},
      {id:"s12",text:"Przejrzeć Statystyki: wynik, koszt klienta, czy reklamę włączyć lub wyłączyć",note:""},
      {id:"s13",text:"Pobrać kopię zapasową (Ustawienia → Dane)",note:""}
    ];

    // Zamknięcia miesięcy zaczynają się od października 2026 — wcześniejsze miesiące nie mają listy (nie da się do nich przejść)
    const MC_FIRST="2026-10";

    function MonthClose({settings,setSettings}) {
      const dk=useContext(DarkCtx);
      const today=todayLocal(),curYM=today.slice(0,7);
      const mc=(settings&&settings.monthClose)||{items:MC_SEED,done:{}};
      const items=Array.isArray(mc.items)?mc.items:[],done=mc.done||{};
      const [ym,setYm]=useState(()=>{const p=ymAdd(curYM,-1);return p<MC_FIRST?MC_FIRST:p;});   // domyślnie miesiąc, który się właśnie skończył
      const [edit,setEdit]=useState(false);
      const [newText,setNewText]=useState("");
      const textC=dk?"#E8F5F5":"#1C2B3A",subC=dk?"#93A9C4":"#5E7288",borderC=dk?"#2A3A56":"#E4EAF3",bg=dk?"#18202F":"#fff";
      const GREEN="#3DAA72",BLUE="#3E6FB0";
      const upd=fn=>setSettings(s=>{const b=(s&&s.monthClose)||{items:MC_SEED,done:{}};return {...s,monthClose:fn({items:Array.isArray(b.items)?b.items:[],done:b.done||{}})};});
      const toggle=id=>upd(b=>{const d={...b.done};const m={...(d[ym]||{})};if(m[id])delete m[id];else m[id]=today;d[ym]=m;return {...b,done:d};});
      const addItem=(text,note)=>{const t=String(text||"").trim();if(!t)return;upd(b=>({...b,items:[...b.items,{id:"i"+Date.now()+Math.floor(Math.random()*1000),text:t,note:note||""}]}));};
      const patch=(id,p)=>upd(b=>({...b,items:b.items.map(x=>x.id===id?{...x,...p}:x)}));
      const remove=id=>{if(!window.confirm("Usunąć ten punkt z listy? Zniknie też z historii odhaczeń."))return;upd(b=>({...b,items:b.items.filter(x=>x.id!==id)}));};
      const move=(i,dir)=>upd(b=>{const a=b.items.slice(),j=i+dir;if(j<0||j>=a.length)return b;[a[i],a[j]]=[a[j],a[i]];return {...b,items:a};});
      const ids=items.map(x=>x.id);
      const cnt=m=>ids.filter(id=>done[m]&&done[m][id]).length;
      const total=items.length,nDone=cnt(ym),allDone=total>0&&nDone===total;
      const suggestions=MC_SEED.filter(s=>!items.some(x=>x.id===s.id||x.text===s.text));
      const monthName=m=>new Date(m+"-15").toLocaleDateString("pl-PL",{month:"long",year:"numeric"});
      const hist=Object.keys(done).filter(m=>m>=MC_FIRST&&cnt(m)>0).sort().reverse().slice(0,12);
      const chip={padding:"6px 12px",borderRadius:14,border:"none",cursor:"pointer",fontWeight:600,fontSize:12,background:dk?"#1E2F4A":"#E1E9F5",color:dk?"#9DB8E8":BLUE,fontFamily:"inherit",textAlign:"left"};
      const inp={width:"100%",padding:"9px 11px",border:"1.5px solid "+borderC,borderRadius:10,fontSize:14,outline:"none",background:dk?"#111826":"#FAFCFD",color:textC,fontFamily:"inherit",boxSizing:"border-box"};
      const small={flexShrink:0,width:32,height:32,border:"none",borderRadius:8,background:dk?"#1E2F4A":"#F0F4FA",color:subC,fontSize:14,cursor:"pointer",fontFamily:"inherit"};
      return <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,marginBottom:12}}>
          <button onClick={()=>setYm(m=>m<=MC_FIRST?m:ymAdd(m,-1))} disabled={ym<=MC_FIRST} aria-label="Wcześniejszy miesiąc" style={{...small,width:36,height:36,opacity:ym<=MC_FIRST?.35:1}}>‹</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,color:textC,textTransform:"capitalize"}}>{monthName(ym)}</div>
            <div style={{fontSize:12,color:subC}}>{ym===curYM?"bieżący miesiąc (jeszcze trwa)":ym===ymAdd(curYM,-1)?"miesiąc do zamknięcia":ym>curYM?"":"zamknięty miesiąc"}</div>
          </div>
          <button onClick={()=>setYm(m=>ym>=curYM?m:ymAdd(m,1))} disabled={ym>=curYM} aria-label="Późniejszy miesiąc" style={{...small,width:36,height:36,opacity:ym>=curYM?.35:1}}>›</button>
        </div>

        <div style={{background:bg,border:"1px solid "+borderC,borderRadius:16,padding:"14px 14px 10px",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,fontSize:14,fontWeight:700,color:allDone?GREEN:textC}}>
            <span>{allDone?"✅ Miesiąc zamknięty":"Do zrobienia"}</span><span>{nDone} z {total}</span>
          </div>
          <div style={{height:7,borderRadius:4,background:dk?"#22304B":"#EAEFF6",marginBottom:10}}><div style={{height:"100%",width:(total?nDone/total*100:0)+"%",background:allDone?GREEN:BLUE,borderRadius:4,transition:"width .25s"}}/></div>
          {total===0&&<div style={{fontSize:13,color:subC,padding:"10px 0"}}>Lista jest pusta. Dodaj pierwszy punkt poniżej albo wybierz podpowiedź.</div>}
          {items.map((it,i)=>{
            const dd=done[ym]&&done[ym][it.id];
            if(edit)return <div key={it.id} style={{padding:"10px 0",borderTop:i?"1px solid "+borderC:"none"}}>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                <input value={it.text} onChange={e=>patch(it.id,{text:e.target.value})} style={inp} aria-label="Treść punktu"/>
                <button onClick={()=>move(i,-1)} disabled={i===0} aria-label="W górę" style={{...small,opacity:i===0?.35:1}}>↑</button>
                <button onClick={()=>move(i,1)} disabled={i===items.length-1} aria-label="W dół" style={{...small,opacity:i===items.length-1?.35:1}}>↓</button>
                <button onClick={()=>remove(it.id)} aria-label="Usuń punkt" style={{...small,color:"#E05C5C"}}>✕</button>
              </div>
              <input value={it.note||""} onChange={e=>patch(it.id,{note:e.target.value})} placeholder="Notatka (opcjonalnie)" style={{...inp,fontSize:13}} aria-label="Notatka do punktu"/>
            </div>;
            return <button key={it.id} onClick={()=>toggle(it.id)} role="checkbox" aria-checked={!!dd} style={{display:"flex",alignItems:"flex-start",gap:12,width:"100%",textAlign:"left",padding:"12px 0",border:"none",borderTop:i?"1px solid "+borderC:"none",background:"transparent",cursor:"pointer",fontFamily:"inherit"}}>
              <span style={{flexShrink:0,width:26,height:26,borderRadius:8,border:"2px solid "+(dd?GREEN:(dk?"#4A5E7C":"#B9C7DA")),background:dd?GREEN:"transparent",color:"#fff",fontSize:15,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>{dd?"✓":""}</span>
              <span style={{flex:1,minWidth:0}}>
                <span style={{display:"block",fontSize:15,lineHeight:1.4,color:textC}}>{it.text}</span>
                {it.note&&<span style={{display:"block",fontSize:12,lineHeight:1.5,color:subC,marginTop:3}}>{it.note}</span>}
              </span>
            </button>;
          })}
          <div style={{display:"flex",gap:8,marginTop:10,paddingTop:12,borderTop:"1px solid "+borderC}}>
            <input value={newText} onChange={e=>setNewText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){addItem(newText);setNewText("");}}} placeholder="Nowy punkt listy…" style={inp} aria-label="Nowy punkt"/>
            <button onClick={()=>{addItem(newText);setNewText("");}} disabled={!newText.trim()} style={{flexShrink:0,padding:"0 16px",border:"none",borderRadius:10,background:newText.trim()?BLUE:(dk?"#22304B":"#D9E2F0"),color:"#fff",fontWeight:700,fontSize:14,cursor:newText.trim()?"pointer":"default",fontFamily:"inherit"}}>+ Dodaj</button>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
            <button onClick={()=>setEdit(v=>!v)} style={{background:"transparent",border:"none",color:subC,fontSize:13,textDecoration:"underline",cursor:"pointer",padding:"6px 0",fontFamily:"inherit"}}>{edit?"✓ Gotowe":"✏️ Edytuj listę (treść, kolejność, usuwanie)"}</button>
          </div>
        </div>

        {suggestions.length>0&&<div style={{background:bg,border:"1px solid "+borderC,borderRadius:16,padding:"14px",marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:subC,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Podpowiedzi (dotknij, żeby dodać)</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {suggestions.map(s=><button key={s.id} onClick={()=>addItem(s.text,s.note)} style={chip}>+ {s.text}</button>)}
          </div>
        </div>}

        {hist.length>0&&<div style={{background:bg,border:"1px solid "+borderC,borderRadius:16,padding:"14px",marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:subC,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>Historia zamknięć</div>
          {hist.map(m=><button key={m} onClick={()=>setYm(m)} style={{display:"flex",justifyContent:"space-between",width:"100%",padding:"9px 0",border:"none",borderTop:"1px solid "+borderC,background:"transparent",cursor:"pointer",fontFamily:"inherit",fontSize:14,color:textC,textAlign:"left"}}>
            <span style={{textTransform:"capitalize",fontWeight:m===ym?700:400}}>{monthName(m)}</span>
            <span style={{color:cnt(m)===total&&total>0?GREEN:subC,fontWeight:600}}>{cnt(m)===total&&total>0?"✓ ":""}{cnt(m)} z {total}</span>
          </button>)}
        </div>}
      </div>;
    }
