import { Component, OnChanges, OnInit, Input, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { IMyForm } from '../../models/IMyForm.model';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { NewRecordDialog } from './dialogs/new-record/newRecordDialog.dialog';
import { IRecord } from '../../models/IRecord.model';
import { EditRecordDialog } from './dialogs/edit-record/editRecordDialog.dialog';
import { IKeyValuePair } from '../../models/IKeyValuePair';
import { IAutoCompleteWords } from '../../models/IAutoCompleteWords';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'active-template',
    templateUrl: './active-template.component.html'
})

export class ActiveTemplateComponent implements OnChanges, OnInit {
    @Input() formId: any;

    form: IMyForm;
    localRecords: any[];

    displayedColumns: string[];
    columnsToDisplay: string[];
    dataSource = new MatTableDataSource();

    constructor(public dialog: MatDialog, private service: ExpensesService, public iziToast: Ng2IzitoastService) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const formId: SimpleChange = changes.formId;
        if (formId.currentValue != null) {
            this.GetRecords(formId.currentValue);
            this.getForm(formId.currentValue); // use this form instead of calling again
        }

    }

    getForm(id: string) {
        this.service.getForm(id).subscribe((res) => {
            this.form = res;
        });
    }

    openRecordDialog() {
        const dialogRef = this.dialog.open(NewRecordDialog, {
            width: '500px',
            data: { id: this.formId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {


                const words = this.GatherWords(result);

                const record: IRecord = { formId: this.formId, body: result.value };
                this.AddRecord(record, words);
            }
        });
    }
    GatherWords(result: any): IAutoCompleteWords {
        const listOfWords: IKeyValuePair[] = [];
        this.form.items.forEach(element => {
            if (element.type === 'autocomplete' && result.value[element.key] != null) {
                listOfWords.push({ key: element.key, value: result.value[element.key].trim() });
            }
        });
        const words: IAutoCompleteWords = { formId: this.formId, words: listOfWords };
        return words;
    }

    AddRecord(record: IRecord, words: IAutoCompleteWords): void {
        this.service.InsertRecord(record).subscribe((result) => {

            const temp: any = Object.assign({}, result.body);

            // check if headers exists
            const headers: string[] = this.displayedColumns;
            headers.pop();
            const lul = Object.getOwnPropertyNames(temp);

            lul.forEach(element => {
                if (!headers.includes(element)) {
                    headers.push(element);
                }
            });


            headers.push('actions');
            this.displayedColumns = headers;
            this.columnsToDisplay = this.displayedColumns.slice();
            // end

            temp._id = result._id;

            this.localRecords.push(temp);
            this.dataSource.data = this.localRecords;
            this.iziToast.success({ title: 'Record added successfully' });

            this.service.AddWordsToAutoDictionaries(words).subscribe();
        });
    }


    GetRecords(id: string) {
        const headers: string[] = [];
        const body: any[] = [];

        this.service.GetAllRecords(id).subscribe((result) => {

            result.forEach(element => {
                const temp: any = Object.assign({}, element.body);
                temp._id = element._id;
                body.push(temp);

                // tslint:disable-next-line:forin
                for (const key in element.body) {
                    if (headers.indexOf(key) === -1) {
                        headers.push(key);
                    }
                }
            });

            headers.push('actions');
            this.localRecords = body;

            this.displayedColumns = headers;
            this.columnsToDisplay = this.displayedColumns.slice();
            this.dataSource.data = this.localRecords;
            this.dataSource.paginator = this.paginator;
        });
    }

    onDelete(id: string) {
        this.service.DeleteRecord(id).subscribe(() => {
            const index = this.localRecords.findIndex(d => d._id === id);
            this.localRecords.splice(index, 1);
            this.dataSource.data = this.localRecords;
            this.iziToast.success({ title: 'Record deleted successfully' });
        });
    }

    onEdit(id: string) {
        const dialogRef = this.dialog.open(EditRecordDialog, {
            width: '500px',
            data: { id: id, formId: this.formId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                const words = this.GatherWords(result);
                this.TryUpdateRecord(result.value, id, words);
            }
        });
    }


    TryUpdateRecord(record, id: string, words: IAutoCompleteWords) {
        const temp: IRecord = { formId: this.formId, _id: id, body: record };

        this.service.UpdateRecord(temp).subscribe((res) => {
            const local: any = Object.assign({}, res.body);

            // check if headers exists
            const headers: string[] = this.displayedColumns;
            headers.pop();
            const lul = Object.getOwnPropertyNames(local);

            lul.forEach(element => {
                if (!headers.includes(element)) {
                    headers.push(element);
                }
            });


            headers.push('actions');
            this.displayedColumns = headers;
            this.columnsToDisplay = this.displayedColumns.slice();
            // end


            local._id = res._id;

            const updateItem = this.localRecords.find(w => w._id === res._id);
            const index = this.localRecords.indexOf(updateItem);
            this.localRecords[index] = local;

            this.dataSource.data = this.localRecords;
            this.iziToast.success({ title: 'Record updated successfully' });

            this.service.AddWordsToAutoDictionaries(words).subscribe();
        });

    }

}
