ALTER TABLE packages
DROP COLUMN IF EXISTS driver_id CASCADE,
DROP COLUMN IF EXISTS sender_id CASCADE;

-- Add new column user_id if it doesn't exist
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS user_id INT;

-- Add foreign key to users table
ALTER TABLE packages
ADD CONSTRAINT IF NOT EXISTS fk_packages_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE SET NULL;
