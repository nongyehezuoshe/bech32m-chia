# chia_bech32m for nodejs

A BIP350 compatible Bech32m encoding/decoding library for chia.

## install

```bash
npm install bech32m-chia --save
```

## Use

### import

> ES module:
```nodejs
import {bech32m} from "bech32m-chia";
```

> CommonJS:
```nodejs
const bech32m=require("bech32m-chia");
```

### Example
```nodejs
console.log(bech32m.encode("7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29","xch"))
console.log(bech32m.encode("0x7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29","xch"))
console.log(bech32m.encode("7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29",""))
console.log(bech32m.encode("7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29","nft"))
# xch1wwpwn8sx0xmgkm5zz8zgyfxfnly5rf0sxk7ct70n939g7jxnhv5smryxmv
# xch1wwpwn8sx0xmgkm5zz8zgyfxfnly5rf0sxk7ct70n939g7jxnhv5smryxmv
# xch1wwpwn8sx0xmgkm5zz8zgyfxfnly5rf0sxk7ct70n939g7jxnhv5smryxmv
# nft1wwpwn8sx0xmgkm5zz8zgyfxfnly5rf0sxk7ct70n939g7jxnhv5sam5p80
```

```nodejs
console.log(bech32m.decode("xch1wwpwn8sx0xmgkm5zz8zgyfxfnly5rf0sxk7ct70n939g7jxnhv5smryxmv"))
# 7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29
```

## Support
XCH: `xch1crwg0ryz5rf90a6xmmspza2jmhc437sllnen8m7nu2dlx7ugjs9qaxgyjw`

pawket: `hezuoshe.xch`