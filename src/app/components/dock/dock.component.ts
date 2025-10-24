import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss']
})
export class DockComponent {
  @Input() runningApps: string[] = [];
  @Output() appOpen = new EventEmitter<string>();
  apps = [
    { name: 'Finder', icon: '/assets/icons/finder.png' },
    { name: 'Safari', icon: '/assets/icons/safari.svg' },
    { name: 'VS Code', icon: '/assets/icons/vscode.svg' },
  ];

  open(app: string) {
    this.appOpen.emit(app);
  }

  // Magnifier logic: mouse position relative to items container
  mouseX: number = 0;
  onMove(e: MouseEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left; // relative X
  }

  isRunning(name: string): boolean {
    return this.runningApps?.includes(name) ?? false;
  }
}
