import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  quote: string
  result: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  intervalMs?: number
}

export function TestimonialCarousel({ testimonials, intervalMs = 6000 }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = useMemo(() => (testimonials.length > 0 ? testimonials : []), [testimonials])

  useEffect(() => {
    if (slides.length <= 1) {
      return
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [slides.length, intervalMs])

  if (slides.length === 0) {
    return null
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
      <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/10 rounded-full" />
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-200/30 rounded-full" />
      <div className="relative">
        <Quote className="w-12 h-12 text-primary mb-6" />
        <p className="text-xl text-gray-900 leading-relaxed mb-8">{slides[activeIndex].quote}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">{slides[activeIndex].name}</p>
            <p className="text-sm text-gray-500">
              {slides[activeIndex].title} · {slides[activeIndex].company}
            </p>
            <p className="text-sm text-primary mt-1">{slides[activeIndex].result}</p>
          </div>
          {slides.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex items-center gap-2 mt-6">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-10 bg-primary' : 'w-4 bg-gray-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
