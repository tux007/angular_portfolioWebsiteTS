import { Injectable } from '@angular/core';

type LiquidApp = any;

@Injectable({ providedIn: 'root' })
export class LiquidEffectService {
  private app: LiquidApp | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private container: HTMLElement | null = null;
  private active = false;

  isActive() { return this.active; }

  async start() {
    if (this.active) return;

    // Find desktop container; fallback to body
    this.container = document.querySelector('.desktop') as HTMLElement || document.body;

    // Create and style canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'liquid-canvas';
    Object.assign(canvas.style, {
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '1',
      // Stronger blending over the background image per request
      opacity: '0.50',
      mixBlendMode: 'hard-light',
      filter: 'contrast(1.15) saturate(1.06) brightness(1.03)',
      transition: 'opacity .25s ease',
    } as CSSStyleDeclaration);

    // Insert canvas as the first child after bg-image if possible
    this.container.appendChild(canvas);
    this.canvas = canvas;

    try {
      // @ts-ignore: Dynamic remote import at runtime; no type declarations available
      const mod: any = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js');
      const LiquidBackground = mod.default ?? mod;
      const app: any = LiquidBackground(canvas);
      // Tune parameters similar to provided snippet
      if (app?.liquidPlane?.material) {
        app.liquidPlane.material.metalness = 1.0;
        app.liquidPlane.material.roughness = 0.12;
      }
      if (app?.liquidPlane?.uniforms?.displacementScale) {
        app.liquidPlane.uniforms.displacementScale.value = 9.0;
      }
      if (typeof app?.setRain === 'function') {
        app.setRain(false);
      }
      this.app = app;
      // Hide background image while effect is active
      this.container.classList.add('liquid-active');
      this.active = true;
    } catch (err) {
      console.error('Failed to load Liquid effect', err);
      this.stop();
    }
  }

  stop() {
    if (!this.active) return;

    // Best-effort cleanup for different APIs
    try {
      const app: any = this.app;
      if (app) {
        if (typeof app.dispose === 'function') app.dispose();
        else if (typeof app.destroy === 'function') app.destroy();
        else if (typeof app.stop === 'function') app.stop();
      }
    } catch (e) {
      console.warn('Liquid cleanup warning:', e);
    }

    if (this.canvas?.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    this.canvas = null;
    this.app = null;
    this.active = false;

    // Restore background
    if (this.container) this.container.classList.remove('liquid-active');
    this.container = null;
  }

  async toggle() {
    if (this.active) this.stop();
    else await this.start();
  }
}
