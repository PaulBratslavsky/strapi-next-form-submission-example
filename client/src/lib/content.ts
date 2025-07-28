export const pageContent = {
  title: "Next.js and Strapi Form Submission Demo",
  toggleButtons: {
    apiRoute: "API Routes",
    serverAction: "Server Actions",
  },
  formContent: {
    serverAction: {
      title: "Server Actions Form",
      description: "Using Server Actions with 'use server' directive",
      submitButtonText: "Submit with Server Action"
    },
    apiRoute: {
      title: "API Routes Form", 
      description: "Using traditional API routes with fetch",
      submitButtonText: "Submit with API Route"
    }
  },
  formFields: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    messagePlaceholder: "Enter your message"
  },
  explanation: {
    title: "How it works",
    serverAction: {
      title: "Server Actions + Zod",
      features: [
        "Uses the \"use server\" directive",
        "Can be defined inline or in separate files",
        "Automatically handles form serialization",
        "Works with progressive enhancement",
        "Integrates with React's useActionState hook",
        "No need to create API endpoints",
        "Zod validation on server-side"
      ],
      bestFor: "Simple forms, mutations, and when you want tight integration with React components. Zod provides type-safe validation."
    },
    apiRoute: {
      title: "API Routes + Zod",
      features: [
        "Traditional REST API endpoints",
        "Located in app/api/ directory",
        "Requires manual fetch requests",
        "More control over request/response",
        "Can be called from anywhere",
        "Better for complex API logic",
        "Zod validation with detailed error responses"
      ],
      bestFor: "Complex API logic, external integrations, and when you need RESTful endpoints. Zod ensures data integrity."
    }
  }
} 