const dbClient = require("../../../database/database");

async function createReportCreatorTables() {
  const createReportCreatorTablesQuery = `
  CREATE TABLE IF NOT EXISTS Report_Creators (
    id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL,
    creator_type VARCHAR(50) NOT NULL CHECK (creator_type IN ('Pathology_Admin', 'Pharmacy_Admin'))
      );
  
  -- Function to enforce the foreign key constraint
  CREATE OR REPLACE FUNCTION check_creator_id()
  RETURNS TRIGGER AS $$
  BEGIN
    -- Pathology_Admin logic
    IF NEW.creator_type = 'Pathology_Admin' THEN
      IF NOT EXISTS (SELECT 1 FROM Pathology_Admins WHERE id = NEW.creator_id) THEN
        RAISE EXCEPTION 'creator_id % not found in Pathology_Admins', NEW.creator_id;
      END IF;
    -- Pharmacy_Admin logic
    ELSIF NEW.creator_type = 'Pharmacy_Admin' THEN
      IF NOT EXISTS (SELECT 1 FROM Pharmacy_Admins WHERE id = NEW.creator_id) THEN
        RAISE EXCEPTION 'creator_id % not found in Pharmacy_Admins', NEW.creator_id;
      END IF;
    ELSE
      RAISE EXCEPTION 'Invalid creator_type %', NEW.creator_type;
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  -- Trigger to enforce the constraint on INSERT or UPDATE
  CREATE TRIGGER enforce_creator_id
  BEFORE INSERT OR UPDATE ON Report_Creators
  FOR EACH ROW EXECUTE FUNCTION check_creator_id();
  `;

  try {
    const result = await dbClient.query(createReportCreatorTablesQuery);
    console.log("Report_Creators table created successfully or already exists");
  } catch (e) {
    console.error("Error creating Report_Creators table:", e);
  }
}

module.exports = createReportCreatorTables;
