"use client";

import { useState } from "react";
import { createHubSpotContact } from "../api/hubspot";

export default function HubSpotForm() {
  const [firstname, setFirstname] = useState("Franco");
  const [email, setEmail] = useState("francogilli10@gmail.com");
  const [phone, setPhone] = useState("");
  const [publicidad, setPublicidad] = useState("Reel Joa");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const result = await createHubSpotContact({ firstname, email, phone, publicidad });
      if (result.success) {
        setStatus("Contacto creado exitosamente.");
      } else {
        setStatus(result.message || "Hubo un error al crear el contacto."); // Muestra el mensaje "El contacto ya está guardado."
      }
    } catch (error) {
      console.error("Error al crear el contacto:", error);
      setStatus("Hubo un error al crear el contacto.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            value={firstname}
            className="text-black"
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Teléfono:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Publicidad:
          <input
            type="text"
            value={publicidad}
            onChange={(e) => setPublicidad(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Enviar</button>
      {status && <p>{status}</p>}
    </form>
  );
}
