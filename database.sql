DROP TRIGGER IF EXISTS "on_colors_update" ON "colors";
DROP TABLE IF EXISTS "colors";

CREATE TABLE "colors" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) UNIQUE NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO "colors"
  ("name")
  VALUES
  ('red'),
  ('yellow'),
  ('blue');
  
CREATE OR REPLACE FUNCTION set_updated_at_to_now()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_colors_update
BEFORE UPDATE ON "colors"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
