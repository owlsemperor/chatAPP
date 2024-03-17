import mongoose from 'mongoose'
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI)

    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to database', error.message)
  }
}
export default connectToDB
