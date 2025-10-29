ALTER TABLE packages
DROP COLUMN destination

ALTER TABLE packages
ADD COLUMN destination jsonb