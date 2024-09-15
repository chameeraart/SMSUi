import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Login/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { StudentRegisterComponent } from './Pages/student-register/student-register.component';
import { StudentComponent } from './Pages/student/student.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent // MainComponent will be loaded when accessing '/main'
  },
  {
    path: 'StudentRegister',
    component: StudentRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
