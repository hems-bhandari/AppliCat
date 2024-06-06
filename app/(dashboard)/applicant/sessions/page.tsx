"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsultantDialog from "@/components/ConsultantDialog";

import { Consultant, CollegeLogos, collegeLogos } from "@/constants/data";

const Sessions = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedConsultant, setSelectedConsultant] =
        useState<Consultant | null>(null);
    const [Consultants, setConsultants] = useState<any[]>([]);

    const handleBookingPageOpen = (id: string) => {
        setOpen(true);
        const consultant = Consultants.find((consultant: any) => consultant?.id === id);
        if (consultant) setSelectedConsultant(consultant);
    };

    useEffect(() => {
        fetch("/api/consultant")
            .then((res) => res.json())
            .then((data) => {
                setConsultants(data?.consultants || []);
            });
    }, []);

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
                            {Consultants?.length > 0 ? Consultants.map((consultant) => (
                                <Card
                                    key={consultant._id}
                                    className="w-full max-w-[275px] text-center bg-white text-black cursor-pointer"
                                    onClick={() => handleBookingPageOpen(consultant.id)}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-[16px] text-center font-medium w-full capitalize">
                                            {consultant?.university} '
                                            {consultant.classOf.toString().slice(-2)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center">
                                        <div className="w-full flex-col items-center">
                                            <Image
                                                src={
                                                    collegeLogos[
                                                    consultant?.university
                                                        .split(" ")[0]
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
                                : <> No Consultants Found</>
                            }
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="booked_sessions"></TabsContent>
            </Tabs>
        </div>
    );
};

export default Sessions;
