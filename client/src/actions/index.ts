"use server"

import { validateFormData } from "@/lib/validation"
import { submitFormService } from "@/service"
import { ERROR_MESSAGES } from "@/lib/errors"
import type { FormState } from "@/components/forms/base-form"

export async function submitWithServerAction(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  }

  // Merge with previous state to preserve all user input
  const mergedData = {
    name: rawData.name || prevState?.data?.name || "",
    email: rawData.email || prevState?.data?.email || "",
    message: rawData.message || prevState?.data?.message || "",
  }

  // Validate with Zod
  const validation = validateFormData(rawData)

  if (!validation.success) {
    return {
      success: false,
      message: ERROR_MESSAGES.FIX_ERRORS_BELOW,
      errors: validation.errors,
      data: mergedData,
    }
  }

  try {
    const response = await submitFormService(validation.data!)
    
    if (!response.ok) {
      return {
        success: false,
        message: response.error || "Failed to submit form",
        errors: { _form: [response.error || "Failed to submit form"] },
        data: mergedData,
      }
    } 
    console.log(response, "response")
    
    return {
      success: true,
      message: ERROR_MESSAGES.SERVER_ACTION_SUCCESS,
      data: { ...validation.data, timestamp: new Date().toISOString() },
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      errors: { _form: [ERROR_MESSAGES.INTERNAL_SERVER_ERROR] },
      data: mergedData,
    }
  }
}
