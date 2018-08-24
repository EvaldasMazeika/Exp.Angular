import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { IMyForm } from '../../models/IMyForm.model';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { NewFormDialog } from './dialogs/newFormDialog.dialog';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'forms-list',
    templateUrl: './forms-list.component.html'
})

export class FormsListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    forms: IMyForm[];
    displayedColumns: string[] = ['name', 'action'];
    dataSource = new MatTableDataSource();
    isFormOpen = false;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 45 && !this.isFormOpen) {
            this.isFormOpen = true;
            this.openDialog();
        }
    }

    constructor(
        private service: ExpensesService,
        public iziToast: Ng2IzitoastService,
        public dialog: MatDialog,
        protected localStorage: LocalStorage) { }

    ngOnInit() {
        this.getForms();
        this.dataSource.paginator = this.paginator;
    }

    getForms(): void {
        this.service.getForms().subscribe((forms) => {
            this.forms = forms;
            this.dataSource.data = this.forms;
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewFormDialog, {
            width: '250px',
            data: { forms: this.forms }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.isFormOpen = false;

            if (result != null) {
                this.forms.push(result);
                this.dataSource.data = this.forms;
            }
        });
    }

    onDelete(ids: string) {
        this.service.DeleteForm(ids).subscribe(() => {
            const index = this.forms.findIndex(d => d._id === ids);
            this.forms.splice(index, 1);
            this.dataSource.data = this.forms;
            this.iziToast.success({ title: 'Form deleted successfully' });

            // check if it exists in localstorage, if then remove
            this.localStorage.getItem('form').subscribe((form) => {
                if (form['formId'] === ids) {
                    this.localStorage.removeItem('form').subscribe(() => { });
                }
            });

        });
    }
}
