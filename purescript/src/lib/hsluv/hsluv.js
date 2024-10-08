"use strict";
(() => {
    var l = class h {
        constructor() {
            this.hex = "#000000", this.rgb_r = 0, this.rgb_g = 0, this.rgb_b = 0, this.xyz_x = 0, this.xyz_y = 0, this.xyz_z = 0, this.luv_l = 0, this.luv_u = 0, this.luv_v = 0, this.lch_l = 0, this.lch_c = 0, this.lch_h = 0, this.hsluv_h = 0, this.hsluv_s = 0, this.hsluv_l = 0, this.hpluv_h = 0, this.hpluv_p = 0, this.hpluv_l = 0, this.r0s = 0, this.r0i = 0, this.r1s = 0, this.r1i = 0, this.g0s = 0, this.g0i = 0, this.g1s = 0, this.g1i = 0, this.b0s = 0, this.b0i = 0, this.b1s = 0, this.b1i = 0
        }
        static fromLinear(s) {
            return s <= .0031308 ? 12.92 * s : 1.055 * Math.pow(s, 1 / 2.4) - .055
        }
        static toLinear(s) {
            return s > .04045 ? Math.pow((s + .055) / 1.055, 2.4) : s / 12.92
        }
        static yToL(s) {
            return s <= h.epsilon ? s / h.refY * h.kappa : 116 * Math.pow(s / h.refY, 1 / 3) - 16
        }
        static lToY(s) {
            return s <= 8 ? h.refY * s / h.kappa : h.refY * Math.pow((s + 16) / 116, 3)
        }
        static rgbChannelToHex(s) {
            let t = Math.round(s * 255),
                i = t % 16,
                r = (t - i) / 16 | 0;
            return h.hexChars.charAt(r) + h.hexChars.charAt(i)
        }
        static hexToRgbChannel(s, t) {
            let i = h.hexChars.indexOf(s.charAt(t)),
                r = h.hexChars.indexOf(s.charAt(t + 1));
            return (i * 16 + r) / 255
        }
        static distanceFromOriginAngle(s, t, i) {
            let r = t / (Math.sin(i) - s * Math.cos(i));
            return r < 0 ? 1 / 0 : r
        }
        static distanceFromOrigin(s, t) {
            return Math.abs(t) / Math.sqrt(Math.pow(s, 2) + 1)
        }
        static min6(s, t, i, r, n, c) {
            return Math.min(s, Math.min(t, Math.min(i, Math.min(r, Math.min(n, c)))))
        }
        rgbToHex() {
            this.hex = "#", this.hex += h.rgbChannelToHex(this.rgb_r), this.hex += h.rgbChannelToHex(this.rgb_g), this.hex += h.rgbChannelToHex(this.rgb_b)
        }
        hexToRgb() {
            this.hex = this.hex.toLowerCase(), this.rgb_r = h.hexToRgbChannel(this.hex, 1), this.rgb_g = h.hexToRgbChannel(this.hex, 3), this.rgb_b = h.hexToRgbChannel(this.hex, 5)
        }
        xyzToRgb() {
            this.rgb_r = h.fromLinear(h.m_r0 * this.xyz_x + h.m_r1 * this.xyz_y + h.m_r2 * this.xyz_z), this.rgb_g = h.fromLinear(h.m_g0 * this.xyz_x + h.m_g1 * this.xyz_y + h.m_g2 * this.xyz_z), this.rgb_b = h.fromLinear(h.m_b0 * this.xyz_x + h.m_b1 * this.xyz_y + h.m_b2 * this.xyz_z)
        }
        rgbToXyz() {
            let s = h.toLinear(this.rgb_r),
                t = h.toLinear(this.rgb_g),
                i = h.toLinear(this.rgb_b);
            this.xyz_x = .41239079926595 * s + .35758433938387 * t + .18048078840183 * i, this.xyz_y = .21263900587151 * s + .71516867876775 * t + .072192315360733 * i, this.xyz_z = .019330818715591 * s + .11919477979462 * t + .95053215224966 * i
        }
        xyzToLuv() {
            let s = this.xyz_x + 15 * this.xyz_y + 3 * this.xyz_z,
                t = 4 * this.xyz_x,
                i = 9 * this.xyz_y;
            s !== 0 ? (t /= s, i /= s) : (t = NaN, i = NaN), this.luv_l = h.yToL(this.xyz_y), this.luv_l === 0 ? (this.luv_u = 0, this.luv_v = 0) : (this.luv_u = 13 * this.luv_l * (t - h.refU), this.luv_v = 13 * this.luv_l * (i - h.refV))
        }
        luvToXyz() {
            if (this.luv_l === 0) {
                this.xyz_x = 0, this.xyz_y = 0, this.xyz_z = 0;
                return
            }
            let s = this.luv_u / (13 * this.luv_l) + h.refU,
                t = this.luv_v / (13 * this.luv_l) + h.refV;
            this.xyz_y = h.lToY(this.luv_l), this.xyz_x = 0 - 9 * this.xyz_y * s / ((s - 4) * t - s * t), this.xyz_z = (9 * this.xyz_y - 15 * t * this.xyz_y - t * this.xyz_x) / (3 * t)
        }
        luvToLch() {
            if (this.lch_l = this.luv_l, this.lch_c = Math.sqrt(this.luv_u * this.luv_u + this.luv_v * this.luv_v), this.lch_c < 1e-8) this.lch_h = 0;
            else {
                let s = Math.atan2(this.luv_v, this.luv_u);
                this.lch_h = s * 180 / Math.PI, this.lch_h < 0 && (this.lch_h = 360 + this.lch_h)
            }
        }
        lchToLuv() {
            let s = this.lch_h / 180 * Math.PI;
            this.luv_l = this.lch_l, this.luv_u = Math.cos(s) * this.lch_c, this.luv_v = Math.sin(s) * this.lch_c
        }
        calculateBoundingLines(s) {
            let t = Math.pow(s + 16, 3) / 1560896,
                i = t > h.epsilon ? t : s / h.kappa,
                r = i * (284517 * h.m_r0 - 94839 * h.m_r2),
                n = i * (838422 * h.m_r2 + 769860 * h.m_r1 + 731718 * h.m_r0),
                c = i * (632260 * h.m_r2 - 126452 * h.m_r1),
                o = i * (284517 * h.m_g0 - 94839 * h.m_g2),
                e = i * (838422 * h.m_g2 + 769860 * h.m_g1 + 731718 * h.m_g0),
                u = i * (632260 * h.m_g2 - 126452 * h.m_g1),
                g = i * (284517 * h.m_b0 - 94839 * h.m_b2),
                v = i * (838422 * h.m_b2 + 769860 * h.m_b1 + 731718 * h.m_b0),
                a = i * (632260 * h.m_b2 - 126452 * h.m_b1);
            this.r0s = r / c, this.r0i = n * s / c, this.r1s = r / (c + 126452), this.r1i = (n - 769860) * s / (c + 126452), this.g0s = o / u, this.g0i = e * s / u, this.g1s = o / (u + 126452), this.g1i = (e - 769860) * s / (u + 126452), this.b0s = g / a, this.b0i = v * s / a, this.b1s = g / (a + 126452), this.b1i = (v - 769860) * s / (a + 126452)
        }
        calcMaxChromaHpluv() {
            let s = h.distanceFromOrigin(this.r0s, this.r0i),
                t = h.distanceFromOrigin(this.r1s, this.r1i),
                i = h.distanceFromOrigin(this.g0s, this.g0i),
                r = h.distanceFromOrigin(this.g1s, this.g1i),
                n = h.distanceFromOrigin(this.b0s, this.b0i),
                c = h.distanceFromOrigin(this.b1s, this.b1i);
            return h.min6(s, t, i, r, n, c)
        }
        calcMaxChromaHsluv(s) {
            let t = s / 360 * Math.PI * 2,
                i = h.distanceFromOriginAngle(this.r0s, this.r0i, t),
                r = h.distanceFromOriginAngle(this.r1s, this.r1i, t),
                n = h.distanceFromOriginAngle(this.g0s, this.g0i, t),
                c = h.distanceFromOriginAngle(this.g1s, this.g1i, t),
                o = h.distanceFromOriginAngle(this.b0s, this.b0i, t),
                e = h.distanceFromOriginAngle(this.b1s, this.b1i, t);
            return h.min6(i, r, n, c, o, e)
        }
        hsluvToLch() {
            if (this.hsluv_l > 99.9999999) this.lch_l = 100, this.lch_c = 0;
            else if (this.hsluv_l < 1e-8) this.lch_l = 0, this.lch_c = 0;
            else {
                this.lch_l = this.hsluv_l, this.calculateBoundingLines(this.hsluv_l);
                let s = this.calcMaxChromaHsluv(this.hsluv_h);
                this.lch_c = s / 100 * this.hsluv_s
            }
            this.lch_h = this.hsluv_h
        }
        lchToHsluv() {
            if (this.lch_l > 99.9999999) this.hsluv_s = 0, this.hsluv_l = 100;
            else if (this.lch_l < 1e-8) this.hsluv_s = 0, this.hsluv_l = 0;
            else {
                this.calculateBoundingLines(this.lch_l);
                let s = this.calcMaxChromaHsluv(this.lch_h);
                this.hsluv_s = this.lch_c / s * 100, this.hsluv_l = this.lch_l
            }
            this.hsluv_h = this.lch_h
        }
        hpluvToLch() {
            if (this.hpluv_l > 99.9999999) this.lch_l = 100, this.lch_c = 0;
            else if (this.hpluv_l < 1e-8) this.lch_l = 0, this.lch_c = 0;
            else {
                this.lch_l = this.hpluv_l, this.calculateBoundingLines(this.hpluv_l);
                let s = this.calcMaxChromaHpluv();
                this.lch_c = s / 100 * this.hpluv_p
            }
            this.lch_h = this.hpluv_h
        }
        lchToHpluv() {
            if (this.lch_l > 99.9999999) this.hpluv_p = 0, this.hpluv_l = 100;
            else if (this.lch_l < 1e-8) this.hpluv_p = 0, this.hpluv_l = 0;
            else {
                this.calculateBoundingLines(this.lch_l);
                let s = this.calcMaxChromaHpluv();
                this.hpluv_p = this.lch_c / s * 100, this.hpluv_l = this.lch_l
            }
            this.hpluv_h = this.lch_h
        }
        hsluvToRgb() {
            this.hsluvToLch(), this.lchToLuv(), this.luvToXyz(), this.xyzToRgb()
        }
        hpluvToRgb() {
            this.hpluvToLch(), this.lchToLuv(), this.luvToXyz(), this.xyzToRgb()
        }
        hsluvToHex() {
            this.hsluvToRgb(), this.rgbToHex()
        }
        hpluvToHex() {
            this.hpluvToRgb(), this.rgbToHex()
        }
        rgbToHsluv() {
            this.rgbToXyz(), this.xyzToLuv(), this.luvToLch(), this.lchToHpluv(), this.lchToHsluv()
        }
        rgbToHpluv() {
            this.rgbToXyz(), this.xyzToLuv(), this.luvToLch(), this.lchToHpluv(), this.lchToHpluv()
        }
        hexToHsluv() {
            this.hexToRgb(), this.rgbToHsluv()
        }
        hexToHpluv() {
            this.hexToRgb(), this.rgbToHpluv()
        }
    };
    l.hexChars = "0123456789abcdef";
    l.refY = 1;
    l.refU = .19783000664283;
    l.refV = .46831999493879;
    l.kappa = 903.2962962;
    l.epsilon = .0088564516;
    l.m_r0 = 3.240969941904521;
    l.m_r1 = -1.537383177570093;
    l.m_r2 = -.498610760293;
    l.m_g0 = -.96924363628087;
    l.m_g1 = 1.87596750150772;
    l.m_g2 = .041555057407175;
    l.m_b0 = .055630079696993;
    l.m_b1 = -.20397695888897;
    l.m_b2 = 1.056971514242878;
    window.Hsluv = l;
})();

export function _toRGB(h, s, l) {
    var c = new window.Hsluv();
    c.hsluv_h = h 
    c.hsluv_s = s 
    c.hsluv_l = l 
    c.hsluvToRgb()
    return {
        r: c.rgb_r, 
        g: c.rgb_g,
        b: c.rgb_b
    }
}

export function _toHSLuv(r, g, b) {
    var c = new window.Hsluv()
    c.rgb_r = r 
    c.rgb_g = g 
    c.rgb_b = b 
    c.rgbToHsluv()
    return {
        h: c.hsluv_h, 
        s: c.hsluv_s,
        l: c.hsluv_l 
    }
}

