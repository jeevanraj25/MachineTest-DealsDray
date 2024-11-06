import express from "express"
import { login, logout, signup } from "../Controller/Admin.js";

const router =express.Router();


router.post("/login",login);
router.get("/logout",logout);
router.post("/signup",signup);

export default router