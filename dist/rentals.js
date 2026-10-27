// Plik wygenerowany z js/rentals.js przez build.py - nie edytowac recznie.
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
// ── RENTALS ───────────────────────────────────────────────────────────────
function PaymentForm(_ref) {
  var rentalId = _ref.rentalId,
    rentalAmount = _ref.rentalAmount,
    amountPaid = _ref.amountPaid,
    patientName = _ref.patientName,
    equipment = _ref.equipment,
    setRentals = _ref.setRentals,
    setFinances = _ref.setFinances;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    amt = _useState2[0],
    setAmt = _useState2[1];
  var _useState3 = useState(todayLocal),
    _useState4 = _slicedToArray(_useState3, 2),
    date = _useState4[0],
    setDate = _useState4[1];
  var add = function add() {
    var v = +amt;
    if (!v) return;
    var rem = rentalAmount - (amountPaid || 0);
    if (v > rem + 0.01) {
      alert("Wp\u0142ata (".concat(v, " z\u0142) przekracza pozosta\u0142\u0105 kwot\u0119 (").concat(rem, " z\u0142)"));
      return;
    }
    var np = {
      id: Date.now(),
      amount: v,
      date: date
    };
    setRentals(function (rs) {
      return rs.map(function (x) {
        if (x.id !== rentalId) return x;
        var newPayments = [].concat(_toConsumableArray(x.payments || []), [np]);
        var newPaid = newPayments.reduce(function (s, q) {
          return s + (+q.amount || 0);
        }, 0);
        return _objectSpread(_objectSpread({}, x), {}, {
          payments: newPayments,
          amountPaid: newPaid
        });
      });
    });
    setFinances(function (fs) {
      return [{
        id: Date.now() + Math.random(),
        sourceId: "payment-" + np.id,
        date: date,
        type: "przychód",
        category: "Wypożyczalnia",
        amount: v,
        description: "Wypożyczenie – " + patientName + " (" + equipment + ")"
      }].concat(_toConsumableArray(fs));
    });
    setAmt("");
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: amt,
    onChange: function onChange(e) {
      return setAmt(e.target.value);
    },
    placeholder: "Kwota wp\u0142aty...",
    style: {
      flex: 1,
      padding: "10px 14px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 12,
      fontSize: 14,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: date,
    onChange: function onChange(e) {
      return setDate(e.target.value);
    },
    style: {
      flex: 1,
      padding: "10px 14px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 12,
      fontSize: 14,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Dodaj wp\u0142at\u0119"));
}

// Ustawienia szyny CPM (udo / podudzie, cm) przy wypożyczeniu: szybki zapis na miejscu, wpis trafia do historii pacjenta
function RentalCpmCard(_ref2) {
  var r = _ref2.r,
    rentals = _ref2.rentals,
    patients = _ref2.patients,
    setRentals = _ref2.setRentals;
  var demo = useDemo();
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    edit = _useState6[0],
    setEdit = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    val = _useState8[0],
    setVal = _useState8[1];
  var saved = cpmHas(r.cpm) ? r.cpm : null;
  if (!saved && !cpmApplies(r.equipment)) return null;
  var pt = (patients || []).find(function (p) {
    return p.id === r.patientId;
  }) || (patients || []).find(function (p) {
    return p.name === r.patientName;
  }) || {
    id: r.patientId,
    name: r.patientName
  };
  var start = function start() {
    setVal(saved ? {
      brand: saved.brand,
      thigh: String(cpmInt(saved.thigh) || ""),
      shank: String(cpmInt(saved.shank) || "")
    } : {});
    setEdit(true);
  };
  var save = function save() {
    var packed = cpmPack(val, r.equipment);
    if (packed && !packed.brand) {
      alert("Wybierz markę szyny (Artromot lub Kinetec) albo wyczyść pola udo i podudzie.");
      return;
    }
    setRentals(function (rs) {
      return rs.map(function (x) {
        return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
          cpm: packed
        }) : x;
      });
    });
    setEdit(false);
  };
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "\uD83E\uDDBF Ustawienia szyny"), !edit ? saved ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, saved.brand || cpmBrandOf(r.equipment) || "Marka nie podana", " \xB7 ", cpmText({
    thigh: cpmInt(saved.thigh),
    shank: cpmInt(saved.shank)
  }, demo)), /*#__PURE__*/React.createElement(Btn, {
    small: true,
    variant: "secondary",
    onClick: start
  }, "Zmie\u0144")) : /*#__PURE__*/React.createElement("button", {
    onClick: start,
    style: {
      width: "100%",
      padding: "10px",
      borderRadius: 10,
      border: "1.5px dashed #D9E2F0",
      background: "none",
      color: "#7C6AF4",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Dodaj ustawienia (udo / podudzie)") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CpmFields, {
    value: val,
    onChange: setVal,
    autoBrand: cpmBrandOf(r.equipment),
    entries: cpmEntries(pt, rentals, r.id)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: save
  }, "Zapisz"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: function onClick() {
      return setEdit(false);
    }
  }, "Anuluj"))));
}
function HistoryFill(_ref3) {
  var r = _ref3.r,
    setRentals = _ref3.setRentals,
    setFinances = _ref3.setFinances;
  var cm = todayLocal().slice(0, 7);
  // Generate all months from startDate month to current month
  var months = [];
  var _r$startDate$split$ma = r.startDate.split("-").map(Number),
    _r$startDate$split$ma2 = _slicedToArray(_r$startDate$split$ma, 2),
    sy = _r$startDate$split$ma2[0],
    sm = _r$startDate$split$ma2[1];
  var _cm$split$map = cm.split("-").map(Number),
    _cm$split$map2 = _slicedToArray(_cm$split$map, 2),
    cy = _cm$split$map2[0],
    cmn = _cm$split$map2[1];
  var startDay = r.startDate.split("-")[2]; // e.g. "08"
  var y = sy,
    m = sm;
  while ((y < cy || y === cy && m <= cmn) && months.length < 600) {
    var mStr = y + "-" + String(m).padStart(2, "0");
    // paidDate = same day as startDate but capped to last day of that month
    var lastDay = new Date(y, m, 0).getDate();
    var day = Math.min(+startDay, lastDay);
    var paidDate = mStr + "-" + String(day).padStart(2, "0");
    months.push({
      month: mStr,
      dueDate: paidDate,
      paidDate: paidDate
    });
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  var _useState9 = useState(function () {
      return Object.fromEntries(months.map(function (x) {
        return [x.month, true];
      }));
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    checked = _useState0[0],
    setChecked = _useState0[1];
  var _useState1 = useState(function () {
      return Object.fromEntries(months.map(function (x) {
        return [x.month, String(r.amount || "")];
      }));
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    amounts = _useState10[0],
    setAmounts = _useState10[1];
  var _useState11 = useState(String(r.amount || "")),
    _useState12 = _slicedToArray(_useState11, 2),
    bulkAmt = _useState12[0],
    setBulkAmt = _useState12[1];
  var allChecked = months.every(function (x) {
    return checked[x.month];
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF8E6",
      border: "1.5px solid #F4A26140",
      borderRadius: 14,
      padding: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 4
    }
  }, "\uD83D\uDCCB Uzupe\u0142nij histori\u0119 p\u0142atno\u015Bci"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      lineHeight: 1.5
    }
  }, "To wypo\u017Cyczenie trwa od ", r.startDate, ". Zaznacz kt\xF3re miesi\u0105ce zosta\u0142y op\u0142acone i podaj kwoty, nast\u0119pnie zatwierd\u017A.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: bulkAmt,
    onChange: function onChange(e) {
      setBulkAmt(e.target.value);
      setAmounts(function (a) {
        return Object.fromEntries(Object.keys(a).map(function (k) {
          return [k, e.target.value];
        }));
      });
    },
    placeholder: "Kwota dla wszystkich...",
    style: {
      flex: 1,
      padding: "10px 14px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 12,
      fontSize: 14,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setChecked(function (c) {
        return Object.fromEntries(Object.keys(c).map(function (k) {
          return [k, !allChecked];
        }));
      });
    },
    style: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "1.5px solid #D9E2F0",
      background: allChecked ? "#3E6FB0" : "#fff",
      color: allChecked ? "#fff" : "#7A8FA6",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      whiteSpace: "nowrap"
    }
  }, allChecked ? "✓ Wszystkie" : "Zaznacz wszystkie")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 12,
      border: "1.5px solid #D9E2F0",
      overflow: "hidden",
      marginBottom: 14
    }
  }, months.map(function (x, i) {
    var label = new Date(x.month + "-15").toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric"
    });
    return /*#__PURE__*/React.createElement("div", {
      key: x.month,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderBottom: i < months.length - 1 ? "1px solid #EFF3FA" : "none",
        background: checked[x.month] ? "#F6FFF9" : "#FAFCFD"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setChecked(function (c) {
          return _objectSpread(_objectSpread({}, c), {}, _defineProperty({}, x.month, !c[x.month]));
        });
      },
      style: {
        width: 22,
        height: 22,
        borderRadius: 6,
        border: "2px solid ".concat(checked[x.month] ? "#3DAA72" : "#D9E2F0"),
        background: checked[x.month] ? "#3DAA72" : "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: 0
      }
    }, checked[x.month] && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 13,
        lineHeight: 1
      }
    }, "\u2713")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 14,
        fontWeight: checked[x.month] ? 600 : 400,
        color: checked[x.month] ? "#1C2B3A" : "#7A8FA6",
        textTransform: "capitalize"
      }
    }, label, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        fontWeight: 400
      }
    }, x.paidDate)), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: amounts[x.month] || "",
      onChange: function onChange(e) {
        return setAmounts(function (a) {
          return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, x.month, e.target.value));
        });
      },
      disabled: !checked[x.month],
      style: {
        width: 80,
        padding: "7px 10px",
        border: "1.5px solid #D9E2F0",
        borderRadius: 10,
        fontSize: 13,
        outline: "none",
        background: checked[x.month] ? "#FAFCFD" : "#EFF3FA",
        fontFamily: "inherit",
        textAlign: "right",
        color: checked[x.month] ? "#1C2B3A" : "#7A8FA6"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, "z\u0142"));
  })), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      var newCycles = months.map(function (x) {
        return {
          month: x.month,
          dueDate: x.dueDate,
          amount: +(amounts[x.month] || 0),
          paid: !!checked[x.month],
          paidDate: checked[x.month] ? x.paidDate : null
        };
      });
      setRentals(function (rs) {
        return rs.map(function (rr) {
          return rr.id === r.id ? _objectSpread(_objectSpread({}, rr), {}, {
            cycles: newCycles
          }) : rr;
        });
      });
      var newFinances = months.filter(function (x) {
        return checked[x.month] && +(amounts[x.month] || 0) > 0;
      }).map(function (x) {
        var label = new Date(x.month + "-15").toLocaleDateString("pl-PL", {
          month: "long",
          year: "numeric"
        });
        return {
          id: Date.now() + Math.random(),
          sourceId: "cycle-" + r.id + "-" + x.dueDate,
          date: x.paidDate,
          type: "przychód",
          category: "Wypożyczalnia",
          amount: +(amounts[x.month] || 0),
          description: "Wypożyczenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ") " + label
        };
      });
      if (newFinances.length) setFinances(function (fs) {
        return [].concat(_toConsumableArray(newFinances), _toConsumableArray(fs));
      });
    }
  }, "\u2713 Zatwierd\u017A histori\u0119 (", months.filter(function (x) {
    return checked[x.month];
  }).length, " mies.)"));
}
function CycleRow(_ref4) {
  var r = _ref4.r,
    cycle = _ref4.cycle,
    setRentals = _ref4.setRentals,
    setFinances = _ref4.setFinances;
  var demo = useDemo();
  var key = cycle.dueDate || cycle.month;
  var _useState13 = useState(String(cycle.amount || "")),
    _useState14 = _slicedToArray(_useState13, 2),
    amt = _useState14[0],
    setAmt = _useState14[1];
  var _useState15 = useState(todayLocal),
    _useState16 = _slicedToArray(_useState15, 2),
    payDate = _useState16[0],
    setPayDate = _useState16[1];
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    editDate = _useState18[0],
    setEditDate = _useState18[1];
  var _useState19 = useState(""),
    _useState20 = _slicedToArray(_useState19, 2),
    newDate = _useState20[0],
    setNewDate = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    editAmt = _useState22[0],
    setEditAmt = _useState22[1];
  var _useState23 = useState(String(cycle.amount || "")),
    _useState24 = _slicedToArray(_useState23, 2),
    paidAmtDraft = _useState24[0],
    setPaidAmtDraft = _useState24[1];
  var _useState25 = useState(cycle.paidDate || todayLocal()),
    _useState26 = _slicedToArray(_useState25, 2),
    paidDateDraft = _useState26[0],
    setPaidDateDraft = _useState26[1];
  var _useState27 = useState(false),
    _useState28 = _slicedToArray(_useState27, 2),
    confirmDel = _useState28[0],
    setConfirmDel = _useState28[1];
  var dueDt = cycle.dueDate || cycle.month + "-15";
  var label = new Date(dueDt + "T12:00:00").toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  var periodEndDt = addDays(dueDt, 30);
  var sameYear = dueDt.slice(0, 4) === periodEndDt.slice(0, 4);
  var fmtPeriodD = function fmtPeriodD(d, withYear) {
    return new Date(d + "T12:00:00").toLocaleDateString("pl-PL", _objectSpread({
      day: "numeric",
      month: "long"
    }, withYear ? {
      year: "numeric"
    } : {}));
  };
  var rangeLabel = fmtPeriodD(dueDt, !sameYear) + " – " + fmtPeriodD(periodEndDt, true);
  var periodCaption = /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#7A8FA6",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: .4,
      marginBottom: 2
    }
  }, "Okres rozliczeniowy");
  var sid = "cycle-" + r.id + "-" + key;
  var updateCycle = function updateCycle(patch) {
    return setRentals(function (rs) {
      return rs.map(function (x) {
        return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
          cycles: (x.cycles || []).map(function (c) {
            return (c.dueDate || c.month) === key ? _objectSpread(_objectSpread({}, c), patch) : c;
          })
        }) : x;
      });
    });
  };
  var saveDate = function saveDate() {
    if (!newDate || newDate === key) {
      setEditDate(false);
      return;
    }
    var conflict = (r.cycles || []).some(function (c) {
      return (c.dueDate || c.month) !== key && !c.cancelled && (c.dueDate ? c.dueDate === newDate : c.month === newDate.slice(0, 7));
    });
    if (conflict) {
      alert("Okres z tą datą już istnieje w tym wypożyczeniu.");
      return;
    }
    updateCycle({
      dueDate: newDate,
      month: newDate.slice(0, 7)
    });
    if (cycle.paid) {
      var newSid = "cycle-" + r.id + "-" + newDate;
      setFinances(function (fs) {
        return fs.map(function (f) {
          return f.sourceId === sid ? _objectSpread(_objectSpread({}, f), {}, {
            sourceId: newSid
          }) : f;
        });
      });
    }
    setEditDate(false);
  };
  var doDelete = function doDelete() {
    setRentals(function (rs) {
      return rs.map(function (x) {
        return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
          cycles: (x.cycles || []).filter(function (c) {
            return (c.dueDate || c.month) !== key;
          })
        }) : x;
      });
    });
    setFinances(function (fs) {
      return fs.filter(function (f) {
        return f.sourceId !== sid;
      });
    });
    setConfirmDel(false);
  };
  var noteUi = /*#__PURE__*/React.createElement("input", {
    value: cycle.note || "",
    onChange: function onChange(e) {
      return updateCycle({
        note: e.target.value
      });
    },
    placeholder: "Notatka (opcjonalnie)...",
    style: {
      width: "100%",
      marginTop: 6,
      padding: "7px 10px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 10,
      fontSize: 12,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit",
      boxSizing: "border-box"
    }
  });
  var dateEditUi = editDate && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    autoFocus: true,
    value: newDate,
    onChange: function onChange(e) {
      return setNewDate(e.target.value);
    },
    style: {
      flex: 1,
      padding: "7px 10px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 10,
      fontSize: 13,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: saveDate,
    style: {
      background: "#3E6FB0",
      border: "none",
      borderRadius: 8,
      padding: "7px 10px",
      color: "#fff",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setEditDate(false);
    },
    style: {
      background: "#EFF3FA",
      border: "none",
      borderRadius: 8,
      padding: "7px 10px",
      color: "#7A8FA6",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u2715"));
  var smallActions = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setNewDate(dueDt);
      setEditDate(function (v) {
        return !v;
      });
    },
    style: {
      background: "none",
      border: "none",
      padding: "8px 6px",
      fontSize: 12,
      fontWeight: 600,
      color: "#3E6FB0",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u270F\uFE0F zmie\u0144 dat\u0119"));
  var delBtn = /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setConfirmDel(true);
    },
    style: {
      background: "#FEE2E2",
      border: "none",
      borderRadius: 8,
      padding: "8px 11px",
      fontSize: 14,
      color: "#E05C5C",
      cursor: "pointer",
      flexShrink: 0,
      display: "flex",
      alignItems: "center"
    }
  }, "\uD83D\uDDD1");
  var confirmDelUi = confirmDel && /*#__PURE__*/React.createElement(Modal, {
    title: "Usu\u0144 okres",
    onClose: function onClose() {
      return setConfirmDel(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      marginBottom: 20
    }
  }, "Na pewno usun\u0105\u0107 okres \u201E", rangeLabel, "\u201D?", cycle.paid ? " Powiązana wpłata w Finansach też zniknie." : ""), /*#__PURE__*/React.createElement("div", {
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
    onClick: doDelete
  }, "Usu\u0144")));
  if (cycle.cancelled) return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 0",
      borderBottom: "1px solid #EFF3FA",
      opacity: .5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#7A8FA6",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      textDecoration: "line-through"
    }
  }, rangeLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#7A8FA6"
    }
  }, "Anulowany"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return updateCycle({
        cancelled: false
      });
    },
    style: {
      background: "#EFF3FA",
      border: "none",
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Przywr\xF3\u0107"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setConfirmDel(true);
    },
    style: {
      background: "#FEE2E2",
      border: "none",
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 12,
      fontWeight: 600,
      color: "#E05C5C",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\uD83D\uDDD1 Usu\u0144"))), confirmDelUi);
  if (cycle.paid) {
    var toggleDoc = function toggleDoc(k) {
      return updateCycle({
        doc: cycle.doc === k ? null : k
      });
    };
    var savePaidAmount = function savePaidAmount() {
      var v = +paidAmtDraft || 0;
      var pd = paidDateDraft || todayLocal();
      updateCycle({
        amount: v,
        paidDate: pd
      });
      setFinances(function (fs) {
        var exists = fs.some(function (f) {
          return f.sourceId === sid;
        });
        if (v <= 0) return fs.filter(function (f) {
          return f.sourceId !== sid;
        });
        if (exists) return fs.map(function (f) {
          return f.sourceId === sid ? _objectSpread(_objectSpread({}, f), {}, {
            amount: v,
            date: pd
          }) : f;
        });
        return [{
          id: Date.now() + Math.random(),
          sourceId: sid,
          date: pd,
          type: "przychód",
          category: "Wypożyczalnia",
          amount: v,
          description: "Wypożyczenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ") " + label
        }].concat(_toConsumableArray(fs));
      });
      setEditAmt(false);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px 0",
        borderBottom: "1px solid #EFF3FA"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#3DAA72",
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, periodCaption, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, rangeLabel), !editAmt ? /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        setPaidAmtDraft(String(cycle.amount || ""));
        setPaidDateDraft(cycle.paidDate || todayLocal());
        setEditAmt(true);
      },
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        cursor: "pointer"
      }
    }, cycle.amount > 0 ? maskAmt(demo, cycle.amount) + " zł · " + cycle.paidDate : "🏥 NFZ — bez opłaty · " + cycle.paidDate, " \u270F\uFE0F") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        marginTop: 2,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      autoFocus: true,
      value: paidAmtDraft,
      onChange: function onChange(e) {
        return setPaidAmtDraft(e.target.value);
      },
      style: {
        width: 80,
        padding: "5px 8px",
        border: "1.5px solid #D9E2F0",
        borderRadius: 8,
        fontSize: 12,
        outline: "none",
        fontFamily: "inherit"
      }
    }), /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: paidDateDraft,
      onChange: function onChange(e) {
        return setPaidDateDraft(e.target.value);
      },
      style: {
        padding: "5px 8px",
        border: "1.5px solid #D9E2F0",
        borderRadius: 8,
        fontSize: 12,
        outline: "none",
        fontFamily: "inherit"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: savePaidAmount,
      style: {
        background: "#3E6FB0",
        border: "none",
        borderRadius: 6,
        padding: "4px 8px",
        color: "#fff",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, "\u2713")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        updateCycle({
          paid: false,
          paidDate: null
        });
        setFinances(function (fs) {
          return fs.filter(function (f) {
            return f.sourceId !== sid;
          });
        });
      },
      style: {
        background: "#FEE2E2",
        border: "none",
        borderRadius: 8,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: 600,
        color: "#E05C5C",
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, "Anuluj"), delBtn)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, [{
      k: "receipt",
      l: "🧾 Paragon"
    }, {
      k: "invoice",
      l: "📄 Faktura"
    }].map(function (opt) {
      var ac = cycle.doc === opt.k;
      return /*#__PURE__*/React.createElement("button", {
        key: opt.k,
        onClick: function onClick() {
          return toggleDoc(opt.k);
        },
        style: {
          flex: 1,
          padding: "7px 8px",
          borderRadius: 10,
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          border: "1.5px solid ".concat(ac ? "#3E6FB0" : "#D9E2F0"),
          background: ac ? "#E1E9F5" : "#fff",
          color: ac ? "#3E6FB0" : "#7A8FA6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4
        }
      }, ac && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10
        }
      }, "\u2713"), opt.l);
    })), noteUi, dateEditUi, smallActions, confirmDelUi);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 0",
      borderBottom: "1px solid #EFF3FA"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#E05C5C",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: .4,
      marginBottom: 2
    }
  }, "\u26A0\uFE0F Okres rozliczeniowy \u2014 do op\u0142acenia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      color: "#E05C5C"
    }
  }, rangeLabel)), delBtn), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: amt,
    onChange: function onChange(e) {
      return setAmt(e.target.value);
    },
    placeholder: "Kwota...",
    style: {
      flex: 1,
      padding: "10px 14px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 12,
      fontSize: 14,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: payDate,
    onChange: function onChange(e) {
      return setPayDate(e.target.value);
    },
    style: {
      flex: 1,
      padding: "10px 14px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 12,
      fontSize: 14,
      outline: "none",
      background: "#FAFCFD",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var v = +amt;
      if (!v) return;
      var pd = payDate || todayLocal();
      setRentals(function (rs) {
        return rs.map(function (x) {
          return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
            cycles: (x.cycles || []).map(function (c) {
              return (c.dueDate || c.month) === key ? _objectSpread(_objectSpread({}, c), {}, {
                amount: v,
                paid: true,
                paidDate: pd
              }) : c;
            })
          }) : x;
        });
      });
      setFinances(function (fs) {
        return [{
          id: Date.now() + Math.random(),
          sourceId: sid,
          date: pd,
          type: "przychód",
          category: "Wypożyczalnia",
          amount: v,
          description: "Wypożyczenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ") " + label
        }].concat(_toConsumableArray(fs));
      });
    },
    style: {
      flex: 1,
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "10px 16px",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u2713 Op\u0142a\u0107"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var pd = payDate || todayLocal();
      setRentals(function (rs) {
        return rs.map(function (x) {
          return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
            cycles: (x.cycles || []).map(function (c) {
              return (c.dueDate || c.month) === key ? _objectSpread(_objectSpread({}, c), {}, {
                amount: 0,
                paid: true,
                paidDate: pd
              }) : c;
            })
          }) : x;
        });
      });
    },
    style: {
      background: "#FFF3E0",
      border: "none",
      borderRadius: 12,
      padding: "10px 12px",
      fontSize: 13,
      fontWeight: 600,
      color: "#F4A261",
      cursor: "pointer",
      fontFamily: "inherit",
      whiteSpace: "nowrap"
    }
  }, "\uD83C\uDFE5 NFZ (0 z\u0142)"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return updateCycle({
        cancelled: true
      });
    },
    style: {
      background: "#FEE2E2",
      border: "none",
      borderRadius: 12,
      padding: "10px 14px",
      fontSize: 14,
      fontWeight: 600,
      color: "#E05C5C",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Anuluj")), noteUi, dateEditUi, smallActions, confirmDelUi);
}
function RCard(_ref5) {
  var r = _ref5.r,
    onClick = _ref5.onClick;
  var demo = useDemo();
  var mctx = useContext(MachinesCtx);
  var card = r.machineId && mctx ? (mctx.machines || []).find(function (m) {
    return m.id === r.machineId;
  }) : null;
  var today = todayLocal(),
    dl = r.endDate ? dateDiff(today, r.endDate) : null,
    ov = dl !== null && dl < 0;
  var waitDays = r.reserved && r.reservedAt ? dateDiff(r.reservedAt, today) : 0;
  var startDl = r.reserved && r.startDate ? dateDiff(today, r.startDate) : null;
  var unpaid = (r.cycles || []).filter(function (c) {
    return !c.paid && !c.cancelled;
  }).length;
  var extDue = (r.extensions || []).reduce(function (s, e) {
    return s + (+e.amountDue || 0);
  }, 0);
  var totalAmount = (+r.amount || 0) + extDue;
  var totalPaid = calcRentalPaid(r);

  // Zbierz wszystkie dokumenty (z payments + extensions)
  var allDocs = new Set([].concat(_toConsumableArray((r.payments || []).map(function (p) {
    return p.doc;
  }).filter(Boolean)), _toConsumableArray((r.extensions || []).map(function (e) {
    return e.doc;
  }).filter(Boolean)), _toConsumableArray((r.cycles || []).map(function (c) {
    return c.doc;
  }).filter(Boolean))));
  var hasReceipt = allDocs.has("receipt");
  var hasInvoice = allDocs.has("invoice");
  var needsName = r.patientName && r.address && r.patientName.trim() === r.address.trim();
  return /*#__PURE__*/React.createElement(Card, {
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 2,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, r.equipment || "❓ Do ustalenia"), card && card.code && /*#__PURE__*/React.createElement(Badge, {
    color: "#7A8FA6"
  }, card.code), r.renewable && /*#__PURE__*/React.createElement(Badge, {
    color: "#7C6AF4"
  }, "\uD83D\uDD04"), r.reserved && /*#__PURE__*/React.createElement(Badge, {
    color: "#7C6AF4"
  }, "\uD83D\uDCCB"), r.reviewRequested && /*#__PURE__*/React.createElement(Badge, {
    color: "#F4A261"
  }, "\u2B50 opinia"), r.plannedReturn && /*#__PURE__*/React.createElement(Badge, {
    color: "#3DAA72"
  }, "\uD83D\uDCC5 ", r.plannedReturn), needsName && /*#__PURE__*/React.createElement(Badge, {
    color: "#E05C5C"
  }, "\u26A0\uFE0F brak nazwiska")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, demo ? "Pacjent" : r.patientName)), r.status === "aktywne" && (r.reserved ? startDl !== null ? /*#__PURE__*/React.createElement(Badge, {
    color: startDl < 0 ? "#E05C5C" : startDl === 0 ? "#F4A261" : "#7C6AF4"
  }, startDl < 0 ? Math.abs(startDl) + "d po term." : startDl === 0 ? "Start dziś!" : "za " + startDl + "d") : /*#__PURE__*/React.createElement(Badge, {
    color: "#F4A261"
  }, "czeka ", waitDays, "d") : r.renewable ? /*#__PURE__*/React.createElement(Badge, {
    color: unpaid > 0 ? "#E05C5C" : "#3DAA72"
  }, unpaid > 0 ? unpaid + " nieopłacone" : "✓ opłacone") : dl !== null ? /*#__PURE__*/React.createElement(Badge, {
    color: ov ? "#E05C5C" : dl < 7 ? "#F4A261" : "#3DAA72"
  }, ov ? Math.abs(dl) + "d po term." : dl === 0 ? "Dziś!" : dl + "d") : /*#__PURE__*/React.createElement(Badge, {
    color: "#7A8FA6"
  }, "brak terminu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "4px 16px",
      fontSize: 12,
      color: "#7A8FA6"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCC5 ", r.startDate, r.renewable ? " → odnawialne" : r.endDate ? " → " + r.endDate : ""), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCB0 ", maskAmt(demo, totalAmount), " z\u0142", r.renewable ? "/mies." : ""), r.renewable ? unpaid > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#E05C5C",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F ", unpaid, " ", unpaid === 1 ? "miesiąc" : "mies.", " do op\u0142acenia") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#3DAA72",
      fontWeight: 600
    }
  }, "\u2713 wszystko op\u0142acone") : totalAmount - totalPaid > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#E05C5C",
      fontWeight: 600
    }
  }, "\u26A0\uFE0F do zap\u0142aty: ", demo ? "****" : totalAmount - totalPaid, " z\u0142") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#3DAA72",
      fontWeight: 600
    }
  }, "\u2713 op\u0142acone"), !demo && r.address && /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCD ", r.address)), (r.notes || hasReceipt || hasInvoice) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      paddingTop: 8,
      borderTop: "1px solid #EFF3FA",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, (hasReceipt || hasInvoice) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, hasReceipt && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#3E6FB0",
      background: "#E1E9F5",
      borderRadius: 6,
      padding: "2px 8px"
    }
  }, "\uD83E\uDDFE Paragon"), hasInvoice && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: "#7C6AF4",
      background: "#F0EEFF",
      borderRadius: 6,
      padding: "2px 8px"
    }
  }, "\uD83D\uDCC4 Faktura")), r.notes && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#7A8FA6",
      lineHeight: 1.4,
      whiteSpace: "pre-wrap"
    }
  }, "\uD83D\uDCDD ", maskText(demo, r.notes))));
}
function Rentals(_ref6) {
  var rentals = _ref6.rentals,
    setRentals = _ref6.setRentals,
    finances = _ref6.finances,
    setFinances = _ref6.setFinances,
    patients = _ref6.patients,
    setPatients = _ref6.setPatients,
    nfzCases = _ref6.nfzCases,
    setNfzCases = _ref6.setNfzCases,
    allClients = _ref6.allClients,
    initialDetail = _ref6.initialDetail,
    onDetailClosed = _ref6.onDetailClosed,
    backLabel = _ref6.backLabel,
    initialAddDate = _ref6.initialAddDate,
    onAddDateHandled = _ref6.onAddDateHandled,
    rentalsView = _ref6.rentalsView,
    setRentalsView = _ref6.setRentalsView,
    stock = _ref6.stock,
    setStock = _ref6.setStock,
    settings = _ref6.settings;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var mctx = useContext(MachinesCtx);
  var machines = mctx && mctx.machines || [];
  var view = rentalsView || "aktywne",
    setView = setRentalsView;
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    showAdd = _useState30[0],
    setShowAdd = _useState30[1];
  var _useState31 = useState(false),
    _useState32 = _slicedToArray(_useState31, 2),
    showEdit = _useState32[0],
    setShowEdit = _useState32[1];
  var _useState33 = useState(null),
    _useState34 = _slicedToArray(_useState33, 2),
    detail = _useState34[0],
    setDetail = _useState34[1];
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    showExtend = _useState36[0],
    setShowExtend = _useState36[1];
  var _useState37 = useState({
      newEndDate: "",
      endTime: "10:00",
      amountDue: "",
      amountPaid: "",
      payDate: "",
      notes: "",
      editId: null
    }),
    _useState38 = _slicedToArray(_useState37, 2),
    extForm = _useState38[0],
    setExtForm = _useState38[1];
  var _useState39 = useState(emptyRental),
    _useState40 = _slicedToArray(_useState39, 2),
    form = _useState40[0],
    setForm = _useState40[1];
  useEffect(function () {
    if (!initialAddDate) return;
    setForm(_objectSpread(_objectSpread({}, emptyRental()), {}, {
      startDate: initialAddDate
    }));
    setShowAdd(true);
    if (onAddDateHandled) onAddDateHandled();
  }, [initialAddDate]);
  var _useState41 = useState(null),
    _useState42 = _slicedToArray(_useState41, 2),
    ef = _useState42[0],
    setEf = _useState42[1];
  var _useState43 = useState(false),
    _useState44 = _slicedToArray(_useState43, 2),
    confirmDel = _useState44[0],
    setConfirmDel = _useState44[1];
  var _useState45 = useState(""),
    _useState46 = _slicedToArray(_useState45, 2),
    closeDate = _useState46[0],
    setCloseDate = _useState46[1];
  var _useState47 = useState(null),
    _useState48 = _slicedToArray(_useState47, 2),
    toast = _useState48[0],
    setToast = _useState48[1];
  var _useState49 = useState("wszystkie"),
    _useState50 = _slicedToArray(_useState49, 2),
    zakSubView = _useState50[0],
    setZakSubView = _useState50[1];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    showImport = _useState52[0],
    setShowImport = _useState52[1];
  var _useState53 = useState([]),
    _useState54 = _slicedToArray(_useState53, 2),
    csvRows = _useState54[0],
    setCsvRows = _useState54[1];
  var _useState55 = useState(""),
    _useState56 = _slicedToArray(_useState55, 2),
    csvError = _useState56[0],
    setCsvError = _useState56[1];
  var _useState57 = useState(null),
    _useState58 = _slicedToArray(_useState57, 2),
    contactSyncPending = _useState58[0],
    setContactSyncPending = _useState58[1];
  var _useState59 = useState(false),
    _useState60 = _slicedToArray(_useState59, 2),
    showAddCycle = _useState60[0],
    setShowAddCycle = _useState60[1];
  var _useState61 = useState({
      date: "",
      amount: "",
      paid: false,
      payDate: "",
      note: ""
    }),
    _useState62 = _slicedToArray(_useState61, 2),
    addCycleForm = _useState62[0],
    setAddCycleForm = _useState62[1];
  var _useState63 = useState(todayLocal),
    _useState64 = _slicedToArray(_useState63, 2),
    transportPayDate = _useState64[0],
    setTransportPayDate = _useState64[1];
  var importRef = useRef(null);
  var activeEq = getActiveEquipmentNames(stock);
  var eqSub = function eqSub(name) {
    var sw = stock && stock.seatWidth && stock.seatWidth[name] || "";
    var tw = stock && stock.totalWidth && stock.totalWidth[name] || "";
    if (!sw && !tw) return "";
    return (sw ? "siedzisko ".concat(sw, " cm") : "") + (sw && tw ? " · " : "") + (tw ? "ca\u0142k. ".concat(tw, " cm") : "");
  };
  var effectiveDetail = detail !== null ? detail : initialDetail !== null && initialDetail !== void 0 ? initialDetail : null;
  var close = function close() {
    setDetail(null);
    if (onDetailClosed) onDetailClosed();
  };
  var cnt = {
    aktywne: rentals.filter(function (r) {
      return r.status === "aktywne" && !r.renewable && !r.reserved;
    }).length,
    odnawialne: rentals.filter(function (r) {
      return r.status === "aktywne" && r.renewable && !r.reserved;
    }).length,
    oczekujace: rentals.filter(function (r) {
      return r.status === "aktywne" && r.reserved;
    }).length,
    zakończone: rentals.filter(function (r) {
      return r.status === "zakończone";
    }).length
  };
  var cntZakOkres = rentals.filter(function (r) {
    return r.status === "zakończone" && !r.renewable;
  }).length;
  var cntZakCykl = rentals.filter(function (r) {
    return r.status === "zakończone" && r.renewable;
  }).length;
  var zakBase = rentals.filter(function (r) {
    return r.status === "zakończone";
  });
  var zakFiltered = zakSubView === "cykliczne" ? zakBase.filter(function (r) {
    return r.renewable;
  }) : zakSubView === "okresowe" ? zakBase.filter(function (r) {
    return !r.renewable;
  }) : zakBase;
  var filt = view === "aktywne" ? rentals.filter(function (r) {
    return r.status === "aktywne" && !r.renewable && !r.reserved;
  }).sort(function (a, b) {
    return (a.endDate || "9999-99-99").localeCompare(b.endDate || "9999-99-99");
  }) : view === "odnawialne" ? rentals.filter(function (r) {
    return r.status === "aktywne" && r.renewable && !r.reserved;
  }) : view === "oczekujace" ? rentals.filter(function (r) {
    return r.status === "aktywne" && r.reserved;
  }).sort(function (a, b) {
    return (a.startDate || "9999").localeCompare(b.startDate || "9999");
  }) : zakFiltered.slice().sort(function (a, b) {
    return (b.endDate || b.startDate || "").localeCompare(a.endDate || a.startDate || "");
  });
  if (effectiveDetail !== null) {
    var _2;
    var r = rentals.find(function (x) {
      return x.id === effectiveDetail;
    });
    if (!r) {
      setDetail(null);
      return null;
    }
    var today = todayLocal(),
      dl = r.endDate ? dateDiff(today, r.endDate) : null,
      ov = dl !== null && dl < 0;
    var maps = r.address ? "https://www.google.com/maps/dir/?api=1&destination=".concat(encodeURIComponent(r.address)) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: close,
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
    }), " ", backLabel || "Wypożyczalnia"), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 20px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontSize: 22,
        fontWeight: 800
      }
    }, r.equipment || "❓ Do ustalenia"), function () {
      var rc = r.machineId ? machines.find(function (m) {
        return m.id === r.machineId;
      }) : null;
      return rc ? /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#7A8FA6",
          marginBottom: 6
        }
      }, "Sztuka: ", /*#__PURE__*/React.createElement("b", null, rc.code || "(bez kodu)"), rc.serialNo ? " · nr fabryczny " + rc.serialNo : "") : null;
    }(), r.renewable ? /*#__PURE__*/React.createElement(Badge, {
      color: "#7C6AF4"
    }, "\uD83D\uDD04 Odnawialne miesi\u0119cznie") : dl !== null && /*#__PURE__*/React.createElement(Badge, {
      color: ov ? "#E05C5C" : dl < 7 ? "#F4A261" : "#3DAA72"
    }, ov ? Math.abs(dl) + "d po terminie" : dl === 0 ? "Termin dziś!" : dl + " dni")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary",
      onClick: function onClick() {
        setEf(_objectSpread(_objectSpread({}, r), {}, {
          amount: String(r.amount),
          amountPaid: String(calcRentalPaid(r))
        }));
        setShowEdit(true);
      }
    }, "\u270F\uFE0F Edytuj"))), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Pacjent"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 12
      }
    }, demo ? "Pacjent" : r.patientName), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: r.address ? 10 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#7A8FA6"
      }
    }, maskPhone(demo, r.phone)), r.phone && !demo && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "tel:".concat(r.phone.replace(/\s/g, "")),
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
      href: "sms:".concat(r.phone.replace(/\s/g, "")),
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
    }), " SMS")))), r.address && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#7A8FA6",
        flex: 1,
        paddingRight: 8
      }
    }, maskAddr(demo, r.address)), maps && !demo && /*#__PURE__*/React.createElement("a", {
      href: maps,
      target: "_blank",
      rel: "noreferrer",
      style: {
        textDecoration: "none",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary"
    }, "\uD83D\uDDFA\uFE0F Trasa")))), /*#__PURE__*/React.createElement(RentalCpmCard, {
      r: r,
      rentals: rentals,
      patients: patients,
      setRentals: setRentals
    }), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Wypo\u017Cyczenie"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 3
      }
    }, "Data od"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, r.startDate)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 3
      }
    }, "Data do"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, r.endDate || "—")), r.status === "aktywne" && !r.renewable && r.endDate && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setExtForm({
          newEndDate: "",
          endTime: "10:00",
          amountDue: "",
          amountPaid: "",
          payDate: "",
          notes: "",
          editId: null
        });
        setShowExtend(true);
      },
      style: {
        background: "#E1E9F5",
        border: "none",
        borderRadius: 8,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: 600,
        color: "#3E6FB0",
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, "+ Przed\u0142u\u017C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 3
      }
    }, "Typ"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, r.renewable ? "Odnawialne" : "Jednorazowe")), r.transport > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginBottom: 3
      }
    }, "Transport"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: "#F4A261"
      }
    }, demo ? "****" : r.transport + " zł"))), r.renewable && r.transport > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottom: "1px solid #D9E2F0"
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
        color: "#7A8FA6"
      }
    }, r.transportPaid ? "Transport opłacony " + r.transportPaidDate : "Transport jeszcze nieopłacony"), r.transportPaid ? /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              transportPaid: false,
              transportPaidDate: null
            }) : x;
          });
        });
        setFinances(function (fs) {
          return fs.filter(function (f) {
            return f.sourceId !== "transport-" + r.id;
          });
        });
      },
      style: {
        background: "#FEE2E2",
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 600,
        color: "#E05C5C",
        cursor: "pointer",
        fontFamily: "inherit",
        flexShrink: 0
      }
    }, "Anuluj") : /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var pd = transportPayDate || todayLocal();
        setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              transportPaid: true,
              transportPaidDate: pd
            }) : x;
          });
        });
        setFinances(function (fs) {
          return [{
            id: Date.now() + Math.random(),
            sourceId: "transport-" + r.id,
            date: pd,
            type: "przychód",
            category: "Wypożyczalnia",
            amount: +r.transport,
            description: "Transport – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ")"
          }].concat(_toConsumableArray(fs));
        });
      },
      style: {
        background: "#3E6FB0",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "6px 14px",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        flexShrink: 0
      }
    }, "\u2713 Op\u0142acono")), !r.transportPaid && /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: transportPayDate,
      onChange: function onChange(e) {
        return setTransportPayDate(e.target.value);
      },
      style: {
        marginTop: 6,
        width: "100%",
        padding: "7px 10px",
        border: "1.5px solid #D9E2F0",
        borderRadius: 10,
        fontSize: 13,
        outline: "none",
        background: "#FAFCFD",
        fontFamily: "inherit",
        boxSizing: "border-box"
      }
    })), (r.extensions || []).length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottom: "1px solid #D9E2F0"
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 8
      }
    }, "Historia przed\u0142u\u017Ce\u0144"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 6,
        paddingBottom: 6,
        borderBottom: "1px solid #EFF3FA"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 3,
        borderRadius: 2,
        background: "#D9E2F0",
        alignSelf: "stretch",
        minHeight: 32,
        marginTop: 2,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, "Okres oryginalny"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, r.startDate, " \u2192 ", ((_2 = (r.extensions || [])[0]) === null || _2 === void 0 ? void 0 : _2.prevEndDate) || r.endDate, " \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#1C2B3A"
      }
    }, demo ? "****" : r.amount + " zł")))), (r.extensions || []).map(function (ext, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: ext.id || i,
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          marginBottom: 6,
          paddingBottom: 6,
          borderBottom: "1px solid #EFF3FA"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 3,
          borderRadius: 2,
          background: "#3E6FB0",
          alignSelf: "stretch",
          minHeight: 32,
          marginTop: 2,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#3E6FB0",
          fontWeight: 600
        }
      }, "Przed\u0142u\u017Cenie ", i + 1), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13
        }
      }, ext.prevEndDate, " \u2192 ", ext.newEndDate), (ext.amountDue || ext.amount || 0) > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          marginTop: 2
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#7A8FA6"
        }
      }, "Nale\u017Cne: "), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, maskAmt(demo, ext.amountDue || ext.amount), " z\u0142"), function () {
        var cd = (+r.amount || 0) + (r.extensions || []).slice(0, i + 1).reduce(function (s, e) {
          return s + (+e.amountDue || +e.amount || 0);
        }, 0);
        var cov = calcRentalPaid(r) >= cd;
        return (ext.amountPaid || 0) > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
          style: {
            color: "#3DAA72",
            marginLeft: 8
          }
        }, "\u2713 Zap\u0142acono: ", maskAmt(demo, ext.amountPaid), " z\u0142"), ext.amountPaid < (ext.amountDue || ext.amount || 0) && /*#__PURE__*/React.createElement("span", {
          style: {
            color: "#E05C5C",
            marginLeft: 8
          }
        }, "Pozosta\u0142o: ", maskAmt(demo, (ext.amountDue || ext.amount || 0) - ext.amountPaid), " z\u0142")) : cov ? /*#__PURE__*/React.createElement("span", {
          style: {
            color: "#3DAA72",
            marginLeft: 8
          }
        }, "\u2713 pokryte wp\u0142at\u0105") : /*#__PURE__*/React.createElement("span", {
          style: {
            color: "#F4A261",
            marginLeft: 8
          }
        }, "\xB7 do zap\u0142aty");
      }()), ext.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6",
          marginTop: 2,
          fontStyle: "italic",
          whiteSpace: "pre-wrap"
        }
      }, maskText(demo, ext.notes))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          setExtForm({
            newEndDate: ext.newEndDate,
            endTime: ext.endTime || "10:00",
            amountDue: String(ext.amountDue || ext.amount || ""),
            amountPaid: String(ext.amountPaid || ""),
            payDate: ext.paidDate || "",
            notes: ext.notes || "",
            editId: ext.id || i
          });
          setShowExtend(true);
        },
        style: {
          background: "#E1E9F5",
          border: "none",
          borderRadius: 8,
          padding: "5px 9px",
          fontSize: 12,
          fontWeight: 600,
          color: "#3E6FB0",
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          if (!window.confirm("Usunąć przedłużenie " + ext.prevEndDate + " → " + ext.newEndDate + "?" + ((ext.amountPaid || 0) > 0 && !demo ? " Wpłata " + ext.amountPaid + " zł zniknie też z Finansów." : ""))) return;
          var prevEnd = i === 0 ? (r.extensions || [])[0].prevEndDate : (r.extensions || [])[i - 1].newEndDate;
          var newExts = (r.extensions || []).filter(function (_, j) {
            return j !== i;
          });
          var newEndDate = newExts.length > 0 ? newExts[newExts.length - 1].newEndDate : prevEnd;
          setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                endDate: newEndDate,
                extensions: newExts
              }) : x;
            });
          });
          if (ext.amount > 0 || (ext.amountPaid || 0) > 0) {
            if (ext.id) {
              setFinances(function (fs) {
                return fs.filter(function (f) {
                  return f.sourceId !== "extend-" + r.id + "-" + ext.id;
                });
              });
            } else {
              // Stare przedłużenie bez id — szukamy po opisie i kwocie
              setFinances(function (fs) {
                var toRemove = fs.findIndex(function (f) {
                  return f.sourceId && f.sourceId.startsWith("extend-" + r.id + "-") && f.amount === (ext.amountPaid || ext.amount) && !newExts.some(function (e) {
                    return e.id && f.sourceId === "extend-" + r.id + "-" + e.id;
                  });
                });
                return toRemove >= 0 ? fs.filter(function (_, j) {
                  return j !== toRemove;
                }) : fs;
              });
            }
          }
        },
        style: {
          background: "#FEE2E2",
          border: "none",
          borderRadius: 8,
          padding: "5px 9px",
          fontSize: 12,
          fontWeight: 600,
          color: "#E05C5C",
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "\u2715")));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid #D9E2F0",
        paddingTop: 12
      }
    }, r.renewable ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionLabel, null, "Cykle miesi\u0119czne"), (r.cycles || []).length === 0 && r.startDate && r.startDate < todayLocal().slice(0, 7) ? /*#__PURE__*/React.createElement(HistoryFill, {
      r: r,
      setRentals: setRentals,
      setFinances: setFinances
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, (r.cycles || []).length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#7A8FA6",
        textAlign: "center",
        padding: "12px 0"
      }
    }, "Brak cykli \u2014 dodaj pierwszy okres poni\u017Cej"), _toConsumableArray(r.cycles || []).sort(function (a, b) {
      return (b.dueDate || b.month).localeCompare(a.dueDate || a.month);
    }).map(function (c) {
      return /*#__PURE__*/React.createElement(CycleRow, {
        key: c.dueDate || c.month,
        r: r,
        cycle: c,
        setRentals: setRentals,
        setFinances: setFinances
      });
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var cyc = r.cycles || [];
        var nextDate = r.startDate;
        if (cyc.length > 0) {
          var last = _toConsumableArray(cyc).sort(function (a, b) {
            return (b.dueDate || b.month + "-01").localeCompare(a.dueDate || a.month + "-01");
          })[0];
          nextDate = nextCycleDueDate(last.dueDate || last.month + "-01");
        }
        setAddCycleForm({
          date: nextDate,
          amount: String(r.amount || ""),
          paid: false,
          payDate: todayLocal(),
          note: ""
        });
        setShowAddCycle(true);
      },
      style: {
        marginTop: 8,
        width: "100%",
        padding: "10px",
        borderRadius: 10,
        border: "1.5px dashed #D9E2F0",
        background: "none",
        color: "#3E6FB0",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, (r.cycles || []).length > 0 ? "✓ Pacjent przedłuża — dodaj kolejny okres" : "+ Dodaj okres")) : function () {
      // Łączna należność = oryginał + amountDue ze wszystkich przedłużeń
      var extDue = (r.extensions || []).reduce(function (s, e) {
        return s + (+e.amountDue || +e.amount || 0);
      }, 0);
      var totalAmount = (+r.amount || 0) + extDue;
      // Zapłacono = wpłaty z payments + amountPaid z przedłużeń
      var paymentsPaid = (r.payments || []).reduce(function (s, p) {
        return s + p.amount;
      }, 0);
      var extPaid = (r.extensions || []).reduce(function (s, e) {
        return s + (e.amountPaid || 0);
      }, 0);
      var totalPaid = calcRentalPaid(r);
      var remaining = totalAmount - totalPaid;

      // Historia wpłat: normalne wpłaty + przedłużenia które mają amountPaid>0
      var allPayments = [].concat(_toConsumableArray((r.payments || []).map(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          _type: "payment"
        });
      })), _toConsumableArray((r.extensions || []).filter(function (e) {
        return (e.amountPaid || 0) > 0;
      }).map(function (e) {
        return {
          id: "ext-" + e.id,
          amount: e.amountPaid,
          date: e.paidDate || e.date || r.startDate,
          doc: e.doc,
          _type: "extension",
          _extId: e.id,
          _label: "Przedłużenie → " + e.newEndDate,
          _due: e.amountDue || e.amount || 0
        };
      }))).sort(function (a, b) {
        return b.date.localeCompare(a.date);
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionLabel, null, "P\u0142atno\u015B\u0107"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginBottom: 12
        }
      }, [{
        l: "Łącznie",
        v: demo ? "****" : totalAmount + " zł",
        c: "#1C2B3A"
      }, {
        l: "Zapłacono",
        v: demo ? "****" : totalPaid + " zł",
        c: "#3DAA72"
      }, {
        l: "Pozostało",
        v: demo ? "****" : remaining + " zł",
        c: remaining > 0 ? "#E05C5C" : "#3DAA72"
      }].map(function (x, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            background: x.c === "#1C2B3A" ? "#EFF3FA" : x.c + "14",
            borderRadius: 12,
            padding: "10px 8px",
            textAlign: "center",
            border: "1.5px solid ".concat(x.c === "#1C2B3A" ? "#D9E2F0" : x.c + "30")
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 14,
            color: x.c
          }
        }, x.v), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "#7A8FA6",
            marginTop: 2
          }
        }, x.l));
      })), /*#__PURE__*/React.createElement(PaymentForm, {
        rentalId: r.id,
        rentalAmount: totalAmount,
        amountPaid: totalPaid,
        patientName: r.patientName,
        equipment: r.equipment,
        setRentals: setRentals,
        setFinances: setFinances
      }), allPayments.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid #D9E2F0"
        }
      }, /*#__PURE__*/React.createElement(SectionLabel, {
        style: {
          marginBottom: 8
        }
      }, "Historia wp\u0142at"), allPayments.map(function (p) {
        return /*#__PURE__*/React.createElement("div", {
          key: p.id,
          style: {
            padding: "10px 0",
            borderBottom: "1px solid #EFF3FA"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 10,
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: p._type === "extension" ? "#7C6AF4" : "#3DAA72",
            flexShrink: 0
          }
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontWeight: 600,
            fontSize: 14
          }
        }, demo ? "****" : p.amount + " zł", p._label && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: "#7C6AF4",
            fontWeight: 400,
            marginLeft: 6
          }
        }, p._label)), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: "#7A8FA6"
          }
        }, p.date, p._due > 0 && p._due !== p.amount && /*#__PURE__*/React.createElement("span", {
          style: {
            marginLeft: 6,
            color: "#F4A261"
          }
        }, "nale\u017Cne: ", maskAmt(demo, p._due), " z\u0142")))), /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            if (!window.confirm("Usunąć wpłatę" + (demo ? "" : " " + p.amount + " zł") + " z dnia " + p.date + "? Zniknie też z Finansów.")) return;
            if (p._type === "payment") {
              setRentals(function (rs) {
                return rs.map(function (x) {
                  if (x.id !== r.id) return x;
                  var newPayments = (x.payments || []).filter(function (q) {
                    return q.id !== p.id;
                  });
                  var newPaid = newPayments.reduce(function (s, q) {
                    return s + (+q.amount || 0);
                  }, 0);
                  return _objectSpread(_objectSpread({}, x), {}, {
                    payments: newPayments,
                    amountPaid: newPaid
                  });
                });
              });
              setFinances(function (fs) {
                return fs.filter(function (f) {
                  return f.sourceId !== "payment-" + p.id;
                });
              });
            } else {
              // Usuń wpłatę za przedłużenie — zeruj amountPaid, zachowaj amountDue
              setRentals(function (rs) {
                return rs.map(function (x) {
                  return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                    extensions: (x.extensions || []).map(function (e) {
                      return e.id === p._extId ? _objectSpread(_objectSpread({}, e), {}, {
                        amountPaid: 0,
                        paidDate: null,
                        doc: null
                      }) : e;
                    })
                  }) : x;
                });
              });
              setFinances(function (fs) {
                return fs.filter(function (f) {
                  return f.sourceId !== "extend-" + r.id + "-" + p._extId;
                });
              });
            }
          },
          style: {
            background: "#FEE2E2",
            border: "none",
            borderRadius: 8,
            padding: "5px 10px",
            fontSize: 12,
            fontWeight: 600,
            color: "#E05C5C",
            cursor: "pointer",
            fontFamily: "inherit"
          }
        }, "Usu\u0144")), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            gap: 8
          }
        }, [{
          k: "receipt",
          l: "🧾 Paragon"
        }, {
          k: "invoice",
          l: "📄 Faktura"
        }].map(function (opt) {
          var ac = p.doc === opt.k;
          var toggle = function toggle() {
            if (p._type === "payment") {
              setRentals(function (rs) {
                return rs.map(function (x) {
                  return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                    payments: (x.payments || []).map(function (q) {
                      return q.id === p.id ? _objectSpread(_objectSpread({}, q), {}, {
                        doc: ac ? null : opt.k
                      }) : q;
                    })
                  }) : x;
                });
              });
            } else {
              setRentals(function (rs) {
                return rs.map(function (x) {
                  return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                    extensions: (x.extensions || []).map(function (e) {
                      return e.id === p._extId ? _objectSpread(_objectSpread({}, e), {}, {
                        doc: ac ? null : opt.k
                      }) : e;
                    })
                  }) : x;
                });
              });
            }
          };
          return /*#__PURE__*/React.createElement("button", {
            key: opt.k,
            onClick: toggle,
            style: {
              flex: 1,
              padding: "7px 8px",
              borderRadius: 10,
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              border: "1.5px solid ".concat(ac ? "#3E6FB0" : "#D9E2F0"),
              background: ac ? "#E1E9F5" : "#fff",
              color: ac ? "#3E6FB0" : "#7A8FA6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4
            }
          }, ac && /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 10
            }
          }, "\u2713"), opt.l);
        })));
      })));
    }())), r.renewable && (r.cycles || []).length > 0 && function () {
      var paid = (r.cycles || []).filter(function (c) {
        return c.paid;
      });
      var total = calcRentalPaid(r);
      var unpaidN = (r.cycles || []).filter(function (c) {
        return !c.paid && !c.cancelled;
      }).length;
      return /*#__PURE__*/React.createElement(Card, {
        style: {
          marginBottom: 10,
          background: "#E1E9F5",
          border: "1.5px solid #3E6FB030"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#3E6FB0",
          textTransform: "uppercase",
          letterSpacing: .5,
          marginBottom: 10
        }
      }, "Podsumowanie wypo\u017Cyczenia"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8
        }
      }, [{
        l: "Mies. łącznie",
        v: paid.length,
        c: "#3E6FB0",
        suf: ""
      }, {
        l: "Łącznie wpłacono",
        v: maskAmt(demo, total),
        c: "#3DAA72",
        suf: " zł"
      }, {
        l: "Do opłacenia",
        v: unpaidN,
        c: unpaidN > 0 ? "#E05C5C" : "#3DAA72",
        suf: " mies."
      }].map(function (x, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            background: "#fff",
            borderRadius: 12,
            padding: "10px 8px",
            textAlign: "center",
            border: "1.5px solid #D9E2F0"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 14,
            color: x.c
          }
        }, x.v, x.suf), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "#7A8FA6",
            marginTop: 2
          }
        }, x.l));
      })));
    }(), r.notes && /*#__PURE__*/React.createElement(Card, {
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
    }, maskText(demo, r.notes))), r.status === "aktywne" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setRentals(function (rs) {
          return rs.map(function (x) {
            if (x.id !== r.id) return x;
            var willReserve = !x.reserved;
            var activating = x.reserved && !willReserve;
            var needsFirstCycle = activating && x.renewable && (x.cycles || []).length === 0;
            return _objectSpread(_objectSpread({}, x), {}, {
              reserved: willReserve,
              reservedAt: willReserve ? todayLocal() : x.reservedAt
            }, needsFirstCycle ? {
              cycles: [{
                dueDate: x.startDate,
                month: x.startDate.slice(0, 7),
                amount: +(x.amount || 0),
                paid: false,
                paidDate: null
              }]
            } : {});
          });
        });
      },
      style: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: 12,
        border: "1.5px solid ".concat(r.reserved ? "#7C6AF4" : "#D9E2F0"),
        background: r.reserved ? "#F0EEFF" : dk ? "#1A2A3A" : "#fff",
        color: r.reserved ? "#7C6AF4" : "#7A8FA6",
        fontFamily: "inherit",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
      }
    }, r.reserved && /*#__PURE__*/React.createElement("span", null, "\u2713"), "\uD83D\uDCCB Do potwierdzenia", r.reserved && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 400,
        marginLeft: 4
      }
    }, r.startDate ? "· start " + r.startDate : "· czeka " + (r.reservedAt ? dateDiff(r.reservedAt, todayLocal()) : 0) + "d"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14,
        background: dk ? "#0F2020" : "#F0F9F5",
        borderRadius: 12,
        padding: "12px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#3DAA72",
        marginBottom: 8,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, "\uD83D\uDCC5 Planowany odbi\xF3r"), /*#__PURE__*/React.createElement(Inp, {
      label: "",
      value: r.plannedReturn || "",
      onChange: function onChange(v) {
        return setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              plannedReturn: v || null
            }) : x;
          });
        });
      },
      type: "date"
    }), r.plannedReturn && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "#7A8FA6",
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, "Odbi\xF3r"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 8
      }
    }, [{
      v: true,
      l: "🗓 Całodniowy"
    }, {
      v: false,
      l: "⏰ Konkretna godzina"
    }].map(function (o) {
      return /*#__PURE__*/React.createElement("button", {
        key: String(o.v),
        onClick: function onClick() {
          return setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                plannedReturnAllDay: o.v
              }, o.v === false ? {
                plannedReturnTime: x.plannedReturnTime || "10:00"
              } : {}) : x;
            });
          });
        },
        style: {
          flex: 1,
          padding: "7px",
          borderRadius: 10,
          border: "2px solid ".concat(r.plannedReturnAllDay !== false === o.v ? "#3E6FB0" : "#D9E2F0"),
          background: r.plannedReturnAllDay !== false === o.v ? "#E1E9F5" : "#fff",
          color: r.plannedReturnAllDay !== false === o.v ? "#3E6FB0" : "#7A8FA6",
          fontWeight: 600,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, o.l);
    })), r.plannedReturnAllDay === false && /*#__PURE__*/React.createElement(TimeRange, {
      kind: "pickup",
      autofill: false,
      labelStart: "Odbi\xF3r od godziny",
      labelEnd: "do godziny",
      start: r.plannedReturnTime || "10:00",
      end: r.plannedReturnUntil,
      onChange: function onChange(t, e) {
        return setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              plannedReturnTime: t,
              plannedReturnUntil: e
            }) : x;
          });
        });
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              plannedReturn: null,
              plannedReturnAllDay: undefined,
              plannedReturnTime: undefined,
              plannedReturnUntil: undefined
            }) : x;
          });
        });
      },
      style: {
        background: "none",
        border: "none",
        fontSize: 12,
        color: "#E05C5C",
        cursor: "pointer",
        fontFamily: "inherit",
        padding: "4px 0"
      }
    }, "\xD7 Usu\u0144 planowany odbi\xF3r"))), r.renewable && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        marginBottom: 6,
        fontWeight: 600
      }
    }, "Data zako\u0144czenia wypo\u017Cyczenia"), /*#__PURE__*/React.createElement(Inp, {
      label: "",
      value: closeDate || r.plannedReturn || "",
      onChange: function onChange(v) {
        return setCloseDate(v);
      },
      type: "date"
    })), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 10
      },
      onClick: function onClick() {
        var extTotal = (r.extensions || []).reduce(function (s, e) {
          return s + (+e.amountDue || 0);
        }, 0);
        var totalAmount = (+r.amount || 0) + extTotal;
        var paymentsPaid = (r.payments || []).reduce(function (s, p) {
          return s + p.amount;
        }, 0);
        var extPaid = (r.extensions || []).reduce(function (s, e) {
          return s + (+e.amountPaid || 0);
        }, 0);
        var remaining = totalAmount - calcRentalPaid(r);
        var effectiveCloseDate = closeDate || r.plannedReturn || "";
        if (r.renewable && !effectiveCloseDate) {
          alert("Podaj datę zakończenia");
          return;
        }
        if (remaining > 0 && !window.confirm("Pozosta\u0142o ".concat(remaining, " z\u0142 do zap\u0142aty. Zako\u0144czy\u0107 mimo to?"))) return;
        var endMonth = r.renewable && effectiveCloseDate ? effectiveCloseDate.slice(0, 7) : null;
        setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              status: "zakończone",
              endDate: r.renewable ? effectiveCloseDate : x.endDate,
              cycles: endMonth ? (x.cycles || []).filter(function (c) {
                return c.paid || c.cancelled || c.month <= endMonth;
              }) : x.cycles
            }) : x;
          });
        });
        if (endMonth) {
          var toRemove = new Set((r.cycles || []).filter(function (c) {
            return !c.paid && c.month > endMonth;
          }).map(function (c) {
            return "cycle-" + r.id + "-" + (c.dueDate || c.month);
          }));
          if (toRemove.size > 0) setFinances(function (fs) {
            return fs.filter(function (f) {
              return !toRemove.has(f.sourceId);
            });
          });
        }
        close();
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      d: I.chk,
      s: 16,
      c: "#fff"
    }), " Sprz\u0119t zwr\xF3cony \u2014 zako\u0144cz")), r.status === "zakończone" && /*#__PURE__*/React.createElement(Btn, {
      variant: "secondary",
      style: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 10
      },
      onClick: function onClick() {
        return setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              status: "aktywne"
            }) : x;
          });
        });
      }
    }, "\u21A9\uFE0F Cofnij zako\u0144czenie"), function () {
      var tpl = settings && settings.reviewTemplate || "Hej, dziękuję za wypożyczenie! Będę wdzięczny za opinię:";
      var msg = tpl;
      var smsHref = "sms:" + (r.phone ? r.phone.replace(/\s/g, "") : "") + "?body=" + encodeURIComponent(msg);
      return /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 10
        }
      }, r.reviewRequested && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "#F4A261",
          fontWeight: 600
        }
      }, "\u2B50 Pro\u015Bba o opini\u0119 wys\u0142ana"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                reviewRequested: false
              }) : x;
            });
          });
        },
        style: {
          background: "none",
          border: "none",
          color: "#7A8FA6",
          fontSize: 11,
          cursor: "pointer",
          fontFamily: "inherit",
          padding: "2px 6px",
          borderRadius: 6,
          textDecoration: "underline"
        }
      }, "\xD7 odznacz")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("a", {
        href: smsHref,
        style: {
          flex: 1,
          textDecoration: "none"
        },
        onClick: function onClick() {
          return setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                reviewRequested: true
              }) : x;
            });
          });
        }
      }, /*#__PURE__*/React.createElement(Btn, {
        variant: "secondary",
        style: {
          width: "100%",
          justifyContent: "center",
          background: r.reviewRequested ? "#F0FAF5" : undefined,
          borderColor: r.reviewRequested ? "#3DAA72" : undefined
        }
      }, "\u2B50 ", r.reviewRequested ? "Wyślij ponownie" : "Poproś o opinię", " \u2192 SMS")), /*#__PURE__*/React.createElement(Btn, {
        variant: "secondary",
        style: {
          flexShrink: 0,
          padding: "0 14px"
        },
        onClick: function onClick() {
          navigator.clipboard && navigator.clipboard.writeText(msg).then(function () {
            return alert("Skopiowano!");
          });
          setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                reviewRequested: true
              }) : x;
            });
          });
        }
      }, "\uD83D\uDCCB")));
    }(), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      style: {
        width: "100%",
        justifyContent: "center",
        marginTop: 4
      },
      onClick: function onClick() {
        return setConfirmDel(true);
      }
    }, "\uD83D\uDDD1\uFE0F Usu\u0144 wypo\u017Cyczenie"))), showEdit && ef && /*#__PURE__*/React.createElement(Modal, {
      title: "Edytuj wypo\u017Cyczenie",
      onClose: function onClose() {
        return setShowEdit(false);
      }
    }, /*#__PURE__*/React.createElement(EquipmentPicker, {
      label: "Sprz\u0119t",
      value: ef.equipment,
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            equipment: v,
            machineId: v === f.equipment ? f.machineId : whDefaultCardId(machines, rentals, stock, v, f.id)
          });
        });
      },
      options: [{
        value: "",
        label: "❓ Do ustalenia"
      }].concat(_toConsumableArray(activeEq.map(function (x) {
        return {
          value: x,
          label: x,
          sub: eqSub(x)
        };
      })), _toConsumableArray(ef.equipment && !activeEq.includes(ef.equipment) ? [{
        value: ef.equipment,
        label: ef.equipment + " (zarchiwizowany)"
      }] : []))
    }), /*#__PURE__*/React.createElement(CardPicker, {
      eq: ef.equipment,
      value: ef.machineId,
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            machineId: v
          });
        });
      },
      stock: stock,
      rentals: rentals,
      excludeId: ef.id
    }), /*#__PURE__*/React.createElement(EqIssueHint, {
      eq: ef.equipment,
      machineId: ef.machineId,
      stock: stock
    }), /*#__PURE__*/React.createElement(PatientPicker, {
      label: "Pacjent",
      value: ef.patientName,
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            patientName: v
          });
        });
      },
      onSelect: function onSelect(p) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            patientName: p.name,
            phone: p.phone,
            address: p.address,
            patientId: p.id
          });
        });
      },
      patients: allClients || patients
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Telefon",
      value: ef.phone || "",
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            phone: v
          });
        });
      },
      type: "tel"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Adres",
      value: ef.address || "",
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            address: v
          });
        });
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: "#7A8FA6",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, "Typ"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, [{
      v: false,
      l: "Jednorazowe"
    }, {
      v: true,
      l: "Odnawialne"
    }].map(function (o) {
      return /*#__PURE__*/React.createElement("button", {
        key: String(o.v),
        onClick: function onClick() {
          return setEf(function (f) {
            return _objectSpread(_objectSpread({}, f), {}, {
              renewable: o.v
            });
          });
        },
        style: {
          flex: 1,
          padding: "10px 8px",
          borderRadius: 12,
          border: "2px solid ".concat(ef.renewable === o.v ? "#3E6FB0" : "#D9E2F0"),
          background: ef.renewable === o.v ? "#E1E9F5" : "#fff",
          color: ef.renewable === o.v ? "#3E6FB0" : "#7A8FA6",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, o.l);
    }))), /*#__PURE__*/React.createElement(Inp, {
      label: "Data od",
      value: ef.startDate,
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            startDate: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "#7A8FA6",
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, "Dow\xF3z"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 10
      }
    }, [{
      v: false,
      l: "⏰ Konkretna godzina"
    }, {
      v: true,
      l: "🗓 Całodniowy"
    }].map(function (o) {
      var cur = ef.startAllDay !== undefined ? ef.startAllDay : ef.allDay || false;
      return /*#__PURE__*/React.createElement("button", {
        key: String(o.v),
        onClick: function onClick() {
          return setEf(function (f) {
            return _objectSpread(_objectSpread({}, f), {}, {
              startAllDay: o.v,
              allDay: undefined
            });
          });
        },
        style: {
          flex: 1,
          padding: "8px",
          borderRadius: 10,
          border: "2px solid ".concat(cur === o.v ? "#3E6FB0" : "#D9E2F0"),
          background: cur === o.v ? "#E1E9F5" : "#fff",
          color: cur === o.v ? "#3E6FB0" : "#7A8FA6",
          fontWeight: 600,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, o.l);
    })), !(ef.startAllDay !== undefined ? ef.startAllDay : ef.allDay || false) && /*#__PURE__*/React.createElement(TimeRange, {
      kind: "delivery",
      labelStart: "Dow\xF3z od godziny",
      labelEnd: "do godziny",
      start: ef.startTime || "10:00",
      end: ef.startUntil,
      onChange: function onChange(t, e) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            startTime: t,
            startUntil: e
          });
        });
      }
    }), !ef.renewable && /*#__PURE__*/React.createElement(Inp, {
      label: "Data do",
      value: ef.endDate || "",
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            endDate: v
          });
        });
      },
      type: "date"
    }), !ef.renewable && ef.endDate && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "#7A8FA6",
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, "Odbi\xF3r"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 10
      }
    }, [{
      v: false,
      l: "⏰ Konkretna godzina"
    }, {
      v: true,
      l: "🗓 Całodniowy"
    }].map(function (o) {
      var cur = ef.endAllDay !== undefined ? ef.endAllDay : ef.allDay || false;
      return /*#__PURE__*/React.createElement("button", {
        key: String(o.v),
        onClick: function onClick() {
          return setEf(function (f) {
            return _objectSpread(_objectSpread({}, f), {}, {
              endAllDay: o.v,
              allDay: undefined
            });
          });
        },
        style: {
          flex: 1,
          padding: "8px",
          borderRadius: 10,
          border: "2px solid ".concat(cur === o.v ? "#3E6FB0" : "#D9E2F0"),
          background: cur === o.v ? "#E1E9F5" : "#fff",
          color: cur === o.v ? "#3E6FB0" : "#7A8FA6",
          fontWeight: 600,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, o.l);
    })), !(ef.endAllDay !== undefined ? ef.endAllDay : ef.allDay || false) && /*#__PURE__*/React.createElement(TimeRange, {
      kind: "pickup",
      labelStart: "Odbi\xF3r od godziny",
      labelEnd: "do godziny",
      start: ef.endTime || "10:00",
      end: ef.endUntil,
      onChange: function onChange(t, e) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            endTime: t,
            endUntil: e
          });
        });
      }
    })), /*#__PURE__*/React.createElement(Inp, {
      label: "Kwota (z\u0142)",
      value: ef.amount,
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            amount: v
          });
        });
      },
      type: "number"
    }), !ef.renewable && !(ef.payments || []).length && /*#__PURE__*/React.createElement(Inp, {
      label: "Zap\u0142acono (z\u0142)",
      value: ef.amountPaid,
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            amountPaid: v
          });
        });
      },
      type: "number"
    }), ef.renewable && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        padding: "10px 14px",
        background: "#EFF3FA",
        borderRadius: 12,
        marginBottom: 14
      }
    }, "P\u0142atno\u015Bci zarz\u0105dzane przez cykle miesi\u0119czne"), /*#__PURE__*/React.createElement(Inp, {
      label: "Transport (z\u0142)",
      value: ef.transport || "",
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            transport: v
          });
        });
      },
      type: "number",
      placeholder: "0"
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Notatki",
      value: ef.notes || "",
      onChange: function onChange(v) {
        return setEf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            notes: v
          });
        });
      },
      rows: 2
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Sk\u0105d dowiedzia\u0142 si\u0119 o wypo\u017Cyczeniu?",
      value: ef.source || "",
      onChange: function onChange(v) {
        return setEf(function (f) {
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
    }), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        if (ef.endDate && ef.startDate && ef.endDate < ef.startDate) {
          alert("Data zakończenia jest wcześniejsza niż data rozpoczęcia — popraw datę.");
          return;
        }
        var raw = +ef.amount,
          pat = patients.find(function (p) {
            return p.name === ef.patientName;
          });
        var cur = rentals.find(function (x) {
          return x.id === effectiveDetail;
        });
        var newPaid = ef.renewable ? (cur === null || cur === void 0 ? void 0 : cur.amountPaid) || 0 : cur && (cur.payments || []).length > 0 ? (cur.payments || []).reduce(function (t, q) {
          return t + (+q.amount || 0);
        }, 0) : Math.min(+(ef.amountPaid || 0), raw);
        var u = _objectSpread(_objectSpread({}, ef), {}, {
          amount: raw,
          amountPaid: newPaid,
          patientId: (pat === null || pat === void 0 ? void 0 : pat.id) || ef.patientId || null,
          machineId: whValidMachineId(machines, ef.equipment, ef.machineId)
        });
        // Dla jednorazowych bez payments: jeśli wpisano zapłacono → utwórz wpłatę i wpis finansowy
        var hasPayments = cur && (cur.payments || []).length > 0;
        if (!ef.renewable && !hasPayments && newPaid > 0) {
          var npid = Date.now();
          var np = {
            id: npid,
            amount: newPaid,
            date: u.startDate || todayLocal()
          };
          setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === effectiveDetail ? _objectSpread(_objectSpread(_objectSpread({}, x), u), {}, {
                payments: [np]
              }) : x;
            });
          });
          setFinances(function (fs) {
            return [{
              id: Date.now() + 1,
              sourceId: "payment-" + npid,
              date: u.startDate || todayLocal(),
              type: "przychód",
              category: "Wypożyczalnia",
              amount: newPaid,
              description: "Wypożyczenie – " + u.patientName + " (" + (u.equipment || "Do ustalenia") + ")"
            }].concat(_toConsumableArray(fs));
          });
        } else {
          setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === effectiveDetail ? _objectSpread(_objectSpread({}, x), u) : x;
            });
          });
        }
        // Sync opisy finansów: wpłaty, przedłużenia, cykle i transport
        setFinances(function (fs) {
          return fs.map(function (f) {
            if (!cur) return f;
            var isPayment = (cur.payments || []).some(function (p) {
              return f.sourceId === "payment-" + p.id;
            });
            var isExtension = f.sourceId && f.sourceId.startsWith("extend-" + effectiveDetail + "-");
            var isCycle = f.sourceId && f.sourceId.startsWith("cycle-" + effectiveDetail + "-");
            var isTransport = f.sourceId === "transport-" + effectiveDetail;
            if (isPayment) return _objectSpread(_objectSpread({}, f), {}, {
              description: "Wypożyczenie – " + u.patientName + " (" + u.equipment + ")"
            });
            if (isExtension) return _objectSpread(_objectSpread({}, f), {}, {
              description: "Przedłużenie – " + u.patientName + " (" + u.equipment + ")"
            });
            if (isCycle) {
              var idx = (f.description || "").indexOf(")");
              var suffix = idx >= 0 ? f.description.slice(idx + 1) : "";
              return _objectSpread(_objectSpread({}, f), {}, {
                description: "Wypożyczenie – " + u.patientName + " (" + (u.equipment || "Do ustalenia") + ")" + suffix
              });
            }
            if (isTransport) return _objectSpread(_objectSpread({}, f), {}, {
              description: "Transport – " + u.patientName + " (" + (u.equipment || "Do ustalenia") + ")"
            });
            return f;
          });
        });
        var pending = syncContactOnSave({
          kind: "rental",
          id: effectiveDetail,
          patientId: u.patientId,
          patientName: u.patientName,
          original: {
            phone: (cur === null || cur === void 0 ? void 0 : cur.phone) || "",
            address: (cur === null || cur === void 0 ? void 0 : cur.address) || ""
          },
          updated: {
            phone: u.phone || "",
            address: u.address || ""
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
        setShowEdit(false);
        setToast("Zmiany zapisane");
      }
    }, "Zapisz zmiany")), showExtend && /*#__PURE__*/React.createElement(Modal, {
      title: extForm.editId != null ? "Edytuj przedłużenie" : "Przedłuż wypożyczenie",
      onClose: function onClose() {
        return setShowExtend(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#7A8FA6",
        marginBottom: 14
      }
    }, demo ? "Pacjent" : r.patientName, " \xB7 ", r.equipment || "❓ Do ustalenia"), extForm.editId == null && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12,
        padding: "10px 14px",
        background: "#EFF3FA",
        borderRadius: 10,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#7A8FA6"
      }
    }, "Aktualna data do: "), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, r.endDate)), /*#__PURE__*/React.createElement(Inp, {
      label: "Nowa data ko\u0144ca *",
      value: extForm.newEndDate,
      onChange: function onChange(v) {
        return setExtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            newEndDate: v
          });
        });
      },
      type: "date"
    }), extForm.newEndDate && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 6,
        fontSize: 12,
        fontWeight: 600,
        color: "#7A8FA6",
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, "Odbi\xF3r"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 10
      }
    }, [{
      v: true,
      l: "🗓 Całodniowy"
    }, {
      v: false,
      l: "⏰ Konkretna godzina"
    }].map(function (o) {
      return /*#__PURE__*/React.createElement("button", {
        key: String(o.v),
        onClick: function onClick() {
          return setExtForm(function (f) {
            return _objectSpread(_objectSpread({}, f), {}, {
              endAllDay: o.v
            });
          });
        },
        style: {
          flex: 1,
          padding: "8px",
          borderRadius: 10,
          border: "2px solid ".concat(extForm.endAllDay !== false === o.v ? "#3E6FB0" : "#D9E2F0"),
          background: extForm.endAllDay !== false === o.v ? "#E1E9F5" : "#fff",
          color: extForm.endAllDay !== false === o.v ? "#3E6FB0" : "#7A8FA6",
          fontWeight: 600,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, o.l);
    })), extForm.endAllDay === false && /*#__PURE__*/React.createElement(TimeSel, {
      label: "Godzina odbioru",
      value: extForm.endTime || "10:00",
      onChange: function onChange(v) {
        return setExtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            endTime: v
          });
        });
      }
    })), /*#__PURE__*/React.createElement(Inp, {
      label: "Kwota do zap\u0142aty (z\u0142)",
      value: extForm.amountDue || "",
      onChange: function onChange(v) {
        return setExtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            amountDue: v
          });
        });
      },
      type: "number",
      placeholder: "zostaw puste je\u015Bli nieznana"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Zap\u0142acono (z\u0142)",
      value: extForm.amountPaid || "",
      onChange: function onChange(v) {
        return setExtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            amountPaid: v
          });
        });
      },
      type: "number",
      placeholder: "0 = jeszcze nie zap\u0142aci\u0142"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Data zap\u0142aty",
      value: extForm.payDate || "",
      onChange: function onChange(v) {
        return setExtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            payDate: v
          });
        });
      },
      type: "date",
      placeholder: ""
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Notatka",
      value: extForm.notes || "",
      onChange: function onChange(v) {
        return setExtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            notes: v
          });
        });
      },
      rows: 2,
      placeholder: "np. pacjent prosi o faktur\u0119..."
    }), /*#__PURE__*/React.createElement(Btn, {
      disabled: !extForm.newEndDate,
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        var due = +extForm.amountDue || 0;
        var paid = Math.min(+extForm.amountPaid || 0, due || Infinity);
        var sid = extForm.editId != null ? "extend-" + r.id + "-" + extForm.editId : "extend-" + r.id + "-" + Date.now();
        if (extForm.editId != null) {
          var _at;
          var oldExt = (r.extensions || []).find(function (e) {
            return (e.id || e._fallbackId) === extForm.editId;
          }) || {};
          var oldPaid = oldExt.amountPaid || 0;
          var isLast = ((_at = (r.extensions || []).at(-1)) === null || _at === void 0 ? void 0 : _at.id) === extForm.editId;
          setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread(_objectSpread({}, x), {}, {
                endDate: isLast ? extForm.newEndDate : x.endDate
              }, isLast ? {
                plannedReturn: null,
                plannedReturnAllDay: undefined,
                plannedReturnTime: undefined,
                plannedReturnUntil: undefined
              } : {}), {}, {
                extensions: (x.extensions || []).map(function (e) {
                  return e.id === extForm.editId ? _objectSpread(_objectSpread({}, e), {}, {
                    newEndDate: extForm.newEndDate,
                    endTime: extForm.endTime || "10:00",
                    amountDue: due,
                    amountPaid: paid,
                    notes: extForm.notes || "",
                    paidDate: paid > 0 ? extForm.payDate || todayLocal() : e.paidDate
                  }) : e;
                })
              }) : x;
            });
          });
          // Sync finansów — wpis dotyczy amountPaid
          var extSid = "extend-" + r.id + "-" + extForm.editId;
          if (oldPaid > 0 && paid > 0) setFinances(function (fs) {
            return fs.map(function (f) {
              return f.sourceId === extSid ? _objectSpread(_objectSpread({}, f), {}, {
                amount: paid,
                description: "Przedłużenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ")"
              }) : f;
            });
          });else if (oldPaid > 0 && paid === 0) setFinances(function (fs) {
            return fs.filter(function (f) {
              return f.sourceId !== extSid;
            });
          });else if (oldPaid === 0 && paid > 0) setFinances(function (fs) {
            return [{
              id: Date.now(),
              sourceId: extSid,
              date: extForm.payDate || todayLocal(),
              type: "przychód",
              category: "Wypożyczalnia",
              amount: paid,
              description: "Przedłużenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ")"
            }].concat(_toConsumableArray(fs || []));
          });
          setToast("Przedłużenie zaktualizowane");
        } else {
          var extId = Date.now();
          var ext = {
            id: extId,
            prevEndDate: r.endDate,
            newEndDate: extForm.newEndDate,
            endTime: extForm.endTime || "10:00",
            amountDue: due,
            amountPaid: paid,
            notes: extForm.notes || "",
            date: todayLocal(),
            paidDate: paid > 0 ? extForm.payDate || todayLocal() : null
          };
          setRentals(function (rs) {
            return rs.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                endDate: extForm.newEndDate,
                extensions: [].concat(_toConsumableArray(x.extensions || []), [ext]),
                plannedReturn: null,
                plannedReturnAllDay: undefined,
                plannedReturnTime: undefined,
                plannedReturnUntil: undefined
              }) : x;
            });
          });
          if (paid > 0) {
            setFinances(function (fs) {
              return [{
                id: Date.now() + 1,
                sourceId: "extend-" + r.id + "-" + extId,
                date: extForm.payDate || todayLocal(),
                type: "przychód",
                category: "Wypożyczalnia",
                amount: paid,
                description: "Przedłużenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ")"
              }].concat(_toConsumableArray(fs || []));
            });
          }
          setToast("Przedłużono do " + extForm.newEndDate);
        }
        setShowExtend(false);
      }
    }, "Zatwierd\u017A")), confirmDel && /*#__PURE__*/React.createElement(Modal, {
      title: "Usu\u0144 wypo\u017Cyczenie",
      onClose: function onClose() {
        return setConfirmDel(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        marginBottom: 20
      }
    }, "Na pewno usun\u0105\u0107 to wypo\u017Cyczenie?"), /*#__PURE__*/React.createElement("div", {
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
        var cur = rentals.find(function (x) {
          return x.id === effectiveDetail;
        });
        if (cur) {
          var pids = new Set((cur.payments || []).map(function (p) {
            return "payment-" + p.id;
          }));
          var cids = new Set((cur.cycles || []).map(function (c) {
            return "cycle-" + cur.id + "-" + (c.dueDate || c.month);
          }));
          setFinances(function (fs) {
            return fs.filter(function (f) {
              return !pids.has(f.sourceId) && !cids.has(f.sourceId) && f.sourceId !== "transport-" + cur.id && !(f.sourceId && f.sourceId.startsWith("extend-" + cur.id + "-"));
            });
          });
        }
        setRentals(function (rs) {
          return rs.filter(function (x) {
            return x.id !== effectiveDetail;
          });
        });
        setConfirmDel(false);
        close();
      }
    }, "Usu\u0144"))), contactSyncPending && /*#__PURE__*/React.createElement(ContactSyncModal, {
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
    }), showAddCycle && /*#__PURE__*/React.createElement(Modal, {
      title: "Dodaj okres",
      onClose: function onClose() {
        return setShowAddCycle(false);
      }
    }, /*#__PURE__*/React.createElement(Inp, {
      label: "Data okresu",
      value: addCycleForm.date,
      onChange: function onChange(v) {
        return setAddCycleForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            date: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Kwota (z\u0142)",
      value: addCycleForm.amount,
      onChange: function onChange(v) {
        return setAddCycleForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            amount: v
          });
        });
      },
      type: "number"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setAddCycleForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            paid: !f.paid,
            payDate: f.payDate || todayLocal()
          });
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 6,
        border: "2px solid ".concat(addCycleForm.paid ? "#3DAA72" : "#D9E2F0"),
        background: addCycleForm.paid ? "#3DAA72" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, addCycleForm.paid && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 13
      }
    }, "\u2713")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 500
      }
    }, "Ju\u017C op\u0142acone")), addCycleForm.paid && /*#__PURE__*/React.createElement(Inp, {
      label: "Data wp\u0142aty",
      value: addCycleForm.payDate || todayLocal(),
      onChange: function onChange(v) {
        return setAddCycleForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            payDate: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Notatka (opcjonalnie)",
      value: addCycleForm.note || "",
      onChange: function onChange(v) {
        return setAddCycleForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            note: v
          });
        });
      },
      rows: 2
    }), /*#__PURE__*/React.createElement(Btn, {
      disabled: !addCycleForm.date,
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        var d = addCycleForm.date;
        if (!d) return;
        var conflict = (r.cycles || []).some(function (c) {
          return !c.cancelled && (c.dueDate ? c.dueDate === d : c.month === d.slice(0, 7));
        });
        if (conflict) {
          alert("Okres z tą datą już istnieje w tym wypożyczeniu. Edytuj istniejący zamiast dodawać nowy.");
          return;
        }
        var amount = +addCycleForm.amount || 0;
        var label = new Date(d + "T12:00:00").toLocaleDateString("pl-PL", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        var nc = {
          dueDate: d,
          month: d.slice(0, 7),
          amount: amount,
          paid: !!addCycleForm.paid,
          paidDate: addCycleForm.paid ? addCycleForm.payDate || todayLocal() : null,
          note: addCycleForm.note || ""
        };
        setRentals(function (rs) {
          return rs.map(function (x) {
            return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
              cycles: [].concat(_toConsumableArray(x.cycles || []), [nc])
            }) : x;
          });
        });
        if (addCycleForm.paid && amount > 0) {
          setFinances(function (fs) {
            return [{
              id: Date.now() + Math.random(),
              sourceId: "cycle-" + r.id + "-" + d,
              date: addCycleForm.payDate || todayLocal(),
              type: "przychód",
              category: "Wypożyczalnia",
              amount: amount,
              description: "Wypożyczenie – " + r.patientName + " (" + (r.equipment || "Do ustalenia") + ") " + label
            }].concat(_toConsumableArray(fs));
          });
        }
        setShowAddCycle(false);
        setAddCycleForm({
          date: "",
          amount: "",
          paid: false,
          payDate: "",
          note: ""
        });
        setToast("Okres dodany");
      }
    }, "Zapisz okres")));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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
  }, "Wypo\u017Cyczalnia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6"
    }
  }, cnt.aktywne + cnt.odnawialne + cnt.oczekujace, " aktywnych")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setCsvRows([]);
      setCsvError("");
      setShowImport(true);
    },
    style: {
      height: 34,
      padding: "0 12px",
      borderRadius: 20,
      border: "1.5px solid #3E6FB0",
      background: "transparent",
      color: "#3E6FB0",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      whiteSpace: "nowrap"
    }
  }, "\uD83D\uDCE5 Import"), /*#__PURE__*/React.createElement(Btn, {
    small: true,
    onClick: function onClick() {
      setForm(emptyRental());
      setShowAdd(true);
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    d: I.plus,
    s: 16,
    c: "#fff"
  }), " Nowe"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 20px 16px"
    }
  }, [{
    k: "aktywne",
    l: "Szyny CPM (".concat(cnt.aktywne, ")")
  }, {
    k: "odnawialne",
    l: "\uD83D\uDD04 Odn. (".concat(cnt.odnawialne, ")")
  }, {
    k: "oczekujace",
    l: "\uD83D\uDCCB Oczek. (".concat(cnt.oczekujace, ")")
  }, {
    k: "zakończone",
    l: "Zako\u0144czone (".concat(cnt.zakończone, ")")
  }].map(function (x) {
    return /*#__PURE__*/React.createElement("button", {
      key: x.k,
      onClick: function onClick() {
        return setView(x.k);
      },
      style: {
        flex: 1,
        padding: "8px 6px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 12,
        whiteSpace: "nowrap",
        background: view === x.k ? "#3E6FB0" : dk ? "#1E2F4A" : "#D9E2F0",
        color: view === x.k ? "#fff" : dk ? "#6B84AC" : "#3E5578",
        fontFamily: "inherit",
        textAlign: "center"
      }
    }, x.l);
  })), view === "zakończone" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 20px 12px"
    }
  }, [{
    k: "wszystkie",
    l: "Wszystkie (".concat(cnt.zakończone, ")")
  }, {
    k: "okresowe",
    l: "Okresowe (".concat(cntZakOkres, ")")
  }, {
    k: "cykliczne",
    l: "\uD83D\uDD04 Cykl. (".concat(cntZakCykl, ")")
  }].map(function (x) {
    return /*#__PURE__*/React.createElement("button", {
      key: x.k,
      onClick: function onClick() {
        return setZakSubView(x.k);
      },
      style: {
        flex: 1,
        padding: "6px 4px",
        borderRadius: 16,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 11,
        whiteSpace: "nowrap",
        background: zakSubView === x.k ? "#5A7A9A" : dk ? "#18202F" : "#EAF0F5",
        color: zakSubView === x.k ? "#fff" : dk ? "#6B84AC" : "#3E5578",
        fontFamily: "inherit",
        textAlign: "center"
      }
    }, x.l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, filt.length === 0 ? /*#__PURE__*/React.createElement(Empty, {
    text: "Brak wypo\u017Cycze\u0144 w tej kategorii"
  }) : filt.map(function (r) {
    return /*#__PURE__*/React.createElement(RCard, {
      key: r.id,
      r: r,
      onClick: function onClick() {
        return setDetail(r.id);
      }
    });
  })), showAdd && /*#__PURE__*/React.createElement(Modal, {
    title: "Nowe wypo\u017Cyczenie",
    onClose: function onClose() {
      return setShowAdd(false);
    }
  }, /*#__PURE__*/React.createElement(EquipmentPicker, {
    label: "Sprz\u0119t",
    value: form.equipment,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          equipment: v,
          machineId: whDefaultCardId(machines, rentals, stock, v, null)
        });
      });
    },
    options: [{
      value: "",
      label: "❓ Do ustalenia"
    }].concat(_toConsumableArray(activeEq.map(function (x) {
      return {
        value: x,
        label: x,
        sub: eqSub(x)
      };
    })))
  }), /*#__PURE__*/React.createElement(CardPicker, {
    eq: form.equipment,
    value: form.machineId,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          machineId: v
        });
      });
    },
    stock: stock,
    rentals: rentals,
    excludeId: null
  }), /*#__PURE__*/React.createElement(EqIssueHint, {
    eq: form.equipment,
    machineId: form.machineId,
    stock: stock
  }), /*#__PURE__*/React.createElement(PatientPicker, {
    label: "Pacjent *",
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
          phone: p.phone,
          address: p.address,
          patientId: p.id
        });
      });
    },
    patients: allClients || patients
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
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Adres",
    value: form.address,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          address: v
        });
      });
    }
  }), cpmApplies(form.equipment) && function () {
    var pt = (patients || []).find(function (p) {
      return p.id === form.patientId;
    }) || (patients || []).find(function (p) {
      return p.name === form.patientName;
    });
    return /*#__PURE__*/React.createElement(CpmFields, {
      value: form.cpm,
      onChange: function onChange(c) {
        return setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            cpm: c
          });
        });
      },
      autoBrand: cpmBrandOf(form.equipment),
      entries: cpmEntries(pt, rentals)
    });
  }(), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Typ"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [{
    v: false,
    l: "Jednorazowe"
  }, {
    v: true,
    l: "🔄 Odnawialne miesięcznie"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.v),
      onClick: function onClick() {
        return setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            renewable: o.v,
            endDate: o.v ? "" : f.endDate
          });
        });
      },
      style: {
        flex: 1,
        padding: "10px 8px",
        borderRadius: 12,
        border: "2px solid ".concat(form.renewable === o.v ? "#3E6FB0" : "#D9E2F0"),
        background: form.renewable === o.v ? "#E1E9F5" : "#fff",
        color: form.renewable === o.v ? "#3E6FB0" : "#7A8FA6",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  }))), /*#__PURE__*/React.createElement(Inp, {
    label: "Data od",
    value: form.startDate,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          startDate: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6,
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Dow\xF3z"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 10
    }
  }, [{
    v: false,
    l: "⏰ Konkretna godzina"
  }, {
    v: true,
    l: "🗓 Całodniowy"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.v),
      onClick: function onClick() {
        return setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            startAllDay: o.v
          });
        });
      },
      style: {
        flex: 1,
        padding: "8px",
        borderRadius: 10,
        border: "2px solid ".concat((form.startAllDay || false) === o.v ? "#3E6FB0" : "#D9E2F0"),
        background: (form.startAllDay || false) === o.v ? "#E1E9F5" : "#fff",
        color: (form.startAllDay || false) === o.v ? "#3E6FB0" : "#7A8FA6",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  })), !form.startAllDay && /*#__PURE__*/React.createElement(TimeRange, {
    kind: "delivery",
    labelStart: "Dow\xF3z od godziny",
    labelEnd: "do godziny",
    start: form.startTime || "10:00",
    end: form.startUntil,
    onChange: function onChange(t, e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          startTime: t,
          startUntil: e
        });
      });
    }
  }), !form.renewable && /*#__PURE__*/React.createElement(Inp, {
    label: "Data do (opcjonalna)",
    value: form.endDate,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          endDate: v
        });
      });
    },
    type: "date"
  }), !form.renewable && form.endDate && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6,
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Odbi\xF3r"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 10
    }
  }, [{
    v: false,
    l: "⏰ Konkretna godzina"
  }, {
    v: true,
    l: "🗓 Całodniowy"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.v),
      onClick: function onClick() {
        return setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            endAllDay: o.v
          });
        });
      },
      style: {
        flex: 1,
        padding: "8px",
        borderRadius: 10,
        border: "2px solid ".concat((form.endAllDay || false) === o.v ? "#3E6FB0" : "#D9E2F0"),
        background: (form.endAllDay || false) === o.v ? "#E1E9F5" : "#fff",
        color: (form.endAllDay || false) === o.v ? "#3E6FB0" : "#7A8FA6",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  })), !form.endAllDay && /*#__PURE__*/React.createElement(TimeRange, {
    kind: "pickup",
    labelStart: "Odbi\xF3r od godziny",
    labelEnd: "do godziny",
    start: form.endTime || "10:00",
    end: form.endUntil,
    onChange: function onChange(t, e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          endTime: t,
          endUntil: e
        });
      });
    }
  })), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142)",
    value: form.amount,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    },
    type: "number",
    placeholder: "400"
  }), !form.renewable && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "Zap\u0142acono (z\u0142)",
    value: form.amountPaid,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amountPaid: v
        });
      });
    },
    type: "number",
    placeholder: "0"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Pozosta\u0142o"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "11px 14px",
      border: "1.5px solid #D9E2F0",
      borderRadius: 12,
      fontSize: 15,
      background: "#EFF3FA",
      color: +form.amount - (+form.amountPaid || 0) > 0 ? "#E05C5C" : "#3DAA72",
      fontWeight: 700
    }
  }, form.amount ? +form.amount - (+form.amountPaid || 0) + " zł" : "—"))), /*#__PURE__*/React.createElement(Inp, {
    label: "Transport (z\u0142)",
    value: form.transport || "",
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          transport: v
        });
      });
    },
    type: "number",
    placeholder: "0"
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
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Sk\u0105d dowiedzia\u0142 si\u0119 o wypo\u017Cyczeniu?",
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
  }), /*#__PURE__*/React.createElement(Btn, {
    disabled: !form.patientName,
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      if (form.endDate && form.startDate && form.endDate < form.startDate) {
        alert("Data zakończenia jest wcześniejsza niż data rozpoczęcia — popraw datę.");
        return;
      }
      var cpmOn = cpmApplies(form.equipment) && cpmHas(form.cpm);
      var cpmFinal = cpmOn ? cpmPack(form.cpm, form.equipment) : null;
      if (cpmOn && !cpmFinal.brand) {
        alert("Wybierz markę szyny (Artromot lub Kinetec) w ustawieniach szyny albo wyczyść pola udo i podudzie.");
        return;
      }
      var pid = Date.now(),
        rid = Date.now() + 1,
        paid = form.renewable ? 0 : +(form.amountPaid || 0);
      var pat = patients.find(function (p) {
        return p.name === form.patientName;
      });
      var firstCycle = form.renewable ? [{
        dueDate: form.startDate,
        month: form.startDate.slice(0, 7),
        amount: +form.amount || 0,
        paid: false,
        paidDate: null
      }] : [];
      var nr = _objectSpread(_objectSpread({}, form), {}, {
        machineId: whValidMachineId(machines, form.equipment, form.machineId),
        id: rid,
        patientId: (pat === null || pat === void 0 ? void 0 : pat.id) || null,
        amount: +form.amount,
        amountPaid: paid,
        payments: paid > 0 ? [{
          id: pid,
          amount: paid,
          date: form.startDate
        }] : [],
        cycles: firstCycle,
        status: "aktywne",
        startAllDay: form.startAllDay || false,
        endAllDay: form.endAllDay || false,
        allDay: undefined,
        cpm: cpmFinal
      });
      setRentals(function (r) {
        return [nr].concat(_toConsumableArray(r));
      });
      if (paid > 0) setFinances(function (fs) {
        return [{
          id: Date.now() + Math.random(),
          sourceId: "payment-" + pid,
          date: form.startDate,
          type: "przychód",
          category: "Wypożyczalnia",
          amount: paid,
          description: "Wypożyczenie – " + form.patientName + " (" + form.equipment + ")"
        }].concat(_toConsumableArray(fs));
      });
      if (setPatients && !pat) {
        setPatients(function (ps) {
          return [].concat(_toConsumableArray(ps || []), [{
            id: Date.now() + 2,
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
      setShowAdd(false);
      setToast("Wypożyczenie dodane");
    }
  }, "Zapisz wypo\u017Cyczenie")), showImport && /*#__PURE__*/React.createElement(Modal, {
    title: "Import CSV",
    onClose: function onClose() {
      setShowImport(false);
      setCsvRows([]);
      setCsvError("");
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      background: dk ? "#0F2020" : "#F0F9F5",
      borderRadius: 12,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 4
    }
  }, "1. Pobierz szablon Excel/CSV"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#7A8FA6",
      marginBottom: 10
    }
  }, "Otw\xF3rz w Excelu, uzupe\u0142nij, zapisz jako CSV UTF-8"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var h = "Pacjent;Telefon;Adres;Sprzęt;Data od;Data do;Kwota;Zapłacono;Dowóz;Skąd;Notatki";
      var ex1 = "Jan Kowalski;600123456;Ulica 1 Katowice;Artromot K1 2025;09-01-2025;23-01-2025;540;540;0;slawek;przykład";
      var ex2 = "Anna Nowak;601234567;Nowa 5 Sosnowiec;;01-02-2025;14-02-2025;480;480;50;reklama;";
      var ex3 = ";;Sprzęt: Artromot K1 2025 / Artromot K1 I / Kinetec Spectra / Kinetec Spectra SZ / Optiflex;;;;;;Skąd: slawek / reklama / szpital / organicznie;;";
      var blob = new Blob(["﻿" + h + "\n" + ex1 + "\n" + ex2 + "\n" + ex3], {
        type: "text/csv;charset=utf-8"
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "szablon_wypozyczenia.csv";
      a.click();
      URL.revokeObjectURL(url);
    },
    style: {
      width: "100%",
      padding: "10px",
      borderRadius: 10,
      border: "none",
      background: "#3E6FB0",
      color: "#fff",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\uD83D\uDCE5 Pobierz szablon")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      background: dk ? "#0F2020" : "#F0F9F5",
      borderRadius: 12,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 4
    }
  }, "2. Wgraj wype\u0142niony plik"), /*#__PURE__*/React.createElement("input", {
    ref: importRef,
    type: "file",
    accept: ".csv,.xlsx,.xls,text/csv",
    style: {
      display: "none"
    },
    onChange: function onChange(e) {
      var _e$target$files;
      var f = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
      if (!f) return;
      var toYMD = function toYMD(v) {
        if (!v && v !== 0) return "";
        if (typeof v === "number") {
          var d = new Date(Math.round((v - 25569) * 86400 * 1000));
          return d.toISOString().slice(0, 10);
        }
        var s = String(v).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
        var dm = s.match(/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{4})$/);
        if (dm) return "".concat(dm[3], "-").concat(dm[2].padStart(2, "0"), "-").concat(dm[1].padStart(2, "0"));
        return s;
      };
      var processRows = function processRows(rawRows) {
        try {
          if (rawRows.length < 2) {
            setCsvError("Brak danych poza nagłówkiem");
            setCsvRows([]);
            return;
          }
          var rows = [],
            errs = [];
          var skadMap = {
            "slawek": "slawek",
            "sławek": "slawek",
            "reklama": "reklama",
            "szpital": "szpital",
            "organicznie": "organicznie",
            "organiczne": "organicznie",
            "organic": "organicznie"
          };
          for (var i = 1; i < rawRows.length; i++) {
            var cells = rawRows[i];
            var rowHasData = cells.some(function (c) {
              return String(c || "").trim() !== "";
            });
            if (!rowHasData) continue;
            var adres = String(cells[2] || "").trim();
            var pacjentRaw = String(cells[0] || "").trim();
            var pacjent = pacjentRaw || adres || "(brak danych — wiersz " + (i + 1) + ")";
            if (!pacjentRaw) errs.push("Wiersz " + (i + 1) + ": brak nazwiska — użyto adresu jako tymczasowej nazwy");
            var sprzet = String(cells[3] || "").trim();
            var dataOdRaw = toYMD(cells[4]);
            var dataOd = /^\d{4}-\d{2}-\d{2}$/.test(dataOdRaw) ? dataOdRaw : "";
            var dataDoRaw = toYMD(cells[5]);
            var dataDo = /^\d{4}-\d{2}-\d{2}$/.test(dataDoRaw) ? dataDoRaw : "";
            var skadRaw = String(cells[9] || "").trim().toLowerCase();
            var num = function num(v) {
              if (typeof v === "number") return v;
              var n = parseFloat(String(v || "").replace(/\s/g, "").replace(",", "."));
              return isNaN(n) ? 0 : n;
            };
            rows.push({
              pacjent: pacjent,
              telefon: String(cells[1] || "").trim(),
              adres: adres,
              sprzet: sprzet,
              dataOd: dataOd,
              dataDo: dataDo || dataOd,
              kwota: num(cells[6]),
              zaplacono: num(cells[7]),
              dowoz: num(cells[8]),
              skad: skadMap[skadRaw] || "",
              notatki: String(cells[10] || "").trim()
            });
          }
          setCsvRows(rows);
          setCsvError(errs.length ? "⚠️ " + errs.join("\n") : "");
          if (importRef.current) importRef.current.value = "";
        } catch (ex) {
          setCsvError("Błąd przetwarzania: " + ex.message);
          setCsvRows([]);
        }
      };
      var isExcel = f.name.match(/\.(xlsx|xls)$/i);
      if (isExcel) {
        var reader = new FileReader();
        reader.onload = function (ev) {
          try {
            var wb = window.XLSX.read(new Uint8Array(ev.target.result), {
              type: "array",
              cellDates: false
            });
            var bodyRows = [];
            wb.SheetNames.forEach(function (sn) {
              var sheetRows = window.XLSX.utils.sheet_to_json(wb.Sheets[sn], {
                header: 1,
                raw: true,
                defval: ""
              });
              if (sheetRows.length > 1) bodyRows = bodyRows.concat(sheetRows.slice(1)); // pomija nagłówek KAŻDEJ zakładki
            });
            processRows([[]].concat(_toConsumableArray(bodyRows))); // sztuczny nagłówek na pozycji 0, dane już bez nagłówków arkuszy
          } catch (ex) {
            setCsvError("Błąd odczytu Excela: " + ex.message);
            setCsvRows([]);
          }
        };
        reader.readAsArrayBuffer(f);
      } else {
        var _reader = new FileReader();
        _reader.onload = function (ev) {
          var text = ev.target.result;
          var lines = text.trim().split(/\r?\n/).filter(function (l) {
            return l.trim();
          });
          if (lines.length < 2) {
            setCsvError("Plik jest pusty lub brak danych");
            setCsvRows([]);
            return;
          }
          var sep = lines[0].includes(";") ? ";" : ",";
          var rawRows = lines.map(function (ln) {
            var cells = [];
            var cur = "",
              inQ = false;
            for (var c = 0; c < ln.length; c++) {
              if (ln[c] === '"') {
                inQ = !inQ;
              } else if (ln[c] === sep && !inQ) {
                cells.push(cur.trim().replace(/^"|"$/g, ""));
                cur = "";
              } else cur += ln[c];
            }
            cells.push(cur.trim().replace(/^"|"$/g, ""));
            return cells;
          });
          processRows(rawRows);
        };
        _reader.readAsText(f, "UTF-8");
      }
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return importRef.current && importRef.current.click();
    },
    style: {
      width: "100%",
      padding: "10px",
      borderRadius: 10,
      border: "2px dashed #3E6FB0",
      background: "transparent",
      color: "#3E6FB0",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\uD83D\uDCC2 Wybierz plik Excel (.xlsx) lub CSV")), csvError && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12,
      background: "#FFF0F0",
      borderRadius: 10,
      padding: "10px 12px",
      fontSize: 12,
      color: "#E05C5C",
      whiteSpace: "pre-wrap"
    }
  }, csvError), csvRows.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 8,
      color: "#3DAA72"
    }
  }, "\u2705 Za\u0142adowano ", csvRows.length, " wierszy:"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 180,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, csvRows.slice(0, 25).map(function (row, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: dk ? "#18202F" : "#F0F9F5",
        borderRadius: 8,
        padding: "7px 10px",
        fontSize: 12,
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, row.pacjent), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#7A8FA6"
      }
    }, row.dataOd, "\u2192", row.dataDo), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#3DAA72",
        fontWeight: 600
      }
    }, row.kwota, " z\u0142"), row.skad && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#7C6AF4",
        fontSize: 11
      }
    }, "(", row.skad, ")"));
  }), csvRows.length > 25 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#7A8FA6",
      textAlign: "center",
      padding: "4px"
    }
  }, "...i ", csvRows.length - 25, " wi\u0119cej"))), /*#__PURE__*/React.createElement(Btn, {
    disabled: csvRows.length === 0,
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      var now = Date.now();
      // ta sama osoba + ten sam start: to samo wypożyczenie tylko gdy ten sam sprzęt (albo któraś strona nie ma sprzętu)
      var findExisting = function findExisting(row) {
        var m = rentals.filter(function (r) {
          return (r.patientName || "") === (row.pacjent || "") && (r.startDate || "") === (row.dataOd || "") && (!r.equipment || !row.sprzet || r.equipment === row.sprzet);
        });
        return m.find(function (r) {
          return r.equipment === row.sprzet;
        }) || m[0];
      };
      var newRentals = [];
      var updatedMap = {};
      var financeUpserts = [];
      var seenInBatch = new Set();
      var dupSkipped = 0;
      csvRows.forEach(function (row, i) {
        var k = (row.pacjent || "") + "|" + (row.dataOd || "") + "|" + (row.sprzet || "");
        if (seenInBatch.has(k)) {
          dupSkipped++;
          return;
        } // ten sam pacjent+data już w tym imporcie — pomija powtórzony wiersz
        seenInBatch.add(k);
        var paid = +row.zaplacono;
        var existing = findExisting(row);
        if (existing) {
          var payId = existing.payments && existing.payments[0] && existing.payments[0].id || now + i * 100 + 1;
          updatedMap[existing.id] = _objectSpread(_objectSpread({}, existing), {}, {
            phone: row.telefon || existing.phone,
            address: row.adres || existing.address,
            equipment: row.sprzet || existing.equipment,
            endDate: row.dataDo || existing.endDate,
            amount: row.kwota ? +row.kwota : existing.amount,
            amountPaid: paid || existing.amountPaid,
            payments: paid > 0 ? [{
              id: payId,
              amount: paid,
              date: row.dataOd
            }] : existing.payments || [],
            transport: row.dowoz ? +row.dowoz : existing.transport,
            source: row.skad || existing.source,
            notes: row.notatki || existing.notes
          });
          if (paid > 0) financeUpserts.push({
            sourceId: "payment-" + payId,
            date: row.dataOd,
            amount: paid,
            description: "Wypożyczenie – " + row.pacjent + " (import)"
          });
        } else {
          var _payId = now + i * 100 + 1;
          newRentals.push({
            id: now + i * 100,
            patientId: null,
            patientName: row.pacjent,
            phone: row.telefon,
            address: row.adres,
            equipment: row.sprzet || "",
            startDate: row.dataOd,
            endDate: row.dataDo,
            amount: +row.kwota,
            amountPaid: paid,
            payments: paid > 0 ? [{
              id: _payId,
              amount: paid,
              date: row.dataOd
            }] : [],
            cycles: [],
            status: "zakończone",
            renewable: false,
            startAllDay: true,
            endAllDay: true,
            transport: +row.dowoz,
            source: row.skad,
            notes: row.notatki
          });
          if (paid > 0) financeUpserts.push({
            sourceId: "payment-" + _payId,
            date: row.dataOd,
            amount: paid,
            description: "Wypożyczenie – " + row.pacjent + " (import)"
          });
        }
      });
      var updatedCount = Object.keys(updatedMap).length;
      setRentals(function (rs) {
        return [].concat(newRentals, _toConsumableArray(rs.map(function (r) {
          return updatedMap[r.id] || r;
        })));
      });
      setFinances(function (fs) {
        var existingSids = new Set(fs.map(function (f) {
          return f.sourceId;
        }));
        var merged = fs.map(function (f) {
          var u = financeUpserts.find(function (x) {
            return x.sourceId === f.sourceId;
          });
          return u ? _objectSpread(_objectSpread({}, f), {}, {
            date: u.date,
            amount: u.amount,
            description: u.description
          }) : f;
        });
        var toAdd = financeUpserts.filter(function (u) {
          return !existingSids.has(u.sourceId);
        }).map(function (u, i) {
          return {
            id: now + 90000 + i,
            sourceId: u.sourceId,
            date: u.date,
            type: "przychód",
            category: "Wypożyczalnia",
            amount: u.amount,
            description: u.description
          };
        });
        return [].concat(_toConsumableArray(toAdd), _toConsumableArray(merged));
      });
      setShowImport(false);
      setCsvRows([]);
      setCsvError("");
      setToast("Zaimportowano " + newRentals.length + (updatedCount > 0 ? ", zaktualizowano " + updatedCount : "") + (dupSkipped > 0 ? ", pominięto " + dupSkipped + " duplikatów" : "") + " ✅");
    }
  }, "Importuj ", csvRows.length > 0 ? csvRows.length + " " : "", "wypo\u017Cycze\u0144 \u2192")), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast,
    onDone: function onDone() {
      return setToast(null);
    }
  }));
}
