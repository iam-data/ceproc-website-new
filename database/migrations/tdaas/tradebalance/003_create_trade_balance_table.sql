-- Migration: 003_create_trade_balance_table.sql
-- Purpose: Create table to store Canada's monthly trade balance data
-- Strategy: Append-only accumulation with upsert on conflict

-- Drop table if exists (for clean migration)
DROP TABLE IF EXISTS trade_balance CASCADE;

-- Create trade_balance table
CREATE TABLE trade_balance (
  -- Primary Key
  id SERIAL PRIMARY KEY,
  
  -- Time Period (Unique Constraints)
  period VARCHAR(7) NOT NULL,              -- Format: 'YYYY-MM' (e.g., '2024-10')
  period_date DATE NOT NULL,               -- First day of month (e.g., '2024-10-01')
  
  -- Trade Data (CAD) - Millions
  exports_cad DECIMAL(15,2) NOT NULL,      -- Monthly exports in CAD millions
  imports_cad DECIMAL(15,2) NOT NULL,      -- Monthly imports in CAD millions
  balance_cad DECIMAL(15,2) NOT NULL,      -- Exports - Imports
  balance_type VARCHAR(10) NOT NULL,       -- 'surplus' or 'deficit'
  
  -- Trade Data (USD) - Millions (Optional)
  exports_usd DECIMAL(15,2),               -- Monthly exports in USD millions
  imports_usd DECIMAL(15,2),               -- Monthly imports in USD millions
  balance_usd DECIMAL(15,2),               -- Balance in USD
  
  -- Exchange Rate (for reference)
  cad_usd_rate DECIMAL(8,6),               -- CAD to USD exchange rate
  
  -- Metadata
  data_source VARCHAR(255) DEFAULT 'Statistics Canada',
  statcan_table VARCHAR(50) DEFAULT '12-10-0011-01',
  seasonally_adjusted BOOLEAN DEFAULT true,
  
  -- Tracking
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_synced_at TIMESTAMP,
  
  -- Constraints
  CONSTRAINT trade_balance_period_unique UNIQUE(period),
  CONSTRAINT trade_balance_period_date_unique UNIQUE(period_date),
  CONSTRAINT valid_balance_type CHECK (balance_type IN ('surplus', 'deficit'))
);

-- Indexes for Performance
CREATE INDEX idx_trade_balance_period_date ON trade_balance(period_date DESC);
CREATE INDEX idx_trade_balance_period ON trade_balance(period);
CREATE INDEX idx_trade_balance_balance_type ON trade_balance(balance_type);
CREATE INDEX idx_trade_balance_created_at ON trade_balance(created_at DESC);

-- Comments
COMMENT ON TABLE trade_balance IS 'Monthly Canada international trade balance data - append-only accumulating history';
COMMENT ON COLUMN trade_balance.period IS 'Month in YYYY-MM format for easy querying';
COMMENT ON COLUMN trade_balance.period_date IS 'First day of the month as DATE for charting';
COMMENT ON COLUMN trade_balance.exports_cad IS 'Total monthly exports in CAD millions';
COMMENT ON COLUMN trade_balance.imports_cad IS 'Total monthly imports in CAD millions';
COMMENT ON COLUMN trade_balance.balance_cad IS 'Trade balance (exports minus imports) in CAD millions';
COMMENT ON COLUMN trade_balance.balance_type IS 'Surplus if positive, deficit if negative';

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_trade_balance_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trade_balance_updated_at_trigger
  BEFORE UPDATE ON trade_balance
  FOR EACH ROW
  EXECUTE FUNCTION update_trade_balance_timestamp();

-- Data validation trigger
CREATE OR REPLACE FUNCTION validate_trade_balance()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure balance matches exports - imports (allow 0.01 rounding tolerance)
  IF ABS((NEW.exports_cad - NEW.imports_cad) - NEW.balance_cad) > 0.01 THEN
    RAISE EXCEPTION 'Balance calculation error: % - % != %', 
      NEW.exports_cad, NEW.imports_cad, NEW.balance_cad;
  END IF;
  
  -- Ensure balance_type matches sign
  IF NEW.balance_cad >= 0 AND NEW.balance_type != 'surplus' THEN
    RAISE EXCEPTION 'Balance type mismatch: positive balance (%) must be surplus', NEW.balance_cad;
  END IF;
  
  IF NEW.balance_cad < 0 AND NEW.balance_type != 'deficit' THEN
    RAISE EXCEPTION 'Balance type mismatch: negative balance (%) must be deficit', NEW.balance_cad;
  END IF;
  
  -- Auto-calculate CAD/USD rate if both currencies provided
  IF NEW.exports_usd IS NOT NULL AND NEW.exports_cad IS NOT NULL THEN
    NEW.cad_usd_rate = (NEW.exports_usd / NEW.exports_cad)::DECIMAL(8,6);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_trade_balance_trigger
  BEFORE INSERT OR UPDATE ON trade_balance
  FOR EACH ROW
  EXECUTE FUNCTION validate_trade_balance();

-- Grant permissions (adjust as needed)
-- GRANT SELECT ON trade_balance TO app_readonly;
-- GRANT SELECT, INSERT, UPDATE ON trade_balance TO app_readwrite;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Migration 003: trade_balance table created successfully';
  RAISE NOTICE '📊 Table: trade_balance';
  RAISE NOTICE '🔧 Strategy: Append-only accumulation';
  RAISE NOTICE '📅 Ready to store monthly trade data';
END $$;
