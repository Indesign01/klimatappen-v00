export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Lösenordet måste vara minst 8 tecken');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Lösenordet måste innehålla minst en stor bokstav');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Lösenordet måste innehålla minst en siffra');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}