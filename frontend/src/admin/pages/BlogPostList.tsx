import {
  useDeletePost,
  useGetAllPosts,
  useGetBlogStats,
  usePublishPost,
  useUnpublishPost,
} from '@/hooks/useBlog';
import type { BlogFilters } from '@/services/blog';
import {
  AlertCircle,
  BarChart3,
  Calendar,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Layers,
  Plus,
  Search,
  Trash2
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Skeleton Components
const StatCardSkeleton = () => (
  <div className="bg-card border rounded-xl p-4 shadow-sm animate-pulse">
    <div className="h-3 bg-muted rounded w-20 mb-2"></div>
    <div className="h-7 bg-muted rounded w-16"></div>
  </div>
);

const TableRowSkeleton = () => (
  <tr className="border-b">
    <td className="px-6 py-4">
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-muted rounded w-48 animate-pulse"></div>
        <div className="h-3 bg-muted rounded w-64 animate-pulse"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-5 bg-muted rounded-full w-20 animate-pulse"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
    </td>
    <td className="px-6 py-4">
      <div className="flex justify-end gap-1">
        <div className="h-9 w-9 bg-muted rounded animate-pulse"></div>
        <div className="h-9 w-9 bg-muted rounded animate-pulse"></div>
        <div className="h-9 w-9 bg-muted rounded animate-pulse"></div>
      </div>
    </td>
  </tr>
);

export const BlogPostList = () => {
  const navigate = useNavigate();

  // --- Logic & State (Preserved from original) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  const filters: BlogFilters = {
    search: searchTerm || undefined,
    status: statusFilter || undefined,
    limit: limit.toString(),
    offset: offset.toString(),
  };

  const { data: postsData, isLoading, isError } = useGetAllPosts(filters);
  const { data: statsData, isLoading: isStatsLoading } = useGetBlogStats();
  const deletePostMutation = useDeletePost();
  const publishPostMutation = usePublishPost();
  const unpublishPostMutation = useUnpublishPost();

  // --- Handlers (Preserved from original) ---
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishPostMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to publish post:', error);
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await unpublishPostMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to unpublish post:', error);
    }
  };

  // --- Design Helpers (Matching Application Portal) ---
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "published": 
        return "bg-green-100 text-green-700 dark:bg-green-950/30 border-green-200";
      case "draft": 
        return "bg-orange-100 text-orange-700 dark:bg-orange-950/30 border-orange-200";
      default: 
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2 md:p-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground text-sm">Create, edit, and monitor your published content and drafts.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/blogs/add')}
          className="flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#152d4a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* Statistics Cards with Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isStatsLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : statsData ? (
          [
            { label: 'Total Posts', value: statsData.stats.total, icon: <Layers size={14}/> },
            { label: 'Published', value: statsData.stats.byStatus?.published || 0, color: 'text-green-600' },
            { label: 'Drafts', value: statsData.stats.byStatus?.draft || 0, color: 'text-orange-600' },
            { label: 'Total Views', value: statsData.stats.totalViews, icon: <BarChart3 size={14}/> }
          ].map((stat, i) => (
            <div key={i} className="bg-card border rounded-xl p-4 shadow-sm flex flex-col">
              <span className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground flex items-center gap-2">
                {stat.icon} {stat.label}
              </span>
              <span className={`text-2xl font-bold tracking-tight mt-1 ${stat.color || 'text-foreground'}`}>
                {stat.value}
              </span>
            </div>
          ))
        ) : null}
      </div>

      {/* Error Alert (Matching Application Portal) */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm">
          <AlertCircle size={18} />
          Could not load blog posts. Please check your connection or permissions.
        </div>
      )}

      {/* Quick Filters / Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or excerpt..." 
            className="w-full pl-10 pr-4 py-2 bg-card border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-card text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all min-w-[140px]"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-card text-sm hover:bg-muted/50 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Posts Table with Skeleton */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-[11px] uppercase tracking-wider border-b">
                <th className="px-6 py-4 font-semibold">Article Details</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Performance</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                // Show skeleton rows while loading
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : !postsData?.posts || postsData.posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <p className="text-sm font-medium">No posts found. Create your first post!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                postsData.posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/20 transition-colors group">
                    {/* Title & Excerpt */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground line-clamp-1">{post.title}</span>
                        {post.excerpt && (
                          <span className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1 max-w-xs">
                            {post.excerpt}
                          </span>
                        )}
                      </div>
                    </td>
                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase border ${getStatusStyle(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    {/* View Count */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                        <BarChart3 size={14} className="text-primary" />
                        <span className="text-foreground">{post.view_count || 0}</span>
                        <span className="text-[10px] font-normal">views</span>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span className="text-xs">
                          {post.created_at ? new Date(post.created_at).toLocaleDateString() : '-'}
                        </span>
                      </div>
                    </td>
                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <Link 
                          to={`/admin/blogs/edit/${post.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        
                        {post.status === 'published' ? (
                          <button 
                            onClick={() => handleUnpublish(post.id!)}
                            className="p-2 text-muted-foreground hover:text-orange-600 transition-colors"
                            title="Unpublish"
                          >
                            <EyeOff size={18} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePublish(post.id!)}
                            className="p-2 text-muted-foreground hover:text-green-600 transition-colors"
                            title="Publish"
                          >
                            <Eye size={18} />
                          </button>
                        )}
                        
                        <div className="w-[1px] h-4 bg-border mx-1"></div>
                        
                        <button 
                          onClick={() => handleDelete(post.id!)}
                          className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer (Logic Preserved) */}
        <div className="p-4 border-t bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {isLoading ? (
              <div className="h-3 bg-muted rounded w-40 animate-pulse"></div>
            ) : (
              `Showing ${offset + 1} to ${Math.min(offset + limit, postsData?.total || 0)} of ${postsData?.total || 0} posts`
            )}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setOffset(Math.max(0, offset - limit))}
              disabled={offset === 0 || isLoading}
              className="px-3 py-1 border rounded bg-card hover:bg-muted disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button 
              onClick={() => {
                if (postsData && offset + limit < postsData.total) {
                  setOffset(offset + limit);
                }
              }}
              disabled={!postsData || offset + limit >= postsData.total || isLoading}
              className="px-3 py-1 border rounded bg-card hover:bg-muted disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostList;