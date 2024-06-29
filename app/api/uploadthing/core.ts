import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// TODO: To add a valid auth check before upload 

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(async () => {
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
