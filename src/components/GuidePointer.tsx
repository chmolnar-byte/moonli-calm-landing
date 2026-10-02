import { useLanguage } from "@/i18n/LanguageContext";
import { pointerFor, type TopicId } from "@/lib/guidePaths";

type GuidePointerProps = {
  topic: TopicId | "features";
};

const GuidePointer = ({ topic }: GuidePointerProps) => {
  const { language } = useLanguage();
  const link = pointerFor(language, topic);

  return (
    <a href={link.href} className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
      {link.label}
    </a>
  );
};

export default GuidePointer;
