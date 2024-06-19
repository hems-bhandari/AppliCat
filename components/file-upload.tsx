import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ImageUploadProps {
    onChange?: any;
    value: UploadFileResponse;
}

const { UploadDropzone } = generateComponents<OurFileRouter>();

export default function FileUpload({
    onChange,
    value,
}: ImageUploadProps) {
    const { toast } = useToast();

    // since only one file is permitted
    const onDeleteFile = () => {
        onChange();
    };

    const onUpdateFile = (newFile: UploadFileResponse[]) => {
        onChange(...newFile);
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {!!value &&
                    <div
                        key={value.key}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onDeleteFile()}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={value.url || ""}
                            />
                        </div>
                    </div>
                }
            </div>
            <div>
                {!value && <UploadDropzone
                    className="dark:bg-zinc-800 py-2 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
                    endpoint="imageUploader"
                    config={{ mode: "auto" }}
                    content={{
                        allowedContent({ isUploading }) {
                            if (isUploading)
                                return (
                                    <>
                                        <p className="mt-2 text-sm text-slate-400 animate-pulse">
                                            Uploading Image ...
                                        </p>
                                    </>
                                );
                        },
                    }}
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        const data: UploadFileResponse[] | undefined = res;
                        if (data) {
                            onUpdateFile(data);
                        }
                    }}
                    onUploadError={(error: Error) => {
                        toast({
                            title: "Error",
                            variant: "destructive",
                            description: error.message,
                        });
                    }}
                />}
            </div>
        </div>
    );
}
