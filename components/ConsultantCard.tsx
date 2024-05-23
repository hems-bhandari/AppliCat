import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Consultant = {
  name: string;
  universityLogo: string;
  session: string;
  classYear: number;
};

type ConsultantCardProps = {
  consultant: Consultant;
};

const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant }) => {
    return (
      <Card className="w-80 m-4 shadow-md rounded-lg overflow-hidden bg-background-light dark:bg-background-dark">
        <CardHeader className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <CardTitle className="text-xl font-semibold text-text-light dark:text-text-dark">{consultant.name}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">{consultant.session}</CardDescription>
          </div>
          <img src={consultant.universityLogo} alt="University Logo" className="w-12 h-12 object-contain" />
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-500 dark:text-gray-400">Class of {consultant.classYear}</p>
        </CardContent>
        <CardFooter className="p-4">
          <Button className="w-full bg-primary-light dark:bg-primary-dark text-white hover:bg-white hover:text-primary-dark dark:hover:text-primary-light">
            Book Now
          </Button>
        </CardFooter>
      </Card>
    );
  };
export default ConsultantCard;
