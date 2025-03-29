from fastapi import FastAPI
import uvicorn
import os
import database
import main
api_key = os.getenv("API_KEY")


app = FastAPI()

processed_reviews = []


@app.get("/")
async def test_connection():
    return {"message": "Conexión establecida correctamente"}

@app.get("/reviews")
async def get_processed_reviews():
    positive_reviews, neutral_reviews, negative_reviews = main.divide_lists(processed_reviews)
    positive_processed = main.process_review_summary(positive_reviews)
    neutral_processed = main.process_review_summary(neutral_reviews)
    negative_processed = main.process_review_summary(negative_reviews)

    response = {"positivo": positive_processed,
                "neutral": neutral_processed,
                "negativo": negative_processed}

    return response





def run():
    global processed_reviews
    #For para procesar las reviews
    reviews_data = database.get_reviews()
    reviews = reviews_data["opiniones"]
    for rev in reviews:
        proc_review = main.process_single_review(rev)
        processed_reviews.append(proc_review)

    uvicorn.run(app, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    run()