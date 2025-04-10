import express from "express";
import athleteRouter from "./athlete";
import managerRouter from "./manager";
import materialRouter from "./material";
import modalityRouter from "./modality";
import teacherRouter from "./teacher";
import scheduleRouter from "./schedule";
import authRouter from "./auth";
import enrollmentRouter from "./enrollment";
import testRouter from "./test";
import teacherAuthRouter from "./teacher-auth";
import managerAuthRouter from "./manager-auth";

const router = express.Router();

// Add debug middleware
router.use((req, res, next) => {
    console.log(`[DEBUG] Route hit: ${req.method} ${req.path}`);
    next();
});

// Authentication routes
router.use("/auth/athlete", authRouter);
router.use("/auth/teacher", teacherAuthRouter);
router.use("/auth/manager", managerAuthRouter);

// Other routes
router.use("/athletes", athleteRouter);
router.use("/managers", managerRouter);
router.use("/materials", materialRouter);
router.use("/modalities", modalityRouter);
router.use("/teachers", teacherRouter);
router.use("/enrollments", enrollmentRouter);
router.use("/schedule", scheduleRouter);
router.use("/test", testRouter);

export default router;