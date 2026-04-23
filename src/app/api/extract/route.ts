import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert the File to a Buffer, then to Base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-3.1-pro-preview" });

    const systemPrompt = `You are an expert legal document analyst. 
Your task is to analyze the provided image of a document (which could be an NDA, consent form, contract, or general agreement) and extract its structure into a detailed JSON schema.

Requirements for the JSON structure:
{
  "title": "Document Title",
  "documentType": "e.g., NDA, Consent Form",
  "contentMarkdown": "The complete, unabridged text of the agreement formatted in Markdown. Transcribe everything exactly. For any blank lines, checkboxes, signature lines, or input fields found in the original document, insert the exact string `{{field_id}}` (where field_id matches the id in the fields or signatures array below).",
  "fields": [
    {
      "id": "unique_field_id",
      "label": "The human-readable label for the field (e.g. 'Full Name')",
      "type": "text | email | date | checkbox | number",
      "required": true/false
    }
  ],
  "signatures": [
    {
      "id": "unique_signature_id",
      "role": "e.g., Participant, Guardian, Company Representative",
      "label": "Signature Label"
    }
  ]
}

Return ONLY valid JSON. Do not include markdown blocks like \`\`\`json.`;

    const result = await model.generateContent([
      systemPrompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      },
    ]);

    const text = result.response.text();
    let jsonMatch = text;
    // Attempt to clean markdown if the model hallucinates it despite instructions
    if (text.includes("\`\`\`json")) {
        const match = text.match(/\`\`\`json([\s\S]*?)\`\`\`/);
        if (match) {
            jsonMatch = match[1].trim();
        }
    } else if (text.includes("\`\`\`")) {
         const match = text.match(/\`\`\`([\s\S]*?)\`\`\`/);
         if (match) {
            jsonMatch = match[1].trim();
        }
    }

    const parsedData = JSON.parse(jsonMatch);
    
    // Save to our mock local store for Day 2
    const { saveAgreement } = await import("@/lib/store");
    const id = await saveAgreement(parsedData);

    return NextResponse.json({ id, schema: parsedData });
  } catch (error: any) {
    console.error("Extraction error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
