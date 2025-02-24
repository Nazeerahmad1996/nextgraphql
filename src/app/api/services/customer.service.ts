import { query } from '@/app/lib/db';

export const getAllCustomers = async () => {
    try {
        // SQL query to fetch customers from the 'customers' table
        const res = await query('SELECT * FROM customers');
        return res.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getCustomerById = async (id: number) => {
    try {
        const res = await query('SELECT * FROM customers WHERE id = $1', [id]);
        if (res.rows.length === 0) {
            throw new Error(`customer with ID ${id} not found`);
        }
        return res.rows[0];
    } catch (error) {
        console.error("Error fetching booking:", error);
        throw new Error("Failed to fetch booking");
    }
}

