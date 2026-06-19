import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface FormData {
  name: string;
  email: string;
  expertise: string;
  message: string;
}

interface VolunteerFormProps {
  className?: string;
}

export function VolunteerForm({ className = '' }: VolunteerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    expertise: '',
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
        className="bg-paper rounded-2xl p-8 text-center elevation-1"
      >
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-semibold text-text mb-2">Thank You!</h3>
        <p className="text-charcoal">We&apos;ll be in touch soon. Together, we can make a difference.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-paper rounded-2xl p-6 md:p-8 elevation-1 ${className}`}>
      <div className="mb-5">
        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-cloud rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none text-text placeholder:text-graphite/60 transition-shadow text-sm"
          placeholder="Full Name"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-cloud rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none text-text placeholder:text-graphite/60 transition-shadow text-sm"
          placeholder="Email Address"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="expertise" className="block text-sm font-medium text-text mb-2">Area of Expertise</label>
        <select
          id="expertise"
          name="expertise"
          required
          value={formData.expertise}
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-cloud rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none text-text text-sm"
        >
          <option value="">Area of Expertise</option>
          <option value="renewable">Renewable Energy</option>
          <option value="iot">IoT &amp; Automation</option>
          <option value="software">Software Development</option>
          <option value="management">Project Management</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">Why do you want to join SIGHT?</label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3.5 bg-cloud rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none text-text placeholder:text-graphite/60 transition-shadow resize-none text-sm"
          placeholder="Your message..."
        />
      </div>
      <Button type="submit" fullWidth className="rounded-full">
        Submit Interest
      </Button>
    </form>
  );
}
