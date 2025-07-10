fragrance_inventory = {
    "fresh": {
        "aromatic": {
            "Rosemary": "Salvia rosmarinus: herbaceous, camphor-tinged green spike that clears the mind.",
            "Eucalyptus": "Eucalyptus globulus: cool medicinal vapour like a minty forest exhale."
        },
        "citrus": {
            "Bergamot": "Citrus bergamia: sun-dappled Earl-Grey zest that balances tartness with soft florals."
        },
        "fruity": {
            "Lemon": "Citrus limon: pure yellow zing—bright, clean, electrifyingly sour."
        },
        "green": {
            "Peppermint": "Mentha × piperita: icy menthol rush wrapped in sweet, peppery leaves."
        }
    },

    "floral": {
        "floral": {
            "Lavender": "Lavandula angustifolia: powdery alpine breeze of sweet herb and soft honey.",
            "Gardenia": "Gardenia jasminoides: creamy white petals dripping tropical nectar and banana-green nuance."
        },
        "soft floral": {
            "Rose": "Rosa damascena: silky velvet bloom with dewy lemon-fresh sparkle and faint spice."
        },
        "floral oriental": {
            "Jasmine": "Jasminum sambac: night-bloom narcotic sweetness laced with indolic depth.",
            "Geranium": "Pelargonium graveolens: rosy-citrus leaf bridging green herb and floral warmth."
        }
    },

    "oriental": {
        "soft oriental": {
            "Vanilla": "Vanilla planifolia: warm gourmand custard that hugs with woody amber.",
            "Cardamom": "Elettaria cardamomum: sweet-spicy fizz combining cool eucalyptus lift and buttery resin."
        },
        "oriental": {
            "Frankincense": "Boswellia sacra: sacred citrus-pine smoke floating over dry balsamic amber."
        },
        "oriental woody": {
            "Sandalwood": "Santalum album: creamy, lactonic wood that radiates soft, lingering serenity.",
            "Patchouli": "Pogostemon cablin: earthy dark-chocolate soil with mossy forest musk."
        }
    },

    "woody": {
        "woods": {
            "Pine": "Pinus sylvestris: crisp conifer needles exuding terpene-rich alpine clarity.",
            "Cedarwood": "Cedrus atlantica: dry pencil-shaving woodiness accented by gentle smoke."
        },
        "mossy woods": {
            "Oakmoss": "Evernia prunastri: damp lichen leather casting an ink-green forest shadow."
        },
        "dry woods": {
            "Black Pepper": "Piper nigrum: crackling woody citrus bite that tingles the nose.",
            "Cinnamon": "Cinnamomum verum: sweet fiery bark delivering baking-warm spice."
        }
    }
}

flat_fragrance_inventory = {
    "Rosemary": "Salvia rosmarinus: herbaceous, camphor-tinged green spike that clears the mind.",
    "Eucalyptus": "Eucalyptus globulus: cool medicinal vapour like a minty forest exhale.",
    "Bergamot": "Citrus bergamia: sun-dappled Earl-Grey zest that balances tartness with soft florals.",
    "Lemon": "Citrus limon: pure yellow zing—bright, clean, electrifyingly sour.",
    "Peppermint": "Mentha × piperita: icy menthol rush wrapped in sweet, peppery leaves.",
    "Lavender": "Lavandula angustifolia: powdery alpine breeze of sweet herb and soft honey.",
    "Gardenia": "Gardenia jasminoides: creamy white petals dripping tropical nectar and banana-green nuance.",
    "Rose": "Rosa damascena: silky velvet bloom with dewy lemon-fresh sparkle and faint spice.",
    "Jasmine": "Jasminum sambac: night-bloom narcotic sweetness laced with indolic depth.",
    "Geranium": "Pelargonium graveolens: rosy-citrus leaf bridging green herb and floral warmth.",
    "Vanilla": "Vanilla planifolia: warm gourmand custard that hugs with woody amber.",
    "Cardamom": "Elettaria cardamomum: sweet-spicy fizz combining cool eucalyptus lift and buttery resin.",
    "Frankincense": "Boswellia sacra: sacred citrus-pine smoke floating over dry balsamic amber.",
    "Sandalwood": "Santalum album: creamy, lactonic wood that radiates soft, lingering serenity.",
    "Patchouli": "Pogostemon cablin: earthy dark-chocolate soil with mossy forest musk.",
    "Pine": "Pinus sylvestris: crisp conifer needles exuding terpene-rich alpine clarity.",
    "Cedarwood": "Cedrus atlantica: dry pencil-shaving woodiness accented by gentle smoke.",
    "Oakmoss": "Evernia prunastri: damp lichen leather casting an ink-green forest shadow.",
    "Black Pepper": "Piper nigrum: crackling woody citrus bite that tingles the nose.",
    "Cinnamon": "Cinnamomum verum: sweet fiery bark delivering baking-warm spice."
}

inventory_as_list = ["Rosemary", "Eucalyptus", "Bergamot", "Lemon", "Peppermint", 
"Vanilla", "Cardamom", "Frankincense", "Sandalwood", "Patchouli", 
"Lavender", "Gardenia", "Rose", "Jasmin", "Geranium",
"Pine", "Cedarwood", "Oakmoss", "Black Pepper", "Cinnamon"]  



# ── UC-Davis Wine “Aroma Wheel” ──────────────────────────────────────────────
aroma_wheel = {
    "fruity": {
        "citrus":          ["Grapefruit", "Lemon"],
        "berry":           ["Blackberry", "Raspberry", "Strawberry",
                            "Black Currant (Cassis)"],
        "tree_fruit":      ["Cherry", "Apricot", "Peach", "Apple"],
        "tropical_fruit":  ["Pineapple", "Melon", "Banana"],
        "dried_fruit":     ["Strawberry Jam", "Raisin", "Prune", "Fig"],
        "other":           ["Artificial Fruit", "Methyl Anthranilate"]
    },

    "spice": {
        "spicy":           ["Licorice/Anise", "Black Pepper", "Cloves"]
    },

    "floral": {
        "floral":          ["Geranium", "Violet", "Rose", "Orange Blossom"]
    },

    "microbiological": {
        "yeasty":          ["Leesy", "Baker’s Yeast"],
        "lactic":          ["Yogurt", "Sweaty", "Sauerkraut"],
        "other":           ["Mousy", "Horsey"]
    },

    "oxidized": {
        "oxidized":        ["Oxidized"]         # sherry/acetaldehyde notes
    },

    "pungent": {
        "cool":            ["Menthol"],
        "hot":             ["Alcohol"]
    },

    "vegetative": {
        "fresh":           ["Cut Green Grass", "Bell Pepper", "Eucalyptus",
                            "Mint"],
        "canned_cooked":   ["Green Beans", "Asparagus", "Green Olive",
                            "Black Olive", "Artichoke"],
        "dried":           ["Hay/Straw", "Tea", "Tobacco"]
    },

    "nutty": {
        "nutty":           ["Walnut", "Hazelnut", "Almond"]
    },

    "caramelized": {
        "caramel":         ["Honey", "Butterscotch", "Diacetyl (Butter)",
                            "Soy Sauce", "Chocolate", "Molasses"]
    },

    "woody": {
        "burned":          ["Smoky", "Burnt Toast/Charred", "Coffee"],
        "phenolic":        ["Medicinal", "Phenolic", "Bacon"],
        "resinous":        ["Oak", "Cedar", "Vanilla"]
    },

    "earthy": {
        "moldy":           ["Moldy Cork", "Moldy", "Musty (Mildew)",
                            "Mushroom"],
        "earthy":          ["Dusty"]
    },

    "chemical": {
        "pungent":         ["Sulfur Dioxide", "Ethanol", "Acetic Acid",
                            "Ethyl Acetate"],
        "papery":          ["Wet Cardboard", "Filter Pad"],
        "sulfur":          ["Wet Wool/Wet Dog", "Sulfur Dioxide",
                            "Burnt Match", "Cabbage", "Skunk", "Garlic",
                            "Hydrogen Sulfide", "Natural Gas (Mercaptan)",
                            "Rubbery"],
        "petroleum":       ["Diesel", "Kerosene", "Plastic", "Tar"]
    }
}

# flat list of every specific descriptor (duplicates removed)
flat_descriptors = sorted(
    {note for sub in aroma_wheel.values() for cat in sub.values() for note in cat}
)


def get_trait_centroid(selected_traits, embedding_function):
    """
    Convert selected traits to embedding centroid using UC Davis wheel expansion
    
    Example: ['fruity', 'spicy'] → ['sweet', 'fresh', 'juicy', 'warm', 'pungent', 'hot']
    Then average embeddings of expanded descriptors to get centroid
    """
    import numpy as np
    
    # Expand traits using mapping
    expanded_descriptors = []
    for trait in selected_traits:
        if trait in trait_mapping:
            expanded_descriptors.extend(trait_mapping[trait])
        else:
            expanded_descriptors.append(trait)
    
    # Remove duplicates while preserving order
    unique_descriptors = list(dict.fromkeys(expanded_descriptors))
    
    # Get embeddings for each descriptor
    embeddings = [embedding_function(desc) for desc in unique_descriptors]
    
    # Calculate centroid
    centroid = np.mean(embeddings, axis=0)
    
    return centroid, unique_descriptors