import { c as defineEventHandler, r as readBody, e as createError, m as createRsvpEntry } from '../../_/nitro.mjs';
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
  try {
    const entry = await createRsvpEntry({
      name: body.name,
      attending: body.attending,
      message: body.message
    });
    return { success: true, data: entry };
  } catch (error) {
    console.error("[rsvp.post]", error);
    throw createError({ statusCode: 500, message: "Gagal menyimpan konfirmasi kehadiran" });
  }
});

export { rsvp_post as default };
//# sourceMappingURL=rsvp.post.mjs.map
