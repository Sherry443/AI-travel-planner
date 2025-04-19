import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    trip && GetPlacePhoto()
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    }
    const result = await GetPlaceDetails(data)
    const photoName = result.data.places[0].photos[3]?.name
    if (photoName) {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName)
      setPhotoUrl(PhotoUrl)
    }
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
      {/* Background image */}
      <img
        src={photoUrl ? photoUrl : '/placeholder.jpg'}
        alt="img"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-5">
        <h1 className="text-8xl md:text-10xl font-bold drop-shadow-md">
          {trip?.userSelection?.location?.label}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="px-4 py-1 bg-white/20 rounded-full text-sm md:text-md">
            📅 {trip?.userSelection?.noOfDays} Day
          </span>
          <span className="px-4 py-1 bg-white/20 rounded-full text-sm md:text-md">
            💰 {trip?.userSelection?.budget} Budget
          </span>
          <span className="px-4 py-1 bg-white/20 rounded-full text-sm md:text-md">
            👥 No. of traveler/s: {trip?.userSelection?.traveler}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
