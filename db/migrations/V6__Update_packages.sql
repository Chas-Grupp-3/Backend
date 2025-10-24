-- Add new columns if they do not exist
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS destination TEXT;

ALTER TABLE packages
ADD COLUMN IF NOT EXISTS sender TEXT;

-- Step 1: Drop the foreign key constraint
-- You need to know the name of the foreign key constraint.
-- You can find it by inspecting your database schema (e.g., using `\d packages` in psql).
-- Let's assume the foreign key constraint is named 'fk_sender_id'.
ALTER TABLE packages
DROP CONSTRAINT IF EXISTS fk_sender_id;

-- Step 2: Rename sender_id to receiver_id
ALTER TABLE packages
RENAME COLUMN sender_id TO receiver_id;

-- Step 3: Recreate the foreign key constraint on the new column name
-- Adjust 'fk_receiver_id' to your desired constraint name,
-- and 'users(id)' to the actual table and column it references.
ALTER TABLE packages
ADD CONSTRAINT fk_receiver_id
FOREIGN KEY (receiver_id)
REFERENCES users (id); -- Assuming 'users' is the table and 'id' is the column it references

-- Add thresholds column: array of two numbers [max_temp, max_humidity]
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS thresholds DOUBLE PRECISION[] DEFAULT ARRAY[0.0, 0.0];