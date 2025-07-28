interface SubmitFormServiceData {
  name: string;
  email: string;
  message: string;
}

interface SubmitFormServiceResponse {
  ok: boolean;
  data?: any;
  error?: string;
}

export async function submitFormService(
  data: SubmitFormServiceData
): Promise<SubmitFormServiceResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const path = "/api/form-submissions";
  const apiKey = process.env.FORM_SUBMISSION_PUBLIC_KEY;

  if (!apiKey) {
    return { 
      ok: false, 
      error: "API key is not configured" 
    };
  }

  const url = new URL(path, baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ data }),
    });

    const result = await response.json();
    
    if (!response.ok || result.error) {
      return { 
        ok: false, 
        error: result.error?.message || "Request failed" 
      };
    }

    return { 
      ok: true, 
      data: result 
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    console.error("Form submission error:", errorMessage);
    
    return { 
      ok: false, 
      error: errorMessage 
    };
  }
}
