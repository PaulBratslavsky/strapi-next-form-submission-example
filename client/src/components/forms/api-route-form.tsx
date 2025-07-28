"use client";

import { useState } from "react";
import { BaseForm, FormField, type FormState, VALIDATION_RULES } from "./base-form";
import { User, Mail, MessageSquare } from "lucide-react";

export function ApiRouteForm() {
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<FormState | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setState(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setState({
          success: true,
          message: result.message,
          data: result.data,
        });
        form.reset();
      } else {
        setState({
          success: false,
          message: result.message || "Something went wrong",
          errors: result.errors,
          data: data, // Preserve the submitted data for form re-population
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setState({
        success: false,
        message: "Network error occurred",
        errors: { _form: ["Network error occurred"] },
        data: data, // Preserve the submitted data even on network errors
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <BaseForm
      state={state}
      isPending={isPending}
      onSubmit={handleSubmit}
      submitText="Submit with API Route + Zod"
      pendingText="Validating & Submitting..."
    >
      <FormField
        id="api-name"
        label="Name"
        name="name"
        type="text"
        placeholder="Enter your name"
        icon={User}
        errors={state?.errors}
        isPending={isPending}
        maxLength={VALIDATION_RULES.name.maxLength}
        defaultValue={state?.data?.name}
      />

      <FormField
        id="api-email"
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        icon={Mail}
        errors={state?.errors}
        isPending={isPending}
        maxLength={VALIDATION_RULES.email.maxLength}
        defaultValue={state?.data?.email}
      />

      <FormField
        id="api-message"
        label="Message"
        name="message"
        type="textarea"
        placeholder="Your message here... (minimum 10 characters)"
        icon={MessageSquare}
        errors={state?.errors}
        isPending={isPending}
        minLength={VALIDATION_RULES.message.minLength}
        maxLength={VALIDATION_RULES.message.maxLength}
        defaultValue={state?.data?.message}
      />
    </BaseForm>
  );
}
