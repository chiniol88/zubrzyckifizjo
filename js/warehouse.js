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
