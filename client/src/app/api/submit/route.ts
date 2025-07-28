import { type NextRequest, NextResponse } from "next/server"
import { validateFormData } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const validation = validateFormData(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.errors,
          data: body, // Preserve the submitted data for form re-population
        },
        { status: 400 },
      )
    }

    // Simulate success
    console.log("API Route submission:", validation.data)

    return NextResponse.json({
      message: "Form submitted successfully using API Routes with Zod validation!",
      data: { ...validation.data, timestamp: new Date().toISOString() },
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        errors: { _form: ["An unexpected error occurred"] },
      },
      { status: 500 },
    )
  }
} 