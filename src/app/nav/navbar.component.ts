import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ExpensesService } from '../services/expenses.service';
import { FormGroup } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TransferDataService } from '../services/trasnferData.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
})

export class NavbarComponent implements OnInit {

    form = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    constructor(public router: Router,
        private service: ExpensesService,
        protected localStorage: LocalStorage,
        private transfer: TransferDataService) { }


    selectId: string;

    fields: FormlyFieldConfig[] = [
        {
            key: 'Select',
            type: 'select',
            templateOptions: {
                label: 'Select form',
                required: false,
                options: this.service.getForms(), // TODO: need to fetch only names with ids
                valueProp: '_id',
                labelProp: 'name'
            },
        },
    ];

    ngOnInit() {
        this.localStorage.getItem('form').subscribe((res) => {
            if (res == null) {
                this.transfer.transferData(null);
            } else {
                this.selectId = res['formId'];
                this.model = { Select: this.selectId };
                this.transfer.transferData(this.selectId);
            }
        });
    }

    selectChange() {
        this.localStorage.setItem('form', { formId: this.model['Select'] }).subscribe(() => {
            this.selectId = this.model['Select'];
            this.transfer.transferData(this.selectId);
        });
    }
}
