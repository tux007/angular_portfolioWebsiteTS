import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss']
})
export class BootComponent implements OnInit {
  progress = 0;
  private intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate boot progress
    this.intervalId = setInterval(() => {
      this.progress = Math.min(100, this.progress + Math.floor(Math.random() * 8) + 3);
      if (this.progress >= 100) {
        clearInterval(this.intervalId);
        setTimeout(() => this.router.navigateByUrl('/desktop'), 350);
      }
    }, 200);
  }
}
