import {encode, decode, ExtensionCodec} from "@msgpack/msgpack"

const extensionCodec = new ExtensionCodec;

const SET_EXT_TYPE = 0;
extensionCodec.register({
    type: SET_EXT_TYPE,
    encode: (object: unknown): Uint8Array | null => {
        if (object instanceof Set) {
            return encode([...object], {extensionCodec});
        } else {
            return null;
        }
    },
    decode: (data: Uint8Array) => {
        const array = decode(data, {extensionCodec}) as Array<unknown>;
        return new Set(array);
    },
});

const MAP_EXT_TYPE = 1;
extensionCodec.register({
   type: MAP_EXT_TYPE,
   encode: (object: unknown): Uint8Array | null => {
    if (object instanceof Map) {
        return encode([...object], {extensionCodec});
    } else {
        return null;
    }
   }, 
   decode: (data: Uint8Array) => {
    const array = decode(data, {extensionCodec}) as Array<[unknown, unknown]>;
    return new Map(array);
   },
});

const tempSet = new Set<any>();
tempSet.add(1);
tempSet.add(2);
tempSet.add(3);
tempSet.add(4);
tempSet.add(5);

const tempMap = new Map<any, any>();
tempMap.set("name", "Alice");
tempMap.set(1, "one");
tempMap.set(true, "boolean key");
const encoded = encode([tempSet, tempMap], {extensionCodec});
const decoded = decode(encoded, {extensionCodec});

console.log(encoded);
console.log(decoded);