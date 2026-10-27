// Plik wygenerowany z js/dashboard.js przez build.py - nie edytowac recznie.
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function nextCycleEnd(r, today) {
  var activeCycles = (r.cycles || []).filter(function (c) {
    return !c.cancelled;
  });
  var lastCycle = activeCycles.length ? activeCycles.reduce(function (a, b) {
    return (b.dueDate || b.month + "-01") > (a.dueDate || a.month + "-01") ? b : a;
  }) : null;
  var lastDue = lastCycle ? lastCycle.dueDate || lastCycle.month + "-01" : null;
  if (lastCycle && lastDue >= today) return {
    date: lastDue,
    cycle: lastCycle
  };
  var date = lastDue || r.startDate;
  if (!date) return {
    date: null,
    cycle: null
  };
  while (date < today) date = nextCycleDueDate(date);
  return {
    date: date,
    cycle: null
  };
}

// ── Wydarzenia: zwykłe i cykliczne co tydzień (np. zajęcia dzieci) ──────────────────────────────
// Rekord wydarzenia: {id,title,date,allDay,time,endTime,notes,address, cat:"dzieci"|"", repeat:{days:[getDay],until}|null, skip:[daty]}.
// Wydarzenie cykliczne to JEDEN rekord (date = pierwszy dzień); w kalendarzu rozwijamy go na kolejne dni.
var EVT_DAYS = [{
  d: 1,
  l: "Pn"
}, {
  d: 2,
  l: "Wt"
}, {
  d: 3,
  l: "Śr"
}, {
  d: 4,
  l: "Cz"
}, {
  d: 5,
  l: "Pt"
}, {
  d: 6,
  l: "Sb"
}, {
  d: 0,
  l: "Nd"
}];
var EVT_KID_COLOR = "#E0559B";
var evtIsDate = function evtIsDate(d) {
  return /^\d{4}-\d{2}-\d{2}$/.test(d || "");
};
var evtBlank = function evtBlank(date) {
  return {
    title: "",
    date: date || "",
    allDay: false,
    time: "10:00",
    endTime: "",
    notes: "",
    address: "",
    cat: "",
    repeat: false,
    days: [],
    until: "",
    skip: [],
    editId: null
  };
};
var evtFromRecord = function evtFromRecord(e) {
  var rep = e && e.repeat && Array.isArray(e.repeat.days) && e.repeat.days.length ? e.repeat : null;
  return {
    title: e.title || "",
    date: e.date || "",
    allDay: !!e.allDay,
    time: e.time || "10:00",
    endTime: e.endTime || "",
    notes: e.notes || "",
    address: e.address || "",
    cat: e.cat || "",
    repeat: !!rep,
    days: rep ? _toConsumableArray(rep.days) : [],
    until: rep && evtIsDate(rep.until) ? rep.until : "",
    skip: Array.isArray(e.skip) ? e.skip.filter(evtIsDate) : [],
    editId: e.id
  };
};
var evtToRecord = function evtToRecord(f) {
  return {
    title: f.title.trim(),
    date: f.date,
    allDay: f.allDay,
    time: f.allDay ? "" : f.time,
    endTime: f.allDay || !f.endTime ? "" : f.endTime,
    notes: f.notes,
    address: f.address || "",
    cat: f.cat || "",
    repeat: f.repeat && f.days.length ? {
      days: _toConsumableArray(f.days).sort(function (a, b) {
        return a - b;
      }),
      until: evtIsDate(f.until) ? f.until : ""
    } : null,
    skip: f.repeat && f.days.length ? f.skip || [] : []
  };
};
// wydarzenia z zakresu dat [from,to] pogrupowane po dniu; cykliczne rozwinięte (każde wystąpienie ma _series:true)
function evtByDay(events, from, to) {
  var m = {},
    add = function add(d, e) {
      (m[d] = m[d] || []).push(e);
    };
  (events || []).forEach(function (e) {
    if (!e || _typeof(e) !== "object" || !evtIsDate(e.date)) return;
    var rep = e.repeat && Array.isArray(e.repeat.days) && e.repeat.days.length ? e.repeat : null;
    if (!rep) {
      if (e.date >= from && e.date <= to) add(e.date, e);
      return;
    }
    var until = evtIsDate(rep.until) ? rep.until : "",
      skip = Array.isArray(e.skip) ? e.skip : [];
    var d = e.date > from ? e.date : from;
    for (var n = 0; n < 400 && d <= to; n++) {
      if (until && d > until) break;
      if (rep.days.includes(new Date(d + "T12:00:00").getDay()) && !skip.includes(d)) add(d, _objectSpread(_objectSpread({}, e), {}, {
        date: d,
        _series: true
      }));
      d = addDays(d, 1);
    }
  });
  return m;
}
function MiniCalendar(_ref) {
  var visits = _ref.visits,
    rentals = _ref.rentals,
    today = _ref.today,
    onEditVisit = _ref.onEditVisit,
    onAddVisit = _ref.onAddVisit,
    onGoToRental = _ref.onGoToRental,
    onAddRental = _ref.onAddRental,
    events = _ref.events,
    setEvents = _ref.setEvents,
    patients = _ref.patients;
  var dk = useContext(DarkCtx);
  var demo = useDemo();
  var durs = useContext(DurCtx);
  var _useState = useState(function () {
      return +today.slice(0, 4);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    calYear = _useState2[0],
    setCalYear = _useState2[1];
  var _useState3 = useState(function () {
      return +today.slice(5, 7);
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    calMonth = _useState4[0],
    setCalMonth = _useState4[1];
  var _useState5 = useState(function () {
      return today;
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    openDay = _useState6[0],
    setOpenDay = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showEvtModal = _useState8[0],
    setShowEvtModal = _useState8[1];
  var _useState9 = useState(function () {
      return evtBlank("");
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    evtForm = _useState0[0],
    setEvtForm = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    quickRental = _useState10[0],
    setQuickRental = _useState10[1];
  var daysInMonth = new Date(calYear, calMonth, 0).getDate();
  var firstDow = new Date(calYear, calMonth - 1, 1).getDay();
  var startOffset = (firstDow + 6) % 7;
  var monthStr = calYear + "-" + String(calMonth).padStart(2, "0");
  var prevMonthStr = calMonth === 1 ? "".concat(calYear - 1, "-12") : "".concat(calYear, "-").concat(String(calMonth - 1).padStart(2, "0"));
  var nextMonthStr = calMonth === 12 ? "".concat(calYear + 1, "-01") : "".concat(calYear, "-").concat(String(calMonth + 1).padStart(2, "0"));
  var prevMonthDays = new Date(calYear, calMonth - 1, 0).getDate();
  var prevMonth = function prevMonth() {
    if (calMonth === 1) {
      setCalYear(function (y) {
        return y - 1;
      });
      setCalMonth(12);
    } else setCalMonth(function (m) {
      return m - 1;
    });
    setOpenDay(null);
  };
  var nextMonth = function nextMonth() {
    if (calMonth === 12) {
      setCalYear(function (y) {
        return y + 1;
      });
      setCalMonth(1);
    } else setCalMonth(function (m) {
      return m + 1;
    });
    setOpenDay(null);
  };
  var rentalEventsByDay = useMemo(function () {
    var m = {};
    var add = function add(dateStr, ev) {
      if (!m[dateStr]) m[dateStr] = [];
      m[dateStr].push(ev);
    };
    var visibleMonths = [prevMonthStr, monthStr, nextMonthStr];
    rentals.forEach(function (r) {
      if (r.status === "zakończone" && !visibleMonths.some(function (ms) {
        return (r.startDate || "").startsWith(ms);
      }) && !visibleMonths.some(function (ms) {
        return (r.endDate || "").startsWith(ms);
      })) return;
      if (!r.renewable) {
        if (visibleMonths.some(function (ms) {
          return (r.startDate || "").startsWith(ms);
        })) add(r.startDate, {
          type: "start",
          r: r
        });
        if (!r.plannedReturn && visibleMonths.some(function (ms) {
          return (r.endDate || "").startsWith(ms);
        })) add(r.endDate, {
          type: "end",
          r: r
        });
        if (r.plannedReturn && visibleMonths.some(function (ms) {
          return r.plannedReturn.startsWith(ms);
        })) add(r.plannedReturn, {
          type: "plannedReturn",
          r: r
        });
      } else {
        // Pierwszy okres (data = start wypożyczenia) to w kalendarzu Wydanie sprzętu, nie "opłata cykliczna" —
        // pokazuje konkretną godzinę/całodniowość dostawy, kolejne okresy to już realne przypomnienia o opłacie
        (r.cycles || []).filter(function (c) {
          return !c.cancelled && (c.dueDate || c.month + "-01") !== r.startDate;
        }).forEach(function (c) {
          var cd = c.dueDate || c.month + "-01";
          if (visibleMonths.includes(cd.slice(0, 7))) {
            add(cd, {
              type: "cycle",
              c: c,
              r: r
            });
          }
        });
        if (visibleMonths.some(function (ms) {
          return (r.startDate || "").startsWith(ms);
        })) {
          add(r.startDate, {
            type: "start",
            r: r
          });
        }
        if (r.plannedReturn && visibleMonths.some(function (ms) {
          return r.plannedReturn.startsWith(ms);
        })) {
          add(r.plannedReturn, {
            type: "plannedReturn",
            r: r
          });
        }
        if (r.status === "aktywne" && !r.reserved && !r.plannedReturn) {
          // Podgląd kolejnego okresu — liczony na bieżąco, nigdy nie zapisywany, znika sam gdy wypożyczenie się kończy
          var activeCycles = (r.cycles || []).filter(function (c) {
            return !c.cancelled;
          });
          var anchor = activeCycles.length ? activeCycles.reduce(function (a, b) {
            return (b.dueDate || b.month + "-01") > (a.dueDate || a.month + "-01") ? b : a;
          }) : null;
          var anchorDate = anchor ? anchor.dueDate || anchor.month + "-01" : r.startDate;
          var previewDate = anchorDate ? nextCycleDueDate(anchorDate) : null;
          if (previewDate && !activeCycles.some(function (c) {
            return (c.dueDate || c.month + "-01") === previewDate;
          }) && visibleMonths.includes(previewDate.slice(0, 7))) {
            add(previewDate, {
              type: "cyclePreview",
              r: r
            });
          }
        }
      }
    });
    return m;
  }, [rentals, monthStr, prevMonthStr, nextMonthStr, today]);
  var visitsByDay = useMemo(function () {
    var m = {};
    var visibleMonths = [prevMonthStr, monthStr, nextMonthStr];
    visits.filter(function (v) {
      return v.date && visibleMonths.some(function (ms) {
        return v.date.startsWith(ms);
      });
    }).forEach(function (v) {
      if (!m[v.date]) m[v.date] = [];
      m[v.date].push(v);
    });
    return m;
  }, [visits, monthStr, prevMonthStr, nextMonthStr]);
  var eventsByDay = useMemo(function () {
    return evtByDay(events, prevMonthStr + "-01", nextMonthStr + "-31");
  }, [events, monthStr, prevMonthStr, nextMonthStr]);
  var saveEvt = function saveEvt() {
    if (!evtForm.title.trim() || !evtForm.date) return;
    if (evtForm.repeat && evtForm.days.length === 0) {
      alert("Wybierz co najmniej jeden dzień tygodnia.");
      return;
    }
    if (evtForm.repeat && evtIsDate(evtForm.until) && evtForm.until < evtForm.date) {
      alert("Data końca powtarzania jest wcześniejsza niż data początku — popraw datę.");
      return;
    }
    if (!evtForm.allDay && evtForm.endTime && evtForm.endTime <= evtForm.time) {
      alert("Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.");
      return;
    }
    var rec = evtToRecord(evtForm);
    if (evtForm.editId) {
      setEvents(function (es) {
        return (es || []).map(function (e) {
          return e && e.id === evtForm.editId ? _objectSpread(_objectSpread({}, e), rec) : e;
        });
      });
    } else {
      setEvents(function (es) {
        return [].concat(_toConsumableArray(es || []), [_objectSpread({
          id: Date.now()
        }, rec)]);
      });
    }
    setShowEvtModal(false);
  };

  // jeden wiersz wydarzenia (zwykłego albo wystąpienia serii) w liście dnia
  var renderEvt = function renderEvt(ev, timed) {
    var kid = ev.cat === "dzieci";
    var base = (events || []).find(function (x) {
      return x && x.id === ev.id;
    }) || ev;
    return /*#__PURE__*/React.createElement("div", {
      key: (timed ? "e" : "ad-e") + ev.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 0",
        borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 6,
        height: 6,
        borderRadius: timed ? "50%" : 2,
        background: kid ? EVT_KID_COLOR : "#F4A261",
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, timed ? calRange(durs, "event", ev.time, ev.endTime) + " · " : "🗓 ", demo ? "Wydarzenie" : ev.title, kid && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 6,
        fontSize: 10,
        fontWeight: 700,
        color: "#fff",
        background: EVT_KID_COLOR,
        borderRadius: 6,
        padding: "1px 6px",
        verticalAlign: "middle"
      }
    }, "Dzieci"), ev._series && /*#__PURE__*/React.createElement("span", {
      title: "Powtarza si\u0119 co tydzie\u0144",
      style: {
        marginLeft: 6,
        fontSize: 12
      }
    }, "\uD83D\uDD01")), ev.notes && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        whiteSpace: "pre-wrap"
      }
    }, maskText(demo, ev.notes)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setEvtForm(evtFromRecord(base));
        setShowEvtModal(true);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 14,
        color: "#7A8FA6",
        padding: "2px 4px"
      }
    }, "\u270F\uFE0F"), ev._series ? /*#__PURE__*/React.createElement("button", {
      title: "Pomi\u0144 tylko ten dzie\u0144",
      onClick: function onClick() {
        if (!window.confirm("Pominąć to wydarzenie tylko w dniu " + cpmDate(ev.date) + "?\n\nPozostałe dni serii zostają.")) return;
        setEvents(function (es) {
          return (es || []).map(function (e) {
            return e && e.id === ev.id ? _objectSpread(_objectSpread({}, e), {}, {
              skip: [].concat(_toConsumableArray(Array.isArray(e.skip) ? e.skip : []), [ev.date])
            }) : e;
          });
        });
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        color: "#E05C5C",
        padding: "2px 4px",
        fontFamily: "inherit",
        fontWeight: 700
      }
    }, "pomi\u0144") : /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setEvents(function (es) {
          return (es || []).filter(function (e) {
            return e.id !== ev.id;
          });
        });
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 14,
        color: "#E05C5C",
        padding: "2px 4px"
      }
    }, "\xD7")));
  };
  var DOW = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
  var cells = [];
  var leading = startOffset + 7;
  for (var i = 0; i < leading; i++) cells.push({
    d: prevMonthDays - leading + 1 + i,
    overflow: "prev",
    ms: prevMonthStr
  });
  for (var d = 1; d <= daysInMonth; d++) cells.push({
    d: d,
    overflow: null,
    ms: monthStr
  });
  var trailing = (7 - cells.length % 7) % 7 + 7;
  for (var _d = 1; _d <= trailing; _d++) cells.push({
    d: _d,
    overflow: "next",
    ms: nextMonthStr
  });
  var holidays = useMemo(function () {
    return new Map([].concat(_toConsumableArray(getHolidays(calYear - 1)), _toConsumableArray(getHolidays(calYear)), _toConsumableArray(getHolidays(calYear + 1))));
  }, [calYear]);
  var openDateStr = openDay || null;
  var dayVisits = openDay ? (visitsByDay[openDay] || []).sort(function (a, b) {
    return (a.time || "").localeCompare(b.time || "");
  }) : [];
  var dayRentals = openDay ? rentalEventsByDay[openDay] || [] : [];
  var dayEvents = openDay ? eventsByDay[openDay] || [] : [];
  var dayAllDay = [].concat(_toConsumableArray(dayEvents.filter(function (e) {
    return e.allDay;
  }).map(function (x) {
    return {
      _kind: "event",
      e: x
    };
  })), _toConsumableArray(dayVisits.filter(function (v) {
    return v.allDay;
  }).map(function (v) {
    return {
      _kind: "visit",
      v: v
    };
  })), _toConsumableArray(dayRentals.filter(function (ev) {
    return ev.type === "start" ? ev.r.startAllDay || ev.r.allDay : ev.type === "end" ? ev.r.endAllDay || ev.r.allDay : ev.type === "plannedReturn" ? ev.r.plannedReturnAllDay !== false : false;
  }).map(function (ev) {
    return {
      _kind: "rental",
      ev: ev
    };
  }))).sort(function (a, b) {
    var ta = a._kind === "event" ? a.e.title : a._kind === "visit" ? a.v.patientName : a.ev.r.patientName;
    var tb = b._kind === "event" ? b.e.title : b._kind === "visit" ? b.v.patientName : b.ev.r.patientName;
    return ta.localeCompare(tb);
  });
  var dayTimedAll = openDay ? [].concat(_toConsumableArray(dayVisits.filter(function (v) {
    return !v.allDay;
  }).map(function (v) {
    return {
      _kind: "visit",
      _time: v.time || "00:00",
      v: v
    };
  })), _toConsumableArray(dayEvents.filter(function (e) {
    return !e.allDay;
  }).map(function (e) {
    return {
      _kind: "event",
      _time: e.time || "00:00",
      e: e
    };
  })), _toConsumableArray(dayRentals.filter(function (ev) {
    return !(ev.type === "start" ? ev.r.startAllDay || ev.r.allDay : ev.type === "end" ? ev.r.endAllDay || ev.r.allDay : ev.type === "plannedReturn" ? ev.r.plannedReturnAllDay !== false : false);
  }).map(function (ev) {
    return {
      _kind: "rental",
      _time: ev.type === "start" ? ev.r.startTime || "00:00" : ev.type === "end" ? ev.r.endTime || "00:00" : ev.type === "plannedReturn" ? ev.r.plannedReturnTime || "00:00" : "00:00",
      ev: ev
    };
  }))).sort(function (a, b) {
    return a._time.localeCompare(b._time);
  }) : [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 17,
      fontWeight: 700
    }
  }, "Kalendarz"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: prevMonth,
    style: {
      background: "#D9E2F0",
      border: "none",
      borderRadius: 8,
      width: 28,
      height: 28,
      cursor: "pointer",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#1C2B3A",
      minWidth: 100,
      textAlign: "center",
      textTransform: "capitalize"
    }
  }, new Date(calYear, calMonth - 1, 15).toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: nextMonth,
    style: {
      background: "#D9E2F0",
      border: "none",
      borderRadius: 8,
      width: 28,
      height: 28,
      cursor: "pointer",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u203A"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: "12px 10px",
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      marginBottom: 6
    }
  }, DOW.map(function (d, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        textAlign: "center",
        fontSize: 11,
        fontWeight: 700,
        color: i >= 5 ? dk ? "#F4A261" : "#D0622A" : "#7A8FA6",
        padding: "2px 0"
      }
    }, d);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 2
    }
  }, cells.map(function (_ref2, i) {
    var d = _ref2.d,
      overflow = _ref2.overflow,
      ms = _ref2.ms;
    var isOverflow = overflow !== null;
    var dateStr = ms + "-" + String(d).padStart(2, "0");
    var vc = (visitsByDay[dateStr] || []).length;
    var rc = (rentalEventsByDay[dateStr] || []).length;
    var ec = (eventsByDay[dateStr] || []).length;
    var isToday = dateStr === today;
    var isOpen = dateStr === openDay;
    var colIndex = i % 7;
    var isWeekend = colIndex >= 5;
    var isHoliday = holidays.has(dateStr);
    var overflowColor = dk ? "#8FA3B8" : "#7A8FA6";
    var normalBg = isHoliday ? dk ? "#5A0A0A" : "#FCCFCF" : isWeekend ? dk ? "rgba(244,162,97,0.22)" : "rgba(244,162,97,0.28)" : "transparent";
    var normalColor = isHoliday ? "#B71C1C" : isWeekend ? dk ? "#F4A261" : "#C0622A" : dk ? "#C8E8E8" : "#1C2B3A";
    return /*#__PURE__*/React.createElement("div", {
      key: dateStr,
      onClick: function onClick() {
        return setOpenDay(isOpen ? null : dateStr);
      },
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5px 2px",
        borderRadius: 10,
        cursor: "pointer",
        opacity: isOverflow ? 0.7 : 1,
        background: isOpen ? "#3E6FB0" : isToday ? dk ? "#0A3030" : "#E1E9F5" : normalBg
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: isToday || isOpen ? 700 : 400,
        color: isOpen ? "#fff" : isToday ? "#3E6FB0" : isOverflow ? overflowColor : normalColor
      }
    }, isOverflow && d === 1 ? d + "." + ms.slice(5) : d), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2,
        marginTop: 2,
        minHeight: 6
      }
    }, vc > 0 && _toConsumableArray(Array(Math.min(vc, 2))).map(function (_, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: "v" + j,
        style: {
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: isOpen ? "rgba(255,255,255,.8)" : "#3DAA72"
        }
      });
    }), rc > 0 && _toConsumableArray(Array(Math.min(rc, 2))).map(function (_, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: "r" + j,
        style: {
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: isOpen ? "rgba(255,255,255,.6)" : "#7C6AF4"
        }
      });
    }), ec > 0 && (eventsByDay[dateStr] || []).slice(0, 2).map(function (ev, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: "e" + j,
        style: {
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: isOpen ? "rgba(255,255,255,.6)" : ev.cat === "dzieci" ? EVT_KID_COLOR : "#F4A261"
        }
      });
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 10,
      paddingTop: 8,
      borderTop: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA"),
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#7A8FA6",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#3DAA72",
      display: "inline-block"
    }
  }), "Wizyty"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#7A8FA6",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#7C6AF4",
      display: "inline-block"
    }
  }), "Wypo\u017Cyczenia"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#7A8FA6",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#F4A261",
      display: "inline-block"
    }
  }), "Wydarzenia"))), openDay && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      padding: "14px 16px",
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: dk ? "#E8F5F5" : "#1C2B3A"
    }
  }, new Date(openDateStr + "T12:00:00").toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setEvtForm(evtBlank(openDateStr));
      setShowEvtModal(true);
    },
    style: {
      background: "#FFF4E8",
      color: "#F4A261",
      border: "none",
      borderRadius: 10,
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Wydarzenie"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onAddVisit(openDateStr);
    },
    style: {
      background: "#3DAA72",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Wizyta"), onAddRental && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onAddRental(openDateStr);
    },
    style: {
      background: "#7C6AF4",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit"
    }
  }, "+ Sprz\u0119t"))), openDateStr && holidays.has(openDateStr) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 0",
      borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA"),
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\uD83D\uDD34"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "#B71C1C"
    }
  }, holidays.get(openDateStr))), dayAllDay.length === 0 && dayTimedAll.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      textAlign: "center",
      padding: "10px 0"
    }
  }, "Brak zdarze\u0144 tego dnia"), dayAllDay.map(function (item, idx) {
    if (item._kind === "event") return renderEvt(item.e, false);
    if (item._kind === "visit") {
      var v = item.v;
      var pat = (patients || []).find(function (p) {
        return p.id === v.patientId;
      });
      var addr = (pat === null || pat === void 0 ? void 0 : pat.address) || "";
      return /*#__PURE__*/React.createElement("div", {
        key: "ad-v" + v.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 0",
          borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA")
        }
      }, /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          return onEditVisit(v);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: 1,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: 2,
          background: "#3DAA72",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 14,
          color: dk ? "#E8F5F5" : "#1C2B3A"
        }
      }, "\uD83D\uDDD3 ", demo ? "Pacjent" : v.patientName), addr && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, "\uD83D\uDCCD ", maskAddr(demo, addr)))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        color: visitStatus(v) === "zakończona" ? "#3DAA72" : "#3E6FB0"
      }, visitStatus(v))));
    }
    if (item._kind === "rental") {
      var ev = item.ev;
      var label = ev.type === "start" ? "📦 Wydanie" : ev.type === "end" ? "🔙 Zwrot" : ev.type === "plannedReturn" ? "🔙 Planowany odbiór" : "🔄 Opłata";
      var extDue2 = (ev.r.extensions || []).reduce(function (s, e) {
        return s + (+e.amountDue || 0);
      }, 0);
      var totalAmt2 = (+ev.r.amount || 0) + extDue2;
      var totalPaid2 = calcRentalPaid(ev.r);
      var remaining2 = totalAmt2 - totalPaid2;
      var isEndType = ev.type === "end" || ev.type === "plannedReturn";
      var isPaidEnd = isEndType && remaining2 <= 0;
      var adSub = ev.r.renewable ? null : isEndType ? remaining2 > 0 ? "do zap\u0142aty: ".concat(maskAmt(demo, remaining2), " z\u0142") : "\u2705 Op\u0142acono: ".concat(maskAmt(demo, totalAmt2), " z\u0142") : ev.type === "start" ? maskAmt(demo, totalAmt2) + " zł" : null;
      return /*#__PURE__*/React.createElement("div", {
        key: "ad-r" + idx,
        onClick: function onClick() {
          return setQuickRental(ev.r);
        },
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 0",
          borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA"),
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: 2,
          background: "#7C6AF4",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 14,
          color: dk ? "#E8F5F5" : "#1C2B3A"
        }
      }, "\uD83D\uDDD3 ", label, " \xB7 ", demo ? "Pacjent" : ev.r.patientName), ev.r.address && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, "\uD83D\uDCCD ", maskAddr(demo, ev.r.address)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, ev.r.equipment || "❓ Do ustalenia"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4
        }
      }, adSub && /*#__PURE__*/React.createElement(Badge, {
        color: isPaidEnd ? "#3DAA72" : isEndType ? "#F4A261" : "#7C6AF4"
      }, adSub), ev.r.status === "zakończone" && /*#__PURE__*/React.createElement(Badge, {
        color: "#3DAA72"
      }, "\u2705 Zwr\xF3cono")));
    }
    return null;
  }), dayTimedAll.map(function (item, idx) {
    if (item._kind === "visit") {
      var v = item.v;
      var pat = (patients || []).find(function (p) {
        return p.id === v.patientId;
      });
      var addr = (pat === null || pat === void 0 ? void 0 : pat.address) || "";
      return /*#__PURE__*/React.createElement("div", {
        key: "v" + v.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 0",
          borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA")
        }
      }, /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          return onEditVisit(v);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: 1,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#3DAA72",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 14,
          color: dk ? "#E8F5F5" : "#1C2B3A"
        }
      }, calRange(durs, "visit", v.time, v.endTime), " \xB7 ", demo ? "Pacjent" : v.patientName), addr && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, "\uD83D\uDCCD ", maskAddr(demo, addr)))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 3,
          color: dk ? "#E8F5F5" : "#1C2B3A"
        }
      }, maskAmt(demo, v.price), " z\u0142"), /*#__PURE__*/React.createElement(Badge, {
        color: visitStatus(v) === "zakończona" ? "#3DAA72" : "#3E6FB0"
      }, visitStatus(v)))));
    }
    if (item._kind === "event") return renderEvt(item.e, true);
    if (item._kind === "rental") {
      var ev = item.ev;
      var label = ev.type === "start" ? "📦 Wydanie" : ev.type === "end" ? "🔙 Zwrot" : ev.type === "plannedReturn" ? "🔙 Planowany odbiór" : ev.type === "cycle" ? "💳 Opłata cykliczna" : ev.type === "cyclePreview" ? "👀 Podgląd" : "🔄 Opłata";
      var isEndType2 = ev.type === "end" || ev.type === "plannedReturn";
      var extDue = (ev.r.extensions || []).reduce(function (s, e) {
        return s + (+e.amountDue || 0);
      }, 0);
      var totalAmt = (+ev.r.amount || 0) + extDue;
      var totalPaid = calcRentalPaid(ev.r);
      var remaining = totalAmt - totalPaid;
      var isPaidEnd2 = isEndType2 && remaining <= 0;
      // Okres cykliczny, którego termin jeszcze nie nadszedł, nie jest "zaległy" — nie ma co go pokazywać na czerwono
      var cycleFuture = ev.type === "cycle" && !ev.c.paid && !ev.c.cancelled && (ev.c.dueDate || ev.c.month + "-01") > today;
      var color = isPaidEnd2 ? "#3DAA72" : isEndType2 ? "#F4A261" : ev.type === "cycle" ? ev.c.cancelled ? "#7A8FA6" : ev.c.paid ? "#3DAA72" : cycleFuture ? "#7C6AF4" : "#E05C5C" : ev.type === "cyclePreview" ? "#7A8FA6" : "#7C6AF4";
      var endSub = remaining > 0 ? "do zap\u0142aty: ".concat(maskAmt(demo, remaining), " z\u0142") : "\u2705 Op\u0142acono: ".concat(maskAmt(demo, totalAmt), " z\u0142");
      var sub = ev.type === "cycle" ? ev.c.cancelled ? "anulowany" : ev.c.paid ? "op\u0142acono ".concat(maskAmt(demo, ev.c.amount), " z\u0142") : cycleFuture ? "zaplanowane: ".concat(maskAmt(demo, ev.c.amount), " z\u0142") : "do op\u0142acenia ".concat(maskAmt(demo, ev.c.amount), " z\u0142") : ev.type === "cyclePreview" ? "~".concat(maskAmt(demo, ev.r.amount || 0), " z\u0142") : isEndType2 ? endSub : maskAmt(demo, totalAmt) + " zł";
      var timeLabel = ev.type === "start" ? calRange(durs, "delivery", ev.r.startTime, ev.r.startUntil) : ev.type === "end" ? calRange(durs, "pickup", ev.r.endTime, ev.r.endUntil) : ev.type === "plannedReturn" ? ev.r.plannedReturnAllDay === false ? calRange(durs, "pickup", ev.r.plannedReturnTime || "10:00", ev.r.plannedReturnUntil) : "" : "";
      var icsStart = ev.type === "start" ? ev.r.startDate + "T" + (ev.r.startTime || "10:00") : ev.type === "plannedReturn" ? ev.r.plannedReturn + "T" + (ev.r.plannedReturnTime || "10:00") : ev.r.endDate + "T" + (ev.r.endTime || "10:00");
      var icsEnd = ev.type === "start" ? ev.r.startDate + "T" + (ev.r.startTime || "10:00") : ev.type === "plannedReturn" ? ev.r.plannedReturn + "T" + (ev.r.plannedReturnTime || "10:00") : ev.r.endDate + "T" + (ev.r.endTime || "10:00");
      return /*#__PURE__*/React.createElement("div", {
        key: "r" + idx,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 0",
          borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA")
        }
      }, /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          return setQuickRental(ev.r);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: 1,
          cursor: "pointer"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#7C6AF4",
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 14,
          color: dk ? "#E8F5F5" : "#1C2B3A"
        }
      }, timeLabel ? timeLabel + " · " : "", label, " \xB7 ", demo ? "Pacjent" : ev.r.patientName), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "#7A8FA6"
        }
      }, ev.r.equipment || "❓ Do ustalenia", ev.r.address ? " · 📍" + maskAddr(demo, ev.r.address) : ""))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4
        }
      }, sub && /*#__PURE__*/React.createElement(Badge, {
        color: color
      }, sub), ev.r.status === "zakończone" && /*#__PURE__*/React.createElement(Badge, {
        color: "#3DAA72"
      }, "\u2705 Zwr\xF3cono"))));
    }
    return null;
  })), quickRental && function () {
    var r = quickRental;
    var extDue = (r.extensions || []).reduce(function (s, e) {
      return s + (+e.amountDue || 0);
    }, 0);
    var totalAmt = r.renewable ? +r.amount || 0 : (+r.amount || 0) + extDue;
    var totalPaid = calcRentalPaid(r);
    var remaining = totalAmt - totalPaid;
    var statusColor = r.status === "aktywne" ? "#3DAA72" : r.status === "zakończone" ? "#7A8FA6" : "#F4A261";
    return /*#__PURE__*/React.createElement(Modal, {
      title: "Podgl\u0105d wypo\u017Cyczenia",
      onClose: function onClose() {
        return setQuickRental(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, demo ? "Pacjent" : r.patientName), /*#__PURE__*/React.createElement(Badge, {
      color: statusColor
    }, r.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: dk ? "#1A2840" : "#F7FAFC",
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15
      }
    }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, r.equipment || "❓ Do ustalenia")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, r.startDate || "—", " \u2192 ", r.endDate || "—")), r.address && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, "\uD83D\uDCCD"), /*#__PURE__*/React.createElement("a", {
      href: demo ? undefined : "https://maps.google.com/?q=" + encodeURIComponent(r.address),
      target: "_blank",
      rel: "noreferrer",
      style: {
        fontSize: 13,
        color: "#3E6FB0",
        textDecoration: "none"
      }
    }, maskAddr(demo, r.address))), r.phone && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13
      }
    }, "\uD83D\uDCDE"), /*#__PURE__*/React.createElement("a", {
      href: demo ? undefined : "tel:" + r.phone,
      style: {
        fontSize: 13,
        color: "#3E6FB0",
        textDecoration: "none",
        fontWeight: 600
      }
    }, maskPhone(demo, r.phone)))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: dk ? "#0F2020" : "#EFF6FF",
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, r.renewable ? "Stawka / mies." : "Kwota całkowita"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: dk ? "#E8F5F5" : "#1C2B3A"
      }
    }, maskAmt(demo, totalAmt), " z\u0142")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, "Wp\u0142acono"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "#3DAA72"
      }
    }, maskAmt(demo, totalPaid), " z\u0142")), !r.renewable && (remaining > 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, "Pozosta\u0142o"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "#E05C5C"
      }
    }, maskAmt(demo, remaining), " z\u0142")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: "#7A8FA6"
      }
    }, "Status"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: "#3DAA72"
      }
    }, "\u2705 Op\u0142acono w ca\u0142o\u015Bci")))), r.notes && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#7A8FA6",
        marginBottom: 12,
        padding: "8px 12px",
        background: dk ? "#1A2840" : "#F7FAFC",
        borderRadius: 10,
        whiteSpace: "pre-wrap"
      }
    }, "\uD83D\uDCDD ", maskText(demo, r.notes)), /*#__PURE__*/React.createElement(Btn, {
      style: {
        width: "100%",
        justifyContent: "center"
      },
      onClick: function onClick() {
        setQuickRental(null);
        onGoToRental(r.id);
      }
    }, "Otw\xF3rz pe\u0142ny widok \u2192"));
  }(), showEvtModal && /*#__PURE__*/React.createElement(Modal, {
    title: evtForm.editId ? "Edytuj wydarzenie" : "Nowe wydarzenie",
    onClose: function onClose() {
      return setShowEvtModal(false);
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "Tytu\u0142 *",
    value: evtForm.title,
    onChange: function onChange(v) {
      return setEvtForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          title: v
        });
      });
    },
    placeholder: "np. Konferencja, Urlop..."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Rodzaj"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [{
    v: "",
    l: "Zwykłe",
    c: "#F4A261",
    bg: "#FFF4E8"
  }, {
    v: "dzieci",
    l: "👧 Zajęcia dzieci",
    c: EVT_KID_COLOR,
    bg: "#FDEBF4"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: o.v || "zwykle",
      type: "button",
      onClick: function onClick() {
        return setEvtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            cat: o.v
          });
        });
      },
      style: {
        flex: 1,
        padding: "10px 8px",
        borderRadius: 12,
        border: "2px solid ".concat((evtForm.cat || "") === o.v ? o.c : "#D9E2F0"),
        background: (evtForm.cat || "") === o.v ? o.bg : "#fff",
        color: (evtForm.cat || "") === o.v ? o.c : "#7A8FA6",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  }))), /*#__PURE__*/React.createElement(Inp, {
    label: evtForm.repeat ? "Od dnia *" : "Data *",
    value: evtForm.date,
    onChange: function onChange(v) {
      return setEvtForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Typ"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [{
    v: false,
    l: "⏰ Z godziną"
  }, {
    v: true,
    l: "🗓 Całodniowe"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.v),
      onClick: function onClick() {
        return setEvtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            allDay: o.v
          });
        });
      },
      style: {
        flex: 1,
        padding: "10px 8px",
        borderRadius: 12,
        border: "2px solid ".concat(evtForm.allDay === o.v ? "#F4A261" : "#D9E2F0"),
        background: evtForm.allDay === o.v ? "#FFF4E8" : "#fff",
        color: evtForm.allDay === o.v ? "#F4A261" : "#7A8FA6",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  }))), !evtForm.allDay && /*#__PURE__*/React.createElement(TimeRange, {
    kind: "event",
    start: evtForm.time,
    end: evtForm.endTime,
    onChange: function onChange(t, e) {
      return setEvtForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          time: t,
          endTime: e
        });
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1.5px solid ".concat(evtForm.repeat ? EVT_KID_COLOR : "#D9E2F0"),
      background: evtForm.repeat ? dk ? "#2A1A24" : "#FFF7FB" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setEvtForm(function (f) {
        return f.repeat ? _objectSpread(_objectSpread({}, f), {}, {
          repeat: false
        }) : _objectSpread(_objectSpread({}, f), {}, {
          repeat: true,
          days: f.days.length ? f.days : evtIsDate(f.date) ? [new Date(f.date + "T12:00:00").getDay()] : []
        });
      });
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 14,
      fontWeight: 700,
      color: evtForm.repeat ? EVT_KID_COLOR : "#7A8FA6"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      border: "2px solid ".concat(evtForm.repeat ? EVT_KID_COLOR : "#B8C6D9"),
      background: evtForm.repeat ? EVT_KID_COLOR : "transparent",
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      lineHeight: 1
    }
  }, evtForm.repeat ? "✓" : ""), "\uD83D\uDD01 Powtarzaj co tydzie\u0144"), evtForm.repeat && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      marginBottom: 12
    }
  }, EVT_DAYS.map(function (o) {
    var on = evtForm.days.includes(o.d);
    return /*#__PURE__*/React.createElement("button", {
      key: o.d,
      type: "button",
      onClick: function onClick() {
        return setEvtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            days: f.days.includes(o.d) ? f.days.filter(function (x) {
              return x !== o.d;
            }) : [].concat(_toConsumableArray(f.days), [o.d])
          });
        });
      },
      style: {
        flex: 1,
        padding: "9px 0",
        borderRadius: 10,
        border: "1.5px solid ".concat(on ? EVT_KID_COLOR : "#D9E2F0"),
        background: on ? EVT_KID_COLOR : "#fff",
        color: on ? "#fff" : "#7A8FA6",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  })), /*#__PURE__*/React.createElement(Inp, {
    label: "Powtarzaj do dnia (puste = bez ko\u0144ca)",
    value: evtForm.until || "",
    onChange: function onChange(v) {
      return setEvtForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          until: v
        });
      });
    },
    type: "date"
  }), evtForm.skip.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#7A8FA6",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: .5
    }
  }, "Pomini\u0119te dni"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, _toConsumableArray(evtForm.skip).sort().map(function (d) {
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      type: "button",
      title: "Przywr\xF3\u0107 ten dzie\u0144",
      onClick: function onClick() {
        return setEvtForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            skip: f.skip.filter(function (x) {
              return x !== d;
            })
          });
        });
      },
      style: {
        background: "#EFF3FA",
        border: "none",
        borderRadius: 8,
        padding: "5px 9px",
        fontSize: 12,
        color: "#3E5578",
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, cpmDate(d), " \xD7");
  }))))), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatka",
    value: evtForm.notes || "",
    onChange: function onChange(v) {
      return setEvtForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2,
    placeholder: "Opcjonalnie..."
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Adres",
    value: evtForm.address || "",
    onChange: function onChange(v) {
      return setEvtForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          address: v
        });
      });
    },
    placeholder: "Opcjonalnie..."
  }), /*#__PURE__*/React.createElement(Btn, {
    disabled: !evtForm.title.trim() || !evtForm.date || evtForm.repeat && evtForm.days.length === 0,
    style: {
      width: "100%",
      justifyContent: "center"
    },
    onClick: saveEvt
  }, evtForm.editId ? "Zapisz zmiany" : "Dodaj wydarzenie"), evtForm.editId && evtForm.repeat && /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      width: "100%",
      justifyContent: "center",
      marginTop: 10
    },
    onClick: function onClick() {
      if (!window.confirm("Usunąć całą serię wydarzeń (wszystkie dni)?")) return;
      setEvents(function (es) {
        return (es || []).filter(function (e) {
          return !e || e.id !== evtForm.editId;
        });
      });
      setShowEvtModal(false);
    }
  }, "\uD83D\uDDD1 Usu\u0144 ca\u0142\u0105 seri\u0119")));
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard(_ref3) {
  var visits = _ref3.visits,
    setVisits = _ref3.setVisits,
    rentals = _ref3.rentals,
    setRentals = _ref3.setRentals,
    finances = _ref3.finances,
    setFinances = _ref3.setFinances,
    patients = _ref3.patients,
    allClients = _ref3.allClients,
    goToRental = _ref3.goToRental,
    onAddRental = _ref3.onAddRental,
    nfzCases = _ref3.nfzCases,
    goToWozki = _ref3.goToWozki,
    todos = _ref3.todos,
    setTodos = _ref3.setTodos,
    events = _ref3.events,
    setEvents = _ref3.setEvents,
    stock = _ref3.stock,
    machines = _ref3.machines,
    goToMagazyn = _ref3.goToMagazyn;
  var demo = useDemo();
  var today = todayLocal();
  var dk = useContext(DarkCtx);
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showAdd = _useState12[0],
    setShowAdd = _useState12[1];
  var _useState13 = useState(emptyVisit),
    _useState14 = _slicedToArray(_useState13, 2),
    vf = _useState14[0],
    setVf = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    editV = _useState16[0],
    setEditV = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    confirmDel = _useState18[0],
    setConfirmDel = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    toast = _useState20[0],
    setToast = _useState20[1];
  var todayV = visits.filter(function (v) {
    return v.date === today;
  }).sort(function (a, b) {
    return (a.time || "").localeCompare(b.time || "");
  });
  var reservedRentals = rentals.filter(function (r) {
    return r.status === "aktywne" && r.reserved;
  }).sort(function (a, b) {
    return (a.startDate || "9999").localeCompare(b.startDate || "9999");
  });
  var upcoming = useMemo(function () {
    var planned = rentals.filter(function (r) {
      return r.status === "aktywne" && r.plannedReturn && !r.reserved;
    }).map(function (r) {
      return {
        kind: "return",
        r: r,
        date: r.plannedReturn
      };
    });
    var szyny = rentals.filter(function (r) {
      return r.status === "aktywne" && r.endDate && !r.renewable && !r.reserved && !r.plannedReturn;
    }).map(function (r) {
      return {
        kind: "szyny",
        r: r,
        date: r.endDate
      };
    });
    var cykle = rentals.filter(function (r) {
      return r.status === "aktywne" && r.renewable && !r.reserved && !r.plannedReturn;
    }).map(function (r) {
      return {
        kind: "cykl",
        r: r,
        date: nextCycleEnd(r, today).date
      };
    }).filter(function (x) {
      return x.date;
    });
    return [].concat(_toConsumableArray(planned), _toConsumableArray(szyny), _toConsumableArray(cykle)).sort(function (a, b) {
      return a.date.localeCompare(b.date);
    }).slice(0, 10);
  }, [rentals, today]);
  var overdueCycles = useMemo(function () {
    var list = [];
    rentals.forEach(function (r) {
      if (r.status !== "aktywne" || !r.renewable || r.reserved) return;
      (r.cycles || []).forEach(function (c) {
        if (c.paid || c.cancelled) return;
        var due = c.dueDate || c.month + "-01";
        if (due < today) list.push({
          r: r,
          c: c,
          amount: +c.amount || 0
        });
      });
    });
    return list;
  }, [rentals, today]);
  var wózkiReminders = useMemo(function () {
    if (!nfzCases) return [];
    return nfzCases.filter(function (cas) {
      if (!cas.orderDate) return false;
      var nd = nextOrderDate(cas);
      if (!nd) return false;
      var dl = dateDiff(today, nd);
      return dl <= 14;
    }).sort(function (a, b) {
      return nextOrderDate(a).localeCompare(nextOrderDate(b));
    });
  }, [nfzCases, today]);
  var birthdayReminders = useMemo(function () {
    return (patients || []).filter(function (p) {
      if (!p.birthday || p.archived) return false;
      var mmdd = p.birthday.length === 5 ? p.birthday : p.birthday.slice(5);
      var b = new Date(todayLocal().slice(0, 4) + "-" + mmdd + "T12:00:00");
      var t = new Date(todayLocal() + "T12:00:00");
      if (b < t) b.setFullYear(b.getFullYear() + 1);
      return Math.round((b - t) / 86400000) <= 7;
    }).map(function (p) {
      var mmdd = p.birthday.length === 5 ? p.birthday : p.birthday.slice(5);
      var b = new Date(todayLocal().slice(0, 4) + "-" + mmdd + "T12:00:00");
      var t = new Date(todayLocal() + "T12:00:00");
      if (b < t) b.setFullYear(b.getFullYear() + 1);
      var days = Math.round((b - t) / 86400000);
      var hasYear = p.birthday.length === 10;
      var age = hasYear ? +todayLocal().slice(0, 4) - +p.birthday.slice(0, 4) - (mmdd < todayLocal().slice(5) ? 0 : mmdd === todayLocal().slice(5) ? 0 : 1) : null;
      return _objectSpread(_objectSpread({}, p), {}, {
        _days: days,
        _age: age
      });
    }).sort(function (a, b) {
      return a._days - b._days;
    });
  }, [patients, today]);
  var syncFinance = function syncFinance(v) {
    var isNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (v.skipFinance) return;
    var done = v.status === "zakończona" || new Date(v.date + "T" + (v.time || "00:00") + ":00") <= new Date();
    if (!done) return;
    var sid = "visit-" + v.id;
    setFinances(function (fs) {
      var exists = fs.some(function (f) {
        return f.sourceId === sid;
      });
      if (isNew && !exists) return [{
        id: Date.now() + Math.random(),
        sourceId: sid,
        date: v.date,
        type: "przychód",
        category: "Wizyta",
        amount: v.price || 0,
        description: "Wizyta – " + v.patientName
      }].concat(_toConsumableArray(fs));
      if (!isNew && exists) return fs.map(function (f) {
        return f.sourceId === sid ? _objectSpread(_objectSpread({}, f), {}, {
          amount: v.price,
          description: "Wizyta – " + v.patientName,
          date: v.date
        }) : f;
      });
      if (!isNew && !exists) return [{
        id: Date.now() + Math.random(),
        sourceId: sid,
        date: v.date,
        type: "przychód",
        category: "Wizyta",
        amount: v.price || 0,
        description: "Wizyta – " + v.patientName
      }].concat(_toConsumableArray(fs));
      return fs;
    });
  };
  var saveNew = function saveNew() {
    if (!vf.patientName) return;
    var pat = patients.find(function (p) {
      return p.name === vf.patientName;
    });
    var nv = _objectSpread(_objectSpread({
      id: Date.now()
    }, vf), {}, {
      price: +vf.price,
      patientId: (pat === null || pat === void 0 ? void 0 : pat.id) || null
    });
    setVisits(function (vs) {
      return [].concat(_toConsumableArray(vs), [nv]);
    });
    syncFinance(nv, true);
    setShowAdd(false);
    setVf(emptyVisit());
    setToast("Wizyta zapisana");
  };
  var saveEdit = function saveEdit() {
    if (!editV) return;
    var u = _objectSpread(_objectSpread({}, editV), {}, {
      price: +editV.price
    });
    if (u.id) {
      setVisits(function (vs) {
        return vs.map(function (v) {
          return v.id === u.id ? _objectSpread(_objectSpread({}, v), u) : v;
        });
      });
    } else {
      // stara wizyta bez id — dopasuj po date+time+patientName
      setVisits(function (vs) {
        return vs.map(function (v) {
          return !v.id && v.date === u.date && v.time === u.time && v.patientName === u.patientName ? _objectSpread(_objectSpread({}, v), u) : v;
        });
      });
    }
    syncFinance(u, false);
    setEditV(null);
    setToast("Zmiany zapisane");
  };
  var delVisit = function delVisit(id) {
    if (id && id !== "__DEL__") {
      setVisits(function (vs) {
        return vs.filter(function (v) {
          return v.id !== id;
        });
      });
      setFinances(function (fs) {
        return fs.filter(function (f) {
          return f.sourceId !== "visit-" + id;
        });
      });
    } else if (editV) {
      var date = editV.date,
        time = editV.time,
        patientName = editV.patientName;
      setVisits(function (vs) {
        return vs.filter(function (v) {
          return !(v.date === date && v.time === time && v.patientName === patientName);
        });
      });
    }
    setConfirmDel(null);
    setEditV(null);
  };
  var _useState21 = useState(""),
    _useState22 = _slicedToArray(_useState21, 2),
    searchQ = _useState22[0],
    setSearchQ = _useState22[1];
  var searchResults = useMemo(function () {
    var q = (searchQ || "").trim().toLowerCase();
    if (q.length < 2) return null;
    var res = [];
    var patByName = Object.fromEntries((allClients || patients || []).map(function (p) {
      return [p.name, p];
    }));
    // wizyty
    visits.filter(function (v) {
      var pat = patByName[v.patientName] || {};
      return (v.patientName || "").toLowerCase().includes(q) || (v.notes || "").toLowerCase().includes(q) || (v.type || "").toLowerCase().includes(q) || (pat.phone || "").replace(/\s/g, "").includes(q.replace(/\s/g, ""));
    }).slice(0, 5).forEach(function (v) {
      var pat = patByName[v.patientName] || {};
      res.push({
        kind: "visit",
        label: "Wizyta",
        title: (v.allDay ? "🗓 " : "⏰ ") + (v.time ? v.time + " · " : "") + (demo ? "Pacjent" : v.patientName),
        sub: v.date + " · " + v.type + (v.price ? " · " + maskAmt(demo, v.price) + " zł" : "") + (pat.phone ? " · 📞 " + maskPhone(demo, pat.phone) : ""),
        item: v
      });
    });
    // wypożyczenia
    rentals.filter(function (r) {
      return (r.patientName || "").toLowerCase().includes(q) || (r.equipment || "").toLowerCase().includes(q) || (r.address || "").toLowerCase().includes(q) || (r.phone || "").replace(/\s/g, "").includes(q.replace(/\s/g, ""));
    }).slice(0, 5).forEach(function (r) {
      return res.push({
        kind: "rental",
        label: "Sprzęt",
        title: "📦 " + (demo ? "Pacjent" : r.patientName) + " – " + (r.equipment || "Do ustalenia"),
        sub: r.startDate + (r.endDate ? " → " + r.endDate : "") + " · " + (r.status || "") + (r.phone ? " · 📞 " + maskPhone(demo, r.phone) : ""),
        item: r
      });
    });
    // pacjenci
    (allClients || patients || []).filter(function (p) {
      return (p.name || "").toLowerCase().includes(q) || (p.phone || "").replace(/\s/g, "").includes(q.replace(/\s/g, "")) || (p.address || "").toLowerCase().includes(q);
    }).slice(0, 3).forEach(function (p) {
      return res.push({
        kind: "patient",
        label: "Klient",
        title: "👤 " + (demo ? "Klient" : p.name),
        sub: (p.phone ? "📞 " + maskPhone(demo, p.phone) : "") + (p.address ? " · " + maskAddr(demo, p.address) : ""),
        item: p
      });
    });
    // wydarzenia
    events.filter(function (e) {
      return (e.title || "").toLowerCase().includes(q) || (e.notes || "").toLowerCase().includes(q);
    }).slice(0, 3).forEach(function (e) {
      return res.push({
        kind: "event",
        label: "Wydarzenie",
        title: "📌 " + (demo ? "Wydarzenie" : e.title),
        sub: e.date + (e.time ? " · " + e.time : ""),
        item: e
      });
    });
    return res;
  }, [searchQ, visits, rentals, patients, events, demo]);
  var _useState23 = useState(""),
    _useState24 = _slicedToArray(_useState23, 2),
    todoInput = _useState24[0],
    setTodoInput = _useState24[1];
  var _useState25 = useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    todoOpen = _useState26[0],
    setTodoOpen = _useState26[1];
  var _useState27 = useState(null),
    _useState28 = _slicedToArray(_useState27, 2),
    editTodoId = _useState28[0],
    setEditTodoId = _useState28[1];
  var _useState29 = useState(""),
    _useState30 = _slicedToArray(_useState29, 2),
    editTodoText = _useState30[0],
    setEditTodoText = _useState30[1];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 20px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      textTransform: "capitalize"
    }
  }, new Date(today + "T12:00:00").toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 24,
      fontWeight: 800
    }
  }, dk ? "🌙 Cześć, Patryk" : "Cześć, Patryk"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "#3E6FB0",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(ClockDisplay, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: searchQ,
    onChange: function onChange(e) {
      return setSearchQ(e.target.value);
    },
    placeholder: "\uD83D\uDD0D Szukaj wizyt, sprz\u0119tu, pacjent\xF3w...",
    style: {
      width: "100%",
      boxSizing: "border-box",
      padding: "10px 14px",
      borderRadius: 12,
      border: "1.5px solid " + (dk ? "#2A3A56" : "#D9E2F0"),
      background: dk ? "#18202F" : "#F4F7FC",
      fontSize: 14,
      color: dk ? "#E0F0F0" : "#1A2E35",
      fontFamily: "inherit",
      outline: "none"
    }
  }), searchQ && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setSearchQ("");
    },
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      fontSize: 16,
      cursor: "pointer",
      color: "#7A8FA6"
    }
  }, "\u2715")), searchResults && searchResults.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 4px",
      fontSize: 13,
      color: "#7A8FA6"
    }
  }, "Brak wynik\xF3w"), searchResults && searchResults.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 12,
      boxShadow: dk ? "0 4px 20px rgba(0,0,0,.3)" : "0 4px 20px rgba(16,40,40,.1)",
      marginTop: 6,
      overflow: "hidden"
    }
  }, searchResults.map(function (r, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: function onClick() {
        if (r.kind === "rental") goToRental(r.item.id);else if (r.kind === "visit") setEditV(r.item);
        setSearchQ("");
      },
      style: {
        padding: "10px 14px",
        borderBottom: i < searchResults.length - 1 ? "1px solid " + (dk ? "#2A3A56" : "#F0F4F8") : "none",
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
        fontWeight: 700,
        color: "#3E6FB0",
        background: "#E1E9F5",
        padding: "2px 6px",
        borderRadius: 6
      }
    }, r.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: dk ? "#E0F0F0" : "#1A2E35"
      }
    }, r.title)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#7A8FA6",
        marginTop: 2
      }
    }, r.sub));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: dk ? "#18202F" : "#fff",
      borderRadius: 16,
      boxShadow: dk ? "0 2px 14px rgba(0,0,0,.22)" : "0 2px 14px rgba(16,40,40,.06)",
      overflow: "hidden",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setTodoOpen(function (o) {
        return !o;
      });
    },
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 0
    }
  }, "Do zrobienia"), (todos || []).filter(function (t) {
    return !t.done;
  }).length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#3E6FB0",
      color: "#fff",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      padding: "1px 7px"
    }
  }, (todos || []).filter(function (t) {
    return !t.done;
  }).length)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "#7A8FA6"
    }
  }, todoOpen ? "▲" : "▼")), todoOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA"),
      padding: "10px 16px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: todoInput,
    onChange: function onChange(e) {
      return setTodoInput(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === "Enter" && todoInput.trim()) {
        setTodos(function (ts) {
          return [].concat(_toConsumableArray(ts || []), [{
            id: Date.now(),
            text: todoInput.trim(),
            done: false
          }]);
        });
        setTodoInput("");
      }
    },
    placeholder: "Wpisz zadanie i naci\u015Bnij Enter...",
    style: {
      flex: 1,
      padding: "9px 12px",
      border: "1.5px solid ".concat(dk ? "#2A3A56" : "#D9E2F0"),
      borderRadius: 10,
      fontSize: 14,
      outline: "none",
      background: dk ? "#111826" : "#FAFCFD",
      color: dk ? "#E8F5F5" : "#1C2B3A",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (todoInput.trim()) {
        setTodos(function (ts) {
          return [].concat(_toConsumableArray(ts || []), [{
            id: Date.now(),
            text: todoInput.trim(),
            done: false
          }]);
        });
        setTodoInput("");
      }
    },
    style: {
      background: "#3E6FB0",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "9px 14px",
      fontSize: 18,
      cursor: "pointer",
      lineHeight: 1
    }
  }, "+")), (todos || []).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "#7A8FA6",
      textAlign: "center",
      padding: "8px 0"
    }
  }, "Brak zada\u0144"), (todos || []).map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 0",
        borderBottom: "1px solid ".concat(dk ? "#2A3A56" : "#EFF3FA")
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return setTodos(function (ts) {
          return (ts || []).map(function (x) {
            return x.id === t.id ? _objectSpread(_objectSpread({}, x), {}, {
              done: !x.done
            }) : x;
          });
        });
      },
      style: {
        width: 20,
        height: 20,
        borderRadius: 6,
        border: "2px solid ".concat(t.done ? "#3DAA72" : "#D9E2F0"),
        background: t.done ? "#3DAA72" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: "pointer"
      }
    }, t.done && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 12
      }
    }, "\u2713")), editTodoId === t.id ? /*#__PURE__*/React.createElement("input", {
      autoFocus: true,
      value: editTodoText,
      onChange: function onChange(e) {
        return setEditTodoText(e.target.value);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === "Enter" && editTodoText.trim()) {
          setTodos(function (ts) {
            return (ts || []).map(function (x) {
              return x.id === t.id ? _objectSpread(_objectSpread({}, x), {}, {
                text: editTodoText.trim()
              }) : x;
            });
          });
          setEditTodoId(null);
        }
        if (e.key === "Escape") setEditTodoId(null);
      },
      onBlur: function onBlur() {
        if (editTodoText.trim()) setTodos(function (ts) {
          return (ts || []).map(function (x) {
            return x.id === t.id ? _objectSpread(_objectSpread({}, x), {}, {
              text: editTodoText.trim()
            }) : x;
          });
        });
        setEditTodoId(null);
      },
      style: {
        flex: 1,
        padding: "4px 8px",
        border: "1.5px solid #3E6FB0",
        borderRadius: 8,
        fontSize: 14,
        outline: "none",
        background: dk ? "#111826" : "#FAFCFD",
        color: dk ? "#E8F5F5" : "#1C2B3A",
        fontFamily: "inherit"
      }
    }) : /*#__PURE__*/React.createElement("span", {
      onDoubleClick: function onDoubleClick() {
        setEditTodoId(t.id);
        setEditTodoText(t.text);
      },
      style: {
        flex: 1,
        fontSize: 14,
        color: t.done ? "#7A8FA6" : dk ? "#E8F5F5" : "#1C2B3A",
        textDecoration: t.done ? "line-through" : "none",
        cursor: "text"
      }
    }, maskText(demo, t.text)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setTodos(function (ts) {
          return (ts || []).filter(function (x) {
            return x.id !== t.id;
          });
        });
      },
      style: {
        background: "none",
        border: "none",
        color: "#7A8FA6",
        fontSize: 16,
        cursor: "pointer",
        padding: "0 2px",
        lineHeight: 1
      }
    }, "\xD7"));
  }), (todos || []).some(function (t) {
    return t.done;
  }) && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setTodos(function (ts) {
        return (ts || []).filter(function (x) {
          return !x.done;
        });
      });
    },
    style: {
      background: "none",
      border: "none",
      fontSize: 12,
      color: "#7A8FA6",
      cursor: "pointer",
      fontFamily: "inherit",
      padding: "8px 0 0",
      fontWeight: 600
    }
  }, "Usu\u0144 uko\u0144czone")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, function () {
    // Sprzęt: otwarte uwagi (np. "wymienić rzepy") i serwis po terminie albo wkrótce — z zakładki Magazyn
    var att = whAttention(stock, machines, today, getActiveEquipmentNames(stock));
    if (att.issues.length === 0 && att.due.length === 0) return null;
    var n = att.issues.length,
      pl = n === 1 ? "uwaga" : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14) ? "uwagi" : "uwag";
    var parts = [n > 0 ? n + " " + pl + " do załatwienia" : "", att.due.length > 0 ? "serwis: " + att.due.length : ""].filter(Boolean).join(" · ");
    return /*#__PURE__*/React.createElement(Card, {
      onClick: function onClick() {
        return goToMagazyn && goToMagazyn();
      },
      style: {
        padding: "12px 16px",
        marginBottom: 12,
        background: dk ? "#3A2A14" : "#FDF0E3",
        border: "1.5px solid #F4A26140"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: dk ? "#F4C48A" : "#B8691A"
      }
    }, "\uD83D\uDD27 Sprz\u0119t: ", parts), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 12,
        color: dk ? "#F4C48A" : "#B8691A",
        whiteSpace: "nowrap"
      }
    }, "Magazyn \u203A")));
  }(), overdueCycles.length > 0 && /*#__PURE__*/React.createElement(Card, {
    onClick: function onClick() {
      return goToRental(overdueCycles[0].r.id);
    },
    style: {
      padding: "12px 16px",
      marginBottom: 12,
      background: "#FEE2E2",
      border: "1.5px solid #E05C5C30"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "#E05C5C"
    }
  }, "\u26A0\uFE0F Zaleg\u0142e op\u0142aty cykliczne: ", overdueCycles.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "#E05C5C"
    }
  }, demo ? "****" : overdueCycles.reduce(function (s, x) {
    return s + x.amount;
  }, 0) + " zł"))), /*#__PURE__*/React.createElement(MiniCalendar, {
    visits: visits,
    rentals: rentals,
    today: today,
    events: events,
    setEvents: setEvents,
    patients: patients,
    onEditVisit: function onEditVisit(v) {
      return setEditV(_objectSpread(_objectSpread({}, v), {}, {
        price: String(v.price)
      }));
    },
    onAddVisit: function onAddVisit(date) {
      setVf(_objectSpread(_objectSpread({}, emptyVisit()), {}, {
        date: date
      }));
      setShowAdd(true);
    },
    onGoToRental: goToRental,
    onAddRental: onAddRental
  }), (upcoming.length > 0 || wózkiReminders.length > 0 || birthdayReminders.length > 0 || reservedRentals.length > 0) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Syne',sans-serif",
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 10,
      marginTop: 8
    }
  }, "Nadchodz\u0105ce"), reservedRentals.map(function (r) {
    var startDl = r.startDate ? dateDiff(today, r.startDate) : null;
    var waitDays = r.reservedAt ? dateDiff(r.reservedAt, today) : 0;
    return /*#__PURE__*/React.createElement(Card, {
      key: "res-" + r.id,
      onClick: function onClick() {
        return goToRental(r.id);
      },
      style: {
        padding: "9px 14px",
        marginBottom: 6,
        borderLeft: "3px solid #7C6AF4"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, "\uD83D\uDCCB ", r.equipment || "❓ Do ustalenia"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, " \xB7 ", demo ? "Pacjent" : r.patientName, r.startDate ? " · od " + r.startDate : "")), /*#__PURE__*/React.createElement(Badge, {
      color: startDl !== null ? startDl < 0 ? "#E05C5C" : startDl === 0 ? "#F4A261" : "#7C6AF4" : "#F4A261"
    }, startDl !== null ? startDl < 0 ? Math.abs(startDl) + "d po term." : startDl === 0 ? "Dziś!" : "za " + startDl + "d" : "czeka " + waitDays + "d")));
  }), birthdayReminders.map(function (p) {
    return /*#__PURE__*/React.createElement(Card, {
      key: "bd-" + p.id,
      style: {
        padding: "9px 14px",
        marginBottom: 6,
        background: "#FFF5F0",
        border: "1.5px solid #F4A26130"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, "\uD83C\uDF82 ", demo ? "Pacjent" : p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, " \xB7 ", demo ? "••••••" : /*#__PURE__*/React.createElement(React.Fragment, null, p._age, " lat \xB7 ", p.birthday.slice(5).split("-").reverse().join(".")))), /*#__PURE__*/React.createElement(Badge, {
      color: p._days === 0 ? "#F4A261" : p._days <= 3 ? "#F4A261" : "#3DAA72"
    }, p._days === 0 ? "Dziś!" : p._days === 1 ? "Jutro" : "Za " + p._days + " dni")));
  }), upcoming.map(function (_ref4) {
    var kind = _ref4.kind,
      r = _ref4.r,
      date = _ref4.date;
    var d = dateDiff(today, date);
    var extDue = (r.extensions || []).reduce(function (s, e) {
      return s + (+e.amountDue || 0);
    }, 0);
    var totalAmt = (+r.amount || 0) + extDue;
    var totalPaid = calcRentalPaid(r);
    var remaining = r.renewable ? (r.cycles || []).filter(function (c) {
      return !c.paid && !c.cancelled;
    }).reduce(function (s, c) {
      return s + (+c.amount || 0);
    }, 0) : totalAmt - totalPaid;
    var icon = kind === "return" ? "🔙 " : kind === "cykl" ? "🔁 " : "";
    return /*#__PURE__*/React.createElement(Card, {
      key: kind + "-" + r.id,
      onClick: function onClick() {
        return goToRental(r.id);
      },
      style: _objectSpread({
        padding: "9px 14px",
        marginBottom: 6
      }, kind !== "szyny" ? {
        borderLeft: "3px solid #7C6AF4"
      } : {})
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, icon, r.equipment || "❓ Do ustalenia"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, " \xB7 ", demo ? "Pacjent" : r.patientName, " \xB7 ", date)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      color: d < 0 ? "#E05C5C" : d === 0 ? "#F4A261" : d < 7 ? "#F4A261" : "#3DAA72"
    }, d < 0 ? Math.abs(d) + "d po term." : d === 0 ? "Dziś!" : d + "d"), remaining > 0 ? /*#__PURE__*/React.createElement(Badge, {
      color: "#E05C5C"
    }, demo ? "****" : remaining + " zł") : /*#__PURE__*/React.createElement(Badge, {
      color: "#3DAA72"
    }, demo ? "****" : "✅"))));
  }), wózkiReminders.map(function (cas) {
    var nd = nextOrderDate(cas);
    var dl = dateDiff(today, nd);
    return /*#__PURE__*/React.createElement(Card, {
      key: cas.id,
      onClick: function onClick() {
        return goToWozki(cas.id);
      },
      style: {
        padding: "9px 14px",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, "\uD83E\uDDBD ", demo ? "Pacjent" : cas.patientName), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "#7A8FA6"
      }
    }, " \xB7 ", cas.hasDisabilityCert ? "Z orzeczeniem" : "Bez orzeczenia", " \xB7 kolejne od ", nd)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#1C2B3A"
      }
    }, dl <= 0 ? "można złożyć" : "za " + dl + "d")));
  })))), showAdd && /*#__PURE__*/React.createElement(Modal, {
    title: "Nowa wizyta",
    onClose: function onClose() {
      return setShowAdd(false);
    }
  }, /*#__PURE__*/React.createElement(PatientPicker, {
    label: "Pacjent *",
    value: vf.patientName,
    onChange: function onChange(v) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          patientName: v
        });
      });
    },
    onSelect: function onSelect(p) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          patientName: p.name,
          patientId: p.id,
          price: p.defaultPrice ? String(p.defaultPrice) : f.price
        });
      });
    },
    patients: allClients || patients
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Data",
    value: vf.date,
    onChange: function onChange(v) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), !vf.allDay && /*#__PURE__*/React.createElement(TimeRange, {
    kind: "visit",
    start: vf.time,
    end: vf.endTime,
    onChange: function onChange(t, e) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          time: t,
          endTime: e
        });
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [{
    v: false,
    l: "⏰ Z godziną"
  }, {
    v: true,
    l: "🗓 Całodniowe"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.v),
      onClick: function onClick() {
        return setVf(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            allDay: o.v
          });
        });
      },
      style: {
        flex: 1,
        padding: "8px",
        borderRadius: 10,
        border: "2px solid ".concat((vf.allDay || false) === o.v ? "#3E6FB0" : "#D9E2F0"),
        background: (vf.allDay || false) === o.v ? "#E1E9F5" : "#fff",
        color: (vf.allDay || false) === o.v ? "#3E6FB0" : "#7A8FA6",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  }))), /*#__PURE__*/React.createElement(Sel, {
    label: "Typ",
    value: vf.type,
    onChange: function onChange(v) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          type: v
        });
      });
    },
    options: VISIT_TYPES.map(function (x) {
      return {
        value: x,
        label: x
      };
    })
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Cena (z\u0142)",
    value: vf.price,
    onChange: function onChange(v) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          price: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Status",
    value: vf.status,
    onChange: function onChange(v) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          status: v
        });
      });
    },
    options: [{
      value: "zaplanowana",
      label: "📅 Zaplanowana"
    }, {
      value: "zakończona",
      label: "✅ Zakończona"
    }]
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatka",
    value: vf.notes || "",
    onChange: function onChange(v) {
      return setVf(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2,
    placeholder: "Przebieg wizyty, zalecenia..."
  }), /*#__PURE__*/React.createElement(Btn, {
    onClick: saveNew,
    disabled: !vf.patientName,
    style: {
      width: "100%",
      justifyContent: "center"
    }
  }, "Zapisz wizyt\u0119")), editV && /*#__PURE__*/React.createElement(Modal, {
    title: "Edytuj wizyt\u0119",
    onClose: function onClose() {
      return setEditV(null);
    }
  }, /*#__PURE__*/React.createElement(Inp, {
    label: "Data",
    value: editV.date,
    onChange: function onChange(v) {
      return setEditV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          date: v
        });
      });
    },
    type: "date"
  }), !editV.allDay && /*#__PURE__*/React.createElement(TimeRange, {
    kind: "visit",
    start: editV.time,
    end: editV.endTime,
    onChange: function onChange(t, e) {
      return setEditV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          time: t,
          endTime: e
        });
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, [{
    v: false,
    l: "⏰ Z godziną"
  }, {
    v: true,
    l: "🗓 Całodniowe"
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: String(o.v),
      onClick: function onClick() {
        return setEditV(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, {
            allDay: o.v
          });
        });
      },
      style: {
        flex: 1,
        padding: "8px",
        borderRadius: 10,
        border: "2px solid ".concat((editV.allDay || false) === o.v ? "#3E6FB0" : "#D9E2F0"),
        background: (editV.allDay || false) === o.v ? "#E1E9F5" : "#fff",
        color: (editV.allDay || false) === o.v ? "#3E6FB0" : "#7A8FA6",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "inherit"
      }
    }, o.l);
  }))), /*#__PURE__*/React.createElement(Sel, {
    label: "Typ",
    value: editV.type,
    onChange: function onChange(v) {
      return setEditV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          type: v
        });
      });
    },
    options: VISIT_TYPES.map(function (x) {
      return {
        value: x,
        label: x
      };
    })
  }), /*#__PURE__*/React.createElement(Inp, {
    label: "Cena (z\u0142)",
    value: editV.price,
    onChange: function onChange(v) {
      return setEditV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          price: v
        });
      });
    },
    type: "number"
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Status",
    value: editV.status || "zaplanowana",
    onChange: function onChange(v) {
      return setEditV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          status: v
        });
      });
    },
    options: [{
      value: "zaplanowana",
      label: "📅 Zaplanowana"
    }, {
      value: "zakończona",
      label: "✅ Zakończona"
    }]
  }), /*#__PURE__*/React.createElement(Txa, {
    label: "Notatka",
    value: editV.notes || "",
    onChange: function onChange(v) {
      return setEditV(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          notes: v
        });
      });
    },
    rows: 2,
    placeholder: "Przebieg wizyty, zalecenia..."
  }), "          ", /*#__PURE__*/React.createElement(Btn, {
    onClick: saveEdit,
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    }
  }, "Zapisz zmiany"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      width: "100%",
      justifyContent: "center",
      marginBottom: 8
    },
    onClick: function onClick() {
      setVf(_objectSpread(_objectSpread({}, editV), {}, {
        id: undefined,
        date: todayLocal(),
        status: "zaplanowana",
        price: String(editV.price)
      }));
      setEditV(null);
      setShowAdd(true);
    }
  }, "\uD83D\uDCCB Powiel wizyt\u0119"), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    onClick: function onClick() {
      return setConfirmDel(editV.id || "__DEL__");
    },
    style: {
      width: "100%",
      justifyContent: "center"
    }
  }, "\uD83D\uDDD1\uFE0F Usu\u0144 wizyt\u0119")), confirmDel && /*#__PURE__*/React.createElement(Modal, {
    title: "Usu\u0144 wizyt\u0119",
    onClose: function onClose() {
      return setConfirmDel(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      marginBottom: 20
    }
  }, "Na pewno usun\u0105\u0107 t\u0119 wizyt\u0119?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: function onClick() {
      return setConfirmDel(null);
    }
  }, "Anuluj"), /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    style: {
      flex: 1,
      justifyContent: "center"
    },
    onClick: function onClick() {
      return delVisit(confirmDel);
    }
  }, "Usu\u0144"))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast,
    onDone: function onDone() {
      return setToast(null);
    }
  }));
}
