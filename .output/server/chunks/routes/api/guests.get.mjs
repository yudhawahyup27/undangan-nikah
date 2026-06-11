import { c as defineEventHandler, g as getQuery, f as findGuestByCode, e as createError, h as findGuestBySlug, i as findGuestByName, l as listGuests } from '../../_/nitro.mjs';
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

const guests_get = defineEventHandler((event) => {
  const query = getQuery(event);
  if (query.code) {
    const guest = findGuestByCode(String(query.code));
    if (!guest) {
      throw createError({ statusCode: 404, message: "Tamu tidak ditemukan" });
    }
    return guest;
  }
  if (query.slug) {
    const guest = findGuestBySlug(String(query.slug));
    if (!guest) {
      throw createError({ statusCode: 404, message: "Tamu tidak ditemukan" });
    }
    return guest;
  }
  if (query.to) {
    const guest = findGuestByName(String(query.to));
    if (!guest) {
      throw createError({ statusCode: 404, message: "Tamu tidak ditemukan" });
    }
    return guest;
  }
  return listGuests();
});

export { guests_get as default };
//# sourceMappingURL=guests.get.mjs.map
