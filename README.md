# Dynamic Icon System

This system allows you to dynamically display SVG icons based on keys returned from a backend. All icons are stored in a centralized constants file and can be easily used throughout the application.

**🌐 [Live Demo on GitHub Pages](https://ahmeddoosama.github.io/dynamic-icons/)**

*Explore all available icons with interactive examples and usage patterns.*

## Features

- **Centralized Icon Storage**: All icons are stored in `icons.constatns.ts`
- **Type Safety**: Full TypeScript support with proper interfaces
- **Dynamic Sizing**: Icons can be resized on the fly
- **Color Customization**: Icons can be styled with custom colors
- **Two Usage Methods**: Component-based and Pipe-based approaches
- **Backend Integration**: Perfect for displaying icons based on backend keys

## Quick Start

### 1. Using the Component Approach

```html
<!-- Basic usage -->
<app-dynamic-icon iconName="search" [size]="24" color="#333"></app-dynamic-icon>

<!-- With custom styling -->
<app-dynamic-icon 
  iconName="book-02" 
  [size]="32" 
  color="#3A5069"
  cssClass="my-custom-icon">
</app-dynamic-icon>
```

### 2. Using the Pipe Approach

```html
<!-- Basic usage -->
<div [innerHTML]="'search' | icon:24"></div>

<!-- With custom size -->
<div [innerHTML]="'download-04' | icon:32"></div>
```

### 3. Backend Integration Example

```typescript
// Your component
export class MyComponent {
  // Simulate backend data
  backendData = [
    { iconKey: 'book-02', title: 'Islamic Books', size: 32, color: '#3A5069' },
    { iconKey: 'hajj_illustration', title: 'Hajj Services', size: 28, color: '#846D4A' },
    { iconKey: 'download-04', title: 'Download Guide', size: 24, color: '#3E5646' }
  ];
}
```

```html
<!-- Template -->
<div class="icon-grid">
  <div class="icon-item" *ngFor="let item of backendData">
    <app-dynamic-icon
      [iconName]="item.iconKey"
      [size]="item.size || 24"
      [color]="item.color || 'currentColor'">
    </app-dynamic-icon>
    <span>{{ item.title }}</span>
  </div>
</div>
```

## Available Icons

The following icons are available in the system:

- `search` - Search icon
- `book-02` - Book icon
- `check-list` - Checklist icon
- `ticket-02` - Ticket icon
- `user-multiple` - Users icon
- `download-04` - Download icon
- `share` - Share icon
- `comment` - Comment icon
- `maps` - Maps icon
- `menu` - Menu icon
- `hajj_illustration` - Hajj illustration
- `umrah_illustration` - Umrah illustration
- `rawdah_illustration` - Rawdah illustration
- And many more...

## Adding New Icons

To add a new icon:

1. Open `src/app/shared/dynamic-icons/data/icons.constatns.ts`
2. Add your icon in the following format:

```typescript
'your-icon-name': {
  svg: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Your SVG content here -->
    </svg>
  `
},
```

3. The icon will be automatically available throughout the application

## API Reference

### DynamicIconComponent

**Inputs:**
- `iconName: IconName` - The name of the icon to display
- `size: number` - The size of the icon in pixels (default: 24)
- `color: string` - The color of the icon (default: 'currentColor')
- `cssClass: string` - Additional CSS classes to apply

### IconPipe

**Parameters:**
- `iconName: IconName` - The name of the icon to display
- `size: number` - The size of the icon in pixels (default: 24)

**Returns:** `SafeHtml` - The sanitized SVG HTML

### IconService

**Methods:**
- `getIcon(iconName: IconName): string` - Get the SVG content for an icon
- `hasIcon(iconName: IconName): boolean` - Check if an icon exists
- `getAllIconNames(): IconName[]` - Get all available icon names
- `addIcon(iconName: string, svgContent: string): void` - Add a new icon dynamically

## Example Component

See `src/app/shared/dynamic-icons/componants/icon-example/icon-example.component.ts` for a complete working example.

## Best Practices

1. **Use TypeScript**: Always use the `IconName` type for icon names to get type safety
2. **Consistent Sizing**: Use consistent icon sizes within the same UI section
3. **Color Consistency**: Use your design system's color palette
4. **Performance**: The icons are loaded once and cached, so performance is optimal
5. **Accessibility**: Icons are rendered as SVG, making them scalable and accessible

## Troubleshooting

**Icon not displaying?**
- Check that the icon name exists in `icons.constatns.ts`
- Verify the icon name is spelled correctly (case-sensitive)
- Ensure the component is properly imported

**Icon size not changing?**
- Make sure you're passing the `size` input correctly
- Check that the SVG has proper `width` and `height` attributes

**Color not applying?**
- Verify the `color` input is being passed
- Check that the SVG uses `currentColor` or `fill="currentColor"`

## GitHub Pages Deployment

This project is automatically deployed to GitHub Pages. The live demo is available at: `https://ahmeddoosama.github.io/dynamic-icons/`

### Manual Deployment

To manually deploy to GitHub Pages:

```bash
npm run deploy
```

### Automatic Deployment

The project uses GitHub Actions to automatically deploy when code is pushed to the master branch. The workflow:
1. Builds the project for production
2. Deploys to the `gh-pages` branch
3. Makes the site available at the GitHub Pages URL

### Setup Instructions

For detailed setup instructions, see the `setup-github-pages.sh` script or follow these steps:

1. **Enable GitHub Pages** in your repository settings
2. **Enable GitHub Actions** to allow automatic deployment
3. **Push your code** to trigger the first deployment

The live demo showcases all available icons with interactive examples and usage patterns.
