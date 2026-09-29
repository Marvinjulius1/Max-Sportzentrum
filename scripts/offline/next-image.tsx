// Minimal stand-in for next/image in the offline bundle.
/* eslint-disable @next/next/no-img-element */
type Props = React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; sizes?: string };
export default function Image({ fill, priority, className, style, alt, ...rest }: Props) {
  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
      {...rest}
    />
  );
}
