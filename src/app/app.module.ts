import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Ng2IziToastModule } from 'ng2-izitoast';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './nav/navbar.component';
import { MaterialModule } from './material.module';
import { ControlComponent } from './control/control.component';
import { FormsListComponent } from './control/forms-list/forms-list.component';
import { ExpensesService } from './services/expenses.service';
import { FormsDetailsComponent } from './control/form-detail/form-detail.component';
import { FormItemComponent } from './control/form-item/form-item.component';
import { FormlyModule } from '@ngx-formly/core';
import { AutocompleteTypeComponent } from './types/autocomplete-type.component';
import { FormlyFieldCheckbox } from './types/basicCheckbox-type.copmonent';
import { NewFormDialog } from './control/forms-list/dialogs/newFormDialog.dialog';
import { FormlyFieldDate } from './types/datepicker-type.component';
import { ChosenTemplateComponent } from './dashboard/chosen-template/chosen-template.component';
import { NewRecordDialog } from './dashboard/chosen-template/dialogs/new-record/newRecordDialog.dialog';
import { EditRecordDialog } from './dashboard/chosen-template/dialogs/edit-record/editRecordDialog.dialog';
import { FormlyFieldFileInput } from './types/fileInput-type.component';
import { CommonModule } from '@angular/common';
import { SelectListTypeComponent } from './types/selectList-type.component';
import { FormlyFieldCustomDate } from './types/customdatepicker-type.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    ControlComponent,
    FormsListComponent,
    FormsDetailsComponent,
    FormItemComponent,
    NewRecordDialog,
    NewFormDialog,
    EditRecordDialog,
    FormlyFieldCheckbox,
    AutocompleteTypeComponent,
    FormlyFieldDate,
    ChosenTemplateComponent,
    FormlyFieldFileInput,
    SelectListTypeComponent,
    FormlyFieldCustomDate
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyMaterialModule,
    Ng2IziToastModule,
    FlexLayoutModule,
    FormlyMatDatepickerModule,
    MaterialFileInputModule,
    NgSelectModule,
    AngularDateTimePickerModule,
    FormlyModule.forRoot({
      types: [
        { name: 'basicCheckbox', component: FormlyFieldCheckbox },
        { name: 'basicDatepicker', component: FormlyFieldDate },
        { name: 'fileInput', component: FormlyFieldFileInput},
        { name: 'selecListTags', component: SelectListTypeComponent},
        { name: 'customDatePicker', component: FormlyFieldCustomDate},
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field'],
        }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    AppComponent,
    NewRecordDialog,
    NewFormDialog,
    EditRecordDialog
  ],
  providers: [
    ExpensesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
