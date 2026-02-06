import { supabase } from "../lib/supabase";
import { DatabaseError, ValidationError, NotFoundError } from "../lib/AppError";

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
}

class BlogModel {
  /**
   * Create a new blog post
   */
  static async createPost(postData: BlogPost, authorId: string): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        ...postData,
        author_id: authorId,
        status: postData.status || 'draft',
      })
      .select()
      .single();

    if (error) throw new DatabaseError(error.message, error.code);
    return data;
  }

  /**
   * Get post by ID (includes deleted posts for admin)
   */
  static async getPostById(id: string, includeDeleted: boolean = false): Promise<BlogPost> {
    let query = supabase
      .from("posts")
      .select("*")
      .eq("id", id);

    if (!includeDeleted) {
      query = query.is("deleted_at", null);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Blog post');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  /**
   * Get post by slug (public access)
   */
  static async getPostBySlug(slug: string): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Blog post');
      }
      throw new DatabaseError(error.message, error.code);
    }

    // Increment view count
    await this.incrementViewCount(data.id);

    return data;
  }

  /**
   * Get all posts with filters (Admin or Public)
   */
  static async getAllPosts(
    filters: BlogFilters = {},
    limit: number = 20,
    offset: number = 0,
    isAdmin: boolean = false
  ): Promise<{ posts: BlogPost[]; total: number }> {
    let query = supabase
      .from("posts")
      .select("*", { count: 'exact' })
      .order("created_at", { ascending: false });

    // Public users only see published posts
    if (!isAdmin) {
      query = query.eq("status", "published").is("deleted_at", null);
    } else {
      // Admin can see all posts including deleted
      if (filters.status) {
        query = query.eq("status", filters.status);
      }
      // Only exclude deleted if not explicitly requested
      query = query.is("deleted_at", null);
    }

    // Apply filters
    if (filters.author_id) {
      query = query.eq("author_id", filters.author_id);
    }
    if (filters.from_date) {
      query = query.gte("created_at", filters.from_date);
    }
    if (filters.to_date) {
      query = query.lte("created_at", filters.to_date);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw new DatabaseError(error.message, error.code);
    return { posts: data || [], total: count || 0 };
  }

  /**
   * Update a blog post
   */
  static async updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("posts")
      .update({
        ...postData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Blog post');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  /**
   * Publish a post
   */
  static async publishPost(id: string): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("posts")
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Blog post');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  /**
   * Unpublish a post (set to draft)
   */
  static async unpublishPost(id: string): Promise<BlogPost> {
    const { data, error } = await supabase
      .from("posts")
      .update({
        status: 'draft',
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Blog post');
      }
      throw new DatabaseError(error.message, error.code);
    }
    return data;
  }

  /**
   * Delete post (soft delete)
   */
  static async deletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from("posts")
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString() 
      })
      .eq("id", id);

    if (error) throw new DatabaseError(error.message, error.code);
  }

  /**
   * Permanently delete post (hard delete)
   */
  static async permanentlyDeletePost(id: string): Promise<void> {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) throw new DatabaseError(error.message, error.code);
  }

  /**
   * Increment view count
   */
  static async incrementViewCount(id: string): Promise<void> {
    await supabase.rpc('increment_post_views', { post_id: id });
  }

  /**
   * Get blog statistics (Admin Dashboard)
   */
  static async getBlogStats(): Promise<any> {
    const { data, error } = await supabase
      .from("posts")
      .select("status, view_count, created_at, author_id")
      .is("deleted_at", null);

    if (error) throw new DatabaseError(error.message, error.code);

    // Group by status
    const statusCounts = data.reduce((acc: any, post: any) => {
      acc[post.status] = (acc[post.status] || 0) + 1;
      return acc;
    }, {});

    // Total views
    const totalViews = data.reduce((sum: number, post: any) => sum + (post.view_count || 0), 0);

    // Posts by author
    const authorCounts = data.reduce((acc: any, post: any) => {
      if (post.author_id) {
        acc[post.author_id] = (acc[post.author_id] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      total: data.length,
      byStatus: statusCounts,
      totalViews,
      byAuthor: authorCounts,
    };
  }

  /**
   * Check if slug exists
   */
  static async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    let query = supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .is("deleted_at", null);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.single();

    if (error && error.code !== 'PGRST116') {
      throw new DatabaseError(error.message, error.code);
    }

    return !!data;
  }
}

export default BlogModel;