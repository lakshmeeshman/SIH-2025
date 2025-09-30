/**
 * Utility functions for handling errors and sanitizing data
 */

// Helper function to sanitize data and remove any validation error objects
export const sanitizeData = (data: any): any => {
  if (data && typeof data === 'object') {
    // Check if this is a validation error object
    if ('type' in data || 'loc' in data || 'msg' in data || 'input' in data || 'ctx' in data || 'url' in data) {
      return null // Remove validation error objects
    }
    
    // Recursively sanitize nested objects and arrays
    const sanitized: any = {}
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        sanitized[key] = value.map(item => sanitizeData(item)).filter(item => item !== null)
      } else if (value && typeof value === 'object') {
        const sanitizedValue = sanitizeData(value)
        if (sanitizedValue !== null) {
          sanitized[key] = sanitizedValue
        }
      } else {
        sanitized[key] = value
      }
    }
    return sanitized
  }
  return data
}

// Helper function to check if a value is a validation error object
export const isValidationError = (value: any): boolean => {
  return value && typeof value === 'object' && 
         ('type' in value || 'loc' in value || 'msg' in value || 'input' in value || 'ctx' in value || 'url' in value)
}

// Helper function to extract error message from API errors
export const extractErrorMessage = (error: any, defaultMessage: string = 'An error occurred'): string => {
  if (error.response?.data?.detail) {
    if (Array.isArray(error.response.data.detail)) {
      // Handle Pydantic validation errors
      const validationErrors = error.response.data.detail
      const errorMessages = validationErrors.map((err: any) => {
        if (err.loc && err.msg) {
          const field = err.loc[err.loc.length - 1]
          return `${field}: ${err.msg}`
        }
        return err.msg || 'Validation error'
      })
      return errorMessages.join(', ')
    } else {
      return error.response.data.detail
    }
  } else if (error.message) {
    return error.message
  }
  return defaultMessage
}

// Helper function to safely render data in React components
export const safeRender = (data: any, fallback: any = ''): any => {
  if (isValidationError(data)) {
    return fallback
  }
  return data
}
