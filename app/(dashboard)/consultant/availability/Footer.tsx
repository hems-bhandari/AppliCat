import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TAvailability } from "./page";

type TAvailabilityForm = {
    value: any[],
    resetCallander: () => void
    defaultValue?: TAvailability | null,
}
const AvailabilityForm = ({ value, resetCallander, defaultValue }: TAvailabilityForm) => {
    const [submissionStatus, setSubmissionStatus] = useState<{
        status: "error" | "success" | "notSubmitted" | "submitting",
        btnText: string
    }>({ status: "notSubmitted", btnText: "Submit" })

    const formRef = useRef<HTMLFormElement>(null);

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setSubmissionStatus({ status: "submitting", btnText: "Submitting..." });

        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(e.currentTarget);

        // may or may not be an array with one or more values
        const date = Array.isArray(value) ?
            value.length > 1
                ? value
                : value[0]
            : value

        const from = formData.get("from_time") as string;
        const to = formData.get("to_time") as string;
        const sessionDuration = formData.get("session_duration") as string;
        const sessionCharge = formData.get("session_charge") as string;


        fetch("/api/availability", {
            method: "POST",
            body: JSON.stringify({
                date,
                from,
                to,
                sessionCharge,
                sessionDuration,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok)
                    setSubmissionStatus({ status: "success", btnText: "Submitted !!" });
                return res.json()
            })
            .catch((err) => {
                setSubmissionStatus({ status: "error", btnText: "Error !!" });
                console.error(err);
            }).finally(() => {
                // adding a cooldown of 2 seconds.
                setTimeout(() => {
                    setSubmissionStatus({ status: "notSubmitted", btnText: "Submit" });
                }, 2000);
            })
    }

    useEffect(() => {
        if (!defaultValue)
            resetForm();
    }, [value])


    return (
        <form
            className="py-4"
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <div className="mt-0">
                <p className="text-[16px]">
                    You selected {value.length} days.
                    <Button
                        variant="link"
                        onClick={resetCallander}
                        className="w-auto h-auto text-[16px] p-0 ml-2 text-gray-400 hover:text-gray-300 transition-colors duration-200 ease-in-out"
                    >
                        Reset
                    </Button>
                </p>
                <div className="flex justify-between items-center w-full gap-3 mt-7">
                    <div className="flex flex-col w-full">
                        <label htmlFor="from_time">From:</label>{" "}
                        <Input
                            name="from_time"
                            id="from_time"
                            className="w-full mt-1"
                            type="time"
                            defaultValue={defaultValue ? defaultValue.from : ""}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="to_time">To:</label>{" "}
                        <Input
                            id="to_time"
                            name="to_time"
                            className="w-full mt-1"
                            type="time"
                            defaultValue={defaultValue ? defaultValue.to : ""}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-evenly w-full my-6">
                    <label htmlFor="session_duration">
                        Session Duration (in minutes)
                    </label>
                    <Input
                        id="session_duration"
                        name="session_duration"
                        className="w-full mt-1"
                        type="number"
                        defaultValue={defaultValue ? defaultValue.sessionDuration : ""}
                    />
                </div>
                <div className="flex flex-col justify-evenly w-full my-6">
                    <label htmlFor="session_charge">
                        Session Charge (NPR)
                    </label>
                    <Input
                        id="session_charge"
                        name="session_charge"
                        className="w-full mt-1"
                        type="number"
                        defaultValue={defaultValue ? defaultValue.sessionCharge : ""}
                    />
                </div>
            </div>

            <div className="flex flex-row-reverse">
                <Button
                    variant="outline"
                    size="lg"
                    className={`w-full ${submissionStatus.status === "success"
                        ? "bg-green-600 text-white"
                        : submissionStatus.status === "error"
                            ? "bg-red-500 text-white"
                            : ""}`}
                    type="submit"
                >
                    {submissionStatus.status === "submitting" &&
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    {submissionStatus.btnText}
                </Button>
            </div>
        </form>
    );
};

export default AvailabilityForm;
