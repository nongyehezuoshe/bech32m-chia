const bech32m=require("bech32m-chia");
// import {bech32m} from "bech32m-chia";

console.log(bech32m.encode("7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29"));
console.log(bech32m.encode("0x7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29"));
console.log(bech32m.encode("7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29","xch"));
console.log(bech32m.encode("7382e99e0679b68b6e8211c48224c99fc941a5f035bd85f9f32c4a8f48d3bb29","nft"));

console.log(bech32m.decode("xch1wwpwn8sx0xmgkm5zz8zgyfxfnly5rf0sxk7ct70n939g7jxnhv5smryxmv"));