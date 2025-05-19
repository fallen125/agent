import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-withdaw',
  imports: [RouterModule],
  templateUrl: './withdaw.component.html',
  styleUrl: './withdaw.component.css'
})
export class WithdawComponent {

  constructor(private router: Router) {}

 logout(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('RegisteredUser');
    this.router.navigate(['/main']);
  }
}
