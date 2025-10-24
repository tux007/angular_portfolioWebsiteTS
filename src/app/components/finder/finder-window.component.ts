import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finder-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finder-window.component.html',
  styleUrls: ['./finder-window.component.scss']
})
export class FinderWindowComponent implements OnDestroy {
  @Input() open: boolean = false;
  @Output() closed = new EventEmitter<void>();

  onClose() { this.closed.emit(); }

  // Draggable position
  left = 80;
  top = 72;
  private dragging = false;
  private startX = 0;
  private startY = 0;
  private startLeft = 0;
  private startTop = 0;
  private removeMove?: () => void;
  private removeUp?: () => void;

  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  onDragStart(ev: MouseEvent) {
    // Ignore right/middle click and clicks on traffic buttons
    if (ev.button !== 0) return;
    const target = ev.target as HTMLElement;
    if (target.closest('.traffic')) return;

    this.dragging = true;
    this.startX = ev.clientX;
    this.startY = ev.clientY;
    this.startLeft = this.left;
    this.startTop = this.top;

    const move = (e: MouseEvent) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;
      let newLeft = this.startLeft + dx;
      let newTop = this.startTop + dy;
      // Optional bounds within viewport
      const el = this.host.nativeElement.querySelector('.finder-window') as HTMLElement;
      const w = el?.offsetWidth ?? 600;
      const h = el?.offsetHeight ?? 400;
      const maxLeft = (window.innerWidth - w);
      const maxTop = (window.innerHeight - h - 32); // keep below menu bar
      this.left = Math.min(Math.max(0, newLeft), Math.max(0, maxLeft));
      this.top = Math.min(Math.max(28, newTop), Math.max(28, maxTop));
    };
    const up = () => {
      this.dragging = false;
      this.removeListeners();
    };
    this.removeMove = this.renderer.listen('window', 'mousemove', move);
    this.removeUp = this.renderer.listen('window', 'mouseup', up);
    ev.preventDefault();
  }

  private removeListeners() {
    if (this.removeMove) { this.removeMove(); this.removeMove = undefined; }
    if (this.removeUp) { this.removeUp(); this.removeUp = undefined; }
  }

  ngOnDestroy(): void { this.removeListeners(); }
}
