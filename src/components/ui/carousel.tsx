"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CarouselContextValue {
  emblaRef: (node: HTMLElement | null) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  scrollSnaps: number[];
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within a Carousel");
  }
  return context;
}

interface CarouselProps {
  children: ReactNode;
  className?: string;
  opts?: Parameters<typeof useEmblaCarousel>[0];
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  arrowClassName?: string;
  dotClassName?: string;
}

function Carousel({
  children,
  className,
  opts = { loop: true, align: "center" },
  autoplay = false,
  autoplayDelay = 4000,
  showArrows = true,
  showDots = true,
  arrowClassName,
  dotClassName,
}: CarouselProps) {
  const plugins = autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(opts, plugins);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;
  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;
  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        selectedIndex,
        scrollSnaps,
      }}
    >
      <div className={cn("relative group", className)}>
        {children}
        {showArrows && (
          <>
            <Button
              variant="glass"
              size="xs"
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-100 transition-opacity",
                !canScrollPrev && "hidden",
                arrowClassName
              )}
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="glass"
              size="xs"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 opacity-0 group-hover:opacity-100 transition-opacity",
                !canScrollNext && "hidden",
                arrowClassName
              )}
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
        {showDots && scrollSnaps.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === selectedIndex
                    ? "bg-coral w-6"
                    : "bg-white/30 hover:bg-white/50",
                  dotClassName
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { emblaRef } = useCarousel();

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          emblaRef(node);
        }}
        className="overflow-hidden rounded-2xl"
        {...props}
      >
        <div className={cn("flex", className)}>{children}</div>
      </div>
    );
  }
);

CarouselContent.displayName = "CarouselContent";

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-w-0 flex-[0_0_100%] pl-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem };
