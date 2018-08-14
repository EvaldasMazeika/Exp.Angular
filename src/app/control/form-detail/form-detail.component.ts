import { Component, OnInit } from '../../../../node_modules/@angular/core';
import { IProperty } from '../../models/IProperty.model';
import { IMyForm } from '../../models/IMyForm.model';
import { IAutoCompleteList } from '../../models/IAutoCompleteList';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from '../../../../node_modules/ng2-izitoast';

@Component({
    templateUrl: './form-detail.component.html'
})

export class FormsDetailsComponent implements OnInit {
    selectedProp: IProperty;
    selectedType: boolean;
    form: IMyForm;

    constructor(private route: ActivatedRoute, private service: ExpensesService, public iziToast: Ng2IzitoastService) { }

    ngOnInit() {
        this.getFormDetails();
    }

    getFormDetails(): void {
        const id = this.route.snapshot.paramMap.get('_id');
        this.service.getForm(id).subscribe(form => this.form = form);
    }

    onSelectProp(prop: IProperty, type: boolean) {
        this.selectedType = type;
        this.selectedProp = prop;
    }

    async onFormSubmit(form: any) {
        const localList = [];
        form.items.forEach(element => {
            if (element.type === 'autocomplete') {
                localList.push(element.key);
                element.templateOptions.formId = form._id;
            }
        });

         const isAdded: boolean = await this.service.UpdateForm(form).toPromise();

        if (isAdded) {
            this.iziToast.success({title: 'Form updated successfully'});


            const listOfAutos: IAutoCompleteList = { formId: form._id, properties: localList};
            this.service.AddAutoCompletes(listOfAutos).subscribe();

        } else {
            this.iziToast.error({title: 'Error occured while saving form'});
        }
    }

    onAdded(prop: IProperty) {
        const isFound = this.form.items.find(w => w.key === prop.key);
        if (isFound == null) {
            this.form.items.push(prop);
            this.selectedProp = null;
        } else {
            this.iziToast.error({title: 'Property with this key already exists'});
        }
    }

    onRemoved(prop: any) {
        const index = this.form.items.findIndex(d => d.key === prop.key);
        this.form.items.splice(index, 1);
        this.selectedProp = null;
    }
}
