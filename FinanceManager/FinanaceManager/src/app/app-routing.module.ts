import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntryComponent } from './components/entry/entry.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
   {path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuard],
  children: [
      {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuard]
      },
      { path: 'dashboard/:UserId', component: DashboardComponent ,  canActivate: [AuthGuard]},
      {
          path: 'bank-account',
          component: BankAccountComponent,
          canActivate: [AuthGuard]
      },
      { path: 'bank-account/:UserId', component: BankAccountComponent,   canActivate: [AuthGuard]},
      {
          path: 'charts',
          component: ChartsComponent,
          canActivate: [AuthGuard]
      },
      { path: 'charts/:UserId', component: ChartsComponent,   canActivate: [AuthGuard]},
      {
          path: 'categories',
          component: CategoriesComponent,
          canActivate: [AuthGuard]
      },
      { path: 'categories/:UserId', component: CategoriesComponent,   canActivate: [AuthGuard]},
      {
        path: 'settings',
        component: SettingComponent,
        canActivate: [AuthGuard, RoleGuard]
      },
      { path: 'settings/:UserId', component: SettingComponent,   canActivate: [AuthGuard, RoleGuard]},
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
       { path: 'users/:UserId', component: UsersComponent,   canActivate: [AuthGuard]},
    ]
  }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
