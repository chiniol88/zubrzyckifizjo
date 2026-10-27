// Plik wygenerowany z js/magazyn.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// ── MAGAZYN ───────────────────────────────────────────────────────────────
// Jedna zakładka zamiast okienka "Zarządzaj sprzętem" i dawnej zakładki Serwis.
// Liczenie sztuk, kart, historii pojemności, kolejności, serwisu i uwag: warehouse.js (zasady opisane na górze tamtego pliku).

// Wybór konkretnej sztuki przy wypożyczeniu (formularz nowego wypożyczenia i edycji)
function CardPicker(_ref) {
  var eq = _ref.eq,
    value = _ref.value,
    _onChange = _ref.onChange,
    stock = _ref.stock,
    rentals = _ref.rentals,
    excludeId = _ref.excludeId;
  var mctx = useContext(MachinesCtx);
  var demo = useDemo();
  var machines = mctx && mctx.machines || [];
  if (!eq) return null;
  var info = whPickerInfo(machines, rentals, stock, eq, excludeId);
  if (info.cards.length === 0) return null;
  var who = function who(r) {
    return demo ? "klient" : r.patientName || "?";
  };
  var issueN = function issueN(id) {
    return (((stock || {}).issues || {})[eq] || []).filter(function (i) {
      return !i.done && i.machineId === id;
    }).length;
  };
  var opts = [{
    value: "",
    label: info.legacy > 0 ? "Starsza sztuka (bez karty)" : "— jeszcze nie wybrano"
  }].concat(_toConsumableArray(info.cards.map(function (c) {
    var b = info.busy[c.id];
    var n = issueN(c.id);
    return {
      value: String(c.id),
      label: c.code + (c.serialNo ? " · " + c.serialNo : "") + " — " + (b ? "zajęta (" + who(b) + (b.endDate ? " do " + b.endDate : "") + ")" : "wolna") + (n > 0 ? " · uwagi: " + n : "")
    };
  })));
  var busyNow = value ? info.busy[value] : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sel, {
    label: "Kt\xF3ra sztuka?",
    value: value ? String(value) : "",
    onChange: function onChange(v) {
      return _onChange(v ? +v : null);
    },
    options: opts
  }), busyNow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#F4A261",
      marginTop: -6,
      marginBottom: 12
    }
  }, "\u26A0 Ta sztuka jest teraz zaj\u0119ta (", who(busyNow), "). Zapisz tylko, je\u015Bli to rezerwacja na p\xF3\u017Aniej."));
}

// Przy wypożyczeniu: otwarte uwagi do tego sprzętu (np. "wymienić rzepy"), żeby załatwić je przed dowozem
function EqIssueHint(_ref2) {
  var eq = _ref2.eq,
    machineId = _ref2.machineId,
    stock = _ref2.stock;
  var dk = useContext(DarkCtx);
  var list = eq ? (((stock || {}).issues || {})[eq] || []).filter(function (i) {
    return !i.done && (!i.machineId || i.machineId === machineId);
  }) : [];
  if (list.length === 0) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#3A2A14" : "#FDF0E3",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 14,
      fontSize: 13,
      color: dk ? "#F4C48A" : "#9A5A12"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 2
    }
  }, "\uD83D\uDD27 Do za\u0142atwienia przy tym sprz\u0119cie (", list.length, ")"), list.slice(0, 4).map(function (i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i.id
    }, "\u2022 ", i.text);
  }), list.length > 4 && /*#__PURE__*/React.createElement("div", null, "\u2026i ", list.length - 4, " wi\u0119cej"));
}
function Magazyn(_ref3) {
  var rentals = _ref3.rentals,
    setRentals = _ref3.setRentals,
    machines = _ref3.machines,
    setMachines = _ref3.setMachines,
    stock = _ref3.stock,
    setStock = _ref3.setStock,
    setFinances = _ref3.setFinances,
    goToRental = _ref3.goToRental;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var today = todayLocal();
  var subC = dk ? "#6B84AC" : "#7A8FA6",
    lineC = dk ? "#2A3A56" : "#EFF3FA",
    boxBg = dk ? "#111826" : "#F7F9FB";
  var _useState = useState("all"),
    _useState2 = _slicedToArray(_useState, 2),
    group = _useState2[0],
    setGroup = _useState2[1];
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    open = _useState4[0],
    setOpen = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    cfg = _useState6[0],
    setCfg = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selCard = _useState8[0],
    setSelCard = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    cardForm = _useState0[0],
    setCardForm = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    srvForm = _useState10[0],
    setSrvForm = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    issueForm = _useState12[0],
    setIssueForm = _useState12[1];
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    retireForm = _useState14[0],
    setRetireForm = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    typeForm = _useState16[0],
    setTypeForm = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    confirmDel = _useState18[0],
    setConfirmDel = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    confirmPurge = _useState20[0],
    setConfirmPurge = _useState20[1];
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    reorder = _useState22[0],
    setReorder = _useState22[1];
  var _useState23 = useState({}),
    _useState24 = _slicedToArray(_useState23, 2),
    allEntries = _useState24[0],
    setAllEntries = _useState24[1];
  var _useState25 = useState({}),
    _useState26 = _slicedToArray(_useState25, 2),
    doneOpen = _useState26[0],
    setDoneOpen = _useState26[1];
  var _useState27 = useState(""),
    _useState28 = _slicedToArray(_useState27, 2),
    formError = _useState28[0],
    setFormError = _useState28[1];
  var _useState29 = useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    toast = _useState30[0],
    setToast = _useState30[1];
  var _useState31 = useState(false),
    _useState32 = _slicedToArray(_useState31, 2),
    showRetired = _useState32[0],
    setShowRetired = _useState32[1];
  var catalog = stock && stock.equipment || [];
  var activeNames = getActiveEquipmentNames(stock);
  var deletedSet = new Set(catalog.filter(function (e) {
    return e.deleted;
  }).map(function (e) {
    return e.name;
  }));
  var hiddenNames = _toConsumableArray(new Set(catalog.map(function (e) {
    return e.name;
  }))).filter(function (n) {
    return !activeNames.includes(n) && !deletedSet.has(n);
  });
  var categoryOf = function categoryOf(name) {
    return whCatOf(stock, name);
  };
  var seatWidth = stock && stock.seatWidth || {},
    totalWidth = stock && stock.totalWidth || {},
    addedDate = stock && stock.addedDate || {};
  var costs = stock && stock.costs || {};
  // Zajętość: wszystkie aktywne wypożyczenia danego typu (tak samo liczą to Statystyki i formularz wypożyczenia)
  var activeCount = useMemo(function () {
    var m = {};
    (rentals || []).filter(function (r) {
      return r.status === "aktywne";
    }).forEach(function (r) {
      m[r.equipment] = (m[r.equipment] || 0) + 1;
    });
    return m;
  }, [rentals]);
  var totalQty = activeNames.reduce(function (s, eq) {
    return s + whQty(stock, eq);
  }, 0);
  var totalOut = activeNames.reduce(function (s, eq) {
    return s + (activeCount[eq] || 0);
  }, 0);
  var att = whAttention(stock, machines, today, activeNames);
  // Gdzie jest sztuka z uwagą i do kiedy trwa wypożyczenie (żeby zaplanować pracę po odbiorze)
  var fmtD = function fmtD(d) {
    return d ? d.split("-").reverse().join(".") : "";
  };
  var endTxt = function endTxt(r) {
    var who = demo ? "klient" : r.patientName || "?";
    if (r.renewable && !r.endDate) return who + " · cykliczne, bez daty końca";
    return who + " · koniec " + (fmtD(r.endDate) || "bez daty") + (r.plannedReturn ? " · odbiór " + fmtD(r.plannedReturn) : "");
  };
  // Kiedy sztuka wraca: planowany odbiór, a bez niego koniec wypożyczenia (tak samo liczy to Pulpit)
  var retOf = function retOf(r) {
    return r.plannedReturn || r.endDate || "";
  };
  // grp: 0 = już w magazynie (można zająć się od razu), 1 = wypożyczona z datą zwrotu (ret), 2 = wypożyczona bez daty końca (np. cykliczne)
  var whereOf = function whereOf(i) {
    if (i.machineId) {
      var card = (machines || []).find(function (m) {
        return m.id === i.machineId;
      });
      if (!card) return {
        code: "",
        txt: "w magazynie",
        out: false,
        grp: 0,
        ret: ""
      };
      var st = whCardState(card, rentals);
      if (st.kind === "out") {
        var _ret = retOf(st.rental);
        return {
          code: card.code || "",
          txt: "u: " + endTxt(st.rental),
          out: true,
          grp: _ret ? 1 : 2,
          ret: _ret
        };
      }
      if (st.kind === "reserved") return {
        code: card.code || "",
        txt: "zarezerwowana: " + (demo ? "klient" : st.rental.patientName || "?") + " od " + (fmtD(st.rental.startDate) || "?"),
        out: false,
        grp: 0,
        ret: ""
      };
      return {
        code: card.code || "",
        txt: "w magazynie",
        out: false,
        grp: 0,
        ret: ""
      };
    }
    var out = (rentals || []).filter(function (r) {
      return r.status === "aktywne" && !r.reserved && r.equipment === i.eq;
    }).sort(function (a, b) {
      return (retOf(a) || "9999").localeCompare(retOf(b) || "9999");
    });
    if (out.length === 0) return {
      code: "",
      txt: "wszystkie w magazynie",
      out: false,
      grp: 0,
      ret: ""
    };
    var ret = retOf(out[0]);
    return {
      code: "",
      txt: "wypożyczone: " + out.slice(0, 3).map(endTxt).join("; ") + (out.length > 3 ? " i " + (out.length - 3) + " więcej" : ""),
      out: true,
      grp: ret ? 1 : 2,
      ret: ret
    };
  };
  // Panel na górze: najpierw sztuki już w magazynie, potem według najbliższego zwrotu, na końcu bez daty końca;
  // przy remisie starsza uwaga wyżej
  var issuesSorted = att.issues.map(function (i) {
    return {
      i: i,
      w: whereOf(i)
    };
  }).sort(function (a, b) {
    return a.w.grp - b.w.grp || (a.w.ret || "").localeCompare(b.w.ret || "") || (a.i.created || "").localeCompare(b.i.created || "") || (+a.i.id || 0) - (+b.i.id || 0);
  }).map(function (x) {
    return x.i;
  });
  var archivedCards = (machines || []).filter(function (m) {
    return m.archived;
  }).sort(function (a, b) {
    return (b.retiredDate || "").localeCompare(a.retiredDate || "") || b.id - a.id;
  });
  var issuesOf = function issuesOf(eq) {
    return ((stock || {}).issues || {})[eq] || [];
  };
  var flash = function flash(msg) {
    return setToast(msg);
  };
  var who = function who(r) {
    return demo ? "[klient]" : r.patientName || "?";
  };

  // ── karty (sztuki z kodem) ──
  // cena i data z typu sprzętu (Statystyki → Opłacalność / "Dodano do magazynu") podstawiają się do formularza, do poprawienia
  var typePrice = function typePrice(eq) {
    var p = demo ? 0 : +((costs[eq] || {}).purchase || 0);
    return p > 0 ? String(p) : "";
  };
  var openNewCard = function openNewCard(eq) {
    setFormError("");
    setCardForm({
      mode: "new",
      eq: eq,
      code: "",
      serialNo: "",
      purchaseDate: today,
      price: typePrice(eq),
      notes: "",
      period: "365",
      where: ""
    });
  };
  var openConvert = function openConvert(eq) {
    setFormError("");
    setCardForm({
      mode: "convert",
      eq: eq,
      code: "",
      serialNo: "",
      purchaseDate: addedDate[eq] || "",
      price: typePrice(eq),
      notes: "",
      period: "365",
      where: ""
    });
  };
  var openEditCard = function openEditCard(c) {
    setFormError("");
    setCardForm({
      mode: "edit",
      eq: c.type,
      id: c.id,
      code: c.code || "",
      serialNo: c.serialNo || "",
      purchaseDate: c.purchaseDate || "",
      price: c.price ? String(c.price) : "",
      notes: c.notes || "",
      period: String(c.servicePeriodDays || 365),
      where: ""
    });
  };
  var saveCard = function saveCard() {
    var f = cardForm;
    var err = whCodeError(machines, f.code, f.id);
    if (err) {
      setFormError(err);
      return;
    }
    if (f.mode === "new") {
      var res = whAddCard(stock, machines, f.eq, f, today);
      setStock(res.stock);
      setMachines(res.machines);
      setOpen(function (o) {
        return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, f.eq, true));
      });
      flash("Dodano sztukę " + res.card.code);
    } else if (f.mode === "convert") {
      var _res = whConvertLegacy(stock, machines, f.eq, f, today);
      if (!_res) {
        setFormError("W tym typie nie ma już starszych sztuk bez karty");
        return;
      }
      setMachines(_res.machines);
      if (f.where) setRentals(function (rs) {
        return rs.map(function (x) {
          return x.id === +f.where ? _objectSpread(_objectSpread({}, x), {}, {
            machineId: _res.card.id
          }) : x;
        });
      });
      setOpen(function (o) {
        return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, f.eq, true));
      });
      flash("Utworzono kartę " + _res.card.code);
    } else {
      setMachines(function (ms) {
        return ms.map(function (m) {
          return m.id === f.id ? _objectSpread(_objectSpread({}, m), {}, {
            code: f.code.trim(),
            serialNo: f.serialNo.trim(),
            purchaseDate: f.purchaseDate || "",
            price: +f.price || 0,
            notes: f.notes || "",
            servicePeriodDays: +f.period || 365
          }) : m;
        });
      });
      flash("Zapisano");
    }
    setCardForm(null);
  };
  var doRetire = function doRetire() {
    var f = retireForm;
    var res = whRetireCard(stock, machines, rentals, f.id, f.date, f.reason, today);
    if (res.error) {
      setFormError(res.error);
      return;
    }
    setStock(res.stock);
    setMachines(res.machines);
    setRetireForm(null);
    setSelCard(null);
    flash("Sztuka wycofana");
  };
  var doRestore = function doRestore(id) {
    var res = whRestoreCard(stock, machines, id, today);
    if (res.error) {
      flash(res.error);
      return;
    }
    setStock(res.stock);
    setMachines(res.machines);
    flash("Przywrócono sztukę");
  };
  var doDelete = function doDelete() {
    var ms = whDeleteCard(machines, rentals, confirmDel);
    setConfirmDel(null);
    if (!ms) {
      flash("Tej karty nie da się usunąć (ma historię)");
      return;
    }
    setMachines(ms);
    setSelCard(null);
    flash("Karta usunięta, sztuka zostaje jako starsza bez karty");
  };

  // ── serwis i naprawy: wpis przy konkretnej sztuce albo przy całym sprzęcie; koszt zawsze trafia do Finansów ──
  var openSrv = function openSrv(eq, cardId) {
    setFormError("");
    setSrvForm({
      eq: eq,
      cardId: cardId ? String(cardId) : "",
      date: today,
      type: "Przegląd",
      notes: "",
      cost: ""
    });
  };
  var saveSrv = function saveSrv() {
    var f = srvForm;
    if (!f.date) {
      setFormError("Podaj datę");
      return;
    }
    var cost = +f.cost || 0;
    if (f.cardId) {
      var c = (machines || []).find(function (m) {
        return m.id === +f.cardId;
      });
      if (!c) return;
      var entry = {
        id: Date.now(),
        date: f.date,
        type: f.type,
        notes: f.notes,
        cost: cost
      };
      setMachines(function (ms) {
        return ms.map(function (m) {
          return m.id === c.id ? _objectSpread(_objectSpread({}, m), {}, {
            lastServiceDate: m.lastServiceDate && m.lastServiceDate > f.date ? m.lastServiceDate : f.date,
            serviceLog: [].concat(_toConsumableArray(m.serviceLog || []), [entry])
          }) : m;
        });
      });
      if (cost > 0) setFinances(function (fs) {
        return [{
          id: Date.now() + Math.random(),
          sourceId: "serwis-" + c.id + "-" + entry.id,
          date: f.date,
          type: "koszt",
          category: "Serwis",
          amount: cost,
          description: f.type + (f.notes ? " – " + f.notes : "") + " (" + (c.code || c.type) + ")"
        }].concat(_toConsumableArray(fs));
      });
    } else {
      var res = whAddTypeRepair(stock, f.eq, {
        date: f.date,
        type: f.type,
        notes: f.notes,
        cost: cost
      });
      setStock(res.stock);
      if (cost > 0) setFinances(function (fs) {
        return [{
          id: Date.now() + Math.random(),
          sourceId: "naprawa-" + res.id,
          date: f.date,
          type: "koszt",
          category: "Serwis",
          amount: cost,
          description: f.type + (f.notes ? " – " + f.notes : "") + " (" + f.eq + ")"
        }].concat(_toConsumableArray(fs));
      });
    }
    setSrvForm(null);
    setOpen(function (o) {
      return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, f.eq, true));
    });
    flash("Wpis serwisowy zapisany");
  };
  var deleteEntry = function deleteEntry(eq, e) {
    if (e.src === "card") {
      setMachines(function (ms) {
        return ms.map(function (m) {
          if (m.id !== e.cardId) return m;
          var log = (m.serviceLog || []).filter(function (s) {
            return s.id !== e.entryId;
          });
          var last = log.length ? log.reduce(function (a, b) {
            return a.date > b.date ? a : b;
          }).date : "";
          return _objectSpread(_objectSpread({}, m), {}, {
            serviceLog: log,
            lastServiceDate: last
          });
        });
      });
      setFinances(function (fs) {
        return fs.filter(function (f) {
          return f.sourceId !== "serwis-" + e.cardId + "-" + e.entryId;
        });
      });
    } else {
      setStock(function (s) {
        return whRemoveTypeRepair(s, eq, e.entryId);
      });
      setFinances(function (fs) {
        return fs.filter(function (f) {
          return f.sourceId !== "naprawa-" + e.entryId;
        });
      });
    }
  };

  // ── uwagi do sprzętu ("wymienić rzepy", "dokręcić śrubki") ──
  var openIssue = function openIssue(eq, cardId) {
    setFormError("");
    setIssueForm({
      eq: eq,
      cardId: cardId ? String(cardId) : "",
      text: ""
    });
  };
  var saveIssue = function saveIssue() {
    var f = issueForm;
    if (!f.text.trim()) {
      setFormError("Wpisz, co trzeba zrobić");
      return;
    }
    setStock(function (s) {
      return whAddIssue(s, f.eq, f.text, f.cardId ? +f.cardId : null, today);
    });
    setIssueForm(null);
    setOpen(function (o) {
      return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, f.eq, true));
    });
    flash("Dodano uwagę");
  };
  var toggleIssue = function toggleIssue(eq, i) {
    return setStock(function (s) {
      return whSetIssue(s, eq, i.id, i.done ? {
        done: false,
        doneDate: ""
      } : {
        done: true,
        doneDate: today
      });
    });
  };
  var removeIssue = function removeIssue(eq, id) {
    return setStock(function (s) {
      return whRemoveIssue(s, eq, id);
    });
  };

  // ── liczba sztuk w typach liczonych ilościowo (balkoniki, ambonki) ──
  var changeQty = function changeQty(eq, delta) {
    if (delta < 0 && whQty(stock, eq) - 1 < (activeCount[eq] || 0)) {
      flash("Tyle sztuk jest teraz wypożyczonych");
      return;
    }
    var ns = whChangeQty(stock, eq, delta, today);
    if (ns === stock) {
      flash("Nie można zejść poniżej 1 sztuki");
      return;
    }
    setStock(ns);
  };

  // ── typy sprzętu (katalog), kolejność, archiwum ──
  var setCatalog = function setCatalog(fn) {
    return setStock(function (s) {
      return _objectSpread(_objectSpread({}, s || {}), {}, {
        equipment: fn(_toConsumableArray((s || {}).equipment || []))
      });
    });
  };
  var assignCategory = function assignCategory(name, category) {
    return setCatalog(function (cat) {
      var i = cat.findIndex(function (x) {
        return x.name === name;
      });
      if (i >= 0) cat[i] = _objectSpread(_objectSpread({}, cat[i]), {}, {
        category: category
      });else cat.push({
        name: name,
        category: category,
        hidden: false
      });
      return cat;
    });
  };
  var archiveType = function archiveType(name) {
    return setCatalog(function (cat) {
      var i = cat.findIndex(function (x) {
        return x.name === name;
      });
      if (i >= 0) cat[i] = _objectSpread(_objectSpread({}, cat[i]), {}, {
        hidden: true
      });else cat.push({
        name: name,
        category: categoryOf(name),
        hidden: true
      });
      return cat;
    });
  };
  var restoreType = function restoreType(name) {
    return setStock(function (s) {
      return _objectSpread(_objectSpread({}, s || {}), {}, {
        equipment: ((s || {}).equipment || []).map(function (x) {
          return x.name === name ? _objectSpread(_objectSpread({}, x), {}, {
            hidden: false
          }) : x;
        })
      });
    });
  };
  var moveType = function moveType(key, name, dir) {
    return setStock(function (s) {
      return whMoveType(s, key, name, dir);
    });
  };
  var doPurge = function doPurge() {
    var p = confirmPurge;
    if (p.kind === "type") {
      var res = whDeleteType(stock, machines, rentals, p.name);
      if (res.error) {
        setConfirmPurge(null);
        flash(res.error);
        return;
      }
      setStock(res.stock);
      setMachines(res.machines);
      flash("Usunięto na stałe: " + p.name);
    } else {
      var _res2 = whPurgeCard(stock, machines, p.id);
      if (_res2) {
        setStock(_res2.stock);
        setMachines(_res2.machines);
        if (_res2.finMap.length) setFinances(function (fs) {
          return fs.map(function (f) {
            var m = _res2.finMap.find(function (x) {
              return x.from === f.sourceId;
            });
            return m ? _objectSpread(_objectSpread({}, f), {}, {
              sourceId: m.to
            }) : f;
          });
        });
      }
      flash("Karta usunięta na stałe");
    }
    setConfirmPurge(null);
  };
  var openNewType = function openNewType(category) {
    setFormError("");
    setTypeForm({
      category: category || "szyny",
      name: "",
      code: "",
      serialNo: "",
      purchaseDate: today,
      price: "",
      qty: "1"
    });
  };
  var saveType = function saveType() {
    var f = typeForm,
      name = f.name.trim();
    if (!name) {
      setFormError("Wpisz nazwę sprzętu");
      return;
    }
    if (activeNames.includes(name)) {
      setFormError("Taki sprzęt już jest w magazynie");
      return;
    }
    if (hiddenNames.includes(name)) {
      setFormError("Ten sprzęt jest w archiwum. Przywróć go na dole strony.");
      return;
    }
    var isCard = f.category === "szyny" || f.category === "wozki";
    if (isCard) {
      var e = whCodeError(machines, f.code, null);
      if (e) {
        setFormError(e);
        return;
      }
    }
    var date = f.purchaseDate && f.purchaseDate <= today ? f.purchaseDate : today;
    setStock(function (s) {
      var cur = s || {};
      return _objectSpread(_objectSpread({}, cur), {}, {
        equipment: [].concat(_toConsumableArray((cur.equipment || []).filter(function (e) {
          return e.name !== name;
        })), [{
          name: name,
          category: f.category,
          hidden: false
        }]),
        addedDate: _objectSpread(_objectSpread({}, cur.addedDate || {}), {}, _defineProperty({}, name, date)),
        qty: _objectSpread(_objectSpread({}, cur.qty || {}), {}, _defineProperty({}, name, isCard ? 1 : Math.max(1, Math.round(+f.qty || 1))))
      });
    });
    if (isCard) setMachines(function (ms) {
      return [].concat(_toConsumableArray(ms || []), [whMakeCard(ms, name, _objectSpread(_objectSpread({}, f), {}, {
        purchaseDate: f.purchaseDate || today
      }), today)]);
    });
    setOpen(function (o) {
      return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, name, true));
    });
    setTypeForm(null);
    flash("Dodano sprzęt: " + name);
  };
  var GROUP_COLORS = {
    szyny: "#3E6FB0",
    wozki: "#7C6AF4",
    balkoniki: "#F4A261"
  };
  var groupHeader = function groupHeader(key, label, action) {
    var color = GROUP_COLORS[key] || "#7A8FA6";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: color,
        textTransform: "uppercase",
        letterSpacing: .5,
        whiteSpace: "nowrap"
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 1,
        background: dk ? "#2A3A56" : "#D9E2F0"
      }
    }), action);
  };
  var linkBtn = {
    background: "none",
    border: "none",
    fontSize: 12,
    color: "#3E6FB0",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "6px 0"
  };
  var arrowBtn = function arrowBtn(off) {
    return {
      width: 44,
      height: 44,
      borderRadius: 12,
      border: "1.5px solid " + (dk ? "#2A3A56" : "#D9E2F0"),
      background: dk ? "#18202F" : "#EFF3FA",
      color: off ? dk ? "#3A4A66" : "#B9C6D6" : "#3E6FB0",
      fontSize: 16,
      cursor: off ? "default" : "pointer",
      fontFamily: "inherit",
      flexShrink: 0
    };
  };

  // wpisy serwisowe (karty + naprawy typu) i uwagi — wspólne dla typu i dla karty
  var renderEntries = function renderEntries(eq, list) {
    return list.map(function (e) {
      return /*#__PURE__*/React.createElement("div", {
        key: e.key,
        style: {
          background: dk ? "#18202F" : "#fff",
          border: "1px solid ".concat(lineC),
          borderRadius: 8,
          padding: "7px 10px",
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600
        }
      }, e.kind, e.code && /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 500,
          color: subC
        }
      }, " \xB7 ", e.code)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: subC
        }
      }, e.date), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return deleteEntry(eq, e);
        },
        "aria-label": "Usu\u0144 wpis",
        style: {
          background: "none",
          border: "none",
          color: "#E05C5C",
          fontSize: 16,
          cursor: "pointer",
          padding: "2px 4px",
          lineHeight: 1
        }
      }, "\xD7"))), e.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: subC,
          marginTop: 2
        }
      }, e.notes), e.cost > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#3E6FB0",
          marginTop: 2
        }
      }, demo ? "****" : e.cost + " zł"));
    });
  };
  var renderIssue = function renderIssue(eq, i) {
    var card = i.machineId ? (machines || []).find(function (m) {
      return m.id === i.machineId;
    }) : null;
    return /*#__PURE__*/React.createElement("div", {
      key: i.id,
      style: {
        display: "flex",
        gap: 6,
        alignItems: "flex-start",
        padding: "2px 0",
        borderBottom: "1px solid ".concat(lineC)
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return toggleIssue(eq, i);
      },
      "aria-label": i.done ? "Oznacz jako niezrobione" : "Oznacz jako zrobione",
      style: {
        width: 38,
        height: 38,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 7,
        border: "2px solid ".concat(i.done ? "#3DAA72" : dk ? "#4A5C7A" : "#B9C6D6"),
        background: i.done ? "#3DAA72" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, i.done && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 13
      }
    }, "\u2713"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        padding: "8px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        textDecoration: i.done ? "line-through" : "none",
        color: i.done ? subC : undefined
      }
    }, i.text), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC
      }
    }, card ? (card.code || "sztuka") + " · " : "", i.done ? "zrobione " + i.doneDate : "dodano " + i.created)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return removeIssue(eq, i.id);
      },
      "aria-label": "Usu\u0144 uwag\u0119",
      style: {
        background: "none",
        border: "none",
        color: subC,
        fontSize: 16,
        cursor: "pointer",
        padding: "8px 6px",
        lineHeight: 1
      }
    }, "\xD7"));
  };
  var renderCard = function renderCard(c) {
    var st = whCardState(c, rentals),
      sv = whServiceInfo(c, today),
      isSel = selCard === c.id;
    var svCol = sv.status === "zaległy" ? "#E05C5C" : sv.status === "wkrótce" ? "#F4A261" : sv.status === "ok" ? "#3DAA72" : "#7A8FA6";
    var history = (rentals || []).filter(function (r) {
      return r.machineId === c.id;
    }).sort(function (a, b) {
      return (b.startDate || "").localeCompare(a.startDate || "");
    });
    var canDelete = whDeleteCard(machines, rentals, c.id) !== null;
    var cardIssues = issuesOf(c.type).filter(function (i) {
      return i.machineId === c.id;
    });
    var openIss = cardIssues.filter(function (i) {
      return !i.done;
    });
    var cardEntries = whServiceEntries(stock, machines, c.type).filter(function (e) {
      return e.cardId === c.id;
    });
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        border: "1px solid ".concat(lineC),
        borderRadius: 12,
        marginBottom: 8,
        overflow: "hidden",
        background: dk ? "#111826" : "#FAFCFD"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return setSelCard(isSel ? null : c.id);
      },
      style: {
        padding: "10px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: .3
      }
    }, c.code || "(uzupełnij kod)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginTop: 1
      }
    }, c.serialNo ? "nr fabryczny " + c.serialNo : "bez numeru fabrycznego", openIss.length > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#D9822B",
        marginLeft: 6
      }
    }, "uwagi: ", openIss.length))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      color: st.kind === "free" ? "#3DAA72" : "#3E6FB0"
    }, st.kind === "free" ? "Wolna" : st.kind === "out" ? "U klienta" : "Zarezerwowana"), sv.status !== "brak" && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: svCol,
        marginTop: 3
      }
    }, "serwis: ", sv.status === "zaległy" ? Math.abs(sv.left) + " dni po terminie" : sv.status === "wkrótce" ? "za " + sv.left + " dni" : "w porządku"))), isSel && /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid ".concat(lineC),
        padding: "10px 12px 12px"
      }
    }, st.rental && /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return goToRental && goToRental(st.rental.id);
      },
      style: {
        fontSize: 13,
        color: "#3E6FB0",
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 8
      }
    }, "\uD83D\uDCCD ", who(st.rental), " \xB7 ", st.rental.startDate || "?", " \u2192 ", st.rental.endDate || "bez końca", " \u203A"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: subC,
        lineHeight: 1.7,
        marginBottom: 10
      }
    }, c.purchaseDate && /*#__PURE__*/React.createElement("div", null, "W obiegu od: ", /*#__PURE__*/React.createElement("b", null, c.purchaseDate)), c.price > 0 && /*#__PURE__*/React.createElement("div", null, "Cena zakupu: ", /*#__PURE__*/React.createElement("b", null, demo ? "****" : c.price + " zł")), c.notes && /*#__PURE__*/React.createElement("div", null, c.notes)), /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 6
      }
    }, "Serwis (co ", c.servicePeriodDays || 365, " dni)"), c.lastServiceDate && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: subC,
        marginBottom: 6
      }
    }, "Ostatni serwis: ", c.lastServiceDate), renderEntries(c.type, cardEntries), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return openSrv(c.type, c.id);
      },
      style: linkBtn
    }, "+ Wpis serwisowy dla tej sztuki"), /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 2,
        marginTop: 8
      }
    }, "Uwagi do tej sztuki"), cardIssues.map(function (i) {
      return renderIssue(c.type, i);
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return openIssue(c.type, c.id);
      },
      style: linkBtn
    }, "+ Dodaj uwag\u0119 do tej sztuki"), /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 6,
        marginTop: 8
      }
    }, "Kto mia\u0142 t\u0119 sztuk\u0119"), history.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: subC,
        marginBottom: 6
      }
    }, "Jeszcze nie wypo\u017Cyczana."), history.slice(0, 8).map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r.id,
        onClick: function onClick() {
          return goToRental && goToRental(r.id);
        },
        style: {
          fontSize: 12,
          padding: "5px 0",
          borderBottom: "1px solid ".concat(lineC),
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", null, who(r)), /*#__PURE__*/React.createElement("span", {
        style: {
          color: subC
        }
      }, r.startDate || "?", " \u2192 ", r.endDate || (r.status === "aktywne" ? "trwa" : "?")));
    }), history.length > 8 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginTop: 4
      }
    }, "\u2026i ", history.length - 8, " wcze\u015Bniejszych"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary",
      onClick: function onClick() {
        return openEditCard(c);
      }
    }, "Edytuj"), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary",
      onClick: function onClick() {
        setFormError("");
        setRetireForm({
          id: c.id,
          date: today,
          reason: ""
        });
      }
    }, "Wycofaj sztuk\u0119"), canDelete && /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "danger",
      onClick: function onClick() {
        return setConfirmDel(c.id);
      }
    }, "Usu\u0144 kart\u0119"))));
  };
  var renderType = function renderType(eq, idx, names) {
    var cat = categoryOf(eq);
    if (reorder !== null && reorder === cat) {
      return /*#__PURE__*/React.createElement(Card, {
        key: eq,
        style: {
          padding: "8px 12px",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0,
          fontSize: 15,
          fontWeight: 700
        }
      }, eq), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return moveType(cat, eq, -1);
        },
        disabled: idx === 0,
        "aria-label": "Przesu\u0144 w g\xF3r\u0119",
        style: arrowBtn(idx === 0)
      }, "\u25B2"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return moveType(cat, eq, 1);
        },
        disabled: idx === names.length - 1,
        "aria-label": "Przesu\u0144 w d\xF3\u0142",
        style: arrowBtn(idx === names.length - 1)
      }, "\u25BC"));
    }
    var qty = whQty(stock, eq),
      cards = whCards(machines, eq),
      legacy = whLegacy(stock, machines, eq);
    var act = activeCount[eq] || 0,
      free = qty - act;
    var cardType = cat === "szyny" || cat === "wozki" || cards.length > 0;
    var isOpen = !!open[eq];
    var due = cards.filter(function (c) {
      var s = whServiceInfo(c, today).status;
      return s === "zaległy" || s === "wkrótce";
    }).length;
    var iss = issuesOf(eq),
      issOpen = iss.filter(function (i) {
        return !i.done;
      }),
      issDone = iss.filter(function (i) {
        return i.done;
      });
    var entries = whServiceEntries(stock, machines, eq);
    var shownEntries = allEntries[eq] ? entries : entries.slice(0, 5);
    var sw = seatWidth[eq],
      tw = totalWidth[eq];
    return /*#__PURE__*/React.createElement(Card, {
      key: eq,
      style: {
        padding: 0,
        overflow: "hidden",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return setOpen(function (o) {
          return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, eq, !o[eq]));
        });
      },
      style: {
        padding: "13px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, eq), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginTop: 1
      }
    }, cat === "wozki" && (sw || tw) ? (sw ? "siedzisko " + sw + " cm" : "") + (sw && tw ? " · " : "") + (tw ? "całk. " + tw + " cm" : "") : cardType ? cards.length + " z kartą" + (legacy > 0 ? " · " + legacy + " starszych bez karty" : "") : "liczone ilościowo", due > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#E05C5C",
        marginLeft: 8
      }
    }, "\uD83D\uDD27 serwis: ", due), issOpen.length > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#D9822B",
        marginLeft: 8
      }
    }, "uwagi: ", issOpen.length))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 800,
        fontSize: 18
      }
    }, free, "/", qty), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: subC
      }
    }, "wolne")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: subC
      }
    }, isOpen ? "▲" : "▼")), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid ".concat(lineC),
        padding: "12px 16px 14px"
      }
    }, cat === null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#F4A261",
        marginBottom: 10
      }
    }, "Ten sprz\u0119t nie ma jeszcze grupy. Wybierz j\u0105 w ustawieniach poni\u017Cej."), cardType ? /*#__PURE__*/React.createElement(React.Fragment, null, cards.length > qty && /*#__PURE__*/React.createElement("div", {
      style: {
        background: dk ? "#3A2A14" : "#FEF3E2",
        borderRadius: 10,
        padding: "10px 12px",
        marginBottom: 10,
        fontSize: 12
      }
    }, "\u26A0 Kart (", cards.length, ") jest wi\u0119cej ni\u017C sztuk w stanie (", qty, "). ", /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setStock(function (s) {
          return whChangeQty(s, eq, cards.length - qty, today);
        });
      },
      style: _objectSpread(_objectSpread({}, linkBtn), {}, {
        padding: 0
      })
    }, "Dopasuj liczb\u0119 sztuk")), cards.map(renderCard), legacy > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px dashed ".concat(dk ? "#2A3A56" : "#C9D6E8"),
        background: boxBg,
        borderRadius: 12,
        padding: "10px 12px",
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 180
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700
      }
    }, "Starsze sztuki bez karty: ", legacy)), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary",
      onClick: function onClick() {
        return openConvert(eq);
      }
    }, "Utw\xF3rz kart\u0119")), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      style: {
        marginTop: 4
      },
      onClick: function onClick() {
        return openNewCard(eq);
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      d: I.plus,
      s: 16,
      c: "#fff"
    }), " Nowa sztuka")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return changeQty(eq, -1);
      },
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        border: "1.5px solid #D9E2F0",
        background: dk ? "#18202F" : "#EFF3FA",
        fontSize: 20,
        cursor: "pointer",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontFamily: "inherit"
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        minWidth: 28,
        textAlign: "center"
      }
    }, qty), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return changeQty(eq, 1);
      },
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        border: "1.5px solid #D9E2F0",
        background: dk ? "#18202F" : "#EFF3FA",
        fontSize: 20,
        cursor: "pointer",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontFamily: "inherit"
      }
    }, "+"), "            "), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        borderTop: "1px solid ".concat(lineC),
        paddingTop: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 6
      }
    }, "Serwis i naprawy", entries.length > 0 ? " (" + entries.length + ")" : ""), renderEntries(eq, shownEntries), entries.length > 5 && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setAllEntries(function (a) {
          return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, eq, !a[eq]));
        });
      },
      style: linkBtn
    }, allEntries[eq] ? "Pokaż mniej" : "Pokaż wszystkie (" + entries.length + ")"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return openSrv(eq, "");
      },
      style: linkBtn
    }, "+ Wpis serwisowy"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 2
      }
    }, "Uwagi do za\u0142atwienia", issOpen.length > 0 ? " (" + issOpen.length + ")" : ""), issOpen.map(function (i) {
      return renderIssue(eq, i);
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return openIssue(eq, "");
      },
      style: linkBtn
    }, "+ Dodaj uwag\u0119"), issDone.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setDoneOpen(function (d) {
          return _objectSpread(_objectSpread({}, d), {}, _defineProperty({}, eq, !d[eq]));
        });
      },
      style: _objectSpread(_objectSpread({}, linkBtn), {}, {
        color: subC
      })
    }, doneOpen[eq] ? "Ukryj zrobione" : "Zrobione (" + issDone.length + ")")), doneOpen[eq] && issDone.map(function (i) {
      return renderIssue(eq, i);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setCfg(function (c) {
          return _objectSpread(_objectSpread({}, c), {}, _defineProperty({}, eq, !c[eq]));
        });
      },
      style: linkBtn
    }, cfg[eq] ? "▲ Ukryj ustawienia sprzętu" : "⚙ Ustawienia sprzętu"), cfg[eq] && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        padding: 12,
        background: boxBg,
        borderRadius: 12
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 6
      }
    }, "Grupa"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 14
      }
    }, EQUIPMENT_GROUPS.map(function (g) {
      return /*#__PURE__*/React.createElement("button", {
        key: g.key,
        onClick: function onClick() {
          return assignCategory(eq, g.key);
        },
        style: {
          flex: 1,
          padding: "10px 4px",
          borderRadius: 8,
          border: "1px solid " + (cat === g.key ? "#3E6FB0" : "#D9E2F0"),
          background: cat === g.key ? "#3E6FB0" : "none",
          color: cat === g.key ? "#fff" : "#3E6FB0",
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, g.label);
    })), /*#__PURE__*/React.createElement(Inp, {
      label: "Dodano do magazynu (od kiedy liczy\u0107 ob\u0142o\u017Cenie)",
      value: addedDate[eq] || "",
      onChange: function onChange(v) {
        if (v) setStock(function (s) {
          return _objectSpread(_objectSpread({}, s || {}), {}, {
            addedDate: _objectSpread(_objectSpread({}, (s || {}).addedDate || {}), {}, _defineProperty({}, eq, v))
          });
        });
      },
      type: "date"
    }), cat === "wozki" && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Inp, {
      label: "Siedzisko (cm)",
      value: seatWidth[eq] || "",
      onChange: function onChange(v) {
        return setStock(function (s) {
          return _objectSpread(_objectSpread({}, s || {}), {}, {
            seatWidth: _objectSpread(_objectSpread({}, (s || {}).seatWidth || {}), {}, _defineProperty({}, eq, v))
          });
        });
      },
      type: "number"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Inp, {
      label: "Ca\u0142kowita (cm)",
      value: totalWidth[eq] || "",
      onChange: function onChange(v) {
        return setStock(function (s) {
          return _objectSpread(_objectSpread({}, s || {}), {}, {
            totalWidth: _objectSpread(_objectSpread({}, (s || {}).totalWidth || {}), {}, _defineProperty({}, eq, v))
          });
        });
      },
      type: "number"
    }))), /*#__PURE__*/React.createElement(Inp, {
      label: "Domy\u015Blny koszt zakupu 1 szt. (z\u0142)",
      value: demo ? "" : (costs[eq] || {}).purchase || "",
      onChange: function onChange(v) {
        return setStock(function (s) {
          var cur = s || {};
          var ex = (cur.costs || {})[eq] || {
            purchase: 0,
            repairs: []
          };
          return _objectSpread(_objectSpread({}, cur), {}, {
            costs: _objectSpread(_objectSpread({}, cur.costs || {}), {}, _defineProperty({}, eq, _objectSpread(_objectSpread({}, ex), {}, {
              purchase: +v || 0
            })))
          });
        });
      },
      type: "number"
    }), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "danger",
      onClick: function onClick() {
        return archiveType(eq);
      }
    }, "Archiwizuj sprz\u0119t")))));
  };
  var groupsAll = [].concat(_toConsumableArray(EQUIPMENT_GROUPS), [{
    key: null,
    label: "Nieprzypisane"
  }]);
  var shownGroups = group === "all" ? groupsAll : groupsAll.filter(function (g) {
    return g.key === group;
  });
  var groupQty = function groupQty(key) {
    return activeNames.filter(function (n) {
      return categoryOf(n) === key;
    }).reduce(function (s, n) {
      return s + whQty(stock, n);
    }, 0);
  };

  // opis potwierdzenia trwałego usunięcia
  var purgeInfo = function () {
    if (!confirmPurge) return null;
    if (confirmPurge.kind === "type") {
      var name = confirmPurge.name;
      var cards = (machines || []).filter(function (m) {
        return m.type === name;
      }).length;
      var hist = (rentals || []).filter(function (r) {
        return r.equipment === name;
      }).length;
      var act = (rentals || []).filter(function (r) {
        return r.equipment === name && r.status === "aktywne";
      }).length;
      var iss = issuesOf(name).length;
      return {
        kind: "type",
        title: "Usunąć na stałe?",
        name: name,
        cards: cards,
        hist: hist,
        act: act,
        iss: iss
      };
    }
    var c = (machines || []).find(function (m) {
      return m.id === confirmPurge.id;
    });
    if (!c) return null;
    var costly = (c.serviceLog || []).filter(function (e) {
      return +e.cost > 0;
    });
    return {
      kind: "card",
      title: "Usunąć kartę na stałe?",
      c: c,
      entries: (c.serviceLog || []).length,
      costly: costly.length,
      sum: costly.reduce(function (a, e) {
        return a + (+e.cost || 0);
      }, 0)
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 20px 12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 18,
      fontWeight: 800
    }
  }, "Magazyn"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6"
    }
  }, demo ? "?" : totalQty, " sztuk \xB7 ", demo ? "?" : totalOut, " wypo\u017Cyczonych")), /*#__PURE__*/React.createElement(Btn, {
    small: true,
    onClick: function onClick() {
      return openNewType(group === "all" ? "szyny" : group);
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    d: I.plus,
    s: 16,
    c: "#fff"
  }), " Nowy sprz\u0119t")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 20px 14px",
      flexWrap: "wrap"
    }
  }, [{
    k: "all",
    l: "Wszystko (" + totalQty + ")"
  }].concat(_toConsumableArray(EQUIPMENT_GROUPS.map(function (g) {
    return {
      k: g.key,
      l: g.label + " (" + groupQty(g.key) + ")"
    };
  }))).map(function (x) {
    return /*#__PURE__*/React.createElement("button", {
      key: x.k,
      onClick: function onClick() {
        return setGroup(x.k);
      },
      style: {
        flex: "1 1 auto",
        padding: "8px 10px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 12,
        whiteSpace: "nowrap",
        background: group === x.k ? "#3E6FB0" : dk ? "#1E2F4A" : "#D9E2F0",
        color: group === x.k ? "#fff" : dk ? "#6B84AC" : "#3E5578",
        fontFamily: "inherit",
        textAlign: "center"
      }
    }, x.l);
  })), att.due.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 6
    }
  }, "Do serwisu"), att.due.map(function (_ref4) {
    var c = _ref4.c,
      s = _ref4.s;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: function onClick() {
        setOpen(function (o) {
          return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, c.type, true));
        });
        setSelCard(c.id);
        setGroup("all");
      },
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
        cursor: "pointer",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("b", null, c.code || "(bez kodu)"), " \xB7 ", c.type), /*#__PURE__*/React.createElement(Badge, {
      color: s.status === "zaległy" ? "#E05C5C" : "#F4A261"
    }, s.status === "zaległy" ? Math.abs(s.left) + " dni po terminie" : "za " + s.left + " dni"));
  }))), att.issues.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 2
    }
  }, "Do za\u0142atwienia przy sprz\u0119cie (", att.issues.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: subC,
      marginBottom: 6
    }
  }, "najpierw sztuki w magazynie, potem wed\u0142ug najbli\u017Cszego zwrotu"), issuesSorted.slice(0, 5).map(function (i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i.eq + "-" + i.id,
      onClick: function onClick() {
        setOpen(function (o) {
          return _objectSpread(_objectSpread({}, o), {}, _defineProperty({}, i.eq, true));
        });
        setGroup("all");
      },
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
        cursor: "pointer",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        minWidth: 0
      }
    }, i.text, function () {
      var w = whereOf(i);
      return /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontSize: 11,
          color: w.out ? "#D9822B" : subC,
          marginTop: 2
        }
      }, w.txt);
    }()), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: subC,
        flexShrink: 0,
        textAlign: "right"
      }
    }, i.eq, function () {
      var w = whereOf(i);
      return w.code ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block"
        }
      }, w.code) : null;
    }()));
  }), att.issues.length > 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: subC,
      marginTop: 2
    }
  }, "\u2026i ", att.issues.length - 5, " wi\u0119cej"))), shownGroups.map(function (g) {
    var names = activeNames.filter(function (n) {
      return categoryOf(n) === g.key;
    });
    if (names.length === 0 && g.key === null) return null;
    var isReorder = reorder !== null && reorder === g.key;
    var action = g.key !== null && names.length > 1 ? /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setReorder(isReorder ? null : g.key);
      },
      style: _objectSpread(_objectSpread({}, linkBtn), {}, {
        whiteSpace: "nowrap",
        padding: "6px 4px"
      })
    }, isReorder ? "Gotowe" : "Kolejność") : null;
    return /*#__PURE__*/React.createElement("div", {
      key: g.key || "none",
      style: {
        padding: "0 20px",
        marginBottom: 14
      }
    }, groupHeader(g.key, g.label, action), names.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: subC,
        marginBottom: 8
      }
    }, "Brak sprz\u0119tu w tej grupie"), names.map(function (eq, idx) {
      return renderType(eq, idx, names);
    }));
  }), archivedCards.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowRetired(function (v) {
        return !v;
      });
    },
    style: linkBtn
  }, showRetired ? "▲" : "▼", " Archiwum sztuk (", archivedCards.length, ")"), showRetired && archivedCards.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid ".concat(lineC),
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, c.code || "(bez kodu)", " \xB7 ", c.type), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC
      }
    }, c.retired ? "wycofana " + (c.retiredDate || "?") + (c.retiredReason ? " · " + c.retiredReason : "") : "stary wpis z dawnej zakładki Serwis")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        flexShrink: 0
      }
    }, c.retired && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return doRestore(c.id);
      },
      style: linkBtn
    }, "Przywr\xF3\u0107"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setConfirmPurge({
          kind: "card",
          id: c.id
        });
      },
      style: _objectSpread(_objectSpread({}, linkBtn), {}, {
        color: "#E05C5C"
      })
    }, "Usu\u0144")));
  })), hiddenNames.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px",
      marginBottom: 14
    }
  }, groupHeader(null, "Zarchiwizowany sprzęt"), hiddenNames.map(function (eq) {
    return /*#__PURE__*/React.createElement("div", {
      key: eq,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px 0",
        borderBottom: "1px solid ".concat(lineC),
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: subC,
        minWidth: 0
      }
    }, eq), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return restoreType(eq);
      },
      style: linkBtn
    }, "Przywr\xF3\u0107"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setConfirmPurge({
          kind: "type",
          name: eq
        });
      },
      style: _objectSpread(_objectSpread({}, linkBtn), {}, {
        color: "#E05C5C"
      })
    }, "Usu\u0144 na sta\u0142e")));
  })), cardForm && /*#__PURE__*/React.createElement(Modal, {
    title: cardForm.mode === "new" ? "Nowa sztuka" : cardForm.mode === "convert" ? "Karta dla starszej sztuki" : "Edytuj kartę",
    onClose: function onClose() {
      return setCardForm(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      marginBottom: 14
    }
  }, cardForm.eq), /*#__PURE__*/React.createElement(Inp, {
    label: "Kod magazynowy *",
    value: cardForm.code,
    onChange: function onChange(v) {
      setFormError("");
      setCardForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          code: v
        });
      });
    }
  }), formError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#E05C5C",
      margin: "-8px 0 12px"
    }
  }, formError), /*#__PURE__*/React.createElement(Inp, {
    label: "Numer fabryczny",
    value: cardForm.serialNo,
    onChange: function onChange(v) {
      return setCardForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          serialNo: v
        });
      });
    },
    placeholder: "opcjonalnie"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: cardForm.mode === "new" ? "Data zakupu" : "Data zakupu (opcjonalnie)",
    value: cardForm.purchaseDate,
    onChange: function onChange(v) {
      return setCardForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          purchaseDate: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Cena zakupu (z\u0142)",
    value: cardForm.price,
    onChange: function onChange(v) {
      return setCardForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          price: v
        });
      });
    },
    type: "number",
    placeholder: "puste = domy\u015Blna cena typu"
  }), cardForm.mode === "convert" && function () {
    var out = (rentals || []).filter(function (r) {
      return r.status === "aktywne" && r.equipment === cardForm.eq && !r.machineId;
    });
    return /*#__PURE__*/React.createElement(Sel, {
      label: "Gdzie jest ta sztuka teraz?",
      value: cardForm.where,
      onChange: function onChange(v) {
        return setCardForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            where: v
          });
        });
      },
      options: [{
        value: "",
        label: "W magazynie (wolna)"
      }].concat(_toConsumableArray(out.map(function (r) {
        return {
          value: String(r.id),
          label: who(r) + (r.endDate ? " · do " + r.endDate : "")
        };
      })))
    });
  }(), cardForm.mode === "edit" && /*#__PURE__*/React.createElement(Inp, {
    label: "Serwis co ile dni",
    value: cardForm.period,
    onChange: function onChange(v) {
      return setCardForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          period: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatki",
    value: cardForm.notes,
    onChange: function onChange(v) {
      return setCardForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2
  }), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: saveCard
  }, cardForm.mode === "new" ? "Dodaj sztukę" : cardForm.mode === "convert" ? "Utwórz kartę" : "Zapisz")), srvForm && function () {
    var cards = whCards(machines, srvForm.eq);
    return /*#__PURE__*/React.createElement(Modal, {
      title: "Wpis serwisowy",
      onClose: function onClose() {
        return setSrvForm(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6",
        marginBottom: 14
      }
    }, srvForm.eq), /*#__PURE__*/React.createElement(Inp, {
      label: "Data",
      value: srvForm.date,
      onChange: function onChange(v) {
        setFormError("");
        setSrvForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            date: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Rodzaj",
      value: srvForm.type,
      onChange: function onChange(v) {
        return setSrvForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            type: v
          });
        });
      },
      options: ["Przegląd", "Naprawa", "Wymiana części", "Kalibracja", "Czyszczenie", "Inne"].map(function (x) {
        return {
          value: x,
          label: x
        };
      })
    }), cards.length > 0 && /*#__PURE__*/React.createElement(Sel, {
      label: "Kt\xF3rej sztuki dotyczy?",
      value: srvForm.cardId,
      onChange: function onChange(v) {
        return setSrvForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            cardId: v
          });
        });
      },
      options: [{
        value: "",
        label: "Nie wskazuję (cały sprzęt)"
      }].concat(_toConsumableArray(cards.map(function (c) {
        return {
          value: String(c.id),
          label: (c.code || "(bez kodu)") + (c.serialNo ? " · " + c.serialNo : "")
        };
      })))
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Opis",
      value: srvForm.notes,
      onChange: function onChange(v) {
        return setSrvForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            notes: v
          });
        });
      },
      rows: 2
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Koszt (z\u0142)",
      value: srvForm.cost,
      onChange: function onChange(v) {
        return setSrvForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            cost: v
          });
        });
      },
      type: "number",
      placeholder: "0"
    }), formError && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#E05C5C",
        marginBottom: 12
      }
    }, formError), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: saveSrv
    }, "Zapisz"));
  }(), issueForm && function () {
    var cards = whCards(machines, issueForm.eq);
    return /*#__PURE__*/React.createElement(Modal, {
      title: "Nowa uwaga",
      onClose: function onClose() {
        return setIssueForm(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6",
        marginBottom: 14
      }
    }, issueForm.eq), /*#__PURE__*/React.createElement(Txa, {
      label: "Co trzeba zrobi\u0107?",
      value: issueForm.text,
      onChange: function onChange(v) {
        setFormError("");
        setIssueForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            text: v
          });
        });
      },
      rows: 3
    }), cards.length > 0 && /*#__PURE__*/React.createElement(Sel, {
      label: "Kt\xF3rej sztuki dotyczy?",
      value: issueForm.cardId,
      onChange: function onChange(v) {
        return setIssueForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            cardId: v
          });
        });
      },
      options: [{
        value: "",
        label: "Cały sprzęt / nie wiem"
      }].concat(_toConsumableArray(cards.map(function (c) {
        return {
          value: String(c.id),
          label: (c.code || "(bez kodu)") + (c.serialNo ? " · " + c.serialNo : "")
        };
      })))
    }), formError && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#E05C5C",
        marginBottom: 12
      }
    }, formError), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: saveIssue
    }, "Dodaj uwag\u0119"));
  }(), retireForm && /*#__PURE__*/React.createElement(Modal, {
    title: "Wycofaj sztuk\u0119",
    onClose: function onClose() {
      return setRetireForm(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      marginBottom: 14
    }
  }, function () {
    var rc = (machines || []).find(function (m) {
      return m.id === retireForm.id;
    });
    return rc ? (rc.code || "(bez kodu)") + " · " + rc.type : "";
  }()), /*#__PURE__*/React.createElement(Inp, {
    label: "Data wycofania",
    value: retireForm.date,
    onChange: function onChange(v) {
      setFormError("");
      setRetireForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Pow\xF3d (opcjonalnie)",
    value: retireForm.reason,
    onChange: function onChange(v) {
      return setRetireForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          reason: v
        });
      });
    },
    rows: 2
  }), formError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#E05C5C",
      marginBottom: 12
    }
  }, formError), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: doRetire
  }, "Wycofaj sztuk\u0119")), confirmDel !== null && /*#__PURE__*/React.createElement(Modal, {
    title: "Usun\u0105\u0107 kart\u0119?",
    onClose: function onClose() {
      return setConfirmDel(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#7A8FA6",
      marginBottom: 16
    }
  }, "Karta zniknie, ale sztuka nie: wr\xF3ci do \"starszych sztuk bez karty\" i liczba sztuk si\u0119 nie zmieni. Karty z histori\u0105 serwisu lub wypo\u017Cycze\u0144 usun\u0105\u0107 si\u0119 nie da."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: function onClick() {
      return setConfirmDel(null);
    }
  }, "Anuluj"), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: doDelete
  }, "Usu\u0144 kart\u0119"))), purgeInfo && /*#__PURE__*/React.createElement(Modal, {
    title: purgeInfo.title,
    onClose: function onClose() {
      return setConfirmPurge(null);
    }
  }, purgeInfo.kind === "type" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      marginBottom: 10
    }
  }, purgeInfo.name), purgeInfo.act > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#E05C5C",
      marginBottom: 16
    }
  }, "Ten sprz\u0119t ma aktywne wypo\u017Cyczenie (", purgeInfo.act, "). Najpierw je zako\u0144cz, potem b\u0119dzie mo\u017Cna go usun\u0105\u0107.") : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#7A8FA6",
      marginBottom: 16,
      lineHeight: 1.55
    }
  }, "Zniknie z magazynu razem z ustawieniami: liczb\u0105 sztuk, datami, kosztem zakupu, histori\u0105 liczby sztuk", purgeInfo.cards > 0 ? ", " + purgeInfo.cards + " kartami" : "", purgeInfo.iss > 0 ? " i " + purgeInfo.iss + " uwagami" : "", ".", purgeInfo.hist > 0 ? " Wypożyczenia z historii (" + purgeInfo.hist + ") zostają, ale nie będą już przypisane do sprzętu w magazynie." : "", " Tego nie da si\u0119 cofn\u0105\u0107.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      marginBottom: 10
    }
  }, purgeInfo.c.code || "(bez kodu)", " \xB7 ", purgeInfo.c.type), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#7A8FA6",
      marginBottom: 16,
      lineHeight: 1.55
    }
  }, purgeInfo.entries > 0 ? "Historia serwisu tej sztuki znika (" + purgeInfo.entries + " wpisów). " : "Karta nie ma wpisów serwisowych. ", purgeInfo.costly > 0 ? "Koszty (" + (demo ? "****" : purgeInfo.sum + " zł") + ") zostają jako naprawy całego sprzętu, więc Finanse i Statystyki się nie zmienią. " : "", "Tego nie da si\u0119 cofn\u0105\u0107.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: function onClick() {
      return setConfirmPurge(null);
    }
  }, purgeInfo.act > 0 ? "Zamknij" : "Anuluj"), !(purgeInfo.act > 0) && /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: doPurge
  }, "Usu\u0144 na sta\u0142e"))), typeForm && /*#__PURE__*/React.createElement(Modal, {
    title: "Nowy sprz\u0119t",
    onClose: function onClose() {
      return setTypeForm(null);
    }
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Grupa",
    value: typeForm.category,
    onChange: function onChange(v) {
      return setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          category: v
        });
      });
    },
    options: EQUIPMENT_GROUPS.map(function (g) {
      return {
        value: g.key,
        label: g.label
      };
    })
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Nazwa sprz\u0119tu *",
    value: typeForm.name,
    onChange: function onChange(v) {
      setFormError("");
      setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          name: v
        });
      });
    }
  }), typeForm.category === "szyny" || typeForm.category === "wozki" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Inp, {
    label: "Kod magazynowy pierwszej sztuki *",
    value: typeForm.code,
    onChange: function onChange(v) {
      setFormError("");
      setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          code: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Numer fabryczny",
    value: typeForm.serialNo,
    onChange: function onChange(v) {
      return setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          serialNo: v
        });
      });
    },
    placeholder: "opcjonalnie"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Cena zakupu (z\u0142)",
    value: typeForm.price,
    onChange: function onChange(v) {
      return setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          price: v
        });
      });
    },
    type: "number",
    placeholder: "opcjonalnie"
  })) : /*#__PURE__*/React.createElement(Inp, {
    label: "Liczba sztuk",
    value: typeForm.qty,
    onChange: function onChange(v) {
      return setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          qty: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data zakupu / dodania do magazynu",
    value: typeForm.purchaseDate,
    onChange: function onChange(v) {
      return setTypeForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          purchaseDate: v
        });
      });
    },
    type: "date"
  }), formError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#E05C5C",
      margin: "-4px 0 12px"
    }
  }, formError), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: saveType
  }, "Dodaj sprz\u0119t")), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast,
    onDone: function onDone() {
      return setToast(null);
    }
  }));
}
