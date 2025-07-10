import csv
import json
import colorsys
from embedding import setup_encoder, get_catalog_embeddings, pca_on_list_of_embeddings
import numpy as np

def load_nodes(csv_path, limit=150):
    """Load first N nodes from CSV"""
    nodes = []
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= limit:
                break
            nodes.append({
                'id': int(row['node_id']),
                'name': row['name'],
                'node_type': row['node_type'],
                'is_hub': row['is_hub'] == 'hub'
            })
    return nodes

def load_categories(csv_path):
    """returns a dict with ingredient to category mapping"""
    categories = {}
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            categories[row['ingredient']] = row['category']
    return categories

def generate_category_colors():
    """Generate distinct colors for each food category"""
    # this is mostly gray for now, I need to fix it

    category_colors = {
        'Bakery/Dessert/Snack': '#FFF5BA',      
        'Beverage Alcoholic': '#FFABAB',        
        'Cereal/Crop/Bean': '#FFCBC1',          
        'Dairy': '#FFFFD1',                     
        'Fruit': '#D5AAFF',                     
        'Meat/Animal Product': '#FFBEBC',       
        'Plant/Vegetable': '#BFFCC6',           
        'Seafood': '#85E3FF',                   
        'Nut/Seed': '#F3FFE3',                  
        'Spice': '#E87300',                     
        'Sauce/Powder/Dressing': '#BEA6A1',     
        'Fungus': '#D5CABD',                    
        'Flower': '#FFCD61',                    
        'Dish/End Product': '#685989',          
        'Beverage Non-Alcoholic': '#FF9F7A',    
        'Fat/Oil': '#F9F871',                       
        'Herb': '#AFF8DB',                      
        'Sweetener': '#FEFEDF',                 
        'Other': '#FCF7FF'                      
    }
    return category_colors

def assign_colors_by_category(nodes, categories):
    """Assign colors based on ingredient categories"""
    category_colors = generate_category_colors()
    color_assignments = {}
    category_counts = {}
    
    for node in nodes:
        ingredient_name = node['name']
        category = categories.get(ingredient_name, 'Other')
        
        # Count categories for stats
        category_counts[category] = category_counts.get(category, 0) + 1
        
        # Get base color for category
        base_color_hex = category_colors.get(category, category_colors['Other'])
        
        # Convert hex to RGB for variation calculation
        base_color_int = int(base_color_hex[1:], 16)
        
        # Add slight variation within category to distinguish individual items
        variation_count = category_counts[category] - 1
        variation = (variation_count * 0x111111) % 0x333333
        color_int = (base_color_int + variation) % 0xFFFFFF
        
        # Convert back to hex string
        color_hex = f"#{color_int:06X}"
        
        color_assignments[node['id']] = {
            'color': color_hex,
            'category': category
        }
    
    return color_assignments, category_counts

def load_edges(csv_path, node_ids):
    """returns a list of edges that connect our selected nodes"""
    edges = []
    node_set = set(node_ids)
    
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            source = int(row['id_1'])
            target = int(row['id_2'])
            if source in node_set and target in node_set:
                edges.append((source, target))
    return edges

def build_graph(nodes, edges):
    """Build adjacency list from nodes and edges"""
    graph = {}
    for source, target in edges:
        if source not in graph:
            graph[source] = []
        if target not in graph:
            graph[target] = []
        graph[source].append(target)
        graph[target].append(source)
    return graph

def nodes_to_embeddings(nodes):
    """Convert node names to embeddings and attach scaled x, y, z coordinates."""
    print("Setting up encoder...")
    client = setup_encoder()

    # Extract node names for embedding
    node_names = [node['name'] for node in nodes]
    print(f"Embedding {len(node_names)} node names...")
    embeddings = get_catalog_embeddings(client, node_names)

    # Dimensionality reduction
    print("Running PCA (3 components)...")
    list_of_coordinates = pca_on_list_of_embeddings(3, embeddings)  
    print("list of coordinates", list_of_coordinates)
    # shape: (n_nodes, 3)
    
    # Scale coordinates for 3D visualization
    scale_factor = 10
    
    # Add scaled coordinates to nodes. need to use 'i' to access coordinates of each node rather than the same one.
    for i, node in enumerate(nodes):
        
        node['x'] = float(list_of_coordinates[i][0] * scale_factor)
        node['y'] = float(list_of_coordinates[i][1] * scale_factor) 
        node['z'] = float(list_of_coordinates[i][2] * scale_factor)
        if i < 3:  # Print first few for debugging
            print(f"Node {i}: x={node['x']:.2f}, y={node['y']:.2f}, z={node['z']:.2f}")

    return nodes

def main():
    # File paths
    nodes_path = '../data-layer/nodes_191120.csv'
    edges_path = '../data-layer/edges_191120.csv'
    categories_path = '../data-layer/dict_ingr2cate - Top300+FDB400+HyperFoods104=616.csv'
    output_path = '../data-layer/nodes_with_colors_v2.json'
    

    print("Loading nodes...")
    nodes = load_nodes(nodes_path, 100)
    node_ids = [node['id'] for node in nodes]
    
    print("Loading edges...")
    edges = load_edges(edges_path, node_ids)
    
    print("Building graph...")
    graph = build_graph(nodes, edges)
    
    print("Loading categories...")
    categories = load_categories(categories_path)
    
    print("Assigning colors based on categories...")
    color_assignments, category_counts = assign_colors_by_category(nodes, categories)
    
    print("Converting nodes to embeddings...")
    nodes = nodes_to_embeddings(nodes)
    
    # Create output data with color, transparent, and opacity like 3DGraph.jsx
    output_data = []
    for node in nodes:
        assignment = color_assignments.get(node['id'], {'color': '#FF0000', 'category': ''})
        
        node_data = {
            'id': node['id'],
            'name': node['name'],
            'node_type': node['node_type'],
            'is_hub': node['is_hub'],
            'category': assignment['category'],
            'color': assignment['color'],
            'x': node['x'],
            'y': node['y'],
            'z': node['z'],
            'transparent': True,
            'opacity': 0.95 if node['is_hub'] else 0.65  # Hubs slightly more opaque
        }
        output_data.append(node_data)
    
    # Save to JSON
    with open(output_path, 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"Generated {len(output_data)} nodes with category-based colors")
    print("Category distribution:")
    for category, count in sorted(category_counts.items()):
        print(f"  {category}: {count}")
    print(f"Output saved to {output_path}")

if __name__ == "__main__":
    main()
