// Plik wygenerowany z js/settings.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function SocialLinks(_ref) {
  var settings = _ref.settings,
    setSettings = _ref.setSettings,
    dk = _ref.dk,
    txt = _ref.txt,
    sub = _ref.sub,
    border = _ref.border;
  var _React$useState = React.useState(function () {
      return settings.socialLinks || [];
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    links = _React$useState2[0],
    setLinks = _React$useState2[1];
  var saveToSettings = function saveToSettings(newLinks) {
    return setSettings(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        socialLinks: newLinks
      });
    });
  };
  var add = function add() {
    var newLinks = [].concat(_toConsumableArray(links), [{
      id: Date.now(),
      name: "",
      url: ""
    }]);
    setLinks(newLinks);
    saveToSettings(newLinks);
  };
  var upd = function upd(id, field, val) {
    return setLinks(function (ls) {
      return ls.map(function (l) {
        return l.id === id ? _objectSpread(_objectSpread({}, l), {}, _defineProperty({}, field, val)) : l;
      });
    });
  };
  var blur = function blur(newLinks) {
    return saveToSettings(newLinks);
  };
  var del = function del(id) {
    var newLinks = links.filter(function (l) {
      return l.id !== id;
    });
    setLinks(newLinks);
    saveToSettings(newLinks);
  };
  var inp = function inp() {
    var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread({
      padding: "9px 12px",
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none"
    }, extra);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8,
      paddingBottom: 4
    }
  }, links.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: sub,
      padding: "8px 0 12px"
    }
  }, "Brak link\xF3w \u2014 dodaj pierwszy poni\u017Cej."), links.map(function (l, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: sub,
        minWidth: 20,
        textAlign: "right"
      }
    }, i + 1, "."), /*#__PURE__*/React.createElement("input", {
      value: l.name,
      onChange: function onChange(e) {
        return upd(l.id, "name", e.target.value);
      },
      onBlur: function onBlur() {
        return blur(links.map(function (x) {
          return x.id === l.id ? _objectSpread(_objectSpread({}, x), {}, {
            name: x.name
          }) : x;
        }));
      },
      placeholder: "Nazwa (np. Facebook)",
      style: _objectSpread(_objectSpread({}, inp()), {}, {
        flex: "0 0 120px"
      })
    }), /*#__PURE__*/React.createElement("input", {
      value: l.url,
      onChange: function onChange(e) {
        return upd(l.id, "url", e.target.value);
      },
      onBlur: function onBlur() {
        return blur(links.map(function (x) {
          return x.id === l.id ? _objectSpread(_objectSpread({}, x), {}, {
            url: x.url
          }) : x;
        }));
      },
      placeholder: "https://...",
      style: _objectSpread(_objectSpread({}, inp()), {}, {
        flex: 1,
        minWidth: 0
      })
    }), l.url && /*#__PURE__*/React.createElement("a", {
      href: l.url,
      target: "_blank",
      rel: "noreferrer",
      style: {
        fontSize: 18,
        textDecoration: "none"
      }
    }, "\uD83D\uDD17"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return del(l.id);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        color: "#E05C5C",
        padding: "0 2px",
        flexShrink: 0
      }
    }, "\xD7"));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      background: dk ? "#1E2F4A" : "#EFF3FA",
      border: "none",
      borderRadius: 10,
      padding: "9px 16px",
      fontSize: 13,
      fontWeight: 600,
      color: "#3E6FB0",
      cursor: "pointer",
      fontFamily: "inherit",
      width: "100%",
      textAlign: "left"
    }
  }, "+ Dodaj kolejny"));
}
function SecuritySection(_ref2) {
  var dk = _ref2.dk,
    txt = _ref2.txt,
    sub = _ref2.sub,
    Row = _ref2.Row,
    Sec = _ref2.Sec;
  var sec = useContext(SecCtx);
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    wiz = _useState2[0],
    setWiz = _useState2[1]; // null | {step,...}
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    msg = _useState4[0],
    setMsg = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    audit = _useState6[0],
    setAudit = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    snaps = _useState8[0],
    setSnaps = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    busy = _useState0[0],
    setBusy = _useState0[1];
  var _useState1 = useState({
      old: "",
      n1: "",
      n2: "",
      open: false,
      err: ""
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    pw = _useState10[0],
    setPw = _useState10[1];
  if (!sec) return null;
  var on = sec.state === "on";
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var inp = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid ".concat(border),
    background: dk ? "#111826" : "#FAFCFD",
    color: txt,
    fontSize: 15,
    fontFamily: "inherit",
    boxSizing: "border-box",
    marginBottom: 10,
    outline: "none"
  };
  var btn = function btn(bg, fg) {
    return {
      background: bg,
      border: "none",
      borderRadius: 8,
      padding: "7px 14px",
      fontSize: 13,
      fontWeight: 700,
      color: fg,
      cursor: "pointer",
      fontFamily: "inherit"
    };
  };
  var big = {
    width: "100%",
    padding: "12px",
    borderRadius: 12,
    background: "#3E6FB0",
    color: "#fff",
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit"
  };
  var note = {
    fontSize: 13,
    color: sub,
    lineHeight: 1.5,
    marginBottom: 12
  };
  var startWizard = function startWizard() {
    return setWiz({
      step: 0,
      consent: false,
      p1: "",
      p2: "",
      err: "",
      prepared: null,
      recovery: "",
      saved: false,
      backedUp: false,
      progress: 0,
      total: 0,
      done: false
    });
  };
  var next = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var w, prepared, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            w = wiz;
            if (!(w.step === 1)) {
              _context.n = 7;
              break;
            }
            if (!(w.p1.length < 12)) {
              _context.n = 1;
              break;
            }
            setWiz(_objectSpread(_objectSpread({}, w), {}, {
              err: "Hasło musi mieć co najmniej 12 znaków."
            }));
            return _context.a(2);
          case 1:
            if (!(w.p1 !== w.p2)) {
              _context.n = 2;
              break;
            }
            setWiz(_objectSpread(_objectSpread({}, w), {}, {
              err: "Hasła nie są identyczne."
            }));
            return _context.a(2);
          case 2:
            setBusy(true);
            _context.p = 3;
            _context.n = 4;
            return sec.prepare(w.p1);
          case 4:
            prepared = _context.v;
            setWiz(_objectSpread(_objectSpread({}, w), {}, {
              step: 2,
              err: "",
              prepared: prepared,
              recovery: prepared.recovery
            }));
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            setWiz(_objectSpread(_objectSpread({}, w), {}, {
              err: "Nie udało się przygotować szyfrowania: " + (_t.message || "błąd")
            }));
          case 6:
            setBusy(false);
            return _context.a(2);
          case 7:
            setWiz(_objectSpread(_objectSpread({}, w), {}, {
              step: w.step + 1,
              err: ""
            }));
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[3, 5]]);
    }));
    return function next() {
      return _ref3.apply(this, arguments);
    };
  }();
  var runEncrypt = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            setBusy(true);
            setWiz(function (w) {
              return _objectSpread(_objectSpread({}, w), {}, {
                step: 4,
                err: ""
              });
            });
            _context2.p = 1;
            _context2.n = 2;
            return sec.enable(wiz.p1, function (i, total) {
              return setWiz(function (w) {
                return w ? _objectSpread(_objectSpread({}, w), {}, {
                  progress: i,
                  total: total
                }) : w;
              });
            }, {
              prepared: wiz.prepared,
              remember: true
            });
          case 2:
            setWiz(function (w) {
              return _objectSpread(_objectSpread({}, w), {}, {
                step: 5,
                done: true
              });
            });
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            setWiz(function (w) {
              return _objectSpread(_objectSpread({}, w), {}, {
                step: 3,
                err: _t2.message || "Błąd szyfrowania. Dane nie zostały zmienione."
              });
            });
          case 4:
            setBusy(false);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function runEncrypt() {
      return _ref4.apply(this, arguments);
    };
  }();
  var runDisable = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (window.confirm("Wyłączyć szyfrowanie? Dane w bazie wrócą do zwykłego, niezaszyfrowanego zapisu. Przed wyłączeniem pobierz kopię.")) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            setBusy(true);
            setMsg("Wyłączam szyfrowanie…");
            _context3.p = 2;
            _context3.n = 3;
            return sec.disable(function (i, t) {
              return setMsg("Wyłączam szyfrowanie… " + i + " z " + t);
            });
          case 3:
            setMsg("Szyfrowanie wyłączone.");
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            setMsg("Nie udało się: " + _t3.message);
          case 5:
            setBusy(false);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 4]]);
    }));
    return function runDisable() {
      return _ref5.apply(this, arguments);
    };
  }();
  var runAudit = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _t4, _t5;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            setBusy(true);
            setAudit(null);
            _context4.p = 1;
            _t4 = setAudit;
            _context4.n = 2;
            return sec.audit();
          case 2:
            _t4(_context4.v);
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t5 = _context4.v;
            setAudit({
              error: true
            });
          case 4:
            setBusy(false);
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 3]]);
    }));
    return function runAudit() {
      return _ref6.apply(this, arguments);
    };
  }();
  var savePw = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var _t6;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (!(pw.n1.length < 12)) {
              _context5.n = 1;
              break;
            }
            setPw(_objectSpread(_objectSpread({}, pw), {}, {
              err: "Nowe hasło musi mieć co najmniej 12 znaków."
            }));
            return _context5.a(2);
          case 1:
            if (!(pw.n1 !== pw.n2)) {
              _context5.n = 2;
              break;
            }
            setPw(_objectSpread(_objectSpread({}, pw), {}, {
              err: "Nowe hasła nie są identyczne."
            }));
            return _context5.a(2);
          case 2:
            setBusy(true);
            _context5.p = 3;
            _context5.n = 4;
            return sec.changePass(pw.old, pw.n1);
          case 4:
            setPw({
              old: "",
              n1: "",
              n2: "",
              open: false,
              err: ""
            });
            setMsg("Hasło szyfrowania zmienione.");
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t6 = _context5.v;
            setPw(_objectSpread(_objectSpread({}, pw), {}, {
              err: "Stare hasło jest nieprawidłowe."
            }));
          case 6:
            setBusy(false);
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[3, 5]]);
    }));
    return function savePw() {
      return _ref7.apply(this, arguments);
    };
  }();
  var loadSnaps = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var _t7, _t8;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            setBusy(true);
            setSnaps(null);
            _context6.p = 1;
            _t7 = setSnaps;
            _context6.n = 2;
            return sec.listSnaps();
          case 2:
            _t7(_context6.v);
            _context6.n = 4;
            break;
          case 3:
            _context6.p = 3;
            _t8 = _context6.v;
            setSnaps([]);
          case 4:
            setBusy(false);
          case 5:
            return _context6.a(2);
        }
      }, _callee6, null, [[1, 3]]);
    }));
    return function loadSnaps() {
      return _ref8.apply(this, arguments);
    };
  }();
  var downloadRecovery = function downloadRecovery() {
    var b = new Blob(["Klucz awaryjny ZubrzyckiFizjo (do odblokowania danych, gdy zapomnisz hasła szyfrowania)\n\n" + wiz.recovery + "\n\nPrzechowuj poza komputerem, w bezpiecznym miejscu. Kto ma ten klucz i dostęp do bazy, może odczytać dane.\n"], {
      type: "text/plain"
    });
    var u = URL.createObjectURL(b);
    var a = document.createElement("a");
    a.href = u;
    a.download = "klucz-awaryjny-zubrzyckifizjo.txt";
    a.click();
    URL.revokeObjectURL(u);
  };
  var stepBox = function stepBox(children) {
    return /*#__PURE__*/React.createElement(Modal, {
      title: "W\u0142\u0105czanie szyfrowania danych",
      onClose: function onClose() {
        if (!busy) setWiz(null);
      }
    }, children);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, {
    title: "BEZPIECZE\u0143STWO DANYCH"
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Szyfrowanie danych w bazie"
  }, on ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#3DAA72",
      fontWeight: 700
    }
  }, "\u2713 w\u0142\u0105czone") : sec.state === "locked" ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      fontWeight: 700
    }
  }, "zablokowane") : /*#__PURE__*/React.createElement("button", {
    onClick: startWizard,
    style: btn("#3E6FB0", "#fff")
  }, "W\u0142\u0105cz\u2026")), !on && sec.state === "off" && /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      paddingTop: 10
    })
  }, "Dane s\u0105 dzi\u015B zapisane w bazie jawnym tekstem (chroni je logowanie). Szyfrowanie sprawia, \u017Ce w bazie, w historii zmian i w kopiach le\u017Cy nieczytelny szyfr, a klucz masz tylko Ty."), on && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, {
    label: "Sprawd\u017A szyfrowanie"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: runAudit,
    disabled: busy,
    style: btn("#E1E9F5", "#3E6FB0")
  }, busy ? "…" : "Sprawdź")), audit && /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      paddingTop: 8
    })
  }, audit.error ? "Nie udało się sprawdzić." : "Zaszyfrowane: " + audit.enc.length + " zbiorów" + (audit.plain.length ? " · NIEzaszyfrowane: " + audit.plain.join(", ") : "") + (audit.missing.length ? " · jeszcze puste: " + audit.missing.length : "") + (audit.unreadable.length ? " · nieodczytane: " + audit.unreadable.length : "")), /*#__PURE__*/React.createElement(Row, {
    label: "Zmie\u0144 has\u0142o szyfrowania"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPw(_objectSpread(_objectSpread({}, pw), {}, {
        open: !pw.open,
        err: ""
      }));
    },
    style: btn("#E1E9F5", "#3E6FB0")
  }, pw.open ? "Anuluj" : "Zmień")), pw.open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Obecne has\u0142o szyfrowania",
    value: pw.old,
    onChange: function onChange(e) {
      return setPw(_objectSpread(_objectSpread({}, pw), {}, {
        old: e.target.value,
        err: ""
      }));
    },
    style: inp
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Nowe has\u0142o (min. 12 znak\xF3w)",
    value: pw.n1,
    onChange: function onChange(e) {
      return setPw(_objectSpread(_objectSpread({}, pw), {}, {
        n1: e.target.value,
        err: ""
      }));
    },
    style: inp
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Powt\xF3rz nowe has\u0142o",
    value: pw.n2,
    onChange: function onChange(e) {
      return setPw(_objectSpread(_objectSpread({}, pw), {}, {
        n2: e.target.value,
        err: ""
      }));
    },
    style: inp
  }), pw.err && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 8
    }
  }, pw.err), /*#__PURE__*/React.createElement("button", {
    onClick: savePw,
    disabled: busy || !pw.old || !pw.n1,
    style: big
  }, busy ? "Zapisuję…" : "Zapisz nowe hasło")), /*#__PURE__*/React.createElement(Row, {
    label: "Zapomnij klucz na tym urz\u0105dzeniu"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (window.confirm("Na tym urządzeniu apka znów poprosi o hasło szyfrowania. Kontynuować?")) sec.forgetKey();
    },
    style: btn("#E1E9F5", "#3E6FB0")
  }, "Zapomnij")), /*#__PURE__*/React.createElement(Row, {
    label: "Kopia jawna (bez szyfrowania)"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (window.confirm("Plik będzie zawierał dane pacjentów jawnym tekstem. Zadbaj o jego bezpieczne przechowywanie i usuń, gdy przestanie być potrzebny. Pobrać?")) sec.exportPlain();
    },
    style: btn("#FEE2E2", "#E05C5C")
  }, "Pobierz")), /*#__PURE__*/React.createElement(Row, {
    label: "Wy\u0142\u0105cz szyfrowanie"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: runDisable,
    disabled: busy,
    style: btn("#FEE2E2", "#E05C5C")
  }, "Wy\u0142\u0105cz\u2026"))), msg && /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      paddingTop: 8
    })
  }, msg)), /*#__PURE__*/React.createElement(Sec, {
    title: "KOPIE AUTOMATYCZNE W BAZIE"
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      paddingTop: 10
    })
  }, "Raz dziennie apka zapisuje w bazie kopi\u0119 wszystkich danych (ostatnie 7 dni). Chroni przed b\u0142\u0119dem aplikacji i pomy\u0142k\u0105. To nie zast\u0119puje kopii poza baz\u0105."), /*#__PURE__*/React.createElement(Row, {
    label: "Zr\xF3b kopi\u0119 teraz"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: busy,
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var ok;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            setBusy(true);
            _context7.n = 1;
            return sec.snapshotNow();
          case 1:
            ok = _context7.v;
            setMsg(ok ? "Kopia zapisana." : "Nie udało się zapisać kopii.");
            setBusy(false);
          case 2:
            return _context7.a(2);
        }
      }, _callee7);
    })),
    style: btn("#E1E9F5", "#3E6FB0")
  }, "Zapisz")), /*#__PURE__*/React.createElement(Row, {
    label: "Dost\u0119pne kopie"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: loadSnaps,
    disabled: busy,
    style: btn("#E1E9F5", "#3E6FB0")
  }, busy ? "…" : "Pokaż")), snaps && snaps.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      paddingTop: 8
    })
  }, "Brak kopii. Pierwsza zapisze si\u0119 przy najbli\u017Cszym otwarciu apki."), snaps && snaps.map(function (sn) {
    return /*#__PURE__*/React.createElement("div", {
      key: sn.slot,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        padding: "10px 0",
        borderBottom: "1px solid ".concat(dk ? "#1A2840" : "#F0F4F8")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: txt,
        fontWeight: 600
      }
    }, sn.error ? "nie udało się odczytać" : new Date(sn.savedAt).toLocaleString("pl-PL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit"
    })), !sn.error && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: sub
      }
    }, "wizyty ", sn.counts.visits, " \xB7 pacjenci ", sn.counts.patients, " \xB7 wypo\u017Cyczenia ", sn.counts.rentals, " \xB7 finanse ", sn.counts.finances)), !sn.error && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return sec.restoreSnap(sn);
      },
      style: btn("#FEE2E2", "#E05C5C")
    }, "Przywr\xF3\u0107"));
  })), wiz && wiz.step === 0 && stepBox(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Dane pacjent\xF3w b\u0119d\u0105 szyfrowane na tym urz\u0105dzeniu, zanim trafi\u0105 do bazy. W bazie zostanie nieczytelny szyfr. Klucz b\u0119dzie tylko u Ciebie."), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      color: "#E05C5C",
      fontWeight: 600
    })
  }, "Je\u015Bli zgubisz has\u0142o szyfrowania i klucz awaryjny, nikt nie odzyska danych: ani Ty, ani tw\xF3rca apki, ani Supabase."), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      fontSize: 14,
      color: txt,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: wiz.consent,
    onChange: function onChange(e) {
      return setWiz(_objectSpread(_objectSpread({}, wiz), {}, {
        consent: e.target.checked
      }));
    },
    style: {
      marginTop: 3
    }
  }), " Rozumiem i chc\u0119 w\u0142\u0105czy\u0107 szyfrowanie."), /*#__PURE__*/React.createElement("button", {
    disabled: !wiz.consent,
    onClick: next,
    style: _objectSpread(_objectSpread({}, big), {}, {
      opacity: wiz.consent ? 1 : 0.5
    })
  }, "Dalej"))), wiz && wiz.step === 1 && stepBox(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Wymy\u015Bl has\u0142o szyfrowania. To inne has\u0142o ni\u017C do logowania. Najlepiej d\u0142uga fraza z kilku s\u0142\xF3w (min. 12 znak\xF3w). Nie zapisuj go w apce."), /*#__PURE__*/React.createElement("input", {
    type: "password",
    autoFocus: true,
    placeholder: "Has\u0142o szyfrowania",
    value: wiz.p1,
    onChange: function onChange(e) {
      return setWiz(_objectSpread(_objectSpread({}, wiz), {}, {
        p1: e.target.value,
        err: ""
      }));
    },
    style: inp
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Powt\xF3rz has\u0142o",
    value: wiz.p2,
    onChange: function onChange(e) {
      return setWiz(_objectSpread(_objectSpread({}, wiz), {}, {
        p2: e.target.value,
        err: ""
      }));
    },
    style: inp
  }), wiz.err && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, wiz.err), /*#__PURE__*/React.createElement("button", {
    onClick: next,
    disabled: busy || !wiz.p1 || !wiz.p2,
    style: big
  }, busy ? "Przygotowuję…" : "Dalej"))), wiz && wiz.step === 2 && stepBox(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: note
  }, "To jest Tw\xF3j ", /*#__PURE__*/React.createElement("b", null, "klucz awaryjny"), ". Pozwoli odblokowa\u0107 dane, gdy zapomnisz has\u0142a. Zapisz go w bezpiecznym miejscu poza komputerem (kartka w szufladzie, sejf). Pokazuj\u0119 go tylko raz."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#0E141F" : "#EFF3FA",
      borderRadius: 10,
      padding: "14px",
      fontFamily: "monospace",
      fontSize: 16,
      letterSpacing: 1,
      textAlign: "center",
      color: txt,
      wordBreak: "break-all",
      marginBottom: 12,
      userSelect: "all"
    }
  }, wiz.recovery), /*#__PURE__*/React.createElement("button", {
    onClick: downloadRecovery,
    style: _objectSpread(_objectSpread({}, btn("#E1E9F5", "#3E6FB0")), {}, {
      marginBottom: 12
    })
  }, "\u2B07\uFE0F Pobierz jako plik"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      fontSize: 14,
      color: txt,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: wiz.saved,
    onChange: function onChange(e) {
      return setWiz(_objectSpread(_objectSpread({}, wiz), {}, {
        saved: e.target.checked
      }));
    },
    style: {
      marginTop: 3
    }
  }), " Zapisa\u0142em klucz awaryjny w bezpiecznym miejscu."), /*#__PURE__*/React.createElement("button", {
    disabled: !wiz.saved,
    onClick: next,
    style: _objectSpread(_objectSpread({}, big), {}, {
      opacity: wiz.saved ? 1 : 0.5
    })
  }, "Dalej"))), wiz && wiz.step === 3 && stepBox(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Zanim zaszyfrujemy dane, pobierz kopi\u0119 bezpiecze\u0144stwa. Je\u015Bli co\u015B p\xF3jdzie nie tak, b\u0119dziesz mia\u0142 pe\u0142n\u0105 kopi\u0119 w pliku."), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      sec.exportPlain();
      setWiz(_objectSpread(_objectSpread({}, wiz), {}, {
        backedUp: true
      }));
    },
    style: _objectSpread(_objectSpread({}, btn("#E1E9F5", "#3E6FB0")), {}, {
      marginBottom: 12
    })
  }, "\u2B07\uFE0F Pobierz kopi\u0119 bezpiecze\u0144stwa"), wiz.err && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, wiz.err), /*#__PURE__*/React.createElement("button", {
    disabled: !wiz.backedUp || busy,
    onClick: runEncrypt,
    style: _objectSpread(_objectSpread({}, big), {}, {
      opacity: wiz.backedUp ? 1 : 0.5
    })
  }, "Zaszyfruj dane"))), wiz && wiz.step === 4 && stepBox(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Szyfruj\u0119 i sprawdzam ka\u017Cdy zbi\xF3r danych. Nie zamykaj apki."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: dk ? "#2A3A56" : "#D9E2F0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: (wiz.total ? Math.round(wiz.progress / wiz.total * 100) : 0) + "%",
      background: "#3E6FB0",
      borderRadius: 4,
      transition: "width .2s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      marginTop: 8
    })
  }, wiz.progress, " z ", wiz.total || "…"))), wiz && wiz.step === 5 && stepBox(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      textAlign: "center",
      marginBottom: 8
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, note), {}, {
      textAlign: "center",
      color: txt
    })
  }, "Dane s\u0105 zaszyfrowane. Na tym urz\u0105dzeniu klucz jest zapami\u0119tany, wi\u0119c nie musisz wpisywa\u0107 has\u0142a przy ka\u017Cdym otwarciu."), /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Na innych urz\u0105dzeniach apka poprosi o has\u0142o szyfrowania. Od\u015Bwie\u017C je i zamknij stare karty z apk\u0105."), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setWiz(null);
    },
    style: big
  }, "Gotowe"))));
}

// pole "minuty" z zatwierdzaniem po wyjściu z pola (żeby wpisywanie np. "45" nie skakało po drodze)
// ── Miasta: podgląd, co apka wyłuskuje z adresów (do wspólnego kalendarza rodzinnego idzie samo miasto, bez ulicy) ──
// Nic się tu nie zapisuje: miasto jest zawsze z adresu. Jeśli go nie widać, wystarczy dopisać je do adresu pacjenta.
// Własna ramka i własne komponenty (nie "Sec"/"Row" z Settings), żeby nie odtwarzały się przy każdej zmianie ustawień.
function CitySection(_ref0) {
  var patients = _ref0.patients,
    rentals = _ref0.rentals,
    goToPatient = _ref0.goToPatient,
    dk = _ref0.dk,
    txt = _ref0.txt,
    sub = _ref0.sub,
    bg = _ref0.bg,
    demo = _ref0.demo;
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    open = _useState12[0],
    setOpen = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showAll = _useState14[0],
    setShowAll = _useState14[1];
  var K = useMemo(function () {
    return cityKnown([]);
  }, []);
  var data = useMemo(function () {
    var out = [];
    var noAddr = 0;
    (patients || []).filter(function (p) {
      return p && !p.anonymized && !p.archived;
    }).forEach(function (p) {
      if (!String(p.address || "").trim()) {
        noAddr++;
        return;
      }
      out.push({
        key: "p" + p.id,
        patId: p.id,
        name: p.name || "",
        address: p.address,
        res: cityOfPatient(p, K)
      });
    });
    // aktywne wypożyczenia klientów bez karty pacjenta
    (rentals || []).filter(function (r) {
      return r && r.status === "aktywne" && String(r.address || "").trim() && !(patients || []).some(function (p) {
        return r.patientId != null && p.id === r.patientId || r.patientName && p.name === r.patientName;
      });
    }).forEach(function (r) {
      return out.push({
        key: "r" + r.id,
        patId: null,
        name: r.patientName || "",
        address: r.address,
        res: cityOfRental(r, patients, K)
      });
    });
    return {
      out: out,
      noAddr: noAddr
    };
  }, [patients, rentals, K]);
  var none = data.out.filter(function (r) {
    return !r.res.city;
  });
  var guess = data.out.filter(function (r) {
    return r.res.city && r.res.conf === "guess";
  });
  var sure = data.out.filter(function (r) {
    return r.res.city && r.res.conf === "ok";
  });
  var line = function line(row) {
    return /*#__PURE__*/React.createElement("div", {
      key: row.key,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 0",
        borderBottom: "1px solid #EFF3FA"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, demo ? "Pacjent" : row.name || "(bez nazwy)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        overflowWrap: "anywhere"
      }
    }, maskAddr(demo, row.address)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: row.res.city ? row.res.conf === "guess" ? "#D9822B" : "#3DAA72" : "#E05C5C"
      }
    }, row.res.city ? "→ " + (demo ? "***" : row.res.city) : "→ nie widzę miasta w adresie")), row.patId != null && goToPatient && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setOpen(false);
        goToPatient(row.patId);
      },
      style: {
        background: "#E1E9F5",
        color: "#3E6FB0",
        border: "none",
        borderRadius: 8,
        padding: "7px 10px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
        flexShrink: 0
      }
    }, "Otw\xF3rz kart\u0119"));
  };
  var problems = none.length + guess.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 16,
      padding: "4px 16px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: sub,
      letterSpacing: 1,
      paddingTop: 12,
      paddingBottom: 4
    }
  }, "MIASTA W ADRESACH (WSP\xD3LNY KALENDARZ RODZINNY)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: txt,
      padding: "8px 0",
      lineHeight: 1.5
    }
  }, "Do kalendarza rodzinnego trafia z pracy samo miasto, wy\u0142uskane z adresu pacjenta. Rozpoznane: ", /*#__PURE__*/React.createElement("b", null, sure.length), " \xB7 do rzucenia okiem: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: guess.length ? "#D9822B" : "#3DAA72"
    }
  }, guess.length), " \xB7 bez miasta w adresie: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: none.length ? "#E05C5C" : "#3DAA72"
    }
  }, none.length), data.noAddr > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sub
    }
  }, " \xB7 pacjent\xF3w bez adresu: ", data.noAddr)), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setOpen(true);
    },
    style: {
      background: "#E1E9F5",
      border: "none",
      borderRadius: 8,
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 700,
      color: "#3E6FB0",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Zobacz miasta", problems ? " (" + problems + " do sprawdzenia)" : "")), open && /*#__PURE__*/React.createElement(Modal, {
    title: "Miasta z adres\xF3w",
    onClose: function onClose() {
      return setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "Miasto bierzemy z adresu, nic si\u0119 tu nie zapisuje. Gdy miasta nie wida\u0107, otw\xF3rz kart\u0119 i dopisz je do adresu, np. \u201Eul. Przyk\u0142adowa 1, Gliwice\"."), problems === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#3DAA72",
      fontWeight: 600,
      padding: "8px 0"
    }
  }, "W ka\u017Cdym adresie wida\u0107 miasto."), none.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#E05C5C",
      textTransform: "uppercase",
      letterSpacing: .5,
      margin: "6px 0 2px"
    }
  }, "Bez miasta w adresie (", none.length, ")"), none.map(line)), guess.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "#D9822B",
      textTransform: "uppercase",
      letterSpacing: .5,
      margin: "12px 0 2px"
    }
  }, "Zgadni\u0119te z ko\u0144ca adresu, sprawd\u017A (", guess.length, ")"), guess.map(line)), sure.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAll(function (v) {
        return !v;
      });
    },
    style: {
      background: "none",
      border: "none",
      color: "#3E6FB0",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      padding: 0,
      fontFamily: "inherit"
    }
  }, showAll ? "Ukryj rozpoznane" : "Pokaż rozpoznane (" + sure.length + ")"), showAll && sure.map(line))));
}
// Sekcja domyślnych czasów trwania. Celowo osobny komponent z własną ramką (a nie "Sec"/"Row" zdefiniowane wewnątrz Settings,
// które po każdej zmianie ustawień tworzą się na nowo i zabierałyby fokus z pola, do którego użytkownik właśnie przeszedł)
function DurSection(_ref1) {
  var settings = _ref1.settings,
    setSettings = _ref1.setSettings,
    dk = _ref1.dk,
    txt = _ref1.txt,
    sub = _ref1.sub,
    bg = _ref1.bg;
  var cur = durFromSettings(settings);
  var changed = JSON.stringify(cur) !== JSON.stringify(DUR_DEFAULTS);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 16,
      padding: "4px 16px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: sub,
      letterSpacing: 1,
      paddingTop: 12,
      paddingBottom: 4
    }
  }, "KALENDARZ \u2014 DOMY\u015ALNY CZAS TRWANIA"), Object.keys(DUR_DEFAULTS).map(function (k) {
    return /*#__PURE__*/React.createElement(DurRow, {
      key: k,
      kind: k,
      cur: cur[k],
      setSettings: setSettings,
      dk: dk,
      txt: txt
    });
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: sub,
      padding: "10px 0 12px",
      lineHeight: 1.5
    }
  }, "Tyle minut trwa nowy wpis, gdy nie ustawisz inaczej. Przy ka\u017Cdym wpisie godzin\u0119 ko\u0144ca mo\u017Cna zmieni\u0107. Zmiana tutaj nie rusza wpis\xF3w z ju\u017C zapisan\u0105 godzin\u0105 ko\u0144ca."), changed && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setSettings(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          durations: _objectSpread({}, DUR_DEFAULTS)
        });
      });
    },
    style: {
      background: "none",
      border: "none",
      color: "#3E6FB0",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
      padding: 0,
      fontFamily: "inherit"
    }
  }, "Przywr\xF3\u0107 domy\u015Blne (60 / 30 / 10 / 60)")));
}
function DurRow(_ref10) {
  var kind = _ref10.kind,
    cur = _ref10.cur,
    setSettings = _ref10.setSettings,
    dk = _ref10.dk,
    txt = _ref10.txt;
  var _useState15 = useState(String(cur)),
    _useState16 = _slicedToArray(_useState15, 2),
    val = _useState16[0],
    setVal = _useState16[1];
  useEffect(function () {
    setVal(String(cur));
  }, [cur]);
  var commit = function commit() {
    var n = durClamp(val);
    setVal(String(n || cur));
    if (n && n !== cur) setSettings(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        durations: _objectSpread(_objectSpread({}, durFromSettings(s)), {}, _defineProperty({}, kind, n))
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0",
      borderBottom: "1px solid ".concat(dk ? "#1A2840" : "#F0F4F8")
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: txt
    }
  }, DUR_LABELS[kind]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    inputMode: "numeric",
    value: val,
    onChange: function onChange(e) {
      return setVal(e.target.value.replace(/\D/g, "").slice(0, 3));
    },
    onBlur: commit,
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter") e.target.blur();
    },
    style: {
      width: 64,
      padding: "7px 8px",
      textAlign: "right",
      border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
      borderRadius: 10,
      fontSize: 15,
      background: dk ? "#111826" : "#FAFCFD",
      color: txt,
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "#7A8FA6"
    }
  }, "min")));
}
function Settings(_ref11) {
  var dark = _ref11.dark,
    setDark = _ref11.setDark,
    settings = _ref11.settings,
    setSettings = _ref11.setSettings,
    exportData = _ref11.exportData,
    importData = _ref11.importData,
    demo = _ref11.demo,
    setDemo = _ref11.setDemo,
    setRentals = _ref11.setRentals,
    setFinances = _ref11.setFinances,
    patients = _ref11.patients,
    rentals = _ref11.rentals,
    goToPatient = _ref11.goToPatient;
  var dk = dark;
  var bg = dk ? "#111826" : "#fff";
  var sec = dk ? "#0E141F" : "#EFF3FA";
  var txt = dk ? "#E8F5F5" : "#1C2B3A";
  var sub = "#7A8FA6";
  var Row = function Row(_ref12) {
    var label = _ref12.label,
      children = _ref12.children;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        borderBottom: "1px solid ".concat(dk ? "#1A2840" : "#F0F4F8")
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: txt
      }
    }, label), children);
  };
  var Toggle = function Toggle(_ref13) {
    var val = _ref13.val,
      onToggle = _ref13.onToggle;
    return /*#__PURE__*/React.createElement("div", {
      onClick: onToggle,
      style: {
        width: 44,
        height: 24,
        borderRadius: 12,
        background: val ? "#3E6FB0" : "#D0DCE8",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 3,
        left: val ? 23 : 3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#fff",
        transition: "left 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
      }
    }));
  };
  var Sec = function Sec(_ref14) {
    var title = _ref14.title,
      children = _ref14.children;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: bg,
        borderRadius: 16,
        padding: "4px 16px",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: sub,
        letterSpacing: 1,
        paddingTop: 12,
        paddingBottom: 4
      }
    }, title), children);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 12px 20px",
      background: sec,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 24,
      fontWeight: 800,
      color: txt,
      marginBottom: 16
    }
  }, "Ustawienia"), /*#__PURE__*/React.createElement(Sec, {
    title: "KONTO"
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Zalogowany"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, "\u2713 aktywna sesja")), /*#__PURE__*/React.createElement(Row, {
    label: "Wyloguj si\u0119"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      supaSignOut();
      window.location.reload();
    },
    style: {
      background: "#FEE2E2",
      border: "none",
      borderRadius: 8,
      padding: "7px 14px",
      fontSize: 13,
      fontWeight: 700,
      color: "#E05C5C",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Wyloguj"))), /*#__PURE__*/React.createElement(Sec, {
    title: "WYGL\u0104D"
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Tryb ciemny"
  }, /*#__PURE__*/React.createElement(Toggle, {
    val: dark,
    onToggle: function onToggle() {
      return setDark(function (d) {
        return !d;
      });
    }
  })), /*#__PURE__*/React.createElement(Row, {
    label: "Tryb demo (ukryj dane)"
  }, /*#__PURE__*/React.createElement(Toggle, {
    val: demo,
    onToggle: function onToggle() {
      return setDemo(function (d) {
        return !d;
      });
    }
  }))), /*#__PURE__*/React.createElement(Sec, {
    title: "DANE"
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Eksport kopii zapasowej"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: exportData,
    style: {
      background: "#3E6FB0",
      border: "none",
      borderRadius: 8,
      padding: "7px 14px",
      fontSize: 13,
      fontWeight: 700,
      color: "#fff",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "\u2B07\uFE0F Pobierz JSON")), /*#__PURE__*/React.createElement(Row, {
    label: "Importuj kopi\u0119 zapasow\u0105"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      background: "#E1E9F5",
      border: "none",
      borderRadius: 8,
      padding: "7px 14px",
      fontSize: 13,
      fontWeight: 700,
      color: "#3E6FB0",
      cursor: "pointer"
    }
  }, "\u2B06\uFE0F Wgraj JSON", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".json",
    onChange: importData,
    style: {
      display: "none"
    }
  }))), /*#__PURE__*/React.createElement(Row, {
    label: "Ostatnia pobrana kopia"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, settings.lastBackupAt ? function () {
    var d = Math.floor((Date.now() - new Date(settings.lastBackupAt).getTime()) / 86400000);
    return (d <= 0 ? "dziś" : d === 1 ? "wczoraj" : d + " dni temu") + " (" + new Date(settings.lastBackupAt).toLocaleDateString("pl-PL") + ")";
  }() : "jeszcze nie pobrano")), /*#__PURE__*/React.createElement(Row, {
    label: "Przypomnienie o kopii (raz w tygodniu)"
  }, /*#__PURE__*/React.createElement(Toggle, {
    val: settings.backupReminder !== false,
    onToggle: function onToggle() {
      return setSettings(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          backupReminder: s.backupReminder === false ? true : false
        });
      });
    }
  }))), /*#__PURE__*/React.createElement(DurSection, {
    settings: settings,
    setSettings: setSettings,
    dk: dk,
    txt: txt,
    sub: sub,
    bg: bg
  }), /*#__PURE__*/React.createElement(CitySection, {
    patients: patients,
    rentals: rentals,
    goToPatient: goToPatient,
    dk: dk,
    txt: txt,
    sub: sub,
    bg: bg,
    demo: demo
  }), /*#__PURE__*/React.createElement(SecuritySection, {
    dk: dk,
    txt: txt,
    sub: sub,
    Row: Row,
    Sec: Sec
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "LINKI \u2014 MEDIA SPO\u0141ECZNO\u015ACIOWE"
  }, /*#__PURE__*/React.createElement(SocialLinks, {
    settings: settings,
    setSettings: setSettings,
    dk: dk,
    txt: txt,
    sub: sub,
    border: dk ? "#2A3A56" : "#D9E2F0"
  })), /*#__PURE__*/React.createElement(Sec, {
    title: "INFORMACJE"
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Wersja aplikacji"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, "ZubrzyckiFizjo 1.0"))));
}
