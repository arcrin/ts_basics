import {decode, ExtensionCodec} from '@msgpack/msgpack'

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");

const encodeDate = (obj: any): Uint8Array | null => {
    if (obj instanceof Date) {
        const isoString: string = obj.toISOString();
        const binaryData: Uint8Array = textEncoder.encode(isoString);
        return binaryData;
    }
    return null;
}

const decodeDate = (data: Uint8Array): Date => {
    const isoString: string = textDecoder.decode(data);
    return new Date(isoString);
}

const datetimeCodec = new ExtensionCodec();
datetimeCodec.register({
    type: 1,
    encode: encodeDate,
    decode: decodeDate
})

function formatToISOStringWithOffset(date: Date): string {
    // Get date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Get microseconds (pad to ensure 6 digits)
    const microseconds = (date.getMilliseconds() * 1000).toString().padStart(6, '0');

    // Get timezone offset in ±HH:MM format
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');

    // Construct formatted string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${microseconds}${sign}${offsetHours}:${offsetMinutes}`;
}
// const data = {created_at: new Date()};

// const packedData: Uint8Array = encode(data, {extensionCodec: datetimeCodec});
// console.log("Packed Data: ", packedData);

// const unpackedData = decode(packedData, {extensionCodec: datetimeCodec});
// console.log("Unpacked Date: ", unpackedData);
// console.log("Original Date: ", (unpackedData as any).created_at.toISOString()); 

async function fetchDate() {
    try {
        const response = await fetch("http://localhost:5000/data", {
            method: "GET",
            headers: {
                "Accept": "application/x-msgpack"
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        console.log(arrayBuffer);
        const data: any = decode(new Uint8Array(arrayBuffer), {extensionCodec: datetimeCodec});

        console.log("Decoded data: ", data.created_at.toISOString());
        console.log(formatToISOStringWithOffset(data.created_at));
    } catch (error) {
        console.error("Error fetching or decoding data: ", error);
    }
}

fetchDate();