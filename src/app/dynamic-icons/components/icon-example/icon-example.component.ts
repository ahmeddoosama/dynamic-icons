import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicIconComponent } from '../dynamic-icon/dynamic-icon.component';
import { IconPipe } from '../../pipes/icon.pipe';
import { IconName } from '../../interfaces/icon.interface';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'icon-example',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicIconComponent, IconPipe],
  template: `
    <div class="icon-examples">
      <h2>Dynamic Icon Examples</h2>

      <!-- All Available Icons -->
      <div class="example-section">
        <h3>All Available Icons ({{ filteredIconNames.length }} of {{ allIconNames.length }} icons)</h3>

        <!-- Search Input -->
        <div class="search-container">
          <input
            type="text"
            placeholder="Search icons..."
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
            class="search-input">
        </div>

        <div class="icon-grid">
          <div class="icon-item" *ngFor="let iconName of filteredIconNames" (click)="copyIcon(iconName)">
            <dynamic-icon
              [iconName]="iconName"
              [size]="32"
              color="#333">
            </dynamic-icon>
            <span>{{ iconName }}</span>
          </div>
        </div>
      </div>

      <!-- Using the component approach -->
      <div class="example-section">
        <h3>Component Approach Examples</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <dynamic-icon iconName="book-02" [size]="32" color="#3A5069"></dynamic-icon>
            <span>book-02</span>
          </div>
          <div class="icon-item">
            <dynamic-icon iconName="check-list" [size]="32" color="#846D4A"></dynamic-icon>
            <span>check-list</span>
          </div>
          <div class="icon-item">
            <dynamic-icon iconName="ticket-02" [size]="32" color="#3E5646"></dynamic-icon>
            <span>ticket-02</span>
          </div>
          <div class="icon-item">
            <dynamic-icon iconName="download-04" [size]="32" color="#000"></dynamic-icon>
            <span>download-04</span>
          </div>
        </div>
      </div>

      <!-- Using the pipe approach -->
      <div class="example-section">
        <h3>Pipe Approach</h3>
        <div class="icon-grid">
          <div class="icon-item" *ngFor="let iconName of iconNames" (click)="copyIcon(iconName)">
            <div [innerHTML]="iconName | icon:24"></div>
            <span>{{ iconName }}</span>
          </div>
        </div>
      </div>

      <!-- Dynamic from backend data -->
      <div class="example-section">
        <h3>Backend Data Example</h3>
        <div class="icon-grid">
          <div class="icon-item" *ngFor="let item of backendData" (click)="copyIcon(item.title)">
            <dynamic-icon
              [iconName]="item.iconKey"
              [size]="item.size || 24"
              [color]="item.color || 'currentColor'">
            </dynamic-icon>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .icon-examples {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .example-section {
      margin-bottom: 40px;
    }

    .example-section h3 {
      margin-bottom: 20px;
      color: #333;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 15px;
      max-height: 600px;
      overflow-y: auto;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 8px;
      background: #f9f9f9;
    }

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 8px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: white;
      transition: all 0.2s ease;
      min-height: 80px;
      justify-content: center;
    }

    .icon-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .icon-item span {
      margin-top: 6px;
      font-size: 10px;
      color: #555;
      text-align: center;
      word-break: break-word;
      line-height: 1.2;
      max-width: 100%;
    }

    .search-container {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 10px 15px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      border-color: #3A5069;
    }
  `]
})
/**
 * Example component demonstrating the dynamic icon system
 * Shows all available icons with search functionality and usage examples
 */
export class IconExampleComponent implements OnInit {



  /** Array containing all available icon names from the service */
  allIconNames: IconName[] = [];

  /** Array containing filtered icon names based on search term */
  filteredIconNames: IconName[] = [];

  /** Current search term entered by the user */
  searchTerm: string = '';

  /** Sample icon names for demonstration purposes */
  iconNames: IconName[] = ['search', 'book-02', 'check-list', 'ticket-02', 'user-multiple', 'download-04', 'maps', 'menu'];

  /**
   * Simulated backend data showing how icons would be used in real applications
   * Each object contains an icon key (matching backend response) and display properties
   */
  backendData = [
    { iconKey: 'book-02' as IconName, title: 'Islamic Books', size: 32, color: '#3A5069' },
    { iconKey: 'hajj_illustration' as IconName, title: 'Hajj Services', size: 28, color: '#846D4A' },
    { iconKey: 'download-04' as IconName, title: 'Download Guide', size: 24, color: '#3E5646' },
    { iconKey: 'search' as IconName, title: 'Search', size: 24, color: '#333' }
  ];

  /**
   *
   * @param iconService - The injected IconService instance
   */
  constructor(private iconService: IconService) {}


  ngOnInit(): void {
    // Get all available icon names from the service
    this.allIconNames = this.iconService.getAllIconNames();
    // Initialize filtered icons to show all icons initially
    this.filteredIconNames = [...this.allIconNames];
  }

  /**
   * Filters the displayed icons based on the search input
   * Called every time the user types in the search box (real-time filtering)
   *
   * What it does:
   * - If search term is empty: shows all icons
   * - If search term exists: filters icons that contain the search term
   * - Case insensitive: converts both search term and icon names to lowercase
   * - String conversion: ensures type safety with String(iconName)
   */
  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      // If search is empty, show all icons
      this.filteredIconNames = [...this.allIconNames];
    } else {
      // Filter icons that contain the search term (case insensitive)
      this.filteredIconNames = this.allIconNames.filter(iconName =>
        String(iconName).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  copyIcon(iconName: any): void {
    navigator.clipboard.writeText(iconName);
  }
}
