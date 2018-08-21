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


// wad() {
//     this.service.Test().subscribe((res) => {
//         importedSaveAs(res, 'test.txt');
//     });
// }

    ngOnInit() {
        this.transfer.currentData.subscribe(data => {
            this.formId = data;
        });
    }
}
