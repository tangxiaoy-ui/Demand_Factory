import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Testimonial } from '@/types'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextIndex = (currentIndex + 1) % testimonials.length
  const current1 = testimonials[currentIndex]
  const current2 = testimonials[nextIndex]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[current1, current2].map((testimonial, idx) => (
        <div key={idx} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              "{testimonial.content}"
            </p>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.userName[0]}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{testimonial.userName}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.company} · {testimonial.position}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="md:col-span-2 flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}