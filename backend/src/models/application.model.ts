import { supabase } from "../lib/supabase";
import { DatabaseError, ValidationError, NotFoundError } from "../lib/AppError";

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
}

class ApplicationModel {
  
  static async createApplication(applicationData: Application): Promise<Application> {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        ...applicationData,
        status: 'submitted',
      })
      .select()
      .single();

    if (error) throw new DatabaseError(error.message, error.code);
    return data;
  }

  
  static async getApplicationById(id: string): Promise<Application> {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Application');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  
  static async getApplicationByEmail(email: string): Promise<Application | null> {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  
  static async getAllApplications(
    filters: ApplicationFilters = {},
    limit: number = 50,
    offset: number = 0
  ): Promise<{ applications: Application[]; total: number }> {
    let query = supabase
      .from("applications")
      .select("*", { count: 'exact' })
      .order("created_at", { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq("status", filters.status);
    }
    if (filters.country) {
      query = query.eq("country", filters.country);
    }
    if (filters.program) {
      query = query.eq("required_program", filters.program);
    }
    if (filters.from_date) {
      query = query.gte("created_at", filters.from_date);
    }
    if (filters.to_date) {
      query = query.lte("created_at", filters.to_date);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw new DatabaseError(error.message, error.code);
    return { applications: data || [], total: count || 0 };
  }

  /**
   * Update application status
   */
  static async updateApplicationStatus(
    id: string,
    status: string,
    reviewedBy: string
  ): Promise<Application> {
    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewedBy,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Application');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  /**
   * Update application documents (add file URLs)
   */
  static async updateApplicationDocuments(
    id: string,
    documentType: string,
    fileUrls: string[]
  ): Promise<Application> {
    const validDocumentTypes = [
      'certificates',
      'travel_documents',
      'birth_certificates',
      'ielts',
      'scholarship',
      'sop',
      'payment',
    ];

    if (!validDocumentTypes.includes(documentType)) {
      throw new ValidationError(`Invalid document type: ${documentType}`);
    }

    const { data, error } = await supabase
      .from("applications")
      .update({
        [documentType]: fileUrls,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Application');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  /**
   * Delete application (soft delete by changing status)
   */
  static async deleteApplication(id: string): Promise<void> {
    const { error } = await supabase
      .from("applications")
      .update({ status: 'deleted', updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new DatabaseError(error.message, error.code);
  }

  /**
   * Get application statistics (Admin Dashboard)
   */
  static async getApplicationStats(): Promise<any> {
    const { data, error } = await supabase
      .from("applications")
      .select("status, country, required_program, created_at");

    if (error) throw new DatabaseError(error.message, error.code);

    // Group by status
    const statusCounts = data.reduce((acc: any, app: any) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    // Group by country
    const countryCounts = data.reduce((acc: any, app: any) => {
      acc[app.country] = (acc[app.country] || 0) + 1;
      return acc;
    }, {});

    // Group by program
    const programCounts = data.reduce((acc: any, app: any) => {
      acc[app.required_program] = (acc[app.required_program] || 0) + 1;
      return acc;
    }, {});

    return {
      total: data.length,
      byStatus: statusCounts,
      byCountry: countryCounts,
      byProgram: programCounts,
    };
  }
}

export default ApplicationModel;