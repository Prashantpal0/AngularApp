import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AddEditBlogComponent } from './add-edit-blog/add-edit-blog.component';
import { HeaderComponent } from './header/header.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, DashboardComponent, BlogListComponent, AddEditBlogComponent, HeaderComponent, BlogDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }