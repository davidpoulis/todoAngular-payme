import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from './tasks/tasks.component'
import {RegisterComponent} from './register/register.component'
const routes: Routes = [
  {path:'tasks', component: TasksComponent},
  {path:'',redirectTo:'/tasks',pathMatch:'full'},
  {path:'signup',component: RegisterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
