CREATE TABLE "recipes"(
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "category" VARCHAR(100) NOT NULL,
    "time_in_minutes" INTEGER NOT NULL,
    "portions" INTEGER NOT NULL,
    "difficulty" VARCHAR(255) NOT NULL
);

ALTER TABLE "recipes" ADD PRIMARY KEY("id");

CREATE TABLE "ingredients"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL
);

ALTER TABLE "ingredients" ADD PRIMARY KEY("id");
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_name_unique" UNIQUE("name");

CREATE TABLE "recipe_ingredients"(
    "recipe_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "quantity" DECIMAL(10, 2) NULL,
    "unit" VARCHAR(50) NULL,
    "position" INTEGER NOT NULL
);
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_position_unique" UNIQUE("recipe_id", "position");
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE;
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredient_id_foreign" FOREIGN KEY("ingredient_id") REFERENCES "ingredients"("id");

INSERT INTO ingredients (id, name) VALUES
    (1, 'Spaghetti'),
    (2, 'Eier'),
    (3, 'Speck'),
    (4, 'Parmesan'),
    (5, 'Pfeffer'),
    (6, 'Mehl'),
    (7, 'Zucker'),
    (8, 'Kakaopulver'),
    (9, 'Butter'),
    (10, 'Römersalat'),
    (11, 'Hähnchenbrust'),
    (12, 'Croutons'),
    (13, 'Caesar-Dressing'),
    (14, 'Tomaten'),
    (15, 'Zwiebeln'),
    (16, 'Knoblauch'),
    (17, 'Gemüsebrühe'),
    (18, 'Sahne'),
    (19, 'Milch'),
    (20, 'Backpulver'),
    (21, 'Zucchini'),
    (22, 'Aubergine'),
    (23, 'Paprika'),
    (24, 'Karotten'),
    (25, 'Bohnen'),
    (26, 'Nudeln'),
    (27, 'Mürbeteig'),
    (28, 'Käse'),
    (29, 'Bananen'),
    (30, 'Walnüsse'),
    (31, 'Currypaste'),
    (32, 'Kokosmilch')
ON CONFLICT (name) DO NOTHING;
-- ON CONFLICT (name) DO NOTHING; ensures that if the ingredient already exists
-- in the table, it will not be inserted again, preventing duplicate entries.

INSERT INTO recipes
    (id, title, description, category, time_in_minutes, portions, difficulty)
VALUES
    (1, 'Spaghetti Carbonara', 'Leckeres italienisches Nudelgericht', 'Hauptgericht', 20, 2, 'mittel'),
    (2, 'Schokoladenkuchen', 'Saftiger Schokoladenkuchen', 'Dessert', 45, 8, 'einfach'),
    (3, 'Caesar Salad', 'Frischer Salat mit Caesar-Dressing', 'Vorspeise', 15, 2, 'einfach'),
    (4, 'Tomatensuppe', 'Wärmende Tomatensuppe', 'Vorspeise', 30, 4, 'einfach'),
    (5, 'Pancakes', 'Fluffige Pancakes zum Frühstück', 'Frühstück', 20, 4, 'einfach'),
    (6, 'Ratatouille', 'Französisches Gemüsegericht', 'Hauptgericht', 60, 4, 'mittel'),
    (7, 'Minestrone', 'Italienische Gemüsesuppe', 'Vorspeise', 40, 4, 'einfach'),
    (8, 'Quiche Lorraine', 'Herzhafte Quiche mit Speck und Käse', 'Hauptgericht', 50, 6, 'mittel'),
    (9, 'Bananenbrot', 'Saftiges Bananenbrot mit Walnüssen', 'Dessert', 60, 8, 'einfach'),
    (10, 'Hühnercurry', 'Würziges Hühnercurry mit Kokosmilch', 'Hauptgericht', 45, 4, 'mittel')
    ON CONFLICT DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit, position) VALUES
    (1, 1, 200.00, 'g', 1),
    (1, 2, 2.00, 'Stück', 2),
    (1, 3, 100.00, 'g', 3),
    (1, 4, 50.00, 'g', 4),
    (1, 5, 1.00, 'Prise', 5),
    (2, 6, 250.00, 'g', 1),
    (2, 7, 200.00, 'g', 2),
    (2, 8, 50.00, 'g', 3),
    (2, 2, 4.00, 'Stück', 4),
    (2, 9, 150.00, 'g', 5),
    (3, 10, 2.00, 'Stück', 1),
    (3, 11, 300.00, 'g', 2),
    (3, 12, 100.00, 'g', 3),
    (3, 4, 50.00, 'g', 4),
    (3, 13, 100.00, 'ml', 5),
    (4, 14, 800.00, 'g', 1),
    (4, 15, 2.00, 'Stück', 2),
    (4, 16, 2.00, 'Zehen', 3),
    (4, 17, 500.00, 'ml', 4),
    (4, 18, 100.00, 'ml', 5),
    (5, 6, 200.00, 'g', 1),
    (5, 19, 300.00, 'ml', 2),
    (5, 2, 2.00, 'Stück', 3),
    (5, 20, 2.00, 'TL', 4),
    (5, 7, 30.00, 'g', 5),
    (6, 21, 2.00, 'Stück', 1),
    (6, 22, 1.00, 'Stück', 2),
    (6, 23, 2.00, 'Stück', 3),
    (6, 14, 4.00, 'Stück', 4),
    (6, 15, 2.00, 'Stück', 5),
    (7, 17, 800.00, 'ml', 1),
    (7, 21, 1.00, 'Stück', 2),
    (7, 24, 2.00, 'Stück', 3),
    (7, 25, 200.00, 'g', 4),
    (7, 26, 100.00, 'g', 5),
    (8, 27, 300.00, 'g', 1),
    (8, 3, 150.00, 'g', 2),
    (8, 2, 3.00, 'Stück', 3),
    (8, 18, 200.00, 'ml', 4),
    (8, 28, 150.00, 'g', 5),
    (9, 29, 3.00, 'Stück', 1),
    (9, 6, 250.00, 'g', 2),
    (9, 7, 100.00, 'g', 3),
    (9, 2, 2.00, 'Stück', 4),
    (9, 30, 100.00, 'g', 5),
    (10, 11, 600.00, 'g', 1),
    (10, 15, 2.00, 'Stück', 2),
    (10, 16, 3.00, 'Zehen', 3),
    (10, 31, 2.00, 'EL', 4),
    (10, 32, 400.00, 'ml', 5)
ON CONFLICT (recipe_id, position) DO NOTHING;
