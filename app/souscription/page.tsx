// app/souscription/page.tsx

import SubscriptionForm from "@/components/SubscriptionsForm";

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Finalisez votre inscription</h1>
        <p className="text-gray-500 mt-4">Complétez vos informations pour activer votre visibilité.</p>
      </div>
      <SubscriptionForm />
    </main>
  );
}