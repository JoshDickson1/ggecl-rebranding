import { supabase } from "../lib/supabase";
import { ValidationError, ExternalServiceError } from "../lib/AppError";

export interface UploadedFile {
  originalName: string;
  size: number;
  mimetype: string;
  buffer: Buffer;
}

class StorageModel {
  private static BUCKET_NAME = "applications";
  private static MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  /**
   * Upload a single file to Supabase Storage
   */
  static async uploadFile(
    file: UploadedFile,
    folder: string,
    applicationId: string
  ): Promise<string> {
    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      throw new ValidationError(
        `File size exceeds maximum allowed size of ${this.MAX_FILE_SIZE / 1024 / 1024}MB`
      );
    }

    // Validate file type
    if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
      throw new ValidationError(
        `File type ${file.mimetype} is not allowed. Allowed types: PDF, JPEG, PNG, DOC, DOCX`
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.originalName.split(".").pop();
    const fileName = `${folder}/${applicationId}/${timestamp}-${file.originalName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new ExternalServiceError("Supabase Storage", error.message);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  /**
   * Upload multiple files
   */
  static async uploadMultipleFiles(
    files: UploadedFile[],
    folder: string,
    applicationId: string
  ): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.uploadFile(file, folder, applicationId)
    );

    try {
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      throw new ExternalServiceError(
        "Supabase Storage",
        "Failed to upload multiple files"
      );
    }
  }

  /**
   * Delete a file from Supabase Storage
   */
  static async deleteFile(fileUrl: string): Promise<void> {
    // Extract file path from URL
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split(`/${this.BUCKET_NAME}/`);
    const filePath = pathParts[1];

    if (!filePath) {
      throw new ValidationError("Invalid file URL");
    }

    const { error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      throw new ExternalServiceError("Supabase Storage", error.message);
    }
  }

  /**
   * Delete multiple files
   */
  static async deleteMultipleFiles(fileUrls: string[]): Promise<void> {
    const deletePromises = fileUrls.map((url) => this.deleteFile(url));

    try {
      await Promise.all(deletePromises);
    } catch (error) {
      throw new ExternalServiceError(
        "Supabase Storage",
        "Failed to delete multiple files"
      );
    }
  }

  /**
   * Get signed URL for private file access (if needed)
   */
  static async getSignedUrl(filePath: string, expiresIn: number = 3600): Promise<string> {
    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      throw new ExternalServiceError("Supabase Storage", error.message);
    }

    return data.signedUrl;
  }
}

export default StorageModel;