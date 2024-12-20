import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://localhost:7279/api/Blog'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch a specific blog by ID
  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Fetch the list of blogs
  getBlogs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Create a new blog
  // Method to create a new blog post
createBlog(blogData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  });

  // Send the POST request to create a new blog post
  return this.http.post<any>(`${this.apiUrl}/Addblog`, blogData, { headers });
}


  // Update an existing blog
  // Method to update an existing blog
updateBlog(id:any, blogData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  });

  // Send the PUT request with the blog ID in the URL
  return this.http.put<any>(`${this.apiUrl}/Updateblog/${blogData.id}`, blogData, { headers });
}


  // Delete a blog by ID (Updated API URL)
  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteBlog/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      })
    });
  }
}
