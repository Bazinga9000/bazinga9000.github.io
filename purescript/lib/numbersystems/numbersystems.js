"use strict";
import Decimal from "decimal.js";
export function initArgam() {
    Decimal.set({ precision: 1000 }) // surely this will have no long-term consequences
}