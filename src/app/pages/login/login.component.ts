import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  dateNow = new Date();
  private timer = setInterval(() => this.dateNow = new Date(), 1000);

  constructor(private router: Router, private session: SessionService) {}

  chooseProfile() {
    this.session.login('Tom Steimann');
    this.router.navigateByUrl('/boot');
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
