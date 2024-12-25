import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  conpassword: string = '';
  termscondition: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
if(this.username === ''){
  this.errorMessage = 'Name is required.';
      return;
}

if (this.email === '') {
  this.errorMessage = 'Email is required.';
  return;
}

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test(this.email)) {
  this.errorMessage = 'Please enter a valid email address.';
  return;
}

if (this.password === '') {
  this.errorMessage = 'Password is required.';
  return;
}

// Password validation: Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character.
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

if (!passwordPattern.test(this.password)) {
  this.errorMessage = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
  return;
}

if(this.conpassword === ''){
  this.errorMessage = 'Confirm Password is required.';
      return;
}
    if (this.password !== this.conpassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if(this.termscondition != true){
      this.errorMessage = 'Please accept all terms & condition';
      return;
    }
    const user = { name: this.username, email: this.email, password: this.password };

    this.authService.register(user).subscribe(
      (response) => {
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        // Show error from the API
        this.errorMessage = error; // Display the error message
        setTimeout(() => this.errorMessage = '', 3000); // Clear after 3 seconds
      }
    );
  }
}
