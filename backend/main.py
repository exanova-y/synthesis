from fastapi import FastAPI
from embedding import setup_encoder, get_embeddings

app = FastAPI()

# put any class definitions here.

@app.post('/match')
def match(transcript: str):
    emb = get_embeddings(transcript)
    
    return emb


@app.post('/diffuse/{idx}')
def diffuse(idx: int):
    # GPIO / serial trigger goes here
    return {'success': True}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)