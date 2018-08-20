import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, ViewChild } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { IMyForm } from '../../models/IMyForm.model';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { EditRecordDialog } from './dialogs/edit-record/editRecordDialog.dialog';
import { IAutoCompleteWords } from '../../models/IAutoCompleteWords';
import { IKeyValuePair } from '../../models/IKeyValuePair';
import { IRecord } from '../../models/IRecord.model';
import { NewRecordDialog } from './dialogs/new-record/newRecordDialog.dialog';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'chosen-template',
    templateUrl: './chosen-template.component.html'
})

export class ChosenTemplateComponent implements OnChanges, OnInit {
    @Input() formId: any;
    form: IMyForm;

    localRecords: any[];
    displayedColumns: string[];
    columnsToDisplay: string[];
    dataSource = new MatTableDataSource();

    constructor(private service: ExpensesService, public iziToast: Ng2IzitoastService, public dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        const formId: SimpleChange = changes.formId;
        if (formId.currentValue != null) {
            this.getForm(formId.currentValue);
        }
    }

    isRawCode(column) {
        return this.form.items.find(x => x.key === column).type === 'fileInput' ? true : false;
    }

    GetRecords(formId: string) {
        const headers: string[] = [];
        const body: any[] = [];

       this.service.GetAllRecords(formId).subscribe((res) => {
            res.forEach(ele => {
                const temp: any = Object.assign({}, ele.body); // i do a copy of body only
                temp._id = ele._id; // adding id property to be able to edit/delete

                body.push(temp);
                for (const key in ele.body) { // creates headers array
                    if (headers.indexOf(key) === -1) {
                        headers.push(key);
                    }
                }
            });

            headers.push('actions');
            this.localRecords = body; // instanciate objects
            this.displayedColumns = headers;
            this.columnsToDisplay = this.displayedColumns.slice();
            this.dataSource.data = this.localRecords;
            this.dataSource.paginator = this.paginator;
       });
    }
    getForm(formId: string) {
        this.service.getForm(formId).subscribe((res) => {
            if (res == null) {
                this.formId = null;
            } else {
                this.form = res;
                this.GetRecords(formId);
            }
        });
    }

    openRecordDialog() {
        const dialogRef = this.dialog.open(NewRecordDialog, {
            width: '500px',
            data: { id: this.formId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {

                console.log(result);
                // foreach property if type is fileinput,
                // foreach array, construct form data, transform object
                // send form tada
                // send object
                // server: transform names to full urls sanve save them with comma separated

                // const words = this.GatherWords(result);

                // const record: IRecord = { formId: this.formId, body: result.value };
                // this.AddRecord(record, words);
            }
        });
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
