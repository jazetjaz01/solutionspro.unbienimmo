"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Votre client browser

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) alert(error.message);
    else window.location.href = "/dashboard"; // Redirection vers son nouvel espace
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Définissez votre mot de passe</h1>
      <input 
        type="password" 
        placeholder="Nouveau mot de passe"
        className="w-full p-3 border mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        onClick={handleUpdatePassword}
        className="w-full bg-black text-white p-4 font-bold uppercase text-[10px] tracking-widest"
      >
        Valider et accéder à mon espace
      </button>
    </div>
  );
}