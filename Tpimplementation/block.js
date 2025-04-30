const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}...
      Hash      : ${this.hash.substring(0, 10)}...
      Data      : ${this.data}`;
  }

  static genesis() {
    return new this('Genesis time', '-----', 'f1r5t-h45h', []);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.blockHash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data);
  }

  static blockHash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${JSON.stringify(data)}`).toString();
  }

}


module.exports = Block;
