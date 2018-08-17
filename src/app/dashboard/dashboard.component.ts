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


    ngOnInit() {
        this.transfer.currentData.subscribe(data => {
            this.formId = data;
            // if (data != null) {
            //     this.formId = data;
            // }
        });
    }
}
