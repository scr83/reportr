'use client'

import React from 'react'
import { 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  Switch,
  Card, 
  Badge, 
  Avatar, 
  Icon, 
  Logo, 
  Typography,
  Container, 
  Spacer, 
  Grid, 
  Flex, 
  Divider,
  Spinner, 
  Progress, 
  Skeleton, 
  Alert, 
  Tooltip, 
  Link
} from '@/components/atoms'
import {
  FormField,
  SearchBox,
  PasswordInput,
  DropdownMenu,
  ButtonGroup,
  TabGroup,
  MetricCard,
  StatusBadge,
  EmptyState,
  LoadingCard
} from '@/components/molecules'
import { Modal } from '@/components/organisms'
import { ShowcaseTemplate } from '@/components/templates'
import { ThemeProvider } from '@/contexts/ThemeContext'

export interface ShowcaseSection {
  id: string
  title: string
  description?: string
  component: React.ReactNode
  code?: string
}
import { 
  Heart, 
  Star, 
  Download, 
  Settings, 
  User, 
  Mail,
  Search,
  TrendingUp,
  Users,
  AlertCircle,
  Eye
} from 'lucide-react'

export default function ShowcasePage() {
  const sections: ShowcaseSection[] = [
    // ATOMS
    {
      id: 'buttons',
      title: 'Buttons',
      description: 'Interactive button components with various styles and sizes',
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography variant="h4">Variants</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="error">Danger</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <Typography variant="h4">Sizes</Typography>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4">With Icons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <Icon icon={Heart} size="sm" className="mr-2" />
                Like
              </Button>
              <Button variant="secondary">
                <Icon icon={Download} size="sm" className="mr-2" />
                Download
              </Button>
              <Button variant="ghost">
                <Icon icon={Settings} size="sm" />
              </Button>
            </div>
          </div>
        </div>
      ),
      code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`
    },

    {
      id: 'inputs',
      title: 'Form Inputs',
      description: 'Input components for forms and user interaction',
      component: (
        <div className="space-y-6 w-full max-w-sm sm:max-w-md mx-auto">
          <Input placeholder="Enter your name" label="Name" />
          <Input type="email" placeholder="email@example.com" label="Email" />
          <Textarea placeholder="Enter your message..." rows={3} label="Message" />
          <Select label="Options">
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Select>
          <div className="space-y-3">
            <Checkbox label="I agree to the terms" />
            <div className="space-y-2">
              <Radio name="option" value="1" label="Option 1" />
              <Radio name="option" value="2" label="Option 2" />
            </div>
            <div className="flex items-center space-x-3">
              <Switch />
              <Typography variant="body">Enable notifications</Typography>
            </div>
          </div>
        </div>
      ),
      code: `<Input placeholder="Enter your name" label="Name" />
<Textarea placeholder="Enter your message..." label="Message" />
<Select label="Options">
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
</Select>
<Checkbox label="I agree to the terms" />
<Radio name="option" value="1" label="Option 1" />
<Switch />`
    },

    {
      id: 'typography',
      title: 'Typography',
      description: 'Text styling and typography hierarchy',
      component: (
        <div className="space-y-4">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="body">
            This is body text. It&apos;s the standard text size used for paragraphs and most content.
          </Typography>
          <Typography variant="caption">This is caption text, smaller and more subdued.</Typography>
        </div>
      ),
      code: `<Typography variant="h1">Heading 1</Typography>
<Typography variant="body">Body text</Typography>
<Typography variant="caption">Caption text</Typography>`
    },

    {
      id: 'cards',
      title: 'Cards & Layout',
      description: 'Card components and layout primitives',
      component: (
        <div className="space-y-6">
          <Grid cols={1} gap="md" className="sm:grid-cols-2">
            <Card className="p-6">
              <Typography variant="h4" className="mb-2">Simple Card</Typography>
              <Typography variant="body" className="text-neutral-600">
                This is a basic card with some content.
              </Typography>
            </Card>
            <Card className="p-6">
              <Flex align="center" className="space-x-3 mb-4">
                <Avatar size="md" name="John Doe" />
                <div>
                  <Typography variant="h5">John Doe</Typography>
                  <Typography variant="caption" className="text-neutral-600">
                    Software Engineer
                  </Typography>
                </div>
              </Flex>
              <Typography variant="body" className="text-neutral-600">
                Card with avatar and user info.
              </Typography>
            </Card>
          </Grid>
        </div>
      ),
      code: `<Card className="p-6">
  <Typography variant="h4">Card Title</Typography>
  <Typography variant="body">Card content</Typography>
</Card>`
    },

    {
      id: 'badges',
      title: 'Badges & Status',
      description: 'Status indicators, badges, and notification components',
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography variant="h4">Badges</Typography>
            <div className="flex flex-wrap gap-3">
              <Badge variant="brand">Primary</Badge>
              <Badge variant="neutral">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4">Status Badges</Typography>
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="success" label="Completed" />
              <StatusBadge status="pending" label="Pending" />
              <StatusBadge status="error" label="Failed" />
            </div>
          </div>
        </div>
      ),
      code: `<Badge variant="primary">Primary</Badge>
<StatusBadge status="completed">Completed</StatusBadge>`
    },

    {
      id: 'loading',
      title: 'Loading States',
      description: 'Spinners, progress bars, and skeleton loading states',
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography variant="h4">Spinners</Typography>
            <div className="flex items-center gap-4">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4">Progress Bar</Typography>
            <Progress value={65} className="w-full max-w-md" />
          </div>

          <div className="space-y-4">
            <Typography variant="h4">Skeleton</Typography>
            <div className="space-y-3 max-w-md">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      ),
      code: `<Spinner size="md" />
<Progress value={65} />
<Skeleton className="h-4 w-3/4" />`
    },

    // MOLECULES
    {
      id: 'forms',
      title: 'Form Components',
      description: 'Complex form inputs and field components',
      component: (
        <div className="space-y-6 w-full max-w-sm sm:max-w-md mx-auto">
          <FormField
            type="email"
            label="Email Address"
            name="email"
            placeholder="john@example.com"
            required
          />

          <SearchBox 
            placeholder="Search everything..." 
            onSearch={(query) => console.log('Search:', query)}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
          />
        </div>
      ),
      code: `<FormField label="Email Address" required>
  <Input type="email" placeholder="john@example.com" />
</FormField>

<SearchBox placeholder="Search..." />
<PasswordInput placeholder="Enter password" />`
    },

    {
      id: 'navigation',
      title: 'Navigation',
      description: 'Navigation components and interactive elements',
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography variant="h4">Button Groups</Typography>
            <div className="flex">
              <Button variant="secondary">Left</Button>
              <Button variant="secondary" className="ml-2">Center</Button>
              <Button variant="secondary" className="ml-2">Right</Button>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4">Tab Groups</Typography>
            <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
              <button className="px-3 py-2 bg-white rounded-md shadow-sm text-sm font-medium">Overview</button>
              <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">Analytics</button>
              <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">Reports</button>
            </div>
          </div>
        </div>
      ),
      code: `<ButtonGroup>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>

<TabGroup 
  tabs={[{ id: '1', label: 'Tab 1' }]}
  activeTab="1"
/>`
    },

    {
      id: 'metrics',
      title: 'Metrics & Data',
      description: 'Data visualization and metric display components',
      component: (
        <div className="space-y-6">
          <Grid cols={1} gap="md" className="sm:grid-cols-2">
            <MetricCard
              title="Total Users"
              value="24,567"
              change={0.12}
              changeType="positive"
              icon={<Icon icon={Users} size="md" />}
            />
            <MetricCard
              title="Revenue"
              value="$45,678"
              change={0.082}
              changeType="positive"
              icon={<Icon icon={TrendingUp} size="md" />}
            />
          </Grid>
        </div>
      ),
      code: `<MetricCard
  title="Total Users"
  value="24,567"
  description="Active users"
  trend="+12% from last month"
  trendDirection="up"
  icon={Users}
  color="blue"
/>`
    },

    {
      id: 'feedback',
      title: 'Alerts & Feedback',
      description: 'Alert messages, tooltips, and user feedback components',
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Typography variant="h4">Alerts</Typography>
            <div className="space-y-3">
              <Alert variant="info" title="Information">
                This is an informational alert message.
              </Alert>
              <Alert variant="success" title="Success">
                Your changes have been saved successfully.
              </Alert>
              <Alert variant="warning" title="Warning">
                Please review your settings before continuing.
              </Alert>
              <Alert variant="error" title="Error">
                Something went wrong. Please try again.
              </Alert>
            </div>
          </div>

          <div className="space-y-4">
            <Typography variant="h4">Empty States</Typography>
            <Card className="p-8">
              <EmptyState
                title="No data found"
                description="Get started by adding your first item"
                icon={<Icon icon={AlertCircle} size="lg" />}
              />
            </Card>
          </div>
        </div>
      ),
      code: `<Alert variant="success" title="Success">
  Your changes have been saved.
</Alert>

<EmptyState 
  title="No data found"
  description="Get started by adding items"
/>`
    },

    // WHITE-LABEL THEME DEMO
    {
      id: 'themes',
      title: 'White-Label Themes',
      description: 'Demonstrate theme customization capabilities for different brand styles',
      component: (
        <div className="space-y-6 w-full">
          <Typography variant="h4">Theme Customization Demo</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample UI Elements with Current Theme */}
            <Card className="p-6">
              <Typography variant="h5" className="mb-4">Sample Interface</Typography>
              <div className="space-y-4">
                <Button variant="primary" size="sm" className="w-full">
                  Primary Action
                </Button>
                <Button variant="secondary" size="sm" className="w-full">
                  Secondary Action
                </Button>
                <Input placeholder="Sample input field" />
                <div className="flex space-x-2">
                  <Badge variant="brand">Brand</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Typography variant="h5" className="mb-4">Metrics Preview</Typography>
              <MetricCard
                title="Sample Metric"
                value="1,234"
                change={0.15}
                changeType="positive"
                icon={<Icon icon={TrendingUp} size="md" />}
              />
            </Card>

            <Card className="p-6">
              <Typography variant="h5" className="mb-4">Status Indicators</Typography>
              <div className="space-y-3">
                <StatusBadge status="success" label="Completed" />
                <StatusBadge status="pending" label="In Progress" />
                <StatusBadge status="error" label="Failed" />
              </div>
            </Card>
          </div>

          <Alert variant="info" title="White-Label Ready">
            Use the theme selector above to see how the interface adapts to different brand styles. 
            Each theme demonstrates how the same components can look completely different with just color changes.
          </Alert>
        </div>
      ),
      code: `// Theme Configuration Example
const customTheme = {
  id: 'custom',
  name: 'Custom Brand',
  primary: '#your-brand-color',
  secondary: '#your-accent-color',
  neutral: '#your-neutral-color'
}

// Apply theme
<ThemeProvider theme={customTheme}>
  <YourApp />
</ThemeProvider>`
    }
  ]

  return (
    <ThemeProvider>
      <ShowcaseTemplate
        title="Component Showcase"
        description="Explore our complete design system with interactive examples and white-label themes"
        sections={sections}
        showThemeToggle={true}
      />
    </ThemeProvider>
  )
}