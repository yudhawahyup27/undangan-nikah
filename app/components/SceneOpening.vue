<!-- components/PageOpening.vue -->
<template>
  <div class="page-opening">
    <div class="page-inner">
      <!-- Ornament Top -->
      <div class="ornament-top">
        <svg class="w-20 h-20 text-pink-400 opacity-30" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
        </svg>
      </div>

      <!-- Bismillah -->
      <div class="bismillah-section">
        <div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <p class="bismillah-translate">Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
      </div>
      
      <!-- Greeting -->
      <div class="greeting-section">
        <h2 class="page-title">Assalamualaikum Warahmatullahi Wabarakatuh</h2>
        <div class="divider-line">
          <span class="divider-ornament">❦</span>
        </div>
      </div>
      
      <!-- Quran Verse -->
      <div class="quran-section">
        <div class="quran-icon">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <p class="quran-text">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
        </p>
        <p class="quran-source">(QS. Ar-Rum: 21)</p>
      </div>

      <!-- Invitation Message -->
      <div class="invitation-message">
        <p class="message-line">Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala,</p>
        <p class="message-line">kami bermaksud mengundang</p>
        <p class="message-line highlight">Bapak/Ibu/Saudara/i</p>
      </div>

      <!-- Guest Name Section -->
      <div class="guest-name-section">
        <div class="guest-label">Kepada Yth:</div>
        <div class="guest-name-card">
          <div class="card-decoration top-left"></div>
          <div class="card-decoration top-right"></div>
          <div class="card-decoration bottom-left"></div>
          <div class="card-decoration bottom-right"></div>
          
          <div class="guest-name">{{ guestName }}</div>
          <div class="guest-address">{{ guestAddress }}</div>
        </div>
      </div>

      <!-- Continue Message -->
      <div class="continue-message">
        <p class="message-line">untuk hadir dan memberikan doa restu</p>
        <p class="message-line">pada pernikahan putra-putri kami</p>
      </div>

      <!-- Couple Names -->
      <div class="couple-names-section">
        <div class="couple-box">
          <div class="couple-photo-frame">
            <div class="photo-inner">
              <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <h3 class="couple-main-name">Yudha</h3>
          <p class="couple-full-name">Yudha Wahyu Pratama </p>
          <p class="couple-detail">Putra pertama dari</p>
          <p class="couple-parents">Bapak Harso Udiono<br/>& Ibu Luluk Yunita</p>
        </div>
        
        <div class="couple-divider">
          <div class="divider-circle">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <span class="divider-text">&</span>
        </div>
        
        <div class="couple-box">
          <div class="couple-photo-frame">
            <div class="photo-inner">
              <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <h3 class="couple-main-name">Ima </h3>
          <p class="couple-full-name">Nur Kotimah</p>
          <p class="couple-detail">Putri kedua dari</p>
          <p class="couple-parents">Bapak Wakiran<br/>& Ibu Gemi</p>
        </div>
      </div>

      <!-- Closing Message -->
      <div class="closing-message">
        <div class="closing-box">
          <p class="closing-text">Merupakan suatu kehormatan dan kebahagiaan bagi kami</p>
          <p class="closing-text">apabila Bapak/Ibu/Saudara/i berkenan hadir</p>
          <p class="closing-text">untuk memberikan doa restu kepada kedua mempelai</p>
        </div>
      </div>

      <!-- Ornament Bottom -->
      <div class="ornament-bottom">
        <div class="ornament-flourish">✦ ❦ ✦</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Guest name bisa diambil dari URL parameter atau props
const guestName = ref('Bapak/Ibu/Saudara/i')
const guestAddress = ref('Di Tempat')

onMounted(() => {
  // Cek URL parameter untuk nama tamu
  const urlParams = new URLSearchParams(window.location.search)
  const nama = urlParams.get('nama')
  const alamat = urlParams.get('alamat')
  
  if (nama) {
    guestName.value = decodeURIComponent(nama)
  }
  if (alamat) {
    guestAddress.value = decodeURIComponent(alamat)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Amiri:wght@400;700&family=Great+Vibes&display=swap');

.page-opening {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(249, 168, 212, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #ffffff 0%, #fef3f8 100%);
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.page-opening::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent);
}

.page-inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
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

/* Ornaments */
.ornament-top {
  margin-bottom: 30px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Bismillah Section */
.bismillah-section {
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(249, 168, 212, 0.03));
  border-radius: 20px;
  border: 1px solid rgba(236, 72, 153, 0.1);
}

.bismillah {
  font-family: 'Amiri', serif;
  font-size: 2.2rem;
  color: #db2777;
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.bismillah-translate {
  font-size: 0.95rem;
  color: #718096;
  font-style: italic;
  line-height: 1.6;
}

/* Greeting Section */
.greeting-section {
  margin-bottom: 40px;
}

.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #be185d;
  margin-bottom: 25px;
  line-height: 1.6;
}

.divider-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.divider-line::before,
.divider-line::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.3), transparent);
}

.divider-ornament {
  font-size: 1.8rem;
  color: #ec4899;
  animation: pulse-ornament 3s ease-in-out infinite;
}

@keyframes pulse-ornament {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* Quran Section */
.quran-section {
  margin-bottom: 50px;
  padding: 40px 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(236, 72, 153, 0.08);
  border-left: 4px solid #ec4899;
  position: relative;
}

.quran-icon {
  color: #ec4899;
  margin-bottom: 20px;
}

.quran-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  line-height: 2;
  color: #4a5568;
  font-style: italic;
  margin-bottom: 15px;
  text-align: justify;
}

.quran-source {
  font-size: 1rem;
  color: #718096;
  font-weight: 600;
  margin-top: 15px;
}

/* Invitation Message */
.invitation-message {
  margin-bottom: 40px;
}

.message-line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: #4a5568;
  line-height: 2;
  margin: 8px 0;
}

.message-line.highlight {
  font-weight: 700;
  color: #be185d;
  font-size: 1.4rem;
}

/* Guest Name Section */
.guest-name-section {
  margin: 50px 0;
}

.guest-label {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.guest-name-card {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%);
  padding: 40px 30px;
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(236, 72, 153, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  animation: glow-card 3s ease-in-out infinite;
}

@keyframes glow-card {
  0%, 100% {
    box-shadow: 
      0 20px 60px rgba(236, 72, 153, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 
      0 25px 70px rgba(236, 72, 153, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
}

.card-decoration {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.card-decoration.top-left {
  top: 15px;
  left: 15px;
  border-right: none;
  border-bottom: none;
}

.card-decoration.top-right {
  top: 15px;
  right: 15px;
  border-left: none;
  border-bottom: none;
}

.card-decoration.bottom-left {
  bottom: 15px;
  left: 15px;
  border-right: none;
  border-top: none;
}

.card-decoration.bottom-right {
  bottom: 15px;
  right: 15px;
  border-left: none;
  border-top: none;
}

.guest-name {
  font-family: 'Great Vibes', cursive;
  font-size: 3rem;
  color: #be185d;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: text-glow 2s ease-in-out infinite;
}

@keyframes text-glow {
  0%, 100% {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  50% {
    text-shadow: 2px 2px 8px rgba(190, 24, 93, 0.3);
  }
}

.guest-address {
  font-size: 1.1rem;
  color: #db2777;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Continue Message */
.continue-message {
  margin-bottom: 50px;
}

/* Couple Names Section */
.couple-names-section {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 30px;
  align-items: center;
  margin: 60px 0;
}

.couple-box {
  background: white;
  padding: 40px 25px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(236, 72, 153, 0.1);
  transition: all 0.3s ease;
}

.couple-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(236, 72, 153, 0.15);
}

.couple-photo-frame {
  width: 120px;
  height: 120px;
  margin: 0 auto 25px;
  padding: 5px;
  background: linear-gradient(135deg, #ec4899, #f9a8d4);
  border-radius: 50%;
  animation: rotate-gradient 8s linear infinite;
}

@keyframes rotate-gradient {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.photo-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.couple-main-name {
  font-family: 'Great Vibes', cursive;
  font-size: 2.2rem;
  color: #be185d;
  margin-bottom: 8px;
}

.couple-full-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: #db2777;
  font-weight: 600;
  margin-bottom: 15px;
}

.couple-detail {
  font-size: 0.95rem;
  color: #718096;
  margin-bottom: 8px;
}

.couple-parents {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  color: #4a5568;
  line-height: 1.8;
  font-weight: 600;
}

.couple-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.divider-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ec4899, #db2777);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 24px rgba(236, 72, 153, 0.3);
  animation: heart-beat 2s ease-in-out infinite;
}

@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
}

.divider-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  color: #ec4899;
  font-weight: 300;
}

/* Closing Message */
.closing-message {
  margin: 50px 0;
}

.closing-box {
  padding: 30px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.03), rgba(249, 168, 212, 0.03));
  border-radius: 20px;
  border: 1px solid rgba(236, 72, 153, 0.1);
}

.closing-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #4a5568;
  line-height: 2;
  margin: 5px 0;
}

/* Ornament Bottom */
.ornament-bottom {
  margin-top: 40px;
}

.ornament-flourish {
  font-size: 1.8rem;
  color: #ec4899;
  letter-spacing: 0.5em;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .page-opening {
    padding: 40px 15px;
  }
  
  .bismillah {
    font-size: 1.8rem;
  }
  
  .page-title {
    font-size: 1.6rem;
  }
  
  .quran-section {
    padding: 30px 20px;
  }
  
  .quran-text {
    font-size: 1.1rem;
    text-align: center;
  }
  
  .message-line {
    font-size: 1.15rem;
  }
  
  .guest-name-card {
    padding: 30px 20px;
  }
  
  .guest-name {
    font-size: 2.5rem;
  }
  
  .couple-names-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .couple-divider {
    flex-direction: row;
    order: -1;
  }
  
  .divider-text {
    font-size: 2.5rem;
  }
  
  .couple-box {
    padding: 30px 20px;
  }
  
  .couple-main-name {
    font-size: 2rem;
  }
  
  .couple-full-name {
    font-size: 1rem;
  }
}
</style>