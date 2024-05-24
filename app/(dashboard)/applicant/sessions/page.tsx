import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Sessions = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <Tabs defaultValue="all_sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all_sessions">All Sessions</TabsTrigger>
          <TabsTrigger value="booked_sessions">Booked Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="all_sessions"></TabsContent>
        <TabsContent value="booked_sessions"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Sessions;
