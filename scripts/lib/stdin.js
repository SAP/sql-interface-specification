'use strict';

const fs = require('fs');

function stdin_readAllSync() {
  const bufferSize = 65536;
  const buffers = [];
  while (true) {
    const buffer = Buffer.alloc(bufferSize);
    let size = 0;
    try {
      size = fs.readSync(process.stdin.fd, buffer, 0, bufferSize, null);
      if (size === 0) {
        break;
      }
    } catch (err) {
      if (err.code === 'EAGAIN') {
        continue;
      }
      throw (err);
    }
    buffers.push(Uint8Array.prototype.slice.call(buffer, 0, size));
  }
  return Buffer.concat(buffers).toString('UTF-8');
}

module.exports = {
  readAllSync: stdin_readAllSync,
}
