import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes and update `showHeader` based on the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      // Hide the header for login and register routes
      if (currentRoute === '/login' || currentRoute === '/register') {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    });
  }
}
