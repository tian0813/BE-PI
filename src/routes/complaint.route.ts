import { Router } from "express";
import ComplaintController from "../controllers/complaint.controller";
import ComplaintService from "../services/complaint.service";
import ComplaintRepository from "../repositories/complaint.repository";
import { PrismaClient } from "@prisma/client";
import upload from "../middleware/upload";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

const prismaClient = new PrismaClient();
const complaintRepository = new ComplaintRepository(prismaClient);
const complaintService = new ComplaintService(complaintRepository);
const complaintController = new ComplaintController(complaintService);

router.get("/", (req, res, next) =>
  complaintController.getAllComplaints(req, res, next)
);

router.post("/", upload.single("photo"), (req, res, next) =>
  complaintController.createComplaint(req, res, next)
);

router.get("/:idComplaint", (req, res, next) =>
  complaintController.getComplaintById(req, res, next)
);

router.put("/:idComplaint", upload.single("photo"), (req, res, next) =>
  complaintController.updateComplaint(req, res, next)
);

router.patch("/:idComplaint", (req, res, next) =>
  complaintController.softDelete(req, res, next)
);

export default router;
