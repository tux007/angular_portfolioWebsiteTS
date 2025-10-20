import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { AboutThisMacComponent } from '../about/about-this-mac.component';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, AboutThisMacComponent],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  now = signal(new Date());
  timer = setInterval(() => this.now.set(new Date()), 1000);
  showAbout = signal(false);

  constructor(private session: SessionService, private router: Router) {}

  get userName() { return this.session.user() ?? 'Guest'; }

  // Menu actions
  aboutThisMac() { this.showAbout.set(true); }
  systemSettings() { alert('System Settings – coming soon'); }
  sleep() { document.body.classList.add('sleep'); }
  restart() { this.router.navigateByUrl('/boot'); }
  shutdown() { this.router.navigateByUrl('/login'); setTimeout(() => document.body.classList.remove('sleep'), 0); }
  lockScreen() { this.router.navigateByUrl('/login'); }
  logout() { this.session.logout(); this.router.navigateByUrl('/login'); }

  dateLabel = computed(() => {
    const d = this.now();
    const intlDay = new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(d);
    const intlDate = new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short' }).format(d);
    const intlTime = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(d);
    return `${intlDay} ${intlDate} ${intlTime}`;
  });
}
