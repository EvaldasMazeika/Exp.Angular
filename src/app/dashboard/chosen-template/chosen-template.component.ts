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
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'chosen-template',
    templateUrl: './chosen-template.component.html',
    styleUrls: ['./chosen-template.component.css']

})

export class ChosenTemplateComponent implements OnChanges, OnInit {
    @Input() formId: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    isLoading = true;

    form: IMyForm;
    columnsToDisplay: string[];
    dataSource = new MatTableDataSource();
    labelsOfHeaders: any;
    tempDateFormat: any = {};
    isNewRecordFormOpen = false;
    rowsNumbers: any = {};
    selectListItems: string[];
    selectedOptions: string[];

    constructor(
        private service: ExpensesService,
        public iziToast: Ng2IzitoastService,
        public dialog: MatDialog,
        protected localStorage: LocalStorage
    ) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 45 && !this.isNewRecordFormOpen && (this.form != null && this.form.items.length > 0)) {
            this.isNewRecordFormOpen = true;
            this.openNewRecordDialog();
        }
    }

    async ngOnChanges(changes: SimpleChanges) {
        this.isLoading = true;

        this.form = null;
        this.columnsToDisplay = [];
        const localForm: SimpleChange = changes.formId;

        if (localForm.isFirstChange) {
            const result = await this.localStorage.getItem('form').toPromise();
            if (result != null) {
                this.form = await this.getForm(result.formId);
                if (this.form != null) {
                    await this.AttachRecords(await this.getRecords(result.formId));
                }
            }

        } else {
            this.form = await this.getForm(localForm.currentValue);
            if (this.form != null) {
                await this.AttachRecords(await this.getRecords(localForm.currentValue));
            }
        }

        this.isLoading = false;
    }

    async getForm(formId): Promise<IMyForm> {
        return await this.service.getForm(formId).toPromise();
    }

    async getRecords(formId): Promise<IRecord[]> {
        return await this.service.GetAllRecords(formId).toPromise();
    }

    openNewRecordDialog() {
        const dialogRef = this.dialog.open(NewRecordDialog, {
            width: '80%',
            data: { form: this.form }
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.isNewRecordFormOpen = false;
            if (result != null) {
                const temp: any = Object.assign({}, result.body);

                this.columnsToDisplay = this.adjustHeaders(temp);
                this.selectListItems = this.adjustHeaders(temp);
                this.selectedOptions = this.selectListItems.slice(1, this.selectListItems.length - 1);

                temp._id = result._id;
                if (this.dataSource.data.length > 0) {
                    this.rowsNumbers[temp._id] = this.rowsNumbers[this.dataSource.data[this.dataSource.data.length - 1]['_id']] + 1;
                } else {
                    this.rowsNumbers[temp._id] = 1;
                }

                this.dataSource.data.push(temp);
                this.dataSource._updateChangeSubscription();
            }
        });
    }

    openEditRecordDialog(recordId: string) {
        const dialogRef = this.dialog.open(EditRecordDialog, {
            width: '80%',
            data: {
                record: _.cloneDeep(this.dataSource.data.find(w => w['_id'] === recordId)),
                form: this.form
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                const temp: any = Object.assign({}, result.body);

                this.columnsToDisplay = this.adjustHeaders(temp);
                this.selectListItems = this.adjustHeaders(temp);
                this.selectedOptions = this.selectListItems.slice(1, this.selectListItems.length - 1);
                temp._id = result._id;

                const updateItem = this.dataSource.data.find(w => w['_id'] === result._id);
                const index = this.dataSource.data.indexOf(updateItem);
                this.dataSource.data[index] = temp;
                this.dataSource._updateChangeSubscription();
            }
        });
    }

    adjustHeaders(record): string[] {
        const headers: string[] = this.columnsToDisplay.slice();
        headers.shift();
        headers.pop(); // removes action header
        const properties = Object.getOwnPropertyNames(record);

        properties.forEach(element => {
            if (!headers.includes(element)) {
                headers.push(element);
                this.labelsOfHeaders[element] = this.form.items.find(w => w.key === element).templateOptions.label;
            }
        });
        headers.unshift('No');
        headers.push('actions');
        return headers;
    }

    async AttachRecords(records: IRecord[]) {
        this.columnsToDisplay = await this.SelectedColumns(records);
        this.dataSource.data = this.modifyRecords(records);
        this.dataSource.paginator = this.paginator;
    }

    async SelectedColumns(records: IRecord[]) {
        let ignoredColumns: string[] = await this.getIgoredColumns();
        const allHeaders = this.getHeaders(records);
        this.selectListItems = this.getHeaders(records);
        if (ignoredColumns == null) {
            ignoredColumns = [];
        }
        ignoredColumns.forEach((ele) => {
            const index = allHeaders.findIndex(w => w === ele);
            allHeaders.splice(index, 1);
        });

        this.selectedOptions = allHeaders.slice(1, allHeaders.length - 1);

        return allHeaders;
    }

    async getIgoredColumns() {
        const items = await this.localStorage.getItem(this.form.name).toPromise();
        return items;
    }

    modifyRecords(records: IRecord[]): any[] {
        const body: any[] = [];
        records.forEach((element, ind) => {
            const temp: any = Object.assign({}, element.body);
            temp._id = element._id;
            this.rowsNumbers[temp._id] = ind + 1; // row counter
            body.push(temp);
        });
        return body;
    }

    getHeaders(records: IRecord[]): string[] {
        const headers: string[] = ['No'];
        this.labelsOfHeaders = {};

        records.forEach(ele => {
            for (const key in ele.body) {
                if (headers.indexOf(key) === -1) {
                    headers.push(key);
                    const item = this.form.items.find(w => w.key === key);
                    if (item != null) {
                        this.labelsOfHeaders[key] = item.templateOptions.label;
                    } else {
                        this.labelsOfHeaders[key] = key;
                    }
                }
            }
        });
        headers.push('actions');
        return headers;
    }

    isColumnUrl(column: string): boolean {
        const item = this.form.items.find(x => x.key === column);
        if (item != null) {
            return item.type === 'fileInput' ? true : false;
        }
    }

    exportToExcel() {
        this.service.ExportTable(this.form._id).subscribe((res) => {
            importedSaveAs(res, `${this.form.name}.xlsx`);
        });
    }

    useTemplate($event) {
        if ($event.target.files.length > 0) {
            const formData: FormData = new FormData();
            formData.append($event.target.files[0].name, $event.target.files[0]);
            this.service.UseTemplate(this.form._id, formData).subscribe((res) => {
                importedSaveAs(res, `${this.form.name}.xlsx`);
                $event.target.value = null;
            });
        }
    }

    isDateType(column: string): boolean {
        const element = this.form.items.find(x => x.key === column);
        if (element != null && element.type === 'primeCalendar') {
            this.tempDateFormat[column] = element.templateOptions.dateFormat;
            return true;
        } else {
            return false;
        }
    }

    downloadFile(recordId, columnName, itemName) {
        this.service.DownloadFile(this.form._id, recordId, columnName, itemName).subscribe((res) => {
            importedSaveAs(res, itemName);
        });
    }

    onDelete(id: string) {
        this.service.DeleteRecord(this.form._id, id).subscribe(() => {
            const index = this.dataSource.data.findIndex(w => w['_id'] === id);
            if (index !== -1) {
                this.dataSource.data.splice(index, 1);
                this.dataSource._updateChangeSubscription();
                this.iziToast.success({ title: 'Record deleted successfully' });
            }
        });
    }

    async selectList($event) {
        let items: string[] = await this.getIgoredColumns();
        if (items == null) {
            items = [];
        }
        if ($event.option.selected) {
            const index = items.findIndex(w => w === $event.option.value);
            items.splice(index, 1);
            this.localStorage.setItem(this.form.name, items).subscribe();
            this.columnsToDisplay.pop();
            this.columnsToDisplay.push($event.option.value);
            this.columnsToDisplay.push('actions');
        } else {
            items.push($event.option.value);
            this.localStorage.setItem(this.form.name, items).subscribe();
            const tableIndex = this.columnsToDisplay.findIndex(w => w === $event.option.value);
            this.columnsToDisplay.splice(tableIndex, 1);
        }
    }
}
