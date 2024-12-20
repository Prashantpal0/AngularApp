import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogListComponent } from './blog-list/blog-list.component'; // Import BlogListComponent
import { AddEditBlogComponent } from './add-edit-blog/add-edit-blog.component'; // Import AddEditBlogComponent
import { BlogDetailComponent } from './blog-detail/blog-detail.component';  // Import BlogDetailComponent
import { AuthGuard } from './auth.guard';  // Import the AuthGuard


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protect the dashboard route
  { path: 'blogs', component: BlogListComponent, canActivate: [AuthGuard] }, // Route for Blog List
  { path: 'blogs/edit/:id', component: AddEditBlogComponent, canActivate: [AuthGuard] }, // Route for editing a blog
  { path: 'blogs/detail/:id', component: BlogDetailComponent }, 
  { path: 'blogs/add', component: AddEditBlogComponent, canActivate: [AuthGuard] }, // Route for adding a new blog
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
