import { PrismaClient, Prisma } from "@prisma/client";
import Complaint from "../models/complaint.model";
import {
  CreateComplaintDto,
  UpdateComplaintDto,
  ComplaintFilters,
} from "../types/complaint";
import { PaginationParams } from "../types/pagination";
import { getErrorMessage } from "../utils/error";
import { timeStamp } from "console";

class ComplaintRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Tambahan di ComplaintRepository
  async findAllByAdmin(
    pagination?: PaginationParams,
    filters?: ComplaintFilters
  ): Promise<{ complaints: Complaint[]; total: number } | string> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.ComplaintWhereInput = {
        isDeleted: false,
        ...(filters?.search && {
          OR: [
            {
              location: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              description: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }),
        ...(filters?.startDate && { createdAt: { gte: filters.startDate } }),
        ...(filters?.endDate && { createdAt: { lte: filters.endDate } }),
      };

      const [complaints, total] = await Promise.all([
        this.prisma.complaint.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        this.prisma.complaint.count({ where }),
      ]);

      return {
        complaints: complaints.map(Complaint.fromEntity),
        total,
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async findAll(
    userId: number | null,
    pagination?: PaginationParams,
    filters?: ComplaintFilters
  ): Promise<{ complaints: Complaint[]; total: number } | string> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.ComplaintWhereInput = {
        isDeleted: false,
        ...(userId ? { userId: userId } : {}),
        ...(filters?.search && {
          OR: [
            {
              location: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              description: {
                contains: filters.search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }),
        ...(filters?.startDate && { createdAt: { gte: filters.startDate } }),
        ...(filters?.endDate && { createdAt: { lte: filters.endDate } }),
      };

      const [complaints, total] = await Promise.all([
        this.prisma.complaint.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.prisma.complaint.count({ where }),
      ]);

      return {
        complaints: complaints.map((complaint) =>
          Complaint.fromEntity(complaint)
        ),
        total,
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async findById(
    id: number,
  ): Promise<Complaint | null | string> {
    console.log("id: ", id)
    try {
      const complaint = await this.prisma.complaint.findFirst({
        where: {
          id,
          isDeleted: false,
        } as Prisma.ComplaintWhereInput,
      });

      console.log("Complaint repo = ", complaint)

      return complaint ? Complaint.fromEntity(complaint) : null;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async findByIdAdmin(id: number): Promise<Complaint | null | string> {
    try {
      const complaint = await this.prisma.complaint.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });

      return complaint ? Complaint.fromEntity(complaint) : null;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async create(complaintData: CreateComplaintDto): Promise<Complaint | string> {
    try {
      const complaint = await this.prisma.complaint.create({
        data: {
          location: complaintData.location,
          description: complaintData.description,
          photo: complaintData.photo,
          // status: complaintData.status,
          user: {
            connect: {
              email: complaintData.email,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return Complaint.fromEntity(complaint);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async update(
    id: number,
    complaintData: UpdateComplaintDto
  ): Promise<Complaint | string> {
    try {
      const complaint = await this.prisma.complaint.update({
        where: { id } as Prisma.ComplaintWhereUniqueInput,
        data: {
          ...complaintData,
          updatedAt: new Date(),
        },
      });

      return Complaint.fromEntity(complaint);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async softDelete(id: number): Promise<Complaint | string> {
    try {
      const complaint = await this.prisma.complaint.update({
        where: { id } as Prisma.ComplaintWhereUniqueInput,
        data: {
          isDeleted: true,
          updatedAt: new Date(),
        } as Prisma.ComplaintUpdateInput,
      });

      return Complaint.fromEntity(complaint);
    } catch (error) {
      return getErrorMessage(error);
    }
  }
}

export default ComplaintRepository;
