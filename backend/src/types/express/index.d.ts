import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email?: string | null;
      role?: string | null;
      data?: any;
    };
  }
}
