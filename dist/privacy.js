// Plik wygenerowany z js/privacy.js przez build.py - nie edytowac recznie.
"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// ── PRYWATNOŚĆ DANYCH PACJENTA ───────────────────────────────────────────────
// Jedno miejsce, które wie, gdzie mogą być dane osobowe pacjenta, i usuwa je ze WSZYSTKICH zbiorów naraz.
// Zasada: (1) własne rekordy pacjenta (wizyty, wypożyczenia, sprawy NFZ, karta) są czyszczone z danych osobowych i notatek,
// kwoty i daty zostają; (2) cały wolny tekst w pozostałych zbiorach (kalendarz, zadania, notatki innych rekordów,
// uwagi w Magazynie, opisy w Finansach...) jest przeszukiwany po pełnym nazwisku, numerach telefonu, adresie i diagnozie.
// Funkcje są czyste (nie zmieniają stanu), dzięki czemu da się je przetestować na całej kopii danych.
var PRIV_MIN_NAME = 5,
  PRIV_MIN_ADDR = 8;
var PRIV_LABELS = {
  events: "wydarzenia w kalendarzu",
  todos: "zadania",
  rentals: "notatki wypożyczeń",
  nfzCases: "sprawy wózków",
  visits: "notatki wizyt",
  patients: "notatki innych pacjentów",
  finances: "opisy w Finansach",
  stock: "uwagi w Magazynie",
  machines: "karty sztuk",
  budget: "budżet",
  wealth: "majątek"
};
var privIsWord = function privIsWord(ch) {
  return !!ch && /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0558\u0559\u0560-\u0588\u058B\u058C\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u208F-\u209F\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DD\uA7E2\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB6C\uAB6D\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBF]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD40-\uDD59\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6F-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC7\uDED9-\uDEEE\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDF0A\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDDB0-\uDDDB\uDDE0-\uDDE9\uDDF1\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6F\uDC75-\uDD43\uDD50-\uDE86]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C\uD8B4-\uD8BE][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE96\uDEA0-\uDEB8\uDEBB-\uDED3\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF2-\uDFF6]|\uD823[\uDC00-\uDCDA\uDCFF-\uDD20\uDD80-\uDDF2\uDE00-\uDFFF]|\uD824[\uDC00-\uDD91\uDDA0-\uDDD2]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD28\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD68\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA6\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF81\uDF90-\uDF96\uDFCD-\uDFFF]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDEC0-\uDEDE\uDEE0-\uDEE2\uDEE4\uDEE5\uDEE7-\uDEED\uDEF0-\uDEF4\uDEFE\uDEFF\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1E\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79]|\uD8BF[\uDC00-\uDC3F])/.test(ch);
};
// 9 ostatnich cyfr numeru (bez +48 i separatorów); krótsze lub dłuższe niż telefon to nie telefon
var privPhoneKey = function privPhoneKey(s) {
  var d = String(s || "").replace(/\D/g, "");
  return d.length >= 9 && d.length <= 12 ? d.slice(-9) : "";
};

// zamienia całe wystąpienia 'needle' (bez rozróżniania wielkości liter, tylko na granicy słowa) na 'repl'
function privReplaceWord(text, needle, repl) {
  if (!needle || !text) return [text, 0];
  var low = text.toLowerCase();
  var sameLen = low.length === text.length;
  var hay = sameLen ? low : text,
    nd = sameLen ? needle.toLowerCase() : needle;
  var out = "",
    i = 0,
    cnt = 0;
  for (;;) {
    var j = hay.indexOf(nd, i);
    if (j < 0) break;
    var before = j > 0 ? text[j - 1] : "",
      after = text[j + nd.length] || "";
    if (!privIsWord(before) && !privIsWord(after)) {
      out += text.slice(i, j) + repl;
      cnt++;
      i = j + nd.length;
    } else {
      out += text.slice(i, j + 1);
      i = j + 1;
    }
  }
  return [out + text.slice(i), cnt];
}
// zamienia numer telefonu zapisany z dowolnymi spacjami/myślnikami, o ile nie jest częścią dłuższego ciągu cyfr
function privReplacePhone(text, key, repl) {
  if (!key || !text) return [text, 0];
  var re = new RegExp(key.split("").join("[\\s.\\-]?"), "g");
  var out = "",
    last = 0,
    cnt = 0,
    m;
  while (m = re.exec(text)) {
    var before = m.index > 0 ? text[m.index - 1] : "",
      after = text[m.index + m[0].length] || "";
    if (/\d/.test(before) || /\d/.test(after)) {
      re.lastIndex = m.index + 1;
      continue;
    }
    out += text.slice(last, m.index) + repl;
    last = m.index + m[0].length;
    cnt++;
  }
  return [out + text.slice(last), cnt];
}
function privScrubString(s, ident) {
  var t = s,
    c = 0,
    r;
  if (ident.name) {
    var _privReplaceWord = privReplaceWord(t, ident.name, ident.repl);
    var _privReplaceWord2 = _slicedToArray(_privReplaceWord, 2);
    t = _privReplaceWord2[0];
    r = _privReplaceWord2[1];
    c += r;
  }
  var _iterator = _createForOfIteratorHelper(ident.phoneKeys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var k = _step.value;
      var _privReplacePhone = privReplacePhone(t, k, ident.replPhone);
      var _privReplacePhone2 = _slicedToArray(_privReplacePhone, 2);
      t = _privReplacePhone2[0];
      r = _privReplacePhone2[1];
      c += r;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(ident.addrs),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var a = _step2.value;
      var _privReplaceWord3 = privReplaceWord(t, a, ident.replAddr);
      var _privReplaceWord4 = _slicedToArray(_privReplaceWord3, 2);
      t = _privReplaceWord4[0];
      r = _privReplaceWord4[1];
      c += r;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return [t, c];
}
// przechodzi przez dowolną strukturę; zwraca TĘ SAMĄ referencję, gdy nic się nie zmieniło (żeby nie zapisywać zbędnie)
// onlyKeys: gdy podane, przeszukujemy tylko teksty w polach o tych nazwach (np. "notes"); pola tożsamości innych osób
// (name, patientName, phone, address, diagnosis) zostają nietknięte, bo imiennik albo wspólny telefon rodziny to inna osoba
function privScrubDeep(v, ident, stat, onlyKeys, key) {
  if (typeof v === "string") {
    if (onlyKeys && !onlyKeys.has(key)) return v;
    var _privScrubString = privScrubString(v, ident),
      _privScrubString2 = _slicedToArray(_privScrubString, 2),
      t = _privScrubString2[0],
      c = _privScrubString2[1];
    if (c) {
      stat.n += c;
      return t;
    }
    return v;
  }
  if (Array.isArray(v)) {
    var ch = false;
    var o = v.map(function (x) {
      var y = privScrubDeep(x, ident, stat, onlyKeys, key);
      if (y !== x) ch = true;
      return y;
    });
    return ch ? o : v;
  }
  if (v && _typeof(v) === "object") {
    var _ch = false;
    var _o = {};
    for (var _i = 0, _Object$keys = Object.keys(v); _i < _Object$keys.length; _i++) {
      var k = _Object$keys[_i];
      var y = privScrubDeep(v[k], ident, stat, onlyKeys, k);
      if (y !== v[k]) _ch = true;
      _o[k] = y;
    }
    return _ch ? _o : v;
  }
  return v;
}
// które pola wolnego tekstu przeszukujemy w danym zbiorze (null = wszystkie teksty w zbiorze)
var PRIV_TEXT_KEYS = {
  patients: new Set(["notes"]),
  visits: new Set(["notes"]),
  rentals: new Set(["notes"]),
  nfzCases: new Set(["notes"]),
  finances: new Set(["description"]),
  todos: new Set(["text"]),
  events: null,
  stock: null,
  machines: null,
  budget: null,
  wealth: null
};
// rekord należy do pacjenta: po numerze karty, a po nazwisku tylko gdy rekord nie wskazuje żadnej istniejącej karty
// (brak numeru albo numer-pseudonim typu "ac-Imię Nazwisko" ze starszych wpisów). cardIds = numery wszystkich kart pacjentów.
var privOwner = function privOwner(pid, pn, cardIds) {
  return function (x) {
    return !!x && (x.patientId === pid || (!x.patientId || !(cardIds && cardIds.has(x.patientId))) && !!pn && x.patientName === pn);
  };
};

// S = {patients,visits,rentals,nfzCases,finances,events,todos,stock,machines,budget,wealth}
// Zwraca {anon,next,stats,total}: next = nowy stan zbiorów (te same referencje, gdy bez zmian), stats = gdzie jeszcze znaleziono dane w wolnym tekście
function privAnonymize(S, pid) {
  var P = S.patients || [];
  var p = P.find(function (x) {
    return x && x.id === pid;
  });
  if (!p) return null;
  var pn = (p.name || "").trim();
  var anon = "Pacjent usunięty " + (P.filter(function (x) {
    return x && (x.name || "").startsWith("Pacjent usunięty");
  }).length + 1);
  var mine = privOwner(pid, p.name, new Set(P.map(function (x) {
    return x && x.id;
  })));
  var myR = (S.rentals || []).filter(mine),
    myN = (S.nfzCases || []).filter(mine);
  var phones = [p.phone].concat(_toConsumableArray((p.phones || []).map(function (x) {
    return x && x.number;
  })), _toConsumableArray(myR.map(function (r) {
    return r.phone;
  })), _toConsumableArray(myN.map(function (c) {
    return c.phone;
  })));
  var addrs = [p.address].concat(_toConsumableArray(myR.map(function (r) {
    return r.address;
  })), _toConsumableArray(myN.map(function (c) {
    return c.address;
  })));
  var ident = {
    name: pn.length >= PRIV_MIN_NAME ? pn : "",
    phoneKeys: _toConsumableArray(new Set(phones.map(privPhoneKey).filter(Boolean))),
    addrs: _toConsumableArray(new Set(addrs.map(function (a) {
      return String(a || "").trim();
    }).filter(function (a) {
      return a.length >= PRIV_MIN_ADDR;
    }))),
    repl: anon,
    replPhone: "(numer usunięty)",
    replAddr: "(adres usunięty)"
  };
  // numery wierszy finansów, które pochodzą od tego pacjenta (wizyty, wpłaty, cykle, transport, przedłużenia, wózki)
  var sids = new Set();
  (S.visits || []).filter(mine).forEach(function (v) {
    return sids.add("visit-" + v.id);
  });
  myR.forEach(function (r) {
    (r.payments || []).forEach(function (x) {
      return sids.add("payment-" + x.id);
    });
    (r.cycles || []).forEach(function (c) {
      return sids.add("cycle-" + r.id + "-" + (c.dueDate || c.month));
    });
    sids.add("transport-" + r.id);
  });
  myN.forEach(function (c) {
    return sids.add("wozek-" + c.id);
  });
  var xpfx = myR.map(function (r) {
    return "extend-" + r.id + "-";
  });
  var ownSid = function ownSid(sid) {
    return !!sid && (sids.has(sid) || xpfx.some(function (pf) {
      return sid.startsWith(pf);
    }));
  };
  var next = {};
  // 1) własne rekordy: dane osobowe i notatki znikają, daty i kwoty zostają
  // numer-pseudonim "ac-Imię Nazwisko" zawiera nazwisko, więc zastępujemy go numerem (zanonimizowanej) karty
  var link = function link(x) {
    return typeof x.patientId === "string" && x.patientId.startsWith("ac-") ? {
      patientId: pid
    } : {};
  };
  next.visits = (S.visits || []).map(function (v) {
    return mine(v) ? _objectSpread(_objectSpread(_objectSpread({}, v), link(v)), {}, {
      patientName: anon,
      notes: ""
    }) : v;
  });
  next.rentals = (S.rentals || []).map(function (r) {
    return mine(r) ? _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, r), link(r)), {}, {
      patientName: anon,
      phone: "",
      address: "",
      notes: ""
    }, r.cpm ? {
      cpm: null
    } : {}), {}, {
      extensions: (r.extensions || []).map(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          notes: ""
        });
      })
    }) : r;
  });
  next.nfzCases = (S.nfzCases || []).map(function (c) {
    return mine(c) ? _objectSpread(_objectSpread(_objectSpread({}, c), link(c)), {}, {
      patientName: anon,
      phone: "",
      address: "",
      notes: ""
    }) : c;
  });
  next.finances = (S.finances || []).map(function (f) {
    return f && f.description && pn && ownSid(f.sourceId) ? _objectSpread(_objectSpread({}, f), {}, {
      description: f.description.split(pn).join(anon)
    }) : f;
  });
  next.patients = P.map(function (x) {
    return x && x.id === pid ? {
      id: x.id,
      name: anon,
      archived: true,
      anonymized: true,
      phone: "",
      phones: [],
      address: "",
      diagnosis: "",
      notes: "",
      birthday: "",
      defaultPrice: ""
    } : x;
  });
  // 2) wolny tekst we wszystkich zbiorach (kalendarz, zadania, notatki innych rekordów, uwagi, opisy...)
  next.events = S.events;
  next.todos = S.todos;
  next.stock = S.stock;
  next.machines = S.machines;
  next.budget = S.budget;
  next.wealth = S.wealth;
  var stats = {};
  var total = 0;
  Object.keys(PRIV_LABELS).forEach(function (k) {
    if (next[k] === undefined || next[k] === null) return;
    var stat = {
      n: 0
    };
    // rekord anonimizowanego pacjenta jest już czysty, resztę zbioru przeszukujemy
    next[k] = privScrubDeep(next[k], ident, stat, PRIV_TEXT_KEYS[k] || null, "");
    if (stat.n) {
      stats[k] = stat.n;
      total += stat.n;
    }
  });
  return {
    anon: anon,
    next: next,
    stats: stats,
    total: total
  };
}
// tekst do okna potwierdzenia: gdzie jeszcze (poza własnymi rekordami) pojawiają się dane pacjenta
var privDescribe = function privDescribe(stats) {
  return Object.keys(stats || {}).map(function (k) {
    return PRIV_LABELS[k] + ": " + stats[k];
  }).join(", ");
};
