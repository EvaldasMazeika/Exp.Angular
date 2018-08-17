import { Component, Inject } from '../../../../../../node_modules/@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../../node_modules/@angular/material';
import { ExpensesService } from '../../../../services/expenses.service';
import { FormGroup } from '../../../../../../node_modules/@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '../../../../../../node_modules/@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'editRecord-dialog',
    templateUrl: './editRecordDialog.dialog.html'
})

// tslint:disable-next-line:component-class-suffix
export class EditRecordDialog {
    constructor(public dialogRef: MatDialogRef<EditRecordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private service: ExpensesService) {

        this.service.getForm(data.formId).subscribe(res => {
            this.fields = res.items;
        });

        this.service.GetRecord(data.id).subscribe(res => this.model = res.body);
    }

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
