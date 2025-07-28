"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServerActionForm } from "@/components/forms/server-action-form";
import { ApiRouteForm } from "@/components/forms/api-route-form";
import { Code, Server } from "lucide-react";
import { pageContent } from "@/lib/content";

export default function RootRoute() {
  const [activeForm, setActiveForm] = useState<"server-action" | "api-route">(
    "api-route"
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {pageContent.title}
          </h1>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-xl flex gap-2">
            <Button
              variant={activeForm === "api-route" ? "default" : "ghost"}
              onClick={() => setActiveForm("api-route")}
              className="flex items-center gap-2 rounded-lg"
            >
              <Code className="h-4 w-4" />
              {pageContent.toggleButtons.apiRoute}
            </Button>
            <Button
              variant={activeForm === "server-action" ? "default" : "ghost"}
              onClick={() => setActiveForm("server-action")}
              className="flex items-center gap-2 rounded-lg"
            >
              <Server className="h-4 w-4" />
              {pageContent.toggleButtons.serverAction}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                {activeForm === "server-action" ? (
                  <>
                    <Server className="h-6 w-6 text-green-600" />
                    {pageContent.formContent.serverAction.title}
                  </>
                ) : (
                  <>
                    <Code className="h-6 w-6 text-blue-600" />
                    {pageContent.formContent.apiRoute.title}
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                {activeForm === "server-action"
                  ? pageContent.formContent.serverAction.description
                  : pageContent.formContent.apiRoute.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeForm === "server-action" ? (
                <ServerActionForm />
              ) : (
                <ApiRouteForm />
              )}
            </CardContent>
          </Card>

          {/* Explanation */}
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">
                {pageContent.explanation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {activeForm === "server-action" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-green-600 text-lg mb-4">
                      {pageContent.explanation.serverAction.title}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      {pageContent.explanation.serverAction.features.map(
                        (feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-green-800 leading-relaxed">
                      <strong>Best for:</strong>{" "}
                      {pageContent.explanation.serverAction.bestFor}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-blue-600 text-lg mb-4">
                      {pageContent.explanation.apiRoute.title}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      {pageContent.explanation.apiRoute.features.map(
                        (feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      <strong>Best for:</strong>{" "}
                      {pageContent.explanation.apiRoute.bestFor}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
