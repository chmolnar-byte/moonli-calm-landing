import { motion } from "framer-motion";
import { Apple, Play, Moon, Mail, Instagram, MessageCircle } from "lucide-react";

const CTAFooter = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pastel-green/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-pastel-pink/20 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Moon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Bereit für einen entspannteren Familienalltag?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Lade Moonli jetzt herunter und entdecke, wie Elternsein leichter wird.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:opacity-90 transition-all shadow-soft-xl hover:scale-105 duration-200"
              >
                <Apple className="w-6 h-6" />
                App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all shadow-soft-xl hover:scale-105 duration-200"
              >
                <Play className="w-6 h-6" />
                Google Play
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-t border-border/50">
        <div className="container">
          <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-extrabold mb-2">Fragen? Schreib uns!</h3>
            <p className="text-muted-foreground mb-6">
              Wir freuen uns über dein Feedback und helfen dir gerne weiter.
            </p>
            <a
              href="mailto:hello@moonli.app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-soft"
            >
              <Mail className="w-5 h-5" />
              hello@moonli.app
            </a>
            <div className="flex items-center justify-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                <Instagram className="w-5 h-5 text-muted-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Moon className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">MOONLI</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
              <a href="mailto:hello@moonli.app" className="hover:text-foreground transition-colors">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;
