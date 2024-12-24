import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import Button from "./Button";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];
const audioPlayBars = [1, 2, 3, 4, 5];

function Navbar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioIndicatorActive, setIsAudioIndicatorActive] = useState(false);
  const [lastScrollPositionY, setLastScrollPositionY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // destructure scroll position
  const { y: currentScrollPositionY } = useWindowScroll();

  const toggleAudioIndicator = function () {
    setIsAudioPlaying((prev) => !prev);
    setIsAudioIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (currentScrollPositionY === 0) {
      setIsNavbarVisible(true);
      if (navContainerRef.current) {
        navContainerRef.current.classList.remove("floating-nav");
      }
    }

    if (currentScrollPositionY > lastScrollPositionY) {
      setIsNavbarVisible(false);
      if (navContainerRef.current) {
        navContainerRef.current.classList.add("floating-nav");
      }
    }

    if (currentScrollPositionY < lastScrollPositionY) {
      setIsNavbarVisible(true);
      if (navContainerRef.current) {
        navContainerRef.current.classList.add("floating-nav");
      }
    }

    setLastScrollPositionY(currentScrollPositionY);
  }, [currentScrollPositionY, lastScrollPositionY]);

  useEffect(() => {
    if (isAudioPlaying) {
      if (audioElementRef.current) {
        audioElementRef.current
          .play()
          .catch((error) =>
            console.error(`ERROR: While playing audio: ${error}`)
          );
      }
    } else {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    gsap.to("#page-navbar", {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavbarVisible]);

  return (
    <div
      ref={navContainerRef}
      id="page-navbar"
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              btnId="product-button"
              title="Products"
              styleClasses="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              rightIcon={<TiLocationArrow />}
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, idx) => {
                return (
                  <a
                    key={idx}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn "
                  >
                    {item}
                  </a>
                );
              })}
            </div>
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                src="/audio/loop.mp3"
                className="hidden"
                loop
              />
              {audioPlayBars.map((bar) => {
                return (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isAudioIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.17}s` }}
                  />
                );
              })}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
