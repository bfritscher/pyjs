const Ut = () => /* @__PURE__ */ new Map(), ss = (e) => {
  const t = Ut();
  return e.forEach((n, r) => {
    t.set(r, n);
  }), t;
}, Kt = (e, t, n) => {
  let r = e.get(t);
  return r === void 0 && e.set(t, r = n()), r;
}, ec = (e, t) => {
  const n = [];
  for (const [r, s] of e)
    n.push(t(s, r));
  return n;
}, nc = (e, t) => {
  for (const [n, r] of e)
    if (t(r, n))
      return !0;
  return !1;
}, Ke = () => /* @__PURE__ */ new Set(), Jr = (e) => e[e.length - 1], rc = (e, t) => {
  for (let n = 0; n < t.length; n++)
    e.push(t[n]);
}, Ne = Array.from, sc = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (t(e[n], n, e))
      return !0;
  return !1;
}, ic = (e, t) => {
  const n = new Array(e);
  for (let r = 0; r < e; r++)
    n[r] = t(r, n);
  return n;
}, is = Array.isArray;
class Ir {
  constructor() {
    this._observers = Ut();
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  on(t, n) {
    return Kt(
      this._observers,
      /** @type {string} */
      t,
      Ke
    ).add(n), n;
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  once(t, n) {
    const r = (...s) => {
      this.off(
        t,
        /** @type {any} */
        r
      ), n(...s);
    };
    this.on(
      t,
      /** @type {any} */
      r
    );
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  off(t, n) {
    const r = this._observers.get(t);
    r !== void 0 && (r.delete(n), r.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */
  emit(t, n) {
    return Ne((this._observers.get(t) || Ut()).values()).forEach((r) => r(...n));
  }
  destroy() {
    this._observers = Ut();
  }
}
class oc {
  constructor() {
    this._observers = Ut();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(t, n) {
    Kt(this._observers, t, Ke).add(n);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  once(t, n) {
    const r = (...s) => {
      this.off(t, r), n(...s);
    };
    this.on(t, r);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  off(t, n) {
    const r = this._observers.get(t);
    r !== void 0 && (r.delete(n), r.size === 0 && this._observers.delete(t));
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(t, n) {
    return Ne((this._observers.get(t) || Ut()).values()).forEach((r) => r(...n));
  }
  destroy() {
    this._observers = Ut();
  }
}
const Ue = Math.floor, kr = Math.abs, vs = (e, t) => e < t ? e : t, vn = (e, t) => e > t ? e : t, cc = Math.pow, Ci = (e) => e !== 0 ? e < 0 : 1 / e < 0, Xs = 1, Ks = 2, Yr = 4, Xr = 8, Gn = 32, Me = 64, oe = 128, Tr = 31, os = 63, gn = 127, lc = 2147483647, Ei = Number.MAX_SAFE_INTEGER, ac = Number.isInteger || ((e) => typeof e == "number" && isFinite(e) && Ue(e) === e), uc = String.fromCharCode, hc = (e) => e.toLowerCase(), fc = /^\s*/g, dc = (e) => e.replace(fc, ""), gc = /([A-Z])/g, Qs = (e, t) => dc(e.replace(gc, (n) => `${t}${hc(n)}`)), pc = (e) => {
  const t = unescape(encodeURIComponent(e)), n = t.length, r = new Uint8Array(n);
  for (let s = 0; s < n; s++)
    r[s] = /** @type {number} */
    t.codePointAt(s);
  return r;
}, Wn = (
  /** @type {TextEncoder} */
  typeof TextEncoder < "u" ? new TextEncoder() : null
), yc = (e) => Wn.encode(e), _c = Wn ? yc : pc;
let Pn = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 });
Pn && Pn.decode(new Uint8Array()).length === 1 && (Pn = null);
const mc = (e, t) => ic(t, () => e).join("");
class sr {
  constructor() {
    this.cpos = 0, this.cbuf = new Uint8Array(100), this.bufs = [];
  }
}
const Nt = () => new sr(), Ss = (e) => {
  let t = e.cpos;
  for (let n = 0; n < e.bufs.length; n++)
    t += e.bufs[n].length;
  return t;
}, gt = (e) => {
  const t = new Uint8Array(Ss(e));
  let n = 0;
  for (let r = 0; r < e.bufs.length; r++) {
    const s = e.bufs[r];
    t.set(s, n), n += s.length;
  }
  return t.set(new Uint8Array(e.cbuf.buffer, 0, e.cpos), n), t;
}, wc = (e, t) => {
  const n = e.cbuf.length;
  n - e.cpos < t && (e.bufs.push(new Uint8Array(e.cbuf.buffer, 0, e.cpos)), e.cbuf = new Uint8Array(vn(n, t) * 2), e.cpos = 0);
}, jt = (e, t) => {
  const n = e.cbuf.length;
  e.cpos === n && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(n * 2), e.cpos = 0), e.cbuf[e.cpos++] = t;
}, Jn = jt, B = (e, t) => {
  for (; t > gn; )
    jt(e, oe | gn & t), t = Ue(t / 128);
  jt(e, gn & t);
}, Mr = (e, t) => {
  const n = Ci(t);
  for (n && (t = -t), jt(e, (t > os ? oe : 0) | (n ? Me : 0) | os & t), t = Ue(t / 64); t > 0; )
    jt(e, (t > gn ? oe : 0) | gn & t), t = Ue(t / 128);
}, cs = new Uint8Array(3e4), bc = cs.length / 3, vc = (e, t) => {
  if (t.length < bc) {
    const n = Wn.encodeInto(t, cs).written || 0;
    B(e, n);
    for (let r = 0; r < n; r++)
      jt(e, cs[r]);
  } else
    Dt(e, _c(t));
}, Sc = (e, t) => {
  const n = unescape(encodeURIComponent(t)), r = n.length;
  B(e, r);
  for (let s = 0; s < r; s++)
    jt(
      e,
      /** @type {number} */
      n.codePointAt(s)
    );
}, Xe = Wn && /** @type {any} */
Wn.encodeInto ? vc : Sc, kc = (e, t) => ir(e, gt(t)), ir = (e, t) => {
  const n = e.cbuf.length, r = e.cpos, s = vs(n - r, t.length), i = t.length - s;
  e.cbuf.set(t.subarray(0, s), r), e.cpos += s, i > 0 && (e.bufs.push(e.cbuf), e.cbuf = new Uint8Array(vn(n * 2, i)), e.cbuf.set(t.subarray(s)), e.cpos = i);
}, Dt = (e, t) => {
  B(e, t.byteLength), ir(e, t);
}, ks = (e, t) => {
  wc(e, t);
  const n = new DataView(e.cbuf.buffer, e.cpos, t);
  return e.cpos += t, n;
}, Cc = (e, t) => ks(e, 4).setFloat32(0, t, !1), Ec = (e, t) => ks(e, 8).setFloat64(0, t, !1), Ac = (e, t) => (
  /** @type {any} */
  ks(e, 8).setBigInt64(0, t, !1)
), Zs = new DataView(new ArrayBuffer(4)), Dc = (e) => (Zs.setFloat32(0, e), Zs.getFloat32(0) === e), Yn = (e, t) => {
  switch (typeof t) {
    case "string":
      jt(e, 119), Xe(e, t);
      break;
    case "number":
      ac(t) && kr(t) <= lc ? (jt(e, 125), Mr(e, t)) : Dc(t) ? (jt(e, 124), Cc(e, t)) : (jt(e, 123), Ec(e, t));
      break;
    case "bigint":
      jt(e, 122), Ac(e, t);
      break;
    case "object":
      if (t === null)
        jt(e, 126);
      else if (is(t)) {
        jt(e, 117), B(e, t.length);
        for (let n = 0; n < t.length; n++)
          Yn(e, t[n]);
      } else if (t instanceof Uint8Array)
        jt(e, 116), Dt(e, t);
      else {
        jt(e, 118);
        const n = Object.keys(t);
        B(e, n.length);
        for (let r = 0; r < n.length; r++) {
          const s = n[r];
          Xe(e, s), Yn(e, t[s]);
        }
      }
      break;
    case "boolean":
      jt(e, t ? 120 : 121);
      break;
    default:
      jt(e, 127);
  }
};
class ti extends sr {
  /**
   * @param {function(Encoder, T):void} writer
   */
  constructor(t) {
    super(), this.w = t, this.s = null, this.count = 0;
  }
  /**
   * @param {T} v
   */
  write(t) {
    this.s === t ? this.count++ : (this.count > 0 && B(this, this.count - 1), this.count = 1, this.w(this, t), this.s = t);
  }
}
const ei = (e) => {
  e.count > 0 && (Mr(e.encoder, e.count === 1 ? e.s : -e.s), e.count > 1 && B(e.encoder, e.count - 2));
};
class Cr {
  constructor() {
    this.encoder = new sr(), this.s = 0, this.count = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.s === t ? this.count++ : (ei(this), this.count = 1, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return ei(this), gt(this.encoder);
  }
}
const ni = (e) => {
  if (e.count > 0) {
    const t = e.diff * 2 + (e.count === 1 ? 0 : 1);
    Mr(e.encoder, t), e.count > 1 && B(e.encoder, e.count - 2);
  }
};
class Kr {
  constructor() {
    this.encoder = new sr(), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @param {number} v
   */
  write(t) {
    this.diff === t - this.s ? (this.s = t, this.count++) : (ni(this), this.count = 1, this.diff = t - this.s, this.s = t);
  }
  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array() {
    return ni(this), gt(this.encoder);
  }
}
class Oc {
  constructor() {
    this.sarr = [], this.s = "", this.lensE = new Cr();
  }
  /**
   * @param {string} string
   */
  write(t) {
    this.s += t, this.s.length > 19 && (this.sarr.push(this.s), this.s = ""), this.lensE.write(t.length);
  }
  toUint8Array() {
    const t = new sr();
    return this.sarr.push(this.s), this.s = "", Xe(t, this.sarr.join("")), ir(t, this.lensE.toUint8Array()), gt(t);
  }
}
const Qe = (e) => new Error(e), De = () => {
  throw Qe("Method unimplemented");
}, ee = () => {
  throw Qe("Unexpected case");
}, Ai = Qe("Unexpected end of array"), Di = Qe("Integer out of Range");
class Rr {
  /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */
  constructor(t) {
    this.arr = t, this.pos = 0;
  }
}
const Bt = (e) => new Rr(e), Oi = (e) => e.pos !== e.arr.length, Lc = (e, t) => {
  const n = new Uint8Array(e.arr.buffer, e.pos + e.arr.byteOffset, t);
  return e.pos += t, n;
}, Gt = (e) => Lc(e, G(e)), In = (e) => e.arr[e.pos++], G = (e) => {
  let t = 0, n = 1;
  const r = e.arr.length;
  for (; e.pos < r; ) {
    const s = e.arr[e.pos++];
    if (t = t + (s & gn) * n, n *= 128, s < oe)
      return t;
    if (t > Ei)
      throw Di;
  }
  throw Ai;
}, jr = (e) => {
  let t = e.arr[e.pos++], n = t & os, r = 64;
  const s = (t & Me) > 0 ? -1 : 1;
  if (!(t & oe))
    return s * n;
  const i = e.arr.length;
  for (; e.pos < i; ) {
    if (t = e.arr[e.pos++], n = n + (t & gn) * r, r *= 128, t < oe)
      return s * n;
    if (n > Ei)
      throw Di;
  }
  throw Ai;
}, xc = (e) => {
  let t = G(e);
  if (t === 0)
    return "";
  {
    let n = String.fromCodePoint(In(e));
    if (--t < 100)
      for (; t--; )
        n += String.fromCodePoint(In(e));
    else
      for (; t > 0; ) {
        const r = t < 1e4 ? t : 1e4, s = e.arr.subarray(e.pos, e.pos + r);
        e.pos += r, n += String.fromCodePoint.apply(
          null,
          /** @type {any} */
          s
        ), t -= r;
      }
    return decodeURIComponent(escape(n));
  }
}, Ic = (e) => (
  /** @type any */
  Pn.decode(Gt(e))
), Re = Pn ? Ic : xc, Cs = (e, t) => {
  const n = new DataView(e.arr.buffer, e.arr.byteOffset + e.pos, t);
  return e.pos += t, n;
}, Tc = (e) => Cs(e, 4).getFloat32(0, !1), Mc = (e) => Cs(e, 8).getFloat64(0, !1), Rc = (e) => (
  /** @type {any} */
  Cs(e, 8).getBigInt64(0, !1)
), jc = [
  (e) => {
  },
  // CASE 127: undefined
  (e) => null,
  // CASE 126: null
  jr,
  // CASE 125: integer
  Tc,
  // CASE 124: float32
  Mc,
  // CASE 123: float64
  Rc,
  // CASE 122: bigint
  (e) => !1,
  // CASE 121: boolean (false)
  (e) => !0,
  // CASE 120: boolean (true)
  Re,
  // CASE 119: string
  (e) => {
    const t = G(e), n = {};
    for (let r = 0; r < t; r++) {
      const s = Re(e);
      n[s] = Xn(e);
    }
    return n;
  },
  (e) => {
    const t = G(e), n = [];
    for (let r = 0; r < t; r++)
      n.push(Xn(e));
    return n;
  },
  Gt
  // CASE 116: Uint8Array
], Xn = (e) => jc[127 - In(e)](e);
class ri extends Rr {
  /**
   * @param {Uint8Array} uint8Array
   * @param {function(Decoder):T} reader
   */
  constructor(t, n) {
    super(t), this.reader = n, this.s = null, this.count = 0;
  }
  read() {
    return this.count === 0 && (this.s = this.reader(this), Oi(this) ? this.count = G(this) + 1 : this.count = -1), this.count--, /** @type {T} */
    this.s;
  }
}
class Er extends Rr {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    super(t), this.s = 0, this.count = 0;
  }
  read() {
    if (this.count === 0) {
      this.s = jr(this);
      const t = Ci(this.s);
      this.count = 1, t && (this.s = -this.s, this.count = G(this) + 2);
    }
    return this.count--, /** @type {number} */
    this.s;
  }
}
class Qr extends Rr {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    super(t), this.s = 0, this.count = 0, this.diff = 0;
  }
  /**
   * @return {number}
   */
  read() {
    if (this.count === 0) {
      const t = jr(this), n = t & 1;
      this.diff = Ue(t / 2), this.count = 1, n && (this.count = G(this) + 2);
    }
    return this.s += this.diff, this.count--, this.s;
  }
}
class Nc {
  /**
   * @param {Uint8Array} uint8Array
   */
  constructor(t) {
    this.decoder = new Er(t), this.str = Re(this.decoder), this.spos = 0;
  }
  /**
   * @return {string}
   */
  read() {
    const t = this.spos + this.decoder.read(), n = this.str.slice(this.spos, t);
    return this.spos = t, n;
  }
}
const Uc = crypto.getRandomValues.bind(crypto), Li = () => Uc(new Uint32Array(1))[0], Bc = [1e7] + -1e3 + -4e3 + -8e3 + -1e11, Fc = () => Bc.replace(
  /[018]/g,
  /** @param {number} c */
  (e) => (e ^ Li() & 15 >> e / 4).toString(16)
), Ze = Date.now, si = (e) => (
  /** @type {Promise<T>} */
  new Promise(e)
);
Promise.all.bind(Promise);
const ii = (e) => e === void 0 ? null : e;
class Vc {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem(t, n) {
    this.map.set(t, n);
  }
  /**
   * @param {string} key
   */
  getItem(t) {
    return this.map.get(t);
  }
}
let xi = new Vc(), Es = !0;
try {
  typeof localStorage < "u" && localStorage && (xi = localStorage, Es = !1);
} catch {
}
const Ii = xi, zc = (e) => Es || addEventListener(
  "storage",
  /** @type {any} */
  e
), qc = (e) => Es || removeEventListener(
  "storage",
  /** @type {any} */
  e
), Pc = Object.assign, Ti = Object.keys, Hc = (e, t) => {
  for (const n in e)
    t(e[n], n);
}, $c = (e, t) => {
  const n = [];
  for (const r in e)
    n.push(t(e[r], r));
  return n;
}, oi = (e) => Ti(e).length, ci = (e) => Ti(e).length, Gc = (e) => {
  for (const t in e)
    return !1;
  return !0;
}, Wc = (e, t) => {
  for (const n in e)
    if (!t(e[n], n))
      return !1;
  return !0;
}, Mi = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Jc = (e, t) => e === t || ci(e) === ci(t) && Wc(e, (n, r) => (n !== void 0 || Mi(t, r)) && t[r] === n), Yc = Object.freeze, Ri = (e) => {
  for (const t in e) {
    const n = e[t];
    (typeof n == "object" || typeof n == "function") && Ri(e[t]);
  }
  return Yc(e);
}, As = (e, t, n = 0) => {
  try {
    for (; n < e.length; n++)
      e[n](...t);
  } finally {
    n < e.length && As(e, t, n + 1);
  }
}, ji = (e) => e, Xc = (e, t) => e === t, Hn = (e, t) => {
  if (e == null || t == null)
    return Xc(e, t);
  if (e.constructor !== t.constructor)
    return !1;
  if (e === t)
    return !0;
  switch (e.constructor) {
    case ArrayBuffer:
      e = new Uint8Array(e), t = new Uint8Array(t);
    case Uint8Array: {
      if (e.byteLength !== t.byteLength)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (e[n] !== t[n])
          return !1;
      break;
    }
    case Set: {
      if (e.size !== t.size)
        return !1;
      for (const n of e)
        if (!t.has(n))
          return !1;
      break;
    }
    case Map: {
      if (e.size !== t.size)
        return !1;
      for (const n of e.keys())
        if (!t.has(n) || !Hn(e.get(n), t.get(n)))
          return !1;
      break;
    }
    case Object:
      if (oi(e) !== oi(t))
        return !1;
      for (const n in e)
        if (!Mi(e, n) || !Hn(e[n], t[n]))
          return !1;
      break;
    case Array:
      if (e.length !== t.length)
        return !1;
      for (let n = 0; n < e.length; n++)
        if (!Hn(e[n], t[n]))
          return !1;
      break;
    default:
      return !1;
  }
  return !0;
}, Kc = (e, t) => t.includes(e), tn = typeof process < "u" && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]", Ni = typeof window < "u" && typeof document < "u" && !tn;
let Ae;
const Qc = () => {
  if (Ae === void 0)
    if (tn) {
      Ae = Ut();
      const e = process.argv;
      let t = null;
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        r[0] === "-" ? (t !== null && Ae.set(t, ""), t = r) : t !== null && (Ae.set(t, r), t = null);
      }
      t !== null && Ae.set(t, "");
    } else
      typeof location == "object" ? (Ae = Ut(), (location.search || "?").slice(1).split("&").forEach((e) => {
        if (e.length !== 0) {
          const [t, n] = e.split("=");
          Ae.set(`--${Qs(t, "-")}`, n), Ae.set(`-${Qs(t, "-")}`, n);
        }
      })) : Ae = Ut();
  return Ae;
}, ls = (e) => Qc().has(e), Dr = (e) => ii(tn ? process.env[e.toUpperCase().replaceAll("-", "_")] : Ii.getItem(e)), Ui = (e) => ls("--" + e) || Dr(e) !== null;
Ui("production");
const Zc = tn && Kc(process.env.FORCE_COLOR, ["true", "1", "2"]), tl = Zc || !ls("--no-colors") && // @todo deprecate --no-colors
!Ui("no-color") && (!tn || process.stdout.isTTY) && (!tn || ls("--color") || Dr("COLORTERM") !== null || (Dr("TERM") || "").includes("color")), Bi = (e) => new Uint8Array(e), el = (e, t, n) => new Uint8Array(e, t, n), nl = (e) => new Uint8Array(e), rl = (e) => {
  let t = "";
  for (let n = 0; n < e.byteLength; n++)
    t += uc(e[n]);
  return btoa(t);
}, sl = (e) => Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("base64"), il = (e) => {
  const t = atob(e), n = Bi(t.length);
  for (let r = 0; r < t.length; r++)
    n[r] = t.charCodeAt(r);
  return n;
}, ol = (e) => {
  const t = Buffer.from(e, "base64");
  return el(t.buffer, t.byteOffset, t.byteLength);
}, cl = Ni ? rl : sl, ll = Ni ? il : ol, al = (e) => {
  const t = Bi(e.byteLength);
  return t.set(e), t;
};
class ul {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor(t, n) {
    this.left = t, this.right = n;
  }
}
const Te = (e, t) => new ul(e, t);
typeof DOMParser < "u" && new DOMParser();
const hl = (e) => ec(e, (t, n) => `${n}:${t};`).join(""), Ve = Symbol, Fi = Ve(), Vi = Ve(), fl = Ve(), dl = Ve(), gl = Ve(), zi = Ve(), pl = Ve(), Ds = Ve(), yl = Ve(), _l = (e) => {
  var s;
  e.length === 1 && ((s = e[0]) == null ? void 0 : s.constructor) === Function && (e = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  e[0]());
  const t = [], n = [];
  let r = 0;
  for (; r < e.length; r++) {
    const i = e[r];
    if (i === void 0)
      break;
    if (i.constructor === String || i.constructor === Number)
      t.push(i);
    else if (i.constructor === Object)
      break;
  }
  for (r > 0 && n.push(t.join("")); r < e.length; r++) {
    const i = e[r];
    i instanceof Symbol || n.push(i);
  }
  return n;
}, ml = {
  [Fi]: Te("font-weight", "bold"),
  [Vi]: Te("font-weight", "normal"),
  [fl]: Te("color", "blue"),
  [gl]: Te("color", "green"),
  [dl]: Te("color", "grey"),
  [zi]: Te("color", "red"),
  [pl]: Te("color", "purple"),
  [Ds]: Te("color", "orange"),
  // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [yl]: Te("color", "black")
}, wl = (e) => {
  var o;
  e.length === 1 && ((o = e[0]) == null ? void 0 : o.constructor) === Function && (e = /** @type {Array<string|Symbol|Object|number>} */
  /** @type {[function]} */
  e[0]());
  const t = [], n = [], r = Ut();
  let s = [], i = 0;
  for (; i < e.length; i++) {
    const c = e[i], l = ml[c];
    if (l !== void 0)
      r.set(l.left, l.right);
    else {
      if (c === void 0)
        break;
      if (c.constructor === String || c.constructor === Number) {
        const u = hl(r);
        i > 0 || u.length > 0 ? (t.push("%c" + c), n.push(u)) : t.push(c);
      } else
        break;
    }
  }
  for (i > 0 && (s = n, s.unshift(t.join(""))); i < e.length; i++) {
    const c = e[i];
    c instanceof Symbol || s.push(c);
  }
  return s;
}, qi = tl ? wl : _l, as = (...e) => {
  console.log(...qi(e)), Hi.forEach((t) => t.print(e));
}, Pi = (...e) => {
  console.warn(...qi(e)), e.unshift(Ds), Hi.forEach((t) => t.print(e));
}, Hi = Ke(), $i = (e) => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return this;
  },
  // @ts-ignore
  next: e
}), bl = (e, t) => $i(() => {
  let n;
  do
    n = e.next();
  while (!n.done && !t(n.value));
  return n;
}), Zr = (e, t) => $i(() => {
  const { done: n, value: r } = e.next();
  return { done: n, value: n ? void 0 : t(r) };
});
class vl extends Ir {
  /**
   * @param {Doc} ydoc
   * @param {any} awareness
   */
  constructor(t, n) {
    super(), this.doc = t, this.awareness = n;
  }
}
class Os {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor(t, n) {
    this.clock = t, this.len = n;
  }
}
class jn {
  constructor() {
    this.clients = /* @__PURE__ */ new Map();
  }
}
const _n = (e, t, n) => t.clients.forEach((r, s) => {
  const i = (
    /** @type {Array<GC|Item>} */
    e.doc.store.clients.get(s)
  );
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    oo(e, i, c.clock, c.len, n);
  }
}), Sl = (e, t) => {
  let n = 0, r = e.length - 1;
  for (; n <= r; ) {
    const s = Ue((n + r) / 2), i = e[s], o = i.clock;
    if (o <= t) {
      if (t < o + i.len)
        return s;
      n = s + 1;
    } else
      r = s - 1;
  }
  return null;
}, Sn = (e, t) => {
  const n = e.clients.get(t.client);
  return n !== void 0 && Sl(n, t.clock) !== null;
}, Ls = (e) => {
  e.clients.forEach((t) => {
    t.sort((s, i) => s.clock - i.clock);
    let n, r;
    for (n = 1, r = 1; n < t.length; n++) {
      const s = t[r - 1], i = t[n];
      s.clock + s.len >= i.clock ? s.len = vn(s.len, i.clock + i.len - s.clock) : (r < n && (t[r] = i), r++);
    }
    t.length = r;
  });
}, mn = (e) => {
  const t = new jn();
  for (let n = 0; n < e.length; n++)
    e[n].clients.forEach((r, s) => {
      if (!t.clients.has(s)) {
        const i = r.slice();
        for (let o = n + 1; o < e.length; o++)
          rc(i, e[o].clients.get(s) || []);
        t.clients.set(s, i);
      }
    });
  return Ls(t), t;
}, Kn = (e, t, n, r) => {
  Kt(e.clients, t, () => (
    /** @type {Array<DeleteItem>} */
    []
  )).push(new Os(n, r));
}, Nr = () => new jn(), xs = (e) => {
  const t = Nr();
  return e.clients.forEach((n, r) => {
    const s = [];
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      if (o.deleted) {
        const c = o.id.clock;
        let l = o.length;
        if (i + 1 < n.length)
          for (let u = n[i + 1]; i + 1 < n.length && u.deleted; u = n[++i + 1])
            l += u.length;
        s.push(new Os(c, l));
      }
    }
    s.length > 0 && t.clients.set(r, s);
  }), t;
}, Oe = (e, t) => {
  B(e.restEncoder, t.clients.size), Ne(t.clients.entries()).sort((n, r) => r[0] - n[0]).forEach(([n, r]) => {
    e.resetDsCurVal(), B(e.restEncoder, n);
    const s = r.length;
    B(e.restEncoder, s);
    for (let i = 0; i < s; i++) {
      const o = r[i];
      e.writeDsClock(o.clock), e.writeDsLen(o.len);
    }
  });
}, Be = (e) => {
  const t = new jn(), n = G(e.restDecoder);
  for (let r = 0; r < n; r++) {
    e.resetDsCurVal();
    const s = G(e.restDecoder), i = G(e.restDecoder);
    if (i > 0) {
      const o = Kt(t.clients, s, () => (
        /** @type {Array<DeleteItem>} */
        []
      ));
      for (let c = 0; c < i; c++)
        o.push(new Os(e.readDsClock(), e.readDsLen()));
    }
  }
  return t;
}, li = (e, t, n) => {
  const r = new jn(), s = G(e.restDecoder);
  for (let i = 0; i < s; i++) {
    e.resetDsCurVal();
    const o = G(e.restDecoder), c = G(e.restDecoder), l = n.clients.get(o) || [], u = wt(n, o);
    for (let a = 0; a < c; a++) {
      const h = e.readDsClock(), d = h + e.readDsLen();
      if (h < u) {
        u < d && Kn(r, o, u, d - u);
        let g = ue(l, h), y = l[g];
        for (!y.deleted && y.id.clock < h && (l.splice(g + 1, 0, xr(t, y, h - y.id.clock)), g++); g < l.length && (y = l[g++], y.id.clock < d); )
          y.deleted || (d < y.id.clock + y.length && l.splice(g, 0, xr(t, y, d - y.id.clock)), y.delete(t));
      } else
        Kn(r, o, h, d - h);
    }
  }
  if (r.clients.size > 0) {
    const i = new we();
    return B(i.restEncoder, 0), Oe(i, r), i.toUint8Array();
  }
  return null;
}, Gi = (e, t) => {
  if (e.clients.size !== t.clients.size)
    return !1;
  for (const [n, r] of e.clients.entries()) {
    const s = (
      /** @type {Array<import('../internals.js').DeleteItem>} */
      t.clients.get(n)
    );
    if (s === void 0 || r.length !== s.length)
      return !1;
    for (let i = 0; i < r.length; i++) {
      const o = r[i], c = s[i];
      if (o.clock !== c.clock || o.len !== c.len)
        return !1;
    }
  }
  return !0;
}, Wi = Li;
class sn extends Ir {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor({ guid: t = Fc(), collectionid: n = null, gc: r = !0, gcFilter: s = () => !0, meta: i = null, autoLoad: o = !1, shouldLoad: c = !0 } = {}) {
    super(), this.gc = r, this.gcFilter = s, this.clientID = Wi(), this.guid = t, this.collectionid = n, this.share = /* @__PURE__ */ new Map(), this.store = new so(), this._transaction = null, this._transactionCleanups = [], this.subdocs = /* @__PURE__ */ new Set(), this._item = null, this.shouldLoad = c, this.autoLoad = o, this.meta = i, this.isLoaded = !1, this.isSynced = !1, this.isDestroyed = !1, this.whenLoaded = si((u) => {
      this.on("load", () => {
        this.isLoaded = !0, u(this);
      });
    });
    const l = () => si((u) => {
      const a = (h) => {
        (h === void 0 || h === !0) && (this.off("sync", a), u());
      };
      this.on("sync", a);
    });
    this.on("sync", (u) => {
      u === !1 && this.isSynced && (this.whenSynced = l()), this.isSynced = u === void 0 || u === !0, this.isSynced && !this.isLoaded && this.emit("load", [this]);
    }), this.whenSynced = l();
  }
  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load() {
    const t = this._item;
    t !== null && !this.shouldLoad && lt(
      /** @type {any} */
      t.parent.doc,
      (n) => {
        n.subdocsLoaded.add(this);
      },
      null,
      !0
    ), this.shouldLoad = !0;
  }
  getSubdocs() {
    return this.subdocs;
  }
  getSubdocGuids() {
    return new Set(Ne(this.subdocs).map((t) => t.guid));
  }
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact(t, n = null) {
    return lt(this, t, n);
  }
  /**
   * Define a shared data type.
   *
   * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
   *
   * After this method is called, the type is also available on `ydoc.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Y.Doc instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @template {typeof AbstractType<any>} Type
   * @example
   *   const ydoc = new Y.Doc(..)
   *   const appState = {
   *     document: ydoc.getText('document')
   *     comments: ydoc.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get(t, n = (
    /** @type {any} */
    Tt
  )) {
    const r = Kt(this.share, t, () => {
      const i = new n();
      return i._integrate(this, null), i;
    }), s = r.constructor;
    if (n !== Tt && s !== n)
      if (s === Tt) {
        const i = new n();
        i._map = r._map, r._map.forEach(
          /** @param {Item?} n */
          (o) => {
            for (; o !== null; o = o.left)
              o.parent = i;
          }
        ), i._start = r._start;
        for (let o = i._start; o !== null; o = o.right)
          o.parent = i;
        return i._length = r._length, this.share.set(t, i), i._integrate(this, null), /** @type {InstanceType<Type>} */
        i;
      } else
        throw new Error(`Type with the name ${t} has already been defined with a different constructor`);
    return (
      /** @type {InstanceType<Type>} */
      r
    );
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray(t = "") {
    return (
      /** @type {YArray<T>} */
      this.get(t, je)
    );
  }
  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText(t = "") {
    return this.get(t, wn);
  }
  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap(t = "") {
    return (
      /** @type {YMap<T>} */
      this.get(t, en)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlElement}
   *
   * @public
   */
  getXmlElement(t = "") {
    return (
      /** @type {YXmlElement<{[key:string]:string}>} */
      this.get(t, rn)
    );
  }
  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment(t = "") {
    return this.get(t, nn);
  }
  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON() {
    const t = {};
    return this.share.forEach((n, r) => {
      t[r] = n.toJSON();
    }), t;
  }
  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy() {
    this.isDestroyed = !0, Ne(this.subdocs).forEach((n) => n.destroy());
    const t = this._item;
    if (t !== null) {
      this._item = null;
      const n = (
        /** @type {ContentDoc} */
        t.content
      );
      n.doc = new sn({ guid: this.guid, ...n.opts, shouldLoad: !1 }), n.doc._item = t, lt(
        /** @type {any} */
        t.parent.doc,
        (r) => {
          const s = n.doc;
          t.deleted || r.subdocsAdded.add(s), r.subdocsRemoved.add(this);
        },
        null,
        !0
      );
    }
    this.emit("destroyed", [!0]), this.emit("destroy", [this]), super.destroy();
  }
}
class Qn {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    this.restDecoder = t;
  }
  resetDsCurVal() {
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return G(this.restDecoder);
  }
  /**
   * @return {number}
   */
  readDsLen() {
    return G(this.restDecoder);
  }
}
class fe extends Qn {
  /**
   * @return {ID}
   */
  readLeftID() {
    return W(G(this.restDecoder), G(this.restDecoder));
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return W(G(this.restDecoder), G(this.restDecoder));
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return G(this.restDecoder);
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return In(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readString() {
    return Re(this.restDecoder);
  }
  /**
   * @return {boolean} isKey
   */
  readParentInfo() {
    return G(this.restDecoder) === 1;
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readTypeRef() {
    return G(this.restDecoder);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number} len
   */
  readLen() {
    return G(this.restDecoder);
  }
  /**
   * @return {any}
   */
  readAny() {
    return Xn(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return al(Gt(this.restDecoder));
  }
  /**
   * Legacy implementation uses JSON parse. We use any-decoding in v2.
   *
   * @return {any}
   */
  readJSON() {
    return JSON.parse(Re(this.restDecoder));
  }
  /**
   * @return {string}
   */
  readKey() {
    return Re(this.restDecoder);
  }
}
class Ji {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    this.dsCurrVal = 0, this.restDecoder = t;
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @return {number}
   */
  readDsClock() {
    return this.dsCurrVal += G(this.restDecoder), this.dsCurrVal;
  }
  /**
   * @return {number}
   */
  readDsLen() {
    const t = G(this.restDecoder) + 1;
    return this.dsCurrVal += t, t;
  }
}
class ce extends Ji {
  /**
   * @param {decoding.Decoder} decoder
   */
  constructor(t) {
    super(t), this.keys = [], G(t), this.keyClockDecoder = new Qr(Gt(t)), this.clientDecoder = new Er(Gt(t)), this.leftClockDecoder = new Qr(Gt(t)), this.rightClockDecoder = new Qr(Gt(t)), this.infoDecoder = new ri(Gt(t), In), this.stringDecoder = new Nc(Gt(t)), this.parentInfoDecoder = new ri(Gt(t), In), this.typeRefDecoder = new Er(Gt(t)), this.lenDecoder = new Er(Gt(t));
  }
  /**
   * @return {ID}
   */
  readLeftID() {
    return new pn(this.clientDecoder.read(), this.leftClockDecoder.read());
  }
  /**
   * @return {ID}
   */
  readRightID() {
    return new pn(this.clientDecoder.read(), this.rightClockDecoder.read());
  }
  /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */
  readClient() {
    return this.clientDecoder.read();
  }
  /**
   * @return {number} info An unsigned 8-bit integer
   */
  readInfo() {
    return (
      /** @type {number} */
      this.infoDecoder.read()
    );
  }
  /**
   * @return {string}
   */
  readString() {
    return this.stringDecoder.read();
  }
  /**
   * @return {boolean}
   */
  readParentInfo() {
    return this.parentInfoDecoder.read() === 1;
  }
  /**
   * @return {number} An unsigned 8-bit integer
   */
  readTypeRef() {
    return this.typeRefDecoder.read();
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number}
   */
  readLen() {
    return this.lenDecoder.read();
  }
  /**
   * @return {any}
   */
  readAny() {
    return Xn(this.restDecoder);
  }
  /**
   * @return {Uint8Array}
   */
  readBuf() {
    return Gt(this.restDecoder);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @return {any}
   */
  readJSON() {
    return Xn(this.restDecoder);
  }
  /**
   * @return {string}
   */
  readKey() {
    const t = this.keyClockDecoder.read();
    if (t < this.keys.length)
      return this.keys[t];
    {
      const n = this.stringDecoder.read();
      return this.keys.push(n), n;
    }
  }
}
class Tn {
  constructor() {
    this.restEncoder = Nt();
  }
  toUint8Array() {
    return gt(this.restEncoder);
  }
  resetDsCurVal() {
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    B(this.restEncoder, t);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    B(this.restEncoder, t);
  }
}
class on extends Tn {
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    B(this.restEncoder, t.client), B(this.restEncoder, t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    B(this.restEncoder, t.client), B(this.restEncoder, t.clock);
  }
  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient(t) {
    B(this.restEncoder, t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    Jn(this.restEncoder, t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    Xe(this.restEncoder, t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    B(this.restEncoder, t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    B(this.restEncoder, t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    B(this.restEncoder, t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    Yn(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    Dt(this.restEncoder, t);
  }
  /**
   * @param {any} embed
   */
  writeJSON(t) {
    Xe(this.restEncoder, JSON.stringify(t));
  }
  /**
   * @param {string} key
   */
  writeKey(t) {
    Xe(this.restEncoder, t);
  }
}
class Ur {
  constructor() {
    this.restEncoder = Nt(), this.dsCurrVal = 0;
  }
  toUint8Array() {
    return gt(this.restEncoder);
  }
  resetDsCurVal() {
    this.dsCurrVal = 0;
  }
  /**
   * @param {number} clock
   */
  writeDsClock(t) {
    const n = t - this.dsCurrVal;
    this.dsCurrVal = t, B(this.restEncoder, n);
  }
  /**
   * @param {number} len
   */
  writeDsLen(t) {
    t === 0 && ee(), B(this.restEncoder, t - 1), this.dsCurrVal += t;
  }
}
class we extends Ur {
  constructor() {
    super(), this.keyMap = /* @__PURE__ */ new Map(), this.keyClock = 0, this.keyClockEncoder = new Kr(), this.clientEncoder = new Cr(), this.leftClockEncoder = new Kr(), this.rightClockEncoder = new Kr(), this.infoEncoder = new ti(Jn), this.stringEncoder = new Oc(), this.parentInfoEncoder = new ti(Jn), this.typeRefEncoder = new Cr(), this.lenEncoder = new Cr();
  }
  toUint8Array() {
    const t = Nt();
    return B(t, 0), Dt(t, this.keyClockEncoder.toUint8Array()), Dt(t, this.clientEncoder.toUint8Array()), Dt(t, this.leftClockEncoder.toUint8Array()), Dt(t, this.rightClockEncoder.toUint8Array()), Dt(t, gt(this.infoEncoder)), Dt(t, this.stringEncoder.toUint8Array()), Dt(t, gt(this.parentInfoEncoder)), Dt(t, this.typeRefEncoder.toUint8Array()), Dt(t, this.lenEncoder.toUint8Array()), ir(t, gt(this.restEncoder)), gt(t);
  }
  /**
   * @param {ID} id
   */
  writeLeftID(t) {
    this.clientEncoder.write(t.client), this.leftClockEncoder.write(t.clock);
  }
  /**
   * @param {ID} id
   */
  writeRightID(t) {
    this.clientEncoder.write(t.client), this.rightClockEncoder.write(t.clock);
  }
  /**
   * @param {number} client
   */
  writeClient(t) {
    this.clientEncoder.write(t);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo(t) {
    this.infoEncoder.write(t);
  }
  /**
   * @param {string} s
   */
  writeString(t) {
    this.stringEncoder.write(t);
  }
  /**
   * @param {boolean} isYKey
   */
  writeParentInfo(t) {
    this.parentInfoEncoder.write(t ? 1 : 0);
  }
  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef(t) {
    this.typeRefEncoder.write(t);
  }
  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen(t) {
    this.lenEncoder.write(t);
  }
  /**
   * @param {any} any
   */
  writeAny(t) {
    Yn(this.restEncoder, t);
  }
  /**
   * @param {Uint8Array} buf
   */
  writeBuf(t) {
    Dt(this.restEncoder, t);
  }
  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON(t) {
    Yn(this.restEncoder, t);
  }
  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey(t) {
    const n = this.keyMap.get(t);
    n === void 0 ? (this.keyClockEncoder.write(this.keyClock++), this.stringEncoder.write(t)) : this.keyClockEncoder.write(n);
  }
}
const kl = (e, t, n, r) => {
  r = vn(r, t[0].id.clock);
  const s = ue(t, r);
  B(e.restEncoder, t.length - s), e.writeClient(n), B(e.restEncoder, r);
  const i = t[s];
  i.write(e, r - i.id.clock);
  for (let o = s + 1; o < t.length; o++)
    t[o].write(e, 0);
}, Is = (e, t, n) => {
  const r = /* @__PURE__ */ new Map();
  n.forEach((s, i) => {
    wt(t, i) > s && r.set(i, s);
  }), or(t).forEach((s, i) => {
    n.has(i) || r.set(i, 0);
  }), B(e.restEncoder, r.size), Ne(r.entries()).sort((s, i) => i[0] - s[0]).forEach(([s, i]) => {
    kl(
      e,
      /** @type {Array<GC|Item>} */
      t.clients.get(s),
      s,
      i
    );
  });
}, Cl = (e, t) => {
  const n = Ut(), r = G(e.restDecoder);
  for (let s = 0; s < r; s++) {
    const i = G(e.restDecoder), o = new Array(i), c = e.readClient();
    let l = G(e.restDecoder);
    n.set(c, { i: 0, refs: o });
    for (let u = 0; u < i; u++) {
      const a = e.readInfo();
      switch (Tr & a) {
        case 0: {
          const h = e.readLen();
          o[u] = new te(W(c, l), h), l += h;
          break;
        }
        case 10: {
          const h = G(e.restDecoder);
          o[u] = new Qt(W(c, l), h), l += h;
          break;
        }
        default: {
          const h = (a & (Me | oe)) === 0, d = new ct(
            W(c, l),
            null,
            // left
            (a & oe) === oe ? e.readLeftID() : null,
            // origin
            null,
            // right
            (a & Me) === Me ? e.readRightID() : null,
            // right origin
            h ? e.readParentInfo() ? t.get(e.readString()) : e.readLeftID() : null,
            // parent
            h && (a & Gn) === Gn ? e.readString() : null,
            // parentSub
            Po(e, a)
            // item content
          );
          o[u] = d, l += d.length;
        }
      }
    }
  }
  return n;
}, El = (e, t, n) => {
  const r = [];
  let s = Ne(n.keys()).sort((g, y) => g - y);
  if (s.length === 0)
    return null;
  const i = () => {
    if (s.length === 0)
      return null;
    let g = (
      /** @type {{i:number,refs:Array<GC|Item>}} */
      n.get(s[s.length - 1])
    );
    for (; g.refs.length === g.i; )
      if (s.pop(), s.length > 0)
        g = /** @type {{i:number,refs:Array<GC|Item>}} */
        n.get(s[s.length - 1]);
      else
        return null;
    return g;
  };
  let o = i();
  if (o === null)
    return null;
  const c = new so(), l = /* @__PURE__ */ new Map(), u = (g, y) => {
    const E = l.get(g);
    (E == null || E > y) && l.set(g, y);
  };
  let a = (
    /** @type {any} */
    o.refs[
      /** @type {any} */
      o.i++
    ]
  );
  const h = /* @__PURE__ */ new Map(), d = () => {
    for (const g of r) {
      const y = g.id.client, E = n.get(y);
      E ? (E.i--, c.clients.set(y, E.refs.slice(E.i)), n.delete(y), E.i = 0, E.refs = []) : c.clients.set(y, [g]), s = s.filter((D) => D !== y);
    }
    r.length = 0;
  };
  for (; ; ) {
    if (a.constructor !== Qt) {
      const y = Kt(h, a.id.client, () => wt(t, a.id.client)) - a.id.clock;
      if (y < 0)
        r.push(a), u(a.id.client, a.id.clock - 1), d();
      else {
        const E = a.getMissing(e, t);
        if (E !== null) {
          r.push(a);
          const D = n.get(
            /** @type {number} */
            E
          ) || { refs: [], i: 0 };
          if (D.refs.length === D.i)
            u(
              /** @type {number} */
              E,
              wt(t, E)
            ), d();
          else {
            a = D.refs[D.i++];
            continue;
          }
        } else
          (y === 0 || y < a.length) && (a.integrate(e, y), h.set(a.id.client, a.id.clock + a.length));
      }
    }
    if (r.length > 0)
      a = /** @type {GC|Item} */
      r.pop();
    else if (o !== null && o.i < o.refs.length)
      a = /** @type {GC|Item} */
      o.refs[o.i++];
    else {
      if (o = i(), o === null)
        break;
      a = /** @type {GC|Item} */
      o.refs[o.i++];
    }
  }
  if (c.clients.size > 0) {
    const g = new we();
    return Is(g, c, /* @__PURE__ */ new Map()), B(g.restEncoder, 0), { missing: l, update: g.toUint8Array() };
  }
  return null;
}, Al = (e, t) => Is(e, t.doc.store, t.beforeState), Ts = (e, t, n, r = new ce(e)) => lt(t, (s) => {
  s.local = !1;
  let i = !1;
  const o = s.doc, c = o.store, l = Cl(r, o), u = El(s, c, l), a = c.pendingStructs;
  if (a) {
    for (const [d, g] of a.missing)
      if (g < wt(c, d)) {
        i = !0;
        break;
      }
    if (u) {
      for (const [d, g] of u.missing) {
        const y = a.missing.get(d);
        (y == null || y > g) && a.missing.set(d, g);
      }
      a.update = tr([a.update, u.update]);
    }
  } else
    c.pendingStructs = u;
  const h = li(r, s, c);
  if (c.pendingDs) {
    const d = new ce(Bt(c.pendingDs));
    G(d.restDecoder);
    const g = li(d, s, c);
    h && g ? c.pendingDs = tr([h, g]) : c.pendingDs = h || g;
  } else
    c.pendingDs = h;
  if (i) {
    const d = (
      /** @type {{update: Uint8Array}} */
      c.pendingStructs.update
    );
    c.pendingStructs = null, Br(s.doc, d);
  }
}, n, !1), Dl = (e, t, n) => Ts(e, t, n, new fe(e)), Br = (e, t, n, r = ce) => {
  const s = Bt(t);
  Ts(s, e, n, new r(s));
}, Yi = (e, t, n) => Br(e, t, n, fe), Ol = (e, t, n = /* @__PURE__ */ new Map()) => {
  Is(e, t.store, n), Oe(e, xs(t.store));
}, Xi = (e, t = new Uint8Array([0]), n = new we()) => {
  const r = Ms(t);
  Ol(n, e, r);
  const s = [n.toUint8Array()];
  if (e.store.pendingDs && s.push(e.store.pendingDs), e.store.pendingStructs && s.push(Fs(e.store.pendingStructs.update, t)), s.length > 1) {
    if (n.constructor === on)
      return go(s.map((i, o) => o === 0 ? i : wo(i)));
    if (n.constructor === we)
      return tr(s);
  }
  return s[0];
}, Ki = (e, t) => Xi(e, t, new on()), Qi = (e) => {
  const t = /* @__PURE__ */ new Map(), n = G(e.restDecoder);
  for (let r = 0; r < n; r++) {
    const s = G(e.restDecoder), i = G(e.restDecoder);
    t.set(s, i);
  }
  return t;
}, Ms = (e) => Qi(new Qn(Bt(e))), Rs = (e, t) => (B(e.restEncoder, t.size), Ne(t.entries()).sort((n, r) => r[0] - n[0]).forEach(([n, r]) => {
  B(e.restEncoder, n), B(e.restEncoder, r);
}), e), Ll = (e, t) => Rs(e, or(t.store)), xl = (e, t = new Ur()) => (e instanceof Map ? Rs(t, e) : Ll(t, e), t.toUint8Array()), Zi = (e) => xl(e, new Tn());
class Il {
  constructor() {
    this.l = [];
  }
}
const ai = () => new Il(), ui = (e, t) => e.l.push(t), hi = (e, t) => {
  const n = e.l, r = n.length;
  e.l = n.filter((s) => t !== s), r === e.l.length && console.error("[yjs] Tried to remove event handler that doesn't exist.");
}, to = (e, t, n) => As(e.l, [t, n]);
class pn {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor(t, n) {
    this.client = t, this.clock = n;
  }
}
const fn = (e, t) => e === t || e !== null && t !== null && e.client === t.client && e.clock === t.clock, W = (e, t) => new pn(e, t), fi = (e, t) => {
  B(e, t.client), B(e, t.clock);
}, di = (e) => W(G(e), G(e)), js = (e) => {
  for (const [t, n] of e.doc.share.entries())
    if (n === e)
      return t;
  throw ee();
}, Zn = (e, t) => {
  for (; t !== null; ) {
    if (t.parent === e)
      return !0;
    t = /** @type {AbstractType<any>} */
    t.parent._item;
  }
  return !1;
}, Tl = (e) => {
  const t = [];
  let n = e._start;
  for (; n; )
    t.push(n), n = n.right;
  console.log("Children: ", t), console.log("Children content: ", t.filter((r) => !r.deleted).map((r) => r.content));
};
class Ml {
  /**
   * @param {Doc} doc
   * @param {YMap<any>} [storeType]
   */
  constructor(t, n = t.getMap("users")) {
    const r = /* @__PURE__ */ new Map();
    this.yusers = n, this.doc = t, this.clients = /* @__PURE__ */ new Map(), this.dss = r;
    const s = (i, o) => {
      const c = i.get("ds"), l = i.get("ids"), u = (
        /** @param {number} clientid */
        (a) => this.clients.set(a, o)
      );
      c.observe(
        /** @param {YArrayEvent<any>} event */
        (a) => {
          a.changes.added.forEach((h) => {
            h.content.getContent().forEach((d) => {
              d instanceof Uint8Array && this.dss.set(o, mn([this.dss.get(o) || Nr(), Be(new Qn(Bt(d)))]));
            });
          });
        }
      ), this.dss.set(o, mn(c.map((a) => Be(new Qn(Bt(a)))))), l.observe(
        /** @param {YArrayEvent<any>} event */
        (a) => a.changes.added.forEach((h) => h.content.getContent().forEach(u))
      ), l.forEach(u);
    };
    n.observe((i) => {
      i.keysChanged.forEach(
        (o) => s(n.get(o), o)
      );
    }), n.forEach(s);
  }
  /**
   * @param {Doc} doc
   * @param {number} clientid
   * @param {string} userDescription
   * @param {Object} conf
   * @param {function(Transaction, DeleteSet):boolean} [conf.filter]
   */
  setUserMapping(t, n, r, { filter: s = () => !0 } = {}) {
    const i = this.yusers;
    let o = i.get(r);
    o || (o = new en(), o.set("ids", new je()), o.set("ds", new je()), i.set(r, o)), o.get("ids").push([n]), i.observe((c) => {
      setTimeout(() => {
        const l = i.get(r);
        if (l !== o) {
          o = l, this.clients.forEach((h, d) => {
            r === h && o.get("ids").push([d]);
          });
          const u = new Tn(), a = this.dss.get(r);
          a && (Oe(u, a), o.get("ds").push([u.toUint8Array()]));
        }
      }, 0);
    }), t.on(
      "afterTransaction",
      /** @param {Transaction} transaction */
      (c) => {
        setTimeout(() => {
          const l = o.get("ds"), u = c.deleteSet;
          if (c.local && u.clients.size > 0 && s(c, u)) {
            const a = new Tn();
            Oe(a, u), l.push([a.toUint8Array()]);
          }
        });
      }
    );
  }
  /**
   * @param {number} clientid
   * @return {any}
   */
  getUserByClientId(t) {
    return this.clients.get(t) || null;
  }
  /**
   * @param {ID} id
   * @return {string | null}
   */
  getUserByDeletedId(t) {
    for (const [n, r] of this.dss.entries())
      if (Sn(r, t))
        return n;
    return null;
  }
}
class Fr {
  /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   * @param {number} assoc
   */
  constructor(t, n, r, s = 0) {
    this.type = t, this.tname = n, this.item = r, this.assoc = s;
  }
}
const Rl = (e) => {
  const t = {};
  return e.type && (t.type = e.type), e.tname && (t.tname = e.tname), e.item && (t.item = e.item), e.assoc != null && (t.assoc = e.assoc), t;
}, us = (e) => new Fr(e.type == null ? null : W(e.type.client, e.type.clock), e.tname ?? null, e.item == null ? null : W(e.item.client, e.item.clock), e.assoc == null ? 0 : e.assoc);
class eo {
  /**
   * @param {AbstractType<any>} type
   * @param {number} index
   * @param {number} [assoc]
   */
  constructor(t, n, r = 0) {
    this.type = t, this.index = n, this.assoc = r;
  }
}
const jl = (e, t, n = 0) => new eo(e, t, n), wr = (e, t, n) => {
  let r = null, s = null;
  return e._item === null ? s = js(e) : r = W(e._item.id.client, e._item.id.clock), new Fr(r, s, t, n);
}, hs = (e, t, n = 0) => {
  let r = e._start;
  if (n < 0) {
    if (t === 0)
      return wr(e, null, n);
    t--;
  }
  for (; r !== null; ) {
    if (!r.deleted && r.countable) {
      if (r.length > t)
        return wr(e, W(r.id.client, r.id.clock + t), n);
      t -= r.length;
    }
    if (r.right === null && n < 0)
      return wr(e, r.lastId, n);
    r = r.right;
  }
  return wr(e, null, n);
}, Nl = (e, t) => {
  const { type: n, tname: r, item: s, assoc: i } = t;
  if (s !== null)
    B(e, 0), fi(e, s);
  else if (r !== null)
    Jn(e, 1), Xe(e, r);
  else if (n !== null)
    Jn(e, 2), fi(e, n);
  else
    throw ee();
  return Mr(e, i), e;
}, Ul = (e) => {
  const t = Nt();
  return Nl(t, e), gt(t);
}, Bl = (e) => {
  let t = null, n = null, r = null;
  switch (G(e)) {
    case 0:
      r = di(e);
      break;
    case 1:
      n = Re(e);
      break;
    case 2:
      t = di(e);
  }
  const s = Oi(e) ? jr(e) : 0;
  return new Fr(t, n, r, s);
}, Fl = (e) => Bl(Bt(e)), Vl = (e, t) => {
  const n = yn(e, t), r = t.clock - n.id.clock;
  return {
    item: n,
    diff: r
  };
}, fs = (e, t, n = !0) => {
  const r = t.store, s = e.item, i = e.type, o = e.tname, c = e.assoc;
  let l = null, u = 0;
  if (s !== null) {
    if (wt(r, s.client) <= s.clock)
      return null;
    const a = n ? ms(r, s) : Vl(r, s), h = a.item;
    if (!(h instanceof ct))
      return null;
    if (l = /** @type {AbstractType<any>} */
    h.parent, l._item === null || !l._item.deleted) {
      u = h.deleted || !h.countable ? 0 : a.diff + (c >= 0 ? 0 : 1);
      let d = h.left;
      for (; d !== null; )
        !d.deleted && d.countable && (u += d.length), d = d.left;
    }
  } else {
    if (o !== null)
      l = t.get(o);
    else if (i !== null) {
      if (wt(r, i.client) <= i.clock)
        return null;
      const { item: a } = n ? ms(r, i) : { item: yn(r, i) };
      if (a instanceof ct && a.content instanceof de)
        l = a.content.type;
      else
        return null;
    } else
      throw ee();
    c >= 0 ? u = l._length : u = 0;
  }
  return jl(l, u, e.assoc);
}, ds = (e, t) => e === t || e !== null && t !== null && e.tname === t.tname && fn(e.item, t.item) && fn(e.type, t.type) && e.assoc === t.assoc;
class Ns {
  /**
   * @param {DeleteSet} ds
   * @param {Map<number,number>} sv state map
   */
  constructor(t, n) {
    this.ds = t, this.sv = n;
  }
}
const zl = (e, t) => {
  const n = e.ds.clients, r = t.ds.clients, s = e.sv, i = t.sv;
  if (s.size !== i.size || n.size !== r.size)
    return !1;
  for (const [o, c] of s.entries())
    if (i.get(o) !== c)
      return !1;
  for (const [o, c] of n.entries()) {
    const l = r.get(o) || [];
    if (c.length !== l.length)
      return !1;
    for (let u = 0; u < c.length; u++) {
      const a = c[u], h = l[u];
      if (a.clock !== h.clock || a.len !== h.len)
        return !1;
    }
  }
  return !0;
}, no = (e, t = new Ur()) => (Oe(t, e.ds), Rs(t, e.sv), t.toUint8Array()), ql = (e) => no(e, new Tn()), ro = (e, t = new Ji(Bt(e))) => new Ns(Be(t), Qi(t)), Pl = (e) => ro(e, new Qn(Bt(e))), Us = (e, t) => new Ns(e, t), Hl = Us(Nr(), /* @__PURE__ */ new Map()), $l = (e) => Us(xs(e.store), or(e.store)), We = (e, t) => t === void 0 ? !e.deleted : t.sv.has(e.id.client) && (t.sv.get(e.id.client) || 0) > e.id.clock && !Sn(t.ds, e.id), gs = (e, t) => {
  const n = Kt(e.meta, gs, Ke), r = e.doc.store;
  n.has(t) || (t.sv.forEach((s, i) => {
    s < wt(r, i) && Wt(e, W(i, s));
  }), _n(e, t.ds, (s) => {
  }), n.add(t));
}, Gl = (e, t, n = new sn()) => {
  if (e.gc)
    throw new Error("Garbage-collection must be disabled in `originDoc`!");
  const { sv: r, ds: s } = t, i = new we();
  return e.transact((o) => {
    let c = 0;
    r.forEach((l) => {
      l > 0 && c++;
    }), B(i.restEncoder, c);
    for (const [l, u] of r) {
      if (u === 0)
        continue;
      u < wt(e.store, l) && Wt(o, W(l, u));
      const a = e.store.clients.get(l) || [], h = ue(a, u - 1);
      B(i.restEncoder, h + 1), i.writeClient(l), B(i.restEncoder, 0);
      for (let d = 0; d <= h; d++)
        a[d].write(i, 0);
    }
    Oe(i, s);
  }), Br(n, i.toUint8Array(), "snapshot"), n;
}, Wl = (e, t, n = ce) => {
  const r = new n(Bt(t)), s = new cn(r, !1);
  for (let o = s.curr; o !== null; o = s.next())
    if ((e.sv.get(o.id.client) || 0) < o.id.clock + o.length)
      return !1;
  const i = mn([e.ds, Be(r)]);
  return Gi(e.ds, i);
}, Jl = (e, t) => Wl(e, t, fe);
class so {
  constructor() {
    this.clients = /* @__PURE__ */ new Map(), this.pendingStructs = null, this.pendingDs = null;
  }
}
const or = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.clients.forEach((n, r) => {
    const s = n[n.length - 1];
    t.set(r, s.id.clock + s.length);
  }), t;
}, wt = (e, t) => {
  const n = e.clients.get(t);
  if (n === void 0)
    return 0;
  const r = n[n.length - 1];
  return r.id.clock + r.length;
}, io = (e, t) => {
  let n = e.clients.get(t.id.client);
  if (n === void 0)
    n = [], e.clients.set(t.id.client, n);
  else {
    const r = n[n.length - 1];
    if (r.id.clock + r.length !== t.id.clock)
      throw ee();
  }
  n.push(t);
}, ue = (e, t) => {
  let n = 0, r = e.length - 1, s = e[r], i = s.id.clock;
  if (i === t)
    return r;
  let o = Ue(t / (i + s.length - 1) * r);
  for (; n <= r; ) {
    if (s = e[o], i = s.id.clock, i <= t) {
      if (t < i + s.length)
        return o;
      n = o + 1;
    } else
      r = o - 1;
    o = Ue((n + r) / 2);
  }
  throw ee();
}, Yl = (e, t) => {
  const n = e.clients.get(t.client);
  return n[ue(n, t.clock)];
}, yn = (
  /** @type {function(StructStore,ID):Item} */
  Yl
), ps = (e, t, n) => {
  const r = ue(t, n), s = t[r];
  return s.id.clock < n && s instanceof ct ? (t.splice(r + 1, 0, xr(e, s, n - s.id.clock)), r + 1) : r;
}, Wt = (e, t) => {
  const n = (
    /** @type {Array<Item>} */
    e.doc.store.clients.get(t.client)
  );
  return n[ps(e, n, t.clock)];
}, ys = (e, t, n) => {
  const r = t.clients.get(n.client), s = ue(r, n.clock), i = r[s];
  return n.clock !== i.id.clock + i.length - 1 && i.constructor !== te && r.splice(s + 1, 0, xr(e, i, n.clock - i.id.clock + 1)), i;
}, Xl = (e, t, n) => {
  const r = (
    /** @type {Array<GC|Item>} */
    e.clients.get(t.id.client)
  );
  r[ue(r, t.id.clock)] = n;
}, oo = (e, t, n, r, s) => {
  if (r === 0)
    return;
  const i = n + r;
  let o = ps(e, t, n), c;
  do
    c = t[o++], i < c.id.clock + c.length && ps(e, t, i), s(c);
  while (o < t.length && t[o].id.clock < i);
};
class co {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor(t, n, r) {
    this.doc = t, this.deleteSet = new jn(), this.beforeState = or(t.store), this.afterState = /* @__PURE__ */ new Map(), this.changed = /* @__PURE__ */ new Map(), this.changedParentTypes = /* @__PURE__ */ new Map(), this._mergeStructs = [], this.origin = n, this.meta = /* @__PURE__ */ new Map(), this.local = r, this.subdocsAdded = /* @__PURE__ */ new Set(), this.subdocsRemoved = /* @__PURE__ */ new Set(), this.subdocsLoaded = /* @__PURE__ */ new Set(), this._needFormattingCleanup = !1;
  }
}
const gi = (e, t) => t.deleteSet.clients.size === 0 && !nc(t.afterState, (n, r) => t.beforeState.get(r) !== n) ? !1 : (Ls(t.deleteSet), Al(e, t), Oe(e, t.deleteSet), !0), pi = (e, t, n) => {
  const r = t._item;
  (r === null || r.id.clock < (e.beforeState.get(r.id.client) || 0) && !r.deleted) && Kt(e.changed, t, Ke).add(n);
}, Ar = (e, t) => {
  let n = e[t], r = e[t - 1], s = t;
  for (; s > 0; n = r, r = e[--s - 1]) {
    if (r.deleted === n.deleted && r.constructor === n.constructor && r.mergeWith(n)) {
      n instanceof ct && n.parentSub !== null && /** @type {AbstractType<any>} */
      n.parent._map.get(n.parentSub) === n && n.parent._map.set(
        n.parentSub,
        /** @type {Item} */
        r
      );
      continue;
    }
    break;
  }
  const i = t - s;
  return i && e.splice(t + 1 - i, i), i;
}, lo = (e, t, n) => {
  for (const [r, s] of e.clients.entries()) {
    const i = (
      /** @type {Array<GC|Item>} */
      t.clients.get(r)
    );
    for (let o = s.length - 1; o >= 0; o--) {
      const c = s[o], l = c.clock + c.len;
      for (let u = ue(i, c.clock), a = i[u]; u < i.length && a.id.clock < l; a = i[++u]) {
        const h = i[u];
        if (c.clock + c.len <= h.id.clock)
          break;
        h instanceof ct && h.deleted && !h.keep && n(h) && h.gc(t, !1);
      }
    }
  }
}, ao = (e, t) => {
  e.clients.forEach((n, r) => {
    const s = (
      /** @type {Array<GC|Item>} */
      t.clients.get(r)
    );
    for (let i = n.length - 1; i >= 0; i--) {
      const o = n[i], c = vs(s.length - 1, 1 + ue(s, o.clock + o.len - 1));
      for (let l = c, u = s[l]; l > 0 && u.id.clock >= o.clock; u = s[l])
        l -= 1 + Ar(s, l);
    }
  });
}, Kl = (e, t, n) => {
  lo(e, t, n), ao(e, t);
}, uo = (e, t) => {
  if (t < e.length) {
    const n = e[t], r = n.doc, s = r.store, i = n.deleteSet, o = n._mergeStructs;
    try {
      Ls(i), n.afterState = or(n.doc.store), r.emit("beforeObserverCalls", [n, r]);
      const c = [];
      n.changed.forEach(
        (l, u) => c.push(() => {
          (u._item === null || !u._item.deleted) && u._callObserver(n, l);
        })
      ), c.push(() => {
        n.changedParentTypes.forEach((l, u) => {
          u._dEH.l.length > 0 && (u._item === null || !u._item.deleted) && (l = l.filter(
            (a) => a.target._item === null || !a.target._item.deleted
          ), l.forEach((a) => {
            a.currentTarget = u, a._path = null;
          }), l.sort((a, h) => a.path.length - h.path.length), to(u._dEH, l, n));
        });
      }), c.push(() => r.emit("afterTransaction", [n, r])), As(c, []), n._needFormattingCleanup && Sa(n);
    } finally {
      r.gc && lo(i, s, r.gcFilter), ao(i, s), n.afterState.forEach((a, h) => {
        const d = n.beforeState.get(h) || 0;
        if (d !== a) {
          const g = (
            /** @type {Array<GC|Item>} */
            s.clients.get(h)
          ), y = vn(ue(g, d), 1);
          for (let E = g.length - 1; E >= y; )
            E -= 1 + Ar(g, E);
        }
      });
      for (let a = o.length - 1; a >= 0; a--) {
        const { client: h, clock: d } = o[a].id, g = (
          /** @type {Array<GC|Item>} */
          s.clients.get(h)
        ), y = ue(g, d);
        y + 1 < g.length && Ar(g, y + 1) > 1 || y > 0 && Ar(g, y);
      }
      if (!n.local && n.afterState.get(r.clientID) !== n.beforeState.get(r.clientID) && (as(Ds, Fi, "[yjs] ", Vi, zi, "Changed the client-id because another client seems to be using it."), r.clientID = Wi()), r.emit("afterTransactionCleanup", [n, r]), r._observers.has("update")) {
        const a = new on();
        gi(a, n) && r.emit("update", [a.toUint8Array(), n.origin, r, n]);
      }
      if (r._observers.has("updateV2")) {
        const a = new we();
        gi(a, n) && r.emit("updateV2", [a.toUint8Array(), n.origin, r, n]);
      }
      const { subdocsAdded: c, subdocsLoaded: l, subdocsRemoved: u } = n;
      (c.size > 0 || u.size > 0 || l.size > 0) && (c.forEach((a) => {
        a.clientID = r.clientID, a.collectionid == null && (a.collectionid = r.collectionid), r.subdocs.add(a);
      }), u.forEach((a) => r.subdocs.delete(a)), r.emit("subdocs", [{ loaded: l, added: c, removed: u }, r, n]), u.forEach((a) => a.destroy())), e.length <= t + 1 ? (r._transactionCleanups = [], r.emit("afterAllTransactions", [r, e])) : uo(e, t + 1);
    }
  }
}, lt = (e, t, n = null, r = !0) => {
  const s = e._transactionCleanups;
  let i = !1, o = null;
  e._transaction === null && (i = !0, e._transaction = new co(e, n, r), s.push(e._transaction), s.length === 1 && e.emit("beforeAllTransactions", [e]), e.emit("beforeTransaction", [e._transaction, e]));
  try {
    o = t(e._transaction);
  } finally {
    if (i) {
      const c = e._transaction === s[0];
      e._transaction = null, c && uo(s, 0);
    }
  }
  return o;
};
class Ql {
  /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */
  constructor(t, n) {
    this.insertions = n, this.deletions = t, this.meta = /* @__PURE__ */ new Map();
  }
}
const yi = (e, t, n) => {
  _n(e, n.deletions, (r) => {
    r instanceof ct && t.scope.some((s) => s === e.doc || Zn(
      /** @type {AbstractType<any>} */
      s,
      r
    )) && Hs(r, !1);
  });
}, _i = (e, t, n) => {
  let r = null;
  const s = e.doc, i = e.scope;
  lt(s, (c) => {
    for (; t.length > 0 && e.currStackItem === null; ) {
      const l = s.store, u = (
        /** @type {StackItem} */
        t.pop()
      ), a = /* @__PURE__ */ new Set(), h = [];
      let d = !1;
      _n(c, u.insertions, (g) => {
        if (g instanceof ct) {
          if (g.redone !== null) {
            let { item: y, diff: E } = ms(l, g.id);
            E > 0 && (y = Wt(c, W(y.id.client, y.id.clock + E))), g = y;
          }
          !g.deleted && i.some((y) => y === c.doc || Zn(
            /** @type {AbstractType<any>} */
            y,
            /** @type {Item} */
            g
          )) && h.push(g);
        }
      }), _n(c, u.deletions, (g) => {
        g instanceof ct && i.some((y) => y === c.doc || Zn(
          /** @type {AbstractType<any>} */
          y,
          g
        )) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
        !Sn(u.insertions, g.id) && a.add(g);
      }), a.forEach((g) => {
        d = qo(c, g, a, u.insertions, e.ignoreRemoteMapChanges, e) !== null || d;
      });
      for (let g = h.length - 1; g >= 0; g--) {
        const y = h[g];
        e.deleteFilter(y) && (y.delete(c), d = !0);
      }
      e.currStackItem = d ? u : null;
    }
    c.changed.forEach((l, u) => {
      l.has(null) && u._searchMarker && (u._searchMarker.length = 0);
    }), r = c;
  }, e);
  const o = e.currStackItem;
  if (o != null) {
    const c = r.changedParentTypes;
    e.emit("stack-item-popped", [{ stackItem: o, type: n, changedParentTypes: c, origin: e }, e]), e.currStackItem = null;
  }
  return o;
};
class Zl extends Ir {
  /**
   * @param {Doc|AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */
  constructor(t, {
    captureTimeout: n = 500,
    captureTransaction: r = (l) => !0,
    deleteFilter: s = () => !0,
    trackedOrigins: i = /* @__PURE__ */ new Set([null]),
    ignoreRemoteMapChanges: o = !1,
    doc: c = (
      /** @type {Doc} */
      is(t) ? t[0].doc : t instanceof sn ? t : t.doc
    )
  } = {}) {
    super(), this.scope = [], this.doc = c, this.addToScope(t), this.deleteFilter = s, i.add(this), this.trackedOrigins = i, this.captureTransaction = r, this.undoStack = [], this.redoStack = [], this.undoing = !1, this.redoing = !1, this.currStackItem = null, this.lastChange = 0, this.ignoreRemoteMapChanges = o, this.captureTimeout = n, this.afterTransactionHandler = (l) => {
      if (!this.captureTransaction(l) || !this.scope.some((D) => l.changedParentTypes.has(
        /** @type {AbstractType<any>} */
        D
      ) || D === this.doc) || !this.trackedOrigins.has(l.origin) && (!l.origin || !this.trackedOrigins.has(l.origin.constructor)))
        return;
      const u = this.undoing, a = this.redoing, h = u ? this.redoStack : this.undoStack;
      u ? this.stopCapturing() : a || this.clear(!1, !0);
      const d = new jn();
      l.afterState.forEach((D, S) => {
        const _ = l.beforeState.get(S) || 0, f = D - _;
        f > 0 && Kn(d, S, _, f);
      });
      const g = Ze();
      let y = !1;
      if (this.lastChange > 0 && g - this.lastChange < this.captureTimeout && h.length > 0 && !u && !a) {
        const D = h[h.length - 1];
        D.deletions = mn([D.deletions, l.deleteSet]), D.insertions = mn([D.insertions, d]);
      } else
        h.push(new Ql(l.deleteSet, d)), y = !0;
      !u && !a && (this.lastChange = g), _n(
        l,
        l.deleteSet,
        /** @param {Item|GC} item */
        (D) => {
          D instanceof ct && this.scope.some((S) => S === l.doc || Zn(
            /** @type {AbstractType<any>} */
            S,
            D
          )) && Hs(D, !0);
        }
      );
      const E = [{ stackItem: h[h.length - 1], origin: l.origin, type: u ? "redo" : "undo", changedParentTypes: l.changedParentTypes }, this];
      y ? this.emit("stack-item-added", E) : this.emit("stack-item-updated", E);
    }, this.doc.on("afterTransaction", this.afterTransactionHandler), this.doc.on("destroy", () => {
      this.destroy();
    });
  }
  /**
   * @param {Array<AbstractType<any> | Doc> | AbstractType<any> | Doc} ytypes
   */
  addToScope(t) {
    const n = new Set(this.scope);
    t = is(t) ? t : [t], t.forEach((r) => {
      n.has(r) || (n.add(r), (r instanceof Tt ? r.doc !== this.doc : r !== this.doc) && Pi("[yjs#509] Not same Y.Doc"), this.scope.push(r));
    });
  }
  /**
   * @param {any} origin
   */
  addTrackedOrigin(t) {
    this.trackedOrigins.add(t);
  }
  /**
   * @param {any} origin
   */
  removeTrackedOrigin(t) {
    this.trackedOrigins.delete(t);
  }
  clear(t = !0, n = !0) {
    (t && this.canUndo() || n && this.canRedo()) && this.doc.transact((r) => {
      t && (this.undoStack.forEach((s) => yi(r, this, s)), this.undoStack = []), n && (this.redoStack.forEach((s) => yi(r, this, s)), this.redoStack = []), this.emit("stack-cleared", [{ undoStackCleared: t, redoStackCleared: n }]);
    });
  }
  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing() {
    this.lastChange = 0;
  }
  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo() {
    this.undoing = !0;
    let t;
    try {
      t = _i(this, this.undoStack, "undo");
    } finally {
      this.undoing = !1;
    }
    return t;
  }
  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo() {
    this.redoing = !0;
    let t;
    try {
      t = _i(this, this.redoStack, "redo");
    } finally {
      this.redoing = !1;
    }
    return t;
  }
  /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */
  canUndo() {
    return this.undoStack.length > 0;
  }
  /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */
  canRedo() {
    return this.redoStack.length > 0;
  }
  destroy() {
    this.trackedOrigins.delete(this), this.doc.off("afterTransaction", this.afterTransactionHandler), super.destroy();
  }
}
function* ta(e) {
  const t = G(e.restDecoder);
  for (let n = 0; n < t; n++) {
    const r = G(e.restDecoder), s = e.readClient();
    let i = G(e.restDecoder);
    for (let o = 0; o < r; o++) {
      const c = e.readInfo();
      if (c === 10) {
        const l = G(e.restDecoder);
        yield new Qt(W(s, i), l), i += l;
      } else if (Tr & c) {
        const l = (c & (Me | oe)) === 0, u = new ct(
          W(s, i),
          null,
          // left
          (c & oe) === oe ? e.readLeftID() : null,
          // origin
          null,
          // right
          (c & Me) === Me ? e.readRightID() : null,
          // right origin
          // @ts-ignore Force writing a string here.
          l ? e.readParentInfo() ? e.readString() : e.readLeftID() : null,
          // parent
          l && (c & Gn) === Gn ? e.readString() : null,
          // parentSub
          Po(e, c)
          // item content
        );
        yield u, i += u.length;
      } else {
        const l = e.readLen();
        yield new te(W(s, i), l), i += l;
      }
    }
  }
}
class cn {
  /**
   * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
   * @param {boolean} filterSkips
   */
  constructor(t, n) {
    this.gen = ta(t), this.curr = null, this.done = !1, this.filterSkips = n, this.next();
  }
  /**
   * @return {Item | GC | Skip |null}
   */
  next() {
    do
      this.curr = this.gen.next().value || null;
    while (this.filterSkips && this.curr !== null && this.curr.constructor === Qt);
    return this.curr;
  }
}
const ea = (e) => ho(e, fe), ho = (e, t = ce) => {
  const n = [], r = new t(Bt(e)), s = new cn(r, !1);
  for (let o = s.curr; o !== null; o = s.next())
    n.push(o);
  as("Structs: ", n);
  const i = Be(r);
  as("DeleteSet: ", i);
}, na = (e) => fo(e, fe), fo = (e, t = ce) => {
  const n = [], r = new t(Bt(e)), s = new cn(r, !1);
  for (let i = s.curr; i !== null; i = s.next())
    n.push(i);
  return {
    structs: n,
    ds: Be(r)
  };
};
class Bs {
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  constructor(t) {
    this.currClient = 0, this.startClock = 0, this.written = 0, this.encoder = t, this.clientStructs = [];
  }
}
const go = (e) => tr(e, fe, on), po = (e, t = Ur, n = ce) => {
  const r = new t(), s = new cn(new n(Bt(e)), !1);
  let i = s.curr;
  if (i !== null) {
    let o = 0, c = i.id.client, l = i.id.clock !== 0, u = l ? 0 : i.id.clock + i.length;
    for (; i !== null; i = s.next())
      c !== i.id.client && (u !== 0 && (o++, B(r.restEncoder, c), B(r.restEncoder, u)), c = i.id.client, u = 0, l = i.id.clock !== 0), i.constructor === Qt && (l = !0), l || (u = i.id.clock + i.length);
    u !== 0 && (o++, B(r.restEncoder, c), B(r.restEncoder, u));
    const a = Nt();
    return B(a, o), kc(a, r.restEncoder), r.restEncoder = a, r.toUint8Array();
  } else
    return B(r.restEncoder, 0), r.toUint8Array();
}, ra = (e) => po(e, Tn, fe), yo = (e, t = ce) => {
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = new cn(new t(Bt(e)), !1);
  let i = s.curr;
  if (i !== null) {
    let o = i.id.client, c = i.id.clock;
    for (n.set(o, c); i !== null; i = s.next())
      o !== i.id.client && (r.set(o, c), n.set(i.id.client, i.id.clock), o = i.id.client), c = i.id.clock + i.length;
    r.set(o, c);
  }
  return { from: n, to: r };
}, sa = (e) => yo(e, fe), ia = (e, t) => {
  if (e.constructor === te) {
    const { client: n, clock: r } = e.id;
    return new te(W(n, r + t), e.length - t);
  } else if (e.constructor === Qt) {
    const { client: n, clock: r } = e.id;
    return new Qt(W(n, r + t), e.length - t);
  } else {
    const n = (
      /** @type {Item} */
      e
    ), { client: r, clock: s } = n.id;
    return new ct(
      W(r, s + t),
      null,
      W(r, s + t - 1),
      null,
      n.rightOrigin,
      n.parent,
      n.parentSub,
      n.content.splice(t)
    );
  }
}, tr = (e, t = ce, n = we) => {
  if (e.length === 1)
    return e[0];
  const r = e.map((a) => new t(Bt(a)));
  let s = r.map((a) => new cn(a, !0)), i = null;
  const o = new n(), c = new Bs(o);
  for (; s = s.filter((d) => d.curr !== null), s.sort(
    /** @type {function(any,any):number} */
    (d, g) => {
      if (d.curr.id.client === g.curr.id.client) {
        const y = d.curr.id.clock - g.curr.id.clock;
        return y === 0 ? d.curr.constructor === g.curr.constructor ? 0 : d.curr.constructor === Qt ? 1 : -1 : y;
      } else
        return g.curr.id.client - d.curr.id.client;
    }
  ), s.length !== 0; ) {
    const a = s[0], h = (
      /** @type {Item | GC} */
      a.curr.id.client
    );
    if (i !== null) {
      let d = (
        /** @type {Item | GC | null} */
        a.curr
      ), g = !1;
      for (; d !== null && d.id.clock + d.length <= i.struct.id.clock + i.struct.length && d.id.client >= i.struct.id.client; )
        d = a.next(), g = !0;
      if (d === null || // current decoder is empty
      d.id.client !== h || // check whether there is another decoder that has has updates from `firstClient`
      g && d.id.clock > i.struct.id.clock + i.struct.length)
        continue;
      if (h !== i.struct.id.client)
        Je(c, i.struct, i.offset), i = { struct: d, offset: 0 }, a.next();
      else if (i.struct.id.clock + i.struct.length < d.id.clock)
        if (i.struct.constructor === Qt)
          i.struct.length = d.id.clock + d.length - i.struct.id.clock;
        else {
          Je(c, i.struct, i.offset);
          const y = d.id.clock - i.struct.id.clock - i.struct.length;
          i = { struct: new Qt(W(h, i.struct.id.clock + i.struct.length), y), offset: 0 };
        }
      else {
        const y = i.struct.id.clock + i.struct.length - d.id.clock;
        y > 0 && (i.struct.constructor === Qt ? i.struct.length -= y : d = ia(d, y)), i.struct.mergeWith(
          /** @type {any} */
          d
        ) || (Je(c, i.struct, i.offset), i = { struct: d, offset: 0 }, a.next());
      }
    } else
      i = { struct: (
        /** @type {Item | GC} */
        a.curr
      ), offset: 0 }, a.next();
    for (let d = a.curr; d !== null && d.id.client === h && d.id.clock === i.struct.id.clock + i.struct.length && d.constructor !== Qt; d = a.next())
      Je(c, i.struct, i.offset), i = { struct: d, offset: 0 };
  }
  i !== null && (Je(c, i.struct, i.offset), i = null), Vs(c);
  const l = r.map((a) => Be(a)), u = mn(l);
  return Oe(o, u), o.toUint8Array();
}, Fs = (e, t, n = ce, r = we) => {
  const s = Ms(t), i = new r(), o = new Bs(i), c = new n(Bt(e)), l = new cn(c, !1);
  for (; l.curr; ) {
    const a = l.curr, h = a.id.client, d = s.get(h) || 0;
    if (l.curr.constructor === Qt) {
      l.next();
      continue;
    }
    if (a.id.clock + a.length > d)
      for (Je(o, a, vn(d - a.id.clock, 0)), l.next(); l.curr && l.curr.id.client === h; )
        Je(o, l.curr, 0), l.next();
    else
      for (; l.curr && l.curr.id.client === h && l.curr.id.clock + l.curr.length <= d; )
        l.next();
  }
  Vs(o);
  const u = Be(c);
  return Oe(i, u), i.toUint8Array();
}, oa = (e, t) => Fs(e, t, fe, on), _o = (e) => {
  e.written > 0 && (e.clientStructs.push({ written: e.written, restEncoder: gt(e.encoder.restEncoder) }), e.encoder.restEncoder = Nt(), e.written = 0);
}, Je = (e, t, n) => {
  e.written > 0 && e.currClient !== t.id.client && _o(e), e.written === 0 && (e.currClient = t.id.client, e.encoder.writeClient(t.id.client), B(e.encoder.restEncoder, t.id.clock + n)), t.write(e.encoder, n), e.written++;
}, Vs = (e) => {
  _o(e);
  const t = e.encoder.restEncoder;
  B(t, e.clientStructs.length);
  for (let n = 0; n < e.clientStructs.length; n++) {
    const r = e.clientStructs[n];
    B(t, r.written), ir(t, r.restEncoder);
  }
}, Vr = (e, t, n, r) => {
  const s = new n(Bt(e)), i = new cn(s, !1), o = new r(), c = new Bs(o);
  for (let u = i.curr; u !== null; u = i.next())
    Je(c, t(u), 0);
  Vs(c);
  const l = Be(s);
  return Oe(o, l), o.toUint8Array();
}, mo = ({ formatting: e = !0, subdocs: t = !0, yxml: n = !0 } = {}) => {
  let r = 0;
  const s = Ut(), i = Ut(), o = Ut(), c = Ut();
  return c.set(null, null), (l) => {
    switch (l.constructor) {
      case te:
      case Qt:
        return l;
      case ct: {
        const u = (
          /** @type {Item} */
          l
        ), a = u.content;
        switch (a.constructor) {
          case bn:
            break;
          case de: {
            if (n) {
              const h = (
                /** @type {ContentType} */
                a.type
              );
              h instanceof rn && (h.nodeName = Kt(i, h.nodeName, () => "node-" + r)), h instanceof Mn && (h.hookName = Kt(i, h.hookName, () => "hook-" + r));
            }
            break;
          }
          case Fe: {
            const h = (
              /** @type {ContentAny} */
              a
            );
            h.arr = h.arr.map(() => r);
            break;
          }
          case kn: {
            const h = (
              /** @type {ContentBinary} */
              a
            );
            h.content = new Uint8Array([r]);
            break;
          }
          case Cn: {
            const h = (
              /** @type {ContentDoc} */
              a
            );
            t && (h.opts = {}, h.doc.guid = r + "");
            break;
          }
          case ze: {
            const h = (
              /** @type {ContentEmbed} */
              a
            );
            h.embed = {};
            break;
          }
          case Ot: {
            const h = (
              /** @type {ContentFormat} */
              a
            );
            e && (h.key = Kt(o, h.key, () => r + ""), h.value = Kt(c, h.value, () => ({ i: r })));
            break;
          }
          case Rn: {
            const h = (
              /** @type {ContentJSON} */
              a
            );
            h.arr = h.arr.map(() => r);
            break;
          }
          case he: {
            const h = (
              /** @type {ContentString} */
              a
            );
            h.str = mc(r % 10 + "", h.str.length);
            break;
          }
          default:
            ee();
        }
        return u.parentSub && (u.parentSub = Kt(s, u.parentSub, () => r + "")), r++, l;
      }
      default:
        ee();
    }
  };
}, ca = (e, t) => Vr(e, mo(t), fe, on), la = (e, t) => Vr(e, mo(t), ce, we), aa = (e) => Vr(e, ji, fe, we), wo = (e) => Vr(e, ji, ce, on), mi = "You must not compute changes after the event-handler fired.";
class cr {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor(t, n) {
    this.target = t, this.currentTarget = t, this.transaction = n, this._changes = null, this._keys = null, this._delta = null, this._path = null;
  }
  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path() {
    return this._path || (this._path = ua(this.currentTarget, this.target));
  }
  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes(t) {
    return Sn(this.transaction.deleteSet, t.id);
  }
  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */
  get keys() {
    if (this._keys === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw Qe(mi);
      const t = /* @__PURE__ */ new Map(), n = this.target;
      /** @type Set<string|null> */
      this.transaction.changed.get(n).forEach((s) => {
        if (s !== null) {
          const i = (
            /** @type {Item} */
            n._map.get(s)
          );
          let o, c;
          if (this.adds(i)) {
            let l = i.left;
            for (; l !== null && this.adds(l); )
              l = l.left;
            if (this.deletes(i))
              if (l !== null && this.deletes(l))
                o = "delete", c = Jr(l.content.getContent());
              else
                return;
            else
              l !== null && this.deletes(l) ? (o = "update", c = Jr(l.content.getContent())) : (o = "add", c = void 0);
          } else if (this.deletes(i))
            o = "delete", c = Jr(
              /** @type {Item} */
              i.content.getContent()
            );
          else
            return;
          t.set(s, { action: o, oldValue: c });
        }
      }), this._keys = t;
    }
    return this._keys;
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta() {
    return this.changes.delta;
  }
  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds(t) {
    return t.id.clock >= (this.transaction.beforeState.get(t.id.client) || 0);
  }
  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    let t = this._changes;
    if (t === null) {
      if (this.transaction.doc._transactionCleanups.length === 0)
        throw Qe(mi);
      const n = this.target, r = Ke(), s = Ke(), i = [];
      if (t = {
        added: r,
        deleted: s,
        delta: i,
        keys: this.keys
      }, /** @type Set<string|null> */
      this.transaction.changed.get(n).has(null)) {
        let c = null;
        const l = () => {
          c && i.push(c);
        };
        for (let u = n._start; u !== null; u = u.right)
          u.deleted ? this.deletes(u) && !this.adds(u) && ((c === null || c.delete === void 0) && (l(), c = { delete: 0 }), c.delete += u.length, s.add(u)) : this.adds(u) ? ((c === null || c.insert === void 0) && (l(), c = { insert: [] }), c.insert = c.insert.concat(u.content.getContent()), r.add(u)) : ((c === null || c.retain === void 0) && (l(), c = { retain: 0 }), c.retain += u.length);
        c !== null && c.retain === void 0 && l();
      }
      this._changes = t;
    }
    return (
      /** @type {any} */
      t
    );
  }
}
const ua = (e, t) => {
  const n = [];
  for (; t._item !== null && t !== e; ) {
    if (t._item.parentSub !== null)
      n.unshift(t._item.parentSub);
    else {
      let r = 0, s = (
        /** @type {AbstractType<any>} */
        t._item.parent._start
      );
      for (; s !== t._item && s !== null; )
        !s.deleted && s.countable && (r += s.length), s = s.right;
      n.unshift(r);
    }
    t = /** @type {AbstractType<any>} */
    t._item.parent;
  }
  return n;
}, Pt = () => {
  Pi("Invalid access: Add Yjs type to a document before reading data.");
}, bo = 80;
let zs = 0;
class ha {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor(t, n) {
    t.marker = !0, this.p = t, this.index = n, this.timestamp = zs++;
  }
}
const fa = (e) => {
  e.timestamp = zs++;
}, vo = (e, t, n) => {
  e.p.marker = !1, e.p = t, t.marker = !0, e.index = n, e.timestamp = zs++;
}, da = (e, t, n) => {
  if (e.length >= bo) {
    const r = e.reduce((s, i) => s.timestamp < i.timestamp ? s : i);
    return vo(r, t, n), r;
  } else {
    const r = new ha(t, n);
    return e.push(r), r;
  }
}, zr = (e, t) => {
  if (e._start === null || t === 0 || e._searchMarker === null)
    return null;
  const n = e._searchMarker.length === 0 ? null : e._searchMarker.reduce((i, o) => kr(t - i.index) < kr(t - o.index) ? i : o);
  let r = e._start, s = 0;
  for (n !== null && (r = n.p, s = n.index, fa(n)); r.right !== null && s < t; ) {
    if (!r.deleted && r.countable) {
      if (t < s + r.length)
        break;
      s += r.length;
    }
    r = r.right;
  }
  for (; r.left !== null && s > t; )
    r = r.left, !r.deleted && r.countable && (s -= r.length);
  for (; r.left !== null && r.left.id.client === r.id.client && r.left.id.clock + r.left.length === r.id.clock; )
    r = r.left, !r.deleted && r.countable && (s -= r.length);
  return n !== null && kr(n.index - s) < /** @type {YText|YArray<any>} */
  r.parent.length / bo ? (vo(n, r, s), n) : da(e._searchMarker, r, s);
}, er = (e, t, n) => {
  for (let r = e.length - 1; r >= 0; r--) {
    const s = e[r];
    if (n > 0) {
      let i = s.p;
      for (i.marker = !1; i && (i.deleted || !i.countable); )
        i = i.left, i && !i.deleted && i.countable && (s.index -= i.length);
      if (i === null || i.marker === !0) {
        e.splice(r, 1);
        continue;
      }
      s.p = i, i.marker = !0;
    }
    (t < s.index || n > 0 && t === s.index) && (s.index = vn(t, s.index + n));
  }
}, ga = (e) => {
  e.doc ?? Pt();
  let t = e._start;
  const n = [];
  for (; t; )
    n.push(t), t = t.right;
  return n;
}, qr = (e, t, n) => {
  const r = e, s = t.changedParentTypes;
  for (; Kt(s, e, () => []).push(n), e._item !== null; )
    e = /** @type {AbstractType<any>} */
    e._item.parent;
  to(r._eH, n, t);
};
class Tt {
  constructor() {
    this._item = null, this._map = /* @__PURE__ */ new Map(), this._start = null, this.doc = null, this._length = 0, this._eH = ai(), this._dEH = ai(), this._searchMarker = null;
  }
  /**
   * @return {AbstractType<any>|null}
   */
  get parent() {
    return this._item ? (
      /** @type {AbstractType<any>} */
      this._item.parent
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate(t, n) {
    this.doc = t, this._item = n;
  }
  /**
   * @return {AbstractType<EventType>}
   */
  _copy() {
    throw De();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {AbstractType<EventType>}
   */
  clone() {
    throw De();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write(t) {
  }
  /**
   * The first non-deleted item
   */
  get _first() {
    let t = this._start;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    !t.local && this._searchMarker && (this._searchMarker.length = 0);
  }
  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe(t) {
    ui(this._eH, t);
  }
  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep(t) {
    ui(this._dEH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve(t) {
    hi(this._eH, t);
  }
  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep(t) {
    hi(this._dEH, t);
  }
  /**
   * @abstract
   * @return {any}
   */
  toJSON() {
  }
}
const So = (e, t, n) => {
  e.doc ?? Pt(), t < 0 && (t = e._length + t), n < 0 && (n = e._length + n);
  let r = n - t;
  const s = [];
  let i = e._start;
  for (; i !== null && r > 0; ) {
    if (i.countable && !i.deleted) {
      const o = i.content.getContent();
      if (o.length <= t)
        t -= o.length;
      else {
        for (let c = t; c < o.length && r > 0; c++)
          s.push(o[c]), r--;
        t = 0;
      }
    }
    i = i.right;
  }
  return s;
}, ko = (e) => {
  e.doc ?? Pt();
  const t = [];
  let n = e._start;
  for (; n !== null; ) {
    if (n.countable && !n.deleted) {
      const r = n.content.getContent();
      for (let s = 0; s < r.length; s++)
        t.push(r[s]);
    }
    n = n.right;
  }
  return t;
}, pa = (e, t) => {
  const n = [];
  let r = e._start;
  for (; r !== null; ) {
    if (r.countable && We(r, t)) {
      const s = r.content.getContent();
      for (let i = 0; i < s.length; i++)
        n.push(s[i]);
    }
    r = r.right;
  }
  return n;
}, nr = (e, t) => {
  let n = 0, r = e._start;
  for (e.doc ?? Pt(); r !== null; ) {
    if (r.countable && !r.deleted) {
      const s = r.content.getContent();
      for (let i = 0; i < s.length; i++)
        t(s[i], n++, e);
    }
    r = r.right;
  }
}, Co = (e, t) => {
  const n = [];
  return nr(e, (r, s) => {
    n.push(t(r, s, e));
  }), n;
}, ya = (e) => {
  let t = e._start, n = null, r = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next: () => {
      if (n === null) {
        for (; t !== null && t.deleted; )
          t = t.right;
        if (t === null)
          return {
            done: !0,
            value: void 0
          };
        n = t.content.getContent(), r = 0, t = t.right;
      }
      const s = n[r++];
      return n.length <= r && (n = null), {
        done: !1,
        value: s
      };
    }
  };
}, Eo = (e, t) => {
  e.doc ?? Pt();
  const n = zr(e, t);
  let r = e._start;
  for (n !== null && (r = n.p, t -= n.index); r !== null; r = r.right)
    if (!r.deleted && r.countable) {
      if (t < r.length)
        return r.content.getContent()[t];
      t -= r.length;
    }
}, Or = (e, t, n, r) => {
  let s = n;
  const i = e.doc, o = i.clientID, c = i.store, l = n === null ? t._start : n.right;
  let u = [];
  const a = () => {
    u.length > 0 && (s = new ct(W(o, wt(c, o)), s, s && s.lastId, l, l && l.id, t, null, new Fe(u)), s.integrate(e, 0), u = []);
  };
  r.forEach((h) => {
    if (h === null)
      u.push(h);
    else
      switch (h.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          u.push(h);
          break;
        default:
          switch (a(), h.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              s = new ct(W(o, wt(c, o)), s, s && s.lastId, l, l && l.id, t, null, new kn(new Uint8Array(
                /** @type {Uint8Array} */
                h
              ))), s.integrate(e, 0);
              break;
            case sn:
              s = new ct(W(o, wt(c, o)), s, s && s.lastId, l, l && l.id, t, null, new Cn(
                /** @type {Doc} */
                h
              )), s.integrate(e, 0);
              break;
            default:
              if (h instanceof Tt)
                s = new ct(W(o, wt(c, o)), s, s && s.lastId, l, l && l.id, t, null, new de(h)), s.integrate(e, 0);
              else
                throw new Error("Unexpected content type in insert operation");
          }
      }
  }), a();
}, Ao = () => Qe("Length exceeded!"), Do = (e, t, n, r) => {
  if (n > t._length)
    throw Ao();
  if (n === 0)
    return t._searchMarker && er(t._searchMarker, n, r.length), Or(e, t, null, r);
  const s = n, i = zr(t, n);
  let o = t._start;
  for (i !== null && (o = i.p, n -= i.index, n === 0 && (o = o.prev, n += o && o.countable && !o.deleted ? o.length : 0)); o !== null; o = o.right)
    if (!o.deleted && o.countable) {
      if (n <= o.length) {
        n < o.length && Wt(e, W(o.id.client, o.id.clock + n));
        break;
      }
      n -= o.length;
    }
  return t._searchMarker && er(t._searchMarker, s, r.length), Or(e, t, o, r);
}, _a = (e, t, n) => {
  let s = (t._searchMarker || []).reduce((i, o) => o.index > i.index ? o : i, { index: 0, p: t._start }).p;
  if (s)
    for (; s.right; )
      s = s.right;
  return Or(e, t, s, n);
}, Oo = (e, t, n, r) => {
  if (r === 0)
    return;
  const s = n, i = r, o = zr(t, n);
  let c = t._start;
  for (o !== null && (c = o.p, n -= o.index); c !== null && n > 0; c = c.right)
    !c.deleted && c.countable && (n < c.length && Wt(e, W(c.id.client, c.id.clock + n)), n -= c.length);
  for (; r > 0 && c !== null; )
    c.deleted || (r < c.length && Wt(e, W(c.id.client, c.id.clock + r)), c.delete(e), r -= c.length), c = c.right;
  if (r > 0)
    throw Ao();
  t._searchMarker && er(
    t._searchMarker,
    s,
    -i + r
    /* in case we remove the above exception */
  );
}, Lr = (e, t, n) => {
  const r = t._map.get(n);
  r !== void 0 && r.delete(e);
}, qs = (e, t, n, r) => {
  const s = t._map.get(n) || null, i = e.doc, o = i.clientID;
  let c;
  if (r == null)
    c = new Fe([r]);
  else
    switch (r.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        c = new Fe([r]);
        break;
      case Uint8Array:
        c = new kn(
          /** @type {Uint8Array} */
          r
        );
        break;
      case sn:
        c = new Cn(
          /** @type {Doc} */
          r
        );
        break;
      default:
        if (r instanceof Tt)
          c = new de(r);
        else
          throw new Error("Unexpected content type");
    }
  new ct(W(o, wt(i.store, o)), s, s && s.lastId, null, null, t, n, c).integrate(e, 0);
}, Ps = (e, t) => {
  e.doc ?? Pt();
  const n = e._map.get(t);
  return n !== void 0 && !n.deleted ? n.content.getContent()[n.length - 1] : void 0;
}, Lo = (e) => {
  const t = {};
  return e.doc ?? Pt(), e._map.forEach((n, r) => {
    n.deleted || (t[r] = n.content.getContent()[n.length - 1]);
  }), t;
}, xo = (e, t) => {
  e.doc ?? Pt();
  const n = e._map.get(t);
  return n !== void 0 && !n.deleted;
}, ma = (e, t, n) => {
  let r = e._map.get(t) || null;
  for (; r !== null && (!n.sv.has(r.id.client) || r.id.clock >= (n.sv.get(r.id.client) || 0)); )
    r = r.left;
  return r !== null && We(r, n) ? r.content.getContent()[r.length - 1] : void 0;
}, Io = (e, t) => {
  const n = {};
  return e._map.forEach((r, s) => {
    let i = r;
    for (; i !== null && (!t.sv.has(i.id.client) || i.id.clock >= (t.sv.get(i.id.client) || 0)); )
      i = i.left;
    i !== null && We(i, t) && (n[s] = i.content.getContent()[i.length - 1]);
  }), n;
}, br = (e) => (e.doc ?? Pt(), bl(
  e._map.entries(),
  /** @param {any} entry */
  (t) => !t[1].deleted
));
class To extends cr {
}
class je extends Tt {
  constructor() {
    super(), this._prelimContent = [], this._searchMarker = [];
  }
  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from(t) {
    const n = new je();
    return n.push(t), n;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  /**
   * @return {YArray<T>}
   */
  _copy() {
    return new je();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YArray<T>}
   */
  clone() {
    const t = new je();
    return t.insert(0, this.toArray().map(
      (n) => n instanceof Tt ? (
        /** @type {typeof el} */
        n.clone()
      ) : n
    )), t;
  }
  get length() {
    return this.doc ?? Pt(), this._length;
  }
  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    super._callObserver(t, n), qr(this, t, new To(this, t));
  }
  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert(t, n) {
    this.doc !== null ? lt(this.doc, (r) => {
      Do(
        r,
        this,
        t,
        /** @type {any} */
        n
      );
    }) : this._prelimContent.splice(t, 0, ...n);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push(t) {
    this.doc !== null ? lt(this.doc, (n) => {
      _a(
        n,
        this,
        /** @type {any} */
        t
      );
    }) : this._prelimContent.push(...t);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<T>} content Array of content to prepend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete(t, n = 1) {
    this.doc !== null ? lt(this.doc, (r) => {
      Oo(r, this, t, n);
    }) : this._prelimContent.splice(t, n);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get(t) {
    return Eo(this, t);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray() {
    return ko(this);
  }
  /**
   * Returns a portion of this YArray into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice(t = 0, n = this.length) {
    return So(this, t, n);
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON() {
    return this.map((t) => t instanceof Tt ? t.toJSON() : t);
  }
  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map(t) {
    return Co(
      this,
      /** @type {any} */
      t
    );
  }
  /**
   * Executes a provided function once on every element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    nr(this, t);
  }
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator]() {
    return ya(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Fa);
  }
}
const wa = (e) => new je();
class Mo extends cr {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor(t, n, r) {
    super(t, n), this.keysChanged = r;
  }
}
class en extends Tt {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor(t) {
    super(), this._prelimContent = null, t === void 0 ? this._prelimContent = /* @__PURE__ */ new Map() : this._prelimContent = new Map(t);
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), this._prelimContent.forEach((r, s) => {
      this.set(s, r);
    }), this._prelimContent = null;
  }
  /**
   * @return {YMap<MapType>}
   */
  _copy() {
    return new en();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YMap<MapType>}
   */
  clone() {
    const t = new en();
    return this.forEach((n, r) => {
      t.set(r, n instanceof Tt ? (
        /** @type {typeof value} */
        n.clone()
      ) : n);
    }), t;
  }
  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    qr(this, t, new Mo(this, t, n));
  }
  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON() {
    this.doc ?? Pt();
    const t = {};
    return this._map.forEach((n, r) => {
      if (!n.deleted) {
        const s = n.content.getContent()[n.length - 1];
        t[r] = s instanceof Tt ? s.toJSON() : s;
      }
    }), t;
  }
  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size() {
    return [...br(this)].length;
  }
  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys() {
    return Zr(
      br(this),
      /** @param {any} v */
      (t) => t[0]
    );
  }
  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<MapType>}
   */
  values() {
    return Zr(
      br(this),
      /** @param {any} v */
      (t) => t[1].content.getContent()[t[1].length - 1]
    );
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  entries() {
    return Zr(
      br(this),
      /** @param {any} v */
      (t) => (
        /** @type {any} */
        [t[0], t[1].content.getContent()[t[1].length - 1]]
      )
    );
  }
  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    this.doc ?? Pt(), this._map.forEach((n, r) => {
      n.deleted || t(n.content.getContent()[n.length - 1], r, this);
    });
  }
  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete(t) {
    this.doc !== null ? lt(this.doc, (n) => {
      Lr(n, this, t);
    }) : this._prelimContent.delete(t);
  }
  /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */
  set(t, n) {
    return this.doc !== null ? lt(this.doc, (r) => {
      qs(
        r,
        this,
        t,
        /** @type {any} */
        n
      );
    }) : this._prelimContent.set(t, n), n;
  }
  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get(t) {
    return (
      /** @type {any} */
      Ps(this, t)
    );
  }
  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has(t) {
    return xo(this, t);
  }
  /**
   * Removes all elements from this YMap.
   */
  clear() {
    this.doc !== null ? lt(this.doc, (t) => {
      this.forEach(function(n, r, s) {
        Lr(t, s, r);
      });
    }) : this._prelimContent.clear();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(Va);
  }
}
const ba = (e) => new en(), Ye = (e, t) => e === t || typeof e == "object" && typeof t == "object" && e && t && Jc(e, t);
class _s {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor(t, n, r, s) {
    this.left = t, this.right = n, this.index = r, this.currentAttributes = s;
  }
  /**
   * Only call this if you know that this.right is defined
   */
  forward() {
    switch (this.right === null && ee(), this.right.content.constructor) {
      case Ot:
        this.right.deleted || Nn(
          this.currentAttributes,
          /** @type {ContentFormat} */
          this.right.content
        );
        break;
      default:
        this.right.deleted || (this.index += this.right.length);
        break;
    }
    this.left = this.right, this.right = this.right.right;
  }
}
const wi = (e, t, n) => {
  for (; t.right !== null && n > 0; ) {
    switch (t.right.content.constructor) {
      case Ot:
        t.right.deleted || Nn(
          t.currentAttributes,
          /** @type {ContentFormat} */
          t.right.content
        );
        break;
      default:
        t.right.deleted || (n < t.right.length && Wt(e, W(t.right.id.client, t.right.id.clock + n)), t.index += t.right.length, n -= t.right.length);
        break;
    }
    t.left = t.right, t.right = t.right.right;
  }
  return t;
}, vr = (e, t, n, r) => {
  const s = /* @__PURE__ */ new Map(), i = r ? zr(t, n) : null;
  if (i) {
    const o = new _s(i.p.left, i.p, i.index, s);
    return wi(e, o, n - i.index);
  } else {
    const o = new _s(null, t._start, 0, s);
    return wi(e, o, n);
  }
}, Ro = (e, t, n, r) => {
  for (; n.right !== null && (n.right.deleted === !0 || n.right.content.constructor === Ot && Ye(
    r.get(
      /** @type {ContentFormat} */
      n.right.content.key
    ),
    /** @type {ContentFormat} */
    n.right.content.value
  )); )
    n.right.deleted || r.delete(
      /** @type {ContentFormat} */
      n.right.content.key
    ), n.forward();
  const s = e.doc, i = s.clientID;
  r.forEach((o, c) => {
    const l = n.left, u = n.right, a = new ct(W(i, wt(s.store, i)), l, l && l.lastId, u, u && u.id, t, null, new Ot(c, o));
    a.integrate(e, 0), n.right = a, n.forward();
  });
}, Nn = (e, t) => {
  const { key: n, value: r } = t;
  r === null ? e.delete(n) : e.set(n, r);
}, jo = (e, t) => {
  for (; e.right !== null; ) {
    if (!(e.right.deleted || e.right.content.constructor === Ot && Ye(
      t[
        /** @type {ContentFormat} */
        e.right.content.key
      ] ?? null,
      /** @type {ContentFormat} */
      e.right.content.value
    )))
      break;
    e.forward();
  }
}, No = (e, t, n, r) => {
  const s = e.doc, i = s.clientID, o = /* @__PURE__ */ new Map();
  for (const c in r) {
    const l = r[c], u = n.currentAttributes.get(c) ?? null;
    if (!Ye(u, l)) {
      o.set(c, u);
      const { left: a, right: h } = n;
      n.right = new ct(W(i, wt(s.store, i)), a, a && a.lastId, h, h && h.id, t, null, new Ot(c, l)), n.right.integrate(e, 0), n.forward();
    }
  }
  return o;
}, ts = (e, t, n, r, s) => {
  n.currentAttributes.forEach((d, g) => {
    s[g] === void 0 && (s[g] = null);
  });
  const i = e.doc, o = i.clientID;
  jo(n, s);
  const c = No(e, t, n, s), l = r.constructor === String ? new he(
    /** @type {string} */
    r
  ) : r instanceof Tt ? new de(r) : new ze(r);
  let { left: u, right: a, index: h } = n;
  t._searchMarker && er(t._searchMarker, n.index, l.getLength()), a = new ct(W(o, wt(i.store, o)), u, u && u.lastId, a, a && a.id, t, null, l), a.integrate(e, 0), n.right = a, n.index = h, n.forward(), Ro(e, t, n, c);
}, bi = (e, t, n, r, s) => {
  const i = e.doc, o = i.clientID;
  jo(n, s);
  const c = No(e, t, n, s);
  t:
    for (; n.right !== null && (r > 0 || c.size > 0 && (n.right.deleted || n.right.content.constructor === Ot)); ) {
      if (!n.right.deleted)
        switch (n.right.content.constructor) {
          case Ot: {
            const { key: l, value: u } = (
              /** @type {ContentFormat} */
              n.right.content
            ), a = s[l];
            if (a !== void 0) {
              if (Ye(a, u))
                c.delete(l);
              else {
                if (r === 0)
                  break t;
                c.set(l, u);
              }
              n.right.delete(e);
            } else
              n.currentAttributes.set(l, u);
            break;
          }
          default:
            r < n.right.length && Wt(e, W(n.right.id.client, n.right.id.clock + r)), r -= n.right.length;
            break;
        }
      n.forward();
    }
  if (r > 0) {
    let l = "";
    for (; r > 0; r--)
      l += `
`;
    n.right = new ct(W(o, wt(i.store, o)), n.left, n.left && n.left.lastId, n.right, n.right && n.right.id, t, null, new he(l)), n.right.integrate(e, 0), n.forward();
  }
  Ro(e, t, n, c);
}, Uo = (e, t, n, r, s) => {
  let i = t;
  const o = Ut();
  for (; i && (!i.countable || i.deleted); ) {
    if (!i.deleted && i.content.constructor === Ot) {
      const u = (
        /** @type {ContentFormat} */
        i.content
      );
      o.set(u.key, u);
    }
    i = i.right;
  }
  let c = 0, l = !1;
  for (; t !== i; ) {
    if (n === t && (l = !0), !t.deleted) {
      const u = t.content;
      switch (u.constructor) {
        case Ot: {
          const { key: a, value: h } = (
            /** @type {ContentFormat} */
            u
          ), d = r.get(a) ?? null;
          (o.get(a) !== u || d === h) && (t.delete(e), c++, !l && (s.get(a) ?? null) === h && d !== h && (d === null ? s.delete(a) : s.set(a, d))), !l && !t.deleted && Nn(
            s,
            /** @type {ContentFormat} */
            u
          );
          break;
        }
      }
    }
    t = /** @type {Item} */
    t.right;
  }
  return c;
}, va = (e, t) => {
  for (; t && t.right && (t.right.deleted || !t.right.countable); )
    t = t.right;
  const n = /* @__PURE__ */ new Set();
  for (; t && (t.deleted || !t.countable); ) {
    if (!t.deleted && t.content.constructor === Ot) {
      const r = (
        /** @type {ContentFormat} */
        t.content.key
      );
      n.has(r) ? t.delete(e) : n.add(r);
    }
    t = t.left;
  }
}, Bo = (e) => {
  let t = 0;
  return lt(
    /** @type {Doc} */
    e.doc,
    (n) => {
      let r = (
        /** @type {Item} */
        e._start
      ), s = e._start, i = Ut();
      const o = ss(i);
      for (; s; ) {
        if (s.deleted === !1)
          switch (s.content.constructor) {
            case Ot:
              Nn(
                o,
                /** @type {ContentFormat} */
                s.content
              );
              break;
            default:
              t += Uo(n, r, s, i, o), i = ss(o), r = s;
              break;
          }
        s = s.right;
      }
    }
  ), t;
}, Sa = (e) => {
  const t = /* @__PURE__ */ new Set(), n = e.doc;
  for (const [r, s] of e.afterState.entries()) {
    const i = e.beforeState.get(r) || 0;
    s !== i && oo(
      e,
      /** @type {Array<Item|GC>} */
      n.store.clients.get(r),
      i,
      s,
      (o) => {
        !o.deleted && /** @type {Item} */
        o.content.constructor === Ot && o.constructor !== te && t.add(
          /** @type {any} */
          o.parent
        );
      }
    );
  }
  lt(n, (r) => {
    _n(e, e.deleteSet, (s) => {
      if (s instanceof te || !/** @type {YText} */
      s.parent._hasFormatting || t.has(
        /** @type {YText} */
        s.parent
      ))
        return;
      const i = (
        /** @type {YText} */
        s.parent
      );
      s.content.constructor === Ot ? t.add(i) : va(r, s);
    });
    for (const s of t)
      Bo(s);
  });
}, vi = (e, t, n) => {
  const r = n, s = ss(t.currentAttributes), i = t.right;
  for (; n > 0 && t.right !== null; ) {
    if (t.right.deleted === !1)
      switch (t.right.content.constructor) {
        case de:
        case ze:
        case he:
          n < t.right.length && Wt(e, W(t.right.id.client, t.right.id.clock + n)), n -= t.right.length, t.right.delete(e);
          break;
      }
    t.forward();
  }
  i && Uo(e, i, t.right, s, t.currentAttributes);
  const o = (
    /** @type {AbstractType<any>} */
    /** @type {Item} */
    (t.left || t.right).parent
  );
  return o._searchMarker && er(o._searchMarker, t.index, -r + n), t;
};
class Fo extends cr {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor(t, n, r) {
    super(t, n), this.childListChanged = !1, this.keysChanged = /* @__PURE__ */ new Set(), r.forEach((s) => {
      s === null ? this.childListChanged = !0 : this.keysChanged.add(s);
    });
  }
  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes() {
    if (this._changes === null) {
      const t = {
        keys: this.keys,
        delta: this.delta,
        added: /* @__PURE__ */ new Set(),
        deleted: /* @__PURE__ */ new Set()
      };
      this._changes = t;
    }
    return (
      /** @type {any} */
      this._changes
    );
  }
  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta() {
    if (this._delta === null) {
      const t = (
        /** @type {Doc} */
        this.target.doc
      ), n = [];
      lt(t, (r) => {
        const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
        let o = this.target._start, c = null;
        const l = {};
        let u = "", a = 0, h = 0;
        const d = () => {
          if (c !== null) {
            let g = null;
            switch (c) {
              case "delete":
                h > 0 && (g = { delete: h }), h = 0;
                break;
              case "insert":
                (typeof u == "object" || u.length > 0) && (g = { insert: u }, s.size > 0 && (g.attributes = {}, s.forEach((y, E) => {
                  y !== null && (g.attributes[E] = y);
                }))), u = "";
                break;
              case "retain":
                a > 0 && (g = { retain: a }, Gc(l) || (g.attributes = Pc({}, l))), a = 0;
                break;
            }
            g && n.push(g), c = null;
          }
        };
        for (; o !== null; ) {
          switch (o.content.constructor) {
            case de:
            case ze:
              this.adds(o) ? this.deletes(o) || (d(), c = "insert", u = o.content.getContent()[0], d()) : this.deletes(o) ? (c !== "delete" && (d(), c = "delete"), h += 1) : o.deleted || (c !== "retain" && (d(), c = "retain"), a += 1);
              break;
            case he:
              this.adds(o) ? this.deletes(o) || (c !== "insert" && (d(), c = "insert"), u += /** @type {ContentString} */
              o.content.str) : this.deletes(o) ? (c !== "delete" && (d(), c = "delete"), h += o.length) : o.deleted || (c !== "retain" && (d(), c = "retain"), a += o.length);
              break;
            case Ot: {
              const { key: g, value: y } = (
                /** @type {ContentFormat} */
                o.content
              );
              if (this.adds(o)) {
                if (!this.deletes(o)) {
                  const E = s.get(g) ?? null;
                  Ye(E, y) ? y !== null && o.delete(r) : (c === "retain" && d(), Ye(y, i.get(g) ?? null) ? delete l[g] : l[g] = y);
                }
              } else if (this.deletes(o)) {
                i.set(g, y);
                const E = s.get(g) ?? null;
                Ye(E, y) || (c === "retain" && d(), l[g] = E);
              } else if (!o.deleted) {
                i.set(g, y);
                const E = l[g];
                E !== void 0 && (Ye(E, y) ? E !== null && o.delete(r) : (c === "retain" && d(), y === null ? delete l[g] : l[g] = y));
              }
              o.deleted || (c === "insert" && d(), Nn(
                s,
                /** @type {ContentFormat} */
                o.content
              ));
              break;
            }
          }
          o = o.right;
        }
        for (d(); n.length > 0; ) {
          const g = n[n.length - 1];
          if (g.retain !== void 0 && g.attributes === void 0)
            n.pop();
          else
            break;
        }
      }), this._delta = n;
    }
    return (
      /** @type {any} */
      this._delta
    );
  }
}
class wn extends Tt {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor(t) {
    super(), this._pending = t !== void 0 ? [() => this.insert(0, t)] : [], this._searchMarker = [], this._hasFormatting = !1;
  }
  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length() {
    return this.doc ?? Pt(), this._length;
  }
  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n);
    try {
      this._pending.forEach((r) => r());
    } catch (r) {
      console.error(r);
    }
    this._pending = null;
  }
  _copy() {
    return new wn();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YText}
   */
  clone() {
    const t = new wn();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    super._callObserver(t, n);
    const r = new Fo(this, t, n);
    qr(this, t, r), !t.local && this._hasFormatting && (t._needFormattingCleanup = !0);
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString() {
    this.doc ?? Pt();
    let t = "", n = this._start;
    for (; n !== null; )
      !n.deleted && n.countable && n.content.constructor === he && (t += /** @type {ContentString} */
      n.content.str), n = n.right;
    return t;
  }
  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {Array<any>} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta(t, { sanitize: n = !0 } = {}) {
    this.doc !== null ? lt(this.doc, (r) => {
      const s = new _s(null, this._start, 0, /* @__PURE__ */ new Map());
      for (let i = 0; i < t.length; i++) {
        const o = t[i];
        if (o.insert !== void 0) {
          const c = !n && typeof o.insert == "string" && i === t.length - 1 && s.right === null && o.insert.slice(-1) === `
` ? o.insert.slice(0, -1) : o.insert;
          (typeof c != "string" || c.length > 0) && ts(r, this, s, c, o.attributes || {});
        } else
          o.retain !== void 0 ? bi(r, this, s, o.retain, o.attributes || {}) : o.delete !== void 0 && vi(r, s, o.delete);
      }
    }) : this._pending.push(() => this.applyDelta(t));
  }
  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta(t, n, r) {
    this.doc ?? Pt();
    const s = [], i = /* @__PURE__ */ new Map(), o = (
      /** @type {Doc} */
      this.doc
    );
    let c = "", l = this._start;
    function u() {
      if (c.length > 0) {
        const h = {};
        let d = !1;
        i.forEach((y, E) => {
          d = !0, h[E] = y;
        });
        const g = { insert: c };
        d && (g.attributes = h), s.push(g), c = "";
      }
    }
    const a = () => {
      for (; l !== null; ) {
        if (We(l, t) || n !== void 0 && We(l, n))
          switch (l.content.constructor) {
            case he: {
              const h = i.get("ychange");
              t !== void 0 && !We(l, t) ? (h === void 0 || h.user !== l.id.client || h.type !== "removed") && (u(), i.set("ychange", r ? r("removed", l.id) : { type: "removed" })) : n !== void 0 && !We(l, n) ? (h === void 0 || h.user !== l.id.client || h.type !== "added") && (u(), i.set("ychange", r ? r("added", l.id) : { type: "added" })) : h !== void 0 && (u(), i.delete("ychange")), c += /** @type {ContentString} */
              l.content.str;
              break;
            }
            case de:
            case ze: {
              u();
              const h = {
                insert: l.content.getContent()[0]
              };
              if (i.size > 0) {
                const d = (
                  /** @type {Object<string,any>} */
                  {}
                );
                h.attributes = d, i.forEach((g, y) => {
                  d[y] = g;
                });
              }
              s.push(h);
              break;
            }
            case Ot:
              We(l, t) && (u(), Nn(
                i,
                /** @type {ContentFormat} */
                l.content
              ));
              break;
          }
        l = l.right;
      }
      u();
    };
    return t || n ? lt(o, (h) => {
      t && gs(h, t), n && gs(h, n), a();
    }, "cleanup") : a(), s;
  }
  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert(t, n, r) {
    if (n.length <= 0)
      return;
    const s = this.doc;
    s !== null ? lt(s, (i) => {
      const o = vr(i, this, t, !r);
      r || (r = {}, o.currentAttributes.forEach((c, l) => {
        r[l] = c;
      })), ts(i, this, o, n, r);
    }) : this._pending.push(() => this.insert(t, n, r));
  }
  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} [attributes] Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed(t, n, r) {
    const s = this.doc;
    s !== null ? lt(s, (i) => {
      const o = vr(i, this, t, !r);
      ts(i, this, o, n, r || {});
    }) : this._pending.push(() => this.insertEmbed(t, n, r || {}));
  }
  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete(t, n) {
    if (n === 0)
      return;
    const r = this.doc;
    r !== null ? lt(r, (s) => {
      vi(s, vr(s, this, t, !0), n);
    }) : this._pending.push(() => this.delete(t, n));
  }
  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format(t, n, r) {
    if (n === 0)
      return;
    const s = this.doc;
    s !== null ? lt(s, (i) => {
      const o = vr(i, this, t, !1);
      o.right !== null && bi(i, this, o, n, r);
    }) : this._pending.push(() => this.format(t, n, r));
  }
  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? lt(this.doc, (n) => {
      Lr(n, this, t);
    }) : this._pending.push(() => this.removeAttribute(t));
  }
  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, n) {
    this.doc !== null ? lt(this.doc, (r) => {
      qs(r, this, t, n);
    }) : this._pending.push(() => this.setAttribute(t, n));
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      Ps(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes() {
    return Lo(this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef(za);
  }
}
const ka = (e) => new wn();
class es {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor(t, n = () => !0) {
    this._filter = n, this._root = t, this._currentNode = /** @type {Item} */
    t._start, this._firstCall = !0, t.doc ?? Pt();
  }
  [Symbol.iterator]() {
    return this;
  }
  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next() {
    let t = this._currentNode, n = t && t.content && /** @type {any} */
    t.content.type;
    if (t !== null && (!this._firstCall || t.deleted || !this._filter(n)))
      do
        if (n = /** @type {any} */
        t.content.type, !t.deleted && (n.constructor === rn || n.constructor === nn) && n._start !== null)
          t = n._start;
        else
          for (; t !== null; ) {
            const r = t.next;
            if (r !== null) {
              t = r;
              break;
            } else
              t.parent === this._root ? t = null : t = /** @type {AbstractType<any>} */
              t.parent._item;
          }
      while (t !== null && (t.deleted || !this._filter(
        /** @type {ContentType} */
        t.content.type
      )));
    return this._firstCall = !1, t === null ? { value: void 0, done: !0 } : (this._currentNode = t, { value: (
      /** @type {any} */
      t.content.type
    ), done: !1 });
  }
}
class nn extends Tt {
  constructor() {
    super(), this._prelimContent = [];
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild() {
    const t = this._first;
    return t ? t.content.getContent()[0] : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), this.insert(
      0,
      /** @type {Array<any>} */
      this._prelimContent
    ), this._prelimContent = null;
  }
  _copy() {
    return new nn();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlFragment}
   */
  clone() {
    const t = new nn();
    return t.insert(0, this.toArray().map((n) => n instanceof Tt ? n.clone() : n)), t;
  }
  get length() {
    return this.doc ?? Pt(), this._prelimContent === null ? this._length : this._prelimContent.length;
  }
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker(t) {
    return new es(this, t);
  }
  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector(t) {
    t = t.toUpperCase();
    const r = new es(this, (s) => s.nodeName && s.nodeName.toUpperCase() === t).next();
    return r.done ? null : r.value;
  }
  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll(t) {
    return t = t.toUpperCase(), Ne(new es(this, (n) => n.nodeName && n.nodeName.toUpperCase() === t));
  }
  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver(t, n) {
    qr(this, t, new Vo(this, n, t));
  }
  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString() {
    return Co(this, (t) => t.toString()).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n = {}, r) {
    const s = t.createDocumentFragment();
    return r !== void 0 && r._createAssociation(s, this), nr(this, (i) => {
      s.insertBefore(i.toDOM(t, n, r), null);
    }), s;
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert(t, n) {
    this.doc !== null ? lt(this.doc, (r) => {
      Do(r, this, t, n);
    }) : this._prelimContent.splice(t, 0, ...n);
  }
  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter(t, n) {
    if (this.doc !== null)
      lt(this.doc, (r) => {
        const s = t && t instanceof Tt ? t._item : t;
        Or(r, this, s, n);
      });
    else {
      const r = (
        /** @type {Array<any>} */
        this._prelimContent
      ), s = t === null ? 0 : r.findIndex((i) => i === t) + 1;
      if (s === 0 && t !== null)
        throw Qe("Reference item not found");
      r.splice(s, 0, ...n);
    }
  }
  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete(t, n = 1) {
    this.doc !== null ? lt(this.doc, (r) => {
      Oo(r, this, t, n);
    }) : this._prelimContent.splice(t, n);
  }
  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray() {
    return ko(this);
  }
  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push(t) {
    this.insert(this.length, t);
  }
  /**
   * Prepends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
   */
  unshift(t) {
    this.insert(0, t);
  }
  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get(t) {
    return Eo(this, t);
  }
  /**
   * Returns a portion of this YXmlFragment into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice(t = 0, n = this.length) {
    return So(this, t, n);
  }
  /**
   * Executes a provided function on once on every child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach(t) {
    nr(this, t);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Pa);
  }
}
const Ca = (e) => new nn();
class rn extends nn {
  constructor(t = "UNDEFINED") {
    super(), this.nodeName = t, this._prelimAttrs = /* @__PURE__ */ new Map();
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate(t, n) {
    super._integrate(t, n), /** @type {Map<string, any>} */
    this._prelimAttrs.forEach((r, s) => {
      this.setAttribute(s, r);
    }), this._prelimAttrs = null;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy() {
    return new rn(this.nodeName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlElement<KV>}
   */
  clone() {
    const t = new rn(this.nodeName), n = this.getAttributes();
    return Hc(n, (r, s) => {
      typeof r == "string" && t.setAttribute(s, r);
    }), t.insert(0, this.toArray().map((r) => r instanceof Tt ? r.clone() : r)), t;
  }
  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString() {
    const t = this.getAttributes(), n = [], r = [];
    for (const c in t)
      r.push(c);
    r.sort();
    const s = r.length;
    for (let c = 0; c < s; c++) {
      const l = r[c];
      n.push(l + '="' + t[l] + '"');
    }
    const i = this.nodeName.toLocaleLowerCase(), o = n.length > 0 ? " " + n.join(" ") : "";
    return `<${i}${o}>${super.toString()}</${i}>`;
  }
  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute(t) {
    this.doc !== null ? lt(this.doc, (n) => {
      Lr(n, this, t);
    }) : this._prelimAttrs.delete(t);
  }
  /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute(t, n) {
    this.doc !== null ? lt(this.doc, (r) => {
      qs(r, this, t, n);
    }) : this._prelimAttrs.set(t, n);
  }
  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */
  getAttribute(t) {
    return (
      /** @type {any} */
      Ps(this, t)
    );
  }
  /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute(t) {
    return (
      /** @type {any} */
      xo(this, t)
    );
  }
  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes(t) {
    return (
      /** @type {any} */
      t ? Io(this, t) : Lo(this)
    );
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n = {}, r) {
    const s = t.createElement(this.nodeName), i = this.getAttributes();
    for (const o in i) {
      const c = i[o];
      typeof c == "string" && s.setAttribute(o, c);
    }
    return nr(this, (o) => {
      s.appendChild(o.toDOM(t, n, r));
    }), r !== void 0 && r._createAssociation(s, this), s;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(qa), t.writeKey(this.nodeName);
  }
}
const Ea = (e) => new rn(e.readKey());
class Vo extends cr {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with which the
   *                                  change was created.
   */
  constructor(t, n, r) {
    super(t, r), this.childListChanged = !1, this.attributesChanged = /* @__PURE__ */ new Set(), n.forEach((s) => {
      s === null ? this.childListChanged = !0 : this.attributesChanged.add(s);
    });
  }
}
class Mn extends en {
  /**
   * @param {string} hookName nodeName of the Dom Node.
   */
  constructor(t) {
    super(), this.hookName = t;
  }
  /**
   * Creates an Item with the same effect as this Item (without position effect)
   */
  _copy() {
    return new Mn(this.hookName);
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlHook}
   */
  clone() {
    const t = new Mn(this.hookName);
    return this.forEach((n, r) => {
      t.set(r, n);
    }), t;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n = {}, r) {
    const s = n[this.hookName];
    let i;
    return s !== void 0 ? i = s.createDom(this) : i = document.createElement(this.hookName), i.setAttribute("data-yjs-hook", this.hookName), r !== void 0 && r._createAssociation(i, this), i;
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write(t) {
    t.writeTypeRef(Ha), t.writeKey(this.hookName);
  }
}
const Aa = (e) => new Mn(e.readKey());
class rr extends wn {
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling() {
    const t = this._item ? this._item.next : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling() {
    const t = this._item ? this._item.prev : null;
    return t ? (
      /** @type {YXmlElement|YXmlText} */
      /** @type {ContentType} */
      t.content.type
    ) : null;
  }
  _copy() {
    return new rr();
  }
  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlText}
   */
  clone() {
    const t = new rr();
    return t.applyDelta(this.toDelta()), t;
  }
  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM(t = document, n, r) {
    const s = t.createTextNode(this.toString());
    return r !== void 0 && r._createAssociation(s, this), s;
  }
  toString() {
    return this.toDelta().map((t) => {
      const n = [];
      for (const s in t.attributes) {
        const i = [];
        for (const o in t.attributes[s])
          i.push({ key: o, value: t.attributes[s][o] });
        i.sort((o, c) => o.key < c.key ? -1 : 1), n.push({ nodeName: s, attrs: i });
      }
      n.sort((s, i) => s.nodeName < i.nodeName ? -1 : 1);
      let r = "";
      for (let s = 0; s < n.length; s++) {
        const i = n[s];
        r += `<${i.nodeName}`;
        for (let o = 0; o < i.attrs.length; o++) {
          const c = i.attrs[o];
          r += ` ${c.key}="${c.value}"`;
        }
        r += ">";
      }
      r += t.insert;
      for (let s = n.length - 1; s >= 0; s--)
        r += `</${n[s].nodeName}>`;
      return r;
    }).join("");
  }
  /**
   * @return {string}
   */
  toJSON() {
    return this.toString();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write(t) {
    t.writeTypeRef($a);
  }
}
const Da = (e) => new rr();
class Pr {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor(t, n) {
    this.id = t, this.length = n;
  }
  /**
   * @type {boolean}
   */
  get deleted() {
    throw De();
  }
  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} whether this merged with right
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write(t, n, r) {
    throw De();
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    throw De();
  }
}
const Oa = 0;
class te extends Pr {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    n > 0 && (this.id.clock += n, this.length -= n), io(t.doc.store, this);
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeInfo(Oa), t.writeLen(this.length - n);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, n) {
    return null;
  }
}
class kn {
  /**
   * @param {Uint8Array} content
   */
  constructor(t) {
    this.content = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.content];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentBinary}
   */
  copy() {
    return new kn(this.content);
  }
  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice(t) {
    throw De();
  }
  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeBuf(this.content);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 3;
  }
}
const La = (e) => new kn(e.readBuf());
class bn {
  /**
   * @param {number} len
   */
  constructor(t) {
    this.len = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.len;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentDeleted}
   */
  copy() {
    return new bn(this.len);
  }
  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice(t) {
    const n = new bn(this.len - t);
    return this.len = t, n;
  }
  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.len += t.len, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
    Kn(t.deleteSet, n.id.client, n.id.clock, this.len), n.markDeleted();
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeLen(this.len - n);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 1;
  }
}
const xa = (e) => new bn(e.readLen()), zo = (e, t) => new sn({ guid: e, ...t, shouldLoad: t.shouldLoad || t.autoLoad || !1 });
class Cn {
  /**
   * @param {Doc} doc
   */
  constructor(t) {
    t._item && console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."), this.doc = t;
    const n = {};
    this.opts = n, t.gc || (n.gc = !1), t.autoLoad && (n.autoLoad = !0), t.meta !== null && (n.meta = t.meta);
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.doc];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentDoc}
   */
  copy() {
    return new Cn(zo(this.doc.guid, this.opts));
  }
  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice(t) {
    throw De();
  }
  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
    this.doc._item = n, t.subdocsAdded.add(this.doc), this.doc.shouldLoad && t.subdocsLoaded.add(this.doc);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    t.subdocsAdded.has(this.doc) ? t.subdocsAdded.delete(this.doc) : t.subdocsRemoved.add(this.doc);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeString(this.doc.guid), t.writeAny(this.opts);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 9;
  }
}
const Ia = (e) => new Cn(zo(e.readString(), e.readAny()));
class ze {
  /**
   * @param {Object} embed
   */
  constructor(t) {
    this.embed = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.embed];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentEmbed}
   */
  copy() {
    return new ze(this.embed);
  }
  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice(t) {
    throw De();
  }
  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeJSON(this.embed);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 5;
  }
}
const Ta = (e) => new ze(e.readJSON());
class Ot {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor(t, n) {
    this.key = t, this.value = n;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !1;
  }
  /**
   * @return {ContentFormat}
   */
  copy() {
    return new Ot(this.key, this.value);
  }
  /**
   * @param {number} _offset
   * @return {ContentFormat}
   */
  splice(t) {
    throw De();
  }
  /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */
  integrate(t, n) {
    const r = (
      /** @type {YText} */
      n.parent
    );
    r._searchMarker = null, r._hasFormatting = !0;
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeKey(this.key), t.writeJSON(this.value);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 6;
  }
}
const Ma = (e) => new Ot(e.readKey(), e.readJSON());
class Rn {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentJSON}
   */
  copy() {
    return new Rn(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentJSON}
   */
  splice(t) {
    const n = new Rn(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), n;
  }
  /**
   * @param {ContentJSON} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    const r = this.arr.length;
    t.writeLen(r - n);
    for (let s = n; s < r; s++) {
      const i = this.arr[s];
      t.writeString(i === void 0 ? "undefined" : JSON.stringify(i));
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 2;
  }
}
const Ra = (e) => {
  const t = e.readLen(), n = [];
  for (let r = 0; r < t; r++) {
    const s = e.readString();
    s === "undefined" ? n.push(void 0) : n.push(JSON.parse(s));
  }
  return new Rn(n);
}, ja = Dr("node_env") === "development";
class Fe {
  /**
   * @param {Array<any>} arr
   */
  constructor(t) {
    this.arr = t, ja && Ri(t);
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.arr.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.arr;
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentAny}
   */
  copy() {
    return new Fe(this.arr);
  }
  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice(t) {
    const n = new Fe(this.arr.slice(t));
    return this.arr = this.arr.slice(0, t), n;
  }
  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.arr = this.arr.concat(t.arr), !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    const r = this.arr.length;
    t.writeLen(r - n);
    for (let s = n; s < r; s++) {
      const i = this.arr[s];
      t.writeAny(i);
    }
  }
  /**
   * @return {number}
   */
  getRef() {
    return 8;
  }
}
const Na = (e) => {
  const t = e.readLen(), n = [];
  for (let r = 0; r < t; r++)
    n.push(e.readAny());
  return new Fe(n);
};
class he {
  /**
   * @param {string} str
   */
  constructor(t) {
    this.str = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return this.str.length;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return this.str.split("");
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentString}
   */
  copy() {
    return new he(this.str);
  }
  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice(t) {
    const n = new he(this.str.slice(t));
    this.str = this.str.slice(0, t);
    const r = this.str.charCodeAt(t - 1);
    return r >= 55296 && r <= 56319 && (this.str = this.str.slice(0, t - 1) + "�", n.str = "�" + n.str.slice(1)), n;
  }
  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.str += t.str, !0;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeString(n === 0 ? this.str : this.str.slice(n));
  }
  /**
   * @return {number}
   */
  getRef() {
    return 4;
  }
}
const Ua = (e) => new he(e.readString()), Ba = [
  wa,
  ba,
  ka,
  Ea,
  Ca,
  Aa,
  Da
], Fa = 0, Va = 1, za = 2, qa = 3, Pa = 4, Ha = 5, $a = 6;
class de {
  /**
   * @param {AbstractType<any>} type
   */
  constructor(t) {
    this.type = t;
  }
  /**
   * @return {number}
   */
  getLength() {
    return 1;
  }
  /**
   * @return {Array<any>}
   */
  getContent() {
    return [this.type];
  }
  /**
   * @return {boolean}
   */
  isCountable() {
    return !0;
  }
  /**
   * @return {ContentType}
   */
  copy() {
    return new de(this.type._copy());
  }
  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice(t) {
    throw De();
  }
  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith(t) {
    return !1;
  }
  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate(t, n) {
    this.type._integrate(t.doc, n);
  }
  /**
   * @param {Transaction} transaction
   */
  delete(t) {
    let n = this.type._start;
    for (; n !== null; )
      n.deleted ? n.id.clock < (t.beforeState.get(n.id.client) || 0) && t._mergeStructs.push(n) : n.delete(t), n = n.right;
    this.type._map.forEach((r) => {
      r.deleted ? r.id.clock < (t.beforeState.get(r.id.client) || 0) && t._mergeStructs.push(r) : r.delete(t);
    }), t.changed.delete(this.type);
  }
  /**
   * @param {StructStore} store
   */
  gc(t) {
    let n = this.type._start;
    for (; n !== null; )
      n.gc(t, !0), n = n.right;
    this.type._start = null, this.type._map.forEach(
      /** @param {Item | null} item */
      (r) => {
        for (; r !== null; )
          r.gc(t, !0), r = r.left;
      }
    ), this.type._map = /* @__PURE__ */ new Map();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    this.type._write(t);
  }
  /**
   * @return {number}
   */
  getRef() {
    return 7;
  }
}
const Ga = (e) => new de(Ba[e.readTypeRef()](e)), ms = (e, t) => {
  let n = t, r = 0, s;
  do
    r > 0 && (n = W(n.client, n.clock + r)), s = yn(e, n), r = n.clock - s.id.clock, n = s.redone;
  while (n !== null && s instanceof ct);
  return {
    item: s,
    diff: r
  };
}, Hs = (e, t) => {
  for (; e !== null && e.keep !== t; )
    e.keep = t, e = /** @type {AbstractType<any>} */
    e.parent._item;
}, xr = (e, t, n) => {
  const { client: r, clock: s } = t.id, i = new ct(
    W(r, s + n),
    t,
    W(r, s + n - 1),
    t.right,
    t.rightOrigin,
    t.parent,
    t.parentSub,
    t.content.splice(n)
  );
  return t.deleted && i.markDeleted(), t.keep && (i.keep = !0), t.redone !== null && (i.redone = W(t.redone.client, t.redone.clock + n)), t.right = i, i.right !== null && (i.right.left = i), e._mergeStructs.push(i), i.parentSub !== null && i.right === null && i.parent._map.set(i.parentSub, i), t.length = n, i;
}, Si = (e, t) => sc(
  e,
  /** @param {StackItem} s */
  (n) => Sn(n.deletions, t)
), qo = (e, t, n, r, s, i) => {
  const o = e.doc, c = o.store, l = o.clientID, u = t.redone;
  if (u !== null)
    return Wt(e, u);
  let a = (
    /** @type {AbstractType<any>} */
    t.parent._item
  ), h = null, d;
  if (a !== null && a.deleted === !0) {
    if (a.redone === null && (!n.has(a) || qo(e, a, n, r, s, i) === null))
      return null;
    for (; a.redone !== null; )
      a = Wt(e, a.redone);
  }
  const g = a === null ? (
    /** @type {AbstractType<any>} */
    t.parent
  ) : (
    /** @type {ContentType} */
    a.content.type
  );
  if (t.parentSub === null) {
    for (h = t.left, d = t; h !== null; ) {
      let S = h;
      for (; S !== null && /** @type {AbstractType<any>} */
      S.parent._item !== a; )
        S = S.redone === null ? null : Wt(e, S.redone);
      if (S !== null && /** @type {AbstractType<any>} */
      S.parent._item === a) {
        h = S;
        break;
      }
      h = h.left;
    }
    for (; d !== null; ) {
      let S = d;
      for (; S !== null && /** @type {AbstractType<any>} */
      S.parent._item !== a; )
        S = S.redone === null ? null : Wt(e, S.redone);
      if (S !== null && /** @type {AbstractType<any>} */
      S.parent._item === a) {
        d = S;
        break;
      }
      d = d.right;
    }
  } else if (d = null, t.right && !s) {
    for (h = t; h !== null && h.right !== null && (h.right.redone || Sn(r, h.right.id) || Si(i.undoStack, h.right.id) || Si(i.redoStack, h.right.id)); )
      for (h = h.right; h.redone; )
        h = Wt(e, h.redone);
    if (h && h.right !== null)
      return null;
  } else
    h = g._map.get(t.parentSub) || null;
  const y = wt(c, l), E = W(l, y), D = new ct(
    E,
    h,
    h && h.lastId,
    d,
    d && d.id,
    g,
    t.parentSub,
    t.content.copy()
  );
  return t.redone = E, Hs(D, !0), D.integrate(e, 0), D;
};
class ct extends Pr {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor(t, n, r, s, i, o, c, l) {
    super(t, l.getLength()), this.origin = r, this.left = n, this.right = s, this.rightOrigin = i, this.parent = o, this.parentSub = c, this.redone = null, this.content = l, this.info = this.content.isCountable() ? Ks : 0;
  }
  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker(t) {
    (this.info & Xr) > 0 !== t && (this.info ^= Xr);
  }
  get marker() {
    return (this.info & Xr) > 0;
  }
  /**
   * If true, do not garbage collect this Item.
   */
  get keep() {
    return (this.info & Xs) > 0;
  }
  set keep(t) {
    this.keep !== t && (this.info ^= Xs);
  }
  get countable() {
    return (this.info & Ks) > 0;
  }
  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted() {
    return (this.info & Yr) > 0;
  }
  set deleted(t) {
    this.deleted !== t && (this.info ^= Yr);
  }
  markDeleted() {
    this.info |= Yr;
  }
  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, n) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= wt(n, this.origin.client))
      return this.origin.client;
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= wt(n, this.rightOrigin.client))
      return this.rightOrigin.client;
    if (this.parent && this.parent.constructor === pn && this.id.client !== this.parent.client && this.parent.clock >= wt(n, this.parent.client))
      return this.parent.client;
    if (this.origin && (this.left = ys(t, n, this.origin), this.origin = this.left.lastId), this.rightOrigin && (this.right = Wt(t, this.rightOrigin), this.rightOrigin = this.right.id), this.left && this.left.constructor === te || this.right && this.right.constructor === te)
      this.parent = null;
    else if (!this.parent)
      this.left && this.left.constructor === ct ? (this.parent = this.left.parent, this.parentSub = this.left.parentSub) : this.right && this.right.constructor === ct && (this.parent = this.right.parent, this.parentSub = this.right.parentSub);
    else if (this.parent.constructor === pn) {
      const r = yn(n, this.parent);
      r.constructor === te ? this.parent = null : this.parent = /** @type {ContentType} */
      r.content.type;
    }
    return null;
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    if (n > 0 && (this.id.clock += n, this.left = ys(t, t.doc.store, W(this.id.client, this.id.clock - 1)), this.origin = this.left.lastId, this.content = this.content.splice(n), this.length -= n), this.parent) {
      if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
        let r = this.left, s;
        if (r !== null)
          s = r.right;
        else if (this.parentSub !== null)
          for (s = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; s !== null && s.left !== null; )
            s = s.left;
        else
          s = /** @type {AbstractType<any>} */
          this.parent._start;
        const i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
        for (; s !== null && s !== this.right; ) {
          if (o.add(s), i.add(s), fn(this.origin, s.origin)) {
            if (s.id.client < this.id.client)
              r = s, i.clear();
            else if (fn(this.rightOrigin, s.rightOrigin))
              break;
          } else if (s.origin !== null && o.has(yn(t.doc.store, s.origin)))
            i.has(yn(t.doc.store, s.origin)) || (r = s, i.clear());
          else
            break;
          s = s.right;
        }
        this.left = r;
      }
      if (this.left !== null) {
        const r = this.left.right;
        this.right = r, this.left.right = this;
      } else {
        let r;
        if (this.parentSub !== null)
          for (r = /** @type {AbstractType<any>} */
          this.parent._map.get(this.parentSub) || null; r !== null && r.left !== null; )
            r = r.left;
        else
          r = /** @type {AbstractType<any>} */
          this.parent._start, this.parent._start = this;
        this.right = r;
      }
      this.right !== null ? this.right.left = this : this.parentSub !== null && (this.parent._map.set(this.parentSub, this), this.left !== null && this.left.delete(t)), this.parentSub === null && this.countable && !this.deleted && (this.parent._length += this.length), io(t.doc.store, this), this.content.integrate(t, this), pi(
        t,
        /** @type {AbstractType<any>} */
        this.parent,
        this.parentSub
      ), /** @type {AbstractType<any>} */
      (this.parent._item !== null && /** @type {AbstractType<any>} */
      this.parent._item.deleted || this.parentSub !== null && this.right !== null) && this.delete(t);
    } else
      new te(this.id, this.length).integrate(t, 0);
  }
  /**
   * Returns the next non-deleted item
   */
  get next() {
    let t = this.right;
    for (; t !== null && t.deleted; )
      t = t.right;
    return t;
  }
  /**
   * Returns the previous non-deleted item
   */
  get prev() {
    let t = this.left;
    for (; t !== null && t.deleted; )
      t = t.left;
    return t;
  }
  /**
   * Computes the last content address of this Item.
   */
  get lastId() {
    return this.length === 1 ? this.id : W(this.id.client, this.id.clock + this.length - 1);
  }
  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith(t) {
    if (this.constructor === t.constructor && fn(t.origin, this.lastId) && this.right === t && fn(this.rightOrigin, t.rightOrigin) && this.id.client === t.id.client && this.id.clock + this.length === t.id.clock && this.deleted === t.deleted && this.redone === null && t.redone === null && this.content.constructor === t.content.constructor && this.content.mergeWith(t.content)) {
      const n = (
        /** @type {AbstractType<any>} */
        this.parent._searchMarker
      );
      return n && n.forEach((r) => {
        r.p === t && (r.p = this, !this.deleted && this.countable && (r.index -= this.length));
      }), t.keep && (this.keep = !0), this.right = t.right, this.right !== null && (this.right.left = this), this.length += t.length, !0;
    }
    return !1;
  }
  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete(t) {
    if (!this.deleted) {
      const n = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      this.countable && this.parentSub === null && (n._length -= this.length), this.markDeleted(), Kn(t.deleteSet, this.id.client, this.id.clock, this.length), pi(t, n, this.parentSub), this.content.delete(t);
    }
  }
  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc(t, n) {
    if (!this.deleted)
      throw ee();
    this.content.gc(t), n ? Xl(t, this, new te(this.id, this.length)) : this.content = new bn(this.length);
  }
  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write(t, n) {
    const r = n > 0 ? W(this.id.client, this.id.clock + n - 1) : this.origin, s = this.rightOrigin, i = this.parentSub, o = this.content.getRef() & Tr | (r === null ? 0 : oe) | // origin is defined
    (s === null ? 0 : Me) | // right origin is defined
    (i === null ? 0 : Gn);
    if (t.writeInfo(o), r !== null && t.writeLeftID(r), s !== null && t.writeRightID(s), r === null && s === null) {
      const c = (
        /** @type {AbstractType<any>} */
        this.parent
      );
      if (c._item !== void 0) {
        const l = c._item;
        if (l === null) {
          const u = js(c);
          t.writeParentInfo(!0), t.writeString(u);
        } else
          t.writeParentInfo(!1), t.writeLeftID(l.id);
      } else
        c.constructor === String ? (t.writeParentInfo(!0), t.writeString(c)) : c.constructor === pn ? (t.writeParentInfo(!1), t.writeLeftID(c)) : ee();
      i !== null && t.writeString(i);
    }
    this.content.write(t, n);
  }
}
const Po = (e, t) => Wa[t & Tr](e), Wa = [
  () => {
    ee();
  },
  // GC is not ItemContent
  xa,
  // 1
  Ra,
  // 2
  La,
  // 3
  Ua,
  // 4
  Ta,
  // 5
  Ma,
  // 6
  Ga,
  // 7
  Na,
  // 8
  Ia,
  // 9
  () => {
    ee();
  }
  // 10 - Skip is not ItemContent
], Ja = 10;
class Qt extends Pr {
  get deleted() {
    return !0;
  }
  delete() {
  }
  /**
   * @param {Skip} right
   * @return {boolean}
   */
  mergeWith(t) {
    return this.constructor !== t.constructor ? !1 : (this.length += t.length, !0);
  }
  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate(t, n) {
    ee();
  }
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write(t, n) {
    t.writeInfo(Ja), B(t.restEncoder, this.length - n);
  }
  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing(t, n) {
    return null;
  }
}
const Ho = (
  /** @type {any} */
  typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {}
), $o = "__ $YJS$ __";
Ho[$o] === !0 && console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
Ho[$o] = !0;
const fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbsolutePosition: eo,
  AbstractConnector: vl,
  AbstractStruct: Pr,
  AbstractType: Tt,
  Array: je,
  ContentAny: Fe,
  ContentBinary: kn,
  ContentDeleted: bn,
  ContentDoc: Cn,
  ContentEmbed: ze,
  ContentFormat: Ot,
  ContentJSON: Rn,
  ContentString: he,
  ContentType: de,
  Doc: sn,
  GC: te,
  ID: pn,
  Item: ct,
  Map: en,
  PermanentUserData: Ml,
  RelativePosition: Fr,
  Skip: Qt,
  Snapshot: Ns,
  Text: wn,
  Transaction: co,
  UndoManager: Zl,
  UpdateDecoderV1: fe,
  UpdateDecoderV2: ce,
  UpdateEncoderV1: on,
  UpdateEncoderV2: we,
  XmlElement: rn,
  XmlFragment: nn,
  XmlHook: Mn,
  XmlText: rr,
  YArrayEvent: To,
  YEvent: cr,
  YMapEvent: Mo,
  YTextEvent: Fo,
  YXmlEvent: Vo,
  applyUpdate: Yi,
  applyUpdateV2: Br,
  cleanupYTextFormatting: Bo,
  compareIDs: fn,
  compareRelativePositions: ds,
  convertUpdateFormatV1ToV2: aa,
  convertUpdateFormatV2ToV1: wo,
  createAbsolutePositionFromRelativePosition: fs,
  createDeleteSet: Nr,
  createDeleteSetFromStructStore: xs,
  createDocFromSnapshot: Gl,
  createID: W,
  createRelativePositionFromJSON: us,
  createRelativePositionFromTypeIndex: hs,
  createSnapshot: Us,
  decodeRelativePosition: Fl,
  decodeSnapshot: Pl,
  decodeSnapshotV2: ro,
  decodeStateVector: Ms,
  decodeUpdate: na,
  decodeUpdateV2: fo,
  diffUpdate: oa,
  diffUpdateV2: Fs,
  emptySnapshot: Hl,
  encodeRelativePosition: Ul,
  encodeSnapshot: ql,
  encodeSnapshotV2: no,
  encodeStateAsUpdate: Ki,
  encodeStateAsUpdateV2: Xi,
  encodeStateVector: Zi,
  encodeStateVectorFromUpdate: ra,
  encodeStateVectorFromUpdateV2: po,
  equalDeleteSets: Gi,
  equalSnapshots: zl,
  findIndexSS: ue,
  findRootTypeKey: js,
  getItem: yn,
  getItemCleanEnd: ys,
  getItemCleanStart: Wt,
  getState: wt,
  getTypeChildren: ga,
  isDeleted: Sn,
  isParentOf: Zn,
  iterateDeletedStructs: _n,
  logType: Tl,
  logUpdate: ea,
  logUpdateV2: ho,
  mergeDeleteSets: mn,
  mergeUpdates: go,
  mergeUpdatesV2: tr,
  obfuscateUpdate: ca,
  obfuscateUpdateV2: la,
  parseUpdateMeta: sa,
  parseUpdateMetaV2: yo,
  readUpdate: Dl,
  readUpdateV2: Ts,
  relativePositionToJSON: Rl,
  snapshot: $l,
  snapshotContainsUpdate: Jl,
  transact: lt,
  tryGc: Kl,
  typeListToArraySnapshot: pa,
  typeMapGetAllSnapshot: Io,
  typeMapGetSnapshot: ma
}, Symbol.toStringTag, { value: "Module" })), ns = 3e4;
class Ya extends oc {
  /**
   * @param {Y.Doc} doc
   */
  constructor(t) {
    super(), this.doc = t, this.clientID = t.clientID, this.states = /* @__PURE__ */ new Map(), this.meta = /* @__PURE__ */ new Map(), this._checkInterval = /** @type {any} */
    setInterval(() => {
      const n = Ze();
      this.getLocalState() !== null && ns / 2 <= n - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated && this.setLocalState(this.getLocalState());
      const r = [];
      this.meta.forEach((s, i) => {
        i !== this.clientID && ns <= n - s.lastUpdated && this.states.has(i) && r.push(i);
      }), r.length > 0 && $s(this, r, "timeout");
    }, Ue(ns / 10)), t.on("destroy", () => {
      this.destroy();
    }), this.setLocalState({});
  }
  destroy() {
    this.emit("destroy", [this]), this.setLocalState(null), super.destroy(), clearInterval(this._checkInterval);
  }
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState() {
    return this.states.get(this.clientID) || null;
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(t) {
    const n = this.clientID, r = this.meta.get(n), s = r === void 0 ? 0 : r.clock + 1, i = this.states.get(n);
    t === null ? this.states.delete(n) : this.states.set(n, t), this.meta.set(n, {
      clock: s,
      lastUpdated: Ze()
    });
    const o = [], c = [], l = [], u = [];
    t === null ? u.push(n) : i == null ? t != null && o.push(n) : (c.push(n), Hn(i, t) || l.push(n)), (o.length > 0 || l.length > 0 || u.length > 0) && this.emit("change", [{ added: o, updated: l, removed: u }, "local"]), this.emit("update", [{ added: o, updated: c, removed: u }, "local"]);
  }
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(t, n) {
    const r = this.getLocalState();
    r !== null && this.setLocalState({
      ...r,
      [t]: n
    });
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates() {
    return this.states;
  }
}
const $s = (e, t, n) => {
  const r = [];
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    if (e.states.has(i)) {
      if (e.states.delete(i), i === e.clientID) {
        const o = (
          /** @type {MetaClientState} */
          e.meta.get(i)
        );
        e.meta.set(i, {
          clock: o.clock + 1,
          lastUpdated: Ze()
        });
      }
      r.push(i);
    }
  }
  r.length > 0 && (e.emit("change", [{ added: [], updated: [], removed: r }, n]), e.emit("update", [{ added: [], updated: [], removed: r }, n]));
}, $n = (e, t, n = e.states) => {
  const r = t.length, s = Nt();
  B(s, r);
  for (let i = 0; i < r; i++) {
    const o = t[i], c = n.get(o) || null, l = (
      /** @type {MetaClientState} */
      e.meta.get(o).clock
    );
    B(s, o), B(s, l), Xe(s, JSON.stringify(c));
  }
  return gt(s);
}, Xa = (e, t, n) => {
  const r = Bt(t), s = Ze(), i = [], o = [], c = [], l = [], u = G(r);
  for (let a = 0; a < u; a++) {
    const h = G(r);
    let d = G(r);
    const g = JSON.parse(Re(r)), y = e.meta.get(h), E = e.states.get(h), D = y === void 0 ? 0 : y.clock;
    (D < d || D === d && g === null && e.states.has(h)) && (g === null ? h === e.clientID && e.getLocalState() != null ? d++ : e.states.delete(h) : e.states.set(h, g), e.meta.set(h, {
      clock: d,
      lastUpdated: s
    }), y === void 0 && g !== null ? i.push(h) : y !== void 0 && g === null ? l.push(h) : g !== null && (Hn(g, E) || c.push(h), o.push(h)));
  }
  (i.length > 0 || c.length > 0 || l.length > 0) && e.emit("change", [{
    added: i,
    updated: c,
    removed: l
  }, n]), (i.length > 0 || o.length > 0 || l.length > 0) && e.emit("update", [{
    added: i,
    updated: o,
    removed: l
  }, n]);
}, Sr = (e, t, n, r, s) => {
  try {
    if (t && t.cursor && n !== r.clientID) {
      const i = t.user || {}, o = i.color || "#ffa500", c = i.name || `User: ${n}`;
      e.createCursor(n.toString(), c, o);
      const l = fs(us(t.cursor.anchor), r), u = fs(us(t.cursor.head), r);
      l && u && l.type === s && e.moveCursor(n.toString(), { index: l.index, length: u.index - l.index });
    } else
      e.removeCursor(n.toString());
  } catch (i) {
    console.error(i);
  }
};
class du {
  /**
   * @param {Y.Text} type
   * @param {any} quill
   * @param {Awareness} [awareness]
   */
  constructor(t, n, r) {
    const s = (
      /** @type {Y.Doc} */
      t.doc
    );
    this.type = t, this.doc = s, this.quill = n;
    const i = n.getModule("cursors") || null;
    this.quillCursors = i, this._negatedUsedFormats = {}, this.awareness = r, this._awarenessChange = ({ added: o, removed: c, updated: l }) => {
      const u = (
        /** @type {Awareness} */
        r.getStates()
      );
      o.forEach((a) => {
        Sr(i, u.get(a), a, s, t);
      }), l.forEach((a) => {
        Sr(i, u.get(a), a, s, t);
      }), c.forEach((a) => {
        i.removeCursor(a.toString());
      });
    }, this._typeObserver = (o) => {
      if (o.transaction.origin !== this) {
        const c = o.delta, l = [];
        for (let u = 0; u < c.length; u++) {
          const a = c[u];
          a.insert !== void 0 ? l.push(Object.assign({}, a, { attributes: Object.assign({}, this._negatedUsedFormats, a.attributes || {}) })) : l.push(a);
        }
        n.updateContents(l, this);
      }
    }, t.observe(this._typeObserver), this._quillObserver = (o, c, l, u) => {
      if (c && c.ops) {
        const a = c.ops;
        a.forEach((h) => {
          if (h.attributes !== void 0)
            for (let d in h.attributes)
              this._negatedUsedFormats[d] === void 0 && (this._negatedUsedFormats[d] = !1);
        }), u !== this && s.transact(() => {
          t.applyDelta(a);
        }, this);
      }
      if (r && i) {
        const a = n.getSelection(), h = (
          /** @type {any} */
          r.getLocalState()
        );
        if (a === null)
          r.getLocalState() !== null && r.setLocalStateField(
            "cursor",
            /** @type {any} */
            null
          );
        else {
          const d = hs(t, a.index), g = hs(t, a.index + a.length);
          (!h || !h.cursor || !ds(d, h.cursor.anchor) || !ds(g, h.cursor.head)) && r.setLocalStateField("cursor", {
            anchor: d,
            head: g
          });
        }
        r.getStates().forEach((d, g) => {
          Sr(i, d, g, s, t);
        });
      }
    }, n.on("editor-change", this._quillObserver), n.setContents(t.toDelta(), this), i !== null && r && (r.getStates().forEach((o, c) => {
      Sr(i, o, c, s, t);
    }), r.on("change", this._awarenessChange));
  }
  destroy() {
    this.type.unobserve(this._typeObserver), this.quill.off("editor-change", this._quillObserver), this.awareness && this.awareness.off("change", this._awarenessChange);
  }
}
function Ka(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Go = { exports: {} };
/*! For license information please see quill-cursors.js.LICENSE.txt */
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(self, () => (() => {
    var n = { 582: (o, c, l) => {
      l.d(c, { Z: () => g });
      var u = l(81), a = l.n(u), h = l(645), d = l.n(h)()(a());
      d.push([o.id, ".ql-container{position:relative;overflow:hidden}@media(pointer: coarse){.ql-cursor-caret-container{z-index:-1}}.ql-cursor.hidden{display:none}.ql-cursor .ql-cursor-caret-container,.ql-cursor .ql-cursor-flag{position:absolute}.ql-cursor .ql-cursor-flag{z-index:1;transform:translate3d(-1px, -100%, 0);opacity:0;visibility:hidden;color:#fff;padding-bottom:2px;border-radius:0 3px 3px 0}.ql-cursor .ql-cursor-flag.flag-flipped{border-radius:3px 0 0 3px;transform:translate3d(calc(-100% + 1px ), -100%, 0)}@media screen{.ql-cursor .ql-cursor-flag{transition:opacity 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms,visibility 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms}}.ql-cursor .ql-cursor-flag .ql-cursor-name{margin-left:5px;margin-right:5px;display:inline-block;margin-top:-2px;white-space:nowrap}.ql-cursor .ql-cursor-flag.no-delay[style]{transition-delay:unset !important}.ql-cursor .ql-cursor-caret-container{cursor:text;margin-left:-9px;padding:0 9px}.ql-cursor .ql-cursor-caret-container.hover+.ql-cursor-flag{opacity:1;visibility:visible;transition:none}.ql-cursor .ql-cursor-caret-container.no-pointer{pointer-events:none}.ql-cursor .ql-cursor-caret-container .ql-cursor-caret{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background-color:attr(data-color)}.ql-cursor .ql-cursor-selection-block{position:absolute;pointer-events:none}", ""]);
      const g = d;
    }, 645: (o) => {
      o.exports = function(c) {
        var l = [];
        return l.toString = function() {
          return this.map(function(u) {
            var a = "", h = u[5] !== void 0;
            return u[4] && (a += "@supports (".concat(u[4], ") {")), u[2] && (a += "@media ".concat(u[2], " {")), h && (a += "@layer".concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")), a += c(u), h && (a += "}"), u[2] && (a += "}"), u[4] && (a += "}"), a;
          }).join("");
        }, l.i = function(u, a, h, d, g) {
          typeof u == "string" && (u = [[null, u, void 0]]);
          var y = {};
          if (h)
            for (var E = 0; E < this.length; E++) {
              var D = this[E][0];
              D != null && (y[D] = !0);
            }
          for (var S = 0; S < u.length; S++) {
            var _ = [].concat(u[S]);
            h && y[_[0]] || (g !== void 0 && (_[5] === void 0 || (_[1] = "@layer".concat(_[5].length > 0 ? " ".concat(_[5]) : "", " {").concat(_[1], "}")), _[5] = g), a && (_[2] && (_[1] = "@media ".concat(_[2], " {").concat(_[1], "}")), _[2] = a), d && (_[4] ? (_[1] = "@supports (".concat(_[4], ") {").concat(_[1], "}"), _[4] = d) : _[4] = "".concat(d)), l.push(_));
          }
        }, l;
      };
    }, 81: (o) => {
      o.exports = function(c) {
        return c[1];
      };
    }, 529: (o) => {
      var c = -1;
      function l(f, p, b, w) {
        if (f === p)
          return f ? [[0, f]] : [];
        if (b != null) {
          var A = function($, R, L) {
            var O = typeof L == "number" ? { index: L, length: 0 } : L.oldRange, x = typeof L == "number" ? null : L.newRange, F = $.length, V = R.length;
            if (O.length === 0 && (x === null || x.length === 0)) {
              var rt = O.index, ft = $.slice(0, rt), bt = $.slice(rt), pt = x ? x.index : null, P = rt + V - F;
              if ((pt === null || pt === P) && !(P < 0 || P > V)) {
                var ne = R.slice(0, P);
                if ((at = R.slice(P)) === bt) {
                  var Ft = Math.min(rt, P);
                  if ((yt = ft.slice(0, Ft)) === (ot = ne.slice(0, Ft)))
                    return S(yt, ft.slice(Ft), ne.slice(Ft), bt);
                }
              }
              if (pt === null || pt === rt) {
                var Z = rt, at = (ne = R.slice(0, Z), R.slice(Z));
                if (ne === ft) {
                  var tt = Math.min(F - Z, V - Z);
                  if ((Lt = bt.slice(bt.length - tt)) === (xt = at.slice(at.length - tt)))
                    return S(ft, bt.slice(0, bt.length - tt), at.slice(0, at.length - tt), Lt);
                }
              }
            }
            if (O.length > 0 && x && x.length === 0) {
              var yt = $.slice(0, O.index), Lt = $.slice(O.index + O.length);
              if (!(V < (Ft = yt.length) + (tt = Lt.length))) {
                var ot = R.slice(0, Ft), xt = R.slice(V - tt);
                if (yt === ot && Lt === xt)
                  return S(yt, $.slice(Ft, F - tt), R.slice(Ft, V - tt), Lt);
              }
            }
            return null;
          }(f, p, b);
          if (A)
            return A;
        }
        var M = a(f, p), j = f.substring(0, M);
        M = h(f = f.substring(M), p = p.substring(M));
        var U = f.substring(f.length - M), q = function($, R) {
          var L;
          if (!$)
            return [[1, R]];
          if (!R)
            return [[c, $]];
          var O = $.length > R.length ? $ : R, x = $.length > R.length ? R : $, F = O.indexOf(x);
          if (F !== -1)
            return L = [[1, O.substring(0, F)], [0, x], [1, O.substring(F + x.length)]], $.length > R.length && (L[0][0] = L[2][0] = c), L;
          if (x.length === 1)
            return [[c, $], [1, R]];
          var V = function(Z, at) {
            var tt = Z.length > at.length ? Z : at, yt = Z.length > at.length ? at : Z;
            if (tt.length < 4 || 2 * yt.length < tt.length)
              return null;
            function Lt(Xt, Vt, zt) {
              for (var ae, Mt, kt, dt, Ht = Xt.substring(zt, zt + Math.floor(Xt.length / 4)), vt = -1, Ct = ""; (vt = Vt.indexOf(Ht, vt + 1)) !== -1; ) {
                var _t = a(Xt.substring(zt), Vt.substring(vt)), $t = h(Xt.substring(0, zt), Vt.substring(0, vt));
                Ct.length < $t + _t && (Ct = Vt.substring(vt - $t, vt) + Vt.substring(vt, vt + _t), ae = Xt.substring(0, zt - $t), Mt = Xt.substring(zt + _t), kt = Vt.substring(0, vt - $t), dt = Vt.substring(vt + _t));
              }
              return 2 * Ct.length >= Xt.length ? [ae, Mt, kt, dt, Ct] : null;
            }
            var ot, xt, It, ut, Jt, Yt = Lt(tt, yt, Math.ceil(tt.length / 4)), le = Lt(tt, yt, Math.ceil(tt.length / 2));
            return Yt || le ? (ot = le ? Yt && Yt[4].length > le[4].length ? Yt : le : Yt, Z.length > at.length ? (xt = ot[0], It = ot[1], ut = ot[2], Jt = ot[3]) : (ut = ot[0], Jt = ot[1], xt = ot[2], It = ot[3]), [xt, It, ut, Jt, ot[4]]) : null;
          }($, R);
          if (V) {
            var rt = V[0], ft = V[1], bt = V[2], pt = V[3], P = V[4], ne = l(rt, bt), Ft = l(ft, pt);
            return ne.concat([[0, P]], Ft);
          }
          return function(Z, at) {
            for (var tt = Z.length, yt = at.length, Lt = Math.ceil((tt + yt) / 2), ot = Lt, xt = 2 * Lt, It = new Array(xt), ut = new Array(xt), Jt = 0; Jt < xt; Jt++)
              It[Jt] = -1, ut[Jt] = -1;
            It[ot + 1] = 0, ut[ot + 1] = 0;
            for (var Yt = tt - yt, le = Yt % 2 != 0, Xt = 0, Vt = 0, zt = 0, ae = 0, Mt = 0; Mt < Lt; Mt++) {
              for (var kt = -Mt + Xt; kt <= Mt - Vt; kt += 2) {
                for (var dt = ot + kt, Ht = (qt = kt === -Mt || kt !== Mt && It[dt - 1] < It[dt + 1] ? It[dt + 1] : It[dt - 1] + 1) - kt; qt < tt && Ht < yt && Z.charAt(qt) === at.charAt(Ht); )
                  qt++, Ht++;
                if (It[dt] = qt, qt > tt)
                  Vt += 2;
                else if (Ht > yt)
                  Xt += 2;
                else if (le && (_t = ot + Yt - kt) >= 0 && _t < xt && ut[_t] !== -1 && qt >= (Ct = tt - ut[_t]))
                  return u(Z, at, qt, Ht);
              }
              for (var vt = -Mt + zt; vt <= Mt - ae; vt += 2) {
                for (var Ct, _t = ot + vt, $t = (Ct = vt === -Mt || vt !== Mt && ut[_t - 1] < ut[_t + 1] ? ut[_t + 1] : ut[_t - 1] + 1) - vt; Ct < tt && $t < yt && Z.charAt(tt - Ct - 1) === at.charAt(yt - $t - 1); )
                  Ct++, $t++;
                if (ut[_t] = Ct, Ct > tt)
                  ae += 2;
                else if ($t > yt)
                  zt += 2;
                else if (!le) {
                  var qt;
                  if ((dt = ot + Yt - vt) >= 0 && dt < xt && It[dt] !== -1 && (Ht = ot + (qt = It[dt]) - dt, qt >= (Ct = tt - Ct)))
                    return u(Z, at, qt, Ht);
                }
              }
            }
            return [[c, Z], [1, at]];
          }($, R);
        }(f = f.substring(0, f.length - M), p = p.substring(0, p.length - M));
        return j && q.unshift([0, j]), U && q.push([0, U]), d(q, w), q;
      }
      function u(f, p, b, w) {
        var A = f.substring(0, b), M = p.substring(0, w), j = f.substring(b), U = p.substring(w), q = l(A, M), $ = l(j, U);
        return q.concat($);
      }
      function a(f, p) {
        if (!f || !p || f.charAt(0) !== p.charAt(0))
          return 0;
        for (var b = 0, w = Math.min(f.length, p.length), A = w, M = 0; b < A; )
          f.substring(M, A) == p.substring(M, A) ? M = b = A : w = A, A = Math.floor((w - b) / 2 + b);
        return g(f.charCodeAt(A - 1)) && A--, A;
      }
      function h(f, p) {
        if (!f || !p || f.slice(-1) !== p.slice(-1))
          return 0;
        for (var b = 0, w = Math.min(f.length, p.length), A = w, M = 0; b < A; )
          f.substring(f.length - A, f.length - M) == p.substring(p.length - A, p.length - M) ? M = b = A : w = A, A = Math.floor((w - b) / 2 + b);
        return y(f.charCodeAt(f.length - A)) && A--, A;
      }
      function d(f, p) {
        f.push([0, ""]);
        for (var b, w = 0, A = 0, M = 0, j = "", U = ""; w < f.length; )
          if (w < f.length - 1 && !f[w][1])
            f.splice(w, 1);
          else
            switch (f[w][0]) {
              case 1:
                M++, U += f[w][1], w++;
                break;
              case c:
                A++, j += f[w][1], w++;
                break;
              case 0:
                var q = w - M - A - 1;
                if (p) {
                  if (q >= 0 && D(f[q][1])) {
                    var $ = f[q][1].slice(-1);
                    if (f[q][1] = f[q][1].slice(0, -1), j = $ + j, U = $ + U, !f[q][1]) {
                      f.splice(q, 1), w--;
                      var R = q - 1;
                      f[R] && f[R][0] === 1 && (M++, U = f[R][1] + U, R--), f[R] && f[R][0] === c && (A++, j = f[R][1] + j, R--), q = R;
                    }
                  }
                  E(f[w][1]) && ($ = f[w][1].charAt(0), f[w][1] = f[w][1].slice(1), j += $, U += $);
                }
                if (w < f.length - 1 && !f[w][1]) {
                  f.splice(w, 1);
                  break;
                }
                if (j.length > 0 || U.length > 0) {
                  j.length > 0 && U.length > 0 && ((b = a(U, j)) !== 0 && (q >= 0 ? f[q][1] += U.substring(0, b) : (f.splice(0, 0, [0, U.substring(0, b)]), w++), U = U.substring(b), j = j.substring(b)), (b = h(U, j)) !== 0 && (f[w][1] = U.substring(U.length - b) + f[w][1], U = U.substring(0, U.length - b), j = j.substring(0, j.length - b)));
                  var L = M + A;
                  j.length === 0 && U.length === 0 ? (f.splice(w - L, L), w -= L) : j.length === 0 ? (f.splice(w - L, L, [1, U]), w = w - L + 1) : U.length === 0 ? (f.splice(w - L, L, [c, j]), w = w - L + 1) : (f.splice(w - L, L, [c, j], [1, U]), w = w - L + 2);
                }
                w !== 0 && f[w - 1][0] === 0 ? (f[w - 1][1] += f[w][1], f.splice(w, 1)) : w++, M = 0, A = 0, j = "", U = "";
            }
        f[f.length - 1][1] === "" && f.pop();
        var O = !1;
        for (w = 1; w < f.length - 1; )
          f[w - 1][0] === 0 && f[w + 1][0] === 0 && (f[w][1].substring(f[w][1].length - f[w - 1][1].length) === f[w - 1][1] ? (f[w][1] = f[w - 1][1] + f[w][1].substring(0, f[w][1].length - f[w - 1][1].length), f[w + 1][1] = f[w - 1][1] + f[w + 1][1], f.splice(w - 1, 1), O = !0) : f[w][1].substring(0, f[w + 1][1].length) == f[w + 1][1] && (f[w - 1][1] += f[w + 1][1], f[w][1] = f[w][1].substring(f[w + 1][1].length) + f[w + 1][1], f.splice(w + 1, 1), O = !0)), w++;
        O && d(f, p);
      }
      function g(f) {
        return f >= 55296 && f <= 56319;
      }
      function y(f) {
        return f >= 56320 && f <= 57343;
      }
      function E(f) {
        return y(f.charCodeAt(0));
      }
      function D(f) {
        return g(f.charCodeAt(f.length - 1));
      }
      function S(f, p, b, w) {
        return D(f) || E(w) ? null : function(A) {
          for (var M = [], j = 0; j < A.length; j++)
            A[j][1].length > 0 && M.push(A[j]);
          return M;
        }([[0, f], [c, p], [1, b], [0, w]]);
      }
      function _(f, p, b) {
        return l(f, p, b, !0);
      }
      _.INSERT = 1, _.DELETE = c, _.EQUAL = 0, o.exports = _;
    }, 465: (o, c, l) => {
      o = l.nmd(o);
      var u = "__lodash_hash_undefined__", a = 9007199254740991, h = "[object Arguments]", d = "[object Boolean]", g = "[object Date]", y = "[object Function]", E = "[object GeneratorFunction]", D = "[object Map]", S = "[object Number]", _ = "[object Object]", f = "[object Promise]", p = "[object RegExp]", b = "[object Set]", w = "[object String]", A = "[object Symbol]", M = "[object WeakMap]", j = "[object ArrayBuffer]", U = "[object DataView]", q = "[object Float32Array]", $ = "[object Float64Array]", R = "[object Int8Array]", L = "[object Int16Array]", O = "[object Int32Array]", x = "[object Uint8Array]", F = "[object Uint8ClampedArray]", V = "[object Uint16Array]", rt = "[object Uint32Array]", ft = /\w*$/, bt = /^\[object .+?Constructor\]$/, pt = /^(?:0|[1-9]\d*)$/, P = {};
      P[h] = P["[object Array]"] = P[j] = P[U] = P[d] = P[g] = P[q] = P[$] = P[R] = P[L] = P[O] = P[D] = P[S] = P[_] = P[p] = P[b] = P[w] = P[A] = P[x] = P[F] = P[V] = P[rt] = !0, P["[object Error]"] = P[y] = P[M] = !1;
      var ne = typeof l.g == "object" && l.g && l.g.Object === Object && l.g, Ft = typeof self == "object" && self && self.Object === Object && self, Z = ne || Ft || Function("return this")(), at = c && !c.nodeType && c, tt = at && o && !o.nodeType && o, yt = tt && tt.exports === at;
      function Lt(m, k) {
        return m.set(k[0], k[1]), m;
      }
      function ot(m, k) {
        return m.add(k), m;
      }
      function xt(m, k, T, N) {
        var J = -1, st = m ? m.length : 0;
        for (N && st && (T = m[++J]); ++J < st; )
          T = k(T, m[J], J, m);
        return T;
      }
      function It(m) {
        var k = !1;
        if (m != null && typeof m.toString != "function")
          try {
            k = !!(m + "");
          } catch {
          }
        return k;
      }
      function ut(m) {
        var k = -1, T = Array(m.size);
        return m.forEach(function(N, J) {
          T[++k] = [J, N];
        }), T;
      }
      function Jt(m, k) {
        return function(T) {
          return m(k(T));
        };
      }
      function Yt(m) {
        var k = -1, T = Array(m.size);
        return m.forEach(function(N) {
          T[++k] = N;
        }), T;
      }
      var le, Xt = Array.prototype, Vt = Function.prototype, zt = Object.prototype, ae = Z["__core-js_shared__"], Mt = (le = /[^.]+$/.exec(ae && ae.keys && ae.keys.IE_PROTO || "")) ? "Symbol(src)_1." + le : "", kt = Vt.toString, dt = zt.hasOwnProperty, Ht = zt.toString, vt = RegExp("^" + kt.call(dt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Ct = yt ? Z.Buffer : void 0, _t = Z.Symbol, $t = Z.Uint8Array, qt = Jt(Object.getPrototypeOf, Object), Un = Object.create, ln = zt.propertyIsEnumerable, Hr = Xt.splice, ar = Object.getOwnPropertySymbols, $r = Ct ? Ct.isBuffer : void 0, Gr = Jt(Object.keys, Object), Bn = Se(Z, "DataView"), qe = Se(Z, "Map"), an = Se(Z, "Promise"), ge = Se(Z, "Set"), re = Se(Z, "WeakMap"), se = Se(Object, "create"), En = Ce(Bn), be = Ce(qe), An = Ce(an), un = Ce(ge), ur = Ce(re), Fn = _t ? _t.prototype : void 0, Vn = Fn ? Fn.valueOf : void 0;
      function ve(m) {
        var k = -1, T = m ? m.length : 0;
        for (this.clear(); ++k < T; ) {
          var N = m[k];
          this.set(N[0], N[1]);
        }
      }
      function Zt(m) {
        var k = -1, T = m ? m.length : 0;
        for (this.clear(); ++k < T; ) {
          var N = m[k];
          this.set(N[0], N[1]);
        }
      }
      function ie(m) {
        var k = -1, T = m ? m.length : 0;
        for (this.clear(); ++k < T; ) {
          var N = m[k];
          this.set(N[0], N[1]);
        }
      }
      function Pe(m) {
        this.__data__ = new Zt(m);
      }
      function pe(m, k, T) {
        var N = m[k];
        dt.call(m, k) && dr(N, T) && (T !== void 0 || k in m) || (m[k] = T);
      }
      function Dn(m, k) {
        for (var T = m.length; T--; )
          if (dr(m[T][0], k))
            return T;
        return -1;
      }
      function ye(m, k, T, N, J, st, ht) {
        var K;
        if (N && (K = st ? N(m, J, st, ht) : N(m)), K !== void 0)
          return K;
        if (!nt(m))
          return m;
        var Et = v(m);
        if (Et) {
          if (K = function(H) {
            var it = H.length, At = H.constructor(it);
            return it && typeof H[0] == "string" && dt.call(H, "index") && (At.index = H.index, At.input = H.input), At;
          }(m), !k)
            return function(H, it) {
              var At = -1, X = H.length;
              for (it || (it = Array(X)); ++At < X; )
                it[At] = H[At];
              return it;
            }(m, K);
        } else {
          var mt = ke(m), Ee = mt == y || mt == E;
          if (I(m))
            return function(H, it) {
              if (it)
                return H.slice();
              var At = new H.constructor(H.length);
              return H.copy(At), At;
            }(m, k);
          if (mt == _ || mt == h || Ee && !st) {
            if (It(m))
              return st ? m : {};
            if (K = function(H) {
              return typeof H.constructor != "function" || He(H) ? {} : nt(it = qt(H)) ? Un(it) : {};
              var it;
            }(Ee ? {} : m), !k)
              return function(H, it) {
                return hr(H, zn(H), it);
              }(m, function(H, it) {
                return H && hr(it, Y(it), H);
              }(K, m));
          } else {
            if (!P[mt])
              return st ? m : {};
            K = function(H, it, At, X) {
              var et, _e = H.constructor;
              switch (it) {
                case j:
                  return On(H);
                case d:
                case g:
                  return new _e(+H);
                case U:
                  return function(Q, Rt) {
                    var St = Rt ? On(Q.buffer) : Q.buffer;
                    return new Q.constructor(St, Q.byteOffset, Q.byteLength);
                  }(H, X);
                case q:
                case $:
                case R:
                case L:
                case O:
                case x:
                case F:
                case V:
                case rt:
                  return function(Q, Rt) {
                    var St = Rt ? On(Q.buffer) : Q.buffer;
                    return new Q.constructor(St, Q.byteOffset, Q.length);
                  }(H, X);
                case D:
                  return function(Q, Rt, St) {
                    return xt(Rt ? St(ut(Q), !0) : ut(Q), Lt, new Q.constructor());
                  }(H, X, At);
                case S:
                case w:
                  return new _e(H);
                case p:
                  return function(Q) {
                    var Rt = new Q.constructor(Q.source, ft.exec(Q));
                    return Rt.lastIndex = Q.lastIndex, Rt;
                  }(H);
                case b:
                  return function(Q, Rt, St) {
                    return xt(Rt ? St(Yt(Q), !0) : Yt(Q), ot, new Q.constructor());
                  }(H, X, At);
                case A:
                  return et = H, Vn ? Object(Vn.call(et)) : {};
              }
            }(m, mt, ye, k);
          }
        }
        ht || (ht = new Pe());
        var xe = ht.get(m);
        if (xe)
          return xe;
        if (ht.set(m, K), !Et)
          var $e = T ? function(H) {
            return function(it, At, X) {
              var et = At(it);
              return v(it) ? et : function(_e, Q) {
                for (var Rt = -1, St = Q.length, me = _e.length; ++Rt < St; )
                  _e[me + Rt] = Q[Rt];
                return _e;
              }(et, X(it));
            }(H, Y, zn);
          }(m) : Y(m);
        return function(H, it) {
          for (var At = -1, X = H ? H.length : 0; ++At < X && it(H[At], At) !== !1; )
            ;
        }($e || m, function(H, it) {
          $e && (H = m[it = H]), pe(K, it, ye(H, k, T, N, it, m, ht));
        }), K;
      }
      function On(m) {
        var k = new m.constructor(m.byteLength);
        return new $t(k).set(new $t(m)), k;
      }
      function hr(m, k, T, N) {
        T || (T = {});
        for (var J = -1, st = k.length; ++J < st; ) {
          var ht = k[J], K = N ? N(T[ht], m[ht], ht, T, m) : void 0;
          pe(T, ht, K === void 0 ? m[ht] : K);
        }
        return T;
      }
      function Le(m, k) {
        var T, N, J = m.__data__;
        return ((N = typeof (T = k)) == "string" || N == "number" || N == "symbol" || N == "boolean" ? T !== "__proto__" : T === null) ? J[typeof k == "string" ? "string" : "hash"] : J.map;
      }
      function Se(m, k) {
        var T = function(N, J) {
          return N == null ? void 0 : N[J];
        }(m, k);
        return function(N) {
          return !(!nt(N) || (J = N, Mt && Mt in J)) && (z(N) || It(N) ? vt : bt).test(Ce(N));
          var J;
        }(T) ? T : void 0;
      }
      ve.prototype.clear = function() {
        this.__data__ = se ? se(null) : {};
      }, ve.prototype.delete = function(m) {
        return this.has(m) && delete this.__data__[m];
      }, ve.prototype.get = function(m) {
        var k = this.__data__;
        if (se) {
          var T = k[m];
          return T === u ? void 0 : T;
        }
        return dt.call(k, m) ? k[m] : void 0;
      }, ve.prototype.has = function(m) {
        var k = this.__data__;
        return se ? k[m] !== void 0 : dt.call(k, m);
      }, ve.prototype.set = function(m, k) {
        return this.__data__[m] = se && k === void 0 ? u : k, this;
      }, Zt.prototype.clear = function() {
        this.__data__ = [];
      }, Zt.prototype.delete = function(m) {
        var k = this.__data__, T = Dn(k, m);
        return !(T < 0 || (T == k.length - 1 ? k.pop() : Hr.call(k, T, 1), 0));
      }, Zt.prototype.get = function(m) {
        var k = this.__data__, T = Dn(k, m);
        return T < 0 ? void 0 : k[T][1];
      }, Zt.prototype.has = function(m) {
        return Dn(this.__data__, m) > -1;
      }, Zt.prototype.set = function(m, k) {
        var T = this.__data__, N = Dn(T, m);
        return N < 0 ? T.push([m, k]) : T[N][1] = k, this;
      }, ie.prototype.clear = function() {
        this.__data__ = { hash: new ve(), map: new (qe || Zt)(), string: new ve() };
      }, ie.prototype.delete = function(m) {
        return Le(this, m).delete(m);
      }, ie.prototype.get = function(m) {
        return Le(this, m).get(m);
      }, ie.prototype.has = function(m) {
        return Le(this, m).has(m);
      }, ie.prototype.set = function(m, k) {
        return Le(this, m).set(m, k), this;
      }, Pe.prototype.clear = function() {
        this.__data__ = new Zt();
      }, Pe.prototype.delete = function(m) {
        return this.__data__.delete(m);
      }, Pe.prototype.get = function(m) {
        return this.__data__.get(m);
      }, Pe.prototype.has = function(m) {
        return this.__data__.has(m);
      }, Pe.prototype.set = function(m, k) {
        var T = this.__data__;
        if (T instanceof Zt) {
          var N = T.__data__;
          if (!qe || N.length < 199)
            return N.push([m, k]), this;
          T = this.__data__ = new ie(N);
        }
        return T.set(m, k), this;
      };
      var zn = ar ? Jt(ar, Object) : function() {
        return [];
      }, ke = function(m) {
        return Ht.call(m);
      };
      function fr(m, k) {
        return !!(k = k ?? a) && (typeof m == "number" || pt.test(m)) && m > -1 && m % 1 == 0 && m < k;
      }
      function He(m) {
        var k = m && m.constructor;
        return m === (typeof k == "function" && k.prototype || zt);
      }
      function Ce(m) {
        if (m != null) {
          try {
            return kt.call(m);
          } catch {
          }
          try {
            return m + "";
          } catch {
          }
        }
        return "";
      }
      function dr(m, k) {
        return m === k || m != m && k != k;
      }
      (Bn && ke(new Bn(new ArrayBuffer(1))) != U || qe && ke(new qe()) != D || an && ke(an.resolve()) != f || ge && ke(new ge()) != b || re && ke(new re()) != M) && (ke = function(m) {
        var k = Ht.call(m), T = k == _ ? m.constructor : void 0, N = T ? Ce(T) : void 0;
        if (N)
          switch (N) {
            case En:
              return U;
            case be:
              return D;
            case An:
              return f;
            case un:
              return b;
            case ur:
              return M;
          }
        return k;
      });
      var v = Array.isArray;
      function C(m) {
        return m != null && function(k) {
          return typeof k == "number" && k > -1 && k % 1 == 0 && k <= a;
        }(m.length) && !z(m);
      }
      var I = $r || function() {
        return !1;
      };
      function z(m) {
        var k = nt(m) ? Ht.call(m) : "";
        return k == y || k == E;
      }
      function nt(m) {
        var k = typeof m;
        return !!m && (k == "object" || k == "function");
      }
      function Y(m) {
        return C(m) ? function(k, T) {
          var N = v(k) || function(K) {
            return function(Et) {
              return function(mt) {
                return !!mt && typeof mt == "object";
              }(Et) && C(Et);
            }(K) && dt.call(K, "callee") && (!ln.call(K, "callee") || Ht.call(K) == h);
          }(k) ? function(K, Et) {
            for (var mt = -1, Ee = Array(K); ++mt < K; )
              Ee[mt] = Et(mt);
            return Ee;
          }(k.length, String) : [], J = N.length, st = !!J;
          for (var ht in k)
            !T && !dt.call(k, ht) || st && (ht == "length" || fr(ht, J)) || N.push(ht);
          return N;
        }(m) : function(k) {
          if (!He(k))
            return Gr(k);
          var T = [];
          for (var N in Object(k))
            dt.call(k, N) && N != "constructor" && T.push(N);
          return T;
        }(m);
      }
      o.exports = function(m) {
        return ye(m, !0, !0);
      };
    }, 307: (o, c, l) => {
      o = l.nmd(o);
      var u = "__lodash_hash_undefined__", a = 9007199254740991, h = "[object Arguments]", d = "[object Array]", g = "[object Boolean]", y = "[object Date]", E = "[object Error]", D = "[object Function]", S = "[object Map]", _ = "[object Number]", f = "[object Object]", p = "[object Promise]", b = "[object RegExp]", w = "[object Set]", A = "[object String]", M = "[object WeakMap]", j = "[object ArrayBuffer]", U = "[object DataView]", q = /^\[object .+?Constructor\]$/, $ = /^(?:0|[1-9]\d*)$/, R = {};
      R["[object Float32Array]"] = R["[object Float64Array]"] = R["[object Int8Array]"] = R["[object Int16Array]"] = R["[object Int32Array]"] = R["[object Uint8Array]"] = R["[object Uint8ClampedArray]"] = R["[object Uint16Array]"] = R["[object Uint32Array]"] = !0, R[h] = R[d] = R[j] = R[g] = R[U] = R[y] = R[E] = R[D] = R[S] = R[_] = R[f] = R[b] = R[w] = R[A] = R[M] = !1;
      var L = typeof l.g == "object" && l.g && l.g.Object === Object && l.g, O = typeof self == "object" && self && self.Object === Object && self, x = L || O || Function("return this")(), F = c && !c.nodeType && c, V = F && o && !o.nodeType && o, rt = V && V.exports === F, ft = rt && L.process, bt = function() {
        try {
          return ft && ft.binding && ft.binding("util");
        } catch {
        }
      }(), pt = bt && bt.isTypedArray;
      function P(v, C) {
        for (var I = -1, z = v == null ? 0 : v.length; ++I < z; )
          if (C(v[I], I, v))
            return !0;
        return !1;
      }
      function ne(v) {
        var C = -1, I = Array(v.size);
        return v.forEach(function(z, nt) {
          I[++C] = [nt, z];
        }), I;
      }
      function Ft(v) {
        var C = -1, I = Array(v.size);
        return v.forEach(function(z) {
          I[++C] = z;
        }), I;
      }
      var Z, at, tt, yt = Array.prototype, Lt = Function.prototype, ot = Object.prototype, xt = x["__core-js_shared__"], It = Lt.toString, ut = ot.hasOwnProperty, Jt = (Z = /[^.]+$/.exec(xt && xt.keys && xt.keys.IE_PROTO || "")) ? "Symbol(src)_1." + Z : "", Yt = ot.toString, le = RegExp("^" + It.call(ut).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Xt = rt ? x.Buffer : void 0, Vt = x.Symbol, zt = x.Uint8Array, ae = ot.propertyIsEnumerable, Mt = yt.splice, kt = Vt ? Vt.toStringTag : void 0, dt = Object.getOwnPropertySymbols, Ht = Xt ? Xt.isBuffer : void 0, vt = (at = Object.keys, tt = Object, function(v) {
        return at(tt(v));
      }), Ct = ie(x, "DataView"), _t = ie(x, "Map"), $t = ie(x, "Promise"), qt = ie(x, "Set"), Un = ie(x, "WeakMap"), ln = ie(Object, "create"), Hr = ye(Ct), ar = ye(_t), $r = ye($t), Gr = ye(qt), Bn = ye(Un), qe = Vt ? Vt.prototype : void 0, an = qe ? qe.valueOf : void 0;
      function ge(v) {
        var C = -1, I = v == null ? 0 : v.length;
        for (this.clear(); ++C < I; ) {
          var z = v[C];
          this.set(z[0], z[1]);
        }
      }
      function re(v) {
        var C = -1, I = v == null ? 0 : v.length;
        for (this.clear(); ++C < I; ) {
          var z = v[C];
          this.set(z[0], z[1]);
        }
      }
      function se(v) {
        var C = -1, I = v == null ? 0 : v.length;
        for (this.clear(); ++C < I; ) {
          var z = v[C];
          this.set(z[0], z[1]);
        }
      }
      function En(v) {
        var C = -1, I = v == null ? 0 : v.length;
        for (this.__data__ = new se(); ++C < I; )
          this.add(v[C]);
      }
      function be(v) {
        var C = this.__data__ = new re(v);
        this.size = C.size;
      }
      function An(v, C) {
        for (var I = v.length; I--; )
          if (On(v[I][0], C))
            return I;
        return -1;
      }
      function un(v) {
        return v == null ? v === void 0 ? "[object Undefined]" : "[object Null]" : kt && kt in Object(v) ? function(C) {
          var I = ut.call(C, kt), z = C[kt];
          try {
            C[kt] = void 0;
            var nt = !0;
          } catch {
          }
          var Y = Yt.call(C);
          return nt && (I ? C[kt] = z : delete C[kt]), Y;
        }(v) : function(C) {
          return Yt.call(C);
        }(v);
      }
      function ur(v) {
        return He(v) && un(v) == h;
      }
      function Fn(v, C, I, z, nt) {
        return v === C || (v == null || C == null || !He(v) && !He(C) ? v != v && C != C : function(Y, m, k, T, N, J) {
          var st = Le(Y), ht = Le(m), K = st ? d : pe(Y), Et = ht ? d : pe(m), mt = (K = K == h ? f : K) == f, Ee = (Et = Et == h ? f : Et) == f, xe = K == Et;
          if (xe && Se(Y)) {
            if (!Se(m))
              return !1;
            st = !0, mt = !1;
          }
          if (xe && !mt)
            return J || (J = new be()), st || Ce(Y) ? Vn(Y, m, k, T, N, J) : function(X, et, _e, Q, Rt, St, me) {
              switch (_e) {
                case U:
                  if (X.byteLength != et.byteLength || X.byteOffset != et.byteOffset)
                    return !1;
                  X = X.buffer, et = et.buffer;
                case j:
                  return !(X.byteLength != et.byteLength || !St(new zt(X), new zt(et)));
                case g:
                case y:
                case _:
                  return On(+X, +et);
                case E:
                  return X.name == et.name && X.message == et.message;
                case b:
                case A:
                  return X == et + "";
                case S:
                  var Ge = ne;
                case w:
                  var qn = 1 & Q;
                  if (Ge || (Ge = Ft), X.size != et.size && !qn)
                    return !1;
                  var hn = me.get(X);
                  if (hn)
                    return hn == et;
                  Q |= 2, me.set(X, et);
                  var Ie = Vn(Ge(X), Ge(et), Q, Rt, St, me);
                  return me.delete(X), Ie;
                case "[object Symbol]":
                  if (an)
                    return an.call(X) == an.call(et);
              }
              return !1;
            }(Y, m, K, k, T, N, J);
          if (!(1 & k)) {
            var $e = mt && ut.call(Y, "__wrapped__"), H = Ee && ut.call(m, "__wrapped__");
            if ($e || H) {
              var it = $e ? Y.value() : Y, At = H ? m.value() : m;
              return J || (J = new be()), N(it, At, k, T, J);
            }
          }
          return !!xe && (J || (J = new be()), function(X, et, _e, Q, Rt, St) {
            var me = 1 & _e, Ge = ve(X), qn = Ge.length;
            if (qn != ve(et).length && !me)
              return !1;
            for (var hn = qn; hn--; ) {
              var Ie = Ge[hn];
              if (!(me ? Ie in et : ut.call(et, Ie)))
                return !1;
            }
            var Js = St.get(X);
            if (Js && St.get(et))
              return Js == et;
            var gr = !0;
            St.set(X, et), St.set(et, X);
            for (var Wr = me; ++hn < qn; ) {
              var pr = X[Ie = Ge[hn]], yr = et[Ie];
              if (Q)
                var Ys = me ? Q(yr, pr, Ie, et, X, St) : Q(pr, yr, Ie, X, et, St);
              if (!(Ys === void 0 ? pr === yr || Rt(pr, yr, _e, Q, St) : Ys)) {
                gr = !1;
                break;
              }
              Wr || (Wr = Ie == "constructor");
            }
            if (gr && !Wr) {
              var _r = X.constructor, mr = et.constructor;
              _r == mr || !("constructor" in X) || !("constructor" in et) || typeof _r == "function" && _r instanceof _r && typeof mr == "function" && mr instanceof mr || (gr = !1);
            }
            return St.delete(X), St.delete(et), gr;
          }(Y, m, k, T, N, J));
        }(v, C, I, z, Fn, nt));
      }
      function Vn(v, C, I, z, nt, Y) {
        var m = 1 & I, k = v.length, T = C.length;
        if (k != T && !(m && T > k))
          return !1;
        var N = Y.get(v);
        if (N && Y.get(C))
          return N == C;
        var J = -1, st = !0, ht = 2 & I ? new En() : void 0;
        for (Y.set(v, C), Y.set(C, v); ++J < k; ) {
          var K = v[J], Et = C[J];
          if (z)
            var mt = m ? z(Et, K, J, C, v, Y) : z(K, Et, J, v, C, Y);
          if (mt !== void 0) {
            if (mt)
              continue;
            st = !1;
            break;
          }
          if (ht) {
            if (!P(C, function(Ee, xe) {
              if ($e = xe, !ht.has($e) && (K === Ee || nt(K, Ee, I, z, Y)))
                return ht.push(xe);
              var $e;
            })) {
              st = !1;
              break;
            }
          } else if (K !== Et && !nt(K, Et, I, z, Y)) {
            st = !1;
            break;
          }
        }
        return Y.delete(v), Y.delete(C), st;
      }
      function ve(v) {
        return function(C, I, z) {
          var nt = I(C);
          return Le(C) ? nt : function(Y, m) {
            for (var k = -1, T = m.length, N = Y.length; ++k < T; )
              Y[N + k] = m[k];
            return Y;
          }(nt, z(C));
        }(v, dr, Pe);
      }
      function Zt(v, C) {
        var I, z, nt = v.__data__;
        return ((z = typeof (I = C)) == "string" || z == "number" || z == "symbol" || z == "boolean" ? I !== "__proto__" : I === null) ? nt[typeof C == "string" ? "string" : "hash"] : nt.map;
      }
      function ie(v, C) {
        var I = function(z, nt) {
          return z == null ? void 0 : z[nt];
        }(v, C);
        return function(z) {
          return !(!fr(z) || function(nt) {
            return !!Jt && Jt in nt;
          }(z)) && (zn(z) ? le : q).test(ye(z));
        }(I) ? I : void 0;
      }
      ge.prototype.clear = function() {
        this.__data__ = ln ? ln(null) : {}, this.size = 0;
      }, ge.prototype.delete = function(v) {
        var C = this.has(v) && delete this.__data__[v];
        return this.size -= C ? 1 : 0, C;
      }, ge.prototype.get = function(v) {
        var C = this.__data__;
        if (ln) {
          var I = C[v];
          return I === u ? void 0 : I;
        }
        return ut.call(C, v) ? C[v] : void 0;
      }, ge.prototype.has = function(v) {
        var C = this.__data__;
        return ln ? C[v] !== void 0 : ut.call(C, v);
      }, ge.prototype.set = function(v, C) {
        var I = this.__data__;
        return this.size += this.has(v) ? 0 : 1, I[v] = ln && C === void 0 ? u : C, this;
      }, re.prototype.clear = function() {
        this.__data__ = [], this.size = 0;
      }, re.prototype.delete = function(v) {
        var C = this.__data__, I = An(C, v);
        return !(I < 0 || (I == C.length - 1 ? C.pop() : Mt.call(C, I, 1), --this.size, 0));
      }, re.prototype.get = function(v) {
        var C = this.__data__, I = An(C, v);
        return I < 0 ? void 0 : C[I][1];
      }, re.prototype.has = function(v) {
        return An(this.__data__, v) > -1;
      }, re.prototype.set = function(v, C) {
        var I = this.__data__, z = An(I, v);
        return z < 0 ? (++this.size, I.push([v, C])) : I[z][1] = C, this;
      }, se.prototype.clear = function() {
        this.size = 0, this.__data__ = { hash: new ge(), map: new (_t || re)(), string: new ge() };
      }, se.prototype.delete = function(v) {
        var C = Zt(this, v).delete(v);
        return this.size -= C ? 1 : 0, C;
      }, se.prototype.get = function(v) {
        return Zt(this, v).get(v);
      }, se.prototype.has = function(v) {
        return Zt(this, v).has(v);
      }, se.prototype.set = function(v, C) {
        var I = Zt(this, v), z = I.size;
        return I.set(v, C), this.size += I.size == z ? 0 : 1, this;
      }, En.prototype.add = En.prototype.push = function(v) {
        return this.__data__.set(v, u), this;
      }, En.prototype.has = function(v) {
        return this.__data__.has(v);
      }, be.prototype.clear = function() {
        this.__data__ = new re(), this.size = 0;
      }, be.prototype.delete = function(v) {
        var C = this.__data__, I = C.delete(v);
        return this.size = C.size, I;
      }, be.prototype.get = function(v) {
        return this.__data__.get(v);
      }, be.prototype.has = function(v) {
        return this.__data__.has(v);
      }, be.prototype.set = function(v, C) {
        var I = this.__data__;
        if (I instanceof re) {
          var z = I.__data__;
          if (!_t || z.length < 199)
            return z.push([v, C]), this.size = ++I.size, this;
          I = this.__data__ = new se(z);
        }
        return I.set(v, C), this.size = I.size, this;
      };
      var Pe = dt ? function(v) {
        return v == null ? [] : (v = Object(v), function(C, I) {
          for (var z = -1, nt = C == null ? 0 : C.length, Y = 0, m = []; ++z < nt; ) {
            var k = C[z];
            T = k, ae.call(v, T) && (m[Y++] = k);
          }
          var T;
          return m;
        }(dt(v)));
      } : function() {
        return [];
      }, pe = un;
      function Dn(v, C) {
        return !!(C = C ?? a) && (typeof v == "number" || $.test(v)) && v > -1 && v % 1 == 0 && v < C;
      }
      function ye(v) {
        if (v != null) {
          try {
            return It.call(v);
          } catch {
          }
          try {
            return v + "";
          } catch {
          }
        }
        return "";
      }
      function On(v, C) {
        return v === C || v != v && C != C;
      }
      (Ct && pe(new Ct(new ArrayBuffer(1))) != U || _t && pe(new _t()) != S || $t && pe($t.resolve()) != p || qt && pe(new qt()) != w || Un && pe(new Un()) != M) && (pe = function(v) {
        var C = un(v), I = C == f ? v.constructor : void 0, z = I ? ye(I) : "";
        if (z)
          switch (z) {
            case Hr:
              return U;
            case ar:
              return S;
            case $r:
              return p;
            case Gr:
              return w;
            case Bn:
              return M;
          }
        return C;
      });
      var hr = ur(function() {
        return arguments;
      }()) ? ur : function(v) {
        return He(v) && ut.call(v, "callee") && !ae.call(v, "callee");
      }, Le = Array.isArray, Se = Ht || function() {
        return !1;
      };
      function zn(v) {
        if (!fr(v))
          return !1;
        var C = un(v);
        return C == D || C == "[object GeneratorFunction]" || C == "[object AsyncFunction]" || C == "[object Proxy]";
      }
      function ke(v) {
        return typeof v == "number" && v > -1 && v % 1 == 0 && v <= a;
      }
      function fr(v) {
        var C = typeof v;
        return v != null && (C == "object" || C == "function");
      }
      function He(v) {
        return v != null && typeof v == "object";
      }
      var Ce = pt ? function(v) {
        return function(C) {
          return v(C);
        };
      }(pt) : function(v) {
        return He(v) && ke(v.length) && !!R[un(v)];
      };
      function dr(v) {
        return (C = v) != null && ke(C.length) && !zn(C) ? function(I, z) {
          var nt = Le(I), Y = !nt && hr(I), m = !nt && !Y && Se(I), k = !nt && !Y && !m && Ce(I), T = nt || Y || m || k, N = T ? function(ht, K) {
            for (var Et = -1, mt = Array(ht); ++Et < ht; )
              mt[Et] = K(Et);
            return mt;
          }(I.length, String) : [], J = N.length;
          for (var st in I)
            !z && !ut.call(I, st) || T && (st == "length" || m && (st == "offset" || st == "parent") || k && (st == "buffer" || st == "byteLength" || st == "byteOffset") || Dn(st, J)) || N.push(st);
          return N;
        }(v) : function(I) {
          if (nt = (z = I) && z.constructor, z !== (typeof nt == "function" && nt.prototype || ot))
            return vt(I);
          var z, nt, Y = [];
          for (var m in Object(I))
            ut.call(I, m) && m != "constructor" && Y.push(m);
          return Y;
        }(v);
        var C;
      }
      o.exports = function(v, C) {
        return Fn(v, C);
      };
    }, 210: function(o, c, l) {
      var u = this && this.__importDefault || function(g) {
        return g && g.__esModule ? g : { default: g };
      };
      Object.defineProperty(c, "__esModule", { value: !0 });
      var a, h = u(l(465)), d = u(l(307));
      (function(g) {
        g.compose = function(y, E, D) {
          y === void 0 && (y = {}), E === void 0 && (E = {}), typeof y != "object" && (y = {}), typeof E != "object" && (E = {});
          var S = h.default(E);
          for (var _ in D || (S = Object.keys(S).reduce(function(f, p) {
            return S[p] != null && (f[p] = S[p]), f;
          }, {})), y)
            y[_] !== void 0 && E[_] === void 0 && (S[_] = y[_]);
          return Object.keys(S).length > 0 ? S : void 0;
        }, g.diff = function(y, E) {
          y === void 0 && (y = {}), E === void 0 && (E = {}), typeof y != "object" && (y = {}), typeof E != "object" && (E = {});
          var D = Object.keys(y).concat(Object.keys(E)).reduce(function(S, _) {
            return d.default(y[_], E[_]) || (S[_] = E[_] === void 0 ? null : E[_]), S;
          }, {});
          return Object.keys(D).length > 0 ? D : void 0;
        }, g.invert = function(y, E) {
          y === void 0 && (y = {}), E === void 0 && (E = {}), y = y || {};
          var D = Object.keys(E).reduce(function(S, _) {
            return E[_] !== y[_] && y[_] !== void 0 && (S[_] = E[_]), S;
          }, {});
          return Object.keys(y).reduce(function(S, _) {
            return y[_] !== E[_] && E[_] === void 0 && (S[_] = null), S;
          }, D);
        }, g.transform = function(y, E, D) {
          if (D === void 0 && (D = !1), typeof y != "object")
            return E;
          if (typeof E == "object") {
            if (!D)
              return E;
            var S = Object.keys(E).reduce(function(_, f) {
              return y[f] === void 0 && (_[f] = E[f]), _;
            }, {});
            return Object.keys(S).length > 0 ? S : void 0;
          }
        };
      })(a || (a = {})), c.default = a;
    }, 895: function(o, c, l) {
      var u = this && this.__importDefault || function(S) {
        return S && S.__esModule ? S : { default: S };
      }, a = u(l(529)), h = u(l(465)), d = u(l(307)), g = u(l(210)), y = u(l(430)), E = String.fromCharCode(0), D = function() {
        function S(_) {
          Array.isArray(_) ? this.ops = _ : _ != null && Array.isArray(_.ops) ? this.ops = _.ops : this.ops = [];
        }
        return S.prototype.insert = function(_, f) {
          var p = {};
          return typeof _ == "string" && _.length === 0 ? this : (p.insert = _, f != null && typeof f == "object" && Object.keys(f).length > 0 && (p.attributes = f), this.push(p));
        }, S.prototype.delete = function(_) {
          return _ <= 0 ? this : this.push({ delete: _ });
        }, S.prototype.retain = function(_, f) {
          if (_ <= 0)
            return this;
          var p = { retain: _ };
          return f != null && typeof f == "object" && Object.keys(f).length > 0 && (p.attributes = f), this.push(p);
        }, S.prototype.push = function(_) {
          var f = this.ops.length, p = this.ops[f - 1];
          if (_ = h.default(_), typeof p == "object") {
            if (typeof _.delete == "number" && typeof p.delete == "number")
              return this.ops[f - 1] = { delete: p.delete + _.delete }, this;
            if (typeof p.delete == "number" && _.insert != null && (f -= 1, typeof (p = this.ops[f - 1]) != "object"))
              return this.ops.unshift(_), this;
            if (d.default(_.attributes, p.attributes)) {
              if (typeof _.insert == "string" && typeof p.insert == "string")
                return this.ops[f - 1] = { insert: p.insert + _.insert }, typeof _.attributes == "object" && (this.ops[f - 1].attributes = _.attributes), this;
              if (typeof _.retain == "number" && typeof p.retain == "number")
                return this.ops[f - 1] = { retain: p.retain + _.retain }, typeof _.attributes == "object" && (this.ops[f - 1].attributes = _.attributes), this;
            }
          }
          return f === this.ops.length ? this.ops.push(_) : this.ops.splice(f, 0, _), this;
        }, S.prototype.chop = function() {
          var _ = this.ops[this.ops.length - 1];
          return _ && _.retain && !_.attributes && this.ops.pop(), this;
        }, S.prototype.filter = function(_) {
          return this.ops.filter(_);
        }, S.prototype.forEach = function(_) {
          this.ops.forEach(_);
        }, S.prototype.map = function(_) {
          return this.ops.map(_);
        }, S.prototype.partition = function(_) {
          var f = [], p = [];
          return this.forEach(function(b) {
            (_(b) ? f : p).push(b);
          }), [f, p];
        }, S.prototype.reduce = function(_, f) {
          return this.ops.reduce(_, f);
        }, S.prototype.changeLength = function() {
          return this.reduce(function(_, f) {
            return f.insert ? _ + y.default.length(f) : f.delete ? _ - f.delete : _;
          }, 0);
        }, S.prototype.length = function() {
          return this.reduce(function(_, f) {
            return _ + y.default.length(f);
          }, 0);
        }, S.prototype.slice = function(_, f) {
          _ === void 0 && (_ = 0), f === void 0 && (f = 1 / 0);
          for (var p = [], b = y.default.iterator(this.ops), w = 0; w < f && b.hasNext(); ) {
            var A = void 0;
            w < _ ? A = b.next(_ - w) : (A = b.next(f - w), p.push(A)), w += y.default.length(A);
          }
          return new S(p);
        }, S.prototype.compose = function(_) {
          var f = y.default.iterator(this.ops), p = y.default.iterator(_.ops), b = [], w = p.peek();
          if (w != null && typeof w.retain == "number" && w.attributes == null) {
            for (var A = w.retain; f.peekType() === "insert" && f.peekLength() <= A; )
              A -= f.peekLength(), b.push(f.next());
            w.retain - A > 0 && p.next(w.retain - A);
          }
          for (var M = new S(b); f.hasNext() || p.hasNext(); )
            if (p.peekType() === "insert")
              M.push(p.next());
            else if (f.peekType() === "delete")
              M.push(f.next());
            else {
              var j = Math.min(f.peekLength(), p.peekLength()), U = f.next(j), q = p.next(j);
              if (typeof q.retain == "number") {
                var $ = {};
                typeof U.retain == "number" ? $.retain = j : $.insert = U.insert;
                var R = g.default.compose(U.attributes, q.attributes, typeof U.retain == "number");
                if (R && ($.attributes = R), M.push($), !p.hasNext() && d.default(M.ops[M.ops.length - 1], $)) {
                  var L = new S(f.rest());
                  return M.concat(L).chop();
                }
              } else
                typeof q.delete == "number" && typeof U.retain == "number" && M.push(q);
            }
          return M.chop();
        }, S.prototype.concat = function(_) {
          var f = new S(this.ops.slice());
          return _.ops.length > 0 && (f.push(_.ops[0]), f.ops = f.ops.concat(_.ops.slice(1))), f;
        }, S.prototype.diff = function(_, f) {
          if (this.ops === _.ops)
            return new S();
          var p = [this, _].map(function(j) {
            return j.map(function(U) {
              if (U.insert != null)
                return typeof U.insert == "string" ? U.insert : E;
              throw new Error("diff() called " + (j === _ ? "on" : "with") + " non-document");
            }).join("");
          }), b = new S(), w = a.default(p[0], p[1], f), A = y.default.iterator(this.ops), M = y.default.iterator(_.ops);
          return w.forEach(function(j) {
            for (var U = j[1].length; U > 0; ) {
              var q = 0;
              switch (j[0]) {
                case a.default.INSERT:
                  q = Math.min(M.peekLength(), U), b.push(M.next(q));
                  break;
                case a.default.DELETE:
                  q = Math.min(U, A.peekLength()), A.next(q), b.delete(q);
                  break;
                case a.default.EQUAL:
                  q = Math.min(A.peekLength(), M.peekLength(), U);
                  var $ = A.next(q), R = M.next(q);
                  d.default($.insert, R.insert) ? b.retain(q, g.default.diff($.attributes, R.attributes)) : b.push(R).delete(q);
              }
              U -= q;
            }
          }), b.chop();
        }, S.prototype.eachLine = function(_, f) {
          f === void 0 && (f = `
`);
          for (var p = y.default.iterator(this.ops), b = new S(), w = 0; p.hasNext(); ) {
            if (p.peekType() !== "insert")
              return;
            var A = p.peek(), M = y.default.length(A) - p.peekLength(), j = typeof A.insert == "string" ? A.insert.indexOf(f, M) - M : -1;
            if (j < 0)
              b.push(p.next());
            else if (j > 0)
              b.push(p.next(j));
            else {
              if (_(b, p.next(1).attributes || {}, w) === !1)
                return;
              w += 1, b = new S();
            }
          }
          b.length() > 0 && _(b, {}, w);
        }, S.prototype.invert = function(_) {
          var f = new S();
          return this.reduce(function(p, b) {
            if (b.insert)
              f.delete(y.default.length(b));
            else {
              if (b.retain && b.attributes == null)
                return f.retain(b.retain), p + b.retain;
              if (b.delete || b.retain && b.attributes) {
                var w = b.delete || b.retain;
                return _.slice(p, p + w).forEach(function(A) {
                  b.delete ? f.push(A) : b.retain && b.attributes && f.retain(y.default.length(A), g.default.invert(b.attributes, A.attributes));
                }), p + w;
              }
            }
            return p;
          }, 0), f.chop();
        }, S.prototype.transform = function(_, f) {
          if (f === void 0 && (f = !1), f = !!f, typeof _ == "number")
            return this.transformPosition(_, f);
          for (var p = _, b = y.default.iterator(this.ops), w = y.default.iterator(p.ops), A = new S(); b.hasNext() || w.hasNext(); )
            if (b.peekType() !== "insert" || !f && w.peekType() === "insert")
              if (w.peekType() === "insert")
                A.push(w.next());
              else {
                var M = Math.min(b.peekLength(), w.peekLength()), j = b.next(M), U = w.next(M);
                if (j.delete)
                  continue;
                U.delete ? A.push(U) : A.retain(M, g.default.transform(j.attributes, U.attributes, f));
              }
            else
              A.retain(y.default.length(b.next()));
          return A.chop();
        }, S.prototype.transformPosition = function(_, f) {
          f === void 0 && (f = !1), f = !!f;
          for (var p = y.default.iterator(this.ops), b = 0; p.hasNext() && b <= _; ) {
            var w = p.peekLength(), A = p.peekType();
            p.next(), A !== "delete" ? (A === "insert" && (b < _ || !f) && (_ += w), b += w) : _ -= Math.min(w, _ - b);
          }
          return _;
        }, S.Op = y.default, S.AttributeMap = g.default, S;
      }();
      o.exports = D;
    }, 977: function(o, c, l) {
      var u = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(c, "__esModule", { value: !0 });
      var a = u(l(430)), h = function() {
        function d(g) {
          this.ops = g, this.index = 0, this.offset = 0;
        }
        return d.prototype.hasNext = function() {
          return this.peekLength() < 1 / 0;
        }, d.prototype.next = function(g) {
          g || (g = 1 / 0);
          var y = this.ops[this.index];
          if (y) {
            var E = this.offset, D = a.default.length(y);
            if (g >= D - E ? (g = D - E, this.index += 1, this.offset = 0) : this.offset += g, typeof y.delete == "number")
              return { delete: g };
            var S = {};
            return y.attributes && (S.attributes = y.attributes), typeof y.retain == "number" ? S.retain = g : typeof y.insert == "string" ? S.insert = y.insert.substr(E, g) : S.insert = y.insert, S;
          }
          return { retain: 1 / 0 };
        }, d.prototype.peek = function() {
          return this.ops[this.index];
        }, d.prototype.peekLength = function() {
          return this.ops[this.index] ? a.default.length(this.ops[this.index]) - this.offset : 1 / 0;
        }, d.prototype.peekType = function() {
          return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
        }, d.prototype.rest = function() {
          if (this.hasNext()) {
            if (this.offset === 0)
              return this.ops.slice(this.index);
            var g = this.offset, y = this.index, E = this.next(), D = this.ops.slice(this.index);
            return this.offset = g, this.index = y, [E].concat(D);
          }
          return [];
        }, d;
      }();
      c.default = h;
    }, 430: function(o, c, l) {
      var u = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(c, "__esModule", { value: !0 });
      var a, h = u(l(977));
      (function(d) {
        d.iterator = function(g) {
          return new h.default(g);
        }, d.length = function(g) {
          return typeof g.delete == "number" ? g.delete : typeof g.retain == "number" ? g.retain : typeof g.insert == "string" ? g.insert.length : 1;
        };
      })(a || (a = {})), c.default = a;
    }, 165: function(o, c, l) {
      var u, a;
      (a = typeof (u = function() {
        var h, d = {};
        function g(D, S, _) {
          var f = D.getClientRects();
          if (f.length === 2) {
            var p = D.getBoundingClientRect();
            return f[S][_] < p[_];
          }
          return !1;
        }
        function y(D) {
          if (!D || screen.deviceXDPI === screen.logicalXDPI)
            return D;
          if ("length" in D)
            return Array.prototype.map.call(D, y);
          var S = screen.deviceXDPI / screen.logicalXDPI;
          return { top: D.top / S, bottom: D.bottom / S, left: D.left / S, right: D.right / S, width: D.width / S, height: D.height / S };
        }
        function E(D, S) {
          var _, f = 0, p = 1024;
          if (p >= S.length)
            return Array.prototype.push.apply(D, S);
          for (; f < S.length; )
            _ = Array.prototype.push.apply(D, Array.prototype.slice.call(S, f, f + p)), f += p;
          return _;
        }
        return d.isBroken = function() {
          if (h === void 0) {
            var D = document.createElement("p"), S = document.createElement("span"), _ = document.createTextNode("aa"), f = document.createTextNode("aa"), p = document.createElement("img");
            p.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
            var b = document.createRange();
            if (h = {}, D.appendChild(_), D.appendChild(S), S.appendChild(p), S.appendChild(f), document.body.appendChild(D), b.setStart(_, 1), b.setEnd(S, 0), h.getClientRects = h.getBoundingClientRect = b.getClientRects().length > 1, h.getClientRects || (b.setEnd(f, 1), h.getClientRects = h.getBoundingClientRect = b.getClientRects().length === 2), !h.getBoundingClientRect) {
              b.setEnd(b.startContainer, b.startOffset);
              var w = b.getBoundingClientRect();
              h.getBoundingClientRect = w.top === 0 && w.left === 0;
            }
            if (document.body.removeChild(D), !h.getBoundingClientRect) {
              var A = document.createElement("p");
              A.style.width = "0px", A.style.fontSize = "20px", A.style.whiteSpace = "normal", A.style.wordBreak = "normal";
              var M = document.createTextNode("m mm");
              A.appendChild(M), document.body.appendChild(A), b.setStart(M, 1), b.setEnd(M, 2), g(b, 1, "left") ? h.getBoundingClientRect = !0 : (b.setStart(M, 1), b.setEnd(M, 3), g(b, 0, "top") && (h.getBoundingClientRect = !0)), document.body.removeChild(A);
            }
            var j = window.ActiveXObject && new Function("/*@cc_on return @_jscript_version; @*/")();
            h.ieZoom = !!j && j <= 10;
          }
          return h;
        }, d.getClientRects = function(D) {
          var S = this.isBroken();
          if (S.ieZoom)
            return y(D.getClientRects());
          if (!S.getClientRects)
            return D.getClientRects();
          var _ = [], f = [], p = D.endContainer, b = D.endOffset, w = document.createRange();
          function A(M) {
            for (var j = 0; M = M.previousSibling; )
              j++;
            return j;
          }
          for (; p !== D.commonAncestorContainer; )
            w.setStart(p, 0), w.setEnd(p, b), E(f, w.getClientRects()), b = A(p), p = p.parentNode;
          return (w = D.cloneRange()).setEnd(p, b), E(_, w.getClientRects()), E(_, f), _;
        }, d.getBoundingClientRect = function(D) {
          var S = this.getClientRects(D);
          if (S.length === 0)
            return null;
          var _, f = D.getBoundingClientRect(), p = this.isBroken();
          if (p.ieZoom)
            return y(f);
          if (!p.getBoundingClientRect)
            return f;
          if (f.width === 0 && f.height === 0)
            return S[0];
          for (var b = 0, w = S.length; b < w; b++) {
            var A = S[b];
            _ ? (_.left = Math.min(_.left, A.left), _.top = Math.min(_.top, A.top), _.right = Math.max(_.right, A.right), _.bottom = Math.max(_.bottom, A.bottom)) : _ = { left: A.left, top: A.top, right: A.right, bottom: A.bottom };
          }
          return _ && (_.width = _.right - _.left, _.height = _.bottom - _.top), _;
        }, d;
      }) == "function" ? u.call(c, l, c, o) : u) === void 0 || (o.exports = a);
    }, 33: (o, c, l) => {
      l.r(c), l.d(c, { default: () => R });
      var u = function() {
        if (typeof Map < "u")
          return Map;
        function L(O, x) {
          var F = -1;
          return O.some(function(V, rt) {
            return V[0] === x && (F = rt, !0);
          }), F;
        }
        return function() {
          function O() {
            this.__entries__ = [];
          }
          return Object.defineProperty(O.prototype, "size", { get: function() {
            return this.__entries__.length;
          }, enumerable: !0, configurable: !0 }), O.prototype.get = function(x) {
            var F = L(this.__entries__, x), V = this.__entries__[F];
            return V && V[1];
          }, O.prototype.set = function(x, F) {
            var V = L(this.__entries__, x);
            ~V ? this.__entries__[V][1] = F : this.__entries__.push([x, F]);
          }, O.prototype.delete = function(x) {
            var F = this.__entries__, V = L(F, x);
            ~V && F.splice(V, 1);
          }, O.prototype.has = function(x) {
            return !!~L(this.__entries__, x);
          }, O.prototype.clear = function() {
            this.__entries__.splice(0);
          }, O.prototype.forEach = function(x, F) {
            F === void 0 && (F = null);
            for (var V = 0, rt = this.__entries__; V < rt.length; V++) {
              var ft = rt[V];
              x.call(F, ft[1], ft[0]);
            }
          }, O;
        }();
      }(), a = typeof window < "u" && typeof document < "u" && window.document === document, h = l.g !== void 0 && l.g.Math === Math ? l.g : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")(), d = typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(h) : function(L) {
        return setTimeout(function() {
          return L(Date.now());
        }, 1e3 / 60);
      }, g = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], y = typeof MutationObserver < "u", E = function() {
        function L() {
          this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function(O, x) {
            var F = !1, V = !1, rt = 0;
            function ft() {
              F && (F = !1, O()), V && pt();
            }
            function bt() {
              d(ft);
            }
            function pt() {
              var P = Date.now();
              if (F) {
                if (P - rt < 2)
                  return;
                V = !0;
              } else
                F = !0, V = !1, setTimeout(bt, 20);
              rt = P;
            }
            return pt;
          }(this.refresh.bind(this));
        }
        return L.prototype.addObserver = function(O) {
          ~this.observers_.indexOf(O) || this.observers_.push(O), this.connected_ || this.connect_();
        }, L.prototype.removeObserver = function(O) {
          var x = this.observers_, F = x.indexOf(O);
          ~F && x.splice(F, 1), !x.length && this.connected_ && this.disconnect_();
        }, L.prototype.refresh = function() {
          this.updateObservers_() && this.refresh();
        }, L.prototype.updateObservers_ = function() {
          var O = this.observers_.filter(function(x) {
            return x.gatherActive(), x.hasActive();
          });
          return O.forEach(function(x) {
            return x.broadcastActive();
          }), O.length > 0;
        }, L.prototype.connect_ = function() {
          a && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), y ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: !0, childList: !0, characterData: !0, subtree: !0 })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
        }, L.prototype.disconnect_ = function() {
          a && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
        }, L.prototype.onTransitionEnd_ = function(O) {
          var x = O.propertyName, F = x === void 0 ? "" : x;
          g.some(function(V) {
            return !!~F.indexOf(V);
          }) && this.refresh();
        }, L.getInstance = function() {
          return this.instance_ || (this.instance_ = new L()), this.instance_;
        }, L.instance_ = null, L;
      }(), D = function(L, O) {
        for (var x = 0, F = Object.keys(O); x < F.length; x++) {
          var V = F[x];
          Object.defineProperty(L, V, { value: O[V], enumerable: !1, writable: !1, configurable: !0 });
        }
        return L;
      }, S = function(L) {
        return L && L.ownerDocument && L.ownerDocument.defaultView || h;
      }, _ = A(0, 0, 0, 0);
      function f(L) {
        return parseFloat(L) || 0;
      }
      function p(L) {
        for (var O = [], x = 1; x < arguments.length; x++)
          O[x - 1] = arguments[x];
        return O.reduce(function(F, V) {
          return F + f(L["border-" + V + "-width"]);
        }, 0);
      }
      var b = typeof SVGGraphicsElement < "u" ? function(L) {
        return L instanceof S(L).SVGGraphicsElement;
      } : function(L) {
        return L instanceof S(L).SVGElement && typeof L.getBBox == "function";
      };
      function w(L) {
        return a ? b(L) ? function(O) {
          var x = O.getBBox();
          return A(0, 0, x.width, x.height);
        }(L) : function(O) {
          var x = O.clientWidth, F = O.clientHeight;
          if (!x && !F)
            return _;
          var V = S(O).getComputedStyle(O), rt = function(Z) {
            for (var at = {}, tt = 0, yt = ["top", "right", "bottom", "left"]; tt < yt.length; tt++) {
              var Lt = yt[tt], ot = Z["padding-" + Lt];
              at[Lt] = f(ot);
            }
            return at;
          }(V), ft = rt.left + rt.right, bt = rt.top + rt.bottom, pt = f(V.width), P = f(V.height);
          if (V.boxSizing === "border-box" && (Math.round(pt + ft) !== x && (pt -= p(V, "left", "right") + ft), Math.round(P + bt) !== F && (P -= p(V, "top", "bottom") + bt)), !function(Z) {
            return Z === S(Z).document.documentElement;
          }(O)) {
            var ne = Math.round(pt + ft) - x, Ft = Math.round(P + bt) - F;
            Math.abs(ne) !== 1 && (pt -= ne), Math.abs(Ft) !== 1 && (P -= Ft);
          }
          return A(rt.left, rt.top, pt, P);
        }(L) : _;
      }
      function A(L, O, x, F) {
        return { x: L, y: O, width: x, height: F };
      }
      var M = function() {
        function L(O) {
          this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = A(0, 0, 0, 0), this.target = O;
        }
        return L.prototype.isActive = function() {
          var O = w(this.target);
          return this.contentRect_ = O, O.width !== this.broadcastWidth || O.height !== this.broadcastHeight;
        }, L.prototype.broadcastRect = function() {
          var O = this.contentRect_;
          return this.broadcastWidth = O.width, this.broadcastHeight = O.height, O;
        }, L;
      }(), j = function(L, O) {
        var x, F, V, rt, ft, bt, pt, P = (F = (x = O).x, V = x.y, rt = x.width, ft = x.height, bt = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, pt = Object.create(bt.prototype), D(pt, { x: F, y: V, width: rt, height: ft, top: V, right: F + rt, bottom: ft + V, left: F }), pt);
        D(this, { target: L, contentRect: P });
      }, U = function() {
        function L(O, x, F) {
          if (this.activeObservations_ = [], this.observations_ = new u(), typeof O != "function")
            throw new TypeError("The callback provided as parameter 1 is not a function.");
          this.callback_ = O, this.controller_ = x, this.callbackCtx_ = F;
        }
        return L.prototype.observe = function(O) {
          if (!arguments.length)
            throw new TypeError("1 argument required, but only 0 present.");
          if (typeof Element < "u" && Element instanceof Object) {
            if (!(O instanceof S(O).Element))
              throw new TypeError('parameter 1 is not of type "Element".');
            var x = this.observations_;
            x.has(O) || (x.set(O, new M(O)), this.controller_.addObserver(this), this.controller_.refresh());
          }
        }, L.prototype.unobserve = function(O) {
          if (!arguments.length)
            throw new TypeError("1 argument required, but only 0 present.");
          if (typeof Element < "u" && Element instanceof Object) {
            if (!(O instanceof S(O).Element))
              throw new TypeError('parameter 1 is not of type "Element".');
            var x = this.observations_;
            x.has(O) && (x.delete(O), x.size || this.controller_.removeObserver(this));
          }
        }, L.prototype.disconnect = function() {
          this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
        }, L.prototype.gatherActive = function() {
          var O = this;
          this.clearActive(), this.observations_.forEach(function(x) {
            x.isActive() && O.activeObservations_.push(x);
          });
        }, L.prototype.broadcastActive = function() {
          if (this.hasActive()) {
            var O = this.callbackCtx_, x = this.activeObservations_.map(function(F) {
              return new j(F.target, F.broadcastRect());
            });
            this.callback_.call(O, x, O), this.clearActive();
          }
        }, L.prototype.clearActive = function() {
          this.activeObservations_.splice(0);
        }, L.prototype.hasActive = function() {
          return this.activeObservations_.length > 0;
        }, L;
      }(), q = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new u(), $ = function L(O) {
        if (!(this instanceof L))
          throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length)
          throw new TypeError("1 argument required, but only 0 present.");
        var x = E.getInstance(), F = new U(O, x, this);
        q.set(this, F);
      };
      ["observe", "unobserve", "disconnect"].forEach(function(L) {
        $.prototype[L] = function() {
          var O;
          return (O = q.get(this))[L].apply(O, arguments);
        };
      });
      const R = h.ResizeObserver !== void 0 ? h.ResizeObserver : $;
    }, 413: (o, c, l) => {
      l.r(c), l.d(c, { default: () => A });
      var u = l(379), a = l.n(u), h = l(795), d = l.n(h), g = l(569), y = l.n(g), E = l(565), D = l.n(E), S = l(216), _ = l.n(S), f = l(589), p = l.n(f), b = l(582), w = {};
      w.styleTagTransform = p(), w.setAttributes = D(), w.insert = y().bind(null, "head"), w.domAPI = d(), w.insertStyleElement = _(), a()(b.Z, w);
      const A = b.Z && b.Z.locals ? b.Z.locals : void 0;
    }, 379: (o) => {
      var c = [];
      function l(h) {
        for (var d = -1, g = 0; g < c.length; g++)
          if (c[g].identifier === h) {
            d = g;
            break;
          }
        return d;
      }
      function u(h, d) {
        for (var g = {}, y = [], E = 0; E < h.length; E++) {
          var D = h[E], S = d.base ? D[0] + d.base : D[0], _ = g[S] || 0, f = "".concat(S, " ").concat(_);
          g[S] = _ + 1;
          var p = l(f), b = { css: D[1], media: D[2], sourceMap: D[3], supports: D[4], layer: D[5] };
          if (p !== -1)
            c[p].references++, c[p].updater(b);
          else {
            var w = a(b, d);
            d.byIndex = E, c.splice(E, 0, { identifier: f, updater: w, references: 1 });
          }
          y.push(f);
        }
        return y;
      }
      function a(h, d) {
        var g = d.domAPI(d);
        return g.update(h), function(y) {
          if (y) {
            if (y.css === h.css && y.media === h.media && y.sourceMap === h.sourceMap && y.supports === h.supports && y.layer === h.layer)
              return;
            g.update(h = y);
          } else
            g.remove();
        };
      }
      o.exports = function(h, d) {
        var g = u(h = h || [], d = d || {});
        return function(y) {
          y = y || [];
          for (var E = 0; E < g.length; E++) {
            var D = l(g[E]);
            c[D].references--;
          }
          for (var S = u(y, d), _ = 0; _ < g.length; _++) {
            var f = l(g[_]);
            c[f].references === 0 && (c[f].updater(), c.splice(f, 1));
          }
          g = S;
        };
      };
    }, 569: (o) => {
      var c = {};
      o.exports = function(l, u) {
        var a = function(h) {
          if (c[h] === void 0) {
            var d = document.querySelector(h);
            if (window.HTMLIFrameElement && d instanceof window.HTMLIFrameElement)
              try {
                d = d.contentDocument.head;
              } catch {
                d = null;
              }
            c[h] = d;
          }
          return c[h];
        }(l);
        if (!a)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        a.appendChild(u);
      };
    }, 216: (o) => {
      o.exports = function(c) {
        var l = document.createElement("style");
        return c.setAttributes(l, c.attributes), c.insert(l, c.options), l;
      };
    }, 565: (o, c, l) => {
      o.exports = function(u) {
        var a = l.nc;
        a && u.setAttribute("nonce", a);
      };
    }, 795: (o) => {
      o.exports = function(c) {
        var l = c.insertStyleElement(c);
        return { update: function(u) {
          (function(a, h, d) {
            var g = "";
            d.supports && (g += "@supports (".concat(d.supports, ") {")), d.media && (g += "@media ".concat(d.media, " {"));
            var y = d.layer !== void 0;
            y && (g += "@layer".concat(d.layer.length > 0 ? " ".concat(d.layer) : "", " {")), g += d.css, y && (g += "}"), d.media && (g += "}"), d.supports && (g += "}");
            var E = d.sourceMap;
            E && typeof btoa < "u" && (g += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(E)))), " */")), h.styleTagTransform(g, a, h.options);
          })(l, c, u);
        }, remove: function() {
          (function(u) {
            if (u.parentNode === null)
              return !1;
            u.parentNode.removeChild(u);
          })(l);
        } };
      };
    }, 589: (o) => {
      o.exports = function(c, l) {
        if (l.styleSheet)
          l.styleSheet.cssText = c;
        else {
          for (; l.firstChild; )
            l.removeChild(l.firstChild);
          l.appendChild(document.createTextNode(c));
        }
      };
    }, 607: function(o, c, l) {
      var u = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(c, "__esModule", { value: !0 }), c.Cursor = c.default = void 0;
      var a = u(l(678));
      c.default = a.default;
      var h = u(l(353));
      c.Cursor = h.default, l(413);
    }, 353: (o, c) => {
      Object.defineProperty(c, "__esModule", { value: !0 });
      var l = function() {
        function u(a, h, d) {
          this.id = a, this.name = h, this.color = d, this.toggleNearCursor = this.toggleNearCursor.bind(this), this._toggleOpenedCursor = this._toggleOpenedCursor.bind(this), this._setHoverState = this._setHoverState.bind(this);
        }
        return u.prototype.build = function(a) {
          var h = document.createElement(u.CONTAINER_ELEMENT_TAG);
          h.classList.add(u.CURSOR_CLASS), h.id = "ql-cursor-".concat(this.id), h.innerHTML = a.template;
          var d = h.getElementsByClassName(u.SELECTION_CLASS)[0], g = h.getElementsByClassName(u.CARET_CONTAINER_CLASS)[0], y = g.getElementsByClassName(u.CARET_CLASS)[0], E = h.getElementsByClassName(u.FLAG_CLASS)[0];
          return E.style.backgroundColor = this.color, y.style.backgroundColor = this.color, h.getElementsByClassName(u.NAME_CLASS)[0].textContent = this.name, this._hideDelay = "".concat(a.hideDelayMs, "ms"), this._hideSpeedMs = a.hideSpeedMs, this._positionFlag = a.positionFlag, E.style.transitionDelay = this._hideDelay, E.style.transitionDuration = "".concat(this._hideSpeedMs, "ms"), this._el = h, this._selectionEl = d, this._caretEl = g, this._flagEl = E, g.addEventListener("mouseover", this._setHoverState, { passive: !0 }), this._el;
        }, u.prototype.show = function() {
          this._el.classList.remove(u.HIDDEN_CLASS);
        }, u.prototype.hide = function() {
          this._el.classList.add(u.HIDDEN_CLASS);
        }, u.prototype.remove = function() {
          this._el.parentNode.removeChild(this._el);
        }, u.prototype.toggleNearCursor = function(a, h) {
          var d = this._getCoordinates(), g = d.left, y = d.right, E = d.top, D = d.bottom, S = a >= g && a <= y && h >= E && h <= D;
          return this._caretEl.classList.toggle(u.CONTAINER_HOVER_CLASS, S), S;
        }, u.prototype.toggleFlag = function(a) {
          var h = this;
          this._caretEl.classList.toggle(u.CONTAINER_HOVER_CLASS, a) || (this._flagEl.classList.add(u.NO_DELAY_CLASS), setTimeout(function() {
            return h._flagEl.classList.remove(u.NO_DELAY_CLASS);
          }, this._hideSpeedMs));
        }, u.prototype.updateCaret = function(a, h) {
          this._caretEl.style.top = "".concat(a.top, "px"), this._caretEl.style.left = "".concat(a.left, "px"), this._caretEl.style.height = "".concat(a.height, "px"), this._positionFlag ? this._positionFlag(this._flagEl, a, h) : this._updateCaretFlag(a, h);
        }, u.prototype.updateSelection = function(a, h) {
          var d = this;
          this._clearSelection(), a = a || [], a = Array.from(a), a = this._sanitize(a), (a = this._sortByDomPosition(a)).forEach(function(g) {
            return d._addSelection(g, h);
          });
        }, u.prototype._setHoverState = function() {
          document.addEventListener("mousemove", this._toggleOpenedCursor, { passive: !0 });
        }, u.prototype._toggleOpenedCursor = function(a) {
          var h = this.toggleNearCursor(a.clientX, a.clientY);
          this._caretEl.classList.toggle(u.CONTAINER_NO_POINTER_CLASS, h), h || document.removeEventListener("mousemove", this._toggleOpenedCursor);
        }, u.prototype._getCoordinates = function() {
          return this._caretEl.getBoundingClientRect();
        }, u.prototype._updateCaretFlag = function(a, h) {
          this._flagEl.style.width = "";
          var d = this._flagEl.getBoundingClientRect();
          this._flagEl.classList.remove(u.FLAG_FLIPPED_CLASS), a.left > h.width - d.width && this._flagEl.classList.add(u.FLAG_FLIPPED_CLASS), this._flagEl.style.left = "".concat(a.left, "px"), this._flagEl.style.top = "".concat(a.top, "px"), this._flagEl.style.width = "".concat(Math.ceil(d.width), "px");
        }, u.prototype._clearSelection = function() {
          this._selectionEl.innerHTML = "";
        }, u.prototype._addSelection = function(a, h) {
          var d = this._selectionBlock(a, h);
          this._selectionEl.appendChild(d);
        }, u.prototype._selectionBlock = function(a, h) {
          var d = document.createElement(u.SELECTION_ELEMENT_TAG);
          return d.classList.add(u.SELECTION_BLOCK_CLASS), d.style.top = "".concat(a.top - h.top, "px"), d.style.left = "".concat(a.left - h.left, "px"), d.style.width = "".concat(a.width, "px"), d.style.height = "".concat(a.height, "px"), d.style.backgroundColor = this.color, d.style.opacity = "0.3", d;
        }, u.prototype._sortByDomPosition = function(a) {
          return a.sort(function(h, d) {
            return h.top === d.top ? h.left - d.left : h.top - d.top;
          });
        }, u.prototype._sanitize = function(a) {
          var h = this, d = /* @__PURE__ */ new Set();
          return a.filter(function(g) {
            if (!g.width || !g.height)
              return !1;
            var y = h._serialize(g);
            return !d.has(y) && (d.add(y), !0);
          });
        }, u.prototype._serialize = function(a) {
          return ["top:".concat(a.top), "right:".concat(a.right), "bottom:".concat(a.bottom), "left:".concat(a.left)].join(";");
        }, u.CONTAINER_ELEMENT_TAG = "SPAN", u.SELECTION_ELEMENT_TAG = "SPAN", u.CURSOR_CLASS = "ql-cursor", u.SELECTION_CLASS = "ql-cursor-selections", u.SELECTION_BLOCK_CLASS = "ql-cursor-selection-block", u.CARET_CLASS = "ql-cursor-caret", u.CARET_CONTAINER_CLASS = "ql-cursor-caret-container", u.CONTAINER_HOVER_CLASS = "hover", u.CONTAINER_NO_POINTER_CLASS = "no-pointer", u.FLAG_CLASS = "ql-cursor-flag", u.FLAG_FLIPPED_CLASS = "flag-flipped", u.NAME_CLASS = "ql-cursor-name", u.HIDDEN_CLASS = "hidden", u.NO_DELAY_CLASS = "no-delay", u;
      }();
      c.default = l;
    }, 678: function(o, c, l) {
      var u = this && this.__createBinding || (Object.create ? function(f, p, b, w) {
        w === void 0 && (w = b);
        var A = Object.getOwnPropertyDescriptor(p, b);
        A && !("get" in A ? !p.__esModule : A.writable || A.configurable) || (A = { enumerable: !0, get: function() {
          return p[b];
        } }), Object.defineProperty(f, w, A);
      } : function(f, p, b, w) {
        w === void 0 && (w = b), f[w] = p[b];
      }), a = this && this.__setModuleDefault || (Object.create ? function(f, p) {
        Object.defineProperty(f, "default", { enumerable: !0, value: p });
      } : function(f, p) {
        f.default = p;
      }), h = this && this.__importStar || function(f) {
        if (f && f.__esModule)
          return f;
        var p = {};
        if (f != null)
          for (var b in f)
            b !== "default" && Object.prototype.hasOwnProperty.call(f, b) && u(p, f, b);
        return a(p, f), p;
      }, d = this && this.__importDefault || function(f) {
        return f && f.__esModule ? f : { default: f };
      };
      Object.defineProperty(c, "__esModule", { value: !0 });
      var g = d(l(353)), y = h(l(165)), E = d(l(338)), D = d(l(33)), S = l(895), _ = function() {
        function f(p, b) {
          b === void 0 && (b = {}), this._cursors = {}, this._isObserving = !1, this._handleCursorTouch = this._handleCursorTouch.bind(this), this.quill = p, this.options = this._setDefaults(b), this._container = this.quill.addContainer(this.options.containerClass), this._boundsContainer = this.options.boundsContainer || this.quill.container, this._currentSelection = this.quill.getSelection(), this._registerSelectionChangeListeners(), this._registerTextChangeListener(), this._registerDomListeners();
        }
        return f.prototype.createCursor = function(p, b, w) {
          var A = this._cursors[p];
          if (!A) {
            A = new g.default(p, b, w), this._cursors[p] = A;
            var M = A.build(this.options);
            this._container.appendChild(M);
          }
          return A;
        }, f.prototype.moveCursor = function(p, b) {
          var w = this._cursors[p];
          w && (w.range = b, this._updateCursor(w));
        }, f.prototype.removeCursor = function(p) {
          var b = this._cursors[p];
          b && (b.remove(), delete this._cursors[p]);
        }, f.prototype.update = function() {
          var p = this;
          this.cursors().forEach(function(b) {
            return p._updateCursor(b);
          });
        }, f.prototype.clearCursors = function() {
          var p = this;
          this.cursors().forEach(function(b) {
            return p.removeCursor(b.id);
          });
        }, f.prototype.toggleFlag = function(p, b) {
          var w = this._cursors[p];
          w && w.toggleFlag(b);
        }, f.prototype.cursors = function() {
          var p = this;
          return Object.keys(this._cursors).map(function(b) {
            return p._cursors[b];
          });
        }, f.prototype._registerSelectionChangeListeners = function() {
          var p = this;
          this.quill.on(this.quill.constructor.events.SELECTION_CHANGE, function(b) {
            p._currentSelection = b;
          });
        }, f.prototype._registerTextChangeListener = function() {
          var p = this;
          this.quill.on(this.quill.constructor.events.TEXT_CHANGE, function(b) {
            return p._handleTextChange(b);
          });
        }, f.prototype._registerDomListeners = function() {
          var p = this, b = this.quill.container.getElementsByClassName("ql-editor")[0];
          b.addEventListener("scroll", function() {
            return p.update();
          }, { passive: !0 }), b.addEventListener("touchstart", this._handleCursorTouch, { passive: !0 });
        }, f.prototype._handleCursorTouch = function(p) {
          var b = this;
          this.cursors().forEach(function(w) {
            w.toggleNearCursor(p.pageX, p.pageY), setTimeout(function() {
              return w.toggleFlag(!1);
            }, b.options.hideDelayMs);
          });
        }, f.prototype._registerResizeObserver = function() {
          var p = this;
          if (!this._isObserving) {
            var b = this.quill.container.getElementsByClassName("ql-editor")[0], w = new D.default(function(A) {
              if (!A[0].target.isConnected)
                return w.disconnect(), void (p._isObserving = !1);
              p.update();
            });
            w.observe(b), this._isObserving = !0;
          }
        }, f.prototype._updateCursor = function(p) {
          if (this._registerResizeObserver(), !p.range)
            return p.hide();
          var b = this._indexWithinQuillBounds(p.range.index), w = this._indexWithinQuillBounds(p.range.index + p.range.length), A = this.quill.getLeaf(b), M = this.quill.getLeaf(w);
          if (!this._leafIsValid(A) || !this._leafIsValid(M))
            return p.hide();
          p.show();
          var j = this._boundsContainer.getBoundingClientRect(), U = this.quill.getBounds(w);
          p.updateCaret(U, j);
          var q = this._lineRanges(p, A, M).reduce(function($, R) {
            return $.concat(Array.from(y.getClientRects(R)));
          }, []);
          p.updateSelection(q, j);
        }, f.prototype._indexWithinQuillBounds = function(p) {
          var b = this.quill.getLength(), w = b ? b - 1 : 0;
          return p = Math.max(p, 0), Math.min(p, w);
        }, f.prototype._leafIsValid = function(p) {
          return p && p[0] && p[0].domNode && p[1] >= 0;
        }, f.prototype._handleTextChange = function(p) {
          var b = this;
          window.setTimeout(function() {
            b.options.transformOnTextChange && b._transformCursors(p), b.options.selectionChangeSource && (b._emitSelection(), b.update());
          });
        }, f.prototype._emitSelection = function() {
          this.quill.emitter.emit(this.quill.constructor.events.SELECTION_CHANGE, this.quill.getSelection(), this._currentSelection, this.options.selectionChangeSource);
        }, f.prototype._setDefaults = function(p) {
          return (p = Object.assign({}, p)).template || (p.template = f.DEFAULTS.template), p.containerClass || (p.containerClass = f.DEFAULTS.containerClass), p.selectionChangeSource !== null && (p.selectionChangeSource || (p.selectionChangeSource = f.DEFAULTS.selectionChangeSource)), p.hideDelayMs = Number.isInteger(p.hideDelayMs) ? p.hideDelayMs : f.DEFAULTS.hideDelayMs, p.hideSpeedMs = Number.isInteger(p.hideSpeedMs) ? p.hideSpeedMs : f.DEFAULTS.hideSpeedMs, p.transformOnTextChange = !!p.transformOnTextChange, p;
        }, f.prototype._lineRanges = function(p, b, w) {
          var A = this.quill.getLines(p.range);
          return A.reduce(function(M, j, U) {
            if (!j.children) {
              var q = document.createRange();
              return q.selectNode(j.domNode), M.concat(q);
            }
            var $ = U === 0 ? b : j.path(0).pop(), R = $[0], L = $[1], O = U === A.length - 1 ? w : j.path(j.length() - 1).pop(), x = O[0], F = O[1], V = document.createRange();
            return R.domNode.nodeType === Node.TEXT_NODE ? V.setStart(R.domNode, L) : V.setStartBefore(R.domNode), x.domNode.nodeType === Node.TEXT_NODE ? V.setEnd(x.domNode, F) : V.setEndAfter(x.domNode), M.concat(V);
          }, []);
        }, f.prototype._transformCursors = function(p) {
          var b = this;
          p = new S(p), this.cursors().filter(function(w) {
            return w.range;
          }).forEach(function(w) {
            w.range.index = p.transformPosition(w.range.index), b._updateCursor(w);
          });
        }, f.DEFAULTS = { template: E.default, containerClass: "ql-cursors", selectionChangeSource: "api", hideDelayMs: 3e3, hideSpeedMs: 400 }, f;
      }();
      c.default = _;
    }, 338: function(o, c, l) {
      var u = this && this.__importDefault || function(d) {
        return d && d.__esModule ? d : { default: d };
      };
      Object.defineProperty(c, "__esModule", { value: !0 });
      var a = u(l(353)), h = `
  <span class="`.concat(a.default.SELECTION_CLASS, `"></span>
  <span class="`).concat(a.default.CARET_CONTAINER_CLASS, `">
    <span class="`).concat(a.default.CARET_CLASS, `"></span>
  </span>
  <div class="`).concat(a.default.FLAG_CLASS, `">
    <small class="`).concat(a.default.NAME_CLASS, `"></small>
  </div>
`);
      c.default = h;
    } }, r = {};
    function s(o) {
      var c = r[o];
      if (c !== void 0)
        return c.exports;
      var l = r[o] = { id: o, loaded: !1, exports: {} };
      return n[o].call(l.exports, l, l.exports, s), l.loaded = !0, l.exports;
    }
    s.n = (o) => {
      var c = o && o.__esModule ? () => o.default : () => o;
      return s.d(c, { a: c }), c;
    }, s.d = (o, c) => {
      for (var l in c)
        s.o(c, l) && !s.o(o, l) && Object.defineProperty(o, l, { enumerable: !0, get: c[l] });
    }, s.g = function() {
      if (typeof globalThis == "object")
        return globalThis;
      try {
        return this || new Function("return this")();
      } catch {
        if (typeof window == "object")
          return window;
      }
    }(), s.o = (o, c) => Object.prototype.hasOwnProperty.call(o, c), s.r = (o) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o, "__esModule", { value: !0 });
    }, s.nmd = (o) => (o.paths = [], o.children || (o.children = []), o), s.nc = void 0;
    var i = s(607);
    return i.default;
  })());
})(Go);
var Qa = Go.exports;
const gu = /* @__PURE__ */ Ka(Qa), Wo = /* @__PURE__ */ new Map();
class Za {
  /**
   * @param {string} room
   */
  constructor(t) {
    this.room = t, this.onmessage = null, this._onChange = (n) => n.key === t && this.onmessage !== null && this.onmessage({ data: ll(n.newValue || "") }), zc(this._onChange);
  }
  /**
   * @param {ArrayBuffer} buf
   */
  postMessage(t) {
    Ii.setItem(this.room, cl(nl(t)));
  }
  close() {
    qc(this._onChange);
  }
}
const tu = typeof BroadcastChannel > "u" ? Za : BroadcastChannel, Gs = (e) => Kt(Wo, e, () => {
  const t = Ke(), n = new tu(e);
  return n.onmessage = (r) => t.forEach((s) => s(r.data, "broadcastchannel")), {
    bc: n,
    subs: t
  };
}), eu = (e, t) => (Gs(e).subs.add(t), t), nu = (e, t) => {
  const n = Gs(e), r = n.subs.delete(t);
  return r && n.subs.size === 0 && (n.bc.close(), Wo.delete(e)), r;
}, Ln = (e, t, n = null) => {
  const r = Gs(e);
  r.bc.postMessage(t), r.subs.forEach((s) => s(t, n));
}, Jo = 0, Ws = 1, Yo = 2, ws = (e, t) => {
  B(e, Jo);
  const n = Zi(t);
  Dt(e, n);
}, Xo = (e, t, n) => {
  B(e, Ws), Dt(e, Ki(t, n));
}, ru = (e, t, n) => Xo(t, n, Gt(e)), Ko = (e, t, n) => {
  try {
    Yi(t, Gt(e), n);
  } catch (r) {
    console.error("Caught error while handling a Yjs update", r);
  }
}, su = (e, t) => {
  B(e, Yo), Dt(e, t);
}, iu = Ko, ou = (e, t, n, r) => {
  const s = G(e);
  switch (s) {
    case Jo:
      ru(e, t, n);
      break;
    case Ws:
      Ko(e, n, r);
      break;
    case Yo:
      iu(e, n, r);
      break;
    default:
      throw new Error("Unknown message type");
  }
  return s;
}, cu = 0, lu = (e, t, n) => {
  switch (G(e)) {
    case cu:
      n(t, Re(e));
  }
}, au = (e) => $c(e, (t, n) => `${encodeURIComponent(n)}=${encodeURIComponent(t)}`).join("&"), dn = 0, Qo = 3, xn = 1, uu = 2, lr = [];
lr[dn] = (e, t, n, r, s) => {
  B(e, dn);
  const i = ou(
    t,
    e,
    n.doc,
    n
  );
  r && i === Ws && !n.synced && (n.synced = !0);
};
lr[Qo] = (e, t, n, r, s) => {
  B(e, xn), Dt(
    e,
    $n(
      n.awareness,
      Array.from(n.awareness.getStates().keys())
    )
  );
};
lr[xn] = (e, t, n, r, s) => {
  Xa(
    n.awareness,
    Gt(t),
    n
  );
};
lr[uu] = (e, t, n, r, s) => {
  lu(
    t,
    n.doc,
    (i, o) => hu(n, o)
  );
};
const ki = 3e4, hu = (e, t) => console.warn(`Permission denied to access ${e.url}.
${t}`), Zo = (e, t, n) => {
  const r = Bt(t), s = Nt(), i = G(r), o = e.messageHandlers[i];
  return /** @type {any} */ o ? o(s, r, e, n, i) : console.error("Unable to compute message"), s;
}, bs = (e, t, n) => {
  t === e.ws && (e.emit("connection-close", [n, e]), e.ws = null, t.close(), e.wsconnecting = !1, e.wsconnected ? (e.wsconnected = !1, e.synced = !1, $s(
    e.awareness,
    Array.from(e.awareness.getStates().keys()).filter(
      (r) => r !== e.doc.clientID
    ),
    e
  ), e.emit("status", [{
    status: "disconnected"
  }])) : e.wsUnsuccessfulReconnects++, setTimeout(
    tc,
    vs(
      cc(2, e.wsUnsuccessfulReconnects) * 100,
      e.maxBackoffTime
    ),
    e
  ));
}, tc = (e) => {
  if (e.shouldConnect && e.ws === null) {
    const t = new e._WS(e.url, e.protocols);
    t.binaryType = "arraybuffer", e.ws = t, e.wsconnecting = !0, e.wsconnected = !1, e.synced = !1, t.onmessage = (n) => {
      e.wsLastMessageReceived = Ze();
      const r = Zo(e, new Uint8Array(n.data), !0);
      Ss(r) > 1 && t.send(gt(r));
    }, t.onerror = (n) => {
      e.emit("connection-error", [n, e]);
    }, t.onclose = (n) => {
      bs(e, t, n);
    }, t.onopen = () => {
      e.wsLastMessageReceived = Ze(), e.wsconnecting = !1, e.wsconnected = !0, e.wsUnsuccessfulReconnects = 0, e.emit("status", [{
        status: "connected"
      }]);
      const n = Nt();
      if (B(n, dn), ws(n, e.doc), t.send(gt(n)), e.awareness.getLocalState() !== null) {
        const r = Nt();
        B(r, xn), Dt(
          r,
          $n(e.awareness, [
            e.doc.clientID
          ])
        ), t.send(gt(r));
      }
    }, e.emit("status", [{
      status: "connecting"
    }]);
  }
}, rs = (e, t) => {
  const n = e.ws;
  e.wsconnected && n && n.readyState === n.OPEN && n.send(t), e.bcconnected && Ln(e.bcChannel, t, e);
};
class pu extends Ir {
  /**
   * @param {string} serverUrl
   * @param {string} roomname
   * @param {Y.Doc} doc
   * @param {object} opts
   * @param {boolean} [opts.connect]
   * @param {awarenessProtocol.Awareness} [opts.awareness]
   * @param {Object<string,string>} [opts.params] specify url parameters
   * @param {Array<string>} [opts.protocols] specify websocket protocols
   * @param {typeof WebSocket} [opts.WebSocketPolyfill] Optionall provide a WebSocket polyfill
   * @param {number} [opts.resyncInterval] Request server state every `resyncInterval` milliseconds
   * @param {number} [opts.maxBackoffTime] Maximum amount of time to wait before trying to reconnect (we try to reconnect using exponential backoff)
   * @param {boolean} [opts.disableBc] Disable cross-tab BroadcastChannel communication
   */
  constructor(t, n, r, {
    connect: s = !0,
    awareness: i = new Ya(r),
    params: o = {},
    protocols: c = [],
    WebSocketPolyfill: l = WebSocket,
    resyncInterval: u = -1,
    maxBackoffTime: a = 2500,
    disableBc: h = !1
  } = {}) {
    for (super(); t[t.length - 1] === "/"; )
      t = t.slice(0, t.length - 1);
    this.serverUrl = t, this.bcChannel = t + "/" + n, this.maxBackoffTime = a, this.params = o, this.protocols = c, this.roomname = n, this.doc = r, this._WS = l, this.awareness = i, this.wsconnected = !1, this.wsconnecting = !1, this.bcconnected = !1, this.disableBc = h, this.wsUnsuccessfulReconnects = 0, this.messageHandlers = lr.slice(), this._synced = !1, this.ws = null, this.wsLastMessageReceived = 0, this.shouldConnect = s, this._resyncInterval = 0, u > 0 && (this._resyncInterval = /** @type {any} */
    setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const d = Nt();
        B(d, dn), ws(d, r), this.ws.send(gt(d));
      }
    }, u)), this._bcSubscriber = (d, g) => {
      if (g !== this) {
        const y = Zo(this, new Uint8Array(d), !1);
        Ss(y) > 1 && Ln(this.bcChannel, gt(y), this);
      }
    }, this._updateHandler = (d, g) => {
      if (g !== this) {
        const y = Nt();
        B(y, dn), su(y, d), rs(this, gt(y));
      }
    }, this.doc.on("update", this._updateHandler), this._awarenessUpdateHandler = ({ added: d, updated: g, removed: y }, E) => {
      const D = d.concat(g).concat(y), S = Nt();
      B(S, xn), Dt(
        S,
        $n(i, D)
      ), rs(this, gt(S));
    }, this._exitHandler = () => {
      $s(
        this.awareness,
        [r.clientID],
        "app closed"
      );
    }, tn && typeof process < "u" && process.on("exit", this._exitHandler), i.on("update", this._awarenessUpdateHandler), this._checkInterval = /** @type {any} */
    setInterval(() => {
      this.wsconnected && ki < Ze() - this.wsLastMessageReceived && bs(
        this,
        /** @type {WebSocket} */
        this.ws,
        null
      );
    }, ki / 10), s && this.connect();
  }
  get url() {
    const t = au(this.params);
    return this.serverUrl + "/" + this.roomname + (t.length === 0 ? "" : "?" + t);
  }
  /**
   * @type {boolean}
   */
  get synced() {
    return this._synced;
  }
  set synced(t) {
    this._synced !== t && (this._synced = t, this.emit("synced", [t]), this.emit("sync", [t]));
  }
  destroy() {
    this._resyncInterval !== 0 && clearInterval(this._resyncInterval), clearInterval(this._checkInterval), this.disconnect(), tn && typeof process < "u" && process.off("exit", this._exitHandler), this.awareness.off("update", this._awarenessUpdateHandler), this.doc.off("update", this._updateHandler), super.destroy();
  }
  connectBc() {
    if (this.disableBc)
      return;
    this.bcconnected || (eu(this.bcChannel, this._bcSubscriber), this.bcconnected = !0);
    const t = Nt();
    B(t, dn), ws(t, this.doc), Ln(this.bcChannel, gt(t), this);
    const n = Nt();
    B(n, dn), Xo(n, this.doc), Ln(this.bcChannel, gt(n), this);
    const r = Nt();
    B(r, Qo), Ln(
      this.bcChannel,
      gt(r),
      this
    );
    const s = Nt();
    B(s, xn), Dt(
      s,
      $n(this.awareness, [
        this.doc.clientID
      ])
    ), Ln(
      this.bcChannel,
      gt(s),
      this
    );
  }
  disconnectBc() {
    const t = Nt();
    B(t, xn), Dt(
      t,
      $n(this.awareness, [
        this.doc.clientID
      ], /* @__PURE__ */ new Map())
    ), rs(this, gt(t)), this.bcconnected && (nu(this.bcChannel, this._bcSubscriber), this.bcconnected = !1);
  }
  disconnect() {
    this.shouldConnect = !1, this.disconnectBc(), this.ws !== null && bs(this, this.ws, null);
  }
  connect() {
    this.shouldConnect = !0, !this.wsconnected && this.ws === null && (tc(this), this.connectBc());
  }
}
export {
  du as QuillBinding,
  gu as QuillCursors,
  pu as WebsocketProvider,
  fu as Y
};
//# sourceMappingURL=editor-bundle.mjs.map
