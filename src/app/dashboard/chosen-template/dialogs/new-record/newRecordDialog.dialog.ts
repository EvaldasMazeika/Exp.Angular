import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExpensesService } from '../../../../services/expenses.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Ng2IzitoastService } from 'ng2-izitoast';
import * as _ from 'lodash';
import { IRecord } from '../../../../models/IRecord.model';
import { CommonDialog } from '../common-dialog';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'new-record-dialog',
    templateUrl: './newRecordDialog.dialog.html',

})

// tslint:disable-next-line:component-class-suffix
export class NewRecordDialog implements OnInit {

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];
    commonDialog: CommonDialog;
    isStarted = false;
    isLoading = false;

    constructor(
        public dialogRef: MatDialogRef<NewRecordDialog>,
        private service: ExpensesService,
        public iziToast: Ng2IzitoastService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        dialogRef.beforeClose().subscribe(() => this.clear());
    }

    clear() {
        this.form = new FormGroup({});
        this.model = {};
        this.fields = [];
    }

    ngOnInit() {
        this.isLoading = true;
        this.commonDialog = new CommonDialog(this.data);
        this.fields = this.data.form.items;
        this.options['formId'] = this.data.form._id;
        this.service.getLatestRecord(this.data.form._id).subscribe((res) => {
            if (res != null) {
                const tempModel = {};
                for (const key in res.body) {
                    if (res.body.hasOwnProperty(key)) {
                        const item = this.data.form.items.find(w => w.key === key);
                        if (item != null) {
                            if (item.type === 'primeCalendar' && res.body[key] != null) {
                                if (item.templateOptions.required && item.templateOptions.isPopulated === false) {
                                    tempModel[key] = new Date();
                                } else if (!item.templateOptions.required && !item.templateOptions.isPopulated) {
                                    tempModel[key] = null;
                                } else {
                                    tempModel[key] = new Date(res.body[key]);
                                }
                            } else if (item.templateOptions.isPopulated === true && item.type !== 'fileInput') {
                                tempModel[key] = res.body[key];
                            } else if (item.type === 'input' && item.defaultValue != null) {
                                tempModel[key] = item.defaultValue;
                            } else {
                                tempModel[key] = null;
                            }
                        }
                    }
                }
                this.model = tempModel;
            } else {
                const tempModel = {};

                this.fields.forEach(ele => {
                    if (ele.type === 'primeCalendar' && ele.templateOptions.required) {
                        tempModel[ele.key] = new Date();
                    }
                });
                this.model = tempModel;
            }

            this.isLoading = false;
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    async submitNewRecord() {
        if (this.form.valid === true && this.CheckForGroups()) {

            this.isStarted = true;
            const files = this.commonDialog.checkForFileUpload(this.model);
            const record: IRecord = { formId: this.data.form._id, body: this.model };

            const cb = await this.service.InsertRecord(this.data.form._id, record).toPromise();

            if (Object.keys(files).length > 0) {
                this.uploadFiles(cb._id, files);
            }

            const words = this.commonDialog.gatherWords(record);
            if (words.words.length > 0) {
                this.service.AddWordsToAutoDictionaries(this.data.form._id, words).subscribe();
            }
            this.dialogRef.close(cb);
            this.iziToast.success({ title: 'Record added successfully' });
        }
    }
    CheckForGroups(): boolean {
        const groups = {};
        let allGood = true;

        this.fields.forEach(element => {
            if (element.templateOptions.hasGroup) {
                if (!groups.hasOwnProperty(element.templateOptions.groupName)) {
                    groups[element.templateOptions.groupName] = [];
                }
                let item = this.model[element.key];
                if (item != null && item.trim().length === 0) {
                    item = null;

                }
                groups[element.templateOptions.groupName].push(item);
                const count = groups[element.templateOptions.groupName].filter(x => x != null);
                if (count.length > 1) {
                    allGood = false;
                }
            }
        });
        if (allGood) {
            return true;
        } else {
            this.iziToast.error({ title: `Only one input allowed per group` });
            return false;
        }
    }

    uploadFiles(recordId, files) {
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const formData: FormData = new FormData();
                files[key].files.forEach(element => {
                    formData.append(element.name, element);
                });
                this.service.UploadFiles(this.data.form._id, recordId, key, formData).subscribe();
            }
        }
    }
}
