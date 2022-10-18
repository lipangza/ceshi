!function() {
    "use strict";
    var t = function(t, e, n) {
        var a = t[e];
        return function() {
            for (var e = [], r = arguments.length; r--; )
                e[r] = arguments[r];
            return n.apply(null, e),
            a.apply(t, e)
        }
    }
      , e = function() {
        var t = window.doNotTrack
          , e = window.navigator
          , n = window.external
          , a = "msTrackingProtectionEnabled"
          , r = t || e.doNotTrack || e.msDoNotTrack || n && a in n && n[a]();
        return "1" == r || "yes" === r
    };
    !function(n) {
        var a = n.screen
          , r = a.width
          , i = a.height
          , o = n.navigator.language
          , c = n.location
          , s = c.hostname
          , u = c.pathname
          , l = c.search
          , d = n.localStorage
          , f = n.sessionStorage
          , p = n.document
          , v = n.history
          , m = p.querySelector("script[data-website-id]");
        if (m) {
            var h, g = m.getAttribute.bind(m), w = g("data-website-id"), y = g("data-host-url"), b = "false" !== g("data-auto-track"), S = g("data-do-not-track"), k = g("data-cache"), E = g("data-domains") || "", T = E.split(",").map((function(t) {
                return t.trim()
            }
            )), j = /^umami--([a-z]+)--([\w]+[\w-]*)$/, q = "[class*='umami--']", A = "umami.cache", L = function() {
                return d && d.getItem("umami.disabled") || S && e() || E && !T.includes(s)
            }, N = y ? (h = y) && h.length > 1 && h.endsWith("/") ? h.slice(0, -1) : h : m.src.split("/").slice(0, -1).join("/"), O = r + "x" + i, I = {}, x = "" + u + l, H = p.referrer, M = function(t, e, n) {
                if (!L()) {
                    var a = {
                        website: n,
                        hostname: s,
                        screen: O,
                        language: o,
                        cache: k && f.getItem(A)
                    };
                    Object.keys(e).forEach((function(t) {
                        a[t] = e[t]
                    }
                    )),
                    function(t, e, n) {
                        var a = new XMLHttpRequest;
                        a.open("POST", t, !0),
                        a.setRequestHeader("Content-Type", "application/json"),
                        a.onreadystatechange = function() {
                            4 === a.readyState && n(a.response)
                        }
                        ,
                        a.send(JSON.stringify(e))
                    }(N + "api/collect", {
                        type: t,
                        payload: a
                    }, (function(t) {
                        return k && f.setItem(A, t)
                    }
                    ))
                }
            }, P = function(t, e, n) {
                void 0 === t && (t = x),
                void 0 === e && (e = H),
                void 0 === n && (n = w),
                M("pageview", {
                    url: t,
                    referrer: e
                }, n)
            }, R = function(t, e, n, a) {
                void 0 === e && (e = "custom"),
                void 0 === n && (n = x),
                void 0 === a && (a = w),
                M("event", {
                    event_type: e,
                    event_value: t,
                    url: n
                }, a)
            }, _ = function(t) {
                var e = t.querySelectorAll(q);
                Array.prototype.forEach.call(e, z)
            }, z = function(t) {
                (t.getAttribute("class") || "").split(" ").forEach((function(e) {
                    if (j.test(e)) {
                        var n = e.split("--")
                          , a = n[1]
                          , r = n[2]
                          , i = I[e] ? I[e] : I[e] = function() {
                            return R(r, a)
                        }
                        ;
                        t.addEventListener(a, i, !0)
                    }
                }
                ))
            }, C = function(t) {
                t.forEach((function(t) {
                    var e = t.target;
                    z(e),
                    _(e)
                }
                ))
            }, D = function(t, e, n) {
                if (n) {
                    H = x;
                    var a = n.toString();
                    (x = "http" === a.substring(0, 4) ? "/" + a.split("/").splice(3).join("/") : a) !== H && P()
                }
            };
            if (!n.umami) {
                var J = function(t) {
                    return R(t)
                };
                J.trackView = P,
                J.trackEvent = R,
                n.umami = J
            }
            if (b && !L()) {
                v.pushState = t(v, "pushState", D),
                v.replaceState = t(v, "replaceState", D);
                var V = function() {
                    "complete" === p.readyState && (_(p),
                    P(),
                    new MutationObserver(C).observe(p, {
                        childList: !0,
                        subtree: !0
                    }))
                };
                p.addEventListener("readystatechange", V, !0),
                V()
            }
        }
    }(window)
}();
