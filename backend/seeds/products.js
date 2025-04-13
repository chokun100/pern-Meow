import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Meow Meow",
    price: 299.99,
    image:
      "https://plus.unsplash.com/premium_photo-1707353401897-da9ba223f807?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow Food",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1712603257810-9cbe9dfec9cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow Condo",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1642394443976-974f8f6186b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow Toy",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=2095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow Sticks Mug",
    price: 20.99,
    image:
      "https://images.unsplash.com/photo-1536164175812-22cd40b73eb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow Device",
    price: 1099.99,
    image:
      "https://images.unsplash.com/photo-1727510155089-721c9c729a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow popoSand",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1615121196385-41e2d8dd409f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Meow Bed",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Database seeded successfully Meow!");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database: sad Meow...", error);
    process.exit(1); // failure code
  }
}

seedDatabase();