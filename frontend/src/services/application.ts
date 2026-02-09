// ==================== TYPES ====================

import { APIConfig } from "./api.config";


export interface Application {
  id?: string;
  full_name: string;
  phone: string;
  email: string;
  country: string;
  highest_qualification: string;
  required_program: string;
  country_of_interest: string;
  course_first_choice: string;
  course_second_choice?: string;
  certificates?: string[];
  travel_documents?: string[];
  birth_certificates?: string[];
  ielts?: string[];
  scholarship?: string[];
  sop?: string[];
  payment?: string[];
  gdpr_consent: boolean;
  signature: string;
  status?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicationFilters {
  status?: string;
  country?: string;
  program?: string;
  from_date?: string;
  to_date?: string;
  limit?: string;
  offset?: string;
}

export interface CreateApplicationPayload {
  full_name: string;
  phone: string;
  email: string;
  country: string;
  highest_qualification: string;
  required_program: string;
  country_of_interest: string;
  course_first_choice: string;
  course_second_choice?: string;
  certificates?: string[];
  travel_documents?: string[];
  birth_certificates?: string[];
  ielts?: string[];
  scholarship?: string[];
  sop?: string[];
  payment?: string[];
  gdpr_consent: boolean;
  signature: string;
}

export interface CreateApplicationResponse {
  message: string;
  application: Application;
}

export interface GetApplicationResponse {
  message: string;
  application: Application;
}

export interface GetAllApplicationsResponse {
  message: string;
  total: number;
  count: number;
  applications: Application[];
}

export interface UpdateApplicationStatusPayload {
  status: string;
}

export interface UpdateApplicationStatusResponse {
  message: string;
  application: Application;
}

export interface DeleteApplicationResponse {
  message: string;
}

export interface ApplicationStats {
  total: number;
  byStatus: Record<string, number>;
  byCountry: Record<string, number>;
  byProgram: Record<string, number>;
}

export interface GetApplicationStatsResponse {
  message: string;
  stats: ApplicationStats;
}

export interface UploadTempDocumentPayload {
  file: File | Blob;
  documentType: string;
  email: string;
}

export interface UploadTempDocumentResponse {
  message: string;
  url: string;
}

// ==================== SERVICE ====================

export default class ApplicationService {
  
  /**
   * Create a new application
   * @param applicationData - Application data
   */
  static async createApplication(
    applicationData: CreateApplicationPayload
  ): Promise<CreateApplicationResponse> {
    const response = await APIConfig.fetchWithRetry('/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
    return await response.json();
  }

  /**
   * Upload a temporary document (before finalizing application)
   * @param file - File to upload
   * @param documentType - Type of document (certificates, travel_documents, etc.)
   * @param email - Email to track temporary upload
   */
  static async uploadTempDocument(
    file: File | Blob,
    documentType: string,
    email: string
  ): Promise<UploadTempDocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('email', email);

    const response = await APIConfig.fetchWithRetry('/applications/upload-temp', {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  }

  /**
   * Get application by ID (requires authentication)
   * @param id - Application ID
   */
  static async getApplicationById(id: string): Promise<GetApplicationResponse> {
    const response = await APIConfig.fetchWithRetry(`/applications/${id}`, {
      method: 'GET',
    });
    return await response.json();
  }

  /**
   * Get all applications with filters (Admin only)
   * @param filters - Filter criteria
   */
  static async getAllApplications(
    filters?: ApplicationFilters
  ): Promise<GetAllApplicationsResponse> {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.country) queryParams.append('country', filters.country);
    if (filters?.program) queryParams.append('program', filters.program);
    if (filters?.from_date) queryParams.append('from_date', filters.from_date);
    if (filters?.to_date) queryParams.append('to_date', filters.to_date);
    if (filters?.limit) queryParams.append('limit', filters.limit);
    if (filters?.offset) queryParams.append('offset', filters.offset);

    const queryString = queryParams.toString();
    const endpoint = `/applications/admin${queryString ? `?${queryString}` : ''}`;

    const response = await APIConfig.fetchWithRetry(endpoint, {
      method: 'GET',
    });
    return await response.json();
  }

  /**
   * Update application status (Admin only)
   * @param id - Application ID
   * @param status - New status
   */
  static async updateApplicationStatus(
    id: string,
    status: string
  ): Promise<UpdateApplicationStatusResponse> {
    const response = await APIConfig.fetchWithRetry(`/applications/admin/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  }

  /**
   * Delete application (Admin only)
   * @param id - Application ID
   */
  static async deleteApplication(id: string): Promise<DeleteApplicationResponse> {
    const response = await APIConfig.fetchWithRetry(`/applications/admin/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  /**
   * Get application statistics (Admin only)
   */
  static async getApplicationStats(): Promise<GetApplicationStatsResponse> {
    const response = await APIConfig.fetchWithRetry('/applications/admin/stats', {
      method: 'GET',
    });
    return await response.json();
  }

  /**
   * Filter applications by status
   * @param status - Application status
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getApplicationsByStatus(
    status: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllApplicationsResponse> {
    return await this.getAllApplications({
      status,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Filter applications by country
   * @param country - Country name
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getApplicationsByCountry(
    country: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllApplicationsResponse> {
    return await this.getAllApplications({
      country,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Filter applications by program
   * @param program - Program name
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getApplicationsByProgram(
    program: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllApplicationsResponse> {
    return await this.getAllApplications({
      program,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Filter applications by date range
   * @param fromDate - Start date
   * @param toDate - End date
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getApplicationsByDateRange(
    fromDate: string,
    toDate: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllApplicationsResponse> {
    return await this.getAllApplications({
      from_date: fromDate,
      to_date: toDate,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }
}