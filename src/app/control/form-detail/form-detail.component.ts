import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IProperty } from '../../models/IProperty.model';
import { IMyForm } from '../../models/IMyForm.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { ITransferProperty } from '../../models/ITransferProperty';


@Component({
    templateUrl: './form-detail.component.html'
})

export class FormsDetailsComponent implements OnInit {
    selectedProperty: ITransferProperty;
    form: IMyForm;
    keysOfProperties: string[];

    constructor(
        private route: ActivatedRoute,
        private service: ExpensesService,
        public iziToast: Ng2IzitoastService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getFormDetails();
    }

    getFormDetails(): void {
        const id = this.route.snapshot.paramMap.get('_id');
        this.service.getForm(id).subscribe((form) => {
            if (form != null) {
                this.form = form;
                this.keysOfProperties = this.form.items.map(x => x.key);
            } else {
                this.router.navigate(['/404']);
            }

        });
    }

    onPropertySelect(isNew: boolean, prop: IProperty = {templateOptions: {}}) {
        if (isNew) {
            this.selectedProperty = {
                isNew: isNew,
                formId: this.form._id,
                model: _.cloneDeep(prop),
                keysOfProperties: this.keysOfProperties
            };
        } else {
            this.selectedProperty = {
                isNew: isNew,
                formId: this.form._id,
                model: _.cloneDeep(prop)
            };
        }
    }

    onAdded(property: IProperty) {
        this.form.items.push(property);
        this.selectedProperty = null;
        this.iziToast.success({ title: 'Property added successfully' });
    }

    onUpdated(property: IProperty) {
        const index = this.form.items.findIndex(w => w.key === property.key);
        this.form.items[index] = property;
        this.selectedProperty = null;
        this.iziToast.success({ title: 'Property updated successfully' });
    }

    onRemoved(prop: IProperty) {
        const index = this.form.items.findIndex(d => d.key === prop.key);
        this.form.items.splice(index, 1);
        this.selectedProperty = null;
        this.iziToast.success({ title: 'Property deleted successfully' });
    }
}
