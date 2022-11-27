"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
const CryptoJS = require('crypto-js');
const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, `${process.env.ENCRYPTION_KEY}`);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};
exports.decrypt = decrypt;
//# sourceMappingURL=decrypt.js.map