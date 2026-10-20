// Plik wygenerowany z js/ui.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
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
function Toast(_ref) {
  var msg = _ref.msg,
    onDone = _ref.onDone;
  useEffect(function () {
    var t = setTimeout(onDone, 2200);
    return function () {
      return clearTimeout(t);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 90,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#1C2B3A",
      color: "#fff",
      borderRadius: 14,
      padding: "12px 20px",
      fontSize: 14,
      fontWeight: 600,
      zIndex: 999,
      boxShadow: "0 4px 20px rgba(0,0,0,.25)",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#3DAA72",
      fontSize: 16
    }
  }, "\u2713"), msg);
}
function Modal(_ref2) {
  var title = _ref2.title,
    onClose = _ref2.onClose,
    children = _ref2.children;
  var dk = useContext(DarkCtx);
  var scrollRef = useRef(null);
  var scrollPos = useRef(0);
  useEffect(function () {
    var el = scrollRef.current;
    if (!el) return;
    var save = function save() {
      scrollPos.current = el.scrollTop;
    };
    el.addEventListener("scroll", save, {
      passive: true
    });
    return function () {
      return el.removeEventListener("scroll", save);
    };
  }, []);
  useEffect(function () {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollPos.current;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.55)",
      zIndex: 100,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    onClick: function onClick(e) {
      return e.target === e.currentTarget && onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      background: dk ? "#111826" : "#fff",
      borderRadius: "24px 24px 0 0",
      width: "100%",
      maxWidth: 480,
      maxHeight: "92vh",
      overflowY: "auto",
      padding: "20px 20px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 19,
      fontWeight: 700,
      color: dk ? "#E8F5F5" : "#1C2B3A"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: dk ? "#18202F" : "#EFF3FA",
      border: "none",
      borderRadius: 10,
      width: 32,
      height: 32,
      cursor: "pointer",
      fontSize: 18,
      color: "#7A8FA6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\xD7")), children));
}
function ContactSyncModal(_ref3) {
  var items = _ref3.items,
    onConfirm = _ref3.onConfirm,
    onClose = _ref3.onClose;
  var _useState = useState(function () {
      return items.map(function () {
        return true;
      });
    }),
    _useState2 = _slicedToArray(_useState, 2),
    checked = _useState2[0],
    setChecked = _useState2[1];
  var grouped = {};
  items.forEach(function (it, i) {
    (grouped[it.field] = grouped[it.field] || []).push(_objectSpread(_objectSpread({}, it), {}, {
      _i: i
    }));
  });
  return /*#__PURE__*/React.createElement(Modal, {
    title: "Zaktualizowa\u0107 te\u017C w innych miejscach?",
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      marginBottom: 16
    }
  }, "Tu jest zapisana inna warto\u015B\u0107. Odznacz to, co ma zosta\u0107 bez zmian."), Object.entries(grouped).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      field = _ref5[0],
      rows = _ref5[1];
    return /*#__PURE__*/React.createElement("div", {
      key: field,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "#3E6FB0",
        textTransform: "uppercase",
        letterSpacing: .5,
        marginBottom: 8
      }
    }, (CONTACT_FIELDS[field] || field) + " → " + rows[0].value), rows.map(function (it) {
      return /*#__PURE__*/React.createElement("div", {
        key: it._i,
        onClick: function onClick() {
          return setChecked(function (c) {
            return c.map(function (v, i) {
              return i === it._i ? !v : v;
            });
          });
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 0",
          borderBottom: "1px solid #EFF3FA",
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 22,
          height: 22,
          borderRadius: 6,
          border: "2px solid ".concat(checked[it._i] ? "#3DAA72" : "#D9E2F0"),
          background: checked[it._i] ? "#3DAA72" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }
      }, checked[it._i] && /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#fff",
          fontSize: 13
        }
      }, "\u2713")), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600
        }
      }, it.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, "by\u0142o: ", it.oldValue)));
    }));
  }), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      return onConfirm(items.filter(function (_, i) {
        return checked[i];
      }));
    }
  }, "Zapisz zaznaczone"));
}
function Inp(_ref6) {
  var label = _ref6.label,
    value = _ref6.value,
    _onChange = _ref6.onChange,
    _ref6$type = _ref6.type,
    type = _ref6$type === void 0 ? "text" : _ref6$type,
    _ref6$placeholder = _ref6.placeholder,
    placeholder = _ref6$placeholder === void 0 ? "" : _ref6$placeholder;
  var dk = useContext(DarkCtx);
  var s = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 16,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value || "",
    placeholder: placeholder,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    style: _objectSpread(_objectSpread({}, s), {}, {
      flex: 1
    })
  }), type === "date" && value && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return _onChange("");
    },
    style: {
      flexShrink: 0,
      background: "none",
      border: "none",
      color: "#E05C5C",
      fontSize: 22,
      cursor: "pointer",
      padding: "0 2px",
      lineHeight: 1,
      fontFamily: "inherit"
    }
  }, "\xD7")));
}
function Txa(_ref7) {
  var label = _ref7.label,
    value = _ref7.value,
    _onChange2 = _ref7.onChange,
    _ref7$rows = _ref7.rows,
    rows = _ref7$rows === void 0 ? 3 : _ref7$rows,
    _ref7$placeholder = _ref7.placeholder,
    placeholder = _ref7$placeholder === void 0 ? "" : _ref7$placeholder;
  var dk = useContext(DarkCtx);
  var s = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 16,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit",
    resize: "vertical"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, label), /*#__PURE__*/React.createElement("textarea", {
    value: value || "",
    rows: rows,
    placeholder: placeholder,
    onChange: function onChange(e) {
      return _onChange2(e.target.value);
    },
    style: s
  }));
}
function Sel(_ref8) {
  var label = _ref8.label,
    value = _ref8.value,
    _onChange3 = _ref8.onChange,
    options = _ref8.options;
  var dk = useContext(DarkCtx);
  var s = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 16,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: function onChange(e) {
      return _onChange3(e.target.value);
    },
    style: s
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: o.value,
      value: o.value
    }, o.label);
  })));
}
function TimeSel(_ref9) {
  var label = _ref9.label,
    value = _ref9.value,
    _onChange4 = _ref9.onChange,
    allowEmpty = _ref9.allowEmpty;
  var dk = useContext(DarkCtx);
  var s = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 16,
    outline: "none",
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit"
  };
  var opts = [];
  for (var h = 0; h < 24; h++) for (var m = 0; m < 60; m += 5) {
    var hh = String(h).padStart(2, "0"),
      mm = String(m).padStart(2, "0");
    opts.push(hh + ":" + mm);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: allowEmpty ? value || "" : value || "10:00",
    onChange: function onChange(e) {
      return _onChange4(e.target.value);
    },
    style: s
  }, allowEmpty && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 brak \u2014"), opts.map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: o,
      value: o
    }, o);
  })));
}
function PatientPicker(_ref0) {
  var label = _ref0.label,
    value = _ref0.value,
    _onChange5 = _ref0.onChange,
    onSelect = _ref0.onSelect,
    patients = _ref0.patients;
  var dk = useContext(DarkCtx);
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    open = _useState4[0],
    setOpen = _useState4[1];
  var matches = (patients || []).filter(function (p) {
    return value && p.name.toLowerCase().includes(value.toLowerCase());
  }).slice(0, 6);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      position: "relative"
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    value: value || "",
    placeholder: "Wpisz imi\u0119 pacjenta...",
    onChange: function onChange(e) {
      _onChange5(e.target.value);
      setOpen(true);
    },
    onFocus: function onFocus() {
      return setOpen(true);
    },
    onBlur: function onBlur() {
      return setTimeout(function () {
        return setOpen(false);
      }, 150);
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
      borderRadius: 12,
      fontSize: 16,
      outline: "none",
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }), open && matches.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: dk ? "#18202F" : "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,.18)",
      zIndex: 200,
      overflow: "hidden"
    }
  }, matches.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onPointerDown: function onPointerDown(e) {
        e.preventDefault();
        _onChange5(p.name);
        if (onSelect) onSelect(p);
        setOpen(false);
      },
      style: {
        padding: "12px 16px",
        cursor: "pointer",
        borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA"),
        fontSize: 14,
        fontWeight: 500,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, p.name, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#7A8FA6",
        fontSize: 12
      }
    }, p.phone));
  })));
}
function EquipmentPicker(_ref1) {
  var label = _ref1.label,
    value = _ref1.value,
    onChange = _ref1.onChange,
    options = _ref1.options;
  var dk = useContext(DarkCtx);
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    open = _useState6[0],
    setOpen = _useState6[1];
  var current = options.find(function (o) {
    return o.value === value;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      position: "relative"
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: dk ? "#6B84AC" : "#3E5578",
      marginBottom: 5,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    },
    style: {
      width: "100%",
      padding: "13px 16px",
      border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
      borderRadius: 12,
      fontSize: 16,
      outline: "none",
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("span", null, current ? current.label : "—"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#7A8FA6",
      fontSize: 12
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setOpen(false);
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 190
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      marginTop: 4,
      background: dk ? "#18202F" : "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,.18)",
      zIndex: 200,
      overflow: "hidden",
      maxHeight: 280,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch"
    }
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement("div", {
      key: o.value,
      onClick: function onClick() {
        onChange(o.value);
        setOpen(false);
      },
      style: {
        padding: "10px 16px",
        cursor: "pointer",
        borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 500,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, o.label), o.sub && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#7A8FA6",
        marginTop: 1
      }
    }, o.sub));
  }))));
}
function ClockDisplay() {
  var _useState7 = useState(function () {
      return new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    t = _useState8[0],
    setT = _useState8[1];
  useEffect(function () {
    var i = setInterval(function () {
      return setT(new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    }, 1000);
    return function () {
      return clearInterval(i);
    };
  }, []);
  return /*#__PURE__*/React.createElement("span", null, t);
}
function getHolidays(year) {
  var a = year % 19,
    b = Math.floor(year / 100),
    c = year % 100;
  var d = Math.floor(b / 4),
    e = b % 4,
    f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3),
    h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4),
    k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31);
  var day = (h + l - 7 * m + 114) % 31 + 1;
  var easter = new Date(year, month - 1, day);
  var fmt = function fmt(d) {
    var y = d.getFullYear(),
      mo = String(d.getMonth() + 1).padStart(2, "0"),
      dd = String(d.getDate()).padStart(2, "0");
    return y + "-" + mo + "-" + dd;
  };
  var add = function add(d, n) {
    var r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  };
  // Mapa: "YYYY-MM-DD" -> nazwa święta
  var holidays = new Map([[year + "-01-01", "Nowy Rok"], [year + "-01-06", "Trzech Króli"], [fmt(easter), "Wielkanoc"], [fmt(add(easter, 1)), "Lany Poniedziałek"], [year + "-05-01", "Święto Pracy"], [year + "-05-03", "Święto Konstytucji 3 Maja"], [fmt(add(easter, 60)), "Boże Ciało"], [year + "-08-15", "Wniebowzięcie NMP"], [year + "-11-01", "Wszystkich Świętych"], [year + "-11-11", "Święto Niepodległości"], [year + "-12-24", "Wigilia"], [year + "-12-25", "Boże Narodzenie"], [year + "-12-26", "Drugi dzień Bożego Narodzenia"]]);
  return holidays;
}

// ── Bezpiecznik jednej zakładki ──────────────────────────────────────────────
// Błąd w wyświetlaniu jednej zakładki (np. przez uszkodzony wpis) nie zabiera reszty apki:
// nawigacja zostaje, a zakładka pokazuje komunikat. Dane w bazie nie są ruszane.
var TabBoundary = /*#__PURE__*/function (_React$Component) {
  function TabBoundary(props) {
    var _this;
    _classCallCheck(this, TabBoundary);
    _this = _callSuper(this, TabBoundary, [props]);
    _this.state = {
      err: null
    };
    return _this;
  }
  _inherits(TabBoundary, _React$Component);
  return _createClass(TabBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(e) {
      try {
        console.error("Błąd zakładki " + (this.props.name || ""), e);
      } catch (_unused) {}
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (!this.state.err) return this.props.children;
      var msg = String(this.state.err && this.state.err.message || this.state.err);
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 20,
          margin: 16,
          background: "#FEE2E2",
          border: "1.5px solid #E05C5C",
          borderRadius: 14,
          color: "#1C2B3A"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 16,
          color: "#B3261E",
          marginBottom: 8
        }
      }, "Ta zak\u0142adka nie mog\u0142a si\u0119 wy\u015Bwietli\u0107"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          lineHeight: 1.5,
          marginBottom: 10
        }
      }, "Prawdopodobnie kt\xF3ry\u015B zapis ma uszkodzone dane. Nic nie zosta\u0142o usuni\u0119te ani zmienione, a pozosta\u0142e zak\u0142adki dzia\u0142aj\u0105."), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontFamily: "monospace",
          color: "#4E5D6E",
          wordBreak: "break-all",
          marginBottom: 12
        }
      }, msg), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return _this2.setState({
            err: null
          });
        },
        style: {
          background: "#3E6FB0",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "9px 16px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      }, "Spr\xF3buj ponownie"));
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(e) {
      return {
        err: e
      };
    }
  }]);
}(React.Component); // ── Ustawienia szyny CPM: marka + udo + podudzie (pełne cm) + podpowiedź "ostatnio" ───────────────────
// value = {brand,thigh,shank}; autoBrand = marka wynikająca z wybranego sprzętu (wtedy nie da się jej zmienić);
// entries = historia ustawień pacjenta (cpmEntries). Podpowiedź niczego nie wpisuje sama: dopiero przycisk "Użyj".
function CpmFields(_ref10) {
  var value = _ref10.value,
    onChange = _ref10.onChange,
    autoBrand = _ref10.autoBrand,
    entries = _ref10.entries;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var v = value || {};
  var brand = autoBrand || (CPM_BRANDS.includes(v.brand) ? v.brand : null);
  var last = brand ? cpmLast(entries || [], brand) : null;
  var other = !last && brand || !brand ? (entries || []).find(function (e) {
    return e.brand && e.brand !== brand;
  }) : null;
  var same = !!last && cpmInt(v.thigh) === last.thigh && cpmInt(v.shank) === last.shank;
  var set = function set(patch) {
    return onChange(_objectSpread(_objectSpread({}, v), patch));
  };
  var inp = {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
    borderRadius: 12,
    fontSize: 16,
    outline: "none",
    background: dk ? "#111826" : "#FFFFFF",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontFamily: "inherit"
  };
  var lbl = {
    fontSize: 12,
    fontWeight: 600,
    color: dk ? "#6B84AC" : "#3E5578",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: .5
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
      background: dk ? "#141C2B" : "#F7FAFD"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#7C6AF4",
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 8
    }
  }, "\uD83E\uDDBF Ustawienia szyny (opcjonalnie)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, CPM_BRANDS.map(function (b) {
    var on = brand === b,
      off = !!autoBrand && autoBrand !== b;
    return /*#__PURE__*/React.createElement("button", {
      key: b,
      type: "button",
      disabled: off,
      onClick: function onClick() {
        return set({
          brand: b
        });
      },
      style: {
        flex: 1,
        padding: "9px 6px",
        borderRadius: 10,
        border: "1.5px solid ".concat(on ? "#7C6AF4" : dk ? "#2A3A56" : "#D9E2F0"),
        background: on ? "#7C6AF4" : dk ? "#111826" : "#fff",
        color: on ? "#fff" : dk ? "#E8F5F5" : "#1C2B3A",
        fontWeight: 600,
        fontSize: 14,
        cursor: off ? "default" : "pointer",
        opacity: off ? .4 : 1,
        fontFamily: "inherit"
      }
    }, b);
  })), last && !same && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
      padding: "8px 10px",
      borderRadius: 10,
      background: dk ? "#1B2740" : "#EEF3FB"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      color: dk ? "#B8C8E0" : "#3E5578"
    }
  }, "Ostatnio (", brand, ", ", cpmDate(last.date), "): ", /*#__PURE__*/React.createElement("b", null, cpmText(last, demo))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return set({
        brand: brand,
        thigh: last.thigh ? String(last.thigh) : "",
        shank: last.shank ? String(last.shank) : ""
      });
    },
    style: {
      flexShrink: 0,
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "7px 14px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "U\u017Cyj")), last && same && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "#3DAA72",
      fontWeight: 600,
      marginBottom: 8
    }
  }, "\u2713 tak samo jak ostatnio (", cpmDate(last.date), ")"), other && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: dk ? "#8FA3C0" : "#5A6F8C",
      marginBottom: 10
    }
  }, "Na ", other.brand, " by\u0142o (", cpmDate(other.date), "): ", cpmText(other, demo), " (inna skala, nie przenosz\u0119)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Udo (cm)"), /*#__PURE__*/React.createElement("input", {
    inputMode: "numeric",
    pattern: "[0-9]*",
    maxLength: 6,
    value: v.thigh || "",
    placeholder: "np. 45",
    onChange: function onChange(e) {
      return set({
        thigh: cpmDigits(e.target.value)
      });
    },
    style: inp
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lbl
  }, "Podudzie (cm)"), /*#__PURE__*/React.createElement("input", {
    inputMode: "numeric",
    pattern: "[0-9]*",
    maxLength: 6,
    value: v.shank || "",
    placeholder: "np. 38",
    onChange: function onChange(e) {
      return set({
        shank: cpmDigits(e.target.value)
      });
    },
    style: inp
  }))), (v.thigh || v.shank) && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return set({
        thigh: "",
        shank: ""
      });
    },
    style: {
      marginTop: 8,
      background: "none",
      border: "none",
      color: "#E05C5C",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      padding: 0,
      fontFamily: "inherit"
    }
  }, "\xD7 wyczy\u015B\u0107"));
}
