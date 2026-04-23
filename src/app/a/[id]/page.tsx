import { getAgreement } from "@/lib/store";
import DynamicForm from "@/components/DynamicForm";
import { notFound } from "next/navigation";

export default async function AgreementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const schema = await getAgreement(id);

  if (!schema) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <DynamicForm schema={schema} />
    </main>
  );
}
