-- database/migrations/002_create_tdaas_tables.sql
-- TDaaS Database Schema for Canadian International Trade Data

-- Core trade data table
CREATE TABLE IF NOT EXISTS trade_data (
  id SERIAL PRIMARY KEY,
  trade_date DATE NOT NULL,
  trade_flow VARCHAR(20) NOT NULL CHECK (trade_flow IN ('import', 'export')),
  country_code VARCHAR(3) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  commodity_code VARCHAR(10),
  commodity_name VARCHAR(255),
  commodity_section VARCHAR(100), -- HS code section (e.g., "Live animals")
  trade_value_cad DECIMAL(15, 2),
  trade_value_usd DECIMAL(15, 2),
  quantity DECIMAL(15, 3),
  unit_of_measure VARCHAR(50),
  province_code VARCHAR(2), -- For provincial data
  province_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trade_date ON trade_data(trade_date DESC);
CREATE INDEX IF NOT EXISTS idx_country_date ON trade_data(country_code, trade_date);
CREATE INDEX IF NOT EXISTS idx_commodity_date ON trade_data(commodity_code, trade_date);
CREATE INDEX IF NOT EXISTS idx_trade_flow ON trade_data(trade_flow, trade_date);
CREATE INDEX IF NOT EXISTS idx_province ON trade_data(province_code, trade_date);
CREATE INDEX IF NOT EXISTS idx_commodity_section ON trade_data(commodity_section, trade_date);

-- Composite index for common queries
CREATE INDEX IF NOT EXISTS idx_flow_country_date ON trade_data(trade_flow, country_code, trade_date DESC);

-- Metadata table for dataset information
CREATE TABLE IF NOT EXISTS trade_datasets (
  id SERIAL PRIMARY KEY,
  dataset_key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  value_proposition TEXT,
  data_source VARCHAR(255),
  update_frequency VARCHAR(50),
  last_updated TIMESTAMP,
  record_count INTEGER DEFAULT 0,
  icon VARCHAR(50),
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pre-aggregated cache for fast queries
CREATE TABLE IF NOT EXISTS trade_cache (
  id SERIAL PRIMARY KEY,
  cache_key VARCHAR(255) UNIQUE NOT NULL,
  dataset_id VARCHAR(100),
  cache_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_cache_key ON trade_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_cache_expires ON trade_cache(expires_at);

-- Data sync log table
CREATE TABLE IF NOT EXISTS trade_sync_log (
  id SERIAL PRIMARY KEY,
  sync_type VARCHAR(50) NOT NULL,
  data_source VARCHAR(100) NOT NULL,
  records_processed INTEGER DEFAULT 0,
  records_inserted INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  status VARCHAR(20) CHECK (status IN ('running', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sync_log_date ON trade_sync_log(created_at DESC);

-- Country reference table
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(3) UNIQUE NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  region VARCHAR(50),
  trade_agreement_status VARCHAR(50), -- 'FTA', 'None', 'Negotiating'
  is_g7 BOOLEAN DEFAULT false,
  is_g20 BOOLEAN DEFAULT false,
  population BIGINT,
  gdp_usd DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Commodity reference table (HS codes)
CREATE TABLE IF NOT EXISTS commodities (
  id SERIAL PRIMARY KEY,
  hs_code VARCHAR(10) UNIQUE NOT NULL,
  hs_level INTEGER NOT NULL, -- 2, 4, 6, or 8 digit level
  commodity_name VARCHAR(255) NOT NULL,
  parent_code VARCHAR(10),
  section_code VARCHAR(10),
  section_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial dataset metadata
INSERT INTO trade_datasets (dataset_key, title, description, value_proposition, icon, category, is_active)
VALUES
  ('trade-balance', 'Trade Balance Trends', 'Monthly import/export balance analysis', 'Identify surplus/deficit patterns and seasonal trends', '📊', 'Overview', true),
  ('top-markets', 'Top Export Markets', 'Canada''s largest export destinations', 'Target high-potential markets for expansion', '🌎', 'Markets', true),
  ('leading-commodities', 'Leading Export Commodities', 'Top export products and trends', 'Benchmark your products against national performance', '📦', 'Commodities', true),
  ('import-sources', 'Top Import Sources', 'Where Canada sources imports', 'Identify supply chain opportunities', '🚢', 'Markets', true),
  ('growth-markets', 'Fastest Growing Markets', 'Markets with accelerating growth', 'Be first to enter high-growth markets', '📈', 'Markets', true),
  ('diversification', 'Trade Diversification Index', 'Market concentration analysis', 'Understand systemic risks', '⚖️', 'Overview', true),
  ('provincial-exports', 'Provincial Export Performance', 'Export performance by province', 'Understand regional strengths', '🗺️', 'Regional', true),
  ('sector-analysis', 'Sector-by-Sector Analysis', 'Industry sector performance', 'Industry-specific insights', '🏭', 'Sectors', true),
  ('trade-agreements', 'Trade Agreement Impact', 'FTA impact on trade flows', 'Leverage preferential market access', '🤝', 'Policy', true)
ON CONFLICT (dataset_key) DO NOTHING;

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for trade_data
CREATE TRIGGER update_trade_data_updated_at BEFORE UPDATE ON trade_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for countries
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View for quick trade balance summary
CREATE OR REPLACE VIEW v_monthly_trade_balance AS
SELECT 
  DATE_TRUNC('month', trade_date) as month,
  SUM(CASE WHEN trade_flow = 'export' THEN trade_value_cad ELSE 0 END) as exports_cad,
  SUM(CASE WHEN trade_flow = 'import' THEN trade_value_cad ELSE 0 END) as imports_cad,
  SUM(CASE WHEN trade_flow = 'export' THEN trade_value_cad ELSE 0 END) - 
    SUM(CASE WHEN trade_flow = 'import' THEN trade_value_cad ELSE 0 END) as balance_cad
FROM trade_data
GROUP BY DATE_TRUNC('month', trade_date)
ORDER BY month DESC;

-- View for top export markets
CREATE OR REPLACE VIEW v_top_export_markets AS
SELECT 
  country_code,
  country_name,
  DATE_TRUNC('year', trade_date) as year,
  SUM(trade_value_cad) as total_exports_cad,
  COUNT(DISTINCT commodity_code) as commodity_count
FROM trade_data
WHERE trade_flow = 'export'
GROUP BY country_code, country_name, DATE_TRUNC('year', trade_date)
ORDER BY year DESC, total_exports_cad DESC;

COMMENT ON TABLE trade_data IS 'Core table storing Canadian international merchandise trade data from Statistics Canada';
COMMENT ON TABLE trade_datasets IS 'Metadata about available TDaaS datasets';
COMMENT ON TABLE trade_cache IS 'Pre-computed aggregations for faster query performance';
COMMENT ON TABLE trade_sync_log IS 'Log of data synchronization operations';
COMMENT ON TABLE countries IS 'Reference data for countries and trade partners';
COMMENT ON TABLE commodities IS 'Reference data for HS commodity codes';
