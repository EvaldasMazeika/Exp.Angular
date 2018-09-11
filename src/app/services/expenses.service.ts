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
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  getForms(): Observable<IMyForm[]> {
    return this.http.get<IMyForm[]>(`${environment.serverUrl}/forms`);
  }

  getForm(id: string): Observable<IMyForm> {
    return this.http.get<IMyForm>(`${environment.serverUrl}/forms/${id}`);
  }

  DeleteForm(id: string): any {
    return this.http.delete(`${environment.serverUrl}/forms/${id}`);
  }

  addForm(form: IMyForm): Observable<IMyForm> {
    return this.http.post<IMyForm>(`${environment.serverUrl}/forms`, form, httpOptions);
  }

  DeleteProperty(formId: string, key: string): any {
    return this.http.delete(`${environment.serverUrl}/forms/${formId}/properties/${key}`);
  }

  AddProperty(formId: string, model: IProperty): Observable<IProperty> {
    return this.http.post<IProperty>(`${environment.serverUrl}/forms/${formId}/properties`, model, httpOptions);
  }

  UpdateProperty(formId: string, model: IProperty): Observable<IProperty> {
    return this.http.put<IProperty>(`${environment.serverUrl}/forms/${formId}/properties`, model, httpOptions);
  }

  AddSelectList(formId: string, key: string, items: IDropDownOptions[]): any {
    return this.http.post(`${environment.serverUrl}/forms/${formId}/selectLists/${key}`, items, httpOptions);
  }

  UpdateSelectList(formId: string, key: string, selectList: IDropDownOptions[]): any {
    return this.http.put(`${environment.serverUrl}/forms/${formId}/selectLists/${key}`, selectList, httpOptions);
  }

  GetSelectList(formId: any, propertyName: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/forms/${formId}/selectLists/${propertyName}`);
  }

  GetAllRecords(formId: string): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(`${environment.serverUrl}/forms/${formId}/records`);
  }

  GetRecord(formId: string, id: string): Observable<IRecord> {
    return this.http.get<IRecord>(`${environment.serverUrl}/forms/${formId}/records/${id}`);
  }

  InsertRecord(formId: string, record: IRecord): Observable<IRecord> {
    return this.http.post<IRecord>(`${environment.serverUrl}/forms/${formId}/records`, record, httpOptions);
  }

  UpdateRecord(formId: string, record: IRecord): Observable<IRecord> {
    return this.http.put<IRecord>(`${environment.serverUrl}/forms/${formId}/records`, record, httpOptions);
  }

  DeleteRecord(formId: string, id: string): any {
    return this.http.delete(`${environment.serverUrl}/forms/${formId}/records/${id}`);
  }

  getLatestRecord(formId: string): Observable<IRecord> {
    return this.http.get<IRecord>(`${environment.serverUrl}/forms/${formId}/records/latest`);
  }

  AddAutoCompletes(formId: string, autos: IAutoCompleteList): any {
    return this.http.post(`${environment.serverUrl}/forms/${formId}/autoCompletes`, autos, httpOptions);
  }

  GetAutoComplete(formId: string, propertyKey: string): Observable<IAutoComplete> {
    return this.http.get<IAutoComplete>(`${environment.serverUrl}/forms/${formId}/autoCompletes/${propertyKey}`);
  }

  AddWordsToAutoDictionaries(formId: string, words: IAutoCompleteWords): any {
    return this.http.post(`${environment.serverUrl}/forms/${formId}/autoCompletes/words`, words, httpOptions);
  }

  AddSelectItem(formId: any, propertyId: any, label: any): Observable<any> {
    return this.http.post(`${environment.serverUrl}/forms/${formId}/selectLists/${propertyId}/item`, label, httpOptions);
  }

  UploadFiles(formId: any, recordId: string, key: string, formData: FormData): any {
    return this.http.post(`${environment.serverUrl}/forms/${formId}/records/${recordId}/${key}`, formData);
  }

  DownloadFile(formId: any, recordId: any, columnName: any, itemName: any): Observable<any> {
    return this.http.get(`${environment.serverUrl}/forms/${formId}/records/${recordId}/${columnName}/${itemName}`,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  UseTemplate(formId: string, formData: FormData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/forms/${formId}/export`, formData,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  ExportTable(formId: string): Observable<any> {
    return this.http.get(`${environment.serverUrl}/forms/${formId}/export`,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  constructor(private http: HttpClient) { }
}
