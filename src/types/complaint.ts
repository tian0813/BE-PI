export type Complaint = {
  id: number;
  location: string;
  description: string;
  photo: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateComplaintDto = {
  location: string;
  description: string;
  photo: string;
  // status: boolean;
  email: string;
}

export type UpdateComplaintDto = {
  location?: string;
  description?: string;
  photo: string;
  status: boolean;
}

export interface ComplaintFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
}
