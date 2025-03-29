from fastapi import FastAPI
import uvicorn
import os
api_key = os.getenv("API_KEY")


app = FastAPI()

processed_reviews = []


@app.get("/")
async def test_connection():
    return {"message": "Conexión establecida correctamente"}


def run():
    global processed_reviews
    #For para procesar las reviews

    uvicorn.run(app, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    run()