import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AdminComponent } from './admin/admin.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { FormsDetailsComponent } from './forms-details/forms-details.component';
import { FormsItemComponent } from './forms-item/forms-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpenseFormComponent,
    ExpenseListComponent,
    AdminComponent,
    FormsListComponent,
    FormsDetailsComponent,
    FormsItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
