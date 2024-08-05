import React from "react";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
const ProfileSkeletonCard = () => {
  return (
    <>
      <Box className="rounded-lg lg:justify-start relative border border-solid p-4 mb-4 block lg:flex lg:items-start gap-4 shadow-md">
      <div className="flex flex-col items-start">
        <Skeleton sx={{ height: '12rem' }} className="w-full sm:w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem]"/>
      </div>
        <div className="profileRightSide">
        <div className="overflow-x-auto w-full">
          <div className="maidDetails overflow-y-auto max-w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 overflow-x-auto gap-y-4 gap-x-8 mt-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="nationality flex flex-col gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </Box>
    </>
  );
};

export default ProfileSkeletonCard;
