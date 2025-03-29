from fastapi import FastAPI
import uvicorn

app = FastAPI()
reviews_json= {}



@app.get("/")
async def test_connection():
    return {"message": "Conexión establecida correctamente"}



def run():
    uvicorn.run(app, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    run()