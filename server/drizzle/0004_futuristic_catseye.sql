ALTER TABLE "notebooks" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "notebook_id" SET NOT NULL;