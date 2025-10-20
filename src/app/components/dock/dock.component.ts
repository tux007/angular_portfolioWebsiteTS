import { Component, HostListener } from '@angular/core';
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
    { name: 'Finder', icon: '/assets/icons/finder.png' },
    { name: 'Safari', icon: '/assets/icons/safari.svg' },
    { name: 'VS Code', icon: '/assets/icons/vscode.svg' },
  ];

  open(app: string) {
    // Placeholder click handler
    console.log('Open app:', app);
  }

  // Magnifier logic
  mouseX = 0;
  @HostListener('mousemove', ['$event']) onMove(e: MouseEvent) {
    this.mouseX = e.clientX;
  }
}
