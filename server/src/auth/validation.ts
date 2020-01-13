import bcrypt from 'bcryptjs'

export const isPasswordValid = (eventPassword: string, userPassword: string) =>
  bcrypt
    .compare(eventPassword, userPassword)
    .then(() => true)
    .catch(() => false)