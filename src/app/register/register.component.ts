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
