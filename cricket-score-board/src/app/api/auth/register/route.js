import  connectDB  from '@/app/utils/db';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    await connectDB();
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(password,hashedPassword);
    

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
}
