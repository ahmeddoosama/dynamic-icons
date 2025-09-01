import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconExampleComponent } from "./dynamic-icons";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconExampleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dynamic-icons';
}
