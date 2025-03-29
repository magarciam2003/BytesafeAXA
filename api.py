from fastapi import FastAPI
import uvicorn
import os
import secret_key


app = FastAPI()
reviews_json= {}



@app.get("/")
async def test_connection():
    return {"message": "Conexión establecida correctamente"}



def run():
    api_key = os.getenv("API_KEY")
    print(api_key)
    uvicorn.run(app, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    run()