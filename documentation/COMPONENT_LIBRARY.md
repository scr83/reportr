# SEO ReportBot - COMPONENT LIBRARY DOCUMENTATION
*Generated: September 14, 2025*

## 📚 OVERVIEW

This document provides comprehensive documentation for the SEO ReportBot component library built using atomic design principles. All components are production-ready, fully typed with TypeScript, and optimized for white-label theming.

---

## 🏗️ ATOMIC DESIGN ARCHITECTURE

### **Design Philosophy**
The component library follows atomic design methodology:
- **Atoms**: Basic building blocks (buttons, inputs, typography)
- **Molecules**: Simple combinations of atoms (search box, metric card)
- **Organisms**: Complex components (navigation, dashboard sections)
- **Templates**: Page layouts and structure
- **Pages**: Complete application pages

### **Component Hierarchy**
```
Components (41 total)
├── Atoms (24)          # Basic UI elements
├── Molecules (12)      # Composite components  
├── Organisms (6)       # Complex sections
├── Templates (3)       # Page layouts
└── Pages (varies)      # Application pages
```

---

## ⚛️ ATOMS (24 COMPONENTS)

### **1. Button**
**File**: `src/components/atoms/Button.tsx`  
**Purpose**: Interactive button with multiple variants and sizes

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
}
```

**Usage Examples**:
```tsx
<Button variant="primary" size="lg">Primary Action</Button>
<Button variant="secondary" loading>Loading...</Button>
<Button variant="outline" disabled>Disabled</Button>
```

**Features**:
- 7 visual variants
- 5 size options
- Loading state with spinner
- Disabled state handling
- Focus and active states
- Accessibility compliant

---

### **2. Input**
**File**: `src/components/atoms/Input.tsx`  
**Purpose**: Form input field with validation states

**Props**:
```typescript
interface InputProps {
  label?: string
  placeholder?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  required?: boolean
  disabled?: boolean
}
```

**Usage Examples**:
```tsx
<Input label="Email" type="email" placeholder="user@example.com" />
<Input label="Password" type="password" error="Password too short" />
<Input placeholder="Search..." disabled />
```

**Features**:
- Label and error message support
- All HTML input types
- Validation error styling
- Required field indicators
- Disabled state handling

---

### **3. Typography**
**File**: `src/components/atoms/Typography.tsx`  
**Purpose**: Consistent text styling and hierarchy

**Props**:
```typescript
interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption'
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'success'
  align?: 'left' | 'center' | 'right'
  className?: string
  children: React.ReactNode
}
```

**Usage Examples**:
```tsx
<Typography variant="h1">Main Heading</Typography>
<Typography variant="body" color="secondary">Body text</Typography>
<Typography variant="caption" align="center">Caption text</Typography>
```

**Features**:
- 8 text variants
- Color variations
- Text alignment options
- Responsive sizing
- Semantic HTML elements

---

### **4. Card**
**File**: `src/components/atoms/Card.tsx`  
**Purpose**: Container component for content grouping

**Props**:
```typescript
interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}
```

**Usage Examples**:
```tsx
<Card padding="lg">
  <Typography variant="h3">Card Title</Typography>
  <Typography variant="body">Card content</Typography>
</Card>
```

**Features**:
- 3 visual variants
- Flexible padding options
- Hover effects
- Shadow variations

---

### **5. Icon**
**File**: `src/components/atoms/Icon.tsx`  
**Purpose**: Consistent icon rendering with Lucide React

**Props**:
```typescript
interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'muted'
  variant?: 'default' | 'contained' | 'outlined'
}
```

**Usage Examples**:
```tsx
<Icon icon={Star} size="md" color="warning" />
<Icon icon={CheckCircle} variant="contained" color="success" />
<Icon icon={Settings} size="sm" />
```

**Features**:
- Lucide React integration
- 5 size options
- 6 color variations
- 3 visual variants

---

### **Other Atoms Summary**

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Avatar** | User profile images | Size variants, fallback initials |
| **Badge** | Status indicators | Color variants, sizes |
| **Checkbox** | Boolean input | Controlled/uncontrolled, disabled states |
| **Container** | Layout wrapper | Max-width, padding options |
| **Divider** | Visual separator | Horizontal/vertical, with text |
| **Flex** | Flexbox layout | Direction, alignment, gap |
| **Grid** | CSS Grid layout | Responsive columns, gap sizes |
| **Link** | Navigation links | Internal/external, styling variants |
| **Logo** | Brand identity | Size variants, fallback support |
| **Progress** | Progress indication | Value-based, animated |
| **Radio** | Single selection | Grouped options, controlled |
| **Select** | Dropdown selection | Options, placeholder, validation |
| **Skeleton** | Loading placeholder | Animated, size variants |
| **Spacer** | Layout spacing | Size-based vertical spacing |
| **Spinner** | Loading indicator | Size variants, color options |
| **Switch** | Toggle input | Controlled, disabled states |
| **Textarea** | Multi-line input | Rows, resize, validation |
| **Tooltip** | Contextual info | Positioning, trigger options |
| **Alert** | User notifications | Severity levels, dismissible |

---

## 🧪 MOLECULES (12 COMPONENTS)

### **1. SearchBox**
**File**: `src/components/molecules/SearchBox.tsx`  
**Purpose**: Advanced search input with button and clear functionality

**Props**:
```typescript
interface SearchBoxProps {
  placeholder?: string
  value?: string
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  onClear?: () => void
  clearable?: boolean
  loading?: boolean
}
```

**Usage Examples**:
```tsx
<SearchBox 
  placeholder="Search clients..." 
  onSearch={(query) => console.log(query)}
  clearable 
/>
```

**Features**:
- Search button integration
- Clear functionality
- Loading states
- Keyboard shortcuts (Enter, Escape)
- Icon integration

---

### **2. MetricCard**
**File**: `src/components/molecules/MetricCard.tsx`  
**Purpose**: Dashboard metric display with trend indicators

**Props**:
```typescript
interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: React.ReactNode
  loading?: boolean
}
```

**Usage Examples**:
```tsx
<MetricCard
  title="Total Users"
  value="24,567"
  change={0.12}
  changeType="positive"
  icon={<Icon icon={Users} />}
/>
```

**Features**:
- Trend calculation
- Visual change indicators
- Loading skeleton states
- Icon integration
- Responsive design

---

### **3. FormField**
**File**: `src/components/molecules/FormField.tsx`  
**Purpose**: Complete form field with label, input, and validation

**Props**:
```typescript
interface FormFieldProps {
  type?: string
  label?: string
  name: string
  value?: string | boolean
  error?: string
  helperText?: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
}
```

**Usage Examples**:
```tsx
<FormField
  type="email"
  label="Email Address"
  name="email"
  required
  error="Please enter a valid email"
/>
```

**Features**:
- Multiple input types support
- Validation error display
- Helper text
- Required field indicators
- Options for select/radio

---

### **Other Molecules Summary**

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **ButtonGroup** | Button collections | Horizontal grouping, selection states |
| **DropdownMenu** | Action menus | Positioning, keyboard navigation |
| **EmptyState** | No data display | Icon, title, description, action |
| **LoadingCard** | Loading placeholder | Skeleton content, animated |
| **PasswordInput** | Secure text input | Show/hide toggle, strength indicator |
| **StatusBadge** | Status display | Color coding, predefined statuses |
| **TabGroup** | Content switching | Active states, keyboard navigation |
| **ThemeSelector** | White-label theming | Color picker, preview |
| **UserMenu** | User actions | Profile, settings, logout |

---

## 🏢 ORGANISMS (6 COMPONENTS)

### **1. NavigationBar**
**File**: `src/components/organisms/NavigationBar.tsx`  
**Purpose**: Main application navigation with user menu

**Props**:
```typescript
interface NavigationBarProps {
  onMobileMenuClick?: () => void
  showMobileMenu?: boolean
  user?: User
}
```

**Features**:
- Responsive design
- Mobile hamburger menu
- User authentication state
- Logo integration
- Search functionality
- User menu dropdown

---

### **2. Sidebar**
**File**: `src/components/organisms/Sidebar.tsx`  
**Purpose**: Dashboard side navigation

**Features**:
- Collapsible design
- Active route highlighting
- Icon + text navigation
- Mobile drawer support
- Clean visual hierarchy

---

### **3. StatsOverview**
**File**: `src/components/organisms/StatsOverview.tsx`  
**Purpose**: Dashboard metrics grid

**Features**:
- Responsive grid layout
- Multiple metric cards
- Loading states
- Trend calculations
- Hover effects

---

### **Other Organisms Summary**

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **MobileNavigation** | Mobile menu drawer | Slide-out navigation, touch optimized |
| **Modal** | Dialog overlay | Backdrop, focus management, ESC handling |
| **RecentActivity** | Activity feed | Timeline, user actions, timestamps |

---

## 📐 TEMPLATES (3 COMPONENTS)

### **1. DashboardTemplate**
**File**: `src/components/templates/DashboardTemplate.tsx`  
**Purpose**: Main dashboard layout structure

**Props**:
```typescript
interface DashboardTemplateProps {
  children: React.ReactNode
  title?: string
  breadcrumb?: BreadcrumbItem[]
  actions?: React.ReactNode
  sidebar?: React.ReactNode
}
```

**Features**:
- Sidebar integration
- Breadcrumb navigation
- Action buttons area
- Mobile responsive
- Content area management

---

### **2. AuthTemplate**
**File**: `src/components/templates/AuthTemplate.tsx`  
**Purpose**: Authentication pages layout

**Features**:
- Centered content
- Brand integration
- Social login support
- Form validation display
- Responsive design

---

### **3. ShowcaseTemplate**
**File**: `src/components/templates/ShowcaseTemplate.tsx`  
**Purpose**: Component library demonstration

**Features**:
- Section-based organization
- Theme switching
- Code examples
- Interactive demos
- Navigation sidebar

---

## 🎨 WHITE-LABEL THEMING SYSTEM

### **Theme Structure**
```typescript
interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    neutral: string
    success: string
    warning: string
    error: string
  }
}
```

### **Available Themes**
- **Modern Blue** (Default)
- **Forest Green**
- **Sunset Orange**
- **Royal Purple**
- **Crimson Red**

### **Theme Application**
All components automatically respect the active theme through CSS custom properties and Tailwind CSS integration.

---

## 🛠️ DEVELOPMENT GUIDELINES

### **Component Creation Standards**
1. **TypeScript**: All components must be fully typed
2. **ForwardRef**: Use React.forwardRef for DOM access
3. **DisplayName**: Set component.displayName for debugging
4. **Props Interface**: Export prop interfaces for reusability
5. **Documentation**: Include JSDoc comments

### **Styling Guidelines**
1. **Tailwind First**: Use Tailwind CSS utilities
2. **Responsive**: Mobile-first responsive design
3. **Accessibility**: WCAG AA compliance
4. **Theming**: Support white-label customization
5. **Performance**: Optimize for runtime performance

### **Testing Strategy**
1. **Visual Testing**: Storybook-style showcase
2. **Unit Testing**: Jest + React Testing Library
3. **Integration Testing**: Page-level functionality
4. **Accessibility Testing**: Automated a11y checks

---

## 📋 COMPONENT USAGE EXAMPLES

### **Dashboard Page Example**
```tsx
import { DashboardTemplate } from '@/components/templates'
import { StatsOverview, RecentActivity } from '@/components/organisms'
import { Button, Typography } from '@/components/atoms'

export default function Dashboard() {
  return (
    <DashboardTemplate
      title="Dashboard"
      actions={<Button variant="primary">New Report</Button>}
    >
      <Typography variant="h2">Welcome back!</Typography>
      <StatsOverview />
      <RecentActivity />
    </DashboardTemplate>
  )
}
```

### **Form Page Example**
```tsx
import { FormField, SearchBox } from '@/components/molecules'
import { Button, Card } from '@/components/atoms'

export default function ClientForm() {
  return (
    <Card padding="lg">
      <FormField
        type="text"
        label="Client Name"
        name="name"
        required
      />
      <FormField
        type="email"
        label="Contact Email"
        name="email"
      />
      <Button variant="primary" type="submit">
        Save Client
      </Button>
    </Card>
  )
}
```

---

## 🔧 MAINTENANCE & UPDATES

### **Version Control**
- **Component Versioning**: Semantic versioning for breaking changes
- **Migration Guides**: Documentation for major updates
- **Changelog**: Detailed change tracking

### **Performance Monitoring**
- **Bundle Size**: Monitor component impact on bundle
- **Runtime Performance**: Profile rendering performance
- **Accessibility**: Regular a11y audits

### **Future Enhancements**
- **Animation Library**: Framer Motion integration
- **Advanced Components**: Data tables, charts, calendars
- **Theme Builder**: Visual theme customization tool
- **Component Generator**: CLI tool for new components

---

**Last Updated**: September 14, 2025  
**Version**: 1.0  
**Total Components**: 41  
**Production Ready**: ✅
