import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'froog-map-sign',
  standalone: true,
  imports: [],
  templateUrl: './map-sign.component.html',
  styleUrl: './map-sign.component.scss'
})
export class MapSignComponent {
  isOpen = false;
  isLogin: boolean = true;

  constructor(private router: Router) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(path: string): void {
    this.isOpen = false;
    void this.router.navigateByUrl(path);
  }
}
