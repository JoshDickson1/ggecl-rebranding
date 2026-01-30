import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ApplyContextType = {
  formData: any;
  updateFields: (fields: any) => void;
};

const Apply1 = () => {
  const { formData, updateFields } = useOutletContext<ApplyContextType>();

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10">
      <motion.div variants={itemVariant} className="space-y-2">
        <h2 className="text-3xl font-black text-[#1e3a5f] dark:text-blue-400 uppercase tracking-tighter">
          Personal Information
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Step 01: Tell us who you are.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {/* Full Name */}
        <div className="relative group">
          <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10 transition-colors group-focus-within:text-blue-500">
            Full Name
          </Label>
          <Input
            placeholder="John Doe"
            required
            value={formData.fullName}
            onChange={(e) => updateFields({ fullName: e.target.value })}
            className="h-14 rounded-l-none rounded-xl border-slate-200 dark:border-slate-800 bg-transparent px-2 md:px-5 text-lg focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-blue-500"           
          />
        </div>

        {/* Phone */}
        <div className="relative group">
          <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
            Phone Number
          </Label>
          <div className="flex">
            <Input
              type="tel"
              required
              placeholder="+44 70 080 0367"
              value={formData.phone}
              onChange={(e) => updateFields({ phone: e.target.value })}
              className="h-14 rounded-l-none rounded-xl border-slate-200 dark:border-slate-800 bg-transparent px-2 md:px-5 text-lg focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative group">
          <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
            Email Address
          </Label>
          <Input
            required
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => updateFields({ email: e.target.value })}
            className="h-14 rounded-l-none rounded-xl border-slate-200 dark:border-slate-800 bg-transparent px-2 md:px-5 text-lg focus-visible:ring-[#1e3a5f] dark:focus-visible:ring-blue-500"
          />
        </div>

        {/* Country */}
        {/* Country */}
<div className="relative group">
  <Label className="absolute -top-3 left-4 bg-white dark:bg-slate-900 px-2 text-xs font-bold text-[#1e3a5f] dark:text-blue-400 z-10">
    Country Of Residence
  </Label>

  <Select
    value={formData.country}
    required
    onValueChange={(val) => updateFields({ country: val })}
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
      <SelectValue placeholder="Select Country" />
    </SelectTrigger>

    <SelectContent
      className="
        w-[--radix-select-trigger-width]
        max-h-60
        rounded-xl
        border-slate-200
        dark:border-slate-800
      "
    >
      {/* Africa */}
      <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
      <SelectItem value="ghana">🇬🇭 Ghana</SelectItem>
      <SelectItem value="south-africa">🇿🇦 South Africa</SelectItem>
      <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
      <SelectItem value="egypt">🇪🇬 Egypt</SelectItem>
      <SelectItem value="ethiopia">🇪🇹 Ethiopia</SelectItem>
      <SelectItem value="uganda">🇺🇬 Uganda</SelectItem>
      <SelectItem value="tanzania">🇹🇿 Tanzania</SelectItem>
      <SelectItem value="rwanda">🇷🇼 Rwanda</SelectItem>
      <SelectItem value="senegal">🇸🇳 Senegal</SelectItem>
      <SelectItem value="morocco">🇲🇦 Morocco</SelectItem>
      <SelectItem value="algeria">🇩🇿 Algeria</SelectItem>
      <SelectItem value="tunisia">🇹🇳 Tunisia</SelectItem>
      <SelectItem value="cameroon">🇨🇲 Cameroon</SelectItem>
      <SelectItem value="ivory-coast">🇨🇮 Côte d’Ivoire</SelectItem>

      {/* Other */}
      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
      <SelectItem value="us">🇺🇸 United States</SelectItem>
      <SelectItem value="canada">🇨🇦 Canada</SelectItem>
    </SelectContent>
  </Select>
</div>

      </div>
    </div>
  );
};

export default Apply1;