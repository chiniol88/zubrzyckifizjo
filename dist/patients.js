// Plik wygenerowany z js/patients.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
// ── PATIENTS ──────────────────────────────────────────────────────────────
function BirthdayInput(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange;
  var dk = useContext(DarkCtx);
  var hasYear = value.length === 10;
  var knowYear = value === "" ? true : hasYear;
  var mmdd = hasYear ? value.slice(5) : value;
  var mm = mmdd ? mmdd.slice(0, 2) : "";
  var dd = mmdd ? mmdd.slice(3) : "";
  var sel = function sel() {
    var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread({
      padding: "9px 12px",
      borderRadius: 10,
      border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none"
    }, extra);
  };
  var months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
  var setMM = function setMM(v) {
    var d = dd || "01";
    knowYear ? onChange(value.slice(0, 5) + v + "-" + d) : onChange(v + "-" + d);
  };
  var setDD = function setDD(v) {
    knowYear ? onChange(value.slice(0, 8) + v) : onChange(mm ? mm + "-" + v : "");
  };
  var setYear = function setYear(v) {
    if (mm && dd) onChange(v + "-" + mm + "-" + dd);
  };
  var toggleKnowYear = function toggleKnowYear(checked) {
    if (checked) {
      onChange(mm && dd ? todayLocal().slice(0, 4) + "-" + mm + "-" + dd : "");
    } else {
      onChange(mm && dd ? mm + "-" + dd : "");
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Data urodzin"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: mm,
    onChange: function onChange(e) {
      return setMM(e.target.value);
    },
    style: _objectSpread(_objectSpread({}, sel()), {}, {
      flex: 2
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Miesi\u0105c"), months.map(function (m, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i,
      value: String(i + 1).padStart(2, "0")
    }, m);
  })), /*#__PURE__*/React.createElement("select", {
    value: dd,
    onChange: function onChange(e) {
      return setDD(e.target.value);
    },
    style: _objectSpread(_objectSpread({}, sel()), {}, {
      flex: 1
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Dzie\u0144"), Array.from({
    length: 31
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i,
      value: String(i + 1).padStart(2, "0")
    }, i + 1);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: knowYear ? 8 : 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: knowYear,
    onChange: function onChange(e) {
      return toggleKnowYear(e.target.checked);
    },
    style: {
      width: 15,
      height: 15,
      cursor: "pointer"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#7A8FA6",
      cursor: "pointer"
    },
    onClick: function onClick() {
      return toggleKnowYear(!knowYear);
    }
  }, "Znam rok urodzenia")), knowYear && /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1900",
    max: new Date().getFullYear(),
    value: hasYear ? value.slice(0, 4) : "",
    onChange: function onChange(e) {
      return setYear(e.target.value);
    },
    placeholder: "Rok (np. 1985)",
    style: _objectSpread(_objectSpread({}, sel()), {}, {
      width: "100%",
      boxSizing: "border-box"
    })
  }));
}

// Ustawienia szyny CPM w karcie pacjenta: ostatnie dla każdej marki + pełna historia (z wypożyczeń i wpisów ręcznych)
function PatientCpmCard(_ref2) {
  var pat = _ref2.pat,
    rentals = _ref2.rentals,
    setPatients = _ref2.setPatients;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    adding = _useState2[0],
    setAdding = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showAll = _useState4[0],
    setShowAll = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    val = _useState6[0],
    setVal = _useState6[1];
  var _useState7 = useState(todayLocal()),
    _useState8 = _slicedToArray(_useState7, 2),
    date = _useState8[0],
    setDate = _useState8[1];
  var entries = cpmEntries(pat, rentals);
  var latest = CPM_BRANDS.map(function (b) {
    return cpmLast(entries, b);
  }).filter(Boolean);
  var save = function save() {
    var packed = cpmPack(val, null);
    if (!packed) {
      alert("Wpisz udo lub podudzie (pełne cm).");
      return;
    }
    if (!packed.brand) {
      alert("Wybierz markę szyny (Artromot lub Kinetec).");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
      alert("Podaj datę pomiaru.");
      return;
    }
    setPatients(function (ps) {
      return ps.map(function (p) {
        return p.id === pat.id ? _objectSpread(_objectSpread({}, p), {}, {
          cpmLog: [].concat(_toConsumableArray(Array.isArray(p.cpmLog) ? p.cpmLog : []), [{
            id: Date.now(),
            date: date,
            brand: packed.brand,
            thigh: packed.thigh,
            shank: packed.shank
          }])
        }) : p;
      });
    });
    setAdding(false);
    setVal({});
    setDate(todayLocal());
  };
  var del = function del(id) {
    if (!window.confirm("Usunąć ten wpis z historii ustawień szyny?")) return;
    setPatients(function (ps) {
      return ps.map(function (p) {
        return p.id === pat.id ? _objectSpread(_objectSpread({}, p), {}, {
          cpmLog: (Array.isArray(p.cpmLog) ? p.cpmLog : []).filter(function (e) {
            return !e || e.id !== id;
          })
        }) : p;
      });
    });
  };
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 10,
      background: dk ? "#18202F" : "#F7F5FF",
      border: "1.5px solid #7C6AF430"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: latest.length || adding ? 8 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#7C6AF4",
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "\uD83E\uDDBF Ustawienia szyny CPM"), !adding && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setAdding(true);
    },
    style: {
      background: "none",
      border: "none",
      color: "#7C6AF4",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      padding: 0
    }
  }, "+ Dodaj")), latest.length === 0 && !adding && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      marginTop: 4
    }
  }, "Brak zapisanych ustawie\u0144"), latest.map(function (e) {
    return /*#__PURE__*/React.createElement("div", {
      key: e.brand,
      style: {
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, e.brand, ": ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, cpmText(e, demo))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, "ostatnio ", cpmDate(e.date), e.src === "wypożyczenie" ? " · przy wypożyczeniu" : " · wpis z karty"));
  }), adding && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(CpmFields, {
    value: val,
    onChange: setVal,
    autoBrand: null,
    entries: entries
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data pomiaru",
    value: date,
    onChange: setDate,
    type: "date"
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
      setAdding(false);
      setVal({});
    }
  }, "Anuluj"))), entries.length > 0 && !adding && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAll(function (v) {
        return !v;
      });
    },
    style: {
      marginTop: 4,
      background: "none",
      border: "none",
      color: "#3E6FB0",
      fontWeight: 600,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      padding: 0
    }
  }, showAll ? "Ukryj historię" : "Historia ustawień (" + entries.length + ")"), showAll && !adding && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, entries.map(function (e) {
    return /*#__PURE__*/React.createElement("div", {
      key: e.key,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "6px 0",
        borderTop: "1px solid #E3DDFB"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, cpmDate(e.date), " \xB7 ", e.brand || "marka nie podana"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13
      }
    }, cpmText(e, demo)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6"
      }
    }, e.src === "wypożyczenie" ? "przy wypożyczeniu" + (e.equipment ? ": " + e.equipment : "") : "wpis z karty")), e.src === "karta" && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(e.id);
      },
      style: {
        background: "none",
        border: "none",
        color: "#E05C5C",
        fontSize: 18,
        cursor: "pointer",
        padding: "0 4px",
        lineHeight: 1
      }
    }, "\xD7"));
  })));
}
function BirthdayCard(_ref3) {
  var birthday = _ref3.birthday,
    dk = _ref3.dk;
  var demo = useDemo();
  var today = todayLocal();
  var mmdd = birthday.length === 5 ? birthday : birthday.slice(5);
  var hasYear = birthday.length === 10;
  var age = hasYear ? +today.slice(0, 4) - +birthday.slice(0, 4) - (mmdd > today.slice(5) ? 1 : 0) : null;
  var thisYearBd = today.slice(0, 4) + "-" + mmdd;
  var bdDate = new Date(thisYearBd + "T12:00:00");
  var todayDate = new Date(today + "T12:00:00");
  if (bdDate < todayDate) bdDate.setFullYear(bdDate.getFullYear() + 1);
  var daysTo = Math.round((bdDate - todayDate) / 86400000);
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 10,
      background: "#FFF5F0",
      border: "1.5px solid #F4A26130"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "#F4A261",
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 4
    }
  }, "Urodziny"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: dk ? "#E0F0F0" : "#1A2E35"
    }
  }, maskText(demo, hasYear ? new Date(birthday + "T12:00:00").toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) + " · " + age + " lat" : new Date(today.slice(0, 4) + "-" + mmdd + "T12:00:00").toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long"
  }))), daysTo <= 7 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#F4A261",
      fontWeight: 700,
      marginTop: 4
    }
  }, daysTo === 0 ? "🎂 Dzisiaj!" : daysTo === 1 ? "🎂 Jutro!" : "🎂 Za " + daysTo + " dni"));
}
function getPhones(pat) {
  if (pat.phones && pat.phones.length) return pat.phones;
  return pat.phone ? [{
    id: "legacy",
    number: pat.phone,
    label: ""
  }] : [];
}

// Adresy e-mail pacjenta: wiele, z opisem (np. "żona", "córka"), jak telefony. Łagodne ostrzeżenie o literówce, zapis nie jest blokowany.
function EmailsEditor(_ref4) {
  var emails = _ref4.emails,
    _onChange = _ref4.onChange;
  var dk = useContext(DarkCtx);
  var list = emails || [];
  var inputStyle = {
    padding: "11px 14px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 15,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "E-maile"), list.map(function (em) {
    return /*#__PURE__*/React.createElement("div", {
      key: em.id,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "email",
      inputMode: "email",
      autoCapitalize: "none",
      autoCorrect: "off",
      spellCheck: false,
      value: em.address,
      onChange: function onChange(e) {
        return _onChange(list.map(function (x) {
          return x.id === em.id ? _objectSpread(_objectSpread({}, x), {}, {
            address: e.target.value
          }) : x;
        }));
      },
      placeholder: "jan@example.com",
      style: _objectSpread(_objectSpread({}, inputStyle), {}, {
        flex: 1.3,
        minWidth: 0,
        borderColor: emailOk(em.address) ? dk ? "#2A3A56" : "#D9E2F0" : "#D9822B"
      })
    }), /*#__PURE__*/React.createElement("input", {
      value: em.label || "",
      onChange: function onChange(e) {
        return _onChange(list.map(function (x) {
          return x.id === em.id ? _objectSpread(_objectSpread({}, x), {}, {
            label: e.target.value
          }) : x;
        }));
      },
      placeholder: "np. \u017Cona, c\xF3rka...",
      style: _objectSpread(_objectSpread({}, inputStyle), {}, {
        flex: 1,
        minWidth: 0
      })
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return _onChange(list.filter(function (x) {
          return x.id !== em.id;
        }));
      },
      style: {
        flexShrink: 0,
        background: "none",
        border: "none",
        color: "#E05C5C",
        fontSize: 22,
        cursor: "pointer",
        padding: "0 4px",
        lineHeight: 1,
        fontFamily: "inherit"
      }
    }, "\xD7")), !emailOk(em.address) && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#D9822B",
        marginTop: 3
      }
    }, "To nie wygl\u0105da na adres e-mail. Sprawd\u017A, czy nie ma liter\xF3wki."));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return _onChange([].concat(_toConsumableArray(list), [{
        id: Date.now() + Math.random(),
        address: "",
        label: ""
      }]));
    },
    style: {
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
  }, "+ Dodaj e-mail"));
}
function PhonesEditor(_ref5) {
  var phones = _ref5.phones,
    _onChange2 = _ref5.onChange;
  var dk = useContext(DarkCtx);
  var list = phones || [];
  var inputStyle = {
    padding: "11px 14px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 15,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Telefony"), list.map(function (ph) {
    return /*#__PURE__*/React.createElement("div", {
      key: ph.id,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "tel",
      value: ph.number,
      onChange: function onChange(e) {
        return _onChange2(list.map(function (x) {
          return x.id === ph.id ? _objectSpread(_objectSpread({}, x), {}, {
            number: e.target.value
          }) : x;
        }));
      },
      placeholder: "600 000 000",
      style: _objectSpread(_objectSpread({}, inputStyle), {}, {
        flex: 1.3
      })
    }), /*#__PURE__*/React.createElement("input", {
      value: ph.label,
      onChange: function onChange(e) {
        return _onChange2(list.map(function (x) {
          return x.id === ph.id ? _objectSpread(_objectSpread({}, x), {}, {
            label: e.target.value
          }) : x;
        }));
      },
      placeholder: "np. \u017Cona, syn, praca...",
      style: _objectSpread(_objectSpread({}, inputStyle), {}, {
        flex: 1
      })
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return _onChange2(list.filter(function (x) {
          return x.id !== ph.id;
        }));
      },
      style: {
        flexShrink: 0,
        background: "none",
        border: "none",
        color: "#E05C5C",
        fontSize: 22,
        cursor: "pointer",
        padding: "0 4px",
        lineHeight: 1,
        fontFamily: "inherit"
      }
    }, "\xD7"));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return _onChange2([].concat(_toConsumableArray(list), [{
        id: Date.now() + Math.random(),
        number: "",
        label: ""
      }]));
    },
    style: {
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
  }, "+ Dodaj numer"));
}
function Patients(_ref6) {
  var patients = _ref6.patients,
    setPatients = _ref6.setPatients,
    visits = _ref6.visits,
    setVisits = _ref6.setVisits,
    finances = _ref6.finances,
    setFinances = _ref6.setFinances,
    rentals = _ref6.rentals,
    setRentals = _ref6.setRentals,
    nfzCases = _ref6.nfzCases,
    setNfzCases = _ref6.setNfzCases,
    allClients = _ref6.allClients,
    priv = _ref6.priv;
  var demo = useDemo();
  var durs = useContext(DurCtx);
  var knownCities = useMemo(function () {
    return cityCollect(patients, rentals);
  }, [patients, rentals]);
  var dk = useContext(DarkCtx);
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    selId = _useState0[0],
    setSelId = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showAdd = _useState10[0],
    setShowAdd = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showEdit = _useState12[0],
    setShowEdit = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    confirmDelPat = _useState14[0],
    setConfirmDelPat = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    editForm = _useState16[0],
    setEditForm = _useState16[1];
  var _useState17 = useState({
      name: "",
      phone: "",
      phones: [],
      emails: [],
      email: "",
      address: "",
      diagnosis: "",
      notes: "",
      defaultPrice: "",
      birthday: ""
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    newForm = _useState18[0],
    setNewForm = _useState18[1];
  var _useState19 = useState(false),
    _useState20 = _slicedToArray(_useState19, 2),
    showAddV = _useState20[0],
    setShowAddV = _useState20[1];
  var _useState21 = useState(emptyVisit),
    _useState22 = _slicedToArray(_useState21, 2),
    vf = _useState22[0],
    setVf = _useState22[1];
  var _useState23 = useState(null),
    _useState24 = _slicedToArray(_useState23, 2),
    editV = _useState24[0],
    setEditV = _useState24[1];
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    confirmDelV = _useState26[0],
    setConfirmDelV = _useState26[1];
  var _useState27 = useState(""),
    _useState28 = _slicedToArray(_useState27, 2),
    search = _useState28[0],
    setSearch = _useState28[1];
  var _useState29 = useState("alpha"),
    _useState30 = _slicedToArray(_useState29, 2),
    sort = _useState30[0],
    setSort = _useState30[1];
  var _useState31 = useState("all"),
    _useState32 = _slicedToArray(_useState31, 2),
    histFilter = _useState32[0],
    setHistFilter = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    showArchived = _useState34[0],
    setShowArchived = _useState34[1];
  var _useState35 = useState("fizjo"),
    _useState36 = _slicedToArray(_useState35, 2),
    pTab = _useState36[0],
    setPTab = _useState36[1];
  var _useState37 = useState(null),
    _useState38 = _slicedToArray(_useState37, 2),
    toast = _useState38[0],
    setToast = _useState38[1];
  // pełny stan zbiorów, w których mogą być dane pacjenta (przekazujemy do privacy.js)
  var privState = function privState() {
    return {
      patients: patients,
      visits: visits,
      rentals: rentals,
      nfzCases: nfzCases,
      finances: finances,
      events: priv && priv.events,
      todos: priv && priv.todos,
      stock: priv && priv.stock,
      machines: priv && priv.machines,
      budget: priv && priv.budget,
      wealth: priv && priv.wealth
    };
  };
  // rekordy należące do pacjenta: po numerze, a po nazwisku tylko gdy rekord nie ma numeru (starsze wpisy)
  var ownerOf = function ownerOf(pid, pn) {
    return privOwner(pid, pn, new Set((patients || []).map(function (x) {
      return x && x.id;
    })));
  };
  // czy wiersz finansów (po sourceId) pochodzi z wizyty/wypożyczenia/wózka tego pacjenta
  var ownSidMatcher = function ownSidMatcher(pid, pn) {
    var mineR = ownerOf(pid, pn);
    var vids = new Set(visits.filter(mineR).map(function (v) {
      return "visit-" + v.id;
    }));
    var pr = rentals.filter(mineR);
    var pids = new Set(pr.flatMap(function (r) {
      return (r.payments || []).map(function (p) {
        return "payment-" + p.id;
      });
    }));
    var cids = new Set(pr.flatMap(function (r) {
      return (r.cycles || []).map(function (c) {
        return "cycle-" + r.id + "-" + (c.dueDate || c.month);
      });
    }));
    var tids = new Set(pr.map(function (r) {
      return "transport-" + r.id;
    }));
    var xp = pr.map(function (r) {
      return "extend-" + r.id + "-";
    });
    var nids = new Set((nfzCases || []).filter(mineR).map(function (c) {
      return "wozek-" + c.id;
    }));
    return function (sid) {
      return !!sid && (vids.has(sid) || pids.has(sid) || cids.has(sid) || tids.has(sid) || nids.has(sid) || xp.some(function (pf) {
        return sid.startsWith(pf);
      }));
    };
  };
  var _useState39 = useState(false),
    _useState40 = _slicedToArray(_useState39, 2),
    showQuickV = _useState40[0],
    setShowQuickV = _useState40[1];
  var _useState41 = useState(null),
    _useState42 = _slicedToArray(_useState41, 2),
    quickV = _useState42[0],
    setQuickV = _useState42[1];
  var _useState43 = useState(null),
    _useState44 = _slicedToArray(_useState43, 2),
    contactSyncPending = _useState44[0],
    setContactSyncPending = _useState44[1];
  var equipClients = useMemo(function () {
    var byName = {};
    (rentals || []).forEach(function (r) {
      if (!r.patientName) return;
      var n = r.patientName;
      if (!byName[n]) byName[n] = {
        name: n,
        phone: "",
        address: "",
        rc: 0,
        wc: 0,
        lastDate: ""
      };
      if (r.phone && !byName[n].phone) byName[n].phone = r.phone;
      if (r.address && !byName[n].address) byName[n].address = r.address;
      byName[n].rc++;
      if ((r.startDate || "") > byName[n].lastDate) byName[n].lastDate = r.startDate || "";
    });
    (nfzCases || []).forEach(function (c) {
      if (!c.patientName) return;
      var n = c.patientName;
      if (!byName[n]) byName[n] = {
        name: n,
        phone: "",
        address: "",
        rc: 0,
        wc: 0,
        lastDate: ""
      };
      if (c.phone && !byName[n].phone) byName[n].phone = c.phone;
      if (c.address && !byName[n].address) byName[n].address = c.address;
      byName[n].wc++;
      if ((c.orderDate || "") > byName[n].lastDate) byName[n].lastDate = c.orderDate || "";
    });
    return Object.values(byName).sort(function (a, b) {
      return a.name.localeCompare(b.name, "pl");
    });
  }, [rentals, nfzCases]);
  var pat = selId ? patients.find(function (p) {
    return p.id === selId;
  }) : null;
  if (selId && !pat) {
    setSelId(null);
    return null;
  }
  var patVisits = pat ? visits.filter(function (v) {
    return v.patientId === pat.id || v.patientName === pat.name && !v.patientId;
  }) : [];
  var patRentals = pat ? rentals.filter(function (r) {
    return r.patientId === pat.id || r.patientName === pat.name;
  }) : [];
  var patWozki = pat ? (nfzCases || []).filter(function (c) {
    return c.patientId === pat.id || c.patientName === pat.name;
  }) : [];
  var history = [].concat(_toConsumableArray(patVisits.map(function (v) {
    return _objectSpread(_objectSpread({}, v), {}, {
      _t: "v",
      _d: v.date || "",
      _time: v.time || "00:00"
    });
  })), _toConsumableArray(patRentals.map(function (r) {
    return _objectSpread(_objectSpread({}, r), {}, {
      _t: "r",
      _d: r.startDate || "",
      _time: "00:00"
    });
  })), _toConsumableArray(patWozki.map(function (c) {
    return _objectSpread(_objectSpread({}, c), {}, {
      _t: "w",
      _d: c.orderDate || "",
      _time: "00:00"
    });
  }))).sort(function (a, b) {
    return (b._d || "").localeCompare(a._d || "") || (b._time || "").localeCompare(a._time || "");
  });
  var patTotalVisits = pat ? patVisits.filter(function (v) {
    return visitStatus(v) === "zakończona";
  }).reduce(function (s, v) {
    return s + (+v.price || 0);
  }, 0) : 0;
  var patTotalRentals = pat ? patRentals.reduce(function (s, r) {
    return s + calcRentalPaid(r);
  }, 0) : 0;
  var patTotalWozki = pat ? patWozki.filter(function (c) {
    return c.realized;
  }).reduce(function (s, c) {
    var fin = (finances || []).find(function (f) {
      return f.sourceId === "wozek-" + c.id;
    });
    return s + (fin ? fin.amount : 0);
  }, 0) : 0;
  var patTotal = patTotalVisits + patTotalRentals + patTotalWozki;
  var patDoneVisits = pat ? patVisits.filter(function (v) {
    return visitStatus(v) === "zakończona";
  }) : [];
  var patAvgPrice = patDoneVisits.length ? Math.round(patDoneVisits.reduce(function (s, v) {
    return s + (+v.price || 0);
  }, 0) / patDoneVisits.length) : 0;
  var patFirstDate = pat ? [].concat(_toConsumableArray(patDoneVisits.map(function (v) {
    return v.date;
  })), _toConsumableArray(patRentals.map(function (r) {
    return r.startDate || "";
  })), _toConsumableArray(patWozki.map(function (c) {
    return c.orderDate || "";
  }))).filter(Boolean).sort()[0] || null : null;
  var patSinceMonths = patFirstDate ? Math.round((new Date(todayLocal()) - new Date(patFirstDate)) / 2592000000) : 0;
  var syncFinance = function syncFinance(v, isNew) {
    if (v.skipFinance) return;
    var done = v.status === "zakończona" || new Date(v.date + "T" + (v.time || "00:00") + ":00") <= new Date();
    if (!done) return;
    var sid = "visit-" + v.id;
    setFinances(function (fs) {
      var ex = fs.some(function (f) {
        return f.sourceId === sid;
      });
      if (isNew && !ex) return [{
        id: Date.now() + Math.random(),
        sourceId: sid,
        date: v.date,
        type: "przychód",
        category: "Wizyta",
        amount: v.price || 0,
        description: "Wizyta – " + v.patientName
      }].concat(_toConsumableArray(fs));
      if (!isNew) return ex ? fs.map(function (f) {
        return f.sourceId === sid ? _objectSpread(_objectSpread({}, f), {}, {
          amount: v.price,
          description: "Wizyta – " + v.patientName,
          date: v.date
        }) : f;
      }) : [{
        id: Date.now() + Math.random(),
        sourceId: sid,
        date: v.date,
        type: "przychód",
        category: "Wizyta",
        amount: v.price || 0,
        description: "Wizyta – " + v.patientName
      }].concat(_toConsumableArray(fs));
      return fs;
    });
  };
  if (pat) {
    var maps = pat.address ? "https://www.google.com/maps/dir/?api=1&destination=".concat(encodeURIComponent(pat.address)) : null;
    var patPhones = getPhones(pat);
    var patEmails = getEmails(pat);
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
    }), " Pacjenci"), /*#__PURE__*/React.createElement("div", {
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
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Av, {
      name: demo ? "Pacjent" : pat.name
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontSize: 20,
        fontWeight: 800
      }
    }, demo ? "Pacjent" : pat.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, maskPhone(demo, pat.phone)))), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      variant: "secondary",
      onClick: function onClick() {
        setEditForm(_objectSpread(_objectSpread({}, pat), {}, {
          phones: getPhones(pat),
          emails: getEmails(pat)
        }));
        setConfirmDelPat(false);
        setShowEdit(true);
      }
    }, "\u270F\uFE0F Edytuj")), /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10
      }
    }, patPhones.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "#7A8FA6",
        marginBottom: pat.address || patEmails.length ? 10 : 0
      }
    }, "Brak telefonu"), patPhones.map(function (ph, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: ph.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: i < patPhones.length - 1 || patEmails.length || pat.address ? 10 : 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#7A8FA6"
        }
      }, maskPhone(demo, ph.number), ph.label && /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#3E6FB0",
          fontWeight: 600
        }
      }, " \xB7 ", maskText(demo, ph.label))), !demo && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("a", {
        href: "tel:".concat(ph.number.replace(/\s/g, "")),
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
        href: "sms:".concat(ph.number.replace(/\s/g, "")),
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
      }), " SMS"))));
    }), patEmails.map(function (em, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: em.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: i < patEmails.length - 1 || pat.address ? 10 : 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: "#7A8FA6",
          flex: 1,
          paddingRight: 8,
          overflowWrap: "anywhere"
        }
      }, "\u2709\uFE0F ", maskEmail(demo, em.address), em.label && /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#3E6FB0",
          fontWeight: 600
        }
      }, " \xB7 ", maskText(demo, em.label))), !demo && /*#__PURE__*/React.createElement("a", {
        href: "mailto:".concat(em.address),
        style: {
          textDecoration: "none",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(Btn, {
        small: true,
        variant: "secondary"
      }, "\u2709\uFE0F Napisz")));
    }), pat.address && /*#__PURE__*/React.createElement("div", {
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
    }, maskAddr(demo, pat.address)), maps && !demo && /*#__PURE__*/React.createElement("a", {
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
    }, "\uD83D\uDDFA\uFE0F Trasa")))), pat.diagnosis && /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10,
        background: "#F0EDFF",
        border: "1.5px solid #7C6AF430"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#7C6AF4",
        textTransform: "uppercase",
        letterSpacing: .5,
        marginBottom: 6
      }
    }, "Diagnoza"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap"
      }
    }, maskText(demo, pat.diagnosis))), pat.notes && /*#__PURE__*/React.createElement(Card, {
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
    }, maskText(demo, pat.notes))), pat.defaultPrice && /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10,
        background: "#F0FFF8",
        border: "1.5px solid #3DAA7230"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#3DAA72",
        textTransform: "uppercase",
        letterSpacing: .5,
        marginBottom: 4
      }
    }, "Domy\u015Blna cena wizyty"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: "#3DAA72"
      }
    }, maskAmt(demo, pat.defaultPrice), " z\u0142")), pat.birthday && /*#__PURE__*/React.createElement(BirthdayCard, {
      birthday: pat.birthday,
      dk: dk
    }), /*#__PURE__*/React.createElement(PatientCpmCard, {
      pat: pat,
      rentals: rentals,
      setPatients: setPatients
    }), (patDoneVisits.length > 0 || patRentals.length > 0 || patWozki.length > 0) && /*#__PURE__*/React.createElement(Card, {
      style: {
        marginBottom: 10,
        background: dk ? "#18202F" : "#F4F7FC",
        border: "1.5px solid #D9E2F0"
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, null, "Statystyki"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8
      }
    }, [patDoneVisits.length > 0 ? {
      l: "Wizyty",
      v: patDoneVisits.length,
      c: "#3E6FB0"
    } : {
      l: "Wypożyczenia",
      v: patRentals.length,
      c: "#7C6AF4"
    }, patDoneVisits.length > 0 ? {
      l: "Śr. cena",
      v: maskAmt(demo, patAvgPrice) + " zł",
      c: "#7C6AF4"
    } : {
      l: "Wózki NFZ",
      v: patWozki.length,
      c: "#F4A261"
    }, {
      l: "Klient od",
      v: patSinceMonths < 1 ? "<1 mies." : patSinceMonths < 12 ? patSinceMonths + " mies." : (patSinceMonths / 12).toFixed(1).replace(".0", "") + " lat",
      c: "#F4A261"
    }].map(function (x, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          background: x.c + "14",
          borderRadius: 12,
          padding: "10px 8px",
          textAlign: "center",
          border: "1.5px solid ".concat(x.c, "30")
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: 15,
          color: x.c
        }
      }, x.v), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#7A8FA6",
          marginTop: 2
        }
      }, x.l));
    }))), patTotal > 0 && /*#__PURE__*/React.createElement(Card, {
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
    }, "\u0141\u0105cznie zap\u0142acono"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, [{
      l: "Wizyty",
      v: patTotalVisits,
      c: "#3E6FB0"
    }, {
      l: "Wypożyczenia",
      v: patTotalRentals,
      c: "#7C6AF4"
    }, {
      l: "Wózki",
      v: patTotalWozki,
      c: "#F4A261"
    }, {
      l: "Razem",
      v: patTotal,
      c: "#1C2B3A"
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
      }, maskAmt(demo, x.v), " z\u0142"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: "#7A8FA6",
          marginTop: 2
        }
      }, x.l));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontSize: 17,
        fontWeight: 700
      }
    }, "Historia (", history.length, ")"), /*#__PURE__*/React.createElement(Btn, {
      small: true,
      onClick: function onClick() {
        setVf(_objectSpread(_objectSpread({}, emptyVisit()), {}, {
          patientName: pat.name,
          patientId: pat.id,
          price: pat.defaultPrice ? String(pat.defaultPrice) : "150"
        }));
        setShowAddV(true);
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      d: I.plus,
      s: 15,
      c: "#fff"
    }), " Wizyta")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 10,
        flexWrap: "wrap"
      }
    }, [{
      k: "all",
      l: "Wszystko"
    }, {
      k: "v",
      l: "Wizyty"
    }, {
      k: "r",
      l: "Wypożyczenia"
    }, {
      k: "w",
      l: "Wózki"
    }].map(function (x) {
      return /*#__PURE__*/React.createElement("button", {
        key: x.k,
        onClick: function onClick() {
          return setHistFilter(x.k);
        },
        style: {
          padding: "6px 12px",
          borderRadius: 16,
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 12,
          background: histFilter === x.k ? "#3E6FB0" : "#D9E2F0",
          color: histFilter === x.k ? "#fff" : "#7A8FA6",
          fontFamily: "inherit"
        }
      }, x.l);
    })), history.filter(function (item) {
      return histFilter === "all" || item._t === histFilter;
    }).length === 0 ? /*#__PURE__*/React.createElement(Empty, {
      text: "Brak wpis\xF3w"
    }) : history.filter(function (item) {
      return histFilter === "all" || item._t === histFilter;
    }).map(function (item) {
      return item._t === "v" ? /*#__PURE__*/React.createElement(Card, {
        key: "v" + item.id,
        onClick: function onClick() {
          return setEditV(_objectSpread(_objectSpread({}, item), {}, {
            price: String(item.price)
          }));
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#3E6FB0",
          textTransform: "uppercase",
          letterSpacing: .5,
          marginBottom: 2
        }
      }, "Wizyta"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600
        }
      }, item.date, " \xB7 ", calRange(durs, "visit", item.time, item.endTime)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#7A8FA6"
        }
      }, item.type)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          marginBottom: 4
        }
      }, maskAmt(demo, item.price), " z\u0142"), /*#__PURE__*/React.createElement(Badge, {
        color: visitStatus(item) === "zakończona" ? "#3DAA72" : "#3E6FB0"
      }, visitStatus(item)))), item.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6",
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid #EFF3FA",
          fontStyle: "italic",
          whiteSpace: "pre-wrap"
        }
      }, "\uD83D\uDCDD ", maskText(demo, item.notes))) : item._t === "r" ? /*#__PURE__*/React.createElement(Card, {
        key: "r" + item.id,
        style: {
          background: "#F0EDFF"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#7C6AF4",
          textTransform: "uppercase",
          letterSpacing: .5,
          marginBottom: 2
        }
      }, "Wypo\u017Cyczenie"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600
        }
      }, item.equipment), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#7A8FA6"
        }
      }, item.startDate, item.endDate ? " → " + item.endDate : "")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          marginBottom: 4
        }
      }, maskAmt(demo, item.amount), " z\u0142"), /*#__PURE__*/React.createElement(Badge, {
        color: item.status === "zakończone" ? "#7A8FA6" : "#7C6AF4"
      }, item.status))), cpmHas(item.cpm) && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7C6AF4",
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid #E3DDFB",
          fontWeight: 600
        }
      }, "\uD83E\uDDBF ", item.cpm.brand || cpmBrandOf(item.equipment) || "Szyna", " \xB7 ", cpmText({
        thigh: cpmInt(item.cpm.thigh),
        shank: cpmInt(item.cpm.shank)
      }, demo))) : /*#__PURE__*/React.createElement(Card, {
        key: "w" + item.id,
        style: {
          background: "#FFF7ED"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "#F4A261",
          textTransform: "uppercase",
          letterSpacing: .5,
          marginBottom: 2
        }
      }, "W\xF3zek NFZ"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600
        }
      }, item.wheelchairModel || "Model nieznany"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: "#7A8FA6"
        }
      }, item.orderDate || "Brak daty", item.hasDisabilityCert ? " · orzeczenie" : "")), /*#__PURE__*/React.createElement(Badge, {
        color: item.realized ? "#3DAA72" : "#F4A261"
      }, item.realized ? "zrealizowany" : "oczekuje")), item.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6",
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid #EFF3FA",
          fontStyle: "italic",
          whiteSpace: "pre-wrap"
        }
      }, "\uD83D\uDCDD ", maskText(demo, item.notes)));
    }))), showEdit && editForm && /*#__PURE__*/React.createElement(Modal, {
      title: "Edytuj pacjenta",
      onClose: function onClose() {
        setShowEdit(false);
        setEditForm(null);
        setConfirmDelPat(false);
      }
    }, /*#__PURE__*/React.createElement(Inp, {
      label: "Imi\u0119 i nazwisko",
      value: editForm.name || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            name: v
          });
        });
      },
      placeholder: "Jan Kowalski"
    }), /*#__PURE__*/React.createElement(PhonesEditor, {
      phones: editForm.phones || [],
      onChange: function onChange(phones) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            phones: phones
          });
        });
      }
    }), /*#__PURE__*/React.createElement(EmailsEditor, {
      emails: editForm.emails || [],
      onChange: function onChange(emails) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            emails: emails
          });
        });
      }
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
    }), /*#__PURE__*/React.createElement(CityInput, {
      value: editForm.city || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            city: v
          });
        });
      },
      address: editForm.address,
      extra: knownCities
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Diagnoza",
      value: editForm.diagnosis || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            diagnosis: v
          });
        });
      },
      rows: 2
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
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Domy\u015Blna cena wizyty (z\u0142)",
      value: editForm.defaultPrice || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            defaultPrice: v
          });
        });
      },
      type: "number",
      placeholder: "np. 150"
    }), /*#__PURE__*/React.createElement(BirthdayInput, {
      value: editForm.birthday || "",
      onChange: function onChange(v) {
        return setEditForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            birthday: v
          });
        });
      }
    }), !confirmDelPat ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 8
      },
      onClick: function onClick() {
        var _phones$;
        var _pid = editForm.id;
        var orig = patients.find(function (p) {
          return p.id === _pid;
        });
        var _old = (orig === null || orig === void 0 ? void 0 : orig.name) || editForm.name;
        var _new = editForm.name || _old;
        var _phones = (editForm.phones || []).filter(function (ph) {
          return ph.number.trim();
        });
        var _phone = ((_phones$ = _phones[0]) === null || _phones$ === void 0 ? void 0 : _phones$.number) || "";
        var _emails = (editForm.emails || []).map(function (e) {
          return _objectSpread(_objectSpread({}, e), {}, {
            address: String(e.address || "").trim(),
            label: String(e.label || "").trim()
          });
        }).filter(function (e) {
          return e.address;
        });
        setPatients(function (ps) {
          return ps.map(function (p) {
            var _emails$;
            return p.id === _pid ? _objectSpread(_objectSpread(_objectSpread({}, p), editForm), {}, {
              phones: _phones,
              phone: _phone,
              emails: _emails,
              email: ((_emails$ = _emails[0]) === null || _emails$ === void 0 ? void 0 : _emails$.address) || ""
            }) : p;
          });
        });
        if (_new !== _old) {
          setVisits(function (vs) {
            return vs.map(function (v) {
              return v.patientId === _pid ? _objectSpread(_objectSpread({}, v), {}, {
                patientName: _new
              }) : v;
            });
          });
          var _mineSid = ownSidMatcher(_pid, _old);
          setFinances(function (fs) {
            return fs.map(function (f) {
              return f.description && _old && _mineSid(f.sourceId) ? _objectSpread(_objectSpread({}, f), {}, {
                description: f.description.split(_old).join(_new)
              }) : f;
            });
          });
        }
        // dowiąż patientId + zaktualizuj nazwę wszędzie, gdzie ta osoba jest rozpoznana (po ID lub starej nazwie)
        setRentals(function (rs) {
          return rs.map(function (r) {
            return r.patientId === _pid || r.patientName === _old ? _objectSpread(_objectSpread({}, r), {}, {
              patientName: _new,
              patientId: _pid
            }) : r;
          });
        });
        if (setNfzCases) setNfzCases(function (cs) {
          return (cs || []).map(function (c) {
            return c.patientId === _pid || c.patientName === _old ? _objectSpread(_objectSpread({}, c), {}, {
              patientName: _new,
              patientId: _pid
            }) : c;
          });
        });
        var pending = syncContactOnSave({
          kind: "patient",
          id: _pid,
          patientId: _pid,
          patientName: _new,
          original: {
            phone: (orig === null || orig === void 0 ? void 0 : orig.phone) || "",
            address: (orig === null || orig === void 0 ? void 0 : orig.address) || ""
          },
          updated: {
            phone: _phone,
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
        setShowEdit(false);
        setEditForm(null);
        setToast("Zapisano zmiany");
      }
    }, "Zapisz zmiany"), /*#__PURE__*/React.createElement(Btn, {
      variant: "secondary",
      style: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 8
      },
      onClick: function onClick() {
        setPatients(function (ps) {
          return ps.map(function (p) {
            return p.id === editForm.id ? _objectSpread(_objectSpread({}, p), {}, {
              archived: !p.archived
            }) : p;
          });
        });
        setShowEdit(false);
        setEditForm(null);
        setSelId(null);
        setToast(editForm.archived ? "Pacjent przywrócony" : "Pacjent zarchiwizowany");
      }
    }, "\uD83D\uDCE6 ", editForm.archived ? "Przywróć pacjenta" : "Archiwizuj pacjenta"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        return setConfirmDelPat(true);
      }
    }, "\uD83D\uDDD1\uFE0F Usu\u0144 dane osobowe pacjenta")) : /*#__PURE__*/React.createElement(React.Fragment, null, function () {
      var rep = privAnonymize(privState(), editForm.id);
      var where = rep ? privDescribe(rep.stats) : "";
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: "#FEE2E2",
          borderRadius: 12,
          padding: 14,
          marginBottom: 12,
          fontSize: 14,
          color: "#E05C5C",
          textAlign: "center",
          fontWeight: 600
        }
      }, "Usun\u0105\u0107 dane osobowe pacjenta? Imi\u0119, telefon, adres, diagnoza i notatki znikn\u0105 bezpowrotnie. Daty i kwoty zostaj\u0105, wi\u0119c raporty finansowe si\u0119 nie zmieni\u0105.", where && /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 500,
          fontSize: 13,
          marginTop: 8
        }
      }, "Dane pacjenta s\u0105 te\u017C w wolnym tek\u015Bcie (", where, ") i tam r\xF3wnie\u017C zostan\u0105 usuni\u0119te."));
    }(), /*#__PURE__*/React.createElement("div", {
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
        return setConfirmDelPat(false);
      }
    }, "Anuluj"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      style: {
        flex: 1,
        justifyContent: "center"
      },
      onClick: function onClick() {
        // Anonimizacja zamiast kasowania: jedno miejsce (privacy.js) czyści własne rekordy i wolny tekst we wszystkich zbiorach
        var res = privAnonymize(privState(), editForm.id);
        if (!res) return;
        var n = res.next;
        if (n.visits !== visits) setVisits(n.visits);
        if (n.rentals !== rentals) setRentals(n.rentals);
        if (n.finances !== finances) setFinances(n.finances);
        if (setNfzCases && n.nfzCases !== nfzCases) setNfzCases(n.nfzCases);
        if (n.patients !== patients) setPatients(n.patients);
        if (priv) {
          if (priv.setEvents && n.events !== priv.events) priv.setEvents(n.events);
          if (priv.setTodos && n.todos !== priv.todos) priv.setTodos(n.todos);
          if (priv.setStock && n.stock !== priv.stock) priv.setStock(n.stock);
          if (priv.setMachines && n.machines !== priv.machines) priv.setMachines(n.machines);
          if (priv.setBudget && n.budget !== priv.budget) priv.setBudget(n.budget);
          if (priv.setWealth && n.wealth !== priv.wealth) priv.setWealth(n.wealth);
        }
        setShowEdit(false);
        setEditForm(null);
        setSelId(null);
        setToast("Dane osobowe pacjenta usunięte");
      }
    }, "Tak, usu\u0144 dane osobowe")))), showAddV && /*#__PURE__*/React.createElement(Modal, {
      title: "Nowa wizyta",
      onClose: function onClose() {
        return setShowAddV(false);
      }
    }, /*#__PURE__*/React.createElement(Inp, {
      label: "Data",
      value: vf.date,
      onChange: function onChange(v) {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            date: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement(TimeRange, {
      kind: "visit",
      start: vf.time,
      end: vf.endTime,
      onChange: function onChange(t, e) {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            time: t,
            endTime: e
          });
        });
      }
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Typ",
      value: vf.type,
      onChange: function onChange(v) {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            type: v
          });
        });
      },
      options: VISIT_TYPES.map(function (x) {
        return {
          value: x,
          label: x
        };
      })
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Cena (z\u0142)",
      value: vf.price,
      onChange: function onChange(v) {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            price: v
          });
        });
      },
      type: "number"
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Status",
      value: vf.status,
      onChange: function onChange(v) {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            status: v
          });
        });
      },
      options: [{
        value: "zaplanowana",
        label: "📅 Zaplanowana"
      }, {
        value: "zakończona",
        label: "✅ Zakończona"
      }]
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Notatka",
      value: vf.notes || "",
      onChange: function onChange(v) {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            notes: v
          });
        });
      },
      rows: 2,
      placeholder: "Przebieg wizyty, zalecenia..."
    }), /*#__PURE__*/React.createElement(Btn, {
      onClick: function onClick() {
        var nv = _objectSpread(_objectSpread({
          id: Date.now(),
          patientId: pat.id,
          patientName: pat.name
        }, vf), {}, {
          price: +vf.price
        });
        setVisits(function (vs) {
          return [].concat(_toConsumableArray(vs), [nv]);
        });
        syncFinance(nv, true);
        setShowAddV(false);
        setToast("Wizyta dodana");
      },
      style: {
        width: "100%",
        justifyContent: "center"
      }
    }, "Zapisz wizyt\u0119")), editV && /*#__PURE__*/React.createElement(Modal, {
      title: "Edytuj wizyt\u0119",
      onClose: function onClose() {
        return setEditV(null);
      }
    }, /*#__PURE__*/React.createElement(Inp, {
      label: "Data",
      value: editV.date,
      onChange: function onChange(v) {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            date: v
          });
        });
      },
      type: "date"
    }), /*#__PURE__*/React.createElement(TimeRange, {
      kind: "visit",
      start: editV.time,
      end: editV.endTime,
      onChange: function onChange(t, e) {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            time: t,
            endTime: e
          });
        });
      }
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Typ",
      value: editV.type,
      onChange: function onChange(v) {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            type: v
          });
        });
      },
      options: VISIT_TYPES.map(function (x) {
        return {
          value: x,
          label: x
        };
      })
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Cena (z\u0142)",
      value: editV.price,
      onChange: function onChange(v) {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            price: v
          });
        });
      },
      type: "number"
    }), /*#__PURE__*/React.createElement(Sel, {
      label: "Status",
      value: editV.status || "zaplanowana",
      onChange: function onChange(v) {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            status: v
          });
        });
      },
      options: [{
        value: "zaplanowana",
        label: "📅 Zaplanowana"
      }, {
        value: "zakończona",
        label: "✅ Zakończona"
      }]
    }), /*#__PURE__*/React.createElement(Txa, {
      label: "Notatka",
      value: editV.notes || "",
      onChange: function onChange(v) {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            notes: v
          });
        });
      },
      rows: 2,
      placeholder: "Przebieg wizyty, zalecenia..."
    }), /*#__PURE__*/React.createElement(Btn, {
      onClick: function onClick() {
        var u = _objectSpread(_objectSpread({}, editV), {}, {
          price: +editV.price
        });
        setVisits(function (vs) {
          return vs.map(function (v) {
            return v.id === u.id ? _objectSpread(_objectSpread({}, v), u) : v;
          });
        });
        syncFinance(u, false);
        setEditV(null);
        setToast("Zmiany zapisane");
      },
      style: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 8
      }
    }, "Zapisz zmiany"), /*#__PURE__*/React.createElement(Btn, {
      variant: "secondary",
      style: {
        width: "100%",
        justifyContent: "center",
        marginBottom: 8
      },
      onClick: function onClick() {
        setVf(_objectSpread(_objectSpread({}, editV), {}, {
          date: todayLocal(),
          status: "zaplanowana",
          price: String(editV.price)
        }));
        setEditV(null);
        setShowAddV(true);
      }
    }, "\uD83D\uDCCB Powiel wizyt\u0119"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: function onClick() {
        return setConfirmDelV(editV.id || "__DEL__");
      },
      style: {
        width: "100%",
        justifyContent: "center"
      }
    }, "\uD83D\uDDD1\uFE0F Usu\u0144 wizyt\u0119")), confirmDelV && /*#__PURE__*/React.createElement(Modal, {
      title: "Usu\u0144 wizyt\u0119",
      onClose: function onClose() {
        return setConfirmDelV(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        marginBottom: 20
      }
    }, "Na pewno usun\u0105\u0107 t\u0119 wizyt\u0119?"), /*#__PURE__*/React.createElement("div", {
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
        return setConfirmDelV(null);
      }
    }, "Anuluj"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      style: {
        flex: 1,
        justifyContent: "center"
      },
      onClick: function onClick() {
        if (confirmDelV && confirmDelV !== "__DEL__") {
          setVisits(function (vs) {
            return vs.filter(function (v) {
              return v.id !== confirmDelV;
            });
          });
          setFinances(function (fs) {
            return fs.filter(function (f) {
              return f.sourceId !== "visit-" + confirmDelV;
            });
          });
        } else if (editV) {
          var date = editV.date,
            time = editV.time,
            patientName = editV.patientName;
          setVisits(function (vs) {
            return vs.filter(function (v) {
              return !(v.date === date && v.time === time && v.patientName === patientName);
            });
          });
        }
        setConfirmDelV(null);
        setEditV(null);
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
    }), toast && /*#__PURE__*/React.createElement(Toast, {
      msg: toast,
      onDone: function onDone() {
        return setToast(null);
      }
    }));
  }

  // Lista pacjentów
  var sl = search.toLowerCase(),
    sn = search.replace(/\s/g, "");
  var filtered = patients.filter(function (p) {
    return !!p.archived === showArchived && (p.name.toLowerCase().includes(sl) || getPhones(p).some(function (ph) {
      return ph.number.replace(/\s/g, "").includes(sn);
    }) || getEmails(p).some(function (e) {
      return e.address.toLowerCase().includes(sl);
    }) || (p.address || "").toLowerCase().includes(sl) || (p.diagnosis || "").toLowerCase().includes(sl) || (p.notes || "").toLowerCase().includes(sl));
  });
  var lastVisitDate = function lastVisitDate(p) {
    return visits.filter(function (v) {
      return v.patientId === p.id;
    }).map(function (v) {
      return v.date;
    }).sort(function (a, b) {
      return b.localeCompare(a);
    })[0] || "";
  };
  var sorted = _toConsumableArray(filtered).sort(function (a, b) {
    return sort === "alpha" ? a.name.localeCompare(b.name, "pl") : lastVisitDate(b).localeCompare(lastVisitDate(a));
  });
  var equipFiltered = equipClients.filter(function (c) {
    return c.name.toLowerCase().includes(search.toLowerCase()) || (c.phone || "").includes(search);
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 20px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 24,
      fontWeight: 800
    }
  }, "Pacjenci"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6"
    }
  }, patients.filter(function (p) {
    return !p.archived;
  }).length, " aktywnych \xB7 ", patients.filter(function (p) {
    return p.archived;
  }).length, " w archiwum")), pTab === "fizjo" && /*#__PURE__*/React.createElement(Btn, {
    small: true,
    onClick: function onClick() {
      return setShowAdd(true);
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    d: I.plus,
    s: 16,
    c: "#fff"
  }), " Nowy")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: "0 20px 14px"
    }
  }, [{
    k: "fizjo",
    l: "Pacjenci"
  }, {
    k: "sprzet",
    l: "Klienci sprzętu"
  }].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.k,
      onClick: function onClick() {
        setPTab(t.k);
        setSearch("");
      },
      style: {
        padding: "8px 16px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        background: pTab === t.k ? "#3E6FB0" : "#D9E2F0",
        color: pTab === t.k ? "#fff" : "#7A8FA6",
        fontFamily: "inherit"
      }
    }, t.l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    value: search,
    onChange: setSearch,
    placeholder: "\uD83D\uDD0D Szukaj..."
  }), pTab === "fizjo" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 12
    }
  }, [{
    k: "alpha",
    l: "A–Z"
  }, {
    k: "recent",
    l: "Ostatnio aktywni"
  }].map(function (x) {
    return /*#__PURE__*/React.createElement("button", {
      key: x.k,
      onClick: function onClick() {
        return setSort(x.k);
      },
      style: {
        padding: "7px 14px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 12,
        background: sort === x.k ? "#3E6FB0" : "#D9E2F0",
        color: sort === x.k ? "#fff" : "#7A8FA6",
        fontFamily: "inherit"
      }
    }, x.l);
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowArchived(function (a) {
        return !a;
      });
    },
    style: {
      padding: "7px 14px",
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 12,
      background: showArchived ? "#7A8FA6" : "#D9E2F0",
      color: showArchived ? "#fff" : "#7A8FA6",
      fontFamily: "inherit",
      marginLeft: "auto"
    }
  }, "\uD83D\uDCE6 ", showArchived ? "Aktywni" : "Archiwum")), search && sorted.length === 0 && /*#__PURE__*/React.createElement(Empty, {
    text: "Nie znaleziono pacjenta"
  }), sorted.map(function (p, pi) {
    var lv = lastVisitDate(p);
    return /*#__PURE__*/React.createElement(Card, {
      key: p.id,
      onClick: function onClick() {
        return setSelId(p.id);
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
    }, /*#__PURE__*/React.createElement(Av, {
      name: maskName(demo, p.name, pi)
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, maskName(demo, p.name, pi)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, maskPhone(demo, p.phone)), sort === "recent" && lv && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#3E6FB0",
        marginTop: 2
      }
    }, "ostatnia wizyta: ", lv))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        setQuickV(_objectSpread(_objectSpread({}, emptyVisit()), {}, {
          patientName: p.name,
          patientId: p.id,
          price: p.defaultPrice ? String(p.defaultPrice) : "150"
        }));
        setShowQuickV(true);
      },
      style: {
        width: 30,
        height: 30,
        borderRadius: 10,
        background: "#3E6FB0",
        border: "none",
        color: "#fff",
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        lineHeight: 1
      }
    }, "+"), /*#__PURE__*/React.createElement(Ico, {
      d: "M9 18l6-6-6-6",
      s: 20,
      c: "#7A8FA6"
    }))), p.diagnosis && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        marginTop: 8,
        paddingTop: 8,
        borderTop: "1px solid #D9E2F0",
        whiteSpace: "pre-wrap"
      }
    }, maskText(demo, p.diagnosis)));
  })), pTab === "sprzet" && /*#__PURE__*/React.createElement(React.Fragment, null, equipClients.length === 0 && /*#__PURE__*/React.createElement(Empty, {
    text: "Brak klient\xF3w sprz\u0119tu"
  }), search && equipFiltered.length === 0 && equipClients.length > 0 && /*#__PURE__*/React.createElement(Empty, {
    text: "Nie znaleziono"
  }), equipFiltered.map(function (c, ci) {
    var inBase = patients.some(function (p) {
      return p.name === c.name;
    });
    return /*#__PURE__*/React.createElement(Card, {
      key: c.name,
      onClick: function onClick() {
        var ex = patients.find(function (p) {
          return p.name === c.name;
        });
        if (ex) {
          setSelId(ex.id);
        } else {
          var nid = Date.now() + ci;
          setPatients(function (ps) {
            return [].concat(_toConsumableArray(ps || []), [{
              id: nid,
              name: c.name,
              phone: c.phone || "",
              address: c.address || "",
              diagnosis: "",
              notes: "",
              defaultPrice: "",
              birthday: ""
            }]);
          });
          setSelId(nid);
        }
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
    }, /*#__PURE__*/React.createElement(Av, {
      name: demo ? "Klient" : c.name
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, demo ? "Klient" : c.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, demo ? "***-***-***" : c.phone || "Brak telefonu"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, c.rc > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        background: "#F0EDFF",
        color: "#7C6AF4",
        borderRadius: 8,
        padding: "2px 7px"
      }
    }, "\uD83E\uDDBE ", c.rc), c.wc > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        background: "#FFF7ED",
        color: "#F4A261",
        borderRadius: 8,
        padding: "2px 7px"
      }
    }, "\uD83E\uDDBD ", c.wc)), !inBase && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: "#7A8FA6"
      }
    }, "kliknij \u2192 dodaj profil"))));
  }))), showAdd && /*#__PURE__*/React.createElement(Modal, {
    title: "Nowy pacjent",
    onClose: function onClose() {
      return setShowAdd(false);
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "Imi\u0119 i nazwisko *",
    value: newForm.name,
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          name: v
        });
      });
    },
    placeholder: "Jan Kowalski"
  }), /*#__PURE__*/React.createElement(PhonesEditor, {
    phones: newForm.phones,
    onChange: function onChange(phones) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          phones: phones
        });
      });
    }
  }), /*#__PURE__*/React.createElement(EmailsEditor, {
    emails: newForm.emails || [],
    onChange: function onChange(emails) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          emails: emails
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Adres",
    value: newForm.address,
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          address: v
        });
      });
    },
    placeholder: "ul. Przyk\u0142adowa 1, Gliwice"
  }), /*#__PURE__*/React.createElement(CityInput, {
    value: newForm.city || "",
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          city: v
        });
      });
    },
    address: newForm.address,
    extra: knownCities
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Diagnoza",
    value: newForm.diagnosis,
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          diagnosis: v
        });
      });
    },
    rows: 2
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatki",
    value: newForm.notes,
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Domy\u015Blna cena wizyty (z\u0142)",
    value: newForm.defaultPrice || "",
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          defaultPrice: v
        });
      });
    },
    type: "number",
    placeholder: "np. 150"
  }), /*#__PURE__*/React.createElement(BirthdayInput, {
    value: newForm.birthday || "",
    onChange: function onChange(v) {
      return setNewForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          birthday: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    disabled: !newForm.name,
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      if (!newForm.name) return;
      var phones = (newForm.phones || []).filter(function (ph) {
        return ph.number.trim();
      });
      var emails = (newForm.emails || []).map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          address: String(e.address || "").trim(),
          label: String(e.label || "").trim()
        });
      }).filter(function (e) {
        return e.address;
      });
      setPatients(function (ps) {
        var _phones$2, _emails$2;
        return [].concat(_toConsumableArray(ps), [_objectSpread(_objectSpread({}, newForm), {}, {
          phones: phones,
          phone: ((_phones$2 = phones[0]) === null || _phones$2 === void 0 ? void 0 : _phones$2.number) || "",
          emails: emails,
          email: ((_emails$2 = emails[0]) === null || _emails$2 === void 0 ? void 0 : _emails$2.address) || "",
          id: Date.now()
        })]);
      });
      setNewForm({
        name: "",
        phone: "",
        phones: [],
        emails: [],
        email: "",
        address: "",
        diagnosis: "",
        notes: "",
        defaultPrice: "",
        birthday: ""
      });
      setShowAdd(false);
    }
  }, "Dodaj pacjenta")), showQuickV && quickV && /*#__PURE__*/React.createElement(Modal, {
    title: "Wizyta – " + (demo ? "Pacjent" : quickV.patientName),
    onClose: function onClose() {
      return setShowQuickV(false);
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "Data",
    value: quickV.date,
    onChange: function onChange(v) {
      return setQuickV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(TimeRange, {
    kind: "visit",
    start: quickV.time,
    end: quickV.endTime,
    onChange: function onChange(t, e) {
      return setQuickV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          time: t,
          endTime: e
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Typ",
    value: quickV.type,
    onChange: function onChange(v) {
      return setQuickV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          type: v
        });
      });
    },
    options: VISIT_TYPES.map(function (x) {
      return {
        value: x,
        label: x
      };
    })
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Cena (z\u0142)",
    value: quickV.price,
    onChange: function onChange(v) {
      return setQuickV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          price: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Status",
    value: quickV.status,
    onChange: function onChange(v) {
      return setQuickV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          status: v
        });
      });
    },
    options: [{
      value: "zaplanowana",
      label: "📅 Zaplanowana"
    }, {
      value: "zakończona",
      label: "✅ Zakończona"
    }]
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatka",
    value: quickV.notes || "",
    onChange: function onChange(v) {
      return setQuickV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2,
    placeholder: "Przebieg wizyty, zalecenia..."
  }), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      var nv = _objectSpread(_objectSpread({}, quickV), {}, {
        id: Date.now(),
        price: +quickV.price
      });
      setVisits(function (vs) {
        return [].concat(_toConsumableArray(vs), [nv]);
      });
      var done = nv.status === "zakończona" || new Date(nv.date + "T" + (nv.time || "00:00") + ":00") <= new Date();
      if (done) setFinances(function (fs) {
        return [{
          id: Date.now() + Math.random(),
          sourceId: "visit-" + nv.id,
          date: nv.date,
          type: "przychód",
          category: "Wizyta",
          amount: nv.price,
          description: "Wizyta – " + nv.patientName
        }].concat(_toConsumableArray(fs));
      });
      setShowQuickV(false);
      setToast("Wizyta dodana");
    }
  }, "Zapisz wizyt\u0119")));
}
