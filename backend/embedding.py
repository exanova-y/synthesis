from openai import OpenAI
import os 
from dotenv import load_dotenv
from catalogue import fragrance_inventory, inventory_as_list
import numpy as np

def setup_encoder():
    # run this first before other functions.
    load_dotenv() # this is needed to use the actual getenv function
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return client

def get_catalog_embeddings(client, oils: list[str]):
    # passing in client! because it's not global scope
    # batch processing a list
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=oils,
        encoding_format="float"
    )
    response_vectors = np.asarray([d.embedding for d in response.data], dtype="float32") # specified in openai documentation    
    return response_vectors
    

def get_query_embeddings(client, text: str):
    # batch processing a list
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=text,
        encoding_format="float"
    )   
    response_vector = np.asarray([d.embedding for d in response.data], dtype="float32") # specified in openai documentation    
    return response_vector

def most_similar_to(v_query: np.ndarray, v_embeddings: np.ndarray):
    # 3.4
    # the vectors have already been normalized, and the denominator collapses to 1
    # this leaves us with just cosine similarity
    similarity_vector = np.dot(v_query, v_embeddings.T)
    np_max_similarity_index = np.argmax(similarity_vector)
    max_similarity_index = int(np_max_similarity_index)  # cast numpy.int64 to plain int for JSON serialization
    return max_similarity_index

if __name__ == "__main__":
    client = setup_encoder()
    catalog_embeddings = get_catalog_embeddings(client, inventory_as_list)
    query_embedding = get_query_embeddings(client, "polar bear")
    max_similarity_index = most_similar_to(query_embedding, catalog_embeddings)
    print(max_similarity_index, "the item is", inventory_as_list[max_similarity_index-1]) # 0-indexing.