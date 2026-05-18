import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { authRouter } from "./auth";
import { portfolioRouter } from "./portfolio";

const router: IRouter = Router();

router.use("/api/auth", authRouter);
router.use("/api/portfolio", portfolioRouter);
router.use(healthRouter);

export default router;
