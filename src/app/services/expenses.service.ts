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
import {environment} from '../../environments/environment';

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
    return this.http.post(`${environment.serverUrl}/Form/export/${formId}`, formData,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  ExportTable(formId: string): Observable<any> {
    return this.http.get(`${environment.serverUrl}/Form/export/${formId}`,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  getLatestRecord(_id: string): Observable<IRecord> {
    return this.http.get<IRecord>(`${environment.serverUrl}/Records/recordby/${_id}`);
  }

  UpdateSelectList(formId: string, key: string, selectList: IDropDownOptions[]): any {
    return this.http.put(`${environment.serverUrl}/Form/selectitems/${formId}/${key}`, selectList, httpOptions);
  }

  AddProperty(formId: string, model: IProperty): Observable<IProperty> {
    return this.http.post<IProperty>(`${environment.serverUrl}/Form/property/${formId}`, model, httpOptions);
  }

  UpdateProperty(formId: string, model: IProperty): Observable<IProperty> {
    return this.http.put<IProperty>(`${environment.serverUrl}/Form/property/${formId}`, model, httpOptions);
  }

  DeleteProperty(formId: string, key: string): any {
    return this.http.delete<boolean>(`${environment.serverUrl}/Form/property/${formId}/${key}`);
  }

  DownloadFile(formId: any, recordId: any, columnName: any, itemName: any): Observable<any> {
    return this.http.get(`${environment.serverUrl}/Records/download/${formId}/${recordId}/${columnName}/${itemName}`,
      { headers: new HttpHeaders({ responseType: 'blob' }), responseType: 'blob' }).pipe(map((res) => {
        return new Blob([res]);
      }));
  }

  AddSelectList(_id: string, key: string, items: IDropDownOptions[]): any {
    return this.http.post(`${environment.serverUrl}/Form/selectitems/${_id}/${key}`, items);
  }

  GetSelectList(formId: any, propertyName: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/Form/selectitems/${formId}/${propertyName}`);
  }

  AddSelectItem(formId: any, propertyId: any, label: any): Observable<any> {
    return this.http.post(`${environment.serverUrl}/Form/selectitem/${formId}/${propertyId}`, label, httpOptions);
  }

  UploadFiles(formId: any, recordId: string, key: string, formData: FormData): any {
    return this.http.post(`${environment.serverUrl}/Records/upload/${formId}/${recordId}/${key}`, formData);
  }

  AddWordsToAutoDictionaries(words: IAutoCompleteWords): any {
    return this.http.post(`${environment.serverUrl}/Records/autocomplete`, words, httpOptions);
  }

  AddAutoCompletes(autos: IAutoCompleteList): any {
    return this.http.post(`${environment.serverUrl}/Form/autocompletes`, autos, httpOptions);
  }

  GetAutoComplete(formId: string, propertyKey: string): Observable<IAutoComplete> {
    return this.http.get<IAutoComplete>(`${environment.serverUrl}/Form/autocompletes/${formId}/${propertyKey}`);
  }

  DeleteForm(id: string): any {
    return this.http.delete<boolean>(`${environment.serverUrl}/Form/form/${id}`);
  }
  getForm(id: string): Observable<IMyForm> {
    return this.http.get<IMyForm>(`${environment.serverUrl}/Form/form/${id}`);
  }
  addForm(form: IMyForm): Observable<IMyForm> {
    return this.http.post<IMyForm>(`${environment.serverUrl}/Form/form`, form, httpOptions);
  }

  getForms(): Observable<IMyForm[]> {
    return this.http.get<IMyForm[]>(`${environment.serverUrl}/Form/form`);
  }

  GetAllRecords(id: string): Observable<IRecord[]> {
    return this.http.get<IRecord[]>(`${environment.serverUrl}/Records/records/${id}`);
  }
  GetRecord(id: string): Observable<IRecord> {
    return this.http.get<IRecord>(`${environment.serverUrl}/Records/record/${id}`);
  }

  InsertRecord(record: IRecord): Observable<IRecord> {
    return this.http.post<IRecord>(`${environment.serverUrl}/Records/record`, record, httpOptions);
  }

  UpdateRecord(record: IRecord): Observable<IRecord> {
    return this.http.put<IRecord>(`${environment.serverUrl}/Records/record`, record, httpOptions);
  }

  DeleteRecord(formId: string, id: string): any {
    return this.http.delete<boolean>(`${environment.serverUrl}/Records/record/${formId}/${id}`);
  }

  constructor(private http: HttpClient) { }
}
