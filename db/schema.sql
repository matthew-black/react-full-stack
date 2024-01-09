DROP TRIGGER IF EXISTS "on_comments_update" ON "comments";
DROP TABLE IF EXISTS "comments";
DROP TRIGGER IF EXISTS "on_posts_update" ON "posts";
DROP TABLE IF EXISTS "posts";
DROP TRIGGER IF EXISTS "on_users_update" ON "users";
DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "posts" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" VARCHAR(500) NOT NULL,
  "text_content" TEXT NOT NULL,
  "is_public" BOOLEAN DEFAULT FALSE NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "comments" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "text_content" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "post_id" INTEGER NOT NULL REFERENCES "posts"("id") ON DELETE CASCADE,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);
  
CREATE OR REPLACE FUNCTION set_updated_at_to_now()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_users_update
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();

CREATE TRIGGER on_posts_update
BEFORE UPDATE ON "posts"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();

CREATE TRIGGER on_comments_update
BEFORE UPDATE ON "comments"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
