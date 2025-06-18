from matplotlib import axes
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA
#import pandas as pd
#import numpy as np
import matplotlib.pyplot as plt
#import seaborn as sns

# Load the essential oils
with open("essential-oils.txt", "r") as f:
    oils = f.read().split(",")

with open("queries.txt", "r") as f:
    queries = f.read().split(",")

for oil in oils:
    oil = oil.strip()

for query in queries:
    query = query.strip()

print(oils, type(oils), len(oils))
print(queries, type(queries), len(queries))


# Load the model
print('loading model...')
model = SentenceTransformer("all-MiniLM-L6-v2")
oil_embeddings = model.encode(oils)
query_embeddings = model.encode(queries)
print(oil_embeddings)
print(query_embeddings)

# Do PCA
print("beginning PCA")
pca = PCA(n_components=3)
oil_embeddings_3d = pca.fit_transform(oil_embeddings)
query_embeddings_3d = pca.transform(query_embeddings)
print(f"Shape after PCA: {oil_embeddings_3d.shape}")


fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection='3d')
ax.scatter(oil_embeddings_3d[:, 0], oil_embeddings_3d[:, 1], oil_embeddings_3d[:, 2],color='orange',alpha=0.7)
ax.scatter(query_embeddings_3d[:, 0], query_embeddings_3d[:, 1], query_embeddings_3d[:, 2], 
           alpha=0.7, color='purple', marker='^', s=100, label='Queries')


for i, oil in enumerate(oils):
    ax.text(oil_embeddings_3d[i, 0], oil_embeddings_3d[i, 1], oil_embeddings_3d[i, 2], oil, size=8)

for i, query in enumerate(queries):
    ax.text(query_embeddings_3d[i, 0], query_embeddings_3d[i, 1], query_embeddings_3d[i, 2], query, size=8)

ax.set_title('PCA Visualization of Essential Oil Embeddings')
ax.set_xlabel('Principal Component 1')
ax.set_ylabel('Principal Component 2')
ax.set_zlabel('Principal Component 3')

# plt.tight_layout()
plt.show()


# oil_embeddings = model.encode(oils)

# # Encode the oils
# oil_embeddings = model.encode(oils)

# # Calculate the cosine similarity
# similarity = np.dot(sentence_embeddings, oil_embeddings.T)

# # Plot the results
# plt.figure(figsize=(10, 10))
# sns.heatmap(similarity, xticklabels=oils, yticklabels=sentences["sentence"])
# plt.show()