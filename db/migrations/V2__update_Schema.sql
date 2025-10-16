-- Add columns to products table
ALTER TABLE packages
ADD COLUMN humidity NUMERIC,
ADD COLUMN delivered BOOLEAN;

-- Remove status column from products table
ALTER TABLE packages
DROP COLUMN status;

-- Add columns to users table
ALTER TABLE "users"
ADD COLUMN password VARCHAR(255),
ADD COLUMN role VARCHAR(50);