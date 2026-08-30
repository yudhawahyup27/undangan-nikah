globalThis.__timing__.logStart('Load chunks/routes/api/rsvp.post');import { c as defineEventHandler, r as readBody, e as createError, q as createRsvpEntry, v as getErrorMessage } from '../../_/nitro.mjs';
import 'crypto';
import 'fs/promises';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const rsvp_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.name) || body.attending === void 0) {
    throw createError({ statusCode: 400, message: "Name and attending status are required" });
  }
  if (typeof body.name !== "string" || typeof body.attending !== "boolean") {
    throw createError({ statusCode: 400, message: "Data konfirmasi tidak valid" });
  }
  try {
    const entry = await createRsvpEntry({
      name: body.name,
      attending: body.attending,
      message: body.message,
      guestSlug: typeof body.guestSlug === "string" ? body.guestSlug : void 0
    });
    return { success: true, data: entry };
  } catch (error) {
    console.error("[rsvp.post]", error);
    throw createError({
      statusCode: 500,
      message: getErrorMessage(error)
    });
  }
});

export { rsvp_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/rsvp.post');
//# sourceMappingURL=rsvp.post.mjs.map
