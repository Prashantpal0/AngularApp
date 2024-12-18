import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://localhost:7279/api/blog'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch the list of blogs
  getBlogs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Fetch a specific blog by ID
  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new blog

  // createBlog(blogData: any): Observable<any> {
  //   return this.http.post(this.apiUrl, blogData);
  // }
  AddBlog(blog: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blog, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      })
    });
  }

  DeleteBlog(blogId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${blogId}`);
  }

  // Update an existing blog
  UpdateBlog(id: string, blog: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, blog, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      })
    });
  }
}
