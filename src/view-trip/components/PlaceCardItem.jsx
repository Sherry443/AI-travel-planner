import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
      place && GetPlacePhoto();
  }, [place])

  const GetPlacePhoto = async () => {
      const data = {
          textQuery: place?.place
      }
      const result = await GetPlaceDetails(data).then(resp => {
          console.log(resp.data.places[0].photos[3].name)
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
          setPhotoUrl(PhotoUrl)
      })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +place?.place} target='_blank'>
<div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full hover:scale-[1.02] transition-transform cursor-pointer mt-5 mb-4 flex">
  <img
    src={photoUrl ? photoUrl : '/placeholder.jpg'}
    alt={place?.place}
    className="w-[180px] h-[180px] object-cover rounded-l-2xl"
  />
  <div className="p-5 flex flex-col justify-between w-full">
    <div>
      <h2 className="font-bold text-xl text-gray-800">{place?.place || 'Place Name'}</h2>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {place?.details || 'Some details here'}
      </p>
    </div>
    <div className="mt-4 text-sm text-gray-700 font-medium flex items-center gap-2">
      <span>🏷️ Ticket:</span>
      <span className="text-orange-600">{place?.ticket_pricing || 'N/A'}</span>
    </div>
  </div>
</div>


    </Link>
  )
}

export default PlaceCardItem