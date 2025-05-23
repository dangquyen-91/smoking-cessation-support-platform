import React from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-16 mb-16 pt-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 w-full">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Bỏ thuốc lá dễ dàng với ...
          </h3>
          <button className="bg-sky-500 text-white px-6 py-2 rounded-full text-sm shadow-md hover:bg-sky-600 transition">Tham gia với chúng tôi ngay</button>
        </div>
        <div className="md:w-1/2 w-full relative grid place-items-center">
          <Image
            src="/images/slide.png"
            alt="Hero Image"
            width={500}
            height={320}
            className="rounded-lg shadow-lg w-full h-[220px] md:h-[320px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
