import { query } from '@/app/lib/db';

export const geteAllReviews = async () => {
    try {
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

export const getReviewById = async (id: number) => {
    try {
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
            WHERE reviews.id = $1
        `,[id]);

        if (res.rows.length === 0) {
            throw new Error(`review with ID ${id} not found`);
        }

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
        }))[0];
    } catch (error) {
        console.error("Error fetching review:", error);
        throw new Error("Failed to fetch review");
    }
}

