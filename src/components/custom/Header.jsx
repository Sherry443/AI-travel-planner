import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import logo from "../../../public/logo.png"
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  });

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
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
<div className='bg-[#011a32] text-white shadow-md flex items-center justify-between px-6 py-3 relative'>
  {/* Left Section: Logo */}
  <img src={logo} alt="Xafran Logo" className="h-4" />

  {/* Center Section: Navigation Links */}
  <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 text-sm font-medium">
    <a href="/" className="text-red-500 hover:underline">Home</a>
    <a href="/clock" className="hover:underline">Services</a>
    <a href="/create-trip" className="hover:underline">Generate Trip</a>
  </div>

  {/* Right Section: Sign In or User */}
  <div className="flex items-center gap-4">
    {user ? (
      <div className='flex items-center gap-3'>
         <a href="/my-trips" className="hover:underline px-5">My Trip</a>
        <Popover>
          <PopoverTrigger>
            <img src={user?.picture} alt="User" className='h-[35px] w-[35px] rounded-full border border-white' />
          </PopoverTrigger>
          <PopoverContent className="bg-[#2c2c2e] text-white border border-gray-700">
            <h2
              className='cursor-pointer hover:underline'
              onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>
              Logout
            </h2>
          </PopoverContent>
        </Popover>
      </div>
    ) : (
      <Button
        onClick={() => setOpenDialog(true)}
        className="bg-transparent text-white border-none px-0 hover:bg-transparent rounded-none"
      >
        Sign In
      </Button>
    )}
  </div>

  {/* Sign In Dialog */}
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

export default Header;
