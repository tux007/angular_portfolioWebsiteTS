import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { DockComponent } from '../../components/dock/dock.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, MenuBarComponent, DockComponent],
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent {
  desktopIcons = [
    { name: 'Safari', icon: '/assets/icons/safari.svg' },
    { name: 'Finder', icon: '/assets/icons/finder.svg' },
  ];
}
