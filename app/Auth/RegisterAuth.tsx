const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

async function registerAuth(email: string, password: string, telefono: string) {
  try {
    console.log("Intentando login con la cuenta:", { email });
    
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password, telefono }),
    });
    
    console.log("Respuesta del servidor:", response.status, response.statusText);
    

    if (!response.ok) {
      console.error("Error en la respuesta:", response.status, response.statusText);
      return { 
        ok: false, 
        data: { message: `Error del servidor: ${response.status} ${response.statusText}` } 
      };
    }
    
    const data = await response.json();
    console.log("Datos recibidos:", data);
    
    return { ok: true, data };
  } catch (error) {
    console.error("Error en la petición:", error);
    return { ok: false, data: { message: "Error de conexión con el servidor" } };
  }
}

export default registerAuth;