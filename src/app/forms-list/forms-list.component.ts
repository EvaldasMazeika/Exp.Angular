import { Component, OnInit, Input } from '@angular/core';
import { MyForm } from '../models/MyForm';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  selectedForm: any;
  forms: MyForm[];

  @Input()
  set newForm(newForm: MyForm) {
    if (this.forms != null) {
    this.forms.push(newForm);
    }
  }
  getForms(): void {
    this.service.getForms().subscribe(forms => this.forms = forms);

  }

  constructor(private service: ExpensesService) { }

  ngOnInit() {
    this.getForms();
  }

  onSelectForm(form: any) {
    this.selectedForm = form;
  }

  onDelete(ids: string) {
    this.service.DeleteForm(ids).subscribe(() => {
      const index = this.forms.findIndex(d => d._id === ids);
      this.forms.splice(index, 1);
    });

  }

}
