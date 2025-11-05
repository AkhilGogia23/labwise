import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatIconModule,CommonModule,MatButtonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'labwise';
    toggleDark() {
    document.documentElement.classList.toggle('dark');
  }
}
