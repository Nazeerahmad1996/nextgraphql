import { getAllRooms, getRoomById } from "../../services/room.service";

const roomResolver = {
    Query: {
        rooms: getAllRooms,
        getRoomById: (_parent: any, { id }: { id: number }) => getRoomById(id)
    },
    Mutation: {

    }
}

export default roomResolver;