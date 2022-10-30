"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit8ToBuffer = void 0;
function unit8ToBuffer(unit8) {
    const buf = Buffer.alloc(unit8.byteLength);
    const view = new Uint8Array(unit8);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
exports.unit8ToBuffer = unit8ToBuffer;
//# sourceMappingURL=unit8ToBuffer.util.js.map