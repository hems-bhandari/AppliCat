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
    {
        title: "Profile",
        href: "/consultant/profile",
        icon: "profile",
        label: "Profile",
    }
]

export const adminNavItems: NavItem[] = [
    {
        title: "Home",
        href: "/admin",
        icon: "dashboard",
        label: "Home",
    }

]

