"use strict";
import Decimal from "https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/decimal.min.js";
export function initArgam() {
    Decimal.set({ precision: 1000 }) // surely this will have no long-term consequences
}