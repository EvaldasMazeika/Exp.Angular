import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatTableModule, MatTooltipModule, MatListModule,
   MatDialogModule, MatPaginatorModule, MatNativeDateModule, MatAutocompleteModule
  } from '@angular/material';
import {FormlyMaterialModule} from '@ngx-formly/material';
import { Ng2IziToastModule } from 'ng2-izitoast';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';


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
import { ActiveTemplateComponent } from './dashboard/active-template/active-template.component';
import { AutocompleteTypeComponent } from './types/autocomplete-type.component';
import { FormlyFieldCheckbox } from './types/basicCheckbox-type.copmonent';
import { EditRecordDialog } from './dashboard/active-template/dialogs/edit-record/editRecordDialog.dialog';
import { NewFormDialog } from './control/forms-list/dialogs/newFormDialog.dialog';
import { NewRecordDialog } from './dashboard/active-template/dialogs/new-record/newRecordDialog.dialog';


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
    ActiveTemplateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    FormlyMaterialModule,
    Ng2IziToastModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    FormlyModule.forRoot({
      types: [
        { name: 'basicCheckbox', component: FormlyFieldCheckbox },
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
