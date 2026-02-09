import TiptapEditor from '@/TipTapEditor';
import {
  useCheckSlugAvailability,
  useCreatePost,
  useGetPostById,
  useUpdatePost,
  useUploadImage
} from '@/hooks/useBlog';
import type { CreatePostPayload, UpdatePostPayload } from '@/services/blog';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Image as ImageIcon,
  Loader2,
  Save,
  Search,
  Send
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface BlogEditorProps {
  mode: 'create' | 'edit';
}

export const BlogEditor = ({ mode }: BlogEditorProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Track if the user has manually changed the slug
  const isSlugCustomized = useRef(false);

  // --- Form state (Complete & Preserved) ---
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [readingTime, setReadingTime] = useState(0);

  // UI State
  const [showPostDetails, setShowPostDetails] = useState(true);
  const [showSEO, setShowSEO] = useState(false);

  // --- Hooks ---
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const uploadImageMutation = useUploadImage();

  const { data: postData, isLoading: isLoadingPost } = useGetPostById(
    id || '',
    mode === 'edit' && !!id
  );

  const { data: slugAvailability } = useCheckSlugAvailability(
    slug,
    mode === 'edit' ? id : undefined
  );

  // --- Effects ---
  
  // Populate form when editing
  useEffect(() => {
    if (mode === 'edit' && postData?.post) {
      const post = postData.post;
      setTitle(post.title);
      setSlug(post.slug);
      setContent(post.content || '');
      setExcerpt(post.excerpt || '');
      setFeaturedImageUrl(post.featured_image_url || '');
      setStatus(post.status as 'draft' | 'published' || 'draft');
      setSeoTitle(post.seo_title || '');
      setSeoDescription(post.seo_description || '');
      setSeoKeywords(post.seo_keywords?.join(', ') || '');
      setCanonicalUrl(post.canonical_url || '');
      setOgTitle(post.og_title || '');
      setOgDescription(post.og_description || '');
      setOgImageUrl(post.og_image_url || '');
      setReadingTime(post.reading_time || 0);
      // Since it's an existing post, we treat the slug as "customized" so auto-gen doesn't overwrite it
      isSlugCustomized.current = true;
    }
  }, [mode, postData]);

  /** * FIXED: Reactive Slug Generation
   * It now updates the slug every time the title changes, 
   * unless the user has manually edited the slug field.
   */
  useEffect(() => {
    if (mode === 'create' && !isSlugCustomized.current) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars
        .replace(/[\s_-]+/g, '-')  // Replace spaces/underscores with -
        .replace(/^-+|-+$/g, '');   // Trim - from ends
      setSlug(generatedSlug);
    }
  }, [title, mode]);

  // Calculate reading time
  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200) || 0;
    setReadingTime(minutes);
  }, [content]);

  // Auto-generate SEO title and OG title from main title
  useEffect(() => {
    if (title && mode === 'create') {
      setSeoTitle(title);
      setOgTitle(title);
    }
  }, [title, mode]);

  // Auto-generate excerpt and OG description from content
  useEffect(() => {
    if (content && mode === 'create') {
      // Strip HTML tags and get plain text
      const plainText = content.replace(/<[^>]*>/g, '').trim();
      
      // Generate excerpt (160 characters max for meta descriptions)
      const excerptText = plainText.slice(0, 160);
      const excerptFinal = excerptText.length < plainText.length 
        ? excerptText + '...' 
        : excerptText;
      
      setExcerpt(excerptFinal);
      setOgDescription(excerptFinal);
    }
  }, [content, mode]);

  // --- Handlers ---

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isSlugCustomized.current = true; // Stop auto-generation
    setSlug(e.target.value);
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const response = await uploadImageMutation.mutateAsync(file);
      setFeaturedImageUrl(response.url);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const getPayload = (targetStatus: 'draft' | 'published') => ({
    title,
    slug,
    content,
    excerpt,
    featured_image_url: featuredImageUrl,
    status: targetStatus,
    seo_title: seoTitle,
    seo_description: seoDescription,
    seo_keywords: seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
    canonical_url: canonicalUrl,
    og_title: ogTitle,
    og_description: ogDescription,
    og_image_url: ogImageUrl,
    reading_time: readingTime,
  });

  const handleSave = async () => {
    const payload = getPayload('draft');
    try {
      if (mode === 'create') {
        await createPostMutation.mutateAsync(payload as CreatePostPayload);
      } else if (mode === 'edit' && id) {
        await updatePostMutation.mutateAsync({ id, postData: payload as UpdatePostPayload });
      }
      navigate('/admin/blogs/view');
    } catch (err) { alert('Save failed'); }
  };

  const handlePublish = async () => {
    if (!title || !slug || !content) return alert('Please fill in Title, Slug, and Content.');
    const payload = getPayload('published');
    try {
      if (mode === 'create') {
        await createPostMutation.mutateAsync(payload as CreatePostPayload);
      } else if (mode === 'edit' && id) {
        await updatePostMutation.mutateAsync({ id, postData: payload as UpdatePostPayload });
      }
      navigate('/admin/blogs/view');
    } catch (err) { alert('Publish failed'); }
  };

  // Check if any mutation is in progress
  const isSaving = createPostMutation.isPending || updatePostMutation.isPending;

  if (mode === 'edit' && isLoadingPost) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white gap-3">
        <Loader2 className="animate-spin text-[#1e3a5f]" size={32} />
        <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Initializing Editor...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Top Navbar */}
      <nav className=" z-30 backdrop-blur-md border-b dark: pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/blogs/view')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              {mode === 'edit' ? 'Edit Content' : 'Draft New Article'}
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
              Status: {status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span className="hidden sm:inline uppercase">
              {isSaving ? 'Saving...' : 'Save Draft'}
            </span>
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 bg-[#1e3a5f] hover:bg-[#152d4a] text-white rounded-lg text-xs font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {isSaving 
              ? (mode === 'edit' ? 'Updating...' : 'Publishing...') 
              : (mode === 'edit' ? 'Update' : 'Publish')
            }
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 ">
        
        {/* Editor Main Canvas */}
        <div className="lg:col-span-8 xl:col-span-9 px-4 py-6 md:px-4 md:py-12">
          <div className=" mx-auto space-y-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-lg p-6 md:p-10">

            {/* Title & Stats */}
            <div className="space-y-4">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a headline..."
                rows={1}
                className="w-full text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 placeholder-slate-100 focus:outline-none border-none bg-transparent resize-none leading-tight"
              />
              <div className="flex items-center gap-4 text-slate-400 py-2 border-y border-slate-50 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase">
                  <Clock size={14} className="text-primary" />
                  {readingTime} min read
                </div>
                <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-600"></div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase">
                  <Globe size={14} className="text-primary" />
                  Visibility: {status}
                </div>
              </div>
            </div>

            {/* Editor Area */}
            <div className="prose prose-slate max-w-none min-h-[600px]">
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-slate-50/30 dark:bg-slate-900/30 border-l border-slate-100 dark:border-slate-700 p-6 space-y-6">
          
          {/* Metadata Accordion */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setShowPostDetails(!showPostDetails)}
              className="w-full flex justify-between items-center p-4"
            >
              <div className="flex items-center gap-2">
                <Search size={14} className="text-blue-500" />
                <span className="font-black text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest">Post Settings</span>
              </div>
              {showPostDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showPostDetails && (
              <div className="p-4 pt-0 space-y-5 border-t border-slate-50 dark:border-slate-700">
                <div className="mt-4">
                  <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase">Slug URL</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={handleSlugChange}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                  />
                  {slug && slugAvailability && (
                    <div className="flex items-center gap-1 mt-1.5">
                      {slugAvailability.available ? <CheckCircle2 size={12} className="text-emerald-500" /> : <AlertCircle size={12} className="text-rose-500" />}
                      <p className={`text-[10px] font-bold ${slugAvailability.available ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {slugAvailability.message}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-xs leading-relaxed outline-none resize-none"
                    placeholder="Short summary for preview cards..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase">Cover Image</label>
                  <div className="relative group aspect-video rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden transition-all hover:border-slate-300">
                    {featuredImageUrl ? (
                      <>
                        <img src={featuredImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="bg-white px-3 py-1 rounded text-[10px] font-black uppercase">Change</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={20} className="mx-auto text-slate-300 mb-1" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Click to Upload</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFeaturedImageUpload} 
                      disabled={uploadImageMutation.isPending}
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                    />
                  </div>
                  {uploadImageMutation.isPending && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                      <Loader2 size={12} className="animate-spin" />
                      <span>Uploading image...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* SEO Accordion */}
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setShowSEO(!showSEO)}
              className="w-full flex justify-between items-center p-4"
            >
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-emerald-500" />
                <span className="font-black text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-widest">SEO & Social</span>
              </div>
              {showSEO ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showSEO && (
              <div className="p-4 pt-0 space-y-4 border-t border-slate-50 dark:border-slate-700">
                <div className="mt-4">
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase">Meta Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase">Keywords</label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-xs outline-none"
                    placeholder="tag1, tag2..."
                  />
                </div>
                <div className="pt-2 border-t border-slate-50 dark:border-slate-700">
                  <h4 className="text-[9px] font-black text-slate-300 uppercase mb-3 tracking-widest">Social (Open Graph)</h4>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    placeholder="Social Title"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-xs outline-none mb-2"
                  />
                  <textarea
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                    placeholder="Social Description"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg text-xs outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default BlogEditor;