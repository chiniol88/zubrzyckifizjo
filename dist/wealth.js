// Plik wygenerowany z js/wealth.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
// ── WEALTH (Majątek netto) ───────────────────────────────────────────────
var WEALTH_CURRENCIES = ["PLN", "USD", "EUR", "GBP", "CHF"];
function emptyWealth() {
  return {
    categories: {
      assets: [{
        id: "cash",
        name: "Gotówka i konta"
      }, {
        id: "stocks",
        name: "Inwestycje - akcje/ETF"
      }, {
        id: "crypto",
        name: "Inwestycje - krypto"
      }, {
        id: "realestate",
        name: "Nieruchomości"
      }, {
        id: "cars",
        name: "Samochody"
      }, {
        id: "equipment",
        name: "Sprzęt"
      }, {
        id: "other",
        name: "Inne"
      }],
      liabilities: [{
        id: "mortgage",
        name: "Kredyt hipoteczny"
      }, {
        id: "loan",
        name: "Kredyt gotówkowy/konsumpcyjny"
      }, {
        id: "creditcard",
        name: "Karta kredytowa"
      }, {
        id: "otherliab",
        name: "Inne zobowiązania"
      }]
    },
    snapshots: []
  };
}
var emptyWealthAsset = function emptyWealthAsset(categoryId) {
  return {
    id: Date.now() + Math.random(),
    categoryId: categoryId || "cash",
    name: "",
    amount: "",
    currency: "PLN",
    note: "",
    // pod przyszły automat cen akcji/krypto — nieużywane w UI teraz, ale zapisane od razu żeby nie trzeba było migrować danych
    ticker: "",
    quantity: "",
    unitPrice: "",
    priceSource: "manual"
  };
};
var emptyWealthLiability = function emptyWealthLiability(categoryId) {
  return {
    id: Date.now() + Math.random(),
    categoryId: categoryId || "mortgage",
    name: "",
    amount: "",
    note: ""
  };
};
var wealthAssetPln = function wealthAssetPln(a, rates) {
  var amt = +a.amount || 0;
  if (!a.currency || a.currency === "PLN") return amt;
  var rate = +(rates && rates[a.currency] || 0);
  return amt * rate;
};
var wealthSnapshotTotals = function wealthSnapshotTotals(snap) {
  var assetsTotal = (snap.assets || []).reduce(function (s, a) {
    return s + wealthAssetPln(a, snap.exchangeRates);
  }, 0);
  var liabTotal = (snap.liabilities || []).reduce(function (s, l) {
    return s + (+l.amount || 0);
  }, 0);
  return {
    assetsTotal: assetsTotal,
    liabTotal: liabTotal,
    net: assetsTotal - liabTotal
  };
};
var wealthDistinctCurrencies = function wealthDistinctCurrencies(draft) {
  var set = new Set();
  (draft.assets || []).forEach(function (a) {
    if (a.currency && a.currency !== "PLN") set.add(a.currency);
  });
  return _toConsumableArray(set);
};
var newSnapshotFromPrev = function newSnapshotFromPrev(prev) {
  var today = todayLocal();
  if (!prev) return {
    id: Date.now(),
    date: today,
    note: "",
    exchangeRates: {},
    assets: [],
    liabilities: []
  };
  return {
    id: Date.now(),
    date: today,
    note: "",
    exchangeRates: _objectSpread({}, prev.exchangeRates || {}),
    assets: (prev.assets || []).map(function (a) {
      return _objectSpread(_objectSpread({}, a), {}, {
        id: Date.now() + Math.random()
      });
    }),
    liabilities: (prev.liabilities || []).map(function (l) {
      return _objectSpread(_objectSpread({}, l), {}, {
        id: Date.now() + Math.random()
      });
    })
  };
};
function WealthCategoriesModal(_ref) {
  var wealth = _ref.wealth,
    setWealth = _ref.setWealth,
    onClose = _ref.onClose;
  var dk = useContext(DarkCtx);
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var sub = "#7A8FA6";
  var textC = dk ? "#E8F5F5" : "#1C2B3A";
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    editCat = _useState2[0],
    setEditCat = _useState2[1]; // {kind,id,value}
  var nameRefs = useRef({});
  var countUsage = function countUsage(kind, id) {
    return (wealth.snapshots || []).reduce(function (n, s) {
      return n + (s[kind] || []).filter(function (e) {
        return e.categoryId === id;
      }).length;
    }, 0);
  };
  var addCat = function addCat(kind, name) {
    if (!name.trim()) return;
    setWealth(function (w) {
      return _objectSpread(_objectSpread({}, w), {}, {
        categories: _objectSpread(_objectSpread({}, w.categories), {}, _defineProperty({}, kind, [].concat(_toConsumableArray(w.categories[kind] || []), [{
          id: "c" + Date.now(),
          name: name.trim()
        }])))
      });
    });
  };
  var renameCat = function renameCat(kind, id, name) {
    if (!name.trim()) return;
    setWealth(function (w) {
      return _objectSpread(_objectSpread({}, w), {}, {
        categories: _objectSpread(_objectSpread({}, w.categories), {}, _defineProperty({}, kind, w.categories[kind].map(function (c) {
          return c.id === id ? _objectSpread(_objectSpread({}, c), {}, {
            name: name.trim()
          }) : c;
        })))
      });
    });
    setEditCat(null);
  };
  var delCat = function delCat(kind, id) {
    var n = countUsage(kind, id);
    if (n > 0 && !window.confirm("Ta kategoria jest u\u017Cyta w ".concat(n, " pozycjach w historii snapshot\xF3w. Usun\u0105\u0107 mimo to? (te pozycje zostan\u0105, ale bez przypisanej kategorii)"))) return;
    setWealth(function (w) {
      return _objectSpread(_objectSpread({}, w), {}, {
        categories: _objectSpread(_objectSpread({}, w.categories), {}, _defineProperty({}, kind, w.categories[kind].filter(function (c) {
          return c.id !== id;
        })))
      });
    });
  };
  var moveCat = function moveCat(kind, id, dir) {
    setWealth(function (w) {
      var arr = _toConsumableArray(w.categories[kind] || []);
      var idx = arr.findIndex(function (c) {
        return c.id === id;
      });
      var newIdx = idx + dir;
      if (idx < 0 || newIdx < 0 || newIdx >= arr.length) return w;
      var _ref2 = [arr[newIdx], arr[idx]];
      arr[idx] = _ref2[0];
      arr[newIdx] = _ref2[1];
      return _objectSpread(_objectSpread({}, w), {}, {
        categories: _objectSpread(_objectSpread({}, w.categories), {}, _defineProperty({}, kind, arr))
      });
    });
  };
  var Section = function Section(_ref3) {
    var kind = _ref3.kind,
      label = _ref3.label,
      color = _ref3.color;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: color,
        textTransform: "uppercase",
        letterSpacing: .5,
        marginBottom: 8
      }
    }, label), (wealth.categories[kind] || []).map(function (c, i, arr) {
      return /*#__PURE__*/React.createElement("div", {
        key: c.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 10px",
          border: "1px solid ".concat(border),
          borderRadius: 10,
          marginBottom: 6,
          background: dk ? "#111826" : "#F7F9FB"
        }
      }, editCat && editCat.kind === kind && editCat.id === c.id ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
        autoFocus: true,
        value: editCat.value,
        onChange: function onChange(e) {
          return setEditCat(function (ec) {
            return _objectSpread(_objectSpread({}, ec), {}, {
              value: e.target.value
            });
          });
        },
        onKeyDown: function onKeyDown(e) {
          return e.key === "Enter" && renameCat(kind, c.id, editCat.value);
        },
        style: {
          flex: 1,
          padding: "5px 8px",
          borderRadius: 7,
          border: "1.5px solid ".concat(color),
          background: dk ? "#111826" : "#fff",
          color: textC,
          fontSize: 14,
          fontFamily: "inherit"
        }
      }), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return renameCat(kind, c.id, editCat.value);
        },
        style: {
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: 7,
          padding: "5px 10px",
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "\u2713"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setEditCat(null);
        },
        style: {
          background: "none",
          border: "none",
          color: sub,
          cursor: "pointer",
          fontSize: 16
        }
      }, "\xD7")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return moveCat(kind, c.id, -1);
        },
        disabled: i === 0,
        style: {
          background: "none",
          border: "none",
          color: i === 0 ? dk ? "#1E3030" : "#DCE3E9" : sub,
          cursor: i === 0 ? "default" : "pointer",
          fontSize: 10,
          lineHeight: 1,
          padding: "2px 3px"
        }
      }, "\u25B2"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return moveCat(kind, c.id, 1);
        },
        disabled: i === arr.length - 1,
        style: {
          background: "none",
          border: "none",
          color: i === arr.length - 1 ? dk ? "#1E3030" : "#DCE3E9" : sub,
          cursor: i === arr.length - 1 ? "default" : "pointer",
          fontSize: 10,
          lineHeight: 1,
          padding: "2px 3px"
        }
      }, "\u25BC")), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 14,
          fontWeight: 600,
          color: textC
        }
      }, c.name), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setEditCat({
            kind: kind,
            id: c.id,
            value: c.name
          });
        },
        style: {
          background: "none",
          border: "none",
          color: sub,
          cursor: "pointer",
          padding: "0 4px",
          fontSize: 13
        }
      }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return delCat(kind, c.id);
        },
        style: {
          background: "none",
          border: "none",
          color: "#E05C5C",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1
        }
      }, "\xD7")));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("input", {
      ref: function ref(el) {
        return nameRefs.current[kind] = el;
      },
      defaultValue: "",
      onKeyDown: function onKeyDown(e) {
        if (e.key === "Enter" && e.target.value.trim()) {
          addCat(kind, e.target.value);
          e.target.value = "";
        }
      },
      placeholder: "Nowa kategoria...",
      style: {
        flex: 1,
        padding: "9px 12px",
        borderRadius: 10,
        border: "1.5px solid ".concat(border),
        background: dk ? "#111826" : "#FAFCFD",
        color: textC,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var el = nameRefs.current[kind];
        if (el && el.value.trim()) {
          addCat(kind, el.value);
          el.value = "";
        }
      },
      style: {
        background: color,
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "9px 14px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, "+")));
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "Zarz\u0105dzaj kategoriami",
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Section, {
    kind: "assets",
    label: "Aktywa",
    color: "#3DAA72"
  }), /*#__PURE__*/React.createElement(Section, {
    kind: "liabilities",
    label: "Zobowi\u0105zania",
    color: "#E05C5C"
  }));
}
function WealthSnapshotForm(_ref4) {
  var wealth = _ref4.wealth,
    setWealth = _ref4.setWealth,
    initial = _ref4.initial,
    onClose = _ref4.onClose;
  var dk = useContext(DarkCtx);
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var sub = "#7A8FA6";
  var textC = dk ? "#E8F5F5" : "#1C2B3A";
  var _useState3 = useState(initial),
    _useState4 = _slicedToArray(_useState3, 2),
    draft = _useState4[0],
    setDraft = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    confirmDel = _useState6[0],
    setConfirmDel = _useState6[1];
  var isEdit = (wealth.snapshots || []).some(function (s) {
    return s.id === initial.id;
  });
  var assetCats = wealth.categories.assets || [];
  var liabCats = wealth.categories.liabilities || [];
  var currencies = wealthDistinctCurrencies(draft);
  var totals = wealthSnapshotTotals(draft);
  var updAsset = function updAsset(id, patch) {
    return setDraft(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, {
        assets: d.assets.map(function (a) {
          return a.id === id ? _objectSpread(_objectSpread({}, a), patch) : a;
        })
      });
    });
  };
  var rmAsset = function rmAsset(id) {
    return setDraft(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, {
        assets: d.assets.filter(function (a) {
          return a.id !== id;
        })
      });
    });
  };
  var addAsset = function addAsset() {
    return setDraft(function (d) {
      var _assetCats$;
      return _objectSpread(_objectSpread({}, d), {}, {
        assets: [].concat(_toConsumableArray(d.assets), [emptyWealthAsset((_assetCats$ = assetCats[0]) === null || _assetCats$ === void 0 ? void 0 : _assetCats$.id)])
      });
    });
  };
  var updLiab = function updLiab(id, patch) {
    return setDraft(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, {
        liabilities: d.liabilities.map(function (l) {
          return l.id === id ? _objectSpread(_objectSpread({}, l), patch) : l;
        })
      });
    });
  };
  var rmLiab = function rmLiab(id) {
    return setDraft(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, {
        liabilities: d.liabilities.filter(function (l) {
          return l.id !== id;
        })
      });
    });
  };
  var addLiab = function addLiab() {
    return setDraft(function (d) {
      var _liabCats$;
      return _objectSpread(_objectSpread({}, d), {}, {
        liabilities: [].concat(_toConsumableArray(d.liabilities), [emptyWealthLiability((_liabCats$ = liabCats[0]) === null || _liabCats$ === void 0 ? void 0 : _liabCats$.id)])
      });
    });
  };
  var setRate = function setRate(cur, val) {
    return setDraft(function (d) {
      return _objectSpread(_objectSpread({}, d), {}, {
        exchangeRates: _objectSpread(_objectSpread({}, d.exchangeRates || {}), {}, _defineProperty({}, cur, val))
      });
    });
  };
  var sortedAssets = useMemo(function () {
    return _toConsumableArray(draft.assets).sort(function (a, b) {
      return (+b.amount || 0) - (+a.amount || 0);
    });
  }, [draft.assets]);
  var sortedLiabilities = useMemo(function () {
    return _toConsumableArray(draft.liabilities).sort(function (a, b) {
      return (+b.amount || 0) - (+a.amount || 0);
    });
  }, [draft.liabilities]);
  var save = function save() {
    if (!draft.date) return;
    var clean = _objectSpread(_objectSpread({}, draft), {}, {
      assets: draft.assets.filter(function (a) {
        return a.name.trim() || +a.amount > 0;
      }).map(function (a) {
        return _objectSpread(_objectSpread({}, a), {}, {
          amount: +a.amount || 0
        });
      }),
      liabilities: draft.liabilities.filter(function (l) {
        return l.name.trim() || +l.amount > 0;
      }).map(function (l) {
        return _objectSpread(_objectSpread({}, l), {}, {
          amount: +l.amount || 0
        });
      })
    });
    setWealth(function (w) {
      var exists = (w.snapshots || []).some(function (s) {
        return s.id === clean.id;
      });
      var snaps = exists ? w.snapshots.map(function (s) {
        return s.id === clean.id ? clean : s;
      }) : [].concat(_toConsumableArray(w.snapshots || []), [clean]);
      return _objectSpread(_objectSpread({}, w), {}, {
        snapshots: snaps
      });
    });
    onClose();
  };
  var del = function del() {
    setWealth(function (w) {
      return _objectSpread(_objectSpread({}, w), {}, {
        snapshots: (w.snapshots || []).filter(function (s) {
          return s.id !== draft.id;
        })
      });
    });
    onClose();
  };
  var rowStyle = {
    display: "flex",
    gap: 6,
    marginBottom: 8,
    alignItems: "center",
    flexWrap: "wrap"
  };
  var selStyle = {
    padding: "9px 10px",
    borderRadius: 10,
    border: "1.5px solid ".concat(border),
    background: dk ? "#111826" : "#FAFCFD",
    color: textC,
    fontSize: 13,
    fontFamily: "inherit"
  };
  var inpStyle = {
    padding: "9px 10px",
    borderRadius: 10,
    border: "1.5px solid ".concat(border),
    background: dk ? "#111826" : "#FAFCFD",
    color: textC,
    fontSize: 13,
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: isEdit ? "Edytuj snapshot" : "Nowy snapshot",
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "Data",
    value: draft.date,
    onChange: function onChange(v) {
      return setDraft(function (d) {
        return _objectSpread(_objectSpread({}, d), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatka (opcjonalnie)",
    value: draft.note,
    onChange: function onChange(v) {
      return setDraft(function (d) {
        return _objectSpread(_objectSpread({}, d), {}, {
          note: v
        });
      });
    },
    rows: 2,
    placeholder: "np. po sprzeda\u017Cy auta"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#3DAA72",
      textTransform: "uppercase",
      letterSpacing: .5,
      margin: "16px 0 8px"
    }
  }, "Aktywa"), sortedAssets.map(function (a) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.id,
      style: {
        border: "1px solid ".concat(border),
        borderRadius: 10,
        padding: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("select", {
      value: a.categoryId,
      onChange: function onChange(e) {
        return updAsset(a.id, {
          categoryId: e.target.value
        });
      },
      style: _objectSpread(_objectSpread({}, selStyle), {}, {
        flex: "1 1 140px"
      })
    }, assetCats.map(function (c) {
      return /*#__PURE__*/React.createElement("option", {
        key: c.id,
        value: c.id
      }, c.name);
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return rmAsset(a.id);
      },
      style: {
        background: "none",
        border: "none",
        color: "#E05C5C",
        fontSize: 18,
        cursor: "pointer",
        padding: "0 4px"
      }
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("input", {
      value: a.name,
      onChange: function onChange(e) {
        return updAsset(a.id, {
          name: e.target.value
        });
      },
      placeholder: "Nazwa / opis",
      style: _objectSpread(_objectSpread({}, inpStyle), {}, {
        flex: "2 1 140px"
      })
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: a.amount,
      onChange: function onChange(e) {
        return updAsset(a.id, {
          amount: e.target.value
        });
      },
      placeholder: "Kwota",
      style: _objectSpread(_objectSpread({}, inpStyle), {}, {
        flex: "1 1 90px"
      })
    }), /*#__PURE__*/React.createElement("select", {
      value: a.currency,
      onChange: function onChange(e) {
        return updAsset(a.id, {
          currency: e.target.value
        });
      },
      style: _objectSpread(_objectSpread({}, selStyle), {}, {
        flex: "0 0 76px"
      })
    }, WEALTH_CURRENCIES.map(function (c) {
      return /*#__PURE__*/React.createElement("option", {
        key: c,
        value: c
      }, c);
    }))));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addAsset,
    style: {
      width: "100%",
      padding: "9px",
      borderRadius: 10,
      border: "1.5px dashed ".concat(border),
      background: "transparent",
      color: "#3DAA72",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 12
    }
  }, "+ Dodaj pozycj\u0119 aktyw\xF3w"), currencies.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: sub,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 8
    }
  }, "Kursy walut na dzie\u0144 snapshotu"), currencies.map(function (cur) {
    return /*#__PURE__*/React.createElement("div", {
      key: cur,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: textC,
        fontWeight: 600,
        width: 110,
        flexShrink: 0
      }
    }, "Kurs ", cur, " \u2192 PLN"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: "0.0001",
      value: draft.exchangeRates && draft.exchangeRates[cur] || "",
      onChange: function onChange(e) {
        return setRate(cur, e.target.value);
      },
      placeholder: "np. 4.02",
      style: _objectSpread(_objectSpread({}, inpStyle), {}, {
        flex: 1
      })
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#E05C5C",
      textTransform: "uppercase",
      letterSpacing: .5,
      margin: "16px 0 8px"
    }
  }, "Zobowi\u0105zania"), sortedLiabilities.map(function (l) {
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        border: "1px solid ".concat(border),
        borderRadius: 10,
        padding: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("select", {
      value: l.categoryId,
      onChange: function onChange(e) {
        return updLiab(l.id, {
          categoryId: e.target.value
        });
      },
      style: _objectSpread(_objectSpread({}, selStyle), {}, {
        flex: "1 1 140px"
      })
    }, liabCats.map(function (c) {
      return /*#__PURE__*/React.createElement("option", {
        key: c.id,
        value: c.id
      }, c.name);
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return rmLiab(l.id);
      },
      style: {
        background: "none",
        border: "none",
        color: "#E05C5C",
        fontSize: 18,
        cursor: "pointer",
        padding: "0 4px"
      }
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      style: rowStyle
    }, /*#__PURE__*/React.createElement("input", {
      value: l.name,
      onChange: function onChange(e) {
        return updLiab(l.id, {
          name: e.target.value
        });
      },
      placeholder: "Nazwa / opis",
      style: _objectSpread(_objectSpread({}, inpStyle), {}, {
        flex: "2 1 140px"
      })
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: l.amount,
      onChange: function onChange(e) {
        return updLiab(l.id, {
          amount: e.target.value
        });
      },
      placeholder: "Kwota pozosta\u0142a",
      style: _objectSpread(_objectSpread({}, inpStyle), {}, {
        flex: "1 1 120px"
      })
    })));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addLiab,
    style: {
      width: "100%",
      padding: "9px",
      borderRadius: 10,
      border: "1.5px dashed ".concat(border),
      background: "transparent",
      color: "#E05C5C",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 16
    }
  }, "+ Dodaj zobowi\u0105zanie"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#0F1E1E" : "#F8FAFB",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      color: sub,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "Suma aktyw\xF3w"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#3DAA72",
      fontWeight: 700
    }
  }, totals.assetsTotal.toFixed(2), " z\u0142")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      color: sub,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "Suma zobowi\u0105za\u0144"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#E05C5C",
      fontWeight: 700
    }
  }, totals.liabTotal.toFixed(2), " z\u0142")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 16,
      fontWeight: 800,
      paddingTop: 8,
      borderTop: "1px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: textC,
      fontFamily: "'Syne',sans-serif"
    }
  }, "Maj\u0105tek netto"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: totals.net >= 0 ? "#3E6FB0" : "#E05C5C",
      fontFamily: "'Syne',sans-serif"
    }
  }, totals.net.toFixed(2), " z\u0142"))), !confirmDel ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: save
  }, "Zapisz snapshot"), isEdit && /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      return setConfirmDel(true);
    }
  }, "\uD83D\uDDD1\uFE0F Usu\u0144 snapshot")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
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
  }, "Na pewno usun\u0105\u0107 ten snapshot? Tej operacji nie mo\u017Cna cofn\u0105\u0107."), /*#__PURE__*/React.createElement("div", {
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
    onClick: del
  }, "Tak, usu\u0144"))));
}
function Wealth(_ref5) {
  var wealth = _ref5.wealth,
    setWealth = _ref5.setWealth;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var border = dk ? "#2A3A56" : "#EFF3FA";
  var textC = dk ? "#C8E8E8" : "#1C2B3A";
  var sub = "#7A8FA6";
  var bg = dk ? "#18202F" : "#fff";
  var _useState7 = useState("dashboard"),
    _useState8 = _slicedToArray(_useState7, 2),
    view = _useState8[0],
    setView = _useState8[1]; // dashboard | history
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    showForm = _useState0[0],
    setShowForm = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showCats = _useState10[0],
    setShowCats = _useState10[1];
  var snapshots = useMemo(function () {
    return _toConsumableArray(wealth.snapshots || []).sort(function (a, b) {
      return (a.date || "").localeCompare(b.date || "");
    });
  }, [wealth.snapshots]);
  var latest = snapshots[snapshots.length - 1] || null;
  var latestTotals = latest ? wealthSnapshotTotals(latest) : null;
  var prevSnap = snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;
  var prevTotals = prevSnap ? wealthSnapshotTotals(prevSnap) : null;
  var catName = function catName(kind, id) {
    var c = (wealth.categories[kind] || []).find(function (x) {
      return x.id === id;
    });
    return c ? c.name : "—";
  };
  var allocation = useMemo(function () {
    if (!latest) return [];
    var map = {};
    (latest.assets || []).forEach(function (a) {
      map[a.categoryId] = (map[a.categoryId] || 0) + wealthAssetPln(a, latest.exchangeRates);
    });
    var total = Object.values(map).reduce(function (s, v) {
      return s + v;
    }, 0);
    return Object.entries(map).map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
        catId = _ref7[0],
        v = _ref7[1];
      return {
        catId: catId,
        name: catName("assets", catId),
        v: v,
        pct: total > 0 ? Math.round(v / total * 100) : 0
      };
    }).sort(function (a, b) {
      return b.v - a.v;
    });
  }, [latest, wealth.categories]);
  var maxTrend = Math.max.apply(Math, _toConsumableArray(snapshots.map(function (s) {
    return wealthSnapshotTotals(s).net;
  })).concat([1]));
  var palette = ["#3E6FB0", "#3DAA72", "#2E86AB", "#F4A261", "#7C6AF4", "#E05C5C", "#7A8FA6"];
  if (snapshots.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 20px 24px"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        textAlign: "center",
        padding: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        marginBottom: 10
      }
    }, "\uD83D\uDCBC"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        color: textC,
        marginBottom: 6
      }
    }, "Brak snapshot\xF3w maj\u0105tku"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: sub,
        marginBottom: 18
      }
    }, "Dodaj pierwszy snapshot, \u017Ceby zacz\u0105\u0107 \u015Bledzi\u0107 maj\u0105tek netto w czasie."), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        return setShowForm(newSnapshotFromPrev(null));
      }
    }, "+ Dodaj pierwszy snapshot")), showForm && /*#__PURE__*/React.createElement(WealthSnapshotForm, {
      wealth: wealth,
      setWealth: setWealth,
      initial: showForm,
      onClose: function onClose() {
        return setShowForm(null);
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: 10
    }
  }, [{
    l: "Majątek netto",
    v: demo ? "****" : latestTotals.net.toFixed(2) + " zł",
    c: latestTotals.net >= 0 ? "#3E6FB0" : "#E05C5C"
  }, {
    l: "Aktywa",
    v: demo ? "****" : latestTotals.assetsTotal.toFixed(2) + " zł",
    c: "#3DAA72"
  }, {
    l: "Zobowiązania",
    v: demo ? "****" : latestTotals.liabTotal.toFixed(2) + " zł",
    c: "#E05C5C"
  }, {
    l: "Ostatni snapshot",
    v: latest.date,
    c: "#2E86AB"
  }].map(function (k, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: bg,
        borderRadius: 14,
        padding: "12px 14px",
        border: "1.5px solid ".concat(border)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: sub,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: .5,
        marginBottom: 4
      }
    }, k.l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: k.c,
        fontFamily: "'Syne',sans-serif"
      }
    }, k.v));
  })), prevTotals && function () {
    var diff = latestTotals.net - prevTotals.net;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: diff >= 0 ? dk ? "#0A2A1A" : "#E8F7ED" : dk ? "#2A0A0A" : "#FEE8E8",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: 14,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: diff >= 0 ? "#3DAA72" : "#E05C5C"
      }
    }, diff >= 0 ? "▲ +" : "▼ ", demo ? "****" : diff.toFixed(2) + " zł"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: sub
      }
    }, " vs poprzedni snapshot (", prevSnap.date, ")"));
  }(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8,
      marginBottom: 14
    }
  }, [{
    icon: "➕",
    label: "Nowy snapshot",
    onClick: function onClick() {
      return setShowForm(newSnapshotFromPrev(latest));
    }
  }, {
    icon: "📜",
    label: view === "history" ? "Pulpit" : "Historia",
    onClick: function onClick() {
      return setView(function (v) {
        return v === "history" ? "dashboard" : "history";
      });
    }
  }, {
    icon: "⚙️",
    label: "Kategorie",
    onClick: function onClick() {
      return setShowCats(true);
    }
  }].map(function (b) {
    return /*#__PURE__*/React.createElement("button", {
      key: b.label,
      onClick: b.onClick,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        padding: "10px 4px",
        borderRadius: 12,
        cursor: "pointer",
        fontFamily: "inherit",
        background: dk ? "#18202F" : "#fff",
        border: "1.5px solid ".concat(border),
        boxShadow: "0 1px 3px rgba(0,0,0,.06)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        lineHeight: 1
      }
    }, b.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: dk ? "#7A93B8" : "#3E5578",
        whiteSpace: "nowrap"
      }
    }, b.label));
  })), view === "dashboard" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 14,
      padding: "14px",
      marginBottom: 12,
      border: "1.5px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: sub,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 10
    }
  }, "Trend maj\u0105tku netto"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 6,
      height: 100,
      minWidth: snapshots.length * 40
    }
  }, snapshots.map(function (s) {
    var net = wealthSnapshotTotals(s).net;
    var pct = maxTrend > 0 ? Math.round(Math.max(0, net) / maxTrend * 100) : 0;
    var barH = Math.max(3, Math.round(pct * 0.8));
    var isLatest = s.id === latest.id;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      onClick: function onClick() {
        return setShowForm(s);
      },
      style: {
        minWidth: 36,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: isLatest ? "#3E6FB0" : sub,
        fontWeight: isLatest ? 700 : 600,
        minHeight: 12,
        textAlign: "center"
      }
    }, demo ? "?" : Math.abs(net) >= 1000 ? (net / 1000).toFixed(1) + "k" : net.toFixed(0)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: barH + "px",
        borderRadius: 4,
        background: net < 0 ? "#E05C5C" : isLatest ? "#3E6FB0" : dk ? "#2A5A5A" : "#B8D8D8",
        transition: "height .3s"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: isLatest ? "#3E6FB0" : sub,
        fontWeight: isLatest ? 700 : 400
      }
    }, s.date.slice(5)));
  })))), allocation.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 14,
      padding: "14px",
      border: "1.5px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: sub,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 10
    }
  }, "Alokacja aktyw\xF3w"), allocation.map(function (a, i) {
    var color = palette[i % palette.length];
    return /*#__PURE__*/React.createElement("div", {
      key: a.catId,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        fontSize: 12,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC,
        fontWeight: 600
      }
    }, a.name), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: color,
        fontWeight: 800,
        fontSize: 13
      }
    }, demo ? "****" : a.v.toFixed(0) + " zł"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: sub
      }
    }, " \xB7 ", a.pct, "%"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: dk ? "#1E2F4A" : "#D9E2F0",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: a.pct + "%",
        background: color,
        borderRadius: 3,
        transition: "width .5s"
      }
    })));
  }))), view === "history" && /*#__PURE__*/React.createElement("div", null, _toConsumableArray(snapshots).reverse().map(function (s) {
    var t = wealthSnapshotTotals(s);
    var idx = snapshots.findIndex(function (x) {
      return x.id === s.id;
    }) - 1;
    var prev = idx >= 0 ? snapshots[idx] : null;
    var pdiff = prev ? t.net - wealthSnapshotTotals(prev).net : null;
    return /*#__PURE__*/React.createElement(Card, {
      key: s.id,
      onClick: function onClick() {
        return setShowForm(s);
      },
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: textC
      }
    }, s.date), s.note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: sub,
        marginTop: 2,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, s.note)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0,
        marginLeft: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 15,
        color: t.net >= 0 ? "#3E6FB0" : "#E05C5C",
        fontFamily: "'Syne',sans-serif"
      }
    }, demo ? "****" : t.net.toFixed(2) + " zł"), pdiff !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: pdiff >= 0 ? "#3DAA72" : "#E05C5C",
        marginTop: 2
      }
    }, pdiff >= 0 ? "▲" : "▼", " ", demo ? "**" : Math.abs(pdiff).toFixed(0) + " zł"))));
  })), showForm && /*#__PURE__*/React.createElement(WealthSnapshotForm, {
    wealth: wealth,
    setWealth: setWealth,
    initial: showForm,
    onClose: function onClose() {
      return setShowForm(null);
    }
  }), showCats && /*#__PURE__*/React.createElement(WealthCategoriesModal, {
    wealth: wealth,
    setWealth: setWealth,
    onClose: function onClose() {
      return setShowCats(false);
    }
  }));
}
