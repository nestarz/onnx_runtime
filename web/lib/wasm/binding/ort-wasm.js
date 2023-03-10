import "https://deno.land/x/xhr@0.1.0/mod.ts";

var ortWasm = (() => {
  var _scriptDir = import.meta.url;

  return function (ortWasm) {
    ortWasm = ortWasm || {};

    var b;
    b || (b = typeof ortWasm !== "undefined" ? ortWasm : {});
    var aa, k;
    b.ready = new Promise(function (a, c) {
      aa = a;
      k = c;
    });
    var ba = Object.assign({}, b),
      p = "./this.program",
      ca = "object" == typeof window,
      t = "function" == typeof importScripts,
      u =
        "object" == typeof process &&
        "object" == typeof process.versions &&
        "string" == typeof process.versions.node,
      x = "",
      y,
      A,
      B,
      fs,
      C,
      D;
    if (u)
      (x = t ? require("path").dirname(x) + "/" : __dirname + "/"),
        (D = () => {
          C || ((fs = require("fs")), (C = require("path")));
        }),
        (y = function (a, c) {
          D();
          a = C.normalize(a);
          return fs.readFileSync(a, c ? void 0 : "utf8");
        }),
        (B = (a) => {
          a = y(a, !0);
          a.buffer || (a = new Uint8Array(a));
          return a;
        }),
        (A = (a, c, e) => {
          D();
          a = C.normalize(a);
          fs.readFile(a, function (f, g) {
            f ? e(f) : c(g.buffer);
          });
        }),
        1 < process.argv.length && (p = process.argv[1].replace(/\\/g, "/")),
        process.argv.slice(2),
        process.on("uncaughtException", function (a) {
          throw a;
        }),
        process.on("unhandledRejection", function (a) {
          throw a;
        }),
        (b.inspect = function () {
          return "[Emscripten Module object]";
        });
    else if (ca || t)
      t
        ? (x = self.location.href)
        : "undefined" != typeof document &&
          document.currentScript &&
          (x = document.currentScript.src),
        _scriptDir && (x = _scriptDir),
        0 !== x.indexOf("blob:")
          ? (x = x.substr(0, x.replace(/[?#].*/, "").lastIndexOf("/") + 1))
          : (x = ""),
        (y = (a) => {
          var c = new XMLHttpRequest();
          c.open("GET", a, !1);
          c.send(null);
          return c.responseText;
        }),
        t &&
          (B = (a) => {
            var c = new XMLHttpRequest();
            c.open("GET", a, !1);
            c.responseType = "arraybuffer";
            c.send(null);
            return new Uint8Array(c.response);
          }),
        (A = (a, c, e) => {
          var f = new XMLHttpRequest();
          f.open("GET", a, !0);
          f.responseType = "arraybuffer";
          f.onload = () => {
            200 == f.status || (0 == f.status && f.response)
              ? c(f.response)
              : e();
          };
          f.onerror = e;
          f.send(null);
        });
    var da = b.print || console.log.bind(console),
      E = b.printErr || console.warn.bind(console);
    Object.assign(b, ba);
    ba = null;
    b.thisProgram && (p = b.thisProgram);
    var F;
    b.wasmBinary && (F = b.wasmBinary);
    var noExitRuntime = b.noExitRuntime || !1;
    "object" != typeof WebAssembly && G("no native wasm support detected");
    var H,
      ea = !1,
      fa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function ha(a, c, e) {
      c >>>= 0;
      var f = c + e;
      for (e = c; a[e] && !(e >= f); ) ++e;
      if (16 < e - c && a.buffer && fa) return fa.decode(a.subarray(c, e));
      for (f = ""; c < e; ) {
        var g = a[c++];
        if (g & 128) {
          var h = a[c++] & 63;
          if (192 == (g & 224)) f += String.fromCharCode(((g & 31) << 6) | h);
          else {
            var l = a[c++] & 63;
            g =
              224 == (g & 240)
                ? ((g & 15) << 12) | (h << 6) | l
                : ((g & 7) << 18) | (h << 12) | (l << 6) | (a[c++] & 63);
            65536 > g
              ? (f += String.fromCharCode(g))
              : ((g -= 65536),
                (f += String.fromCharCode(
                  55296 | (g >> 10),
                  56320 | (g & 1023)
                )));
          }
        } else f += String.fromCharCode(g);
      }
      return f;
    }
    function I(a, c) {
      return (a >>>= 0) ? ha(J, a, c) : "";
    }
    function K(a, c, e, f) {
      e >>>= 0;
      if (!(0 < f)) return 0;
      var g = e;
      f = e + f - 1;
      for (var h = 0; h < a.length; ++h) {
        var l = a.charCodeAt(h);
        if (55296 <= l && 57343 >= l) {
          var q = a.charCodeAt(++h);
          l = (65536 + ((l & 1023) << 10)) | (q & 1023);
        }
        if (127 >= l) {
          if (e >= f) break;
          c[e++ >>> 0] = l;
        } else {
          if (2047 >= l) {
            if (e + 1 >= f) break;
            c[e++ >>> 0] = 192 | (l >> 6);
          } else {
            if (65535 >= l) {
              if (e + 2 >= f) break;
              c[e++ >>> 0] = 224 | (l >> 12);
            } else {
              if (e + 3 >= f) break;
              c[e++ >>> 0] = 240 | (l >> 18);
              c[e++ >>> 0] = 128 | ((l >> 12) & 63);
            }
            c[e++ >>> 0] = 128 | ((l >> 6) & 63);
          }
          c[e++ >>> 0] = 128 | (l & 63);
        }
      }
      c[e >>> 0] = 0;
      return e - g;
    }
    function L(a) {
      for (var c = 0, e = 0; e < a.length; ++e) {
        var f = a.charCodeAt(e);
        127 >= f
          ? c++
          : 2047 >= f
          ? (c += 2)
          : 55296 <= f && 57343 >= f
          ? ((c += 4), ++e)
          : (c += 3);
      }
      return c;
    }
    var ia, M, J, N, O;
    function ja() {
      var a = H.buffer;
      ia = a;
      b.HEAP8 = M = new Int8Array(a);
      b.HEAP16 = new Int16Array(a);
      b.HEAP32 = N = new Int32Array(a);
      b.HEAPU8 = J = new Uint8Array(a);
      b.HEAPU16 = new Uint16Array(a);
      b.HEAPU32 = O = new Uint32Array(a);
      b.HEAPF32 = new Float32Array(a);
      b.HEAPF64 = new Float64Array(a);
    }
    var ka = [],
      la = [],
      ma = [];
    function na() {
      var a = b.preRun.shift();
      ka.unshift(a);
    }
    var P = 0,
      Q = null,
      R = null;
    function G(a) {
      if (b.onAbort) b.onAbort(a);
      a = "Aborted(" + a + ")";
      E(a);
      ea = !0;
      a = new WebAssembly.RuntimeError(
        a + ". Build with -sASSERTIONS for more info."
      );
      k(a);
      throw a;
    }
    function oa() {
      return S.startsWith("data:application/octet-stream;base64,");
    }
    var S;
    if (b.locateFile) {
      if (((S = "ort-wasm.wasm"), !oa())) {
        var pa = S;
        S = b.locateFile ? b.locateFile(pa, x) : x + pa;
      }
    } else S = new URL("ort-wasm.wasm", import.meta.url).toString();
    function qa() {
      var a = S;
      try {
        if (a == S && F) return new Uint8Array(F);
        if (B) return B(a);
        throw "both async and sync fetching of the wasm failed";
      } catch (c) {
        G(c);
      }
    }
    function ra() {
      if (!F && (ca || t)) {
        if ("function" == typeof fetch && !S.startsWith("file://"))
          return console.log(S) ?? fetch(S, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + S + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return qa();
            });
        if (A)
          return new Promise(function (a, c) {
            A(
              S,
              function (e) {
                a(new Uint8Array(e));
              },
              c
            );
          });
      }
      return Promise.resolve().then(function () {
        return qa();
      });
    }
    function T(a) {
      for (; 0 < a.length; ) a.shift()(b);
    }
    function sa(a) {
      this.ra = a - 24;
      this.Ga = function (c) {
        O[((this.ra + 4) >> 2) >>> 0] = c;
      };
      this.za = function (c) {
        O[((this.ra + 8) >> 2) >>> 0] = c;
      };
      this.Aa = function () {
        N[(this.ra >> 2) >>> 0] = 0;
      };
      this.ya = function () {
        M[((this.ra + 12) >> 0) >>> 0] = 0;
      };
      this.Fa = function () {
        M[((this.ra + 13) >> 0) >>> 0] = 0;
      };
      this.wa = function (c, e) {
        this.xa();
        this.Ga(c);
        this.za(e);
        this.Aa();
        this.ya();
        this.Fa();
      };
      this.xa = function () {
        O[((this.ra + 16) >> 2) >>> 0] = 0;
      };
    }
    var ta = 0;
    function xa(a) {
      var c = L(a) + 1,
        e = U(c);
      e && K(a, M, e, c);
      return e;
    }
    function ya(a, c, e) {
      function f(w) {
        return (w = w.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? w[1] : "GMT";
      }
      var g = new Date().getFullYear(),
        h = new Date(g, 0, 1),
        l = new Date(g, 6, 1);
      g = h.getTimezoneOffset();
      var q = l.getTimezoneOffset();
      N[(a >> 2) >>> 0] = 60 * Math.max(g, q);
      N[(c >> 2) >>> 0] = Number(g != q);
      a = f(h);
      c = f(l);
      a = xa(a);
      c = xa(c);
      q < g
        ? ((O[(e >> 2) >>> 0] = a), (O[((e + 4) >> 2) >>> 0] = c))
        : ((O[(e >> 2) >>> 0] = c), (O[((e + 4) >> 2) >>> 0] = a));
    }
    function V(a, c, e) {
      V.va || ((V.va = !0), ya(a, c, e));
    }
    var W = {};
    function za() {
      if (!X) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" == typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: p || "./this.program",
          },
          c;
        for (c in W) void 0 === W[c] ? delete a[c] : (a[c] = W[c]);
        var e = [];
        for (c in a) e.push(c + "=" + a[c]);
        X = e;
      }
      return X;
    }
    var X,
      Aa = [null, [], []];
    function Y(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    var Ba = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Ca = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Da(a) {
      var c = Array(L(a) + 1);
      K(a, c, 0, c.length);
      return c;
    }
    function Ea(a, c, e, f) {
      function g(d, m, n) {
        for (d = "number" == typeof d ? d.toString() : d || ""; d.length < m; )
          d = n[0] + d;
        return d;
      }
      function h(d, m) {
        return g(d, m, "0");
      }
      function l(d, m) {
        function n(ua) {
          return 0 > ua ? -1 : 0 < ua ? 1 : 0;
        }
        var z;
        0 === (z = n(d.getFullYear() - m.getFullYear())) &&
          0 === (z = n(d.getMonth() - m.getMonth())) &&
          (z = n(d.getDate() - m.getDate()));
        return z;
      }
      function q(d) {
        switch (d.getDay()) {
          case 0:
            return new Date(d.getFullYear() - 1, 11, 29);
          case 1:
            return d;
          case 2:
            return new Date(d.getFullYear(), 0, 3);
          case 3:
            return new Date(d.getFullYear(), 0, 2);
          case 4:
            return new Date(d.getFullYear(), 0, 1);
          case 5:
            return new Date(d.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(d.getFullYear() - 1, 11, 30);
        }
      }
      function w(d) {
        var m = d.pa;
        for (d = new Date(new Date(d.qa + 1900, 0, 1).getTime()); 0 < m; ) {
          var n = d.getMonth(),
            z = (Y(d.getFullYear()) ? Ba : Ca)[n];
          if (m > z - d.getDate())
            (m -= z - d.getDate() + 1),
              d.setDate(1),
              11 > n
                ? d.setMonth(n + 1)
                : (d.setMonth(0), d.setFullYear(d.getFullYear() + 1));
          else {
            d.setDate(d.getDate() + m);
            break;
          }
        }
        n = new Date(d.getFullYear() + 1, 0, 4);
        m = q(new Date(d.getFullYear(), 0, 4));
        n = q(n);
        return 0 >= l(m, d)
          ? 0 >= l(n, d)
            ? d.getFullYear() + 1
            : d.getFullYear()
          : d.getFullYear() - 1;
      }
      var v = N[((f + 40) >> 2) >>> 0];
      f = {
        Da: N[(f >> 2) >>> 0],
        Ca: N[((f + 4) >> 2) >>> 0],
        sa: N[((f + 8) >> 2) >>> 0],
        ua: N[((f + 12) >> 2) >>> 0],
        ta: N[((f + 16) >> 2) >>> 0],
        qa: N[((f + 20) >> 2) >>> 0],
        ka: N[((f + 24) >> 2) >>> 0],
        pa: N[((f + 28) >> 2) >>> 0],
        Ha: N[((f + 32) >> 2) >>> 0],
        Ba: N[((f + 36) >> 2) >>> 0],
        Ea: v ? I(v) : "",
      };
      e = I(e);
      v = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var r in v) e = e.replace(new RegExp(r, "g"), v[r]);
      var va = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        wa =
          "January February March April May June July August September October November December".split(
            " "
          );
      v = {
        "%a": function (d) {
          return va[d.ka].substring(0, 3);
        },
        "%A": function (d) {
          return va[d.ka];
        },
        "%b": function (d) {
          return wa[d.ta].substring(0, 3);
        },
        "%B": function (d) {
          return wa[d.ta];
        },
        "%C": function (d) {
          return h(((d.qa + 1900) / 100) | 0, 2);
        },
        "%d": function (d) {
          return h(d.ua, 2);
        },
        "%e": function (d) {
          return g(d.ua, 2, " ");
        },
        "%g": function (d) {
          return w(d).toString().substring(2);
        },
        "%G": function (d) {
          return w(d);
        },
        "%H": function (d) {
          return h(d.sa, 2);
        },
        "%I": function (d) {
          d = d.sa;
          0 == d ? (d = 12) : 12 < d && (d -= 12);
          return h(d, 2);
        },
        "%j": function (d) {
          for (
            var m = 0, n = 0;
            n <= d.ta - 1;
            m += (Y(d.qa + 1900) ? Ba : Ca)[n++]
          );
          return h(d.ua + m, 3);
        },
        "%m": function (d) {
          return h(d.ta + 1, 2);
        },
        "%M": function (d) {
          return h(d.Ca, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (d) {
          return 0 <= d.sa && 12 > d.sa ? "AM" : "PM";
        },
        "%S": function (d) {
          return h(d.Da, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (d) {
          return d.ka || 7;
        },
        "%U": function (d) {
          return h(Math.floor((d.pa + 7 - d.ka) / 7), 2);
        },
        "%V": function (d) {
          var m = Math.floor((d.pa + 7 - ((d.ka + 6) % 7)) / 7);
          2 >= (d.ka + 371 - d.pa - 2) % 7 && m++;
          if (m)
            53 == m &&
              ((n = (d.ka + 371 - d.pa) % 7),
              4 == n || (3 == n && Y(d.qa)) || (m = 1));
          else {
            m = 52;
            var n = (d.ka + 7 - d.pa - 1) % 7;
            (4 == n || (5 == n && Y((d.qa % 400) - 1))) && m++;
          }
          return h(m, 2);
        },
        "%w": function (d) {
          return d.ka;
        },
        "%W": function (d) {
          return h(Math.floor((d.pa + 7 - ((d.ka + 6) % 7)) / 7), 2);
        },
        "%y": function (d) {
          return (d.qa + 1900).toString().substring(2);
        },
        "%Y": function (d) {
          return d.qa + 1900;
        },
        "%z": function (d) {
          d = d.Ba;
          var m = 0 <= d;
          d = Math.abs(d) / 60;
          return (
            (m ? "+" : "-") +
            String("0000" + ((d / 60) * 100 + (d % 60))).slice(-4)
          );
        },
        "%Z": function (d) {
          return d.Ea;
        },
        "%%": function () {
          return "%";
        },
      };
      e = e.replace(/%%/g, "\x00\x00");
      for (r in v)
        e.includes(r) && (e = e.replace(new RegExp(r, "g"), v[r](f)));
      e = e.replace(/\0\0/g, "%");
      r = Da(e);
      if (r.length > c) return 0;
      M.set(r, a >>> 0);
      return r.length - 1;
    }
    var Fa = {
      a: function (a) {
        return U(a + 24) + 24;
      },
      b: function (a, c, e) {
        new sa(a).wa(c, e);
        ta++;
        throw a;
      },
      g: function () {
        return 0;
      },
      J: function () {},
      w: function () {},
      z: function () {},
      r: function () {
        return 0;
      },
      H: function () {},
      C: function () {},
      G: function () {},
      j: function () {},
      y: function () {},
      u: function () {},
      I: function () {},
      v: function () {},
      n: function () {},
      p: function () {
        G(
          "To use dlopen, you need enable dynamic linking, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      },
      o: function () {
        G(
          "To use dlopen, you need enable dynamic linking, see https://github.com/emscripten-core/emscripten/wiki/Linking"
        );
      },
      k: function () {
        return Date.now();
      },
      K: function () {
        return !0;
      },
      L: function (a, c) {
        a = new Date(1e3 * (O[a >>> 2] + 4294967296 * N[(a + 4) >>> 2]));
        N[(c >> 2) >>> 0] = a.getUTCSeconds();
        N[((c + 4) >> 2) >>> 0] = a.getUTCMinutes();
        N[((c + 8) >> 2) >>> 0] = a.getUTCHours();
        N[((c + 12) >> 2) >>> 0] = a.getUTCDate();
        N[((c + 16) >> 2) >>> 0] = a.getUTCMonth();
        N[((c + 20) >> 2) >>> 0] = a.getUTCFullYear() - 1900;
        N[((c + 24) >> 2) >>> 0] = a.getUTCDay();
        N[((c + 28) >> 2) >>> 0] =
          ((a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
            864e5) |
          0;
      },
      M: function (a, c) {
        a = new Date(1e3 * (O[a >>> 2] + 4294967296 * N[(a + 4) >>> 2]));
        N[(c >> 2) >>> 0] = a.getSeconds();
        N[((c + 4) >> 2) >>> 0] = a.getMinutes();
        N[((c + 8) >> 2) >>> 0] = a.getHours();
        N[((c + 12) >> 2) >>> 0] = a.getDate();
        N[((c + 16) >> 2) >>> 0] = a.getMonth();
        N[((c + 20) >> 2) >>> 0] = a.getFullYear() - 1900;
        N[((c + 24) >> 2) >>> 0] = a.getDay();
        var e = new Date(a.getFullYear(), 0, 1);
        N[((c + 28) >> 2) >>> 0] = ((a.getTime() - e.getTime()) / 864e5) | 0;
        N[((c + 36) >> 2) >>> 0] = -(60 * a.getTimezoneOffset());
        var f = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
        e = e.getTimezoneOffset();
        N[((c + 32) >> 2) >>> 0] =
          (f != e && a.getTimezoneOffset() == Math.min(e, f)) | 0;
      },
      l: function (a) {
        var c = new Date(
            N[((a + 20) >> 2) >>> 0] + 1900,
            N[((a + 16) >> 2) >>> 0],
            N[((a + 12) >> 2) >>> 0],
            N[((a + 8) >> 2) >>> 0],
            N[((a + 4) >> 2) >>> 0],
            N[(a >> 2) >>> 0],
            0
          ),
          e = N[((a + 32) >> 2) >>> 0],
          f = c.getTimezoneOffset(),
          g = new Date(c.getFullYear(), 0, 1),
          h = new Date(c.getFullYear(), 6, 1).getTimezoneOffset(),
          l = g.getTimezoneOffset(),
          q = Math.min(l, h);
        0 > e
          ? (N[((a + 32) >> 2) >>> 0] = Number(h != l && q == f))
          : 0 < e != (q == f) &&
            ((h = Math.max(l, h)),
            c.setTime(c.getTime() + 6e4 * ((0 < e ? q : h) - f)));
        N[((a + 24) >> 2) >>> 0] = c.getDay();
        N[((a + 28) >> 2) >>> 0] = ((c.getTime() - g.getTime()) / 864e5) | 0;
        N[(a >> 2) >>> 0] = c.getSeconds();
        N[((a + 4) >> 2) >>> 0] = c.getMinutes();
        N[((a + 8) >> 2) >>> 0] = c.getHours();
        N[((a + 12) >> 2) >>> 0] = c.getDate();
        N[((a + 16) >> 2) >>> 0] = c.getMonth();
        return (c.getTime() / 1e3) | 0;
      },
      A: function () {
        return -52;
      },
      B: function () {},
      m: V,
      d: function () {
        G("");
      },
      s: function () {
        return 4294901760;
      },
      h: u
        ? () => {
            var a = process.hrtime();
            return 1e3 * a[0] + a[1] / 1e6;
          }
        : () => performance.now(),
      F: function (a, c, e) {
        J.copyWithin(a >>> 0, c >>> 0, (c + e) >>> 0);
      },
      f: function (a) {
        var c = J.length;
        a >>>= 0;
        if (4294901760 < a) return !1;
        for (var e = 1; 4 >= e; e *= 2) {
          var f = c * (1 + 0.2 / e);
          f = Math.min(f, a + 100663296);
          var g = Math;
          f = Math.max(a, f);
          g = g.min.call(g, 4294901760, f + ((65536 - (f % 65536)) % 65536));
          a: {
            try {
              H.grow((g - ia.byteLength + 65535) >>> 16);
              ja();
              var h = 1;
              break a;
            } catch (l) {}
            h = void 0;
          }
          if (h) return !0;
        }
        return !1;
      },
      D: function (a, c) {
        var e = 0;
        za().forEach(function (f, g) {
          var h = c + e;
          g = O[((a + 4 * g) >> 2) >>> 0] = h;
          for (h = 0; h < f.length; ++h) M[(g++ >> 0) >>> 0] = f.charCodeAt(h);
          M[(g >> 0) >>> 0] = 0;
          e += f.length + 1;
        });
        return 0;
      },
      E: function (a, c) {
        var e = za();
        O[(a >> 2) >>> 0] = e.length;
        var f = 0;
        e.forEach(function (g) {
          f += g.length + 1;
        });
        O[(c >> 2) >>> 0] = f;
        return 0;
      },
      e: function () {
        return 52;
      },
      i: function () {
        return 52;
      },
      q: function () {
        return 70;
      },
      t: function (a, c, e, f) {
        for (var g = 0, h = 0; h < e; h++) {
          var l = O[(c >> 2) >>> 0],
            q = O[((c + 4) >> 2) >>> 0];
          c += 8;
          for (var w = 0; w < q; w++) {
            var v = J[(l + w) >>> 0],
              r = Aa[a];
            0 === v || 10 === v
              ? ((1 === a ? da : E)(ha(r, 0)), (r.length = 0))
              : r.push(v);
          }
          g += q;
        }
        O[(f >> 2) >>> 0] = g;
        return 0;
      },
      x: Ea,
      c: function (a, c, e, f) {
        return Ea(a, c, e, f);
      },
    };
    (function () {
      function a(g) {
        b.asm = g.exports;
        H = b.asm.N;
        ja();
        la.unshift(b.asm.O);
        P--;
        b.monitorRunDependencies && b.monitorRunDependencies(P);
        0 == P &&
          (null !== Q && (clearInterval(Q), (Q = null)),
          R && ((g = R), (R = null), g()));
      }
      function c(g) {
        a(g.instance);
      }
      function e(g) {
        return ra()
          .then(function (h) {
            return WebAssembly.instantiate(h, f);
          })
          .then(function (h) {
            return h;
          })
          .then(g, function (h) {
            E("failed to asynchronously prepare wasm: " + h);
            G(h);
          });
      }
      var f = { a: Fa };
      P++;
      b.monitorRunDependencies && b.monitorRunDependencies(P);
      if (b.instantiateWasm)
        try {
          return b.instantiateWasm(f, a);
        } catch (g) {
          return (
            E("Module.instantiateWasm callback failed with error: " + g), !1
          );
        }
      (function () {
        return F ||
          "function" != typeof WebAssembly.instantiateStreaming ||
          oa() ||
          S.startsWith("file://") ||
          u ||
          "function" != typeof fetch
          ? e(c)
          : fetch(S, { credentials: "same-origin" }).then(function (g) {
              return WebAssembly.instantiateStreaming(g, f).then(
                c,
                function (h) {
                  E("wasm streaming compile failed: " + h);
                  E("falling back to ArrayBuffer instantiation");
                  return e(c);
                }
              );
            });
      })().catch(k);
      return {};
    })();
    b.___wasm_call_ctors = function () {
      return (b.___wasm_call_ctors = b.asm.O).apply(null, arguments);
    };
    b._OrtInit = function () {
      return (b._OrtInit = b.asm.P).apply(null, arguments);
    };
    b._OrtCreateSessionOptions = function () {
      return (b._OrtCreateSessionOptions = b.asm.Q).apply(null, arguments);
    };
    b._OrtAppendExecutionProvider = function () {
      return (b._OrtAppendExecutionProvider = b.asm.R).apply(null, arguments);
    };
    b._OrtAddSessionConfigEntry = function () {
      return (b._OrtAddSessionConfigEntry = b.asm.S).apply(null, arguments);
    };
    b._OrtReleaseSessionOptions = function () {
      return (b._OrtReleaseSessionOptions = b.asm.T).apply(null, arguments);
    };
    b._OrtCreateSession = function () {
      return (b._OrtCreateSession = b.asm.U).apply(null, arguments);
    };
    b._OrtReleaseSession = function () {
      return (b._OrtReleaseSession = b.asm.V).apply(null, arguments);
    };
    b._OrtGetInputCount = function () {
      return (b._OrtGetInputCount = b.asm.W).apply(null, arguments);
    };
    b._OrtGetOutputCount = function () {
      return (b._OrtGetOutputCount = b.asm.X).apply(null, arguments);
    };
    b._OrtGetInputName = function () {
      return (b._OrtGetInputName = b.asm.Y).apply(null, arguments);
    };
    b._OrtGetOutputName = function () {
      return (b._OrtGetOutputName = b.asm.Z).apply(null, arguments);
    };
    b._OrtFree = function () {
      return (b._OrtFree = b.asm._).apply(null, arguments);
    };
    b._OrtCreateTensor = function () {
      return (b._OrtCreateTensor = b.asm.$).apply(null, arguments);
    };
    b._OrtGetTensorData = function () {
      return (b._OrtGetTensorData = b.asm.aa).apply(null, arguments);
    };
    b._OrtReleaseTensor = function () {
      return (b._OrtReleaseTensor = b.asm.ba).apply(null, arguments);
    };
    b._OrtCreateRunOptions = function () {
      return (b._OrtCreateRunOptions = b.asm.ca).apply(null, arguments);
    };
    b._OrtAddRunConfigEntry = function () {
      return (b._OrtAddRunConfigEntry = b.asm.da).apply(null, arguments);
    };
    b._OrtReleaseRunOptions = function () {
      return (b._OrtReleaseRunOptions = b.asm.ea).apply(null, arguments);
    };
    b._OrtRun = function () {
      return (b._OrtRun = b.asm.fa).apply(null, arguments);
    };
    b._OrtEndProfiling = function () {
      return (b._OrtEndProfiling = b.asm.ga).apply(null, arguments);
    };
    var U = (b._malloc = function () {
      return (U = b._malloc = b.asm.ha).apply(null, arguments);
    });
    b._free = function () {
      return (b._free = b.asm.ia).apply(null, arguments);
    };
    b._fflush = function () {
      return (b._fflush = b.asm.ja).apply(null, arguments);
    };
    var Ga = (b.stackSave = function () {
        return (Ga = b.stackSave = b.asm.la).apply(null, arguments);
      }),
      Ha = (b.stackRestore = function () {
        return (Ha = b.stackRestore = b.asm.ma).apply(null, arguments);
      }),
      Ia = (b.stackAlloc = function () {
        return (Ia = b.stackAlloc = b.asm.na).apply(null, arguments);
      });
    b.___cxa_is_pointer_type = function () {
      return (b.___cxa_is_pointer_type = b.asm.oa).apply(null, arguments);
    };
    b.UTF8ToString = I;
    b.stringToUTF8 = function (a, c, e) {
      return K(a, J, c, e);
    };
    b.lengthBytesUTF8 = L;
    b.stackSave = Ga;
    b.stackRestore = Ha;
    b.stackAlloc = Ia;
    var Z;
    R = function Ja() {
      Z || Ka();
      Z || (R = Ja);
    };
    function Ka() {
      function a() {
        if (!Z && ((Z = !0), (b.calledRun = !0), !ea)) {
          T(la);
          aa(b);
          if (b.onRuntimeInitialized) b.onRuntimeInitialized();
          if (b.postRun)
            for (
              "function" == typeof b.postRun && (b.postRun = [b.postRun]);
              b.postRun.length;

            ) {
              var c = b.postRun.shift();
              ma.unshift(c);
            }
          T(ma);
        }
      }
      if (!(0 < P)) {
        if (b.preRun)
          for (
            "function" == typeof b.preRun && (b.preRun = [b.preRun]);
            b.preRun.length;

          )
            na();
        T(ka);
        0 < P ||
          (b.setStatus
            ? (b.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  b.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    if (b.preInit)
      for (
        "function" == typeof b.preInit && (b.preInit = [b.preInit]);
        0 < b.preInit.length;

      )
        b.preInit.pop()();
    Ka();

    return ortWasm.ready;
  };
})();
export default ortWasm;
