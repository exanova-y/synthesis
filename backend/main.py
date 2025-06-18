from fastapi import FastAPI
from embedding import setup_encoder, get_query_embeddings, get_catalog_embeddings, most_similar_to
from catalogue import fragrance_inventory, inventory_as_list

# --- setup ---
app = FastAPI()
setup_encoder()

# put any class definitions here, but there aren't any atm.

# --- routes ---
@app.post('/match')
def match(transcript: str):
    print("from the match, beginning calculations")
    v_q = get_query_embeddings(transcript)
    v_e = get_catalog_embeddings(inventory_as_list)
    idx = most_similar_to(v_q, v_e)
    name = inventory_as_list[idx]
    description = fragrance_inventory[name]
    print("we have calcualted it to be", name, description)
    return idx, name, description

@app.post('/diffuse/{idx}')
def diffuse(idx: int):
    # GPIO / serial trigger goes here
    pass


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)