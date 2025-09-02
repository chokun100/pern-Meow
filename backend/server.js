import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { aj } from "./lib/arcjet.js";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
})); //security middleware

app.use(morgan("dev")); //logging middleware to console

// apply arcjet rate-limit to all routes
// middleware globally
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1
        })
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too many requests" })
            } else if (decision.reason.isBot()) {
                res.status(403).json({ error: "Bot detected: Access denied" })
            } else {
                res.status(403).json({ error: "Forbidden: Access denied" })
            }
            return
        }

        //check for speefed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ error: "Bot detected: Access denied" });
            return;
        }

        next();
    } catch (error) {
        console.log("ERROR in arcjet middleware", error);
        next(error);
    }
});

app.get("/greet", (req, res) => {
    res.send("Hello from the backend!");
});

app.use("/api/products", productRoutes)

if(process.env.NODE_ENV === "production") {
    //serve react app
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

async function initDB() {
    try {

        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        console.log("Database initialized successfully");
    } catch (error) {
        console.log("ERROR initDB", error);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});