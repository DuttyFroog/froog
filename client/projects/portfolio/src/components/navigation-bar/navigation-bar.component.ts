import { Component } from '@angular/core';

@Component({
  selector: 'froog-portfolio-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  selectedSession: string = "Home";

  selectSession(session: string) {
    this.selectedSession = session;
  }

  isSelected(session: string): boolean {
    return this.selectedSession === session;
  }
}
