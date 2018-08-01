import { Component, OnInit } from '@angular/core';
import { MyForm } from '../models/MyForm';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  newF: MyForm;

  constructor(private service: ExpensesService) { }

  ngOnInit() {
  }

  async createForm(newForm: string) {
    const tempForm: MyForm = { name: newForm, items: [] };

    const cb = await this.service.addForm(tempForm).toPromise();

    this.newF = cb;
  }

}
