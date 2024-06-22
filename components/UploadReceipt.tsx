"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 5000000;

const confirmationSchema = z.object({
    image: z
        .any()
        .refine((file) => {
            return file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`
        }),
    email: z.string().email({ message: "Invalid email" }),
});

export type ConfirmationFormValues = z.infer<typeof confirmationSchema>;

const UploadReceipt = ({
    handleSubmit,
    children,
}: {
    handleSubmit: (data: ConfirmationFormValues) => void;
    children?: React.ReactNode;
}) => {
    const defaultValues = {
        email: "",
        imgUrl: "",
    };

    const form = useForm<ConfirmationFormValues>({
        resolver: zodResolver(confirmationSchema),
        defaultValues,
        mode: "onChange",
    });

    return (
        <div className="w-full h-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full h-full"
                >
                    <div className="w-full min-w-[400px] max-w-[500px] mx-auto h-[calc(100%-58px)]">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Upload receipt</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="applicat@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-auto">{children}</div>
                </form>
            </Form>
        </div>
    );
};

export default UploadReceipt;
