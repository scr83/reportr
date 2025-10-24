// Validation schemas and functions for branding settings

export interface BrandingValidationError {
  field: string
  message: string
}

export interface BrandingData {
  companyName: string
  primaryColor: string
  logo?: string
  whiteLabelEnabled: boolean
}

export function validateCompanyName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Company name is required'
  }
  
  if (name.trim().length > 50) {
    return 'Company name must be 50 characters or less'
  }
  
  if (name.trim().length < 2) {
    return 'Company name must be at least 2 characters'
  }
  
  // Check for only valid characters (letters, numbers, spaces, basic punctuation)
  const validPattern = /^[a-zA-Z0-9\s\-&'.,!]+$/
  if (!validPattern.test(name.trim())) {
    return 'Company name contains invalid characters'
  }
  
  return null
}

export function validatePrimaryColor(color: string): string | null {
  if (!color || color.trim().length === 0) {
    return 'Primary color is required'
  }
  
  // Check for valid hex color format
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (!hexPattern.test(color)) {
    return 'Please enter a valid hex color (e.g., #3B82F6)'
  }
  
  return null
}

export function validateLogoUrl(url: string): string | null {
  if (!url || url.trim().length === 0) {
    return null // Logo is optional
  }
  
  // Check if it's a data URL (base64 image)
  if (url.startsWith('data:image/')) {
    // Basic validation for data URL format
    const dataUrlPattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/
    if (!dataUrlPattern.test(url)) {
      return 'Invalid image format. Please use PNG, JPEG, GIF, or WebP'
    }
    
    // Check approximate size (base64 is ~33% larger than original)
    const sizeInBytes = (url.length * 3) / 4
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (sizeInBytes > maxSize) {
      return 'Image size must be less than 2MB'
    }
    
    return null
  }
  
  // Check if it's a valid HTTP/HTTPS URL
  try {
    const urlObj = new URL(url)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return 'Logo URL must use HTTP or HTTPS protocol'
    }
    
    // Check for image file extension
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
    const hasValidExtension = validExtensions.some(ext => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    )
    
    if (!hasValidExtension) {
      return 'URL must point to an image file (PNG, JPG, GIF, WebP, or SVG)'
    }
    
  } catch (error) {
    return 'Please enter a valid URL'
  }
  
  return null
}

export function validateBrandingData(data: BrandingData): BrandingValidationError[] {
  const errors: BrandingValidationError[] = []
  
  const companyNameError = validateCompanyName(data.companyName)
  if (companyNameError) {
    errors.push({ field: 'companyName', message: companyNameError })
  }
  
  const primaryColorError = validatePrimaryColor(data.primaryColor)
  if (primaryColorError) {
    errors.push({ field: 'primaryColor', message: primaryColorError })
  }
  
  if (data.logo) {
    const logoError = validateLogoUrl(data.logo)
    if (logoError) {
      errors.push({ field: 'logo', message: logoError })
    }
  }
  
  return errors
}

export function isValidImageFile(file: File): string | null {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return 'Please select an image file'
  }
  
  // Check file size (2MB max)
  const maxSize = 2 * 1024 * 1024
  if (file.size > maxSize) {
    return 'File size must be less than 2MB'
  }
  
  // Check for supported formats
  const supportedTypes = [
    'image/png',
    'image/jpeg', 
    'image/jpg',
    'image/gif',
    'image/webp'
  ]
  
  if (!supportedTypes.includes(file.type)) {
    return 'Unsupported image format. Please use PNG, JPEG, GIF, or WebP'
  }
  
  return null
}