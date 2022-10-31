"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signingPDF = exports.signPDF = void 0;
const node_signpdf_1 = require("node-signpdf");
const add_placeholder_util_1 = require("./add-placeholder.util");
const base64 = require('base64topdf');
const fs = require("fs");
const path = require("path");
async function signPDF(certificate, pdfDoc) {
    let newPDF = await (0, add_placeholder_util_1.addPlaceholder)(pdfDoc);
    newPDF = node_signpdf_1.default.sign(newPDF, certificate);
    return newPDF;
}
exports.signPDF = signPDF;
async function signingPDF(dataURI) {
    base64.base64Decode(dataURI, 'src/document/test_assets/imported_file.pdf');
    const pdfDoc = fs.readFileSync(path.resolve('src/document/test_assets/imported_file.pdf'));
    const certificate = fs.readFileSync(path.resolve('src/document/test_assets/certificate.p12'));
    const signedDocs = await signPDF(certificate, pdfDoc);
    const pdfName = `src/document/test_assets/exported_file.pdf`;
    fs.writeFileSync(pdfName, signedDocs);
}
exports.signingPDF = signingPDF;
//# sourceMappingURL=sign-pdf.util.js.map