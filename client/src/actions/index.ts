"use server"

import { validateFormData } from "@/lib/validation"
import { submitFormService } from "@/service"

export async function submitWithServerAction(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  }

  // Validate with Zod
  const validation = validateFormData(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: validation.errors,
      data: rawData, // Preserve the submitted data for form re-population
    }
  }

  const response = await submitFormService(validation.data)
  console.dir(response, { depth: null })

  return {
    success: true,
    message: "Form submitted successfully using Server Actions with Zod validation!",
    data: { ...validation.data, timestamp: new Date().toISOString() },
  }
}
