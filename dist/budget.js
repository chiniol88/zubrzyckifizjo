// Plik wygenerowany z js/budget.js przez build.py - nie edytowac recznie.
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
// ── BUDGET ────────────────────────────────────────────────────────────────
function CatMgrSection(_ref) {
  var type = _ref.type,
    cats = _ref.cats,
    color = _ref.color,
    border = _ref.border,
    sub = _ref.sub,
    dk = _ref.dk,
    editCat = _ref.editCat,
    setEditCat = _ref.setEditCat,
    moveCat = _ref.moveCat,
    renameCat = _ref.renameCat,
    delCat = _ref.delCat,
    addSub = _ref.addSub,
    moveSub = _ref.moveSub,
    renameSub = _ref.renameSub,
    delSub = _ref.delSub,
    addCat = _ref.addCat;
  var nameRef = useRef(null);
  var subRefs = useRef({});
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
  }, type === "income" ? "Przychody" : "Koszty"), cats.map(function (cat, ci) {
    return /*#__PURE__*/React.createElement("div", {
      key: ci,
      style: {
        marginBottom: 8,
        border: "1px solid ".concat(border),
        borderRadius: 10,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "8px 10px",
        background: dk ? "#111826" : "#F7F9FB"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return moveCat(type, ci, -1);
      },
      disabled: ci === 0,
      style: {
        background: "none",
        border: "none",
        cursor: ci === 0 ? "default" : "pointer",
        color: ci === 0 ? border : sub,
        fontSize: 11,
        lineHeight: 1,
        padding: "1px 3px"
      }
    }, "\u25B2"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return moveCat(type, ci, 1);
      },
      disabled: ci === cats.length - 1,
      style: {
        background: "none",
        border: "none",
        cursor: ci === cats.length - 1 ? "default" : "pointer",
        color: ci === cats.length - 1 ? border : sub,
        fontSize: 11,
        lineHeight: 1,
        padding: "1px 3px"
      }
    }, "\u25BC")), editCat && editCat.type === type && editCat.catIdx === ci && editCat.field === "name" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
      autoFocus: true,
      value: editCat.value,
      onChange: function onChange(e) {
        return setEditCat(function (ec) {
          return _objectSpread(_objectSpread({}, ec), {}, {
            value: e.target.value
          });
        });
      },
      style: {
        flex: 1,
        padding: "5px 8px",
        borderRadius: 7,
        border: "1.5px solid ".concat(color),
        background: dk ? "#111826" : "#fff",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontSize: 14,
        fontFamily: "inherit"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return renameCat(type, ci, editCat.value);
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
    }, "\xD7")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 14,
        fontWeight: 600,
        color: dk ? "#C8E8E8" : "#1C2B3A"
      }
    }, cat.name), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setEditCat({
          type: type,
          catIdx: ci,
          field: "name",
          value: cat.name
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
        return delCat(type, ci);
      },
      style: {
        background: "none",
        border: "none",
        color: "#E05C5C",
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1
      }
    }, "\xD7"))), (cat.subs || []).map(function (s2, si) {
      return /*#__PURE__*/React.createElement("div", {
        key: si,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 10px 6px 28px",
          borderTop: "1px solid ".concat(border)
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 0
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return moveSub(type, ci, si, -1);
        },
        disabled: si === 0,
        style: {
          background: "none",
          border: "none",
          cursor: si === 0 ? "default" : "pointer",
          color: si === 0 ? border : sub,
          fontSize: 10,
          lineHeight: 1,
          padding: "1px 2px"
        }
      }, "\u25B2"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return moveSub(type, ci, si, 1);
        },
        disabled: si === cat.subs.length - 1,
        style: {
          background: "none",
          border: "none",
          cursor: si === cat.subs.length - 1 ? "default" : "pointer",
          color: si === cat.subs.length - 1 ? border : sub,
          fontSize: 10,
          lineHeight: 1,
          padding: "1px 2px"
        }
      }, "\u25BC")), editCat && editCat.type === type && editCat.catIdx === ci && editCat.field === "sub" && editCat.subIdx === si ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
        autoFocus: true,
        value: editCat.value,
        onChange: function onChange(e) {
          return setEditCat(function (ec) {
            return _objectSpread(_objectSpread({}, ec), {}, {
              value: e.target.value
            });
          });
        },
        style: {
          flex: 1,
          padding: "4px 8px",
          borderRadius: 6,
          border: "1.5px solid ".concat(color),
          background: dk ? "#111826" : "#fff",
          color: dk ? "#E8F5F5" : "#1C2B3A",
          fontSize: 13,
          fontFamily: "inherit"
        }
      }), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return renameSub(type, ci, si, editCat.value);
        },
        style: {
          background: color,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "4px 10px",
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
      }, "\xD7")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 13,
          color: dk ? "#A0C8C8" : "#3E5578"
        }
      }, "\u21B3 ", s2), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return setEditCat({
            type: type,
            catIdx: ci,
            field: "sub",
            subIdx: si,
            value: s2
          });
        },
        style: {
          background: "none",
          border: "none",
          color: sub,
          cursor: "pointer",
          padding: "0 4px",
          fontSize: 12
        }
      }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return delSub(type, ci, si);
        },
        style: {
          background: "none",
          border: "none",
          color: "#E05C5C",
          cursor: "pointer",
          fontSize: 15,
          lineHeight: 1
        }
      }, "\xD7")));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        padding: "6px 10px 6px 28px",
        borderTop: "1px solid ".concat(border),
        background: dk ? "#111E1E" : "#FAFCFD"
      }
    }, /*#__PURE__*/React.createElement("input", {
      ref: function ref(el) {
        return subRefs.current[ci] = el;
      },
      defaultValue: "",
      onKeyDown: function onKeyDown(e) {
        if (e.key === "Enter" && e.target.value.trim()) {
          addSub(type, ci, e.target.value);
          e.target.value = "";
        }
      },
      placeholder: "Dodaj podkategori\u0119...",
      style: {
        flex: 1,
        padding: "5px 8px",
        borderRadius: 7,
        border: "1px solid ".concat(border),
        background: "transparent",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontSize: 12,
        fontFamily: "inherit"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var el = subRefs.current[ci];
        if (el && el.value.trim()) {
          addSub(type, ci, el.value);
          el.value = "";
        }
      },
      style: {
        background: color + "30",
        color: color,
        border: "none",
        borderRadius: 7,
        padding: "5px 10px",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13
      }
    }, "+")));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: nameRef,
    defaultValue: "",
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter" && e.target.value.trim()) {
        addCat(type, e.target.value);
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
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontSize: 14,
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (nameRef.current && nameRef.current.value.trim()) {
        addCat(type, nameRef.current.value);
        nameRef.current.value = "";
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
}
function BudgetEditItemForm(_ref2) {
  var cats = _ref2.cats,
    initial = _ref2.initial,
    selMonth = _ref2.selMonth,
    onSave = _ref2.onSave,
    onDelete = _ref2.onDelete,
    onClose = _ref2.onClose,
    onFormChange = _ref2.onFormChange;
  var dk = useContext(DarkCtx);
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var sub = "#7A8FA6";
  var _useState = useState(initial),
    _useState2 = _slicedToArray(_useState, 2),
    form = _useState2[0],
    setFormLocal = _useState2[1];
  var setForm = function setForm(fn) {
    var next = typeof fn === "function" ? fn(form) : fn;
    setFormLocal(next);
    onFormChange(next);
  };
  var selCat = cats.find(function (c) {
    return c.name === form.cat;
  });
  var hasSubs = selCat && (selCat.subs || []).length > 0;
  return /*#__PURE__*/React.createElement(Modal, {
    title: "Edytuj wpis",
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Kategoria",
    value: form.cat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          cat: v,
          subcat: ""
        });
      });
    },
    options: cats.map(function (c) {
      return {
        value: c.name,
        label: c.name
      };
    })
  }), hasSubs && /*#__PURE__*/React.createElement(Sel, {
    label: "Podkategoria",
    value: form.subcat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          subcat: v
        });
      });
    },
    options: [{
      value: "",
      label: "— brak —"
    }].concat(_toConsumableArray((selCat.subs || []).map(function (s) {
      return {
        value: s,
        label: s
      };
    })))
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Opis",
    value: form.desc,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          desc: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142)",
    value: form.amount,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data",
    value: form.date || "",
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: onSave
  }, "Zapisz zmiany"), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: onDelete
  }, "\uD83D\uDDD1\uFE0F Usu\u0144"));
}
function BudgetRecurringForm(_ref3) {
  var type = _ref3.type,
    cats = _ref3.cats,
    initial = _ref3.initial,
    selMonth = _ref3.selMonth,
    dk = _ref3.dk,
    border = _ref3.border,
    onSave = _ref3.onSave,
    onClose = _ref3.onClose,
    title = _ref3.title;
  var _useState3 = useState(initial),
    _useState4 = _slicedToArray(_useState3, 2),
    form = _useState4[0],
    setForm = _useState4[1];
  var selCat = cats.find(function (c) {
    return c.name === form.cat;
  });
  var hasSubs = selCat && (selCat.subs || []).length > 0;
  var sub = "#7A8FA6";
  return /*#__PURE__*/React.createElement(Modal, {
    title: title,
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Kategoria",
    value: form.cat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          cat: v,
          subcat: ""
        });
      });
    },
    options: cats.map(function (c) {
      return {
        value: c.name,
        label: c.name
      };
    })
  }), hasSubs && /*#__PURE__*/React.createElement(Sel, {
    label: "Podkategoria",
    value: form.subcat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          subcat: v
        });
      });
    },
    options: [{
      value: "",
      label: "— brak —"
    }].concat(_toConsumableArray((selCat.subs || []).map(function (s) {
      return {
        value: s,
        label: s
      };
    })))
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Opis",
    value: form.desc,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          desc: v
        });
      });
    },
    placeholder: "np. Czynsz, Rata kredytu"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142) *",
    value: form.amount,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    },
    type: "number",
    placeholder: "0"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Dzie\u0144 miesi\u0105ca"), /*#__PURE__*/React.createElement("select", {
    value: form.dayOfMonth || 1,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          dayOfMonth: +e.target.value
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }, Array.from({
    length: 28
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i + 1,
      value: i + 1
    }, i + 1);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Miesi\u0105c startu"), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: (form.startMonth || selMonth).length > 7 ? (form.startMonth || selMonth).slice(0, 7) : form.startMonth || selMonth,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          startMonth: e.target.value
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Dzie\u0144 zako\u0144czenia ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 12,
      color: sub
    }
  }, "(opcjonalnie)")), /*#__PURE__*/React.createElement("select", {
    value: form.endDayOfMonth || "",
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          endDayOfMonth: e.target.value ? +e.target.value : null
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 brak \u2014"), Array.from({
    length: 28
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i + 1,
      value: i + 1
    }, i + 1);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Miesi\u0105c zako\u0144czenia ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 12,
      color: sub
    }
  }, "(opcjonalnie)")), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: form.endMonth ? form.endMonth.length > 7 ? form.endMonth.slice(0, 7) : form.endMonth : "",
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          endMonth: e.target.value || null
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }))), /*#__PURE__*/React.createElement(Btn, {
    disabled: !form.cat || !form.amount,
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      return onSave(form);
    }
  }, "Zapisz"));
}
function BudgetEditRecurringForm(_ref4) {
  var type = _ref4.type,
    cats = _ref4.cats,
    initial = _ref4.initial,
    selMonth = _ref4.selMonth,
    dk = _ref4.dk,
    border = _ref4.border,
    onSave = _ref4.onSave,
    onDelete = _ref4.onDelete,
    onClose = _ref4.onClose;
  var _useState5 = useState(initial),
    _useState6 = _slicedToArray(_useState5, 2),
    form = _useState6[0],
    setForm = _useState6[1];
  var selCat = cats.find(function (c) {
    return c.name === form.cat;
  });
  var hasSubs = selCat && (selCat.subs || []).length > 0;
  var sub = "#7A8FA6";
  return /*#__PURE__*/React.createElement(Modal, {
    title: "Edytuj cykliczny",
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Kategoria",
    value: form.cat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          cat: v,
          subcat: ""
        });
      });
    },
    options: cats.map(function (c) {
      return {
        value: c.name,
        label: c.name
      };
    })
  }), hasSubs && /*#__PURE__*/React.createElement(Sel, {
    label: "Podkategoria",
    value: form.subcat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          subcat: v
        });
      });
    },
    options: [{
      value: "",
      label: "— brak —"
    }].concat(_toConsumableArray((selCat.subs || []).map(function (s) {
      return {
        value: s,
        label: s
      };
    })))
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Opis",
    value: form.desc,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          desc: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142)",
    value: form.amount,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Dzie\u0144 miesi\u0105ca"), /*#__PURE__*/React.createElement("select", {
    value: form.dayOfMonth || 1,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          dayOfMonth: +e.target.value
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }, Array.from({
    length: 28
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i + 1,
      value: i + 1
    }, i + 1);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Miesi\u0105c startu"), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: (form.startMonth || selMonth).length > 7 ? (form.startMonth || selMonth).slice(0, 7) : form.startMonth || selMonth,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          startMonth: e.target.value
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Dzie\u0144 zako\u0144czenia ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 12,
      color: sub
    }
  }, "(opcjonalnie)")), /*#__PURE__*/React.createElement("select", {
    value: form.endDayOfMonth || "",
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          endDayOfMonth: e.target.value ? +e.target.value : null
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 brak \u2014"), Array.from({
    length: 28
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i + 1,
      value: i + 1
    }, i + 1);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Miesi\u0105c zako\u0144czenia ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 12,
      color: sub
    }
  }, "(opcjonalnie)")), /*#__PURE__*/React.createElement("input", {
    type: "month",
    value: form.endMonth ? form.endMonth.length > 7 ? form.endMonth.slice(0, 7) : form.endMonth : "",
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          endMonth: e.target.value || null
        });
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(border),
      borderRadius: 12,
      fontSize: 16,
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }))), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: function onClick() {
      return onSave(form);
    }
  }, "Zapisz zmiany"), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: onDelete
  }, "\uD83D\uDDD1\uFE0F Usu\u0144"));
}
function BudgetRecurringOverrideForm(_ref5) {
  var r = _ref5.r,
    selMonth = _ref5.selMonth,
    overrideVal = _ref5.overrideVal,
    dk = _ref5.dk,
    border = _ref5.border,
    onSave = _ref5.onSave,
    onReset = _ref5.onReset,
    onEditGlobal = _ref5.onEditGlobal,
    onClose = _ref5.onClose;
  var sub = "#7A8FA6";
  var hasOverride = overrideVal !== undefined;
  var _useState7 = useState(hasOverride ? String(overrideVal.amount) : String(r.amount)),
    _useState8 = _slicedToArray(_useState7, 2),
    amount = _useState8[0],
    setAmount = _useState8[1];
  var _useState9 = useState(hasOverride ? overrideVal.desc || r.desc || "" : r.desc || ""),
    _useState0 = _slicedToArray(_useState9, 2),
    desc = _useState0[0],
    setDesc = _useState0[1];
  var monthLabel = new Date(selMonth + "-15").toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric"
  });
  var inputStyle = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid ".concat(border),
    borderRadius: 12,
    fontSize: 16,
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit",
    boxSizing: "border-box"
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "Cykliczny · " + monthLabel,
    onClose: onClose
  }, hasOverride && /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#1A2840" : "#FFF8E1",
      border: "1px solid #F0C040",
      borderRadius: 10,
      padding: "8px 12px",
      marginBottom: 12,
      fontSize: 12,
      color: "#8A6A00"
    }
  }, "\u21BB* Nadpisano dla tego miesi\u0105ca"), /*#__PURE__*/React.createElement(Inp, {
    label: "Opis (dla tego miesi\u0105ca)",
    value: desc,
    onChange: function onChange(v) {
      return setDesc(v);
    }
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142) *",
    value: amount,
    onChange: function onChange(v) {
      return setAmount(v);
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Btn, {
    disabled: !amount,
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: function onClick() {
      return onSave({
        amount: +amount,
        desc: desc
      });
    }
  }, "Zapisz dla tego miesi\u0105ca"), hasOverride && /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: onReset
  }, "\u21BA Resetuj do domy\u015Blnej (", r.amount, " z\u0142)"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: onEditGlobal
  }, "\u2699 Edytuj globalnie \u2192"));
}
function BudgetItemForm(_ref6) {
  var type = _ref6.type,
    cats = _ref6.cats,
    form = _ref6.form,
    setForm = _ref6.setForm,
    onSave = _ref6.onSave,
    onSaveAndNext = _ref6.onSaveAndNext,
    onClose = _ref6.onClose,
    title = _ref6.title;
  var selCat = cats.find(function (c) {
    return c.name === form.cat;
  });
  var hasSubs = selCat && (selCat.subs || []).length > 0;
  return /*#__PURE__*/React.createElement(Modal, {
    title: title,
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Kategoria",
    value: form.cat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          cat: v,
          subcat: ""
        });
      });
    },
    options: cats.map(function (c) {
      return {
        value: c.name,
        label: c.name
      };
    })
  }), hasSubs && /*#__PURE__*/React.createElement(Sel, {
    label: "Podkategoria",
    value: form.subcat,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          subcat: v
        });
      });
    },
    options: [{
      value: "",
      label: "— brak —"
    }].concat(_toConsumableArray((selCat.subs || []).map(function (s) {
      return {
        value: s,
        label: s
      };
    })))
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Opis",
    value: form.desc,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          desc: v
        });
      });
    },
    placeholder: "np. Wyp\u0142ata marzec"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142) *",
    value: form.amount,
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    },
    type: "number",
    placeholder: "0"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data *",
    value: form.date || "",
    onChange: function onChange(v) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement(Btn, {
    disabled: !form.cat || !form.amount || !form.date,
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: onSave
  }, "Zapisz"), /*#__PURE__*/React.createElement(Btn, {
    disabled: !form.cat || !form.amount || !form.date,
    variant: "secondary",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: onSaveAndNext
  }, "Zapisz i dodaj kolejny"));
}

// ── BUDGET ────────────────────────────────────────────────────────────────
// Struktura kategorii: [{name: "Wynagrodzenie", subs: ["Patryk", "Ania"]}, ...]
// Migracja: stare string[] -> [{name, subs:[]}]
function normCats(arr) {
  if (!arr || !arr.length) return [];
  return arr.map(function (c) {
    return typeof c === "string" ? {
      name: c,
      subs: []
    } : c;
  });
}
function Budget(_ref7) {
  var finances = _ref7.finances,
    visits = _ref7.visits,
    rentals = _ref7.rentals,
    budget = _ref7.budget,
    setBudget = _ref7.setBudget,
    desk = _ref7.desk;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var bg2 = dk ? "#18202F" : "#fff";
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var sub = "#7A8FA6";
  var _useState1 = useState(function () {
      return todayLocal().slice(0, 7);
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    selMonth = _useState10[0],
    setSelMonth = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showCatMgr = _useState12[0],
    setShowCatMgr = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showScanner = _useState14[0],
    setShowScanner = _useState14[1];
  var receiptMemory = useMemo(function () {
    return budget.receiptMemory || {};
  }, [budget]);
  var setReceiptMemory = function setReceiptMemory(m) {
    return setBudget(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        receiptMemory: m
      });
    });
  };
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    showAdd = _useState16[0],
    setShowAdd = _useState16[1]; // "income"|"expense"
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    editItem = _useState18[0],
    setEditItem = _useState18[1];
  var _useState19 = useState({
      cat: "",
      subcat: "",
      desc: "",
      amount: ""
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    form = _useState20[0],
    setForm = _useState20[1];
  // cat manager state
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    editCat = _useState22[0],
    setEditCat = _useState22[1]; // {type, catIdx, field:"name"|"sub", subIdx, value}
  var _useState23 = useState({
      income: "",
      expense: ""
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    newCatName = _useState24[0],
    setNewCatName = _useState24[1];
  var _useState25 = useState({}),
    _useState26 = _slicedToArray(_useState25, 2),
    newSubName = _useState26[0],
    setNewSubName = _useState26[1]; // {`${type}-${catIdx}`: ""}
  var _useState27 = useState("expense"),
    _useState28 = _slicedToArray(_useState27, 2),
    newCatType = _useState28[0],
    setNewCatType = _useState28[1];

  // Normalize cats on read
  var rawIncCats = useMemo(function () {
    return normCats(budget.incomeCategories || [{
      name: "Wynagrodzenie",
      subs: []
    }, {
      name: "Inne",
      subs: []
    }]);
  }, [budget]);
  var rawExpCats = useMemo(function () {
    return normCats(budget.expenseCategories || [{
      name: "Mieszkanie",
      subs: []
    }, {
      name: "Jedzenie",
      subs: []
    }, {
      name: "Transport",
      subs: []
    }, {
      name: "Inne",
      subs: []
    }]);
  }, [budget]);
  var incCats = useMemo(function () {
    return rawIncCats.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name, "pl");
    });
  }, [rawIncCats]);
  var expCats = useMemo(function () {
    return rawExpCats.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name, "pl");
    });
  }, [rawExpCats]);
  var monthData = useMemo(function () {
    return (budget.months || {})[selMonth] || {
      income: [],
      expenses: []
    };
  }, [budget, selMonth]);
  var setMonthData = function setMonthData(fn) {
    setBudget(function (b) {
      var prev = b.months || {};
      var cur = prev[selMonth] || {
        income: [],
        expenses: []
      };
      return _objectSpread(_objectSpread({}, b), {}, {
        months: _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, selMonth, typeof fn === "function" ? fn(cur) : fn))
      });
    });
  };

  // Practice income for selMonth
  var practiceCats = useMemo(function () {
    var map = {
      Wizyta: 0,
      Wypożyczalnia: 0
    };
    // Wizyty: liczymy bezpośrednio z visits (tak jak zakładka Finanse)
    // żeby uwzględnić wizyty zakończone które nie mają jeszcze wpisu w finances
    (visits || []).filter(function (v) {
      return v.date && v.date.startsWith(selMonth) && visitStatus(v) === "zakończona";
    }).forEach(function (v) {
      map["Wizyta"] += +v.price || 0;
    });
    // Wypożyczalnia i reszta: z finances (nie-wizytowe)
    (finances || []).filter(function (f) {
      if (f.type !== "przychód") return false;
      var sid = f.sourceId || "";
      var cat = (f.category || "").toLowerCase();
      if (cat === "wózek" || sid.startsWith("wozek-")) return false;
      if (cat === "wizyta" || sid.startsWith("visit-")) return false; // wizyty już policzone wyżej
      return f.date && f.date.startsWith(selMonth);
    }).forEach(function (f) {
      map["Wypożyczalnia"] += +f.amount || 0;
    });
    return Object.entries(map).filter(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
        v = _ref9[1];
      return v > 0;
    }).map(function (_ref0) {
      var _ref1 = _slicedToArray(_ref0, 2),
        label = _ref1[0],
        v = _ref1[1];
      return {
        label: label,
        v: v
      };
    });
  }, [finances, visits, selMonth]);

  // Cat helpers
  var setCats = function setCats(type, fn) {
    var key = type === "income" ? "incomeCategories" : "expenseCategories";
    setBudget(function (b) {
      var cur = normCats(b[key] || []);
      return _objectSpread(_objectSpread({}, b), {}, _defineProperty({}, key, fn(cur)));
    });
  };
  var addCat = function addCat(type, name) {
    if (!(name || "").trim()) return;
    setCats(type, function (cats) {
      return [].concat(_toConsumableArray(cats), [{
        name: name.trim(),
        subs: []
      }]);
    });
  };
  var delCat = function delCat(type, catIdx) {
    var key = type === "income" ? "incomeCategories" : "expenseCategories";
    var mkey = type === "income" ? "income" : "expenses";
    setBudget(function (b) {
      var cats = normCats(b[key] || []);
      var delName = cats[catIdx].name;
      var fallback = cats.find(function (c, i) {
        return i !== catIdx && c.name === "Inne";
      }) ? "Inne" : (cats.find(function (_, i) {
        return i !== catIdx;
      }) || {}).name || "Inne";
      var newCats = cats.filter(function (_, i) {
        return i !== catIdx;
      });
      var months = {};
      Object.entries(b.months || {}).forEach(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
          m = _ref11[0],
          md = _ref11[1];
        months[m] = _objectSpread(_objectSpread({}, md), {}, _defineProperty({}, mkey, (md[mkey] || []).map(function (it) {
          return it.cat === delName ? _objectSpread(_objectSpread({}, it), {}, {
            cat: fallback,
            subcat: ""
          }) : it;
        })));
      });
      var recurring = (b.recurring || []).map(function (r) {
        return r.type === type && r.cat === delName ? _objectSpread(_objectSpread({}, r), {}, {
          cat: fallback,
          subcat: ""
        }) : r;
      });
      return _objectSpread(_objectSpread({}, b), {}, _defineProperty(_defineProperty(_defineProperty({}, key, newCats), "months", months), "recurring", recurring));
    });
  };
  var moveCat = function moveCat(type, idx, dir) {
    setCats(type, function (cats) {
      var a = _toConsumableArray(cats);
      var ni = idx + dir;
      if (ni < 0 || ni >= a.length) return a;
      var _ref12 = [a[ni], a[idx]];
      a[idx] = _ref12[0];
      a[ni] = _ref12[1];
      return a;
    });
  };
  var renameCat = function renameCat(type, catIdx, newName) {
    if (!newName.trim()) return;
    var key = type === "income" ? "incomeCategories" : "expenseCategories";
    var mkey = type === "income" ? "income" : "expenses";
    setBudget(function (b) {
      var cats = normCats(b[key] || []);
      var oldName = cats[catIdx].name;
      var newCats = cats.map(function (c, i) {
        return i === catIdx ? _objectSpread(_objectSpread({}, c), {}, {
          name: newName.trim()
        }) : c;
      });
      var months = {};
      Object.entries(b.months || {}).forEach(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
          m = _ref14[0],
          md = _ref14[1];
        months[m] = _objectSpread(_objectSpread({}, md), {}, _defineProperty({}, mkey, (md[mkey] || []).map(function (i) {
          return i.cat === oldName ? _objectSpread(_objectSpread({}, i), {}, {
            cat: newName.trim()
          }) : i;
        })));
      });
      return _objectSpread(_objectSpread({}, b), {}, _defineProperty(_defineProperty({}, key, newCats), "months", months));
    });
    setEditCat(null);
  };
  var addSub = function addSub(type, catIdx, name) {
    if (!(name || "").trim()) return;
    setCats(type, function (cats) {
      return cats.map(function (c, i) {
        return i === catIdx ? _objectSpread(_objectSpread({}, c), {}, {
          subs: [].concat(_toConsumableArray(c.subs || []), [(name || "").trim()])
        }) : c;
      });
    });
  };
  var delSub = function delSub(type, catIdx, subIdx) {
    setCats(type, function (cats) {
      return cats.map(function (c, i) {
        return i === catIdx ? _objectSpread(_objectSpread({}, c), {}, {
          subs: (c.subs || []).filter(function (_, j) {
            return j !== subIdx;
          })
        }) : c;
      });
    });
  };
  var moveSub = function moveSub(type, catIdx, subIdx, dir) {
    setCats(type, function (cats) {
      return cats.map(function (c, i) {
        if (i !== catIdx) return c;
        var a = _toConsumableArray(c.subs || []);
        var ni = subIdx + dir;
        if (ni < 0 || ni >= a.length) return c;
        var _ref15 = [a[ni], a[subIdx]];
        a[subIdx] = _ref15[0];
        a[ni] = _ref15[1];
        return _objectSpread(_objectSpread({}, c), {}, {
          subs: a
        });
      });
    });
  };
  var renameSub = function renameSub(type, catIdx, subIdx, newName) {
    if (!newName.trim()) return;
    var key = type === "income" ? "incomeCategories" : "expenseCategories";
    var mkey = type === "income" ? "income" : "expenses";
    setBudget(function (b) {
      var cats = normCats(b[key] || []);
      var oldName = cats[catIdx].subs[subIdx];
      var newCats = cats.map(function (c, i) {
        return i === catIdx ? _objectSpread(_objectSpread({}, c), {}, {
          subs: c.subs.map(function (s, j) {
            return j === subIdx ? newName.trim() : s;
          })
        }) : c;
      });
      var months = {};
      Object.entries(b.months || {}).forEach(function (_ref16) {
        var _ref17 = _slicedToArray(_ref16, 2),
          m = _ref17[0],
          md = _ref17[1];
        months[m] = _objectSpread(_objectSpread({}, md), {}, _defineProperty({}, mkey, (md[mkey] || []).map(function (it) {
          return it.cat === cats[catIdx].name && it.subcat === oldName ? _objectSpread(_objectSpread({}, it), {}, {
            subcat: newName.trim()
          }) : it;
        })));
      });
      return _objectSpread(_objectSpread({}, b), {}, _defineProperty(_defineProperty({}, key, newCats), "months", months));
    });
    setEditCat(null);
  };

  // Item helpers
  var saveAdd = function saveAdd() {
    if (!form.cat || !form.amount || !form.date) return;
    var item = {
      id: Date.now(),
      cat: form.cat,
      subcat: form.subcat || "",
      desc: form.desc,
      amount: +form.amount,
      date: form.date
    };
    var targetMonth = form.date.slice(0, 7);
    var mkey = showAdd === "income" ? "income" : "expenses";
    if (targetMonth !== selMonth) {
      setBudget(function (b) {
        var tgt = (b.months || {})[targetMonth] || {
          income: [],
          expenses: []
        };
        return _objectSpread(_objectSpread({}, b), {}, {
          months: _objectSpread(_objectSpread({}, b.months || {}), {}, _defineProperty({}, targetMonth, _objectSpread(_objectSpread({}, tgt), {}, _defineProperty({}, mkey, [].concat(_toConsumableArray(tgt[mkey] || []), [item])))))
        });
      });
      setSelMonth(targetMonth);
    } else {
      setMonthData(function (d) {
        return showAdd === "income" ? _objectSpread(_objectSpread({}, d), {}, {
          income: [].concat(_toConsumableArray(d.income || []), [item])
        }) : _objectSpread(_objectSpread({}, d), {}, {
          expenses: [].concat(_toConsumableArray(d.expenses || []), [item])
        });
      });
    }
    setShowAdd(null);
  };
  var saveAddAndNext = function saveAddAndNext() {
    if (!form.cat || !form.amount || !form.date) return;
    var item = {
      id: Date.now(),
      cat: form.cat,
      subcat: form.subcat || "",
      desc: form.desc,
      amount: +form.amount,
      date: form.date
    };
    var targetMonth = form.date.slice(0, 7);
    var mkey = showAdd === "income" ? "income" : "expenses";
    if (targetMonth !== selMonth) {
      setBudget(function (b) {
        var tgt = (b.months || {})[targetMonth] || {
          income: [],
          expenses: []
        };
        return _objectSpread(_objectSpread({}, b), {}, {
          months: _objectSpread(_objectSpread({}, b.months || {}), {}, _defineProperty({}, targetMonth, _objectSpread(_objectSpread({}, tgt), {}, _defineProperty({}, mkey, [].concat(_toConsumableArray(tgt[mkey] || []), [item])))))
        });
      });
      setSelMonth(targetMonth);
    } else {
      setMonthData(function (d) {
        return showAdd === "income" ? _objectSpread(_objectSpread({}, d), {}, {
          income: [].concat(_toConsumableArray(d.income || []), [item])
        }) : _objectSpread(_objectSpread({}, d), {}, {
          expenses: [].concat(_toConsumableArray(d.expenses || []), [item])
        });
      });
    }
    setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, {
        desc: "",
        amount: "",
        date: targetMonth === selMonth ? f.date : todayLocal()
      });
    });
  };
  var saveEdit = function saveEdit() {
    if (!editItem) return;
    var updated = _objectSpread(_objectSpread({}, editItem.item), {}, {
      cat: form.cat,
      subcat: form.subcat || "",
      desc: form.desc,
      amount: +form.amount,
      date: form.date || editItem.item.date || selMonth + "-01"
    });
    var targetMonth = updated.date.slice(0, 7);
    var mkey = editItem.type === "income" ? "income" : "expenses";
    if (targetMonth !== selMonth) {
      setBudget(function (b) {
        var cur = (b.months || {})[selMonth] || {
          income: [],
          expenses: []
        };
        var tgt = (b.months || {})[targetMonth] || {
          income: [],
          expenses: []
        };
        var newCur = _objectSpread(_objectSpread({}, cur), {}, _defineProperty({}, mkey, (cur[mkey] || []).filter(function (i) {
          return i.id !== updated.id;
        })));
        var newTgt = _objectSpread(_objectSpread({}, tgt), {}, _defineProperty({}, mkey, [].concat(_toConsumableArray(tgt[mkey] || []), [updated])));
        return _objectSpread(_objectSpread({}, b), {}, {
          months: _objectSpread(_objectSpread({}, b.months || {}), {}, _defineProperty(_defineProperty({}, selMonth, newCur), targetMonth, newTgt))
        });
      });
    } else {
      setMonthData(function (d) {
        return editItem.type === "income" ? _objectSpread(_objectSpread({}, d), {}, {
          income: (d.income || []).map(function (i) {
            return i.id === updated.id ? updated : i;
          })
        }) : _objectSpread(_objectSpread({}, d), {}, {
          expenses: (d.expenses || []).map(function (i) {
            return i.id === updated.id ? updated : i;
          })
        });
      });
    }
    setEditItem(null);
  };
  var delItem = function delItem(type, id) {
    setMonthData(function (d) {
      return type === "income" ? _objectSpread(_objectSpread({}, d), {}, {
        income: (d.income || []).filter(function (i) {
          return i.id !== id;
        })
      }) : _objectSpread(_objectSpread({}, d), {}, {
        expenses: (d.expenses || []).filter(function (i) {
          return i.id !== id;
        })
      });
    });
    setEditItem(null);
  };
  var practiceTotal = practiceCats.reduce(function (s, c) {
    return s + (c.v || 0);
  }, 0);
  var manualIncTotal = (monthData.income || []).reduce(function (s, i) {
    return s + (+i.amount || 0);
  }, 0);
  // totalInc/Exp including recurring — defined below after recurring state
  var recurringIncTotalEarly = (budget.recurring || []).filter(function (r) {
    return r.type === "income" && (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
  }).reduce(function (s, r) {
    var ov = (monthData.recurringOverrides || {})[r.id];
    var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
    return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
  }, 0);
  var recurringExpTotalEarly = (budget.recurring || []).filter(function (r) {
    return r.type === "expense" && (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
  }).reduce(function (s, r) {
    var ov = (monthData.recurringOverrides || {})[r.id];
    var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
    return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
  }, 0);
  var totalInc = practiceTotal + manualIncTotal + recurringIncTotalEarly;
  var totalExp = (monthData.expenses || []).reduce(function (s, i) {
    return s + (+i.amount || 0);
  }, 0) + recurringExpTotalEarly;
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    showYear = _useState30[0],
    setShowYear = _useState30[1];
  var _useState31 = useState(false),
    _useState32 = _slicedToArray(_useState31, 2),
    showCompare = _useState32[0],
    setShowCompare = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    showRecurringList = _useState34[0],
    setShowRecurringList = _useState34[1];
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    showAnalysis = _useState36[0],
    setShowAnalysis = _useState36[1];
  var analysisData = useMemo(function () {
    var months = [];
    var _loop = function _loop() {
      var d = new Date(selMonth + "-15");
      d.setMonth(d.getMonth() - i);
      var m = d.toISOString().slice(0, 7);
      var mData = (budget.months || {})[m] || {};
      var mOverrides = mData.recurringOverrides || {};
      var mRecExp = (budget.recurring || []).filter(function (r) {
        return r.type === "expense" && (!r.startMonth || r.startMonth.slice(0, 7) <= m) && (!r.endMonth || r.endMonth.slice(0, 7) >= m);
      }).reduce(function (s, r) {
        var ov = mOverrides[r.id];
        return s + (ov !== undefined ? +ov.amount : +r.amount || 0) * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
      }, 0);
      var mRecInc = (budget.recurring || []).filter(function (r) {
        return r.type === "income" && (!r.startMonth || r.startMonth.slice(0, 7) <= m) && (!r.endMonth || r.endMonth.slice(0, 7) >= m);
      }).reduce(function (s, r) {
        var ov = mOverrides[r.id];
        return s + (ov !== undefined ? +ov.amount : +r.amount || 0) * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
      }, 0);
      var mManInc = (mData.income || []).reduce(function (s, i) {
        return s + (+i.amount || 0);
      }, 0);
      var mExp = (mData.expenses || []).reduce(function (s, i) {
        return s + (+i.amount || 0);
      }, 0);
      var mPrac = 0;
      (visits || []).filter(function (v) {
        return v.date && v.date.startsWith(m) && visitStatus(v) === "zakończona";
      }).forEach(function (v) {
        mPrac += +v.price || 0;
      });
      (finances || []).filter(function (f) {
        if (f.type !== "przychód") return false;
        var sid = f.sourceId || "";
        var cat = (f.category || "").toLowerCase();
        if (cat === "wózek" || sid.startsWith("wozek-")) return false;
        if (cat === "wizyta" || sid.startsWith("visit-")) return false;
        return f.date && f.date.startsWith(m);
      }).forEach(function (f) {
        mPrac += +f.amount || 0;
      });
      var mTotalInc = mPrac + mManInc + mRecInc;
      var mTotalExp = mExp + mRecExp;
      months.push({
        m: m,
        mRecExp: mRecExp,
        mTotalInc: mTotalInc,
        mTotalExp: mTotalExp,
        pctInc: mTotalInc > 0 ? Math.round(mRecExp / mTotalInc * 100) : null,
        pctExp: mTotalExp > 0 ? Math.round(mRecExp / mTotalExp * 100) : null
      });
    };
    for (var i = 5; i >= 0; i--) {
      _loop();
    }
    return months;
  }, [budget, selMonth, visits, finances]);
  var _useState37 = useState(function () {
      var d = new Date(todayLocal().slice(0, 7) + "-15");
      d.setMonth(d.getMonth() - 1);
      return d.toISOString().slice(0, 7);
    }),
    _useState38 = _slicedToArray(_useState37, 2),
    compareMonth = _useState38[0],
    setCompareMonth = _useState38[1];
  // If selMonth changes to equal compareMonth, shift compareMonth one month back
  var safeCompareMonth = compareMonth === selMonth ? function () {
    var d = new Date(selMonth + "-15");
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 7);
  }() : compareMonth;
  var _useState39 = useState(null),
    _useState40 = _slicedToArray(_useState39, 2),
    showRecurring = _useState40[0],
    setShowRecurring = _useState40[1]; // "income"|"expense"|null - add modal
  var _useState41 = useState(null),
    _useState42 = _slicedToArray(_useState41, 2),
    editRecurring = _useState42[0],
    setEditRecurring = _useState42[1];
  var _useState43 = useState({
      type: "expense",
      cat: "",
      subcat: "",
      desc: "",
      amount: "",
      cycle: "monthly",
      startMonth: selMonth
    }),
    _useState44 = _slicedToArray(_useState43, 2),
    rForm = _useState44[0],
    setRForm = _useState44[1];
  var _useState45 = useState(null),
    _useState46 = _slicedToArray(_useState45, 2),
    editRecurringOverride = _useState46[0],
    setEditRecurringOverride = _useState46[1];
  var _useState47 = useState(new Set()),
    _useState48 = _slicedToArray(_useState47, 2),
    openRecurringCats = _useState48[0],
    setOpenRecurringCats = _useState48[1];
  var recurring = useMemo(function () {
    return budget.recurring || [];
  }, [budget]);
  var recurringInc = useMemo(function () {
    return recurring.filter(function (r) {
      return r.type === "income" && (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
    });
  }, [recurring, selMonth]);
  var recurringExp = useMemo(function () {
    return recurring.filter(function (r) {
      return r.type === "expense" && (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
    });
  }, [recurring, selMonth]);
  var recOverrides = useMemo(function () {
    return monthData.recurringOverrides || {};
  }, [monthData]);
  var recAmt = function recAmt(r) {
    return recOverrides[r.id] !== undefined ? +recOverrides[r.id].amount : +r.amount;
  };
  var recDesc = function recDesc(r) {
    return recOverrides[r.id] !== undefined ? recOverrides[r.id].desc || r.desc || r.cat : r.desc || r.cat;
  };
  // monthly equivalent: weekly×(52/12), monthly×1
  var recurringIncTotal = recurringInc.reduce(function (s, r) {
    return s + recAmt(r) * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
  }, 0);
  var recurringExpTotal = recurringExp.reduce(function (s, r) {
    return s + recAmt(r) * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
  }, 0);
  var saveRecurring = function saveRecurring() {
    if (!rForm.cat || !rForm.amount) return;
    var item = {
      id: Date.now(),
      type: rForm.type,
      cat: rForm.cat,
      subcat: rForm.subcat || "",
      desc: rForm.desc,
      amount: +rForm.amount,
      cycle: rForm.cycle,
      startMonth: rForm.startMonth || selMonth
    };
    setBudget(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        recurring: [].concat(_toConsumableArray(b.recurring || []), [item])
      });
    });
    setShowRecurring(null);
  };
  var updateRecurring = function updateRecurring() {
    if (!editRecurring) return;
    setBudget(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        recurring: (b.recurring || []).map(function (r) {
          return r.id === editRecurring.id ? _objectSpread(_objectSpread(_objectSpread({}, editRecurring), rForm), {}, {
            amount: +rForm.amount,
            startMonth: rForm.startMonth || selMonth
          }) : r;
        })
      });
    });
    setEditRecurring(null);
  };
  var deleteRecurring = function deleteRecurring(id) {
    setBudget(function (b) {
      return _objectSpread(_objectSpread({}, b), {}, {
        recurring: (b.recurring || []).filter(function (r) {
          return r.id !== id;
        })
      });
    });
    setEditRecurring(null);
  };

  // Previous month helpers
  var prevMonth = useMemo(function () {
    var d = new Date(selMonth + "-15");
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 7);
  }, [selMonth]);
  var prevMonthData = useMemo(function () {
    return (budget.months || {})[prevMonth] || {
      income: [],
      expenses: []
    };
  }, [budget, prevMonth]);
  var prevPracticeTotal = useMemo(function () {
    var total = 0;
    (visits || []).filter(function (v) {
      return v.date && v.date.startsWith(prevMonth) && visitStatus(v) === "zakończona";
    }).forEach(function (v) {
      total += +v.price || 0;
    });
    (finances || []).filter(function (f) {
      if (f.type !== "przychód") return false;
      var sid = f.sourceId || "";
      var cat = (f.category || "").toLowerCase();
      if (cat === "wózek" || sid.startsWith("wozek-")) return false;
      if (cat === "wizyta" || sid.startsWith("visit-")) return false;
      return f.date && f.date.startsWith(prevMonth);
    }).forEach(function (f) {
      total += +f.amount || 0;
    });
    return total;
  }, [finances, visits, prevMonth]);
  var prevOv = useMemo(function () {
    return prevMonthData.recurringOverrides || {};
  }, [prevMonthData]);
  var prevRecInc = useMemo(function () {
    return (budget.recurring || []).filter(function (r) {
      return r.type === "income" && (!r.startMonth || r.startMonth.slice(0, 7) <= prevMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= prevMonth);
    }).reduce(function (s, r) {
      var ov = prevOv[r.id];
      var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
      return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
  }, [budget, prevMonth, prevOv]);
  var prevRecExp = useMemo(function () {
    return (budget.recurring || []).filter(function (r) {
      return r.type === "expense" && (!r.startMonth || r.startMonth.slice(0, 7) <= prevMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= prevMonth);
    }).reduce(function (s, r) {
      var ov = prevOv[r.id];
      var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
      return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
  }, [budget, prevMonth, prevOv]);
  var prevTotalInc = prevPracticeTotal + (prevMonthData.income || []).reduce(function (s, i) {
    return s + (+i.amount || 0);
  }, 0) + prevRecInc;
  var prevTotalExp = (prevMonthData.expenses || []).reduce(function (s, i) {
    return s + (+i.amount || 0);
  }, 0) + prevRecExp;
  var diffInc = prevTotalInc > 0 ? Math.round((totalInc - prevTotalInc) / prevTotalInc * 100) : null;
  var diffExp = prevTotalExp > 0 ? Math.round((totalExp - prevTotalExp) / prevTotalExp * 100) : null;
  var onScannerConfirm = function onScannerConfirm(items, date) {
    var targetMonth = date ? date.slice(0, 7) : selMonth;
    setBudget(function (b) {
      var prev = b.months || {};
      var cur = prev[targetMonth] || {
        income: [],
        expenses: []
      };
      return _objectSpread(_objectSpread({}, b), {}, {
        months: _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, targetMonth, _objectSpread(_objectSpread({}, cur), {}, {
          expenses: [].concat(_toConsumableArray(cur.expenses || []), _toConsumableArray(items.map(function (i) {
            return {
              id: Date.now() + Math.random(),
              cat: i.cat,
              subcat: i.subcat || "",
              desc: i.desc,
              amount: i.amount,
              date: date
            };
          })))
        })))
      });
    });
    setShowScanner(false);
  };

  // Year summary
  var yearMonths = useMemo(function () {
    var yr = selMonth.slice(0, 4);
    var all = new Set();
    for (var m = 1; m <= 12; m++) all.add(yr + "-" + String(m).padStart(2, "0"));
    Object.keys(budget.months || {}).filter(function (m) {
      return m.startsWith(yr);
    }).forEach(function (m) {
      return all.add(m);
    });
    return Array.from(all).sort();
  }, [selMonth, budget]);
  var monthsList = useMemo(function () {
    var s = new Set();
    var cur = todayLocal().slice(0, 7);
    s.add(cur);
    s.add(selMonth);
    Object.keys(budget.months || {}).forEach(function (m) {
      return s.add(m);
    });
    for (var i = 1; i <= 5; i++) {
      var d = new Date(cur + "-15");
      d.setMonth(d.getMonth() - i);
      s.add(d.toISOString().slice(0, 7));
    }
    for (var _i = 1; _i <= 3; _i++) {
      var _d = new Date(cur + "-15");
      _d.setMonth(_d.getMonth() + _i);
      s.add(_d.toISOString().slice(0, 7));
    }
    return Array.from(s).sort(function (a, b) {
      return b.localeCompare(a);
    });
  }, [budget, selMonth]);
  var getCats = function getCats(type) {
    return type === "income" ? incCats : expCats;
  };
  var getColor = function getColor(type) {
    return type === "income" ? "#3DAA72" : "#E05C5C";
  };

  // CatMgrSection is defined outside Budget to prevent remount on keystroke

  // ItemForm defined outside Budget

  var _useState49 = useState({}),
    _useState50 = _slicedToArray(_useState49, 2),
    expandedCats = _useState50[0],
    setExpandedCats = _useState50[1];
  var toggleCat = function toggleCat(key) {
    return setExpandedCats(function (e) {
      return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, key, !e[key]));
    });
  };
  var renderItems = function renderItems(type, cats, color) {
    var items = type === "income" ? monthData.income || [] : monthData.expenses || [];
    var recItems = type === "income" ? recurringInc : recurringExp;
    var catsWithTotals = cats.map(function (cat) {
      var catItems = items.filter(function (i) {
        return i.cat === cat.name;
      });
      var catRec = recItems.filter(function (r) {
        return r.cat === cat.name;
      });
      var catTotal = catItems.reduce(function (s, i) {
        return s + (+i.amount || 0);
      }, 0) + catRec.reduce(function (s, r) {
        return s + recAmt(r);
      }, 0);
      return {
        cat: cat,
        catItems: catItems,
        catRec: catRec,
        catTotal: catTotal
      };
    }).filter(function (_ref18) {
      var catItems = _ref18.catItems,
        catRec = _ref18.catRec;
      return catItems.length || catRec.length;
    });
    var sorted = type === "expense" ? _toConsumableArray(catsWithTotals).sort(function (a, b) {
      return b.catTotal - a.catTotal;
    }) : catsWithTotals;
    return sorted.map(function (_ref19) {
      var cat = _ref19.cat,
        catItems = _ref19.catItems,
        catRec = _ref19.catRec,
        catTotal = _ref19.catTotal;
      if (!catItems.length && !catRec.length) return null;
      var hasSubs = (cat.subs || []).length > 0;
      var expKey = type + "-" + cat.name;
      var isOpen = !!expandedCats[expKey];
      return /*#__PURE__*/React.createElement("div", {
        key: cat.name
      }, /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          return toggleCat(expKey);
        },
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          background: dk ? "#111E1E" : type === "income" ? "#F0F9F5" : "#FDF7F7",
          cursor: "pointer",
          borderBottom: "1px solid ".concat(border)
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: isOpen ? color : sub,
          transition: "transform .2s",
          display: "inline-block",
          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)"
        }
      }, "\u25B6"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: dk ? "#C8E8E8" : "#1C2B3A"
        }
      }, cat.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: sub
        }
      }, catItems.length + catRec.length, " ", catItems.length + catRec.length === 1 ? "wpis" : "wpisów")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 800,
          fontSize: 14,
          color: color
        }
      }, demo ? "****" : catTotal.toFixed(2), " z\u0142")), isOpen && /*#__PURE__*/React.createElement("div", {
        style: {
          background: dk ? "#0D1A1A" : type === "income" ? "#F7FCF9" : "#FDF5F5"
        }
      }, hasSubs ? (cat.subs || []).map(function (s) {
        var subItems = catItems.filter(function (i) {
          return i.subcat === s;
        });
        var subRec = catRec.filter(function (r) {
          return r.subcat === s;
        });
        if (!subItems.length && !subRec.length) return null;
        var subTotal = subItems.reduce(function (a, i) {
          return a + (+i.amount || 0);
        }, 0) + subRec.reduce(function (a, r) {
          return a + recAmt(r);
        }, 0);
        var subKey = expKey + "-" + s;
        var subOpen = !!expandedCats[subKey];
        var subCount = subItems.length + subRec.length;
        return /*#__PURE__*/React.createElement("div", {
          key: s
        }, /*#__PURE__*/React.createElement("div", {
          onClick: function onClick() {
            return setExpandedCats(function (e) {
              return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, subKey, !e[subKey]));
            });
          },
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "9px 16px 9px 28px",
            background: dk ? "#0F1B1B" : type === "income" ? "#EBF7F1" : "#FAF0F0",
            borderBottom: "1px solid ".concat(border),
            cursor: "pointer"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: subOpen ? color : sub,
            display: "inline-block",
            transform: subOpen ? "rotate(90deg)" : "rotate(0deg)"
          }
        }, "\u25B6"), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13,
            fontWeight: 600,
            color: dk ? "#C8E8E8" : "#1C2B3A"
          }
        }, "\u21B3 ", s), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: sub
          }
        }, subCount, " ", subCount === 1 ? "wpis" : "wpisów")), /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 700,
            fontSize: 13,
            color: color
          }
        }, demo ? "****" : subTotal.toFixed(2), " z\u0142")), subOpen && /*#__PURE__*/React.createElement(React.Fragment, null, subItems.slice().sort(function (a, b) {
          return (a.date || "").localeCompare(b.date || "");
        }).map(function (item) {
          return /*#__PURE__*/React.createElement("div", {
            key: item.id,
            onClick: function onClick() {
              setForm({
                cat: item.cat,
                subcat: item.subcat || "",
                desc: item.desc || "",
                amount: String(item.amount),
                date: item.date || selMonth + "-01"
              });
              setEditItem({
                type: type,
                item: item
              });
            },
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px 8px 44px",
              borderBottom: "1px solid ".concat(border),
              cursor: "pointer"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              minWidth: 0,
              flex: 1
            }
          }, /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 12,
              color: sub
            }
          }, demo ? "••••" : item.desc || item.subcat || item.cat), item.date && /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 10,
              color: sub,
              marginLeft: 6,
              opacity: .7
            }
          }, new Date(item.date + "T12:00:00").toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "short"
          }))), /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 600,
              fontSize: 12,
              color: color,
              flexShrink: 0
            }
          }, demo ? "****" : (+item.amount).toFixed(2), " z\u0142"));
        }), catRec.filter(function (r) {
          return r.subcat === s;
        }).map(function (r) {
          return /*#__PURE__*/React.createElement("div", {
            key: r.id,
            onClick: function onClick() {
              return setEditRecurringOverride({
                r: r,
                type: type
              });
            },
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 16px 8px 44px",
              borderBottom: "1px solid ".concat(border),
              cursor: "pointer"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6
            }
          }, /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 11,
              color: color,
              opacity: .6
            }
          }, recOverrides[r.id] !== undefined ? "↻*" : "↻"), /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 12,
              color: sub
            }
          }, demo ? "••••" : recDesc(r))), /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 600,
              fontSize: 12,
              color: color
            }
          }, demo ? "****" : recAmt(r).toFixed(2), " z\u0142"));
        })));
      }) : null, catItems.filter(function (i) {
        return !i.subcat;
      }).slice().sort(function (a, b) {
        return (a.date || "").localeCompare(b.date || "");
      }).map(function (item) {
        return /*#__PURE__*/React.createElement("div", {
          key: item.id,
          onClick: function onClick() {
            setForm({
              cat: item.cat,
              subcat: "",
              desc: item.desc || "",
              amount: String(item.amount),
              date: item.date || selMonth + "-01"
            });
            setEditItem({
              type: type,
              item: item
            });
          },
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            borderBottom: "1px solid ".concat(border),
            cursor: "pointer"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            minWidth: 0,
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: sub
          }
        }, demo ? "••••" : item.desc || item.cat), item.date && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: sub,
            marginLeft: 6,
            opacity: .7
          }
        }, new Date(item.date + "T12:00:00").toLocaleDateString("pl-PL", {
          day: "numeric",
          month: "short"
        }))), /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 600,
            fontSize: 12,
            color: color,
            flexShrink: 0
          }
        }, demo ? "****" : (+item.amount).toFixed(2), " z\u0142"));
      }), catRec.filter(function (r) {
        return !r.subcat;
      }).map(function (r) {
        return /*#__PURE__*/React.createElement("div", {
          key: r.id,
          onClick: function onClick() {
            return setEditRecurringOverride({
              r: r,
              type: type
            });
          },
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            borderBottom: "1px solid ".concat(border),
            cursor: "pointer"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: color,
            opacity: .6
          }
        }, recOverrides[r.id] !== undefined ? "↻*" : "↻"), /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 12,
            color: sub
          }
        }, demo ? "••••" : recDesc(r))), /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 600,
            fontSize: 12,
            color: color
          }
        }, demo ? "****" : recAmt(r).toFixed(2), " z\u0142"));
      })));
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var d = new Date(selMonth + "-15");
      d.setMonth(d.getMonth() - 1);
      setSelMonth(d.toISOString().slice(0, 7));
    },
    style: {
      flexShrink: 0,
      width: 36,
      height: 36,
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 18,
      color: dk ? "#7A93B8" : "#3E5578",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      fontWeight: 700,
      fontSize: 16,
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "'Syne',sans-serif"
    }
  }, new Date(selMonth + "-15").toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var d = new Date(selMonth + "-15");
      d.setMonth(d.getMonth() + 1);
      setSelMonth(d.toISOString().slice(0, 7));
    },
    style: {
      flexShrink: 0,
      width: 36,
      height: 36,
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 18,
      color: dk ? "#7A93B8" : "#3E5578",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u203A")), recurringExpTotalEarly > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      background: dk ? "#18202F" : "#F8FAFB",
      border: "1px solid ".concat(border),
      fontSize: 12,
      color: sub
    }
  }, "Sta\u0142e: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: dk ? "#E8F5F5" : "#1C2B3A"
    }
  }, demo ? "****" : recurringExpTotalEarly.toFixed(0), " z\u0142")), totalInc > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      background: dk ? "#18202F" : "#F8FAFB",
      border: "1px solid ".concat(border),
      fontSize: 12,
      color: sub
    }
  }, Math.round(recurringExpTotalEarly / totalInc * 100), "% przychod\xF3w"), totalExp > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      background: dk ? "#18202F" : "#F8FAFB",
      border: "1px solid ".concat(border),
      fontSize: 12,
      color: sub
    }
  }, Math.round(recurringExpTotalEarly / totalExp * 100), "% koszt\xF3w og\xF3\u0142em")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: 8,
      marginBottom: 12
    }
  }, [{
    icon: "📷",
    label: "Paragon",
    onClick: function onClick() {
      return setShowScanner(true);
    },
    active: false,
    color: "#3E6FB0"
  }, {
    icon: "⚖️",
    label: "Porównaj",
    onClick: function onClick() {
      return setShowCompare(function (v) {
        return !v;
      });
    },
    active: showCompare,
    color: "#2E86AB"
  }, {
    icon: "📅",
    label: "Rok " + selMonth.slice(0, 4),
    onClick: function onClick() {
      return setShowYear(function (v) {
        return !v;
      });
    },
    active: showYear,
    color: "#3E6FB0"
  }, {
    icon: "↻",
    label: "Cykliczne",
    onClick: function onClick() {
      return setShowRecurringList(function (v) {
        return !v;
      });
    },
    active: showRecurringList,
    color: "#8B5CF6"
  }, {
    icon: "⚙️",
    label: "Kat.",
    onClick: function onClick() {
      return setShowCatMgr(true);
    },
    active: false,
    color: sub
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
        background: b.active ? b.color : dk ? "#18202F" : "#fff",
        border: "1.5px solid ".concat(b.active ? b.color : border),
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
        color: b.active ? "#fff" : dk ? "#7A93B8" : "#3E5578",
        whiteSpace: "nowrap"
      }
    }, b.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setShowAnalysis(function (v) {
        return !v;
      });
    },
    style: {
      padding: "12px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 0
    }
  }, "\uD83D\uDCCA Analiza koszt\xF3w sta\u0142ych"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: sub
    }
  }, showAnalysis ? "▲" : "▼")), showAnalysis && function () {
    var maxRecExp = Math.max.apply(Math, _toConsumableArray(analysisData.map(function (x) {
      return x.mRecExp;
    })).concat([1]));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid ".concat(border)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "70px 1fr 60px 50px 50px",
        gap: 0
      }
    }, ["Miesiąc", "", "Stałe", "% prych.", "% kost."].map(function (h, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          padding: "6px 10px",
          fontSize: 10,
          fontWeight: 700,
          color: sub,
          textTransform: "uppercase",
          letterSpacing: .3,
          borderBottom: "1px solid ".concat(border),
          background: dk ? "#111E1E" : "#F8FAFB"
        }
      }, h);
    }), analysisData.map(function (_ref20) {
      var m = _ref20.m,
        mRecExp = _ref20.mRecExp,
        mTotalInc = _ref20.mTotalInc,
        mTotalExp = _ref20.mTotalExp,
        pctInc = _ref20.pctInc,
        pctExp = _ref20.pctExp;
      var isCur = m === selMonth;
      var barW = maxRecExp > 0 ? Math.round(mRecExp / maxRecExp * 100) : 0;
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: m
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "8px 10px",
          fontSize: 12,
          fontWeight: isCur ? 700 : 400,
          color: isCur ? "#3E6FB0" : dk ? "#C8E8E8" : "#1C2B3A",
          borderBottom: "1px solid ".concat(border),
          background: isCur ? dk ? "#0A2020" : "#E1E9F5" : "transparent"
        }
      }, new Date(m + "-15").toLocaleDateString("pl-PL", {
        month: "short",
        year: "2-digit"
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "8px 6px",
          borderBottom: "1px solid ".concat(border),
          display: "flex",
          alignItems: "center",
          background: isCur ? dk ? "#0A2020" : "#E1E9F5" : "transparent"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: 6,
          borderRadius: 3,
          background: "#E05C5C",
          width: barW + "%",
          minWidth: mRecExp > 0 ? 4 : 0,
          transition: "width .3s"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "8px 10px",
          fontSize: 12,
          fontWeight: 600,
          color: "#E05C5C",
          borderBottom: "1px solid ".concat(border),
          background: isCur ? dk ? "#0A2020" : "#E1E9F5" : "transparent",
          textAlign: "right"
        }
      }, demo ? "***" : mRecExp > 0 ? mRecExp.toFixed(0) + "zł" : "—"), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "8px 6px",
          fontSize: 12,
          color: pctInc != null ? pctInc > 80 ? "#E05C5C" : pctInc > 50 ? "#F4A261" : "#3DAA72" : sub,
          fontWeight: 600,
          borderBottom: "1px solid ".concat(border),
          background: isCur ? dk ? "#0A2020" : "#E1E9F5" : "transparent",
          textAlign: "center"
        }
      }, pctInc != null ? pctInc + "%" : "—"), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "8px 6px",
          fontSize: 12,
          color: pctExp != null ? pctExp > 80 ? "#E05C5C" : pctExp > 50 ? "#F4A261" : "#3DAA72" : sub,
          fontWeight: 600,
          borderBottom: "1px solid ".concat(border),
          background: isCur ? dk ? "#0A2020" : "#E1E9F5" : "transparent",
          textAlign: "center"
        }
      }, pctExp != null ? pctExp + "%" : "—"));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 12px",
        fontSize: 11,
        color: sub,
        fontStyle: "italic"
      }
    }, "Aktualny miesi\u0105c pod\u015Bwietlony. Kolor % przychod\xF3w: zielony <50%, pomara\u0144czowy <80%, czerwony >80%."));
  }()), showRecurringList && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: "1px solid ".concat(border),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 0
    }
  }, "Cykliczne (", (budget.recurring || []).length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var c = incCats[0];
      setRForm({
        type: "income",
        cat: c ? c.name : "",
        subcat: "",
        desc: "",
        amount: "",
        cycle: "monthly",
        startMonth: todayLocal()
      });
      setShowRecurring("income");
    },
    style: {
      padding: "4px 10px",
      borderRadius: 8,
      border: "none",
      background: "#3DAA72",
      color: "#fff",
      fontWeight: 600,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Przych\xF3d"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var c = expCats[0];
      setRForm({
        type: "expense",
        cat: c ? c.name : "",
        subcat: "",
        desc: "",
        amount: "",
        cycle: "monthly",
        startMonth: todayLocal()
      });
      setShowRecurring("expense");
    },
    style: {
      padding: "4px 10px",
      borderRadius: 8,
      border: "none",
      background: "#E05C5C",
      color: "#fff",
      fontWeight: 600,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Koszt"))), (budget.recurring || []).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      textAlign: "center",
      color: sub,
      fontSize: 13
    }
  }, "Brak wpis\xF3w cyklicznych"), ["income", "expense"].map(function (typ) {
    var recs = (budget.recurring || []).filter(function (r) {
      return r.type === typ;
    });
    if (!recs.length) return null;
    var col = typ === "income" ? "#3DAA72" : "#E05C5C";
    var label = typ === "income" ? "Przychody cykliczne" : "Koszty cykliczne";
    // Buduj grupy kategorii z sumami, sortuj od największej
    var catGroups = _toConsumableArray(new Set(recs.map(function (r) {
      return r.cat;
    }))).map(function (cat) {
      var catRecs = recs.filter(function (r) {
        return r.cat === cat;
      }).slice().sort(function (a, b) {
        return (+b.amount || 0) - (+a.amount || 0);
      });
      var catActiveSum = catRecs.filter(function (r) {
        return (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
      }).reduce(function (s, r) {
        return s + (+r.amount || 0) * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
      }, 0);
      return {
        cat: cat,
        catRecs: catRecs,
        catActiveSum: catActiveSum
      };
    }).sort(function (a, b) {
      return b.catActiveSum - a.catActiveSum;
    });
    var totalActiveSum = recs.filter(function (r) {
      return (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
    }).reduce(function (s, r) {
      return s + (+r.amount || 0) * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
    return /*#__PURE__*/React.createElement("div", {
      key: typ
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "6px 16px",
        background: dk ? "#111826" : typ === "income" ? "#F0F9F5" : "#FDF7F7",
        fontSize: 10,
        fontWeight: 700,
        color: col,
        textTransform: "uppercase",
        letterSpacing: .5
      }
    }, label), catGroups.map(function (_ref21) {
      var cat = _ref21.cat,
        catRecs = _ref21.catRecs,
        catActiveSum = _ref21.catActiveSum;
      var key = typ + "-" + cat;
      var isOpen = openRecurringCats.has(key);
      var toggle = function toggle() {
        return setOpenRecurringCats(function (s) {
          var n = new Set(s);
          n.has(key) ? n["delete"](key) : n.add(key);
          return n;
        });
      };
      return /*#__PURE__*/React.createElement("div", {
        key: cat
      }, /*#__PURE__*/React.createElement("div", {
        onClick: toggle,
        style: {
          padding: "10px 16px",
          background: dk ? "#162828" : typ === "income" ? "#E8F7F0" : "#FEF0F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          borderBottom: "1px solid ".concat(border)
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: col,
          fontWeight: 500
        }
      }, isOpen ? "▾" : "▸"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: dk ? "#C8E8E8" : "#1C2B3A"
        }
      }, cat), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: sub
        }
      }, "(", catRecs.length, ")")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: col
        }
      }, demo ? "****" : catActiveSum.toFixed(2), " z\u0142")), isOpen && catRecs.map(function (r) {
        var isActive = (!r.startMonth || r.startMonth.slice(0, 7) <= selMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= selMonth);
        return /*#__PURE__*/React.createElement("div", {
          key: r.id,
          onClick: function onClick() {
            setRForm({
              type: r.type,
              cat: r.cat,
              subcat: r.subcat || "",
              desc: r.desc,
              amount: String(r.amount),
              cycle: "monthly",
              startMonth: (r.startMonth || selMonth + "-01").length === 7 ? (r.startMonth || selMonth) + "-01" : r.startMonth || selMonth + "-01",
              endMonth: r.endMonth ? r.endMonth.length === 7 ? r.endMonth + "-01" : r.endMonth : ""
            });
            setEditRecurring(r);
          },
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "9px 16px 9px 32px",
            borderBottom: "1px solid ".concat(border),
            cursor: "pointer",
            opacity: isActive ? 1 : .45
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            minWidth: 0,
            flex: 1
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 6
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13,
            fontWeight: 500,
            color: dk ? "#C8E8E8" : "#1C2B3A"
          }
        }, demo ? "••••" : r.desc || r.cat), !isActive && /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: sub,
            background: dk ? "#2A3A3A" : "#F0F0F0",
            borderRadius: 4,
            padding: "1px 5px"
          }
        }, "nieaktywny")), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: sub,
            marginTop: 1
          }
        }, r.subcat ? "" + r.subcat + " · " : "", r.dayOfMonth || 1, ". ka\u017Cdego miesi\u0105ca", r.startMonth ? " · od " + new Date(r.startMonth.slice(0, 7) + "-15").toLocaleDateString("pl-PL", {
          month: "short",
          year: "numeric"
        }) : "", r.endMonth ? " · do " + new Date(r.endMonth.slice(0, 7) + "-15").toLocaleDateString("pl-PL", {
          month: "short",
          year: "numeric"
        }) : "")), /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 700,
            fontSize: 13,
            color: col,
            flexShrink: 0,
            marginLeft: 8
          }
        }, demo ? "****" : (+r.amount).toFixed(2), " z\u0142"));
      }));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: dk ? "#111826" : typ === "income" ? "#E8F7F0" : "#FEF0F0"
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 0
      }
    }, "Suma miesi\u0119czna"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: col
      }
    }, demo ? "****" : totalActiveSum.toFixed(2), " z\u0142")));
  })), showCompare && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: "1px solid ".concat(border),
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 0
    }
  }, "Por\xF3wnaj miesi\u0105ce"), /*#__PURE__*/React.createElement("select", {
    value: safeCompareMonth,
    onChange: function onChange(e) {
      return setCompareMonth(e.target.value);
    },
    style: {
      padding: "5px 10px",
      borderRadius: 8,
      border: "1px solid ".concat(border),
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontSize: 12,
      fontFamily: "inherit"
    }
  }, monthsList.filter(function (m) {
    return m !== selMonth;
  }).map(function (m) {
    return /*#__PURE__*/React.createElement("option", {
      key: m,
      value: m
    }, new Date(m + "-15").toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric"
    }));
  }))), function () {
    var md2 = (budget.months || {})[safeCompareMonth] || {
      income: [],
      expenses: []
    };
    var prac2 = 0;
    (visits || []).filter(function (v) {
      return v.date && v.date.startsWith(safeCompareMonth) && visitStatus(v) === "zakończona";
    }).forEach(function (v) {
      prac2 += +v.price || 0;
    });
    (finances || []).filter(function (f) {
      if (f.type !== "przychód") return false;
      var sid = f.sourceId || "";
      var cat = (f.category || "").toLowerCase();
      if (cat === "wózek" || sid.startsWith("wozek-")) return false;
      if (cat === "wizyta" || sid.startsWith("visit-")) return false;
      return f.date && f.date.startsWith(safeCompareMonth);
    }).forEach(function (f) {
      prac2 += +f.amount || 0;
    });
    var ov2 = md2.recurringOverrides || {};
    var recInc2 = (budget.recurring || []).filter(function (r) {
      return r.type === "income" && (!r.startMonth || r.startMonth.slice(0, 7) <= safeCompareMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= safeCompareMonth);
    }).reduce(function (s, r) {
      var ov = ov2[r.id];
      var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
      return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
    var recExp2 = (budget.recurring || []).filter(function (r) {
      return r.type === "expense" && (!r.startMonth || r.startMonth.slice(0, 7) <= safeCompareMonth) && (!r.endMonth || r.endMonth.slice(0, 7) >= safeCompareMonth);
    }).reduce(function (s, r) {
      var ov = ov2[r.id];
      var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
      return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
    var inc2 = prac2 + (md2.income || []).reduce(function (s, i) {
      return s + (+i.amount || 0);
    }, 0) + recInc2;
    var exp2 = (md2.expenses || []).reduce(function (s, i) {
      return s + (+i.amount || 0);
    }, 0) + recExp2;
    var rows = [{
      label: "Przychody",
      a: totalInc,
      b: inc2,
      color: "#3DAA72"
    }, {
      label: "Koszty",
      a: totalExp,
      b: exp2,
      color: "#E05C5C"
    }];
    var fmtDiff = function fmtDiff(a, b, invert) {
      var d = a - b;
      if (d === 0) return null;
      var pct = b > 0 ? Math.round(Math.abs(d) / b * 100) : null;
      var better = invert ? d < 0 : d > 0;
      return {
        val: d,
        pct: pct,
        better: better
      };
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 4,
        marginBottom: 8,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: sub
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#3E6FB0"
      }
    }, new Date(selMonth + "-15").toLocaleDateString("pl-PL", {
      month: "short",
      year: "numeric"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#2E86AB"
      }
    }, new Date(safeCompareMonth + "-15").toLocaleDateString("pl-PL", {
      month: "short",
      year: "numeric"
    }))), rows.map(function (row) {
      var diff = fmtDiff(row.a, row.b, row.label === "Koszty");
      return /*#__PURE__*/React.createElement("div", {
        key: row.label,
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 4,
          marginBottom: 10,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: dk ? "#C8E8E8" : "#1C2B3A"
        }
      }, row.label), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          fontFamily: "'Syne',sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: row.color
        }
      }, row.a.toFixed(0), " z\u0142"), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          fontFamily: "'Syne',sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: row.color
        }
      }, row.b.toFixed(0), " z\u0142"), diff && /*#__PURE__*/React.createElement("div", {
        style: {
          gridColumn: "1/-1",
          textAlign: "right",
          fontSize: 11,
          color: diff.better ? "#3DAA72" : "#E05C5C",
          marginTop: -4
        }
      }, diff.better ? "↑ lepiej" : "↓ gorzej", " o ", Math.abs(diff.val).toFixed(0), " z\u0142", diff.pct ? " (".concat(diff.pct, "%)") : ""));
    }));
  }()), showYear && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      padding: "12px 16px",
      borderBottom: "1px solid ".concat(border),
      marginBottom: 0
    }
  }, "Rok ", selMonth.slice(0, 4)), yearMonths.map(function (m) {
    var md = (budget.months || {})[m] || {
      income: [],
      expenses: []
    };
    var prac = 0;
    (visits || []).filter(function (v) {
      return v.date && v.date.startsWith(m) && visitStatus(v) === "zakończona";
    }).forEach(function (v) {
      prac += +v.price || 0;
    });
    (finances || []).filter(function (f) {
      if (f.type !== "przychód") return false;
      var sid = f.sourceId || "";
      var cat = (f.category || "").toLowerCase();
      if (cat === "wózek" || sid.startsWith("wozek-")) return false;
      if (cat === "wizyta" || sid.startsWith("visit-")) return false;
      return f.date && f.date.startsWith(m);
    }).forEach(function (f) {
      prac += +f.amount || 0;
    });
    var ovm = md.recurringOverrides || {};
    var recInc = (budget.recurring || []).filter(function (r) {
      return r.type === "income" && (!r.startMonth || r.startMonth.slice(0, 7) <= m) && (!r.endMonth || r.endMonth.slice(0, 7) >= m);
    }).reduce(function (s, r) {
      var ov = ovm[r.id];
      var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
      return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
    var recExp = (budget.recurring || []).filter(function (r) {
      return r.type === "expense" && (!r.startMonth || r.startMonth.slice(0, 7) <= m) && (!r.endMonth || r.endMonth.slice(0, 7) >= m);
    }).reduce(function (s, r) {
      var ov = ovm[r.id];
      var amt = ov !== undefined ? +ov.amount : +r.amount || 0;
      return s + amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }, 0);
    var inc2 = prac + (md.income || []).reduce(function (s, i) {
      return s + (+i.amount || 0);
    }, 0) + recInc;
    var exp2 = (md.expenses || []).reduce(function (s, i) {
      return s + (+i.amount || 0);
    }, 0) + recExp;
    var isSelected = m === selMonth;
    return /*#__PURE__*/React.createElement("div", {
      key: m,
      onClick: function onClick() {
        setSelMonth(m);
        setShowYear(false);
      },
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 16px",
        borderBottom: "1px solid ".concat(border),
        cursor: "pointer",
        background: isSelected ? dk ? "#1A2840" : "#F0FAF6" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: isSelected ? 700 : 500,
        color: dk ? "#C8E8E8" : "#1C2B3A",
        textTransform: "capitalize"
      }
    }, new Date(m + "-15").toLocaleDateString("pl-PL", {
      month: "long"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#3DAA72"
      }
    }, demo ? "**" : inc2 > 0 ? "+" + inc2.toFixed(0) : "—"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#E05C5C"
      }
    }, demo ? "**" : exp2 > 0 ? "-" + exp2.toFixed(0) : "—")));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: desk ? "grid" : "block",
      gridTemplateColumns: desk ? "1fr 1fr" : "unset",
      gap: desk ? 16 : 0,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: "1px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 0
    }
  }, "Przychody"), diffInc !== null && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      background: diffInc >= 0 ? "#3DAA7220" : "#E05C5C20",
      borderRadius: 6,
      padding: "2px 6px",
      fontSize: 10,
      fontWeight: 700,
      color: diffInc >= 0 ? "#3DAA72" : "#E05C5C"
    }
  }, diffInc >= 0 ? "+" : "", diffInc, "%")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 15,
      color: "#3DAA72",
      whiteSpace: "nowrap"
    }
  }, demo ? "****" : totalInc.toFixed(2), " z\u0142")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var c = incCats[0];
      setForm({
        cat: c ? c.name : "",
        subcat: "",
        desc: "",
        amount: "",
        date: selMonth === todayLocal().slice(0, 7) ? todayLocal() : selMonth + "-01"
      });
      setShowAdd("income");
    },
    style: {
      flex: 1,
      padding: "8px 10px",
      borderRadius: 10,
      border: "none",
      background: "#3E6FB0",
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Dodaj"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var c = incCats[0];
      setRForm({
        type: "income",
        cat: c ? c.name : "",
        subcat: "",
        desc: "",
        amount: "",
        cycle: "monthly",
        startMonth: selMonth
      });
      setShowRecurring("income");
    },
    style: {
      padding: "8px 12px",
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: "none",
      color: sub,
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u21BB"))), practiceCats.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 16px",
      background: dk ? "#111826" : "#F0F9F5",
      fontSize: 10,
      fontWeight: 700,
      color: "#3DAA72",
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Praktyka (auto)"), practiceCats.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.label,
      style: {
        display: "flex",
        justifyContent: "space-between",
        padding: "9px 16px",
        borderBottom: "1px solid ".concat(border)
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: dk ? "#C8E8E8" : "#1C2B3A"
      }
    }, c.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: "#3DAA72"
      }
    }, demo ? "****" : c.v.toFixed(2), " z\u0142"));
  })), renderItems("income", incCats, "#3DAA72"), (monthData.income || []).length === 0 && practiceCats.length === 0 && recurringInc.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      textAlign: "center",
      color: sub,
      fontSize: 13
    }
  }, "Brak przychod\xF3w")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: "1px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 0
    }
  }, "Koszty"), diffExp !== null && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      background: diffExp <= 0 ? "#3DAA7220" : "#E05C5C20",
      borderRadius: 6,
      padding: "2px 6px",
      fontSize: 10,
      fontWeight: 700,
      color: diffExp <= 0 ? "#3DAA72" : "#E05C5C"
    }
  }, diffExp >= 0 ? "+" : "", diffExp, "%")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 15,
      color: "#E05C5C",
      whiteSpace: "nowrap"
    }
  }, demo ? "****" : totalExp.toFixed(2), " z\u0142")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var c = expCats[0];
      setForm({
        cat: c ? c.name : "",
        subcat: "",
        desc: "",
        amount: "",
        date: selMonth === todayLocal().slice(0, 7) ? todayLocal() : selMonth + "-01"
      });
      setShowAdd("expense");
    },
    style: {
      flex: 1,
      padding: "8px 10px",
      borderRadius: 10,
      border: "none",
      background: "#E05C5C",
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Dodaj"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var c = expCats[0];
      setRForm({
        type: "expense",
        cat: c ? c.name : "",
        subcat: "",
        desc: "",
        amount: "",
        cycle: "monthly",
        startMonth: selMonth
      });
      setShowRecurring("expense");
    },
    style: {
      padding: "8px 12px",
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: "none",
      color: sub,
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u21BB"))), renderItems("expense", expCats, "#E05C5C"), (monthData.expenses || []).length === 0 && recurringExp.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      textAlign: "center",
      color: sub,
      fontSize: 13
    }
  }, "Brak koszt\xF3w"))), function () {
    var allEntries = [].concat(_toConsumableArray(practiceCats.map(function (c) {
      return {
        id: "prac-" + c.label,
        date: selMonth + "-01",
        cat: "Praktyka",
        subcat: c.label,
        desc: c.label + " (auto)",
        amount: c.v,
        type: "income"
      };
    })), _toConsumableArray(recurringInc.map(function (r) {
      return {
        id: "rec-" + r.id,
        date: selMonth + "-" + (r.dayOfMonth || 1).toString().padStart(2, "0"),
        cat: r.cat,
        subcat: r.subcat || "",
        desc: recDesc(r),
        amount: recAmt(r),
        type: "income"
      };
    })), _toConsumableArray(recurringExp.map(function (r) {
      return {
        id: "rec-" + r.id,
        date: selMonth + "-" + (r.dayOfMonth || 1).toString().padStart(2, "0"),
        cat: r.cat,
        subcat: r.subcat || "",
        desc: recDesc(r),
        amount: recAmt(r),
        type: "expense"
      };
    })), _toConsumableArray((monthData.income || []).map(function (i) {
      return _objectSpread(_objectSpread({}, i), {}, {
        type: "income",
        date: i.date || selMonth + "-01"
      });
    })), _toConsumableArray((monthData.expenses || []).map(function (e) {
      return _objectSpread(_objectSpread({}, e), {}, {
        type: "expense",
        date: e.date || selMonth + "-01"
      });
    }))).sort(function (a, b) {
      return b.date.localeCompare(a.date) || (a.type === "income" ? -1 : 1);
    });
    if (!allEntries.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: bg2,
        borderRadius: 16,
        marginBottom: 12,
        boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        padding: "10px 16px",
        borderBottom: "1px solid ".concat(border),
        marginBottom: 0
      }
    }, "Wszystkie wpisy"), allEntries.map(function (e, i) {
      var isPrac = String(e.id).startsWith("prac-");
      var isRec = String(e.id).startsWith("rec-");
      var handleClick = isPrac ? null : isRec ? function () {
        var rid = +String(e.id).slice(4);
        var r = (budget.recurring || []).find(function (x) {
          return x.id === rid;
        });
        if (r) setEditRecurringOverride({
          r: r,
          type: e.type
        });
      } : function () {
        setForm({
          cat: e.cat,
          subcat: e.subcat || "",
          desc: e.desc || "",
          amount: String(e.amount),
          date: e.date || selMonth + "-01"
        });
        setEditItem({
          type: e.type,
          item: e
        });
      };
      return /*#__PURE__*/React.createElement("div", {
        key: e.id || i,
        onClick: handleClick || undefined,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 16px",
          borderBottom: i < allEntries.length - 1 ? "1px solid ".concat(border) : "none",
          cursor: isPrac ? "default" : "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0,
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 500,
          color: dk ? "#C8E8E8" : "#1C2B3A",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, demo ? "••••" : e.desc || e.cat), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: sub,
          marginTop: 1
        }
      }, e.cat, e.subcat ? " · " + e.subcat : "", " \xB7 ", new Date(e.date + "T12:00:00").toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "short"
      }), isRec ? " · ↻" : isPrac ? " · auto" : "")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          fontSize: 13,
          color: e.type === "income" ? "#3DAA72" : "#E05C5C",
          flexShrink: 0,
          marginLeft: 8
        }
      }, e.type === "income" ? "+" : "-", demo ? "****" : (+e.amount).toFixed(2), " z\u0142"));
    }));
  }(), showAdd && /*#__PURE__*/React.createElement(BudgetItemForm, {
    type: showAdd,
    cats: showAdd === "income" ? incCats : expCats,
    form: form,
    setForm: setForm,
    title: showAdd === "income" ? "Nowy przychód" : "Nowy koszt",
    onSave: saveAdd,
    onSaveAndNext: saveAddAndNext,
    onClose: function onClose() {
      return setShowAdd(null);
    }
  }), editItem && /*#__PURE__*/React.createElement(BudgetEditItemForm, {
    cats: getCats(editItem.type),
    initial: form,
    selMonth: selMonth,
    onSave: saveEdit,
    onDelete: function onDelete() {
      return delItem(editItem.type, editItem.item.id);
    },
    onClose: function onClose() {
      return setEditItem(null);
    },
    onFormChange: setForm
  }), showRecurring && /*#__PURE__*/React.createElement(BudgetRecurringForm, {
    type: showRecurring,
    cats: getCats(showRecurring),
    initial: rForm,
    selMonth: selMonth,
    dk: dk,
    border: border,
    title: showRecurring === "income" ? "Nowy cykliczny przychód" : "Nowy cykliczny koszt",
    onSave: function onSave(f) {
      setBudget(function (b) {
        return _objectSpread(_objectSpread({}, b), {}, {
          recurring: [].concat(_toConsumableArray(b.recurring || []), [_objectSpread(_objectSpread({}, f), {}, {
            id: Date.now(),
            amount: +f.amount
          })])
        });
      });
      setShowRecurring(null);
    },
    onClose: function onClose() {
      return setShowRecurring(null);
    }
  }), editRecurringOverride && /*#__PURE__*/React.createElement(BudgetRecurringOverrideForm, {
    r: editRecurringOverride.r,
    selMonth: selMonth,
    overrideVal: recOverrides[editRecurringOverride.r.id],
    dk: dk,
    border: border,
    onSave: function onSave(ov) {
      setMonthData(function (d) {
        return _objectSpread(_objectSpread({}, d), {}, {
          recurringOverrides: _objectSpread(_objectSpread({}, d.recurringOverrides || {}), {}, _defineProperty({}, editRecurringOverride.r.id, ov))
        });
      });
      setEditRecurringOverride(null);
    },
    onReset: function onReset() {
      var ov = _objectSpread({}, monthData.recurringOverrides || {});
      delete ov[editRecurringOverride.r.id];
      setMonthData(function (d) {
        return _objectSpread(_objectSpread({}, d), {}, {
          recurringOverrides: ov
        });
      });
      setEditRecurringOverride(null);
    },
    onEditGlobal: function onEditGlobal() {
      var r = editRecurringOverride.r;
      setRForm({
        type: r.type,
        cat: r.cat,
        subcat: r.subcat || "",
        desc: r.desc,
        amount: String(r.amount),
        cycle: "monthly",
        startMonth: (r.startMonth || selMonth + "-01").length === 7 ? (r.startMonth || selMonth) + "-01" : r.startMonth || selMonth + "-01",
        endMonth: r.endMonth ? r.endMonth.length === 7 ? r.endMonth + "-01" : r.endMonth : ""
      });
      setEditRecurring(r);
      setEditRecurringOverride(null);
    },
    onClose: function onClose() {
      return setEditRecurringOverride(null);
    }
  }), editRecurring && /*#__PURE__*/React.createElement(BudgetEditRecurringForm, {
    type: editRecurring.type,
    cats: getCats(editRecurring.type),
    initial: rForm,
    selMonth: selMonth,
    dk: dk,
    border: border,
    onSave: function onSave(f) {
      setBudget(function (b) {
        return _objectSpread(_objectSpread({}, b), {}, {
          recurring: (b.recurring || []).map(function (r) {
            return r.id === editRecurring.id ? _objectSpread(_objectSpread(_objectSpread({}, r), f), {}, {
              amount: +f.amount
            }) : r;
          })
        });
      });
      setEditRecurring(null);
    },
    onDelete: function onDelete() {
      return deleteRecurring(editRecurring.id);
    },
    onClose: function onClose() {
      return setEditRecurring(null);
    }
  }), showScanner && /*#__PURE__*/React.createElement(ReceiptScanner, {
    onClose: function onClose() {
      return setShowScanner(false);
    },
    onConfirm: onScannerConfirm,
    expCats: expCats,
    incCats: incCats,
    memory: receiptMemory,
    setMemory: setReceiptMemory,
    selMonth: selMonth,
    existingExpenses: monthData.expenses || []
  }), showCatMgr && /*#__PURE__*/React.createElement(Modal, {
    title: "Zarz\u0105dzaj kategoriami",
    onClose: function onClose() {
      return setShowCatMgr(false);
    }
  }, /*#__PURE__*/React.createElement(CatMgrSection, {
    type: "income",
    cats: rawIncCats,
    color: "#3DAA72",
    border: border,
    sub: sub,
    dk: dk,
    editCat: editCat,
    setEditCat: setEditCat,
    moveCat: moveCat,
    renameCat: renameCat,
    delCat: delCat,
    addSub: addSub,
    moveSub: moveSub,
    renameSub: renameSub,
    delSub: delSub,
    addCat: addCat
  }), /*#__PURE__*/React.createElement(CatMgrSection, {
    type: "expense",
    cats: rawExpCats,
    color: "#E05C5C",
    border: border,
    sub: sub,
    dk: dk,
    editCat: editCat,
    setEditCat: setEditCat,
    moveCat: moveCat,
    renameCat: renameCat,
    delCat: delCat,
    addSub: addSub,
    moveSub: moveSub,
    renameSub: renameSub,
    delSub: delSub,
    addCat: addCat
  })));
}
var emptyNFZ = function emptyNFZ() {
  return {
    patientName: "",
    address: "",
    phone: "",
    hasDisabilityCert: false,
    wheelchairModel: "",
    orderDate: "",
    notes: "",
    source: ""
  };
};
