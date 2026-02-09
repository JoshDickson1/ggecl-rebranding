import { useOutletContext } from "react-router-dom";
import { Upload, FileCheck, X, Loader2 } from "lucide-react";
import { useUploadDocument } from "@/hooks/useApplicationMutation";

type ApplyContextType = {
  formData: any;
  updateFields: (fields: any) => void;
  uploadingFiles: Set<string>;
  setUploadingFiles: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const Apply3 = () => {
  const { formData, updateFields, uploadingFiles, setUploadingFiles } = useOutletContext<ApplyContextType>();
  const uploadMutation = useUploadDocument();

  const handleFileChange = async (field: string, isMultiple: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);

    for (const file of fileList) {
      const uploadKey = `${field}-${file.name}`;
      
      // Start loading state
      setUploadingFiles(prev => new Set(prev).add(uploadKey));

      try {
        const response = await uploadMutation.mutateAsync({
          file,
          documentType: field,
          email: formData.email
        });

        // The response contains the URL. Update the formData with this URL string.
        if (isMultiple) {
          const existingUrls = formData.docs[field] || [];
          updateFields({
            docs: { 
              ...formData.docs, 
              [field]: [...existingUrls, response.url] 
            }
          });
        } else {
          updateFields({
            docs: { 
              ...formData.docs, 
              [field]: response.url 
            }
          });
        }
      } catch (error) {
        console.error("Upload failed for", file.name);
      } finally {
        // Stop loading state
        setUploadingFiles(prev => {
          const next = new Set(prev);
          next.delete(uploadKey);
          return next;
        });
      }
    }
    // Reset the input so the same file can be uploaded again if removed
    e.target.value = "";
  };

  const removeFile = (field: string, index?: number) => {
    if (index !== undefined) {
      const updatedList = [...formData.docs[field]];
      updatedList.splice(index, 1);
      updateFields({
        docs: { ...formData.docs, [field]: updatedList }
      });
    } else {
      updateFields({
        docs: { ...formData.docs, [field]: null }
      });
    }
  };

  const UploadCard = ({ title, subtitle, field, multiple = false }: any) => {
    const hasFiles = multiple 
      ? formData.docs[field]?.length > 0 
      : !!formData.docs[field];

    // Check if this specific card has any active uploads
    const isThisCardUploading = Array.from(uploadingFiles).some(id => id.startsWith(field));

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h3 className="font-black text-sm text-[#1e3a5f] dark:text-blue-400 uppercase tracking-tight">
              {title} <span className="text-red-500">*</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
          {isThisCardUploading && (
            <Loader2 size={16} className="text-blue-500 animate-spin" />
          )}
        </div>

        <div className="relative">
          <input 
            type="file" 
            id={field} 
            multiple={multiple}
            className="hidden" 
            onChange={(e) => handleFileChange(field, multiple, e)}
            disabled={isThisCardUploading}
          />
          <label 
            htmlFor={field}
            className={`flex items-center gap-3 w-fit px-6 py-3 border-2 border-slate-100 dark:border-slate-800 rounded-2xl transition-colors ${
              isThisCardUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Upload size={18} className="text-[#1e3a5f] dark:text-blue-400" />
            <span className="font-black text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest">
              {isThisCardUploading ? "Uploading..." : hasFiles ? "Add More" : "Upload File"}
            </span>
          </label>
        </div>

        {/* File Preview Area - Displays URLs since we are storing URLs now */}
        {hasFiles && (
          <div className="mt-4 flex flex-wrap gap-2">
            {multiple ? (
              formData.docs[field].map((i: number) => (
                <div key={i} className="group/file flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800/50">
                  <FileCheck size={12} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 truncate max-w-[150px]">
                    File {i + 1}
                  </span>
                  <button onClick={() => removeFile(field, i)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X size={12} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-800/50">
                <FileCheck size={12} className="text-green-500" />
                <span className="text-[10px] font-bold text-green-700 dark:text-green-300 truncate max-w-[150px]">
                  Document Attached
                </span>
                <button onClick={() => removeFile(field)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#1e3a5f] dark:text-blue-400 uppercase tracking-tighter">
          Documentation
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Step 03: Please ensure documents are clear and legible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UploadCard title="School Certificates" subtitle="Upload up to 10 files (PDF/JPG)." field="certificates" multiple />
        <UploadCard title="IELTS / English Proficiency" subtitle="Upload 1 supported file (PDF/JPG)." field="ielts" />
        <UploadCard title="Available Scholarship" subtitle="Scholarship letter if applicable." field="scholarship" />
        <UploadCard title="Valid Travel Document" subtitle="International Passport data page." field="travelDoc" multiple />
        <UploadCard title="Birth Certificate" subtitle="Evidence of age declaration." field="birthCert" multiple />
        <UploadCard title="Statement of Purpose" subtitle="Clearly written SOP in PDF." field="sop" />
        <UploadCard title="Evidence of Payment" subtitle="Bank slip or transfer receipt." field="payment" />
      </div>
    </div>
  );
};

export default Apply3;