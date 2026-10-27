// Plik wygenerowany z js/core.js przez build.py - nie edytowac recznie.
"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useMemo = _React.useMemo,
  useContext = _React.useContext,
  createContext = _React.createContext,
  useRef = _React.useRef;
var DarkCtx = createContext(false);
var DemoCtx = createContext(false);
var MachinesCtx = createContext(null);
var FinancesCtx = createContext(null);
var RentalsCtx = createContext(null);
var StockCtx = createContext(null);
var SecCtx = createContext(null); // stan i operacje szyfrowania/kopii (dla Ustawień)
var DurCtx = createContext({
  visit: 60,
  delivery: 30,
  pickup: 10,
  event: 60
}); // domyślny czas trwania wpisów w kalendarzu (minuty), z Ustawień
var demoName = function demoName(name, idx) {
  return name ? "Pacjent ".concat(idx + 1) : "—";
};
var demoPhone = function demoPhone() {
  return "***-***-***";
};
var demoAddr = function demoAddr() {
  return "*** **";
};
var demoAmt = function demoAmt() {
  return "****";
};
var useDemo = function useDemo() {
  return useContext(DemoCtx);
};
var maskName = function maskName(demo, name, idx) {
  return demo ? demoName(name, idx || 0) : name;
};
var maskPhone = function maskPhone(demo, phone) {
  return demo ? demoPhone() : phone;
};
var maskAddr = function maskAddr(demo, addr) {
  return demo ? demoAddr() : addr;
};
var maskEmail = function maskEmail(demo, email) {
  return demo && email ? "***@***" : email;
};
// łagodna kontrola adresu e-mail (ostrzeżenie, nie blokada): coś@coś.coś bez spacji
// adresy e-mail pacjenta: lista emails [{id,address,label}] albo (starsze dane) pojedyncze pole email; pierwszy adres jest też w pat.email
var getEmails = function getEmails(pat) {
  var list = pat && Array.isArray(pat.emails) ? pat.emails.filter(function (x) {
    return x && _typeof(x) === "object" && String(x.address || "").trim();
  }) : [];
  if (list.length) return list;
  var one = pat && typeof pat.email === "string" ? pat.email.trim() : "";
  return one ? [{
    id: "legacy",
    address: one,
    label: ""
  }] : [];
};
var emailOk = function emailOk(e) {
  var s = String(e == null ? "" : e).trim();
  return !s || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
};
var maskAmt = function maskAmt(demo, amt) {
  return demo ? demoAmt() : amt;
};
// diagnozy, notatki, opisy numerów (np. "córka"), daty urodzin: w trybie demo zamiast treści same kropki
var demoText = function demoText() {
  return "••••••";
};
var maskText = function maskText(demo, t) {
  return demo && t ? demoText() : t;
};
var SUPA_URL = "https://xqjrlzsdfyjeajfkathx.supabase.co";
var SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxanJsenNkZnlqZWFqZmthdGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NjUzMzgsImV4cCI6MjA4ODE0MTMzOH0.sFWfnIV0tpNnwB65du9dNYTMSelrlEpMXxWf4Mcww4g";

// Token sesji — ustawiany po zalogowaniu przez Supabase Auth
var _supaToken = null;
var _lastAuthTs = 0; // kiedy token był ostatnio odnowiony/pobrany (0 = nieznane, odnowimy wkrótce po starcie)
var _refreshPromise = null;
var getHeaders = function getHeaders() {
  return {
    "apikey": SUPA_ANON,
    "Authorization": "Bearer ".concat(_supaToken || SUPA_ANON),
    "Content-Type": "application/json"
  };
};

// Supabase Auth
function supaSignIn(_x, _x2) {
  return _supaSignIn.apply(this, arguments);
}
function _supaSignIn() {
  _supaSignIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(email, password) {
    var r, d;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return fetch("".concat(SUPA_URL, "/auth/v1/token?grant_type=password"), {
            method: "POST",
            headers: {
              "apikey": SUPA_ANON,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          });
        case 1:
          r = _context.v;
          _context.n = 2;
          return r.json();
        case 2:
          d = _context.v;
          if (!d.access_token) {
            _context.n = 3;
            break;
          }
          _supaToken = d.access_token;
          // Zapisz refresh token w sessionStorage (znika po zamknięciu przeglądarki)
          sessionStorage.setItem("fizjo-refresh", d.refresh_token);
          sessionStorage.setItem("fizjo-token", d.access_token);
          _lastAuthTs = Date.now();
          return _context.a(2, {
            ok: true
          });
        case 3:
          return _context.a(2, {
            ok: false,
            error: d.error_description || d.msg || "Błąd logowania"
          });
      }
    }, _callee);
  }));
  return _supaSignIn.apply(this, arguments);
}
function supaRefresh() {
  return _supaRefresh.apply(this, arguments);
} // Jedno odnowienie naraz (11 kluczy danych może dostać odmowę w tej samej chwili, a token odświeżający jest jednorazowy)
function _supaRefresh() {
  _supaRefresh = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var refresh, r, d, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          refresh = sessionStorage.getItem("fizjo-refresh");
          if (refresh) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, false);
        case 1:
          _context2.p = 1;
          _context2.n = 2;
          return fetch("".concat(SUPA_URL, "/auth/v1/token?grant_type=refresh_token"), {
            method: "POST",
            headers: {
              "apikey": SUPA_ANON,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              refresh_token: refresh
            })
          });
        case 2:
          r = _context2.v;
          _context2.n = 3;
          return r.json();
        case 3:
          d = _context2.v;
          if (!d.access_token) {
            _context2.n = 4;
            break;
          }
          _supaToken = d.access_token;
          sessionStorage.setItem("fizjo-token", d.access_token);
          sessionStorage.setItem("fizjo-refresh", d.refresh_token);
          _lastAuthTs = Date.now();
          return _context2.a(2, true);
        case 4:
          // Serwer odrzucił odnowienie (a nie brak internetu): sesja naprawdę wygasła, trzeba się zalogować ponownie
          if (r.status >= 400 && r.status < 500) window.dispatchEvent(new CustomEvent("fizjo-session-expired"));
          return _context2.a(2, false);
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          return _context2.a(2, false);
      }
    }, _callee2, null, [[1, 5]]);
  }));
  return _supaRefresh.apply(this, arguments);
}
function supaRefreshOnce() {
  if (!_refreshPromise) _refreshPromise = supaRefresh()["finally"](function () {
    _refreshPromise = null;
  });
  return _refreshPromise;
}
// Zapytanie do bazy: po odmowie 401 (wygasła przepustka) odnawia logowanie i ponawia zapytanie raz
function apiFetch(_x3, _x4) {
  return _apiFetch.apply(this, arguments);
} // Cicho odnawia logowanie, zanim wygaśnie (co kilka minut sprawdza wiek tokenu; odnawia po 40 min i po powrocie do apki)
function _apiFetch() {
  _apiFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(url, mk) {
    var r, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return fetch(url, mk());
        case 1:
          r = _context3.v;
          _t2 = r.status === 401;
          if (!_t2) {
            _context3.n = 3;
            break;
          }
          _context3.n = 2;
          return supaRefreshOnce();
        case 2:
          _t2 = _context3.v;
        case 3:
          if (!_t2) {
            _context3.n = 5;
            break;
          }
          _context3.n = 4;
          return fetch(url, mk());
        case 4:
          r = _context3.v;
        case 5:
          return _context3.a(2, r);
      }
    }, _callee3);
  }));
  return _apiFetch.apply(this, arguments);
}
function startAuthKeepAlive() {
  var tick = function tick() {
    if (Date.now() - _lastAuthTs > 40 * 60 * 1000) supaRefreshOnce();
  };
  var iv = setInterval(tick, 5 * 60 * 1000);
  var vis = function vis() {
    if (document.visibilityState === "visible") tick();
  };
  document.addEventListener("visibilitychange", vis);
  return function () {
    clearInterval(iv);
    document.removeEventListener("visibilitychange", vis);
  };
}
function supaSignOut() {
  return _supaSignOut.apply(this, arguments);
}
function _supaSignOut() {
  _supaSignOut = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          sessionStorage.removeItem("fizjo-token");
          sessionStorage.removeItem("fizjo-refresh");
          _supaToken = null;
        case 1:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _supaSignOut.apply(this, arguments);
}
function dbGet(_x5) {
  return _dbGet.apply(this, arguments);
}
function _dbGet() {
  _dbGet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(key) {
    var _d$0$value, _d$, r, d, raw, _t3, _t4, _t5, _t6;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return apiFetch("".concat(SUPA_URL, "/rest/v1/app_data?key=eq.").concat(key, "&select=value"), function () {
            return {
              headers: getHeaders()
            };
          });
        case 1:
          r = _context5.v;
          if (r.ok) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, {
            data: null,
            ts: 0,
            error: true
          });
        case 2:
          _context5.n = 3;
          return r.json();
        case 3:
          d = _context5.v;
          if (Array.isArray(d)) {
            _context5.n = 4;
            break;
          }
          return _context5.a(2, {
            data: null,
            ts: 0,
            error: true
          });
        case 4:
          raw = (_d$0$value = (_d$ = d[0]) === null || _d$ === void 0 ? void 0 : _d$.value) !== null && _d$0$value !== void 0 ? _d$0$value : null;
          if (!(raw === null)) {
            _context5.n = 5;
            break;
          }
          return _context5.a(2, {
            data: null,
            ts: 0,
            error: false
          });
        case 5:
          if (!(raw && _typeof(raw) === 'object' && raw._e)) {
            _context5.n = 9;
            break;
          }
          if (FZ_CRYPTO.dek) {
            _context5.n = 6;
            break;
          }
          if (FZ_CRYPTO.state === "off") window.dispatchEvent(new CustomEvent("fizjo-crypto-changed"));
          return _context5.a(2, {
            data: null,
            ts: 0,
            error: true
          });
        case 6:
          _context5.p = 6;
          _context5.n = 7;
          return czDecrypt(key, raw._e);
        case 7:
          _t3 = _context5.v;
          _t4 = raw._ts || 0;
          return _context5.a(2, {
            data: _t3,
            ts: _t4,
            error: false
          });
        case 8:
          _context5.p = 8;
          _t5 = _context5.v;
          return _context5.a(2, {
            data: null,
            ts: 0,
            error: true
          });
        case 9:
          if (!(raw && _typeof(raw) === 'object' && '_ts' in raw)) {
            _context5.n = 10;
            break;
          }
          return _context5.a(2, {
            data: raw._d,
            ts: raw._ts,
            error: false
          });
        case 10:
          return _context5.a(2, {
            data: raw,
            ts: 0,
            error: false
          });
        case 11:
          _context5.p = 11;
          _t6 = _context5.v;
          return _context5.a(2, {
            data: null,
            ts: 0,
            error: true
          });
      }
    }, _callee5, null, [[6, 8], [0, 11]]);
  }));
  return _dbGet.apply(this, arguments);
}
function dbSet(_x6, _x7) {
  return _dbSet.apply(this, arguments);
}
function _dbSet() {
  _dbSet = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(key, value) {
    var keepalive,
      st,
      stored,
      hist,
      env,
      r,
      _args6 = arguments,
      _t7;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          keepalive = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : false;
          _context6.p = 1;
          // Gdy dane są szyfrowane (albo jeszcze nie wiemy), NIGDY nie zapisujemy jawnego tekstu ani niczego nie nadpisujemy
          st = FZ_CRYPTO.state;
          if (!(st === "locked" || st === "checking" || st === "error")) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, false);
        case 2:
          if (!(st === "on" && !FZ_CRYPTO.dek)) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, false);
        case 3:
          stored = {
            _d: value,
            _ts: Date.now()
          }, hist = value;
          if (!(st === "on")) {
            _context6.n = 5;
            break;
          }
          _context6.n = 4;
          return czEncrypt(key, value);
        case 4:
          env = _context6.v;
          stored = {
            _e: env,
            _ts: Date.now()
          };
          hist = {
            _e: env
          };
        case 5:
          _context6.n = 6;
          return apiFetch("".concat(SUPA_URL, "/rest/v1/app_data"), function () {
            return {
              method: "POST",
              headers: _objectSpread(_objectSpread({}, getHeaders()), {}, {
                "Prefer": "resolution=merge-duplicates"
              }),
              body: JSON.stringify({
                key: key,
                value: stored
              }),
              keepalive: keepalive
            };
          });
        case 6:
          r = _context6.v;
          if (r.ok) {
            // Cichy zapis historii — nie blokuje ani nie wpływa na wynik głównego zapisu.
            // Przycinanie do ostatnich N wersji per klucz robi trigger w bazie (patrz SQL do wdrożenia w Supabase).
            fetch("".concat(SUPA_URL, "/rest/v1/app_data_history"), {
              method: "POST",
              headers: getHeaders(),
              body: JSON.stringify({
                key: key,
                value: hist
              }),
              keepalive: keepalive
            })["catch"](function () {});
          }
          return _context6.a(2, r.ok);
        case 7:
          _context6.p = 7;
          _t7 = _context6.v;
          return _context6.a(2, false);
      }
    }, _callee6, null, [[1, 7]]);
  }));
  return _dbSet.apply(this, arguments);
}
var _savingCount = 0;
var _failingKeys = new Set();
var _notifySave = function _notifySave() {
  return window.dispatchEvent(new CustomEvent("fizjo-save", {
    detail: _savingCount > 0
  }));
};
var _notifySaveError = function _notifySaveError() {
  return window.dispatchEvent(new CustomEvent("fizjo-save-error", {
    detail: _failingKeys.size > 0
  }));
};
// Klucze, których nie udało się wczytać z bazy (apka ponawia próbę i niczego wtedy nie zapisuje)
var _loadFailKeys = new Set();
var _notifyLoadError = function _notifyLoadError() {
  return window.dispatchEvent(new CustomEvent("fizjo-load-error", {
    detail: _toConsumableArray(_loadFailKeys)
  }));
};
// Bezpiecznik: zapis, który skraca listę o połowę (albo do zera), wymaga potwierdzenia.
// Świadome operacje masowe (np. wczytanie kopii po potwierdzeniu) wyłączają go na chwilę.
var _allowShrinkUntil = 0;
var allowShrinkFor = function allowShrinkFor(ms) {
  _allowShrinkUntil = Date.now() + ms;
};
var SHRINK_LABELS = {
  "fizjo-visits": "wizyty",
  "fizjo-patients": "pacjenci",
  "fizjo-rentals": "wypożyczenia",
  "fizjo-finances": "wpisy w finansach",
  "fizjo-nfz": "sprawy wózków",
  "fizjo-todos": "zadania",
  "fizjo-events": "wydarzenia",
  "fizjo-machines": "sztuki sprzętu"
};
var _shrinks = function _shrinks(prev, cur) {
  return Array.isArray(cur) && (prev >= 10 ? cur.length <= prev / 2 : prev >= 3 ? cur.length === 0 : false);
};

// ── USZKODZONE WPISY: jeden zły rekord nie może wywalać całej apki ────────────────
// Czyścimy tylko w pamięci, przy wczytaniu z bazy i przy wczytaniu kopii: pusty wpis (null, {}, tekst) znika z listy,
// a listy wpłat/cykli/przedłużeń i nazwisko pacjenta dostają bezpieczną wartość. Baza zmienia się dopiero przy
// następnym zapisie tej listy przez użytkownika. Gdy cały zbiór nie jest listą, NIE zgadujemy (ok:false → apka
// nic nie zapisuje i pokazuje ekran "Nie udało się wczytać danych").
var FZ_LIST_KEYS = ["fizjo-visits", "fizjo-patients", "fizjo-rentals", "fizjo-finances", "fizjo-nfz", "fizjo-todos", "fizjo-events", "fizjo-machines"];
var _isRec = function _isRec(x) {
  return !!x && _typeof(x) === "object" && !Array.isArray(x);
};
var _recs = function _recs(a) {
  var f = a.filter(function (x) {
    return _isRec(x) && Object.keys(x).length > 0;
  });
  return f.length === a.length ? a : f;
};
var _fixRental = function _fixRental(r) {
  var o = r;
  for (var _i = 0, _arr = ["payments", "cycles", "extensions"]; _i < _arr.length; _i++) {
    var k = _arr[_i];
    if (!(k in r) || r[k] == null) continue;
    var v = r[k],
      f = Array.isArray(v) ? _recs(v) : [];
    if (f !== v) {
      if (o === r) o = _objectSpread({}, r);
      o[k] = f;
    }
  }
  return o;
};
var _fixPatient = function _fixPatient(p) {
  return typeof p.name === "string" ? p : _objectSpread(_objectSpread({}, p), {}, {
    name: p.name == null ? "" : String(p.name)
  });
};
function fzClean(key, v) {
  if (!FZ_LIST_KEYS.includes(key)) return {
    ok: true,
    value: v
  };
  if (!Array.isArray(v)) return {
    ok: false
  };
  var a = _recs(v);
  var fix = key === "fizjo-rentals" ? _fixRental : key === "fizjo-patients" ? _fixPatient : null;
  if (fix) {
    var ch = false;
    var m = a.map(function (x) {
      var y = fix(x);
      if (y !== x) ch = true;
      return y;
    });
    if (ch) a = m;
  }
  return {
    ok: true,
    value: a
  };
}
function usePersistedState(key, initial) {
  var ready = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var _useState = useState(initial),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loaded = _useState4[0],
    setLoaded = _useState4[1];
  var userChanged = React.useRef(false);
  var stateRef = React.useRef(state);
  var loadedTsRef = React.useRef(0);
  var initialLoadOk = React.useRef(false);
  var savingRef = React.useRef(false);
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    retry = _useState6[0],
    setRetry = _useState6[1];
  var baseLenRef = React.useRef(0); // ile wpisów miała lista przy ostatnim wczytaniu/zapisie
  var lastGoodRef = React.useRef(initial); // ostatnia wersja znana jako zgodna z bazą (do cofnięcia odrzuconej zmiany)
  var shrinkOkRef = React.useRef(null); // wersja, którą użytkownik już potwierdził mimo skrócenia listy
  stateRef.current = state;

  // Initial load
  useEffect(function () {
    if (!ready) {
      setLoaded(false);
      userChanged.current = false;
      initialLoadOk.current = false;
      return;
    }
    setLoaded(false);
    userChanged.current = false;
    initialLoadOk.current = false;
    var dead = false,
      timer = null;
    dbGet(key).then(function (_ref) {
      var raw = _ref.data,
        ts = _ref.ts,
        error = _ref.error;
      if (dead) return;
      var v = raw,
        bad = error;
      if (!bad && raw !== null) {
        var c = fzClean(key, raw);
        if (c.ok) v = c.value;else bad = true;
      }
      if (bad) {
        // Nie udało się wczytać (albo zbiór ma nieznany kształt): nie udajemy, że danych nie ma, niczego nie zapisujemy i próbujemy ponownie
        if (!_loadFailKeys.has(key)) {
          _loadFailKeys.add(key);
          _notifyLoadError();
        }
        timer = setTimeout(function () {
          return setRetry(function (n) {
            return n + 1;
          });
        }, 4000);
        return;
      }
      if (_loadFailKeys["delete"](key)) _notifyLoadError();
      initialLoadOk.current = true;
      if (!userChanged.current && v !== null) {
        setState(v);
        loadedTsRef.current = ts;
        lastGoodRef.current = v;
        baseLenRef.current = Array.isArray(v) ? v.length : 0;
      }
      setLoaded(true);
    });
    return function () {
      dead = true;
      clearTimeout(timer);
    };
  }, [ready, retry]);

  // Próba zapisu — NIE czyści flagi "do zapisania" jeśli zapis się nie powiódł (np. brak internetu),
  // dzięki czemu polling (niżej) nigdy nie nadpisze lokalnej, jeszcze niezapisanej zmiany danymi z serwera
  var attemptSave = React.useCallback(function () {
    if (!loaded || !ready || !userChanged.current || !initialLoadOk.current || savingRef.current) return;
    var cur = stateRef.current;
    if (_shrinks(baseLenRef.current, cur) && Date.now() > _allowShrinkUntil && shrinkOkRef.current !== cur) {
      var ok = window.confirm('Ta zmiana zmniejsza listę "' + (SHRINK_LABELS[key] || key) + '" z ' + baseLenRef.current + ' do ' + cur.length + ' wpisów.\n\nOK = zapisz zmianę, Anuluj = cofnij zmianę.');
      if (!ok) {
        userChanged.current = false;
        setState(lastGoodRef.current);
        return;
      }
      shrinkOkRef.current = cur;
    }
    savingRef.current = true;
    _savingCount++;
    _notifySave();
    var saveTs = Date.now();
    dbSet(key, cur).then(function (ok) {
      if (ok) {
        userChanged.current = false;
        loadedTsRef.current = saveTs;
        lastGoodRef.current = cur;
        baseLenRef.current = Array.isArray(cur) ? cur.length : 0;
        if (_failingKeys["delete"](key)) _notifySaveError();
      } else if (!_failingKeys.has(key)) {
        _failingKeys.add(key);
        _notifySaveError();
      }
    })["finally"](function () {
      savingRef.current = false;
      _savingCount--;
      _notifySave();
    });
  }, [key, loaded, ready]);

  // Save on user changes (debounced 300ms)
  useEffect(function () {
    if (!loaded || !ready || !userChanged.current || !initialLoadOk.current) return;
    var t = setTimeout(attemptSave, 300);
    return function () {
      return clearTimeout(t);
    };
  }, [state, loaded, ready, attemptSave]);

  // Retry co 5s dopóki jest niezapisana zmiana — łapie przypadki gdy zapis nie powiódł się
  // z powodu chwilowego braku internetu, bez czekania na kolejną zmianę/zamknięcie karty
  useEffect(function () {
    if (!loaded || !ready) return;
    var id = setInterval(function () {
      if (userChanged.current) attemptSave();
    }, 5000);
    return function () {
      return clearInterval(id);
    };
  }, [loaded, ready, attemptSave]);

  // Zapis gdy apka schodzi w tło (visibilitychange) lub strona się zamyka (pagehide)
  // pagehide używa keepalive=true — przeglądarka nie anuluje requestu przy zamknięciu karty
  useEffect(function () {
    var flushBg = function flushBg() {
      // Tylko przy schodzeniu w tło, nie przy powrocie — przy powrocie działa conflict check
      if (document.visibilityState !== "hidden") return;
      attemptSave();
    };
    var flushClose = function flushClose() {
      if (loaded && ready && userChanged.current && initialLoadOk.current) {
        var cur = stateRef.current;
        if (_shrinks(baseLenRef.current, cur) && Date.now() > _allowShrinkUntil && shrinkOkRef.current !== cur) return;
        dbSet(key, cur, true);
      }
    };
    document.addEventListener("visibilitychange", flushBg);
    window.addEventListener("pagehide", flushClose);
    return function () {
      document.removeEventListener("visibilitychange", flushBg);
      window.removeEventListener("pagehide", flushClose);
    };
  }, [loaded, ready, attemptSave]);

  // Ostrzeżenie przeglądarki przy próbie zamknięcia karty z niezapisaną zmianą
  useEffect(function () {
    var onBeforeUnload = function onBeforeUnload(e) {
      if (userChanged.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return function () {
      return window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  // Wspólna funkcja: pobierz dane z serwera i zastosuj lokalnie jeśli inne — ale tylko gdy
  // nie mamy lokalnej niezapisanej zmiany (nigdy nie nadpisuje czegoś co czeka na zapis)
  var pullFromServer = React.useCallback(function () {
    if (userChanged.current) return;
    dbGet(key).then(function (_ref2) {
      var raw = _ref2.data,
        ts = _ref2.ts;
      if (raw === null || userChanged.current) return;
      var c = fzClean(key, raw);
      if (!c.ok) return;
      var v = c.value;
      try {
        if (JSON.stringify(v) !== JSON.stringify(stateRef.current)) {
          setState(v);
          loadedTsRef.current = ts;
          lastGoodRef.current = v;
          baseLenRef.current = Array.isArray(v) ? v.length : 0;
        }
      } catch (_unused) {}
    });
  }, [key]);

  // Polling co 30s — synchronizacja między urządzeniami
  useEffect(function () {
    if (!loaded || !ready) return;
    var interval = setInterval(pullFromServer, 30000);
    return function () {
      return clearInterval(interval);
    };
  }, [loaded, ready, pullFromServer]);

  // Natychmiastowe odświeżenie po powrocie do karty/apki (nie czekaj do 30s) — ważne przy
  // używaniu apki na 2 urządzeniach (np. telefon + laptop): po powrocie do urządzenia, które
  // długo stało w tle, dociągamy najnowsze dane ZANIM zdążysz coś na nim wpisać na nieaktualnej wersji
  useEffect(function () {
    if (!loaded || !ready) return;
    var onResume = function onResume() {
      if (document.visibilityState === "visible") pullFromServer();
    };
    document.addEventListener("visibilitychange", onResume);
    return function () {
      return document.removeEventListener("visibilitychange", onResume);
    };
  }, [loaded, ready, pullFromServer]);

  // Wykrywanie konfliktu: gdy karta staje się aktywna, sprawdź czy serwer ma nowsze dane
  useEffect(function () {
    if (!loaded || !ready) return;
    var onVisible = function onVisible() {
      if (document.visibilityState !== "visible" || !userChanged.current) return;
      dbGet(key).then(function (_ref3) {
        var ts = _ref3.ts;
        if (ts > loadedTsRef.current + 2000 && userChanged.current) {
          window.dispatchEvent(new CustomEvent("fizjo-conflict", {
            detail: {
              key: key
            }
          }));
        }
      });
    };
    document.addEventListener("visibilitychange", onVisible);
    return function () {
      return document.removeEventListener("visibilitychange", onVisible);
    };
  }, [loaded, ready]);

  // Wartość podana wprost (np. z wczytanej kopii) przechodzi przez to samo czyszczenie co dane z bazy;
  // zbiór o złym kształcie jest ignorowany (lepiej nic nie zmienić niż wywalić apkę)
  var setStateUser = React.useCallback(function (v) {
    if (typeof v !== "function") {
      var c = fzClean(key, v);
      if (!c.ok) {
        try {
          console.warn("Pominięto zbiór o nieznanym kształcie:", key);
        } catch (_unused2) {}
        return;
      }
      v = c.value;
    }
    userChanged.current = true;
    setState(v);
  }, [key]);
  return [state, setStateUser, loaded];
}

// ── UTILS ─────────────────────────────────────────────────────────────────
var todayLocal = function todayLocal() {
  var d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};
// tygodnie → miesiąc: 52/12 (≈4,33), a nie 4
var WEEKS_PER_MONTH = 52 / 12;
var dateDiff = function dateDiff(a, b) {
  var _a$split$map = a.split("-").map(Number),
    _a$split$map2 = _slicedToArray(_a$split$map, 3),
    ay = _a$split$map2[0],
    am = _a$split$map2[1],
    ad = _a$split$map2[2],
    _b$split$map = b.split("-").map(Number),
    _b$split$map2 = _slicedToArray(_b$split$map, 3),
    by = _b$split$map2[0],
    bm = _b$split$map2[1],
    bd = _b$split$map2[2];
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
};
var visitStatus = function visitStatus(v) {
  if (v.status === "zakończona") return "zakończona";
  if (v.status === "anulowana") return "anulowana";
  if (!v.date) return "zaplanowana";
  return new Date(v.date + "T" + (v.time || "00:00") + ":00") <= new Date() ? "zakończona" : "zaplanowana";
};
var emptyVisit = function emptyVisit() {
  return {
    date: todayLocal(),
    time: "15:00",
    type: "Rehabilitacja domowa",
    price: "150",
    status: "zaplanowana",
    patientName: "",
    patientId: null,
    notes: ""
  };
};
var emptyRental = function emptyRental() {
  return {
    equipment: "",
    patientName: "",
    phone: "",
    address: "",
    startDate: todayLocal(),
    startTime: "10:00",
    startAllDay: false,
    endDate: "",
    endTime: "10:00",
    endAllDay: false,
    renewable: false,
    amount: "",
    amountPaid: "",
    transport: "",
    notes: "",
    source: "",
    machineId: null
  };
};
var VISIT_TYPES = ["Rehabilitacja domowa", "Kinezyterapia", "Masaż leczniczy", "Krioterapia", "Elektroterapia", "Konsultacja", "Inne"];
var EQUIPMENT = ["Artromot K1 2025", "Artromot K1 I", "Kinetec Spectra", "Kinetec Spectra SZ", "Optiflex", "OrthoRehab", "Ambonka Paula", "Balkonik ortopedyczny", "Wózek inwalidzki Elite Tim", "Wózek Vermeiren V500"];
var WOZEK_EQUIPMENT = ["Wózek inwalidzki Elite Tim", "Wózek Vermeiren V500"];
var EQUIPMENT_GROUPS = [{
  key: "szyny",
  label: "Szyny CPM"
}, {
  key: "wozki",
  label: "Wózki"
}, {
  key: "balkoniki",
  label: "Balkoniki"
}];

// ── Miasto z adresu ─────────────────────────────────────────────────────────────────────────────────
// Do wspólnego kalendarza rodzinnego idzie z pracy tylko miasto (bez ulicy i nazwiska). Miasto bierzemy z adresu, który już jest w bazie:
// zapisane ręcznie pole "city" (pacjent albo wypożyczenie) ma pierwszeństwo, bez niego miasto wyłuskujemy z adresu.
// conf: "ok" = rozpoznane (znane miasto albo po kodzie pocztowym), "guess" = domysł (do sprawdzenia), "" = nie ma.
var CITIES_BUILTIN = ["Katowice", "Sosnowiec", "Gliwice", "Zabrze", "Bytom", "Bielsko-Biała", "Rybnik", "Ruda Śląska", "Tychy", "Dąbrowa Górnicza", "Chorzów", "Jaworzno", "Jastrzębie-Zdrój", "Mysłowice", "Siemianowice Śląskie", "Tarnowskie Góry", "Piekary Śląskie", "Świętochłowice", "Knurów", "Racibórz", "Żory", "Mikołów", "Czeladź", "Będzin", "Zawiercie", "Cieszyn", "Częstochowa", "Lubliniec", "Pszczyna", "Wodzisław Śląski", "Czechowice-Dziedzice", "Żywiec", "Bieruń", "Łaziska Górne", "Orzesze", "Radzionków", "Rydułtowy", "Pyskowice", "Wojkowice", "Siewierz", "Czerwionka-Leszczyny", "Imielin", "Kobiór", "Ożarowice", "Psary", "Bobrowniki", "Sławków", "Szczyrk", "Wisła", "Ustroń", "Skoczów", "Strumień", "Pawłowice", "Suszec", "Chybie", "Radlin", "Pszów", "Gierałtowice", "Sośnicowice", "Kuźnia Raciborska", "Gaszowice", "Mszana", "Godów", "Gorzyce", "Tworóg", "Kalety", "Koszęcin", "Miasteczko Śląskie", "Zbrosławice", "Świerklaniec", "Kochanowice", "Blachownia", "Myszków", "Kłobuck", "Łazy", "Poręba", "Oświęcim", "Brzeszcze", "Libiąż", "Chrzanów", "Trzebinia", "Olkusz", "Bukowno", "Kęty", "Wadowice", "Bochnia", "Kraków", "Warszawa", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Gdynia", "Sopot", "Szczecin", "Bydgoszcz", "Lublin", "Białystok", "Opole", "Kielce", "Rzeszów", "Toruń", "Olsztyn", "Radom", "Płock", "Kalisz", "Legnica", "Wałbrzych", "Zakopane", "Nowy Sącz", "Tarnów", "Nysa", "Kędzierzyn-Koźle", "Strzelce Opolskie"];
var cityNorm = function cityNorm(s) {
  return String(s == null ? "" : s).toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\- ]/g, " ").replace(/\s+/g, " ").trim();
};
var cityTitle = function cityTitle(s) {
  s = String(s || "").trim();
  if (s && (s === s.toUpperCase() || s === s.toLowerCase())) return s.toLowerCase().replace(/(^|[ \-])(\S)/g, function (m, a, b) {
    return a + b.toUpperCase();
  });
  return s;
};
// słownik znanych miast: wbudowana lista + miasta już zapisane w bazie (extra = lista nazw); klucz = nazwa bez ogonków i wielkości liter
function cityKnown(extra) {
  var m = new Map();
  CITIES_BUILTIN.concat(extra || []).forEach(function (c) {
    var n = cityNorm(c);
    if (n && !m.has(n)) m.set(n, String(c).trim());
  });
  return m;
}
// miasto na końcu fragmentu adresu: okna 3,2,1 słów od końca; "Katowice-Ligota" daje "Katowice"
function cityMatchSeg(seg, K) {
  var t = cityNorm(String(seg || "").replace(/\b\d{2}-\d{3}\b/g, " ")).split(" ").filter(Boolean);
  for (var w = Math.min(3, t.length); w >= 1; w--) {
    for (var end = t.length; end >= w; end--) {
      var ph = t.slice(end - w, end).join(" ");
      if (K.has(ph)) return K.get(ph);
      if (w === 1 && ph.includes("-")) {
        var pre = ph.split("-")[0];
        if (K.has(pre)) return K.get(pre);
      }
    }
  }
  return "";
}
// odrzuca coś, co wygląda na ulicę/numer; zwraca ładną nazwę albo ""
function cityClean(str) {
  var c = String(str || "").replace(/\b\d{2}-\d{3}\b/g, " ").replace(/\s+/g, " ").trim();
  if (!c || c.length > 40 || /\d/.test(c) || /(^|\s)(ul|ulica|al|aleja|os|osiedle|pl|plac|m|lok|lokal|bl|blok)\.?(\s|$)/i.test(c) || c.split(" ").length > 3) return "";
  return cityTitle(c);
}
function cityFromAddress(addr, known) {
  var raw = String(addr == null ? "" : addr).replace(/[\r\n]+/g, ", ").trim();
  if (!raw) return {
    city: "",
    conf: ""
  };
  var K = known || cityKnown([]);
  var segs = raw.split(/[,;]/).map(function (x) {
    return x.trim();
  }).filter(Boolean);
  for (var i = segs.length - 1; i >= 0; i--) {
    var c = cityMatchSeg(segs[i], K);
    if (c) return {
      city: c,
      conf: "ok"
    };
  }
  for (var _i2 = segs.length - 1; _i2 >= 0; _i2--) {
    var m = /\b\d{2}-\d{3}\b\s*(.+)$/.exec(segs[_i2]);
    if (m) {
      var _c = cityClean(m[1]);
      if (_c) return {
        city: _c,
        conf: "ok"
      };
    }
  }
  if (segs.length > 1) {
    var last = segs[segs.length - 1];
    if (!/\d/.test(last)) {
      var _c2 = cityClean(last);
      if (_c2) return {
        city: _c2,
        conf: "guess"
      };
    }
  }
  var tk = raw.split(/\s+/);
  var k = -1;
  tk.forEach(function (w, i) {
    if (/\d/.test(w)) k = i;
  });
  if (k >= 0 && k < tk.length - 1) {
    var _c3 = cityClean(tk.slice(k + 1).join(" "));
    if (_c3) return {
      city: _c3,
      conf: "guess"
    };
  }
  return {
    city: "",
    conf: ""
  };
}
var cityStored = function cityStored(o) {
  return o && typeof o.city === "string" && o.city.trim() ? o.city.trim() : "";
};
// miasta już wpisane ręcznie w bazie (podpowiedzi i rozszerzenie słownika)
var cityCollect = function cityCollect(patients, rentals) {
  var set = new Set();
  (patients || []).forEach(function (p) {
    var c = cityStored(p);
    if (c) set.add(c);
  });
  (rentals || []).forEach(function (r) {
    var c = cityStored(r);
    if (c) set.add(c);
  });
  return _toConsumableArray(set).sort(function (a, b) {
    return a.localeCompare(b, "pl");
  });
};
// miasto pacjenta: zapisane ręcznie albo z adresu
var cityOfPatient = function cityOfPatient(p, K) {
  var c = cityStored(p);
  if (c) return {
    city: c,
    conf: "ok",
    stored: true
  };
  var d = cityFromAddress(p && p.address, K);
  return {
    city: d.city,
    conf: d.conf,
    stored: false
  };
};
// miasto wypożyczenia: zapisane ręcznie, z adresu wypożyczenia, a na końcu z karty pacjenta
function cityOfRental(r, patients, K) {
  var c = cityStored(r);
  if (c) return {
    city: c,
    conf: "ok",
    stored: true
  };
  var d = cityFromAddress(r && r.address, K);
  if (d.city) return {
    city: d.city,
    conf: d.conf,
    stored: false
  };
  var pat = (patients || []).find(function (p) {
    return r && (r.patientId != null && p.id === r.patientId || r.patientName && p.name === r.patientName);
  });
  return pat ? cityOfPatient(pat, K) : {
    city: "",
    conf: "",
    stored: false
  };
}
// miasto wizyty: z karty pacjenta (wizyty nie mają własnego adresu)
function cityOfVisit(v, patients, K) {
  var pat = (patients || []).find(function (p) {
    return v && (v.patientId != null && p.id === v.patientId || !v.patientId && v.patientName && p.name === v.patientName);
  });
  return pat ? cityOfPatient(pat, K) : {
    city: "",
    conf: "",
    stored: false
  };
}

// ── Czas trwania wpisów w kalendarzu: każdy wpis ma godzinę początku i końca ──────────────────────────
// Domyślne czasy (minuty) są w Ustawieniach; w każdym wpisie można je zmienić. Wizyta: time + endTime,
// wydarzenie: time + endTime, wypożyczenie: dowóz startTime + startUntil, odbiór endTime + endUntil, planowany odbiór plannedReturnTime + plannedReturnUntil.
// Stare wpisy bez godziny końca liczą ją z bieżącego domyślnego czasu.
var DUR_DEFAULTS = {
  visit: 60,
  delivery: 30,
  pickup: 10,
  event: 60
};
var DUR_LABELS = {
  visit: "Wizyta",
  delivery: "Dowóz / początek wypożyczenia",
  pickup: "Odbiór sprzętu",
  event: "Zwykłe wydarzenie"
};
var durClamp = function durClamp(v) {
  var n = Math.round((+v || 0) / 5) * 5;
  return n >= 5 && n <= 480 ? n : null;
};
var durFromSettings = function durFromSettings(st) {
  var d = st && st.durations && _typeof(st.durations) === "object" ? st.durations : {};
  var o = {};
  Object.keys(DUR_DEFAULTS).forEach(function (k) {
    o[k] = durClamp(d[k]) || DUR_DEFAULTS[k];
  });
  return o;
};
var hmToMin = function hmToMin(t) {
  var m = /^(\d{1,2}):(\d{2})$/.exec(t || "");
  return m && +m[1] < 24 && +m[2] < 60 ? +m[1] * 60 + +m[2] : null;
};
var minToHm = function minToHm(m) {
  m = Math.max(0, Math.min(Math.round(m), 23 * 60 + 59));
  return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
};
// godzina końca: zapisana (gdy późniejsza niż początek), a bez niej początek + domyślny czas dla rodzaju (visit|delivery|pickup|event)
var calEnd = function calEnd(durs, kind, start, end) {
  var s = hmToMin(start);
  if (s === null) return "";
  var e = hmToMin(end);
  return e !== null && e > s ? end : minToHm(s + (durs && durs[kind] || DUR_DEFAULTS[kind]));
};
// "16:00–17:00" (albo sama godzina początku, gdy nie ma godziny)
var calRange = function calRange(durs, kind, start, end) {
  return hmToMin(start) === null ? start || "" : start + "–" + calEnd(durs, kind, start, end);
};

// ── Ustawienia szyny CPM: udo i podudzie (pełne cm), osobno dla każdej marki (inna skala) ──────────────
// Historia zamiast nadpisywania. Wpis przy wypożyczeniu = rental.cpm {brand,thigh,shank} (data = początek wypożyczenia),
// wpis ręczny z karty pacjenta = patient.cpmLog [{id,date,brand,thigh,shank}]. "Ostatnie" = najnowszy wpis danej marki.
var CPM_BRANDS = ["Artromot", "Kinetec"];
var cpmBrandOf = function cpmBrandOf(name) {
  var n = String(name || "").trim().toLowerCase();
  return CPM_BRANDS.find(function (b) {
    return n.startsWith(b.toLowerCase());
  }) || null;
};
// pełne centymetry: 1–999, wszystko inne to brak wartości
var cpmInt = function cpmInt(v) {
  var n = parseInt(String(v == null ? "" : v).replace(/\D/g, ""), 10);
  return n > 0 && n < 1000 ? n : null;
};
// tekst wpisany w polu: tylko cyfry (przecinek/kropka ucina ułamek, żeby wklejone "45,5" nie zamieniło się w 455)
var cpmDigits = function cpmDigits(v) {
  return String(v == null ? "" : v).split(/[.,]/)[0].replace(/\D/g, "").slice(0, 3);
};
var cpmHas = function cpmHas(c) {
  return !!c && _typeof(c) === "object" && !Array.isArray(c) && !!(cpmInt(c.thigh) || cpmInt(c.shank));
};
// to, co zapisujemy: {brand,thigh,shank} albo null, gdy nic nie wpisano
var cpmPack = function cpmPack(c, equipment) {
  return cpmHas(c) ? {
    brand: cpmBrandOf(equipment) || (CPM_BRANDS.includes(c.brand) ? c.brand : null),
    thigh: cpmInt(c.thigh),
    shank: cpmInt(c.shank)
  } : null;
};
var cpmDate = function cpmDate(d) {
  return /^\d{4}-\d{2}-\d{2}$/.test(d || "") ? d.slice(8, 10) + "." + d.slice(5, 7) + "." + d.slice(0, 4) : d || "";
};
var cpmText = function cpmText(e, demo) {
  return demo ? "udo •• · podudzie ••" : [e.thigh ? "udo " + e.thigh + " cm" : null, e.shank ? "podudzie " + e.shank + " cm" : null].filter(Boolean).join(" · ");
};
// wszystkie wpisy pacjenta (z wypożyczeń i z karty), najnowsze pierwsze; excludeRentalId pomija wpis z danego wypożyczenia
function cpmEntries(pat, rentals, excludeRentalId) {
  if (!pat) return [];
  var out = [];
  (Array.isArray(pat.cpmLog) ? pat.cpmLog : []).forEach(function (e) {
    if (e && cpmHas(e) && /^\d{4}-\d{2}-\d{2}$/.test(e.date || "")) out.push({
      key: "c" + e.id,
      order: +e.id || 0,
      id: e.id,
      date: e.date,
      brand: e.brand || null,
      thigh: cpmInt(e.thigh),
      shank: cpmInt(e.shank),
      src: "karta"
    });
  });
  (rentals || []).forEach(function (r) {
    if (!r || r.id === excludeRentalId || !cpmHas(r.cpm) || !/^\d{4}-\d{2}-\d{2}$/.test(r.startDate || "")) return;
    if (!(r.patientId != null && r.patientId === pat.id) && !(pat.name && r.patientName === pat.name)) return;
    out.push({
      key: "r" + r.id,
      order: +r.id || 0,
      rentalId: r.id,
      date: r.startDate,
      brand: r.cpm.brand || cpmBrandOf(r.equipment),
      thigh: cpmInt(r.cpm.thigh),
      shank: cpmInt(r.cpm.shank),
      src: "wypożyczenie",
      equipment: r.equipment || ""
    });
  });
  return out.sort(function (a, b) {
    return b.date.localeCompare(a.date) || b.order - a.order;
  });
}
var cpmLast = function cpmLast(entries, brand) {
  return entries.find(function (e) {
    return e.brand === brand;
  }) || null;
};
// ustawienia szyny pokazujemy tylko dla marek z listy CPM_BRANDS (rozpoznanych po nazwie sprzętu)
var cpmApplies = function cpmApplies(equipment) {
  return cpmBrandOf(equipment) !== null;
};
var getActiveEquipmentNames = function getActiveEquipmentNames(stock) {
  var base = stock && stock.equipment && stock.equipment.length ? _toConsumableArray(new Set([].concat(EQUIPMENT, _toConsumableArray(stock.equipment.map(function (e) {
    return e.name;
  }))))).filter(function (n) {
    var e = (stock.equipment || []).find(function (x) {
      return x.name === n;
    });
    return !e || !e.hidden;
  }) : EQUIPMENT;
  var ord = stock && stock.order;
  if (!ord) return base;
  // własna kolejność w obrębie grupy (Magazyn): elementy grupy zamieniają się miejscami tylko między sobą, reszta zostaje na swoich pozycjach
  var catOf = {};
  (stock && stock.equipment || []).forEach(function (e) {
    catOf[e.name] = e.category;
  });
  var out = base.slice();
  Object.keys(ord).forEach(function (g) {
    var list = ord[g] || [];
    var members = out.filter(function (n) {
      return catOf[n] === g;
    });
    if (members.length < 2) return;
    var rank = function rank(n) {
      var i = list.indexOf(n);
      return i < 0 ? 1e6 : i;
    };
    var sorted = members.map(function (n, i) {
      return {
        n: n,
        i: i
      };
    }).sort(function (a, b) {
      return rank(a.n) - rank(b.n) || a.i - b.i;
    }).map(function (x) {
      return x.n;
    });
    var k = 0;
    out = out.map(function (n) {
      return catOf[n] === g ? sorted[k++] : n;
    });
  });
  return out;
};
var addDays = function addDays(d, n) {
  var dt = new Date(d + "T12:00:00");
  dt.setDate(dt.getDate() + n);
  return dt.toISOString().slice(0, 10);
};
// Jedyne miejsce definiujące "kolejny okres" dla cyklicznych wypożyczeń (auto-generacja, "+ Dodaj okres", widżet Nadchodzące) — celowo +30 dni, nie kalendarzowy miesiąc
var nextCycleDueDate = function nextCycleDueDate(fromDate) {
  return addDays(fromDate, 30);
};
var parseCycleSourceId = function parseCycleSourceId(sid) {
  var rest = sid.slice(6);
  var di = rest.indexOf("-");
  return {
    rentalId: +rest.slice(0, di),
    cycleKey: rest.slice(di + 1)
  };
};
var marketingSpendForMonth = function marketingSpendForMonth(budget, stock, ym) {
  var mktgCat = stock && stock.marketingCat || "";
  var mktgSub = stock && stock.marketingSub || "";
  var matchCat = function matchCat(cat, sub) {
    if (mktgCat) return cat === mktgCat && (!mktgSub || sub === mktgSub);
    return (cat || "").toLowerCase() === "firma" && (sub || "").toLowerCase() === "marketing";
  };
  var total = 0;
  var mData = budget && budget.months && budget.months[ym] || {};
  (mData.expenses || []).forEach(function (e) {
    if (matchCat(e.cat, e.subcat)) total += +e.amount || 0;
  });
  (budget && budget.recurring || []).filter(function (r) {
    return r.type === "expense" && matchCat(r.cat, r.subcat);
  }).forEach(function (r) {
    var rStart = (r.startMonth || "0000-00").slice(0, 7);
    var rEnd = (r.endMonth || "9999-99").slice(0, 7);
    if (ym >= rStart && ym <= rEnd) {
      var ov = ((budget.months || {})[ym] || {}).recurringOverrides || {};
      var amt = ov[r.id] !== undefined ? +ov[r.id].amount : +r.amount || 0;
      total += amt * (r.cycle === "weekly" ? WEEKS_PER_MONTH : 1);
    }
  });
  return total;
};
var calcRentalPaid = function calcRentalPaid(r) {
  var tp = r.transportPaid ? +r.transport || 0 : 0;
  if (r.renewable) return tp + (r.cycles || []).filter(function (c) {
    return c.paid && !c.cancelled;
  }).reduce(function (s, c) {
    return s + (+c.amount || 0);
  }, 0);
  var pp = (r.payments || []).reduce(function (s, p) {
    return s + (+p.amount || 0);
  }, 0);
  var ep = (r.extensions || []).reduce(function (s, e) {
    return s + (+e.amountPaid || 0);
  }, 0);
  return tp + (pp || +r.amountPaid || 0) + ep;
};
var RENTAL_SOURCES = [{
  value: "reklama",
  label: "📢 Reklama",
  color: "#7C6AF4"
}, {
  value: "slawek",
  label: "🤝 Sławek",
  color: "#3DAA72"
}, {
  value: "szpital",
  label: "🏥 Szpital",
  color: "#3E6FB0"
}, {
  value: "organicznie",
  label: "🌱 Organicznie",
  color: "#F4A261"
}];

// ── SYNC KONTAKTU (telefon/adres tej samej osoby: Pacjenci/Wypożyczenia/Wózki NFZ) ─
var CONTACT_FIELDS = {
  phone: "Telefon",
  address: "Adres"
};

// Wszystkie miejsca (poza edytowanym rekordem) należące do tej samej osoby —
// po patientId gdy znane, inaczej po dokładnej zgodności imienia i nazwiska.
function findContactRefs(patientId, patientName, _ref4, exclude) {
  var patients = _ref4.patients,
    rentals = _ref4.rentals,
    nfzCases = _ref4.nfzCases;
  var belongs = function belongs(pid, name) {
    return patientId && pid === patientId || name === patientName;
  };
  var refs = [];
  (patients || []).forEach(function (p) {
    if (exclude.kind === "patient" && p.id === exclude.id) return;
    if (!belongs(p.id, p.name)) return;
    refs.push({
      kind: "patient",
      id: p.id,
      label: p.name,
      phone: p.phone || "",
      address: p.address || ""
    });
  });
  (rentals || []).forEach(function (r) {
    if (exclude.kind === "rental" && r.id === exclude.id) return;
    if (!belongs(r.patientId, r.patientName)) return;
    refs.push({
      kind: "rental",
      id: r.id,
      label: "Wypożyczenie – " + (r.equipment || "❓") + " (" + (r.startDate || "?") + ")",
      phone: r.phone || "",
      address: r.address || ""
    });
  });
  (nfzCases || []).forEach(function (c) {
    if (exclude.kind === "nfz" && c.id === exclude.id) return;
    if (!belongs(c.patientId, c.patientName)) return;
    refs.push({
      kind: "nfz",
      id: c.id,
      label: "Wózek NFZ – " + (c.wheelchairModel || "❓") + " (" + (c.orderDate || "?") + ")",
      phone: c.phone || "",
      address: c.address || ""
    });
  });
  return refs;
}

// Uruchamiane przy zapisie edycji telefonu/adresu w dowolnym z 3 miejsc.
// Puste pola gdzie indziej wypełnia OD RAZU (efekt uboczny). Zwraca listę
// pozycji z INNĄ wartością — do pokazania w ContactSyncModal, nic tam nie zmienia.
function syncContactOnSave(_ref5, collections) {
  var kind = _ref5.kind,
    id = _ref5.id,
    patientId = _ref5.patientId,
    patientName = _ref5.patientName,
    original = _ref5.original,
    updated = _ref5.updated;
  var exclude = {
    kind: kind,
    id: id
  };
  var toFill = [],
    toConfirm = [];
  Object.keys(CONTACT_FIELDS).forEach(function (field) {
    var oldVal = original[field] || "",
      newVal = updated[field] || "";
    if (!newVal || newVal === oldVal) return;
    findContactRefs(patientId, patientName, collections, exclude).forEach(function (ref) {
      var cur = ref[field] || "";
      if (cur === newVal) return;
      if (!cur) toFill.push(_objectSpread(_objectSpread({}, ref), {}, {
        field: field,
        value: newVal
      }));else toConfirm.push(_objectSpread(_objectSpread({}, ref), {}, {
        field: field,
        value: newVal,
        oldValue: cur
      }));
    });
  });
  if (toFill.length) applyContactUpdates(toFill, collections);
  return toConfirm;
}
function applyContactUpdates(items, _ref6) {
  var setPatients = _ref6.setPatients,
    setRentals = _ref6.setRentals,
    setNfzCases = _ref6.setNfzCases;
  var patch = {
    patient: {},
    rental: {},
    nfz: {}
  };
  items.forEach(function (it) {
    patch[it.kind][it.id] = _objectSpread(_objectSpread({}, patch[it.kind][it.id]), {}, _defineProperty({}, it.field, it.value));
  });
  if (Object.keys(patch.patient).length && setPatients) setPatients(function (ps) {
    return ps.map(function (p) {
      return patch.patient[p.id] ? _objectSpread(_objectSpread({}, p), patch.patient[p.id]) : p;
    });
  });
  if (Object.keys(patch.rental).length && setRentals) setRentals(function (rs) {
    return rs.map(function (r) {
      return patch.rental[r.id] ? _objectSpread(_objectSpread({}, r), patch.rental[r.id]) : r;
    });
  });
  if (Object.keys(patch.nfz).length && setNfzCases) setNfzCases(function (cs) {
    return cs.map(function (c) {
      return patch.nfz[c.id] ? _objectSpread(_objectSpread({}, c), patch.nfz[c.id]) : c;
    });
  });
}

// ── UI ────────────────────────────────────────────────────────────────────
var I = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  equip: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  fin: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  mkt: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  wrench: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  box: "M21 8v13H3V8 M1 3h22v5H1z M10 12h4",
  plus: "M12 5v14 M5 12h14",
  back: "M19 12H5 M12 19l-7-7 7-7",
  chk: "M20 6L9 17l-5-5",
  ph: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  sp: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
};
var Ico = function Ico(_ref7) {
  var d = _ref7.d,
    _ref7$s = _ref7.s,
    s = _ref7$s === void 0 ? 20 : _ref7$s,
    _ref7$c = _ref7.c,
    c = _ref7$c === void 0 ? "#1C2B3A" : _ref7$c,
    _ref7$f = _ref7.f,
    f = _ref7$f === void 0 ? "none" : _ref7$f;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: f,
    stroke: c,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, d.split(" M").map(function (p, i) {
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: (i ? "M" : "") + p
    });
  }));
};
var Btn = function Btn(_ref8) {
  var children = _ref8.children,
    onClick = _ref8.onClick,
    _ref8$variant = _ref8.variant,
    variant = _ref8$variant === void 0 ? "primary" : _ref8$variant,
    small = _ref8.small,
    disabled = _ref8.disabled,
    _ref8$style = _ref8.style,
    style = _ref8$style === void 0 ? {} : _ref8$style;
  var dk = useContext(DarkCtx);
  var v = {
    primary: {
      background: "#3E6FB0",
      color: "#fff"
    },
    secondary: {
      background: dk ? "#1E2F4A" : "#E1E9F5",
      color: "#3E6FB0"
    },
    orange: {
      background: "#F4A261",
      color: "#fff"
    },
    danger: {
      background: dk ? "#3A1C1C" : "#FEE2E2",
      color: "#E05C5C"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: _objectSpread(_objectSpread({}, v[variant]), {}, {
      border: "none",
      borderRadius: 12,
      padding: small ? "10px 18px" : "14px 22px",
      fontSize: small ? 14 : 16,
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
      opacity: disabled ? .5 : 1,
      fontFamily: "inherit",
      transition: "opacity .15s, transform .1s"
    }, style)
  }, children);
};
var Card = function Card(_ref9) {
  var children = _ref9.children,
    onClick = _ref9.onClick,
    _ref9$style = _ref9.style,
    style = _ref9$style === void 0 ? {} : _ref9$style;
  var dk = useContext(DarkCtx);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: _objectSpread({
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: "18px 20px",
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      border: dk ? "1px solid #24304A" : "1px solid rgba(16,40,40,.04)",
      cursor: onClick ? "pointer" : "default"
    }, style)
  }, children);
};
var Badge = function Badge(_ref0) {
  var children = _ref0.children,
    _ref0$color = _ref0.color,
    color = _ref0$color === void 0 ? "#3E6FB0" : _ref0$color;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: color + "28",
      color: color,
      borderRadius: 8,
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 700
    }
  }, children);
};
var Empty = function Empty(_ref1) {
  var text = _ref1.text;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#7A8FA6",
      fontSize: 14
    }
  }, text);
};
var Av = function Av(_ref10) {
  var name = _ref10.name;
  var i = (name || "?").split(" ").slice(0, 2).map(function (w) {
    return w[0];
  }).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "#E1E9F5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 15,
      color: "#3E6FB0",
      flexShrink: 0
    }
  }, i);
};

// Etykieta nagłówka sekcji — zastępuje powtarzany wszędzie inline styl
var SectionLabel = function SectionLabel(_ref11) {
  var children = _ref11.children,
    _ref11$style = _ref11.style,
    style = _ref11$style === void 0 ? {} : _ref11$style;
  var dk = useContext(DarkCtx);
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      fontSize: 11,
      fontWeight: 700,
      color: dk ? "#6B84AC" : "#7A8FA6",
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 10
    }, style)
  }, children);
};

// Karta metryki (etykieta + duża wartość), do rzędów statystyk
var StatCard = function StatCard(_ref12) {
  var label = _ref12.label,
    value = _ref12.value,
    accent = _ref12.accent,
    _ref12$style = _ref12.style,
    style = _ref12$style === void 0 ? {} : _ref12$style;
  var dk = useContext(DarkCtx);
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: "16px 18px",
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      border: dk ? "1px solid #24304A" : "1px solid rgba(16,40,40,.04)"
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: dk ? "#7AA8A8" : "#7A8FA6",
      marginBottom: 6,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: accent || (dk ? "#E8F5F5" : "#1C2B3A")
    }
  }, value));
};

// Wiersz listy: ikona w kolorowym kółku + tytuł + podtytuł + treść na końcu
var ListRow = function ListRow(_ref13) {
  var icon = _ref13.icon,
    iconBg = _ref13.iconBg,
    iconColor = _ref13.iconColor,
    title = _ref13.title,
    subtitle = _ref13.subtitle,
    trailing = _ref13.trailing,
    onClick = _ref13.onClick,
    last = _ref13.last,
    _ref13$style = _ref13.style,
    style = _ref13$style === void 0 ? {} : _ref13$style;
  var dk = useContext(DarkCtx);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: _objectSpread({
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 2px",
      borderBottom: last ? "none" : "1px solid ".concat(dk ? "#20302E" : "#F0F3F5"),
      cursor: onClick ? "pointer" : "default"
    }, style)
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: iconBg || (dk ? "#1E2F4A" : "#E1E9F5"),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: 16,
      color: iconColor || "#3E6FB0"
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: dk ? "#E8F5F5" : "#1C2B3A",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 2,
      color: dk ? "#6A9A9A" : "#7A8FA6"
    }
  }, subtitle)), trailing && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, trailing));
};
