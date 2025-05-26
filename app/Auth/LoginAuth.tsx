async function loginAuth(email: string, password: string) {
  try {
    console.log("Intentando login con la cuenta:", { email });
    
    const response = await fetch("https://biblioteca-backend-coral.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password }),
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

export default loginAuth;