import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TsessionWithSubDoc } from "@/lib/controllers/sessionController";
import { add } from "date-fns";
import { format } from "date-fns/esm";

export function SessionHistory({ sessions }: { sessions: TsessionWithSubDoc[] }) {

    const SessionCard = ({ session }: { session: TsessionWithSubDoc }) => {
        return (
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={session.consultant.image} alt="Avatar" />
                    <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{session.consultant.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {session.sessionTitle}
                    </p>
                </div>
                {/* 
                    I know this sucks,
                    but had fun writing this it's funny it works perfectly but may open some security risks.
                */}
                <div className="ml-auto font-medium text-center"
                    dangerouslySetInnerHTML={{
                        __html: format(add(session.date, {
                            hours: parseInt(session.time.split(":")[0]),
                            minutes: parseInt(session.time.split(":")[1])
                        }),
                            "do MMMM yyyy 'at' h:mm a"
                        ).split("at")
                            .reverse()
                            .join("<br />")
                    }}>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {sessions?.map((session) => (
                <SessionCard session={session} />
            ))}
        </div>
    );
}
