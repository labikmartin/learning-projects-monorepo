const db = require('better-sqlite3')(__dirname + '/food.db');

const dummyFood = [
  {
    author: 'Alice Waters',
    author_email: 'alice@example.com',
    description:
      'A perfectly grilled salmon fillet with a hint of lemon and herbs, served with a side of vegetables.',
    image: 'salmon.webp',
    instructions: `
      1. Prepare the salmon:
         Season the salmon fillets with salt, pepper, and lemon juice.

      2. Grill the salmon:
         Heat the grill and cook the salmon for 4-5 minutes on each side, until flaky.

      3. Serve:
         Serve hot with a side of grilled vegetables and a wedge of lemon.
    `,
    slug: 'grilled-salmon',
    title: 'Grilled Salmon',
  },
  {
    author: 'Gordon Ramsay',
    author_email: 'gordon@example.com',
    description:
      'Creamy Alfredo pasta with tender pieces of chicken, topped with grated Parmesan cheese.',
    image: 'alfredo.webp',
    instructions: `
      1. Cook the pasta:
         Boil fettuccine until al dente, then drain.

      2. Prepare the chicken:
         Cook diced chicken in a pan until golden brown.

      3. Make the Alfredo sauce:
         In a saucepan, melt butter and stir in heavy cream and Parmesan cheese until smooth.

      4. Combine and serve:
         Mix the pasta and chicken with the sauce, then serve hot.
    `,
    slug: 'chicken-alfredo-pasta',
    title: 'Chicken Alfredo Pasta',
  },
  {
    author: 'Jamie Oliver',
    author_email: 'jamie@example.com',
    description:
      'A quick and healthy stir-fry with a mix of fresh vegetables, tossed in a savory sauce.',
    image: 'stirfry.webp',
    instructions: `
      1. Prepare the vegetables:
         Chop a variety of vegetables into bite-sized pieces.

      2. Stir-fry the vegetables:
         Heat oil in a wok and add the vegetables, cooking for 5-7 minutes.

      3. Add the sauce:
         Stir in soy sauce, garlic, and ginger. Cook for another 2 minutes.

      4. Serve:
         Serve hot with a side of rice or noodles.
    `,
    slug: 'vegetable-stir-fry',
    title: 'Vegetable Stir Fry',
  },
  {
    author: 'Rick Bayless',
    author_email: 'rick@example.com',
    description:
      'Soft tortillas filled with seasoned beef, fresh vegetables, and a sprinkle of cheese.',
    image: 'tacos.webp',
    instructions: `
      1. Cook the beef:
         Brown ground beef in a pan with taco seasoning.

      2. Prepare the toppings:
         Chop lettuce, tomatoes, and onions.

      3. Assemble the tacos:
         Fill tortillas with beef, then top with vegetables and cheese.

      4. Serve:
         Serve with salsa and sour cream on the side.
         <script>console.log('XSS')</script>
    `,
    slug: 'beef-tacos',
    title: 'Beef Tacos',
  },
  {
    author: 'Ina Garten',
    author_email: 'ina@example.com',
    description:
      'Succulent shrimp cooked in a garlic and butter sauce, served over a bed of pasta.',
    image: 'scampi.webp',
    instructions: `
      1. Cook the pasta:
         Boil linguine until al dente, then drain.

      2. Prepare the shrimp:
         Sauté shrimp in butter with garlic and lemon juice until pink.

      3. Combine and serve:
         Toss the shrimp with the pasta and sprinkle with parsley. Serve hot.
    `,
    slug: 'shrimp-scampi',
    title: 'Shrimp Scampi',
  },
  {
    author: 'Yotam Ottolenghi',
    author_email: 'yotam@example.com',
    description:
      'A nutritious salad with quinoa, fresh vegetables, and a light vinaigrette.',
    image: 'quinoa-salad.webp',
    instructions: `
      1. Cook the quinoa:
         Rinse quinoa and cook according to package instructions.

      2. Prepare the vegetables:
         Chop cucumbers, tomatoes, and red onions.

      3. Mix the salad:
         Combine quinoa, vegetables, and a vinaigrette made of olive oil, lemon juice, and herbs.

      4. Serve:
         Serve chilled or at room temperature.
    `,
    slug: 'quinoa-salad',
    title: 'Quinoa Salad',
  },
  {
    author: 'Martha Stewart',
    author_email: 'martha@example.com',
    description:
      'Fluffy pancakes loaded with fresh blueberries, served with a drizzle of maple syrup.',
    image: 'pancakes.webp',
    instructions: `
      1. Prepare the batter:
         Mix flour, baking powder, milk, eggs, and a pinch of salt to make a batter. Fold in blueberries.

      2. Cook the pancakes:
         Pour batter onto a hot griddle, cooking until bubbles form. Flip and cook until golden brown.

      3. Serve:
         Serve hot with butter and maple syrup.
    `,
    slug: 'blueberry-pancakes',
    title: 'Blueberry Pancakes',
  },
];

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS food (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       description TEXT NOT NULL,
       instructions TEXT NOT NULL,
       author TEXT NOT NULL,
       author_email TEXT NOT NULL
    )
`,
).run();

async function initData() {
  console.info('Database initialised!');

  const stmt = db.prepare(`
      INSERT INTO food VALUES (
         null,
         @slug,
         @title,
         @image,
         @description,
         @instructions,
         @author,
         @author_email
      )
   `);

  for (const food of dummyFood) {
    stmt.run(food);
  }
}

initData();
