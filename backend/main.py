from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from embedding import setup_encoder, get_query_embeddings, get_catalog_embeddings, most_similar_to
from catalogue import flat_fragrance_inventory, inventory_as_list

import time
from koi_net.processor.knowledge_object import KnowledgeSource

# setup
app = FastAPI()
origins = ["http://localhost", "http://localhost:5173", "http://127.0.0.1:5173"]
# very important! allow requests from the vite dev-server (http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("setting up encoder")
client = setup_encoder()
v_e = get_catalog_embeddings(client, inventory_as_list)
# put any class definitions here, but there aren't any atm.

# routes
@app.get('/')
async def root():
    """Health check endpoint"""
    return {"status": "FastAPI server is running", "endpoints": ["/match", "/diffuse/{idx}"]}

@app.post('/match')
async def match(http_request: Request):
    """Return the most similar scent to the spoken description"""
    try:
        print(f"Received request from origin: {http_request.headers.get('origin', 'No origin header')}")
        body = await http_request.json()
        transcript = body["text"]
        print(f"Processing transcript: {transcript}")
        v_q = get_query_embeddings(client, transcript)
        idx = most_similar_to(v_q, v_e)
        name = inventory_as_list[idx]
        description = flat_fragrance_inventory[name]
        print(f"Match found: {name} - {description}")
        return {"idx": idx, "name": name, "description": description}
    except Exception as e:
        print(f"Error in /match: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}, 500

@app.post('/diffuse/{idx}')
async def diffuse(idx: int):
    # GPIO / serial trigger goes here
    pass


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)

    try:
        while True:
            for event in node.network.poll_neighbors():
                node.processor.handle(event=event, source=KnowledgeSource.External)
            node.processor.flush_kobj_queue()
            
            time.sleep(5)
            
    finally:
        node.stop()
