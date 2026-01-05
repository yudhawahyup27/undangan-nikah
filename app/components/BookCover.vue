<!-- components/BookCover.vue -->
<template>
  <div class="book-cover" @click="handleOpen">
    <div class="book-spine"></div>
    <div class="cover-content">
      <!-- Top Ornament -->
      <div class="cover-ornament-top">
        <svg class="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
        </svg>
      </div>

      
      <!-- Title Section -->
      <div class="cover-title-section">
        <div class="decorative-line"></div>
        <p class="cover-pretext">Buku Cinta Kami</p>
        <h1 class="cover-title">Yudha & Ima</h1>
        <div class="cover-subtitle-wrapper">
          <span class="subtitle-ornament">❦</span>
          <h2 class="cover-subtitle">Wedding Invitation</h2>
          <span class="subtitle-ornament">❦</span>
        </div>
        <div class="decorative-line"></div>
           <div class="cover-middle">
        <p class="cover-quote">"Setiap halaman buku ini,<br/>adalah kisah perjalanan cinta kami<br/>yang akan kami kenang selamanya"</p>
        <div class="cover-date-box">
          <p class="date-number">10</p>
          <div class="date-separator"></div>
          <p class="date-month">Desember</p>
          <div class="date-separator"></div>
          <p class="date-year">2026</p>
        </div>
      </div>
      </div>

      <!-- Date & Quote -->
   

      <!-- Open Button -->
      <div class="cover-action">
        <div class="open-button">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span>Buka Buku Undangan</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
        <p class="tap-hint">Ketuk untuk membuka halaman pertama</p>
      </div>

      <!-- Bottom Ornament -->
      <div class="cover-ornament-bottom">
        <div class="ornament-flourish">✦ ❦ ✦</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['open'])

const handleOpen = () => {
  emit('open')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Great+Vibes&display=swap');

.book-cover {
  width: 900vw;
  max-width: 500px;
  height: 900vh;
  max-height: 100%;
  background: linear-gradient(135deg, #fdb8c6 0%, #fdb8c6 50%, #fdb8c6 100%);
  border-radius: 0 24px 24px 0;
  box-shadow: 
    -20px 0 60px rgba(0, 0, 0, 0.4),
    inset 10px 0 30px rgba(255, 255, 255, 0.1),
    0 0 0 3px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  z-index: 10;
  transform-origin: left center;
  animation: book-idle 4s ease-in-out infinite;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.book-cover:hover {
  transform: rotateY(-8deg) scale(1.02);
  box-shadow: 
    -30px 0 80px rgba(0, 0, 0, 0.5),
    inset 10px 0 40px rgba(255, 255, 255, 0.15);
}

@keyframes book-idle {
  0%, 100% { 
    transform: rotateY(0deg) translateZ(0);
  }
  50% { 
    transform: rotateY(-3deg) translateZ(15px);
  }
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0.4) 0%, 
    rgba(0, 0, 0, 0.2) 30%, 
    transparent 100%);
  border-left: 3px solid #9d174d;
}

.book-spine::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 60%;
  background: rgba(255, 255, 255, 0.1);
}

.cover-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
}

.cover-ornament-top {
  text-align: center;
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.cover-title-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.decorative-line {
  width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, white, transparent);
  margin: 0 auto 20px;
}

.cover-pretext {
  font-size: 1.2rem;
  letter-spacing: 0.3em;
  opacity: 0.9;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 300;
}

.cover-title {
  font-family: 'Great Vibes', cursive;
  font-size: 5rem;
  margin: 20px 0;
  text-shadow: 
    2px 2px 20px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(255, 255, 255, 0.3);
  animation: title-glow 3s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% { 
    text-shadow: 
      2px 2px 20px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(255, 255, 255, 0.2);
  }
  50% { 
    text-shadow: 
      2px 2px 30px rgba(0, 0, 0, 0.4),
      0 0 60px rgba(255, 255, 255, 0.4);
  }
}

.cover-subtitle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.subtitle-ornament {
  font-size: 1.5rem;
  opacity: 0.7;
}

.cover-subtitle {
  font-size: 1.4rem;
  letter-spacing: 0.4em;
  font-weight: 300;
  text-transform: uppercase;
}

.cover-middle {
  text-align: center;
  margin: 40px 0;
}

.cover-quote {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.95;
  margin-bottom: 30px;
  font-weight: 300;
}

.cover-date-box {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.15);
  padding: 20px 40px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.date-number {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
}

.date-month {
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 300;
}

.date-year {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
}

.date-separator {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.5);
}

.cover-action {
  text-align: center;
}

.open-button {
  display: inline-flex;
  align-items: center;
  padding: 18px 40px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50px;
  font-size: 1rem;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: pulse-button 2s ease-in-out infinite;
  margin-bottom: 15px;
}

@keyframes pulse-button {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
}

.open-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.tap-hint {
  font-size: 0.9rem;
  opacity: 0.8;
  animation: fade-in-out 2s ease-in-out infinite;
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.cover-ornament-bottom {
  text-align: center;
}

.ornament-flourish {
  font-size: 1.5rem;
  opacity: 0.6;
  letter-spacing: 0.5em;
}

/* Responsive */
@media (max-width: 768px) {
  .cover-content {
    padding: 40px 30px;
  }
  
  .cover-title {
    font-size: 3.5rem;
  }
  
  .cover-subtitle {
    font-size: 1.1rem;
  }
  
  .cover-quote {
    font-size: 1rem;
  }
  
  .cover-date-box {
    padding: 15px 30px;
  }
  
  .date-number,
  .date-year {
    font-size: 2rem;
  }
  
  .date-month {
    font-size: 1.1rem;
  }
  
  .open-button {
    padding: 15px 30px;
    font-size: 0.9rem;
  }
}
</style>