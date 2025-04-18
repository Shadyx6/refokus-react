import "./chunk-G3PMV62Z.js";

// node_modules/lenis/dist/lenis.mjs
function clamp(t2, i2, e2) {
  return Math.max(t2, Math.min(i2, e2));
}
var Animate = class {
  constructor() {
    this.isRunning = false, this.value = 0, this.from = 0, this.to = 0, this.duration = 0, this.currentTime = 0;
  }
  advance(t2) {
    var i2;
    if (!this.isRunning) return;
    let e2 = false;
    if (this.duration && this.easing) {
      this.currentTime += t2;
      const i3 = clamp(0, this.currentTime / this.duration, 1);
      e2 = i3 >= 1;
      const s2 = e2 ? 1 : this.easing(i3);
      this.value = this.from + (this.to - this.from) * s2;
    } else this.lerp ? (this.value = function damp(t3, i3, e3, s2) {
      return function lerp(t4, i4, e4) {
        return (1 - e4) * t4 + e4 * i4;
      }(t3, i3, 1 - Math.exp(-e3 * s2));
    }(this.value, this.to, 60 * this.lerp, t2), Math.round(this.value) === this.to && (this.value = this.to, e2 = true)) : (this.value = this.to, e2 = true);
    e2 && this.stop(), null === (i2 = this.onUpdate) || void 0 === i2 || i2.call(this, this.value, e2);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t2, i2, { lerp: e2, duration: s2, easing: o2, onStart: n2, onUpdate: l2 }) {
    this.from = this.value = t2, this.to = i2, this.lerp = e2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, null == n2 || n2(), this.onUpdate = l2;
  }
};
var Dimensions = class {
  constructor({ wrapper: t2, content: i2, autoResize: e2 = true, debounce: s2 = 250 } = {}) {
    this.width = 0, this.height = 0, this.scrollWidth = 0, this.scrollHeight = 0, this.resize = () => {
      this.onWrapperResize(), this.onContentResize();
    }, this.onWrapperResize = () => {
      this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : this.wrapper instanceof HTMLElement && (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
    }, this.onContentResize = () => {
      this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : this.wrapper instanceof HTMLElement && (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
    }, this.wrapper = t2, this.content = i2, e2 && (this.debouncedResize = /* @__PURE__ */ function debounce(t3, i3) {
      let e3;
      return function() {
        let s3 = arguments, o2 = this;
        clearTimeout(e3), e3 = setTimeout(function() {
          t3.apply(o2, s3);
        }, i3);
      };
    }(this.resize, s2), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    var t2, i2;
    null === (t2 = this.wrapperResizeObserver) || void 0 === t2 || t2.disconnect(), null === (i2 = this.contentResizeObserver) || void 0 === i2 || i2.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
};
var Emitter = class {
  constructor() {
    this.events = {};
  }
  emit(t2, ...i2) {
    let e2 = this.events[t2] || [];
    for (let t3 = 0, s2 = e2.length; t3 < s2; t3++) e2[t3](...i2);
  }
  on(t2, i2) {
    var e2;
    return (null === (e2 = this.events[t2]) || void 0 === e2 ? void 0 : e2.push(i2)) || (this.events[t2] = [i2]), () => {
      var e3;
      this.events[t2] = null === (e3 = this.events[t2]) || void 0 === e3 ? void 0 : e3.filter((t3) => i2 !== t3);
    };
  }
  off(t2, i2) {
    var e2;
    this.events[t2] = null === (e2 = this.events[t2]) || void 0 === e2 ? void 0 : e2.filter((t3) => i2 !== t3);
  }
  destroy() {
    this.events = {};
  }
};
var t = 100 / 6;
var VirtualScroll = class {
  constructor(i2, { wheelMultiplier: e2 = 1, touchMultiplier: s2 = 1 }) {
    this.lastDelta = { x: 0, y: 0 }, this.windowWidth = 0, this.windowHeight = 0, this.onTouchStart = (t2) => {
      const { clientX: i3, clientY: e3 } = t2.targetTouches ? t2.targetTouches[0] : t2;
      this.touchStart.x = i3, this.touchStart.y = e3, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
    }, this.onTouchMove = (t2) => {
      var i3, e3, s3, o2;
      const { clientX: n2, clientY: l2 } = t2.targetTouches ? t2.targetTouches[0] : t2, r2 = -(n2 - (null !== (e3 = null === (i3 = this.touchStart) || void 0 === i3 ? void 0 : i3.x) && void 0 !== e3 ? e3 : 0)) * this.touchMultiplier, h = -(l2 - (null !== (o2 = null === (s3 = this.touchStart) || void 0 === s3 ? void 0 : s3.y) && void 0 !== o2 ? o2 : 0)) * this.touchMultiplier;
      this.touchStart.x = n2, this.touchStart.y = l2, this.lastDelta = { x: r2, y: h }, this.emitter.emit("scroll", { deltaX: r2, deltaY: h, event: t2 });
    }, this.onTouchEnd = (t2) => {
      this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
    }, this.onWheel = (i3) => {
      let { deltaX: e3, deltaY: s3, deltaMode: o2 } = i3;
      e3 *= 1 === o2 ? t : 2 === o2 ? this.windowWidth : 1, s3 *= 1 === o2 ? t : 2 === o2 ? this.windowHeight : 1, e3 *= this.wheelMultiplier, s3 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e3, deltaY: s3, event: i3 });
    }, this.onWindowResize = () => {
      this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
    }, this.element = i2, this.wheelMultiplier = e2, this.touchMultiplier = s2, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
  }
  on(t2, i2) {
    return this.emitter.on(t2, i2);
  }
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel), this.element.removeEventListener("touchstart", this.onTouchStart), this.element.removeEventListener("touchmove", this.onTouchMove), this.element.removeEventListener("touchend", this.onTouchEnd);
  }
};
var Lenis = class {
  constructor({ wrapper: t2 = window, content: i2 = document.documentElement, wheelEventsTarget: e2 = t2, eventsTarget: s2 = e2, smoothWheel: o2 = true, syncTouch: n2 = false, syncTouchLerp: l2 = 0.075, touchInertiaMultiplier: r2 = 35, duration: h, easing: a2 = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: c2 = 0.1, infinite: d = false, orientation: u = "vertical", gestureOrientation: p = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = true, prevent: w, virtualScroll: S, __experimental__naiveDimensions: f = false } = {}) {
    this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.userData = {}, this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.onPointerDown = (t3) => {
      1 === t3.button && this.reset();
    }, this.onVirtualScroll = (t3) => {
      if ("function" == typeof this.options.virtualScroll && false === this.options.virtualScroll(t3)) return;
      const { deltaX: i3, deltaY: e3, event: s3 } = t3;
      if (this.emitter.emit("virtual-scroll", { deltaX: i3, deltaY: e3, event: s3 }), s3.ctrlKey) return;
      const o3 = s3.type.includes("touch"), n3 = s3.type.includes("wheel");
      this.isTouching = "touchstart" === s3.type || "touchmove" === s3.type;
      if (this.options.syncTouch && o3 && "touchstart" === s3.type && !this.isStopped && !this.isLocked) return void this.reset();
      const l3 = 0 === i3 && 0 === e3, r3 = "vertical" === this.options.gestureOrientation && 0 === e3 || "horizontal" === this.options.gestureOrientation && 0 === i3;
      if (l3 || r3) return;
      let h2 = s3.composedPath();
      h2 = h2.slice(0, h2.indexOf(this.rootElement));
      const a3 = this.options.prevent;
      if (h2.find((t4) => {
        var i4, e4, s4, l4, r4;
        return t4 instanceof Element && ("function" == typeof a3 && (null == a3 ? void 0 : a3(t4)) || (null === (i4 = t4.hasAttribute) || void 0 === i4 ? void 0 : i4.call(t4, "data-lenis-prevent")) || o3 && (null === (e4 = t4.hasAttribute) || void 0 === e4 ? void 0 : e4.call(t4, "data-lenis-prevent-touch")) || n3 && (null === (s4 = t4.hasAttribute) || void 0 === s4 ? void 0 : s4.call(t4, "data-lenis-prevent-wheel")) || (null === (l4 = t4.classList) || void 0 === l4 ? void 0 : l4.contains("lenis")) && !(null === (r4 = t4.classList) || void 0 === r4 ? void 0 : r4.contains("lenis-stopped")));
      })) return;
      if (this.isStopped || this.isLocked) return void s3.preventDefault();
      if (!(this.options.syncTouch && o3 || this.options.smoothWheel && n3)) return this.isScrolling = "native", void this.animate.stop();
      s3.preventDefault();
      let c3 = e3;
      "both" === this.options.gestureOrientation ? c3 = Math.abs(e3) > Math.abs(i3) ? e3 : i3 : "horizontal" === this.options.gestureOrientation && (c3 = i3);
      const d2 = o3 && this.options.syncTouch, u2 = o3 && "touchend" === s3.type && Math.abs(c3) > 5;
      u2 && (c3 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + c3, Object.assign({ programmatic: false }, d2 ? { lerp: u2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
    }, this.onNativeScroll = () => {
      if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent) delete this.__preventNextNativeScrollEvent;
      else if (false === this.isScrolling || "native" === this.isScrolling) {
        const t3 = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t3, this.direction = Math.sign(this.animatedScroll - t3), this.isScrolling = "native", this.emit(), 0 !== this.velocity && (this.__resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
        }, 400));
      }
    }, window.lenisVersion = "1.1.9", t2 && t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: i2, wheelEventsTarget: e2, eventsTarget: s2, smoothWheel: o2, syncTouch: n2, syncTouchLerp: l2, touchInertiaMultiplier: r2, duration: h, easing: a2, lerp: c2, infinite: d, gestureOrientation: p, orientation: u, touchMultiplier: m, wheelMultiplier: v, autoResize: g, prevent: w, virtualScroll: S, __experimental__naiveDimensions: f }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: i2, autoResize: g }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = false, this.isStopped = false, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll = new VirtualScroll(s2, { touchMultiplier: m, wheelMultiplier: v }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
  }
  on(t2, i2) {
    return this.emitter.on(t2, i2);
  }
  off(t2, i2) {
    return this.emitter.off(t2, i2);
  }
  setScroll(t2) {
    this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
  }
  resize() {
    this.dimensions.resize();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped && (this.isStopped = false, this.reset());
  }
  stop() {
    this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
  }
  raf(t2) {
    const i2 = t2 - (this.time || t2);
    this.time = t2, this.animate.advance(1e-3 * i2);
  }
  scrollTo(t2, { offset: i2 = 0, immediate: e2 = false, lock: s2 = false, duration: o2 = this.options.duration, easing: n2 = this.options.easing, lerp: l2 = this.options.lerp, onStart: r2, onComplete: h, force: a2 = false, programmatic: c2 = true, userData: d = {} } = {}) {
    if (!this.isStopped && !this.isLocked || a2) {
      if ("string" == typeof t2 && ["top", "left", "start"].includes(t2)) t2 = 0;
      else if ("string" == typeof t2 && ["bottom", "right", "end"].includes(t2)) t2 = this.limit;
      else {
        let e3;
        if ("string" == typeof t2 ? e3 = document.querySelector(t2) : t2 instanceof HTMLElement && (null == t2 ? void 0 : t2.nodeType) && (e3 = t2), e3) {
          if (this.options.wrapper !== window) {
            const t3 = this.rootElement.getBoundingClientRect();
            i2 -= this.isHorizontal ? t3.left : t3.top;
          }
          const s3 = e3.getBoundingClientRect();
          t2 = (this.isHorizontal ? s3.left : s3.top) + this.animatedScroll;
        }
      }
      if ("number" == typeof t2 && (t2 += i2, t2 = Math.round(t2), this.options.infinite ? c2 && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = clamp(0, t2, this.limit), t2 !== this.targetScroll)) {
        if (this.userData = d, e2) return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == h || h(this), void (this.userData = {});
        c2 || (this.targetScroll = t2), this.animate.fromTo(this.animatedScroll, t2, { duration: o2, easing: n2, lerp: l2, onStart: () => {
          s2 && (this.isLocked = true), this.isScrolling = "smooth", null == r2 || r2(this);
        }, onUpdate: (t3, i3) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c2 && (this.targetScroll = t3), i3 || this.emit(), i3 && (this.reset(), this.emit(), null == h || h(this), this.userData = {}, this.preventNextNativeScrollEvent());
        } });
      }
    }
  }
  preventNextNativeScrollEvent() {
    this.__preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
      delete this.__preventNextNativeScrollEvent;
    });
  }
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  get limit() {
    return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return "horizontal" === this.options.orientation;
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? function modulo(t2, i2) {
      return (t2 % i2 + i2) % i2;
    }(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  get progress() {
    return 0 === this.limit ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(t2) {
    this.__isScrolling !== t2 && (this.__isScrolling = t2, this.updateClassName());
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(t2) {
    this.__isStopped !== t2 && (this.__isStopped = t2, this.updateClassName());
  }
  get isLocked() {
    return this.__isLocked;
  }
  set isLocked(t2) {
    this.__isLocked !== t2 && (this.__isLocked = t2, this.updateClassName());
  }
  get isSmooth() {
    return "smooth" === this.isScrolling;
  }
  get className() {
    let t2 = "lenis";
    return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), "smooth" === this.isScrolling && (t2 += " lenis-smooth"), t2;
  }
  updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
  }
};

// node_modules/locomotive-scroll/dist/locomotive-scroll.modern.mjs
function s() {
  return s = Object.assign ? Object.assign.bind() : function(t2) {
    for (var s2 = 1; s2 < arguments.length; s2++) {
      var e2 = arguments[s2];
      for (var i2 in e2) ({}).hasOwnProperty.call(e2, i2) && (t2[i2] = e2[i2]);
    }
    return t2;
  }, s.apply(null, arguments);
}
var e = class {
  constructor({ scrollElements: t2, rootMargin: s2 = "-1px -1px -1px -1px", IORaf: e2 }) {
    this.scrollElements = void 0, this.rootMargin = void 0, this.IORaf = void 0, this.observer = void 0, this.scrollElements = t2, this.rootMargin = s2, this.IORaf = e2, this._init();
  }
  _init() {
    this.observer = new IntersectionObserver((t2) => {
      t2.forEach((t3) => {
        const s2 = this.scrollElements.find((s3) => s3.$el === t3.target);
        t3.isIntersecting ? (s2 && (s2.isAlreadyIntersected = true), this._setInview(t3)) : s2 && s2.isAlreadyIntersected && this._setOutOfView(t3);
      });
    }, { rootMargin: this.rootMargin });
    for (const t2 of this.scrollElements) this.observe(t2.$el);
  }
  destroy() {
    this.observer.disconnect();
  }
  observe(t2) {
    t2 && this.observer.observe(t2);
  }
  unobserve(t2) {
    t2 && this.observer.unobserve(t2);
  }
  _setInview(t2) {
    const s2 = this.scrollElements.find((s3) => s3.$el === t2.target);
    this.IORaf && (null == s2 || s2.setInteractivityOn()), !this.IORaf && (null == s2 || s2.setInview());
  }
  _setOutOfView(t2) {
    const s2 = this.scrollElements.find((s3) => s3.$el === t2.target);
    this.IORaf && (null == s2 || s2.setInteractivityOff()), !this.IORaf && (null == s2 || s2.setOutOfView()), null != s2 && s2.attributes.scrollRepeat || this.IORaf || this.unobserve(t2.target);
  }
};
function i(t2, s2, e2, i2, r2) {
  return e2 + ((r2 - t2) / (s2 - t2) * (i2 - e2) || 0);
}
function r(t2, s2) {
  return t2.reduce((t3, e2) => Math.abs(e2 - s2) < Math.abs(t3 - s2) ? e2 : t3);
}
var l = class {
  constructor({ $el: t2, id: s2, modularInstance: e2, subscribeElementUpdateFn: i2, unsubscribeElementUpdateFn: r2, needRaf: l2, scrollOrientation: n2 }) {
    var o2, a2, c2, h, d;
    this.$el = void 0, this.id = void 0, this.needRaf = void 0, this.attributes = void 0, this.scrollOrientation = void 0, this.isAlreadyIntersected = void 0, this.intersection = void 0, this.metrics = void 0, this.currentScroll = void 0, this.translateValue = void 0, this.progress = void 0, this.lastProgress = void 0, this.modularInstance = void 0, this.progressModularModules = void 0, this.isInview = void 0, this.isInteractive = void 0, this.isInFold = void 0, this.isFirstResize = void 0, this.subscribeElementUpdateFn = void 0, this.unsubscribeElementUpdateFn = void 0, this.$el = t2, this.id = s2, this.needRaf = l2, this.scrollOrientation = n2, this.modularInstance = e2, this.subscribeElementUpdateFn = i2, this.unsubscribeElementUpdateFn = r2, this.attributes = { scrollClass: null != (o2 = this.$el.dataset.scrollClass) ? o2 : "is-inview", scrollOffset: null != (a2 = this.$el.dataset.scrollOffset) ? a2 : "0,0", scrollPosition: null != (c2 = this.$el.dataset.scrollPosition) ? c2 : "start,end", scrollModuleProgress: null != this.$el.dataset.scrollModuleProgress, scrollCssProgress: null != this.$el.dataset.scrollCssProgress, scrollEventProgress: null != (h = this.$el.dataset.scrollEventProgress) ? h : null, scrollSpeed: null != this.$el.dataset.scrollSpeed ? parseFloat(this.$el.dataset.scrollSpeed) : null, scrollRepeat: null != this.$el.dataset.scrollRepeat, scrollCall: null != (d = this.$el.dataset.scrollCall) ? d : null, scrollCallSelf: null != this.$el.dataset.scrollCallSelf, scrollIgnoreFold: null != this.$el.dataset.scrollIgnoreFold, scrollEnableTouchSpeed: null != this.$el.dataset.scrollEnableTouchSpeed }, this.intersection = { start: 0, end: 0 }, this.metrics = { offsetStart: 0, offsetEnd: 0, bcr: {} }, this.currentScroll = "vertical" === this.scrollOrientation ? window.scrollY : window.scrollX, this.translateValue = 0, this.progress = 0, this.lastProgress = null, this.progressModularModules = [], this.isInview = false, this.isInteractive = false, this.isAlreadyIntersected = false, this.isInFold = false, this.isFirstResize = true, this._init();
  }
  _init() {
    this.needRaf && (this.modularInstance && this.attributes.scrollModuleProgress && this._getProgressModularModules(), this._resize());
  }
  onResize({ currentScroll: t2 }) {
    this.currentScroll = t2, this._resize();
  }
  onRender({ currentScroll: t2, smooth: s2 }) {
    const e2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth;
    if (this.currentScroll = t2, this._computeProgress(), this.attributes.scrollSpeed && !isNaN(this.attributes.scrollSpeed)) if (this.attributes.scrollEnableTouchSpeed || s2) {
      if (this.isInFold) {
        const t3 = Math.max(0, this.progress);
        this.translateValue = t3 * e2 * this.attributes.scrollSpeed * -1;
      } else {
        const t3 = i(0, 1, -1, 1, this.progress);
        this.translateValue = t3 * e2 * this.attributes.scrollSpeed * -1;
      }
      this.$el.style.transform = "vertical" === this.scrollOrientation ? `translate3d(0, ${this.translateValue}px, 0)` : `translate3d(${this.translateValue}px, 0, 0)`;
    } else this.translateValue && (this.$el.style.transform = "translate3d(0, 0, 0)"), this.translateValue = 0;
  }
  setInview() {
    if (this.isInview) return;
    this.isInview = true, this.$el.classList.add(this.attributes.scrollClass);
    const t2 = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("enter", t2);
  }
  setOutOfView() {
    if (!this.isInview || !this.attributes.scrollRepeat) return;
    this.isInview = false, this.$el.classList.remove(this.attributes.scrollClass);
    const t2 = this._getScrollCallFrom();
    this.attributes.scrollCall && this._dispatchCall("leave", t2);
  }
  setInteractivityOn() {
    this.isInteractive || (this.isInteractive = true, this.subscribeElementUpdateFn(this));
  }
  setInteractivityOff() {
    this.isInteractive && (this.isInteractive = false, this.unsubscribeElementUpdateFn(this), null != this.lastProgress && this._computeProgress(r([0, 1], this.lastProgress)));
  }
  _resize() {
    this.metrics.bcr = this.$el.getBoundingClientRect(), this._computeMetrics(), this._computeIntersection(), this.isFirstResize && (this.isFirstResize = false, this.isInFold && this.setInview());
  }
  _computeMetrics() {
    const { top: t2, left: s2, height: e2, width: i2 } = this.metrics.bcr, r2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth, l2 = "vertical" === this.scrollOrientation ? e2 : i2;
    this.metrics.offsetStart = this.currentScroll + ("vertical" === this.scrollOrientation ? t2 : s2) - this.translateValue, this.metrics.offsetEnd = this.metrics.offsetStart + l2, this.isInFold = this.metrics.offsetStart < r2 && !this.attributes.scrollIgnoreFold;
  }
  _computeIntersection() {
    const t2 = "vertical" === this.scrollOrientation ? window.innerHeight : window.innerWidth, s2 = "vertical" === this.scrollOrientation ? this.metrics.bcr.height : this.metrics.bcr.width, e2 = this.attributes.scrollOffset.split(","), i2 = null != e2[0] ? e2[0].trim() : "0", r2 = null != e2[1] ? e2[1].trim() : "0", l2 = this.attributes.scrollPosition.split(",");
    let n2 = null != l2[0] ? l2[0].trim() : "start";
    const o2 = null != l2[1] ? l2[1].trim() : "end", a2 = i2.includes("%") ? t2 * parseInt(i2.replace("%", "").trim()) * 0.01 : parseInt(i2), c2 = r2.includes("%") ? t2 * parseInt(r2.replace("%", "").trim()) * 0.01 : parseInt(r2);
    switch (this.isInFold && (n2 = "fold"), n2) {
      case "start":
      default:
        this.intersection.start = this.metrics.offsetStart - t2 + a2;
        break;
      case "middle":
        this.intersection.start = this.metrics.offsetStart - t2 + a2 + 0.5 * s2;
        break;
      case "end":
        this.intersection.start = this.metrics.offsetStart - t2 + a2 + s2;
        break;
      case "fold":
        this.intersection.start = 0;
    }
    switch (o2) {
      case "start":
        this.intersection.end = this.metrics.offsetStart - c2;
        break;
      case "middle":
        this.intersection.end = this.metrics.offsetStart - c2 + 0.5 * s2;
        break;
      default:
        this.intersection.end = this.metrics.offsetStart - c2 + s2;
    }
    if (this.intersection.end <= this.intersection.start) switch (o2) {
      case "start":
      default:
        this.intersection.end = this.intersection.start + 1;
        break;
      case "middle":
        this.intersection.end = this.intersection.start + 0.5 * s2;
        break;
      case "end":
        this.intersection.end = this.intersection.start + s2;
    }
  }
  _computeProgress(t2) {
    const s2 = null != t2 ? t2 : (e2 = i(this.intersection.start, this.intersection.end, 0, 1, this.currentScroll)) < 0 ? 0 : e2 > 1 ? 1 : e2;
    var e2;
    if (this.progress = s2, s2 != this.lastProgress) {
      if (this.lastProgress = s2, this.attributes.scrollCssProgress && this._setCssProgress(s2), this.attributes.scrollEventProgress && this._setCustomEventProgress(s2), this.attributes.scrollModuleProgress) for (const t3 of this.progressModularModules) this.modularInstance && this.modularInstance.call("onScrollProgress", s2, t3.moduleName, t3.moduleId);
      s2 > 0 && s2 < 1 && this.setInview(), 0 === s2 && this.setOutOfView(), 1 === s2 && this.setOutOfView();
    }
  }
  _setCssProgress(t2 = 0) {
    this.$el.style.setProperty("--progress", t2.toString());
  }
  _setCustomEventProgress(t2 = 0) {
    const s2 = this.attributes.scrollEventProgress;
    if (!s2) return;
    const e2 = new CustomEvent(s2, { detail: { target: this.$el, progress: t2 } });
    window.dispatchEvent(e2);
  }
  _getProgressModularModules() {
    if (!this.modularInstance) return;
    const t2 = Object.keys(this.$el.dataset).filter((t3) => t3.includes("module")), s2 = Object.entries(this.modularInstance.modules);
    if (t2.length) for (const e2 of t2) {
      const t3 = this.$el.dataset[e2];
      if (!t3) return;
      for (const e3 of s2) {
        const [s3, i2] = e3;
        t3 in i2 && this.progressModularModules.push({ moduleName: s3, moduleId: t3 });
      }
    }
  }
  _getScrollCallFrom() {
    const t2 = r([this.intersection.start, this.intersection.end], this.currentScroll);
    return this.intersection.start === t2 ? "start" : "end";
  }
  _dispatchCall(t2, s2) {
    var e2, i2;
    const r2 = null == (e2 = this.attributes.scrollCall) ? void 0 : e2.split(","), l2 = null == (i2 = this.attributes) ? void 0 : i2.scrollCallSelf;
    if (r2 && r2.length > 1) {
      var n2;
      const [e3, i3, o2] = r2;
      let a2;
      a2 = l2 ? this.$el.dataset[`module${i3.trim()}`] : o2, this.modularInstance && this.modularInstance.call(e3.trim(), { target: this.$el, way: t2, from: s2 }, i3.trim(), null == (n2 = a2) ? void 0 : n2.trim());
    } else if (r2) {
      const [e3] = r2, i3 = new CustomEvent(e3, { detail: { target: this.$el, way: t2, from: s2 } });
      window.dispatchEvent(i3);
    }
  }
};
var n = ["scrollOffset", "scrollPosition", "scrollModuleProgress", "scrollCssProgress", "scrollEventProgress", "scrollSpeed"];
var o = class {
  constructor({ $el: t2, modularInstance: s2, triggerRootMargin: e2, rafRootMargin: i2, scrollOrientation: r2 }) {
    this.$scrollContainer = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.scrollElements = void 0, this.triggeredScrollElements = void 0, this.RAFScrollElements = void 0, this.scrollElementsToUpdate = void 0, this.IOTriggerInstance = void 0, this.IORafInstance = void 0, this.scrollOrientation = void 0, t2 ? (this.$scrollContainer = t2, this.modularInstance = s2, this.scrollOrientation = r2, this.triggerRootMargin = null != e2 ? e2 : "-1px -1px -1px -1px", this.rafRootMargin = null != i2 ? i2 : "100% 100% 100% 100%", this.scrollElements = [], this.triggeredScrollElements = [], this.RAFScrollElements = [], this.scrollElementsToUpdate = [], this._init()) : console.error("Please provide a DOM Element as scrollContainer");
  }
  _init() {
    const t2 = this.$scrollContainer.querySelectorAll("[data-scroll]"), s2 = Array.from(t2);
    this._subscribeScrollElements(s2), this.IOTriggerInstance = new e({ scrollElements: [...this.triggeredScrollElements], rootMargin: this.triggerRootMargin, IORaf: false }), this.IORafInstance = new e({ scrollElements: [...this.RAFScrollElements], rootMargin: this.rafRootMargin, IORaf: true });
  }
  destroy() {
    this.IOTriggerInstance.destroy(), this.IORafInstance.destroy(), this._unsubscribeAllScrollElements();
  }
  onResize({ currentScroll: t2 }) {
    for (const s2 of this.RAFScrollElements) s2.onResize({ currentScroll: t2 });
  }
  onRender({ currentScroll: t2, smooth: s2 }) {
    for (const e2 of this.scrollElementsToUpdate) e2.onRender({ currentScroll: t2, smooth: s2 });
  }
  removeScrollElements(t2) {
    const s2 = t2.querySelectorAll("[data-scroll]");
    if (s2.length) {
      for (let t3 = 0; t3 < this.triggeredScrollElements.length; t3++) {
        const e2 = this.triggeredScrollElements[t3];
        Array.from(s2).indexOf(e2.$el) > -1 && (this.IOTriggerInstance.unobserve(e2.$el), this.triggeredScrollElements.splice(t3, 1));
      }
      for (let t3 = 0; t3 < this.RAFScrollElements.length; t3++) {
        const e2 = this.RAFScrollElements[t3];
        Array.from(s2).indexOf(e2.$el) > -1 && (this.IORafInstance.unobserve(e2.$el), this.RAFScrollElements.splice(t3, 1));
      }
      s2.forEach((t3) => {
        const s3 = this.scrollElementsToUpdate.find((s4) => s4.$el === t3), e2 = this.scrollElements.find((s4) => s4.$el === t3);
        s3 && this._unsubscribeElementUpdate(s3), e2 && (this.scrollElements = this.scrollElements.filter((t4) => t4.id != e2.id));
      });
    }
  }
  addScrollElements(t2) {
    const s2 = t2.querySelectorAll("[data-scroll]"), e2 = [];
    this.scrollElements.forEach((t3) => {
      e2.push(t3.id);
    });
    const i2 = Math.max(...e2, 0) + 1, r2 = Array.from(s2);
    this._subscribeScrollElements(r2, i2, true);
  }
  _subscribeScrollElements(t2, s2 = 0, e2 = false) {
    for (let i2 = 0; i2 < t2.length; i2++) {
      const r2 = t2[i2], n2 = this._checkRafNeeded(r2), o2 = new l({ $el: r2, id: s2 + i2, scrollOrientation: this.scrollOrientation, modularInstance: this.modularInstance, subscribeElementUpdateFn: this._subscribeElementUpdate.bind(this), unsubscribeElementUpdateFn: this._unsubscribeElementUpdate.bind(this), needRaf: n2 });
      this.scrollElements.push(o2), n2 ? (this.RAFScrollElements.push(o2), e2 && (this.IORafInstance.scrollElements.push(o2), this.IORafInstance.observe(o2.$el))) : (this.triggeredScrollElements.push(o2), e2 && (this.IOTriggerInstance.scrollElements.push(o2), this.IOTriggerInstance.observe(o2.$el)));
    }
  }
  _unsubscribeAllScrollElements() {
    this.scrollElements = [], this.RAFScrollElements = [], this.triggeredScrollElements = [], this.scrollElementsToUpdate = [];
  }
  _subscribeElementUpdate(t2) {
    this.scrollElementsToUpdate.push(t2);
  }
  _unsubscribeElementUpdate(t2) {
    this.scrollElementsToUpdate = this.scrollElementsToUpdate.filter((s2) => s2.id != t2.id);
  }
  _checkRafNeeded(t2) {
    let s2 = [...n];
    const e2 = (t3) => {
      s2 = s2.filter((s3) => s3 != t3);
    };
    if (t2.dataset.scrollOffset) {
      if ("0,0" != t2.dataset.scrollOffset.split(",").map((t3) => t3.replace("%", "").trim()).join(",")) return true;
      e2("scrollOffset");
    } else e2("scrollOffset");
    if (t2.dataset.scrollPosition) {
      if ("top,bottom" != t2.dataset.scrollPosition.trim()) return true;
      e2("scrollPosition");
    } else e2("scrollPosition");
    if (t2.dataset.scrollSpeed && !isNaN(parseFloat(t2.dataset.scrollSpeed))) return true;
    e2("scrollSpeed");
    for (const e3 of s2) if (e3 in t2.dataset) return true;
    return false;
  }
};
var a = class {
  constructor({ resizeElements: t2, resizeCallback: s2 = () => {
  } }) {
    this.$resizeElements = void 0, this.isFirstObserve = void 0, this.observer = void 0, this.resizeCallback = void 0, this.$resizeElements = t2, this.resizeCallback = s2, this.isFirstObserve = true, this._init();
  }
  _init() {
    this.observer = new ResizeObserver((t2) => {
      var s2;
      !this.isFirstObserve && (null == (s2 = this.resizeCallback) || s2.call(this)), this.isFirstObserve = false;
    });
    for (const t2 of this.$resizeElements) this.observer.observe(t2);
  }
  destroy() {
    this.observer.disconnect();
  }
};
var c = class {
  constructor({ lenisOptions: t2 = {}, modularInstance: s2, triggerRootMargin: e2, rafRootMargin: i2, autoResize: r2 = true, autoStart: l2 = true, scrollCallback: n2 = () => {
  }, initCustomTicker: o2, destroyCustomTicker: a2 } = {}) {
    this.rafPlaying = void 0, this.lenisInstance = void 0, this.coreInstance = void 0, this.lenisOptions = void 0, this.modularInstance = void 0, this.triggerRootMargin = void 0, this.rafRootMargin = void 0, this.rafInstance = void 0, this.autoResize = void 0, this.autoStart = void 0, this.ROInstance = void 0, this.initCustomTicker = void 0, this.destroyCustomTicker = void 0, this._onRenderBind = void 0, this._onResizeBind = void 0, this._onScrollToBind = void 0;
    for (const [s3] of Object.entries(t2)) ["wrapper", "content", "infinite"].includes(s3) && console.warn(`Warning: Key "${s3}" is not possible to edit in Locomotive Scroll.`);
    Object.assign(this, { lenisOptions: t2, modularInstance: s2, triggerRootMargin: e2, rafRootMargin: i2, autoResize: r2, autoStart: l2, scrollCallback: n2, initCustomTicker: o2, destroyCustomTicker: a2 }), this._onRenderBind = this._onRender.bind(this), this._onScrollToBind = this._onScrollTo.bind(this), this._onResizeBind = this._onResize.bind(this), this.rafPlaying = false, this._init();
  }
  _init() {
    var e2;
    this.lenisInstance = new Lenis(s({}, this.lenisOptions, { wrapper: window, content: document.documentElement, infinite: false })), null == (e2 = this.lenisInstance) || e2.on("scroll", this.scrollCallback), document.documentElement.setAttribute("data-scroll-orientation", this.lenisInstance.options.orientation), requestAnimationFrame(() => {
      this.coreInstance = new o({ $el: this.lenisInstance.rootElement, modularInstance: this.modularInstance, triggerRootMargin: this.triggerRootMargin, rafRootMargin: this.rafRootMargin, scrollOrientation: this.lenisInstance.options.orientation }), this._bindEvents(), this.initCustomTicker && !this.destroyCustomTicker ? console.warn("initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble.") : !this.initCustomTicker && this.destroyCustomTicker && console.warn("destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."), this.autoStart && this.start();
    });
  }
  destroy() {
    var t2;
    this.stop(), this._unbindEvents(), this.lenisInstance.destroy(), null == (t2 = this.coreInstance) || t2.destroy(), requestAnimationFrame(() => {
      var t3;
      null == (t3 = this.coreInstance) || t3.destroy();
    });
  }
  _bindEvents() {
    this._bindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance = new a({ resizeElements: [document.body], resizeCallback: this._onResizeBind }) : window.addEventListener("resize", this._onResizeBind));
  }
  _unbindEvents() {
    this._unbindScrollToEvents(), this.autoResize && ("ResizeObserver" in window ? this.ROInstance && this.ROInstance.destroy() : window.removeEventListener("resize", this._onResizeBind));
  }
  _bindScrollToEvents(t2) {
    const s2 = t2 || this.lenisInstance.rootElement, e2 = null == s2 ? void 0 : s2.querySelectorAll("[data-scroll-to]");
    (null == e2 ? void 0 : e2.length) && e2.forEach((t3) => {
      t3.addEventListener("click", this._onScrollToBind, false);
    });
  }
  _unbindScrollToEvents(t2) {
    const s2 = t2 || this.lenisInstance.rootElement, e2 = null == s2 ? void 0 : s2.querySelectorAll("[data-scroll-to]");
    (null == e2 ? void 0 : e2.length) && e2.forEach((t3) => {
      t3.removeEventListener("click", this._onScrollToBind, false);
    });
  }
  _onResize() {
    requestAnimationFrame(() => {
      var t2;
      null == (t2 = this.coreInstance) || t2.onResize({ currentScroll: this.lenisInstance.scroll });
    });
  }
  _onRender() {
    var t2, s2;
    null == (t2 = this.lenisInstance) || t2.raf(Date.now()), null == (s2 = this.coreInstance) || s2.onRender({ currentScroll: this.lenisInstance.scroll, smooth: this.lenisInstance.options.smoothWheel });
  }
  _onScrollTo(t2) {
    var s2;
    t2.preventDefault();
    const e2 = null != (s2 = t2.currentTarget) ? s2 : null;
    if (!e2) return;
    const i2 = e2.getAttribute("data-scroll-to-href") || e2.getAttribute("href"), r2 = e2.getAttribute("data-scroll-to-offset") || 0, l2 = e2.getAttribute("data-scroll-to-duration") || this.lenisInstance.options.duration;
    i2 && this.scrollTo(i2, { offset: "string" == typeof r2 ? parseInt(r2) : r2, duration: "string" == typeof l2 ? parseInt(l2) : l2 });
  }
  start() {
    var t2;
    this.rafPlaying || (null == (t2 = this.lenisInstance) || t2.start(), this.rafPlaying = true, this.initCustomTicker ? this.initCustomTicker(this._onRenderBind) : this._raf());
  }
  stop() {
    var t2;
    this.rafPlaying && (null == (t2 = this.lenisInstance) || t2.stop(), this.rafPlaying = false, this.destroyCustomTicker ? this.destroyCustomTicker(this._onRenderBind) : this.rafInstance && cancelAnimationFrame(this.rafInstance));
  }
  removeScrollElements(t2) {
    var s2;
    t2 ? (this._unbindScrollToEvents(t2), null == (s2 = this.coreInstance) || s2.removeScrollElements(t2)) : console.error("Please provide a DOM Element as $oldContainer");
  }
  addScrollElements(t2) {
    var s2;
    t2 ? (null == (s2 = this.coreInstance) || s2.addScrollElements(t2), requestAnimationFrame(() => {
      this._bindScrollToEvents(t2);
    })) : console.error("Please provide a DOM Element as $newContainer");
  }
  resize() {
    this._onResizeBind();
  }
  scrollTo(t2, s2) {
    var e2;
    null == (e2 = this.lenisInstance) || e2.scrollTo(t2, { offset: null == s2 ? void 0 : s2.offset, lerp: null == s2 ? void 0 : s2.lerp, duration: null == s2 ? void 0 : s2.duration, immediate: null == s2 ? void 0 : s2.immediate, lock: null == s2 ? void 0 : s2.lock, force: null == s2 ? void 0 : s2.force, easing: null == s2 ? void 0 : s2.easing, onComplete: null == s2 ? void 0 : s2.onComplete });
  }
  _raf() {
    this._onRenderBind(), this.rafInstance = requestAnimationFrame(() => this._raf());
  }
};
export {
  c as default
};
//# sourceMappingURL=locomotive-scroll.js.map
