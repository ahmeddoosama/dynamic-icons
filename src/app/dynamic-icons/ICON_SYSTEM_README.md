# Dynamic Icon System

This document explains how to use the dynamic icon system that allows you to display SVG icons based on keys returned from the backend.

## Overview

The system consists of:
1. **IconService** - Manages icon mappings and provides SVG content
2. **DynamicIconComponent** - Angular component for rendering icons
3. **IconPipe** - Alternative approach using Angular pipes
4. **TypeScript interfaces** - For type safety

## Quick Start

### 1. Using the Component Approach

```typescript
// In your component
import { DynamicIconComponent } from '@shared/components/dynamic-icon/dynamic-icon.component';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [DynamicIconComponent],
  template: `
    <!-- Basic usage -->
    <app-dynamic-icon iconName="book-1"></app-dynamic-icon>
    
    <!-- With custom size and color -->
    <app-dynamic-icon 
      iconName="service-1" 
      [size]="32" 
      color="#3A5069">
    </app-dynamic-icon>
    
    <!-- With CSS classes -->
    <app-dynamic-icon 
      iconName="download" 
      [size]="24" 
      cssClass="my-custom-icon">
    </app-dynamic-icon>
  `
})
export class MyComponent {}
```

### 2. Using the Pipe Approach

```typescript
// In your component
import { IconPipe } from '@shared/pipes/icon.pipe';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [IconPipe],
  template: `
    <!-- Basic usage -->
    <div [innerHTML]="'book-1' | icon"></div>
    
    <!-- With custom size -->
    <div [innerHTML]="'service-1' | icon:32"></div>
  `
})
export class MyComponent {}
```

### 3. Dynamic from Backend Data

```typescript
// In your component
interface BackendItem {
  iconKey: string;
  title: string;
  size?: number;
  color?: string;
}

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [DynamicIconComponent],
  template: `
    <div *ngFor="let item of backendData">
      <app-dynamic-icon 
        [iconName]="item.iconKey" 
        [size]="item.size || 24" 
        [color]="item.color || 'currentColor'">
      </app-dynamic-icon>
      <span>{{ item.title }}</span>
    </div>
  `
})
export class MyComponent {
  backendData: BackendItem[] = [
    { iconKey: 'book-1', title: 'Islamic Books', size: 32, color: '#3A5069' },
    { iconKey: 'service-1', title: 'Hajj Services', size: 28, color: '#846D4A' },
    { iconKey: 'download', title: 'Download Guide' }
  ];
}
```

## Available Icons

### Book Icons
- `book-1` - Simple book icon
- `book-2` - Book with pages
- `book-3` - Book with text lines
- `book-open` - Open book
- `book-closed` - Closed book

### Service Icons
- `service-1` - Basic service icon
- `service-2` - Service with center dot
- `service-3` - Service with vertical line

### Navigation Icons
- `arrow-right` - Right arrow
- `arrow-left` - Left arrow
- `arrow-down` - Down arrow
- `arrow-up` - Up arrow

### Action Icons
- `download` - Download icon
- `share` - Share icon
- `like` - Heart/like icon
- `comment` - Comment bubble
- `search` - Search magnifying glass

### Status Icons
- `check` - Checkmark
- `close` - X/close
- `warning` - Warning triangle
- `info` - Information circle

### Existing Icons
- `hajj` - Hajj icon
- `umrah` - Umrah icon
- `rawdah` - Rawdah icon

## Adding New Icons

### Method 1: Add to IconService

```typescript
// In src/app/shared/services/icon.service.ts
private initializeIcons(): void {
  // ... existing icons ...
  
  // Add your new icon
  this.iconMap.set('my-new-icon', `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Your SVG content here -->
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);
}
```

### Method 2: Add Dynamically

```typescript
// In your component
import { IconService } from '@shared/services/icon.service';

export class MyComponent {
  constructor(private iconService: IconService) {
    // Add icon dynamically
    this.iconService.addIcon('dynamic-icon', `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      </svg>
    `);
  }
}
```

### Method 3: Update TypeScript Interface

```typescript
// In src/app/shared/interfaces/icon.interface.ts
export interface IconKey {
  // ... existing icons ...
  
  // Add your new icon
  'my-new-icon'?: string;
  
  // Or use the index signature for dynamic keys
  [key: string]: string | undefined;
}
```

## Best Practices

### 1. Use Type Safety
```typescript
// Good - Type safe
iconName: IconName = 'book-1';

// Avoid - No type safety
iconName: string = 'book-1';
```

### 2. Provide Fallbacks
```typescript
// In your template
<app-dynamic-icon 
  [iconName]="item.iconKey || 'info'" 
  [size]="item.size || 24">
</app-dynamic-icon>
```

### 3. Use Consistent Sizing
```typescript
// Define size constants
const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48
} as const;
```

### 4. Optimize for Performance
```typescript
// Use OnPush change detection for components that only display icons
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyIconComponent {}
```

## Integration with Backend

### Backend Response Format
```json
{
  "items": [
    {
      "id": 1,
      "title": "Islamic Books",
      "iconKey": "book-1",
      "size": 32,
      "color": "#3A5069"
    },
    {
      "id": 2,
      "title": "Hajj Services",
      "iconKey": "service-1",
      "size": 28,
      "color": "#846D4A"
    }
  ]
}
```

### Component Implementation
```typescript
interface BackendItem {
  id: number;
  title: string;
  iconKey: IconName;
  size?: number;
  color?: string;
}

@Component({
  selector: 'app-items-list',
  template: `
    <div *ngFor="let item of items">
      <app-dynamic-icon 
        [iconName]="item.iconKey" 
        [size]="item.size || 24" 
        [color]="item.color || 'currentColor'">
      </app-dynamic-icon>
      <span>{{ item.title }}</span>
    </div>
  `
})
export class ItemsListComponent {
  items: BackendItem[] = [];

  ngOnInit() {
    this.loadItems();
  }

  private loadItems() {
    // Your API call here
    this.apiService.getItems().subscribe(data => {
      this.items = data.items;
    });
  }
}
```

## Troubleshooting

### Icon Not Displaying
1. Check if the icon key exists in the IconService
2. Verify the icon key is properly typed as `IconName`
3. Check browser console for errors

### Icon Size Issues
1. Ensure the SVG has proper `viewBox` attribute
2. Check if the size input is a valid number
3. Verify CSS isn't overriding the size

### Performance Issues
1. Use OnPush change detection
2. Consider using trackBy with *ngFor
3. Lazy load icons if you have many

## Migration from Existing Icons

If you have existing icon components, you can gradually migrate:

1. **Keep existing components** for complex icons with logic
2. **Convert simple icons** to the new system
3. **Use both approaches** during transition

```typescript
// Hybrid approach
@Component({
  template: `
    <!-- Use new system for simple icons -->
    <app-dynamic-icon iconName="book-1"></app-dynamic-icon>
    
    <!-- Keep existing components for complex ones -->
    <hajj-icon [color]="hajjColor"></hajj-icon>
  `
})
export class HybridComponent {}
```

## File Structure

```
src/app/shared/
├── components/
│   ├── dynamic-icon/
│   │   └── dynamic-icon.component.ts
│   └── icon-example/
│       └── icon-example.component.ts
├── interfaces/
│   └── icon.interface.ts
├── pipes/
│   └── icon.pipe.ts
└── services/
    └── icon.service.ts
```

This system provides a flexible, type-safe, and performant way to handle dynamic icons in your Angular application.
