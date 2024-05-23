import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConsultantCard from "@/components/ConsultantCard";

const breadcrumbItems = [
  { title: "Edit Profile", link: "/applicant/edit-profile" },
];

const consultants = [
  {
    name: "Dinesh Bhandari",
    universityLogo:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg",
    session: "ECs Building Session",
    classYear: 2028,
  },
  {
    name: "Sarwesh Parajuli",
    universityLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/482px-MIT_logo.svg.png",
    session: "Essay Writing Session",
    classYear: 2028,
  },
  // Add more consultants as needed
];

export default function page() {
  return (
    <ScrollArea className="h-full">
      <BreadCrumb items={breadcrumbItems} />
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-8">
        <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
          Browse Consultants
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultants.map((consultant, index) => (
            <ConsultantCard key={index} consultant={consultant} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
