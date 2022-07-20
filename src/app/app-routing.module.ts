import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './adminhome/admin-home.component';

const routes: Routes = [
  { path:'',  component: LoginComponent,  },
  { path:'dashboard', component: DashboardComponent},
  { path:'adminhome', component: AdminHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, AdminHomeComponent]




