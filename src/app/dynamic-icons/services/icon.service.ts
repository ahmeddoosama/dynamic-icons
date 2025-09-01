import { Injectable } from '@angular/core';
import { IconName } from '../interfaces/icon.interface';
import { ICONS } from '../data/icons.constants';
/**
 * Service for managing dynamic SVG icons
 * Provides methods to retrieve, check, and manage icons from the constants file
 */
@Injectable({
  providedIn: 'root'
})
export class IconService {
  /** Internal map to store icon names and their SVG content for quick access */
  private iconMap: Map<IconName, string> = new Map();

  constructor() {
    this.initializeIcons();
  }

  /**
   * Loads all icons from the ICONS constant into the internal iconMap
   * This method is called automatically during service initialization
   *
   * What it does:
   * - Iterates through all entries in the ICONS constant
   * - Extracts the icon name and SVG data
   * - Stores them in the iconMap for quick access
   */
  private initializeIcons(): void {
    // Populate the icon map with all icons from the constants file
    Object.entries(ICONS).forEach(([iconName, iconData]) => {
      this.iconMap.set(iconName as IconName, iconData.svg);
    });
  }

  /**
   * Retrieves the SVG content for a specific icon
   *
   * @param iconName - The name/key of the icon to retrieve
   * @returns SVG string content or a default icon if not found
   *
   * Use case: Get SVG content to display an icon in a component
   * Fallback: If icon doesn't exist, returns a default question mark icon
   */
  getIcon(iconName: IconName): string {
    return this.iconMap.get(iconName) || this.getDefaultIcon();
  }

  /**
   * Checks if a specific icon exists in the service
   *
   * @param iconName - The name of the icon to check
   * @returns true if icon exists, false if not
   *
   * Use case: Validation before trying to get an icon
   */
  hasIcon(iconName: IconName): boolean {
    return this.iconMap.has(iconName);
  }

  /**
   * Returns a list of all available icon names
   *
   * @returns Array of all icon names as strings
   *
   * Use case: Used by components to know what icons are available
   * Example: Display all icons in a grid for selection
   */
  getAllIconNames(): IconName[] {
    return Array.from(this.iconMap.keys()) as IconName[];
  }

  /**
   * Dynamically adds a new icon to the service at runtime
   *
   * @param iconName - The name/key for the new icon
   * @param svgContent - The SVG string content
   *
   * Use case: Adding icons dynamically or for testing purposes
   */
  addIcon(iconName: string, svgContent: string): void {
    this.iconMap.set(iconName as IconName, svgContent);
  }

  /**
   * Provides a fallback icon when the requested icon doesn't exist
   *
   * @returns SVG string of a question mark icon
   *
   * Why private: Only used internally by getIcon() method
   * Design: Uses currentColor so it inherits the text color
   */
  private getDefaultIcon(): string {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
}
