import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { IMyForm } from '../../../models/IMyForm.model';
import { ExpensesService } from '../../../services/expenses.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'new-form-dialog',
    templateUrl: './newFormDialog.dialog.html'
})

// tslint:disable-next-line:component-class-suffix
export class NewFormDialog implements OnInit {

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
            },
            validators: {
                name: {
                    expression: (c) => !c.value || ( this.data && this.data.forms.find(x => x.name === c.value.trim()) == null),
                    message: (error, field: FormlyFieldConfig) => `title already exists`
                }
            }
        }
    ];

    constructor(
        public dialogRef: MatDialogRef<NewFormDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public iziToast: Ng2IzitoastService,
        private service: ExpensesService) { }

    ngOnInit() {
    }

    onCancelClick() {
        this.dialogRef.close();
    }

    async submit() {
        if (this.form.valid === true) {
            this.dialogRef.close(await this.addForm(this.model));
            this.iziToast.success({ title: 'Form added successfully' });
        } else {
            this.iziToast.error({ title: 'Couldn\'t save form' });
            this.dialogRef.close();
        }
    }

    async addForm(model: any) {
        const form: IMyForm = { name: model.title, items: [] };
        return await this.service.addForm(form).toPromise();
    }
}
