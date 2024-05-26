import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AvailabilityForm = ({ value, resetCallander }: { value: any[], resetCallander: () => void }) => {
    if (value.length === 0) {
        return <div className="mt-4">Please pick one or more days.</div>;
    }
    // TODO:CREATE SESSION MODAL, make it work with server comps 
    // Create an api for session uploading and make it persentent
    //


    const handleSubmit = () => { }

    return (
        <form className="py-4">
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
                        <Input id="from_time" className="w-full mt-1" type="time" />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="to_time">To:</label>{" "}
                        <Input id="to_time" className="w-full mt-1" type="time" />
                    </div>
                </div>
                <div className="flex flex-col justify-evenly w-full my-6">
                    <label htmlFor="session_duration">
                        Session Duration (in minutes)
                    </label>
                    <Input
                        id="session_duration"
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
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AvailabilityForm;
