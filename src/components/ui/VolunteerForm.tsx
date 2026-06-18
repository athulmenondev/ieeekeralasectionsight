import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface VolunteerFormProps {
  className?: string;
}

export function VolunteerForm({ className = '' }: VolunteerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center ${className}`}
      >
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-text mb-2">Thank You!</h3>
        <p className="text-muted">We'll be in touch soon. Together, we can make a difference.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-8 ${className}`}>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          placeholder="Your full name"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">Phone (optional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          placeholder="+91 98765 43210"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="interest" className="block text-sm font-medium text-text mb-2">Area of Interest</label>
        <select
          id="interest"
          name="interest"
          required
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
        >
          <option value="">Select your area</option>
          <option value="renewable">Renewable Energy</option>
          <option value="water">Water & Sanitation</option>
          <option value="agritech">AgriTech</option>
          <option value="digital">Digital Inclusion</option>
          <option value="community">Community Engagement</option>
          <option value="technical">Technical Projects</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">Message (optional)</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white/80 border border-white/50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
          placeholder="Tell us about yourself and why you'd like to volunteer..."
        />
      </div>
      <Button type="submit" fullWidth>Join as Volunteer</Button>
    </form>
  );
}