import Greeting from "@/components/landing/Greeting";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <Greeting />
                </div>

                <p>
                    Admin session history and other features will be implemented in the next version.
                </p>
            </div>
        </ScrollArea>
    );
}
