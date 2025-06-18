from openai import OpenAI
import os 
from dotenv import load_dotenv
from catalogue import fragrance_inventory
import numpy as np

def setup_encoder():
    load_dotenv() # this is needed to use the actual getenv function
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return client

def get_catalog_embeddings():
    pass
    

def get_query_embeddings(text):
    return client.embeddings.create(
        model="text-embedding-ada-002",
        input=text,
        encoding_format="float"
    )   

def most_similar_to(v_query, v_embeddings):
    # 3.4
    # the vectors have already been normalized, and the denominator collapses to 1
    # this leaves us with just cosine similarity
    similarity_vector = np.dot(v_query, v_embeddings.T)
    max_similarity_index = np.argmax(similarity_vector)
    return max_similarity_index

client = setup_encoder()
query_embedding = get_embeddings("polar bear")
max_similarity_index = most_similar_to(query_embedding.data[0].embedding, fragrance_inventory)
print(max_similarity_index)