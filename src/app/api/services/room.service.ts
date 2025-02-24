import { query } from '@/app/lib/db';

export const getAllRooms = async () => {
    try {
        // SQL query to fetch customers from the 'customers' table
        const res = await query(`
            SELECT 
              rooms.*, 
              customers.id AS owner_id, 
              customers.name AS owner_name, 
              customers.email AS owner_email
            FROM rooms
            JOIN customers ON rooms.owner_id = customers.id
        `);

        if (res.rows.length === 0) return null;

        return res.rows.map(room => ({
            ...room,
            owner: room.owner_id
                ? {
                    id: room.owner_id,
                    name: room.owner_name,
                    email: room.owner_email,
                }
                : null
        }));

    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getRoomById = async (id: number) => {
    try {
        if (!id) return null;
        const res = await query(`
            SELECT 
              rooms.*, 
              customers.id AS owner_id, 
              customers.name AS owner_name, 
              customers.email AS owner_email
            FROM rooms
            JOIN customers ON rooms.owner_id = customers.id
            WHERE rooms.id = $1
        `, [id]);

        if (res.rows.length === 0) {
            throw new Error(`room with ID ${id} not found`);
        }

        return res.rows[0]
           ? {
               ...res.rows[0],
                owner: res.rows[0].owner_id
                   ? {
                        id: res.rows[0].owner_id,
                        name: res.rows[0].owner_name,
                        email: res.rows[0].owner_email,
                    }
                    : null
            }
            : null;

    } catch (error) {
        console.error("Error fetching room:", error);
        throw new Error("Failed to fetch room");
    }
}

