import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TransferDataService } from '../services/trasnferData.service';

@Component({
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    formId: any;

    constructor(protected localStorage: LocalStorage, private transfer: TransferDataService) {
    }

    companies: any[] = [];
    loading = false;
    companiesNames = ['Miškas', 'Žalias', 'Flexigen'];

    // addTag(name) {
    //     alert(name);
    //     return { name: name, tag: true };
    // }


    ngOnInit() {
        this.companiesNames.forEach((c, i) => {
            this.companies.push({ id: i, name: c });
        });

        this.transfer.currentData.subscribe(data => {
            this.formId = data;
        });
    }
}
