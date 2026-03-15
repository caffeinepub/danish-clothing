import { motion } from "motion/react";

export function AboutSection() {
  const values = [
    {
      title: "Quality Fabrics",
      body: "We source only the finest natural materials — organic linen, sustainably grown cotton, and premium Merino wool — ensuring each garment feels as exceptional as it looks.",
    },
    {
      title: "Nordic Minimalism",
      body: "Inspired by Scandinavian design philosophy: clean lines, purposeful details, and a timeless aesthetic that transcends seasonal trends.",
    },
    {
      title: "Sustainable Fashion",
      body: "Every collection is made with intention. We partner with certified ethical manufacturers and use low-impact dyes to protect both people and our planet.",
    },
  ];

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-sans mb-4">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-6">
            Born from the
            <br />
            <span className="italic font-normal">Nordic Spirit</span>
          </h2>
          <p className="text-muted-foreground font-sans leading-relaxed mb-8">
            Danish Clothing was founded on the belief that fashion should be
            both beautiful and responsible. Drawing from Denmark's rich heritage
            of thoughtful craftsmanship, we create pieces that you'll reach for
            season after season.
          </p>

          <div className="space-y-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="border-l-2 border-border pl-5"
              >
                <h4 className="font-display text-foreground mb-1">{v.title}</h4>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/assets/generated/product-womens-cashmere-coat.dim_400x500.jpg"
              alt="Cashmere coat"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="flex flex-col gap-4 pt-8">
              <img
                src="/assets/generated/product-mens-linen-shirt.dim_400x500.jpg"
                alt="Linen shirt"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="bg-secondary p-6">
                <p className="font-display text-2xl text-foreground leading-snug">
                  &ldquo;Wear less,
                  <br />
                  wear better.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
