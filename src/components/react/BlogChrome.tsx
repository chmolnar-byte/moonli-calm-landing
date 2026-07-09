import AppProviders from "@/components/react/AppProviders";
import Navbar from "@/components/Navbar";
import CTAFooter from "@/components/CTAFooter";

type BlogChromeProps = {
  mode?: "full" | "nav" | "footer";
};

const BlogChrome = ({ mode = "full" }: BlogChromeProps) => (
  <AppProviders>
    {(mode === "full" || mode === "nav") && <Navbar />}
    {(mode === "full" || mode === "footer") && <CTAFooter />}
  </AppProviders>
);

export default BlogChrome;
