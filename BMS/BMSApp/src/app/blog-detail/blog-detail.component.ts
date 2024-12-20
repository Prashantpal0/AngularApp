import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';  // Import BlogService

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogId: string | null = null;
  blog: any = {};  // Store the blog data
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');  // Get blog ID from route parameters
 
    if (this.blogId) {
      this.loadBlogDetails(this.blogId);  // Fetch blog details if ID is available
    }
  }

  // Fetch the blog data by ID
  loadBlogDetails(blogId: string): void {
    this.blogService.getBlogById(blogId).subscribe(
      (response: any) => {
        this.blog = response.data;  // Assuming `data` contains the blog object
        console.log(this.blog);
        this.isLoading = false;  // Stop loading
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching the blog details.';
        this.isLoading = false;  // Stop loading on error
        console.error(error);
      }
    );
  }

  // Navigate back to the blog list
  goBack(): void {
    this.router.navigate(['/blogs']);
  }
}
