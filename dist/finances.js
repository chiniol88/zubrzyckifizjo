// Plik wygenerowany z js/finances.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
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
// ── OBŁOŻENIE SPRZĘTU — liczone dzień po dniu ────────────────────────────
// Zajętość dnia = liczba wypożyczeń naraz, ale nie więcej niż sztuk z magazynu (z historią zmian),
// więc wynik nie może przekroczyć 100%; nakładanie się wypożyczeń ponad liczbę sztuk jest zliczane osobno (overlapDays). Start liczenia = data dodania albo pierwsze wypożyczenie (co wcześniej).
function occupancyForEq(eq, rentals, stock, from, to, today) {
  var DAY = 864e5,
    ts = function ts(d) {
      return Date.parse(d + "T12:00:00Z");
    },
    fmtD = function fmtD(t) {
      return new Date(t).toISOString().slice(0, 10);
    };
  var added = stock && stock.addedDate && stock.addedDate[eq] || "";
  var rs = rentals.filter(function (r) {
    return r.equipment === eq && r.startDate && !r.reserved;
  });
  var firstRent = rs.reduce(function (m, r) {
    return !m || r.startDate < m ? r.startDate : m;
  }, "");
  var start = [added, firstRent].filter(Boolean).sort()[0] || "";
  var out = {
    start: start,
    missingAdded: !added,
    days: [],
    booked: 0,
    cap: 0,
    overlapDays: 0,
    pct: 0,
    noData: true
  };
  if (!start) return out;
  var lo = from > start ? from : start,
    hi = to < today ? to : today;
  if (lo > hi) return out;
  var n = Math.round((ts(hi) - ts(lo)) / DAY) + 1,
    diff = new Array(n + 2).fill(0);
  // Okres wypożyczenia = czas, w którym sprzęt ma pacjent (i za który płaci) — NIE moment fizycznego odbioru.
  // Jednorazowe: start → data końca (z przedłużeniami). Cykliczne: okresy rozliczeniowe (po 30 dni), po zakończeniu ucięte datą końca.
  var spansOf = function spansOf(r) {
    var cyc = (r.cycles || []).filter(function (c) {
      return !c.cancelled;
    });
    if (!r.renewable || !cyc.length) return [[r.startDate, r.endDate || (r.status === "aktywne" ? today : r.startDate)]];
    var closed = r.status !== "aktywne";
    return cyc.map(function (c) {
      var cs, ce;
      if (c.dueDate) {
        cs = c.dueDate;
        ce = addDays(c.dueDate, 30);
      } else {
        cs = c.month + "-01";
        ce = c.month + "-" + String(new Date(+c.month.slice(0, 4), +c.month.slice(5, 7), 0).getDate()).padStart(2, "0");
      }
      if (closed && r.endDate && ce > r.endDate) ce = r.endDate;
      return [cs, ce];
    });
  };
  rs.forEach(function (r) {
    var spans = spansOf(r).filter(function (x) {
      return x[1] >= x[0];
    }).sort(function (a, b) {
      return a[0].localeCompare(b[0]);
    });
    var merged = [];
    spans.forEach(function (x) {
      var l = merged[merged.length - 1];
      if (l && x[0] <= addDays(l[1], 1)) {
        if (x[1] > l[1]) l[1] = x[1];
      } else merged.push([x[0], x[1]]);
    });
    merged.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        s = _ref2[0],
        e = _ref2[1];
      var cs = s > lo ? s : lo,
        ce = e < hi ? e : hi;
      if (cs > ce) return;
      diff[Math.round((ts(cs) - ts(lo)) / DAY)]++;
      diff[Math.round((ts(ce) - ts(lo)) / DAY) + 1]--;
    });
  });
  var hist = (stock && stock.history || []).filter(function (h) {
    return h.eq === eq && h.from;
  }).sort(function (a, b) {
    return a.from.localeCompare(b.from);
  });
  var curQty = stock && stock.qty && stock.qty[eq] || 1;
  var capAt = function capAt(d) {
    var q = null;
    hist.forEach(function (h) {
      if (h.from <= d) q = +h.qty || 1;
    });
    if (q !== null) return q;
    return hist.length ? hist[0].prev != null ? +hist[0].prev || 1 : +hist[0].qty || 1 : curQty;
  };
  var c = 0;
  for (var i = 0; i < n; i++) {
    c += diff[i];
    var d = fmtD(ts(lo) + i * DAY),
      rec = capAt(d);
    if (c > rec) out.overlapDays++;
    out.days.push({
      d: d,
      c: c,
      cap: rec
    });
    out.booked += Math.min(c, rec);
    out.cap += rec;
  }
  out.noData = false;
  out.pct = out.cap > 0 ? Math.round(out.booked / out.cap * 100) : 0;
  return out;
}

// ── pomocnicze: miesiące jako tekst "RRRR-MM" (bez Date — brak błędu 29-31 dnia miesiąca) ──
var ymAdd = function ymAdd(ym, n) {
  var y = +ym.slice(0, 4),
    m = +ym.slice(5, 7) - 1 + n;
  y += Math.floor(m / 12);
  m = (m % 12 + 12) % 12;
  return y + "-" + String(m + 1).padStart(2, "0");
};
var PL_MON = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
var fmtNum = function fmtNum(n) {
  var s = String(Math.round(Math.abs(n)));
  var o = "";
  for (var i = 0; i < s.length; i++) {
    if (i && (s.length - i) % 3 === 0) o += String.fromCharCode(160);
    o += s[i];
  }
  return (n < 0 ? "-" : "") + o;
};
// ── DOCHÓD PASYWNY: wpłaty z cykli wypożyczeń cyklicznych od 2. wzwyż, wg daty wpłaty ──
var cycKey = function cycKey(c) {
  return c.dueDate || c.month + "-01";
};
var passiveEvents = function passiveEvents(rentals) {
  var out = [];
  (rentals || []).forEach(function (r) {
    if (r.reserved) return;
    (r.cycles || []).filter(function (c) {
      return !c.cancelled;
    }).sort(function (a, b) {
      return cycKey(a).localeCompare(cycKey(b));
    }).forEach(function (c, i) {
      if (i === 0 || !c.paid || !(+c.amount > 0)) return;
      out.push({
        date: c.paidDate || c.dueDate || c.month + "-15",
        amount: +c.amount,
        r: r,
        what: "cykl " + (i + 1)
      });
    });
  });
  return out;
};
function PassiveRow(_ref3) {
  var rentals = _ref3.rentals,
    inPeriod = _ref3.inPeriod,
    inPrevPeriod = _ref3.inPrevPeriod,
    base = _ref3.base,
    isOpen = _ref3.isOpen,
    onToggle = _ref3.onToggle,
    border = _ref3.border,
    sub = _ref3.sub,
    goToRental = _ref3.goToRental;
  var demo = useDemo();
  var dk = useContext(DarkCtx);
  var ev = useMemo(function () {
    return passiveEvents(rentals);
  }, [rentals]);
  var cur = ev.filter(function (e) {
    return inPeriod(e.date);
  }).sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });
  var sum = cur.reduce(function (s, e) {
    return s + e.amount;
  }, 0);
  var prev = ev.filter(function (e) {
    return inPrevPeriod(e.date);
  }).reduce(function (s, e) {
    return s + e.amount;
  }, 0);
  var diff = prev > 0 ? Math.round((sum - prev) / prev * 100) : null;
  var pct = base > 0 ? Math.min(100, sum / base * 100) : 0;
  var Z = function Z(n) {
    return demo ? "****" : fmtNum(n) + " zł";
  };
  var txt = dk ? "#C8E8E8" : "#1C2B3A";
  var color = "#3DAA72";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 12,
      borderTop: "1px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onToggle,
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: txt
    }
  }, "Doch\xF3d pasywny ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: sub,
      fontSize: 10
    }
  }, isOpen ? "▲" : "▼")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, demo ? "****" : sum.toFixed(2), " z\u0142 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: color,
      fontWeight: 700
    }
  }, "(", base > 0 ? Math.round(sum / base * 100) : 0, "%)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 4,
      background: dk ? "#2A3A56" : "#F0F4F8"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: pct + "%",
      background: color,
      borderRadius: 4,
      transition: "width .3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: sub,
      marginTop: 4
    }
  }, "cykle od 2. wzwy\u017C \u2014 to cz\u0119\u015B\u0107 Wypo\u017Cyczalni", diff !== null ? " · " + (diff >= 0 ? "+" : "") + diff + "% vs poprz." : "")), isOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      paddingLeft: 2
    }
  }, cur.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: sub,
      padding: "4px 0"
    }
  }, "Brak wp\u0142at z drugiego cyklu wzwy\u017C w tym okresie"), cur.map(function (e, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: goToRental ? function () {
        return goToRental(e.r.id);
      } : undefined,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 0",
        borderBottom: "1px solid ".concat(border),
        cursor: goToRental ? "pointer" : "default"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1,
        paddingRight: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: txt,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, maskName(demo, e.r.patientName || "—", i), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: sub,
        fontWeight: 400
      }
    }, e.r.equipment || "")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: sub
      }
    }, e.date, " \xB7 ", e.what)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: color,
        flexShrink: 0
      }
    }, "+", Z(e.amount)));
  })));
}
var plWozek = function plWozek(n) {
  return n === 1 ? "wózek" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "wózki" : "wózków";
};
// procenty sumujące się do 100 (metoda największych reszt)
var pctSplit = function pctSplit(vals) {
  var t = vals.reduce(function (a, b) {
    return a + b;
  }, 0);
  if (t <= 0) return vals.map(function () {
    return 0;
  });
  var raw = vals.map(function (v) {
      return v / t * 100;
    }),
    fl = raw.map(Math.floor);
  var rest = 100 - fl.reduce(function (a, b) {
    return a + b;
  }, 0);
  raw.map(function (r, i) {
    return [r - fl[i], i];
  }).sort(function (a, b) {
    return b[0] - a[0];
  }).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      i = _ref5[1];
    if (rest > 0) {
      fl[i]++;
      rest--;
    }
  });
  return fl;
};
// Kalendarzowe kawałki roku (bez nazywania świąt) — 2 tygodnie albo miesiąc, żeby było widać krótsze trendy
var fmtShort = function fmtShort(d) {
  return +d.slice(8, 10) + " " + PL_MON[+d.slice(5, 7) - 1];
};
var chunkRanges = function chunkRanges(year, gran) {
  if (gran === "month") return Array.from({
    length: 12
  }, function (_, i) {
    var mm = String(i + 1).padStart(2, "0"),
      last = String(new Date(year, i + 1, 0).getDate()).padStart(2, "0");
    return {
      from: year + "-" + mm + "-01",
      to: year + "-" + mm + "-" + last,
      label: PL_MON[i] + " " + year
    };
  });
  var out = [];
  var d = year + "-01-01";
  var yEnd = year + "-12-31";
  while (d <= yEnd) {
    var to = addDays(d, 13) > yEnd ? yEnd : addDays(d, 13);
    out.push({
      from: d,
      to: to,
      label: fmtShort(d) + " – " + fmtShort(to)
    });
    d = addDays(to, 1);
  }
  return out;
};

// ── STATYSTYKI (dawniej Sprzęt) — lista rozwijana ────────────────────────
function StatSpark(_ref6) {
  var vals = _ref6.vals,
    w = _ref6.w,
    h = _ref6.h,
    color = _ref6.color,
    sel = _ref6.sel;
  var mx = Math.max.apply(Math, [1].concat(_toConsumableArray(vals))) * 1.08;
  var pts = vals.map(function (v, i) {
    return [2 + i / Math.max(1, vals.length - 1) * (w - 4), h - 2 - v / mx * (h - 6)];
  });
  var line = pts.map(function (p, i) {
    return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
  }).join(" ");
  var area = line + " L" + pts[pts.length - 1][0].toFixed(1) + " " + h + " L" + pts[0][0].toFixed(1) + " " + h + " Z";
  var gid = "sg" + color.slice(1) + w;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    viewBox: "0 0 " + w + " " + h,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: color,
    stopOpacity: ".32"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#" + gid + ")"
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), sel != null && pts[sel] && /*#__PURE__*/React.createElement("circle", {
    cx: pts[sel][0],
    cy: pts[sel][1],
    r: "3.6",
    fill: color
  }));
}
function StatDonut(_ref7) {
  var rows = _ref7.rows,
    size = _ref7.size,
    top = _ref7.top,
    bottom = _ref7.bottom,
    track = _ref7.track,
    ink = _ref7.ink,
    sub = _ref7.sub;
  var r = size / 2 - 9,
    c = 2 * Math.PI * r;
  var tot = rows.reduce(function (s, x) {
    return s + x.v;
  }, 0) || 1;
  var off = 0;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 " + size + " " + size,
    role: "img",
    "aria-label": "Udzia\u0142 \u017Ar\xF3de\u0142"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: track,
    strokeWidth: "13"
  }), rows.filter(function (x) {
    return x.v > 0;
  }).map(function (x) {
    var l = x.v / tot * c,
      g = Math.min(2, l * .2);
    var el = /*#__PURE__*/React.createElement("circle", {
      key: x.k,
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: x.c,
      strokeWidth: "13",
      strokeDasharray: Math.max(0, l - g).toFixed(1) + " " + (c - l + g).toFixed(1),
      strokeDashoffset: (-off).toFixed(1),
      transform: "rotate(-90 " + size / 2 + " " + size / 2 + ")"
    });
    off += l;
    return el;
  }), /*#__PURE__*/React.createElement("text", {
    x: "50%",
    y: size / 2 - 1,
    textAnchor: "middle",
    fontFamily: "Syne",
    fontWeight: "800",
    fontSize: "20",
    fill: ink
  }, top), /*#__PURE__*/React.createElement("text", {
    x: "50%",
    y: size / 2 + 14,
    textAnchor: "middle",
    fontSize: "10",
    fill: sub,
    fontFamily: "DM Sans"
  }, bottom));
}
function StatAcc(_ref8) {
  var open = _ref8.open,
    onToggle = _ref8.onToggle,
    title = _ref8.title,
    sub = _ref8.sub,
    mini = _ref8.mini,
    keyVal = _ref8.keyVal,
    keyColor = _ref8.keyColor,
    children = _ref8.children,
    dk = _ref8.dk;
  var bd = dk ? "#2A3A56" : "#E4EAF3";
  var ref = useRef(null);
  useEffect(function () {
    if (!open || !ref.current) return;
    var t = setTimeout(function () {
      var r = ref.current.getBoundingClientRect();
      if (r.top < 70 || r.bottom > window.innerHeight) ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
    return function () {
      return clearTimeout(t);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      background: dk ? "#18202F" : "#fff",
      border: "1px solid " + bd,
      borderRadius: 18,
      marginBottom: 10,
      overflow: "hidden",
      scrollMarginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-expanded": open,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      border: "none",
      background: "none",
      textAlign: "left",
      cursor: "pointer",
      fontFamily: "inherit",
      color: dk ? "#C8E8E8" : "#1C2B3A"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#7A8FA6",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, sub)), mini && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center"
    }
  }, mini), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 16,
      color: keyColor || "inherit",
      whiteSpace: "nowrap",
      textAlign: "right",
      minWidth: 48
    }
  }, keyVal), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#7A8FA6",
      fontSize: 10,
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform .2s"
    }
  }, "\u25BC")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px 16px",
      borderTop: "1px solid " + bd
    }
  }, children));
}
function GroupLabel(_ref9) {
  var children = _ref9.children,
    dk = _ref9.dk;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: dk ? "#8FA6CC" : "#3E5578",
      textTransform: "uppercase",
      letterSpacing: ".08em",
      margin: "22px 2px 8px"
    }
  }, children);
}
function RentalStats(_ref0) {
  var rentals = _ref0.rentals,
    stock = _ref0.stock,
    setStock = _ref0.setStock,
    finances = _ref0.finances,
    setFinances = _ref0.setFinances,
    budget = _ref0.budget,
    machines = _ref0.machines,
    setMachines = _ref0.setMachines,
    nfzCases = _ref0.nfzCases,
    goToRental = _ref0.goToRental,
    goToWozki = _ref0.goToWozki;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var _useState = useState("month"),
    _useState2 = _slicedToArray(_useState, 2),
    scope = _useState2[0],
    setScope = _useState2[1];
  var _useState3 = useState(function () {
      return todayLocal().slice(0, 7);
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    selMonth = _useState4[0],
    setSelMonth = _useState4[1];
  var _useState5 = useState(function () {
      return new Date().getFullYear();
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    statsYear = _useState6[0],
    setStatsYear = _useState6[1];
  var _useState7 = useState("rev"),
    _useState8 = _slicedToArray(_useState7, 2),
    openSec = _useState8[0],
    setOpenSec = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    roiEq = _useState0[0],
    setRoiEq = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showAllRoi = _useState10[0],
    setShowAllRoi = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    repairForm = _useState12[0],
    setRepairForm = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    showRentalList = _useState14[0],
    setShowRentalList = _useState14[1];
  var _useState15 = useState("all"),
    _useState16 = _slicedToArray(_useState15, 2),
    srcTab = _useState16[0],
    setSrcTab = _useState16[1];
  var _useState17 = useState("2w"),
    _useState18 = _slicedToArray(_useState17, 2),
    seasonGran = _useState18[0],
    setSeasonGran = _useState18[1];
  var equipmentAll = getActiveEquipmentNames(stock);
  var SZYNY_EQ = ["Artromot K1 2025", "Artromot K1 I", "Kinetec Spectra", "Kinetec Spectra SZ", "Optiflex", "OrthoRehab"];
  var BALKONIKI_EQ = ["Ambonka Paula", "Balkonik ortopedyczny"];
  var catOf = function catOf(eq) {
    var entry = (stock && stock.equipment || []).find(function (e) {
      return e.name === eq;
    });
    if (entry && entry.category) return entry.category;
    return SZYNY_EQ.includes(eq) ? "szyny" : WOZEK_EQUIPMENT.includes(eq) ? "wozki" : BALKONIKI_EQ.includes(eq) ? "balkoniki" : "inne";
  };
  var today = todayLocal();
  var borderC = dk ? "#2A3A56" : "#E4EAF3";
  var textC = dk ? "#C8E8E8" : "#1C2B3A";
  var subC = "#7A8FA6";
  var bg = dk ? "#18202F" : "#fff";
  var trackC = dk ? "#22304B" : "#EAEFF6";
  var Z = function Z(n) {
    return demo ? "****" : fmtNum(n) + " zł";
  };
  var PURPLE = dk ? "#9A78DB" : "#7B4FBF",
    BLUE = "#2E86AB",
    GREEN = "#3DAA72",
    ORANGE = "#F4A261",
    RED = "#E05C5C";

  // Okres: miesiąc albo cały rok
  var isYear = scope === "year";
  var monthLastDay = new Date(+selMonth.slice(0, 4), +selMonth.slice(5, 7), 0).getDate();
  var pStart = isYear ? statsYear + "-01-01" : selMonth + "-01";
  var pEnd = isYear ? statsYear + "-12-31" : selMonth + "-" + String(monthLastDay).padStart(2, "0");
  var periodLabel = isYear ? String(statsYear) : new Date(selMonth + "-15").toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric"
  });

  // Mapa: rentalId → sprzęt
  var rentalEquipMap = useMemo(function () {
    var m = {};
    rentals.forEach(function (r) {
      if (r.equipment) m[r.id] = r.equipment;
    });
    return m;
  }, [rentals]);
  // Mapa: paymentId → rentalId
  var paymentRentalMap = useMemo(function () {
    var m = {};
    rentals.forEach(function (r) {
      (r.payments || []).forEach(function (p) {
        m[String(p.id)] = r.id;
      });
    });
    return m;
  }, [rentals]);
  // Wyciąg rentalId z sourceId finansów
  var rentalIdSet = useMemo(function () {
    return new Set(rentals.map(function (r) {
      return r.id;
    }));
  }, [rentals]);
  var getRid = function getRid(sid) {
    if (!sid) return null;
    var id = null;
    if (sid.startsWith("payment-")) id = paymentRentalMap[sid.replace("payment-", "")] || null;else if (sid.startsWith("cycle-")) id = +sid.slice(6).split("-")[0] || null;else if (sid.startsWith("extend-")) id = +sid.slice(7).split("-")[0] || null;else if (sid.startsWith("transport-")) id = +sid.slice(10) || null;
    return id !== null && rentalIdSet.has(id) ? id : null;
  };

  // All-time przychód per sprzęt — z RZECZYWISTYCH wpłat w finansach
  var allTimeRevenue = useMemo(function () {
    var rev = {};
    equipmentAll.forEach(function (eq) {
      return rev[eq] = 0;
    });
    var counted = new Set();
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód") return;
      var rid = getRid(f.sourceId);
      if (!rid) return;
      counted.add(rid);
      var eq = rentalEquipMap[rid];
      if (eq && rev.hasOwnProperty(eq)) rev[eq] += +f.amount || 0;
    });
    rentals.forEach(function (r) {
      if (counted.has(r.id) || (r.payments || []).length > 0 || (r.cycles || []).length > 0) return;
      var paid = +r.amountPaid || 0;
      if (paid > 0 && r.equipment && rev.hasOwnProperty(r.equipment)) rev[r.equipment] += paid;
    });
    return rev;
  }, [finances, rentals, rentalEquipMap, paymentRentalMap, rentalIdSet, stock]);

  // All-time śr. czas wypożyczenia per sprzęt (zakończone, z datą od i do)
  var avgDurationByEq = useMemo(function () {
    var map = {};
    equipmentAll.forEach(function (eq) {
      var finished = rentals.filter(function (r) {
        return r.equipment === eq && r.status === "zakończone" && r.startDate && r.endDate;
      });
      map[eq] = finished.length > 0 ? Math.round(finished.reduce(function (s, r) {
        return s + Math.max(1, Math.round((new Date(r.endDate) - new Date(r.startDate)) / (1000 * 60 * 60 * 24)));
      }, 0) / finished.length) : null;
    });
    return map;
  }, [rentals, stock]);

  // Statystyki okresu (miesiąc lub rok)
  var stats = useMemo(function () {
    var cutStr = pStart,
      cutEnd = pEnd;

    // Wózki z refundacji — przychód zrealizowany (finances z sourceId "wozek-<id>")
    var wozkiF = (finances || []).filter(function (f) {
      if (f.type !== "przychód") return false;
      var sid = f.sourceId || "";
      if (!sid.startsWith("wozek-")) return false;
      var cid = +sid.slice(6);
      return !!cid && (nfzCases || []).some(function (x) {
        return x.id === cid;
      });
    });

    // Wykres 12 miesięcy: w skali rocznej styczeń–grudzień wybranego roku; w miesięcznej okno kończy się na bieżącym miesiącu
    // (albo zaczyna na wybranym, gdy wybrano miesiąc starszy niż 12 mies. temu)
    var monthlyRev = {},
      monthlyWoz = {};
    var curYM = today.slice(0, 7);
    var winEnd = isYear ? statsYear + "-12" : selMonth < ymAdd(curYM, -11) ? ymAdd(selMonth, 11) : curYM;
    for (var i = 0; i < 12; i++) {
      var k = ymAdd(winEnd, i - 11);
      monthlyRev[k] = 0;
      monthlyWoz[k] = 0;
    }

    // 1) Wpłaty z tablicy finances (mają właściwy sourceId linkujący do rental)
    var countedRids = new Set();
    var totalRevenue = 0;
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód") return;
      var rid = getRid(f.sourceId);
      if (!rid) return;
      countedRids.add(rid);
      if ((f.date || "") >= cutStr && (f.date || "") <= cutEnd) totalRevenue += +f.amount || 0;
      var m = (f.date || "").slice(0, 7);
      if (monthlyRev.hasOwnProperty(m)) monthlyRev[m] += +f.amount || 0;
    });

    // 2) Legacy: rental z amountPaid > 0 ale bez tablicy payments
    rentals.forEach(function (r) {
      if (countedRids.has(r.id)) return;
      if ((r.payments || []).length > 0) return;
      if ((r.cycles || []).length > 0) return;
      var paid = +r.amountPaid || 0;
      if (paid <= 0) return;
      var d = r.startDate || "";
      if (d >= cutStr && d <= cutEnd) totalRevenue += paid;
      var m = d.slice(0, 7);
      if (monthlyRev.hasOwnProperty(m)) monthlyRev[m] += paid;
    });

    // 3) Wózki (refundacje)
    var wozkiRevenue = 0,
      wozkiCount = 0;
    wozkiF.forEach(function (f) {
      var d = f.date || "";
      if (d >= cutStr && d <= cutEnd) {
        wozkiRevenue += +f.amount || 0;
        wozkiCount++;
      }
      var m = d.slice(0, 7);
      if (monthlyWoz.hasOwnProperty(m)) monthlyWoz[m] += +f.amount || 0;
    });

    // Liczba wypożyczeń które ZACZĘŁY SIĘ w okresie (nie rezerwacje)
    var totalCount = rentals.filter(function (r) {
      return (r.startDate || "") >= cutStr && (r.startDate || "") <= cutEnd && !r.reserved;
    }).length;
    var monthlyArr = Object.keys(monthlyRev).sort().map(function (m) {
      return [m, monthlyRev[m], monthlyWoz[m]];
    });
    var maxMonthly = Math.max.apply(Math, _toConsumableArray(monthlyArr.map(function (x) {
      return x[1] + x[2];
    })).concat([1]));
    var durationIncludeMap = stock && stock.durationInclude || {};
    var DURATION_OFF_DEF = ["Ambonka Paula", "Balkonik ortopedyczny", "Wózek inwalidzki Elite Tim"];
    var isDurIncluded = function isDurIncluded(eq) {
      return durationIncludeMap[eq] !== undefined ? durationIncludeMap[eq] : !DURATION_OFF_DEF.includes(eq);
    };
    var finishedOne = rentals.filter(function (r) {
      return !r.renewable && r.status === "zakończone" && r.startDate && r.endDate && isDurIncluded(r.equipment) && r.startDate >= cutStr && r.startDate <= cutEnd;
    });
    var avgDurationOne = finishedOne.length > 0 ? Math.round(finishedOne.reduce(function (s, r) {
      return s + Math.max(1, Math.round((new Date(r.endDate) - new Date(r.startDate)) / (1000 * 60 * 60 * 24)));
    }, 0) / finishedOne.length) : null;
    var finishedCyc = rentals.filter(function (r) {
      return r.renewable && r.status === "zakończone" && r.startDate && isDurIncluded(r.equipment) && r.startDate >= cutStr && r.startDate <= cutEnd;
    });
    var avgCyclesCount = finishedCyc.length > 0 ? Math.round(finishedCyc.reduce(function (s, r) {
      return s + (r.cycles || []).filter(function (c) {
        return !c.cancelled;
      }).length;
    }, 0) / finishedCyc.length * 10) / 10 : null;
    var marketingSpend = isYear ? Array.from({
      length: 12
    }, function (_, i) {
      return marketingSpendForMonth(budget, stock, statsYear + "-" + String(i + 1).padStart(2, "0"));
    }).reduce(function (a, b) {
      return a + b;
    }, 0) : marketingSpendForMonth(budget, stock, selMonth);
    return {
      totalRevenue: totalRevenue,
      wozkiRevenue: wozkiRevenue,
      wozkiCount: wozkiCount,
      totalCount: totalCount,
      monthlyArr: monthlyArr,
      maxMonthly: maxMonthly,
      cutStr: cutStr,
      cutEnd: cutEnd,
      avgDurationOne: avgDurationOne,
      avgCyclesCount: avgCyclesCount,
      marketingSpend: marketingSpend
    };
  }, [rentals, finances, nfzCases, pStart, pEnd, isYear, statsYear, selMonth, today, rentalEquipMap, paymentRentalMap, rentalIdSet, stock, budget]);
  var totalAll = stats.totalRevenue + stats.wozkiRevenue;
  var costs = stock && stock.costs || {};
  var getCosts = function getCosts(eq) {
    return costs[eq] || {
      purchase: 0,
      repairs: []
    };
  };
  var getQty = function getQty(eq) {
    return stock && stock.qty && stock.qty[eq] || 1;
  };
  var DURATION_OFF_BY_DEFAULT = ["Ambonka Paula", "Balkonik ortopedyczny", "Wózek inwalidzki Elite Tim"];
  var getDurationInclude = function getDurationInclude(eq) {
    return stock && stock.durationInclude && stock.durationInclude[eq] !== undefined ? stock.durationInclude[eq] : !DURATION_OFF_BY_DEFAULT.includes(eq);
  };
  var setDurationInclude = function setDurationInclude(eq, val) {
    return setStock(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        durationInclude: _objectSpread(_objectSpread({}, s.durationInclude || {}), {}, _defineProperty({}, eq, val))
      });
    });
  };
  var getMachineSrvForEq = function getMachineSrvForEq(eq) {
    return (machines || []).filter(function (m) {
      return m.type === eq;
    }).flatMap(function (m) {
      return (m.serviceLog || []).filter(function (s) {
        return +s.cost > 0;
      }).map(function (s) {
        return {
          id: "srv-" + s.id,
          date: s.date,
          amount: +s.cost,
          desc: s.type + (s.notes ? " – " + s.notes : "") + " (" + (m.code || m.name || m.type) + ")",
          fromService: true
        };
      });
    });
  };
  var getTotalInvestment = function getTotalInvestment(eq) {
    var c = getCosts(eq);
    var machineSrv = getMachineSrvForEq(eq).reduce(function (s, x) {
      return s + x.amount;
    }, 0);
    return whPurchaseTotal(stock, machines, eq) + (c.repairs || []).reduce(function (s, r) {
      return s + (+r.amount || 0);
    }, 0) + machineSrv;
  };
  var setPurchase = function setPurchase(eq, val) {
    return setStock(function (s) {
      var ex = (s.costs || {})[eq] || {
        purchase: 0,
        repairs: []
      };
      return _objectSpread(_objectSpread({}, s), {}, {
        costs: _objectSpread(_objectSpread({}, s.costs || {}), {}, _defineProperty({}, eq, _objectSpread(_objectSpread({}, ex), {}, {
          purchase: +val || 0
        })))
      });
    });
  };
  var saveRepair = function saveRepair(eq, rep) {
    return setStock(function (s) {
      var ex = (s.costs || {})[eq] || {
        purchase: 0,
        repairs: []
      };
      return _objectSpread(_objectSpread({}, s), {}, {
        costs: _objectSpread(_objectSpread({}, s.costs || {}), {}, _defineProperty({}, eq, _objectSpread(_objectSpread({}, ex), {}, {
          repairs: [].concat(_toConsumableArray((ex.repairs || []).filter(function (r) {
            return r.id !== rep.id;
          })), [rep])
        })))
      });
    });
  };
  var deleteRepair = function deleteRepair(eq, id) {
    setStock(function (s) {
      var ex = (s.costs || {})[eq] || {
        purchase: 0,
        repairs: []
      };
      return _objectSpread(_objectSpread({}, s), {}, {
        costs: _objectSpread(_objectSpread({}, s.costs || {}), {}, _defineProperty({}, eq, _objectSpread(_objectSpread({}, ex), {}, {
          repairs: (ex.repairs || []).filter(function (r) {
            return r.id !== id;
          })
        })))
      });
    });
    setFinances(function (fs) {
      return (fs || []).filter(function (f) {
        return f.sourceId !== "naprawa-" + id;
      });
    });
  };

  // Obłożenie — tylko szyny CPM, liczone dzień po dniu (patrz occupancyForEq)
  var occStats = useMemo(function () {
    return equipmentAll.filter(function (eq) {
      return catOf(eq) === "szyny";
    }).map(function (eq) {
      return _objectSpread({
        eq: eq,
        qty: getQty(eq)
      }, occupancyForEq(eq, rentals, stock, pStart, pEnd, today));
    }).filter(function (x) {
      return !x.noData;
    });
  }, [rentals, pStart, pEnd, stock, today]);
  var occBooked = occStats.reduce(function (s, x) {
      return s + x.booked;
    }, 0),
    occCap = occStats.reduce(function (s, x) {
      return s + x.cap;
    }, 0);
  var avgOcc = occCap > 0 ? Math.round(occBooked / occCap * 100) : 0;
  var occCol = function occCol(p) {
    return p >= 70 ? GREEN : p >= 40 ? ORANGE : RED;
  };

  // ROI — wiersze
  var roiRows = equipmentAll.map(function (eq) {
    var earned = allTimeRevenue[eq] || 0,
      investment = getTotalInvestment(eq);
    var c = getCosts(eq);
    var repairsTotal = (c.repairs || []).reduce(function (s, r) {
      return s + (+r.amount || 0);
    }, 0) + getMachineSrvForEq(eq).reduce(function (s, x) {
      return s + x.amount;
    }, 0);
    var occAll = repairsTotal > 0 ? occupancyForEq(eq, rentals, stock, "2000-01-01", today, today) : null;
    var repairsPer100 = occAll && occAll.booked > 0 ? Math.round(repairsTotal / occAll.booked * 100) : null;
    return {
      eq: eq,
      earned: earned,
      investment: investment,
      roi: investment > 0 ? Math.round(earned / investment * 100) : null,
      repairsPer100: repairsPer100
    };
  });
  var roiShown = roiRows.filter(function (x) {
    return showAllRoi || x.earned > 0 || x.investment > 0 || roiEq === x.eq;
  });
  var roiHidden = roiRows.length - roiShown.length;
  var roiKnown = roiRows.filter(function (x) {
    return x.investment > 0;
  });
  var roiDone = roiKnown.filter(function (x) {
    return x.earned >= x.investment;
  }).length;

  // Marketing — picker kategorii z budżetu (Dom)
  var mktgCat = stock && stock.marketingCat || "";
  var mktgSub = stock && stock.marketingSub || "";
  var budgetCatMap = {};
  Object.values(budget && budget.months || {}).forEach(function (data) {
    (data.expenses || []).forEach(function (e) {
      if (e.cat) {
        if (!budgetCatMap[e.cat]) budgetCatMap[e.cat] = [];
        if (e.subcat && budgetCatMap[e.cat].indexOf(e.subcat) < 0) budgetCatMap[e.cat].push(e.subcat);
      }
    });
  });
  (budget && budget.recurring || []).forEach(function (r) {
    if (r.type === "expense" && r.cat) {
      if (!budgetCatMap[r.cat]) budgetCatMap[r.cat] = [];
      if (r.subcat && budgetCatMap[r.cat].indexOf(r.subcat) < 0) budgetCatMap[r.cat].push(r.subcat);
    }
  });
  var budgetCatNames = Object.keys(budgetCatMap).sort();
  var budgetSubNames = mktgCat && budgetCatMap[mktgCat] ? budgetCatMap[mktgCat].sort() : [];

  // Źródła klientów w okresie (wypożyczenia + wózki z refundacji)
  var src = function () {
    var periodRentalsAll = rentals.filter(function (r) {
      return (r.startDate || "") >= pStart && (r.startDate || "") <= pEnd && !r.reserved;
    });
    var listItemsAll = [];
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód" || (f.date || "") < pStart || (f.date || "") > pEnd) return;
      var rid = getRid(f.sourceId);
      if (!rid) return;
      var r = rentals.find(function (x) {
        return x.id === rid;
      });
      if (!r) return;
      var isExt = (f.sourceId || "").startsWith("extend-");
      var isCycle = (f.sourceId || "").startsWith("cycle-");
      listItemsAll.push({
        key: "f" + f.id,
        date: f.date,
        patientName: r.patientName,
        equipment: r.equipment,
        amount: +f.amount || 0,
        source: r.source,
        type: isExt ? "↪ Przedłużenie" : isCycle ? "↻ Cykl" : "Wpłata",
        cat: catOf(r.equipment)
      });
    });
    rentals.forEach(function (r) {
      if ((r.payments || []).length > 0 || (r.cycles || []).length > 0) return;
      var paid = +r.amountPaid || 0;
      if (!paid) return;
      var d = r.startDate || "";
      if (d >= pStart && d <= pEnd) listItemsAll.push({
        key: "l" + r.id,
        date: d,
        patientName: r.patientName,
        equipment: r.equipment,
        amount: paid,
        source: r.source,
        type: "Wpłata",
        cat: catOf(r.equipment)
      });
    });
    var periodWozkiAll = [];
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód" || (f.date || "") < pStart || (f.date || "") > pEnd) return;
      var sid = f.sourceId || "";
      if (!sid.startsWith("wozek-")) return;
      var cid = +sid.slice(6);
      if (!cid) return;
      var cas = (nfzCases || []).find(function (x) {
        return x.id === cid;
      });
      if (!cas) return;
      listItemsAll.push({
        key: "w" + f.id,
        date: f.date,
        patientName: cas.patientName,
        equipment: cas.wheelchairModel || "Wózek",
        amount: +f.amount || 0,
        source: cas.source,
        type: "🦽 Wózek",
        cat: "wozki"
      });
      periodWozkiAll.push(cas);
    });
    listItemsAll.sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });
    var listItems = srcTab === "all" ? listItemsAll : listItemsAll.filter(function (i) {
      return i.cat === srcTab;
    });
    var periodRentals = srcTab === "all" ? periodRentalsAll : periodRentalsAll.filter(function (r) {
      return catOf(r.equipment) === srcTab;
    });
    var periodWozki = srcTab === "szyny" || srcTab === "balkoniki" ? [] : periodWozkiAll;
    var revBy = {},
      cntBy = {},
      wCntBy = {};
    RENTAL_SOURCES.forEach(function (s) {
      revBy[s.value] = 0;
      cntBy[s.value] = 0;
      wCntBy[s.value] = 0;
    });
    var unknownRev = 0;
    listItems.forEach(function (item) {
      if (item.source && revBy.hasOwnProperty(item.source)) revBy[item.source] += item.amount;else unknownRev += item.amount;
    });
    periodRentals.forEach(function (r) {
      if (r.source && cntBy.hasOwnProperty(r.source)) cntBy[r.source]++;
    });
    var seen = new Set();
    periodWozki.forEach(function (cas) {
      if (seen.has(cas.id)) return;
      seen.add(cas.id);
      if (cas.source && wCntBy.hasOwnProperty(cas.source)) wCntBy[cas.source]++;
    });
    var rows = RENTAL_SOURCES.map(function (s) {
      return {
        k: s.value,
        l: s.label,
        c: s.color,
        rev: revBy[s.value] || 0,
        cnt: cntBy[s.value] || 0,
        wc: wCntBy[s.value] || 0
      };
    }).filter(function (x) {
      return x.rev > 0 || x.cnt > 0 || x.wc > 0;
    }).sort(function (a, b) {
      return b.rev - a.rev;
    });
    var withoutSrc = listItems.filter(function (item) {
      return !item.source;
    }).length;
    var unknownCnt = periodRentals.filter(function (r) {
      return !r.source || !cntBy.hasOwnProperty(r.source);
    }).length;
    if (unknownRev > 0 || unknownCnt > 0) rows.push({
      k: "_none",
      l: "Nieznane",
      c: "#8A9BB0",
      rev: unknownRev,
      cnt: unknownCnt,
      wc: 0
    });
    return {
      listItems: listItems,
      rows: rows,
      totalRev: listItems.reduce(function (s, i) {
        return s + i.amount;
      }, 0),
      totalCnt: rows.reduce(function (s, r) {
        return s + r.cnt;
      }, 0),
      totalW: rows.reduce(function (s, r) {
        return s + r.wc;
      }, 0),
      withoutSrc: withoutSrc
    };
  }();

  // Przychód sprzętu w dowolnym zakresie dat (opcjonalnie: tylko jeden typ sprzętu) — używane przez prognozę i sezonowość
  var revenueInRange = function revenueInRange(from, to, eqFilter) {
    if (from > to) return 0;
    var total = 0;
    var countedR = new Set();
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód" || (f.date || "") < from || (f.date || "") > to) return;
      var rid = getRid(f.sourceId);
      if (rid) {
        if (eqFilter && rentalEquipMap[rid] !== eqFilter) return;
        countedR.add(rid);
        total += +f.amount || 0;
        return;
      }
      if (!eqFilter) {
        var sid = f.sourceId || "";
        if (sid.startsWith("wozek-")) {
          var cid = +sid.slice(6);
          if (cid && (nfzCases || []).some(function (x) {
            return x.id === cid;
          })) total += +f.amount || 0;
        }
      }
    });
    rentals.forEach(function (r) {
      if (eqFilter && r.equipment !== eqFilter) return;
      if (countedR.has(r.id) || (r.payments || []).length > 0 || (r.cycles || []).length > 0) return;
      var paid = +r.amountPaid || 0;
      if (paid <= 0) return;
      var d = r.startDate || "";
      if (d >= from && d <= to) total += paid;
    });
    return total;
  };

  // ── A1: Prognoza przychodu na 30 dni ──
  var forecast = useMemo(function () {
    var horizon = addDays(today, 30);
    var overdue = 0,
      overdueCount = 0,
      scheduled = 0,
      scheduledCount = 0;
    rentals.forEach(function (r) {
      if (r.status !== "aktywne" || !r.renewable || r.reserved) return;
      (r.cycles || []).forEach(function (c) {
        if (c.paid || c.cancelled) return;
        var due = c.dueDate || c.month + "-01";
        if (due < today) {
          overdue += +c.amount || 0;
          overdueCount++;
        } else if (due <= horizon) {
          scheduled += +c.amount || 0;
          scheduledCount++;
        }
      });
    });
    var expectedNext = 0,
      expectedCount = 0;
    rentals.forEach(function (r) {
      if (r.status !== "aktywne" || !r.renewable || r.reserved) return;
      var active = (r.cycles || []).filter(function (c) {
        return !c.cancelled;
      });
      if (!active.length) return;
      var last = active.reduce(function (a, b) {
        return (b.dueDate || b.month + "-01") > (a.dueDate || a.month + "-01") ? b : a;
      });
      var lastDue = last.dueDate || last.month + "-01",
        next = nextCycleDueDate(lastDue);
      if (active.some(function (c) {
        return (c.dueDate || c.month + "-01") === next;
      })) return;
      if (next >= today && next <= horizon) {
        expectedNext += +last.amount || +r.amount || 0;
        expectedCount++;
      }
    });
    var plannedStarts = 0,
      plannedCount = 0;
    rentals.forEach(function (r) {
      if (!r.reserved || !r.startDate) return;
      if (r.startDate >= today && r.startDate <= horizon) {
        plannedStarts += +r.amount || 0;
        plannedCount++;
      }
    });
    var pewne = overdue + scheduled,
      szacunek = expectedNext + plannedStarts;
    return {
      overdue: overdue,
      overdueCount: overdueCount,
      scheduled: scheduled,
      scheduledCount: scheduledCount,
      expectedNext: expectedNext,
      expectedCount: expectedCount,
      plannedStarts: plannedStarts,
      plannedCount: plannedCount,
      pewne: pewne,
      szacunek: szacunek,
      total: pewne + szacunek,
      horizon: horizon
    };
  }, [rentals, today]);

  // ── A2: Retencja cyklicznych (all-time) ──
  var retention = useMemo(function () {
    var cyc = rentals.filter(function (r) {
      return r.renewable && (r.cycles || []).some(function (c) {
        return !c.cancelled;
      });
    });
    var finishedCyc = cyc.filter(function (r) {
      return r.status === "zakończone";
    });
    var activeCyc = cyc.filter(function (r) {
      return r.status === "aktywne";
    });
    var counts = finishedCyc.map(function (r) {
      return (r.cycles || []).filter(function (c) {
        return !c.cancelled;
      }).length;
    });
    var avg = counts.length ? Math.round(counts.reduce(function (a, b) {
      return a + b;
    }, 0) / counts.length * 10) / 10 : null;
    var maxK = Math.min(6, Math.max.apply(Math, [0].concat(_toConsumableArray(counts))));
    var curve = [];
    var _loop = function _loop(k) {
      curve.push({
        k: String(k),
        pct: counts.length ? Math.round(counts.filter(function (c) {
          return c >= k;
        }).length / counts.length * 100) : 0,
        cnt: counts.filter(function (c) {
          return c >= k;
        }).length
      });
    };
    for (var k = 1; k <= maxK; k++) {
      _loop(k);
    }
    var over = counts.filter(function (c) {
      return c > 6;
    }).length;
    if (over > 0) curve.push({
      k: "7+",
      pct: Math.round(over / counts.length * 100),
      cnt: over
    });
    return {
      finishedCount: finishedCyc.length,
      activeCount: activeCyc.length,
      avg: avg,
      curve: curve
    };
  }, [rentals]);

  // ── A8: Wartość klienta (LTV) wg źródła — tylko sprzęt, all-time ──
  var ltvBySource = useMemo(function () {
    var pats = {};
    var keyOf = function keyOf(pid, pname) {
      return pid ? "p" + pid : "n" + (pname || "");
    };
    rentals.forEach(function (r) {
      if (r.reserved) return;
      var key = keyOf(r.patientId, r.patientName);
      if (!pats[key]) pats[key] = {
        paid: 0,
        source: null,
        sourceDate: null
      };
      pats[key].paid += calcRentalPaid(r);
      if (r.source && (!pats[key].sourceDate || (r.startDate || "") < pats[key].sourceDate)) {
        pats[key].source = r.source;
        pats[key].sourceDate = r.startDate || "";
      }
    });
    (nfzCases || []).forEach(function (cas) {
      var key = keyOf(cas.patientId, cas.patientName);
      var paidW = (finances || []).filter(function (f) {
        return f.type === "przychód" && f.sourceId === "wozek-" + cas.id;
      }).reduce(function (s, f) {
        return s + (+f.amount || 0);
      }, 0);
      if (!pats[key]) pats[key] = {
        paid: 0,
        source: null,
        sourceDate: null
      };
      pats[key].paid += paidW;
      if (cas.source && (!pats[key].sourceDate || (cas.orderDate || "") < pats[key].sourceDate)) {
        pats[key].source = cas.source;
        pats[key].sourceDate = cas.orderDate || "";
      }
    });
    var bySrc = {};
    RENTAL_SOURCES.forEach(function (s) {
      return bySrc[s.value] = {
        sum: 0,
        cnt: 0
      };
    });
    Object.values(pats).forEach(function (p) {
      if (p.paid > 0 && p.source && bySrc[p.source]) {
        bySrc[p.source].sum += p.paid;
        bySrc[p.source].cnt++;
      }
    });
    var rows = RENTAL_SOURCES.map(function (s) {
      return {
        k: s.value,
        l: s.label,
        c: s.color,
        avg: bySrc[s.value].cnt ? Math.round(bySrc[s.value].sum / bySrc[s.value].cnt) : 0,
        cnt: bySrc[s.value].cnt
      };
    }).filter(function (x) {
      return x.cnt > 0;
    }).sort(function (a, b) {
      return b.avg - a.avg;
    });
    return {
      rows: rows
    };
  }, [rentals, nfzCases, finances]);

  // ── A9: Wypożyczenie wózka → refundacja NFZ (ten sam pacjent, all-time) ──
  var wozekConv = useMemo(function () {
    var wozRentals = rentals.filter(function (r) {
      return WOZEK_EQUIPMENT.includes(r.equipment) && r.startDate && !r.reserved;
    });
    var keyOf = function keyOf(pid, pname) {
      return pid ? "p" + pid : "n" + (pname || "");
    };
    var converted = 0,
      daysSum = 0,
      refundSum = 0;
    wozRentals.forEach(function (r) {
      var key = keyOf(r.patientId, r.patientName);
      var match = (nfzCases || []).filter(function (cas) {
        return keyOf(cas.patientId, cas.patientName) === key && cas.orderDate && cas.orderDate >= r.startDate;
      }).sort(function (a, b) {
        return a.orderDate.localeCompare(b.orderDate);
      })[0];
      if (match) {
        converted++;
        daysSum += Math.max(0, dateDiff(r.startDate, match.orderDate));
        refundSum += (finances || []).filter(function (f) {
          return f.type === "przychód" && f.sourceId === "wozek-" + match.id;
        }).reduce(function (s, f) {
          return s + (+f.amount || 0);
        }, 0);
      }
    });
    return {
      total: wozRentals.length,
      converted: converted,
      pct: wozRentals.length ? Math.round(converted / wozRentals.length * 100) : 0,
      avgDays: converted ? Math.round(daysSum / converted) : null,
      avgRefund: converted ? Math.round(refundSum / converted) : null
    };
  }, [rentals, nfzCases, finances]);

  // ── A5 + A7: Sezonowość, rok do roku, koszt reklamy ──
  var displayYear = isYear ? statsYear : +selMonth.slice(0, 4);
  var seasonData = useMemo(function () {
    var curChunks = chunkRanges(displayYear, seasonGran),
      prevChunks = chunkRanges(displayYear - 1, seasonGran);
    var rows = curChunks.map(function (b, i) {
      var future = b.from > today;
      var to = b.to > today ? today : b.to;
      var cur = future ? 0 : revenueInRange(b.from, to, null);
      var pb = prevChunks[i];
      var prev = pb ? revenueInRange(pb.from, pb.to, null) : 0;
      var days = Math.round((Date.parse(to + "T00:00:00Z") - Date.parse(b.from + "T00:00:00Z")) / 864e5) + 1;
      return {
        k: "c" + i,
        l: b.label,
        from: b.from,
        to: b.to,
        cur: cur,
        prev: prev,
        future: future,
        perDay: !future && days > 0 ? Math.round(cur / days) : null,
        diffPct: prev > 0 && !future ? Math.round((cur - prev) / prev * 100) : null
      };
    });
    var yoyMonths = Array.from({
      length: 12
    }, function (_, i) {
      var mm = String(i + 1).padStart(2, "0");
      var lastCur = String(new Date(displayYear, i + 1, 0).getDate()).padStart(2, "0");
      var lastPrev = String(new Date(displayYear - 1, i + 1, 0).getDate()).padStart(2, "0");
      var startCur = displayYear + "-" + mm + "-01";
      var cur = startCur > today ? 0 : revenueInRange(startCur, displayYear + "-" + mm + "-" + lastCur > today ? today : displayYear + "-" + mm + "-" + lastCur, null);
      var prev = revenueInRange(displayYear - 1 + "-" + mm + "-01", displayYear - 1 + "-" + mm + "-" + lastPrev, null);
      return {
        m: i,
        cur: cur,
        prev: prev
      };
    });
    return {
      rows: rows,
      yoyMonths: yoyMonths
    };
  }, [displayYear, seasonGran, rentals, finances, nfzCases, today]);
  var adsStats = useMemo(function () {
    var newRentals = rentals.filter(function (r) {
      return r.source === "reklama" && !r.reserved && (r.startDate || "") >= pStart && (r.startDate || "") <= pEnd;
    }).length;
    var newWozki = (nfzCases || []).filter(function (cas) {
      return cas.source === "reklama" && (cas.orderDate || "") >= pStart && (cas.orderDate || "") <= pEnd;
    }).length;
    var revenue = 0;
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód" || (f.date || "") < pStart || (f.date || "") > pEnd) return;
      var rid = getRid(f.sourceId);
      if (rid) {
        var r = rentals.find(function (x) {
          return x.id === rid;
        });
        if (r && r.source === "reklama") revenue += +f.amount || 0;
        return;
      }
      var sid = f.sourceId || "";
      if (sid.startsWith("wozek-")) {
        var cid = +sid.slice(6);
        var cas = (nfzCases || []).find(function (x) {
          return x.id === cid;
        });
        if (cas && cas.source === "reklama") revenue += +f.amount || 0;
      }
    });
    rentals.forEach(function (r) {
      if ((r.payments || []).length > 0 || (r.cycles || []).length > 0 || r.source !== "reklama") return;
      var paid = +r.amountPaid || 0;
      if (!paid) return;
      var d = r.startDate || "";
      if (d >= pStart && d <= pEnd) revenue += paid;
    });
    var newCount = newRentals + newWozki;
    return {
      newCount: newCount,
      revenue: revenue,
      spend: stats.marketingSpend,
      perPatient: newCount > 0 ? Math.round(stats.marketingSpend / newCount) : null,
      roas: stats.marketingSpend > 0 ? Math.round(revenue / stats.marketingSpend * 100) / 100 : null
    };
  }, [rentals, nfzCases, finances, pStart, pEnd, stats.marketingSpend]);

  // ── A10: Struktura długości wypożyczeń jednorazowych (all-time) ──
  var durationHist = useMemo(function () {
    var finished = rentals.filter(function (r) {
      return !r.renewable && r.status === "zakończone" && r.startDate && r.endDate;
    });
    var buckets = [{
      l: "1–7 dni",
      lo: 1,
      hi: 7,
      n: 0
    }, {
      l: "8–14 dni",
      lo: 8,
      hi: 14,
      n: 0
    }, {
      l: "15–30 dni",
      lo: 15,
      hi: 30,
      n: 0
    }, {
      l: "31+ dni",
      lo: 31,
      hi: Infinity,
      n: 0
    }];
    finished.forEach(function (r) {
      var d = Math.max(1, dateDiff(r.startDate, r.endDate));
      var b = buckets.find(function (x) {
        return d >= x.lo && d <= x.hi;
      });
      if (b) b.n++;
    });
    return {
      buckets: buckets,
      total: finished.length
    };
  }, [rentals]);

  // ── A11: Kontrola danych — każdy problem z listą konkretnych, klikalnych pozycji ──
  var dataHealth = useMemo(function () {
    var issues = [];
    var goR = function goR(id) {
      return goToRental ? function () {
        return goToRental(id);
      } : null;
    };
    var goW = function goW(id) {
      return goToWozki ? function () {
        return goToWozki(id);
      } : null;
    };
    var overlapEq = occStats.filter(function (x) {
      return x.overlapDays > 0;
    });
    if (overlapEq.length) issues.push({
      k: "overlap",
      l: "Nakładające się wypożyczenia szyn ponad liczbę sztuk",
      n: overlapEq.reduce(function (s, x) {
        return s + x.overlapDays;
      }, 0),
      hint: "Otwórz Obłożenie szyn CPM — tam przy sprzęcie zobaczysz dokładnie które dni się nakładają.",
      rows: overlapEq.map(function (x) {
        return {
          label: x.eq,
          sub: x.overlapDays + " dni nakładania",
          go: function go() {
            return setOpenSec("occ");
          }
        };
      })
    });
    var noSrcRentals = rentals.filter(function (r) {
      return !r.reserved && !r.source;
    });
    var noSrcWozki = (nfzCases || []).filter(function (c) {
      return !c.source;
    });
    if (noSrcRentals.length + noSrcWozki.length > 0) issues.push({
      k: "nosrc",
      l: "Brak oznaczonego źródła",
      n: noSrcRentals.length + noSrcWozki.length,
      rows: [].concat(_toConsumableArray(noSrcRentals.map(function (r) {
        return {
          person: true,
          label: r.patientName || "—",
          sub: (r.equipment || "") + " · " + (r.startDate || ""),
          go: goR(r.id)
        };
      })), _toConsumableArray(noSrcWozki.map(function (c) {
        return {
          person: true,
          label: c.patientName || "—",
          sub: "🦽 wózek · " + (c.orderDate || ""),
          go: goW(c.id)
        };
      })))
    });
    var eqNoAdded = equipmentAll.filter(function (eq) {
      return catOf(eq) === "szyny" && !(stock && stock.addedDate && stock.addedDate[eq]) && rentals.some(function (r) {
        return r.equipment === eq;
      });
    });
    if (eqNoAdded.length) issues.push({
      k: "noadded",
      l: "Brak daty dodania sprzętu (szyny)",
      n: eqNoAdded.length,
      hint: "Uzupełnij w zakładce Sprzęt → Edytuj magazyn.",
      rows: eqNoAdded.map(function (eq) {
        return {
          label: eq,
          sub: null,
          go: null
        };
      })
    });
    var noEnd = rentals.filter(function (r) {
      return r.status === "zakończone" && !r.renewable && !r.endDate;
    });
    if (noEnd.length) issues.push({
      k: "noend",
      l: "Zakończone wypożyczenia bez daty końca",
      n: noEnd.length,
      rows: noEnd.map(function (r) {
        return {
          person: true,
          label: r.patientName || "—",
          sub: r.equipment || "",
          go: goR(r.id)
        };
      })
    });
    var oldRes = rentals.filter(function (r) {
      return r.reserved && r.reservedAt && dateDiff(r.reservedAt, today) > 14;
    });
    if (oldRes.length) issues.push({
      k: "oldres",
      l: "Rezerwacje czekające ponad 14 dni",
      n: oldRes.length,
      rows: oldRes.map(function (r) {
        return {
          person: true,
          label: r.patientName || "—",
          sub: dateDiff(r.reservedAt, today) + " dni czekania",
          go: goR(r.id)
        };
      })
    });
    var overdueByRental = {};
    rentals.forEach(function (r) {
      if (r.status !== "aktywne" || !r.renewable || r.reserved) return;
      (r.cycles || []).forEach(function (c) {
        if (!c.paid && !c.cancelled && (c.dueDate || c.month + "-01") < today) {
          if (!overdueByRental[r.id]) overdueByRental[r.id] = {
            r: r,
            n: 0,
            sum: 0
          };
          overdueByRental[r.id].n++;
          overdueByRental[r.id].sum += +c.amount || 0;
        }
      });
    });
    var overdueList = Object.values(overdueByRental);
    if (overdueList.length) issues.push({
      k: "overdue",
      l: "Zaległe okresy cykliczne",
      n: overdueList.reduce(function (s, x) {
        return s + x.n;
      }, 0),
      rows: overdueList.map(function (x) {
        return {
          person: true,
          label: x.r.patientName || "—",
          sub: x.n + " okres" + (x.n === 1 ? "" : "y") + " · " + Z(x.sum),
          go: goR(x.r.id)
        };
      })
    });
    return {
      issues: issues,
      total: issues.reduce(function (s, i) {
        return s + i.n;
      }, 0)
    };
  }, [rentals, nfzCases, stock, occStats, equipmentAll, today, goToRental, goToWozki]);

  // ── A3 + A6: przychód/dzień dostępności i przestój między wypożyczeniami (tylko szyny CPM) ──
  var occStatsExt = useMemo(function () {
    return occStats.map(function (x) {
      var list = rentals.filter(function (r) {
        return r.equipment === x.eq && r.startDate && !r.reserved;
      }).map(function (r) {
        return {
          s: r.startDate,
          e: r.status === "aktywne" ? today : r.endDate || r.startDate
        };
      }).sort(function (a, b) {
        return a.s.localeCompare(b.s);
      });
      var gaps = [];
      for (var i = 1; i < list.length; i++) {
        var g = dateDiff(list[i - 1].e, list[i].s) - 1;
        if (g > 0 && list[i].s >= pStart && list[i].s <= pEnd) gaps.push(g);
      }
      var cutEnd2 = pEnd < today ? pEnd : today;
      var revPerDay = x.cap > 0 ? Math.round(revenueInRange(pStart, cutEnd2, x.eq) / x.cap) : null;
      return _objectSpread(_objectSpread({}, x), {}, {
        gapAvg: gaps.length ? Math.round(gaps.reduce(function (a, b) {
          return a + b;
        }, 0) / gaps.length) : null,
        gapCount: gaps.length,
        revPerDay: revPerDay
      });
    });
  }, [occStats, rentals, finances, nfzCases, pStart, pEnd, today]);
  var srcPct = pctSplit(src.rows.map(function (r) {
    return r.rev;
  }));
  var tog = function tog(id) {
    return function () {
      return setOpenSec(function (o) {
        return o === id ? null : id;
      });
    };
  };
  var kv = function kv(l, v, c, key) {
    return /*#__PURE__*/React.createElement("div", {
      key: key || l,
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
        padding: "9px 0",
        borderBottom: "1px solid " + borderC,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: c || textC
      }
    }, l), /*#__PURE__*/React.createElement("b", {
      style: {
        color: c || textC,
        fontVariantNumeric: "tabular-nums",
        textAlign: "right"
      }
    }, v));
  };
  var navBtn = function navBtn(fn, ch, dis) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: dis ? undefined : fn,
      disabled: !!dis,
      "aria-label": ch === "‹" ? "Wstecz" : "Dalej",
      style: {
        flexShrink: 0,
        width: 36,
        height: 36,
        borderRadius: 10,
        border: "1.5px solid " + borderC,
        background: bg,
        opacity: dis ? .35 : 1,
        cursor: dis ? "default" : "pointer",
        fontWeight: 700,
        fontSize: 18,
        color: subC,
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, ch);
  };
  var shiftMonth = function shiftMonth(n) {
    return setSelMonth(function (m) {
      var t = ymAdd(m, n);
      return t > today.slice(0, 7) ? m : t;
    });
  };
  var switchScope = function switchScope(s) {
    if (s === "year") setStatsYear(+selMonth.slice(0, 4));
    setScope(s);
  };

  // ── mini-wizualizacje w nagłówkach ──
  var miniSrc = function () {
    var x = 0;
    var t = src.rows.reduce(function (s, r) {
      return s + r.rev;
    }, 0) || 1;
    return /*#__PURE__*/React.createElement("svg", {
      width: "54",
      height: "16",
      "aria-hidden": "true"
    }, src.rows.map(function (r) {
      var w = r.rev / t * 54;
      var el = /*#__PURE__*/React.createElement("rect", {
        key: r.k,
        x: x,
        y: "0",
        width: Math.max(0, w - 1.5),
        height: "16",
        rx: "3",
        fill: r.c
      });
      x += w;
      return el;
    }));
  }();
  var miniOcc = /*#__PURE__*/React.createElement("svg", {
    width: Math.max(9, Math.min(6, occStats.length) * 9),
    height: "22",
    "aria-hidden": "true"
  }, occStats.slice(0, 6).map(function (x, i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: x.eq,
      x: i * 9,
      y: 22 - Math.max(2, x.pct / 100 * 22),
      width: "6",
      height: Math.max(2, x.pct / 100 * 22),
      rx: "2",
      fill: occCol(x.pct)
    });
  }));
  var miniRoi = /*#__PURE__*/React.createElement("span", null, roiKnown.slice(0, 6).map(function (x) {
    return /*#__PURE__*/React.createElement("i", {
      key: x.eq,
      style: {
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        marginLeft: 3,
        background: x.earned >= x.investment ? GREEN : ORANGE
      }
    });
  }));
  var selIdx = stats.monthlyArr.findIndex(function (x) {
    return x[0] === selMonth;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: dk ? "#1E2F4A" : "#DCE5F1",
      borderRadius: 12,
      padding: 3,
      marginBottom: 10
    }
  }, [["month", "Miesiąc"], ["year", "Rok"]].map(function (_ref1) {
    var _ref10 = _slicedToArray(_ref1, 2),
      k = _ref10[0],
      l = _ref10[1];
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: function onClick() {
        return switchScope(k);
      },
      style: {
        flex: 1,
        border: "none",
        borderRadius: 10,
        padding: 8,
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit",
        background: scope === k ? dk ? "#18202F" : "#fff" : "none",
        color: scope === k ? "#3E6FB0" : dk ? "#93A9CE" : "#3E5578",
        boxShadow: scope === k ? "0 1px 4px rgba(0,0,0,.14)" : "none"
      }
    }, l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14
    }
  }, navBtn(function () {
    return isYear ? setStatsYear(function (y) {
      return y - 1;
    }) : shiftMonth(-1);
  }, "‹"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      fontWeight: 700,
      fontSize: 16,
      color: textC,
      fontFamily: "'Syne',sans-serif",
      textTransform: "capitalize"
    }
  }, periodLabel), navBtn(function () {
    return isYear ? setStatsYear(function (y) {
      return y + 1;
    }) : shiftMonth(1);
  }, "›", isYear ? statsYear >= +today.slice(0, 4) : selMonth >= today.slice(0, 7))), dataHealth.total > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setOpenSec("health");
    },
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      padding: "11px 14px",
      borderRadius: 14,
      border: "1px solid " + ORANGE + "55",
      background: ORANGE + "18",
      color: ORANGE,
      fontWeight: 700,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 12,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u26A0 ", dataHealth.issues.length, " rzecz", dataHealth.issues.length === 1 ? "" : "y", " do sprawdzenia w danych"), /*#__PURE__*/React.createElement("span", null, "zobacz \u203A")), /*#__PURE__*/React.createElement(GroupLabel, {
    dk: dk
  }, "\uD83D\uDCB0 Pieni\u0105dze"), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "rev",
    onToggle: tog("rev"),
    title: "Przych\xF3d ze sprz\u0119tu",
    sub: "wypo\u017Cyczenia i w\xF3zki",
    mini: /*#__PURE__*/React.createElement(StatSpark, {
      vals: stats.monthlyArr.map(function (x) {
        return x[1] + x[2];
      }),
      w: 58,
      h: 24,
      color: BLUE,
      sel: selIdx >= 0 && !isYear ? selIdx : null
    }),
    keyVal: Z(totalAll),
    keyColor: GREEN
  }, kv("Wypożyczenia (wpłaty)", Z(stats.totalRevenue)), kv("Wózki – refundacje NFZ (" + stats.wozkiCount + " szt.)", Z(stats.wozkiRevenue), PURPLE), kv("Nowych wypożyczeń", stats.totalCount), kv("Śr. czas jednorazowych", stats.avgDurationOne !== null ? stats.avgDurationOne + " dni" : "brak danych"), kv("Śr. liczba okresów (cykliczne)", stats.avgCyclesCount !== null ? String(stats.avgCyclesCount) : "brak danych"), stats.marketingSpend > 0 ? kv("Marketing (wydatki)", Z(stats.marketingSpend), RED) : kv("Marketing (wydatki)", "brak wpisów w budżecie", subC), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setStock(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          _mktgOpen: !(s && s._mktgOpen)
        });
      });
    },
    style: {
      fontSize: 11,
      color: subC,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "2px 0",
      fontFamily: "inherit"
    }
  }, stock && stock._mktgOpen ? "zamknij wybór kategorii" : "zmień kategorię marketingu")), stock && stock._mktgOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: subC,
      marginBottom: 4
    }
  }, "Kategoria w bud\u017Cecie (Dom):"), /*#__PURE__*/React.createElement("select", {
    value: mktgCat,
    onChange: function onChange(e) {
      return setStock(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          marketingCat: e.target.value,
          marketingSub: ""
        });
      });
    },
    style: {
      width: "100%",
      padding: "7px",
      borderRadius: 8,
      border: "1px solid " + borderC,
      background: bg,
      color: textC,
      fontSize: 13,
      fontFamily: "inherit",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- domy\u015Blnie: Firma / Marketing --"), budgetCatNames.map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c);
  })), mktgCat && /*#__PURE__*/React.createElement("select", {
    value: mktgSub,
    onChange: function onChange(e) {
      return setStock(function (s) {
        return _objectSpread(_objectSpread({}, s), {}, {
          marketingSub: e.target.value
        });
      });
    },
    style: {
      width: "100%",
      padding: "7px",
      borderRadius: 8,
      border: "1px solid " + borderC,
      background: bg,
      color: textC,
      fontSize: 13,
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- ca\u0142a kategoria --"), budgetSubNames.map(function (s) {
    return /*#__PURE__*/React.createElement("option", {
      key: s,
      value: s
    }, s);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em",
      margin: "14px 0 4px"
    }
  }, isYear ? "Rok " + statsYear : "12 miesięcy", " \xB7 dotknij s\u0142upka"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 4,
      height: 112,
      paddingTop: 14
    }
  }, stats.monthlyArr.map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 3),
      m = _ref12[0],
      v = _ref12[1],
      w = _ref12[2];
    var t = v + w,
      h = Math.max(t > 0 ? 3 : 0, Math.round(t / stats.maxMonthly * 80)),
      hw = t > 0 ? w / t * 100 : 0;
    var sel = isYear ? m.startsWith(String(statsYear)) : m === selMonth;
    return /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: function onClick() {
        setSelMonth(m);
        setScope("month");
      },
      "aria-label": m + ": " + (demo ? "" : Math.round(t) + " zł"),
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 4,
        height: "100%",
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: textC,
        minHeight: 11,
        whiteSpace: "nowrap"
      }
    }, !demo && !isYear && m === selMonth && t > 0 ? t >= 1000 ? (t / 1000).toFixed(1) + "k" : Math.round(t) : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: h,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius: "5px 5px 0 0",
        overflow: "hidden",
        opacity: sel ? 1 : .4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: hw + "%",
        background: PURPLE
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: BLUE
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        lineHeight: 1.15,
        textAlign: "center",
        color: sel ? "#3E6FB0" : subC,
        fontWeight: sel ? 700 : 400
      }
    }, PL_MON[+m.slice(5) - 1], (m.slice(5) === "01" || m === stats.monthlyArr[0][0]) && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        opacity: .8
      }
    }, "'" + m.slice(2, 4))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      fontSize: 11,
      color: subC,
      marginTop: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: BLUE,
      marginRight: 5
    }
  }), "Wypo\u017Cyczenia"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: PURPLE,
      marginRight: 5
    }
  }), "W\xF3zki (refundacje)")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: "1px solid " + borderC
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em",
      marginBottom: 8
    }
  }, "Prognoza \u2014 najbli\u017Csze 30 dni"), forecast.pewne + forecast.szacunek === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak aktywnych cykli, rezerwacji ani zaleg\u0142o\u015Bci do prognozy.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: dk ? "#0F2A1E" : "#EAF8F0",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginBottom: 2
    }
  }, "Pewne"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 18,
      color: GREEN
    }
  }, Z(forecast.pewne))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: dk ? "#241A0A" : "#FFF6E8",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginBottom: 2
    }
  }, "Szacunek"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 18,
      color: ORANGE
    }
  }, Z(forecast.szacunek)))), forecast.overdueCount > 0 && kv("Zaległe do odzyskania (" + forecast.overdueCount + ")", Z(forecast.overdue), RED), forecast.scheduledCount > 0 && kv("Już zaplanowane cykle (" + forecast.scheduledCount + ")", Z(forecast.scheduled)), forecast.expectedCount > 0 && kv("Spodziewane kolejne okresy (" + forecast.expectedCount + ")", Z(forecast.expectedNext), ORANGE), forecast.plannedCount > 0 && kv("Zaplanowane starty rezerwacji (" + forecast.plannedCount + ")", Z(forecast.plannedStarts), ORANGE), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, "\u201EPewne\" = zaleg\u0142o\u015Bci do \u015Bci\u0105gni\u0119cia + ju\u017C utworzone okresy z terminem w tym oknie. \u201ESzacunek\" = kolejne okresy jeszcze nieutworzone (licz\u0105c +30 dni od ostatniego) i starty z rezerwacji \u2014 mog\u0105 si\u0119 nie zrealizowa\u0107.")))), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "season",
    onToggle: tog("season"),
    title: "Sezonowo\u015B\u0107 i reklama",
    sub: displayYear + " vs " + (displayYear - 1),
    keyVal: adsStats.perPatient !== null ? Z(adsStats.perPatient) + "/pacj." : "—",
    keyColor: adsStats.newCount === 0 && adsStats.spend > 0 ? RED : ORANGE
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em",
      marginBottom: 8
    }
  }, "\uD83D\uDCE2 Reklama w tym okresie (", periodLabel, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: dk ? "#241A0A" : "#FFF6E8",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginBottom: 2
    }
  }, "Wydano"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 17,
      color: RED
    }
  }, Z(adsStats.spend))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: dk ? "#0F1E33" : "#EEF4FC",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginBottom: 2
    }
  }, "Nowych klient\xF3w"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 17,
      color: BLUE
    }
  }, adsStats.newCount))), adsStats.spend > 0 && adsStats.newCount === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: RED,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "\u26A0 Wydano ", Z(adsStats.spend), " na reklam\u0119, zero nowych klient\xF3w z tego \u017Ar\xF3d\u0142a w tym okresie."), kv("Koszt na pozyskanego klienta", adsStats.perPatient !== null ? Z(adsStats.perPatient) : "—"), kv("Przychód z reklamy w okresie", Z(adsStats.revenue), GREEN), kv("Zwrot z wydanej złotówki (ROAS)", adsStats.roas !== null ? adsStats.roas + "×" : "—"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em",
      margin: "16px 0 8px"
    }
  }, "Rok do roku \u2014 ", displayYear, " vs ", displayYear - 1), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 3,
      height: 78
    }
  }, seasonData.yoyMonths.map(function (mo) {
    var mx = Math.max.apply(Math, [1].concat(_toConsumableArray(seasonData.yoyMonths.map(function (x) {
      return Math.max(x.cur, x.prev);
    }))));
    return /*#__PURE__*/React.createElement("div", {
      key: mo.m,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        height: "100%",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 1,
        alignItems: "flex-end",
        width: "100%",
        height: 64
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: Math.round(mo.prev / mx * 64) + "px",
        background: trackC,
        borderRadius: "2px 2px 0 0"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: Math.round(mo.cur / mx * 64) + "px",
        background: mo.cur > 0 ? BLUE : trackC,
        borderRadius: "2px 2px 0 0"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        color: subC
      }
    }, PL_MON[mo.m]));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      fontSize: 11,
      color: subC,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: 2,
      background: trackC,
      marginRight: 5
    }
  }), displayYear - 1), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: 2,
      background: BLUE,
      marginRight: 5
    }
  }), displayYear)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "16px 0 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: subC,
      textTransform: "uppercase",
      letterSpacing: ".07em"
    }
  }, "Okresy kalendarzowe"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: dk ? "#1E2F4A" : "#DCE5F1",
      borderRadius: 10,
      padding: 2
    }
  }, [["2w", "2 tyg."], ["month", "Miesiąc"]].map(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 2),
      k = _ref14[0],
      l = _ref14[1];
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: function onClick() {
        return setSeasonGran(k);
      },
      style: {
        border: "none",
        borderRadius: 8,
        padding: "4px 10px",
        fontWeight: 600,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "inherit",
        background: seasonGran === k ? dk ? "#18202F" : "#fff" : "none",
        color: seasonGran === k ? "#3E6FB0" : dk ? "#93A9CE" : "#3E5578"
      }
    }, l);
  }))), seasonData.rows.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.k,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: textC
      }
    }, b.l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: subC,
        textAlign: "right"
      }
    }, b.future ? "jeszcze nie nadszedł" : /*#__PURE__*/React.createElement(React.Fragment, null, Z(b.cur), b.diffPct !== null && /*#__PURE__*/React.createElement("b", {
      style: {
        color: b.diffPct >= 0 ? GREEN : RED,
        marginLeft: 4
      }
    }, b.diffPct >= 0 ? "+" : "", b.diffPct, "%")))), !b.future && b.perDay !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: subC,
        marginTop: 1
      }
    }, "\u015Br. ", Z(b.perDay), "/dzie\u0144 \xB7 rok temu: ", Z(b.prev)));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "Por\xF3wnanie do tego samego okresu rok temu, po kolei od stycznia. Prze\u0142\u0105cznik zmienia szeroko\u015B\u0107 okna.")), /*#__PURE__*/React.createElement(GroupLabel, {
    dk: dk
  }, "\uD83D\uDC65 Klienci"), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "src",
    onToggle: tog("src"),
    title: "Sk\u0105d trafiaj\u0105 klienci",
    sub: src.rows.length > 0 ? "najlepsze: " + src.rows[0].l : "brak danych w okresie",
    mini: src.rows.length > 0 ? miniSrc : null,
    keyVal: src.totalCnt + " wyp."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 14,
      flexWrap: "wrap"
    }
  }, [{
    k: "all",
    l: "Wszystko"
  }, {
    k: "szyny",
    l: "Szyny"
  }, {
    k: "wozki",
    l: "Wózki"
  }, {
    k: "balkoniki",
    l: "Balkoniki"
  }].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.k,
      onClick: function onClick() {
        return setSrcTab(t.k);
      },
      style: {
        padding: "5px 12px",
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 11,
        background: srcTab === t.k ? "#3E6FB0" : dk ? "#1E2F4A" : "#D9E2F0",
        color: srcTab === t.k ? "#fff" : subC,
        fontFamily: "inherit"
      }
    }, t.l);
  })), src.totalRev === 0 && src.totalCnt === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak danych", srcTab !== "all" ? " w tej kategorii" : "", " \u2014 uzupe\u0142nij \u017Ar\xF3d\u0142o przy dodawaniu ", srcTab === "wozki" ? "wózków" : "wypożyczeń") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "132px 1fr",
      gap: 14,
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(StatDonut, {
    rows: src.rows.map(function (r) {
      return {
        k: r.k,
        v: r.rev,
        c: r.c
      };
    }),
    size: 132,
    top: src.totalCnt + (src.totalW ? "+" + src.totalW : ""),
    bottom: "klient\xF3w",
    track: trackC,
    ink: textC,
    sub: subC
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7,
      minWidth: 0
    }
  }, src.rows.map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.k,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 3,
        background: r.c,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: textC
      }
    }, r.l), /*#__PURE__*/React.createElement("b", {
      style: {
        fontVariantNumeric: "tabular-nums",
        color: textC,
        flexShrink: 0
      }
    }, r.cnt + r.wc, " \xB7 ", srcPct[src.rows.indexOf(r)], "%"));
  }))), src.rows.map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: "d" + r.k,
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 8,
        padding: "9px 0",
        borderBottom: "1px solid " + borderC,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        minWidth: 0,
        color: textC
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 3,
        background: r.c,
        flexShrink: 0
      }
    }), r.l), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right",
        fontVariantNumeric: "tabular-nums",
        color: subC
      }
    }, r.cnt > 0 && r.cnt + " wyp.", r.wc > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: PURPLE,
        fontWeight: 600
      }
    }, r.cnt > 0 ? " + " : "", r.wc, " ", plWozek(r.wc)), " \xB7 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: GREEN
      }
    }, Z(r.rev))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0 0",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: textC
    }
  }, "\u0141\u0105cznie"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: textC
    }
  }, src.totalCnt, " wyp.", src.totalW > 0 ? " + " + src.totalW + " wóz." : "", " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: GREEN
    }
  }, Z(src.totalRev))))), src.withoutSrc > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: subC,
      marginTop: 8
    }
  }, src.withoutSrc, " z ", src.listItems.length, " wp\u0142at bez oznaczonego \u017Ar\xF3d\u0142a"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowRentalList(function (v) {
        return !v;
      });
    },
    style: {
      marginTop: 10,
      width: "100%",
      padding: "6px",
      borderRadius: 8,
      border: "1px solid " + borderC,
      background: "transparent",
      color: subC,
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, showRentalList ? "▲ Ukryj listę" : "▼ Lista wpłat (" + src.listItems.length + ")"), showRentalList && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, src.listItems.map(function (item) {
    var _item$date;
    var s = RENTAL_SOURCES.find(function (x) {
      return x.value === item.source;
    });
    var eq = (item.equipment || "?").replace("Artromot K1", "AK1").replace("Kinetec Spectra", "KS").replace("Optiflex", "OPT").replace("Ambonka Paula", "AMB").replace("Balkonik ortopedyczny", "BAL").replace("Wózek inwalidzki Elite Tim", "TIM");
    var isExt = item.type !== "Wpłata";
    return /*#__PURE__*/React.createElement("div", {
      key: item.key,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 0",
        borderBottom: "1px solid " + borderC,
        fontSize: 12,
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC,
        flexShrink: 0,
        fontSize: 11
      }
    }, (_item$date = item.date) === null || _item$date === void 0 ? void 0 : _item$date.slice(5)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC,
        fontWeight: 600,
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, demo ? "Pacjent" : item.patientName), /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC,
        flexShrink: 0,
        fontSize: 11
      }
    }, eq), isExt && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#7C6AF4",
        fontWeight: 700,
        fontSize: 10,
        flexShrink: 0
      }
    }, item.type), /*#__PURE__*/React.createElement("span", {
      style: {
        color: GREEN,
        fontWeight: 700,
        flexShrink: 0
      }
    }, demo ? "****" : item.amount + " zł"), s ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: s.color,
        fontWeight: 700,
        fontSize: 10,
        flexShrink: 0
      }
    }, s.label.split(" ")[0]) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC,
        fontSize: 10,
        flexShrink: 0
      }
    }, "\u2014"));
  }))), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "ret",
    onToggle: tog("ret"),
    title: "Retencja cyklicznych",
    sub: retention.finishedCount > 0 ? "śr. " + retention.avg + " okresów" : "brak zakończonych cyklicznych",
    keyVal: retention.finishedCount > 0 ? String(retention.avg) : "—"
  }, retention.finishedCount === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Brak zako\u0144czonych wypo\u017Cycze\u0144 cyklicznych do policzenia retencji.", retention.activeCount > 0 && " (" + retention.activeCount + " nadal aktywnych)") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC,
      marginBottom: 12
    }
  }, "Na podstawie ", retention.finishedCount, " zako\u0144czonych wypo\u017Cycze\u0144 cyklicznych", retention.activeCount > 0 && " (+ " + retention.activeCount + " nadal aktywnych, jeszcze licząc)", "."), retention.curve.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.k,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC,
        fontWeight: 600
      }
    }, c.k === "1" ? "1 okres" : c.k + " okres" + (c.k !== "7+" && +c.k < 5 ? "y" : "ów")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC
      }
    }, c.pct, "% (", c.cnt, ")")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 7,
        borderRadius: 4,
        background: trackC
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: c.pct + "%",
        background: BLUE,
        borderRadius: 4
      }
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "Odsetek wypo\u017Cycze\u0144, kt\xF3re dotrwa\u0142y do co najmniej k-tego okresu (30 dni = 1 okres). Liczone all-time, niezale\u017Cnie od wybranego miesi\u0105ca/roku."))), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "ltv",
    onToggle: tog("ltv"),
    title: "Warto\u015B\u0107 klienta wg \u017Ar\xF3d\u0142a",
    sub: ltvBySource.rows.length > 0 ? "najlepsze: " + ltvBySource.rows[0].l : "brak danych",
    keyVal: ltvBySource.rows.length > 0 ? Z(ltvBySource.rows[0].avg) : "—"
  }, ltvBySource.rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Za ma\u0142o danych \u2014 uzupe\u0142nij \u017Ar\xF3d\u0142a przy wypo\u017Cyczeniach.") : /*#__PURE__*/React.createElement(React.Fragment, null, ltvBySource.rows.map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.k,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 0",
        borderBottom: "1px solid " + borderC,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center",
        color: textC
      }
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 3,
        background: r.c,
        flexShrink: 0
      }
    }), r.l, /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC,
        fontWeight: 400
      }
    }, " (", r.cnt, " os.)")), /*#__PURE__*/React.createElement("b", {
      style: {
        color: GREEN,
        fontVariantNumeric: "tabular-nums"
      }
    }, Z(r.avg)));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, "\u015Arednia suma wp\u0142at (wypo\u017Cyczenia + w\xF3zki, bez wizyt) na jednego pacjenta z danego \u017Ar\xF3d\u0142a, ca\u0142o\u015Bciowo. \u0179r\xF3d\u0142o = pierwsze wypo\u017Cyczenie/zlecenie tego pacjenta."))), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "wozconv",
    onToggle: tog("wozconv"),
    title: "W\xF3zek \u2192 refundacja NFZ",
    sub: wozekConv.total > 0 ? wozekConv.converted + " z " + wozekConv.total + " przeszło na refundację" : "brak wypożyczeń wózków",
    keyVal: wozekConv.total > 0 ? wozekConv.pct + "%" : "—"
  }, wozekConv.total === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Brak wypo\u017Cycze\u0144 w\xF3zk\xF3w do policzenia.") : /*#__PURE__*/React.createElement(React.Fragment, null, kv("Wypożyczeń wózka", wozekConv.total), kv("Przeszło na refundację NFZ", wozekConv.converted + " (" + wozekConv.pct + "%)", GREEN), wozekConv.avgDays !== null && kv("Śr. czas do decyzji", wozekConv.avgDays + " dni"), wozekConv.avgRefund !== null && kv("Śr. kwota refundacji", Z(wozekConv.avgRefund), PURPLE), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, "Ten sam pacjent, zlecenie NFZ z\u0142o\u017Cone w dniu wypo\u017Cyczenia w\xF3zka lub p\xF3\u017Aniej. All-time."))), /*#__PURE__*/React.createElement(GroupLabel, {
    dk: dk
  }, "\uD83E\uDDBF Sprz\u0119t"), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "occ",
    onToggle: tog("occ"),
    title: "Ob\u0142o\u017Cenie szyn CPM",
    sub: occStats.length > 0 ? "średnio " + avgOcc + "% dni w okresie" : "brak danych w okresie",
    mini: occStats.length > 0 ? miniOcc : null,
    keyVal: occStats.length > 0 ? avgOcc + "%" : "—",
    keyColor: occStats.length > 0 ? occCol(avgOcc) : subC
  }, occStats.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Brak danych o szynach CPM w tym okresie"), occStatsExt.map(function (x) {
    var col = occCol(x.pct);
    var preStyle = {
      height: 16,
      borderRadius: 3,
      background: "transparent",
      boxShadow: "inset 0 0 0 1px " + trackC
    };
    var strip;
    if (!isYear) {
      var byDate = {};
      x.days.forEach(function (d) {
        byDate[d.d] = d;
      });
      var cells = Array.from({
        length: monthLastDay
      }, function (_, i) {
        var ds = selMonth + "-" + String(i + 1).padStart(2, "0");
        var d = byDate[ds];
        if (d) return /*#__PURE__*/React.createElement("i", {
          key: i,
          style: {
            height: 16,
            borderRadius: 3,
            background: d.c > 0 ? col : trackC
          }
        });
        return /*#__PURE__*/React.createElement("i", {
          key: i,
          style: ds > today ? {
            height: 16,
            borderRadius: 3,
            background: trackC,
            opacity: .4
          } : preStyle
        });
      });
      strip = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(" + monthLastDay + ",1fr)",
          gap: 2
        }
      }, cells), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: subC,
          marginTop: 3
        }
      }, /*#__PURE__*/React.createElement("span", null, "1"), /*#__PURE__*/React.createElement("span", null, "10"), /*#__PURE__*/React.createElement("span", null, "20"), /*#__PURE__*/React.createElement("span", null, monthLastDay)));
    } else {
      var _cells = Array.from({
        length: 12
      }, function (_, i) {
        var ym = statsYear + "-" + String(i + 1).padStart(2, "0");
        var me = ym + "-" + String(new Date(statsYear, i + 1, 0).getDate()).padStart(2, "0");
        var o = occupancyForEq(x.eq, rentals, stock, ym + "-01", me, today);
        if (o.noData) return /*#__PURE__*/React.createElement("i", {
          key: i,
          style: me > today ? {
            height: 16,
            borderRadius: 3,
            background: trackC,
            opacity: .4
          } : preStyle
        });
        return /*#__PURE__*/React.createElement("i", {
          key: i,
          style: {
            height: 16,
            borderRadius: 3,
            background: "color-mix(in srgb," + col + " " + Math.max(o.pct > 0 ? 14 : 0, o.pct) + "%," + trackC + ")"
          }
        });
      });
      strip = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gap: 2
        }
      }, _cells), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9,
          color: subC,
          marginTop: 3
        }
      }, ["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"].map(function (l, i) {
        return /*#__PURE__*/React.createElement("span", {
          key: i
        }, l);
      })));
    }
    var fmtPl = function fmtPl(d) {
      return d.slice(8) + "." + d.slice(5, 7) + "." + d.slice(0, 4);
    };
    return /*#__PURE__*/React.createElement("div", {
      key: x.eq,
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 5,
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: textC,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, x.eq, x.qty > 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC,
        fontWeight: 400
      }
    }, " (", x.qty, " szt.)")), /*#__PURE__*/React.createElement("b", {
      style: {
        color: col,
        fontVariantNumeric: "tabular-nums"
      }
    }, x.pct, "%")), strip, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: subC,
        marginTop: 4,
        lineHeight: 1.45
      }
    }, x.start > pStart && /*#__PURE__*/React.createElement("div", null, "liczone od ", fmtPl(x.start)), x.missingAdded && /*#__PURE__*/React.createElement("div", null, "brak daty dodania \u2014 start = pierwsze wypo\u017Cyczenie (", fmtPl(x.start), "). Uzupe\u0142nij w Sprz\u0119t \u2192 Edytuj."), x.overlapDays > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: ORANGE
      }
    }, "\u26A0 ", x.overlapDays, " dni: wi\u0119cej wypo\u017Cycze\u0144 naraz ni\u017C sztuk (", x.qty, ") \u2014 sprawd\u017A daty lub liczb\u0119 sztuk")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 14,
        marginTop: 6,
        fontSize: 11
      }
    }, x.revPerDay !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC
      }
    }, "\uD83D\uDCB0 ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: textC
      }
    }, Z(x.revPerDay)), "/dzie\u0144 dost\u0119pno\u015Bci"), x.gapAvg !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC
      }
    }, "\u23F8 \u015Br. przest\xF3j ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: textC
      }
    }, x.gapAvg, " dni"), " (", x.gapCount, "\xD7)")));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: subC,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "Tylko szyny CPM. ", isYear ? "Każdy kwadracik to jeden miesiąc — ciemniejszy = większe obłożenie." : "Każdy kwadracik to jeden dzień — zapełniony, gdy szyna była wypożyczona.", " Liczone jest wypo\u017Cyczenie pacjenta (od startu do ko\u0144ca okresu, za kt\xF3ry p\u0142aci), a nie moment odbioru sprz\u0119tu. Start = data dodania sprz\u0119tu albo pierwsze wypo\u017Cyczenie; rezerwacje si\u0119 nie licz\u0105. Pusta ramka = przed dodaniem sprz\u0119tu.")), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "roi",
    onToggle: tog("roi"),
    title: "Op\u0142acalno\u015B\u0107 sprz\u0119tu",
    sub: "zakup, naprawy, zwrot (ca\u0142y czas)",
    mini: roiKnown.length > 0 ? miniRoi : null,
    keyVal: roiKnown.length > 0 ? roiDone + "/" + roiKnown.length : "—"
  }, roiShown.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Brak sprz\u0119tu z przychodem lub kosztem zakupu"), roiShown.map(function (_ref15) {
    var eq = _ref15.eq,
      earned = _ref15.earned,
      investment = _ref15.investment,
      roi = _ref15.roi,
      repairsPer100 = _ref15.repairsPer100;
    var isOpen = roiEq === eq;
    var c = getCosts(eq);
    var qty = getQty(eq);
    var purchaseTotal = whPurchaseTotal(stock, machines, eq);
    var machineSrvEntries = getMachineSrvForEq(eq);
    var repairsTotal = (c.repairs || []).reduce(function (s, r) {
      return s + (+r.amount || 0);
    }, 0) + machineSrvEntries.reduce(function (s, x) {
      return s + x.amount;
    }, 0);
    // Szacunek zwrotu: średnia z ostatnich 3 miesięcy, ale dzielona przez faktyczny czas działania sprzętu (nowy sprzęt nie jest "rozwodniony")
    var cut3 = ymAdd(today.slice(0, 7), -3) + "-" + today.slice(8, 10);
    var eqRev = (finances || []).filter(function (f) {
      if (f.type !== "przychód" || !f.date) return false;
      var rid = getRid(f.sourceId);
      return !!rid && rentalEquipMap[rid] === eq;
    });
    var avgMonthly = 0;
    if (eqRev.length) {
      var first = eqRev.reduce(function (m, f) {
        return f.date < m ? f.date : m;
      }, "9999-12-31");
      var from = first > cut3 ? first : cut3;
      var sum3 = eqRev.filter(function (f) {
        return f.date >= cut3;
      }).reduce(function (sm, f) {
        return sm + (+f.amount || 0);
      }, 0);
      avgMonthly = Math.round(sum3 / Math.min(3, Math.max(1, dateDiff(from, today) / 30.4)));
    }
    var remaining = investment - earned;
    var monthsLeft = avgMonthly > 0 && remaining > 0 ? Math.ceil(remaining / avgMonthly) : null;
    var avgDur = getDurationInclude(eq) ? avgDurationByEq[eq] : null;
    var ok = investment > 0 && earned >= investment;
    var scale = Math.max(earned, investment, 1) * 1.08;
    return /*#__PURE__*/React.createElement("div", {
      key: eq,
      style: {
        marginBottom: 10,
        background: dk ? "#0F1E1E" : "#F6F9FC",
        borderRadius: 14,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return setRoiEq(isOpen ? null : eq);
      },
      style: {
        padding: "10px 12px",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: textC,
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, eq), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0
      }
    }, roi !== null ? /*#__PURE__*/React.createElement("span", {
      style: {
        borderRadius: 8,
        padding: "3px 9px",
        fontSize: 11,
        fontWeight: 700,
        background: (ok ? GREEN : ORANGE) + "26",
        color: ok ? GREEN : ORANGE
      }
    }, ok ? "zwrócony · " + roi + "%" : roi + "% zwrotu") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: subC
      }
    }, "wpisz koszt zakupu"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: subC
      }
    }, isOpen ? "▲" : "▼"))), investment > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 12,
        borderRadius: 6,
        background: trackC,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: investment / scale * 100 + "%",
        borderRadius: "6px 0 0 6px",
        background: "rgba(122,143,166,.35)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 3,
        bottom: 3,
        left: 0,
        width: Math.min(100, earned / scale * 100) + "%",
        borderRadius: 3,
        background: ok ? GREEN : ORANGE
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -3,
        bottom: -3,
        left: investment / scale * 100 + "%",
        width: 2,
        borderRadius: 1,
        background: textC
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 11,
        color: subC,
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", null, demo ? "****" : "Zarobiono: " + Math.round(earned) + " zł"), /*#__PURE__*/React.createElement("span", null, demo ? "****" : "Inwest.: " + Math.round(investment) + " zł" + (purchaseTotal > 0 && repairsTotal > 0 ? " (zakup " + Math.round(purchaseTotal) + " + " + repairsTotal + " nap.)" : repairsTotal > 0 ? " (w tym " + repairsTotal + " nap.)" : ""))), monthsLeft !== null && remaining > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: ORANGE,
        marginTop: 3
      }
    }, "\u23F3 Zwrot za ~", monthsLeft, " mies."), ok && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: GREEN,
        marginTop: 3
      }
    }, "\u2705 Zwr\xF3ci\u0142o si\u0119 w ca\u0142o\u015Bci!")), avgDur !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginTop: investment > 0 ? 3 : 0
      }
    }, "\u23F1 \u015Ar. czas wypo\u017Cyczenia: ", avgDur, " dni"), repairsPer100 !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginTop: 2
      }
    }, "\uD83D\uDD27 Koszt napraw: ", Z(repairsPer100), "/100 dni wypo\u017Cyczenia")), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 12px 12px",
        borderTop: "1px solid " + borderC
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 6
      }
    }, "Koszt zakupu (za 1 szt.)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: c.purchase || "",
      onChange: function onChange(e) {
        return setPurchase(eq, e.target.value);
      },
      placeholder: "0 z\u0142",
      style: {
        flex: 1,
        padding: "8px 12px",
        border: "1.5px solid " + (dk ? "#2A3A56" : "#D9E2F0"),
        borderRadius: 10,
        fontSize: 14,
        background: dk ? "#18202F" : "#fff",
        color: textC,
        fontFamily: "inherit",
        outline: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: subC
      }
    }, "z\u0142"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 6
      }
    }, "Liczba sztuk"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: subC
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: textC
      }
    }, qty, " szt."), " \u2192 \u0142\u0105czny koszt zakupu: ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: textC
      }
    }, demo ? "****" : Math.round(purchaseTotal) + " zł")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginTop: 3
      }
    }, "Liczb\u0119 sztuk i ceny poszczeg\xF3lnych sztuk zmieniasz w zak\u0142adce Magazyn.")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 0
      }
    }, "Wliczaj do \u015Br. czasu wyp."), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setDurationInclude(eq, !getDurationInclude(eq));
      },
      style: {
        padding: "5px 14px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 12,
        fontFamily: "inherit",
        background: getDurationInclude(eq) ? "#3E6FB0" : "#D9E2F0",
        color: getDurationInclude(eq) ? "#fff" : "#7A8FA6"
      }
    }, getDurationInclude(eq) ? "✓ Tak" : "✗ Nie")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(SectionLabel, {
      style: {
        marginBottom: 0
      }
    }, "Naprawy / serwis", repairsTotal > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: RED,
        marginLeft: 4
      }
    }, "(", repairsTotal, " z\u0142)")), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setRepairForm({
          eq: eq,
          id: Date.now() + "",
          date: todayLocal(),
          amount: "",
          desc: ""
        });
      },
      style: {
        background: "#E1E9F5",
        border: "none",
        borderRadius: 8,
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 700,
        color: "#3E6FB0",
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, "+ Dodaj")), function () {
      var allRep = [].concat(_toConsumableArray(c.repairs || []), _toConsumableArray(machineSrvEntries)).sort(function (a, b) {
        return (b.date || "").localeCompare(a.date || "");
      });
      if (allRep.length === 0) return /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: subC
        }
      }, "Brak wpisanych napraw");
      return allRep.map(function (rep) {
        return /*#__PURE__*/React.createElement("div", {
          key: rep.id,
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 0",
            borderBottom: "1px solid " + borderC
          }
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 13,
            color: textC,
            fontWeight: 600
          }
        }, demo ? "****" : rep.amount + " zł", rep.desc && /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 400,
            color: subC
          }
        }, " \xB7 ", rep.desc)), rep.date && /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: subC
          }
        }, rep.date, rep.fromService && /*#__PURE__*/React.createElement("span", {
          style: {
            marginLeft: 6,
            color: "#3E6FB0",
            fontSize: 10
          }
        }, "z Serwisu"))), rep.fromService ? /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 10,
            color: "#7A8FA6",
            padding: "2px 8px"
          }
        }, "\uD83D\uDD27") : /*#__PURE__*/React.createElement("button", {
          onClick: function onClick() {
            return deleteRepair(eq, rep.id);
          },
          style: {
            background: "none",
            border: "none",
            color: RED,
            fontSize: 18,
            cursor: "pointer",
            padding: "2px 6px"
          }
        }, "\xD7"));
      });
    }())));
  }), (roiHidden > 0 || showAllRoi) && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAllRoi(function (v) {
        return !v;
      });
    },
    style: {
      width: "100%",
      padding: "8px",
      borderRadius: 10,
      border: "1px dashed " + borderC,
      background: "none",
      color: "#3E6FB0",
      fontWeight: 600,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "inherit",
      marginBottom: 6
    }
  }, showAllRoi ? "Ukryj sprzęt bez danych" : "Pokaż resztę sprzętu (" + roiHidden + ") — aby wpisać koszt zakupu"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: subC,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "Kreska = punkt zwrotu (zakup + naprawy). Nie zale\u017Cy od wybranego okresu. Dotknij sprz\u0119tu, aby wpisa\u0107 zakup i naprawy.")), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "dur",
    onToggle: tog("dur"),
    title: "D\u0142ugo\u015B\u0107 wypo\u017Cycze\u0144 jednorazowych",
    sub: durationHist.total > 0 ? durationHist.total + " zakończonych, all-time" : "brak danych",
    keyVal: durationHist.total > 0 ? durationHist.buckets.reduce(function (best, b) {
      return b.n > best.n ? b : best;
    }, durationHist.buckets[0]).l : "—"
  }, durationHist.total === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: subC,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Brak zako\u0144czonych wypo\u017Cycze\u0144 jednorazowych.") : durationHist.buckets.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.l,
      style: {
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC,
        fontWeight: 600
      }
    }, b.l), /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC
      }
    }, b.n, " (", durationHist.total ? Math.round(b.n / durationHist.total * 100) : 0, "%)")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 7,
        borderRadius: 4,
        background: trackC
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: (durationHist.total ? b.n / durationHist.total * 100 : 0) + "%",
        background: BLUE,
        borderRadius: 4
      }
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "Tylko wypo\u017Cyczenia jednorazowe (nie cykliczne), ca\u0142y czas dzia\u0142ania firmy. Pomaga zaplanowa\u0107 pakiety cenowe.")), /*#__PURE__*/React.createElement(StatAcc, {
    dk: dk,
    open: openSec === "health",
    onToggle: tog("health"),
    title: "Kontrola danych",
    sub: dataHealth.issues.length > 0 ? "warto sprawdzić" : "wszystko wygląda dobrze",
    keyVal: dataHealth.issues.length,
    keyColor: dataHealth.issues.length > 0 ? ORANGE : GREEN
  }, dataHealth.issues.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: GREEN,
      textAlign: "center",
      padding: "8px 0"
    }
  }, "\u2705 Nic do zg\u0142oszenia") : dataHealth.issues.map(function (i) {
    var _i$rows;
    return /*#__PURE__*/React.createElement("div", {
      key: i.k,
      style: {
        padding: "10px 0",
        borderBottom: "1px solid " + borderC
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        gap: 8,
        marginBottom: (_i$rows = i.rows) !== null && _i$rows !== void 0 && _i$rows.length ? 6 : 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC,
        fontWeight: 600
      }
    }, i.l), /*#__PURE__*/React.createElement("b", {
      style: {
        color: ORANGE,
        flexShrink: 0
      }
    }, i.n)), i.hint && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: subC,
        marginBottom: 6
      }
    }, i.hint), i.rows && i.rows.map(function (row, ri) {
      var Tag = row.go ? "button" : "div";
      return /*#__PURE__*/React.createElement(Tag, {
        key: ri,
        onClick: row.go || undefined,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: 8,
          padding: "7px 8px",
          marginBottom: 2,
          borderRadius: 9,
          border: "none",
          background: row.go ? dk ? "#1E2F4A" : "#F0F4FA" : "transparent",
          cursor: row.go ? "pointer" : "default",
          fontFamily: "inherit",
          textAlign: "left"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: row.go ? dk ? "#9CB8E8" : "#3E6FB0" : textC,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, row.person ? maskName(demo, row.label, ri) : row.label), row.sub && /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontSize: 10,
          color: subC
        }
      }, row.sub)), row.go && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: subC,
          flexShrink: 0
        }
      }, "otw\xF3rz \u203A"));
    }));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, "Rzeczy, kt\xF3re mog\u0105 zani\u017Ca\u0107 albo zawy\u017Ca\u0107 liczby w Statystykach. Sprawdzane niezale\u017Cnie od wybranego okresu (all-time / bie\u017C\u0105cy stan).")), repairForm && function () {
    var eqCards = whCards(machines, repairForm.eq);
    return /*#__PURE__*/React.createElement(Modal, {
      title: "Naprawa / serwis",
      onClose: function onClose() {
        return setRepairForm(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: subC,
        marginBottom: 12
      }
    }, repairForm.eq), /*#__PURE__*/React.createElement(Inp, {
      label: "Kwota (z\u0142)",
      value: repairForm.amount,
      onChange: function onChange(v) {
        return setRepairForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            amount: v
          });
        });
      },
      type: "number"
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Opis (opcjonalnie)",
      value: repairForm.desc,
      onChange: function onChange(v) {
        return setRepairForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            desc: v
          });
        });
      }
    }), /*#__PURE__*/React.createElement(Inp, {
      label: "Data",
      value: repairForm.date,
      onChange: function onChange(v) {
        return setRepairForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            date: v
          });
        });
      },
      type: "date"
    }), eqCards.length > 0 && /*#__PURE__*/React.createElement(Sel, {
      label: "Kt\xF3rej sztuki dotyczy? (Magazyn)",
      value: String(repairForm.machineId || ""),
      onChange: function onChange(v) {
        return setRepairForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            machineId: v ? +v : null
          });
        });
      },
      options: [{
        value: "",
        label: "Nie wskazuję (koszt całego sprzętu)"
      }].concat(_toConsumableArray(eqCards.map(function (m) {
        return {
          value: String(m.id),
          label: (m.code || "(bez kodu)") + (m.serialNo ? " · " + m.serialNo : "")
        };
      })))
    }), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        if (!repairForm.amount) return;
        var target = repairForm.machineId ? eqCards.find(function (m) {
          return m.id === repairForm.machineId;
        }) : null;
        if (target) {
          var entry = {
            id: Date.now(),
            date: repairForm.date,
            type: "Naprawa",
            notes: repairForm.desc,
            cost: +repairForm.amount
          };
          setMachines(function (ms) {
            return ms.map(function (m) {
              return m.id === target.id ? _objectSpread(_objectSpread({}, m), {}, {
                lastServiceDate: m.lastServiceDate && m.lastServiceDate > repairForm.date ? m.lastServiceDate : repairForm.date,
                serviceLog: [].concat(_toConsumableArray(m.serviceLog || []), [entry])
              }) : m;
            });
          });
          setFinances(function (fs) {
            return [{
              id: Date.now() + Math.random(),
              sourceId: "serwis-" + target.id + "-" + entry.id,
              date: repairForm.date,
              type: "koszt",
              category: "Serwis",
              amount: +repairForm.amount,
              description: "Naprawa" + (repairForm.desc ? " – " + repairForm.desc : "") + " (" + (target.code || target.name || target.type) + ")"
            }].concat(_toConsumableArray(fs || []));
          });
        } else {
          saveRepair(repairForm.eq, {
            id: repairForm.id,
            date: repairForm.date,
            amount: +repairForm.amount,
            desc: repairForm.desc
          });
          setFinances(function (fs) {
            return [{
              id: Date.now() + Math.random(),
              sourceId: "naprawa-" + repairForm.id,
              date: repairForm.date,
              type: "koszt",
              category: "Serwis",
              amount: +repairForm.amount,
              description: "Naprawa" + (repairForm.desc ? " – " + repairForm.desc : "") + " (" + repairForm.eq + ")"
            }].concat(_toConsumableArray(fs || []));
          });
        }
        setRepairForm(null);
      }
    }, "Zapisz"));
  }());
}

// ── FINANCES ──────────────────────────────────────────────────────────────

function Finances(_ref16) {
  var finances = _ref16.finances,
    setFinances = _ref16.setFinances,
    visits = _ref16.visits,
    setVisits = _ref16.setVisits,
    rentals = _ref16.rentals,
    setRentals = _ref16.setRentals,
    nfzCases = _ref16.nfzCases,
    setNfzCases = _ref16.setNfzCases,
    budget = _ref16.budget,
    setBudget = _ref16.setBudget,
    desk = _ref16.desk,
    stock = _ref16.stock,
    setStock = _ref16.setStock,
    machines = _ref16.machines,
    setMachines = _ref16.setMachines,
    wealth = _ref16.wealth,
    setWealth = _ref16.setWealth,
    goToRental = _ref16.goToRental,
    goToWozki = _ref16.goToWozki;
  var demo = useDemo();
  var dk = useContext(DarkCtx);
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    editE = _useState20[0],
    setEditE = _useState20[1];
  var _useState21 = useState(function () {
      var h = window.location.hash.replace("#", "").split("-");
      return h[1] || "month";
    }),
    _useState22 = _slicedToArray(_useState21, 2),
    viewMode = _useState22[0],
    setViewMode = _useState22[1];
  useEffect(function () {
    window.location.replace("#finances-" + viewMode);
  }, [viewMode]);
  var _useState23 = useState(function () {
      return todayLocal().slice(0, 7);
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    month = _useState24[0],
    setMonth = _useState24[1];
  var _useState25 = useState(function () {
      return todayLocal().slice(0, 4);
    }),
    _useState26 = _slicedToArray(_useState25, 2),
    year = _useState26[0],
    setYear = _useState26[1];
  var _useState27 = useState(function () {
      var d = new Date();
      var day = d.getDay() || 7;
      d.setDate(d.getDate() - day + 1);
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }),
    _useState28 = _slicedToArray(_useState27, 2),
    weekStart = _useState28[0],
    setWeekStart = _useState28[1];
  var _useState29 = useState(function () {
      return todayLocal().slice(0, 7) + "-01";
    }),
    _useState30 = _slicedToArray(_useState29, 2),
    rangeFrom = _useState30[0],
    setRangeFrom = _useState30[1];
  var _useState31 = useState(function () {
      return todayLocal();
    }),
    _useState32 = _slicedToArray(_useState31, 2),
    rangeTo = _useState32[0],
    setRangeTo = _useState32[1];
  var _useState33 = useState(null),
    _useState34 = _slicedToArray(_useState33, 2),
    toast = _useState34[0],
    setToast = _useState34[1];
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    showAllPats = _useState36[0],
    setShowAllPats = _useState36[1];
  var _useState37 = useState(null),
    _useState38 = _slicedToArray(_useState37, 2),
    expandedCat = _useState38[0],
    setExpandedCat = _useState38[1];
  var cats = ["Wizyta", "Wypożyczalnia", "Wózek", "Inne"];
  var weekEnd = useMemo(function () {
    var d = new Date(weekStart + "T12:00:00");
    d.setDate(d.getDate() + 6);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }, [weekStart]);

  // visitMap: sourceId -> actual visit date
  var visitMap = useMemo(function () {
    var m = {};
    (visits || []).forEach(function (v) {
      if (v.id) m["visit-" + v.id] = v.date;
    });
    return m;
  }, [visits]);
  var inPeriod = function inPeriod(date) {
    if (!date) return false;
    if (viewMode === "month") return date.startsWith(month);
    if (viewMode === "week") return date >= weekStart && date <= weekEnd;
    if (viewMode === "range") return date >= rangeFrom && date <= rangeTo;
    return date.startsWith(year);
  };
  var inPrevPeriod = function inPrevPeriod(date) {
    if (!date) return false;
    if (viewMode === "month") {
      var d = new Date(month + "-15");
      d.setMonth(d.getMonth() - 1);
      return date.startsWith(d.toISOString().slice(0, 7));
    }
    if (viewMode === "week") {
      return date >= addDays(weekStart, -7) && date <= addDays(weekEnd, -7);
    }
    if (viewMode === "range") return false;
    return date.startsWith(String(+year - 1));
  };
  var inc = useMemo(function () {
    return finances.filter(function (f) {
      if (f.type !== "przychód") return false;
      var d = (f.sourceId || "").startsWith("visit-") ? visitMap[f.sourceId] || f.date : f.date;
      return inPeriod(d);
    }).reduce(function (s, f) {
      return s + (+f.amount || 0);
    }, 0);
  }, [finances, visits, visitMap, viewMode, month, year, weekStart, weekEnd, rangeFrom, rangeTo]);
  var prevInc = useMemo(function () {
    return finances.filter(function (f) {
      if (f.type !== "przychód") return false;
      var d = (f.sourceId || "").startsWith("visit-") ? visitMap[f.sourceId] || f.date : f.date;
      return inPrevPeriod(d);
    }).reduce(function (s, f) {
      return s + (+f.amount || 0);
    }, 0);
  }, [finances, visits, visitMap, viewMode, month, year, weekStart, weekEnd, rangeFrom, rangeTo]);
  var diff = prevInc > 0 ? Math.round((inc - prevInc) / prevInc * 100) : null; // prevInc still from finances for comparison
  // ── SPÓJNA LOGIKA FILTROWANIA ────────────────────────────────────────────
  // Reguła: dla wpisów visit-* data = visits[id].date (aktualna data wizyty)
  //         dla reszty (payment, cycle, extend, wozek) = f.date z finances
  // visitMap już zbudowany wyżej

  // Wizyty w okresie (źródło: visits)
  var periodVisits = useMemo(function () {
    return (visits || []).filter(function (v) {
      return inPeriod(v.date) && v.status !== "anulowana" && !v.skipFinance && visitStatus(v) === "zakończona";
    });
  }, [visits, viewMode, month, year, weekStart, weekEnd, rangeFrom, rangeTo]);
  var visitCount = periodVisits.length;
  var visitAvg = visitCount > 0 ? periodVisits.reduce(function (s, v) {
    return s + (+v.price || 0);
  }, 0) / visitCount : 0;

  // Finanse nie-wizytowe w okresie (payment, cycle, extend, wozek, ręczne)
  var periodNonVisitFinances = useMemo(function () {
    return finances.filter(function (f) {
      if (f.type !== "przychód") return false;
      if ((f.sourceId || "").startsWith("visit-")) return false; // wizyty liczymy z visits
      return inPeriod(f.date);
    });
  }, [finances, viewMode, month, year, weekStart, weekEnd, rangeFrom, rangeTo]);

  // Łączny przychód: wizyty (z visits.price) + reszta (z finances)
  // inc już wyliczony wyżej przez finances — nadpisujemy spójnie
  var incVisits = periodVisits.reduce(function (s, v) {
    return s + (+v.price || 0);
  }, 0);
  var incOther = periodNonVisitFinances.reduce(function (s, f) {
    return s + (+f.amount || 0);
  }, 0);
  var incTotal = incVisits + incOther;

  // Kategorie
  var catBreakdown = useMemo(function () {
    var map = {
      Wizyta: incVisits,
      Wypożyczalnia: 0,
      Wózek: 0,
      Inne: 0
    };
    periodNonVisitFinances.forEach(function (f) {
      var c = f.category || "Inne";
      if (map[c] !== undefined) map[c] += +f.amount || 0;else map["Inne"] += +f.amount || 0;
    });
    var colors = {
      Wizyta: "#3E6FB0",
      Wypożyczalnia: "#2E86AB",
      Wózek: "#7B4FBF",
      Inne: "#7A8FA6"
    };
    return Object.entries(map).filter(function (_ref17) {
      var _ref18 = _slicedToArray(_ref17, 2),
        v = _ref18[1];
      return v > 0;
    }).map(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
        k = _ref20[0],
        v = _ref20[1];
      return {
        label: k,
        v: v,
        color: colors[k] || "#7A8FA6"
      };
    });
  }, [periodVisits, periodNonVisitFinances, incVisits]);

  // Pacjenci (wizyty + wypożyczenia + wózki)
  var topPats = useMemo(function () {
    var map = {};
    var cnt = {};
    periodVisits.forEach(function (v) {
      var name = v.patientName || "Nieznany";
      if (name === "Nieznany") return;
      cnt[name] = (cnt[name] || 0) + 1;
      map[name] = (map[name] || 0) + (+v.price || 0);
    });
    periodNonVisitFinances.forEach(function (f) {
      var raw = (f.description || "").split(" – ")[1];
      if (!raw) return;
      var name = raw.split(" (")[0].trim();
      if (!name) return;
      map[name] = (map[name] || 0) + (+f.amount || 0);
    });
    return Object.entries(map).sort(function (a, b) {
      return b[1] - a[1];
    }).map(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
        n = _ref22[0],
        v = _ref22[1];
      return [n, v, cnt[n] || 0];
    });
  }, [periodVisits, periodNonVisitFinances]);
  var visiblePats = showAllPats ? topPats : topPats.slice(0, 5);

  // Lista wpisów: wizyty z visits + reszta z finances
  var listEntries = useMemo(function () {
    var visitRows = periodVisits.map(function (v) {
      return {
        id: "v-" + v.id,
        sourceId: "visit-" + v.id,
        date: v.date,
        category: "Wizyta",
        amount: v.price || 0,
        description: "Wizyta – " + v.patientName,
        type: "przychód"
      };
    });
    var otherRows = periodNonVisitFinances;
    return [].concat(_toConsumableArray(visitRows), _toConsumableArray(otherRows)).sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }, [periodVisits, periodNonVisitFinances]);

  // Wpisy pogrupowane po kategorii (do rozwijanej listy w karcie "Kategorie"), już sort. po dacie (najnowsze pierwsze)
  var catEntries = useMemo(function () {
    var known = new Set(["Wizyta", "Wypożyczalnia", "Wózek"]);
    var map = {};
    listEntries.forEach(function (f) {
      var c = known.has(f.category) ? f.category : "Inne";
      (map[c] = map[c] || []).push(f);
    });
    return map;
  }, [listEntries]);

  // Koszt marketingu w całym roku / w wybranym miesiącu (ta sama reguła dopasowania co w zakładce Sprzęt)
  var yearMarketingSpend = useMemo(function () {
    var total = 0;
    for (var m = 1; m <= 12; m++) total += marketingSpendForMonth(budget, stock, year + "-" + String(m).padStart(2, "0"));
    return total;
  }, [year, budget, stock]);
  var monthMarketingSpend = useMemo(function () {
    return marketingSpendForMonth(budget, stock, month);
  }, [month, budget, stock]);
  var months = useMemo(function () {
    var c = todayLocal().slice(0, 7),
      s = new Set([c]);
    finances.forEach(function (f) {
      if (f.date) s.add(f.date.slice(0, 7));
    });
    return Array.from(s).sort(function (a, b) {
      return b.localeCompare(a);
    });
  }, [finances]);
  var years = useMemo(function () {
    var c = todayLocal().slice(0, 4),
      s = new Set([c]);
    finances.forEach(function (f) {
      if (f.date) s.add(f.date.slice(0, 4));
    });
    return Array.from(s).sort(function (a, b) {
      return b.localeCompare(a);
    });
  }, [finances]);
  var deleteWithSource = function deleteWithSource(entry) {
    var sid = entry.sourceId;
    var msg = !sid ? "Usunąć ten wpis z Finansów?" : sid.startsWith("visit-") ? "Usunąć ten przychód z Finansów?\n\nSama wizyta (z notatkami) zostanie, tylko przestanie być liczona w przychodach." : /^(payment|cycle|extend|transport)-/.test(sid) ? "Usunąć ten wpis?\n\nCofnie to też powiązaną wpłatę w wypożyczeniu." : sid.startsWith("wozek-") ? "Usunąć ten wpis?\n\nSprawa wózka wróci do statusu niezrealizowanej." : /^(serwis|naprawa)-/.test(sid) ? "Usunąć ten wpis?\n\nZniknie też powiązany wpis serwisowy w Magazynie." : "Usunąć ten wpis z Finansów?";
    if (!window.confirm(msg)) return false;
    if (!sid) {
      setFinances(function (fs) {
        return fs.filter(function (f) {
          return f.id !== entry.id;
        });
      });
      return;
    }
    // Przychód z wizyty: usuwamy tylko wiersz finansowy, wizytę zostawiamy (znacznik chroni przed ponownym utworzeniem wiersza)
    if (sid.startsWith("visit-")) {
      var vid = +sid.replace("visit-", "");
      setVisits(function (vs) {
        return vs.map(function (v) {
          return +v.id === vid ? _objectSpread(_objectSpread({}, v), {}, {
            skipFinance: true
          }) : v;
        });
      });
      setFinances(function (fs) {
        return fs.filter(function (f) {
          return f.sourceId !== sid;
        });
      });
    } else if (sid.startsWith("payment-")) {
      var pid = +sid.replace("payment-", "");
      setRentals(function (rs) {
        return rs.map(function (r) {
          var found = (r.payments || []).find(function (p) {
            return +p.id === pid;
          });
          if (!found) return r;
          var newPmts = (r.payments || []).filter(function (p) {
            return +p.id !== pid;
          });
          return _objectSpread(_objectSpread({}, r), {}, {
            payments: newPmts,
            amountPaid: newPmts.reduce(function (s, p) {
              return s + (+p.amount || 0);
            }, 0)
          });
        });
      });
    } else if (sid.startsWith("extend-")) {
      var rest = sid.slice(7);
      var di = rest.indexOf("-");
      var rid = +rest.slice(0, di);
      var eid = +rest.slice(di + 1);
      setRentals(function (rs) {
        return rs.map(function (r) {
          return +r.id !== rid ? r : _objectSpread(_objectSpread({}, r), {}, {
            extensions: (r.extensions || []).map(function (e) {
              return +e.id === eid ? _objectSpread(_objectSpread({}, e), {}, {
                amountPaid: 0,
                paidDate: null
              }) : e;
            })
          });
        });
      });
    } else if (sid.startsWith("cycle-")) {
      var _parseCycleSourceId = parseCycleSourceId(sid),
        rentalId = _parseCycleSourceId.rentalId,
        cycleKey = _parseCycleSourceId.cycleKey;
      setRentals(function (rs) {
        return rs.map(function (r) {
          return +r.id !== rentalId ? r : _objectSpread(_objectSpread({}, r), {}, {
            cycles: (r.cycles || []).map(function (c) {
              return (c.dueDate || c.month) === cycleKey ? _objectSpread(_objectSpread({}, c), {}, {
                paid: false,
                paidDate: null
              }) : c;
            })
          });
        });
      });
    } else if (sid.startsWith("wozek-")) {
      var cid = +sid.replace("wozek-", "");
      setNfzCases(function (cs) {
        return (cs || []).map(function (c) {
          return +c.id === cid ? _objectSpread(_objectSpread({}, c), {}, {
            realized: false
          }) : c;
        });
      });
    } else if (sid.startsWith("transport-")) {
      var _rid = +sid.slice(10);
      setRentals(function (rs) {
        return rs.map(function (r) {
          return +r.id === _rid ? _objectSpread(_objectSpread({}, r), {}, {
            transportPaid: false,
            transportPaidDate: null
          }) : r;
        });
      });
    } else if (sid.startsWith("serwis-")) {
      var _rest = sid.slice(7);
      var _di = _rest.indexOf("-");
      var mid = +_rest.slice(0, _di);
      var _eid = +_rest.slice(_di + 1);
      setMachines(function (ms) {
        return (ms || []).map(function (m) {
          if (m.id !== mid) return m;
          var log = (m.serviceLog || []).filter(function (s) {
            return s.id !== _eid;
          });
          var lastServiceDate = log.length > 0 ? log.reduce(function (a, b) {
            return a.date > b.date ? a : b;
          }).date : null;
          return _objectSpread(_objectSpread({}, m), {}, {
            serviceLog: log,
            lastServiceDate: lastServiceDate
          });
        });
      });
    } else if (sid.startsWith("naprawa-")) {
      var _rid2 = sid.slice(8);
      setStock(function (s) {
        var costs = s && s.costs || {};
        var next = {};
        Object.keys(costs).forEach(function (k) {
          var c = costs[k] || {};
          next[k] = Array.isArray(c.repairs) ? _objectSpread(_objectSpread({}, c), {}, {
            repairs: c.repairs.filter(function (r) {
              return String(r.id) !== _rid2;
            })
          }) : c;
        });
        return _objectSpread(_objectSpread({}, s || {}), {}, {
          costs: next
        });
      });
    }
    setFinances(function (fs) {
      return fs.filter(function (f) {
        return f.id !== entry.id;
      });
    });
  };
  var bg2 = dk ? "#18202F" : "#fff";
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var sub = "#7A8FA6";
  var catColors = {
    Wizyta: "#3E6FB0",
    Wypożyczalnia: "#2E86AB",
    Wózek: "#7B4FBF",
    Inne: "#7A8FA6"
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 20px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 24,
      fontWeight: 800
    }
  }, "Finanse")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, [{
    k: "week",
    l: "Tydzień"
  }, {
    k: "month",
    l: "Miesiąc"
  }, {
    k: "year",
    l: "Rok"
  }, {
    k: "range",
    l: "Zakres"
  }].map(function (x) {
    return /*#__PURE__*/React.createElement("button", {
      key: x.k,
      onClick: function onClick() {
        return setViewMode(x.k);
      },
      style: {
        padding: "7px 14px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        whiteSpace: "nowrap",
        background: viewMode === x.k ? "#3E6FB0" : dk ? "#1E2F4A" : "#D9E2F0",
        color: viewMode === x.k ? "#fff" : dk ? "#6B84AC" : "#3E5578",
        fontFamily: "inherit"
      }
    }, x.l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexShrink: 0
    }
  }, [{
    k: "budget",
    l: "🏠",
    t: "Dom"
  }, {
    k: "sprzet",
    l: "📊",
    t: "Statystyki"
  }, {
    k: "wealth",
    l: "💼",
    t: "Majątek"
  }].map(function (x) {
    return /*#__PURE__*/React.createElement("button", {
      key: x.k,
      onClick: function onClick() {
        return setViewMode(x.k);
      },
      title: x.t,
      style: {
        width: 36,
        height: 34,
        borderRadius: 10,
        border: "1.5px solid ".concat(viewMode === x.k ? "#3E6FB0" : border),
        cursor: "pointer",
        fontSize: 16,
        background: viewMode === x.k ? dk ? "#0A3030" : "#E1E9F5" : dk ? "#18202F" : "#fff",
        color: viewMode === x.k ? "#3E6FB0" : sub,
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, x.l);
  }))), (viewMode === "week" || viewMode === "month" || viewMode === "year") && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (viewMode === "week") {
        setWeekStart(addDays(weekStart, -7));
      } else if (viewMode === "month") {
        var d = new Date(month + "-15");
        d.setMonth(d.getMonth() - 1);
        setMonth(d.toISOString().slice(0, 7));
      } else setYear(String(+year - 1));
    },
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: dk ? "#18202F" : "#EFF3FA",
      cursor: "pointer",
      fontSize: 18,
      color: sub,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: "center",
      fontWeight: 600,
      fontSize: 13,
      color: dk ? "#C8E8E8" : "#1C2B3A",
      textTransform: "capitalize"
    }
  }, viewMode === "week" ? weekStart + " – " + weekEnd : viewMode === "month" ? new Date(month + "-15").toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric"
  }) : year), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (viewMode === "week") {
        setWeekStart(addDays(weekStart, 7));
      } else if (viewMode === "month") {
        var d = new Date(month + "-15");
        d.setMonth(d.getMonth() + 1);
        setMonth(d.toISOString().slice(0, 7));
      } else setYear(String(+year + 1));
    },
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      border: "1.5px solid ".concat(border),
      background: dk ? "#18202F" : "#EFF3FA",
      cursor: "pointer",
      fontSize: 18,
      color: sub,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, "\u203A")), viewMode === "budget" && /*#__PURE__*/React.createElement(Budget, {
    finances: finances,
    visits: visits,
    rentals: rentals,
    budget: budget,
    setBudget: setBudget,
    desk: desk
  }), viewMode === "sprzet" && /*#__PURE__*/React.createElement(RentalStats, {
    rentals: rentals,
    stock: stock,
    setStock: setStock,
    finances: finances,
    setFinances: setFinances,
    budget: budget,
    machines: machines,
    setMachines: setMachines,
    nfzCases: nfzCases,
    goToRental: goToRental,
    goToWozki: goToWozki
  }), viewMode === "wealth" && /*#__PURE__*/React.createElement(Wealth, {
    wealth: wealth,
    setWealth: setWealth
  }), viewMode === "range" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: rangeFrom,
    onChange: function onChange(e) {
      return setRangeFrom(e.target.value);
    },
    style: {
      flex: 1,
      minWidth: 120,
      padding: "9px 12px",
      borderRadius: 12,
      border: "1.5px solid ".concat(border),
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontSize: 14,
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: sub,
      fontWeight: 600
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: rangeTo,
    onChange: function onChange(e) {
      return setRangeTo(e.target.value);
    },
    style: {
      flex: 1,
      minWidth: 120,
      padding: "9px 12px",
      borderRadius: 12,
      border: "1.5px solid ".concat(border),
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontSize: 14,
      fontFamily: "inherit"
    }
  })), viewMode !== "budget" && viewMode !== "sprzet" && viewMode !== "wealth" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      padding: "16px",
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: sub,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: .5,
      marginBottom: 4
    }
  }, "Przych\xF3d"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontWeight: 800,
      fontSize: 28,
      color: "#3DAA72",
      lineHeight: 1
    }
  }, demo ? "****" : incTotal.toFixed(2), " z\u0142"), visitCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: sub,
      marginTop: 6
    }
  }, visitCount, " ", visitCount === 1 ? "wizyta" : visitCount < 5 ? "wizyty" : "wizyt", " \xB7 \u015Br. ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: dk ? "#C8E8E8" : "#1C2B3A"
    }
  }, demo ? "**" : Math.round(visitAvg), " z\u0142"))), diff !== null && /*#__PURE__*/React.createElement("div", {
    style: {
      background: diff >= 0 ? "#3DAA7220" : "#E05C5C20",
      borderRadius: 10,
      padding: "6px 10px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: diff >= 0 ? "#3DAA72" : "#E05C5C"
    }
  }, diff >= 0 ? "+" : "", diff, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: sub
    }
  }, "vs poprz."))), (viewMode === "month" || viewMode === "year") && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      paddingTop: 10,
      borderTop: "1px solid ".concat(border)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: sub,
      fontWeight: 600
    }
  }, "\uD83D\uDCE3 Koszt marketingu (", viewMode === "month" ? "ten miesiąc" : "cały rok", ")"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "#E05C5C"
    }
  }, demo ? "****" : (viewMode === "month" ? monthMarketingSpend : yearMarketingSpend).toFixed(2) + " zł"))), catBreakdown.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      padding: "16px",
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 12
    }
  }, "Kategorie"), catBreakdown.map(function (c) {
    var pct = inc > 0 ? c.v / inc * 100 : 0;
    var isOpen = expandedCat === c.label;
    var entries = catEntries[c.label] || [];
    return /*#__PURE__*/React.createElement("div", {
      key: c.label,
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return setExpandedCat(isOpen ? null : c.label);
      },
      style: {
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: dk ? "#C8E8E8" : "#1C2B3A"
      }
    }, c.label, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: sub,
        fontSize: 10
      }
    }, isOpen ? "▲" : "▼")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: sub
      }
    }, demo ? "****" : c.v.toFixed(2), " z\u0142 ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: c.color,
        fontWeight: 700
      }
    }, "(", pct.toFixed(0), "%)"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 7,
        borderRadius: 4,
        background: dk ? "#2A3A56" : "#F0F4F8"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: pct + "%",
        background: c.color,
        borderRadius: 4,
        transition: "width .3s"
      }
    }))), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        paddingLeft: 2
      }
    }, entries.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: sub,
        padding: "4px 0"
      }
    }, "Brak wpis\xF3w"), entries.map(function (f, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: f.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 0",
          borderBottom: i < entries.length - 1 ? "1px solid ".concat(border) : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0,
          flex: 1,
          paddingRight: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: dk ? "#C8E8E8" : "#1C2B3A",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, demo ? c.label : f.description || f.category), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: sub
        }
      }, f.date)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: "#3DAA72",
          flexShrink: 0
        }
      }, "+", demo ? "****" : (+f.amount).toFixed(2), " z\u0142"));
    })));
  }), /*#__PURE__*/React.createElement(PassiveRow, {
    rentals: rentals,
    inPeriod: inPeriod,
    inPrevPeriod: inPrevPeriod,
    base: inc,
    isOpen: expandedCat === "__passive",
    onToggle: function onToggle() {
      return setExpandedCat(expandedCat === "__passive" ? null : "__passive");
    },
    border: border,
    sub: sub,
    goToRental: goToRental
  })), topPats.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg2,
      borderRadius: 16,
      padding: "16px",
      marginBottom: 12,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 12
    }
  }, "Pacjenci"), visiblePats.map(function (_ref23, i) {
    var _ref24 = _slicedToArray(_ref23, 3),
      name = _ref24[0],
      v = _ref24[1],
      c = _ref24[2];
    return /*#__PURE__*/React.createElement("div", {
      key: name,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px 0",
        borderBottom: i < visiblePats.length - 1 ? "1px solid ".concat(border) : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 7,
        background: "#3E6FB020",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        color: "#3E6FB0"
      }
    }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: dk ? "#C8E8E8" : "#1C2B3A"
      }
    }, demo ? "Pacjent " + String.fromCharCode(65 + i) : name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: sub
      }
    }, c, " ", c === 1 ? "wizyta" : c < 5 ? "wizyty" : "wizyt"))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "#3DAA72"
      }
    }, demo ? "****" : v.toFixed(2), " z\u0142"));
  }), topPats.length > 5 && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAllPats(function (v) {
        return !v;
      });
    },
    style: {
      width: "100%",
      marginTop: 10,
      padding: "8px 0",
      borderRadius: 10,
      border: "none",
      background: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 12,
      color: "#3E6FB0",
      fontFamily: "inherit"
    }
  }, showAllPats ? "Pokaż mniej ↑" : "Pokaż wszystkich (" + topPats.length + ") ↓")), /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      margin: "16px 0 8px"
    }
  }, "Wpisy"), listEntries.length === 0 && /*#__PURE__*/React.createElement(Empty, {
    text: "Brak przychod\xF3w w tym okresie"
  }), listEntries.map(function (f) {
    return /*#__PURE__*/React.createElement(Card, {
      key: f.id,
      onClick: function onClick() {
        return setEditE(_objectSpread(_objectSpread({}, f), {}, {
          amount: String(f.amount)
        }));
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, demo ? f.category : f.description || f.category), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: sub,
        marginTop: 2,
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, f.date, " \xB7 ", /*#__PURE__*/React.createElement(Badge, {
      color: catColors[f.category] || "#7A8FA6"
    }, f.category))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 700,
        fontSize: 16,
        color: "#3DAA72",
        marginLeft: 8,
        flexShrink: 0
      }
    }, "+", demo ? "****" : f.amount, " z\u0142")));
  })))), editE && /*#__PURE__*/React.createElement(Modal, {
    title: "Edytuj wpis",
    onClose: function onClose() {
      return setEditE(null);
    }
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Kategoria",
    value: editE.category || "Wizyta",
    onChange: function onChange(v) {
      return setEditE(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          category: v
        });
      });
    },
    options: cats.map(function (c) {
      return {
        value: c,
        label: c
      };
    })
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Kwota (z\u0142)",
    value: editE.amount,
    onChange: function onChange(v) {
      return setEditE(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          amount: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Opis",
    value: editE.description || "",
    onChange: function onChange(v) {
      return setEditE(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          description: v
        });
      });
    }
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data",
    value: editE.date,
    onChange: function onChange(v) {
      return setEditE(function (f) {
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
    onClick: function onClick() {
      setFinances(function (fs) {
        return fs.map(function (f) {
          return f.id === editE.id ? _objectSpread(_objectSpread(_objectSpread({}, f), editE), {}, {
            amount: +editE.amount
          }) : f;
        });
      });
      if ((editE.sourceId || "").startsWith("cycle-")) {
        var _parseCycleSourceId2 = parseCycleSourceId(editE.sourceId),
          rentalId = _parseCycleSourceId2.rentalId,
          cycleKey = _parseCycleSourceId2.cycleKey;
        setRentals(function (rs) {
          return rs.map(function (r) {
            return +r.id !== rentalId ? r : _objectSpread(_objectSpread({}, r), {}, {
              cycles: (r.cycles || []).map(function (c) {
                return (c.dueDate || c.month) === cycleKey ? _objectSpread(_objectSpread({}, c), {}, {
                  amount: +editE.amount,
                  paidDate: editE.date
                }) : c;
              })
            });
          });
        });
      }
      setEditE(null);
      setToast("Zmiany zapisane");
    }
  }, "Zapisz zmiany"), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: function onClick() {
      if (deleteWithSource(editE) !== false) setEditE(null);
    }
  }, "\uD83D\uDDD1\uFE0F Usu\u0144 wpis")), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast,
    onDone: function onDone() {
      return setToast(null);
    }
  }));
}

// ── RECEIPT SCANNER ───────────────────────────────────────────────────────
function ReceiptScanner(_ref25) {
  var onClose = _ref25.onClose,
    onConfirm = _ref25.onConfirm,
    expCats = _ref25.expCats,
    incCats = _ref25.incCats,
    memory = _ref25.memory,
    setMemory = _ref25.setMemory,
    selMonth = _ref25.selMonth,
    existingExpenses = _ref25.existingExpenses;
  var dk = useContext(DarkCtx);
  var bg2 = dk ? "#18202F" : "#fff";
  var border = dk ? "#2A3A56" : "#D9E2F0";
  var sub = "#7A8FA6";
  var _useState39 = useState([]),
    _useState40 = _slicedToArray(_useState39, 2),
    images = _useState40[0],
    setImages = _useState40[1]; // base64 strings
  var _useState41 = useState("upload"),
    _useState42 = _slicedToArray(_useState41, 2),
    step = _useState42[0],
    setStep = _useState42[1]; // upload | analyzing | review | done
  var _useState43 = useState([]),
    _useState44 = _slicedToArray(_useState43, 2),
    items = _useState44[0],
    setItems = _useState44[1]; // {id, name, amount, cat, subcat, confidence, discount, isDiscount}
  var _useState45 = useState(todayLocal()),
    _useState46 = _slicedToArray(_useState45, 2),
    receiptDate = _useState46[0],
    setReceiptDate = _useState46[1];
  var _useState47 = useState(""),
    _useState48 = _slicedToArray(_useState47, 2),
    receiptTotal = _useState48[0],
    setReceiptTotal = _useState48[1];
  var _useState49 = useState(null),
    _useState50 = _slicedToArray(_useState49, 2),
    aiError = _useState50[0],
    setAiError = _useState50[1];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    dupWarning = _useState52[0],
    setDupWarning = _useState52[1];
  var allExpCatNames = expCats.flatMap(function (c) {
    return [c.name].concat(_toConsumableArray((c.subs || []).map(function (s) {
      return c.name + "/" + s;
    })));
  });
  var addImage = function addImage(e) {
    var files = Array.from(e.target.files);
    files.forEach(function (file) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        var b64 = ev.target.result.split(",")[1];
        setImages(function (prev) {
          return [].concat(_toConsumableArray(prev), [{
            b64: b64,
            mime: file.type,
            preview: ev.target.result
          }]);
        });
      };
      reader.readAsDataURL(file);
    });
  };
  var removeImage = function removeImage(i) {
    return setImages(function (prev) {
      return prev.filter(function (_, j) {
        return j !== i;
      });
    });
  };
  var analyze = /*#__PURE__*/function () {
    var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var memoryHints, catList, prompt, _data$content, content, resp, data, _data$error, text, jsonStart, jsonEnd, clean, parsed, newItems, day, sameDayTotal, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (images.length) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setStep("analyzing");
            setAiError(null);
            memoryHints = Object.entries(memory || {}).slice(0, 40).map(function (_ref27) {
              var _ref28 = _slicedToArray(_ref27, 2),
                k = _ref28[0],
                v = _ref28[1];
              return "\"".concat(k, "\" => \"").concat(v, "\"");
            }).join(", ");
            catList = allExpCatNames.join(", ");
            prompt = "Jeste\u015B asystentem do analizy paragon\xF3w. Przeanalizuj paragon(y) na zdj\u0119ciach.\n\nDost\u0119pne kategorie koszt\xF3w: ".concat(catList, "\n").concat(memoryHints ? "Zapami\u0119tane przypisania produkt\xF3w: ".concat(memoryHints) : "", "\n\nZwr\xF3\u0107 TYLKO JSON (bez markdown) w formacie:\n{\n  \"date\": \"YYYY-MM-DD lub null je\u015Bli nieczytelna\",\n  \"total\": liczba (suma z paragonu, pole SUMA/RAZEM/DO ZAP\u0141ATY),\n  \"items\": [\n    {\n      \"name\": \"nazwa z paragonu\",\n      \"amount\": liczba (kwota po rabacie),\n      \"cat\": \"kategoria z listy lub null\",\n      \"subcat\": \"podkategoria lub null\",\n      \"confidence\": \"high|medium|low\",\n      \"isDiscount\": false,\n      \"discountApplied\": liczba lub 0\n    }\n  ],\n  \"unreadable\": [\"linia kt\xF3rej nie mog\u0142em odczyta\u0107\"]\n}\n\nZasady:\n- Je\u015Bli pozycja to rabat/promocja/zni\u017Cka: isDiscount=true, amount=warto\u015B\u0107 rabatu (ujemna liczba), odejmij od poprzedniej pozycji\n- Nie wliczaj linii z VAT, numerem NIP, adresem sklepu, podsumowaniami\n- Dla pozycji ilo\u015B\u0107\xD7cena: amount = wynik mno\u017Cenia\n- Je\u015Bli nie mo\u017Cesz przypisa\u0107 kategorii: cat=null\n- Data: szukaj na paragonie w formatach DD.MM.YYYY, DD-MM-YYYY, YYYY-MM-DD \u2014 zwr\xF3\u0107 jako YYYY-MM-DD. Je\u015Bli data nieczytelna lub jej nie ma \u2014 zwr\xF3\u0107 null (NIE zgaduj daty)");
            _context.p = 2;
            content = [{
              type: "text",
              text: prompt
            }].concat(_toConsumableArray(images.map(function (img) {
              return {
                type: "image",
                source: {
                  type: "base64",
                  media_type: img.mime,
                  data: img.b64
                }
              };
            })));
            _context.n = 3;
            return fetch("/api/scan-receipt", {
              method: "POST",
              headers: getHeaders(),
              body: JSON.stringify({
                content: content
              })
            });
          case 3:
            resp = _context.v;
            _context.n = 4;
            return resp.json();
          case 4:
            data = _context.v;
            if (!(!resp.ok || data.error)) {
              _context.n = 5;
              break;
            }
            setAiError("Błąd API: " + (((_data$error = data.error) === null || _data$error === void 0 ? void 0 : _data$error.message) || data.error || resp.status));
            setStep("upload");
            return _context.a(2);
          case 5:
            text = ((_data$content = data.content) === null || _data$content === void 0 || (_data$content = _data$content[0]) === null || _data$content === void 0 ? void 0 : _data$content.text) || "";
            if (text) {
              _context.n = 6;
              break;
            }
            setAiError("Pusta odpowiedź — spróbuj ponownie");
            setStep("upload");
            return _context.a(2);
          case 6:
            // Extract JSON - find first { and last }
            jsonStart = text.indexOf("{");
            jsonEnd = text.lastIndexOf("}");
            if (!(jsonStart === -1 || jsonEnd === -1)) {
              _context.n = 7;
              break;
            }
            setAiError("AI nie zwrócił poprawnych danych. Spróbuj z wyraźniejszym zdjęciem.");
            setStep("upload");
            return _context.a(2);
          case 7:
            clean = text.slice(jsonStart, jsonEnd + 1);
            _context.p = 8;
            parsed = JSON.parse(clean);
            _context.n = 10;
            break;
          case 9:
            _context.p = 9;
            _t = _context.v;
            setAiError("Błąd parsowania. Spróbuj z lepszym zdjęciem.");
            setStep("upload");
            return _context.a(2);
          case 10:
            // Build items list
            newItems = (parsed.items || []).filter(function (i) {
              return !i.isDiscount;
            }).map(function (i, idx) {
              return {
                id: idx,
                name: i.name || "?",
                amount: Math.max(0, +i.amount || 0),
                cat: i.cat || null,
                subcat: i.subcat || null,
                confidence: i.confidence || "low",
                discountApplied: i.discountApplied || 0,
                unreadable: false
              };
            }); // Add unreadable items
            (parsed.unreadable || []).forEach(function (line, idx) {
              newItems.push({
                id: 1000 + idx,
                name: line,
                amount: 0,
                cat: null,
                subcat: null,
                confidence: "low",
                unreadable: true
              });
            });
            setItems(newItems);
            if (parsed.date) setReceiptDate(parsed.date);else setReceiptDate(todayLocal());
            if (parsed.total) setReceiptTotal(String(parsed.total));

            // Check duplicate — sprawdź w miesiącu daty paragonu
            day = parsed.date || receiptDate;
            sameDayTotal = existingExpenses.filter(function (e) {
              return e.date === day;
            }).reduce(function (s, e) {
              return s + (+e.amount || 0);
            }, 0);
            if (parsed.total && sameDayTotal > 0 && day.slice(0, 7) === selMonth) setDupWarning(true);
            setStep("review");
            _context.n = 12;
            break;
          case 11:
            _context.p = 11;
            _t2 = _context.v;
            setAiError("Błąd analizy: " + _t2.message);
            setStep("upload");
          case 12:
            return _context.a(2);
        }
      }, _callee, null, [[8, 9], [2, 11]]);
    }));
    return function analyze() {
      return _ref26.apply(this, arguments);
    };
  }();
  var updateItem = function updateItem(id, field, val) {
    setItems(function (prev) {
      return prev.map(function (i) {
        return i.id === id ? _objectSpread(_objectSpread({}, i), {}, _defineProperty({}, field, val)) : i;
      });
    });
  };
  var updateItemFields = function updateItemFields(id, fields) {
    setItems(function (prev) {
      return prev.map(function (i) {
        return i.id === id ? _objectSpread(_objectSpread({}, i), fields) : i;
      });
    });
  };
  var removeItem = function removeItem(id) {
    return setItems(function (prev) {
      return prev.filter(function (i) {
        return i.id !== id;
      });
    });
  };
  var addItem = function addItem() {
    return setItems(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        id: Date.now(),
        name: "",
        amount: 0,
        cat: null,
        subcat: null,
        confidence: "high",
        unreadable: false,
        discountApplied: 0
      }]);
    });
  };
  var itemsSum = items.reduce(function (s, i) {
    return s + (+i.amount || 0);
  }, 0);
  var totalNum = +receiptTotal || 0;
  var diff = totalNum > 0 ? Math.abs(itemsSum - totalNum) : 0;
  var diffOk = diff <= 0.05;
  var confirm = function confirm() {
    // Group by cat/subcat
    var groups = {};
    items.forEach(function (i) {
      if (!i.amount || !i.cat) return;
      var key = i.cat + (i.subcat ? "/" + i.subcat : "");
      groups[key] = groups[key] || {
        cat: i.cat,
        subcat: i.subcat || "",
        total: 0
      };
      groups[key].total += +i.amount || 0;
    });

    // Save memory — only high/medium confidence corrections
    var newMem = _objectSpread({}, memory);
    items.forEach(function (i) {
      if (i.cat && i.name && i.name !== "?") newMem[i.name.toUpperCase()] = i.cat + (i.subcat ? "/" + i.subcat : "");
    });
    setMemory(newMem);
    var store = Object.values(groups).filter(function (g) {
      return g.total > 0;
    }).map(function (g) {
      return {
        id: Date.now() + Math.random(),
        cat: g.cat,
        subcat: g.subcat,
        desc: "Paragon " + receiptDate,
        amount: Math.round(g.total * 100) / 100,
        date: receiptDate
      };
    });
    onConfirm(store, receiptDate);
  };
  var catOptions = function catOptions(type) {
    var cats = type === "exp" ? expCats : incCats;
    var opts = [{
      value: "",
      label: "— wybierz —"
    }];
    cats.forEach(function (c) {
      opts.push({
        value: c.name,
        label: c.name
      });
      (c.subs || []).forEach(function (s) {
        return opts.push({
          value: c.name + "\x1F" + s,
          label: "  ↳ " + s
        });
      });
    });
    return opts;
  };
  var inputStyle = {
    padding: "6px 10px",
    borderRadius: 8,
    border: "1.5px solid ".concat(border),
    background: dk ? "#111826" : "#FAFCFD",
    color: dk ? "#E8F5F5" : "#1C2B3A",
    fontSize: 13,
    fontFamily: "inherit",
    width: "100%"
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "\uD83D\uDCF7 Skanuj paragon",
    onClose: onClose
  }, step === "upload" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: sub,
      marginBottom: 10
    }
  }, "Dodaj zdj\u0119cie(a) paragonu. Mo\u017Cesz doda\u0107 kilka dla d\u0142ugich paragon\xF3w."), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      border: "2px dashed ".concat(border),
      borderRadius: 12,
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      background: dk ? "#111826" : "#F4F7FC"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 4
    }
  }, "\uD83D\uDCF7"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#3E6FB0"
    }
  }, "Dodaj zdj\u0119cie"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: sub,
      marginTop: 2
    }
  }, "lub kilka zdj\u0119\u0107 naraz"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    multiple: true,
    onChange: addImage,
    style: {
      display: "none"
    }
  }))), images.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, images.map(function (img, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "relative",
        width: 70,
        height: 70
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: img.preview,
      style: {
        width: 70,
        height: 70,
        objectFit: "cover",
        borderRadius: 8,
        border: "1px solid ".concat(border)
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return removeImage(i);
      },
      style: {
        position: "absolute",
        top: -6,
        right: -6,
        width: 20,
        height: 20,
        borderRadius: 10,
        background: "#E05C5C",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1
      }
    }, "\xD7"));
  })), /*#__PURE__*/React.createElement(Btn, {
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: analyze
  }, "Analizuj paragon", images.length > 1 ? "y" : "")), aiError && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#E05C5C",
      fontSize: 13,
      marginTop: 8,
      padding: "10px 12px",
      background: "#FEE2E2",
      borderRadius: 10
    }
  }, aiError)), step === "analyzing" && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 12
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      marginBottom: 6
    }
  }, "Analizuj\u0119 paragon..."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, "Rozpoznaj\u0119 pozycje i przypisuj\u0119 kategorie")), step === "review" && /*#__PURE__*/React.createElement(React.Fragment, null, dupWarning && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF3C7",
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 12,
      fontSize: 13,
      color: "#92400E"
    }
  }, "\u26A0\uFE0F W tym dniu masz ju\u017C wpisy koszt\xF3w. Mo\u017Cliwy duplikat \u2014 sprawd\u017A."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: sub,
      fontWeight: 600,
      marginBottom: 3
    }
  }, "DATA PARAGONU"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: receiptDate,
    onChange: function onChange(e) {
      return setReceiptDate(e.target.value);
    },
    style: inputStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: sub,
      fontWeight: 600,
      marginBottom: 3
    }
  }, "KWOTA Z PARAGONU"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: receiptTotal,
    onChange: function onChange(e) {
      return setReceiptTotal(e.target.value);
    },
    placeholder: "0.00",
    style: inputStyle
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: sub,
      fontWeight: 600
    }
  }, "POZYCJE (", items.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: addItem,
    style: {
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Dodaj")), items.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      style: {
        background: item.unreadable ? dk ? "#2A1A1A" : "#FFF5F5" : item.cat ? dk ? "#111826" : "#F7FAF9" : dk ? "#1A1A2A" : "#F5F5FF",
        borderRadius: 10,
        padding: "10px 12px",
        marginBottom: 6,
        border: "1px solid ".concat(item.unreadable ? "#E05C5C" : item.cat ? border : "#A78BFA")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: item.name,
      onChange: function onChange(e) {
        return updateItem(item.id, "name", e.target.value);
      },
      style: {
        width: "100%",
        padding: "4px 8px",
        borderRadius: 7,
        border: "1px solid ".concat(border),
        background: "transparent",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "inherit"
      }
    }), item.discountApplied > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#3DAA72"
      }
    }, "rabat: -", item.discountApplied.toFixed(2), " z\u0142"), item.unreadable && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#E05C5C"
      }
    }, "\u26A0\uFE0F Nieodczytana pozycja \u2014 wpisz kwot\u0119 r\u0119cznie")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: item.amount || "",
      onChange: function onChange(e) {
        return updateItem(item.id, "amount", +e.target.value);
      },
      placeholder: "0.00",
      style: {
        width: 75,
        padding: "4px 8px",
        borderRadius: 7,
        border: "1.5px solid ".concat(border),
        background: dk ? "#111826" : "#fff",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontSize: 13,
        fontFamily: "inherit",
        textAlign: "right"
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return removeItem(item.id);
      },
      style: {
        width: 26,
        height: 26,
        borderRadius: 7,
        background: "#FEE2E2",
        border: "none",
        color: "#E05C5C",
        cursor: "pointer",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, "\xD7"))), /*#__PURE__*/React.createElement("select", {
      value: item.cat && item.subcat ? item.cat + "\x1F" + item.subcat : item.cat || "",
      onChange: function onChange(e) {
        var val = e.target.value;
        if (!val) {
          updateItemFields(item.id, {
            cat: null,
            subcat: null
          });
        } else if (val.includes("\x1F")) {
          var idx = val.indexOf("\x1F");
          updateItemFields(item.id, {
            cat: val.slice(0, idx),
            subcat: val.slice(idx + 1)
          });
        } else {
          updateItemFields(item.id, {
            cat: val,
            subcat: null
          });
        }
      },
      style: _objectSpread(_objectSpread({}, inputStyle), {}, {
        fontSize: 12
      })
    }, catOptions("exp").map(function (o) {
      return /*#__PURE__*/React.createElement("option", {
        key: o.value,
        value: o.value
      }, o.label);
    })), item.confidence === "low" && item.cat && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#F59E0B",
        marginTop: 3
      }
    }, "\u26A1 Niska pewno\u015B\u0107 \u2014 sprawd\u017A kategori\u0119"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#F0F9F5",
      borderRadius: 10,
      padding: "12px 14px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, "Suma pozycji:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: dk ? "#E8F5F5" : "#1C2B3A"
    }
  }, itemsSum.toFixed(2), " z\u0142")), totalNum > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: sub
    }
  }, "Kwota z paragonu:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: dk ? "#E8F5F5" : "#1C2B3A"
    }
  }, totalNum.toFixed(2), " z\u0142")), totalNum > 0 && !diffOk && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      padding: "6px 10px",
      background: "#FEF3C7",
      borderRadius: 8,
      fontSize: 12,
      color: "#92400E"
    }
  }, "\u26A0\uFE0F R\xF3\u017Cnica: ", diff.toFixed(2), " z\u0142 \u2014 sprawd\u017A pozycje lub skoryguj kwoty"), totalNum > 0 && diffOk && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 12,
      color: "#3DAA72",
      fontWeight: 600
    }
  }, "\u2713 Kwoty si\u0119 zgadzaj\u0105")), items.some(function (i) {
    return !i.cat && i.amount > 0;
  }) && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FEF3C7",
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 12,
      fontSize: 12,
      color: "#92400E"
    }
  }, "\u26A0\uFE0F ", items.filter(function (i) {
    return !i.cat && i.amount > 0;
  }).length, " pozycji bez kategorii \u2014 nie zostan\u0105 dodane do bud\u017Cetu"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: function onClick() {
      return setStep("upload");
    }
  }, "\u2190 Wr\xF3\u0107"), /*#__PURE__*/React.createElement(Btn, {
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: confirm
  }, "Dodaj do bud\u017Cetu \u2713"))));
}
