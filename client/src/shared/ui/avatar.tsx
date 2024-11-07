import React from "react";

type Props = {
  fallback?: JSX.Element;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Avatar = ({ fallback, className, src, alt, ...props }: Props) => {
  const [hasError, setHasError] = React.useState(false);

  const shouldShowFallback = hasError || !src;

  if (shouldShowFallback && fallback) {
    return fallback;
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export { Avatar };
