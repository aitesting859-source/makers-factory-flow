import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const SERVICE_ID = 'service_bqquc2x';
const TEMPLATE_ID = 'template_9jea2ja';
const PUBLIC_KEY = 'BUHLsbqOkGQ9_NITI';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  });
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Media Production',
    'Ad & Commercials',
    'Fashion Editorial',
    'Fine Art Weddings',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error('Please select a preferred date.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: format(date, 'PPP'),
        },
        PUBLIC_KEY
      );

      toast.success("Thank you! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', service: '' });
      setDate(undefined);
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
          Book a Consultation
        </h3>
        <p className="text-lg text-primary/60">
          Fill out the form below and we'll reach out to discuss your project
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wider">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wider">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            placeholder="+1 (234) 567-890"
          />
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wider">
            Service Required *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-primary/80 mb-2 uppercase tracking-wider">
            Preferred Date *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-auto py-3 px-4 bg-background border-border/50 hover:bg-muted/50",
                  !date && "text-primary/30"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-accent text-white rounded-lg text-lg font-bold hover:bg-accent/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </button>

      </form>
    </div>
  );
};

export default ContactForm;
