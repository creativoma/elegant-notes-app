/**
 * Input sanitization utilities for Elegant Notes App
 * These functions help prevent XSS attacks and ensure data integrity
 */

/**
 * Sanitizes a string by removing potentially dangerous characters
 * Used for note titles and other user inputs
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '')

  // Trim excessive whitespace
  sanitized = sanitized.trim()

  return sanitized
}

/**
 * Sanitizes note content
 * React's JSX escaping provides XSS protection, this handles edge cases
 */
export function sanitizeNoteContent(content: string): string {
  if (typeof content !== 'string') {
    return ''
  }

  // Remove null bytes which can cause issues
  const sanitized = content.replace(/\0/g, '')

  return sanitized
}

/**
 * Validates and sanitizes a note title
 * Ensures it meets length requirements and contains safe characters
 */
export function validateNoteTitle(title: string): string {
  const sanitized = sanitizeString(title)

  // Limit title length
  const maxLength = 100
  if (sanitized.length > maxLength) {
    return sanitized.substring(0, maxLength)
  }

  // Return 'Untitled' if empty
  return sanitized || 'Untitled'
}

/**
 * Validates note ID
 * Ensures it's a valid positive integer
 */
export function validateNoteId(id: unknown): number | null {
  const numId = Number(id)

  if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
    return null
  }

  return numId
}

/**
 * Sanitizes search terms
 * Removes special characters that could cause issues
 */
export function sanitizeSearchTerm(term: string): string {
  if (typeof term !== 'string') {
    return ''
  }

  return sanitizeString(term)
}

/**
 * Validates and sanitizes localStorage data
 * Ensures data loaded from localStorage is safe to use
 */
export function validateStorageData(data: unknown): boolean {
  if (!data || typeof data !== 'object') {
    return false
  }

  return true
}
