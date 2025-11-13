import dotenv from 'dotenv'
dotenv.config()

console.log('=== ENV TEST ===')
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID)
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET)
console.log('MONGODB_URI:', process.env.MONGODB_URI)
console.log('CWD:', process.cwd())
