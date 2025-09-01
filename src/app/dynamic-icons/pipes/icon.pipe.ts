import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../services/icon.service';
import { IconName } from '../interfaces/icon.interface';

@Pipe({
  name: 'icon',
  standalone: true
})
export class IconPipe implements PipeTransform {
  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);

  transform(iconName: IconName, size: number = 24): SafeHtml {
    const svgContent = this.iconService.getIcon(iconName);
    const resizedSvg = this.resizeSvg(svgContent, size);
    return this.sanitizer.bypassSecurityTrustHtml(resizedSvg);
  }

  private resizeSvg(svgContent: string, size: number): string {
    return svgContent
      .replace(/width="[^"]*"/g, `width="${size}"`)
      .replace(/height="[^"]*"/g, `height="${size}"`);
  }
}
