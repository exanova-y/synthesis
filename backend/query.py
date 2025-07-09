from sklearn.neighbors import NearestNeighbors
import numpy as np
from embedding import get_query_embeddings, setup_encoder, get_catalog_embeddings
from catalogue import inventory_as_list


def query_with_interpolation(query_text, k=3, interpolation_weight=0.3):
    v_q = get_query_embeddings(client, query_text)
    neighbours = NearestNeighbors(n_neighbors=k, metric='manhattan').fit(v_e)    
    distances, indices = neighbours.kneighbors(v_q, n_neighbors=k)
    
    # Interpolate between top candidates
    interpolated_result = weighted_interpolation(
        v_e[indices], 
        weights=combine_weights(distances, graph_weights),
        alpha=interpolation_weight
    )
    
    return interpolated_result, indices


if __name__ == "__main__":
    client = setup_encoder()
    v_e = get_catalog_embeddings(client, inventory_as_list)
    v_q = get_query_embeddings(client, "ma pona pi toki pona")
    query_with_interpolation(v_q, v_e)
