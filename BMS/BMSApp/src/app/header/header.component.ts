import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import your auth service for logout

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  ngOnInit(): void {
    // Retrieve the stored username from localStorage
    this.userName = localStorage.getItem('name');
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }
}
