CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE users
ADD COLUMN IF NOT EXISTS uuid_id UUID;

UPDATE users
SET uuid_id = gen_random_uuid()
WHERE uuid_id IS NULL;

CREATE TEMP TABLE users_mapping AS
SELECT id AS old_id, uuid_id AS new_id
FROM users;

ALTER TABLE packages
ADD COLUMN IF NOT EXISTS driver_uuid UUID;

ALTER TABLE packages
ADD COLUMN IF NOT EXISTS sender_uuid UUID;

UPDATE packages
SET driver_uuid = m.new_id
FROM users_mapping m
WHERE packages.driver_id = m.old_id;

UPDATE packages
SET sender_uuid = m.new_id
FROM users_mapping m
WHERE packages.sender_id = m.old_id;

ALTER TABLE packages DROP CONSTRAINT IF EXISTS fk_packages_driver;
ALTER TABLE packages DROP CONSTRAINT IF EXISTS fk_packages_sender;

ALTER TABLE users DROP CONSTRAINT users_pkey;
ALTER TABLE users DROP COLUMN id;

ALTER TABLE users RENAME COLUMN uuid_id TO id;
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE packages DROP COLUMN driver_id;
ALTER TABLE packages DROP COLUMN sender_id;

ALTER TABLE packages RENAME COLUMN driver_uuid TO driver_id;
ALTER TABLE packages RENAME COLUMN sender_uuid TO sender_id;

ALTER TABLE packages
ALTER COLUMN driver_id TYPE UUID USING driver_id::uuid;

ALTER TABLE packages
ALTER COLUMN sender_id TYPE UUID USING sender_id::uuid;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_driver FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_sender FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL;
