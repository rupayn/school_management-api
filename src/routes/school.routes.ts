import express from "express";

const router = express.Router();

router.get("/school", (req:express.Request, res:express.Response) => {
    res.send("School route");
});

export default router;