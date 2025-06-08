import { type Complaint as PrismaComplaint } from "@prisma/client";

class Complaint {
  private id: number;
  private location: string;
  private description: string;
  private photo: string;
  private status: boolean;
  private createdAt: Date;

  constructor(
    id: number,
    location: string,
    description: string,
    photo: string,
    status: boolean,
    createdAt: Date
  ) {
    this.id = id;
    this.location = location;
    this.description = description;
    this.photo = photo;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromEntity(prismaComplaint: PrismaComplaint) {
    return new Complaint(
      prismaComplaint.id,
      prismaComplaint.location,
      prismaComplaint.description,
      prismaComplaint.photo,
      prismaComplaint.status,
      prismaComplaint.createdAt
    );
  }

  toDTO() {
    return {
      id: this.id,
      location: this.location,
      description: this.description,
      photo: this.photo,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}

export default Complaint;
