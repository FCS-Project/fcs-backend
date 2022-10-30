import {
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFHexString,
  PDFString,
  PDFArray,
} from 'pdf-lib';
import { unit8ToBuffer } from './unit8ToBuffer.util';

export async function addPlaceholder(pdfDoc: any) {
  const loadedPdf = await PDFDocument.load(pdfDoc);
  const ByteRange = PDFArray.withContext(loadedPdf.context);
  const DEFAULT_BYTE_RANGE_PLACEHOLDER = '**********';
  const SIGNATURE_LENGTH = 3322;
  const pages = loadedPdf.getPages();

  ByteRange.push(PDFNumber.of(0));
  ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
  ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));
  ByteRange.push(PDFName.of(DEFAULT_BYTE_RANGE_PLACEHOLDER));

  const signatureDict = loadedPdf.context.obj({
    Type: 'Sig',
    Filter: 'Adobe.PPKLite',
    SubFilter: 'adbe.pkcs7.detached',
    ByteRange,
    Contents: PDFHexString.of('A'.repeat(SIGNATURE_LENGTH)),
    Reason: PDFString.of('We need your signature for reasons...'),
    M: PDFString.fromDate(new Date()),
  });

  const signatureDictRef = loadedPdf.context.register(signatureDict);

  const widgetDict = loadedPdf.context.obj({
    Type: 'Annot',
    Subtype: 'Widget',
    FT: 'Sig',
    Rect: [57, 535, 480, 270], // Signature rect size
    V: signatureDictRef,
    T: PDFString.of('test signature'),
    F: 4,
    P: pages[0].ref,
  });

  const widgetDictRef = loadedPdf.context.register(widgetDict);
  pages[0].node.set(
    PDFName.of('Annots'),
    loadedPdf.context.obj([widgetDictRef]),
  );

  loadedPdf.catalog.set(
    PDFName.of('AcroForm'),
    loadedPdf.context.obj({
      SigFlags: 3,
      Fields: [widgetDictRef],
    }),
  );

  const pdfBytes = await loadedPdf.save({ useObjectStreams: false });

  return unit8ToBuffer(pdfBytes);
}
