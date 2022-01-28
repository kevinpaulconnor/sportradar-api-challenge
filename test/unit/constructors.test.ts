import teamConstructor from '../../src/constructors';
import { DataParseError } from '../../src/utilities';

describe('teamConstructor', () => {
    it('throws DataParseError on malformed object', async () => {
        expect(() => teamConstructor({badObject: 'blah'})).toThrow(DataParseError)
    }); 
});