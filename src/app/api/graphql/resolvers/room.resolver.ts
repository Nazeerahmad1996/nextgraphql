import { getAllRooms } from "../../services/room.service";

const roomResolver = {
    Query: {
        rooms: getAllRooms
    },
    Mutation: {

    }
}

export default roomResolver;