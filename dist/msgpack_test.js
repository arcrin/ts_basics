"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msgpack_1 = require("@msgpack/msgpack");
const extensionCodec = new msgpack_1.ExtensionCodec;
const SET_EXT_TYPE = 0;
extensionCodec.register({
    type: SET_EXT_TYPE,
    encode: (object) => {
        if (object instanceof Set) {
            return (0, msgpack_1.encode)([...object], { extensionCodec });
        }
        else {
            return null;
        }
    },
    decode: (data) => {
        const array = (0, msgpack_1.decode)(data, { extensionCodec });
        return new Set(array);
    },
});
const MAP_EXT_TYPE = 1;
extensionCodec.register({
    type: MAP_EXT_TYPE,
    encode: (object) => {
        if (object instanceof Map) {
            return (0, msgpack_1.encode)([...object], { extensionCodec });
        }
        else {
            return null;
        }
    },
    decode: (data) => {
        const array = (0, msgpack_1.decode)(data, { extensionCodec });
        return new Map(array);
    },
});
const tempSet = new Set();
tempSet.add(1);
tempSet.add(2);
tempSet.add(3);
tempSet.add(4);
tempSet.add(5);
const tempMap = new Map();
tempMap.set("name", "Alice");
tempMap.set(1, "one");
tempMap.set(true, "boolean key");
const encoded = (0, msgpack_1.encode)([tempSet, tempMap], { extensionCodec });
const decoded = (0, msgpack_1.decode)(encoded, { extensionCodec });
console.log(encoded);
console.log(decoded);
//# sourceMappingURL=msgpack_test.js.map