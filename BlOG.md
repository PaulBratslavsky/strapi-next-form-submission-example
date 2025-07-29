



``` ts

// submitFormService - sends form data to Strapi
async function submitFormService(data) {
  fetch("https://your-strapi-api.com/api/form-submissions", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_PUBLIC_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
}

```




``` ts



// API route for form submission
export async function POST(req) {
  const data = await req.json();

  // 1. Validate form data
  const result = validateFormData(data);
  if (!result.success) return errorResponse("Validation failed");

  // 2. Submit to Strapi
  const response = await submitFormService(result.data);
  if (!response.ok) return errorResponse("Submission failed");

  // 3. Return success
  return successResponse(result.data);
}

```






``` ts



// Server action for handling form submission
async function submitWithServerAction(prevState, formData) {
  const data = extractData(formData, prevState);

  // 1. Validate input
  const result = validateFormData(data);
  if (!result.success) return validationErrorState(data);

  // 2. Submit to Strapi
  const response = await submitFormService(result.data);
  if (!response.ok) return submissionErrorState(data);

  // 3. Return success state
  return successState(result.data);
}


```




``` ts

// handleSubmit - sends form data to API
async function handleSubmit(e) {
  e.preventDefault();
  const data = getFormData(e);

  try {
    const res = await fetch("/api/submit", { method: "POST", body: JSON.stringify(data) });
    const result = await res.json();

    res.ok ? showSuccess(result) : showError(result, data);
  } catch {
    showNetworkError(data);
  }
}


```