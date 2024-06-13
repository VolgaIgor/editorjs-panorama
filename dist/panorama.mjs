(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('.panorama-tool{--bg-color: #cdd1e0;--front-color: #388ae5;--border-color: #e8e8eb}.panorama-tool__image{border-radius:3px;overflow:hidden;margin-bottom:10px}.panorama-tool__image-picture{max-width:100%;vertical-align:bottom;display:block}.panorama-tool__image-preloader{width:50px;height:50px;border-radius:50%;background-size:cover;margin:auto;position:relative;background-color:var(--bg-color);background-position:center center}.panorama-tool__image-preloader:after{content:"";position:absolute;z-index:3;width:60px;height:60px;border-radius:50%;border:2px solid var(--bg-color);border-top-color:var(--front-color);left:50%;top:50%;margin-top:-30px;margin-left:-30px;animation:image-preloader-spin 2s infinite linear;box-sizing:border-box}.panorama-tool__caption[contentEditable=true][data-placeholder]:before{position:absolute!important;content:attr(data-placeholder);color:#707684;font-weight:400;display:none}.panorama-tool__caption[contentEditable=true][data-placeholder]:empty:before{display:block}.panorama-tool__caption[contentEditable=true][data-placeholder]:empty:focus:before{display:none}.panorama-tool--empty .panorama-tool__image,.panorama-tool--empty .panorama-tool__caption,.panorama-tool--loading .panorama-tool__caption{display:none}.panorama-tool .cdx-button{display:flex;align-items:center;justify-content:center}.panorama-tool .cdx-button svg{height:auto;margin:0 6px 0 0}.panorama-tool--filled .cdx-button,.panorama-tool--filled .panorama-tool__image-preloader{display:none}.panorama-tool--loading .panorama-tool__image{min-height:200px;display:flex;border:1px solid var(--border-color);background-color:#fff}.panorama-tool--loading .panorama-tool__image-picture,.panorama-tool--loading .cdx-button{display:none}.panorama-tool--stretched .panorama-tool__image-picture{width:100%}@keyframes image-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')),document.head.appendChild(o)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
const I = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"/></svg>', R = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>';
function O(S, a = null, i = {}) {
  const c = document.createElement(S);
  Array.isArray(a) ? c.classList.add(...a) : a && c.classList.add(a);
  for (const r in i)
    c[r] = i[r];
  return c;
}
class C {
  /**
   * @param {object} ui - image tool Ui module
   * @param {object} ui.api - Editor.js API
   * @param {ImageConfig} ui.config - user config
   * @param {Function} ui.onSelectFile - callback for clicks on Select file button
   * @param {boolean} ui.readOnly - read-only mode flag
   */
  constructor({ api: a, config: i, onSelectFile: c, readOnly: r }) {
    this.api = a, this.config = i, this.onSelectFile = c, this.readOnly = r, this.nodes = {
      wrapper: O("div", [this.CSS.baseClass, this.CSS.wrapper]),
      imageContainer: O("div", [this.CSS.imageContainer]),
      fileButton: this.createFileButton(),
      imageEl: void 0,
      imagePreloader: O("div", this.CSS.imagePreloader),
      caption: O("div", [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly
      })
    }, this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder, this.nodes.imageContainer.appendChild(this.nodes.imagePreloader), this.nodes.wrapper.appendChild(this.nodes.imageContainer), this.nodes.wrapper.appendChild(this.nodes.caption), this.nodes.wrapper.appendChild(this.nodes.fileButton);
  }
  /**
   * CSS classes
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,
      /**
       * Tool's classes
       */
      wrapper: "panorama-tool",
      imageContainer: "panorama-tool__image",
      imagePreloader: "panorama-tool__image-preloader",
      imageEl: "panorama-tool__image-picture",
      caption: "panorama-tool__caption"
    };
  }
  /**
   * Ui statuses:
   * - empty
   * - uploading
   * - filled
   *
   * @returns {{EMPTY: string, UPLOADING: string, FILLED: string}}
   */
  static get status() {
    return {
      EMPTY: "empty",
      UPLOADING: "loading",
      FILLED: "filled"
    };
  }
  /**
   * Renders tool UI
   *
   * @param {ImageToolData} toolData - saved tool data
   * @returns {Element}
   */
  render(a) {
    return !a.file || Object.keys(a.file).length === 0 ? this.toggleStatus(C.status.EMPTY) : this.toggleStatus(C.status.UPLOADING), this.nodes.wrapper;
  }
  /**
   * Creates upload-file button
   *
   * @returns {Element}
   */
  createFileButton() {
    const a = O("div", [this.CSS.button]);
    return a.innerHTML = this.config.buttonContent || `${I} ${this.api.i18n.t("Select an Image")}`, a.addEventListener("click", () => {
      this.onSelectFile();
    }), a;
  }
  /**
   * Shows uploading preloader
   *
   * @param {string} src - preview source
   * @returns {void}
   */
  showPreloader(a) {
    this.nodes.imagePreloader.style.backgroundImage = `url(${a})`, this.toggleStatus(C.status.UPLOADING);
  }
  /**
   * Hide uploading preloader
   *
   * @returns {void}
   */
  hidePreloader() {
    this.nodes.imagePreloader.style.backgroundImage = "", this.toggleStatus(C.status.EMPTY);
  }
  /**
   * Shows an image
   *
   * @param {string} url - image source
   * @returns {void}
   */
  fillImage(a) {
    const i = /\.mp4$/.test(a) ? "VIDEO" : "IMG", c = {
      src: a
    };
    let r = "load";
    i === "VIDEO" && (c.autoplay = !0, c.loop = !0, c.muted = !0, c.playsinline = !0, r = "loadeddata"), this.nodes.imageEl = O(i, this.CSS.imageEl, c), this.nodes.imageEl.addEventListener(r, () => {
      this.toggleStatus(C.status.FILLED), this.nodes.imagePreloader && (this.nodes.imagePreloader.style.backgroundImage = "");
    }), this.nodes.imageContainer.appendChild(this.nodes.imageEl);
  }
  /**
   * Shows caption input
   *
   * @param {string} text - caption text
   * @returns {void}
   */
  fillCaption(a) {
    this.nodes.caption && (this.nodes.caption.innerHTML = a);
  }
  /**
   * Changes UI status
   *
   * @param {string} status - see {@link Ui.status} constants
   * @returns {void}
   */
  toggleStatus(a) {
    for (const i in C.status)
      Object.prototype.hasOwnProperty.call(C.status, i) && this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${C.status[i]}`, a === C.status[i]);
  }
  /**
   * Apply visual representation of activated tune
   *
   * @param {string} tuneName - one of available tunes {@link Tunes.tunes}
   * @param {boolean} status - true for enable, false for disable
   * @returns {void}
   */
  applyTune(a, i) {
    this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${a}`, i);
  }
}
function q(S) {
  return S && S.__esModule && Object.prototype.hasOwnProperty.call(S, "default") ? S.default : S;
}
var M = { exports: {} };
(function(S, a) {
  (function(i, c) {
    S.exports = c();
  })(window, function() {
    return function(i) {
      var c = {};
      function r(n) {
        if (c[n])
          return c[n].exports;
        var o = c[n] = { i: n, l: !1, exports: {} };
        return i[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
      }
      return r.m = i, r.c = c, r.d = function(n, o, d) {
        r.o(n, o) || Object.defineProperty(n, o, { enumerable: !0, get: d });
      }, r.r = function(n) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
      }, r.t = function(n, o) {
        if (1 & o && (n = r(n)), 8 & o || 4 & o && typeof n == "object" && n && n.__esModule)
          return n;
        var d = /* @__PURE__ */ Object.create(null);
        if (r.r(d), Object.defineProperty(d, "default", { enumerable: !0, value: n }), 2 & o && typeof n != "string")
          for (var b in n)
            r.d(d, b, (function(l) {
              return n[l];
            }).bind(null, b));
        return d;
      }, r.n = function(n) {
        var o = n && n.__esModule ? function() {
          return n.default;
        } : function() {
          return n;
        };
        return r.d(o, "a", o), o;
      }, r.o = function(n, o) {
        return Object.prototype.hasOwnProperty.call(n, o);
      }, r.p = "", r(r.s = 3);
    }([function(i, c) {
      var r;
      r = function() {
        return this;
      }();
      try {
        r = r || new Function("return this")();
      } catch {
        typeof window == "object" && (r = window);
      }
      i.exports = r;
    }, function(i, c, r) {
      (function(n) {
        var o = r(2), d = setTimeout;
        function b() {
        }
        function l(e) {
          if (!(this instanceof l))
            throw new TypeError("Promises must be constructed via new");
          if (typeof e != "function")
            throw new TypeError("not a function");
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], t(e, this);
        }
        function p(e, u) {
          for (; e._state === 3; )
            e = e._value;
          e._state !== 0 ? (e._handled = !0, l._immediateFn(function() {
            var s = e._state === 1 ? u.onFulfilled : u.onRejected;
            if (s !== null) {
              var g;
              try {
                g = s(e._value);
              } catch (m) {
                return void y(u.promise, m);
              }
              f(u.promise, g);
            } else
              (e._state === 1 ? f : y)(u.promise, e._value);
          })) : e._deferreds.push(u);
        }
        function f(e, u) {
          try {
            if (u === e)
              throw new TypeError("A promise cannot be resolved with itself.");
            if (u && (typeof u == "object" || typeof u == "function")) {
              var s = u.then;
              if (u instanceof l)
                return e._state = 3, e._value = u, void v(e);
              if (typeof s == "function")
                return void t((g = s, m = u, function() {
                  g.apply(m, arguments);
                }), e);
            }
            e._state = 1, e._value = u, v(e);
          } catch (h) {
            y(e, h);
          }
          var g, m;
        }
        function y(e, u) {
          e._state = 2, e._value = u, v(e);
        }
        function v(e) {
          e._state === 2 && e._deferreds.length === 0 && l._immediateFn(function() {
            e._handled || l._unhandledRejectionFn(e._value);
          });
          for (var u = 0, s = e._deferreds.length; u < s; u++)
            p(e, e._deferreds[u]);
          e._deferreds = null;
        }
        function w(e, u, s) {
          this.onFulfilled = typeof e == "function" ? e : null, this.onRejected = typeof u == "function" ? u : null, this.promise = s;
        }
        function t(e, u) {
          var s = !1;
          try {
            e(function(g) {
              s || (s = !0, f(u, g));
            }, function(g) {
              s || (s = !0, y(u, g));
            });
          } catch (g) {
            if (s)
              return;
            s = !0, y(u, g);
          }
        }
        l.prototype.catch = function(e) {
          return this.then(null, e);
        }, l.prototype.then = function(e, u) {
          var s = new this.constructor(b);
          return p(this, new w(e, u, s)), s;
        }, l.prototype.finally = o.a, l.all = function(e) {
          return new l(function(u, s) {
            if (!e || e.length === void 0)
              throw new TypeError("Promise.all accepts an array");
            var g = Array.prototype.slice.call(e);
            if (g.length === 0)
              return u([]);
            var m = g.length;
            function h(k, E) {
              try {
                if (E && (typeof E == "object" || typeof E == "function")) {
                  var F = E.then;
                  if (typeof F == "function")
                    return void F.call(E, function(P) {
                      h(k, P);
                    }, s);
                }
                g[k] = E, --m == 0 && u(g);
              } catch (P) {
                s(P);
              }
            }
            for (var T = 0; T < g.length; T++)
              h(T, g[T]);
          });
        }, l.resolve = function(e) {
          return e && typeof e == "object" && e.constructor === l ? e : new l(function(u) {
            u(e);
          });
        }, l.reject = function(e) {
          return new l(function(u, s) {
            s(e);
          });
        }, l.race = function(e) {
          return new l(function(u, s) {
            for (var g = 0, m = e.length; g < m; g++)
              e[g].then(u, s);
          });
        }, l._immediateFn = typeof n == "function" && function(e) {
          n(e);
        } || function(e) {
          d(e, 0);
        }, l._unhandledRejectionFn = function(e) {
          typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", e);
        }, c.a = l;
      }).call(this, r(5).setImmediate);
    }, function(i, c, r) {
      c.a = function(n) {
        var o = this.constructor;
        return this.then(function(d) {
          return o.resolve(n()).then(function() {
            return d;
          });
        }, function(d) {
          return o.resolve(n()).then(function() {
            return o.reject(d);
          });
        });
      };
    }, function(i, c, r) {
      function n(t) {
        return (n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
          return typeof e;
        } : function(e) {
          return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(t);
      }
      r(4);
      var o, d, b, l, p, f, y, v = r(8), w = (d = function(t) {
        return new Promise(function(e, u) {
          t = l(t), (t = p(t)).beforeSend && t.beforeSend();
          var s = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
          s.open(t.method, t.url), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(t.headers).forEach(function(m) {
            var h = t.headers[m];
            s.setRequestHeader(m, h);
          });
          var g = t.ratio;
          s.upload.addEventListener("progress", function(m) {
            var h = Math.round(m.loaded / m.total * 100), T = Math.ceil(h * g / 100);
            t.progress(Math.min(T, 100));
          }, !1), s.addEventListener("progress", function(m) {
            var h = Math.round(m.loaded / m.total * 100), T = Math.ceil(h * (100 - g) / 100) + g;
            t.progress(Math.min(T, 100));
          }, !1), s.onreadystatechange = function() {
            if (s.readyState === 4) {
              var m = s.response;
              try {
                m = JSON.parse(m);
              } catch {
              }
              var h = v.parseHeaders(s.getAllResponseHeaders()), T = { body: m, code: s.status, headers: h };
              y(s.status) ? e(T) : u(T);
            }
          }, s.send(t.data);
        });
      }, b = function(t) {
        return t.method = "POST", d(t);
      }, l = function() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (t.url && typeof t.url != "string")
          throw new Error("Url must be a string");
        if (t.url = t.url || "", t.method && typeof t.method != "string")
          throw new Error("`method` must be a string or null");
        if (t.method = t.method ? t.method.toUpperCase() : "GET", t.headers && n(t.headers) !== "object")
          throw new Error("`headers` must be an object or null");
        if (t.headers = t.headers || {}, t.type && (typeof t.type != "string" || !Object.values(o).includes(t.type)))
          throw new Error("`type` must be taken from module's «contentType» library");
        if (t.progress && typeof t.progress != "function")
          throw new Error("`progress` must be a function or null");
        if (t.progress = t.progress || function(e) {
        }, t.beforeSend = t.beforeSend || function(e) {
        }, t.ratio && typeof t.ratio != "number")
          throw new Error("`ratio` must be a number");
        if (t.ratio < 0 || t.ratio > 100)
          throw new Error("`ratio` must be in a 0-100 interval");
        if (t.ratio = t.ratio || 90, t.accept && typeof t.accept != "string")
          throw new Error("`accept` must be a string with a list of allowed mime-types");
        if (t.accept = t.accept || "*/*", t.multiple && typeof t.multiple != "boolean")
          throw new Error("`multiple` must be a true or false");
        if (t.multiple = t.multiple || !1, t.fieldName && typeof t.fieldName != "string")
          throw new Error("`fieldName` must be a string");
        return t.fieldName = t.fieldName || "files", t;
      }, p = function(t) {
        switch (t.method) {
          case "GET":
            var e = f(t.data, o.URLENCODED);
            delete t.data, t.url = /\?/.test(t.url) ? t.url + "&" + e : t.url + "?" + e;
            break;
          case "POST":
          case "PUT":
          case "DELETE":
          case "UPDATE":
            var u = function() {
              return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).type || o.JSON;
            }(t);
            (v.isFormData(t.data) || v.isFormElement(t.data)) && (u = o.FORM), t.data = f(t.data, u), u !== w.contentType.FORM && (t.headers["content-type"] = u);
        }
        return t;
      }, f = function() {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        switch (arguments.length > 1 ? arguments[1] : void 0) {
          case o.URLENCODED:
            return v.urlEncode(t);
          case o.JSON:
            return v.jsonEncode(t);
          case o.FORM:
            return v.formEncode(t);
          default:
            return t;
        }
      }, y = function(t) {
        return t >= 200 && t < 300;
      }, { contentType: o = { URLENCODED: "application/x-www-form-urlencoded; charset=utf-8", FORM: "multipart/form-data", JSON: "application/json; charset=utf-8" }, request: d, get: function(t) {
        return t.method = "GET", d(t);
      }, post: b, transport: function(t) {
        return t = l(t), v.selectFiles(t).then(function(e) {
          for (var u = new FormData(), s = 0; s < e.length; s++)
            u.append(t.fieldName, e[s], e[s].name);
          v.isObject(t.data) && Object.keys(t.data).forEach(function(m) {
            var h = t.data[m];
            u.append(m, h);
          });
          var g = t.beforeSend;
          return t.beforeSend = function() {
            return g(e);
          }, t.data = u, b(t);
        });
      }, selectFiles: function(t) {
        return delete (t = l(t)).beforeSend, v.selectFiles(t);
      } });
      i.exports = w;
    }, function(i, c, r) {
      r.r(c);
      var n = r(1);
      window.Promise = window.Promise || n.a;
    }, function(i, c, r) {
      (function(n) {
        var o = n !== void 0 && n || typeof self < "u" && self || window, d = Function.prototype.apply;
        function b(l, p) {
          this._id = l, this._clearFn = p;
        }
        c.setTimeout = function() {
          return new b(d.call(setTimeout, o, arguments), clearTimeout);
        }, c.setInterval = function() {
          return new b(d.call(setInterval, o, arguments), clearInterval);
        }, c.clearTimeout = c.clearInterval = function(l) {
          l && l.close();
        }, b.prototype.unref = b.prototype.ref = function() {
        }, b.prototype.close = function() {
          this._clearFn.call(o, this._id);
        }, c.enroll = function(l, p) {
          clearTimeout(l._idleTimeoutId), l._idleTimeout = p;
        }, c.unenroll = function(l) {
          clearTimeout(l._idleTimeoutId), l._idleTimeout = -1;
        }, c._unrefActive = c.active = function(l) {
          clearTimeout(l._idleTimeoutId);
          var p = l._idleTimeout;
          p >= 0 && (l._idleTimeoutId = setTimeout(function() {
            l._onTimeout && l._onTimeout();
          }, p));
        }, r(6), c.setImmediate = typeof self < "u" && self.setImmediate || n !== void 0 && n.setImmediate || this && this.setImmediate, c.clearImmediate = typeof self < "u" && self.clearImmediate || n !== void 0 && n.clearImmediate || this && this.clearImmediate;
      }).call(this, r(0));
    }, function(i, c, r) {
      (function(n, o) {
        (function(d, b) {
          if (!d.setImmediate) {
            var l, p, f, y, v, w = 1, t = {}, e = !1, u = d.document, s = Object.getPrototypeOf && Object.getPrototypeOf(d);
            s = s && s.setTimeout ? s : d, {}.toString.call(d.process) === "[object process]" ? l = function(h) {
              o.nextTick(function() {
                m(h);
              });
            } : function() {
              if (d.postMessage && !d.importScripts) {
                var h = !0, T = d.onmessage;
                return d.onmessage = function() {
                  h = !1;
                }, d.postMessage("", "*"), d.onmessage = T, h;
              }
            }() ? (y = "setImmediate$" + Math.random() + "$", v = function(h) {
              h.source === d && typeof h.data == "string" && h.data.indexOf(y) === 0 && m(+h.data.slice(y.length));
            }, d.addEventListener ? d.addEventListener("message", v, !1) : d.attachEvent("onmessage", v), l = function(h) {
              d.postMessage(y + h, "*");
            }) : d.MessageChannel ? ((f = new MessageChannel()).port1.onmessage = function(h) {
              m(h.data);
            }, l = function(h) {
              f.port2.postMessage(h);
            }) : u && "onreadystatechange" in u.createElement("script") ? (p = u.documentElement, l = function(h) {
              var T = u.createElement("script");
              T.onreadystatechange = function() {
                m(h), T.onreadystatechange = null, p.removeChild(T), T = null;
              }, p.appendChild(T);
            }) : l = function(h) {
              setTimeout(m, 0, h);
            }, s.setImmediate = function(h) {
              typeof h != "function" && (h = new Function("" + h));
              for (var T = new Array(arguments.length - 1), k = 0; k < T.length; k++)
                T[k] = arguments[k + 1];
              var E = { callback: h, args: T };
              return t[w] = E, l(w), w++;
            }, s.clearImmediate = g;
          }
          function g(h) {
            delete t[h];
          }
          function m(h) {
            if (e)
              setTimeout(m, 0, h);
            else {
              var T = t[h];
              if (T) {
                e = !0;
                try {
                  (function(k) {
                    var E = k.callback, F = k.args;
                    switch (F.length) {
                      case 0:
                        E();
                        break;
                      case 1:
                        E(F[0]);
                        break;
                      case 2:
                        E(F[0], F[1]);
                        break;
                      case 3:
                        E(F[0], F[1], F[2]);
                        break;
                      default:
                        E.apply(b, F);
                    }
                  })(T);
                } finally {
                  g(h), e = !1;
                }
              }
            }
          }
        })(typeof self > "u" ? n === void 0 ? this : n : self);
      }).call(this, r(0), r(7));
    }, function(i, c) {
      var r, n, o = i.exports = {};
      function d() {
        throw new Error("setTimeout has not been defined");
      }
      function b() {
        throw new Error("clearTimeout has not been defined");
      }
      function l(s) {
        if (r === setTimeout)
          return setTimeout(s, 0);
        if ((r === d || !r) && setTimeout)
          return r = setTimeout, setTimeout(s, 0);
        try {
          return r(s, 0);
        } catch {
          try {
            return r.call(null, s, 0);
          } catch {
            return r.call(this, s, 0);
          }
        }
      }
      (function() {
        try {
          r = typeof setTimeout == "function" ? setTimeout : d;
        } catch {
          r = d;
        }
        try {
          n = typeof clearTimeout == "function" ? clearTimeout : b;
        } catch {
          n = b;
        }
      })();
      var p, f = [], y = !1, v = -1;
      function w() {
        y && p && (y = !1, p.length ? f = p.concat(f) : v = -1, f.length && t());
      }
      function t() {
        if (!y) {
          var s = l(w);
          y = !0;
          for (var g = f.length; g; ) {
            for (p = f, f = []; ++v < g; )
              p && p[v].run();
            v = -1, g = f.length;
          }
          p = null, y = !1, function(m) {
            if (n === clearTimeout)
              return clearTimeout(m);
            if ((n === b || !n) && clearTimeout)
              return n = clearTimeout, clearTimeout(m);
            try {
              n(m);
            } catch {
              try {
                return n.call(null, m);
              } catch {
                return n.call(this, m);
              }
            }
          }(s);
        }
      }
      function e(s, g) {
        this.fun = s, this.array = g;
      }
      function u() {
      }
      o.nextTick = function(s) {
        var g = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var m = 1; m < arguments.length; m++)
            g[m - 1] = arguments[m];
        f.push(new e(s, g)), f.length !== 1 || y || l(t);
      }, e.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = u, o.addListener = u, o.once = u, o.off = u, o.removeListener = u, o.removeAllListeners = u, o.emit = u, o.prependListener = u, o.prependOnceListener = u, o.listeners = function(s) {
        return [];
      }, o.binding = function(s) {
        throw new Error("process.binding is not supported");
      }, o.cwd = function() {
        return "/";
      }, o.chdir = function(s) {
        throw new Error("process.chdir is not supported");
      }, o.umask = function() {
        return 0;
      };
    }, function(i, c, r) {
      function n(d, b) {
        for (var l = 0; l < b.length; l++) {
          var p = b[l];
          p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(d, p.key, p);
        }
      }
      var o = r(9);
      i.exports = function() {
        function d() {
          (function(f, y) {
            if (!(f instanceof y))
              throw new TypeError("Cannot call a class as a function");
          })(this, d);
        }
        var b, l, p;
        return b = d, p = [{ key: "urlEncode", value: function(f) {
          return o(f);
        } }, { key: "jsonEncode", value: function(f) {
          return JSON.stringify(f);
        } }, { key: "formEncode", value: function(f) {
          if (this.isFormData(f))
            return f;
          if (this.isFormElement(f))
            return new FormData(f);
          if (this.isObject(f)) {
            var y = new FormData();
            return Object.keys(f).forEach(function(v) {
              var w = f[v];
              y.append(v, w);
            }), y;
          }
          throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement");
        } }, { key: "isObject", value: function(f) {
          return Object.prototype.toString.call(f) === "[object Object]";
        } }, { key: "isFormData", value: function(f) {
          return f instanceof FormData;
        } }, { key: "isFormElement", value: function(f) {
          return f instanceof HTMLFormElement;
        } }, { key: "selectFiles", value: function() {
          var f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return new Promise(function(y, v) {
            var w = document.createElement("INPUT");
            w.type = "file", f.multiple && w.setAttribute("multiple", "multiple"), f.accept && w.setAttribute("accept", f.accept), w.style.display = "none", document.body.appendChild(w), w.addEventListener("change", function(t) {
              var e = t.target.files;
              y(e), document.body.removeChild(w);
            }, !1), w.click();
          });
        } }, { key: "parseHeaders", value: function(f) {
          var y = f.trim().split(/[\r\n]+/), v = {};
          return y.forEach(function(w) {
            var t = w.split(": "), e = t.shift(), u = t.join(": ");
            e && (v[e] = u);
          }), v;
        } }], (l = null) && n(b.prototype, l), p && n(b, p), d;
      }();
    }, function(i, c) {
      var r = function(o) {
        return encodeURIComponent(o).replace(/[!'()*]/g, escape).replace(/%20/g, "+");
      }, n = function(o, d, b, l) {
        return d = d || null, b = b || "&", l = l || null, o ? function(p) {
          for (var f = new Array(), y = 0; y < p.length; y++)
            p[y] && f.push(p[y]);
          return f;
        }(Object.keys(o).map(function(p) {
          var f, y, v = p;
          if (l && (v = l + "[" + v + "]"), typeof o[p] == "object" && o[p] !== null)
            f = n(o[p], null, b, v);
          else {
            d && (y = v, v = !isNaN(parseFloat(y)) && isFinite(y) ? d + Number(v) : v);
            var w = o[p];
            w = (w = (w = (w = w === !0 ? "1" : w) === !1 ? "0" : w) === 0 ? "0" : w) || "", f = r(v) + "=" + r(w);
          }
          return f;
        })).join(b).replace(/[!'()*]/g, "") : "";
      };
      i.exports = n;
    }]);
  });
})(M);
var D = M.exports;
const _ = /* @__PURE__ */ q(D);
function L(S) {
  return S && typeof S.then == "function";
}
class x {
  /**
   * @param {object} params - uploader module params
   * @param {ImageConfig} params.config - image tool config
   * @param {Function} params.onUpload - one callback for all uploading (file, url, d-n-d, pasting)
   * @param {Function} params.onError - callback for uploading errors
   */
  constructor({ config: a, onUpload: i, onError: c }) {
    this.config = a, this.onUpload = i, this.onError = c;
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.transport()
   *
   * @param {Function} onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview: a }) {
    const i = function(r) {
      const n = new FileReader();
      n.readAsDataURL(r), n.onload = (o) => {
        a(o.target.result);
      };
    };
    let c;
    this.config.uploader && typeof this.config.uploader.uploadByFile == "function" ? c = _.selectFiles({ accept: this.config.types }).then((r) => {
      i(r[0]);
      const n = this.config.uploader.uploadByFile(r[0]);
      return L(n) || console.warn("Custom uploader method uploadByFile should return a Promise"), n;
    }) : c = _.transport({
      url: this.config.endpoints.byFile,
      data: this.config.additionalRequestData,
      accept: this.config.types,
      headers: this.config.additionalRequestHeaders,
      beforeSend: (r) => {
        i(r[0]);
      },
      fieldName: this.config.field
    }).then((r) => r.body), c.then((r) => {
      this.onUpload(r);
    }).catch((r) => {
      this.onError(r);
    });
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   *
   * @param {File} file - file pasted by drag-n-drop
   * @param {Function} onPreview - file pasted by drag-n-drop
   */
  uploadByFile(a, { onPreview: i }) {
    const c = new FileReader();
    c.readAsDataURL(a), c.onload = (n) => {
      i(n.target.result);
    };
    let r;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile == "function")
      r = this.config.uploader.uploadByFile(a), L(r) || console.warn("Custom uploader method uploadByFile should return a Promise");
    else {
      const n = new FormData();
      n.append(this.config.field, a), this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length && Object.entries(this.config.additionalRequestData).forEach(([o, d]) => {
        n.append(o, d);
      }), r = _.post({
        url: this.config.endpoints.byFile,
        data: n,
        type: _.contentType.JSON,
        headers: this.config.additionalRequestHeaders
      }).then((o) => o.body);
    }
    r.then((n) => {
      this.onUpload(n);
    }).catch((n) => {
      this.onError(n);
    });
  }
}
const A = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M240-363q60-10 120-15.5t120-5.5q60 0 120 5.5T720-363L552-552 433-419l-73-85-120 141Zm-96 171q-20 0-34-14t-14-34v-479q0-20 14-34.5t34-14.5q13 0 38 9t67 18q42 9 99 15t132 6q76 0 132.5-6t98.5-15q42-9 67.5-18t37.5-9q20 0 34 14t14 34v480q0 20-14 34t-34 14q-12 0-37.5-9T711-219q-42-9-98.5-15T480-240q-75 0-132 6t-99 15q-42 9-67 18t-38 9Zm24-81q62-16 138.5-27.5T480-312q98 0 174.5 11.5T792-273v-414q-61 16-137.5 27.5T480-648q-97 0-173.5-11.5T168-687v414Zm312-207Z"/></svg>';
/**
 * Panorama Tool for the Editor.js
 *
 * @author Igor Shuvalov «VolgaIgor» & CodeX <team@codex.so>
 * @license MIT
 * @see {@link https://github.com/VolgaIgor/editorjs-panorama}
 *
 * To developers.
 * To simplify Tool structure, we split it to 4 parts:
 *  1) index.js — main Tool's interface, public API and methods for working with data
 *  2) uploader.js — module that has methods for sending files via AJAX: from device, by URL or File pasting
 *  3) ui.js — module for UI manipulations: render, showing preloader, etc
 *  4) tunes.js — working with Block Tunes: render buttons, handle clicks
 *
 * image: {
 *   class: Panorama,
 *   config: {
 *     endpoints: {
 *       byFile: 'http://localhost:8008/uploadFile',
 *     }
 *   },
 * },
 */
class j {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: A,
      title: "Panorama"
    };
  }
  /**
   * Available image tools
   *
   * @returns {Array}
   */
  static get tunes() {
    return [
      {
        name: "stretched",
        icon: R,
        title: "Stretch image",
        toggle: !0
      }
    ];
  }
  /**
   * @param {object} tool - tool properties got from editor.js
   * @param {ImageToolData} tool.data - previously saved data
   * @param {ImageConfig} tool.config - user config for Tool
   * @param {object} tool.api - Editor.js API
   * @param {boolean} tool.readOnly - read-only mode flag
   * @param {BlockAPI|{}} tool.block - current Block API
   */
  constructor({ data: a, config: i, api: c, readOnly: r, block: n }) {
    this.api = c, this.readOnly = r, this.block = n, this.config = {
      endpoints: i.endpoints || "",
      additionalRequestData: i.additionalRequestData || {},
      additionalRequestHeaders: i.additionalRequestHeaders || {},
      field: i.field || "image",
      types: i.types || "image/*",
      captionPlaceholder: this.api.i18n.t(i.captionPlaceholder || "Caption"),
      buttonContent: i.buttonContent || "",
      uploader: i.uploader || void 0,
      actions: i.actions || []
    }, this.uploader = new x({
      config: this.config,
      onUpload: (o) => this.onUpload(o),
      onError: (o) => this.uploadingFailed(o)
    }), this.ui = new C({
      api: c,
      config: this.config,
      onSelectFile: () => {
        this.uploader.uploadSelectedFile({
          onPreview: (o) => {
            this.ui.showPreloader(o);
          }
        });
      },
      readOnly: r
    }), this._data = {}, this.data = a;
  }
  /**
   * Renders Block content
   *
   * @public
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.ui.render(this.data);
  }
  /**
   * Validate data: check if Image exists
   *
   * @param {ImageToolData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(a) {
    return a.file && a.file.url;
  }
  /**
   * Return Block data
   *
   * @public
   *
   * @returns {ImageToolData}
   */
  save() {
    const a = this.ui.nodes.caption;
    return this._data.caption = a.innerHTML, this.data;
  }
  /**
   * Returns configuration for block tunes: add background, add border, stretch image
   *
   * @public
   *
   * @returns {Array}
   */
  renderSettings() {
    return j.tunes.concat(this.config.actions).map((i) => ({
      icon: i.icon,
      label: this.api.i18n.t(i.title),
      name: i.name,
      toggle: i.toggle,
      isActive: this.data[i.name],
      onActivate: () => {
        if (typeof i.action == "function") {
          i.action(i.name);
          return;
        }
        this.tuneToggled(i.name);
      }
    }));
  }
  /**
   * Fires after clicks on the Toolbox Image Icon
   * Initiates click on the Select File button
   *
   * @public
   */
  appendCallback() {
    this.ui.nodes.fileButton.click();
  }
  /**
   * Private methods
   * ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿
   */
  /**
   * Stores all Tool's data
   *
   * @private
   *
   * @param {ImageToolData} data - data in Image Tool format
   */
  set data(a) {
    this.image = a.file, this._data.caption = a.caption || "", this.ui.fillCaption(this._data.caption), j.tunes.forEach(({ name: i }) => {
      const c = typeof a[i] < "u" ? a[i] === !0 || a[i] === "true" : !1;
      this.setTune(i, c);
    });
  }
  /**
   * Return Tool data
   *
   * @private
   *
   * @returns {ImageToolData}
   */
  get data() {
    return this._data;
  }
  /**
   * Set new image file
   *
   * @private
   *
   * @param {object} file - uploaded file data
   */
  set image(a) {
    this._data.file = a || {}, a && a.url && this.ui.fillImage(a.url);
  }
  /**
   * File uploading callback
   *
   * @private
   *
   * @param {UploadResponseFormat} response - uploading server response
   * @returns {void}
   */
  onUpload(a) {
    a.success && a.file ? this.image = a.file : this.uploadingFailed("incorrect response: " + JSON.stringify(a));
  }
  /**
   * Handle uploader errors
   *
   * @private
   * @param {string} errorText - uploading error text
   * @returns {void}
   */
  uploadingFailed(a) {
    console.log("Image Tool: uploading failed because of", a), this.api.notifier.show({
      message: this.api.i18n.t("Couldn’t upload image. Please try another."),
      style: "error"
    }), this.ui.hidePreloader();
  }
  /**
   * Callback fired when Block Tune is activated
   *
   * @private
   *
   * @param {string} tuneName - tune that has been clicked
   * @returns {void}
   */
  tuneToggled(a) {
    this.setTune(a, !this._data[a]);
  }
  /**
   * Set one tune
   *
   * @param {string} tuneName - {@link Tunes.tunes}
   * @param {boolean} value - tune state
   * @returns {void}
   */
  setTune(a, i) {
    this._data[a] = i, this.ui.applyTune(a, i), a === "stretched" && Promise.resolve().then(() => {
      this.block.stretched = i;
    }).catch((c) => {
      console.error(c);
    });
  }
  /**
   * Show preloader and upload image file
   *
   * @param {File} file - file that is currently uploading (from paste)
   * @returns {void}
   */
  uploadFile(a) {
    this.uploader.uploadByFile(a, {
      onPreview: (i) => {
        this.ui.showPreloader(i);
      }
    });
  }
}
export {
  j as default
};
