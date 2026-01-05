<!-- components/PageEnding.vue -->
<template>
  <div class="page-ending">
    <div class="page-inner">
      <!-- Header Section -->
      <div class="ending-header">
        <h2 class="page-title">Konfirmasi Kehadiran</h2>
        <div class="divider-ornament">✦ ❦ ✦</div>
        <p class="subtitle-text">Silakan konfirmasi kehadiran Anda melalui chat room di bawah ini</p>
      </div>

      <!-- Chat Room RSVP -->
      <div class="chat-container">
        <div class="chat-header">
          <div class="chat-header-left">
            <div class="couple-avatar">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="chat-info">
              <h3 class="chat-title">Yudha & Ima</h3>
              <p class="chat-status">Wedding RSVP</p>
            </div>
          </div>
          <div class="online-indicator">
            <span class="online-dot"></span>
            <span>Online</span>
          </div>
        </div>

        <div class="chat-messages" ref="messagesContainer">
          <!-- Bot Welcome Message -->
          <div class="message bot-message">
            <div class="message-avatar">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="message-content">
              <p class="message-text">Halo! Terima kasih telah membuka undangan kami 💕</p>
              <span class="message-time">Baru saja</span>
            </div>
          </div>

          <div class="message bot-message">
            <div class="message-avatar">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="message-content">
              <p class="message-text">Untuk konfirmasi kehadiran, silakan tulis nama Anda dan pilih status kehadiran di bawah ini 👇</p>
              <span class="message-time">Baru saja</span>
            </div>
          </div>

          <!-- User Messages -->
          <div v-for="(msg, index) in userMessages" :key="index" class="message user-message">
            <div class="message-content">
              <p class="message-text">{{ msg.text }}</p>
              <span class="message-time">{{ msg.time }}</span>
            </div>
          </div>

          <!-- Response Messages -->
          <div v-if="showResponse" class="message bot-message">
            <div class="message-avatar">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="message-content">
              <p class="message-text">{{ responseMessage }}</p>
              <span class="message-time">Baru saja</span>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="chat-input-area">
          <div v-if="!rsvpSubmitted" class="rsvp-form">
            <input 
              v-model="guestName" 
              type="text" 
              placeholder="Masukkan nama Anda..."
              class="name-input"
              @keyup.enter="submitRSVP"
            />
            <div class="attendance-buttons">
              <button @click="submitRSVP('hadir')" class="attendance-btn yes">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Hadir</span>
              </button>
              <button @click="submitRSVP('berhalangan')" class="attendance-btn no">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Berhalangan</span>
              </button>
            </div>
          </div>

          <div v-else class="chat-input">
            <input 
              v-model="newMessage" 
              type="text" 
              placeholder="Tulis ucapan & doa untuk kami..."
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage" class="send-btn">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Gift Section -->
      <div class="gift-section">
        <h3 class="gift-title">Wedding Gift 🎁</h3>
        <p class="gift-text">Tanpa mengurangi rasa hormat, bagi yang ingin memberikan tanda kasih, dapat melalui:</p>
        <div class="gift-cards">
          <div class="gift-card">
            <div class="bank-logo">
              <svg class="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </div>
            <p class="gift-bank">Bank BCA</p>
            <p class="gift-number">1234567890</p>
            <p class="gift-name">a.n. Yudha Wahyu P</p>
            <button @click="copyBankNumber('1234567890')" class="gift-copy">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>{{ copied ? 'Tersalin!' : 'Salin' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="ending-footer">
        <p class="footer-text">Merupakan suatu kehormatan dan kebahagiaan bagi kami<br/>apabila Bapak/Ibu/Saudara/i berkenan hadir</p>
        <div class="couple-names">
          <p class="names">Yudha & Ima</p>
          <p class="families">Beserta Keluarga</p>
        </div>
        <div class="footer-heart">
          <svg class="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <p class="wassalam">Wassalamualaikum Wr. Wb.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const guestName = ref('')
const newMessage = ref('')
const userMessages = ref([])
const rsvpSubmitted = ref(false)
const showResponse = ref(false)
const responseMessage = ref('')
const copied = ref(false)
const messagesContainer = ref(null)

const submitRSVP = (status) => {
  if (!guestName.value.trim()) {
    alert('Mohon masukkan nama Anda terlebih dahulu')
    return
  }

  const statusText = status === 'hadir' ? 'Saya akan hadir' : 'Maaf, saya berhalangan hadir'
  
  userMessages.value.push({
    text: `Nama: ${guestName.value}`,
    time: getCurrentTime()
  })
  
  setTimeout(() => {
    userMessages.value.push({
      text: statusText,
      time: getCurrentTime()
    })
    
    setTimeout(() => {
      showResponse.value = true
      if (status === 'hadir') {
        responseMessage.value = `Terima kasih ${guestName.value}! Kami sangat senang Anda bisa hadir. Sampai jumpa di hari bahagia kami! 🎉💕`
      } else {
        responseMessage.value = `Terima kasih ${guestName.value} atas konfirmasinya. Kami mengerti dan tetap menghargai perhatian Anda. Doa Anda sangat berarti bagi kami 🙏💕`
      }
      rsvpSubmitted.value = true
      scrollToBottom()
    }, 800)
  }, 500)
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  userMessages.value.push({
    text: newMessage.value,
    time: getCurrentTime()
  })
  
  newMessage.value = ''
  
  setTimeout(() => {
    showResponse.value = true
    responseMessage.value = 'Terima kasih atas ucapan dan doanya! Semoga Allah SWT membalas kebaikan Anda 🤲💕'
    scrollToBottom()
    
    setTimeout(() => {
      showResponse.value = false
    }, 3000)
  }, 1000)
}

const copyBankNumber = (number) => {
  navigator.clipboard.writeText(number).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&display=swap');

.page-ending {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff 0%, #fef3f8 100%);
  padding: 60px 20px;
}

.page-inner {
  max-width: 800px;
  margin: 0 auto;
  animation: fade-in-up 1s ease-out;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ending-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #be185d;
  margin-bottom: 20px;
}

.divider-ornament {
  font-size: 1.5rem;
  color: #ec4899;
  letter-spacing: 1em;
  margin: 20px 0;
  opacity: 0.7;
}

.subtitle-text {
  font-size: 1.1rem;
  color: #718096;
}

/* Chat Container */
.chat-container {
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(236, 72, 153, 0.15);
  overflow: hidden;
  margin-bottom: 60px;
}

.chat-header {
  background: linear-gradient(135deg, #ec4899, #db2777);
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.couple-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.chat-info {
  text-align: left;
}

.chat-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}

.chat-status {
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0;
}

.online-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.online-dot {
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
}

.chat-messages {
  padding: 30px 25px;
  max-height: 500px;
  overflow-y: auto;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #ec4899;
  border-radius: 10px;
}

.message {
  display: flex;
  gap: 12px;
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bot-message {
  align-self: flex-start;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #db2777);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.message-content {
  max-width: 70%;
}

.bot-message .message-content {
  background: white;
  padding: 15px 20px;
  border-radius: 0 18px 18px 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.user-message .message-content {
  background: linear-gradient(135deg, #ec4899, #db2777);
  color: white;
  padding: 15px 20px;
  border-radius: 18px 0 18px 18px;
}

.message-text {
  margin: 0 0 8px;
  line-height: 1.6;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* Chat Input */
.chat-input-area {
  padding: 20px 25px;
  border-top: 1px solid #f0f0f0;
  background: white;
}

.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.name-input {
  padding: 15px 20px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.name-input:focus {
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}

.attendance-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.attendance-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.attendance-btn.yes {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.attendance-btn.yes:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
}

.attendance-btn.no {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.attendance-btn.no:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
}

.chat-input {
  display: flex;
  gap: 12px;
}

.chat-input input {
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #f0f0f0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.chat-input input:focus {
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
}

.send-btn {
  width: 50px;
  height: 50px;
  border: none;
  background: linear-gradient(135deg, #ec4899, #db2777);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
}

/* Gift Section */
.gift-section {
  background: white;
  padding: 50px 40px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(236, 72, 153, 0.1);
  text-align: center;
  margin-bottom: 60px;
}

.gift-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #be185d;
  margin-bottom: 15px;
}

.gift-text {
  color: #718096;
  margin-bottom: 30px;
  line-height: 1.6;
}

.gift-cards {
  display: flex;
  justify-content: center;
}

.gift-card {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  padding: 40px;
  border-radius: 20px;
  max-width: 400px;
}

.bank-logo {
  margin-bottom: 20px;
}

.gift-bank {
  font-size: 1.3rem;
  font-weight: 700;
  color: #be185d;
  margin-bottom: 15px;
}

.gift-number {
  font-family: 'Courier New', monospace;
  font-size: 1.8rem;
  font-weight: 700;
  color: #4a5568;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.gift-name {
  color: #718096;
  margin-bottom: 20px;
}

.gift-copy {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #ec4899, #db2777);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gift-copy:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
}

/* Footer */
.ending-footer {
  text-align: center;
  padding: 40px 20px;
}

.footer-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 2;
  margin-bottom: 40px;
}

.couple-names {
  margin-bottom: 30px;
}

.names {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #be185d;
  margin-bottom: 10px;
}

.families {
  font-size: 1.2rem;
  color: #718096;
}

.footer-heart {
  margin: 30px 0;
  animation: heart-beat 2s ease-in-out infinite;
}

@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
}

.wassalam {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: #718096;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .page-ending {
    padding: 40px 15px;
  }
  
  .page-title {
    font-size: 2.2rem;
  }
  
  .chat-header {
    padding: 15px 20px;
  }
  
  .couple-avatar {
    width: 40px;
    height: 40px;
  }
  
  .chat-title {
    font-size: 1.1rem;
  }
  
  .chat-messages {
    padding: 20px 15px;
    max-height: 400px;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .attendance-buttons {
    grid-template-columns: 1fr;
  }
  
  .gift-section {
    padding: 30px 20px;
  }
  
  .gift-card {
    padding: 30px 20px;
  }
  
  .gift-number {
    font-size: 1.4rem;
  }
}
</style>