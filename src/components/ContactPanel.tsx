import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  business: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`;

const inputClass =
  "w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all";

const errorClass = "mt-1.5 text-xs text-red-400";

const ContactPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    console.log("[Formspree] Endpoint:", FORMSPREE_ENDPOINT);
    console.log("[Formspree] Payload:", data);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => ({}));
      console.log("[Formspree] Status:", res.status, res.ok ? "OK" : "NOT OK");
      console.log("[Formspree] Response body:", body);

      if (!res.ok) {
        throw new Error(body?.error ?? "Submission failed. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const handleClose = () => {
    onClose();
    // Delay state reset until after the exit animation finishes
    setTimeout(() => {
      setSubmitted(false);
      setServerError(null);
      reset();
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md border-l border-border bg-background overflow-y-auto"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Let's talk</h2>
                <button
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close contact panel"
                >
                  <X size={20} />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center gap-4 pt-12"
                >
                  <CheckCircle2 className="text-gold" size={48} strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold">Message sent!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Thanks for reaching out. We'll get back to you at{" "}
                    <span className="text-foreground">contact@zerrastudios.com</span> within one
                    business day.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-4 btn-outline text-sm px-6 py-2"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Name */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Your name"
                      className={inputClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Business Name
                    </label>
                    <input
                      {...register("business")}
                      type="text"
                      placeholder="Your company"
                      className={inputClass}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Budget <span className="text-red-400">*</span>
                    </label>
                    <select
                      {...register("budget")}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Select range</option>
                      <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                      <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                      <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                    </select>
                    {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Tell us about your project..."
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  {serverError && (
                    <p className="text-sm text-red-400 text-center">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactPanel;
