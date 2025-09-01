import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconName } from '../../interfaces/icon.interface';
import { IconService } from '../../services/icon.service';

/**
 * Dynamic Icon Component
 *
 * Renders SVG icons dynamically based on the provided icon name.
 * Supports custom sizing, coloring, and CSS classes.
 *
 * Features:
 * - Dynamic SVG rendering from IconService
 * - Real-time size adjustment
 * - Color customization
 * - Security-safe HTML rendering
 *
 * Usage:
 * <dynamic-icon iconName="search" [size]="24" color="#333"></dynamic-icon>
 */
@Component({
  selector: 'dynamic-icon',
  standalone: true,
  template: `
    <div
      [class]="cssClass"
      [style.width]="size + 'px'"
      [style.height]="size + 'px'"
      [style.color]="color"
      [innerHTML]="iconHtml">
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class DynamicIconComponent implements OnChanges {
  /**
   * Input: The name of the icon to display
   * Must match a key from the IconService
   * Default: 'book-1'
   */
  @Input() iconName: IconName = 'book-1';

  /**
   * Input: The size of the icon in pixels
   * Both width and height will be set to this value
   * Default: 24
   */
  @Input() size: number = 24;

  /**
   * Input: The color of the icon
   * Uses CSS color values (hex, rgb, named colors, etc.)
   * Default: 'currentColor' (inherits from parent element)
   */
  @Input() color: string = 'currentColor';

  /**
   * Input: Additional CSS classes to apply to the icon container
   * Allows for custom styling and positioning
   * Default: empty string
   */
  @Input() cssClass: string = '';

  /** Injected IconService for retrieving SVG content */
  private iconService = inject(IconService);

  /** Injected DomSanitizer for safe HTML rendering */
  private sanitizer = inject(DomSanitizer);

  /** The sanitized HTML content of the icon to be rendered */
  iconHtml: SafeHtml = '';

  /**
   *
   * @param changes - Object containing information about what changed
   *
   * What it does:
   * - Detects when iconName or size inputs change
   * - Triggers icon re-rendering when needed
   * - Optimizes performance by only updating when necessary
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconName'] || changes['size']) {
      this.renderIcon();
    }
  }

  /**
   * Renders the icon by getting SVG content and processing it
   * Called whenever the icon needs to be updated
   *
   * What it does:
   * - Gets the SVG content from IconService
   * - Resizes the SVG to match the desired size
   * - Sanitizes the HTML for safe rendering
   * - Updates the iconHtml property for display
   */
  private renderIcon(): void {
    // Get the SVG content from the service
    const svgContent = this.iconService.getIcon(this.iconName);
    // Resize the SVG to the desired dimensions
    const resizedSvg = this.resizeSvg(svgContent, this.size);
    // Sanitize the HTML for safe rendering
    this.iconHtml = this.sanitizer.bypassSecurityTrustHtml(resizedSvg);
  }

  /**
   * Resizes an SVG by modifying its width and height attributes
   *
   * @param svgContent - The original SVG string content
   * @param size - The desired size in pixels for both width and height
   * @returns The resized SVG string
   *
   * What it does:
   * - Uses regex to find and replace width attributes
   * - Uses regex to find and replace height attributes
   * - Maintains the SVG's aspect ratio and viewBox
   * - Returns the modified SVG string
   *
   * Example:
   * Input: <svg width="18" height="18" viewBox="0 0 18 18">...</svg>
   * Output: <svg width="24" height="24" viewBox="0 0 18 18">...</svg>
   */
  private resizeSvg(svgContent: string, size: number): string {
    // Replace width and height attributes with the desired size
    return svgContent
      .replace(/width="[^"]*"/g, `width="${size}"`)
      .replace(/height="[^"]*"/g, `height="${size}"`);
  }
}
