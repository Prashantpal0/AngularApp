import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7279/api/Authentication'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Register method (POST request)
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        // Handle errors from the API
        if (error.status === 400 && error.error && error.error.message) {
          return throwError(error.error.message); // Extract and return the message
        } else {
          return throwError('An error occurred, please try again.');
        }
      })
    );
  }
  
  // Login method
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.data) {
          // Store the token
          localStorage.setItem('auth_token', response.data);
            const decodedToken: any = this.decodeToken(response.data); 
            console.log("decodedToken",decodedToken);
            localStorage.setItem('name', decodedToken.Name);
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors from the API
        if (error.status === 400 && error.error && error.error.message) {
          return throwError(error.error.message); // Extract and return the message
        } else {
          return throwError('An error occurred, please try again.');
        }
      })
    );
  }

  // Method to get the stored token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Check if the user is authenticated (token is available and not expired)
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken.exp) {
      return true; // No expiration in the token
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= decodedToken.exp; // Return true if the token is expired
  }

  // Decode the JWT token
  private decodeToken(token: string): any {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return JSON.parse(decoded);
  }

  // Logout method (clear the token)
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('name');
  }
}
