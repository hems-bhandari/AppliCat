'use client'

import { katibeh } from "@/lib/fonts";
import { useEffect } from "react";

const Drawer = ({ open }: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    () => document.body.classList.remove("overflow-hidden");
  })
  return (
    <div className={`h-screen w-screen bg-[#2d2d2d] fixed top-0 left-0 bg-opacity-20 backdrop-filter backdrop-blur-lg z-50 ${open ? "" : "opacity-0 pointer-events-none"}`} onClick={() => { }} >
      <aside className="w-[min(100%,800px)] bg-black  min-h-screen ml-auto p-12" >
        <h2 className={`${katibeh.className} text-6xl text-red-600 `}>
          Who are we?
        </h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standardLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
      </aside>
    </div >
  )
}

export default Drawer
