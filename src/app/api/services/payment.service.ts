import { query } from '@/app/lib/db';

export const getAllPayments = async () => {
    try {
        const res = await query(`
            SELECT 
              payments.*, 
              bookings.id AS booking_id, 
              bookings.status AS booking_status, 
              bookings.total_price AS booking_total_price,
              bookings.check_out AS booking_check_out,
              bookings.check_in AS booking_check_in
            FROM payments
            JOIN bookings ON payments.booking_id = bookings.id
        `);

        if (res.rows.length === 0) return null;

        return res.rows.map(payment => ({
            ...payment,
            booking: payment.booking_id
                ? {
                    id: payment.booking_id,
                    total_price: payment.owner_name,
                    check_out: payment.booking_check_out,
                    check_in: payment.booking_check_in,
                    status: payment.booking_status
                }
                : null
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getPaymentById = async (id: number) => {

    try {
        if (!id) return null;
        const res = await query(`
            SELECT 
              payments.*, 
              bookings.id AS booking_id, 
              bookings.status AS booking_status, 
              bookings.total_price AS booking_total_price,
              bookings.check_out AS booking_check_out,
              bookings.check_in AS booking_check_in
            FROM payments
            JOIN bookings ON payments.booking_id = bookings.id
            WHERE payments.id = $1
        `, [id]);

        if (res.rows.length === 0) {
            throw new Error(`payment with ID ${id} not found`);
        }

        return res.rows.map(payment => ({
            ...payment,
            booking: payment.booking_id
                ? {
                    id: payment.booking_id,
                    total_price: payment.owner_name,
                    check_out: payment.booking_check_out,
                    check_in: payment.booking_check_in,
                    status: payment.booking_status
                }
                : null
        }))[0];

    } catch (error) {
        console.error("Error fetching payment:", error);
        throw new Error("Failed to fetch payment");
    }
}

