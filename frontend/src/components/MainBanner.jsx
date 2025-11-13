import React from 'react'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import { Link } from 'react-router-dom'
import whiteArrow from "/src/assets/white_arrow_icon.svg";
const MainBanner = () => {
  return (
    <div>
       <CCarousel controls transition="crossfade">
        {/* Slide 1 */}
        <CCarouselItem>
          {/* Desktop Image */}
          <CImage 
            className="hidden md:block w-full h-[70vh] lg:h-[80vh] object-cover" 
            src="src/assets/carousel-bg-1.jpg" 
            alt="Desktop Slide 1" 
          />
          {/* Mobile Image */}
          <CImage 
            className="block md:hidden w-full h-[80vh] object-cover" 
            src="src/assets/carousel-sm-1.jpg" 
            alt="Mobile Slide 1" 
          />
        </CCarouselItem>

        {/* Slide 2 */}
        <CCarouselItem>
          <CImage 
            className="hidden md:block w-full h-[70vh] lg:h-[80vh] object-cover" 
            src="src/assets/carousel-bg-5.jpg" 
            alt="Desktop Slide 2" 
          />
          <CImage 
            className="block md:hidden w-full h-[80vh] object-cover" 
            src="src/assets/carousel-sm-2.jpg"  
            alt="Mobile Slide 2" 
          />
        </CCarouselItem>

        {/* Slide 3 */}
        <CCarouselItem>
          <CImage 
            className="hidden md:block w-full h-[70vh] lg:h-[80vh] object-cover" 
            src="src/assets/carousel-bg-3.jpg" 
            alt="Desktop Slide 3" 
          />
          <CImage 
            className="block md:hidden w-full h-[80vh] object-cover" 
            src="src/assets/carousel-sm-3.jpg" 
            alt="Mobile Slide 3" 
          />
        </CCarouselItem>

        {/* Slide 4 */}
        <CCarouselItem>
          <CImage 
            className="hidden md:block w-full h-[70vh] lg:h-[80vh] object-cover" 
            src="src/assets/carousel-bg-4.jpg" 
            alt="Desktop Slide 4" 
          />
          <CImage 
            className="block md:hidden w-full h-[80vh] object-cover" 
            src="src/assets/carousel-sm-4.jpg" 
            alt="Mobile Slide 4" 
          />
        </CCarouselItem>
      </CCarousel> 

      <div className="text-center py-10 bg-gradient-to-r from-green-50 via-white to-green-50">
  <h2 className="text-2xl md:text-3xl font-semibold text-green-800 tracking-wide">
    "Shop green, live clean — fresh choices for a sustainable tomorrow."
  </h2>
  <p className="mt-3 text-gray-600 text-base md:text-lg">
    Discover eco-friendly groceries that care for you and the planet 🌍
  </p>

  <div className="mt-6 flex items-center justify-center gap-4">
    {/* Filled green button */}
    <Link
      to="/products"
      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-lg font-medium transition no-underline"
    >
      Shop now
    </Link>

    {/* Outlined box button for Explore Deals */}
    <Link
      to="/products"
      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-lg font-medium inline-flex items-center gap-2 transition no-underline visited:no-underline"
    >
      <span>Explore deals</span>
      <span aria-hidden="true">→</span>
    </Link>
  </div>
</div>
    </div>
  )
}

export default MainBanner
