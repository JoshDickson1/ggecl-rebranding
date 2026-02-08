import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BlogService from '@/services/blog';
import type {
    CreatePostPayload,
    UpdatePostPayload,
    BlogFilters,
}  from '@/services/blog';

export const blogKeys = {
  all: ['blog'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters?: BlogFilters) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
  slug: (slug: string) => [...blogKeys.all, 'slug', slug] as const,
  stats: () => [...blogKeys.all, 'stats'] as const,
  checkSlug: (slug: string, excludeId?: string) => 
    [...blogKeys.all, 'check-slug', slug, excludeId] as const,
};

// ==================== QUERIES ====================

/**
 * Get all blog posts with filters
 */
export const useGetAllPosts = (filters?: BlogFilters) => {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => BlogService.getAllPosts(filters),
  });
};

/**
 * Get post by ID (Admin)
 */
export const useGetPostById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => BlogService.getPostById(id),
    enabled: enabled && !!id,
  });
};

/**
 * Get post by slug (Public)
 */
export const useGetPostBySlug = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: blogKeys.slug(slug),
    queryFn: () => BlogService.getPostBySlug(slug),
    enabled: enabled && !!slug,
  });
};

/**
 * Check slug availability
 */
export const useCheckSlugAvailability = (slug: string, excludeId?: string) => {
  return useQuery({
    queryKey: blogKeys.checkSlug(slug, excludeId),
    queryFn: () => BlogService.checkSlugAvailability(slug, excludeId),
    enabled: !!slug && slug.length > 0,
    staleTime: 0, // Always fetch fresh data
  });
};

/**
 * Get blog statistics (Admin)
 */
export const useGetBlogStats = () => {
  return useQuery({
    queryKey: blogKeys.stats(),
    queryFn: () => BlogService.getBlogStats(),
  });
};

/**
 * Get published posts (Public)
 */
export const useGetPublishedPosts = (limit?: number, offset?: number) => {
  return useQuery({
    queryKey: blogKeys.list({ limit: limit?.toString(), offset: offset?.toString() }),
    queryFn: () => BlogService.getPublishedPosts(limit, offset),
  });
};

/**
 * Search posts
 */
export const useSearchPosts = (searchTerm: string, limit?: number, offset?: number) => {
  return useQuery({
    queryKey: blogKeys.list({ 
      search: searchTerm, 
      limit: limit?.toString(), 
      offset: offset?.toString() 
    }),
    queryFn: () => BlogService.searchPosts(searchTerm, limit, offset),
    enabled: !!searchTerm && searchTerm.length > 0,
  });
};

// ==================== MUTATIONS ====================

/**
 * Create a new blog post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: CreatePostPayload) => BlogService.createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
    },
  });
};

/**
 * Upload blog image
 */
export const useUploadImage = () => {
  return useMutation({
    mutationFn: (image: File | Blob) => BlogService.uploadImage(image),
  });
};

/**
 * Update blog post
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, postData }: { id: string; postData: UpdatePostPayload }) =>
      BlogService.updatePost(id, postData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
    },
  });
};

/**
 * Publish post
 */
export const usePublishPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BlogService.publishPost(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
    },
  });
};

/**
 * Unpublish post
 */
export const useUnpublishPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BlogService.unpublishPost(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
    },
  });
};

/**
 * Delete post (soft delete)
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BlogService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
    },
  });
};

/**
 * Permanently delete post
 */
export const usePermanentlyDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BlogService.permanentlyDeletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.stats() });
    },
  });
};

/**
 * Update post SEO
 */
export const useUpdatePostSEO = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      seoData 
    }: { 
      id: string; 
      seoData: {
        seo_title?: string;
        seo_description?: string;
        seo_keywords?: string[];
        canonical_url?: string;
        og_title?: string;
        og_description?: string;
        og_image_url?: string;
      }
    }) => BlogService.updatePostSEO(id, seoData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
};