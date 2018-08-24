import { FileInput } from 'ngx-material-file-input';
import { IRecord } from '../../../models/IRecord.model';
import { IKeyValuePair } from '../../../models/IKeyValuePair';
import { IAutoCompleteWords } from '../../../models/IAutoCompleteWords';
import * as _ from 'lodash';

export class CommonDialog {

    constructor(private data: any) { }

    checkForFileUpload(record): any {
        const files = {};

        for (const key in record) {
            if (record.hasOwnProperty(key)) {
                if (record[key] instanceof FileInput) {
                    files[key] = _.cloneDeep(record[key]);

                    const names: string[] = [];
                    record[key].files.forEach(element => {
                        const name = `${element.name}`;
                        names.push(name);
                    });
                    record[key] = names;
                }
            }
        }
        return files;
    }

    gatherWords(result: IRecord) {
        const listOfWords: IKeyValuePair[] = [];
        this.data.form.items.forEach(element => {
            if (element.type === 'autocomplete' && result.body[element.key] != null) {
                listOfWords.push({ key: element.key, value: result.body[element.key].trim() });
            }
        });
        const words: IAutoCompleteWords = { formId: this.data.form._id, words: listOfWords };
        return words;
    }
}
