import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit {
  // Form fields
  title: string = '';
  introduction: string = '';
  category: string = '';
  content: string = '';
  status: boolean = true;
  tags: string[] = [];  // This should be an array from the start
  keywords: string[] = []; // This should be an array from the start
  description: string = '';
  featuredImage: any[] = []; // Store the selected files for images (not URLs)
  blogId: string | null = null;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Temporary string variables for the input fields (for initial conversion to arrays)
  tagsString: string = '';
  keywordsString: string = '';
  featuredImageString: string = '';

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.isEditMode = true;
      this.loadBlogData(); // Fetch blog data if in edit mode
    }
  }

  // Fetch blog data when editing
  loadBlogData(): void {
    this.blogService.getBlogById(this.blogId!).subscribe(blog => {
      console.log(blog.data);
      this.title = blog.data.title || '';
      this.introduction = blog.data.content?.intro || '';
      this.category = blog.data.category || '';
      this.content = blog.data.content?.body || '';
      this.status = blog.data.status || true;
      this.tags = blog.data.tags || [];  // Directly assign the tags array
      this.keywords = blog.data.metaTags.keywords || [];  // Directly assign the keywords array
      this.featuredImageString = blog.data.featuredImage?.join(', ') || '';  // Handle featured image if needed
      this.description = blog.data.metaTags?.description || '';  // You can adjust if you have a description field

      // Convert arrays to comma-separated strings for input fields
      this.tagsString = this.tags.join(', ');
      this.keywordsString = this.keywords.join(', ');
    }, error => {
      this.errorMessage = 'An error occurred while fetching the blog data.';
    });
  }

  // Handle form submission for creating or updating the blog
  onSubmit(): void {
    if (!this.title || !this.content || !this.introduction || !this.category) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    // Convert the tags and keywords to arrays if they are strings
    const blogData = {
      title: this.title,
      introduction: this.introduction,
      category: this.category,
      content: this.content,
      tags: Array.isArray(this.tags) ? this.tags : this.tagsString.split(',').map(tag => tag.trim()),
      keywords: Array.isArray(this.keywords) ? this.keywords : this.keywordsString.split(',').map(keyword => keyword.trim()),
      descriptions: this.description,
      status: this.status,
      featuredImage: this.featuredImage.length > 0 ? this.featuredImage : this.featuredImageString.split(',').map(image => image.trim()) // Handle featured image array
    };

    if (this.isEditMode) {
      this.updateBlog(blogData);
    } else {
      this.createBlog(blogData);
    }
  }

  // Handle file selection for images
  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.featuredImage = Array.from(files); // Store the selected files
    }
  }

  // Create a new blog post
  createBlog(blogData: any): void {
    const formData = new FormData();
    
    // Append form fields to FormData
    formData.append('title', blogData.title);
    formData.append('introduction', blogData.introduction);
    formData.append('category', blogData.category);
    formData.append('content', blogData.content);
    formData.append('tags', JSON.stringify(blogData.tags));
    formData.append('keywords', JSON.stringify(blogData.keywords));
    formData.append('descriptions', blogData.descriptions);
    formData.append('status', String(blogData.status));

    // Append files (featuredImage) to FormData
    blogData.featuredImage.forEach((file: any) => {
      formData.append('BlogImages', file, file.name);
    });

    this.blogService.createBlog(formData).subscribe(response => {
      this.router.navigate(['/blogs']);  // Navigate to blog list after creation
    }, error => {
      this.errorMessage = 'An error occurred while creating the blog.';
      console.error(error); // Log error for debugging
    });
  }

  // Update an existing blog post
  updateBlog(blogData: any): void {
    if (this.blogId) {
      const updatedBlogData = {
        ...blogData,
        id: this.blogId  // Make sure the blogId is included in the payload
      };

      const formData = new FormData();
      
      // Append form fields to FormData
      formData.append('title', updatedBlogData.title);
      formData.append('introduction', updatedBlogData.introduction);
      formData.append('category', updatedBlogData.category);
      formData.append('content', updatedBlogData.content);
      formData.append('tags', JSON.stringify(updatedBlogData.tags));
      formData.append('keywords', JSON.stringify(updatedBlogData.keywords));
      formData.append('descriptions', updatedBlogData.descriptions);
      formData.append('status', String(updatedBlogData.status));

      // Append files (featuredImage) to FormData if they are selected
      updatedBlogData.featuredImage.forEach((file: any) => {
        formData.append('BlogImages', file, file.name);
      });

      this.blogService.updateBlog(updatedBlogData.id, formData).subscribe(response => {
        this.router.navigate(['/blogs']); // Navigate after successful update
      }, error => {
        this.errorMessage = 'An error occurred while updating the blog.';
        console.error(error); // Log error for debugging
      });
    }
  }

  // Handle the back button click
  goBack(): void {
    this.router.navigate(['/blogs']); // Redirect to the /blogs route
  }

  // Method to convert comma-separated string into array for tags or keywords
  convertStringToArray(field: string): void {
    if (field === 'tags') {
      this.tags = this.tagsString.split(',').map(tag => tag.trim());
    } else if (field === 'keywords') {
      this.keywords = this.keywordsString.split(',').map(keyword => keyword.trim());
    }
  }
}
