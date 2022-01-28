import { writeToBuffer } from '@fast-csv/format';
import { Team } from './types';
import Express from 'express';

export const generateCSVBuffer = (item: object) :Promise<Buffer> => {
    const rows = [item];
    return writeToBuffer(rows, {headers: true});
}

export const respondWithAttachingFile = (contentBytes: Buffer, res: Express.Response, filename: string): void => {
    res.setHeader("Content-Type", `text/csv`);
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.status(200).end(contentBytes);
};

const generateAndServeCSV = (item :Team, res: Express.Response, filename: string) => {
    generateCSVBuffer(item).then(data => respondWithAttachingFile(data, res, filename));
}

export default generateAndServeCSV;