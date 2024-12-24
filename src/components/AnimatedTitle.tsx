import gsap from "gsap";
import { useEffect, useRef } from "react";
import { IAnimatedTitle } from "../types/components/IAnimatedTitle.types";
function AnimatedTitle({ title, containerClasses }: IAnimatedTitle) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClasses}`}>
      {title.split("<br />").map((line, lIdx) => {
        return (
          <div
            key={lIdx}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {line.split(" ").map((word, wIdx) => {
              return (
                <span
                  key={wIdx}
                  className="animated-word"
                  dangerouslySetInnerHTML={{ __html: word }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default AnimatedTitle;
