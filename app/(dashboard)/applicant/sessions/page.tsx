"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsultantDialog from "@/components/ConsultantDialog";

import { Consultant, CollegeLogos, collegeLogos } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { PastSessions } from "@/components/sessions";

const Sessions = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
    const [Consultants, setConsultants] = useState<any[]>([]);

    const handleBookingPageOpen = (id: string) => {
        setOpen(true);
        const consultant = Consultants.find(
            (consultant: any) => consultant?.id === id
        );
        if (consultant) setSelectedConsultant(consultant);
    };
    const { isLoading } = useQuery({
        queryKey: ["consultant"],
        queryFn: () => fetch("/api/consultant",
            { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                setConsultants(data?.consultants || []);
            })
    })


    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8">
            <Tabs defaultValue="all_sessions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all_sessions">Consultants</TabsTrigger>
                    <TabsTrigger value="booked_sessions">Booked Sessions</TabsTrigger>
                </TabsList>
                <TabsContent value="all_sessions">
                    <ConsultantDialog
                        consultantData={selectedConsultant as Consultant}
                        open={open}
                        setOpen={setOpen}
                    />
                    <div className="py-8">
                        <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
                            Browse Consultants
                        </h1>
                        <div className="flex flex-wrap gap-4 md:space-x-6">
                            {
                                isLoading
                                    ? (Array(2).fill("*").map((_, index) => <ConsultantCardSkeleton key={index} />))
                                    : Consultants?.length > 0 ? (
                                        Consultants.map((consultant) => (
                                            <Card
                                                key={consultant._id}
                                                className="w-full max-w-[275px] text-center bg-white text-black cursor-pointer"
                                                onClick={() => handleBookingPageOpen(consultant.id)}
                                            >
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-[16px] text-center font-medium w-full capitalize">
                                                        {consultant?.university} &#39;
                                                        {consultant?.classOf?.toString().slice(-2)}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex flex-col items-center">
                                                    <div className="w-full flex-col items-center">
                                                        <Image
                                                            src={
                                                                collegeLogos[
                                                                consultant?.university
                                                                    ?.split(" ")[0]
                                                                    .toLowerCase() as keyof CollegeLogos
                                                                ] || consultant?.image
                                                            }
                                                            width={100}
                                                            height={100}
                                                            alt="avatar"
                                                            className="w-36 h-36 object-contain mx-auto"
                                                        />

                                                        <div className="flex-1 mt-2">
                                                            <h3 className="text-xl font-semibold">
                                                                {consultant?.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <> No Consultants Found</>
                                    )
                            }
                        </div>
                    </div>
                </TabsContent>

                {/* TODO: A booked session view as well. */}
                <BookedSessionTab />
            </Tabs>
        </div>
    );
};

export default Sessions;

const BookedSessionTab = () => {
    return (
        <TabsContent value="booked_sessions" >
            <div className="wrapper mt-10">
                <PastSessions />
            </div>
        </TabsContent>
    )
}



const ConsultantCardSkeleton = () => {
    return (
        <Card
            className="min-w-[275px] min-h-[262px] text-center bg-white text-black cursor-pointer flex flex-col items-center justify-center gap-4"
        >
            <Skeleton className="w-16 h-4 bg-gray-300" />
            <Skeleton className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-400" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="currentColor" fill="none">
                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="16.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M16 22C15.3805 19.7749 13.9345 17.7821 11.8765 16.3342C9.65761 14.7729 6.87163 13.9466 4.01569 14.0027C3.67658 14.0019 3.33776 14.0127 3 14.0351" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M13 18C14.7015 16.6733 16.5345 15.9928 18.3862 16.0001C19.4362 15.999 20.4812 16.2216 21.5 16.6617" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </Skeleton>
            <Skeleton className="w-40 h-5 bg-gray-300" />
        </Card>
    );

}
