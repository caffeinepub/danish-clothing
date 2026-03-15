import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16"
        >
          {/* Left */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-background/50 font-sans mb-4">
              Get in Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-background leading-tight mb-6">
              We’d love to
              <br />
              <span className="italic font-normal">hear from you.</span>
            </h2>
            <p className="text-background/70 font-sans leading-relaxed">
              Whether you have questions about a product, need styling advice,
              or want to learn more about our sustainable practices — our team
              is here to help.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: MapPin, text: "Copenhagen, Denmark" },
                { icon: Mail, text: "hello@danishclothing.com" },
                { icon: Phone, text: "+45 33 12 34 56" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 text-background/80 font-sans text-sm"
                >
                  <Icon size={16} className="text-background/50 shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right - simple form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <input
              data-ocid="contact.input"
              type="text"
              placeholder="Your name"
              className="bg-background/10 border border-background/20 text-background placeholder:text-background/40 font-sans text-sm px-4 py-3 focus:outline-none focus:border-background/60 transition-colors"
            />
            <input
              type="email"
              placeholder="Email address"
              className="bg-background/10 border border-background/20 text-background placeholder:text-background/40 font-sans text-sm px-4 py-3 focus:outline-none focus:border-background/60 transition-colors"
            />
            <textarea
              data-ocid="contact.textarea"
              placeholder="Your message"
              rows={5}
              className="bg-background/10 border border-background/20 text-background placeholder:text-background/40 font-sans text-sm px-4 py-3 focus:outline-none focus:border-background/60 transition-colors resize-none"
            />
            <button
              data-ocid="contact.submit_button"
              type="submit"
              className="bg-background text-foreground font-sans text-xs tracking-widest uppercase px-8 py-4 hover:bg-secondary transition-colors self-start"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
