const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const ALPHABET_MAP = {};
let ENCODING_CONST=0x2bc830a3;
for (let z = 0; z < ALPHABET.length; z++) {
    const x = ALPHABET.charAt(z);
    ALPHABET_MAP[x] = z;
}
function polymodStep(pre) {
    const b = pre >> 25;
    return (((pre & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3));
}
function prefixChk(prefix) {
    let chk = 1;
    for (let i = 0; i < prefix.length; ++i) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            return 'Invalid prefix (' + prefix + ')';
        chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);
    for (let i = 0; i < prefix.length; ++i) {
        const v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk;
}
function convert(data, inBits, outBits, pad) {
    let value = 0;
    let bits = 0;
    const maxV = (1 << outBits) - 1;
    const result = [];
    for (let i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;
        while (bits >= outBits) {
            bits -= outBits;
            result.push((value >> bits) & maxV);
        }
    }
    if (pad) {
        if (bits > 0) {
            result.push((value << (outBits - bits)) & maxV);
        }
    }
    else {
        if (bits >= inBits)
            return 'Excess padding';
        if ((value << (outBits - bits)) & maxV)
            return 'Non-zero padding';
    }
    return result;
}
function bech32mPre(str){
	str=str.trim();
	str=str.toString().toLowerCase();
	str=str.substr(0,2)=="0x"?str.substr(2):str;
	str=new Buffer.from(str.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
	return convert(str, 8, 5, true);
}
function encode(words, prefix, LIMIT) {
    LIMIT = LIMIT || 90;
    prefix = prefix || "xch";
    words=bech32mPre(words);
    if (prefix.length + 7 + words.length > LIMIT)
        throw new TypeError('Exceeds length limit');
    prefix = prefix.toLowerCase();
    // determine chk mod
    let chk = prefixChk(prefix);
    if (typeof chk === 'string')
        throw new Error(chk);
    let result = prefix + '1';
    for (let i = 0; i < words.length; ++i) {
        const x = words[i];
        if (x >> 5 !== 0)
            throw new Error('Non 5-bit word');
        chk = polymodStep(chk) ^ x;
        result += ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
        chk = polymodStep(chk);
    }
    chk ^= ENCODING_CONST;
    for (let i = 0; i < 6; ++i) {
        const v = (chk >> ((5 - i) * 5)) & 0x1f;
        result += ALPHABET.charAt(v);
    }
    return result;
}
function decode(str, LIMIT) {
    LIMIT = LIMIT || 90;
    if (str.length < 8)
        return str + ' too short';
    if (str.length > LIMIT)
        return 'Exceeds length limit';
    // don't allow mixed case
    const lowered = str.toLowerCase();
    const uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered)
        return 'Mixed-case string ' + str;
    str = lowered;
    const split = str.lastIndexOf('1');
    if (split === -1)
        return 'No separator character for ' + str;
    if (split === 0)
        return 'Missing prefix for ' + str;
    const prefix = str.slice(0, split);
    const wordChars = str.slice(split + 1);
    if (wordChars.length < 6)
        return 'Data too short';
    let chk = prefixChk(prefix);
    if (typeof chk === 'string')
        return chk;
    const words = [];
    for (let i = 0; i < wordChars.length; ++i) {
        const c = wordChars.charAt(i);
        const v = ALPHABET_MAP[c];
        if (v === undefined)
            return 'Unknown character ' + c;
        chk = polymodStep(chk) ^ v;
        // not in the checksum?
        if (i + 6 >= wordChars.length)
            continue;
        words.push(v);
    }
    if (chk !== ENCODING_CONST)
        return 'Invalid checksum for ' + str;

    return (new Buffer.from(convert(words, 5, 8, false))).toString("hex");
}
function bech32m() {
    return {
        decode,
        encode
    };
}

let _export=bech32m()
export {_export as bech32m}