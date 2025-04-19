import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel&&GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.name
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(PhotoUrl)
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address} target='_blank'>

<div className="bg-white shadow-md rounded-2xl overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer mt-5 mb-8">
    <div className="relative">
        <img
            src={photoUrl ? photoUrl : '/placeholder.jpg'}
            className="w-full h-[200px] object-cover"
            alt={hotel?.name}
        />
        {/* Optional Sale Badge */}
        {hotel?.price < 150 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Sale
            </span>
        )}
    </div>
    <div className="p-4 space-y-1">
        <h2 className="font-semibold text-lg">{hotel?.name || 'Hotel Name'}</h2>
        <p className="text-gray-500 text-sm">📍 {hotel?.address || 'Hotel Address'}</p>
        <div className="flex justify-between items-center pt-1">
            <p className="text-red-600 font-medium">${hotel?.price || 'N/A'}</p>
            <div className="text-red-500 text-sm">
             
            </div>
        </div>
    </div>
</div>

            </Link>
    )
}

export default HotelCardItem