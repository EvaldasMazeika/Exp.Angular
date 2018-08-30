import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExpensesService } from '../../../../services/expenses.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { IRecord } from '../../../../models/IRecord.model';
import { Ng2IzitoastService } from 'ng2-izitoast';
import * as _ from 'lodash';
import { CommonDialog } from '../common-dialog';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'edit-record-dialog',
    templateUrl: './editRecordDialog.dialog.html'
})

// tslint:disable-next-line:component-class-suffix
export class EditRecordDialog implements OnInit {

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];
    commonDialog: CommonDialog;

    constructor(
        public dialogRef: MatDialogRef<EditRecordDialog>,
        private service: ExpensesService,
        public iziToast: Ng2IzitoastService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


    ngOnInit() {
        this.commonDialog = new CommonDialog(this.data);
        this.fields = this.data.form.items;
        this.options['formId'] = this.data.form._id;
        this.model = this.AdjustModel(this.data.record);
    }

    AdjustModel(record) {
        const tempModel = {};
        for (const key in record) {
            if (record.hasOwnProperty(key)) {
                const item = this.data.form.items.find(w => w.key === key);
                if (item != null && item.type === 'primeCalendar') {
                    tempModel[key] = new Date(record[key]);
                } else {
                    tempModel[key] = record[key];
                }
            }
        }
        return tempModel;
    }



    onCancelClick(): void {
        this.dialogRef.close();
    }

    async updateRecord() {
        if (this.form.valid === true) {
            const files = this.commonDialog.checkForFileUpload(this.model);
            const recordId = this.model._id;
            delete this.model['_id'];
            const record: IRecord = { formId: this.data.form._id, _id: recordId, body: this.model };

            const cb = await this.service.UpdateRecord(record).toPromise();

            if (Object.keys(files).length > 0) {
                this.uploadFiles(recordId, files);
            }

            const words = this.commonDialog.gatherWords(record);
            if (words.words.length > 0) {
                this.service.AddWordsToAutoDictionaries(words).subscribe();
            }
            this.dialogRef.close(cb);
            this.iziToast.success({ title: 'Record updated successfully' });
        } else {
            this.iziToast.error({ title: 'Couldn\'t update form' });
            this.dialogRef.close();
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
