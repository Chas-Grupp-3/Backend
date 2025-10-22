-- ========================================
-- Convert users.id from INT to UUID safely
-- and remap packages table accordingly
-- ========================================

-- Step 1: Add UUID column to users if not exists
ALTER TABLE users
ADD COLUMN IF NOT EXISTS uuid_id UUID;

-- Step 2: Generate UUIDs (no extensions required)
UPDATE users
SET uuid_id = (
  lpad(to_hex(floor(random() * 4294967296)::bigint), 8, '0') || '-' ||
  lpad(to_hex(floor(random() * 65536)::bigint), 4, '0') || '-' ||
  lpad(to_hex(16384 + floor(random() * 4096)::bigint), 4, '0') || '-' ||
  lpad(to_hex(32768 + floor(random() * 16384)::bigint), 4, '0') || '-' ||
  lpad(to_hex(floor(random() * 281474976710656)::bigint), 12, '0')
)::uuid
WHERE uuid_id IS NULL;

-- Step 3: Create a mapping table for old->new user IDs
CREATE TEMP TABLE users_mapping AS
SELECT id AS old_id, uuid_id AS new_id
FROM users;

-- Step 4: Add new UUID columns for driver/sender in packages
ALTER TABLE packages ADD COLUMN IF NOT EXISTS driver_uuid UUID;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS sender_uuid UUID;

-- Step 5: Copy UUIDs from mapping
UPDATE packages
SET driver_uuid = m.new_id
FROM users_mapping m
WHERE packages.driver_id = m.old_id;

UPDATE packages
SET sender_uuid = m.new_id
FROM users_mapping m
WHERE packages.sender_id = m.old_id;

-- Step 6: Drop old foreign key constraints
ALTER TABLE packages DROP CONSTRAINT IF EXISTS fk_packages_driver;
ALTER TABLE packages DROP CONSTRAINT IF EXISTS fk_packages_sender;

-- Step 7: Replace users primary key with UUID version
ALTER TABLE users DROP CONSTRAINT users_pkey;
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users RENAME COLUMN uuid_id TO id;
ALTER TABLE users ADD PRIMARY KEY (id);

-- Step 8: Drop old driver/sender int columns (if exist)
ALTER TABLE packages
DROP COLUMN IF EXISTS driver_id CASCADE,
DROP COLUMN IF EXISTS sender_id CASCADE;

-- Step 9: Rename UUID columns to final names
ALTER TABLE packages RENAME COLUMN driver_uuid TO driver_id;
ALTER TABLE packages RENAME COLUMN sender_uuid TO sender_id;

-- Step 10: Recreate foreign keys using new UUID ids
ALTER TABLE packages
ADD CONSTRAINT fk_packages_driver FOREIGN KEY (driver_id)
REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_sender FOREIGN KEY (sender_id)
REFERENCES users(id) ON DELETE SET NULL;

-- ========================================
-- Add user_id INT column and constraint
-- ========================================

-- Step 11: Drop old columns safely again (in case migration re-run)
ALTER TABLE packages
DROP COLUMN IF EXISTS driver_id CASCADE,
DROP COLUMN IF EXISTS sender_id CASCADE;

-- Step 12: Add new user_id column
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS user_id INT;

-- Step 13: Add foreign key constraint linking user_id to users(id)
ALTER TABLE packages
ADD CONSTRAINT IF NOT EXISTS fk_packages_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE SET NULL;
