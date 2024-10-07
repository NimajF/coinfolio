import connectDB from "@/libs/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // Intentar conectar a la base de datos
    await connectDB();

    const data = await req.json();

    // Verificar que todos los campos requeridos estén presentes
    const { username, email, password } = data;
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully", newUser });
  } catch (error) {
    // Captura y muestra cualquier error
    console.error("Error fetching users:", error);

    // Devolver un mensaje de error 500 en la respuesta
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
