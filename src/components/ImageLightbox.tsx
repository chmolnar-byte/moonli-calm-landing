import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageLightbox = ({ src, alt, onClose }: ImageLightboxProps) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] overflow-y-auto bg-black/85 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 z-[201] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Schließen"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="flex min-h-full w-full items-center justify-center px-4 py-6 sm:px-8 pointer-events-none"
        style={{
          paddingTop: "max(6rem, calc(env(safe-area-inset-top) + 5rem))",
          paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="pointer-events-auto mx-auto block h-auto w-auto max-w-[min(92vw,520px)] shrink-0 cursor-default object-contain rounded-2xl border border-white/20 shadow-soft-2xl"
          style={{ maxHeight: "calc(100dvh - 8rem)" }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </motion.div>,
    document.body,
  );
};

export default ImageLightbox;
