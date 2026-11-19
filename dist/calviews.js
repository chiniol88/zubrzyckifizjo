// Plik wygenerowany z js/calviews.js przez build.py - nie edytowac recznie.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
// ── KALENDARZ: widoki Tydzień i Agenda (2026-11-19) ──────────────────────────────────────────────────────────────
// Dostają znormalizowane wpisy z MiniCalendar (funkcja itemsFor(data) → [{key,kind,title,sub,color,allDay,start,end,done,open}]),
// start/end w minutach od północy (null = bez godziny). Same nic nie zapisują, tylko pokazują i wywołują open() po kliknięciu.
var CAL_DOW = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];
var calMondayOf = function calMondayOf(ds) {
  var d = new Date(ds + "T12:00:00");
  return addDays(ds, -((d.getDay() + 6) % 7));
};
var calHm = function calHm(m) {
  return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
};
var calDayLong = function calDayLong(ds) {
  return new Date(ds + "T12:00:00").toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
};
var CAL_MON = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
var calRangeLabel = function calRangeLabel(days) {
  var a = days[0],
    b = days[days.length - 1];
  if (!a) return "";
  var da = +a.slice(8),
    db = +b.slice(8),
    ma = +a.slice(5, 7) - 1,
    mb = +b.slice(5, 7) - 1;
  if (a.slice(0, 7) === b.slice(0, 7)) return da + "–" + db + " " + CAL_MON[ma] + " " + a.slice(0, 4);
  return da + " " + CAL_MON[ma] + " – " + db + " " + CAL_MON[mb] + " " + b.slice(0, 4);
};
// szeroki ekran (≥640 px): w Tygodniu 7 dni, na telefonie 3 dni
function useCalWide() {
  var _React$useState = React.useState(function () {
      return window.innerWidth >= 640;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    w = _React$useState2[0],
    setW = _React$useState2[1];
  React.useEffect(function () {
    var h = function h() {
      return setW(window.innerWidth >= 640);
    };
    window.addEventListener("resize", h);
    return function () {
      return window.removeEventListener("resize", h);
    };
  }, []);
  return w;
}

// ułożenie zachodzących na siebie bloków obok siebie (kolumny w obrębie dnia)
function calLanes(list) {
  var s = list.slice().sort(function (a, b) {
    return a.start - b.start || b.end - a.end;
  });
  var res = [];
  var cluster = [],
    clusterEnd = -1;
  var flush = function flush() {
    if (!cluster.length) return;
    var lanesEnd = [];
    cluster.forEach(function (it) {
      var l = lanesEnd.findIndex(function (e) {
        return e <= it.start;
      });
      if (l < 0) {
        l = lanesEnd.length;
        lanesEnd.push(it.end);
      } else lanesEnd[l] = it.end;
      it._lane = l;
    });
    cluster.forEach(function (it) {
      it._lanes = lanesEnd.length;
      res.push(it);
    });
    cluster = [];
  };
  s.forEach(function (it) {
    if (cluster.length && it.start >= clusterEnd) flush();
    cluster.push(it);
    clusterEnd = Math.max(clusterEnd, it.end);
  });
  flush();
  return res;
}
function CalWeekView(_ref) {
  var days = _ref.days,
    itemsFor = _ref.itemsFor,
    today = _ref.today,
    holidays = _ref.holidays,
    openDay = _ref.openDay,
    onPickDay = _ref.onPickDay;
  var dk = useContext(DarkCtx);
  var PX = 44; // wysokość jednej godziny
  var data = useMemo(function () {
    return days.map(function (ds) {
      var all = itemsFor(ds);
      var timed = all.filter(function (x) {
        return !x.allDay && x.start != null;
      }).map(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          end: Math.max(x.end != null ? x.end : x.start + 30, x.start + 20)
        });
      });
      return {
        ds: ds,
        allDay: all.filter(function (x) {
          return x.allDay || x.start == null;
        }),
        timed: calLanes(timed)
      };
    });
  }, [days, itemsFor]);
  var minH = 8,
    maxH = 20;
  data.forEach(function (d) {
    return d.timed.forEach(function (x) {
      minH = Math.min(minH, Math.floor(x.start / 60));
      maxH = Math.max(maxH, Math.ceil(Math.min(x.end, 24 * 60) / 60));
    });
  });
  minH = Math.max(0, minH);
  maxH = Math.min(24, Math.max(maxH, minH + 4));
  var hours = Array.from({
    length: maxH - minH
  }, function (_, i) {
    return minH + i;
  });
  var border = dk ? "#2A3A56" : "#E4EAF3",
    sub = "#7A8FA6",
    txt = dk ? "#E8F5F5" : "#1C2B3A";
  var nowMin = function () {
    var n = new Date();
    return n.getHours() * 60 + n.getMinutes();
  }();
  var cols = "34px repeat(" + days.length + ",minmax(0,1fr))";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: "10px 8px 12px",
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: cols,
      gap: 2,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", null), data.map(function (_ref2) {
    var ds = _ref2.ds;
    var isToday = ds === today,
      isOpen = ds === openDay,
      dow = new Date(ds + "T12:00:00").getDay(),
      we = dow === 0 || dow === 6,
      hol = holidays && holidays.has(ds);
    return /*#__PURE__*/React.createElement("button", {
      key: ds,
      onClick: function onClick() {
        return onPickDay(ds);
      },
      title: hol ? holidays.get(ds) : "",
      style: {
        border: "none",
        borderRadius: 10,
        padding: "4px 0",
        cursor: "pointer",
        fontFamily: "inherit",
        background: isOpen ? "#3E6FB0" : isToday ? dk ? "#0A3030" : "#E1E9F5" : "transparent",
        color: isOpen ? "#fff" : hol ? "#B71C1C" : we ? dk ? "#F4A261" : "#C0622A" : txt,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        opacity: .85
      }
    }, CAL_DOW[dow]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: isToday || isOpen ? 800 : 600,
        color: isOpen ? "#fff" : isToday ? "#3E6FB0" : undefined
      }
    }, +ds.slice(8)));
  })), data.some(function (d) {
    return d.allDay.length > 0;
  }) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: cols,
      gap: 2,
      marginBottom: 4,
      paddingBottom: 4,
      borderBottom: "1px solid " + border
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: sub,
      paddingTop: 3,
      textAlign: "right",
      paddingRight: 4
    }
  }, "ca\u0142y dzie\u0144"), data.map(function (_ref3) {
    var ds = _ref3.ds,
      allDay = _ref3.allDay;
    return /*#__PURE__*/React.createElement("div", {
      key: ds,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0
      }
    }, allDay.map(function (it) {
      return /*#__PURE__*/React.createElement("div", {
        key: it.key,
        onClick: it.open,
        title: it.title,
        style: {
          fontSize: 10,
          lineHeight: 1.25,
          padding: "2px 4px",
          borderRadius: 5,
          background: it.color + "26",
          borderLeft: "3px solid " + it.color,
          color: txt,
          cursor: "pointer",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }
      }, it.title);
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: cols,
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: hours.length * PX
    }
  }, hours.map(function (h, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: h,
      style: {
        position: "absolute",
        top: i === 0 ? 1 : i * PX - 6,
        right: 4,
        fontSize: 9,
        color: sub
      }
    }, String(h).padStart(2, "0"));
  })), data.map(function (_ref4) {
    var ds = _ref4.ds,
      timed = _ref4.timed;
    return /*#__PURE__*/React.createElement("div", {
      key: ds,
      style: {
        position: "relative",
        height: hours.length * PX,
        borderLeft: "1px solid " + border,
        minWidth: 0,
        background: ds === today ? dk ? "rgba(62,111,176,.10)" : "rgba(62,111,176,.05)" : "transparent"
      }
    }, hours.map(function (h, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: h,
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          top: i * PX,
          borderTop: "1px solid " + border,
          opacity: .7
        }
      });
    }), ds === today && nowMin >= minH * 60 && nowMin <= maxH * 60 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: (nowMin - minH * 60) / 60 * PX,
        height: 2,
        background: "#E05C5C",
        zIndex: 2,
        borderRadius: 1
      }
    }), timed.map(function (it) {
      var top = (it.start - minH * 60) / 60 * PX,
        h = Math.max(20, (it.end - it.start) / 60 * PX - 1);
      return /*#__PURE__*/React.createElement("div", {
        key: it.key,
        onClick: it.open,
        title: calHm(it.start) + "–" + calHm(it.end) + " · " + it.title + (it.sub ? " · " + it.sub : ""),
        style: {
          position: "absolute",
          top: top,
          height: h,
          left: it._lane / it._lanes * 100 + "%",
          width: "calc(" + 100 / it._lanes + "% - 2px)",
          boxSizing: "border-box",
          background: it.color + "2E",
          borderLeft: "3px solid " + it.color,
          borderRadius: 5,
          padding: "1px 3px",
          overflow: "hidden",
          cursor: "pointer",
          zIndex: 1,
          opacity: it.done ? .7 : 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: sub,
          lineHeight: 1.2
        }
      }, calHm(it.start)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10.5,
          fontWeight: 600,
          color: txt,
          lineHeight: 1.2,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: Math.max(1, Math.floor((h - 12) / 13)),
          WebkitBoxOrient: "vertical",
          wordBreak: "break-word"
        }
      }, it.title));
    }));
  })));
}
function CalAgenda(_ref5) {
  var days = _ref5.days,
    itemsFor = _ref5.itemsFor,
    today = _ref5.today,
    holidays = _ref5.holidays;
  var dk = useContext(DarkCtx);
  var border = dk ? "#2A3A56" : "#EFF3FA",
    sub = "#7A8FA6",
    txt = dk ? "#E8F5F5" : "#1C2B3A";
  var groups = useMemo(function () {
    return days.map(function (ds) {
      return {
        ds: ds,
        items: itemsFor(ds).sort(function (a, b) {
          var aa = a.allDay || a.start == null,
            bb = b.allDay || b.start == null;
          if (aa !== bb) return aa ? -1 : 1;
          return (a.start || 0) - (b.start || 0);
        })
      };
    }).filter(function (g) {
      return g.items.length > 0 || holidays && holidays.has(g.ds);
    });
  }, [days, itemsFor, holidays]);
  var tag = function tag(ds) {
    return ds === today ? "dziś" : ds === addDays(today, 1) ? "jutro" : ds === addDays(today, -1) ? "wczoraj" : "";
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: "6px 16px 10px",
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, groups.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: sub,
      textAlign: "center",
      padding: "18px 0"
    }
  }, "Brak zdarze\u0144 w tym okresie"), groups.map(function (_ref6) {
    var ds = _ref6.ds,
      items = _ref6.items;
    var hol = holidays && holidays.get(ds);
    return /*#__PURE__*/React.createElement("div", {
      key: ds,
      style: {
        padding: "10px 0 4px",
        borderBottom: "1px solid " + border
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 14,
        color: ds === today ? "#3E6FB0" : txt,
        textTransform: "capitalize"
      }
    }, calDayLong(ds)), tag(ds) && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: ds === today ? "#3E6FB0" : sub
      }
    }, tag(ds)), hol && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#B71C1C"
      }
    }, "\uD83D\uDD34 ", hol)), items.map(function (it) {
      return /*#__PURE__*/React.createElement("div", {
        key: it.key,
        onClick: it.open,
        style: {
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          padding: "6px 0",
          cursor: "pointer",
          opacity: it.done ? .75 : 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 74,
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 700,
          color: sub,
          paddingTop: 1
        }
      }, it.allDay || it.start == null ? "cały dzień" : calHm(it.start) + (it.end != null ? "–" + calHm(it.end) : "")), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 4,
          alignSelf: "stretch",
          borderRadius: 2,
          background: it.color,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0,
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: txt,
          overflowWrap: "anywhere"
        }
      }, it.title), it.sub && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: sub,
          overflowWrap: "anywhere"
        }
      }, it.sub)));
    }));
  }));
}
