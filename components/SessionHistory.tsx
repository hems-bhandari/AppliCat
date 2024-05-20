import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SessionHistory() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <a href="#">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
        </a>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            <a href="#">
              <b>Sagun Bhandari</b>
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            <a href="#">
              <b>General App Consultation, 2024 May 19</b>
            </a>
          </p>
        </div>
        <div className="ml-auto font-medium">7:30 PM</div>
      </div>
      <div className="flex items-center">
        <a href="#">
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
        </a>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            <a href="#">Sudip Rokaya</a>
          </p>
          <p className="text-sm text-muted-foreground">
            <a href="#">Essay Session, 2024 May 25</a>
          </p>
        </div>
        <div className="ml-auto font-medium">8:00 PM</div>
      </div>
    </div>
  );
}
