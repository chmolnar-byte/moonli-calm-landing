type LeafAccentProps = {
  src: string;
  className?: string;
};

const LeafAccent = ({ src, className = "" }: LeafAccentProps) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    className={className}
  />
);

export default LeafAccent;
