"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const msgpack_1 = require("@msgpack/msgpack");
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");
const encodeDate = (obj) => {
    if (obj instanceof Date) {
        const isoString = obj.toISOString();
        const binaryData = textEncoder.encode(isoString);
        return binaryData;
    }
    return null;
};
const decodeDate = (data) => {
    const isoString = textDecoder.decode(data);
    return new Date(isoString);
};
const datetimeCodec = new msgpack_1.ExtensionCodec();
datetimeCodec.register({
    type: 1,
    encode: encodeDate,
    decode: decodeDate
});
function formatToISOStringWithOffset(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const microseconds = (date.getMilliseconds() * 1000).toString().padStart(6, '0');
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}${sign}${offsetHours}:${offsetMinutes}`;
}
function fetchDate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5000/data", {
                method: "GET",
                headers: {
                    "Accept": "application/x-msgpack"
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const arrayBuffer = yield response.arrayBuffer();
            console.log(arrayBuffer);
            const data = (0, msgpack_1.decode)(new Uint8Array(arrayBuffer), { extensionCodec: datetimeCodec });
            console.log("Decoded data: ", data.created_at.toISOString());
            console.log(formatToISOStringWithOffset(data.created_at));
        }
        catch (error) {
            console.error("Error fetching or decoding data: ", error);
        }
    });
}
fetchDate();
//# sourceMappingURL=msgpack_test.js.map