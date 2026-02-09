import { useMutation } from "@tanstack/react-query";
import ApplicationService from "@/services/application";
import { toast } from "sonner";

/**
 * Hook for uploading temporary documents
 */
export const useUploadDocument = () => {
  return useMutation({
    mutationFn: async ({
      file,
      documentType,
      email,
    }: {
      file: File;
      documentType: string;
      email: string;
    }) => {
      return await ApplicationService.uploadTempDocument(file, documentType, email);
    },
    onSuccess: (_data, variables) => {
      toast.success(`${variables.file.name} uploaded successfully`);
    },
    onError: (error: any, variables) => {
      console.error("File upload error:", error);
      toast.error(`Failed to upload ${variables.file.name}: ${error.message || "Unknown error"}`);
    },
  });
};

/**
 * Hook for submitting the complete application
 */
export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await ApplicationService.createApplication(payload);
    },
    onSuccess: (_data) => {
      toast.success("Application submitted successfully!");
    },
    onError: (error: any) => {
      console.error("Application submission error:", error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    },
  });
};