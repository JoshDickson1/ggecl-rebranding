import { Request, Response, NextFunction } from "express";
import BlogModel, { BlogPost, BlogFilters } from "../models/blog.model";
import { ValidationError, NotFoundError } from "../lib/AppError";
import StorageModel, { UploadedFile } from "../models/storage.mode.";


const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};


export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postData: BlogPost = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      throw new ValidationError("Author ID is required");
    }

    // Validate required fields
    if (!postData.title) {
      throw new ValidationError("Title is required");
    }
    if (!postData.content) {
      throw new ValidationError("Content is required");
    }

    if (!postData.slug) {
      postData.slug = generateSlug(postData.title);
    } else {
      postData.slug = generateSlug(postData.slug);
    }

    // Check if slug already exists
    const slugExists = await BlogModel.slugExists(postData.slug);
    if (slugExists) {
      throw new ValidationError("A post with this slug already exists");
    }

    const post = await BlogModel.createPost(postData, authorId);

    res.status(201).json({
      message: "Blog post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPostImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;

    if (!file) {
      throw new ValidationError("No image file provided");
    }

    // Map Multer file to your UploadedFile interface
    const uploadedFile: UploadedFile = {
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      buffer: file.buffer,
    };

    // We use 'blog' as the folder and 'featured' (or a generic ID) as the subfolder
    const imageUrl = await StorageModel.uploadFile(
      uploadedFile,
      "blog",
      "images" 
    );

    res.status(200).json({
      message: "Image uploaded successfully",
      url: imageUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      status,
      author_id,
      from_date,
      to_date,
      search,
      limit = "20",
      offset = "0",
    } = req.query;

    const isAdmin = req.user?.role === 'admin' || req.user?.role === 'super_admin';

    const filters: BlogFilters = {
      status: status as string,
      author_id: author_id as string,
      from_date: from_date as string,
      to_date: to_date as string,
      search: search as string,
    };

    const { posts, total } = await BlogModel.getAllPosts(
      filters,
      parseInt(limit as string),
      parseInt(offset as string),
      isAdmin
    );

    res.status(200).json({
      message: "Posts retrieved successfully",
      total,
      count: posts.length,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const checkSlugAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { slug } = req.query;
      const { excludeId } = req.query;
  
      if (!slug) {
        throw new ValidationError("Slug query parameter is required");
      }
  
      const formattedSlug = generateSlug(slug as string);
      const exists = await BlogModel.slugExists(formattedSlug, excludeId as string);
  
      res.status(200).json({
        available: !exists,
        slug: formattedSlug,
        message: exists ? "Slug is already taken" : "Slug is available",
      });
    } catch (error) {
      next(error);
    }
  };

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await BlogModel.getPostById(id as string, true);

    res.status(200).json({
      message: "Post retrieved successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


export const getPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const post = await BlogModel.getPostBySlug(slug as string);

    res.status(200).json({
      message: "Post retrieved successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const postData: Partial<BlogPost> = req.body;

    if (postData.slug) {
      postData.slug = generateSlug(postData.slug);
      const slugExists = await BlogModel.slugExists(postData.slug, id as string);
      if (slugExists) {
        throw new ValidationError("A post with this slug already exists");
      }
    }

    const post = await BlogModel.updatePost(id as string, postData);

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


export const publishPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await BlogModel.publishPost(id as string);

    res.status(200).json({
      message: "Post published successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


export const unpublishPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await BlogModel.unpublishPost(id as string);

    res.status(200).json({
      message: "Post unpublished successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await BlogModel.deletePost(id as string);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const permanentlyDeletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await BlogModel.permanentlyDeletePost(id as string);

    res.status(200).json({
      message: "Post permanently deleted",
    });
  } catch (error) {
    next(error);
  }
};


export const getBlogStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await BlogModel.getBlogStats();

    res.status(200).json({
      message: "Blog statistics retrieved successfully",
      stats,
    });
  } catch (error) {
    next(error);
  }
};