import { Component } from '@angular/core';

@Component({
  selector: 'app-bubbles',
  template: `
    <div class="bubbles">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>
  `,
  styles: [`
    .bubbles {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .bubble {
      position: absolute;
      border-radius: 50%;
      opacity: 0.25;
      background: #10b981;
      animation: float 12s infinite linear;
    }
    .bubble:nth-child(1) { left: 10%; width: 60px; height: 60px; animation-delay: 0s; }
    .bubble:nth-child(2) { left: 30%; width: 40px; height: 40px; animation-delay: 2s; }
    .bubble:nth-child(3) { left: 50%; width: 80px; height: 80px; animation-delay: 4s; }
    .bubble:nth-child(4) { left: 70%; width: 50px; height: 50px; animation-delay: 1s; }
    .bubble:nth-child(5) { left: 90%; width: 30px; height: 30px; animation-delay: 3s; }
    @keyframes float {
      0% { top: 100%; opacity: 0.25; }
      50% { opacity: 0.4; }
      100% { top: -10%; opacity: 0.1; }
    }
  `],
  standalone: true
})
export class Bubbles {} 