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
    print(prompt)
    llm = LLMAgent()
    #review_text = review["comentario"]
    review_text = "Atención pésima, voy a cancelar el seguro."
    final_prompt = prompt.replace("{{review}}", review_text)
    response = llm.generate_text(final_prompt)

    processed_response = extract_json(response)
    processed_response["review"] = review

    print(processed_response)
    return processed_response


def process_review_summary(processed_reviews):
    #Devuelve el resumen en un json
    return None

process_single_review()