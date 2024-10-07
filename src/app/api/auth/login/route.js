import connectDB from "@/libs/mongodb";
import user from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const { username, password } = await data;

    // Verificar si el usuario existe
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Comparar la contraseña encriptada con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Si la contraseña coincide, autenticar al usuario (aquí podrías crear un token, etc.)
    return NextResponse.json({
      message: "Login successful",
      user: existingUser,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
