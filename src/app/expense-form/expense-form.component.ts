import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/Expense';
import { DataService } from '../services/data.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  expense: Expense = { body: []};

  model: any = {};
  fields: FormlyFieldConfig[];

  constructor(private data: DataService, private service: ExpensesService) {
    this.service.getFormByName('expenses').subscribe(res => this.fields = res[0].items);
  }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      this.expense.body = this.model;

      const savedExpense = await this.service.addExpense(this.expense).toPromise();

      this.data.TransferData(savedExpense);
      this.options.resetModel();
    }
  }
}
