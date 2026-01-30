import { useOutletContext } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type ApplyContextType = {
  formData: any;
  updateFields: (fields: any) => void;
};

const Apply2 = () => {
  const { formData, updateFields } = useOutletContext<ApplyContextType>();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#1e3a5f] dark:text-blue-400 uppercase tracking-tighter">
          Qualification
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Step 02: Academic background and interests.
        </p>
      </div>

      {/* Top Row: 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Highest Qualification */}
<div className="relative group">
  <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
    Highest Qualification <span className="text-red-500">*</span>
  </Label>

  <Select
    value={formData.highestQualification}
    onValueChange={(val) => updateFields({ highestQualification: val })}
  >
    <SelectTrigger
      className="
        h-16
        w-full
        rounded-2xl
        border-slate-200
        dark:border-slate-800
        bg-transparent
        px-6
        text-lg
        focus:ring-[#1e3a5f]
        dark:focus:ring-blue-500
      "
    >
      <SelectValue placeholder="Select your qualification" />
    </SelectTrigger>

    <SelectContent
      className="
        w-[--radix-select-trigger-width]
        max-h-56
        rounded-xl
        border-slate-200
        dark:border-slate-800
      "
    >
      <SelectItem value="high-school">High School / O-Level</SelectItem>
      <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
      <SelectItem value="masters">Master&apos;s Degree</SelectItem>
      <SelectItem value="phd">PhD / Doctorate</SelectItem>
    </SelectContent>
  </Select>
</div>


{/* Required Program */}
<div className="relative group">
  <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
    Required Program <span className="text-red-500">*</span>
  </Label>

  <Select
    value={formData.requiredProgram}
    onValueChange={(val) => updateFields({ requiredProgram: val })}
  >
    <SelectTrigger
      className="
        h-16
        w-full
        rounded-2xl
        border-slate-200
        dark:border-slate-800
        bg-transparent
        px-6
        text-lg
        focus:ring-[#1e3a5f]
        dark:focus:ring-blue-500
      "
    >
      <SelectValue placeholder="Select program type" />
    </SelectTrigger>

    <SelectContent
      className="
        w-[--radix-select-trigger-width]
        max-h-56
        rounded-xl
        border-slate-200
        dark:border-slate-800
      "
    >
      <SelectItem value="undergraduate">Undergraduate</SelectItem>
      <SelectItem value="postgraduate">Postgraduate</SelectItem>
      <SelectItem value="diploma">Diploma</SelectItem>
    </SelectContent>
  </Select>
</div>


{/* Country of Interest */}
<div className="relative group">
  <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
    Country Of Interest <span className="text-red-500">*</span>
  </Label>

  <Select
    value={formData.countryOfInterest}
    onValueChange={(val) => updateFields({ countryOfInterest: val })}
  >
    <SelectTrigger
      className="
        h-16
        w-full
        rounded-2xl
        border-slate-200
        dark:border-slate-800
        bg-transparent
        px-6
        text-lg
        focus:ring-[#1e3a5f]
        dark:focus:ring-blue-500
      "
    >
      <SelectValue placeholder="Select country" />
    </SelectTrigger>

    <SelectContent
      className="
        w-[--radix-select-trigger-width]
        max-h-56
        rounded-xl
        border-slate-200
        dark:border-slate-800
      "
    >
      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
      <SelectItem value="us">🇺🇸 United States</SelectItem>
      <SelectItem value="canada">🇨🇦 Canada</SelectItem>
      <SelectItem value="australia">🇦🇺 Australia</SelectItem>
    </SelectContent>
  </Select>
</div>

      </div>

      {/* Bottom Row: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course First Choice */}
        <div className="relative group">
          <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
            Course Of Interest (First Choice) <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="BSC/Example"
            value={formData.courseFirstChoice}
            onChange={(e) => updateFields({ courseFirstChoice: e.target.value })}
            className="h-14 rounded-l-none rounded-xl border-slate-200 dark:border-slate-800 bg-transparent px-2 md:px-5 text-lg focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-blue-500"
          />
        </div>

        {/* Course Second Choice */}
        <div className="relative group">
          <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
            Course Of Interest (Second Choice)
          </Label>
          <Input
            placeholder="BSC/Example"
            value={formData.courseSecondChoice}
            onChange={(e) => updateFields({ courseSecondChoice: e.target.value })}
            className="h-14 rounded-l-none rounded-xl border-slate-200 dark:border-slate-800 bg-transparent px-2 md:px-5 text-lg focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Apply2;