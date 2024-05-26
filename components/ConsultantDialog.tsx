import React from "react";

// dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// components
import BookSlots from "@/components/BookSlots";

// types
import { Consultant } from "@/constants/data";

const ConsultantDialog = ({
  data,
  open,
  setOpen,
}: {
  data: Consultant;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="sm:max-w-[1000px] shadow-lg shadow-gray-300/10">
        <DialogHeader>
          <DialogTitle>
            {data?.name} - {data?.university}
          </DialogTitle>
          <DialogDescription>
            Choose a time slot to book a session with {data?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="mx-auto">
            <BookSlots />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultantDialog;
