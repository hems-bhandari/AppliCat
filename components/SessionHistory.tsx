import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "@/constants/data";

export function SessionHistory({ sessions }: { sessions: Session[] }) {

  const SessionCard = ({ session }: { session: Session }) => {
    return (
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sagun Bhandari</p>
          <p className="text-sm text-muted-foreground">
            General App Consultation
          </p>
        </div>
        <div className="ml-auto font-medium">19th May at 7:30 PM</div>
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
