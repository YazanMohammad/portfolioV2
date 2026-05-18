import { Router } from "express";
import { db } from "@workspace/db";
import { eq } from "drizzle-orm";
import * as schema from "@workspace/db/schema";

export const portfolioRouter = Router();

// A generic factory for simple CRUD
function buildCrudRouter(tableName: keyof typeof schema, tableObj: any, insertSchema: any) {
  const router = Router();
  router.get("/", async (req, res) => {
    try {
      const data = await db.select().from(tableObj);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const validatedData = insertSchema.parse(req.body);
      const result = await db.insert(tableObj).values(validatedData).returning();
      res.status(201).json(result[0]);
    } catch (e: any) {
      res.status(400).json({ error: e.message || "Invalid data" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const validatedData = insertSchema.partial().parse(req.body);
      const result = await db.update(tableObj).set(validatedData).where(eq(tableObj.id, parseInt(req.params.id))).returning();
      res.json(result[0]);
    } catch (e: any) {
      res.status(400).json({ error: e.message || "Invalid data" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await db.delete(tableObj).where(eq(tableObj.id, parseInt(req.params.id)));
      res.status(204).send();
    } catch (e) {
      res.status(500).json({ error: "Failed to delete" });
    }
  });

  return router;
}

portfolioRouter.use("/projects", buildCrudRouter("projects", schema.projects, schema.insertProjectSchema));
portfolioRouter.use("/skills", buildCrudRouter("skills", schema.skills, schema.insertSkillSchema));
portfolioRouter.use("/experience", buildCrudRouter("experience", schema.experience, schema.insertExperienceSchema));
portfolioRouter.use("/education", buildCrudRouter("education", schema.education, schema.insertEducationSchema));
portfolioRouter.use("/messages", buildCrudRouter("messages", schema.messages, schema.insertMessageSchema));
portfolioRouter.use("/testimonials", buildCrudRouter("testimonials", schema.testimonials, schema.insertTestimonialSchema));
portfolioRouter.use("/blog", buildCrudRouter("blogPosts", schema.blogPosts, schema.insertBlogPostSchema));
portfolioRouter.use("/settings", buildCrudRouter("settings", schema.settings, schema.insertSettingSchema));
