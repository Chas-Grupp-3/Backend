
ALTER TABLE users
ADD COLUMN IF NOT EXISTS location jsonb;



ALTER TABLE packages
DROP COLUMN location;

ALTER TABLE packages
ADD COLUMN location jsonb;

UPDATE packages AS p
SET location = u.location
FROM users AS u
WHERE p.driver_id = u.id;

CREATE OR REPLACE FUNCTION update_packages_location_from_user()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.location IS DISTINCT FROM OLD.location THEN
        UPDATE packages
        SET location = NEW.location
        WHERE driver_id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_packages_location_trigger
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_packages_location_from_user();
