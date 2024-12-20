import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';  // Import BlogService
import { AuthService } from '../auth.service';  // Import AuthService

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  userName: string | null = null;
  blogs: any[] = [];  // Array to store blogs
  isLoading = true;  // Loading indicator

  constructor(
    private blogService: BlogService, 
    private router: Router,
    private authService: AuthService
  ) {}

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

  // Navigate to the add new blog page
  addBlog(): void {
    this.router.navigate(['/blogs/add']);
  }

  // Navigate to the edit blog page
  editBlog(blogId: string): void {
    this.router.navigate([`/blogs/edit/${blogId}`]);
  }

  // Delete a blog
  deleteBlog(blogId: string): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blogId).subscribe(
        () => {
          // Successfully deleted, remove the blog from the local array
          this.blogs = this.blogs.filter(blog => blog.id !== blogId);
        },
        (error) => {
          console.error('Error deleting blog:', error);
        }
      );
    }
  }

  // Navigate to the blog detail page
  viewBlogDetail(blogId: string): void {
    this.router.navigate([`/blogs/detail/${blogId}`]);
  }

  // Logout function
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
