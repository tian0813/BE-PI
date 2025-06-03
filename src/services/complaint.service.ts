import ComplaintRepository from "../repositories/complaint.repository";
import Complaint from "../models/complaint.model";
import {
  CreateComplaintDto,
  UpdateComplaintDto,
  ComplaintFilters,
} from "../types/complaint";
import { PaginationParams, PaginatedResult } from "../types/pagination";

class ComplaintService {
  private complaintRepository: ComplaintRepository;

  constructor(complaintRepository: ComplaintRepository) {
    this.complaintRepository = complaintRepository;
  }

  async getAllComplaintsAdmin(
    pagination?: PaginationParams,
    filters?: ComplaintFilters
  ): Promise<PaginatedResult<Complaint> | string> {
    const data = await this.complaintRepository.findAllByAdmin(pagination, filters);
    if (typeof data === "string") return data;

    const { complaints, total } = data;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 12;
    const lastPage = Math.ceil(total / limit);

    return {
      data: complaints,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }


  async getAllComplaints(
    userId: number | null,
    pagination?: PaginationParams,
    filters?: ComplaintFilters
  ): Promise<PaginatedResult<Complaint> | string> {
    const data = await this.complaintRepository.findAll(
      userId,
      pagination,
      filters
    );

    if (typeof data === "string") {
      return data;
    }

    const { complaints, total } = data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 12;
    const lastPage = Math.ceil(total / limit);

    return {
      data: complaints,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }

  async getComplaintById(
    idComplaint: number
  ): Promise<Complaint | string> {
    const complaint = await this.complaintRepository.findById(idComplaint);
    if (typeof complaint === "string") {
      return complaint;
    }

    if (!complaint) {
      return "Complaint not found";
    }

    return complaint;
  }

  async createComplaint(
    complaintData: CreateComplaintDto
  ): Promise<Complaint | string> {
    if (
      !complaintData.location ||
      !complaintData.description ||
      !complaintData.photo
    ) {
      return "Location, Description and Photo are required";
    }

    const result = await this.complaintRepository.create(complaintData);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }

  async updateComplaint(
    id: number,
    complaintData: UpdateComplaintDto
  ): Promise<Complaint | string> {
    const existingComplaint = await this.complaintRepository.findById(
      id,
    );
    if (typeof existingComplaint === "string") {
      return existingComplaint;
    }

    if (!existingComplaint) {
      return "Complaint not found";
    }

    const result = await this.complaintRepository.update(id, complaintData);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }

  async softDeleteComplaint(
    id: number,
  ): Promise<Complaint | string> {
    const existingComplaint = await this.complaintRepository.findById(
      id,
    );
    if (typeof existingComplaint === "string") {
      return existingComplaint;
    }

    if (!existingComplaint) {
      return "Complaint not found";
    }

    const result = await this.complaintRepository.softDelete(id);
    if (typeof result === "string") {
      return result;
    }

    return result;
  }
}

export default ComplaintService;
