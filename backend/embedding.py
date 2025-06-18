from openai import OpenAI
import os 
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_embeddings(text):
    return client.embeddings.create(
        model="text-embedding-ada-002",
        input=text,
        encoding_format="float"
    )   


peppermint_embedding = get_embeddings("peppermint")
print(len(peppermint_embedding.data[0].embedding))