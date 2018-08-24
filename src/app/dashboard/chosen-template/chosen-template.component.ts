import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, ViewChild, HostListener } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { IMyForm } from '../../models/IMyForm.model';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { EditRecordDialog } from './dialogs/edit-record/editRecordDialog.dialog';
import { IRecord } from '../../models/IRecord.model';
import { NewRecordDialog } from './dialogs/new-record/newRecordDialog.dialog';
import * as _ from 'lodash';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'chosen-template',
    templateUrl: './chosen-template.component.html'

})

export class ChosenTemplateComponent implements OnChanges, OnInit {
    @Input() formId: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    form: IMyForm;
    columnsToDisplay: string[];
    dataSource = new MatTableDataSource();
    labelsOfHeaders: any;
    tempDateFormat: any = {};
    isNewRecordFormOpen = false;

    constructor(
        private service: ExpensesService,
        public iziToast: Ng2IzitoastService,
        public dialog: MatDialog
    ) { }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
     }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 45 && !this.isNewRecordFormOpen) {
            this.isNewRecordFormOpen = true;
            this.openNewRecordDialog();
        }
    }

    async ngOnChanges(changes: SimpleChanges) {
        this.columnsToDisplay = [];
        const formId: SimpleChange = changes.formId;
        if (formId.currentValue != null) {
            this.form = await this.getForm(formId.currentValue);
            if (this.form != null) {
                this.AttachRecords(await this.getRecords(formId.currentValue));
            }
        }
    }

    async getForm(formId): Promise<IMyForm> {
        return await this.service.getForm(formId).toPromise();
    }

    async getRecords(formId): Promise<IRecord[]> {
        return await this.service.GetAllRecords(formId).toPromise();
    }

    openNewRecordDialog() {
        const dialogRef = this.dialog.open(NewRecordDialog, {
            width: '500px',
            data: { form: this.form },
            panelClass: 'mytest-overflow'
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.isNewRecordFormOpen = false;

            if (result != null) {
                const temp: any = Object.assign({}, result.body);

                this.columnsToDisplay = this.adjustHeaders(temp);

                temp._id = result._id;
                this.dataSource.data.push(temp);
                this.dataSource._updateChangeSubscription();
            }
        });
    }

    openEditRecordDialog(recordId: string) {
        const dialogRef = this.dialog.open(EditRecordDialog, {
            width: '500px',
            data: {
                record: _.cloneDeep(this.dataSource.data.find(w => w['_id'] === recordId)),
                form: this.form
            },
            panelClass: 'mytest-overflow'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                const temp: any = Object.assign({}, result.body);

                this.columnsToDisplay = this.adjustHeaders(temp);
                temp._id = result._id;

                const updateItem = this.dataSource.data.find(w => w['_id'] === result._id);
                const index = this.dataSource.data.indexOf(updateItem);
                this.dataSource.data[index] = temp;
                this.dataSource._updateChangeSubscription();
            }
        });
    }

    adjustHeaders(record): string[] {
        const headers: string[] = this.columnsToDisplay;
        headers.pop(); // removes action header
        const properties = Object.getOwnPropertyNames(record);

        properties.forEach(element => {
            if (!headers.includes(element)) {
                headers.push(element);
                this.labelsOfHeaders[element] = this.form.items.find(w => w.key === element).templateOptions.label;
            }
        });
        headers.push('actions');
        return headers;
    }

    AttachRecords(records: IRecord[]): void {
        this.columnsToDisplay = this.getHeaders(records);
        this.dataSource.data = this.modifyRecords(records);
        console.log(this.paginator);
        this.dataSource.paginator = this.paginator;
    }

    modifyRecords(records: IRecord[]): any[] {
        const body: any[] = [];
        records.forEach((element) => {
            const temp: any = Object.assign({}, element.body);
            temp._id = element._id;
            body.push(temp);
        });
        return body;
    }

    getHeaders(records: IRecord[]): string[] {
        const headers: string[] = [];
        this.labelsOfHeaders = {};

        records.forEach(ele => {
            for (const key in ele.body) {
                if (headers.indexOf(key) === -1) {
                    headers.push(key);
                    this.labelsOfHeaders[key] = this.form.items.find(w => w.key === key).templateOptions.label;
                }
            }
        });
        headers.push('actions');
        return headers;
    }

    isColumnUrl(column: string): boolean {
        return this.form.items.find(x => x.key === column).type === 'fileInput' ? true : false;
    }

    exportToExcel() {
        alert('i lied');
    }

    isDateType(column: string): boolean {
        const element = this.form.items.find(x => x.key === column);
        if (element.type === 'customDatePicker') {
            this.tempDateFormat[column] = element.templateOptions.dateFormat;
            return true;
        } else {
            return false;
        }
    }

    download(recordId, columnName, itemName) {
        this.service.DownloadFile(this.formId, recordId, columnName, itemName).subscribe((res) => {
            importedSaveAs(res, itemName);
        });
    }

    onDelete(id: string) {
        this.service.DeleteRecord(this.formId, id).subscribe(() => {
            const index = this.dataSource.data.findIndex(w => w['_id'] === id);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.iziToast.success({ title: 'Record deleted successfully' });
        });
    }
}
