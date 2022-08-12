import { HandlerContext } from "$fresh/server.ts";
import { generateSpriteSheet } from "../../../modules/spritesheet/spritesheet.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
    const body = "Hello World";

    return new Response(body);
};
