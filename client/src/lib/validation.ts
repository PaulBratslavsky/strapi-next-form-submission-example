import { z } from "zod"

// Form schema with enhanced validation
export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
})

export type FormData = z.infer<typeof formSchema>

export interface ValidationResult {
  success: boolean
  data?: FormData
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    _form?: string[]
  }
}

export function validateFormData(data: unknown): ValidationResult {
  const result = formSchema.safeParse(data)

  if (result.success) {
    return {
      success: true,
      data: result.data,
    }
  }

  const errors: ValidationResult["errors"] = {}

  // Zod v4: result.error.issues instead of result.error.errors
  result.error.issues.forEach((issue: z.ZodIssue) => {
    const field = issue.path[0] as string
    if (field && field !== "_form" && (field === "name" || field === "email" || field === "message")) {
      if (!errors[field]) {
        errors[field] = []
      }
      errors[field]!.push(issue.message)
    }
  })

  return {
    success: false,
    errors,
  }
}

// Helper function to get field-specific error messages
export function getFieldError(errors: ValidationResult["errors"], field: keyof ValidationResult["errors"]): string | undefined {
  return errors?.[field]?.[0]
}

// Helper function to check if form has any errors
export function hasErrors(errors: ValidationResult["errors"]): boolean {
  return !!errors && Object.keys(errors).length > 0
}
