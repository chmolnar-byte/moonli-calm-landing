import { Play } from "lucide-react";
import { useRef, useState } from "react";

type PhoneDemoVideoProps = {
  label: string;
  poster: string;
  webm: string;
  mp4: string;
  className?: string;
};

const PhoneDemoVideo = ({
  label,
  poster,
  webm,
  mp4,
  className = "",
}: PhoneDemoVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    void video.play().catch(() => setPlaying(false));
  };

  const pause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className={className}>
      <video
        ref={videoRef}
        className="pointer-events-none select-none"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={playing ? undefined : true}
        aria-label={playing ? label : undefined}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
      {!playing ? (
        <button type="button" className="demo-play" onClick={start} aria-label={`Video abspielen: ${label}`}>
          <span className="demo-play-mark">
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
            Play
          </span>
        </button>
      ) : (
        <button type="button" className="demo-play demo-play--pause" onClick={pause} aria-label={`Video pausieren: ${label}`} />
      )}
    </div>
  );
};

export default PhoneDemoVideo;
