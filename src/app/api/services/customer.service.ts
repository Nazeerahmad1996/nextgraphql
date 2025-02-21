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

