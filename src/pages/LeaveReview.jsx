import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeaveReview() {
  const urlParams = new URLSearchParams(window.location.search);
  const prefillName = urlParams.get('name') || '';
  const prefillService = urlParams.get('service') || '';

  const [form, setForm] = useState({ full_name: prefillName, comment: '', service_type: prefillService });
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) { alert('Please select a star rating.'); return; }
    setIsSubmitting(true);
    await base44.entities.Review.create({ ...form, rating, approved: false });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank you for your review!</h2>
          <p className="text-muted-foreground">Your feedback helps us improve. It will appear on our website once approved.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Limpiezas LD</p>
          <h1 className="text-3xl font-bold">Leave a Review</h1>
          <p className="text-muted-foreground mt-2">We'd love to hear about your experience!</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Your Name *</Label>
            <Input
              id="full_name"
              value={form.full_name}
              onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))}
              required
              className="h-12 rounded-xl"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hovered || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              value={form.comment}
              onChange={(e) => setForm(p => ({ ...p, comment: e.target.value }))}
              required
              className="min-h-[120px] rounded-xl"
              placeholder="Tell us about your experience..."
            />
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-xl h-12">
            {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : 'Submit Review'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}