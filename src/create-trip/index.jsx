import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from "../../public/logo.png"
function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (formData?.noOfDAys > 5 && !formData?.location || !formData?.budget || !formData.traveler) {
      toast('Please fill all the details')
      return;
    }

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString();
    // Add a new document in collection "AITrips"
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/' + docId)
  }

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }


  return (
<div className='bg-[#f7f7f9] py-16 px-6 md:px-20'>
  <div className='grid md:grid-cols-2 gap-6 mt-10'>
    {/* Destination */}
    <div>
      <label className='font-medium text-gray-700 block mb-2'>Destination</label>
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        selectProps={{
          place,
          onChange: (v) => {
            setPlace(v);
            handleInputChange('location', v);
          },
          styles: {
            control: (base) => ({
              ...base,
              height: 42,
              borderRadius: 9999, // Full rounded
              paddingLeft: 12,
              paddingRight: 12,
            }),
          },
        }}
      />
    </div>

    {/* Number of Days */}
    <div>
      <label className='font-medium text-gray-700 block mb-2'>Number of Days</label>
      <input
        type='number'
        placeholder='Ex. 4'
        className='px-4 h-[42px] border rounded-full w-full'
        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
      />
    </div>

    {/* Budget */}
    <div>
      <label className='font-medium text-gray-700 block mb-2'>Budget</label>
      <select
        className='px-4 h-[42px] border rounded-full w-full'
        onChange={(e) => handleInputChange('budget', e.target.value)}
        defaultValue=''>
        <option value='' disabled>Select your budget</option>
        <option value='Low'>Low</option>
        <option value='Moderate'>Moderate</option>
        <option value='Luxury'>Luxury</option>
      </select>
    </div>

    {/* Traveling With */}
    <div>
      <label className='font-medium text-gray-700 block mb-2'>Traveling With</label>
      <select
        className='px-4 h-[42px] border rounded-full w-full'
        onChange={(e) => handleInputChange('traveler', e.target.value)}
        defaultValue=''>
        <option value='' disabled>Select companion type</option>
        <option value='Solo'>Solo</option>
        <option value='Family'>Family</option>
        <option value='Couple'>Couple</option>
        <option value='Friends'>Friends</option>
      </select>
    </div>
  </div>

  {/* Submit Button */}
  <div className='mt-10 flex justify-center'>
    <Button
      disabled={loading}
      onClick={onGenerateTrip}
      className='bg-red-600 text-white w-[200px] h-[42px] rounded-full flex items-center justify-center'>
      {loading ? <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin' /> : 'Generate Trip'}
    </Button>
  </div>

  {/* Sign In Modal */}
 <Dialog open={openDialog}>
     <DialogContent className="bg-[#2c2c2e] text-white border border-gray-700">
       <DialogHeader>
         <DialogDescription className="flex flex-col items-center gap-4">
           <img src={logo} alt="logo" width="100px" />
           <h2 className='font-bold text-lg'>Please Sign in to check your AI plan </h2>
          
           <Button
             onClick={login}
             className="w-full mt-6 flex gap-4 items-center bg-white text-black hover:bg-gray-200">
             <FcGoogle className="h-7 w-7" />Sign in With Google
           </Button>
         </DialogDescription>
       </DialogHeader>
     </DialogContent>
   </Dialog>
</div>


  )
}

export default CreateTrip