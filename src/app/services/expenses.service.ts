import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyForm } from '../models/MyForm';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>('https://localhost:44379/api/Expenses/expenses', expense, httpOptions);
  }
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>('https://localhost:44379/api/Expenses/expenses');
  }
  getFormByName(name: string): Observable<MyForm> {
    return this.http.get<MyForm>(`https://localhost:44379/api/Form/form?name=${name}`);
  }
  DeleteForm(id: string): any {
    return this.http.delete<boolean>(`https://localhost:44379/api/Form/form/${id}`);
  }
  UpdateForm(form: MyForm) {
    return this.http.put<boolean>('https://localhost:44379/api/Form/form', form, httpOptions);
  }
  getForm(id: string): Observable<MyForm> {
    return this.http.get<MyForm>(`https://localhost:44379/api/Form/form/${id}`);
  }
  addForm(form: MyForm): Observable<MyForm> {
    return this.http.post<MyForm>('https://localhost:44379/api/Form/form', form, httpOptions);
  }

  getForms(): Observable<MyForm[]> {
    return this.http.get<MyForm[]>('https://localhost:44379/api/Form/form');
  }


  constructor(private http: HttpClient) { }
}
