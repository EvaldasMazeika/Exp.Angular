import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../services/trasnferData.service';

@Component({
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    formId: any;

    constructor(private transfer: TransferDataService) {
    }

    ngOnInit() {
        this.transfer.currentData.subscribe(data => {
            if (data != null) {
                this.formId = data;
            }
        });
    }
}
