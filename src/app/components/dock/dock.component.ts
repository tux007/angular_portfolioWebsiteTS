import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss']
})
export class DockComponent {
  apps = [
    { name: 'Finder', icon: '/assets/icons/finder.svg' },
    { name: 'Safari', icon: '/assets/icons/safari.svg' },
    { name: 'VS Code', icon: '/assets/icons/vscode.svg' },
  ];

  open(app: string) {
    // Placeholder click handler
    console.log('Open app:', app);
  }
}
