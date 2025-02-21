import { query } from '@/app/lib/db';

export const getAllBookings = async () => {
    try {
        const res = await query(`
            SELECT 
              bookings.*, 
              customers.id AS owner_id, 
              customers.name AS owner_name, 
              customers.email AS owner_email,
              rooms.id AS room_id,
              rooms.title AS room_name,
              rooms.price AS room_price
            FROM bookings
            JOIN customers ON bookings.customer_id = customers.id
            JOIN rooms ON bookings.room_id = rooms.id
        `);

        if (res.rows.length === 0) return null;

        return res.rows.map(booking => ({
            ...booking,
            customer: booking.customer_id
                ? {
                    id: booking.customer_id,
                    name: booking.owner_name,
                    email: booking.owner_email,
                }
                : null,
            room: booking.room_id ? {
                id: booking.room_id,
                title: booking.room_name,
                price: booking.room_price,
            } : null,
        }));
        return res.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}

