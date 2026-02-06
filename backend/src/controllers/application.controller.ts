import { Request, Response, NextFunction } from "express";
import ApplicationModel, { Application, ApplicationFilters } from "../models/application.model";
import { ValidationError, NotFoundError } from "../lib/AppError";
import StorageModel from "../models/storage.mode.";


export const uploadTempDocument = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Files:', req.file); // Should not be undefined
  console.log('Body:', req.body);
  try {
    const file = req.file;
    const { documentType, email } = req.body; 

    if (!file) throw new ValidationError("No file provided");
    if (!email) throw new ValidationError("Email is required to track temporary uploads");

    const tempFolderName = email.toLowerCase().replace(/[^a-z0-9]/g, '_');

    const uploadedFile = {
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      buffer: file.buffer,
    };

    const url = await StorageModel.uploadFile(uploadedFile, documentType, tempFolderName);

    res.status(200).json({ 
      message: "File uploaded to temporary storage",
      url 
    });
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationData: Application = req.body;

    if (!applicationData.certificates || applicationData.certificates.length === 0) {
      throw new ValidationError("At least one certificate is required");
    }

    const application = await ApplicationModel.createApplication(applicationData);

    res.status(201).json({
      message: "Application finalized successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};


export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const application = await ApplicationModel.getApplicationById(id as string);

    res.status(200).json({
      message: "Application retrieved successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all applications with filters (Admin)
 */
export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      status,
      country,
      program,
      from_date,
      to_date,
      limit = "50",
      offset = "0",
    } = req.query;

    const filters: ApplicationFilters = {
      status: status as string,
      country: country as string,
      program: program as string,
      from_date: from_date as string,
      to_date: to_date as string,
    };

    const { applications, total } = await ApplicationModel.getAllApplications(
      filters,
      parseInt(limit as string),
      parseInt(offset as string)
    );

    res.status(200).json({
      message: "Applications retrieved successfully",
      total,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update application status (Admin)
 */
export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const reviewedBy = req.user?.id; 

    if (!status) {
      throw new ValidationError("Status is required");
    }

    const validStatuses = [
      "submitted",
      "under_review",
      "approved",
      "rejected",
      "pending_documents",
    ];
    if (!validStatuses.includes(status)) {
      throw new ValidationError(
        `Invalid status. Valid statuses: ${validStatuses.join(", ")}`
      );
    }

    if (!reviewedBy) {
      throw new ValidationError("Reviewer ID is required");
    }

    const application = await ApplicationModel.updateApplicationStatus(
      id as string,
      status,
      reviewedBy
    );

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete application (Admin)
 */
export const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await ApplicationModel.deleteApplication(id as string);

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get application statistics (Admin Dashboard)
 */
export const getApplicationStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await ApplicationModel.getApplicationStats();

    res.status(200).json({
      message: "Application statistics retrieved successfully",
      stats,
    });
  } catch (error) {
    next(error);
  }
};