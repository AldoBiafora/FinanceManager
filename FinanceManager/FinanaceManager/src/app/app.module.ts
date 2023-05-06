import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingComponent } from './components/setting/setting.component';
import { UsersComponent } from './components/users/users.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { EntryComponent } from './components/entry/entry.component';
import { AddCategoryEntryComponent } from './components/dialog/add-category-entry/add-category-entry.component';
import { AddOperationExitComponent } from './components/dialog/add-operation-exit/add-operation-exit.component';
import { DetailOperationComponent } from './components/dialog/detail-operation/detail-operation.component';
import { DatePipe } from '@angular/common';
import { DeleteOperationComponent } from './components/dialog/delete-operation/delete-operation.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    BankAccountComponent,
    ChartsComponent,
    CategoriesComponent,
    SettingComponent,
    UsersComponent,
    ExpensesComponent,
    EntryComponent,
    AddCategoryEntryComponent,
    AddOperationExitComponent,
    DetailOperationComponent,
    DeleteOperationComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
