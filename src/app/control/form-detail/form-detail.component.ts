import { Component, OnInit } from '../../../../node_modules/@angular/core';
import { IProperty } from '../../models/IProperty.model';
import { IMyForm } from '../../models/IMyForm.model';
import { IAutoCompleteList } from '../../models/IAutoCompleteList';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from '../../../../node_modules/ng2-izitoast';
import { ITransferProperty } from '../../models/ITransferProperty';
import * as _ from 'lodash';

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
        const propertyCopy = _.cloneDeep(prop);

        this.selectedType = type;
        this.selectedProp = propertyCopy;
    }

    onAddOrUpdate(property: ITransferProperty) {
        if (property.isNew) {
            // if new add to array
            const isFound = this.form.items.find(w => w.key === property.model.key);
            if (isFound == null) {
                if (property.model.type === 'autocomplete') {
                    property.model.templateOptions.formId = this.form._id;
                    const listOfAutos: IAutoCompleteList = { formId: this.form._id, properties: [property.model.key] };
                    this.service.AddAutoCompletes(listOfAutos).subscribe();
                }
                this.form.items.push(property.model);
                this.service.UpdateForm(this.form).subscribe(() => {
                    this.selectedProp = null;
                    this.iziToast.success({ title: 'Form updated successfully' });

                });
            } else {
                this.iziToast.error({ title: 'Property with this key already exists' });
            }
        } else {
            // find index and update
            const updateItem = this.form.items.find(w => w.key === property.model.key);
            const index = this.form.items.indexOf(updateItem);
            this.form.items[index] = property.model;
            this.service.UpdateForm(this.form).subscribe(() => {
                this.selectedProp = null;
                this.iziToast.success({ title: 'Form updated successfully' });
            });
        }


    }

    onRemoved(prop: IProperty) {
        const index = this.form.items.findIndex(d => d.key === prop.key);
        this.form.items.splice(index, 1);
        this.service.UpdateForm(this.form).subscribe(() => {
            this.selectedProp = null;
            this.iziToast.success({ title: 'Form updated successfully' });
        });
    }

    // OLD STUFF
    // async onFormSubmit(form: any) {
    //     const localList = [];
    //     form.items.forEach(element => {
    //         if (element.type === 'autocomplete') {
    //             localList.push(element.key);
    //             element.templateOptions.formId = form._id;
    //         }
    //     });

    //     const isAdded: boolean = await this.service.UpdateForm(form).toPromise();

    //     if (isAdded) {
    //         this.iziToast.success({ title: 'Form updated successfully' });


    //         const listOfAutos: IAutoCompleteList = { formId: form._id, properties: localList };
    //         this.service.AddAutoCompletes(listOfAutos).subscribe();

    //     } else {
    //         this.iziToast.error({ title: 'Error occured while saving form' });
    //     }
    // }


}
