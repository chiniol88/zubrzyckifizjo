// Plik wygenerowany z js/nfz.js przez build.py - nie edytowac recznie.
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
var nextOrderDate = function nextOrderDate(cas) {
  if (!cas.orderDate) return null;
  var _cas$orderDate$split$ = cas.orderDate.split("-").map(Number),
    _cas$orderDate$split$2 = _slicedToArray(_cas$orderDate$split$, 3),
    y = _cas$orderDate$split$2[0],
    m = _cas$orderDate$split$2[1],
    d = _cas$orderDate$split$2[2];
  var years = cas.hasDisabilityCert ? 1 : 4;
  return new Date(y + years, m - 1, d).getFullYear() + "-" + String(new Date(y + years, m - 1, d).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(y + years, m - 1, d).getDate()).padStart(2, "0");
};
function NFZ(_ref) {
  var nfzCases = _ref.nfzCases,
    setNfzCases = _ref.setNfzCases,
    initialSel = _ref.initialSel,
    onSelCleared = _ref.onSelCleared,
    setFinances = _ref.setFinances,
    patients = _ref.patients,
    setPatients = _ref.setPatients,
    rentals = _ref.rentals,
    setRentals = _ref.setRentals,
    allClients = _ref.allClients;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showAdd = _useState2[0],
    setShowAdd = _useState2[1];
  var _useState3 = useState(emptyNFZ),
    _useState4 = _slicedToArray(_useState3, 2),
    form = _useState4[0],
    setForm = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    selId = _useState6[0],
    setSelId = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    editForm = _useState8[0],
    setEditForm = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    confirmDel = _useState0[0],
    setConfirmDel = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    toast = _useState10[0],
    setToast = _useState10[1];
  var _useState11 = useState("newest"),
    _useState12 = _slicedToArray(_useState11, 2),
    sortMode = _useState12[0],
    setSortMode = _useState12[1];
  var _useState13 = useState("pending"),
    _useState14 = _slicedToArray(_useState13, 2),
    filterMode = _useState14[0],
    setFilterMode = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    payModal = _useState16[0],
    setPayModal = _useState16[1]; // {casId, date, name}
  var _useState17 = useState(""),
    _useState18 = _slicedToArray(_useState17, 2),
    payAmount = _useState18[0],
    setPayAmount = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    contactSyncPending = _useState20[0],
    setContactSyncPending = _useState20[1];
  useEffect(function () {
    if (initialSel != null) {
      setSelId(initialSel);
    }
  }, [initialSel]);
  var closeDetail = function closeDetail() {
    setSelId(null);
    if (onSelCleared) onSelCleared();
  };
  var cases = nfzCases || [];
  var today = todayLocal();
  var sourceFromRentals = function sourceFromRentals(p) {
    var mine = (rentals || []).filter(function (r) {
      return r.source && (r.patientId ? r.patientId === p.id : r.patientName === p.name);
    });
    if (!mine.length) return "";
    return mine.reduce(function (a, b) {
      return (b.startDate || "") > (a.startDate || "") ? b : a;
    }).source;
  };
  var SORT_OPTIONS = [{
    value: "newest",
    label: "Najnowsze zlecenia"
  }, {
    value: "oldest",
    label: "Najstarsze zlecenia"
  }, {
    value: "az",
    label: "Alfabetycznie (A-Z)"
  }, {
    value: "next",
    label: "Najbliższy termin"
  }];
  var sortCases = function sortCases(arr) {
    var a = _toConsumableArray(arr);
    if (sortMode === "oldest") return a.sort(function (x, y) {
      return (x.orderDate || "").localeCompare(y.orderDate || "");
    });
    if (sortMode === "az") return a.sort(function (x, y) {
      return (x.patientName || "").localeCompare(y.patientName || "", "pl");
    });
    if (sortMode === "next") return a.sort(function (x, y) {
      var nx = nextOrderDate(x) || "9999",
        ny = nextOrderDate(y) || "9999";
      return nx.localeCompare(ny);
    });
    return a.sort(function (x, y) {
      return (y.orderDate || "").localeCompare(x.orderDate || "");
    });
  };
  if (selId !== null) {
    var cas = cases.find(function (c) {
      return c.id === selId;
    });
    if (!cas) {
      setSelId(null);
      return null;
    }
    var nd = nextOrderDate(cas);
    var daysLeft = nd ? dateDiff(today, nd) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelId(null);
      },
      style: {
        background: "none",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "#3E6FB0",
        fontWeight: 600,
        cursor: "pointer",
        padding: "20px 20px 0",
        fontFamily: "inherit",
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      d: I.back,
      s: 18,
      c: "#3E6FB0"
    }), " W\xF3zki"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 20px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontSize: 22,
        fontWeight: 800
      }
    }, demo ? "Pacjent" : cas.patientName), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary",
      onClick: function onClick() {
        return setEditForm(_objectSpread({}, cas));
      }
    }, "\u270F\uFE0F Edytuj")), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Dane pacjenta"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 10
      }
    }, cas.phone && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: dk ? "#C8E8E8" : "#1C2B3A"
      }
    }, maskPhone(demo, cas.phone)), !demo && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "tel:".concat(cas.phone.replace(/\s/g, "")),
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary"
    }, /*#__PURE__*/React.createElement(Ico, {
      d: I.ph,
      s: 15,
      c: "#3E6FB0"
    }), " Zadzwo\u0144")), /*#__PURE__*/React.createElement("a", {
      href: "sms:".concat(cas.phone.replace(/\s/g, "")),
      style: {
        textDecoration: "none"
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary"
    }, /*#__PURE__*/React.createElement(Ico, {
      d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
      s: 15,
      c: "#3E6FB0"
    }), " SMS")))), cas.address && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "#7A8FA6",
        flex: 1,
        paddingRight: 8
      }
    }, maskAddr(demo, cas.address)), !demo && /*#__PURE__*/React.createElement("a", {
      href: "https://www.google.com/maps/dir/?api=1&destination=".concat(encodeURIComponent(cas.address)),
      target: "_blank",
      rel: "noreferrer",
      style: {
        textDecoration: "none",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary"
    }, "\uD83D\uDDFA\uFE0F Trasa"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 5,
        border: "2px solid ".concat(cas.hasDisabilityCert ? "#3DAA72" : "#D9E2F0"),
        background: cas.hasDisabilityCert ? "#3DAA72" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, cas.hasDisabilityCert && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 11
      }
    }, "\u2713")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: dk ? "#C8E8E8" : "#1C2B3A"
      }
    }, "Orzeczenie o niepe\u0142nosprawno\u015Bci (stopie\u0144 znaczny)")))), (cas.wheelchairModel || cas.orderDate) && /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "W\xF3zek"), cas.wheelchairModel && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, "Model: "), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, cas.wheelchairModel)), cas.orderDate && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, "Data zam\xF3wienia: "), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, cas.orderDate)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, cas.realized && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#3DAA72",
        fontWeight: 600
      }
    }, "\u2713 Zrealizowano"), /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        if (!cas.realized) {
          setPayModal({
            casId: cas.id,
            date: cas.orderDate,
            name: cas.patientName
          });
          setPayAmount("");
        } else {
          setNfzCases(function (cs) {
            return cs.map(function (x) {
              return x.id === cas.id ? _objectSpread(_objectSpread({}, x), {}, {
                realized: false
              }) : x;
            });
          });
          setFinances(function (fs) {
            return fs.filter(function (f) {
              return f.sourceId !== "wozek-" + cas.id;
            });
          });
          setToast("Cofnięto realizację");
        }
      },
      style: {
        width: 24,
        height: 24,
        borderRadius: 7,
        border: "2px solid ".concat(cas.realized ? "#3DAA72" : "#D9E2F0"),
        background: cas.realized ? "#3DAA72" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0
      }
    }, cas.realized && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 13
      }
    }, "\u2713")))), nd && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        paddingTop: 10,
        borderTop: "1px solid #D9E2F0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        marginBottom: 4
      }
    }, "Kolejne zam\xF3wienie mo\u017Cliwe od:"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15
      }
    }, nd), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        marginTop: 4,
        color: daysLeft <= 0 ? "#3DAA72" : daysLeft <= 30 ? "#F4A261" : "#7A8FA6"
      }
    }, daysLeft <= 0 ? "✓ Można już składać wniosek" : daysLeft === 1 ? "Jutro" : daysLeft < 0 ? "".concat(Math.abs(daysLeft), " dni temu") : "za ".concat(daysLeft, " dni")))), cas.notes && /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10,
        background: "#FFFBF5",
        border: "1.5px solid #F4A26130"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#F4A261",
        textTransform: "uppercase",
        letterSpacing: .5,
        marginBottom: 6
      }
    }, "Notatki"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap"
      }
    }, maskText(demo, cas.notes))), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      style: {
        width: "100%",
        justifyContent: "center",
        marginTop: 4
      },
      onClick: function onClick() {
        return setConfirmDel(true);
      }
    }, "\uD83D\uDDD1\uFE0F Usu\u0144"))), editForm && /*#__PURE__*/React.createElement(Modal, {
      title: "Edytuj",
      onClose: function onClose() {
        return setEditForm(null);
      }
    }, /*#__PURE__*/React.createElement(PatientPicker, {
      label: "Klient",
      value: editForm.patientName,
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            patientName: v
          });
        });
      },
      onSelect: function onSelect(p) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            patientName: p.name,
            phone: p.phone || f.phone,
            address: p.address || f.address,
            patientId: p.id,
            source: f.source || sourceFromRentals(p)
          });
        });
      },
      patients: allClients || patients || []
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Adres",
      value: editForm.address || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            address: v
          });
        });
      },
      placeholder: "ul. Przyk\u0142adowa 1, Gliwice"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Telefon",
      value: editForm.phone || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            phone: v
          });
        });
      },
      type: "tel"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            hasDisabilityCert: !f.hasDisabilityCert
          });
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 6,
        border: "2px solid ".concat(editForm.hasDisabilityCert ? "#3DAA72" : "#D9E2F0"),
        background: editForm.hasDisabilityCert ? "#3DAA72" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, editForm.hasDisabilityCert && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 13
      }
    }, "\u2713")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 500
      }
    }, "Orzeczenie o niepe\u0142nosprawno\u015Bci (stopie\u0144 znaczny)")), /*#__PURE__*/React.createElement(Inp, {
      label: "Model w\xF3zka",
      value: editForm.wheelchairModel || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            wheelchairModel: v
          });
        });
      },
      placeholder: "np. W\xF3zek aktywny X"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Data zam\xF3wienia",
      value: editForm.orderDate || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            orderDate: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Sk\u0105d dowiedzia\u0142 si\u0119 o w\xF3zku?",
      value: editForm.source || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            source: v
          });
        });
      },
      options: [{
        value: "",
        label: "— nie wiem / nie podał"
      }].concat(_toConsumableArray(RENTAL_SOURCES.map(function (s) {
        return {
          value: s.value,
          label: s.label
        };
      })))
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Notatki",
      value: editForm.notes || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
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
      onClick: function onClick() {
        var orig = cases.find(function (x) {
          return x.id === selId;
        });
        setNfzCases(function (cs) {
          return cs.map(function (x) {
            return x.id === selId ? _objectSpread(_objectSpread({}, x), editForm) : x;
          });
        });
        if (orig && orig.patientName !== editForm.patientName) {
          setFinances(function (fs) {
            return fs.map(function (f) {
              return f.sourceId === "wozek-" + selId ? _objectSpread(_objectSpread({}, f), {}, {
                description: "Wózek – " + editForm.patientName
              }) : f;
            });
          });
        }
        var pending = syncContactOnSave({
          kind: "nfz",
          id: selId,
          patientId: editForm.patientId || null,
          patientName: editForm.patientName,
          original: {
            phone: (orig === null || orig === void 0 ? void 0 : orig.phone) || "",
            address: (orig === null || orig === void 0 ? void 0 : orig.address) || ""
          },
          updated: {
            phone: editForm.phone || "",
            address: editForm.address || ""
          }
        }, {
          patients: patients,
          setPatients: setPatients,
          rentals: rentals,
          setRentals: setRentals,
          nfzCases: nfzCases,
          setNfzCases: setNfzCases
        });
        if (pending.length) setContactSyncPending(pending);
        setEditForm(null);
        setToast("Zapisano zmiany");
      }
    }, "Zapisz zmiany")), contactSyncPending && /*#__PURE__*/React.createElement(ContactSyncModal, {
      items: contactSyncPending,
      onClose: function onClose() {
        return setContactSyncPending(null);
      },
      onConfirm: function onConfirm(items) {
        applyContactUpdates(items, {
          setPatients: setPatients,
          setRentals: setRentals,
          setNfzCases: setNfzCases
        });
        setContactSyncPending(null);
      }
    }), confirmDel && /*#__PURE__*/React.createElement(Modal, {
      title: "Usu\u0144",
      onClose: function onClose() {
        return setConfirmDel(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        marginBottom: 20
      }
    }, "Na pewno usun\u0105\u0107 t\u0119 pozycj\u0119?"), /*#__PURE__*/React.createElement("div", {
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
        return setConfirmDel(false);
      }
    }, "Anuluj"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      style: {
        flex: 1,
        justifyContent: "center"
      },
      onClick: function onClick() {
        setFinances(function (fs) {
          return fs.filter(function (f) {
            return f.sourceId !== "wozek-" + selId;
          });
        });
        setNfzCases(function (cs) {
          return cs.filter(function (x) {
            return x.id !== selId;
          });
        });
        setConfirmDel(false);
        setSelId(null);
      }
    }, "Usu\u0144"))), payModal && /*#__PURE__*/React.createElement(Modal, {
      title: "Kwota przychodu",
      onClose: function onClose() {
        return setPayModal(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#7A8FA6",
        marginBottom: 14
      }
    }, demo ? "Pacjent" : payModal.name, " \xB7 ", payModal.date), /*#__PURE__*/React.createElement(Inp, {
      label: "Kwota (z\u0142) *",
      value: payAmount,
      onChange: setPayAmount,
      type: "number",
      placeholder: "0"
    }), /*#__PURE__*/React.createElement(Btn, {
      disabled: !payAmount || +payAmount <= 0,
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        var sid = "wozek-" + payModal.casId;
        setFinances(function (fs) {
          return [{
            id: Date.now(),
            sourceId: sid,
            date: payModal.date,
            type: "przychód",
            category: "Wózek",
            amount: +payAmount,
            description: "Wózek – " + payModal.name
          }].concat(_toConsumableArray(fs || []));
        });
        setNfzCases(function (cs) {
          return cs.map(function (x) {
            return x.id === payModal.casId ? _objectSpread(_objectSpread({}, x), {}, {
              realized: true
            }) : x;
          });
        });
        setPayModal(null);
        setPayAmount("");
        setToast("Dodano do finansów");
      }
    }, "Zapisz i oznacz jako zrealizowany")), toast && /*#__PURE__*/React.createElement(Toast, {
      msg: toast,
      onDone: function onDone() {
        return setToast(null);
      }
    }));
  }
  var pendingCount = cases.filter(function (c) {
    return !c.realized;
  }).length;
  var filtered = filterMode === "pending" ? cases.filter(function (c) {
    return !c.realized;
  }) : cases;
  var listItems = sortCases(filtered);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 20px 12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 24,
      fontWeight: 800
    }
  }, "W\xF3zki"), /*#__PURE__*/React.createElement(Btn, {
    small: true,
    onClick: function onClick() {
      setForm(emptyNFZ());
      setShowAdd(true);
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    d: I.plus,
    s: 16,
    c: "#fff"
  }), " Nowy")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 20px 10px"
    }
  }, [{
    k: "pending",
    l: "Do realizacji (".concat(pendingCount, ")")
  }, {
    k: "all",
    l: "Wszystkie (".concat(cases.length, ")")
  }].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.k,
      onClick: function onClick() {
        return setFilterMode(t.k);
      },
      style: {
        padding: "7px 14px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 12,
        whiteSpace: "nowrap",
        background: filterMode === t.k ? "#3E6FB0" : "#D9E2F0",
        color: filterMode === t.k ? "#fff" : "#7A8FA6",
        fontFamily: "inherit"
      }
    }, t.l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 14px"
    }
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "",
    value: sortMode,
    onChange: setSortMode,
    options: SORT_OPTIONS
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, listItems.length === 0 && /*#__PURE__*/React.createElement(Empty, {
    text: filterMode === "pending" ? "Brak spraw do realizacji 🎉" : "Brak wpisów"
  }), listItems.map(function (cas) {
    var nd = nextOrderDate(cas);
    var dl = nd ? dateDiff(today, nd) : null;
    return /*#__PURE__*/React.createElement(Card, {
      key: cas.id,
      onClick: function onClick() {
        return setSelId(cas.id);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15
      }
    }, demo ? "Pacjent" : cas.patientName), cas.hasDisabilityCert && /*#__PURE__*/React.createElement(Badge, {
      color: "#7C6AF4"
    }, "\uD83E\uDEAA Orzeczenie")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, cas.wheelchairModel && /*#__PURE__*/React.createElement("span", null, "\uD83E\uDDBD ", cas.wheelchairModel), cas.orderDate && /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCC5 ", cas.orderDate), cas.realized && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#3DAA72",
        fontWeight: 600
      }
    }, "\u2713 zrealizowany"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        paddingLeft: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick(e) {
        e.stopPropagation();
        if (!cas.realized) {
          setPayModal({
            casId: cas.id,
            date: cas.orderDate || "",
            name: cas.patientName
          });
          setPayAmount("");
        } else {
          setNfzCases(function (cs) {
            return cs.map(function (x) {
              return x.id === cas.id ? _objectSpread(_objectSpread({}, x), {}, {
                realized: false
              }) : x;
            });
          });
          setFinances(function (fs) {
            return fs.filter(function (f) {
              return f.sourceId !== "wozek-" + cas.id;
            });
          });
        }
      },
      style: {
        width: 24,
        height: 24,
        borderRadius: 7,
        border: "2px solid ".concat(cas.realized ? "#3DAA72" : "#D9E2F0"),
        background: cas.realized ? "#3DAA72" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }
    }, cas.realized && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 13
      }
    }, "\u2713")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, nd && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: dl <= 0 ? "#3DAA72" : "#7A8FA6",
        fontWeight: dl <= 0 ? 700 : 400
      }
    }, dl <= 0 ? "➜ można złożyć" : "➜ " + nd), /*#__PURE__*/React.createElement(Ico, {
      d: "M9 18l6-6-6-6",
      s: 18,
      c: "#7A8FA6"
    })))));
  })), showAdd && /*#__PURE__*/React.createElement(Modal, {
    title: "Nowy w\xF3zek",
    onClose: function onClose() {
      return setShowAdd(false);
    }
  }, /*#__PURE__*/React.createElement(PatientPicker, {
    label: "Klient *",
    value: form.patientName,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          patientName: v
        });
      });
    },
    onSelect: function onSelect(p) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          patientName: p.name,
          phone: p.phone || f.phone,
          address: p.address || f.address,
          patientId: p.id,
          source: f.source || sourceFromRentals(p)
        });
      });
    },
    patients: allClients || patients || []
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Adres",
    value: form.address,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          address: v
        });
      });
    },
    placeholder: "ul. Przyk\u0142adowa 1, Gliwice"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Telefon",
    value: form.phone,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          phone: v
        });
      });
    },
    type: "tel"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
      cursor: "pointer"
    },
    onClick: function onClick() {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          hasDisabilityCert: !f.hasDisabilityCert
        });
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      border: "2px solid ".concat(form.hasDisabilityCert ? "#3DAA72" : "#D9E2F0"),
      background: form.hasDisabilityCert ? "#3DAA72" : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, form.hasDisabilityCert && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 13
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, "Orzeczenie o niepe\u0142nosprawno\u015Bci (stopie\u0144 znaczny)")), /*#__PURE__*/React.createElement(Inp, {
    label: "Model w\xF3zka",
    value: form.wheelchairModel,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          wheelchairModel: v
        });
      });
    },
    placeholder: "np. W\xF3zek aktywny X"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data zam\xF3wienia",
    value: form.orderDate,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          orderDate: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Sk\u0105d dowiedzia\u0142 si\u0119 o w\xF3zku?",
    value: form.source || "",
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          source: v
        });
      });
    },
    options: [{
      value: "",
      label: "— nie wiem / nie podał"
    }].concat(_toConsumableArray(RENTAL_SOURCES.map(function (s) {
      return {
        value: s.value,
        label: s.label
      };
    })))
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatki",
    value: form.notes,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2
  }), /*#__PURE__*/React.createElement(Btn, {
    disabled: !form.patientName,
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      if (!form.patientName) return;
      setNfzCases(function (cs) {
        return [_objectSpread(_objectSpread({}, form), {}, {
          id: Date.now()
        })].concat(_toConsumableArray(cs || []));
      });
      if (setPatients && !(patients || []).find(function (p) {
        return p.name === form.patientName;
      })) {
        setPatients(function (ps) {
          return [].concat(_toConsumableArray(ps || []), [{
            id: Date.now() + 1,
            name: form.patientName,
            phone: form.phone || "",
            address: form.address || "",
            diagnosis: "",
            notes: "",
            defaultPrice: "",
            birthday: ""
          }]);
        });
      }
      setForm(emptyNFZ());
      setShowAdd(false);
      setToast("Dodano");
    }
  }, "Dodaj")), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast,
    onDone: function onDone() {
      return setToast(null);
    }
  }));
}
