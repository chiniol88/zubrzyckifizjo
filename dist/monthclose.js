// Plik wygenerowany z js/monthclose.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// ── ZAMKNIĘCIE MIESIĄCA (Finanse → ✅): własna lista powtarzalnych spraw do ogarnięcia po każdym miesiącu ──────────────
// Wzór listy (settings.monthClose.items) tworzy użytkownik; dla każdego miesiąca ta sama lista jest odhaczana osobno
// (settings.monthClose.done["RRRR-MM"][idPunktu] = data odhaczenia). Zapis idzie do ustawień aplikacji (wspólne na urządzeniach).
var MC_SEED = [{
  id: "s1",
  text: "Wpisać koszty reklamy z Google Ads (szyny / wózki / balkoniki, z VAT)",
  note: "Budżet → Firma → Marketing szyny / wózki / balkoniki. Przycisk × 1,23 doda VAT do kwoty netto."
}, {
  id: "s2",
  text: "Sprawdzić i przypisać faktury kosztowe",
  note: ""
}, {
  id: "s3",
  text: "Opłacić wszystkie koszty i zobowiązania",
  note: ""
}, {
  id: "s4",
  text: "Porównać raport miesięczny z kasy fiskalnej (Novitus) z przychodem w apce",
  note: "Raport miesięczny (251) zdejmuje się po zakończeniu miesiąca."
}, {
  id: "s5",
  text: "VAT-9M za usługi z Google (import usług z UE)",
  note: "Zwykle do 25. następnego miesiąca — sprawdź termin u księgowej."
}, {
  id: "s6",
  text: "Opłacić składki ZUS i podatek",
  note: ""
}, {
  id: "s7",
  text: "Wysłać dokumenty księgowej",
  note: ""
}, {
  id: "s8",
  text: "Sprawdzić nieopłacone wypożyczenia i zaległe okresy cykliczne",
  note: ""
}, {
  id: "s9",
  text: "Sprawdzić przeglądy i uwagi do szyn w Magazynie",
  note: ""
}, {
  id: "s10",
  text: "Sprawdzić, czy daty zwrotów szyn są aktualne",
  note: "Wypożyczenia zwrócone wcześniej mają skrócić datę końca (inaczej obłożenie jest zawyżone)."
}, {
  id: "s11",
  text: "Dodać migawkę majątku (Finanse → 💼)",
  note: ""
}, {
  id: "s12",
  text: "Przejrzeć Statystyki: wynik, koszt klienta, czy reklamę włączyć lub wyłączyć",
  note: ""
}, {
  id: "s13",
  text: "Pobrać kopię zapasową (Ustawienia → Dane)",
  note: ""
}];
function MonthClose(_ref) {
  var settings = _ref.settings,
    setSettings = _ref.setSettings;
  var dk = useContext(DarkCtx);
  var today = todayLocal(),
    curYM = today.slice(0, 7);
  var mc = settings && settings.monthClose || {
    items: MC_SEED,
    done: {}
  };
  var items = Array.isArray(mc.items) ? mc.items : [],
    done = mc.done || {};
  var _useState = useState(function () {
      return ymAdd(curYM, -1);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    ym = _useState2[0],
    setYm = _useState2[1]; // domyślnie miesiąc, który się właśnie skończył
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    edit = _useState4[0],
    setEdit = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    newText = _useState6[0],
    setNewText = _useState6[1];
  var textC = dk ? "#E8F5F5" : "#1C2B3A",
    subC = dk ? "#93A9C4" : "#5E7288",
    borderC = dk ? "#2A3A56" : "#E4EAF3",
    bg = dk ? "#18202F" : "#fff";
  var GREEN = "#3DAA72",
    BLUE = "#3E6FB0";
  var upd = function upd(fn) {
    return setSettings(function (s) {
      var b = s && s.monthClose || {
        items: MC_SEED,
        done: {}
      };
      return _objectSpread(_objectSpread({}, s), {}, {
        monthClose: fn({
          items: Array.isArray(b.items) ? b.items : [],
          done: b.done || {}
        })
      });
    });
  };
  var toggle = function toggle(id) {
    return upd(function (b) {
      var d = _objectSpread({}, b.done);
      var m = _objectSpread({}, d[ym] || {});
      if (m[id]) delete m[id];else m[id] = today;
      d[ym] = m;
      return _objectSpread(_objectSpread({}, b), {}, {
        done: d
      });
    });
  };
  var addItem = function addItem(text, note) {
    var t = String(text || "").trim();
    if (!t) return;
    upd(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        items: [].concat(_toConsumableArray(b.items), [{
          id: "i" + Date.now() + Math.floor(Math.random() * 1000),
          text: t,
          note: note || ""
        }])
      });
    });
  };
  var patch = function patch(id, p) {
    return upd(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        items: b.items.map(function (x) {
          return x.id === id ? _objectSpread(_objectSpread({}, x), p) : x;
        })
      });
    });
  };
  var remove = function remove(id) {
    if (!window.confirm("Usunąć ten punkt z listy? Zniknie też z historii odhaczeń.")) return;
    upd(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        items: b.items.filter(function (x) {
          return x.id !== id;
        })
      });
    });
  };
  var move = function move(i, dir) {
    return upd(function (b) {
      var a = b.items.slice(),
        j = i + dir;
      if (j < 0 || j >= a.length) return b;
      var _ref2 = [a[j], a[i]];
      a[i] = _ref2[0];
      a[j] = _ref2[1];
      return _objectSpread(_objectSpread({}, b), {}, {
        items: a
      });
    });
  };
  var ids = items.map(function (x) {
    return x.id;
  });
  var cnt = function cnt(m) {
    return ids.filter(function (id) {
      return done[m] && done[m][id];
    }).length;
  };
  var total = items.length,
    nDone = cnt(ym),
    allDone = total > 0 && nDone === total;
  var suggestions = MC_SEED.filter(function (s) {
    return !items.some(function (x) {
      return x.id === s.id || x.text === s.text;
    });
  });
  var monthName = function monthName(m) {
    return new Date(m + "-15").toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric"
    });
  };
  var hist = Object.keys(done).filter(function (m) {
    return cnt(m) > 0;
  }).sort().reverse().slice(0, 12);
  var chip = {
    padding: "6px 12px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 12,
    background: dk ? "#1E2F4A" : "#E1E9F5",
    color: dk ? "#9DB8E8" : BLUE,
    fontFamily: "inherit",
    textAlign: "left"
  };
  var inp = {
    width: "100%",
    padding: "9px 11px",
    border: "1.5px solid " + borderC,
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: textC,
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  var small = {
    flexShrink: 0,
    width: 32,
    height: 32,
    border: "none",
    borderRadius: 8,
    background: dk ? "#1E2F4A" : "#F0F4FA",
    color: subC,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setYm(function (m) {
        return ymAdd(m, -1);
      });
    },
    "aria-label": "Wcze\u015Bniejszy miesi\u0105c",
    style: _objectSpread(_objectSpread({}, small), {}, {
      width: 36,
      height: 36
    })
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 17,
      color: textC,
      textTransform: "capitalize"
    }
  }, monthName(ym)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, ym === curYM ? "bieżący miesiąc (jeszcze trwa)" : ym === ymAdd(curYM, -1) ? "miesiąc do zamknięcia" : ym > curYM ? "" : "zamknięty miesiąc")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setYm(function (m) {
        return ym >= curYM ? m : ymAdd(m, 1);
      });
    },
    disabled: ym >= curYM,
    "aria-label": "P\xF3\u017Aniejszy miesi\u0105c",
    style: _objectSpread(_objectSpread({}, small), {}, {
      width: 36,
      height: 36,
      opacity: ym >= curYM ? .35 : 1
    })
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      border: "1px solid " + borderC,
      borderRadius: 16,
      padding: "14px 14px 10px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
      fontSize: 14,
      fontWeight: 700,
      color: allDone ? GREEN : textC
    }
  }, /*#__PURE__*/React.createElement("span", null, allDone ? "✅ Miesiąc zamknięty" : "Do zrobienia"), /*#__PURE__*/React.createElement("span", null, nDone, " z ", total)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 4,
      background: dk ? "#22304B" : "#EAEFF6",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: (total ? nDone / total * 100 : 0) + "%",
      background: allDone ? GREEN : BLUE,
      borderRadius: 4,
      transition: "width .25s"
    }
  })), total === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      padding: "10px 0"
    }
  }, "Lista jest pusta. Dodaj pierwszy punkt poni\u017Cej albo wybierz podpowied\u017A."), items.map(function (it, i) {
    var dd = done[ym] && done[ym][it.id];
    if (edit) return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        padding: "10px 0",
        borderTop: i ? "1px solid " + borderC : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: it.text,
      onChange: function onChange(e) {
        return patch(it.id, {
          text: e.target.value
        });
      },
      style: inp,
      "aria-label": "Tre\u015B\u0107 punktu"
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return move(i, -1);
      },
      disabled: i === 0,
      "aria-label": "W g\xF3r\u0119",
      style: _objectSpread(_objectSpread({}, small), {}, {
        opacity: i === 0 ? .35 : 1
      })
    }, "\u2191"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return move(i, 1);
      },
      disabled: i === items.length - 1,
      "aria-label": "W d\xF3\u0142",
      style: _objectSpread(_objectSpread({}, small), {}, {
        opacity: i === items.length - 1 ? .35 : 1
      })
    }, "\u2193"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return remove(it.id);
      },
      "aria-label": "Usu\u0144 punkt",
      style: _objectSpread(_objectSpread({}, small), {}, {
        color: "#E05C5C"
      })
    }, "\u2715")), /*#__PURE__*/React.createElement("input", {
      value: it.note || "",
      onChange: function onChange(e) {
        return patch(it.id, {
          note: e.target.value
        });
      },
      placeholder: "Notatka (opcjonalnie)",
      style: _objectSpread(_objectSpread({}, inp), {}, {
        fontSize: 13
      }),
      "aria-label": "Notatka do punktu"
    }));
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: function onClick() {
        return toggle(it.id);
      },
      role: "checkbox",
      "aria-checked": !!dd,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        width: "100%",
        textAlign: "left",
        padding: "12px 0",
        border: "none",
        borderTop: i ? "1px solid " + borderC : "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: 26,
        height: 26,
        borderRadius: 8,
        border: "2px solid " + (dd ? GREEN : dk ? "#4A5E7C" : "#B9C7DA"),
        background: dd ? GREEN : "transparent",
        color: "#fff",
        fontSize: 15,
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1
      }
    }, dd ? "✓" : ""), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: 15,
        lineHeight: 1.4,
        color: dd ? subC : textC,
        textDecoration: dd ? "line-through" : "none"
      }
    }, it.text), it.note && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: 12,
        lineHeight: 1.5,
        color: subC,
        marginTop: 3
      }
    }, it.note)), dd && /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        fontSize: 12,
        color: GREEN,
        marginTop: 3
      }
    }, dd.slice(8) + "." + dd.slice(5, 7)));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 10,
      paddingTop: 12,
      borderTop: "1px solid " + borderC
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: newText,
    onChange: function onChange(e) {
      return setNewText(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter") {
        addItem(newText);
        setNewText("");
      }
    },
    placeholder: "Nowy punkt listy\u2026",
    style: inp,
    "aria-label": "Nowy punkt"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      addItem(newText);
      setNewText("");
    },
    disabled: !newText.trim(),
    style: {
      flexShrink: 0,
      padding: "0 16px",
      border: "none",
      borderRadius: 10,
      background: newText.trim() ? BLUE : dk ? "#22304B" : "#D9E2F0",
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      cursor: newText.trim() ? "pointer" : "default",
      fontFamily: "inherit"
    }
  }, "+ Dodaj")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setEdit(function (v) {
        return !v;
      });
    },
    style: {
      background: "transparent",
      border: "none",
      color: subC,
      fontSize: 13,
      textDecoration: "underline",
      cursor: "pointer",
      padding: "6px 0",
      fontFamily: "inherit"
    }
  }, edit ? "✓ Gotowe" : "✏️ Edytuj listę (treść, kolejność, usuwanie)"))), suggestions.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      border: "1px solid " + borderC,
      borderRadius: 16,
      padding: "14px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em",
      marginBottom: 8
    }
  }, "Podpowiedzi (dotknij, \u017Ceby doda\u0107)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, suggestions.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: function onClick() {
        return addItem(s.text, s.note);
      },
      style: chip
    }, "+ ", s.text);
  }))), hist.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      border: "1px solid " + borderC,
      borderRadius: 16,
      padding: "14px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em",
      marginBottom: 8
    }
  }, "Historia zamkni\u0119\u0107"), hist.map(function (m) {
    return /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: function onClick() {
        return setYm(m);
      },
      style: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "9px 0",
        border: "none",
        borderTop: "1px solid " + borderC,
        background: "transparent",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 14,
        color: textC,
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        textTransform: "capitalize",
        fontWeight: m === ym ? 700 : 400
      }
    }, monthName(m)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: cnt(m) === total && total > 0 ? GREEN : subC,
        fontWeight: 600
      }
    }, cnt(m) === total && total > 0 ? "✓ " : "", cnt(m), " z ", total));
  })));
}
