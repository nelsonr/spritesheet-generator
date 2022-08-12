import * as path from "https://deno.land/std@0.151.0/path/mod.ts";
import { generateSpriteSheet } from "../../../modules/spritesheet/spritesheet.ts";

type FilePath = string;

export const handler = async (req: Request): Promise<Response> => {
    let resp: FormData | null = null;

    const formData = await req.formData();
    const imageFiles = formData.getAll("images");

    if (imageFiles) {
        const imageFilePaths = await createTempFiles(imageFiles as File[]);
        const spritesheet = await generateSpriteSheet(imageFilePaths, "sprite");

        resp = new FormData();
        resp.append("css", spritesheet.css);
        resp.append("image", new Blob([spritesheet.image.buffer]));
    }

    return new Response(resp);
};

async function createTempFiles(files: File[]): Promise<FilePath[]> {
    const tempFilePaths = [];
    const tempDirPath = await Deno.makeTempDir();

    for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const tempFilePath = path.join(tempDirPath, file.name);

        await Deno.writeFile(tempFilePath, new Uint8Array(fileBuffer));
        tempFilePaths.push(tempFilePath);
    }

    return tempFilePaths;
}
