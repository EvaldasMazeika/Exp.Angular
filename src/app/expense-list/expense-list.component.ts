import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/Expense';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: any[];
  message: string;

  async fillTable(): Promise<any> {
   this.expenses = await this.service.getExpenses().toPromise();
  }

  constructor(private service: ExpensesService, private data: DataService) { }

  ngOnInit() {
    this.fillTable();
    this.data.currentData.subscribe(data => {
      if (data != null && this.expenses != null) {
      this.expenses.push(data);
      }
    });
  }

}
