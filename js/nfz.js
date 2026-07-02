    const nextOrderDate = (cas) => {
      if(!cas.orderDate) return null;
      const [y,m,d] = cas.orderDate.split("-").map(Number);
      const years = cas.hasDisabilityCert ? 1 : 4;
      return new Date(y+years,m-1,d).getFullYear()+"-"+String(new Date(y+years,m-1,d).getMonth()+1).padStart(2,"0")+"-"+String(new Date(y+years,m-1,d).getDate()).padStart(2,"0");
    };

    function NFZ({nfzCases,setNfzCases,initialSel,onSelCleared,setFinances,patients,setPatients,allClients}) {
      const dk = useContext(DarkCtx);
      const demo = useDemo();
      const [showAdd,setShowAdd] = useState(false);
      const [form,setForm] = useState(emptyNFZ);
      const [selId,setSelId] = useState(null);
      const [editForm,setEditForm] = useState(null);
      const [confirmDel,setConfirmDel] = useState(false);
      const [toast,setToast] = useState(null);
      const [tab,setTab] = useState("orzeczenie");
      const [payModal,setPayModal] = useState(null); // {casId, date, name}
      const [payAmount,setPayAmount] = useState("");

      useEffect(()=>{if(initialSel!=null){setSelId(initialSel);}}, [initialSel]);
      const closeDetail=()=>{setSelId(null);if(onSelCleared)onSelCleared();};

      const cases = nfzCases || [];
      const today = todayLocal();

      const withCert  = cases.filter(c=>c.hasDisabilityCert);
      const withoutCert = cases.filter(c=>!c.hasDisabilityCert);
      const sortByNext = arr => [...arr].sort((a,b)=>{
        const na=nextOrderDate(a)||"9999", nb=nextOrderDate(b)||"9999";
        return na.localeCompare(nb);
      });

      if (selId !== null) {
        const cas = cases.find(c => c.id === selId);
        if (!cas) { setSelId(null); return null; }
        const nd = nextOrderDate(cas);
        const daysLeft = nd ? dateDiff(today, nd) : null;
        return <>
          <div>
            <button onClick={()=>setSelId(null)} style={{background:"none",border:"none",display:"flex",alignItems:"center",gap:6,color:"#0A7C7C",fontWeight:600,cursor:"pointer",padding:"20px 20px 0",fontFamily:"inherit",fontSize:14}}>
              <Ico d={I.back} s={18} c="#0A7C7C"/> Wózki
            </button>
            <div style={{padding:"16px 20px 0"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800}}>{demo?"Pacjent":cas.patientName}</div>
                <Btn small variant="secondary" onClick={()=>setEditForm({...cas})}>✏️ Edytuj</Btn>
              </div>
              <Card style={{marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:700,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Dane pacjenta</div>
                <div style={{display:"grid",gap:10}}>
                  {cas.phone&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:14,color:dk?"#C8E8E8":"#1C2B3A"}}>{maskPhone(demo,cas.phone)}</span>
                    {!demo&&<div style={{display:"flex",gap:6}}>
                      <a href={`tel:${cas.phone.replace(/\s/g,"")}`} style={{textDecoration:"none"}}><Btn small variant="secondary"><Ico d={I.ph} s={15} c="#0A7C7C"/> Zadzwoń</Btn></a>
                      <a href={`sms:${cas.phone.replace(/\s/g,"")}`} style={{textDecoration:"none"}}><Btn small variant="secondary"><Ico d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" s={15} c="#0A7C7C"/> SMS</Btn></a>
                    </div>}
                  </div>}
                  {cas.address&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:14,color:"#7A8FA6",flex:1,paddingRight:8}}>{maskAddr(demo,cas.address)}</span>
                    {!demo&&<a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cas.address)}`} target="_blank" rel="noreferrer" style={{textDecoration:"none",flexShrink:0}}><Btn small variant="secondary">🗺️ Trasa</Btn></a>}
                  </div>}
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:18,height:18,borderRadius:5,border:`2px solid ${cas.hasDisabilityCert?"#3DAA72":"#E4EAF0"}`,background:cas.hasDisabilityCert?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {cas.hasDisabilityCert&&<span style={{color:"#fff",fontSize:11}}>✓</span>}
                    </div>
                    <span style={{fontSize:14,color:dk?"#C8E8E8":"#1C2B3A"}}>Orzeczenie o niepełnosprawności (stopień znaczny)</span>
                  </div>
                </div>
              </Card>
              {(cas.wheelchairModel||cas.orderDate)&&<Card style={{marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:700,color:"#7A8FA6",textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Wózek</div>
                {cas.wheelchairModel&&<div style={{marginBottom:6}}><span style={{fontSize:12,color:"#7A8FA6"}}>Model: </span><span style={{fontWeight:600,fontSize:14}}>{cas.wheelchairModel}</span></div>}
                {cas.orderDate&&<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                  <div><span style={{fontSize:12,color:"#7A8FA6"}}>Data zamówienia: </span><span style={{fontWeight:600,fontSize:14}}>{cas.orderDate}</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {cas.realized&&<span style={{fontSize:12,color:"#3DAA72",fontWeight:600}}>✓ Zrealizowano</span>}
                    <div onClick={()=>{if(!cas.realized){setPayModal({casId:cas.id,date:cas.orderDate,name:cas.patientName});setPayAmount("");}else{setNfzCases(cs=>cs.map(x=>x.id===cas.id?{...x,realized:false}:x));setToast("Cofnięto realizację");}}}
                      style={{width:24,height:24,borderRadius:7,border:`2px solid ${cas.realized?"#3DAA72":"#E4EAF0"}`,background:cas.realized?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                      {cas.realized&&<span style={{color:"#fff",fontSize:13}}>✓</span>}
                    </div>
                  </div>
                </div>}
                {nd&&<div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #E4EAF0"}}>
                  <div style={{fontSize:12,color:"#7A8FA6",marginBottom:4}}>Kolejne zamówienie możliwe od:</div>
                  <div style={{fontWeight:700,fontSize:15}}>{nd}</div>
                  <div style={{fontSize:13,marginTop:4,color:daysLeft<=0?"#3DAA72":daysLeft<=30?"#F4A261":"#7A8FA6"}}>
                    {daysLeft<=0?"✓ Można już składać wniosek":daysLeft===1?"Jutro":daysLeft<0?`${Math.abs(daysLeft)} dni temu`:`za ${daysLeft} dni`}
                  </div>
                </div>}
              </Card>}
              {cas.notes&&<Card style={{marginBottom:10,background:"#FFFBF5",border:"1.5px solid #F4A26130"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#F4A261",textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Notatki</div>
                <div style={{fontSize:14,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{cas.notes}</div>
              </Card>}
              <Btn variant="danger" style={{width:"100%",justifyContent:"center",marginTop:4}} onClick={()=>setConfirmDel(true)}>🗑️ Usuń</Btn>
            </div>
          </div>
          {editForm&&<Modal title="Edytuj" onClose={()=>setEditForm(null)}>
            <PatientPicker label="Klient" value={editForm.patientName} onChange={v=>setEditForm(f=>({...f,patientName:v}))} onSelect={p=>setEditForm(f=>({...f,patientName:p.name,phone:p.phone||f.phone,address:p.address||f.address,patientId:p.id}))} patients={allClients||patients||[]}/>
            <Inp label="Adres" value={editForm.address||""} onChange={v=>setEditForm(f=>({...f,address:v}))} placeholder="ul. Przykładowa 1, Gliwice"/>
            <Inp label="Telefon" value={editForm.phone||""} onChange={v=>setEditForm(f=>({...f,phone:v}))} type="tel"/>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,cursor:"pointer"}} onClick={()=>setEditForm(f=>({...f,hasDisabilityCert:!f.hasDisabilityCert}))}>
              <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${editForm.hasDisabilityCert?"#3DAA72":"#E4EAF0"}`,background:editForm.hasDisabilityCert?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {editForm.hasDisabilityCert&&<span style={{color:"#fff",fontSize:13}}>✓</span>}
              </div>
              <span style={{fontSize:14,fontWeight:500}}>Orzeczenie o niepełnosprawności (stopień znaczny)</span>
            </div>
            <Inp label="Model wózka" value={editForm.wheelchairModel||""} onChange={v=>setEditForm(f=>({...f,wheelchairModel:v}))} placeholder="np. Wózek aktywny X"/>
            <Inp label="Data zamówienia" value={editForm.orderDate||""} onChange={v=>setEditForm(f=>({...f,orderDate:v}))} type="date"/>
            <Sel label="Skąd dowiedział się o wózku?" value={editForm.source||""} onChange={v=>setEditForm(f=>({...f,source:v}))} options={[{value:"",label:"— nie wiem / nie podał"},...RENTAL_SOURCES.map(s=>({value:s.value,label:s.label}))]}/>
            <Txa label="Notatki" value={editForm.notes||""} onChange={v=>setEditForm(f=>({...f,notes:v}))} rows={2}/>
            <Btn style={{width:"100%",justifyContent:"center"}} onClick={()=>{setNfzCases(cs=>cs.map(x=>x.id===selId?{...x,...editForm}:x));setEditForm(null);setToast("Zapisano zmiany");}}>Zapisz zmiany</Btn>
          </Modal>}
          {confirmDel&&<Modal title="Usuń" onClose={()=>setConfirmDel(false)}>
            <div style={{fontSize:15,marginBottom:20}}>Na pewno usunąć tę pozycję?</div>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>setConfirmDel(false)}>Anuluj</Btn>
              <Btn variant="danger" style={{flex:1,justifyContent:"center"}} onClick={()=>{setFinances(fs=>fs.filter(f=>f.sourceId!=="wozek-"+selId));setNfzCases(cs=>cs.filter(x=>x.id!==selId));setConfirmDel(false);setSelId(null);}}>Usuń</Btn>
            </div>
          </Modal>}
          {payModal&&<Modal title="Kwota przychodu" onClose={()=>setPayModal(null)}>
            <div style={{fontSize:14,color:"#7A8FA6",marginBottom:14}}>{payModal.name} · {payModal.date}</div>
            <Inp label="Kwota (zł) *" value={payAmount} onChange={setPayAmount} type="number" placeholder="0"/>
            <Btn disabled={!payAmount||+payAmount<=0} style={{width:"100%",justifyContent:"center"}} onClick={()=>{
              const sid="wozek-"+payModal.casId;
              setFinances(fs=>[{id:Date.now(),sourceId:sid,date:payModal.date,type:"przychód",category:"Wózek",amount:+payAmount,description:"Wózek – "+payModal.name},...(fs||[])]);
              setNfzCases(cs=>cs.map(x=>x.id===payModal.casId?{...x,realized:true}:x));
              setPayModal(null);setPayAmount("");setToast("Dodano do finansów");
            }}>Zapisz i oznacz jako zrealizowany</Btn>
          </Modal>}
          {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
        </>;
      }

      const listItems = sortByNext(tab==="orzeczenie" ? withCert : withoutCert);
      return <div>
        <div style={{padding:"28px 20px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800}}>Wózki</div>
          <Btn small onClick={()=>{setForm(emptyNFZ());setShowAdd(true);}}><Ico d={I.plus} s={16} c="#fff"/> Nowy</Btn>
        </div>
        <div style={{display:"flex",gap:6,padding:"0 20px 14px"}}>
          {[{k:"orzeczenie",l:`Z orzeczeniem (${withCert.length})`},{k:"bez",l:`Bez orzeczenia (${withoutCert.length})`}].map(t=>
            <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"8px 14px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:600,fontSize:13,whiteSpace:"nowrap",background:tab===t.k?"#0A7C7C":"#E4EAF0",color:tab===t.k?"#fff":"#7A8FA6",fontFamily:"inherit"}}>{t.l}</button>
          )}
        </div>
        <div style={{padding:"0 20px"}}>
          {listItems.length===0&&<Empty text="Brak wpisów"/>}
          {listItems.map(cas=>{
            const nd=nextOrderDate(cas);
            const dl=nd?dateDiff(today,nd):null;
            return <Card key={cas.id} onClick={()=>setSelId(cas.id)}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>{demo?"Pacjent":cas.patientName}</div>
                  <div style={{fontSize:13,color:"#7A8FA6",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                    {cas.wheelchairModel&&<span>🦽 {cas.wheelchairModel}</span>}
                    {cas.orderDate&&<span>📅 {cas.orderDate}</span>}
                    {cas.realized&&<span style={{color:"#3DAA72",fontWeight:600}}>✓ zrealizowany</span>}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0,paddingLeft:10}}>
                  <div onClick={e=>{e.stopPropagation();if(!cas.realized){setPayModal({casId:cas.id,date:cas.orderDate||"",name:cas.patientName});setPayAmount("");}else{setNfzCases(cs=>cs.map(x=>x.id===cas.id?{...x,realized:false}:x));}}}
                    style={{width:24,height:24,borderRadius:7,border:`2px solid ${cas.realized?"#3DAA72":"#E4EAF0"}`,background:cas.realized?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                    {cas.realized&&<span style={{color:"#fff",fontSize:13}}>✓</span>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    {nd&&<div style={{fontSize:12,color:dl<=0?"#3DAA72":"#7A8FA6",fontWeight:dl<=0?700:400}}>{dl<=0?"➜ można złożyć":"➜ "+nd}</div>}
                    <Ico d="M9 18l6-6-6-6" s={18} c="#7A8FA6"/>
                  </div>
                </div>
              </div>
            </Card>;
          })}
        </div>
        {showAdd&&<Modal title="Nowy wózek" onClose={()=>setShowAdd(false)}>
          <PatientPicker label="Klient *" value={form.patientName} onChange={v=>setForm(f=>({...f,patientName:v}))} onSelect={p=>setForm(f=>({...f,patientName:p.name,phone:p.phone||f.phone,address:p.address||f.address,patientId:p.id}))} patients={allClients||patients||[]}/>
          <Inp label="Adres" value={form.address} onChange={v=>setForm(f=>({...f,address:v}))} placeholder="ul. Przykładowa 1, Gliwice"/>
          <Inp label="Telefon" value={form.phone} onChange={v=>setForm(f=>({...f,phone:v}))} type="tel"/>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,cursor:"pointer"}} onClick={()=>setForm(f=>({...f,hasDisabilityCert:!f.hasDisabilityCert}))}>
            <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${form.hasDisabilityCert?"#3DAA72":"#E4EAF0"}`,background:form.hasDisabilityCert?"#3DAA72":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {form.hasDisabilityCert&&<span style={{color:"#fff",fontSize:13}}>✓</span>}
            </div>
            <span style={{fontSize:14,fontWeight:500}}>Orzeczenie o niepełnosprawności (stopień znaczny)</span>
          </div>
          <Inp label="Model wózka" value={form.wheelchairModel} onChange={v=>setForm(f=>({...f,wheelchairModel:v}))} placeholder="np. Wózek aktywny X"/>
          <Inp label="Data zamówienia" value={form.orderDate} onChange={v=>setForm(f=>({...f,orderDate:v}))} type="date"/>
          <Sel label="Skąd dowiedział się o wózku?" value={form.source||""} onChange={v=>setForm(f=>({...f,source:v}))} options={[{value:"",label:"— nie wiem / nie podał"},...RENTAL_SOURCES.map(s=>({value:s.value,label:s.label}))]}/>
          <Txa label="Notatki" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} rows={2}/>
          <Btn disabled={!form.patientName} style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(!form.patientName)return;setNfzCases(cs=>[{...form,id:Date.now()},...(cs||[])]);if(setPatients&&!(patients||[]).find(p=>p.name===form.patientName)){setPatients(ps=>[...(ps||[]),{id:Date.now()+1,name:form.patientName,phone:form.phone||"",address:form.address||"",diagnosis:"",notes:"",defaultPrice:"",birthday:""}]);}setForm(emptyNFZ());setShowAdd(false);setToast("Dodano");}}>Dodaj</Btn>
        </Modal>}
        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      </div>;
    }
