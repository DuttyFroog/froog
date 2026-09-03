import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'froog-map-sign',
  standalone: true,
  imports: [],
  templateUrl: './map-sign.component.html',
  styleUrl: './map-sign.component.scss'
})
export class MapSignComponent {
  isOpen = false;
  isLogin: boolean = false;
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(event => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(path: string): void {
    this.isOpen = false;
    void this.router.navigateByUrl(path);
  }

  login(): void {
    this.isLogin = true;
  }

  logout(): void {
    this.isLogin = false;
    location.reload();
  }
}
