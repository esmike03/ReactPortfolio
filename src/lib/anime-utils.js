import { animate, stagger } from "animejs";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const showInstantly = (el) => {
  if (!el) return;
  el.style.opacity = "1";
  el.style.transform = "none";
  el.style.willChange = "auto";
};

const cleanupAfter = (el, duration) => {
  setTimeout(() => {
    if (el) el.style.willChange = "auto";
  }, duration + 80);
};

export function revealOnce(el, params = {}, options = {}) {
  if (!el) return () => {};
  if (prefersReducedMotion()) {
    showInstantly(el);
    return () => {};
  }

  const duration = params.duration ?? 700;
  el.style.willChange = "transform, opacity";

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        animate(el, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration,
          ease: "outExpo",
          ...params,
        });
        cleanupAfter(el, duration);
        obs.disconnect();
      }
    },
    {
      threshold: options.threshold ?? 0.15,
      rootMargin: options.rootMargin ?? "0px 0px -8% 0px",
    },
  );

  observer.observe(el);
  return () => observer.disconnect();
}

export function revealStagger(elements, params = {}, options = {}) {
  const list = Array.from(elements || []).filter(Boolean);
  if (list.length === 0) return () => {};
  if (prefersReducedMotion()) {
    list.forEach(showInstantly);
    return () => {};
  }

  const trigger = options.trigger || list[0];
  const duration = params.duration ?? 650;
  const staggerDelay = options.staggerDelay ?? 80;

  list.forEach((el) => {
    el.style.willChange = "transform, opacity";
  });

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        animate(list, {
          opacity: [0, 1],
          translateY: [22, 0],
          duration,
          ease: "outExpo",
          delay: stagger(staggerDelay, { start: options.startDelay ?? 0 }),
          ...params,
        });
        list.forEach((el) => cleanupAfter(el, duration + staggerDelay * list.length));
        obs.disconnect();
      }
    },
    {
      threshold: options.threshold ?? 0.12,
      rootMargin: options.rootMargin ?? "0px 0px -6% 0px",
    },
  );

  observer.observe(trigger);
  return () => observer.disconnect();
}

export function countUpOnce(el, target, options = {}) {
  if (!el) return () => {};
  if (prefersReducedMotion()) {
    el.textContent = `${options.prefix ?? ""}${target}${options.suffix ?? ""}`;
    return () => {};
  }

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        const obj = { value: 0 };
        animate(obj, {
          value: target,
          duration: options.duration ?? 1400,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = `${options.prefix ?? ""}${Math.round(obj.value)}${options.suffix ?? ""}`;
          },
        });
        obs.disconnect();
      }
    },
    { threshold: options.threshold ?? 0.4 },
  );

  observer.observe(el);
  return () => observer.disconnect();
}
