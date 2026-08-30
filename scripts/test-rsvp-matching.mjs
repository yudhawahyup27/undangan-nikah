#!/usr/bin/env node

/**
 * Test RSVP status matching with guest name
 */

const BASE_URL = 'http://localhost:3001'

async function testRsvpMatching() {
  try {
    console.log('📋 Testing RSVP Status Matching...\n')
    
    // Fetch all RSVP entries
    console.log('1️⃣  Fetching all RSVP entries...')
    const rsvpResponse = await fetch(`${BASE_URL}/api/rsvp`)
    const allEntries = await rsvpResponse.json()
    console.log(`   Found ${allEntries.length} entries`)
    if (allEntries.length > 0) {
      allEntries.forEach((entry, i) => {
        console.log(`   [${i}] ${entry.name} - Attending: ${entry.attending} (ID: ${entry.id.substring(0, 8)}...)`)
      })
    }
    console.log()
    
    // Test with diaz-sma slug
    console.log('2️⃣  Testing status lookup for slug: diaz-sma')
    const statusResponse = await fetch(`${BASE_URL}/api/rsvp-status?slug=diaz-sma`)
    if (statusResponse.ok) {
      const statusData = await statusResponse.json()
      console.log(`   ✅ Found status:`)
      console.log(`      ID: ${statusData.id?.substring(0, 8) || 'N/A'}...`)
      console.log(`      Name: ${statusData.name}`)
      console.log(`      Attending: ${statusData.attending}`)
      
      if (statusData.attending === true) {
        console.log(`      → Should show: PHOTO BOOTH\n`)
      } else if (statusData.attending === false) {
        console.log(`      → Should show: MEMORY BOOTH\n`)
      } else {
        console.log(`      → Should show: RSVP FORM\n`)
      }
    } else {
      console.log(`   ❌ Failed to fetch status`)
    }
    
    // Test guest lookup
    console.log('3️⃣  Testing guest lookup for slug: diaz-sma')
    const guestResponse = await fetch(`${BASE_URL}/api/guests?slug=diaz-sma`)
    if (guestResponse.ok) {
      const guestData = await guestResponse.json()
      console.log(`   ✅ Found guest:`)
      console.log(`      Name: ${guestData.name}`)
      console.log(`      Slug: ${guestData.slug}`)
      console.log(`      Code: ${guestData.code}`)
    }
    
    console.log('\n✨ All tests completed!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testRsvpMatching()
