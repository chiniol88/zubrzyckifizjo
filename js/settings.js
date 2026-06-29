    function SocialLinks({settings,setSettings,dk,txt,sub,border}) {
      const [links,setLinks]=React.useState(()=>settings.socialLinks||[]);
      const saveToSettings=(newLinks)=>setSettings(s=>({...s,socialLinks:newLinks}));
      const add=()=>{const newLinks=[...links,{id:Date.now(),name:"",url:""}];setLinks(newLinks);saveToSettings(newLinks);};
      const upd=(id,field,val)=>setLinks(ls=>ls.map(l=>l.id===id?{...l,[field]:val}:l));
      const blur=(newLinks)=>saveToSettings(newLinks);
      const del=(id)=>{const newLinks=links.filter(l=>l.id!==id);setLinks(newLinks);saveToSettings(newLinks);};
      const inp=(extra={})=>({padding:"9px 12px",borderRadius:10,border:`1.5px solid ${border}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit",outline:"none",...extra});
      return <div style={{paddingTop:8,paddingBottom:4}}>
        {links.length===0&&<div style={{fontSize:13,color:sub,padding:"8px 0 12px"}}>Brak linków — dodaj pierwszy poniżej.</div>}
        {links.map((l,i)=><div key={l.id} style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:13,color:sub,minWidth:20,textAlign:"right"}}>{i+1}.</span>
          <input value={l.name} onChange={e=>upd(l.id,"name",e.target.value)} onBlur={()=>blur(links.map(x=>x.id===l.id?{...x,name:x.name}:x))} placeholder="Nazwa (np. Facebook)" style={{...inp(),flex:"0 0 120px"}}/>
          <input value={l.url} onChange={e=>upd(l.id,"url",e.target.value)} onBlur={()=>blur(links.map(x=>x.id===l.id?{...x,url:x.url}:x))} placeholder="https://..." style={{...inp(),flex:1,minWidth:0}}/>
          {l.url&&<a href={l.url} target="_blank" rel="noreferrer" style={{fontSize:18,textDecoration:"none"}}>🔗</a>}
          <button onClick={()=>del(l.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#E05C5C",padding:"0 2px",flexShrink:0}}>×</button>
        </div>)}
        <button onClick={add} style={{background:dk?"#1E3A3A":"#F2F5F7",border:"none",borderRadius:10,padding:"9px 16px",fontSize:13,fontWeight:600,color:"#0A7C7C",cursor:"pointer",fontFamily:"inherit",width:"100%",textAlign:"left"}}>+ Dodaj kolejny</button>
      </div>;
    }

    function ImportCSV({setRentals,setFinances,dk,txt,sub}) {
      const [csv,setCsv]=useState("");
      const [parsed,setParsed]=useState(null);
      const [done,setDone]=useState(false);

      const parseDate=s=>{
        if(!s||!s.trim())return"";
        s=s.trim();
        if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;
        const m=s.match(/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{4})$/);
        if(m)return`${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`;
        return s;
      };

      const parseNum=s=>{
        if(!s||!String(s).trim())return 0;
        return parseFloat(String(s).trim().replace(",","."))||0;
      };

      const parseRows=()=>{
        const lines=csv.trim().split("\n").filter(l=>l.trim());
        const rows=[];
        for(const line of lines){
          const sep=line.includes("\t")?"\t":line.includes(";")?";":","
          const cols=line.split(sep).map(c=>c.trim().replace(/^"|"$/g,""));
          if(!cols[0]&&!cols[2])continue;
          rows.push({
            patientName:cols[0]||"",
            phone:cols[1]||"",
            equipment:cols[2]||"",
            startDate:parseDate(cols[3]),
            endDate:parseDate(cols[4]||""),
            amount:parseNum(cols[5]),
            amountPaid:parseNum(cols[6]),
            notes:cols[7]||""
          });
        }
        setParsed(rows);
        setDone(false);
      };

      const doImport=()=>{
        const now=Date.now();
        const today=todayLocal();
        const newRentals=parsed.map((r,i)=>{
          const pid=now+i;
          const isFinished=r.endDate&&r.endDate<today;
          const payId=now+10000+i;
          const payments=r.amountPaid>0?[{id:payId,amount:r.amountPaid,date:r.endDate||r.startDate||today}]:[];
          return{
            id:pid,status:isFinished?"zakończone":"aktywne",
            equipment:r.equipment,patientName:r.patientName,phone:r.phone,
            address:"",startDate:r.startDate,startAllDay:true,endDate:r.endDate,endAllDay:true,
            renewable:false,amount:r.amount||"",amountPaid:r.amountPaid||0,
            payments,transport:"",notes:r.notes,source:"import"
          };
        });
        const newFinances=[];
        parsed.forEach((r,i)=>{
          if(r.amountPaid>0){
            const payId=now+10000+i;
            newFinances.push({
              id:now+20000+i,sourceId:"payment-"+payId,
              date:r.endDate||r.startDate||today,
              type:"przychód",category:"Wypożyczalnia",amount:r.amountPaid,
              description:"Wypożyczenie – "+r.patientName+(r.equipment?" ("+r.equipment+")":"")
            });
          }
        });
        setRentals(rs=>[...newRentals,...(rs||[])]);
        if(newFinances.length>0)setFinances(fs=>[...newFinances,...(fs||[])]);
        setDone(true);setCsv("");setParsed(null);
      };

      const rowCount=csv.trim()?csv.trim().split("\n").filter(l=>l.trim()).length:0;
      return <div style={{padding:"12px 0"}}>
        <div style={{fontSize:12,color:sub,marginBottom:8,lineHeight:1.6}}>
          Wklej dane z Excela lub Google Sheets (Tab lub średnik jako separator):<br/>
          <b style={{color:txt}}>Kolumny:</b> pacjent · telefon · sprzęt · data_od · data_do · kwota · zapłacono · notatki
        </div>
        {done&&<div style={{fontSize:13,color:"#3DAA72",marginBottom:8,fontWeight:600}}>✓ Import zakończony pomyślnie!</div>}
        <textarea value={csv} onChange={e=>{setCsv(e.target.value);setParsed(null);setDone(false);}} rows={6}
          placeholder={"Jan Kowalski\t600123456\tCPM Artromot K1\t01.03.2024\t14.03.2024\t420\t420"}
          style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:13,fontFamily:"inherit",boxSizing:"border-box",resize:"vertical"}}
        />
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button onClick={parseRows} disabled={!csv.trim()} style={{flex:1,padding:"9px",borderRadius:10,background:"#E6F4F4",border:"none",fontWeight:700,fontSize:13,color:"#0A7C7C",cursor:csv.trim()?"pointer":"default",fontFamily:"inherit"}}>
            Podgląd ({rowCount} {rowCount===1?"wiersz":rowCount<5?"wiersze":"wierszy"})
          </button>
          {parsed&&parsed.length>0&&<button onClick={doImport} style={{flex:1,padding:"9px",borderRadius:10,background:"#0A7C7C",border:"none",fontWeight:700,fontSize:13,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>
            Importuj {parsed.length} →
          </button>}
        </div>
        {parsed&&parsed.length>0&&<div style={{marginTop:12,overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Pacjent","Sprzęt","Od","Do","Kwota","Zapłacono"].map(h=><th key={h} style={{textAlign:"left",padding:"4px 6px",color:sub,fontWeight:700,borderBottom:`1px solid ${dk?"#2A4040":"#E4EAF0"}`}}>{h}</th>)}</tr></thead>
            <tbody>
              {parsed.slice(0,6).map((r,i)=><tr key={i}>
                <td style={{padding:"4px 6px",color:txt}}>{r.patientName||"—"}</td>
                <td style={{padding:"4px 6px",color:txt}}>{r.equipment||"—"}</td>
                <td style={{padding:"4px 6px",color:txt}}>{r.startDate||"—"}</td>
                <td style={{padding:"4px 6px",color:txt}}>{r.endDate||"—"}</td>
                <td style={{padding:"4px 6px",color:txt}}>{r.amount||"—"}</td>
                <td style={{padding:"4px 6px",color:txt}}>{r.amountPaid||"—"}</td>
              </tr>)}
              {parsed.length>6&&<tr><td colSpan={6} style={{padding:"4px 6px",color:sub,fontStyle:"italic"}}>...i {parsed.length-6} więcej</td></tr>}
            </tbody>
          </table>
        </div>}
      </div>;
    }

    function Settings({dark,setDark,settings,setSettings,exportData,importData,demo,setDemo,setRentals,setFinances}) {
      const dk=dark;
      const bg=dk?"#0F1F1F":"#fff";
      const sec=dk?"#0A1A1A":"#F2F5F7";
      const txt=dk?"#E8F5F5":"#1C2B3A";
      const sub="#7A8FA6";
      const Row=({label,children})=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${dk?"#1A3030":"#F0F4F8"}`}}><span style={{fontSize:14,color:txt}}>{label}</span>{children}</div>;
      const Toggle=({val,onToggle})=><div onClick={onToggle} style={{width:44,height:24,borderRadius:12,background:val?"#0A7C7C":"#D0DCE8",cursor:"pointer",position:"relative",transition:"background 0.2s"}}><div style={{position:"absolute",top:3,left:val?23:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/></div>;
      const Sec=({title,children})=><div style={{background:bg,borderRadius:16,padding:"4px 16px",marginBottom:12}}><div style={{fontSize:11,fontWeight:700,color:sub,letterSpacing:1,paddingTop:12,paddingBottom:4}}>{title}</div>{children}</div>;
      return <div style={{padding:"16px 12px 20px",background:sec,minHeight:"100vh"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:txt,marginBottom:16}}>Ustawienia</div>

        <Sec title="KONTO">
          <Row label="Zalogowany"><span style={{fontSize:13,color:sub}}>✓ aktywna sesja</span></Row>
          <Row label="Wyloguj się">
            <button onClick={()=>{supaSignOut();window.location.reload();}} style={{background:"#FEE2E2",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#E05C5C",cursor:"pointer",fontFamily:"inherit"}}>Wyloguj</button>
          </Row>
        </Sec>
        <Sec title="WYGLĄD">
          <Row label="Tryb ciemny"><Toggle val={dark} onToggle={()=>setDark(d=>!d)}/></Row>
          <Row label="Tryb demo (ukryj dane)"><Toggle val={demo} onToggle={()=>setDemo(d=>!d)}/></Row>
        </Sec>
        <Sec title="IMPORT ZALEGŁYCH WYPOŻYCZEŃ">
          <ImportCSV setRentals={setRentals} setFinances={setFinances} dk={dk} txt={txt} sub={sub}/>
        </Sec>
        <Sec title="DANE">
          <Row label="Eksport kopii zapasowej">
            <button onClick={exportData} style={{background:"#0A7C7C",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",fontFamily:"inherit"}}>⬇️ Pobierz JSON</button>
          </Row>
          <Row label="Importuj kopię zapasową">
            <label style={{background:"#E6F4F4",border:"none",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:700,color:"#0A7C7C",cursor:"pointer"}}>
              ⬆️ Wgraj JSON
              <input type="file" accept=".json" onChange={importData} style={{display:"none"}}/>
            </label>
          </Row>
          <Row label="Auto-przypomnienie o backupie o 20:00">
            <Toggle val={settings.backupReminder!==false} onToggle={()=>setSettings(s=>({...s,backupReminder:s.backupReminder===false?true:false}))}/>
          </Row>
        </Sec>
        <Sec title="INTEGRACJE">
          <div style={{padding:"12px 0",borderBottom:`1px solid ${dk?"#1A3030":"#F0F4F8"}`}}>
            <div style={{fontSize:14,color:txt,marginBottom:8}}>Klucz API Anthropic</div>
            <div style={{fontSize:12,color:sub,marginBottom:8}}>Wymagany do skanowania paragonów. Wygeneruj na console.anthropic.com</div>
            <input
              type="password"
              value={settings.anthropicKey||""}
              onChange={e=>setSettings(s=>({...s,anthropicKey:e.target.value}))}
              placeholder="sk-ant-..."
              style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${dk?"#2A4040":"#E4EAF0"}`,background:dk?"#0F1F1F":"#FAFCFD",color:dk?"#E8F5F5":"#1C2B3A",fontSize:14,fontFamily:"inherit",boxSizing:"border-box"}}
            />
            {settings.anthropicKey&&<div style={{fontSize:12,color:"#3DAA72",marginTop:6}}>✓ Klucz zapisany</div>}
          </div>
        </Sec>
        <Sec title="LINKI — MEDIA SPOŁECZNOŚCIOWE"><SocialLinks settings={settings} setSettings={setSettings} dk={dk} txt={txt} sub={sub} border={dk?"#2A4040":"#E4EAF0"}/></Sec>
        <Sec title="INFORMACJE">
          <Row label="Wersja aplikacji"><span style={{fontSize:13,color:sub}}>ZubrzyckiFizjo 1.0</span></Row>
        </Sec>
      </div>;
    }
