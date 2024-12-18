import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit {
  blogId: string | null = null;
  isEditing: boolean = false;
  blogData = {
    title: '',
    content: { intro: '', body: '' },
    tags: [],
    category: '',
    meta: {
      description: '',
      keywords: ''
    },
    images: [],
    status: false
  };

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.isEditing = true;
      this.blogId = blogId;

      // Fetch the blog data from the service
      this.blogService.getBlogById(blogId).subscribe(response => {
        // Log the full response to see it in the console
        console.log('API Response:', response);

        if (response.error === false) {
          const blog = response.data;
          // Map the response data to the blogData model
          this.blogData.title = blog.title;
          this.blogData.content.intro = blog.content.intro;
          this.blogData.content.body = blog.content.body;
          this.blogData.tags = blog.tags;
          this.blogData.category = blog.category;
          this.blogData.meta.description = blog.metaTags?.description || '';
          this.blogData.meta.keywords = blog.metaTags?.keywords || '';
          this.blogData.images = blog.featuredImage || [];
          this.blogData.status = blog.status;
        } else {
          // Handle error response (if any)
          console.error('Error fetching blog data:', response.message);
        }
      }, error => {
        console.error('Error during API request:', error);
      });
    } else {
      this.isEditing = false;
    }
  }

  // onSubmit(): void {
  //   if (this.isEditing) {
  //     this.blogService.updateBlog(this.blogId!, this.blogData).subscribe(
  //       (response) => {
  //         console.log('Blog updated successfully:', response);
  //         this.router.navigate(['/blogs']);
  //       },
  //       (error) => {
  //         console.error('Error updating blog:', error);
  //       }
  //     );
  //   } else {
  //     this.blogService.createBlog(this.blogData).subscribe(
  //       (response) => {
  //         console.log('Blog added successfully:', response);
  //         this.router.navigate(['/blogs']);
  //       },
  //       (error) => {
  //         console.error('Error adding blog:', error);
  //       }
  //     );
  //   }
  // }
  

  onSubmit(): void {
    console.log('Form Data on Submit:', this.blogData); // Log the form data before sending
  
    if (this.isEditing) {
      if (!this.blogId) {
        console.error('No blogId provided for editing.');
        return;
      }
  
      this.blogService.UpdateBlog(this.blogId, this.blogData).subscribe(
        (response) => {
          console.log('Blog updated successfully:', response);
          this.router.navigate(['/blogs']);
        },
        (error) => {
          console.error('Error updating blog:', error);
          console.log('Error Response:', error.error);  // Log the full error response
          alert('Error updating the blog. Please try again.');
        }
      );
    } else {
      this.blogService.AddBlog(this.blogData).subscribe(
        (response) => {
          console.log('Blog added successfully:', response);
          this.router.navigate(['/blogs']);
        },
        (error) => {
          console.error('Error adding blog:', error);
          console.log('Error Response:', error.error); // Log the full error response
          alert('Error adding the blog. Please try again.');
        }
      );
    }
  }
  

  onDelete(): void {
    if (this.blogId) {
      const confirmDelete = confirm('Are you sure you want to delete this blog?');
      if (confirmDelete) {
        this.blogService.DeleteBlog(this.blogId).subscribe(
          (response) => {
            console.log('Blog deleted successfully:', response);
            this.router.navigate(['/blogs']);
          },
          (error) => {
            console.error('Error deleting blog:', error);
            alert('Error deleting the blog. Please try again.');
          }
        );
      }
    } else {
      console.error('No blogId available for deletion.');
    }
  }

  // Handle the image file input
  onImageChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.blogData.images = Array.from(files);
    }
  }
  

  goBack(): void {
    this.location.back();
  }
}
