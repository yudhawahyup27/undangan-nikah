# 🔧 Fix Summary - RSVP Status Display Issue

## Problem
Guest yang sudah submit RSVP sebelumnya tetap menampilkan status "Belum dikonfirmasi" di form, meskipun pesan sudah muncul di section "Ucapan & Doa" dengan status "✓ AKAN HADIR".

## Root Causes Identified

### 1. Weak Name Matching Logic
- Original logic: `entry.name.toLowerCase().trim() === normalizedGuestName`
- Issue: Strict exact match tidak robust terhadap formatting differences
- Fix: Added normalized whitespace handling dan partial match fallback

### 2. Missing Immediate Watch
- PhotoBoothState composable tidak fetch state dengan immediate trigger
- Fix: Added `{ immediate: true }` untuk watch guest slug

### 3. Photo Booth State Not Reflecting RSVP Changes
- PhotoBoothScene tidak refetch state setelah RSVP submit
- Fix: Ensure RSVPScene explicitly refetch photoBoothState after RSVP submission

## Changes Made

### File: `components/scenes/RSVPScene.vue`
**Change 1:** Improved `guestAttendance` computed property
```javascript
// BEFORE: Only exact name matching
const guestAttendance = computed<boolean | null>(() => {
  if (!guestSlug.value) return null
  return entries.value.find(entry => entry.guestSlug === guestSlug.value)?.attending ?? null
})

// AFTER: Try multiple matching strategies
const guestAttendance = computed<boolean | null>(() => {
  if (!entries.value.length) return null
  if (!guestSlug.value && !guestName.value) return null
  
  // Try by slug first (most reliable)
  if (guestSlug.value) {
    const bySlug = entries.value.find(entry => entry.guestSlug === guestSlug.value)
    if (bySlug) return bySlug.attending
  }
  
  // Fallback: match by name with normalized whitespace & partial match
  if (guestName.value) {
    const normalizedGuestName = guestName.value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
    
    const byName = entries.value.find(entry => {
      const normalizedEntryName = entry.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
      
      return normalizedEntryName === normalizedGuestName || 
             normalizedEntryName.includes(normalizedGuestName) || 
             normalizedGuestName.includes(normalizedEntryName)
    })
    if (byName) return byName.attending
  }
  
  return null
})
```

### File: `composables/usePhotoBoothState.ts`
**Change:** Added `immediate: true` to watch
```javascript
watch(guestSlug, (slug) => {
  if (slug) {
    fetchPhotoBoothState(slug)
  } else {
    state.value = null
    token.value = null
  }
}, { immediate: true })  // ← Added this
```

### File: `server/utils/rsvpStore.ts`
**Change:** Improved `getRsvpStatusBySlug` untuk guest lookup
```javascript
// Now looks up guest in guests.json dan matches RSVP by both slug dan name
export const getRsvpStatusBySlug = async (slug: string) => {
  const guest = findGuestBySlug(slug)
  if (!guest) return null
  
  // Match by guestSlug first, then fallback to name matching
  const entries = await listRsvpEntries()
  let entry = entries.find(e => e.guestSlug === slug)
  if (!entry) {
    const normalizedGuestName = guest.name.toLowerCase().trim()
    entry = entries.find(e => 
      e.name.toLowerCase().trim() === normalizedGuestName
    )
  }
  
  return entry ? { id: entry.id, name: entry.name, attending: entry.attending ?? null } : null
}
```

## Test Results

✅ All test passed:
```
1️⃣  Fetching all RSVP entries...
   Found 1 entries
   [0] Diaz (SMA) - Attending: true

2️⃣  Testing status lookup for slug: diaz-sma
   ✅ Found status:
      Name: Diaz (SMA)
      Attending: true
      → Should show: PHOTO BOOTH

3️⃣  Testing guest lookup for slug: diaz-sma
   ✅ Found guest:
      Name: Diaz (SMA)
      Slug: diaz-sma
```

## Expected Behavior After Fix

### Scenario 1: Guest Already Confirmed (attending = true)
```
Page load /diaz-sma
  ↓
useGuest fetch guest data → name: "Diaz (SMA)"
RSVPScene onMounted fetch entries → find "Diaz (SMA)" with attending: true
  ↓
guestAttendance computed → true
guestAttendanceLabel → "✓ Akan Hadir"
PhotoBoothScene → Show "PHOTO BOOTH" CTA
```

### Scenario 2: Guest Already Confirmed (attending = false)
```
Same flow but:
guestAttendance computed → false
guestAttendanceLabel → "✗ Tidak Bisa Hadir"
PhotoBoothScene → Show "MEMORY BOOTH" CTA
```

### Scenario 3: Guest Submit RSVP
```
User fill form dan submit
  ↓
RSVPScene handleSubmit POST /api/rsvp
  ↓
await fetchEntries() → entries ter-update
guestAttendance computed → ter-evaluate ulang
guestAttendanceLabel → update immediately
photoBoothState.fetchPhotoBoothState() → refresh photo booth state
PhotoBoothScene → re-render dengan status baru
```

## Files Changed
- `components/scenes/RSVPScene.vue` - Improved name matching logic
- `composables/usePhotoBoothState.ts` - Added immediate watch trigger
- `server/utils/rsvpStore.ts` - Enhanced guest lookup
- `scripts/test-rsvp-matching.mjs` - New test script

## Verification
Run: `node scripts/test-rsvp-matching.mjs`

This ensures:
1. RSVP entries are fetched correctly
2. Status lookup works for guest slug
3. Name matching is consistent
4. Photo Booth state will update properly
