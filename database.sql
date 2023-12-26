DROP TRIGGER IF EXISTS "on_users_update" ON "users";
DROP TABLE IF EXISTS "users";
DROP TRIGGER IF EXISTS "on_colors_update" ON "colors";
DROP TABLE IF EXISTS "colors";

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "users"
  ("username", "password")
  VALUES
  ('test', 'test');

CREATE TABLE "colors" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) UNIQUE NOT NULL,
  "user_id" INTEGER REFERENCES "users" NOT NULL ON DELETE CASCADE,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "colors"
  ("name")
  VALUES
  ('red', 1),
  ('yellow', 1),
  ('blue', 1);
  
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

CREATE TRIGGER on_colors_update
BEFORE UPDATE ON "colors"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
