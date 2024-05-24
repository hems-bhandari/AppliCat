import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};
export const users: User[] = [
    {
        id: 1,
        name: "Candice Schiner",
        company: "Dell",
        role: "Frontend Developer",
        verified: false,
        status: "Active",
    },
    {
        id: 2,
        name: "John Doe",
        company: "TechCorp",
        role: "Backend Developer",
        verified: true,
        status: "Active",
    },
    {
        id: 3,
        name: "Alice Johnson",
        company: "WebTech",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 4,
        name: "David Smith",
        company: "Innovate Inc.",
        role: "Fullstack Developer",
        verified: false,
        status: "Inactive",
    },
    {
        id: 5,
        name: "Emma Wilson",
        company: "TechGuru",
        role: "Product Manager",
        verified: true,
        status: "Active",
    },
    {
        id: 6,
        name: "James Brown",
        company: "CodeGenius",
        role: "QA Engineer",
        verified: false,
        status: "Active",
    },
    {
        id: 7,
        name: "Laura White",
        company: "SoftWorks",
        role: "UX Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 8,
        name: "Michael Lee",
        company: "DevCraft",
        role: "DevOps Engineer",
        verified: false,
        status: "Active",
    },
    {
        id: 9,
        name: "Olivia Green",
        company: "WebSolutions",
        role: "Frontend Developer",
        verified: true,
        status: "Active",
    },
    {
        id: 10,
        name: "Robert Taylor",
        company: "DataTech",
        role: "Data Analyst",
        verified: false,
        status: "Active",
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

