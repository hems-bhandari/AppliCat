import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  school: string;
  SessionType: string;
  status: string;
  time: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
  {
    id: 2,
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: 3,
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: 4,
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
  {
    id: 5,
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: 6,
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
  {
    id: 7,
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: 8,
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
];

export type Session = {
  id: string;
  name: string;
  school: string;
  SessionType: string;
  status: string;
  time: string;
};

export const sessions: Session[] = [
  {
    id: "1",
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
  {
    id: "2",
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: "3",
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: "4",
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
  {
    id: "5",
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: "6",
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
  {
    id: "7",
    name: "Shyam Khanal",
    school: "Budhanilkantha School",
    SessionType: "EC Session",
    status: "Confirmed",
    time: "May 24, 7 PM",
  },
  {
    id: "8",
    name: "Ram Thapa",
    school: "Rato Bangla School",
    SessionType: "General Application Consultation",
    status: "Pending",
    time: "May 24, 7 PM",
  },
];

export type StudentInformation ={
  email: string;
  userName: string;
  phonenumber: string;
  highschool: string;
  education: string;
  gpa: string;
  sat: string | null;
  image: string;
}

export const studentInformation: StudentInformation = {
  userName: "fakeusername",
  highschool: "Fake High School",
  education: "Fake Education",
  gpa: "4.0",
  sat: "1600",
  email: "fakeemail@example.com",
  phonenumber: "1234567890",
  image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
};

export const applicantNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/applicant",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Sessions",
    href: "/applicant/sessions",
    icon: "calendar",
    label: "calendar",
  },
  {
    title: "Message",
    href: "/applicant/message",
    icon: "chat",
    label: "chat",
  },
  {
    title: "Profile",
    href: "/applicant/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Logout",
    href: "/",
    icon: "logout",
    label: "logout",
  },
];

export const consultantNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/consultant",
    icon: "dashboard",
    label: "Home",
  },
  {
    title: "Sessions",
    href: "/consultant/sessions",
    icon: "zoom",
    label: "sessions",
  },
  {
    title: "Availability",
    href: "/consultant/availability",
    icon: "calendar",
    label: "availability",
  },
];

export const adminNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/admin",
    icon: "dashboard",
    label: "Home",
  },
];
