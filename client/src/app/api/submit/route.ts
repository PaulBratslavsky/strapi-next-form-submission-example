import { type NextRequest, NextResponse } from "next/server";
import { validateFormData } from "@/lib/validation";
import { ERROR_MESSAGES } from "@/lib/errors";
import { submitFormService } from "@/service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = validateFormData(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: ERROR_MESSAGES.VALIDATION_FAILED,
          errors: validation.errors,
          data: body, // Preserve the submitted data for form re-population
        },
        { status: 400 }
      );
    }

    const response = await submitFormService(validation.data!);

    if (!response.ok) {
      return NextResponse.json(
        {
          message: response.error || "Failed to submit form",
          errors: { _form: [response.error || "Failed to submit form"] },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: ERROR_MESSAGES.API_SUCCESS,
      data: { ...validation.data, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        errors: { _form: [ERROR_MESSAGES.UNEXPECTED_ERROR] },
      },
      { status: 500 }
    );
  }
}
