import csv
import json
import colorsys

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
    
    category_colors = {
        'Bakery/Dessert/Snack': '#FED7C3',      # Chocolate
        'Beverage Alcoholic': '#FFAEA5',        # Dark Red
        'Cereal/Crop/Bean': '#97C1A9',          # Goldenrod
        'Dairy': '#F6EAC2',                     # Beige
        'Fruit': '#ECDFE3',                     # Tomato
        'Meat/Animal Product': '#FFDBCC',       # Saddle Brown
        'Plant/Vegetable': '#CCE2CB',           # Forest Green
        'Seafood': '#C6DBDA',                   # Steel Blue
        'Nut/Seed': '#A0522D',                  # Sienna
        'Spice': '#FF4500',                     # Orange Red
        'Sauce/Powder/Dressing': '#9932CC',     # Dark Orchid
        'Fungus': '#8FBC8F',                    # Dark Sea Green
        'Flower': '#F3B0C3',                    # Hot Pink
        'Dish/End Product': '#696969',          # Dim Gray
        'Beverage Non-Alcoholic': '#00CED1',    # Dark Turquoise
        'Fat/Oil': '#FFFFB5',                   # Gold
        'Herb': '#B6CFB6',                      # Lime Green
        'Sweetener': '#FFB6C1',                 # Light Pink
        'Other': '#808080'                      # Gray (default)
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

# def calculate_distances(graph, start_node):
#     """BFS to calculate shortest distances from start_node to all others"""
#     distances = {start_node: 0}
#     queue = [start_node]
    
#     while queue:
#         current = queue.pop(0)
#         for neighbor in graph[current]:
#             if neighbor not in distances:
#                 distances[neighbor] = distances[current] + 1
#                 queue.append(neighbor)
    
#     return distances

def main():
    # File paths
    nodes_path = '../data-layer/nodes_191120.csv'
    edges_path = '../data-layer/edges_191120.csv'
    categories_path = '../data-layer/dict_ingr2cate - Top300+FDB400+HyperFoods104=616.csv'
    output_path = '../data-layer/nodes_with_colors.json'
    
    # Load data
    print("Loading nodes...")
    nodes = load_nodes(nodes_path, 150)
    node_ids = [node['id'] for node in nodes]
    
    print("Loading edges...")
    edges = load_edges(edges_path, node_ids)
    
    print("Building graph...")
    graph = build_graph(nodes, edges)
    
    print("Loading categories...")
    categories = load_categories(categories_path)
    
    print("Assigning colors based on categories...")
    color_assignments, category_counts = assign_colors_by_category(nodes, categories)
    
    # Create output data with color, transparent, and opacity like 3DGraph.jsx
    output_data = []
    for node in nodes:
        assignment = color_assignments.get(node['id'], {'color': '#FF0000', 'category': 'Other'})
        
        node_data = {
            'id': node['id'],
            'name': node['name'],
            'node_type': node['node_type'],
            'is_hub': node['is_hub'],
            'category': assignment['category'],
            'color': assignment['color'],
            'transparent': True,
            'opacity': 0.85 if node['is_hub'] else 0.75  # Hubs slightly more opaque
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
