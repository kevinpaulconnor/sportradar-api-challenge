class StatsAPIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StatsAPIError"; 
    }
}

export default StatsAPIError;