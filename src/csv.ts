import { writeToString } from '@fast-csv/format';

const generateCSV = () => {
    const rows = [
        {
            teamName: "Texas",
            anotherKey: "another key data",
            mySon: "Paul"
        }
    ];
    writeToString(rows, {headers: true}).then(data => console.log(data));
}

export default generateCSV;