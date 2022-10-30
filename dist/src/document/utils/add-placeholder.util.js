"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlaceholder = void 0;
const pdf_lib_1 = require("pdf-lib");
const unit8ToBuffer_util_1 = require("./unit8ToBuffer.util");
async function addPlaceholder(pdfDoc) {
    const loadedPdf = await pdf_lib_1.PDFDocument.load(pdfDoc);
    const ByteRange = pdf_lib_1.PDFArray.withContext(loadedPdf.context);
    const DEFAULT_BYTE_RANGE_PLACEHOLDER = '**********';
    const SIGNATURE_LENGTH = 3322;
    const pages = loadedPdf.getPages();
    ByteRange.push(pdf_lib_1.PDFNumber.of(0));
    ByteRange.push(pdf_lib_1.PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
    ByteRange.push(pdf_lib_1.PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
    ByteRange.push(pdf_lib_1.PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
    const signatureDict = loadedPdf.context.obj({
        Type: 'Sig',
        Filter: 'Adobe.PPKLite',
        SubFilter: 'adbe.pkcs7.detached',
        ByteRange,
        Contents: pdf_lib_1.PDFHexString.of('A'.repeat(SIGNATURE_LENGTH)),
        Reason: pdf_lib_1.PDFString.of('We need your signature for reasons...'),
        M: pdf_lib_1.PDFString.fromDate(new Date()),
    });
    const signatureDictRef = loadedPdf.context.register(signatureDict);
    const widgetDict = loadedPdf.context.obj({
        Type: 'Annot',
        Subtype: 'Widget',
        FT: 'Sig',
        Rect: [57, 535, 480, 270],
        V: signatureDictRef,
        T: pdf_lib_1.PDFString.of('test signature'),
        F: 4,
        P: pages[0].ref,
    });
    const widgetDictRef = loadedPdf.context.register(widgetDict);
    pages[0].node.set(pdf_lib_1.PDFName.of('Annots'), loadedPdf.context.obj([widgetDictRef]));
    loadedPdf.catalog.set(pdf_lib_1.PDFName.of('AcroForm'), loadedPdf.context.obj({
        SigFlags: 3,
        Fields: [widgetDictRef],
    }));
    const pdfBytes = await loadedPdf.save({ useObjectStreams: false });
    return (0, unit8ToBuffer_util_1.unit8ToBuffer)(pdfBytes);
}
exports.addPlaceholder = addPlaceholder;
//# sourceMappingURL=add-placeholder.util.js.map