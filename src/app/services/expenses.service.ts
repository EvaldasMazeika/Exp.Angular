import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMyForm } from '../models/IMyForm.model';
import { IRecord } from '../models/IRecord.model';
import { IAutoCompleteList } from '../models/IAutoCompleteList';
import { IAutoComplete } from '../models/IAutoComplete';
import { IAutoCompleteWords } from '../models/IAutoCompleteWords';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  AddWordsToAutoDictionaries(words: IAutoCompleteWords): any {
    return this.http.post('https://localhost:44379/api/Records/autocomplete', words, httpOptions);
  }

  AddAutoCompletes(autos: IAutoCompleteList): any {
    return this.http.post('https://localhost:44379/api/Form/autocompletes', autos, httpOptions);
  }

  GetAutoComplete(formId: string, propertyKey: string): Observable<IAutoComplete> {
    return this.http.get<IAutoComplete>(`https://localhost:44379/api/Form/autocompletes/${formId}/${propertyKey}`);
  }

  getFormByName(name: string): Observable<IMyForm> {
    return this.http.get<IMyForm>(`https://localhost:44379/api/Form/form?name=${name}`);
  }
  DeleteForm(id: string): any {
    return this.http.delete<boolean>(`https://localhost:44379/api/Form/form/${id}`);
  }
  UpdateForm(form: IMyForm) {
    return this.http.put<boolean>('https://localhost:44379/api/Form/form', form, httpOptions);
  }
  getForm(id: string): Observable<IMyForm> {
    return this.http.get<IMyForm>(`https://localhost:44379/api/Form/form/${id}`);
  }
  addForm(form: IMyForm): Observable<IMyForm> {
    return this.http.post<IMyForm>('https://localhost:44379/api/Form/form', form, httpOptions);
  }

  getForms(): Observable<IMyForm[]> {
    return this.http.get<IMyForm[]>('https://localhost:44379/api/Form/form');
  }


  GetAllRecords(id: string): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(`https://localhost:44379/api/Records/records/${id}`);
  }
  GetRecord(id: string): Observable<IRecord> {
    return this.http.get<IRecord>(`https://localhost:44379/api/Records/record/${id}`);
  }

  InsertRecord(record: IRecord): Observable<IRecord> {
    return this.http.post<IRecord>('https://localhost:44379/api/Records/record', record, httpOptions);
  }

  UpdateRecord(record: IRecord): Observable<IRecord> {
    return this.http.put<IRecord>('https://localhost:44379/api/Records/record', record, httpOptions);
  }

  DeleteRecord(id: string): any {
    return this.http.delete<boolean>(`https://localhost:44379/api/Records/record/${id}`);
  }

  constructor(private http: HttpClient) { }
}
