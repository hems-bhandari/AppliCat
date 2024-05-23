"use client";

import { useState } from "react";
import { Check, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

function Message() {

  const [messages, setMessages] = useState([
    {
        role: "user",
        content: "Hello, when will the session start?",
      },
    {
      role: "agent",
      content: "Hi, the session will start in 10 minutes.",
    },
    {
      role: "agent",
      content: "Is there anything else I can help you with?",
    },
    {
      role: "user",
      content: "No, that's all. Thank you!",
    },
    {
        role: "agent",
        content: "You're welcome! I hope you're excited for the session. 😊",
    }
  ]);
  const [input, setInput] = useState("");
  const inputLength = input.trim().length;

  return (
    <>
      <Card className="h-[calc(100vh-70px)] flex flex-col">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Aashish Panthi</p>
            </div>
          </div> 
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 mt-5">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: input,
                },
              ]);
              setInput("");
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 h-[50px]"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              disabled={inputLength === 0}
              className="h-[50px] w-[50px] flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}

export default Message;
