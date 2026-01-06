import { getLenis } from "@/components/SmoothScroll";

export function scrollToSection(id: string) {
  const lenis = getLenis();
  const el = document.querySelector(id);

  if (!lenis || !(el instanceof HTMLElement)) return;

  lenis.scrollTo(el, {
    offset: -80,
    duration: 2.4,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    lock: true,
  });
}
