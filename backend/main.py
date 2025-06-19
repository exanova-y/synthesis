from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request

from embedding import setup_encoder, get_query_embeddings, get_catalog_embeddings, most_similar_to
from catalogue import fragrance_inventory, inventory_as_list

### setup 
app = FastAPI()
# very important! allow requests from the vite dev-server (http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust or set ["*"] during dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_encoder()

# put any class definitions here, but there aren't any atm.

### routes
@app.post('/match')
async def match(http_request: Request):
    """Return the most similar scent to the spoken description"""
    body = await http_request.json() # stop here, and continue to run only if we have the request body
    transcript = body["text"]
    print("from /match, beginning calculations")
    v_q = get_query_embeddings(transcript)
    v_e = get_catalog_embeddings(inventory_as_list)
    idx = most_similar_to(v_q, v_e)
    name = inventory_as_list[idx]
    description = fragrance_inventory[name]
    print("calculated", name, description)
    return {"idx": idx, "name": name, "description": description}

@app.post('/diffuse/{idx}')
async def diffuse(idx: int):
    # GPIO / serial trigger goes here
    pass


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)