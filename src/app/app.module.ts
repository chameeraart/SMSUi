import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './Pages/main/main.component';
import { StudentRegisterComponent } from './Pages/student-register/student-register.component';
import { StudentComponent } from './Pages/student/student.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    StudentRegisterComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
     
  ],
  providers: [
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
