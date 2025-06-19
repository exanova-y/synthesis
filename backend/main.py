from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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
async def match(transcript: str):
    print("from the match, beginning scalculations")
    v_q = get_query_embeddings(transcript)
    v_e = get_catalog_embeddings(inventory_as_list)
    idx = most_similar_to(v_q, v_e)
    name = inventory_as_list[idx]
    description = fragrance_inventory[name]
    print("we have calculated it to be", name, description)
    return idx, name, description

@app.post('/diffuse/{idx}')
async def diffuse(idx: int):
    # GPIO / serial trigger goes here
    pass


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)