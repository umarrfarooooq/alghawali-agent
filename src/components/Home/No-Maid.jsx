import React from "react";
import NoMaidImage from "@public/no-maid.png";
import Image from "next/image";
const NoMaid = () => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center py-6 px-4">
        <div className="flex flex-col items-center">
          <div>
            <Image
              src={NoMaidImage}
              className="w-full max-w-[28rem] max-h-[28rem] md:min-w-[28rem] md:min-h-[28rem]"
              alt="No Maid Image"
            />
          </div>
          <div className="w-full text-center text-base md:text-2xl font-bold">You didnt add any House Maid to AL-Ghawali</div>
        </div>
      </div>
    </>
  );
};

export default NoMaid;
