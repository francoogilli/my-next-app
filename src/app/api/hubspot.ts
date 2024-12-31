"use server";

interface ContactProperties {
  firstname: string;
  email: string;
  phone?: string;
  publicidad: string;
}

export async function createHubSpotContact(properties: ContactProperties) {
  const API_URL = "https://api.hubapi.com/crm/v3/objects/contacts";
  const TOKEN = process.env.HUBSPOT_API_TOKEN; // Usa la variable de entorno

  if (!TOKEN) {
    throw new Error("Falta el token de HubSpot. Verifica las variables de entorno.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ properties }),
    });

    if (response.status === 409) {
      return { success: false, message: "El contacto ya está guardado." };
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error al crear contacto en HubSpot:", error);
    throw error;
  }
}
