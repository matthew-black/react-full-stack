DROP TRIGGER IF EXISTS "on_colors_update" ON "colors";
DROP TABLE IF EXISTS "colors";
DROP TRIGGER IF EXISTS "on_users_update" ON "users";
DROP TABLE IF EXISTS "users";

-- GENERATED ALWAYS AS IDENTITY replaces SERIAL
  -- https://wiki.postgresql.org/wiki/Don%27t_Do_This#Don.27t_use_serial:~:text=the%20right%20thing.-,Don%27t%20use%20serial,-For%20new%20applications
CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "colors" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(80) NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  UNIQUE ("name", "user_id"),
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

CREATE TRIGGER on_colors_update
BEFORE UPDATE ON "colors"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();