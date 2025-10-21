-- 1. Add arrival_date column
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS arrival_date DATE;

-- 2. Add driver_id column and foreign key
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS driver_id INT;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_driver
FOREIGN KEY (driver_id)
REFERENCES users(id)
ON DELETE SET NULL;

-- 3. Add sender_id column and foreign key
ALTER TABLE packages
ADD COLUMN IF NOT EXISTS sender_id INT;

ALTER TABLE packages
ADD CONSTRAINT fk_packages_sender
FOREIGN KEY (sender_id)
REFERENCES users(id)
ON DELETE SET NULL;
