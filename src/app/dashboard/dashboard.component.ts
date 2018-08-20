import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TransferDataService } from '../services/trasnferData.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ExpensesService } from '../services/expenses.service';
import {saveAs as importedSaveAs} from 'file-saver';

@Component({
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    formId: any;

    constructor(protected localStorage: LocalStorage, private transfer: TransferDataService, private service: ExpensesService) {
    }

    // TEST PURPOSE
    form = new FormGroup({});
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[] = [
        {
            key: 'file',
            type: 'fileInput',
            templateOptions: {
              label: 'Type',
              required: false,
              placeholder: 'haha',
              isMultiFile: true
            }
          }
    ];

wad() {
    this.service.Test().subscribe((res) => {
        importedSaveAs(res, 'test.txt');
    });
}

    submit() {
        const bla = 'sf';
        const formData: FormData = new FormData();

        for (const fila of this.form.value.file._files) {
            formData.append(fila.name, fila);
        }


        formData.append('sf', 'ss');

        this.service.TestBoi(formData).subscribe();
        console.log(formData);
    }

    // END OF TEST PURPOSE
    ngOnInit() {
        this.transfer.currentData.subscribe(data => {
            this.formId = data;
        });
    }
}
