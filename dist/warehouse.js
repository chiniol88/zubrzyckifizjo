// Plik wygenerowany z js/warehouse.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// ── MAGAZYN: czysta logika (bez Reacta, testowana osobno) ─────────────────────
// ZASADY (żeby nic nie zginęło i wszystko było ze sobą spójne):
// 1) stock.qty[eq] jest JEDYNYM źródłem prawdy o liczbie sztuk. Czyta je też Statystyki (obłożenie, zwrot z inwestycji).
// 2) stock.history = [{eq,qty,prev,from}] to pojemność w danym dniu. Obłożenie liczy ją wstecz, więc zmiana liczby sztuk
//    zawsze dopisuje wpis (whChangeQty) i nigdy nie zmienia dni sprzed daty zmiany.
// 3) Karta = jedna sztuka z własnym kodem (tablica machines[], dawniej zakładka Serwis). "Starsze sztuki bez karty" = qty − karty.
// 4) Powiązanie z wypożyczeniem: rentals[].machineId (opcjonalne). Czy sztuka jest wolna/wypożyczona jest WYLICZANE z wypożyczeń.

var whQty = function whQty(stock, eq) {
  return stock && stock.qty && stock.qty[eq] || 1;
};
var whCards = function whCards(machines, eq) {
  return (machines || []).filter(function (m) {
    return !m.archived && (eq === undefined || m.type === eq);
  });
};
var whLegacy = function whLegacy(stock, machines, eq) {
  return Math.max(0, whQty(stock, eq) - whCards(machines, eq).length);
};
var whNorm = function whNorm(s) {
  return String(s == null ? "" : s).trim().toLowerCase();
};

// Pojemność (liczba sztuk) w dniu d — ta sama reguła co capAt w occupancyForEq (finances.js)
function whCapAt(stock, eq, d) {
  var hist = (stock && stock.history || []).filter(function (h) {
    return h.eq === eq && h.from;
  }).sort(function (a, b) {
    return a.from.localeCompare(b.from);
  });
  var q = null;
  hist.forEach(function (h) {
    if (h.from <= d) q = +h.qty || 1;
  });
  if (q !== null) return q;
  return hist.length ? hist[0].prev != null ? +hist[0].prev || 1 : +hist[0].qty || 1 : whQty(stock, eq);
}

// Czy zmianę o delta od dnia `from` da się zapisać? Zmniejszenie nie może zejść poniżej 1 sztuki w żadnym dniu od `from` do dziś
// (inaczej wsteczna data wycofania "zjadłaby" sztukę, której wtedy jeszcze nie było).
function whCanChange(stock, eq, delta, from) {
  var s = stock || {};
  if (!delta || whQty(s, eq) + delta < 1) return false;
  if (delta > 0) return true;
  var days = [from].concat(_toConsumableArray((s.history || []).filter(function (h) {
    return h.eq === eq && h.from && h.from > from;
  }).map(function (h) {
    return h.from;
  })));
  return days.every(function (d) {
    return whCapAt(s, eq, d) + delta >= 1;
  });
}

// Zmiana liczby sztuk o delta od dnia `from` (zakup: +1, wycofanie: −1). Zwraca NOWY obiekt stock
// (albo ten sam, gdy zmiany nie da się wykonać — patrz whCanChange).
// Dni przed `from` zostają bez zmian, dni od `from` mają o delta więcej/mniej (także gdy data jest wsteczna).
function whChangeQty(stock, eq, delta, from) {
  var s = stock || {};
  var cur = whQty(s, eq);
  if (!whCanChange(s, eq, delta, from)) return s;
  var capNow = whCapAt(s, eq, from);
  var next = (s.history || []).map(function (h) {
    if (h.eq !== eq || !h.from || h.from <= from) return h;
    var o = _objectSpread(_objectSpread({}, h), {}, {
      qty: Math.max(1, (+h.qty || 1) + delta)
    });
    if (h.prev != null) o.prev = Math.max(1, (+h.prev || 1) + delta);
    return o;
  });
  var same = next.findIndex(function (h) {
    return h.eq === eq && h.from === from && h.prev != null;
  });
  if (same >= 0) {
    var q = Math.max(1, (+next[same].qty || 1) + delta);
    next = q === (+next[same].prev || 1) ? next.filter(function (_, i) {
      return i !== same;
    }) : next.map(function (h, i) {
      return i === same ? _objectSpread(_objectSpread({}, h), {}, {
        qty: q
      }) : h;
    });
  } else {
    next = [].concat(_toConsumableArray(next), [{
      eq: eq,
      qty: capNow + delta,
      prev: capNow,
      from: from
    }]);
  }
  return _objectSpread(_objectSpread({}, s), {}, {
    qty: _objectSpread(_objectSpread({}, s.qty || {}), {}, _defineProperty({}, eq, cur + delta)),
    history: next
  });
}

// Kod magazynowy: dowolny tekst, wpisywany przez użytkownika; pilnujemy tylko niepowtarzalności
function whCodeError(machines, code, exceptId) {
  var c = whNorm(code);
  if (!c) return "Wpisz kod magazynowy";
  if ((machines || []).some(function (m) {
    return m.id !== exceptId && m.code && whNorm(m.code) === c;
  })) return "Ten kod jest już użyty";
  return "";
}
function whNewId(machines) {
  var id = Date.now();
  while ((machines || []).some(function (m) {
    return m.id === id;
  })) id++;
  return id;
}
function whMakeCard(machines, eq, f, today) {
  return {
    id: whNewId(machines),
    type: eq,
    code: String(f.code || "").trim(),
    serialNo: String(f.serialNo || "").trim(),
    purchaseDate: f.purchaseDate || "",
    price: +f.price || 0,
    lastServiceDate: "",
    servicePeriodDays: 365,
    serviceLog: [],
    notes: f.notes || "",
    archived: false,
    createdAt: today
  };
}
// Nowa sztuka: karta + liczba sztuk +1 od daty zakupu (nie późniejszej niż dziś)
function whAddCard(stock, machines, eq, f, today) {
  var date = f.purchaseDate && f.purchaseDate <= today ? f.purchaseDate : today;
  var card = whMakeCard(machines, eq, _objectSpread(_objectSpread({}, f), {}, {
    purchaseDate: f.purchaseDate || today
  }), today);
  return {
    stock: whChangeQty(stock, eq, 1, date),
    machines: [].concat(_toConsumableArray(machines || []), [card]),
    card: card
  };
}
// Karta dla starszej sztuki: liczba sztuk się NIE zmienia
function whConvertLegacy(stock, machines, eq, f, today) {
  if (whLegacy(stock, machines, eq) < 1) return null;
  var card = whMakeCard(machines, eq, f, today);
  return {
    stock: stock,
    machines: [].concat(_toConsumableArray(machines || []), [card]),
    card: card
  };
}
// Wycofanie sztuki (sprzedana, zepsuta): karta do archiwum, liczba sztuk −1 od daty
function whRetireCard(stock, machines, rentals, id, date, reason, today) {
  var c = (machines || []).find(function (m) {
    return m.id === id;
  });
  if (!c || c.archived) return {
    error: "Nie znaleziono tej karty"
  };
  if ((rentals || []).some(function (r) {
    return r.machineId === id && r.status === "aktywne";
  })) return {
    error: "Ta sztuka ma aktywne wypożyczenie. Najpierw je zakończ."
  };
  if (whQty(stock, c.type) < 2) return {
    error: "To ostatnia sztuka tego typu. Zarchiwizuj cały typ zamiast wycofywać sztukę."
  };
  var d = date && date <= today ? date : today;
  if (!whCanChange(stock, c.type, -1, d)) return {
    error: "W wybranym terminie było tylko tyle sztuk, ile zostało. Wybierz późniejszą datę."
  };
  return {
    stock: whChangeQty(stock, c.type, -1, d),
    machines: machines.map(function (m) {
      return m.id === id ? _objectSpread(_objectSpread({}, m), {}, {
        archived: true,
        retired: true,
        retiredDate: d,
        retiredReason: reason || ""
      }) : m;
    })
  };
}
function whRestoreCard(stock, machines, id, today) {
  var c = (machines || []).find(function (m) {
    return m.id === id;
  });
  if (!c || !c.archived || !c.retired) return {
    error: "Nie znaleziono tej karty"
  };
  var e = whCodeError(whCards(machines), c.code, id);
  if (e && c.code) return {
    error: "Kod " + c.code + " jest już użyty przez inną sztukę. Zmień go i spróbuj ponownie."
  };
  return {
    stock: whChangeQty(stock, c.type, 1, today),
    machines: machines.map(function (m) {
      return m.id === id ? _objectSpread(_objectSpread({}, m), {}, {
        archived: false,
        retired: false,
        retiredDate: "",
        retiredReason: ""
      }) : m;
    })
  };
}
// Usunięcie karty możliwe tylko, gdy jest "czysta" (bez historii serwisu i wypożyczeń). Sztuka wraca do "starszych bez karty".
function whDeleteCard(machines, rentals, id) {
  var c = (machines || []).find(function (m) {
    return m.id === id;
  });
  if (!c) return null;
  if ((c.serviceLog || []).length > 0) return null;
  if ((rentals || []).some(function (r) {
    return r.machineId === id;
  })) return null;
  return machines.filter(function (m) {
    return m.id !== id;
  });
}
// Stare wpisy z zakładki Serwis (sprzed Magazynu): bez kodu i bez żadnej historii serwisu — archiwizujemy (nic nie kasujemy)
function whCleanOldService(machines) {
  var isOld = function isOld(m) {
    return !m.archived && !m.code && !(m.serviceLog && m.serviceLog.length);
  };
  if (!(machines || []).some(isOld)) return machines;
  return machines.map(function (m) {
    return isOld(m) ? _objectSpread(_objectSpread({}, m), {}, {
      archived: true,
      archivedReason: "stary wpis Serwis (sprzed Magazynu)"
    }) : m;
  });
}

// Stan sztuki WYLICZANY z wypożyczeń: wolna / wypożyczona / zarezerwowana
function whCardState(card, rentals) {
  var linked = (rentals || []).filter(function (r) {
    return r.machineId === card.id && r.status === "aktywne";
  });
  var out = linked.find(function (r) {
      return !r.reserved;
    }),
    res = linked.find(function (r) {
      return r.reserved;
    });
  return out ? {
    kind: "out",
    rental: out
  } : res ? {
    kind: "reserved",
    rental: res
  } : {
    kind: "free",
    rental: null
  };
}
// Serwis: bez daty = "brak danych" (nie alarmujemy), dalej jak w starej zakładce Serwis
function whServiceInfo(card, today) {
  if (!card.lastServiceDate) return {
    status: "brak",
    left: null
  };
  var days = Math.round((new Date(today) - new Date(card.lastServiceDate)) / 86400000);
  var left = (+card.servicePeriodDays || 365) - days;
  return {
    status: left < 0 ? "zaległy" : left < 30 ? "wkrótce" : "ok",
    left: left
  };
}
// Dane do wyboru sztuki przy wypożyczeniu
function whPickerInfo(machines, rentals, stock, eq, excludeRentalId) {
  var cards = whCards(machines, eq);
  var act = (rentals || []).filter(function (r) {
    return r.status === "aktywne" && r.id !== excludeRentalId;
  });
  var busy = {};
  cards.forEach(function (c) {
    var r = act.find(function (x) {
      return x.machineId === c.id;
    });
    if (r) busy[c.id] = r;
  });
  var unlinked = act.filter(function (r) {
    return r.equipment === eq && !r.machineId;
  }).length;
  var legacy = whLegacy(stock, machines, eq);
  return {
    cards: cards,
    busy: busy,
    legacy: legacy,
    legacyFree: Math.max(0, legacy - unlinked)
  };
}
// Domyślnie wybrana sztuka w nowym wypożyczeniu: tylko gdy typ nie ma już starszych sztuk bez karty (wtedy każda sztuka ma kartę)
function whDefaultCardId(machines, rentals, stock, eq, excludeId) {
  var i = whPickerInfo(machines, rentals, stock, eq, excludeId);
  if (!i.cards.length || i.legacyFree > 0) return null;
  var free = i.cards.find(function (c) {
    return !i.busy[c.id];
  });
  return free ? free.id : null;
}
// Zapisujemy powiązanie tylko wtedy, gdy karta istnieje, jest aktywna i jest tego samego typu co wypożyczany sprzęt
function whValidMachineId(machines, eq, id) {
  return id && (machines || []).some(function (m) {
    return m.id === id && !m.archived && m.type === eq;
  }) ? id : null;
}
// Koszt zakupu typu: sztuki z ceną wg karty, pozostałe wg domyślnej ceny typu (bez kart wynik = cena × liczba sztuk, jak dawniej)
function whPurchaseTotal(stock, machines, eq) {
  var unit = +(stock && stock.costs && stock.costs[eq] && stock.costs[eq].purchase || 0);
  var priced = whCards(machines, eq).map(function (m) {
    return +m.price || 0;
  }).filter(function (p) {
    return p > 0;
  });
  return Math.max(0, whQty(stock, eq) - priced.length) * unit + priced.reduce(function (a, b) {
    return a + b;
  }, 0);
}

// ── Kolejność typów sprzętu w obrębie grupy (stock.order = {szyny:[nazwy], wozki:[...], balkoniki:[...]}) ──
// Zapisywana kolejność jest stosowana w getActiveEquipmentNames (core.js), więc obowiązuje też w wypożyczeniach i Statystykach.
var whCatOf = function whCatOf(stock, name) {
  var m = (stock && stock.equipment || []).filter(function (x) {
    return x.name === name;
  });
  return m.length ? m[m.length - 1].category : null;
};
var whGroupNames = function whGroupNames(stock, key) {
  return getActiveEquipmentNames(stock).filter(function (n) {
    return whCatOf(stock, n) === key;
  });
};
function whMoveType(stock, key, name, dir) {
  var names = whGroupNames(stock, key);
  var i = names.indexOf(name),
    j = i + dir;
  if (i < 0 || j < 0 || j >= names.length) return stock;
  var next = names.slice();
  var _ref = [next[j], next[i]];
  next[i] = _ref[0];
  next[j] = _ref[1];
  return _objectSpread(_objectSpread({}, stock || {}), {}, {
    order: _objectSpread(_objectSpread({}, stock && stock.order || {}), {}, _defineProperty({}, key, next))
  });
}

// ── Usuwanie na stałe (tylko z archiwum) ──────────────────────────────────────
// Typ sprzętu: znika cała jego konfiguracja (liczba sztuk, daty, koszty, historia pojemności, uwagi, kolejność) oraz jego karty.
// Wypożyczenia z historii NIE są ruszane (zostają z nazwą sprzętu). W katalogu zostaje jeden "nagrobek" {deleted:true},
// żeby sprzęt zapisany w kodzie (EQUIPMENT) nie pojawił się znowu jako aktywny.
function whDeleteType(stock, machines, rentals, name) {
  if ((rentals || []).some(function (r) {
    return r.equipment === name && r.status === "aktywne";
  })) return {
    error: "Ten sprzęt ma aktywne wypożyczenie. Najpierw je zakończ."
  };
  var s = _objectSpread({}, stock || {});
  ["qty", "addedDate", "costs", "seatWidth", "totalWidth", "durationInclude", "issues"].forEach(function (k) {
    if (s[k] && _typeof(s[k]) === "object") {
      var c = _objectSpread({}, s[k]);
      delete c[name];
      s[k] = c;
    }
  });
  if (s.history) s.history = s.history.filter(function (h) {
    return h.eq !== name;
  });
  if (s.order) {
    var o = {};
    Object.keys(s.order).forEach(function (g) {
      o[g] = (s.order[g] || []).filter(function (n) {
        return n !== name;
      });
    });
    s.order = o;
  }
  if (typeof s[name] === "number") delete s[name];
  var cat = whCatOf(stock, name);
  s.equipment = [].concat(_toConsumableArray((stock && stock.equipment || []).filter(function (e) {
    return e.name !== name;
  })), [{
    name: name,
    category: cat,
    hidden: true,
    deleted: true
  }]);
  var cards = (machines || []).filter(function (m) {
    return m.type === name;
  });
  return {
    stock: s,
    machines: (machines || []).filter(function (m) {
      return m.type !== name;
    }),
    removedCards: cards.length
  };
}
// Karta z archiwum: znika razem z historią serwisu, ale KOSZTY zostają jako naprawy typu (ROI i Finanse się nie zmieniają).
function whPurgeCard(stock, machines, id) {
  var c = (machines || []).find(function (m) {
    return m.id === id;
  });
  if (!c) return null;
  var costly = (c.serviceLog || []).filter(function (e) {
    return +e.cost > 0;
  });
  var s = stock || {};
  var finMap = [];
  if (costly.length) {
    var cur = (s.costs || {})[c.type] || {
      purchase: 0,
      repairs: []
    };
    var add = costly.map(function (e) {
      var rid = c.id + "-" + e.id;
      finMap.push({
        from: "serwis-" + c.id + "-" + e.id,
        to: "naprawa-" + rid
      });
      return {
        id: rid,
        date: e.date,
        amount: +e.cost,
        kind: e.type || "Serwis",
        notes: e.notes || "",
        desc: (e.type || "Serwis") + (e.notes ? " – " + e.notes : "") + " (" + (c.code || c.type) + ")"
      };
    });
    s = _objectSpread(_objectSpread({}, s), {}, {
      costs: _objectSpread(_objectSpread({}, s.costs || {}), {}, _defineProperty({}, c.type, _objectSpread(_objectSpread({}, cur), {}, {
        repairs: [].concat(_toConsumableArray(cur.repairs || []), _toConsumableArray(add))
      })))
    });
  }
  return {
    stock: s,
    machines: machines.filter(function (m) {
      return m.id !== id;
    }),
    finMap: finMap,
    movedCost: costly.reduce(function (a, e) {
      return a + (+e.cost || 0);
    }, 0),
    lostEntries: (c.serviceLog || []).length - costly.length
  };
}

// ── Serwis i naprawy na poziomie sprzętu: wpisy kart (machines[].serviceLog) + naprawy typu (stock.costs[eq].repairs) ──
function whServiceEntries(stock, machines, eq) {
  var out = [];
  (machines || []).filter(function (m) {
    return m.type === eq;
  }).forEach(function (m) {
    return (m.serviceLog || []).forEach(function (s) {
      return out.push({
        key: "c" + m.id + "-" + s.id,
        src: "card",
        cardId: m.id,
        code: m.code || "",
        entryId: s.id,
        date: s.date || "",
        kind: s.type || "",
        notes: s.notes || "",
        cost: +s.cost || 0
      });
    });
  });
  var reps = (((stock || {}).costs || {})[eq] || {}).repairs || [];
  reps.forEach(function (r) {
    return out.push({
      key: "t" + r.id,
      src: "type",
      cardId: null,
      code: "",
      entryId: r.id,
      date: r.date || "",
      kind: r.kind || "Naprawa",
      notes: r.notes != null ? r.notes : r.desc || "",
      cost: +r.amount || 0
    });
  });
  return out.sort(function (a, b) {
    return (b.date || "").localeCompare(a.date || "");
  });
}
// Wpis bez wskazania sztuki: zapisywany jako naprawa typu (tak samo czyta go ROI w Statystykach)
function whAddTypeRepair(stock, eq, f) {
  var cur = ((stock || {}).costs || {})[eq] || {
    purchase: 0,
    repairs: []
  };
  var n = Date.now();
  var ids = new Set((cur.repairs || []).map(function (r) {
    return String(r.id);
  }));
  while (ids.has(String(n))) n++;
  var id = String(n);
  var rep = {
    id: id,
    date: f.date,
    amount: +f.cost || 0,
    kind: f.type,
    notes: f.notes || "",
    desc: f.type + (f.notes ? " – " + f.notes : "")
  };
  return {
    stock: _objectSpread(_objectSpread({}, stock || {}), {}, {
      costs: _objectSpread(_objectSpread({}, (stock || {}).costs || {}), {}, _defineProperty({}, eq, _objectSpread(_objectSpread({}, cur), {}, {
        repairs: [].concat(_toConsumableArray(cur.repairs || []), [rep])
      })))
    }),
    id: id
  };
}
function whRemoveTypeRepair(stock, eq, id) {
  var cur = ((stock || {}).costs || {})[eq];
  if (!cur) return stock;
  return _objectSpread(_objectSpread({}, stock), {}, {
    costs: _objectSpread(_objectSpread({}, stock.costs), {}, _defineProperty({}, eq, _objectSpread(_objectSpread({}, cur), {}, {
      repairs: (cur.repairs || []).filter(function (r) {
        return String(r.id) !== String(id);
      })
    })))
  });
}

// ── Uwagi do sprzętu (np. "wymienić rzepy", "dokręcić śrubki"): stock.issues[eq] = [{id,text,created,done,doneDate,machineId}] ──
function whAddIssue(stock, eq, text, machineId, today) {
  var list = ((stock || {}).issues || {})[eq] || [];
  var n = Date.now();
  var ids = new Set(list.map(function (i) {
    return i.id;
  }));
  while (ids.has(n)) n++;
  return _objectSpread(_objectSpread({}, stock || {}), {}, {
    issues: _objectSpread(_objectSpread({}, (stock || {}).issues || {}), {}, _defineProperty({}, eq, [].concat(_toConsumableArray(list), [{
      id: n,
      text: String(text).trim(),
      created: today,
      done: false,
      doneDate: "",
      machineId: machineId || null
    }])))
  });
}
function whSetIssue(stock, eq, id, patch) {
  var list = ((stock || {}).issues || {})[eq] || [];
  return _objectSpread(_objectSpread({}, stock || {}), {}, {
    issues: _objectSpread(_objectSpread({}, (stock || {}).issues || {}), {}, _defineProperty({}, eq, list.map(function (i) {
      return i.id === id ? _objectSpread(_objectSpread({}, i), patch) : i;
    })))
  });
}
function whRemoveIssue(stock, eq, id) {
  var list = ((stock || {}).issues || {})[eq] || [];
  return _objectSpread(_objectSpread({}, stock || {}), {}, {
    issues: _objectSpread(_objectSpread({}, (stock || {}).issues || {}), {}, _defineProperty({}, eq, list.filter(function (i) {
      return i.id !== id;
    })))
  });
}
// Podsumowanie dla Pulpitu i nagłówka Magazynu (tylko aktywne typy): otwarte uwagi i sztuki z serwisem po terminie lub wkrótce
function whAttention(stock, machines, today, names) {
  var set = new Set(names || []);
  var issues = [];
  Object.keys(stock && stock.issues || {}).forEach(function (eq) {
    if (set.has(eq)) (stock.issues[eq] || []).filter(function (i) {
      return !i.done;
    }).forEach(function (i) {
      return issues.push(_objectSpread({
        eq: eq
      }, i));
    });
  });
  var due = [];
  (machines || []).filter(function (m) {
    return !m.archived && set.has(m.type);
  }).forEach(function (c) {
    var s = whServiceInfo(c, today);
    if (s.status === "zaległy" || s.status === "wkrótce") due.push({
      c: c,
      s: s
    });
  });
  due.sort(function (a, b) {
    return a.s.left - b.s.left;
  });
  return {
    issues: issues,
    due: due
  };
}
