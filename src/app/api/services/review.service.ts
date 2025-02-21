import { query } from '@/app/lib/db';

export const geteAllReviews = async () => {
    try {
        // SQL query to fetch customers from the 'customers' table
        const res = await query(`
            SELECT 
              reviews.*, 
              customers.id AS customer_id, 
              customers.name AS owner_name, 
              customers.email AS owner_email,
              rooms.id AS room_id,
              rooms.title AS room_name,
              rooms.price AS room_price
            FROM reviews
            JOIN customers ON reviews.customer_id = customers.id
            JOIN rooms ON reviews.room_id = rooms.id
        `);

        if (res.rows.length === 0) return null;

        console.log(res.rows)

        return res.rows.map(review => ({
            ...review,
            customer: review.customer_id
                ? {
                    id: review.customer_id,
                    name: review.owner_name,
                    email: review.owner_email,
                }
                : null,
            room: review.room_id ? {
                id: review.room_id,
                title: review.room_name,
                price: review.room_price,
            }: null,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

