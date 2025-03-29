import database
import prompts
from LLM_utils import LLMAgent
import re
import json

def extract_json(text):
    match = re.search(r'\{.*\}', text, re.DOTALL)

    if match:
        json_text = match.group(0)
        data = json.loads(json_text)
        return data
    else:
        print("No se encontró JSON en el texto.")

def process_single_review(review):
    #Dime el sentimiento de esta
    prompt = prompts.get_individual_prompt()
    llm = LLMAgent()
    review_text = review["comentario"]
    #review_text = "Atención pésima, voy a cancelar el seguro."
    final_prompt = prompt.replace("{{review}}", review_text)
    response = llm.generate_text(final_prompt)

    print(response)
    processed_response = extract_json(response)
    review["sentimiento"] = processed_response["sentimiento"]
    review["tono_general"] = processed_response["tono_general"]

    return review



def process_review_summary(processed_reviews):
    prompt = prompts.get_summary_prompt()
    llm = LLMAgent()
    context = " ".join(rev["comentario"] for rev in processed_reviews)
    final_prompt = prompt.replace("{{reviews}}", context)
    print(final_prompt)
    response = llm.generate_text(final_prompt)
    print("RESPUESTA FINAL", response)

    processed_response = extract_json(response)

    results = {}
    results["reviews"] = processed_reviews
    results["resumen"] = processed_response["resumen"]
    results["palab_freq"] = processed_response["palabras_frecuentes"]

    return results

def divide_lists(processed_reviews):
    print(processed_reviews)
    positive_reviews = []
    neutral_reviews = []
    negative_reviews = []

    for review in processed_reviews:
        if review["tono_general"] == "Positiva":
            positive_reviews.append(review)
        elif review["tono_general"] == "Neutral":
            neutral_reviews.append(review)
        elif review["tono_general"] == "Negativa":
            negative_reviews.append(review)

    return positive_reviews, neutral_reviews, negative_reviews

reviews = database.get_reviews()
rev = reviews["opiniones"][0]
import json

data = {
    "positivo": {
        "reviews": [
            {
                "comentario": "Muy buen servicio, la calidad muy buena y precio muy asequible.",
                "sentimiento": "Contento",
                "servicio": "Seguro Hogar",
                "pais": "ES",
                "fecha": "9 mar 2025",
                "valoracion": 4,
                "id": 15,
                "nombreUsuario": "Juan Carlos"
            },
            {
                "comentario": "Muy puntuales en el servicio.",
                "sentimiento": "Contento",
                "servicio": "Seguro Hogar",
                "pais": "ES",
                "fecha": "9 mar 2025",
                "valoracion": 4,
                "id": 16,
                "nombreUsuario": "Juan Carlos"
            }
        ]
    },
    "neutral": {
        "reviews": [
            {
                "comentario": "La verdad llevo bastante con ellos, alguna vez he pensando en cambiarme, pero al final no está mal",
                "sentimiento": "Neutro",
                "servicio": "Seguro Vivienda",
                "pais": "ES",
                "fecha": "21 feb 2025",
                "valoracion": 3,
                "id": 17,
                "nombreUsuario": "Alberto Martin"
            }
        ]
    },
    "negativo": {
        "reviews": [
            {
                "comentario": "Horrible, nefasto, decepcionante, frustrante, lo peor que me ha pasado. Llevo desde el 27/1 intentando solucionar el pago de recibo de seguro que tengo con ellos.",
                "sentimiento": "Enfadado",
                "servicio": "Seguro Hogar",
                "pais": "ES",
                "fecha": "29 ene 2025",
                "valoracion": 1,
                "id": 18,
                "nombreUsuario": "Carmen Muñoz"
            }
        ]
    }
}

# Convertir a JSON con formato legible (opcional)
#data_ = json.dumps(data)
#preprocessed_json = json.loads(data_)

#print(preprocessed_json)



#result = process_review_summary(preprocessed_json["positivo"]["reviews"])

#print(result)


#process_single_review(rev)