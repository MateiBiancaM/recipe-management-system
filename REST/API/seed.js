const db = require('./db');

const recipes = [
  {
    title: "Ciorbă de perișoare",
    description: "O ciorbă tradițională cu perișoare din carne de porc și vită.",
    userId: "user_demo",
    details: {
      difficulty: "Mediu",
      servings: 6,
      time: { prep: 40, cook: 60 }
    },
    ingredients: [
      { name: "carne tocată amestec", quantity: "500", unit: "g" },
      { name: "orez", quantity: "50", unit: "g" },
      { name: "ouă", quantity: "2", unit: "buc" },
      { name: "ceapă", quantity: "2", unit: "buc" },
      { name: "borș", quantity: "500", unit: "ml" },
      { name: "smântână", quantity: "200", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Amestecă carnea tocată cu orezul, oul, sarea și piperul." },
      { order: 2, instruction: "Formează perișoare mici cu mâna umedă." },
      { order: 3, instruction: "Pune legumele la fiert în 3L de apă." },
      { order: 4, instruction: "Adaugă perișoarele când apa clocotește." },
      { order: 5, instruction: "Adaugă borșul și mai lasă 10 minute." }
    ]
  },
  {
    title: "Sarmale cu mămăligă",
    description: "Sarmale delicioase în foi de varză murată, servite cu mămăligă caldă.",
    userId: "user_demo",
    details: {
      difficulty: "Greu",
      servings: 8,
      time: { prep: 60, cook: 180 }
    },
    ingredients: [
      { name: "carne tocată porc", quantity: "1", unit: "kg" },
      { name: "varză murată", quantity: "2", unit: "buc" },
      { name: "orez", quantity: "100", unit: "g" },
      { name: "ceapă", quantity: "3", unit: "buc" },
      { name: "pastă tomate", quantity: "3", unit: "lg" }
    ],
    steps: [
      { order: 1, instruction: "Călește ceapa cu orezul și pasta de tomate." },
      { order: 2, instruction: "Amestecă compoziția cu carnea și condimentele." },
      { order: 3, instruction: "Împăturește sarmalele în foile de varză." },
      { order: 4, instruction: "Fierbe la foc mic timp de 3 ore." },
      { order: 5, instruction: "Servește cu mămăligă și smântână." }
    ]
  },
  {
    title: "Paste Carbonara",
    description: "Rețeta clasică italiană cu sos cremos din ouă și parmezan.",
    userId: "user_demo",
    details: {
      difficulty: "Mediu",
      servings: 2,
      time: { prep: 10, cook: 15 }
    },
    ingredients: [
      { name: "spaghete", quantity: "200", unit: "g" },
      { name: "bacon", quantity: "100", unit: "g" },
      { name: "ouă", quantity: "2", unit: "buc" },
      { name: "parmezan", quantity: "50", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Fierbe pastele în apă cu sare." },
      { order: 2, instruction: "Prăjește baconul până devine crocant." },
      { order: 3, instruction: "Amestecă ouăle cu parmezanul ras." },
      { order: 4, instruction: "Toarnă sosul de ouă peste pastele fierbinți (foc oprit)." }
    ]
  },
  {
    title: "Salată Caesar",
    description: "O salată proaspătă cu piept de pui la grătar și crutoane.",
    userId: "user_demo",
    details: {
      difficulty: "Ușor",
      servings: 2,
      time: { prep: 15, cook: 10 }
    },
    ingredients: [
      { name: "salată verde", quantity: "1", unit: "buc" },
      { name: "piept de pui", quantity: "300", unit: "g" },
      { name: "crutoane", quantity: "50", unit: "g" },
      { name: "sos caesar", quantity: "50", unit: "ml" },
      { name: "parmezan", quantity: "30", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Gătește pieptul de pui pe grătar." },
      { order: 2, instruction: "Spală și rupe frunzele de salată." },
      { order: 3, instruction: "Taie puiul fâșii și amestecă totul cu sosul." }
    ]
  },
  {
    title: "Papanași cu smântână",
    description: "Gogoși din brânză de vaci, servite cu dulceață de afine.",
    userId: "user_demo",
    details: {
      difficulty: "Mediu",
      servings: 4,
      time: { prep: 20, cook: 20 }
    },
    ingredients: [
      { name: "brânză de vaci", quantity: "500", unit: "g" },
      { name: "făină", quantity: "200", unit: "g" },
      { name: "ouă", quantity: "2", unit: "buc" },
      { name: "smântână", quantity: "200", unit: "g" },
      { name: "dulceață", quantity: "150", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Amestecă brânza cu ouăle, grișul și făina." },
      { order: 2, instruction: "Formează bile cu gaură la mijloc." },
      { order: 3, instruction: "Prăjește în baie de ulei până se rumenesc." },
      { order: 4, instruction: "Servește cald cu smântână și dulceață." }
    ]
  },
  {
    title: "Supă cremă de legume",
    description: "O supă fină și sănătoasă, plină de vitamine.",
    userId: "user_demo",
    details: {
      difficulty: "Ușor",
      servings: 4,
      time: { prep: 15, cook: 30 }
    },
    ingredients: [
      { name: "cartofi", quantity: "3", unit: "buc" },
      { name: "morcovi", quantity: "2", unit: "buc" },
      { name: "dovlecel", quantity: "1", unit: "buc" },
      { name: "smântână lichidă", quantity: "100", unit: "ml" },
      { name: "crutoane", quantity: "100", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Fierbe legumele în apă cu sare." },
      { order: 2, instruction: "Blendează legumele fierte." },
      { order: 3, instruction: "Adaugă smântâna lichidă și mai dă un clocot." }
    ]
  },
  {
    title: "Tocăniță de pui",
    description: "Mâncare scăzută cu sos alb și mărar.",
    userId: "user_demo",
    details: {
      difficulty: "Mediu",
      servings: 4,
      time: { prep: 20, cook: 40 }
    },
    ingredients: [
      { name: "pulpe pui", quantity: "4", unit: "buc" },
      { name: "ciuperci", quantity: "500", unit: "g" },
      { name: "ceapă", quantity: "2", unit: "buc" },
      { name: "smântână", quantity: "200", unit: "ml" },
      { name: "mărar", quantity: "1", unit: "leg" }
    ],
    steps: [
      { order: 1, instruction: "Călește ceapa și ciupercile." },
      { order: 2, instruction: "Adaugă puiul și apă, lasă la fiert." },
      { order: 3, instruction: "Adaugă smântâna amestecată cu puțină făină." },
      { order: 4, instruction: "Presară mărar la final." }
    ]
  },
  {
    title: "Clătite cu ciocolată",
    description: "Desert simplu și rapid iubit de copii.",
    userId: "user_demo",
    details: {
      difficulty: "Ușor",
      servings: 4,
      time: { prep: 10, cook: 20 }
    },
    ingredients: [
      { name: "făină", quantity: "250", unit: "g" },
      { name: "lapte", quantity: "500", unit: "ml" },
      { name: "ouă", quantity: "3", unit: "buc" },
      { name: "ciocolată", quantity: "200", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Fă aluatul din făină, lapte și ouă." },
      { order: 2, instruction: "Prăjește foile în tigaie." },
      { order: 3, instruction: "Umple cu ciocolată și rulează." }
    ]
  },
  {
    title: "Guacamole",
    description: "Gustare mexicană rapidă din avocado.",
    userId: "user_demo",
    details: {
      difficulty: "Ușor",
      servings: 2,
      time: { prep: 10, cook: 0 }
    },
    ingredients: [
      { name: "avocado", quantity: "2", unit: "buc" },
      { name: "roșie", quantity: "1", unit: "buc" },
      { name: "ceapă roșie", quantity: "1", unit: "buc" },
      { name: "lime", quantity: "1", unit: "buc" }
    ],
    steps: [
      { order: 1, instruction: "Pisează avocado cu furculița." },
      { order: 2, instruction: "Toacă mărunt ceapa și roșia." },
      { order: 3, instruction: "Amestecă totul cu zeamă de lime și sare." }
    ]
  },
  {
    title: "Mici la grătar",
    description: "Tradiționalii mici românești cu muștar.",
    userId: "user_demo",
    details: {
      difficulty: "Ușor",
      servings: 4,
      time: { prep: 5, cook: 15 }
    },
    ingredients: [
      { name: "mici", quantity: "1", unit: "caserolă" },
      { name: "muștar", quantity: "1", unit: "borcan" },
      { name: "pâine", quantity: "1", unit: "buc" }
    ],
    steps: [
      { order: 1, instruction: "Încinge grătarul." },
      { order: 2, instruction: "Pune micii pe grătar și întoarce-i des." },
      { order: 3, instruction: "Servește fierbinte cu muștar." }
    ]
  }
];

async function seedDatabase() {
  const recipesCollection = db.collection('recipes');
  try {
    for (const recipe of recipes) {
      await recipesCollection.add(recipe);
    }
  } catch (error) {
    console.error('Eroare:', error);
  } finally {
    process.exit();// Închide procesul după finalizare
  }
}

seedDatabase();