// ==================== TYPES ====================

import { APIConfig } from "./api.config";


export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: any; // html
  excerpt?: string;
  status?: string;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  featured_image_url?: string;
  reading_time?: number;
  view_count?: number;
  author_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface BlogFilters {
  status?: string;
  author_id?: string;
  from_date?: string;
  to_date?: string;
  search?: string;
  limit?: string;
  offset?: string;
}

export interface CreatePostPayload {
  title: string;
  slug?: string;
  content: any;
  excerpt?: string;
  status?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  featured_image_url?: string;
  reading_time?: number;
}

export interface UpdatePostPayload {
  title?: string;
  slug?: string;
  content?: any;
  excerpt?: string;
  status?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  featured_image_url?: string;
  reading_time?: number;
}

export interface CreatePostResponse {
  message: string;
  post: BlogPost;
}

export interface GetPostResponse {
  message: string;
  post: BlogPost;
}

export interface GetAllPostsResponse {
  message: string;
  total: number;
  count: number;
  posts: BlogPost[];
}

export interface UpdatePostResponse {
  message: string;
  post: BlogPost;
}

export interface DeletePostResponse {
  message: string;
}

export interface PublishPostResponse {
  message: string;
  post: BlogPost;
}

export interface UnpublishPostResponse {
  message: string;
  post: BlogPost;
}

export interface BlogStats {
  total: number;
  byStatus: Record<string, number>;
  totalViews: number;
  byAuthor: Record<string, number>;
}

export interface GetBlogStatsResponse {
  message: string;
  stats: BlogStats;
}

export interface UploadImageResponse {
  message: string;
  url: string;
}

export interface CheckSlugAvailabilityResponse {
  available: boolean;
  slug: string;
  message: string;
}

// ==================== SERVICE ====================

export default class BlogService {
  
  /**
   * Get all blog posts (Public - only published posts, Admin - all posts)
   * @param filters - Filter criteria
   */
  static async getAllPosts(
    filters?: BlogFilters,
    isAdmin: boolean = true
  ): Promise<GetAllPostsResponse> {
    const queryParams = new URLSearchParams();
  
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.author_id) queryParams.append('author_id', filters.author_id);
    if (filters?.from_date) queryParams.append('from_date', filters.from_date);
    if (filters?.to_date) queryParams.append('to_date', filters.to_date);
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    if (filters?.offset) queryParams.append('offset', filters.offset.toString());
  
    // Add isAdmin as a query parameter
    queryParams.append('isAdmin', String(isAdmin));
  
    const queryString = queryParams.toString();
    const endpoint = `/blog${queryString ? `?${queryString}` : ''}`;
  
    const response = await APIConfig.fetchWithRetry(endpoint, {
      method: 'GET',
    });
  
    return await response.json();
  }
  

  /**
   * Get post by slug (Public access)
   * @param slug - Post slug
   */
  static async getPostBySlug(slug: string): Promise<GetPostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/slug/${slug}`, {
      method: 'GET',
    });
    return await response.json();
  }

  /**
   * Get post by ID (Admin only)
   * @param id - Post ID
   */
  static async getPostById(id: string): Promise<GetPostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/${id}`, {
      method: 'GET',
    });
    return await response.json();
  }

  /**
   * Create a new blog post (Admin only)
   * @param postData - Post data
   */
  static async createPost(postData: CreatePostPayload): Promise<CreatePostResponse> {
    const response = await APIConfig.fetchWithRetry('/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return await response.json();
  }

  /**
   * Upload an image for blog post (Admin only)
   * @param image - Image file to upload
   */
  static async uploadImage(image: File | Blob): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('image', image);

    const response = await APIConfig.fetchWithRetry('/blog/upload-image', {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  }

  /**
   * Check slug availability (Admin only)
   * @param slug - Slug to check
   * @param excludeId - Optional post ID to exclude from check (for updates)
   */
  static async checkSlugAvailability(
    slug: string,
    excludeId?: string
  ): Promise<CheckSlugAvailabilityResponse> {
    const queryParams = new URLSearchParams({ slug });
    if (excludeId) queryParams.append('excludeId', excludeId);

    const response = await APIConfig.fetchWithRetry(
      `/blog/check-slug?${queryParams.toString()}`,
      { method: 'GET' }
    );
    return await response.json();
  }

  /**
   * Update a blog post (Admin only)
   * @param id - Post ID
   * @param postData - Updated post data
   */
  static async updatePost(
    id: string,
    postData: UpdatePostPayload
  ): Promise<UpdatePostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return await response.json();
  }

  /**
   * Publish a blog post (Admin only)
   * @param id - Post ID
   */
  static async publishPost(id: string): Promise<PublishPostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/${id}/publish`, {
      method: 'PATCH',
    });
    return await response.json();
  }

  /**
   * Unpublish a blog post (Admin only)
   * @param id - Post ID
   */
  static async unpublishPost(id: string): Promise<UnpublishPostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/${id}/unpublish`, {
      method: 'PATCH',
    });
    return await response.json();
  }

  /**
   * Delete a blog post (soft delete) (Admin only)
   * @param id - Post ID
   */
  static async deletePost(id: string): Promise<DeletePostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  /**
   * Permanently delete a blog post (Super Admin only)
   * @param id - Post ID
   */
  static async permanentlyDeletePost(id: string): Promise<DeletePostResponse> {
    const response = await APIConfig.fetchWithRetry(`/blog/${id}/permanent`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  /**
   * Get blog statistics (Admin only)
   */
  static async getBlogStats(): Promise<GetBlogStatsResponse> {
    const response = await APIConfig.fetchWithRetry('/blog/admin/stats', {
      method: 'GET',
    });
    return await response.json();
  }

  /**
   * Get published posts only (Public)
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getPublishedPosts(
    limit?: number,
    offset?: number
  ): Promise<GetAllPostsResponse> {
    return await this.getAllPosts({
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Search posts by keyword (Public - only published)
   * @param searchTerm - Search term
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async searchPosts(
    searchTerm: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllPostsResponse> {
    return await this.getAllPosts({
      search: searchTerm,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Get posts by author (Admin only)
   * @param authorId - Author ID
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getPostsByAuthor(
    authorId: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllPostsResponse> {
    return await this.getAllPosts({
      author_id: authorId,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Get posts by status (Admin only)
   * @param status - Post status (draft, published)
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getPostsByStatus(
    status: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllPostsResponse> {
    return await this.getAllPosts({
      status,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Get posts by date range
   * @param fromDate - Start date
   * @param toDate - End date
   * @param limit - Results limit
   * @param offset - Results offset
   */
  static async getPostsByDateRange(
    fromDate: string,
    toDate: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllPostsResponse> {
    return await this.getAllPosts({
      from_date: fromDate,
      to_date: toDate,
      limit: limit?.toString(),
      offset: offset?.toString(),
    });
  }

  /**
   * Update post SEO information (Admin only)
   * @param id - Post ID
   * @param seoData - SEO data
   */
  static async updatePostSEO(
    id: string,
    seoData: {
      seo_title?: string;
      seo_description?: string;
      seo_keywords?: string[];
      canonical_url?: string;
      og_title?: string;
      og_description?: string;
      og_image_url?: string;
    }
  ): Promise<UpdatePostResponse> {
    return await this.updatePost(id, seoData);
  }

  /**
   * Update post content only (Admin only)
   * @param id - Post ID
   * @param content - Post content
   * @param excerpt - Optional excerpt
   */
  static async updatePostContent(
    id: string,
    content: any,
    excerpt?: string
  ): Promise<UpdatePostResponse> {
    return await this.updatePost(id, { content, excerpt });
  }

  /**
   * Update post metadata (Admin only)
   * @param id - Post ID
   * @param metadata - Metadata
   */
  static async updatePostMetadata(
    id: string,
    metadata: {
      title?: string;
      slug?: string;
      featured_image_url?: string;
      reading_time?: number;
    }
  ): Promise<UpdatePostResponse> {
    return await this.updatePost(id, metadata);
  }
}