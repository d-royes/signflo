"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function DynamicForm({ schema }: { schema: any }) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form data ready to be merged into PDF: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="mb-10 text-center border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-serif">
          {schema.title || "Agreement"}
        </h1>
        {schema.documentType && (
          <p className="mt-2 text-sm uppercase tracking-widest text-gray-400 font-semibold">
            {schema.documentType}
          </p>
        )}
      </div>

      {schema.contentMarkdown && (
        <div className="mb-10 prose prose-sm sm:prose-base max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <ReactMarkdown>{schema.contentMarkdown}</ReactMarkdown>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {schema.fields && schema.fields.length > 0 && (
          <div className="space-y-6">
            {schema.fields.map((field: any) => (
              <div key={field.id} className="flex flex-col">
                <label htmlFor={field.id} className="mb-2 text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === "checkbox" ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={field.id}
                      required={field.required}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={(e) => handleChange(field.id, e.target.checked)}
                    />
                    <span className="ml-3 text-sm text-gray-600">Select to confirm</span>
                  </div>
                ) : (
                  <input
                    type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                    id={field.id}
                    required={field.required}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {schema.signatures && schema.signatures.length > 0 && (
          <div className="pt-8 mt-8 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 font-serif">Signatures Required</h3>
            <div className="space-y-6">
              {schema.signatures.map((sig: any) => (
                <div key={sig.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                  <p className="text-sm font-medium text-gray-800 mb-1">{sig.label}</p>
                  <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">{sig.role}</p>
                  <div className="h-32 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                    [ Canvas Signature Pad goes here in Day 3 ]
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-4 px-6 text-white bg-gray-900 hover:bg-black rounded-xl font-medium transition-colors shadow-lg shadow-gray-200"
          >
            Submit & Sign Agreement
          </button>
        </div>
      </form>
    </div>
  );
}
