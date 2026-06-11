import { c as defineEventHandler, n as listRsvpEntries } from '../../_/nitro.mjs';
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

const rsvp_get = defineEventHandler(async () => {
  try {
    return await listRsvpEntries();
  } catch (error) {
    console.error("[rsvp.get]", error);
    return [];
  }
});

export { rsvp_get as default };
//# sourceMappingURL=rsvp.get.mjs.map
