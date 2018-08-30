import { HttpHeaders, HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMyForm } from '../models/IMyForm.model';
import { IRecord } from '../models/IRecord.model';
import { IAutoCompleteList } from '../models/IAutoCompleteList';
import { IAutoComplete } from '../models/IAutoComplete';
import { IAutoCompleteWords } from '../models/IAutoCompleteWords';
import { IDropDownOptions } from '../models/IDropDownOptions.model';
import { IProperty } from '../models/IProperty.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  UseTemplate(formId: string, formData: FormData): Observable<any> {
    return this.http.post(`https://localhost:44379/api/Form/export/${formId}`, formData,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  ExportTable(formId: string): Observable<any> {
    return this.http.get(`https://localhost:44379/api/Form/export/${formId}`,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  getLatestRecord(_id: string): Observable<IRecord> {
    return this.http.get<IRecord>(`https://localhost:44379/api/Records/recordby/${_id}`);
  }

  UpdateSelectList(formId: string, key: string, selectList: IDropDownOptions[]): any {
    return this.http.put(`https://localhost:44379/api/Form/selectitems/${formId}/${key}`, selectList, httpOptions);
  }

  AddProperty(formId: string, model: IProperty): Observable<IProperty> {
    return this.http.post<IProperty>(`https://localhost:44379/api/Form/property/${formId}`, model, httpOptions);
  }

  UpdateProperty(formId: string, model: IProperty): Observable<IProperty> {
    return this.http.put<IProperty>(`https://localhost:44379/api/Form/property/${formId}`, model, httpOptions);
  }

  DeleteProperty(formId: string, key: string): any {
    return this.http.delete<boolean>(`https://localhost:44379/api/Form/property/${formId}/${key}`);
  }

  DownloadFile(formId: any, recordId: any, columnName: any, itemName: any): Observable<any> {
    return this.http.get(`https://localhost:44379/api/Records/download/${formId}/${recordId}/${columnName}/${itemName}`,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  AddSelectList(_id: string, key: string, items: IDropDownOptions[]): any {
    return this.http.post(`https://localhost:44379/api/Form/selectitems/${_id}/${key}`, items);
  }

  GetSelectList(formId: any, propertyName: any): Observable<any> {
    return this.http.get<any>(`https://localhost:44379/api/Form/selectitems/${formId}/${propertyName}`);
  }

  AddSelectItem(formId: any, propertyId: any, label: any): Observable<any> {
    return this.http.post(`https://localhost:44379/api/Form/selectitem/${formId}/${propertyId}`, label, httpOptions);
  }

  UploadFiles(formId: any, recordId: string, key: string, formData: FormData): any {
    return this.http.post(`https://localhost:44379/api/Records/upload/${formId}/${recordId}/${key}`, formData);
  }

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

  DeleteRecord(formId: string, id: string): any {
    return this.http.delete<boolean>(`https://localhost:44379/api/Records/record/${formId}/${id}`);
  }

  constructor(private http: HttpClient) { }
}
