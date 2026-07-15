import { useEffect } from "react";
import AppProviders from "@/components/react/AppProviders";

const NotFoundPage = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <AppProviders>
      <div className="night-sky min-h-screen bg-gradient-page flex items-center justify-center px-4 text-foreground">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Seite nicht gefunden</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Zur Startseite
          </a>
        </div>
      </div>
    </AppProviders>
  );
};

export default NotFoundPage;
