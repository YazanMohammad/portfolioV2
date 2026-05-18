import { Router } from "express";
import { db, users } from "@workspace/db";
import { eq } from "drizzle-orm";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  try {
    const adminUsers = await db.select().from(users).where(eq(users.username, "admin")).limit(1);

    // We expect an admin user to exist in the database with the username "admin"
    if (adminUsers.length > 0 && adminUsers[0].password === password) {
      // In a real application, you'd generate a JWT token here
      return res.json({ success: true, token: "admin_token" });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error" });
  }
});
