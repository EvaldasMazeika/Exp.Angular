import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExpensesService } from '../../../../services/expenses.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'newRecord-dialog',
    templateUrl: './newRecordDialog.dialog.html'
})

// tslint:disable-next-line:component-class-suffix
export class NewRecordDialog {
    constructor(public dialogRef: MatDialogRef<NewRecordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private service: ExpensesService) {

        this.service.getForm(data.id).subscribe(res => {
            this.fields = res.items;
        });
    }

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
