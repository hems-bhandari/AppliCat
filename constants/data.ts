import { NavItem } from "@/types";

export type User = {
    id: number;
    name: string;
    school: string;
    SessionType: string;
    status: string;
    time: string;
};

export type Session = {
    id: string;
    name: string;
    school: string;
    SessionType: string;
    status: string;
    time: string;
};

export type StudentInformation = {
    email: string;
    userName: string;
    phonenumber: string;
    highschool: string;
    education: string;
    gpa: string;
    sat: string | null;
    image: string;
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
        title: "Profile",
        href: "/applicant/profile",
        icon: "profile",
        label: "profile",
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

export type CollegeLogos = {
    [key: string]: string;
};

export const collegeLogos: CollegeLogos = {
    princeton:
        "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg",
    mit: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/482px-MIT_logo.svg.png",
    harvard:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/300px-Harvard_University_coat_of_arms.svg.png",
    nyu: "https://logolook.net/wp-content/uploads/2023/10/New-York-University-Logo.png",
    tufts:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Tufts_University_wordmark.svg/360px-Tufts_University_wordmark.svg.png",
    dartmouth:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Dartmouth_College_shield.svg/280px-Dartmouth_College_shield.svg.png",
    vassar:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Vassar_College_Seal.svg/300px-Vassar_College_Seal.svg.png",
    rollins:
        "https://static.wikia.nocookie.net/logopedia/images/a/ae/Rollins-Logo.png/revision/latest?cb=20140614223916",
    reed: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Formal_Seal_of_Reed_College%2C_Portland%2C_OR%2C_USA.svg/300px-Formal_Seal_of_Reed_College%2C_Portland%2C_OR%2C_USA.svg.png",
    pitzer:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Pitzer_College_logo.svg/400px-Pitzer_College_logo.svg.png",
    kenyon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kenyon_logotype_purple.png/440px-Kenyon_logotype_purple.png",
};


export type Consultant = {
    _id: string;
    name: string;
    image: string;
    university: string[];
    classOf: number;
};
