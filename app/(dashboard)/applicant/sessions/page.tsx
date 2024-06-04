"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsultantDialog from "@/components/ConsultantDialog";

import { Consultant, CollegeLogos, collegeLogos } from "@/constants/data";

const CONSULTANTS = [
  {
    id: "21312312",
    name: "Dinesh Bhandari",
    university: "Princeton University",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg",
    classOf: 2028,
    sessionCharge: 100,
  },
  {
    id: "213123312",
    name: "Sarwesh Parajuli",
    university: "MIT",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/482px-MIT_logo.svg.png",
    classOf: 2028,
    sessionCharge: 100,
  },
];

const Sessions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedConsultant, setSelectedConsultant] =
    useState<Consultant | null>(null);

  const handleBookingPageOpen = (id: string) => {
    setOpen(true);
    const consultant = CONSULTANTS.find((consultant) => consultant.id === id);

    if (consultant) setSelectedConsultant(consultant);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <Tabs defaultValue="all_sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all_sessions">Consultants</TabsTrigger>
          <TabsTrigger value="booked_sessions">Booked Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="all_sessions">
          <ConsultantDialog
            data={selectedConsultant as Consultant}
            open={open}
            setOpen={setOpen}
          />
          <div className="py-8">
            <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
              Browse Consultants
            </h1>
            <div className="flex flex-wrap gap-4 md:space-x-6">
              {CONSULTANTS.map((consultant) => (
                <Card
                  key={consultant.id}
                  className="w-full max-w-[275px] text-center bg-white text-black cursor-pointer"
                  onClick={() => handleBookingPageOpen(consultant.id)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[16px] text-center font-medium w-full capitalize">
                      {consultant.university} '
                      {consultant.classOf.toString().slice(-2)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-full flex-col items-center">
                      <Image
                        src={
                          collegeLogos[
                            consultant.university
                              .split(" ")[0]
                              .toLowerCase() as keyof CollegeLogos
                          ]
                        }
                        width={100}
                        height={100}
                        alt="avatar"
                        className="w-36 h-36 object-contain mx-auto"
                      />

                      <div className="flex-1 mt-2">
                        <h3 className="text-xl font-semibold">
                          {consultant.name}
                        </h3>
                        <p className="text-[14px]">
                          {`NPR ${consultant.sessionCharge} per session`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="booked_sessions">
          <div className="mt-5">
            <h1 className="text-2xl font-bold my-6 text-center text-text-light dark:text-text-dark">
              No booked sessions
            </h1>

            <p className="text-lg text-text-light dark:text-text-dark">
              You have not booked any sessions yet. Book a session with a
              consultant to get started. If you've already booked a session, it
              will appear here after validation.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sessions;
