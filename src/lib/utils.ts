import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function playPurchaseSound() {
  if (typeof window !== 'undefined' && window.AudioContext) {
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configuração do som (simula um "ca-ching")
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.1); // C6

    oscillator.start(audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.15);
    oscillator.stop(audioContext.currentTime + 0.15);
  }
}
