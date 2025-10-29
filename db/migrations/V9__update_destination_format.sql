ALTER TABLE packages
DROP COLUMN IF EXISTS destination,
DROP COLUMN IF EXISTS thresholds;

ALTER TABLE packages
ADD COLUMN destination jsonb,
ADD COLUMN thresholds jsonb;