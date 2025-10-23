// Connection
import connection from "../../connection.js";

// export const getArticlesOrderByIdCart = async (idCart) => {
//     const [rows] = await connection.execute(
//         `SELECT
//                 a.*
//             FROM carts_bought_items cbi
//             LEFT JOIN carts_bought_items cbi2 ON (cbi2.id_cart_bought = cbi.id_cart_bought)
//             LEFT JOIN carts c ON (c.id = cbi2.id_cart)
//             LEFT JOIN articles a ON (a.id = c.id_article)
//             WHERE cbi.id_cart = ?
//         `,
//         [idCart]
//     );
//     return rows;
// };

export const getArticlesOrderByIdCart = async (idCart) => {
    const [rows] = await connection.execute(
        `SELECT 
                a.id,
                a.name,
                a.description,
                a.main_image,
                other_items.id AS id_cart_bought_item,
                s.name AS name_shop,
                other_items.price_item,
                other_items.total_price,
                c.quantity AS quantity_order,
                cbt.id_currency,
                other_items.id_offer,
                other_items.total_price_with_discount
            FROM carts_bought_items current_item
            INNER JOIN carts_bought_items other_items ON (other_items.id_cart_bought = current_item.id_cart_bought)
            INNER JOIN carts c ON (c.id = other_items.id_cart)
            INNER JOIN articles a ON (a.id = c.id_article)
            INNER JOIN shops s ON (s.id = a.id_shop)
            INNER JOIN carts_bought cbt ON (cbt.id = other_items.id_cart_bought)
            WHERE current_item.id_cart = ?
        `,
        [idCart]
    );
    return rows;
};

// id_cart_bought
