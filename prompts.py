def get_individual_prompt():
    return """Tarea: Analiza la siguiente reseña de una aseguradora y responde en formato JSON indicando:

El sentimiento predominante (elige una opción entre: Contento, Enfadado, Decepcionado, Confundido, Neutral).

El tono general de la review (elige una opción entre: Positiva, Negativa, Neutral).

Instrucciones:

Identifica el sentimiento predominante del usuario y clasifícalo según las opciones dadas.

Determina el tono general de la review basándote en el contenido global.

Devuelve exclusivamente un objeto JSON con ambos resultados, utilizando el formato especificado.

Input:
"Escribe aquí la reseña del usuario sobre la aseguradora."

Formato de Output JSON:

json
{
  "sentimiento": "[Contento, Enfadado, Decepcionado, Confundido, Neutral]",
  "tono_general": "[Positiva, Negativa, Neutral]"
}
Ejemplo de Output (para una reseña específica):

json
{
  "sentimiento": "Decepcionado",
  "tono_general": "Negativa"
}

Ejemplo de Output (para una reseña específica):
json
{
  "sentimiento": "Contento",
  "tono_general": "Positiva"
}
Reseña: {{review}}
"""

def get_summary_prompt():
    prompt = """Eres un modelo avanzado de lenguaje. Tu tarea es analizar una lista de opiniones (reviews) y generar un JSON con dos campos:

1. "summary": Un resumen conciso y claro que sintetice las ideas principales de todas las opiniones proporcionadas.
2. "top_keywords": Una lista de las palabras o frases clave más relevantes y repetidas en las opiniones.

Las palabras clave deben ser significativas y relacionadas directamente con el contenido de las opiniones, excluyendo palabras comunes como "y", "el", "de", etc.

A continuación, se te proporcionará una lista de reviews. Devuelve únicamente el JSON con los dos campos mencionados, sin ningún texto adicional.


Ejemplo de salida esperada
Si las reviews fueran:

Review: "El producto es excelente, muy útil y fácil de usar."

Review: "Me encanta este producto, es muy útil y tiene buena calidad."

Review: "Es fácil de usar, pero esperaba mejor calidad."

Review: El modelo debería devolver algo como esto:

json
{
  "summary": "La mayoría de los usuarios consideran que el producto es excelente, fácil de usar y muy útil. Algunos mencionan buena calidad, aunque hay expectativas mixtas sobre este aspecto.",
  "top_keywords": ["útil", "fácil de usar", "calidad", "excelente", "producto"]
}

Lista de reviews:
{{reviews}}
"""
    return prompt