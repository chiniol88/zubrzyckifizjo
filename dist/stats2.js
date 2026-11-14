// Plik wygenerowany z js/stats2.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// ── NOWE STATYSTYKI (2026-11-14) ─────────────────────────────────────────────
// Dokładki do zakładki Statystyki (nic ze starych sekcji nie zmieniają): zysk i koszt klienta z reklamy w ciągu roku, źródła klientów
// miesiąc po miesiącu, wyniki CPM (stawka za dzień, puste dni, wynik) oraz "Rok w liczbach" (rok do roku, mapa obłożenia).
// Komponenty dostają obiekt `c` z RentalStats (kolory, funkcje pomocnicze, dane). Wszystko liczone z danych, które aplikacja już ma.
var ST_YMS = function ST_YMS(year) {
  return Array.from({
    length: 12
  }, function (_, i) {
    return year + "-" + String(i + 1).padStart(2, "0");
  });
};
var ST_LAST = function ST_LAST(ym) {
  return new Date(+ym.slice(0, 4), +ym.slice(5, 7), 0).getDate();
};

// Słupki: wartości mogą być ujemne (zysk) lub null (brak danych). fmt = podpis nad słupkiem (opcjonalnie).
function StatBars(_ref) {
  var vals = _ref.vals,
    h = _ref.h,
    color = _ref.color,
    negColor = _ref.negColor,
    fmt = _ref.fmt,
    labels = _ref.labels,
    sub = _ref.sub,
    track = _ref.track,
    sel = _ref.sel,
    onSel = _ref.onSel;
  var max = Math.max.apply(Math, [0].concat(_toConsumableArray(vals.map(function (v) {
    return v != null && v > 0 ? v : 0;
  }))));
  var min = Math.max.apply(Math, [0].concat(_toConsumableArray(vals.map(function (v) {
    return v != null && v < 0 ? -v : 0;
  }))));
  var tot = max + min || 1,
    hp = Math.max(6, Math.round(h * max / tot)),
    hn = min > 0 ? Math.max(6, h - hp) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    }
  }, vals.map(function (v, i) {
    var up = v != null && v > 0 ? Math.max(2, Math.round(v / (max || 1) * hp)) : 0;
    var dn = v != null && v < 0 ? Math.max(2, Math.round(-v / (min || 1) * hn)) : 0;
    var dim = sel != null && sel !== i;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: onSel ? function () {
        return onSel(sel === i ? null : i);
      } : undefined,
      "aria-label": labels[i] + (v != null ? ": " + v : ""),
      "aria-pressed": sel === i,
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "none",
        background: sel === i ? track || "transparent" : "transparent",
        borderRadius: 6,
        padding: 0,
        cursor: onSel ? "pointer" : "default",
        fontFamily: "inherit",
        opacity: dim ? .45 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: hp + (fmt ? 11 : 0),
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }
    }, fmt && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: sub,
        textAlign: "center",
        height: 11,
        whiteSpace: "nowrap",
        overflow: "hidden"
      }
    }, v != null && v !== 0 ? fmt(v) : ""), /*#__PURE__*/React.createElement("div", {
      style: {
        height: up,
        background: color,
        borderRadius: "3px 3px 0 0"
      }
    })), hn > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        height: hn,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: dn,
        background: negColor || color,
        borderRadius: "0 0 3px 3px"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: sub,
        marginTop: 2
      }
    }, labels[i]));
  }));
}
// podpis wybranego słupka (po dotknięciu) — wspólny wygląd dla wykresów w Reklamie
function StatPick(_ref2) {
  var text = _ref2.text,
    subC = _ref2.subC,
    textC = _ref2.textC,
    trackC = _ref2.trackC;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 30,
      marginTop: 6,
      padding: "6px 10px",
      borderRadius: 10,
      background: trackC,
      fontSize: 12,
      color: text ? textC : subC,
      lineHeight: 1.4
    }
  }, text || "Dotknij słupka, żeby zobaczyć szczegóły.");
}

// ── REKLAMA: rok w miesiącach (zysk narastająco, koszt klienta, źródła klientów) ──
function AdsYear(_ref3) {
  var c = _ref3.c;
  var year = c.year,
    today = c.today,
    rentals = c.rentals,
    finances = c.finances,
    nfzCases = c.nfzCases,
    budget = c.budget,
    stock = c.stock,
    getRid = c.getRid,
    catOf = c.catOf,
    demo = c.demo,
    Z = c.Z,
    subC = c.subC,
    textC = c.textC,
    borderC = c.borderC,
    trackC = c.trackC,
    GREEN = c.GREEN,
    RED = c.RED,
    BLUE = c.BLUE,
    PURPLE = c.PURPLE,
    ORANGE = c.ORANGE;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    selCum = _useState2[0],
    setSelCum = _useState2[1],
    _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selSrc = _useState4[0],
    setSelSrc = _useState4[1],
    _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    selCac = _useState6[0],
    setSelCac = _useState6[1];
  var d = useMemo(function () {
    var yms = ST_YMS(year),
      idx = {};
    yms.forEach(function (ym, i) {
      idx[ym] = i;
    });
    var types = {
      szyny: {
        spend: Array(12).fill(0),
        cnt: Array(12).fill(0)
      },
      wozki: {
        spend: Array(12).fill(0),
        cnt: Array(12).fill(0)
      },
      balkoniki: {
        spend: Array(12).fill(0),
        cnt: Array(12).fill(0)
      }
    };
    var tk = function tk(eq) {
      var x = catOf(eq);
      return types[x] ? x : "szyny";
    };
    var rev = Array(12).fill(0);
    var srcKeys = [].concat(_toConsumableArray(RENTAL_SOURCES.map(function (s) {
      return s.value;
    })), ["_none"]);
    var src = {};
    srcKeys.forEach(function (k) {
      src[k] = Array(12).fill(0);
    });
    yms.forEach(function (ym, i) {
      var o = marketingSpendByType(budget, stock, ym);
      MKTG_TYPES.forEach(function (t) {
        types[t.k].spend[i] = o[t.k];
      });
    });
    var sk = function sk(s) {
      return src.hasOwnProperty(s || "") && s ? s : "_none";
    };
    rentals.forEach(function (r) {
      if (r.reserved || !r.startDate) return;
      var i = idx[r.startDate.slice(0, 7)];
      if (i === undefined) return;
      src[sk(r.source)][i]++;
      if (r.source === "reklama") types[tk(r.equipment)].cnt[i]++;
    });
    (nfzCases || []).forEach(function (cas) {
      var i = idx[(cas.orderDate || "").slice(0, 7)];
      if (i === undefined) return;
      src[sk(cas.source)][i]++;
      if (cas.source === "reklama") types.wozki.cnt[i]++;
    });
    var adRental = function adRental(rid) {
      var r = rentals.find(function (x) {
        return x.id === rid;
      });
      return r && r.source === "reklama";
    };
    (finances || []).forEach(function (f) {
      if (f.type !== "przychód") return;
      var i = idx[(f.date || "").slice(0, 7)];
      if (i === undefined) return;
      var rid = getRid(f.sourceId),
        sid = f.sourceId || "";
      if (rid) {
        if (adRental(rid)) rev[i] += +f.amount || 0;
        return;
      }
      if (sid.startsWith("wozek-")) {
        var cid = +sid.slice(6);
        var cas = (nfzCases || []).find(function (x) {
          return x.id === cid;
        });
        if (cas && cas.source === "reklama") rev[i] += +f.amount || 0;
      }
    });
    rentals.forEach(function (r) {
      if ((r.payments || []).length > 0 || (r.cycles || []).length > 0 || r.source !== "reklama") return;
      var paid = +r.amountPaid || 0,
        i = idx[(r.startDate || "").slice(0, 7)];
      if (paid > 0 && i !== undefined) rev[i] += paid;
    });
    var spendTot = yms.map(function (_, i) {
      return MKTG_TYPES.reduce(function (s, t) {
        return s + types[t.k].spend[i];
      }, 0);
    });
    var curYM = today.slice(0, 7);
    var lastIdx = year < +curYM.slice(0, 4) ? 11 : year > +curYM.slice(0, 4) ? -1 : +curYM.slice(5, 7) - 1;
    var run = 0;
    var cum = yms.map(function (_, i) {
      if (i > lastIdx) return null;
      run += rev[i] - spendTot[i];
      return Math.round(run);
    });
    return {
      types: types,
      rev: rev,
      src: src,
      srcKeys: srcKeys,
      spendTot: spendTot,
      cum: cum,
      lastIdx: lastIdx,
      sumSpend: spendTot.reduce(function (a, b) {
        return a + b;
      }, 0),
      sumRev: rev.reduce(function (a, b) {
        return a + b;
      }, 0)
    };
  }, [year, rentals, finances, nfzCases, budget, stock, today]);
  var labels = PL_MON.map(function (m) {
    return m;
  });
  var any = d.sumSpend > 0 || d.sumRev > 0;
  var srcTot = d.srcKeys.map(function (k) {
      return d.src[k].reduce(function (a, b) {
        return a + b;
      }, 0);
    }),
    srcAll = srcTot.reduce(function (a, b) {
      return a + b;
    }, 0);
  var srcMeta = function srcMeta(k) {
    var s = RENTAL_SOURCES.find(function (x) {
      return x.value === k;
    });
    return s ? {
      l: s.label,
      c: s.color
    } : {
      l: "Nieznane",
      c: "#8A9BB0"
    };
  };
  var head = {
    fontSize: 11,
    fontWeight: 700,
    color: subC,
    textTransform: "uppercase",
    letterSpacing: ".07em",
    margin: "18px 0 8px"
  };
  var profit = d.sumRev - d.sumSpend;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid " + borderC,
      margin: "16px 0 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: head
  }, "\uD83D\uDCC5 Reklama w roku ", year), !any && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak wydatk\xF3w i przychodu z reklamy w tym roku."), any && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 4
    }
  }, [["Wydano", Z(d.sumSpend), RED], ["Przychód", Z(d.sumRev), GREEN], ["Zysk", (profit >= 0 ? "+" : "−") + Z(Math.abs(profit)), profit >= 0 ? GREEN : RED]].map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 3),
      l = _ref5[0],
      v = _ref5[1],
      col = _ref5[2];
    return /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        flex: "1 1 0",
        minWidth: 0,
        background: trackC,
        borderRadius: 12,
        padding: "8px 8px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: subC,
        marginBottom: 2
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Syne',sans-serif",
        fontWeight: 800,
        fontSize: 12,
        color: col,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, v));
  })), /*#__PURE__*/React.createElement("div", {
    style: head
  }, "Zysk z reklamy narastaj\u0105co (przych\xF3d \u2212 koszt)"), /*#__PURE__*/React.createElement(StatBars, {
    vals: d.cum,
    h: 64,
    color: GREEN,
    negColor: RED,
    labels: labels,
    sub: subC,
    track: trackC,
    sel: selCum,
    onSel: setSelCum
  }), /*#__PURE__*/React.createElement(StatPick, {
    subC: subC,
    textC: textC,
    trackC: trackC,
    text: selCum != null && d.cum[selCum] != null ? PL_MON[selCum] + " " + year + ": narastająco " + (d.cum[selCum] >= 0 ? "+" : "−") + Z(Math.abs(d.cum[selCum])) + " · w tym miesiącu przychód " + Z(d.rev[selCum]) + ", koszt " + Z(d.spendTot[selCum]) : null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 4,
      lineHeight: 1.5
    }
  }, "Ka\u017Cdy s\u0142upek to stan od pocz\u0105tku roku do ko\u0144ca danego miesi\u0105ca. Zielony = reklama ju\u017C si\u0119 zwr\xF3ci\u0142a, czerwony = jeszcze nie. Przych\xF3d liczony wg daty wp\u0142aty od klient\xF3w oznaczonych \u201Ereklama\u201D."), MKTG_TYPES.map(function (t) {
    var sp = d.types[t.k].spend,
      cn = d.types[t.k].cnt,
      sS = sp.reduce(function (a, b) {
        return a + b;
      }, 0),
      sC = cn.reduce(function (a, b) {
        return a + b;
      }, 0);
    if (!(sS > 0 || sC > 0)) return null;
    var cac = sp.map(function (s, i) {
      return cn[i] > 0 && s > 0 ? Math.round(s / cn[i]) : null;
    });
    return /*#__PURE__*/React.createElement("div", {
      key: t.k
    }, /*#__PURE__*/React.createElement("div", {
      style: head
    }, "Koszt klienta w miesi\u0105cach \u2014 ", t.l), cac.every(function (v) {
      return v === null;
    }) ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: subC
      }
    }, "Brak miesi\u0105ca, w kt\xF3rym by\u0142 i wydatek na reklam\u0119, i nowy klient z reklamy (wydatek i klient wypad\u0142y w r\xF3\u017Cnych miesi\u0105cach).") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StatBars, {
      vals: cac,
      h: 48,
      color: t.k === "wozki" ? PURPLE : t.k === "balkoniki" ? ORANGE : BLUE,
      labels: labels,
      sub: subC,
      track: trackC,
      sel: selCac[t.k] == null ? null : selCac[t.k],
      onSel: function onSel(i) {
        return setSelCac(function (m) {
          return _objectSpread(_objectSpread({}, m), {}, _defineProperty({}, t.k, i));
        });
      },
      fmt: demo ? null : function (v) {
        return v >= 1000 ? (v / 1000).toFixed(1).replace(".0", "") + "k" : String(v);
      }
    }), /*#__PURE__*/React.createElement(StatPick, {
      subC: subC,
      textC: textC,
      trackC: trackC,
      text: selCac[t.k] != null ? PL_MON[selCac[t.k]] + " " + year + ": wydano " + Z(sp[selCac[t.k]]) + ", nowych klientów z reklamy " + cn[selCac[t.k]] + (cac[selCac[t.k]] != null ? ", koszt klienta " + Z(cac[selCac[t.k]]) : "") : null
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: subC,
        marginTop: 4
      }
    }, "W roku: wydano ", Z(sS), ", nowych klient\xF3w z reklamy ", sC, sC > 0 && sS > 0 ? ", średnio " + Z(Math.round(sS / sC)) + " na klienta" : "", ". Pusty s\u0142upek = brak wydatku albo brak klienta w tym miesi\u0105cu."));
  }), /*#__PURE__*/React.createElement("div", {
    style: head
  }, "Sk\u0105d trafiaj\u0105 nowi klienci \u2014 udzia\u0142 w miesi\u0105cach"), srcAll === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak nowych klient\xF3w w tym roku.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      height: 64
    }
  }, labels.map(function (_, i) {
    var tot = d.srcKeys.reduce(function (s, k) {
      return s + d.src[k][i];
    }, 0);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: function onClick() {
        return setSelSrc(selSrc === i ? null : i);
      },
      "aria-pressed": selSrc === i,
      "aria-label": labels[i] + ": " + tot + " klientów",
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
        opacity: selSrc != null && selSrc !== i ? .45 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        background: tot ? "transparent" : trackC,
        opacity: tot ? 1 : .5
      }
    }, d.srcKeys.map(function (k) {
      return d.src[k][i] > 0 && /*#__PURE__*/React.createElement("div", {
        key: k,
        style: {
          height: d.src[k][i] / tot * 100 + "%",
          background: srcMeta(k).c
        }
      });
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      marginTop: 2
    }
  }, labels.map(function (l, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        fontSize: 8,
        color: subC,
        textAlign: "center"
      }
    }, l);
  })), /*#__PURE__*/React.createElement(StatPick, {
    subC: subC,
    textC: textC,
    trackC: trackC,
    text: selSrc != null ? function () {
      var tot = d.srcKeys.reduce(function (s, k) {
        return s + d.src[k][selSrc];
      }, 0);
      return tot ? PL_MON[selSrc] + " " + year + ": " + tot + " nowych klientów — " + d.srcKeys.filter(function (k) {
        return d.src[k][selSrc] > 0;
      }).map(function (k) {
        return srcMeta(k).l + " " + d.src[k][selSrc] + " (" + Math.round(d.src[k][selSrc] / tot * 100) + "%)";
      }).join(", ") : PL_MON[selSrc] + " " + year + ": brak nowych klientów";
    }() : null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 8,
      fontSize: 11,
      color: subC
    }
  }, d.srcKeys.map(function (k, i) {
    return srcTot[i] > 0 && /*#__PURE__*/React.createElement("span", {
      key: k
    }, /*#__PURE__*/React.createElement("i", {
      style: {
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: 2,
        background: srcMeta(k).c,
        marginRight: 5
      }
    }), srcMeta(k).l, " \xB7 ", srcTot[i], " (", Math.round(srcTot[i] / srcAll * 100), "%)");
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: subC,
      marginTop: 4,
      lineHeight: 1.5
    }
  }, "Liczone nowi klienci (start wypo\u017Cyczenia lub zam\xF3wienie w\xF3zka). Je\u015Bli udzia\u0142 reklamy ro\u015Bnie, a \u201Eorganicznie\u201D maleje, reklama mo\u017Ce tylko zabiera\u0107 klient\xF3w, kt\xF3rzy i tak by przyszli."))));
}

// ── WYNIKI CPM: wynik, stawka za dzień, puste dni ──
function CpmResults(_ref6) {
  var c = _ref6.c;
  var rentals = c.rentals,
    stock = c.stock,
    machines = c.machines,
    finances = c.finances,
    today = c.today,
    pStart = c.pStart,
    pEnd = c.pEnd,
    periodLabel = c.periodLabel,
    equipmentAll = c.equipmentAll,
    catOf = c.catOf,
    revenueInRange = c.revenueInRange,
    getMachineSrvForEq = c.getMachineSrvForEq,
    getCosts = c.getCosts,
    marketingSzyny = c.marketingSzyny,
    Z = c.Z,
    kv = c.kv,
    subC = c.subC,
    textC = c.textC,
    borderC = c.borderC,
    GREEN = c.GREEN,
    RED = c.RED,
    ORANGE = c.ORANGE,
    BLUE = c.BLUE;
  var d = useMemo(function () {
    var eqs = equipmentAll.filter(function (eq) {
      return catOf(eq) === "szyny";
    });
    var cutEnd = pEnd < today ? pEnd : today;
    // stawka za dzień wypożyczenia = należność / dni (jednorazowe), cykl / 30 dni (cykliczne); wypożyczenia rozpoczęte w okresie
    var acc = {};
    var A = function A(eq) {
      return acc[eq] || (acc[eq] = {
        oneT: 0,
        oneD: 0,
        cycT: 0,
        cycD: 0
      });
    };
    rentals.forEach(function (r) {
      if (!r.equipment || catOf(r.equipment) !== "szyny" || r.reserved || !r.startDate || r.startDate < pStart || r.startDate > pEnd) return;
      if (r.renewable) {
        var cy = (r.cycles || []).filter(function (x) {
          return !x.cancelled && +x.amount > 0;
        });
        var n = cy.length || 1,
          tot = cy.length ? cy.reduce(function (s, x) {
            return s + (+x.amount || 0);
          }, 0) : +r.amount || 0;
        if (tot > 0) {
          var a = A(r.equipment);
          a.cycT += tot;
          a.cycD += n * 30;
        }
      } else {
        var end = r.endDate || r.plannedReturn;
        if (!end) return;
        var days = Math.max(1, dateDiff(r.startDate, end));
        var _tot = (+r.amount || 0) + (r.extensions || []).reduce(function (s, e) {
          return s + (+e.amountDue || +e.amount || 0);
        }, 0);
        if (_tot > 0) {
          var _a = A(r.equipment);
          _a.oneT += _tot;
          _a.oneD += days;
        }
      }
    });
    var rate = function rate(T, D) {
      return D > 0 ? T / D : null;
    };
    var all = {
      oneT: 0,
      oneD: 0,
      cycT: 0,
      cycD: 0
    };
    Object.values(acc).forEach(function (a) {
      all.oneT += a.oneT;
      all.oneD += a.oneD;
      all.cycT += a.cycT;
      all.cycD += a.cycD;
    });
    var overall = rate(all.oneT + all.cycT, all.oneD + all.cycD);
    // obłożenie, puste dni, wynik
    var revSum = 0,
      srvSum = 0,
      amortSum = 0,
      emptySum = 0,
      lostSum = 0,
      capSum = 0,
      bookedSum = 0;
    var rows = eqs.map(function (eq) {
      var o = occupancyForEq(eq, rentals, stock, pStart, pEnd, today);
      var a = acc[eq] || {
        oneT: 0,
        oneD: 0,
        cycT: 0,
        cycD: 0
      };
      var r = rate(a.oneT + a.cycT, a.oneD + a.cycD);
      var useRate = r != null ? r : overall;
      var empty = o.noData ? 0 : Math.max(0, o.cap - o.booked);
      var lost = useRate != null ? Math.round(empty * useRate) : null;
      var rev = revenueInRange(pStart, cutEnd, eq);
      var srv = [].concat(_toConsumableArray(getMachineSrvForEq(eq)), _toConsumableArray((getCosts(eq).repairs || []).map(function (x) {
        return {
          date: x.date,
          amount: +x.amount || 0
        };
      }))).filter(function (x) {
        return x.date && x.date >= pStart && x.date <= cutEnd;
      }).reduce(function (s, x) {
        return s + (+x.amount || 0);
      }, 0);
      var amort = 0;
      var pt = whPurchaseTotal(stock, machines, eq);
      if (pt > 0 && !o.noData) {
        var from = o.start && o.start > pStart ? o.start : pStart;
        if (from <= cutEnd) amort = pt / 36 * ((dateDiff(from, cutEnd) + 1) / 30.4);
      }
      revSum += rev;
      srvSum += srv;
      amortSum += amort;
      emptySum += empty;
      if (lost != null) lostSum += lost;
      capSum += o.cap;
      bookedSum += o.booked;
      return {
        eq: eq,
        noData: o.noData,
        cap: o.cap,
        booked: o.booked,
        empty: empty,
        rate: r,
        rateOne: rate(a.oneT, a.oneD),
        rateCyc: rate(a.cycT, a.cycD),
        lost: lost,
        rev: rev
      };
    }).filter(function (x) {
      return !x.noData || x.rev > 0;
    });
    return {
      rows: rows,
      overall: overall,
      all: all,
      revSum: revSum,
      srvSum: srvSum,
      amortSum: amortSum,
      emptySum: emptySum,
      lostSum: lostSum,
      capSum: capSum,
      bookedSum: bookedSum
    };
  }, [rentals, stock, machines, finances, today, pStart, pEnd, equipmentAll]);
  var head = {
    fontSize: 11,
    fontWeight: 700,
    color: subC,
    textTransform: "uppercase",
    letterSpacing: ".07em",
    margin: "16px 0 6px"
  };
  var note = {
    fontSize: 10,
    color: subC,
    marginTop: 6,
    lineHeight: 1.5
  };
  var wynik = d.revSum - marketingSzyny - d.srvSum;
  var wynikPo = wynik - d.amortSum;
  var fmtD = function fmtD(x) {
    return x.slice(8) + "." + x.slice(5, 7);
  };
  var rowSt = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
    padding: "7px 0",
    borderBottom: "1px solid " + borderC,
    fontSize: 12
  };
  var col = function col(p) {
    return p >= 70 ? GREEN : p >= 40 ? ORANGE : RED;
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, head), {}, {
      marginTop: 0
    })
  }, "Wynik szyn CPM \u2014 ", periodLabel), kv("Przychód z szyn (wpłaty)", Z(d.revSum), GREEN), kv("− Reklama szyn", marketingSzyny > 0 ? Z(marketingSzyny) : "0 zł", RED), kv("− Serwis i naprawy", d.srvSum > 0 ? Z(d.srvSum) : "0 zł", RED), kv("= Wynik", (wynik >= 0 ? "+" : "−") + Z(Math.abs(wynik)), wynik >= 0 ? GREEN : RED), kv("Po odjęciu części zakupu*", (wynikPo >= 0 ? "+" : "−") + Z(Math.abs(wynikPo)), wynikPo >= 0 ? GREEN : RED), /*#__PURE__*/React.createElement("div", {
    style: note
  }, "* Koszt zakupu szyn roz\u0142o\u017Cony r\xF3wno na 36 miesi\u0119cy (od daty dodania sprz\u0119tu). Przych\xF3d to wp\u0142aty z okresu, reklama wg podkategorii \u201EMarketing szyny\u201D w bud\u017Cecie, serwis z kart sztuk i napraw typu."), /*#__PURE__*/React.createElement("div", {
    style: head
  }, "Stawka za dzie\u0144 wypo\u017Cyczenia"), d.overall == null ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak wypo\u017Cycze\u0144 szyn rozpocz\u0119tych w tym okresie.") : /*#__PURE__*/React.createElement(React.Fragment, null, kv("Średnio", Z(Math.round(d.overall)) + "/dzień"), d.all.oneD > 0 && kv("Jednorazowe", Z(Math.round(d.all.oneT / d.all.oneD)) + "/dzień (" + d.all.oneD + " dni)"), d.all.cycD > 0 && kv("Cykliczne", Z(Math.round(d.all.cycT / d.all.cycD)) + "/dzień (" + d.all.cycD + " dni)"), d.rows.filter(function (x) {
    return x.rate != null;
  }).map(function (x) {
    return /*#__PURE__*/React.createElement("div", {
      key: x.eq,
      style: rowSt
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC
      }
    }, x.eq), /*#__PURE__*/React.createElement("b", {
      style: {
        color: textC
      }
    }, Z(Math.round(x.rate)), "/dzie\u0144"));
  })), /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Cena um\xF3wiona \xF7 liczba dni wypo\u017Cyczenia (z przed\u0142u\u017Ceniami); cykl = 30 dni. To realna stawka, niezale\u017Cna od tego, kiedy klient zap\u0142aci\u0142."), /*#__PURE__*/React.createElement("div", {
    style: head
  }, "Puste dni szyn (potencjalny przych\xF3d)"), d.capSum === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak danych o ob\u0142o\u017Ceniu w tym okresie.") : /*#__PURE__*/React.createElement(React.Fragment, null, kv("Dni dostępności / zajęte", d.capSum + " / " + d.bookedSum + " (" + (d.capSum ? Math.round(d.bookedSum / d.capSum * 100) : 0) + "%)"), kv("Puste dni (sztuko-dni)", String(d.emptySum), ORANGE), kv("Szacunkowo utracone", d.lostSum > 0 ? "~ " + Z(d.lostSum) : "—", ORANGE), d.rows.filter(function (x) {
    return x.empty > 0;
  }).map(function (x) {
    return /*#__PURE__*/React.createElement("div", {
      key: x.eq,
      style: rowSt
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: textC
      }
    }, x.eq), /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC
      }
    }, x.empty, " dni", x.lost != null ? " · ~ " + Z(x.lost) : ""));
  })), /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Puste dni \xD7 stawka za dzie\u0144. To g\xF3rna granica: nie ka\u017Cdy pusty dzie\u0144 da\u0142oby si\u0119 wype\u0142ni\u0107 (zale\u017Cy od popytu i dojazd\xF3w)."));
}
// ── ROK W LICZBACH: rok do roku (YTD), tempo roczne, najlepszy/najsłabszy miesiąc, mapa obłożenia ──
function YearInNumbers(_ref7) {
  var c = _ref7.c;
  var year = c.year,
    today = c.today,
    rentals = c.rentals,
    stock = c.stock,
    equipmentAll = c.equipmentAll,
    catOf = c.catOf,
    revenueInRangeCat = c.revenueInRangeCat,
    finances = c.finances,
    Z = c.Z,
    kv = c.kv,
    subC = c.subC,
    textC = c.textC,
    trackC = c.trackC,
    GREEN = c.GREEN,
    RED = c.RED,
    ORANGE = c.ORANGE,
    dk = c.dk;
  var _useState7 = useState("all"),
    _useState8 = _slicedToArray(_useState7, 2),
    cat = _useState8[0],
    setCat = _useState8[1]; // filtr: wszystko / szyny / wózki / balkoniki
  var d = useMemo(function () {
    var yms = ST_YMS(year),
      py = year - 1;
    var thisYear = +today.slice(0, 4);
    var curYM = today.slice(0, 7);
    var monthRev = function monthRev(ys) {
      return ys.map(function (ym) {
        return ym > curYM ? null : revenueInRangeCat(ym + "-01", ym + "-" + String(ST_LAST(ym)).padStart(2, "0"), cat);
      });
    };
    var cur = monthRev(yms),
      prev = monthRev(ST_YMS(py));
    // do dziś (bieżący rok) albo cały rok (rok zamknięty)
    var toCur = year === thisYear ? today : year + "-12-31";
    var toPrev = year === thisYear ? py + "-" + (today.slice(5) === "02-29" ? "02-28" : today.slice(5)) : py + "-12-31";
    var ytd = revenueInRangeCat(year + "-01-01", toCur, cat),
      ytdPrev = revenueInRangeCat(py + "-01-01", toPrev, cat);
    var dayOfYear = dateDiff(year + "-01-01", toCur) + 1;
    var pace = year === thisYear && dayOfYear >= 30 ? Math.round(ytd / dayOfYear * (year % 4 === 0 ? 366 : 365)) : null;
    // pełne miesiące: do poprzedniego (bieżący rok) albo wszystkie 12
    var firstIdx = cur.findIndex(function (v) {
      return v != null && v > 0;
    }); // miesiące sprzed pierwszego przychodu nie liczą się do "najsłabszego"
    var full = yms.map(function (ym, i) {
      return {
        ym: ym,
        i: i,
        v: cur[i]
      };
    }).filter(function (x) {
      return x.v != null && firstIdx >= 0 && x.i >= firstIdx && (year !== thisYear || x.ym < curYM);
    });
    var best = full.length ? full.reduce(function (a, b) {
      return b.v > a.v ? b : a;
    }) : null;
    var worst = full.length > 1 ? full.reduce(function (a, b) {
      return b.v < a.v ? b : a;
    }) : null;
    // mapa obłożenia: szyna × miesiąc
    var eqs = cat === "all" || cat === "szyny" ? equipmentAll.filter(function (eq) {
      return catOf(eq) === "szyny";
    }) : [];
    var heat = eqs.map(function (eq) {
      var B = 0,
        C = 0;
      var cells = yms.map(function (ym) {
        if (ym > curYM) return null;
        var o = occupancyForEq(eq, rentals, stock, ym + "-01", ym + "-" + String(ST_LAST(ym)).padStart(2, "0"), today);
        if (o.noData || !o.cap) return null;
        B += o.booked;
        C += o.cap;
        return o.pct;
      });
      return {
        eq: eq,
        cells: cells,
        avg: C ? Math.round(B / C * 100) : null
      };
    }).filter(function (x) {
      return x.cells.some(function (v) {
        return v != null;
      });
    });
    return {
      ytd: ytd,
      ytdPrev: ytdPrev,
      pace: pace,
      best: best,
      worst: worst,
      heat: heat,
      toCur: toCur,
      toPrev: toPrev,
      cur: cur
    };
  }, [year, today, cat, rentals, stock, equipmentAll, finances]);
  var head = {
    fontSize: 11,
    fontWeight: 700,
    color: subC,
    textTransform: "uppercase",
    letterSpacing: ".07em",
    margin: "16px 0 6px"
  };
  var note = {
    fontSize: 10,
    color: subC,
    marginTop: 6,
    lineHeight: 1.5
  };
  var diff = d.ytd - d.ytdPrev,
    diffPct = d.ytdPrev > 0 ? Math.round(diff / d.ytdPrev * 100) : null;
  var fmtD = function fmtD(x) {
    return x.slice(8) + "." + x.slice(5, 7) + "." + x.slice(0, 4);
  };
  var monthName = function monthName(ym) {
    return PL_MON[+ym.slice(5, 7) - 1] + " " + ym.slice(0, 4);
  };
  var cellCol = function cellCol(p) {
    return p >= 70 ? GREEN : p >= 40 ? ORANGE : RED;
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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
        return setCat(t.k);
      },
      "aria-pressed": cat === t.k,
      style: {
        padding: "5px 12px",
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 11,
        background: cat === t.k ? "#3E6FB0" : dk ? "#1E2F4A" : "#D9E2F0",
        color: cat === t.k ? "#fff" : subC,
        fontFamily: "inherit"
      }
    }, t.l);
  })), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, head), {}, {
      marginTop: 0
    })
  }, "Rok ", year, " do dzi\u015B vs rok ", year - 1), kv(year + " (do " + fmtD(d.toCur) + ")", Z(d.ytd), GREEN), kv(year - 1 + " (do " + fmtD(d.toPrev) + ")", Z(d.ytdPrev)), kv("Różnica", (diff >= 0 ? "+" : "−") + Z(Math.abs(diff)) + (diffPct !== null ? " (" + (diff >= 0 ? "+" : "") + diffPct + "%)" : ""), diff >= 0 ? GREEN : RED), d.pace != null && kv("Tempo roczne (przy obecnym)", Z(d.pace)), d.best && kv("Najlepszy pełny miesiąc", monthName(d.best.ym) + " · " + Z(d.best.v), GREEN), d.worst && kv("Najsłabszy pełny miesiąc", monthName(d.worst.ym) + " · " + Z(d.worst.v), RED), /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Przych\xF3d ", cat === "all" ? "ze sprzętu" : cat === "szyny" ? "z szyn" : cat === "wozki" ? "z wózków" : "z balkoników", " (wp\u0142aty z wypo\u017Cycze\u0144, transportu", cat === "all" || cat === "wozki" ? " i wózków NFZ" : "", "). Bie\u017C\u0105cy miesi\u0105c nie jest brany do najlepszego/najs\u0142abszego, bo jeszcze trwa."), /*#__PURE__*/React.createElement("div", {
    style: head
  }, "Mapa ob\u0142o\u017Cenia szyn w roku ", year), cat === "wozki" || cat === "balkoniki" ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Mapa ob\u0142o\u017Cenia jest liczona tylko dla szyn CPM. Wybierz \u201EWszystko\u201D albo \u201ESzyny\u201D.") : d.heat.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: subC
    }
  }, "Brak danych o ob\u0142o\u017Ceniu w tym roku.") : /*#__PURE__*/React.createElement(React.Fragment, null, d.heat.map(function (h) {
    return /*#__PURE__*/React.createElement("div", {
      key: h.eq,
      style: {
        marginBottom: 10
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
    }, h.eq), /*#__PURE__*/React.createElement("span", {
      style: {
        color: subC
      }
    }, h.avg != null ? "średnio " + h.avg + "%" : "")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2
      }
    }, h.cells.map(function (p, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        title: PL_MON[i] + (p != null ? ": " + p + "%" : ""),
        style: {
          flex: 1,
          minWidth: 0,
          height: 24,
          borderRadius: 4,
          background: p == null ? trackC : cellCol(p),
          opacity: p == null ? .6 : .45 + p / 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
          fontWeight: 700,
          color: p == null ? subC : "#fff"
        }
      }, p == null ? "" : p);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2
      }
    }, PL_MON.map(function (m, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          flex: 1,
          fontSize: 8,
          color: subC,
          textAlign: "center"
        }
      }, m);
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: note
  }, "Procent dni, w kt\xF3rych szyna by\u0142a wypo\u017Cyczona, w ka\u017Cdym miesi\u0105cu. Zielony \u2265 70%, pomara\u0144czowy 40\u201369%, czerwony poni\u017Cej. Pokazuje, kiedy w roku jest popyt, a kiedy luka.")));
}
