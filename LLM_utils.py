import os
import google.generativeai as genai

class LLMAgent:
    def __init__(self, model: str = "gemini-2.0-flash-lite"):
        """
        Inicializa la clase con la API Key obtenida de una variable de entorno.
        
        :param model: Nombre del modelo a utilizar (por defecto, "gemini-2.0-flash-lite").
        """
        api_key = os.getenv("API_KEY")
        if not api_key:
            raise ValueError("La variable de entorno API_KEY no está configurada.")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model)

    def generate_text(self, prompt: str) -> str:
        """
        Envía un prompt a Gemini y devuelve la respuesta generada.

        :param prompt: Texto a enviar al modelo.
        :return: Respuesta generada por el modelo.
        """
        response = self.model.generate_content(prompt)
        return response.text if response else "No se recibió respuesta."
