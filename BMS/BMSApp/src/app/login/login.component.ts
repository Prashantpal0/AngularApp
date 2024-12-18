import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      (response) => {
        if (response && response.data) {
          console.log("response", response.data);
          // Store token and navigate to dashboard
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        // Handle error and display message
        this.errorMessage = error;
        // Automatically hide the error message after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 1000); // Hide the error message after 3 seconds
      }
    );
  }
}
