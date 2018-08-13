import { Component, OnInit, ViewChild } from '../../../../node_modules/@angular/core';
import { IMyForm } from '../../models/IMyForm.model';
import { MatTableDataSource, MatDialog, MatPaginator } from '../../../../node_modules/@angular/material';
import { ExpensesService } from '../../services/expenses.service';
import { Ng2IzitoastService } from '../../../../node_modules/ng2-izitoast';
import { NewFormDialog } from './dialogs/newFormDialog.dialog';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'forms-list',
    templateUrl: './forms-list.component.html'
})

export class FormsListComponent implements OnInit {
    forms: IMyForm[];
    displayedColumns: string[] = ['name', 'action'];

    dataSource = new MatTableDataSource();

    constructor(private service: ExpensesService, public iziToast: Ng2IzitoastService, public dialog: MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;
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
            width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.TryAddForm(result.value);
            }
        });
    }

    TryAddForm(result) {
        const title: string = result.title;
        const isFound = this.forms.find(x => x.name === title.trim());
        if (isFound != null) {
            this.iziToast.error({ title: 'Form already exists' });
        } else {
            this.AddForm(title.trim());
        }
    }

    AddForm(title) {
        const form: IMyForm = { name: title, items: [] };
        this.service.addForm(form).subscribe((cb) => {
            this.forms.push(cb);
            this.dataSource.data = this.forms;
            this.iziToast.success({ title: 'Form added successfully' });
        });
    }

    onDelete(ids: string) {
        this.service.DeleteForm(ids).subscribe(() => {
            const index = this.forms.findIndex(d => d._id === ids);
            this.forms.splice(index, 1);
            this.dataSource.data = this.forms;
            this.iziToast.success({ title: 'Form deleted successfully' });
        });
    }
}
