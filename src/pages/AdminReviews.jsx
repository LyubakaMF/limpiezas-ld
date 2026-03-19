import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Check, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';

export default function AdminReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const data = await base44.entities.Review.list('-created_date', 100);
    setReviews(data);
    setLoading(false);
  };

  const handleApprove = async (id, approved) => {
    await base44.entities.Review.update(id, { approved });
    setReviews(reviews.map(r => r.id === id ? { ...r, approved } : r));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this review?')) {
      await base44.entities.Review.delete(id);
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Management</h1>
          <p className="text-muted-foreground">Approve reviews to display them on the home page</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border">
            <p className="text-muted-foreground">No reviews yet</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border rounded-xl p-6 flex gap-4 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold">{review.full_name}</p>
                    <Badge variant={review.approved ? 'default' : 'secondary'}>
                      {review.approved ? 'Approved' : 'Pending'}
                    </Badge>
                    {review.service_type && (
                      <span className="text-xs text-muted-foreground capitalize">{review.service_type.replace('_', ' ')}</span>
                    )}
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{review.comment}"</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(review.created_date).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!review.approved ? (
                    <Button size="sm" onClick={() => handleApprove(review.id, true)} className="bg-green-600 hover:bg-green-700 text-white">
                      <Check className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => handleApprove(review.id, false)}>
                      <X className="w-4 h-4 mr-1" /> Unapprove
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(review.id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}