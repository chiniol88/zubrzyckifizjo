    // ── MAGAZYN: czysta logika (bez Reacta, testowana osobno) ─────────────────────
    // ZASADY (żeby nic nie zginęło i wszystko było ze sobą spójne):
    // 1) stock.qty[eq] jest JEDYNYM źródłem prawdy o liczbie sztuk. Czyta je też Statystyki (obłożenie, zwrot z inwestycji).
    // 2) stock.history = [{eq,qty,prev,from}] to pojemność w danym dniu. Obłożenie liczy ją wstecz, więc zmiana liczby sztuk
    //    zawsze dopisuje wpis (whChangeQty) i nigdy nie zmienia dni sprzed daty zmiany.
    // 3) Karta = jedna sztuka z własnym kodem (tablica machines[], dawniej zakładka Serwis). "Starsze sztuki bez karty" = qty − karty.
    // 4) Powiązanie z wypożyczeniem: rentals[].machineId (opcjonalne). Czy sztuka jest wolna/wypożyczona jest WYLICZANE z wypożyczeń.

    const whQty=(stock,eq)=>(stock&&stock.qty&&stock.qty[eq])||1;
    const whCards=(machines,eq)=>(machines||[]).filter(m=>!m.archived&&(eq===undefined||m.type===eq));
    const whLegacy=(stock,machines,eq)=>Math.max(0,whQty(stock,eq)-whCards(machines,eq).length);
    const whNorm=s=>String(s==null?"":s).trim().toLowerCase();

    // Pojemność (liczba sztuk) w dniu d — ta sama reguła co capAt w occupancyForEq (finances.js)
    function whCapAt(stock,eq,d){
      const hist=((stock&&stock.history)||[]).filter(h=>h.eq===eq&&h.from).sort((a,b)=>a.from.localeCompare(b.from));
      let q=null;hist.forEach(h=>{if(h.from<=d)q=+h.qty||1;});
      if(q!==null)return q;
      return hist.length?(hist[0].prev!=null?+hist[0].prev||1:+hist[0].qty||1):whQty(stock,eq);
    }

    // Czy zmianę o delta od dnia `from` da się zapisać? Zmniejszenie nie może zejść poniżej 1 sztuki w żadnym dniu od `from` do dziś
    // (inaczej wsteczna data wycofania "zjadłaby" sztukę, której wtedy jeszcze nie było).
    function whCanChange(stock,eq,delta,from){
      const s=stock||{};
      if(!delta||whQty(s,eq)+delta<1)return false;
      if(delta>0)return true;
      const days=[from,...(s.history||[]).filter(h=>h.eq===eq&&h.from&&h.from>from).map(h=>h.from)];
      return days.every(d=>whCapAt(s,eq,d)+delta>=1);
    }

    // Zmiana liczby sztuk o delta od dnia `from` (zakup: +1, wycofanie: −1). Zwraca NOWY obiekt stock
    // (albo ten sam, gdy zmiany nie da się wykonać — patrz whCanChange).
    // Dni przed `from` zostają bez zmian, dni od `from` mają o delta więcej/mniej (także gdy data jest wsteczna).
    function whChangeQty(stock,eq,delta,from){
      const s=stock||{};
      const cur=whQty(s,eq);
      if(!whCanChange(s,eq,delta,from))return s;
      const capNow=whCapAt(s,eq,from);
      let next=(s.history||[]).map(h=>{
        if(h.eq!==eq||!h.from||h.from<=from)return h;
        const o={...h,qty:Math.max(1,(+h.qty||1)+delta)};
        if(h.prev!=null)o.prev=Math.max(1,(+h.prev||1)+delta);
        return o;
      });
      const same=next.findIndex(h=>h.eq===eq&&h.from===from&&h.prev!=null);
      if(same>=0){
        const q=Math.max(1,(+next[same].qty||1)+delta);
        next=q===(+next[same].prev||1)?next.filter((_,i)=>i!==same):next.map((h,i)=>i===same?{...h,qty:q}:h);
      } else {
        next=[...next,{eq,qty:capNow+delta,prev:capNow,from}];
      }
      return {...s,qty:{...(s.qty||{}),[eq]:cur+delta},history:next};
    }

    // Kod magazynowy: dowolny tekst, wpisywany przez użytkownika; pilnujemy tylko niepowtarzalności
    function whCodeError(machines,code,exceptId){
      const c=whNorm(code);
      if(!c)return "Wpisz kod magazynowy";
      if((machines||[]).some(m=>m.id!==exceptId&&m.code&&whNorm(m.code)===c))return "Ten kod jest już użyty";
      return "";
    }
    function whNewId(machines){let id=Date.now();while((machines||[]).some(m=>m.id===id))id++;return id;}
    function whMakeCard(machines,eq,f,today){
      return {id:whNewId(machines),type:eq,code:String(f.code||"").trim(),serialNo:String(f.serialNo||"").trim(),
        purchaseDate:f.purchaseDate||"",price:+f.price||0,lastServiceDate:"",servicePeriodDays:365,serviceLog:[],
        notes:f.notes||"",archived:false,createdAt:today};
    }
    // Nowa sztuka: karta + liczba sztuk +1 od daty zakupu (nie późniejszej niż dziś)
    function whAddCard(stock,machines,eq,f,today){
      const date=f.purchaseDate&&f.purchaseDate<=today?f.purchaseDate:today;
      const card=whMakeCard(machines,eq,{...f,purchaseDate:f.purchaseDate||today},today);
      return {stock:whChangeQty(stock,eq,1,date),machines:[...(machines||[]),card],card};
    }
    // Karta dla starszej sztuki: liczba sztuk się NIE zmienia
    function whConvertLegacy(stock,machines,eq,f,today){
      if(whLegacy(stock,machines,eq)<1)return null;
      const card=whMakeCard(machines,eq,f,today);
      return {stock,machines:[...(machines||[]),card],card};
    }
    // Wycofanie sztuki (sprzedana, zepsuta): karta do archiwum, liczba sztuk −1 od daty
    function whRetireCard(stock,machines,rentals,id,date,reason,today){
      const c=(machines||[]).find(m=>m.id===id);
      if(!c||c.archived)return {error:"Nie znaleziono tej karty"};
      if((rentals||[]).some(r=>r.machineId===id&&r.status==="aktywne"))return {error:"Ta sztuka ma aktywne wypożyczenie. Najpierw je zakończ."};
      if(whQty(stock,c.type)<2)return {error:"To ostatnia sztuka tego typu. Zarchiwizuj cały typ zamiast wycofywać sztukę."};
      const d=date&&date<=today?date:today;
      if(!whCanChange(stock,c.type,-1,d))return {error:"W wybranym terminie było tylko tyle sztuk, ile zostało. Wybierz późniejszą datę."};
      return {stock:whChangeQty(stock,c.type,-1,d),
        machines:machines.map(m=>m.id===id?{...m,archived:true,retired:true,retiredDate:d,retiredReason:reason||""}:m)};
    }
    function whRestoreCard(stock,machines,id,today){
      const c=(machines||[]).find(m=>m.id===id);
      if(!c||!c.archived||!c.retired)return {error:"Nie znaleziono tej karty"};
      const e=whCodeError(whCards(machines),c.code,id);
      if(e&&c.code)return {error:"Kod "+c.code+" jest już użyty przez inną sztukę. Zmień go i spróbuj ponownie."};
      return {stock:whChangeQty(stock,c.type,1,today),
        machines:machines.map(m=>m.id===id?{...m,archived:false,retired:false,retiredDate:"",retiredReason:""}:m)};
    }
    // Usunięcie karty możliwe tylko, gdy jest "czysta" (bez historii serwisu i wypożyczeń). Sztuka wraca do "starszych bez karty".
    function whDeleteCard(machines,rentals,id){
      const c=(machines||[]).find(m=>m.id===id);
      if(!c)return null;
      if((c.serviceLog||[]).length>0)return null;
      if((rentals||[]).some(r=>r.machineId===id))return null;
      return machines.filter(m=>m.id!==id);
    }
    // Stare wpisy z zakładki Serwis (sprzed Magazynu): bez kodu i bez żadnej historii serwisu — archiwizujemy (nic nie kasujemy)
    function whCleanOldService(machines){
      const isOld=m=>!m.archived&&!m.code&&!(m.serviceLog&&m.serviceLog.length);
      if(!(machines||[]).some(isOld))return machines;
      return machines.map(m=>isOld(m)?{...m,archived:true,archivedReason:"stary wpis Serwis (sprzed Magazynu)"}:m);
    }

    // Stan sztuki WYLICZANY z wypożyczeń: wolna / wypożyczona / zarezerwowana
    function whCardState(card,rentals){
      const linked=(rentals||[]).filter(r=>r.machineId===card.id&&r.status==="aktywne");
      const out=linked.find(r=>!r.reserved),res=linked.find(r=>r.reserved);
      return out?{kind:"out",rental:out}:res?{kind:"reserved",rental:res}:{kind:"free",rental:null};
    }
    // Serwis: bez daty = "brak danych" (nie alarmujemy), dalej jak w starej zakładce Serwis
    function whServiceInfo(card,today){
      if(!card.lastServiceDate)return {status:"brak",left:null};
      const days=Math.round((new Date(today)-new Date(card.lastServiceDate))/86400000);
      const left=(+card.servicePeriodDays||365)-days;
      return {status:left<0?"zaległy":left<30?"wkrótce":"ok",left};
    }
    // Dane do wyboru sztuki przy wypożyczeniu
    function whPickerInfo(machines,rentals,stock,eq,excludeRentalId){
      const cards=whCards(machines,eq);
      const act=(rentals||[]).filter(r=>r.status==="aktywne"&&r.id!==excludeRentalId);
      const busy={};cards.forEach(c=>{const r=act.find(x=>x.machineId===c.id);if(r)busy[c.id]=r;});
      const unlinked=act.filter(r=>r.equipment===eq&&!r.machineId).length;
      const legacy=whLegacy(stock,machines,eq);
      return {cards,busy,legacy,legacyFree:Math.max(0,legacy-unlinked)};
    }
    // Domyślnie wybrana sztuka w nowym wypożyczeniu: tylko gdy typ nie ma już starszych sztuk bez karty (wtedy każda sztuka ma kartę)
    function whDefaultCardId(machines,rentals,stock,eq,excludeId){
      const i=whPickerInfo(machines,rentals,stock,eq,excludeId);
      if(!i.cards.length||i.legacyFree>0)return null;
      const free=i.cards.find(c=>!i.busy[c.id]);
      return free?free.id:null;
    }
    // Zapisujemy powiązanie tylko wtedy, gdy karta istnieje, jest aktywna i jest tego samego typu co wypożyczany sprzęt
    function whValidMachineId(machines,eq,id){
      return id&&(machines||[]).some(m=>m.id===id&&!m.archived&&m.type===eq)?id:null;
    }
    // Koszt zakupu typu: sztuki z ceną wg karty, pozostałe wg domyślnej ceny typu (bez kart wynik = cena × liczba sztuk, jak dawniej)
    function whPurchaseTotal(stock,machines,eq){
      const unit=+((stock&&stock.costs&&stock.costs[eq]&&stock.costs[eq].purchase)||0);
      const priced=whCards(machines,eq).map(m=>+m.price||0).filter(p=>p>0);
      return Math.max(0,whQty(stock,eq)-priced.length)*unit+priced.reduce((a,b)=>a+b,0);
    }

    // ── Kolejność typów sprzętu w obrębie grupy (stock.order = {szyny:[nazwy], wozki:[...], balkoniki:[...]}) ──
    // Zapisywana kolejność jest stosowana w getActiveEquipmentNames (core.js), więc obowiązuje też w wypożyczeniach i Statystykach.
    const whCatOf=(stock,name)=>{const m=((stock&&stock.equipment)||[]).filter(x=>x.name===name);return m.length?m[m.length-1].category:null;};
    const whGroupNames=(stock,key)=>getActiveEquipmentNames(stock).filter(n=>whCatOf(stock,n)===key);
    function whMoveType(stock,key,name,dir){
      const names=whGroupNames(stock,key);
      const i=names.indexOf(name),j=i+dir;
      if(i<0||j<0||j>=names.length)return stock;
      const next=names.slice();[next[i],next[j]]=[next[j],next[i]];
      return {...(stock||{}),order:{...((stock&&stock.order)||{}),[key]:next}};
    }

    // ── Usuwanie na stałe (tylko z archiwum) ──────────────────────────────────────
    // Typ sprzętu: znika cała jego konfiguracja (liczba sztuk, daty, koszty, historia pojemności, uwagi, kolejność) oraz jego karty.
    // Wypożyczenia z historii NIE są ruszane (zostają z nazwą sprzętu). W katalogu zostaje jeden "nagrobek" {deleted:true},
    // żeby sprzęt zapisany w kodzie (EQUIPMENT) nie pojawił się znowu jako aktywny.
    function whDeleteType(stock,machines,rentals,name){
      if((rentals||[]).some(r=>r.equipment===name&&r.status==="aktywne"))return {error:"Ten sprzęt ma aktywne wypożyczenie. Najpierw je zakończ."};
      const s={...(stock||{})};
      ["qty","addedDate","costs","seatWidth","totalWidth","durationInclude","issues"].forEach(k=>{if(s[k]&&typeof s[k]==="object"){const c={...s[k]};delete c[name];s[k]=c;}});
      if(s.history)s.history=s.history.filter(h=>h.eq!==name);
      if(s.order){const o={};Object.keys(s.order).forEach(g=>{o[g]=(s.order[g]||[]).filter(n=>n!==name);});s.order=o;}
      if(typeof s[name]==="number")delete s[name];
      const cat=whCatOf(stock,name);
      s.equipment=[...((stock&&stock.equipment)||[]).filter(e=>e.name!==name),{name,category:cat,hidden:true,deleted:true}];
      const cards=(machines||[]).filter(m=>m.type===name);
      return {stock:s,machines:(machines||[]).filter(m=>m.type!==name),removedCards:cards.length};
    }
    // Karta z archiwum: znika razem z historią serwisu, ale KOSZTY zostają jako naprawy typu (ROI i Finanse się nie zmieniają).
    function whPurgeCard(stock,machines,id){
      const c=(machines||[]).find(m=>m.id===id);
      if(!c)return null;
      const costly=(c.serviceLog||[]).filter(e=>+e.cost>0);
      let s=stock||{};const finMap=[];
      if(costly.length){
        const cur=(s.costs||{})[c.type]||{purchase:0,repairs:[]};
        const add=costly.map(e=>{
          const rid=c.id+"-"+e.id;
          finMap.push({from:"serwis-"+c.id+"-"+e.id,to:"naprawa-"+rid});
          return {id:rid,date:e.date,amount:+e.cost,kind:e.type||"Serwis",notes:e.notes||"",desc:(e.type||"Serwis")+(e.notes?" – "+e.notes:"")+" ("+(c.code||c.type)+")"};
        });
        s={...s,costs:{...(s.costs||{}),[c.type]:{...cur,repairs:[...(cur.repairs||[]),...add]}}};
      }
      return {stock:s,machines:machines.filter(m=>m.id!==id),finMap,movedCost:costly.reduce((a,e)=>a+(+e.cost||0),0),lostEntries:(c.serviceLog||[]).length-costly.length};
    }

    // ── Serwis i naprawy na poziomie sprzętu: wpisy kart (machines[].serviceLog) + naprawy typu (stock.costs[eq].repairs) ──
    function whServiceEntries(stock,machines,eq){
      const out=[];
      (machines||[]).filter(m=>m.type===eq).forEach(m=>(m.serviceLog||[]).forEach(s=>out.push({key:"c"+m.id+"-"+s.id,src:"card",cardId:m.id,code:m.code||"",entryId:s.id,date:s.date||"",kind:s.type||"",notes:s.notes||"",cost:+s.cost||0})));
      const reps=((((stock||{}).costs||{})[eq]||{}).repairs)||[];
      reps.forEach(r=>out.push({key:"t"+r.id,src:"type",cardId:null,code:"",entryId:r.id,date:r.date||"",kind:r.kind||"Naprawa",notes:r.notes!=null?r.notes:(r.desc||""),cost:+r.amount||0}));
      return out.sort((a,b)=>(b.date||"").localeCompare(a.date||""));
    }
    // Wpis bez wskazania sztuki: zapisywany jako naprawa typu (tak samo czyta go ROI w Statystykach)
    function whAddTypeRepair(stock,eq,f){
      const cur=((stock||{}).costs||{})[eq]||{purchase:0,repairs:[]};
      let n=Date.now();const ids=new Set((cur.repairs||[]).map(r=>String(r.id)));
      while(ids.has(String(n)))n++;
      const id=String(n);
      const rep={id,date:f.date,amount:+f.cost||0,kind:f.type,notes:f.notes||"",desc:f.type+(f.notes?" – "+f.notes:"")};
      return {stock:{...(stock||{}),costs:{...((stock||{}).costs||{}),[eq]:{...cur,repairs:[...(cur.repairs||[]),rep]}}},id};
    }
    function whRemoveTypeRepair(stock,eq,id){
      const cur=((stock||{}).costs||{})[eq];
      if(!cur)return stock;
      return {...stock,costs:{...stock.costs,[eq]:{...cur,repairs:(cur.repairs||[]).filter(r=>String(r.id)!==String(id))}}};
    }

    // ── Uwagi do sprzętu (np. "wymienić rzepy", "dokręcić śrubki"): stock.issues[eq] = [{id,text,created,done,doneDate,machineId}] ──
    function whAddIssue(stock,eq,text,machineId,today){
      const list=((stock||{}).issues||{})[eq]||[];
      let n=Date.now();const ids=new Set(list.map(i=>i.id));while(ids.has(n))n++;
      return {...(stock||{}),issues:{...((stock||{}).issues||{}),[eq]:[...list,{id:n,text:String(text).trim(),created:today,done:false,doneDate:"",machineId:machineId||null}]}};
    }
    function whSetIssue(stock,eq,id,patch){
      const list=((stock||{}).issues||{})[eq]||[];
      return {...(stock||{}),issues:{...((stock||{}).issues||{}),[eq]:list.map(i=>i.id===id?{...i,...patch}:i)}};
    }
    function whRemoveIssue(stock,eq,id){
      const list=((stock||{}).issues||{})[eq]||[];
      return {...(stock||{}),issues:{...((stock||{}).issues||{}),[eq]:list.filter(i=>i.id!==id)}};
    }
    // Podsumowanie dla Pulpitu i nagłówka Magazynu (tylko aktywne typy): otwarte uwagi i sztuki z serwisem po terminie lub wkrótce
    function whAttention(stock,machines,today,names){
      const set=new Set(names||[]);
      const issues=[];
      Object.keys((stock&&stock.issues)||{}).forEach(eq=>{if(set.has(eq))(stock.issues[eq]||[]).filter(i=>!i.done).forEach(i=>issues.push({eq,...i}));});
      const due=[];
      (machines||[]).filter(m=>!m.archived&&set.has(m.type)).forEach(c=>{const s=whServiceInfo(c,today);if(s.status==="zaległy"||s.status==="wkrótce")due.push({c,s});});
      due.sort((a,b)=>a.s.left-b.s.left);
      return {issues,due};
    }
