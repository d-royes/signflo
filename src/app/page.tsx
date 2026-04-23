"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to process image");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Signflo
          </h1>
          <p className="text-lg text-gray-600">
            Agreement Engine — Vision Ingestion Pipeline (Day 1)
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <form onSubmit={handleUpload} className="flex flex-col items-center gap-6">
            <div className="w-full">
              <label 
                htmlFor="file-upload" 
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">Document photo (JPEG, PNG, WEBP)</p>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              {file && (
                <p className="mt-4 text-sm font-medium text-center text-blue-600">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {loading ? "Extracting Schema..." : "Extract Document"}
            </button>
          </form>
        </section>

        {error && (
          <div className="p-4 mb-8 text-red-700 bg-red-50 rounded-xl border border-red-200">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <section className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-sm text-gray-400 font-mono">schema.json</span>
            </div>
            <pre className="p-6 text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
