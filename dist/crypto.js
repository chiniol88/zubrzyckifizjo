// Plik wygenerowany z js/crypto.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// ── SZYFROWANIE DANYCH NA URZĄDZENIU ─────────────────────────────────────────
// Dane są szyfrowane w przeglądarce (AES-GCM 256) ZANIM trafią do bazy. W bazie, w historii zmian i w kopiach leży szyfr.
// Klucz danych (DEK) jest losowy; zapisany w bazie tylko w postaci "zapakowanej" dwoma kluczami:
//   1) hasło szyfrowania Patryka (PBKDF2-SHA256, 600 000 iteracji) i 2) klucz awaryjny (losowy, 160 bitów, pokazany raz).
// Bez hasła i bez klucza awaryjnego danych nie odzyska nikt (ani Supabase, ani autor apki).
// Stan: "checking" (jeszcze nie wiemy) | "off" (brak szyfrowania) | "locked" (jest szyfrowanie, brak klucza na tym urządzeniu)
//       | "on" (klucz dostępny) | "error" (nie udało się ustalić — nie zapisujemy niczego).
var FZ_DATA_KEYS = ["fizjo-visits", "fizjo-patients", "fizjo-rentals", "fizjo-finances", "fizjo-stock", "fizjo-nfz", "fizjo-todos", "fizjo-events", "fizjo-settings", "fizjo-budget", "fizjo-machines", "fizjo-wealth"];
var FZ_SNAP_KEYS = [0, 1, 2, 3, 4, 5, 6].map(function (i) {
  return "fizjo-backup-" + i;
});
var FZ_META_KEY = "fizjo-crypto";
var FZ_PBKDF2_ITER = 600000;
var FZ_CRYPTO = {
  state: "checking",
  dek: null,
  meta: null
};
var _cte = new TextEncoder(),
  _ctd = new TextDecoder();
var _crand = function _crand(n) {
  return crypto.getRandomValues(new Uint8Array(n));
};
function _b64e(u8) {
  var s = "";
  var CH = 0x8000;
  for (var i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  return btoa(s);
}
function _b64d(str) {
  var s = atob(str);
  var u = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u;
}
var _cnorm = function _cnorm(s) {
  return String(s || "").normalize("NFKC");
};
var _B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function _b32(u8) {
  var bits = 0,
    val = 0,
    out = "";
  var _iterator = _createForOfIteratorHelper(u8),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var b = _step.value;
      val = (val << 8 | b) >>> 0;
      bits += 8;
      while (bits >= 5) {
        out += _B32[val >>> bits - 5 & 31];
        bits -= 5;
      }
      val &= (1 << bits) - 1;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (bits > 0) out += _B32[val << 5 - bits & 31];
  return out;
}
var czNewRecovery = function czNewRecovery() {
  return _b32(_crand(20)).match(/.{1,4}/g).join("-");
}; // 32 znaki w 8 grupach
function _kekFromPass(_x, _x2, _x3) {
  return _kekFromPass2.apply(this, arguments);
}
function _kekFromPass2() {
  _kekFromPass2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(pass, salt, iter) {
    var base;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return crypto.subtle.importKey("raw", _cte.encode(_cnorm(pass)), "PBKDF2", false, ["deriveKey"]);
        case 1:
          base = _context.v;
          return _context.a(2, crypto.subtle.deriveKey({
            name: "PBKDF2",
            hash: "SHA-256",
            salt: salt,
            iterations: iter
          }, base, {
            name: "AES-GCM",
            length: 256
          }, false, ["wrapKey", "unwrapKey"]));
      }
    }, _callee);
  }));
  return _kekFromPass2.apply(this, arguments);
}
function _kekFromRecovery(_x4) {
  return _kekFromRecovery2.apply(this, arguments);
}
function _kekFromRecovery2() {
  _kekFromRecovery2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(rec) {
    var clean, h;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          clean = _cnorm(rec).toUpperCase().replace(/[^A-Z2-7]/g, "");
          _context2.n = 1;
          return crypto.subtle.digest("SHA-256", _cte.encode("fizjo-recovery:" + clean));
        case 1:
          h = _context2.v;
          return _context2.a(2, crypto.subtle.importKey("raw", h, {
            name: "AES-GCM"
          }, false, ["wrapKey", "unwrapKey"]));
      }
    }, _callee2);
  }));
  return _kekFromRecovery2.apply(this, arguments);
}
function _cwrap(_x5, _x6) {
  return _cwrap2.apply(this, arguments);
}
function _cwrap2() {
  _cwrap2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(dek, kek) {
    var iv, w;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          iv = _crand(12);
          _context3.n = 1;
          return crypto.subtle.wrapKey("raw", dek, kek, {
            name: "AES-GCM",
            iv: iv
          });
        case 1:
          w = _context3.v;
          return _context3.a(2, {
            iv: _b64e(iv),
            ct: _b64e(new Uint8Array(w))
          });
      }
    }, _callee3);
  }));
  return _cwrap2.apply(this, arguments);
}
function _cunwrap(env, kek, extractable) {
  return crypto.subtle.unwrapKey("raw", _b64d(env.ct), kek, {
    name: "AES-GCM",
    iv: _b64d(env.iv)
  }, {
    name: "AES-GCM"
  }, !!extractable, ["encrypt", "decrypt"]);
}

// szyfrowanie jednej wartości; nazwa klucza jest "dołączonym dowodem", więc nie da się podmienić wierszy między sobą
function czEncrypt(_x7, _x8, _x9) {
  return _czEncrypt.apply(this, arguments);
}
function _czEncrypt() {
  _czEncrypt = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(key, value, dek) {
    var iv, ct;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          iv = _crand(12);
          _context4.n = 1;
          return crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv,
            additionalData: _cte.encode(key)
          }, dek || FZ_CRYPTO.dek, _cte.encode(JSON.stringify(value)));
        case 1:
          ct = _context4.v;
          return _context4.a(2, {
            v: 1,
            iv: _b64e(iv),
            ct: _b64e(new Uint8Array(ct))
          });
      }
    }, _callee4);
  }));
  return _czEncrypt.apply(this, arguments);
}
function czDecrypt(_x0, _x1, _x10) {
  return _czDecrypt.apply(this, arguments);
} // nowe szyfrowanie: zwraca meta (do zapisania w bazie), klucz roboczy i klucz awaryjny (pokazać użytkownikowi raz)
function _czDecrypt() {
  _czDecrypt = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(key, env, dek) {
    var pt;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: _b64d(env.iv),
            additionalData: _cte.encode(key)
          }, dek || FZ_CRYPTO.dek, _b64d(env.ct));
        case 1:
          pt = _context5.v;
          return _context5.a(2, JSON.parse(_ctd.decode(pt)));
      }
    }, _callee5);
  }));
  return _czDecrypt.apply(this, arguments);
}
function czCreateMeta(_x11) {
  return _czCreateMeta.apply(this, arguments);
}
function _czCreateMeta() {
  _czCreateMeta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(passphrase) {
    var dekX, salt, kek, recovery, rk, wrapPass, wrapRec, dek, check, meta;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return crypto.subtle.generateKey({
            name: "AES-GCM",
            length: 256
          }, true, ["encrypt", "decrypt"]);
        case 1:
          dekX = _context6.v;
          salt = _crand(16);
          _context6.n = 2;
          return _kekFromPass(passphrase, salt, FZ_PBKDF2_ITER);
        case 2:
          kek = _context6.v;
          recovery = czNewRecovery();
          _context6.n = 3;
          return _kekFromRecovery(recovery);
        case 3:
          rk = _context6.v;
          _context6.n = 4;
          return _cwrap(dekX, kek);
        case 4:
          wrapPass = _context6.v;
          _context6.n = 5;
          return _cwrap(dekX, rk);
        case 5:
          wrapRec = _context6.v;
          _context6.n = 6;
          return _cunwrap(wrapPass, kek, false);
        case 6:
          dek = _context6.v;
          _context6.n = 7;
          return czEncrypt("fizjo-crypto-check", "ok", dek);
        case 7:
          check = _context6.v;
          meta = {
            v: 1,
            id: _b64e(_crand(9)),
            kdf: {
              alg: "PBKDF2-SHA256",
              iter: FZ_PBKDF2_ITER,
              salt: _b64e(salt)
            },
            wrapPass: wrapPass,
            wrapRec: wrapRec,
            check: check,
            createdAt: new Date().toISOString()
          };
          return _context6.a(2, {
            meta: meta,
            dek: dek,
            recovery: recovery
          });
      }
    }, _callee6);
  }));
  return _czCreateMeta.apply(this, arguments);
}
function czVerifyDek(_x12, _x13) {
  return _czVerifyDek.apply(this, arguments);
} // odblokowanie hasłem albo kluczem awaryjnym; rzuca wyjątek przy złym haśle/kluczu
function _czVerifyDek() {
  _czVerifyDek = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(meta, dek) {
    var _t, _t2;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return czDecrypt("fizjo-crypto-check", meta.check, dek);
        case 1:
          _t = _context7.v;
          return _context7.a(2, _t === "ok");
        case 2:
          _context7.p = 2;
          _t2 = _context7.v;
          return _context7.a(2, false);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return _czVerifyDek.apply(this, arguments);
}
function czDekFromPass(_x14, _x15, _x16) {
  return _czDekFromPass.apply(this, arguments);
}
function _czDekFromPass() {
  _czDekFromPass = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(meta, pass, extractable) {
    var _t3, _t4;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _t3 = _cunwrap;
          _t4 = meta.wrapPass;
          _context8.n = 1;
          return _kekFromPass(pass, _b64d(meta.kdf.salt), meta.kdf.iter);
        case 1:
          return _context8.a(2, _t3(_t4, _context8.v, extractable));
      }
    }, _callee8);
  }));
  return _czDekFromPass.apply(this, arguments);
}
function czDekFromRecovery(_x17, _x18, _x19) {
  return _czDekFromRecovery.apply(this, arguments);
} // klucz roboczy zapamiętany na tym urządzeniu (nieeksportowalny obiekt w IndexedDB) — bez logowania do bazy jest bezużyteczny
function _czDekFromRecovery() {
  _czDekFromRecovery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(meta, rec, extractable) {
    var _t5, _t6;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _t5 = _cunwrap;
          _t6 = meta.wrapRec;
          _context9.n = 1;
          return _kekFromRecovery(rec);
        case 1:
          return _context9.a(2, _t5(_t6, _context9.v, extractable));
      }
    }, _callee9);
  }));
  return _czDekFromRecovery.apply(this, arguments);
}
function _cidb() {
  return new Promise(function (res, rej) {
    var r = indexedDB.open("fizjo-sec", 1);
    r.onupgradeneeded = function () {
      return r.result.createObjectStore("keys");
    };
    r.onsuccess = function () {
      return res(r.result);
    };
    r.onerror = function () {
      return rej(r.error);
    };
  });
}
function czSaveKey(_x20, _x21) {
  return _czSaveKey.apply(this, arguments);
}
function _czSaveKey() {
  _czSaveKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id, dek) {
    var db, _t7;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _context0.n = 1;
          return _cidb();
        case 1:
          db = _context0.v;
          _context0.n = 2;
          return new Promise(function (res, rej) {
            var tx = db.transaction("keys", "readwrite");
            tx.objectStore("keys").put(dek, id);
            tx.oncomplete = res;
            tx.onerror = function () {
              return rej(tx.error);
            };
          });
        case 2:
          db.close();
          return _context0.a(2, true);
        case 3:
          _context0.p = 3;
          _t7 = _context0.v;
          return _context0.a(2, false);
      }
    }, _callee0, null, [[0, 3]]);
  }));
  return _czSaveKey.apply(this, arguments);
}
function czLoadKey(_x22) {
  return _czLoadKey.apply(this, arguments);
}
function _czLoadKey() {
  _czLoadKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(id) {
    var db, v, _t8;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return _cidb();
        case 1:
          db = _context1.v;
          _context1.n = 2;
          return new Promise(function (res, rej) {
            var tx = db.transaction("keys", "readonly");
            var q = tx.objectStore("keys").get(id);
            q.onsuccess = function () {
              return res(q.result || null);
            };
            q.onerror = function () {
              return rej(q.error);
            };
          });
        case 2:
          v = _context1.v;
          db.close();
          return _context1.a(2, v);
        case 3:
          _context1.p = 3;
          _t8 = _context1.v;
          return _context1.a(2, null);
      }
    }, _callee1, null, [[0, 3]]);
  }));
  return _czLoadKey.apply(this, arguments);
}
function czForgetKey() {
  return _czForgetKey.apply(this, arguments);
} // ── meta w bazie (wiersz "fizjo-crypto": tylko zapakowane klucze, nigdy klucz jawny) ──
function _czForgetKey() {
  _czForgetKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
    var db, _t9;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return _cidb();
        case 1:
          db = _context10.v;
          _context10.n = 2;
          return new Promise(function (res, rej) {
            var tx = db.transaction("keys", "readwrite");
            tx.objectStore("keys").clear();
            tx.oncomplete = res;
            tx.onerror = function () {
              return rej(tx.error);
            };
          });
        case 2:
          db.close();
          _context10.n = 4;
          break;
        case 3:
          _context10.p = 3;
          _t9 = _context10.v;
        case 4:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 3]]);
  }));
  return _czForgetKey.apply(this, arguments);
}
function czFetchMeta() {
  return _czFetchMeta.apply(this, arguments);
}
function _czFetchMeta() {
  _czFetchMeta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
    var r, d, v, _t0;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return apiFetch("".concat(SUPA_URL, "/rest/v1/app_data?key=eq.").concat(FZ_META_KEY, "&select=value"), function () {
            return {
              headers: getHeaders()
            };
          });
        case 1:
          r = _context11.v;
          if (r.ok) {
            _context11.n = 2;
            break;
          }
          return _context11.a(2, {
            meta: null,
            error: true
          });
        case 2:
          _context11.n = 3;
          return r.json();
        case 3:
          d = _context11.v;
          if (Array.isArray(d)) {
            _context11.n = 4;
            break;
          }
          return _context11.a(2, {
            meta: null,
            error: true
          });
        case 4:
          v = d[0] ? d[0].value : null;
          return _context11.a(2, {
            meta: v && !v.disabled && v.wrapPass ? v : null,
            error: false
          });
        case 5:
          _context11.p = 5;
          _t0 = _context11.v;
          return _context11.a(2, {
            meta: null,
            error: true
          });
      }
    }, _callee11, null, [[0, 5]]);
  }));
  return _czFetchMeta.apply(this, arguments);
}
function czWriteMeta(_x23) {
  return _czWriteMeta.apply(this, arguments);
} // surowy odczyt wiersza (do weryfikacji i kontroli): {row} albo {error}
function _czWriteMeta() {
  _czWriteMeta = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(meta) {
    var r, _t1;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _context12.n = 1;
          return apiFetch("".concat(SUPA_URL, "/rest/v1/app_data"), function () {
            return {
              method: "POST",
              headers: _objectSpread(_objectSpread({}, getHeaders()), {}, {
                "Prefer": "resolution=merge-duplicates"
              }),
              body: JSON.stringify({
                key: FZ_META_KEY,
                value: meta
              })
            };
          });
        case 1:
          r = _context12.v;
          return _context12.a(2, r.ok);
        case 2:
          _context12.p = 2;
          _t1 = _context12.v;
          return _context12.a(2, false);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return _czWriteMeta.apply(this, arguments);
}
function czRawRow(_x24) {
  return _czRawRow.apply(this, arguments);
} // ustalenie stanu po zalogowaniu
function _czRawRow() {
  _czRawRow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(key) {
    var r, d, _t10;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _context13.n = 1;
          return apiFetch("".concat(SUPA_URL, "/rest/v1/app_data?key=eq.").concat(key, "&select=value"), function () {
            return {
              headers: getHeaders()
            };
          });
        case 1:
          r = _context13.v;
          if (r.ok) {
            _context13.n = 2;
            break;
          }
          return _context13.a(2, {
            error: true
          });
        case 2:
          _context13.n = 3;
          return r.json();
        case 3:
          d = _context13.v;
          if (Array.isArray(d)) {
            _context13.n = 4;
            break;
          }
          return _context13.a(2, {
            error: true
          });
        case 4:
          return _context13.a(2, {
            row: d[0] ? d[0].value : null
          });
        case 5:
          _context13.p = 5;
          _t10 = _context13.v;
          return _context13.a(2, {
            error: true
          });
      }
    }, _callee13, null, [[0, 5]]);
  }));
  return _czRawRow.apply(this, arguments);
}
function czInit() {
  return _czInit.apply(this, arguments);
} // odblokowanie na tym urządzeniu; viaRecovery=true: argument to klucz awaryjny. Zwraca true/false.
function _czInit() {
  _czInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
    var _yield$czFetchMeta, meta, error, dek, _t11;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          FZ_CRYPTO.state = "checking";
          _context14.n = 1;
          return czFetchMeta();
        case 1:
          _yield$czFetchMeta = _context14.v;
          meta = _yield$czFetchMeta.meta;
          error = _yield$czFetchMeta.error;
          if (!error) {
            _context14.n = 2;
            break;
          }
          FZ_CRYPTO.state = "error";
          return _context14.a(2, "error");
        case 2:
          if (meta) {
            _context14.n = 3;
            break;
          }
          FZ_CRYPTO.meta = null;
          FZ_CRYPTO.dek = null;
          FZ_CRYPTO.state = "off";
          return _context14.a(2, "off");
        case 3:
          FZ_CRYPTO.meta = meta;
          _context14.n = 4;
          return czLoadKey(meta.id);
        case 4:
          dek = _context14.v;
          _t11 = dek;
          if (!_t11) {
            _context14.n = 6;
            break;
          }
          _context14.n = 5;
          return czVerifyDek(meta, dek);
        case 5:
          _t11 = _context14.v;
        case 6:
          if (!_t11) {
            _context14.n = 7;
            break;
          }
          FZ_CRYPTO.dek = dek;
          FZ_CRYPTO.state = "on";
          return _context14.a(2, "on");
        case 7:
          FZ_CRYPTO.dek = null;
          FZ_CRYPTO.state = "locked";
          return _context14.a(2, "locked");
      }
    }, _callee14);
  }));
  return _czInit.apply(this, arguments);
}
function czUnlock(_x25) {
  return _czUnlock.apply(this, arguments);
} // ── włączenie: getAll() zwraca {klucz: wartość} z pamięci aplikacji (aktualny stan wszystkich zbiorów) ──
function _czUnlock() {
  _czUnlock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(secret) {
    var _ref,
      _ref$viaRecovery,
      viaRecovery,
      _ref$remember,
      remember,
      meta,
      dek,
      _args15 = arguments,
      _t12,
      _t13;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _ref = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {}, _ref$viaRecovery = _ref.viaRecovery, viaRecovery = _ref$viaRecovery === void 0 ? false : _ref$viaRecovery, _ref$remember = _ref.remember, remember = _ref$remember === void 0 ? true : _ref$remember;
          meta = FZ_CRYPTO.meta;
          if (meta) {
            _context15.n = 1;
            break;
          }
          return _context15.a(2, false);
        case 1:
          _context15.p = 1;
          if (!viaRecovery) {
            _context15.n = 3;
            break;
          }
          _context15.n = 2;
          return czDekFromRecovery(meta, secret, false);
        case 2:
          _t12 = _context15.v;
          _context15.n = 5;
          break;
        case 3:
          _context15.n = 4;
          return czDekFromPass(meta, secret, false);
        case 4:
          _t12 = _context15.v;
        case 5:
          dek = _t12;
          _context15.n = 6;
          return czVerifyDek(meta, dek);
        case 6:
          if (_context15.v) {
            _context15.n = 7;
            break;
          }
          return _context15.a(2, false);
        case 7:
          FZ_CRYPTO.dek = dek;
          FZ_CRYPTO.state = "on";
          if (!remember) {
            _context15.n = 8;
            break;
          }
          _context15.n = 8;
          return czSaveKey(meta.id, dek);
        case 8:
          return _context15.a(2, true);
        case 9:
          _context15.p = 9;
          _t13 = _context15.v;
          return _context15.a(2, false);
      }
    }, _callee15, null, [[1, 9]]);
  }));
  return _czUnlock.apply(this, arguments);
}
function czEnable(_x26, _x27, _x28) {
  return _czEnable.apply(this, arguments);
} // ── wyłączenie: wszystkie zbiory wracają do jawnego zapisu, meta jest wyłączone ──
function _czEnable() {
  _czEnable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(passphrase, getAll, onProgress) {
    var _ref2,
      _ref2$remember,
      remember,
      _ref2$prepared,
      prepared,
      created,
      all,
      keys,
      done,
      rollback,
      i,
      k,
      ok,
      verified,
      raw,
      _args17 = arguments,
      _t15,
      _t16,
      _t17,
      _t18,
      _t19;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          _ref2 = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : {}, _ref2$remember = _ref2.remember, remember = _ref2$remember === void 0 ? true : _ref2$remember, _ref2$prepared = _ref2.prepared, prepared = _ref2$prepared === void 0 ? null : _ref2$prepared;
          if (!(FZ_CRYPTO.state !== "off")) {
            _context17.n = 1;
            break;
          }
          throw new Error("Szyfrowanie jest już włączone albo nie wiadomo, jaki jest jego stan.");
        case 1:
          _t15 = prepared;
          if (_t15) {
            _context17.n = 3;
            break;
          }
          _context17.n = 2;
          return czCreateMeta(passphrase);
        case 2:
          _t15 = _context17.v;
        case 3:
          created = _t15;
          all = getAll();
          keys = [].concat(FZ_DATA_KEYS, _toConsumableArray(FZ_SNAP_KEYS)).filter(function (k) {
            return all[k] !== undefined && all[k] !== null;
          });
          done = [];
          rollback = /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
              var _i, _done, k, _t14;
              return _regenerator().w(function (_context16) {
                while (1) switch (_context16.p = _context16.n) {
                  case 0:
                    FZ_CRYPTO.state = "off";
                    _i = 0, _done = done;
                  case 1:
                    if (!(_i < _done.length)) {
                      _context16.n = 6;
                      break;
                    }
                    k = _done[_i];
                    _context16.p = 2;
                    _context16.n = 3;
                    return dbSet(k, all[k]);
                  case 3:
                    _context16.n = 5;
                    break;
                  case 4:
                    _context16.p = 4;
                    _t14 = _context16.v;
                  case 5:
                    _i++;
                    _context16.n = 1;
                    break;
                  case 6:
                    _context16.n = 7;
                    return czWriteMeta({
                      v: 1,
                      disabled: true
                    });
                  case 7:
                    FZ_CRYPTO.meta = null;
                    FZ_CRYPTO.dek = null;
                  case 8:
                    return _context16.a(2);
                }
              }, _callee16, null, [[2, 4]]);
            }));
            return function rollback() {
              return _ref3.apply(this, arguments);
            };
          }();
          FZ_CRYPTO.meta = created.meta;
          FZ_CRYPTO.dek = created.dek;
          // 1) znacznik w bazie: od teraz inne urządzenia wiedzą, że dane są szyfrowane
          _context17.n = 4;
          return czWriteMeta(created.meta);
        case 4:
          if (_context17.v) {
            _context17.n = 5;
            break;
          }
          FZ_CRYPTO.meta = null;
          FZ_CRYPTO.dek = null;
          throw new Error("Nie udało się zapisać ustawień szyfrowania w bazie. Nic nie zostało zmienione.");
        case 5:
          FZ_CRYPTO.state = "on";
          // 2) każdy zbiór: zapis zaszyfrowany + odczyt kontrolny (musi dać dokładnie te same dane)
          i = 0;
        case 6:
          if (!(i < keys.length)) {
            _context17.n = 16;
            break;
          }
          k = keys[i];
          if (onProgress) onProgress(i, keys.length, k);
          _context17.n = 7;
          return dbSet(k, all[k]);
        case 7:
          ok = _context17.v;
          verified = false;
          if (!ok) {
            _context17.n = 12;
            break;
          }
          _context17.n = 8;
          return czRawRow(k);
        case 8:
          raw = _context17.v;
          if (!(raw.row && raw.row._e)) {
            _context17.n = 12;
            break;
          }
          _context17.p = 9;
          _t16 = JSON;
          _context17.n = 10;
          return czDecrypt(k, raw.row._e);
        case 10:
          _t17 = _t16.stringify.call(_t16, _context17.v);
          _t18 = JSON.stringify(all[k]);
          verified = _t17 === _t18;
          _context17.n = 12;
          break;
        case 11:
          _context17.p = 11;
          _t19 = _context17.v;
        case 12:
          if (verified) {
            _context17.n = 14;
            break;
          }
          _context17.n = 13;
          return rollback();
        case 13:
          throw new Error("Kontrola zbioru „" + k + "” nie powiodła się. Wszystko zostało przywrócone do stanu sprzed szyfrowania.");
        case 14:
          done.push(k);
        case 15:
          i++;
          _context17.n = 6;
          break;
        case 16:
          if (!remember) {
            _context17.n = 17;
            break;
          }
          _context17.n = 17;
          return czSaveKey(created.meta.id, created.dek);
        case 17:
          if (onProgress) onProgress(keys.length, keys.length, "");
          return _context17.a(2, {
            recovery: created.recovery,
            count: keys.length
          });
      }
    }, _callee17, null, [[9, 11]]);
  }));
  return _czEnable.apply(this, arguments);
}
function czDisable(_x29, _x30) {
  return _czDisable.apply(this, arguments);
} // ── zmiana hasła: stare hasło albo klucz awaryjny + nowe hasło; dane nie są szyfrowane ponownie ──
function _czDisable() {
  _czDisable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(getAll, onProgress) {
    var all, keys, i, k, ok, verified, raw;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.n) {
        case 0:
          if (!(FZ_CRYPTO.state !== "on" || !FZ_CRYPTO.dek)) {
            _context18.n = 1;
            break;
          }
          throw new Error("Najpierw odblokuj dane.");
        case 1:
          all = getAll();
          keys = [].concat(FZ_DATA_KEYS, _toConsumableArray(FZ_SNAP_KEYS)).filter(function (k) {
            return all[k] !== undefined && all[k] !== null;
          });
          FZ_CRYPTO.state = "off"; // zapisy jawne; klucz zostaje w pamięci do odczytu
          i = 0;
        case 2:
          if (!(i < keys.length)) {
            _context18.n = 7;
            break;
          }
          k = keys[i];
          if (onProgress) onProgress(i, keys.length, k);
          _context18.n = 3;
          return dbSet(k, all[k]);
        case 3:
          ok = _context18.v;
          verified = false;
          if (!ok) {
            _context18.n = 5;
            break;
          }
          _context18.n = 4;
          return czRawRow(k);
        case 4:
          raw = _context18.v;
          verified = !!(raw.row && raw.row._d !== undefined && JSON.stringify(raw.row._d) === JSON.stringify(all[k]));
        case 5:
          if (verified) {
            _context18.n = 6;
            break;
          }
          FZ_CRYPTO.state = "on";
          throw new Error("Nie udało się zapisać zbioru „" + k + "” bez szyfrowania. Szyfrowanie zostaje włączone, nic nie zostało utracone.");
        case 6:
          i++;
          _context18.n = 2;
          break;
        case 7:
          _context18.n = 8;
          return czWriteMeta({
            v: 1,
            disabled: true
          });
        case 8:
          _context18.n = 9;
          return czForgetKey();
        case 9:
          FZ_CRYPTO.meta = null;
          FZ_CRYPTO.dek = null;
          return _context18.a(2, true);
      }
    }, _callee18);
  }));
  return _czDisable.apply(this, arguments);
}
function czChangePass(_x31, _x32) {
  return _czChangePass.apply(this, arguments);
} // ── kontrola: ile zbiorów jest naprawdę zaszyfrowanych w bazie ──
function _czChangePass() {
  _czChangePass = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(oldSecret, newPass) {
    var _ref4,
      _ref4$viaRecovery,
      viaRecovery,
      meta,
      dekX,
      salt,
      kek,
      wrapPass,
      nm,
      dek,
      _args19 = arguments,
      _t20;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.n) {
        case 0:
          _ref4 = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : {}, _ref4$viaRecovery = _ref4.viaRecovery, viaRecovery = _ref4$viaRecovery === void 0 ? false : _ref4$viaRecovery;
          meta = FZ_CRYPTO.meta;
          if (meta) {
            _context19.n = 1;
            break;
          }
          throw new Error("Szyfrowanie nie jest włączone.");
        case 1:
          if (!viaRecovery) {
            _context19.n = 3;
            break;
          }
          _context19.n = 2;
          return czDekFromRecovery(meta, oldSecret, true);
        case 2:
          _t20 = _context19.v;
          _context19.n = 5;
          break;
        case 3:
          _context19.n = 4;
          return czDekFromPass(meta, oldSecret, true);
        case 4:
          _t20 = _context19.v;
        case 5:
          dekX = _t20;
          // rzuca przy złym haśle/kluczu
          salt = _crand(16);
          _context19.n = 6;
          return _kekFromPass(newPass, salt, FZ_PBKDF2_ITER);
        case 6:
          kek = _context19.v;
          _context19.n = 7;
          return _cwrap(dekX, kek);
        case 7:
          wrapPass = _context19.v;
          nm = _objectSpread(_objectSpread({}, meta), {}, {
            kdf: _objectSpread(_objectSpread({}, meta.kdf), {}, {
              iter: FZ_PBKDF2_ITER,
              salt: _b64e(salt)
            }),
            wrapPass: wrapPass
          });
          _context19.n = 8;
          return czWriteMeta(nm);
        case 8:
          if (_context19.v) {
            _context19.n = 9;
            break;
          }
          throw new Error("Nie udało się zapisać nowego hasła.");
        case 9:
          FZ_CRYPTO.meta = nm;
          _context19.n = 10;
          return _cunwrap(wrapPass, kek, false);
        case 10:
          dek = _context19.v;
          FZ_CRYPTO.dek = dek;
          FZ_CRYPTO.state = "on";
          _context19.n = 11;
          return czSaveKey(nm.id, dek);
        case 11:
          return _context19.a(2, true);
      }
    }, _callee19);
  }));
  return _czChangePass.apply(this, arguments);
}
function czAudit() {
  return _czAudit.apply(this, arguments);
} // ── kopie dzienne w bazie: 7 miejsc (dzień tygodnia), nadpisywane co tydzień ──
function _czAudit() {
  _czAudit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
    var out, _i2, _arr, k, r;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.n) {
        case 0:
          out = {
            enc: [],
            plain: [],
            missing: [],
            unreadable: []
          };
          _i2 = 0, _arr = [].concat(FZ_DATA_KEYS, _toConsumableArray(FZ_SNAP_KEYS));
        case 1:
          if (!(_i2 < _arr.length)) {
            _context20.n = 4;
            break;
          }
          k = _arr[_i2];
          _context20.n = 2;
          return czRawRow(k);
        case 2:
          r = _context20.v;
          if (r.error) out.unreadable.push(k);else if (!r.row) out.missing.push(k);else if (r.row._e) out.enc.push(k);else out.plain.push(k);
        case 3:
          _i2++;
          _context20.n = 1;
          break;
        case 4:
          return _context20.a(2, out);
      }
    }, _callee20);
  }));
  return _czAudit.apply(this, arguments);
}
function czSlotTs(_x33) {
  return _czSlotTs.apply(this, arguments);
}
function _czSlotTs() {
  _czSlotTs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(slot) {
    var r, d, _t21;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _context21.n = 1;
          return apiFetch("".concat(SUPA_URL, "/rest/v1/app_data?key=eq.fizjo-backup-").concat(slot, "&select=ts:value->>_ts"), function () {
            return {
              headers: getHeaders()
            };
          });
        case 1:
          r = _context21.v;
          if (r.ok) {
            _context21.n = 2;
            break;
          }
          return _context21.a(2, null);
        case 2:
          _context21.n = 3;
          return r.json();
        case 3:
          d = _context21.v;
          if (Array.isArray(d)) {
            _context21.n = 4;
            break;
          }
          return _context21.a(2, null);
        case 4:
          if (d[0]) {
            _context21.n = 5;
            break;
          }
          return _context21.a(2, 0);
        case 5:
          return _context21.a(2, +d[0].ts || 0);
        case 6:
          _context21.p = 6;
          _t21 = _context21.v;
          return _context21.a(2, null);
      }
    }, _callee21, null, [[0, 6]]);
  }));
  return _czSlotTs.apply(this, arguments);
}
function czListSnapshots() {
  return _czListSnapshots.apply(this, arguments);
}
function _czListSnapshots() {
  _czListSnapshots = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
    var out, _loop, _ret, i;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.n) {
        case 0:
          out = [];
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var _yield$dbGet, data, error, c;
            return _regenerator().w(function (_context22) {
              while (1) switch (_context22.n) {
                case 0:
                  _context22.n = 1;
                  return dbGet("fizjo-backup-" + i);
                case 1:
                  _yield$dbGet = _context22.v;
                  data = _yield$dbGet.data;
                  error = _yield$dbGet.error;
                  if (!error) {
                    _context22.n = 2;
                    break;
                  }
                  out.push({
                    slot: i,
                    error: true
                  });
                  return _context22.a(2, 0);
                case 2:
                  if (!(!data || !data.data)) {
                    _context22.n = 3;
                    break;
                  }
                  return _context22.a(2, 0);
                case 3:
                  c = function c(k) {
                    return Array.isArray(data.data[k]) ? data.data[k].length : null;
                  };
                  out.push({
                    slot: i,
                    savedAt: data.savedAt,
                    counts: {
                      visits: c("visits"),
                      patients: c("patients"),
                      rentals: c("rentals"),
                      finances: c("finances")
                    },
                    data: data.data
                  });
                case 4:
                  return _context22.a(2);
              }
            }, _loop);
          });
          i = 0;
        case 1:
          if (!(i < 7)) {
            _context23.n = 4;
            break;
          }
          return _context23.d(_regeneratorValues(_loop()), 2);
        case 2:
          _ret = _context23.v;
          if (!(_ret === 0)) {
            _context23.n = 3;
            break;
          }
          return _context23.a(3, 3);
        case 3:
          i++;
          _context23.n = 1;
          break;
        case 4:
          return _context23.a(2, out.sort(function (a, b) {
            return String(b.savedAt || "").localeCompare(String(a.savedAt || ""));
          }));
      }
    }, _callee22);
  }));
  return _czListSnapshots.apply(this, arguments);
}
