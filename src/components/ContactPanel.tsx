import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const baseFields = {
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  business: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
};

const quoteSchema = z.object({
  ...baseFields,
  budget: z.string().min(1, "Please select a budget range"),
});

const bookingSchema = z.object(baseFields);

type QuoteData = z.infer<typeof quoteSchema>;
type BookingData = z.infer<typeof bookingSchema>;
type FormData = QuoteData | BookingData;

const inputClass =
  "w-full bg-secondary border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all";
const validClass = "border-border focus:border-gold/50 focus:ring-gold/20";
const errorClass = "border-destructive/60 focus:border-destructive focus:ring-destructive/20";

const config = {
  quote: {
    title: "Let's talk",
    messagePlaceholder: "Tell us about your project...",
    submitLabel: "Send Message",
    successTitle: "Message sent!",
    successBody: "We'll be in touch shortly.",
  },
  booking: {
    title: "Check availability",
    messagePlaceholder: "Tell us about your timeline, goals, or any questions about availability...",
    submitLabel: "Request a Call",
    successTitle: "Request received!",
    successBody: "We'll get back to you shortly to confirm availability.",
  },
} as const;

type Mode = keyof typeof config;

const ContactPanel = ({
  open,
  onClose,
  mode = "quote",
}: {
  open: boolean;
  onClose: () => void;
  mode?: Mode;
}) => {
  const [submitted, setSubmitted] = useState(false);
  const isQuote = mode === "quote";
  const ui = config[mode];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isQuote ? quoteSchema : bookingSchema),
  });

  const quoteErrors = isQuote ? (errors as ReturnType<typeof useForm<QuoteData>>["formState"]["errors"]) : null;

  const onSubmit = async (data: FormData) => {
    const res = await fetch("https://formspree.io/f/xzdyzpbp", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again or email us directly at contact@zerrastudios.com");
    }
  };

  const handleClose = () => {
    reset();
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md border-l border-border bg-background overflow-y-auto"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold tracking-tight">{ui.title}</h2>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-16 space-y-3">
                  <div className="flex items-center justify-center mb-6">
                    <m.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
                      className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center"
                      style={{ boxShadow: "0 0 30px hsl(0 0% 100% / 0.08), inset 0 0 20px hsl(0 0% 100% / 0.03)" }}
                    >
                      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <m.path
                          d="M5 13l4 4L19 7"
                          stroke="#34d399"
                          strokeWidth={2.2}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
                        />
                      </svg>
                    </m.div>
                  </div>
                  <m.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-lg font-semibold"
                  >
                    {ui.successTitle}
                  </m.p>
                  <m.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="text-sm text-muted-foreground"
                  >
                    {ui.successBody}
                  </m.p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                  {(
                    [
                      { name: "name", label: "Name", type: "text", placeholder: "Your name", optional: false },
                      { name: "email", label: "Email", type: "email", placeholder: "you@company.com", optional: false },
                      { name: "business", label: "Business Name", type: "text", placeholder: "Your company", optional: true },
                    ] as const
                  ).map((field) => (
                    <div key={field.name}>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                        {field.label}
                        {field.optional && (
                          <span className="normal-case tracking-normal text-muted-foreground/60 text-xs">(optional)</span>
                        )}
                      </label>
                      <input
                        {...register(field.name)}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={`${inputClass} ${errors[field.name] ? errorClass : validClass}`}
                      />
                      {errors[field.name] && (
                        <p className="mt-1.5 text-xs text-destructive">{errors[field.name]?.message}</p>
                      )}
                    </div>
                  ))}

                  {isQuote && (
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                        Budget
                      </label>
                      <select
                        {...register("budget" as keyof FormData)}
                        className={`${inputClass} appearance-none ${quoteErrors?.budget ? errorClass : validClass}`}
                      >
                        <option value="">Select range</option>
                        <option value="under-2k">Under $2,000</option>
                        <option value="2k-5k">$2,000 – $5,000</option>
                        <option value="5k-10k">$5,000 – $10,000</option>
                        <option value="10k-15k">$10,000 – $15,000</option>
                        <option value="15k-20k">$15,000 – $20,000</option>
                      </select>
                      {quoteErrors?.budget && (
                        <p className="mt-1.5 text-xs text-destructive">{quoteErrors.budget.message}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder={ui.messagePlaceholder}
                      className={`${inputClass} resize-none ${errors.message ? errorClass : validClass}`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <button type="submit" className="btn-gold w-full text-sm">
                    {ui.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactPanel;
