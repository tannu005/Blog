
export default function GalleryPage() {
  const photos = [
    { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", alt: "Mountains", style: "md:col-span-2 md:row-span-2 aspect-square" },
    { src: "https://images.unsplash.com/photo-1472396961693-142e6e269027", alt: "Nature", style: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1444464666168-49d633b86797", alt: "Birds", style: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1470071131384-001b85755536", alt: "Forest", style: "aspect-[16/9] md:col-span-2" },
    { src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716", alt: "Waterfall", style: "aspect-square" },
    { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d", alt: "Bridge", style: "aspect-square" },
  ]

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[12px] tracking-[1px] text-[#0ECAD4] uppercase font-semibold mb-4">
            Visual Stories
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] font-bold tracking-tight text-[#1B4F7C] mb-6">
            The Gallery
          </h1>
          <div className="w-16 h-[3px] bg-[#0ECAD4] rounded-full mb-6"></div>
          <p className="font-sans text-[18px] text-[#1A1A1A] max-w-[600px] leading-[1.6]">
            A collection of moments captured across my journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {photos.map((photo, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] group ${photo.style}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8] to-[#E1E9F0] flex items-center justify-center">
                <span className="font-sans text-[#1B4F7C]/40 text-xs tracking-widest uppercase font-bold">{photo.alt} Placeholder</span>
              </div>
              <div className="absolute inset-0 bg-[#1B4F7C]/0 group-hover:bg-[#1B4F7C]/10 transition-colors duration-500 z-10"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
