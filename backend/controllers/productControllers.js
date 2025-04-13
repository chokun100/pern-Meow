import { sql } from "../config/db.js";
//CRUD
export const getProducts = async (req, res) => {
    try{
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;

        console.log("FETCHED PRODUCTS", products);
        res.status(200).json({success:true, data:products});
    }catch(error){
        console.log("ERROR in getProducts function",error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const createProducts = async(req, res) => {
    const {name, price, image} = req.body;

    if(!name || !price || !image){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try{
        const newProduct = await sql`
            INSERT INTO products (name, price, image)
            VALUES (${name}, ${price}, ${image})
            RETURNING *
        `
        // console.log("NEW PRODUCT ADDED", newProduct);
        res.status(201).json({success: true, data: newProduct[0] });
        
    } catch(error){
        console.log("ERROR in createProducts",error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const getProduct = async(req, res) => {
    const {id} = req.params

    try{
        const product = await sql`
            SELECT * FROM products where id = ${id}
        `

        res.status(200).json({success: true, data: product[0] });

    } catch(error){
        console.log("ERROR in createProducts",error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const updateProducts = async(req, res) => {
    const {id} = req.params
    const {name, price, image} = req.body;

    try{
        const updateProducts = await sql`
        UPDATE products
        SET name = ${name}, price = ${price}, image = ${image}
        WHERE id = ${id}
        RETURNING *
        `
        if (!updateProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({success: true, data: updateProducts[0] });
    }catch(error){
        console.log("ERROR in createProducts",error);
        res.status(500).json({success: false, message: "Product not found"});  
    }
};

export const deleteProducts = async(req, res) => {
    const {id} = req.params

    try {
        const deleteProduct = await sql`
            DELETE FROM products WHERE id = ${id} RETURNING *
        `;

        if (!deleteProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        
        res.status(200).json({success: true, data: deleteProduct[0] });
    } catch (error) {
        console.log("ERROR in deleteProducts function",error);
        res.status(500).json({success: false, message: "Product not found"});
        
    }
};