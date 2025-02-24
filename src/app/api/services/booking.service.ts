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
    } catch (error) {
        console.error(error);
        return error;
    }
}


export const getBookingById = async (id: number) => {
    try {
        if (!id) return null;
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
            WHERE bookings.id = $1
        `, [id]);

        if (res.rows.length === 0) {
            throw new Error(`booking with ID ${id} not found`);
        }

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
        }))[0];
    } catch (error) {
        console.error("Error fetching booking:", error);
        throw new Error("Failed to fetch booking");
    }
}

