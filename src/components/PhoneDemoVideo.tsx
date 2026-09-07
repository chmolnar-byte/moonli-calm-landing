import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type PhoneDemoVideoProps = {
  label: string;
  poster: string;
  webm: string;
  mp4: string;
  className?: string;
  onOpen?: () => void;
};

const PhoneDemoVideo = ({
  label,
  poster,
  webm,
  mp4,
  className = "",
  onOpen,
}: PhoneDemoVideoProps) => {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    const play = () => {
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const video = (
    <video
      ref={videoRef}
      className="select-none pointer-events-none"
      poster={poster}
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden={onOpen ? true : undefined}
      aria-label={onOpen ? undefined : label}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={`${className} cursor-zoom-in bg-transparent p-0 text-left`}
        aria-label={label}
      >
        {video}
      </button>
    );
  }

  return <div className={className}>{video}</div>;
};

export default PhoneDemoVideo;
