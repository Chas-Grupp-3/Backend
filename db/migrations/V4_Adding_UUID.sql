CREATE EXTENSION IF NOT EXISTS "pgcrypto";

ALTER TABLE "Users"
ADD COLUMN IF NOT EXISTS uuid_id UUID;

UPDATE "Users"
SET uuid_id = gen_random_uuid();

CREATE TEMP TABLE Users_mapping AS
SELECT id AS old_id, uuid_id AS new_id
FROM Users;

UPDATE packages
SET driver_id = m.new_id
FROM Users_mapping m
WHERE packages.driver_id = m.old_id;

UPDATE packages
SET sender_id = m.new_id
FROM Users_mapping m
WHERE packages.sender_id = m.old_id;

ALTER TABLE "Users" DROP CONSTRAINT Users_pkey;
ALTER TABLE "Users" DROP COLUMN id;

ALTER TABLE "Users" RENAME COLUMN uuid_id TO id;

ALTER TABLE "Users"
ADD PRIMARY KEY (id);

ALTER TABLE packages 
DROP CONSTRAINT IF EXISTS fk_packages_driver;
ALTER TABLE packages 
DROP CONSTRAINT IF EXISTS fk_packages_sender;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_driver
FOREIGN KEY (driver_id)
REFERENCES Users(id) 
ON DELETE SET NULL;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_sender
FOREIGN KEY (sender_id)
REFERENCES Users(id) 
ON DELETE SET NULL;
