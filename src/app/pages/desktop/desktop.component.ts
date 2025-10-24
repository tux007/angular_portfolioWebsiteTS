import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { DockComponent } from '../../components/dock/dock.component';
import { FinderWindowComponent } from '../../components/finder/finder-window.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, MenuBarComponent, DockComponent, FinderWindowComponent],
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent {
  desktopIcons = [
    { name: 'Safari', icon: '/assets/icons/safari.svg' },
    { name: 'Finder', icon: '/assets/icons/finder.png' },
  ];

  // Window state
  isFinderOpen = false;

  get runningApps(): string[] {
    const apps: string[] = [];
    if (this.isFinderOpen) apps.push('Finder');
    return apps;
  }

  onDockOpen(app: string) {
    if (app === 'Finder') this.isFinderOpen = true;
  }

  onDesktopOpen(app: string) {
    if (app === 'Finder') this.isFinderOpen = true;
  }
}
