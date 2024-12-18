import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service'; // Import BlogService
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  userName: string | null = null;

  blogs: any[] = [];  // Array to store blogs
  isLoading = true;  // Loading indicator

  constructor(private blogService: BlogService, private router: Router,private authService: AuthService,) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
    // Fetch the blogs from the BlogService
    this.blogService.getBlogs().subscribe(
      (response: any) => {
        this.blogs = response.data;  // Assuming `data` is the array of blogs
        this.isLoading = false;  // Stop loading
      },
      (error) => {
        console.error('Error fetching blogs:', error);
        this.isLoading = false;  // Stop loading on error
      }
    );
  }

  
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
