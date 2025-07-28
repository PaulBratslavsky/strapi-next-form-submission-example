"use client";

import { useActionState } from "react";
import { submitWithServerAction } from "@/actions";
import { BaseForm, FormField, type FormState, VALIDATION_RULES } from "./base-form";
import { User, Mail, MessageSquare } from "lucide-react";

export function ServerActionForm() {
  const [state, action, isPending] = useActionState(
    submitWithServerAction,
    null
  );

  return (
    <BaseForm
      state={state}
      isPending={isPending}
      action={action}
      submitText="Submit with Server Action + Zod"
      pendingText="Validating & Submitting..."
    >
      <FormField
        id="sa-name"
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
        id="sa-email"
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
        id="sa-message"
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
