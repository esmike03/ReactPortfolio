import { useEffect, useRef } from "react";
import { countUpOnce } from "../lib/anime-utils";

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  className = "",
  style = {},
}) {
  const ref = useRef(null);

  useEffect(() => {
    const cleanup = countUpOnce(ref.current, value, {
      prefix,
      suffix,
      duration,
    });
    return cleanup;
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
