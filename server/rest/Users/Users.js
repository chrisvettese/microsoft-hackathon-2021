import { Router } from "express";
import User from "../../models/User.js";
const userRouter = Router();

userRouter.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = User.findByPk(id)
    res.send(user.toJson());
});

export default userRouter;