import BreadCrumb from "@/components/breadcrumb";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import { ScrollArea } from "@/components/ui/scroll-area";

<<<<<<< Updated upstream:app/(dashboard)/applicant/profile/page.tsx
const breadcrumbItems = [{ title: "Profile", link: "/applicant/profile" }];
=======
const breadcrumbItems = [{ title: "Edit Profile", link: "/applicant/edit-profile" }];
>>>>>>> Stashed changes:app/(dashboard)/applicant/edit-profile/page.tsx
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne categories={[]} initialData={null} />
      </div>
    </ScrollArea>
  );
}
