class StatsAPIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StatsAPIError"; 
    }
}
export class DataParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataParseError"; 
    }
}

export const filenameGenerator = (id: string, seasonId: string) => {
    return `${seasonId}-${id}.csv`;
}

export default StatsAPIError;