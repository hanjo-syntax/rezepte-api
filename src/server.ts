import express from "express";

const recipes = [
  { id: 1, title: "Spaghetti Carbonara", description: "Leckeres italienisches Nudelgericht", category: "Hauptgericht", time_in_minutes: 20, portions: 2, difficulty: "mittel", ingredients: ["Spaghetti", "Eier", "Speck", "Parmesan", "Pfeffer"], instructions: ["Spaghetti kochen", "Speck anbraten", "Eier und Parmesan verquirlen", "Alles zusammenmischen"] },
  { id: 2, title: "Schokoladenkuchen", description: "Saftiger Schokoladenkuchen", category: "Dessert", time_in_minutes: 45, portions: 8, difficulty: "einfach", ingredients: ["Mehl", "Zucker", "Kakaopulver", "Eier", "Butter"], instructions: ["Ofen vorheizen", "Teig zubereiten", "In Form füllen", "Backen"] },
  { id: 3, title: "Caesar Salad", description: "Frischer Salat mit Caesar-Dressing", category: "Vorspeise", time_in_minutes: 15, portions: 2, difficulty: "einfach", ingredients: ["Römersalat", "Hähnchenbrust", "Croutons", "Parmesan", "Caesar-Dressing"], instructions: ["Salat waschen und schneiden", "Hähnchenbrust anbraten", "Alles zusammenmischen", "Mit Dressing servieren"] },
  { id: 4, title: "Tomatensuppe", description: "Wärmende Tomatensuppe", category: "Vorspeise", time_in_minutes: 30, portions: 4, difficulty: "einfach", ingredients: ["Tomaten", "Zwiebeln", "Knoblauch", "Gemüsebrühe", "Sahne"], instructions: ["Zwiebeln und Knoblauch anbraten", "Tomaten hinzufügen und köcheln lassen", "Mit Brühe aufgießen", "Pürieren und mit Sahne verfeinern"] },
  { id: 5, title: "Pancakes", description: "Fluffige Pancakes zum Frühstück", category: "Frühstück", time_in_minutes: 20, portions: 4, difficulty: "einfach", ingredients:  ["Mehl", "Milch", "Eier", "Backpulver", "Zucker"], instructions: ["Teig zubereiten", "In Pfanne ausbacken", "Mit Ahornsirup servieren"] },
  { id: 6, title: "Ratatouille", description: "Französisches Gemüsegericht", category: "Hauptgericht", time_in_minutes: 60, portions: 4, difficulty: "mittel", ingredients: ["Zucchini", "Aubergine", "Paprika", "Tomaten", "Zwiebeln"], instructions: ["Gemüse schneiden", "In Pfanne anbraten", "Im Ofen schmoren lassen"] },
  { id: 7, title: "Minestrone", description: "Italienische Gemüsesuppe", category: "Vorspeise", time_in_minutes: 40, portions: 4, difficulty: "einfach", ingredients: ["Gemüsebrühe", "Zucchini", "Karotten", "Bohnen", "Nudeln"], instructions: ["Gemüse schneiden", "In Brühe kochen", "Nudeln hinzufügen und garen"] },
  { id: 8, title: "Quiche Lorraine", description: "Herzhafte Quiche mit Speck und Käse", category: "Hauptgericht", time_in_minutes: 50, portions: 6, difficulty: "mittel", ingredients: ["Mürbeteig", "Speck", "Eier", "Sahne", "Käse"], instructions: ["Teig vorbereiten", "Füllung zubereiten", "In Form füllen", "Backen"] },
  { id: 9, title: "Bananenbrot", description: "Saftiges Bananenbrot mit Walnüssen", category: "Dessert", time_in_minutes: 60, portions: 8, difficulty: "einfach", ingredients: ["Bananen", "Mehl", "Zucker", "Eier", "Walnüsse"], instructions: ["Bananen zerdrücken", "Teig zubereiten", "In Form füllen", "Backen"] },
  { id: 10, title: "Hühnercurry", description: "Würziges Hühnercurry mit Kokosmilch", category: "Hauptgericht", time_in_minutes: 45, portions: 4, difficulty: "mittel", ingredients: ["Hähnchenbrust", "Zwiebeln", "Knoblauch", "Currypaste", "Kokosmilch"], instructions: ["Hähnchen anbraten", "Zwiebeln und Knoblauch hinzufügen", "Currypaste einrühren", "Mit Kokosmilch köcheln lassen"] }
  // ...
];

const app = express();
app.use(express.json());        // erlaubt dem Server, JSON im Request-Body zu lesen
// Host und Port aus Umgebungsvariablen oder Standardwerten
const HOST = process.env.HOST || "localhost";
const PORT = 3000;

// Begrüßung auf der Startseite
app.get("/", (_, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});

// Health-Check: läuft der Server?
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.get("/recipes", (_, res) => {
  const { category, difficulty, max_time } = _.query;

  let filteredRecipes = recipes;
  // Filtere nach Kategorie, Schwierigkeit und maximaler Zubereitungszeit, falls angegeben
  // Die Reienfolge der Filterung ist relevant, da die Filterung auf dem Ergebnis des vorherigen Filters basiert
  // Darum wird zuerst nach Kategorie, dann nach Schwierigkeit und zuletzt nach maximaler Zubereitungszeit gefiltert
  if (category) {
    filteredRecipes = filteredRecipes.filter((r) => r.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (difficulty) {
    filteredRecipes = filteredRecipes.filter((r) => r.difficulty.toLowerCase() === (difficulty as string).toLowerCase());
  }

  if (max_time) {
    const maxTimeNum = Number(max_time);
    if (!isNaN(maxTimeNum)) {
      filteredRecipes = filteredRecipes.filter((r) => r.time_in_minutes <= maxTimeNum);
    }
  } 
  res.json(filteredRecipes);
});

app.get("/recipe/:id", (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    res.status(404).json({ error: "Rezept nicht gefunden" });
  }
  res.json(recipe);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});