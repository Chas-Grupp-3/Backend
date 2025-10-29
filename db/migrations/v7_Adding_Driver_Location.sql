-- Add a JSONB column for storing driver location
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS location JSONB;

-- Remove existing foreign key constraint on driver_id if it exists
ALTER TABLE packages
DROP CONSTRAINT IF EXISTS fk_packages_driver;

-- Create a foreign key from packages.driver_id to users.id
ALTER TABLE packages
ADD CONSTRAINT fk_packages_driver
FOREIGN KEY (driver_id)
REFERENCES users(id)
ON DELETE SET NULL;

-- Create an index on driver_id for faster queries
CREATE INDEX IF NOT EXISTS idx_packages_driver_id ON packages(driver_id);