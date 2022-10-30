export function unit8ToBuffer(unit8: any) {
  const buf = Buffer.alloc(unit8.byteLength);
  const view = new Uint8Array(unit8);

  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}
