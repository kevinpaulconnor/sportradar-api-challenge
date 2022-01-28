import { writeToBuffer } from '@fast-csv/format';

const generateCSVBuffer = (item: object) :Promise<Buffer> => {
    const rows = [item];
    return writeToBuffer(rows, {headers: true});
}

export default generateCSVBuffer;