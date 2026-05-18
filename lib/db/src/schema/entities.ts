import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  technologies: text("technologies").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  category: text("category").notNull(),
  featured: boolean("featured").default(false).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const selectProjectSchema = createSelectSchema(projects);

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  showInHero: boolean("show_in_hero").default(false).notNull(),
});
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const selectSkillSchema = createSelectSchema(skills);

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  logoUrl: text("logo_url"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description").notNull(),
  current: boolean("current").default(false).notNull(),
});
export const insertExperienceSchema = createInsertSchema(experience).omit({ id: true });
export const selectExperienceSchema = createSelectSchema(experience);

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  school: text("school").notNull(),
  logoUrl: text("logo_url"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description").notNull(),
});
export const insertEducationSchema = createInsertSchema(education).omit({ id: true });
export const selectEducationSchema = createSelectSchema(education);

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true });
export const selectMessageSchema = createSelectSchema(messages);

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  imageUrl: text("image_url"),
  content: text("content").notNull(),
  rating: integer("rating").default(5).notNull(),
  linkedinUrl: text("linkedin_url"),
  featured: boolean("featured").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
});
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const selectTestimonialSchema = createSelectSchema(testimonials);

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  category: text("category").notNull(),
  tags: text("tags").notNull(),
  readTime: integer("read_time").notNull(),
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  externalUrl: text("external_url"),
  publishedAt: text("published_at").notNull(),
});
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const selectBlogPostSchema = createSelectSchema(blogPosts);

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(), // JSON string
});
export const insertSettingSchema = createInsertSchema(settings).omit({ id: true });
export const selectSettingSchema = createSelectSchema(settings);
