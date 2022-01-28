import generateCSVBuffer from '../../src/csv';

describe('generateCSV', () => {
    it('generatesCSV Buffer from object', async () => {
        return generateCSVBuffer({
            a: 1,
            b: 2,
            c: 3
        }).then(data => {
            expect(data).toBeInstanceOf(Buffer);
            expect(data.toString()).toEqual('a,b,c\n1,2,3')
        });
    });
    it('generatesCSVBuffer from empty object', async () => {
        return generateCSVBuffer({}).then(
            data => expect(data.toString()).toEqual('\n'));
    });
});