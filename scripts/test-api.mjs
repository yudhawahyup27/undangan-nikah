#!/usr/bin/env node

/**
 * Test the RSVP API endpoint
 */

const BASE_URL = 'http://localhost:3001'

async function testRsvpApi() {
  try {
    console.log('📋 Testing RSVP API endpoints...\n')
    
    // Test GET endpoint
    console.log('1️⃣  Testing GET /api/rsvp')
    const getResponse = await fetch(`${BASE_URL}/api/rsvp`)
    const getRsvpList = await getResponse.json()
    console.log(`   Status: ${getResponse.status}`)
    console.log(`   Entries found: ${Array.isArray(getRsvpList) ? getRsvpList.length : 0}`)
    if (getResponse.ok) {
      console.log('   ✅ GET endpoint working\n')
    } else {
      console.log('   ❌ GET endpoint failed\n')
    }
    
    // Test GET messages endpoint
    console.log('2️⃣  Testing GET /api/messages')
    const messagesResponse = await fetch(`${BASE_URL}/api/messages`)
    const messagesList = await messagesResponse.json()
    console.log(`   Status: ${messagesResponse.status}`)
    console.log(`   Messages found: ${Array.isArray(messagesList) ? messagesList.length : 0}`)
    if (messagesResponse.ok) {
      console.log('   ✅ Messages endpoint working\n')
    } else {
      console.log('   ❌ Messages endpoint failed\n')
    }
    
    // Test RSVP status endpoint with a test slug
    console.log('3️⃣  Testing GET /api/rsvp-status?slug=diaz-sma')
    const statusResponse = await fetch(`${BASE_URL}/api/rsvp-status?slug=diaz-sma`)
    console.log(`   Status: ${statusResponse.status}`)
    if (statusResponse.ok) {
      const statusData = await statusResponse.json()
      console.log(`   Response: ${JSON.stringify(statusData)}`)
      console.log('   ✅ RSVP status endpoint working\n')
    } else {
      console.log(`   Status text: ${statusResponse.statusText}\n`)
    }
    
    console.log('✨ All API tests completed!')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testRsvpApi()
