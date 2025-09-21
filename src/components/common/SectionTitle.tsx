import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-xl text-text/80 max-w-3xl mx-auto">{subtitle}</p>
    </motion.div>
  );
};

export default SectionTitle;