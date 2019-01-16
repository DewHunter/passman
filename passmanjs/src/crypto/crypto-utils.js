import aesjs from "aes-js";
import emojiTree from "emoji-tree";
import pbkdf2 from "pbkdf2";

const encrypt = (strKey, str) => {
  if (!(typeof str === "string" || str instanceof String)) {
    throw "Cannot encypt non strings";
  }
  let salt = saltGen();
  let key = pbkdf2.pbkdf2Sync(strKey, salt, 1, 128 / 8, "sha512");
  let iv = ivGen();

  let padAndBytes = pad16(iffyUtf16(str));
  let padLen = padAndBytes.pad;
  let bytes = padAndBytes.bytes;

  let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  let encryptedBytes = aesCbc.encrypt(bytes);

  return (
    padLen.toString(16) +
    aesjs.utils.hex.fromBytes(iv) +
    aesjs.utils.hex.fromBytes(encryptedBytes) +
    salt
  );
};

const decrypt = (strKey, strArr8) => {
  let charArr = strArr8.split("");
  let pad = parseInt(charArr.splice(0, 1).join(""), 16);
  let salt = charArr.splice(charArr.length - 16, charArr.length).join("");
  let arrAndIV = byteArrPlusIV(charArr);

  let iv = arrAndIV.iv;
  let arr8 = arrAndIV.arr8;
  let key = pbkdf2.pbkdf2Sync(strKey, salt, 1, 128 / 8, "sha512");

  var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  var decryptedBytes = aesCbc.decrypt(arr8);
  return fromIffyUtf16(unpad(pad, decryptedBytes));
};

// Helpers

/**
 * Hacky implementation of UTF-16
 * where items <= 0xFFFF are padded with 0x0000
 * don't judge me
 */
const iffyUtf16 = inputStr => {
  // emoji optimized unicode serialization
  let emojified = emojiTree(inputStr);
  let arr2x16 = new Uint16Array(emojified.length * 2);
  for (let i = 0; i < emojified.length; i++) {
    let idx = 2 * i;
    let tuple = toUTF16(emojified[i].text.codePointAt(0));
    arr2x16[idx] = tuple[0];
    arr2x16[idx + 1] = tuple[1];
  }
  return conv2x16To8Arr(arr2x16);
};

const fromIffyUtf16 = arr8 => {
  let arr2x16 = conv8To2x16Arr(arr8);

  const u = function(codeUnit) {
    return "\\u" + codeUnit.toString(16).toUpperCase();
  };

  let output = "";

  for (let i = 0; i < arr2x16.length; i += 2) {
    if (arr2x16[i] === 0) {
      output += String.fromCodePoint(arr2x16[i] + arr2x16[i + 1]);
    } else {
      output += u(arr2x16[i]) + u(arr2x16[i + 1]);
    }
  }
  // This escapes the Unicode characters
  return JSON.parse('"' + output + '"');
};

/**
 * Turns array of uInt16 consecutive tuples into array of bytes
 */
const conv2x16To8Arr = arr2x16 => {
  if (!(arr2x16 instanceof Uint16Array)) {
    throw "Input array can only be of type Uint16Array";
  }
  if (arr2x16.length % 2 !== 0) {
    throw "Input array must be multiple of 2's!";
  }
  var arr8 = new Uint8Array(arr2x16.length * 2);
  for (var i = 0; i < arr2x16.length; i++) {
    let val = arr2x16[i];
    arr8[2 * i] = (val & 65280) >>> 8;
    arr8[2 * i + 1] = val & 255;
  }
  return arr8;
};

/**
 * Reverse of conv2x16To8Arr
 */
const conv8To2x16Arr = arr8 => {
  if (!(arr8 instanceof Uint8Array)) {
    throw "Input array can only be of type Uint8Array";
  }
  if (arr8.length % 4 !== 0) {
    throw "Input array must be multiple of 4's!";
  }
  var arr2x16 = new Uint16Array(arr8.length / 2);
  for (var i = 0; i < arr8.length; i += 2) {
    let val1 = arr8[i];
    let val2 = arr8[i + 1];
    arr2x16[i / 2] = (val1 << 8) | val2;
  }
  return arr2x16;
};

const byteArrPlusIV = charArr => {
  if (charArr.length % 2 !== 0) {
    throw "String byte array is not even!";
  }
  var iv = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    iv[i] = parseInt(charArr.splice(0, 2).join(""), 16);
  }
  var arr8 = aesjs.utils.hex.toBytes(charArr.join(""));
  return {
    iv: iv,
    arr8: arr8
  };
};

const pad16 = textBytes => {
  let pad = 16 - (textBytes.length % 16);
  let paddedTextBytes = new Uint8Array(textBytes.length + pad);
  for (let i = 0; i < pad; i++) {
    paddedTextBytes[i] = randByte();
  }
  for (let j = pad; j < paddedTextBytes.length; j++) {
    paddedTextBytes[j] = textBytes[j - pad];
  }
  return { pad: pad, bytes: paddedTextBytes };
};

const unpad = (pad, padded) => {
  let unpadded = new Uint8Array(padded.length - pad);
  for (let i = 0; i < unpadded.length; i++) {
    unpadded[i] = padded[pad + i];
  }
  return unpadded;
};

/**
 * Happily stolen from:
 * https://thekevinscott.com/emojis-in-javascript/
 * http://www.2ality.com/2013/09/javascript-unicode.html
 */
const toUTF16 = codePoint => {
  var tuple = new Uint16Array(2);
  if (codePoint <= 0xffff) {
    tuple[0] = 0;
    tuple[1] = codePoint;
    return tuple;
  }
  const TEN_BITS = parseInt("1111111111", 2);
  codePoint -= 0x10000;

  // Shift right to get to most significant 10 bits
  tuple[0] = 0xd800 + (codePoint >> 10); // leadSurrogate

  // Mask to get least significant 10 bits
  tuple[1] = 0xdc00 + (codePoint & TEN_BITS); // tailSurrogate
  return tuple;
};

// You know what this does
const randByte = () => {
  return Math.floor(Math.random() * 256);
};
const randByteInHex = () => {
  let byte = randByte();
  let hex = byte.toString(16);
  return (hex.length != 2 ? "0" : "") + hex;
};

/**
 * Generate random IV - initialization vector
 * fancy for "byte array of size 16"
 */
const ivGen = () => {
  var iv = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    iv[i] = randByte();
  }
  return iv;
};

const saltGen = () => {
  let salt = "";
  for (let i = 0; i < 8; i++) {
    salt += randByteInHex();
  }
  return salt;
};

// Exports
export default {
  encrypt: encrypt,
  decrypt: decrypt
};
