// Plik wygenerowany z js/auth.js przez build.py - nie edytowac recznie.
"use strict";

var _excluded = ["anthropicKey"];
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function PasswordResetScreen() {
  var dk = useContext(DarkCtx);
  var _React$useState = React.useState(""),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    pwd = _React$useState2[0],
    setPwd = _React$useState2[1];
  var _React$useState3 = React.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    pwd2 = _React$useState4[0],
    setPwd2 = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    status = _React$useState6[0],
    setStatus = _React$useState6[1];
  var _React$useState7 = React.useState(""),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    error = _React$useState8[0],
    setError = _React$useState8[1];
  var handleSave = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var r, d, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(pwd.length < 6)) {
              _context.n = 1;
              break;
            }
            setError("Hasło musi mieć min. 6 znaków");
            return _context.a(2);
          case 1:
            if (!(pwd !== pwd2)) {
              _context.n = 2;
              break;
            }
            setError("Hasła nie są identyczne");
            return _context.a(2);
          case 2:
            setStatus("saving");
            setError("");
            _context.p = 3;
            _context.n = 4;
            return fetch("".concat(SUPA_URL, "/auth/v1/user"), {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "apikey": SUPA_ANON,
                "Authorization": "Bearer ".concat(_supaToken)
              },
              body: JSON.stringify({
                password: pwd
              })
            });
          case 4:
            r = _context.v;
            if (!r.ok) {
              _context.n = 5;
              break;
            }
            setStatus("done");
            _context.n = 7;
            break;
          case 5:
            _context.n = 6;
            return r.json();
          case 6:
            d = _context.v;
            setError(d.message || "Błąd");
            setStatus(null);
          case 7:
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            setError("Błąd połączenia");
            setStatus(null);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[3, 8]]);
    }));
    return function handleSave() {
      return _ref.apply(this, arguments);
    };
  }();
  var inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid ".concat(error ? "#E05C5C" : dk ? "#2A3A56" : "#D9E2F0"),
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontSize: 16,
    fontFamily: "inherit",
    boxSizing: "border-box",
    marginBottom: 10
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: dk ? "#0E141F" : "#EFF3FA",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#3E6FB0",
      marginBottom: 8
    }
  }, "ZubrzyckiFizjo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#7A8FA6",
      marginBottom: 32
    }
  }, "Ustaw nowe has\u0142o"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 320,
      boxShadow: dk ? "0 4px 24px rgba(0,0,0,.3)" : "0 4px 24px rgba(16,40,40,.08)"
    }
  }, status === "done" ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 12
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: dk ? "#E8F5F5" : "#1C2B3A",
      marginBottom: 8
    }
  }, "Has\u0142o zmienione!"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      _supaToken = null;
      sessionStorage.removeItem("fizjo-token");
      sessionStorage.removeItem("fizjo-refresh");
      window.location.href = window.location.pathname;
    },
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: 12,
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Zaloguj si\u0119")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd,
    onChange: function onChange(e) {
      setPwd(e.target.value);
      setError("");
    },
    placeholder: "Nowe has\u0142o",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd2,
    onChange: function onChange(e) {
      setPwd2(e.target.value);
      setError("");
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && handleSave();
    },
    placeholder: "Powt\xF3rz has\u0142o",
    style: _objectSpread(_objectSpread({}, inputStyle), {}, {
      marginBottom: error ? 6 : 16
    })
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: handleSave,
    disabled: status === "saving" || !pwd || !pwd2,
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: 12,
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      fontSize: 16,
      fontWeight: 700,
      cursor: status === "saving" ? "wait" : "pointer",
      fontFamily: "inherit",
      opacity: status === "saving" ? 0.7 : 1
    }
  }, status === "saving" ? "Zapisywanie..." : "Zapisz hasło"))));
}
function LockScreen(_ref2) {
  var onUnlock = _ref2.onUnlock;
  var dk = useContext(DarkCtx);
  var _React$useState9 = React.useState(""),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    email = _React$useState0[0],
    setEmail = _React$useState0[1];
  var _React$useState1 = React.useState(""),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    pwd = _React$useState10[0],
    setPwd = _React$useState10[1];
  var _React$useState11 = React.useState(""),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    error = _React$useState12[0],
    setError = _React$useState12[1];
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    loading = _React$useState14[0],
    setLoading = _React$useState14[1];
  var check = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var res;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!(!email || !pwd)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setLoading(true);
            setError("");
            _context2.n = 2;
            return supaSignIn(email, pwd);
          case 2:
            res = _context2.v;
            setLoading(false);
            if (res.ok) {
              onUnlock();
            } else {
              setError(res.error);
              setPwd("");
            }
          case 3:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function check() {
      return _ref3.apply(this, arguments);
    };
  }();
  var inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid ".concat(error ? "#E05C5C" : dk ? "#2A3A56" : "#D9E2F0"),
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontSize: 16,
    fontFamily: "inherit",
    boxSizing: "border-box",
    marginBottom: 10
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: dk ? "#0E141F" : "#EFF3FA",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#3E6FB0",
      marginBottom: 8
    }
  }, "ZubrzyckiFizjo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#7A8FA6",
      marginBottom: 32
    }
  }, "Zaloguj si\u0119 aby kontynuowa\u0107"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 320,
      boxShadow: dk ? "0 4px 24px rgba(0,0,0,.3)" : "0 4px 24px rgba(16,40,40,.08)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && check();
    },
    autoFocus: true,
    placeholder: "Email",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pwd,
    onChange: function onChange(e) {
      setPwd(e.target.value);
      setError("");
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && check();
    },
    placeholder: "Has\u0142o",
    style: inputStyle
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: check,
    disabled: loading || !email || !pwd,
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: 12,
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      fontSize: 16,
      fontWeight: 700,
      cursor: loading ? "wait" : "pointer",
      fontFamily: "inherit",
      opacity: loading ? 0.7 : 1
    }
  }, loading ? "Logowanie..." : "Zaloguj się")));
}
function CryptoUnlockScreen(_ref4) {
  var onDone = _ref4.onDone;
  var dk = useContext(DarkCtx);
  var _React$useState15 = React.useState("pass"),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    mode = _React$useState16[0],
    setMode = _React$useState16[1]; // pass | recovery | newpass
  var _React$useState17 = React.useState(""),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    secret = _React$useState18[0],
    setSecret = _React$useState18[1];
  var _React$useState19 = React.useState(""),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    np1 = _React$useState20[0],
    setNp1 = _React$useState20[1];
  var _React$useState21 = React.useState(""),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    np2 = _React$useState22[0],
    setNp2 = _React$useState22[1];
  var _React$useState23 = React.useState(true),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    remember = _React$useState24[0],
    setRemember = _React$useState24[1];
  var _React$useState25 = React.useState(""),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    error = _React$useState26[0],
    setError = _React$useState26[1];
  var _React$useState27 = React.useState(false),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    busy = _React$useState28[0],
    setBusy = _React$useState28[1];
  var inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    border: "1.5px solid ".concat(error ? "#E05C5C" : dk ? "#2A3A56" : "#D9E2F0"),
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontSize: 16,
    fontFamily: "inherit",
    boxSizing: "border-box",
    marginBottom: 10,
    outline: "none"
  };
  var btn = {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    background: "#3E6FB0",
    color: "#fff",
    border: "none",
    fontSize: 16,
    fontWeight: 700,
    cursor: busy ? "wait" : "pointer",
    fontFamily: "inherit",
    opacity: busy ? 0.7 : 1
  };
  var link = {
    background: "none",
    border: "none",
    color: "#3E6FB0",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: 12,
    padding: 0
  };
  var unlockPass = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var ok;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (secret) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            setBusy(true);
            setError("");
            _context3.n = 2;
            return czUnlock(secret, {
              remember: remember
            });
          case 2:
            ok = _context3.v;
            setBusy(false);
            if (ok) onDone();else {
              setError("Nieprawidłowe hasło szyfrowania.");
              setSecret("");
            }
          case 3:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function unlockPass() {
      return _ref5.apply(this, arguments);
    };
  }();
  var checkRecovery = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _t2;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (secret) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            setBusy(true);
            setError("");
            _context4.p = 2;
            _context4.n = 3;
            return czDekFromRecovery(FZ_CRYPTO.meta, secret, false);
          case 3:
            setBusy(false);
            setMode("newpass");
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t2 = _context4.v;
            setBusy(false);
            setError("Nieprawidłowy klucz awaryjny.");
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4]]);
    }));
    return function checkRecovery() {
      return _ref6.apply(this, arguments);
    };
  }();
  var setNewPass = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (!(np1.length < 12)) {
              _context5.n = 1;
              break;
            }
            setError("Nowe hasło musi mieć co najmniej 12 znaków.");
            return _context5.a(2);
          case 1:
            if (!(np1 !== np2)) {
              _context5.n = 2;
              break;
            }
            setError("Hasła nie są identyczne.");
            return _context5.a(2);
          case 2:
            setBusy(true);
            setError("");
            _context5.p = 3;
            _context5.n = 4;
            return czChangePass(secret, np1, {
              viaRecovery: true
            });
          case 4:
            setBusy(false);
            onDone();
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t3 = _context5.v;
            setBusy(false);
            setError("Nie udało się ustawić nowego hasła: " + (_t3.message || "błąd"));
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[3, 5]]);
    }));
    return function setNewPass() {
      return _ref7.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: dk ? "#0E141F" : "#EFF3FA",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 28,
      fontWeight: 800,
      color: "#3E6FB0",
      marginBottom: 8
    }
  }, "ZubrzyckiFizjo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "#7A8FA6",
      marginBottom: 24,
      textAlign: "center",
      maxWidth: 300
    }
  }, mode === "newpass" ? "Klucz awaryjny przyjęty. Ustaw nowe hasło szyfrowania." : "Dane są zaszyfrowane. Wpisz hasło szyfrowania, żeby je odblokować."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: 24,
      width: "100%",
      maxWidth: 320,
      boxShadow: dk ? "0 4px 24px rgba(0,0,0,.3)" : "0 4px 24px rgba(16,40,40,.08)"
    }
  }, mode === "pass" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: secret,
    autoFocus: true,
    onChange: function onChange(e) {
      setSecret(e.target.value);
      setError("");
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && unlockPass();
    },
    placeholder: "Has\u0142o szyfrowania",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      fontSize: 13,
      color: dk ? "#C8E8E8" : "#1C2B3A",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: remember,
    onChange: function onChange(e) {
      return setRemember(e.target.checked);
    }
  }), " Zapami\u0119taj na tym urz\u0105dzeniu"), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: unlockPass,
    disabled: busy || !secret,
    style: btn
  }, busy ? "Odblokowuję…" : "Odblokuj"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: link,
    onClick: function onClick() {
      setMode("recovery");
      setSecret("");
      setError("");
    }
  }, "Nie pami\u0119tam has\u0142a, mam klucz awaryjny"))), mode === "recovery" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: secret,
    autoFocus: true,
    onChange: function onChange(e) {
      setSecret(e.target.value);
      setError("");
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && checkRecovery();
    },
    placeholder: "Klucz awaryjny (XXXX-XXXX-\u2026)",
    style: inputStyle
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: checkRecovery,
    disabled: busy || !secret,
    style: btn
  }, busy ? "Sprawdzam…" : "Dalej"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: link,
    onClick: function onClick() {
      setMode("pass");
      setSecret("");
      setError("");
    }
  }, "Wr\xF3\u0107"))), mode === "newpass" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: np1,
    autoFocus: true,
    onChange: function onChange(e) {
      setNp1(e.target.value);
      setError("");
    },
    placeholder: "Nowe has\u0142o (min. 12 znak\xF3w)",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: np2,
    onChange: function onChange(e) {
      setNp2(e.target.value);
      setError("");
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && setNewPass();
    },
    placeholder: "Powt\xF3rz nowe has\u0142o",
    style: inputStyle
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#E05C5C",
      marginBottom: 10
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: setNewPass,
    disabled: busy || !np1 || !np2,
    style: btn
  }, busy ? "Zapisuję…" : "Ustaw hasło i odblokuj"))), /*#__PURE__*/React.createElement("button", {
    style: _objectSpread(_objectSpread({}, link), {}, {
      marginTop: 20
    }),
    onClick: function onClick() {
      supaSignOut();
      window.location.reload();
    }
  }, "Wyloguj si\u0119"));
}
function AppWrapper() {
  var _React$useState29 = React.useState(false),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    unlocked = _React$useState30[0],
    setUnlocked = _React$useState30[1];
  var _React$useState31 = React.useState(false),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    authChecked = _React$useState32[0],
    setAuthChecked = _React$useState32[1];
  var _React$useState33 = React.useState(false),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    isRecovery = _React$useState34[0],
    setIsRecovery = _React$useState34[1];
  React.useEffect(function () {
    var hash = window.location.hash;
    if (hash && hash.includes("type=recovery") && hash.includes("access_token=")) {
      try {
        var params = new URLSearchParams(hash.slice(1));
        var token = params.get("access_token");
        if (token) {
          _supaToken = token;
          setIsRecovery(true);
          setAuthChecked(true);
          return;
        }
      } catch (_unused3) {}
    }
    var t = sessionStorage.getItem("fizjo-token");
    if (t) {
      // Weryfikuj token przez testowe zapytanie
      _supaToken = t;
      fetch("".concat(SUPA_URL, "/rest/v1/app_data?key=eq.fizjo-settings&select=key"), {
        headers: {
          "apikey": SUPA_ANON,
          "Authorization": "Bearer ".concat(t)
        }
      }).then(function (r) {
        if (r.status === 200 || r.status === 201) {
          setUnlocked(true);
          setAuthChecked(true);
        } else {
          // Token wygasł — spróbuj refresh
          supaRefresh().then(function (ok) {
            if (ok) {
              setUnlocked(true);
            } else {
              sessionStorage.removeItem("fizjo-token");
              sessionStorage.removeItem("fizjo-refresh");
            }
            setAuthChecked(true);
          });
        }
      })["catch"](function () {
        setAuthChecked(true);
      });
    } else {
      setAuthChecked(true);
    }
  }, []);

  // Szyfrowanie: po zalogowaniu ustalamy, czy dane są zaszyfrowane; dopóki to nie jest jasne, niczego nie wczytujemy ani nie zapisujemy
  var _useState = useState("checking"),
    _useState2 = _slicedToArray(_useState, 2),
    cryptoState = _useState2[0],
    setCryptoState = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    cryptoTick = _useState4[0],
    setCryptoTick = _useState4[1];
  var cryptoFails = React.useRef(0);
  React.useEffect(function () {
    if (!unlocked) return;
    var dead = false,
      timer = null;
    czInit().then(function (st) {
      if (dead) return;
      if (st === "error") {
        // 3 nieudane próby: nie blokujemy apki (zapisy i tak ruszą dopiero po poprawnym wczytaniu danych, a zaszyfrowany wiersz bez klucza się nie wczyta)
        if (++cryptoFails.current >= 3) {
          FZ_CRYPTO.state = "off";
          setCryptoState("off");
          return;
        }
        timer = setTimeout(function () {
          return setCryptoTick(function (n) {
            return n + 1;
          });
        }, 3000);
        return;
      }
      cryptoFails.current = 0;
      setCryptoState(st);
    });
    return function () {
      dead = true;
      clearTimeout(timer);
    };
  }, [unlocked, cryptoTick]);
  React.useEffect(function () {
    var h = function h() {
      setCryptoState("checking");
      setCryptoTick(function (n) {
        return n + 1;
      });
    };
    window.addEventListener("fizjo-crypto-changed", h);
    return function () {
      return window.removeEventListener("fizjo-crypto-changed", h);
    };
  }, []);
  var dataReady = unlocked && (cryptoState === "off" || cryptoState === "on");
  var _usePersistedState = usePersistedState("fizjo-visits", [], dataReady),
    _usePersistedState2 = _slicedToArray(_usePersistedState, 3),
    visits = _usePersistedState2[0],
    setVisits = _usePersistedState2[1],
    v1 = _usePersistedState2[2];
  var _usePersistedState3 = usePersistedState("fizjo-patients", [], dataReady),
    _usePersistedState4 = _slicedToArray(_usePersistedState3, 3),
    patients = _usePersistedState4[0],
    setPatients = _usePersistedState4[1],
    v2 = _usePersistedState4[2];
  // Migracja: nadaj id wizytom które go nie mają — uruchamia się po załadowaniu z Supabase
  // Zapis tylko gdy naprawdę jest co uzupełnić (inaczej każde otwarcie apki przepisywałoby dane w bazie)
  React.useEffect(function () {
    if (!v1) return; // czekaj na załadowanie
    if (!(visits || []).some(function (v) {
      return !v.id;
    })) return;
    setVisits(function (vs) {
      return vs.map(function (v) {
        return v.id ? v : _objectSpread(_objectSpread({}, v), {}, {
          id: Date.now() + Math.random()
        });
      });
    });
  }, [v1]);
  React.useEffect(function () {
    if (!v2) return;
    if (!(patients || []).some(function (p) {
      return !p.id;
    })) return;
    setPatients(function (ps) {
      return ps.map(function (p) {
        return p.id ? p : _objectSpread(_objectSpread({}, p), {}, {
          id: Date.now() + Math.random()
        });
      });
    });
  }, [v2]);
  var _usePersistedState5 = usePersistedState("fizjo-rentals", [], dataReady),
    _usePersistedState6 = _slicedToArray(_usePersistedState5, 3),
    rentals = _usePersistedState6[0],
    setRentals = _usePersistedState6[1],
    v3 = _usePersistedState6[2];
  var _usePersistedState7 = usePersistedState("fizjo-finances", [], dataReady),
    _usePersistedState8 = _slicedToArray(_usePersistedState7, 3),
    finances = _usePersistedState8[0],
    setFinances = _usePersistedState8[1],
    v4 = _usePersistedState8[2];
  var _usePersistedState9 = usePersistedState("fizjo-stock", {}, dataReady),
    _usePersistedState0 = _slicedToArray(_usePersistedState9, 3),
    stock = _usePersistedState0[0],
    setStock = _usePersistedState0[1],
    v5 = _usePersistedState0[2];
  var _usePersistedState1 = usePersistedState("fizjo-nfz", [], dataReady),
    _usePersistedState10 = _slicedToArray(_usePersistedState1, 3),
    nfzCases = _usePersistedState10[0],
    setNfzCases = _usePersistedState10[1],
    v6 = _usePersistedState10[2];
  var _usePersistedState11 = usePersistedState("fizjo-todos", [], dataReady),
    _usePersistedState12 = _slicedToArray(_usePersistedState11, 3),
    todos = _usePersistedState12[0],
    setTodos = _usePersistedState12[1],
    v7 = _usePersistedState12[2];
  var _usePersistedState13 = usePersistedState("fizjo-events", [], dataReady),
    _usePersistedState14 = _slicedToArray(_usePersistedState13, 3),
    events = _usePersistedState14[0],
    setEvents = _usePersistedState14[1],
    v9 = _usePersistedState14[2];
  var _usePersistedState15 = usePersistedState("fizjo-settings", {
      backupReminder: true
    }, dataReady),
    _usePersistedState16 = _slicedToArray(_usePersistedState15, 3),
    settings = _usePersistedState16[0],
    setSettings = _usePersistedState16[1],
    v8 = _usePersistedState16[2];
  var durs = React.useMemo(function () {
    return durFromSettings(settings);
  }, [settings]);
  var _usePersistedState17 = usePersistedState("fizjo-budget", {}, dataReady),
    _usePersistedState18 = _slicedToArray(_usePersistedState17, 3),
    budget = _usePersistedState18[0],
    setBudget = _usePersistedState18[1],
    v10 = _usePersistedState18[2];
  var _usePersistedState19 = usePersistedState("fizjo-machines", [], dataReady),
    _usePersistedState20 = _slicedToArray(_usePersistedState19, 3),
    machines = _usePersistedState20[0],
    setMachines = _usePersistedState20[1],
    v11 = _usePersistedState20[2];
  var _usePersistedState21 = usePersistedState("fizjo-wealth", emptyWealth(), dataReady),
    _usePersistedState22 = _slicedToArray(_usePersistedState21, 3),
    wealth = _usePersistedState22[0],
    setWealth = _usePersistedState22[1],
    v12 = _usePersistedState22[2];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    dark = _useState6[0],
    setDark = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    demo = _useState8[0],
    setDemo = _useState8[1];

  // Jednorazowe czyszczenie: klucz Anthropic API nie jest już trzymany w bazie
  // (przeniesiony na serwer w api/scan-receipt.js) — usuń stary, jeśli został zapisany wcześniej
  React.useEffect(function () {
    if (settings && settings.anthropicKey !== undefined) {
      setSettings(function (s) {
        var anthropicKey = s.anthropicKey,
          rest = _objectWithoutProperties(s, _excluded);
        return rest;
      });
    }
  }, [settings]);
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showBackupBanner = _useState0[0],
    setShowBackupBanner = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    backupAgeDays = _useState10[0],
    setBackupAgeDays = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showConflictBanner = _useState12[0],
    setShowConflictBanner = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    sessionExpired = _useState14[0],
    setSessionExpired = _useState14[1];
  React.useEffect(function () {
    var h = function h() {
      return setSessionExpired(true);
    };
    window.addEventListener("fizjo-session-expired", h);
    return function () {
      return window.removeEventListener("fizjo-session-expired", h);
    };
  }, []);
  // Cichy keep-alive: odnawia logowanie, dopóki apka jest otwarta (nic nie wylogowuje)
  React.useEffect(function () {
    if (unlocked) return startAuthKeepAlive();
  }, [unlocked]);
  var _useState15 = useState([]),
    _useState16 = _slicedToArray(_useState15, 2),
    loadFail = _useState16[0],
    setLoadFail = _useState16[1];
  React.useEffect(function () {
    var h = function h(e) {
      return setLoadFail(e.detail || []);
    };
    window.addEventListener("fizjo-load-error", h);
    return function () {
      return window.removeEventListener("fizjo-load-error", h);
    };
  }, []);
  React.useEffect(function () {
    var h = function h() {
      return setShowConflictBanner(true);
    };
    window.addEventListener("fizjo-conflict", h);
    return function () {
      return window.removeEventListener("fizjo-conflict", h);
    };
  }, []);
  var buildBackup = function buildBackup() {
    return {
      visits: visits,
      patients: patients,
      rentals: rentals,
      finances: finances,
      stock: stock,
      nfzCases: nfzCases,
      todos: todos,
      events: events,
      budget: budget,
      wealth: wealth,
      machines: machines,
      exportedAt: new Date().toISOString()
    };
  };
  var downloadJson = function downloadJson(data, name) {
    var blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };
  // kopia bezpieczeństwa: gdy dane są szyfrowane, plik też jest zaszyfrowany (stan zrzucamy od razu, zapis pliku może chwilę potrwać)
  var downloadSafetyBackup = function downloadSafetyBackup(name) {
    var snap = buildBackup();
    if (FZ_CRYPTO.state === "on" && FZ_CRYPTO.meta) {
      var m = FZ_CRYPTO.meta;
      czEncrypt("fizjo-export", snap).then(function (env) {
        return downloadJson({
          format: "fizjo-enc-backup",
          v: 1,
          kdf: m.kdf,
          wrapPass: m.wrapPass,
          wrapRec: m.wrapRec,
          check: m.check,
          env: env
        }, name.replace(".json", "-ZASZYFROWANA.json"));
      });
    } else downloadJson(snap, name);
  };
  var markBackupDone = function markBackupDone() {
    return setSettings(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        lastBackupAt: new Date().toISOString()
      });
    });
  };
  var exportData = function exportData() {
    downloadSafetyBackup("fizjo-backup-" + new Date().toISOString().slice(0, 10) + ".json");
    markBackupDone();
    setShowBackupBanner(false);
  };

  // Wczytanie kopii: sprawdza dane, pokazuje co zostanie zastąpione, prosi o zgodę i zapisuje kopię obecnych danych
  // (używane przez import z pliku i przez przywracanie kopii automatycznej)
  var applyBackup = function applyBackup(d) {
    try {
      var LISTS = [["visits", "wizyty", visits], ["patients", "pacjenci", patients], ["rentals", "wypożyczenia", rentals], ["finances", "wpisy finansowe", finances], ["nfzCases", "sprawy wózków", nfzCases], ["todos", "zadania", todos], ["events", "wydarzenia", events], ["machines", "sztuki sprzętu", machines]];
      var OBJS = [["stock", "magazyn", stock], ["budget", "budżet", budget], ["wealth", "majątek", wealth]];
      if (!d || _typeof(d) !== "object" || Array.isArray(d) || ![].concat(LISTS, OBJS).some(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
          k = _ref9[0];
        return d[k] !== undefined;
      })) {
        alert("W tym pliku nie ma danych z tej aplikacji. Nic nie zostało zmienione.");
        return;
      }
      var bad = [].concat(_toConsumableArray(LISTS.filter(function (_ref0) {
        var _ref1 = _slicedToArray(_ref0, 1),
          k = _ref1[0];
        return d[k] !== undefined && !Array.isArray(d[k]);
      })), _toConsumableArray(OBJS.filter(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 1),
          k = _ref11[0];
        return d[k] !== undefined && (d[k] === null || _typeof(d[k]) !== "object" || Array.isArray(d[k]));
      })));
      if (bad.length) {
        alert("Plik jest uszkodzony (zły format: " + bad.map(function (x) {
          return x[1];
        }).join(", ") + "). Nic nie zostało zmienione.");
        return;
      }
      var lines = LISTS.filter(function (_ref12) {
        var _ref13 = _slicedToArray(_ref12, 1),
          k = _ref13[0];
        return d[k] !== undefined;
      }).map(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 3),
          k = _ref15[0],
          label = _ref15[1],
          cur = _ref15[2];
        return "• " + label + ": teraz " + (cur || []).length + ", w pliku " + d[k].length;
      });
      var objNames = OBJS.filter(function (_ref16) {
        var _ref17 = _slicedToArray(_ref16, 1),
          k = _ref17[0];
        return d[k] !== undefined;
      }).map(function (x) {
        return x[1];
      });
      var when = d.exportedAt ? String(d.exportedAt).slice(0, 10) : "nieznanej daty";
      var msg = "Wczytujesz kopię z dnia " + when + ".\n\nTo ZASTĄPI obecne dane:\n" + lines.join("\n") + (objNames.length ? "\n• oraz: " + objNames.join(", ") : "") + "\n\nPrzed wczytaniem pobiorę kopię obecnych danych. Kontynuować?";
      if (!window.confirm(msg)) return;
      try {
        downloadSafetyBackup("fizjo-backup-PRZED-importem-" + new Date().toISOString().slice(0, 16).replace(":", "-") + ".json");
      } catch (_unused4) {}
      allowShrinkFor(15000);
      if (d.visits) setVisits(d.visits);
      if (d.patients) setPatients(d.patients);
      if (d.rentals) setRentals(d.rentals);
      if (d.finances) setFinances(d.finances);
      if (d.stock) setStock(d.stock);
      if (d.nfzCases) setNfzCases(d.nfzCases);
      if (d.todos) setTodos(d.todos);
      if (d.events) setEvents(d.events);
      if (d.budget) setBudget(d.budget);
      if (d.wealth) setWealth(d.wealth);
      if (d.machines) setMachines(d.machines);
      alert("Kopia wczytana. Kopia poprzednich danych została pobrana jako plik fizjo-backup-PRZED-importem-….");
    } catch (err) {
      alert("Błąd importu: " + err.message);
    }
  };
  // plik z kopią zaszyfrowaną: hasło szyfrowania albo klucz awaryjny; zwraca dane jawne albo null
  var readEncryptedBackup = /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(f) {
      var meta, secret, dek, _t4, _t5, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            meta = {
              kdf: f.kdf,
              wrapPass: f.wrapPass,
              wrapRec: f.wrapRec,
              check: f.check
            };
            secret = window.prompt("Ta kopia jest zaszyfrowana. Wpisz hasło szyfrowania (albo klucz awaryjny):");
            if (secret) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, null);
          case 1:
            dek = null;
            _context6.p = 2;
            _context6.n = 3;
            return czDekFromPass(meta, secret, false);
          case 3:
            dek = _context6.v;
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t4 = _context6.v;
          case 5:
            if (dek) {
              _context6.n = 9;
              break;
            }
            _context6.p = 6;
            _context6.n = 7;
            return czDekFromRecovery(meta, secret, false);
          case 7:
            dek = _context6.v;
            _context6.n = 9;
            break;
          case 8:
            _context6.p = 8;
            _t5 = _context6.v;
          case 9:
            if (dek) {
              _context6.n = 10;
              break;
            }
            alert("Nieprawidłowe hasło lub klucz. Nic nie zostało zmienione.");
            return _context6.a(2, null);
          case 10:
            _context6.p = 10;
            _context6.n = 11;
            return czDecrypt("fizjo-export", f.env, dek);
          case 11:
            return _context6.a(2, _context6.v);
          case 12:
            _context6.p = 12;
            _t6 = _context6.v;
            alert("Nie udało się odszyfrować pliku (może być uszkodzony). Nic nie zostało zmienione.");
            return _context6.a(2, null);
        }
      }, _callee6, null, [[10, 12], [6, 8], [2, 4]]);
    }));
    return function readEncryptedBackup(_x) {
      return _ref18.apply(this, arguments);
    };
  }();
  var importData = function importData(e) {
    var input = e.target;
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = /*#__PURE__*/function () {
      var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(ev) {
        var d, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              d = JSON.parse(ev.target.result);
              _context7.n = 2;
              break;
            case 1:
              _context7.p = 1;
              _t7 = _context7.v;
              alert("To nie jest poprawny plik kopii (nie da się go odczytać). Nic nie zostało zmienione.");
              return _context7.a(2);
            case 2:
              if (!(d && d.format === "fizjo-enc-backup")) {
                _context7.n = 4;
                break;
              }
              _context7.n = 3;
              return readEncryptedBackup(d);
            case 3:
              d = _context7.v;
              if (d) {
                _context7.n = 4;
                break;
              }
              return _context7.a(2);
            case 4:
              applyBackup(d);
            case 5:
              return _context7.a(2);
          }
        }, _callee7, null, [[0, 1]]);
      }));
      return function (_x2) {
        return _ref19.apply(this, arguments);
      };
    }();
    reader.readAsText(file);
    input.value = "";
  };
  // Codzienna kopia w bazie (7 miejsc według dnia tygodnia, nadpisywane co tydzień) — chroni przed błędem apki i pomyłką
  var allLoaded = !!(v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v10 && v11 && v12);
  React.useEffect(function () {
    if (!dataReady || !allLoaded) return;
    if ((visits || []).length === 0 && (patients || []).length === 0) return; // pusty stan nigdy nie nadpisuje dobrych kopii
    var today = todayLocal();
    try {
      if (localStorage.getItem("fizjo-snap-last") === today) return;
    } catch (_unused9) {}
    var dead = false;
    var slot = new Date().getDay();
    _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var ts, done, ok;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return czSlotTs(slot);
          case 1:
            ts = _context8.v;
            if (!(dead || ts === null)) {
              _context8.n = 2;
              break;
            }
            return _context8.a(2);
          case 2:
            // nie wiemy, co jest w bazie: nie ryzykujemy
            done = function done() {
              try {
                localStorage.setItem("fizjo-snap-last", today);
              } catch (_unused0) {}
            };
            if (!(ts > 0 && new Date(ts).toLocaleDateString("sv-SE") === today)) {
              _context8.n = 3;
              break;
            }
            done();
            return _context8.a(2);
          case 3:
            _context8.n = 4;
            return dbSet("fizjo-backup-" + slot, {
              savedAt: new Date().toISOString(),
              data: buildBackup()
            });
          case 4:
            ok = _context8.v;
            if (ok && !dead) done();
          case 5:
            return _context8.a(2);
        }
      }, _callee8);
    }))();
    return function () {
      dead = true;
    };
  }, [dataReady, allLoaded]);

  // Operacje dla Ustawień (szyfrowanie i kopie), udostępnione przez kontekst
  var getAllData = function getAllData() {
    return {
      "fizjo-visits": visits,
      "fizjo-patients": patients,
      "fizjo-rentals": rentals,
      "fizjo-finances": finances,
      "fizjo-stock": stock,
      "fizjo-nfz": nfzCases,
      "fizjo-todos": todos,
      "fizjo-events": events,
      "fizjo-settings": settings,
      "fizjo-budget": budget,
      "fizjo-machines": machines,
      "fizjo-wealth": wealth
    };
  };
  var withSnaps = /*#__PURE__*/function () {
    var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var all, _iterator, _step, k, _yield$dbGet, data, error, _t8;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            all = getAllData();
            _iterator = _createForOfIteratorHelper(FZ_SNAP_KEYS);
            _context9.p = 1;
            _iterator.s();
          case 2:
            if ((_step = _iterator.n()).done) {
              _context9.n = 6;
              break;
            }
            k = _step.value;
            _context9.n = 3;
            return dbGet(k);
          case 3:
            _yield$dbGet = _context9.v;
            data = _yield$dbGet.data;
            error = _yield$dbGet.error;
            if (!error) {
              _context9.n = 4;
              break;
            }
            throw new Error("Nie udało się odczytać kopii automatycznych. Spróbuj za chwilę.");
          case 4:
            if (data) all[k] = data;
          case 5:
            _context9.n = 2;
            break;
          case 6:
            _context9.n = 8;
            break;
          case 7:
            _context9.p = 7;
            _t8 = _context9.v;
            _iterator.e(_t8);
          case 8:
            _context9.p = 8;
            _iterator.f();
            return _context9.f(8);
          case 9:
            return _context9.a(2, all);
        }
      }, _callee9, null, [[1, 7, 8, 9]]);
    }));
    return function withSnaps() {
      return _ref21.apply(this, arguments);
    };
  }();
  var sec = {
    state: cryptoState,
    prepare: function prepare(pass) {
      return czCreateMeta(pass);
    },
    enable: function () {
      var _enable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(pass, onProgress, opts) {
        var all, r;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return withSnaps();
            case 1:
              all = _context0.v;
              _context0.n = 2;
              return czEnable(pass, function () {
                return all;
              }, onProgress, opts);
            case 2:
              r = _context0.v;
              setCryptoState("on");
              return _context0.a(2, r);
          }
        }, _callee0);
      }));
      function enable(_x3, _x4, _x5) {
        return _enable.apply(this, arguments);
      }
      return enable;
    }(),
    disable: function () {
      var _disable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(onProgress) {
        var all;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return withSnaps();
            case 1:
              all = _context1.v;
              _context1.n = 2;
              return czDisable(function () {
                return all;
              }, onProgress);
            case 2:
              setCryptoState("off");
              return _context1.a(2, true);
          }
        }, _callee1);
      }));
      function disable(_x6) {
        return _disable.apply(this, arguments);
      }
      return disable;
    }(),
    changePass: function () {
      var _changePass = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(oldPass, newPass) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              return _context10.a(2, czChangePass(oldPass, newPass));
          }
        }, _callee10);
      }));
      function changePass(_x7, _x8) {
        return _changePass.apply(this, arguments);
      }
      return changePass;
    }(),
    forgetKey: function () {
      var _forgetKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _context11.n = 1;
              return czForgetKey();
            case 1:
              FZ_CRYPTO.dek = null;
              FZ_CRYPTO.state = "locked";
              setCryptoState("locked");
            case 2:
              return _context11.a(2);
          }
        }, _callee11);
      }));
      function forgetKey() {
        return _forgetKey.apply(this, arguments);
      }
      return forgetKey;
    }(),
    audit: czAudit,
    listSnaps: czListSnapshots,
    restoreSnap: function restoreSnap(snap) {
      return applyBackup(snap.data);
    },
    snapshotNow: function () {
      var _snapshotNow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var slot;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              slot = new Date().getDay();
              return _context12.a(2, dbSet("fizjo-backup-" + slot, {
                savedAt: new Date().toISOString(),
                data: buildBackup()
              }));
          }
        }, _callee12);
      }));
      function snapshotNow() {
        return _snapshotNow.apply(this, arguments);
      }
      return snapshotNow;
    }(),
    exportPlain: function exportPlain() {
      downloadJson(buildBackup(), "fizjo-backup-JAWNA-" + new Date().toISOString().slice(0, 10) + ".json");
      markBackupDone();
    },
    buildBackup: buildBackup,
    downloadJson: downloadJson
  };

  // Przypomnienie o kopii poza bazą: przy otwarciu apki, gdy ostatnia pobrana kopia jest starsza niż 7 dni (lub nigdy nie pobrano)
  var reminderShown = React.useRef(false);
  React.useEffect(function () {
    if (!dataReady || !v8 || reminderShown.current) return;
    if (settings && settings.backupReminder === false) return;
    var last = settings && settings.lastBackupAt ? new Date(settings.lastBackupAt).getTime() : 0;
    var days = last ? Math.floor((Date.now() - last) / 86400000) : null;
    if (days !== null && days < 7) return;
    try {
      if (localStorage.getItem("fizjo-backup-snooze") === todayLocal()) return;
    } catch (_unused1) {}
    reminderShown.current = true;
    setBackupAgeDays(days);
    setShowBackupBanner(true);
  }, [dataReady, v8, settings]);
  if (!authChecked) return /*#__PURE__*/React.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 700,
      color: "#3E6FB0",
      fontSize: 18
    }
  }, "ZubrzyckiFizjo"));
  if (isRecovery) return /*#__PURE__*/React.createElement(DarkCtx.Provider, {
    value: dark
  }, /*#__PURE__*/React.createElement(PasswordResetScreen, null));
  if (!unlocked) return /*#__PURE__*/React.createElement(DarkCtx.Provider, {
    value: dark
  }, /*#__PURE__*/React.createElement(LockScreen, {
    onUnlock: function onUnlock() {
      setSessionExpired(false);
      setUnlocked(true);
    }
  }));
  if (cryptoState === "locked") return /*#__PURE__*/React.createElement(DarkCtx.Provider, {
    value: dark
  }, /*#__PURE__*/React.createElement(CryptoUnlockScreen, {
    onDone: function onDone() {
      return setCryptoState("on");
    }
  }));
  if (cryptoState === "checking" || cryptoState === "error") return /*#__PURE__*/React.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 700,
      color: "#3E6FB0",
      fontSize: 18
    }
  }, "ZubrzyckiFizjo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      textAlign: "center",
      maxWidth: 300
    }
  }, cryptoState === "error" ? "Nie udało się sprawdzić ustawień szyfrowania. Nic nie zostało zmienione. Próbuję ponownie…" : "Wczytywanie…"));
  if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7 || !v10 || !v11) return /*#__PURE__*/React.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 700,
      color: "#3E6FB0",
      fontSize: 18
    }
  }, "ZubrzyckiFizjo"), loadFail.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320,
      textAlign: "center",
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "#E05C5C",
      marginBottom: 6
    }
  }, "Nie uda\u0142o si\u0119 wczyta\u0107 danych"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      marginBottom: 12
    }
  }, "Nic nie zosta\u0142o zmienione ani zapisane. Pr\xF3buj\u0119 ponownie co kilka sekund."), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return window.location.reload();
    },
    style: {
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Spr\xF3buj teraz")) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6"
    }
  }, "Wczytywanie danych..."));
  return /*#__PURE__*/React.createElement(DarkCtx.Provider, {
    value: dark
  }, /*#__PURE__*/React.createElement(DemoCtx.Provider, {
    value: demo
  }, /*#__PURE__*/React.createElement(MachinesCtx.Provider, {
    value: {
      machines: machines,
      setMachines: setMachines
    }
  }, /*#__PURE__*/React.createElement(FinancesCtx.Provider, {
    value: {
      finances: finances,
      setFinances: setFinances
    }
  }, /*#__PURE__*/React.createElement(RentalsCtx.Provider, {
    value: {
      rentals: rentals,
      setRentals: setRentals
    }
  }, /*#__PURE__*/React.createElement(StockCtx.Provider, {
    value: {
      stock: stock,
      setStock: setStock
    }
  }, /*#__PURE__*/React.createElement(SecCtx.Provider, {
    value: sec
  }, /*#__PURE__*/React.createElement(DurCtx.Provider, {
    value: durs
  }, /*#__PURE__*/React.createElement("div", null, showConflictBanner && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "#E05C5C",
      zIndex: 10000,
      padding: "10px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: "#fff",
      flex: 1
    }
  }, "\u26A0\uFE0F Inne urz\u0105dzenie zapisa\u0142o zmiany. Mo\u017Cesz straci\u0107 swoje dane."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return window.location.reload();
    },
    style: {
      background: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 700,
      color: "#E05C5C",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Od\u015Bwie\u017C"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowConflictBanner(false);
    },
    style: {
      background: "transparent",
      border: "none",
      fontSize: 18,
      cursor: "pointer",
      color: "#fff"
    }
  }, "\xD7"))), sessionExpired && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 20000,
      background: dark ? "#0E141F" : "#EFF3FA",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#E05C5C",
      color: "#fff",
      padding: "10px 16px",
      fontSize: 13,
      fontWeight: 700,
      textAlign: "center"
    }
  }, "Sesja wygas\u0142a. Zaloguj si\u0119 ponownie. Wpisane zmiany czekaj\u0105 i zapisz\u0105 si\u0119 zaraz po zalogowaniu."), /*#__PURE__*/React.createElement(LockScreen, {
    onUnlock: function onUnlock() {
      return setSessionExpired(false);
    }
  })), loadFail.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "#E05C5C",
      zIndex: 10001,
      padding: "10px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: "#fff"
    }
  }, "\u26A0\uFE0F Nie uda\u0142o si\u0119 wczyta\u0107 cz\u0119\u015Bci danych. Zmiany w tej cz\u0119\u015Bci nie b\u0119d\u0105 zapisane. Pr\xF3buj\u0119 ponownie\u2026")), showBackupBanner && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "#F4A261",
      zIndex: 9999,
      padding: "10px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: "#1C2B3A"
    }
  }, "\uD83D\uDCBE ", backupAgeDays === null ? "Nie pobrano jeszcze kopii zapasowej." : "Ostatnia kopia sprzed " + backupAgeDays + " dni."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: exportData,
    style: {
      background: "#1C2B3A",
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 700,
      color: "#fff",
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "Pobierz"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setShowBackupBanner(false);
      try {
        localStorage.setItem("fizjo-backup-snooze", todayLocal());
      } catch (_unused10) {}
    },
    style: {
      background: "transparent",
      border: "none",
      fontSize: 18,
      cursor: "pointer",
      color: "#1C2B3A"
    }
  }, "\xD7"))), /*#__PURE__*/React.createElement(AppWithSync, {
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
    setWealth: setWealth,
    rentalsLoaded: v3,
    financesLoaded: v4
  }))))))))));
}
