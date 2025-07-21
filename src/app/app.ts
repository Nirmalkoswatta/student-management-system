import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  template: '<app-navigation></app-navigation>',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [RouterModule, NavigationComponent]
})
export class AppComponent {
  title = 'student-management';
}
