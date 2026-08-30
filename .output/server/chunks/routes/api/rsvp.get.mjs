globalThis.__timing__.logStart('Load chunks/routes/api/rsvp.get');import { c as defineEventHandler, p as listRsvpEntries } from '../../_/nitro.mjs';
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

const rsvp_get = defineEventHandler(async () => {
  try {
    return await listRsvpEntries();
  } catch (error) {
    console.error("[rsvp.get]", error);
    return [];
  }
});

export { rsvp_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/rsvp.get');
//# sourceMappingURL=rsvp.get.mjs.map
