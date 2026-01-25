require('dotenv').config();
const { db } = require('./db');

const recipes = [
  {
    title: "Pui Tikka Masala",
    description: "Un curry indian cremos, aromat și ușor picant, servit cu orez basmati.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 4, time: { prep: 20, cook: 40 } },
    ingredients: [
      { name: "piept de pui", quantity: "500", unit: "g" },
      { name: "iaurt grecesc", quantity: "200", unit: "g" },
      { name: "sos de roșii", quantity: "400", unit: "ml" },
      { name: "garam masala", quantity: "1", unit: "lg" },
      { name: "smântână lichidă", quantity: "100", unit: "ml" }
    ],
    steps: [
      { order: 1, instruction: "Marinează puiul în iaurt și condimente." },
      { order: 2, instruction: "Prăjește puiul, apoi adaugă sosul de roșii." },
      { order: 3, instruction: "Adaugă smântâna lichidă și fierbe la foc mic 15 min." }
    ]
  },
  {
    title: "Supă cremă de linte roșie",
    description: "O supă hrănitoare, bogată în proteine și foarte rapid de preparat.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 4, time: { prep: 10, cook: 20 } },
    ingredients: [
      { name: "linte roșie", quantity: "250", unit: "g" },
      { name: "morcov", quantity: "1", unit: "buc" },
      { name: "ceapă", quantity: "1", unit: "buc" },
      { name: "apă", quantity: "1.5", unit: "L" },
      { name: "lămâie", quantity: "1", unit: "buc" }
    ],
    steps: [
      { order: 1, instruction: "Fierbe lintea cu legumele tocate." },
      { order: 2, instruction: "Când sunt fierte, blendează totul." },
      { order: 3, instruction: "Servește cu zeamă de lămâie și crutoane." }
    ]
  },
  {
    title: "Paste cu Pesto și roșii cherry",
    description: "Cină rapidă în stil italian, gata în 15 minute.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 2, time: { prep: 5, cook: 10 } },
    ingredients: [
      { name: "paste fusilli", quantity: "250", unit: "g" },
      { name: "sos pesto", quantity: "1", unit: "borcan" },
      { name: "roșii cherry", quantity: "200", unit: "g" },
      { name: "parmezan", quantity: "50", unit: "g" },
      { name: "muguri de pin", quantity: "20", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Fierbe pastele al dente." },
      { order: 2, instruction: "Amestecă pastele fierbinți cu sosul pesto." },
      { order: 3, instruction: "Adaugă roșiile tăiate și parmezan." }
    ]
  },
  {
    title: "Quesadilla cu pui",
    description: "Lipie crocantă umplută cu pui, cașcaval topit și ardei.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 2, time: { prep: 10, cook: 10 } },
    ingredients: [
      { name: "lipii tortilla", quantity: "2", unit: "buc" },
      { name: "piept de pui gătit", quantity: "150", unit: "g" },
      { name: "cașcaval ras", quantity: "100", unit: "g" },
      { name: "porumb", quantity: "2", unit: "lg" },
      { name: "ardei roșu", quantity: "1/2", unit: "buc" }
    ],
    steps: [
      { order: 1, instruction: "Pune ingredientele pe jumătate de lipie și împăturește." },
      { order: 2, instruction: "Rumenește în tigaie pe ambele părți." },
      { order: 3, instruction: "Taie triunghiuri și servește cald." }
    ]
  },
  {
    title: "Ratatouille",
    description: "Tocăniță franțuzească de legume, sănătoasă și colorată.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 4, time: { prep: 20, cook: 40 } },
    ingredients: [
      { name: "vinete", quantity: "1", unit: "buc" },
      { name: "dovlecel", quantity: "1", unit: "buc" },
      { name: "ardei gras", quantity: "2", unit: "buc" },
      { name: "roșii", quantity: "3", unit: "buc" },
      { name: "usturoi", quantity: "3", unit: "căței" }
    ],
    steps: [
      { order: 1, instruction: "Taie toate legumele cubulețe sau felii." },
      { order: 2, instruction: "Călește-le pe rând în ulei de măsline." },
      { order: 3, instruction: "Amestecă-le și lasă-le să scadă la foc mic cu ierburi aromatice." }
    ]
  },
  {
    title: "Lava Cake (Vulcan de ciocolată)",
    description: "Prăjitură cu mijloc lichid de ciocolată, spectaculoasă dar simplă.",
    userId: "user_demo",
    details: { difficulty: "Greu", servings: 4, time: { prep: 15, cook: 12 } },
    ingredients: [
      { name: "ciocolată neagră", quantity: "160", unit: "g" },
      { name: "unt", quantity: "100", unit: "g" },
      { name: "ouă", quantity: "2", unit: "buc" },
      { name: "făină", quantity: "2", unit: "lg" },
      { name: "zahăr", quantity: "80", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Topește ciocolata cu untul." },
      { order: 2, instruction: "Mixează ouăle cu zahărul și adaugă ciocolata." },
      { order: 3, instruction: "Coace exact 12 minute la 200 grade (mijlocul trebuie să fie moale)." }
    ]
  },
  {
    title: "Salată Tabouleh",
    description: "Salată libaneză răcoritoare cu mult pătrunjel și bulgur.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 4, time: { prep: 20, cook: 0 } },
    ingredients: [
      { name: "pătrunjel", quantity: "3", unit: "leg" },
      { name: "bulgur", quantity: "50", unit: "g" },
      { name: "roșii", quantity: "2", unit: "buc" },
      { name: "ceapă verde", quantity: "1", unit: "leg" },
      { name: "lămâie", quantity: "2", unit: "buc" }
    ],
    steps: [
      { order: 1, instruction: "Hidratează bulgurul în apă fierbinte." },
      { order: 2, instruction: "Toacă pătrunjelul foarte mărunt." },
      { order: 3, instruction: "Amestecă totul cu roșii cubulețe și multă zeamă de lămâie." }
    ]
  },
  {
    title: "Cartofi dulci la cuptor",
    description: "Garnitură sănătoasă sau fel principal vegan.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 2, time: { prep: 10, cook: 30 } },
    ingredients: [
      { name: "cartofi dulci", quantity: "2", unit: "buc" },
      { name: "ulei măsline", quantity: "2", unit: "lg" },
      { name: "boia afumată", quantity: "1", unit: "lgt" },
      { name: "rozmarin", quantity: "1", unit: "leg" },
      { name: "sare", quantity: "1", unit: "praf" }
    ],
    steps: [
      { order: 1, instruction: "Taie cartofii wedges (felii groase)." },
      { order: 2, instruction: "Amestecă cu ulei și condimente." },
      { order: 3, instruction: "Coace la 200 grade până devin moi și rumeni." }
    ]
  },
  {
    title: "Vită Stroganoff",
    description: "Fâșii fragede de vită în sos de smântână cu ciuperci.",
    userId: "user_demo",
    details: { difficulty: "Greu", servings: 4, time: { prep: 20, cook: 40 } },
    ingredients: [
      { name: "mușchi vită", quantity: "500", unit: "g" },
      { name: "ciuperci", quantity: "300", unit: "g" },
      { name: "smântână fermentată", quantity: "200", unit: "g" },
      { name: "ceapă", quantity: "1", unit: "buc" },
      { name: "muștar Dijon", quantity: "1", unit: "lg" }
    ],
    steps: [
      { order: 1, instruction: "Prăjește rapid fâșiile de vită la foc iute." },
      { order: 2, instruction: "În aceeași tigaie călește ceapa și ciupercile." },
      { order: 3, instruction: "Adaugă smântâna, muștarul și carnea înapoi, mai fierbe 5 min." }
    ]
  },
  {
    title: "Bruschete cu roșii",
    description: "Aperitiv clasic, simplu și plin de savoare.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 6, time: { prep: 10, cook: 5 } },
    ingredients: [
      { name: "baghetă", quantity: "1", unit: "buc" },
      { name: "roșii", quantity: "3", unit: "buc" },
      { name: "usturoi", quantity: "2", unit: "căței" },
      { name: "busuioc proaspăt", quantity: "1", unit: "mână" },
      { name: "ulei măsline", quantity: "3", unit: "lg" }
    ],
    steps: [
      { order: 1, instruction: "Prăjește feliile de pâine." },
      { order: 2, instruction: "Freacă pâinea cu usturoi crud." },
      { order: 3, instruction: "Pune deasupra amestecul de roșii, busuioc și ulei." }
    ]
  },
  {
    title: "Păstrăv la cuptor",
    description: "Pește întreg gătit simplu, cu ierburi și lămâie.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 2, time: { prep: 10, cook: 25 } },
    ingredients: [
      { name: "păstrăv eviscerat", quantity: "2", unit: "buc" },
      { name: "lămâie", quantity: "1", unit: "buc" },
      { name: "usturoi", quantity: "4", unit: "căței" },
      { name: "pătrunjel", quantity: "1", unit: "leg" },
      { name: "unt", quantity: "50", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Crestează peștele și condimentează-l." },
      { order: 2, instruction: "Umple interiorul cu felii de lămâie, usturoi și pătrunjel." },
      { order: 3, instruction: "Coace 25 minute la 180 grade." }
    ]
  },
  {
    title: "Smoothie de fructe de pădure",
    description: "Mic dejun lichid, plin de antioxidanți.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 1, time: { prep: 5, cook: 0 } },
    ingredients: [
      { name: "fructe de pădure (congelate)", quantity: "150", unit: "g" },
      { name: "banană", quantity: "1", unit: "buc" },
      { name: "lapte (sau vegetal)", quantity: "200", unit: "ml" },
      { name: "miere", quantity: "1", unit: "lgt" }
    ],
    steps: [
      { order: 1, instruction: "Pune totul în blender." },
      { order: 2, instruction: "Mixează 30 de secunde." },
      { order: 3, instruction: "Servește imediat." }
    ]
  },
  {
    title: "Falafel",
    description: "Chiftele crocante din năut, specific Orientului Mijlociu.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 4, time: { prep: 20, cook: 15 } },
    ingredients: [
      { name: "năut uscat (înmuiat)", quantity: "250", unit: "g" },
      { name: "ceapă", quantity: "1", unit: "buc" },
      { name: "usturoi", quantity: "3", unit: "căței" },
      { name: "chimion", quantity: "1", unit: "lgt" },
      { name: "pătrunjel", quantity: "1", unit: "leg" }
    ],
    steps: [
      { order: 1, instruction: "Procesează năutul crud (înmuiat peste noapte) cu restul ingredientelor în robot." },
      { order: 2, instruction: "Formează bile mici cu mâna." },
      { order: 3, instruction: "Prăjește în ulei încins până se rumenesc." }
    ]
  },
  {
    title: "Frigănele (French Toast)",
    description: "Pâine înmuiată în ou și lapte, prăjită în unt. Mic dejun delicios.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 2, time: { prep: 5, cook: 10 } },
    ingredients: [
      { name: "pâine veche (felii)", quantity: "4", unit: "buc" },
      { name: "ouă", quantity: "2", unit: "buc" },
      { name: "lapte", quantity: "50", unit: "ml" },
      { name: "zahăr vanilat", quantity: "1", unit: "plic" },
      { name: "unt", quantity: "30", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Bate ouăle cu laptele și zahărul." },
      { order: 2, instruction: "Înmoaie feliile de pâine în compoziție." },
      { order: 3, instruction: "Prăjește în unt pe ambele părți." }
    ]
  },
  {
    title: "Curry de năut (Vegan)",
    description: "Mâncare scăzută, picantă și foarte sățioasă.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 4, time: { prep: 10, cook: 30 } },
    ingredients: [
      { name: "năut fiert", quantity: "1", unit: "conservă" },
      { name: "lapte de cocos", quantity: "400", unit: "ml" },
      { name: "curry pudră", quantity: "1", unit: "lg" },
      { name: "spanac", quantity: "100", unit: "g" },
      { name: "orez", quantity: "200", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Călește condimentele pentru a le activa aroma." },
      { order: 2, instruction: "Adaugă năutul și laptele de cocos, fierbe 20 min." },
      { order: 3, instruction: "La final pune spanacul și servește cu orez." }
    ]
  },
  {
    title: "Plăcintă cu mere",
    description: "Desert de casă cu foi fragede și umplutură generoasă de mere.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 8, time: { prep: 30, cook: 45 } },
    ingredients: [
      { name: "făină", quantity: "500", unit: "g" },
      { name: "unt", quantity: "200", unit: "g" },
      { name: "mere", quantity: "1.5", unit: "kg" },
      { name: "zahăr", quantity: "200", unit: "g" },
      { name: "scorțișoară", quantity: "1", unit: "lg" }
    ],
    steps: [
      { order: 1, instruction: "Fă un aluat din făină, unt și puțină apă rece." },
      { order: 2, instruction: "Rade merele și călește-le cu zahăr și scorțișoară." },
      { order: 3, instruction: "Întinde două foi și pune merele la mijloc. Coace 45 min." }
    ]
  },
  {
    title: "Club Sandwich",
    description: "Sandviș etajat cu pui, bacon, salată și roșii.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 1, time: { prep: 15, cook: 0 } },
    ingredients: [
      { name: "pâine toast", quantity: "3", unit: "felii" },
      { name: "piept pui grătar", quantity: "100", unit: "g" },
      { name: "bacon prăjit", quantity: "2", unit: "felii" },
      { name: "maioneză", quantity: "1", unit: "lg" },
      { name: "salată verde", quantity: "2", unit: "frunze" }
    ],
    steps: [
      { order: 1, instruction: "Prăjește pâinea." },
      { order: 2, instruction: "Unge cu maioneză fiecare felie." },
      { order: 3, instruction: "Construiește sandvișul pe două etaje și taie-l triunghiuri." }
    ]
  },
  {
    title: "Gazpacho",
    description: "Supă rece de roșii, specifică Spaniei. Perfectă vara.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 4, time: { prep: 15, cook: 0 } },
    ingredients: [
      { name: "roșii coapte", quantity: "1", unit: "kg" },
      { name: "castravete", quantity: "1", unit: "buc" },
      { name: "ardei gras", quantity: "1", unit: "buc" },
      { name: "usturoi", quantity: "2", unit: "căței" },
      { name: "oțet sherry", quantity: "2", unit: "lg" }
    ],
    steps: [
      { order: 1, instruction: "Taie toate legumele grosier." },
      { order: 2, instruction: "Blendează totul până devine o supă fină." },
      { order: 3, instruction: "Servește foarte rece, cu ulei de măsline deasupra." }
    ]
  },
  {
    title: "Coaste de porc BBQ",
    description: "Coaste fragede, gătite lent la cuptor cu sos barbeque.",
    userId: "user_demo",
    details: { difficulty: "Mediu", servings: 4, time: { prep: 15, cook: 150 } },
    ingredients: [
      { name: "coaste porc", quantity: "1.5", unit: "kg" },
      { name: "sos BBQ", quantity: "200", unit: "ml" },
      { name: "boia", quantity: "1", unit: "lg" },
      { name: "usturoi pudră", quantity: "1", unit: "lgt" },
      { name: "zahăr brun", quantity: "2", unit: "lg" }
    ],
    steps: [
      { order: 1, instruction: "Masează coastele cu condimentele uscate." },
      { order: 2, instruction: "Îvelește în folie de aluminiu și coace 2 ore la 160 grade." },
      { order: 3, instruction: "Desfă folia, unge cu sos BBQ și mai coace 30 min la foc mare." }
    ]
  },
  {
    title: "Budincă de Chia",
    description: "Desert sănătos sau mic dejun, fără gătire.",
    userId: "user_demo",
    details: { difficulty: "Ușor", servings: 2, time: { prep: 5, cook: 0 } },
    ingredients: [
      { name: "semințe chia", quantity: "4", unit: "lg" },
      { name: "lapte migdale", quantity: "250", unit: "ml" },
      { name: "miere", quantity: "1", unit: "lg" },
      { name: "vanilie", quantity: "1", unit: "picătură" },
      { name: "fructe proaspete", quantity: "50", unit: "g" }
    ],
    steps: [
      { order: 1, instruction: "Amestecă semințele cu laptele și mierea." },
      { order: 2, instruction: "Lasă la frigider minim 2 ore (sau peste noapte)." },
      { order: 3, instruction: "Servește cu fructe deasupra." }
    ]
  }
];

async function seedDatabase() {
  const recipesCollection = db.collection('recipes');
  try {
    for (const recipe of recipes) {
      const daysBack = Math.floor(Math.random() * 365);
      const minutesBack = Math.floor(Math.random() * 1440);
      const fakeDate = new Date();
      fakeDate.setDate(fakeDate.getDate() - daysBack);
      fakeDate.setMinutes(fakeDate.getMinutes() - minutesBack);
      recipe.createdAt = fakeDate.toISOString(); 
      await recipesCollection.add(recipe);
    }
    console.log('Seed finalizat cu succes!');
  } catch (error) {
    console.error('Eroare:', error);
  } finally {
    process.exit();// Închide procesul după finalizare
  }
}

seedDatabase();