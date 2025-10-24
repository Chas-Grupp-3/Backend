
ALTER TABLE packages
ADD COLUMN package_id UUID DEFAULT gen_random_uuid();

ALTER TABLE packages DROP CONSTRAINT IF EXISTS packages_pkey;
ALTER TABLE packages ADD CONSTRAINT packages_pkey PRIMARY KEY (package_id);

ALTER TABLE packages DROP COLUMN id;

ALTER TABLE packages ALTER COLUMN package_id SET DEFAULT gen_random_uuid();
