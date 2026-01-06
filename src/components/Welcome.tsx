import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
} as const;

type FontType = keyof typeof FONT_WEIGHTS;

const setUpTextHover = (container: HTMLElement | null, type: FontType) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];
  const animateLetter = (
    letter: Element,
    weight: number,
    duration: number = 0.25
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () =>
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};
const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400
) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};
export const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanUp = setUpTextHover(titleRef.current, "title");
    const subtitleCleanUp = setUpTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanUp?.();
      subtitleCleanUp?.();
    };
  }, []);
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Bhaumik! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>
      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tabled screens only.</p>
      </div>
    </section>
  );
};
