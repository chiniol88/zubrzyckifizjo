// Plik wygenerowany z js/app.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// ── APP ───────────────────────────────────────────────────────────────────
var TABS = [{
  id: "dashboard",
  i: I.home,
  l: "Pulpit"
}, {
  id: "patients",
  i: I.users,
  l: "Pacjenci"
}, {
  id: "rentals",
  i: I.equip,
  l: "Sprzęt"
}, {
  id: "nfz",
  i: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  l: "Wózki"
}, {
  id: "finances",
  i: I.fin,
  l: "Finanse"
}, {
  id: "magazyn",
  i: I.box,
  l: "Magazyn"
}, {
  id: "settings",
  i: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  l: "Ustawienia"
}];
function useIsDesktop() {
  var _React$useState = React.useState(function () {
      return window.innerWidth >= 900;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    desk = _React$useState2[0],
    setDesk = _React$useState2[1];
  React.useEffect(function () {
    var h = function h() {
      return setDesk(window.innerWidth >= 900);
    };
    window.addEventListener("resize", h);
    return function () {
      return window.removeEventListener("resize", h);
    };
  }, []);
  return desk;
}
function App(_ref) {
  var visits = _ref.visits,
    setVisits = _ref.setVisits,
    patients = _ref.patients,
    setPatients = _ref.setPatients,
    rentals = _ref.rentals,
    setRentals = _ref.setRentals,
    finances = _ref.finances,
    setFinances = _ref.setFinances,
    stock = _ref.stock,
    setStock = _ref.setStock,
    nfzCases = _ref.nfzCases,
    setNfzCases = _ref.setNfzCases,
    todos = _ref.todos,
    setTodos = _ref.setTodos,
    events = _ref.events,
    setEvents = _ref.setEvents,
    dark = _ref.dark,
    setDark = _ref.setDark,
    settings = _ref.settings,
    setSettings = _ref.setSettings,
    exportData = _ref.exportData,
    importData = _ref.importData,
    demo = _ref.demo,
    setDemo = _ref.setDemo,
    budget = _ref.budget,
    setBudget = _ref.setBudget,
    machines = _ref.machines,
    setMachines = _ref.setMachines,
    wealth = _ref.wealth,
    setWealth = _ref.setWealth;
  var _useState = useState(function () {
      var h0 = window.location.hash.replace("#", "").split("-")[0];
      var h = h0 === "serwis" ? "magazyn" : h0;
      return ["dashboard", "patients", "rentals", "finances", "nfz", "magazyn", "settings"].includes(h) ? h : "dashboard";
    }),
    _useState2 = _slicedToArray(_useState, 2),
    tab = _useState2[0],
    setTab = _useState2[1];
  useEffect(function () {
    if (tab !== "finances") window.location.replace("#" + tab);
  }, [tab]);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    dlRental = _useState4[0],
    setDlRental = _useState4[1];
  var _useState5 = useState("rentals"),
    _useState6 = _slicedToArray(_useState5, 2),
    dlReturnTab = _useState6[0],
    setDlReturnTab = _useState6[1];
  var _useState7 = useState("Wypożyczalnia"),
    _useState8 = _slicedToArray(_useState7, 2),
    dlBackLabel = _useState8[0],
    setDlBackLabel = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    wozkiSel = _useState0[0],
    setWozkiSel = _useState0[1];
  var _useState1 = useState("aktywne"),
    _useState10 = _slicedToArray(_useState1, 2),
    rentalsView = _useState10[0],
    setRentalsView = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    addRentalDate = _useState12[0],
    setAddRentalDate = _useState12[1];
  var _goToRental = function goToRental(id) {
    var returnTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "rentals";
    setDlReturnTab(returnTab);
    setDlBackLabel(returnTab === "dashboard" ? "Pulpit" : returnTab === "magazyn" ? "Magazyn" : "Wypożyczalnia");
    setDlRental(id);
    setTab("rentals");
  };
  var goToAddRental = function goToAddRental(date) {
    setAddRentalDate(date);
    setTab("rentals");
  };
  var goToWozki = function goToWozki(id) {
    setWozkiSel(id);
    setTab("nfz");
  };
  var goToMagazyn = function goToMagazyn() {
    return setTab("magazyn");
  };
  var allClients = useMemo(function () {
    var existing = new Set((patients || []).map(function (p) {
      return p.name;
    }));
    var extras = [];
    var seen = new Set();
    [].concat(_toConsumableArray(rentals || []), _toConsumableArray(nfzCases || [])).forEach(function (item) {
      var n = item.patientName;
      if (!n || existing.has(n) || seen.has(n)) return;
      seen.add(n);
      extras.push({
        id: 'ac-' + n,
        name: n,
        phone: item.phone || "",
        address: item.address || ""
      });
    });
    return [].concat(_toConsumableArray(patients || []), extras);
  }, [patients, rentals, nfzCases]);
  var dk = dark;
  var desk = useIsDesktop();
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isSaving = _useState14[0],
    setIsSaving = _useState14[1];
  useEffect(function () {
    var h = function h(e) {
      return setIsSaving(e.detail);
    };
    window.addEventListener("fizjo-save", h);
    return function () {
      return window.removeEventListener("fizjo-save", h);
    };
  }, []);
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    saveError = _useState16[0],
    setSaveError = _useState16[1];
  useEffect(function () {
    var h = function h(e) {
      return setSaveError(e.detail);
    };
    window.addEventListener("fizjo-save-error", h);
    return function () {
      return window.removeEventListener("fizjo-save-error", h);
    };
  }, []);
  var activeRentals = (rentals || []).filter(function (r) {
    return r.status === "aktywne";
  }).length;
  var todayVisits = (visits || []).filter(function (v) {
    return v.date === todayLocal();
  }).length;
  var unpaidCount = (rentals || []).filter(function (r) {
    return r.status === "aktywne" && r.renewable && (r.cycles || []).some(function (c) {
      return !c.paid && !c.cancelled;
    });
  }).length;
  var content = /*#__PURE__*/React.createElement(TabBoundary, {
    key: tab,
    name: tab
  }, tab === "dashboard" && /*#__PURE__*/React.createElement(Dashboard, {
    visits: visits,
    setVisits: setVisits,
    rentals: rentals,
    setRentals: setRentals,
    finances: finances,
    setFinances: setFinances,
    patients: patients,
    allClients: allClients,
    goToRental: function goToRental(id) {
      return _goToRental(id, "dashboard");
    },
    onAddRental: goToAddRental,
    nfzCases: nfzCases,
    goToWozki: goToWozki,
    todos: todos,
    setTodos: setTodos,
    events: events,
    setEvents: setEvents,
    stock: stock,
    machines: machines,
    goToMagazyn: goToMagazyn
  }), tab === "patients" && /*#__PURE__*/React.createElement(Patients, {
    patients: patients,
    setPatients: setPatients,
    visits: visits,
    setVisits: setVisits,
    finances: finances,
    setFinances: setFinances,
    rentals: rentals,
    setRentals: setRentals,
    nfzCases: nfzCases,
    setNfzCases: setNfzCases,
    allClients: allClients,
    priv: {
      events: events,
      setEvents: setEvents,
      todos: todos,
      setTodos: setTodos,
      stock: stock,
      setStock: setStock,
      machines: machines,
      setMachines: setMachines,
      budget: budget,
      setBudget: setBudget,
      wealth: wealth,
      setWealth: setWealth
    }
  }), tab === "rentals" && /*#__PURE__*/React.createElement(Rentals, {
    key: dlRental !== null && dlRental !== void 0 ? dlRental : 0,
    rentals: rentals,
    setRentals: setRentals,
    finances: finances,
    setFinances: setFinances,
    patients: patients,
    setPatients: setPatients,
    nfzCases: nfzCases,
    setNfzCases: setNfzCases,
    allClients: allClients,
    initialDetail: dlRental,
    backLabel: dlBackLabel,
    onDetailClosed: function onDetailClosed() {
      setDlRental(null);
      setDlBackLabel("Wypożyczalnia");
      setDlReturnTab("rentals");
      setTab(dlReturnTab);
    },
    initialAddDate: addRentalDate,
    onAddDateHandled: function onAddDateHandled() {
      return setAddRentalDate(null);
    },
    rentalsView: rentalsView,
    setRentalsView: setRentalsView,
    stock: stock,
    setStock: setStock,
    settings: settings
  }), tab === "finances" && /*#__PURE__*/React.createElement(Finances, {
    finances: finances,
    setFinances: setFinances,
    visits: visits,
    setVisits: setVisits,
    rentals: rentals,
    setRentals: setRentals,
    nfzCases: nfzCases,
    setNfzCases: setNfzCases,
    budget: budget,
    setBudget: setBudget,
    desk: desk,
    stock: stock,
    setStock: setStock,
    machines: machines,
    setMachines: setMachines,
    wealth: wealth,
    setWealth: setWealth,
    goToRental: function goToRental(id) {
      return _goToRental(id, "finances");
    },
    goToWozki: goToWozki
  }), tab === "nfz" && /*#__PURE__*/React.createElement(NFZ, {
    nfzCases: nfzCases,
    setNfzCases: setNfzCases,
    initialSel: wozkiSel,
    onSelCleared: function onSelCleared() {
      return setWozkiSel(null);
    },
    setFinances: setFinances,
    patients: patients,
    setPatients: setPatients,
    rentals: rentals,
    setRentals: setRentals,
    allClients: allClients
  }), tab === "magazyn" && /*#__PURE__*/React.createElement(Magazyn, {
    rentals: rentals,
    setRentals: setRentals,
    machines: machines,
    setMachines: setMachines,
    stock: stock,
    setStock: setStock,
    setFinances: setFinances,
    goToRental: function goToRental(id) {
      return _goToRental(id, "magazyn");
    }
  }), tab === "settings" && /*#__PURE__*/React.createElement(Settings, {
    dark: dark,
    setDark: setDark,
    settings: settings,
    setSettings: setSettings,
    exportData: exportData,
    importData: importData,
    demo: demo,
    setDemo: setDemo,
    setRentals: setRentals,
    setFinances: setFinances
  }));
  if (desk) {
    var sb = dk ? "#0A1220" : "#0E1B30";
    var sbHov = dk ? "#1A2840" : "#1B2C4A";
    var sbAct = "#3E6FB0";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        minHeight: "100vh",
        background: dk ? "#0E141F" : "#E4E9F2",
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, (isSaving || saveError) && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 200,
        background: saveError ? "#E05C5C" : "#3E6FB0",
        color: "#fff",
        borderRadius: 10,
        padding: "8px 14px",
        fontSize: 12,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 6,
        boxShadow: "0 4px 16px rgba(0,0,0,.18)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#fff",
        opacity: .85,
        animation: saveError ? "none" : "spin .8s linear infinite"
      }
    }), saveError ? "⚠ Brak połączenia — próbuję dalej zapisać" : "Zapisywanie…"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 230,
        flexShrink: 0,
        background: sb,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 100,
        boxShadow: "4px 0 24px rgba(0,0,0,.18)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "20px 14px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 10,
        background: "#3E6FB0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 800,
        fontSize: 13,
        color: "#E8F5F5",
        letterSpacing: 0
      }
    }, "ZubrzyckiFizjo"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#6B84AC",
        fontWeight: 500
      }
    }, "Panel fizjoterapeuty")))), /*#__PURE__*/React.createElement("nav", {
      style: {
        flex: 1,
        padding: "0 10px",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, TABS.map(function (t) {
      var active = tab === t.id;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        onClick: function onClick() {
          return setTab(t.id);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "11px 14px",
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          background: active ? sbAct : sbHov + "00",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: 14,
          color: active ? "#fff" : "#7A93B8",
          textAlign: "left",
          width: "100%",
          transition: "background .15s",
          WebkitUserSelect: "none"
        },
        onMouseEnter: function onMouseEnter(e) {
          if (!active) e.currentTarget.style.background = sbHov;
        },
        onMouseLeave: function onMouseLeave(e) {
          if (!active) e.currentTarget.style.background = "transparent";
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 9,
          background: active ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(Ico, {
        d: t.i,
        s: 17,
        c: active ? "#fff" : "#6B84AC"
      })), t.l);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 14px 24px",
        borderTop: "1px solid rgba(255,255,255,.06)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#3A6060",
        textAlign: "center"
      }
    }, "\xA9 ", new Date().getFullYear(), " Patryk Zubrzycki"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 230,
        flex: 1,
        minWidth: 0,
        minHeight: "100vh",
        background: dk ? "#0E141F" : "#E4E9F2"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 860,
        margin: "0 auto",
        minHeight: "100vh",
        background: dk ? "#111826" : "#EFF3FA",
        boxShadow: dk ? "0 0 40px rgba(0,0,0,.18)" : "0 0 40px rgba(16,40,40,.05)"
      }
    }, content)));
  }

  // Mobile layout
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      margin: "0 auto",
      background: dk ? "#0E141F" : "#EFF3FA",
      minHeight: "100vh",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      overflowX: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80,
      minHeight: "100vh"
    }
  }, content), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: dk ? "#111826" : "#fff",
      borderTop: "1px solid ".concat(dk ? "#1A2840" : "#D9E2F0"),
      display: "flex",
      flexDirection: "column",
      padding: "0 0 16px",
      zIndex: 50,
      boxShadow: "0 -4px 20px rgba(0,0,0,.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: isSaving || saveError ? 22 : 0,
      overflow: "hidden",
      transition: "height .2s",
      background: saveError ? "#E05C5C" : "#3E6FB0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#fff",
      opacity: .8,
      animation: saveError ? "none" : "spin .8s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#fff",
      letterSpacing: .3
    }
  }, saveError ? "⚠ Brak połączenia — próbuję dalej zapisać" : "Zapisywanie…")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      paddingTop: 10
    }
  }, TABS.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: function onClick() {
        return setTab(t.id);
      },
      style: {
        flex: 1,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "4px 0",
        fontFamily: "inherit",
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: tab === t.id ? "#3E6FB0" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      d: t.i,
      s: 20,
      c: tab === t.id ? "#fff" : dk ? "#6B84AC" : "#3E5578"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: tab === t.id ? "#3E6FB0" : dk ? "#6B84AC" : "#3E5578"
      }
    }, t.l));
  })))));
}
function AppWithSync(_ref2) {
  var visits = _ref2.visits,
    setVisits = _ref2.setVisits,
    patients = _ref2.patients,
    setPatients = _ref2.setPatients,
    rentals = _ref2.rentals,
    setRentals = _ref2.setRentals,
    finances = _ref2.finances,
    setFinances = _ref2.setFinances,
    stock = _ref2.stock,
    setStock = _ref2.setStock,
    nfzCases = _ref2.nfzCases,
    setNfzCases = _ref2.setNfzCases,
    todos = _ref2.todos,
    setTodos = _ref2.setTodos,
    events = _ref2.events,
    setEvents = _ref2.setEvents,
    dark = _ref2.dark,
    setDark = _ref2.setDark,
    settings = _ref2.settings,
    setSettings = _ref2.setSettings,
    exportData = _ref2.exportData,
    importData = _ref2.importData,
    demo = _ref2.demo,
    setDemo = _ref2.setDemo,
    budget = _ref2.budget,
    setBudget = _ref2.setBudget,
    machines = _ref2.machines,
    setMachines = _ref2.setMachines,
    wealth = _ref2.wealth,
    setWealth = _ref2.setWealth,
    rentalsLoaded = _ref2.rentalsLoaded,
    financesLoaded = _ref2.financesLoaded;
  // Jednorazowe aktywne wypożyczenia wózków → przełącz na odnawialne (cykliczne)
  // Jednorazowo: puste, testowe wpisy z dawnej zakładki Serwis (bez kodu i bez historii) trafiają do archiwum — nic nie jest kasowane
  useEffect(function () {
    var cleaned = whCleanOldService(machines);
    if (cleaned !== machines) setMachines(cleaned);
  }, [machines]);
  useEffect(function () {
    if (!rentalsLoaded || !rentals) return;
    var needsMigration = rentals.some(function (r) {
      return r.status === "aktywne" && !r.renewable && WOZEK_EQUIPMENT.includes(r.equipment);
    });
    if (!needsMigration) return;
    setRentals(function (rs) {
      return rs.map(function (r) {
        return r.status === "aktywne" && !r.renewable && WOZEK_EQUIPMENT.includes(r.equipment) ? _objectSpread(_objectSpread({}, r), {}, {
          renewable: true
        }) : r;
      });
    });
  }, [rentalsLoaded, rentals]);
  useEffect(function () {
    if (!rentalsLoaded || !financesLoaded || !visits || !rentals || !finances) return;
    var now = new Date(),
      ex = new Set(finances.map(function (f) {
        return f.sourceId;
      }).filter(Boolean)),
      toAdd = [];
    visits.forEach(function (v) {
      if (v.id == null) return; // wizyta bez numeru dałaby wiersz "visit-undefined" wspólny dla wszystkich takich wizyt
      var sid = "visit-" + v.id;
      if (ex.has(sid) || v.skipFinance) return;
      var done = v.status === "zakończona" || new Date(v.date + "T" + (v.time || "00:00") + ":00") <= now;
      if (done) toAdd.push({
        id: Date.now() + Math.random(),
        sourceId: sid,
        date: v.date,
        type: "przychód",
        category: "Wizyta",
        amount: v.price || 0,
        description: "Wizyta – " + v.patientName
      });
    });
    rentals.forEach(function (r) {
      return (r.payments || []).forEach(function (p) {
        var sid = "payment-" + p.id;
        if (ex.has(sid)) return;
        toAdd.push({
          id: Date.now() + Math.random(),
          sourceId: sid,
          date: p.date,
          type: "przychód",
          category: "Wypożyczalnia",
          amount: p.amount,
          description: "Wypożyczenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ")"
        });
      });
    });
    rentals.forEach(function (r) {
      return (r.cycles || []).filter(function (c) {
        return c.paid && !c.cancelled;
      }).forEach(function (c) {
        var sid = "cycle-" + r.id + "-" + (c.dueDate || c.month);
        if (ex.has(sid)) return;
        var dueDt = c.dueDate || c.month + "-15";
        var label = new Date(dueDt + "T12:00:00").toLocaleDateString("pl-PL", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        toAdd.push({
          id: Date.now() + Math.random(),
          sourceId: sid,
          date: c.paidDate || dueDt,
          type: "przychód",
          category: "Wypożyczalnia",
          amount: c.amount,
          description: "Wypożyczenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ") " + label
        });
      });
    });
    if (toAdd.length) setFinances(function (prev) {
      return [].concat(toAdd, _toConsumableArray(prev));
    });
  }, [visits, rentals, rentalsLoaded, financesLoaded]);
  // Zdublowane wpisy finansów (to samo sourceId, ta sama kwota/typ/kategoria) → zostaje jeden, najlepiej z datą
  useEffect(function () {
    if (!financesLoaded) return;
    var key = function key(f) {
      return f.sourceId + "|" + f.type + "|" + f.category + "|" + (+f.amount || 0);
    };
    // wiersz wizyty z uszkodzonym numerem (visit-undefined) nie wskazuje żadnej wizyty - jest tylko zbędnym duplikatem
    var orphan = function orphan(f) {
      return /^visit-(undefined|null|NaN)$/.test(String(f.sourceId || ""));
    };
    var dedupe = function dedupe(list) {
      var best = new Map();
      list.forEach(function (f) {
        if (!f.sourceId) return;
        var k = key(f),
          o = best.get(k);
        if (!o || !o.date && f.date) best.set(k, f);
      });
      return list.filter(function (f) {
        return !orphan(f) && (!f.sourceId || best.get(key(f)) === f);
      });
    };
    var cur = finances || [];
    if (dedupe(cur).length === cur.length) return;
    setFinances(function (prev) {
      return dedupe(prev || []);
    });
  }, [finances, financesLoaded]);
  return /*#__PURE__*/React.createElement(App, {
    visits: visits,
    setVisits: setVisits,
    patients: patients,
    setPatients: setPatients,
    rentals: rentals,
    setRentals: setRentals,
    finances: finances,
    setFinances: setFinances,
    stock: stock,
    setStock: setStock,
    nfzCases: nfzCases,
    setNfzCases: setNfzCases,
    todos: todos,
    setTodos: setTodos,
    events: events,
    setEvents: setEvents,
    dark: dark,
    setDark: setDark,
    settings: settings,
    setSettings: setSettings,
    exportData: exportData,
    importData: importData,
    demo: demo,
    setDemo: setDemo,
    budget: budget,
    setBudget: setBudget,
    machines: machines,
    setMachines: setMachines,
    wealth: wealth,
    setWealth: setWealth
  });
}
