import { Router } from "express";
import User from "../../models/User.js";
const userRouter = Router();

userRouter.get('/:id', async (req, res) => {
    const token = req.query.accessToken;

    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user === null) {
        res.sendStatus(404);
    }
    res.send(user.toJSON());
});

//Create new user
userRouter.post('', (req, res) => {
    const user = new User(5)
});

export default userRouter;