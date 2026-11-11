
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAdminToken } from "@/lib/auth";
import { compare } from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email and password.",
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const admin = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (
      !admin ||
      admin.role !== "ADMIN" ||
      !admin.isActive
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const passwordMatches = await compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const token = await createAdminToken({
      userId: admin.id,
      name: admin.name,
      email: admin.email,
      role: "ADMIN",
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful.",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });

    response.cookies.set("travelhodie_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process login.",
      },
      { status: 500 }
    );
  }
}
