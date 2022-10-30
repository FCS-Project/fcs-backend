/* eslint-disable @typescript-eslint/no-var-requires */
import signer from 'node-signpdf';
import { addPlaceholder } from './add-placeholder.util';
const base64 = require('base64topdf');
import * as fs from 'fs';
import * as path from 'path';

export async function signPDF(certificate: any, pdfDoc: any) {
  let newPDF = await addPlaceholder(pdfDoc);
  newPDF = signer.sign(newPDF, certificate);
  return newPDF;
}

export async function signingPDF(dataURI: string) {
  const decodedBase64 = base64.base64Decode(
    dataURI,
    'src/document/test_assets/imported_file.pdf',
  );
  console.log(decodedBase64);
  const pdfDoc = fs.readFileSync(
    path.resolve('src/document/test_assets/imported_file.pdf'),
  );
  const certificate = fs.readFileSync(
    path.resolve('src/document/test_assets/certificate.p12'),
  );
  const signedDocs = await signPDF(certificate, pdfDoc);
  const pdfName = `src/document/test_assets/exported_file.pdf`;
  fs.writeFileSync(pdfName, signedDocs);
}
