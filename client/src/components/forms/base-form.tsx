"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export interface FormFields {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string[];
  email?: string[];
  message?: string[];
  _form?: string[];
}

export interface FormState {
  success: boolean;
  message: string;
  data?: {
    name?: string;
    email?: string;
    message?: string;
    timestamp?: string;
  };
  errors?: FormErrors;
}

export interface FormFieldProps {
  id: string;
  label: string;
  name: keyof FormFields;
  type: "text" | "email" | "textarea";
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  errors?: FormErrors;
  isPending: boolean;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

export function FormField({
  id,
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  errors,
  isPending,
  minLength,
  maxLength,
  defaultValue,
}: FormFieldProps) {
  const hasError = errors?.[name];
  const errorMessage = hasError?.[0];

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        {type === "textarea" ? (
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`pl-10 min-h-[100px] resize-none ${
              hasError ? "border-red-500 focus:border-red-500" : ""
            }`}
            disabled={isPending}
            minLength={minLength}
            maxLength={maxLength}
          />
        ) : (
          <Input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`pl-10 ${
              hasError ? "border-red-500 focus:border-red-500" : ""
            }`}
            disabled={isPending}
            minLength={minLength}
            maxLength={maxLength}
          />
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export interface ResponseDisplayProps {
  state: FormState;
}

export function ResponseDisplay({ state }: ResponseDisplayProps) {
  if (!state || state.errors) return null;

  return (
    <div
      className={`p-4 rounded-lg border ${
        state.success
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center gap-2">
        {state.success ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <p className="font-medium">
          {state.success ? "Success!" : "Error"}
        </p>
      </div>
      <p className="text-sm mt-1">{state.message}</p>
      {state.data && (
        <div className="mt-2 text-xs bg-white bg-opacity-50 p-2 rounded">
          <strong>Validated & submitted data:</strong>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export interface FormErrorDisplayProps {
  errors?: FormErrors;
}

export function FormErrorDisplay({ errors }: FormErrorDisplayProps) {
  if (!errors?._form) return null;

  return (
    <div className="p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <p className="font-medium">Error</p>
      </div>
      <p className="text-sm mt-1">{errors._form[0]}</p>
    </div>
  );
}

export const VALIDATION_RULES = {
  name: { required: true, maxLength: 50 },
  email: { required: true, maxLength: 100 },
  message: { required: true, minLength: 10, maxLength: 500 },
} as const;

export interface BaseFormProps {
  state: FormState | null;
  isPending: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  action?: (formData: FormData) => void;
  submitText: string;
  pendingText: string;
  children: React.ReactNode;
}

export function BaseForm({
  state,
  isPending,
  onSubmit,
  action,
  submitText,
  pendingText,
  children,
}: BaseFormProps) {
  return (
    <div className="space-y-6">
      <form 
        onSubmit={onSubmit} 
        action={action}
        className="space-y-4"
      >
        {children}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? pendingText : submitText}
        </Button>
      </form>

      <ResponseDisplay state={state!} />
      <FormErrorDisplay errors={state?.errors} />

      {/* Validation Info */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <strong>Pure Zod Validation (no HTML required):</strong>
        <ul className="mt-1 space-y-1">
          <li>• Name: Required, max {VALIDATION_RULES.name.maxLength} chars</li>
          <li>• Email: Required, valid format, max {VALIDATION_RULES.email.maxLength} chars</li>
          <li>• Message: Required, min {VALIDATION_RULES.message.minLength} chars, max {VALIDATION_RULES.message.maxLength} chars</li>
          <li>• Try submitting empty fields to see Zod errors!</li>
        </ul>
      </div>
    </div>
  );
} 