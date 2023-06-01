import { Router } from "express"
import { Rooms } from "../types/Rooms";

const router = Router();

router.get("/", (req, res) => {
    const rooms = Rooms.getInstanse();

    const id = req.query.id;
    if(!id)
        res.status(400).json({"message": "please provide id of a room"})

    const room = rooms.get(<string>id);

    if(room) {
        res.status(200).json(room);
    } else {
        res.status(204).json("no room found");
    }

});

export default router;