import Express from 'express';

class StatsAPIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StatsAPIError"; 
    }
}

export const respondWithAttachingFile = (contentBytes: Buffer, res: Express.Response, filename: string): void => {
    res.setHeader("Content-Type", `text/csv`);
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.status(200).end(contentBytes);
};


export default StatsAPIError;