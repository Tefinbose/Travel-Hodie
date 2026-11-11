
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export interface AdminSession {
  userId: string;
  name: string;
  email: string;
  role: "ADMIN";
}

export async function createAdminToken(
  admin: AdminSession
) {
  return new SignJWT({
    name: admin.name,
    email: admin.email,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.userId)
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("travelhodie_admin")?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);

    if (
      !payload.sub ||
      !payload.name ||
      !payload.email ||
      payload.role !== "ADMIN"
    ) {
      return null;
    }

    return {
      userId: payload.sub,
      name: String(payload.name),
      email: String(payload.email),
      role: "ADMIN",
    };
  } catch {
    return null;
  }
}
