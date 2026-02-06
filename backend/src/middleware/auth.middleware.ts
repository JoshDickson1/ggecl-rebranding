import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "../lib/AppError";
import { supabase } from "../lib/supabase";
import { findProperTable } from "../utility/auth.functions";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string | null;
    role?: string | null;
    [key: string]: any;
  };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      throw new DatabaseError(`Invalid Token: ${error?.message}`, error?.code);
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) throw new DatabaseError(profileError.message, profileError.code);

    req.user = { ...user, role: profile?.role };

    next();
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { role, id } = req.user!;
  const table = findProperTable(role!);

  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new DatabaseError(error.message, error.code);

    req.user!.data = data;
    next();
  } catch (err) {
    next(err);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role!)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};
