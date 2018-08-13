import { Component } from '../../../../../node_modules/@angular/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';
import { FormGroup } from '../../../../../node_modules/@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '../../../../../node_modules/@ngx-formly/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'newForm-dialog',
    templateUrl: './newFormDialog.dialog.html'
})

// tslint:disable-next-line:component-class-suffix
export class NewFormDialog {
    constructor(public dialogRef: MatDialogRef<NewFormDialog>) { }

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};

    fields: FormlyFieldConfig[] = [
        {
            key: 'title',
            type: 'input',
            templateOptions: {
                label: 'Title',
                placeholder: 'Title of form',
                required: true,
                minLength: 4,
            }
        }
    ];

    onCancelClick() {
        this.dialogRef.close();
    }

}
