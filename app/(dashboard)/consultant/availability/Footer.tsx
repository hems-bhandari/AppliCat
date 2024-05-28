import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

const AvailabilityForm = ({ value, resetCallander }: { value: any[], resetCallander: () => void }) => {
    if (value.length === 0) {
        return <div className="mt-4">Please pick one or more days.</div>;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(e.currentTarget);

        // to add multiple days support 
        const date = value[0];
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
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error(err);
            });


    }

    return (
        <form className="py-4" onSubmit={handleSubmit}>
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
                            type="time" />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="to_time">To:</label>{" "}
                        <Input
                            id="to_time"
                            name="to_time"
                            className="w-full mt-1"
                            type="time" />
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
                    />
                </div>
            </div>

            <div className="flex flex-row-reverse">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AvailabilityForm;
