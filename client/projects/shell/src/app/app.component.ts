import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapSignComponent } from '../components/map-sign/map-sign.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapSignComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shell';
}
