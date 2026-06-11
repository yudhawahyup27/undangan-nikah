import { ref } from 'vue'

const toastMessage = ref('')
const toastVisible = ref(false)

let hideTimer: ReturnType<typeof setTimeout> | null = null

export const useToast = () => {
  const show = (msg: string, duration = 2500) => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }

    toastMessage.value = msg
    toastVisible.value = true

    hideTimer = setTimeout(() => {
      toastVisible.value = false
      hideTimer = null
    }, duration)
  }

  const hide = () => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    toastVisible.value = false
  }

  return { toastMessage, toastVisible, show, hide }
}
