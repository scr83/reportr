/**
 * Utility functions for applying dynamic theming based on CSS variables
 */

/**
 * Get styles for primary color backgrounds
 */
export const getPrimaryStyles = () => ({
  backgroundColor: 'var(--primary-color)',
})

/**
 * Get styles for primary color backgrounds with opacity
 */
export const getPrimaryBackgroundStyles = (opacity: number = 0.1) => ({
  backgroundColor: `rgba(var(--primary-color-rgb), ${opacity})`,
})

/**
 * Get styles for primary color text
 */
export const getPrimaryTextStyles = () => ({
  color: 'var(--primary-color)',
})

/**
 * Get styles for primary color borders
 */
export const getPrimaryBorderStyles = () => ({
  borderColor: 'var(--primary-color)',
})

/**
 * Get styles for hover states with primary color
 */
export const getPrimaryHoverStyles = () => ({
  '--tw-ring-color': 'var(--primary-color)',
} as React.CSSProperties)

/**
 * Combined styles for primary buttons
 */
export const getPrimaryButtonStyles = () => ({
  backgroundColor: 'var(--primary-color)',
  borderColor: 'var(--primary-color)',
})

/**
 * Combined styles for primary button hover states
 */
export const getPrimaryButtonHoverStyles = () => ({
  filter: 'brightness(0.9)',
})