import React, { useEffect, useState } from "react";

// dialog
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// components
import BookSlots from "@/components/BookSlots";

// types
import { Consultant } from "@/constants/data";
import { Button } from "./ui/button";
import PaymentPage from "./PaymentPage";
import UploadReceipt, { ConfirmationFormValues } from "./UploadReceipt";
import BookingConfirmation from "./BookingConfirmation";
import { confirmPendingSession, createOnProgressSession } from "@/lib/controllers/sessionController";
import { useSession } from "next-auth/react";
import { isSameDay } from "date-fns";

export interface DateType {
    justDate: Date | null;
    dateTime: Date | null;
}

const ConsultantDialog = ({
    consultantData,
    open,
    setOpen,
}: {
    consultantData: Consultant;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const authUserSession = useSession();

    const [stage, setStage] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(true);

    // consultant availability
    const [availabilities, setAvailability] = React.useState<Record<
        string,
        {
            costPerSession: number;
            sessionDuration: number;
            sessionTitle: string;

            sessions: {
                startingTime: string;
                booked: boolean;
            }[];
        }
    > | null>(null);

    const [date, setDate] = React.useState<DateType>({
        justDate: null,
        dateTime: null,
    });

    const handleNext = async () => {
        if (stage === 0) {
            if (!date.justDate || !date.dateTime || !authUserSession.data?.user) return;

            // filtering the active availability.


            if (!availabilities || !date.justDate) return;
            const selectedAvailability = Object.keys(availabilities).find((availableDate) =>
                date.justDate && isSameDay(new Date(availableDate), date.justDate)
            );
            if (!selectedAvailability) return;

            const activeAvailability = availabilities[selectedAvailability]

            const insertedAvailabilityId = await createOnProgressSession({
                consultant: consultantData._id,
                date: date.justDate.toISOString(),
                time: date.dateTime.toISOString(),
                applicant: authUserSession.data.user._id,

                sessionTitle: activeAvailability.sessionTitle,
                sessionCharge: activeAvailability.costPerSession,
                sessionDuration: activeAvailability.sessionDuration,
            });

            console.log(insertedAvailabilityId, stage)
            if (!insertedAvailabilityId) return;

            // storing the session id in db into localstorage for reload events.
            localStorage.setItem("processingSessionId", insertedAvailabilityId);

            // updating the stage.
            setStage((prev) => prev + 1);
        }


        if (stage === 1) {
            setStage((prev) => prev + 1);
        }

        if (stage === 3) {
            setOpen(false);
        }
    };

    const handleBack = () => {
        if (stage === 1 || stage === 3) {
            // redirected to the first page so disable the next button
            setDisabled(true);
        }

        if (stage === 2) {
            setDisabled(false);
        }

        stage === 0 ? setOpen(false) : setStage((prev) => prev - 1);
    };

    useEffect(() => {
        return () => {
            setDisabled(true);
            setStage(0);
        };
    }, [open]);

    const submitConfirmation = async (data: ConfirmationFormValues) => {
        // upload the receipt
        const processingSessionId = localStorage.getItem("processingSessionId");

        if (!processingSessionId || !data.image || !data.email) return;

        // confirming the session.
        const confirmedSession = await confirmPendingSession({
            sessionId: processingSessionId,
            receiptUrl: data.image?.fileUrl,
            email: data.email,
        });

        if (!confirmedSession) return;

        // removing the temp data in the localstorage since the session is confirmed.
        localStorage.removeItem("processingSessionId");

        //updating the stage
        setStage((prev) => prev + 1);
    }

    const Buttons = () => (
        <div className="flex justify-between gap-4 mt-4 w-full mx-auto">
            <Button onClick={handleBack} variant="destructive" size="lg">
                {stage === 0 ? "Close" : "Back"}
            </Button>
            <Button
                type="submit"
                onClick={() => stage !== 2 && handleNext()}
                size="lg"
                disabled={disabled}
            >
                {stage === 2 ? "Confirm" : "Next"}
            </Button>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[1000px] shadow-lg shadow-gray-300/10">
                <DialogHeader>
                    <DialogTitle>
                        {consultantData?.name} - {consultantData?.university}
                    </DialogTitle>
                    <DialogDescription>
                        {stage === 0 &&
                            `Choose a time slot to book a session with ${consultantData?.name}`}

                        {stage === 1 && `Pay the session charge to confirm the booking.`}

                        {stage === 2 && `Upload the payment receipt!`}

                        {stage === 3 && `Your session has been booked!`}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 pt-4">
                    <div className="mx-auto min-h-[500px] flex flex-col w-full justify-between">
                        {stage === 0 && (
                            <>
                                <BookSlots
                                    consultantId={consultantData?._id}
                                    date={date}
                                    setDate={setDate}
                                    setDisabled={setDisabled}
                                    availabilities={availabilities}
                                    setAvailability={setAvailability}
                                />
                                <Buttons />
                            </>
                        )}

                        {stage === 1 && (
                            <>
                                <PaymentPage CHARGE={1000} />
                                <Buttons />
                            </>
                        )}

                        {stage === 2 && (
                            <UploadReceipt handleSubmit={(data) => {
                                submitConfirmation(data);
                            }
                            }>
                                <Buttons />
                            </UploadReceipt>
                        )}

                        {stage === 3 && <BookingConfirmation />}
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default ConsultantDialog;
