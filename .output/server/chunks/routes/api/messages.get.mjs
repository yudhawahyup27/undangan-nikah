import { c as defineEventHandler, j as listMessageEntries } from '../../_/nitro.mjs';
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

const messages_get = defineEventHandler(async () => {
  try {
    return await listMessageEntries();
  } catch (error) {
    console.error("[messages.get]", error);
    return [];
  }
});

export { messages_get as default };
//# sourceMappingURL=messages.get.mjs.map
