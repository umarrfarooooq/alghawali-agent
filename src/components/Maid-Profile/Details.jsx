import React, { useState } from "react";
import BackIcon from "../ui/BackIcon/BackIcon";
import Backdrop from "../ui/Backdrop";
import UpdateMaid from "../Forms/Update-Maid";
import { useTranslations } from "next-intl";

const MaidDetailComponent = ({ maid }) => {
  const t = useTranslations("profileDetails");
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <>
      {isFormVisible && <Backdrop showBackdrop={true} />}
      {maid && (
        <div className="container px-4 relative">
          {isFormVisible && (
            <aside className="absolute z-[20] right-0 top-6">
              <UpdateMaid
                maid={maid}
                maidId={maid._id}
                onCloseForm={() => setIsFormVisible(false)}
              />
            </aside>
          )}
          <div className="overflow-auto min-h-screen max-h-full">
            <div>
              <div className="maidsCount flex md:items-center md:justify-between flex-col md:flex-row my-4">
                <span className="text-xl font-bold md:flex items-center justify-start gap-3">
                  <BackIcon />
                  {maid.maidName}
                </span>
                <div>
                  <div className="maidActions flex items-center gap-2">
                    <div
                      onClick={() => setIsFormVisible(true)}
                      className="editMaid cursor-pointer p-3 bg-[#EBEBEB] rounded-2xl"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M21 9.5V11C21 15.714 21 18.071 19.535 19.535C18.072 21 15.714 21 11 21C6.286 21 3.929 21 2.464 19.535C1 18.072 1 15.714 1 11C1 6.286 1 3.929 2.464 2.464C3.93 1 6.286 1 11 1H12.5"
                            stroke="#262F32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M15.6527 2.45512L16.3017 1.80612C16.8181 1.28988 17.5184 0.999906 18.2485 1C18.9787 1.00009 19.6789 1.29024 20.1952 1.80662C20.7114 2.323 21.0014 3.0233 21.0013 3.75347C21.0012 4.48365 20.7111 5.18388 20.1947 5.70012L19.5447 6.34912C19.5447 6.34912 18.1667 6.26812 16.9507 5.05112C15.7337 3.83512 15.6527 2.45612 15.6527 2.45612L9.68767 8.42012C9.28367 8.82412 9.08167 9.02612 8.90767 9.24912C8.70267 9.51112 8.52767 9.79612 8.38367 10.0971C8.26267 10.3521 8.17267 10.6231 7.99167 11.1651L7.41267 12.9001M7.41267 12.9001L7.03867 14.0221C6.99469 14.153 6.98808 14.2935 7.01959 14.4279C7.0511 14.5623 7.11948 14.6853 7.21705 14.7829C7.31461 14.8806 7.43749 14.9491 7.57186 14.9808C7.70623 15.0124 7.84677 15.006 7.97767 14.9621L9.10067 14.5881M7.41267 12.9001L9.10067 14.5881M19.5457 6.34812L13.5807 12.3131C13.1767 12.7171 12.9747 12.9191 12.7517 13.0931C12.4889 13.2981 12.2045 13.4738 11.9037 13.6171C11.6487 13.7381 11.3777 13.8281 10.8357 14.0091L9.10067 14.5881"
                            stroke="#262F32"
                            stroke-width="1.5"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="deleteMaid cursor-not-allowed p-3 bg-[#EBEBEB] rounded-2xl">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9.17 4.0005C9.3766 3.41496 9.75974 2.90793 10.2666 2.54929C10.7735 2.19064 11.3791 1.99805 12 1.99805C12.6209 1.99805 13.2265 2.19064 13.7334 2.54929C14.2403 2.90793 14.6234 3.41496 14.83 4.0005M20.5 6.0005H3.5M18.833 8.5005L18.373 15.4005C18.196 18.0545 18.108 19.3815 17.243 20.1905C16.378 21.0005 15.047 21.0005 12.387 21.0005H11.613C8.953 21.0005 7.622 21.0005 6.757 20.1905C5.892 19.3815 5.803 18.0545 5.627 15.4005L5.167 8.5005M9.5 11.0005L10 16.0005M14.5 11.0005L14 16.0005"
                            stroke="#CD2424"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="maidsProfiles mt-2">
                <div>
                  <div className="w-full border border-solid bg-white rounded-lg p-6">
                    <div className="profileCard border border-solid rounded-lg p-4 mb-4 block lg:flex lg:items-start gap-4">
                      <div className="profileLeftSide">
                        <div className="maidImage">
                          <div className="maidImage">
                            <img
                              className="w-[18rem] h-[18rem] lg:w-[8rem] lg:h-[8rem] rounded-md object-cover object-top"
                              src={`${process.env.NEXT_PUBLIC_API_URL}${maid.maidImage}`}
                              alt="Maid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="profileRightSide">
                        <div className="maidName text-lg font-bold">
                          {maid.maidName}
                        </div>
                        <div className="overflow-x-auto w-full">
                          <div className="maidDetails overflow-y-auto max-w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 overflow-x-auto gap-y-4 gap-x-8 mt-4">
                              <div className="religion">
                                <div className="text-xs">{t("religion")}</div>
                                <div className="text-sm font-semibold">
                                  {maid.religion}
                                </div>
                              </div>
                              <div className="maritalStatus">
                                <div className="text-xs">
                                  {t("maritalStatus")}
                                </div>
                                <div className="text-sm font-semibold">
                                  {maid.maritalStatus}
                                </div>
                              </div>
                              {maid.numberOfChildren >= 0 && (
                                <div className="childrens">
                                  <div className="text-xs">
                                    {t("childrens")}
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {maid.numberOfChildren}
                                  </div>
                                </div>
                              )}

                              <div className="education">
                                <div className="text-xs">{t("education")}</div>
                                <div className="text-sm font-semibold">
                                  {maid.education}
                                </div>
                              </div>
                              <div className="experience">
                                <div className="text-xs">{t("experience")}</div>
                                <div className="text-sm font-semibold">
                                  {maid.experience
                                    ? `${maid.experience.years} Years from ${maid.experience.country}`
                                    : "New"}
                                </div>
                              </div>
                              <div className="Languages">
                                <div className="text-xs">{t("languages")}</div>
                                <div className="text-sm font-semibold">
                                  {maid.languages.join(", ")}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-8">
                      <div className="maidImages overflow-x-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center overflow-x-auto">
                          {maid.maidPassportFront && (
                            <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                              <img
                                className="w-full rounded-lg h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                src={`${process.env.NEXT_PUBLIC_API_URL}${maid.maidPassportFront}`}
                              />
                            </div>
                          )}
                          {maid.maidPassportBack && (
                            <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                              <img
                                className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-cover object-top"
                                src={`${process.env.NEXT_PUBLIC_API_URL}${maid.maidPassportBack}`}
                              />
                            </div>
                          )}
                          {maid.maidVideo && (
                            <div className="w-[18rem] md:w-[15rem] flex-shrink-0 lg:flex-shrink lg:w-full flex items-center justify-center p-4 rounded-lg bg-[#F2F2F2]">
                              <video
                                controls
                                className="w-full  h-[13rem] md:h-[21rem] md:w-full p-2 object-contain"
                              >
                                <source
                                  src={`${process.env.NEXT_PUBLIC_API_URL}${maid.maidVideo}`}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaidDetailComponent;
