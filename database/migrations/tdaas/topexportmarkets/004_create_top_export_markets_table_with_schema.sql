-- Migration: Create tdaas schema and top_export_markets table
-- Purpose: Store Canada's export data by destination country/region
-- Data Source: Statistics Canada Table 12-10-0144-01
-- Coverage: Monthly data from 2020 onwards

-- Create tdaas schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS tdaas;

-- Grant necessary permissions (adjust based on your user setup)
GRANT USAGE ON SCHEMA tdaas TO neondb_owner;
GRANT ALL ON SCHEMA tdaas TO neondb_owner;

-- Set search path to include tdaas schema
SET search_path TO tdaas, public;

-- Drop table if exists (for clean re-runs)
DROP TABLE IF EXISTS tdaas.top_export_markets CASCADE;

-- Create table in tdaas schema
CREATE TABLE tdaas.top_export_markets (
    id SERIAL PRIMARY KEY,
    
    -- Time dimension
    period TEXT NOT NULL,                    -- "2024-12", "2024-11", etc.
    period_date DATE NOT NULL,               -- Actual date for sorting
    period_type TEXT NOT NULL DEFAULT 'monthly', -- 'monthly' or 'annual'
    
    -- Geographic dimension
    country_code TEXT NOT NULL,              -- ISO 3166-1 alpha-2 code (US, CN, GB, etc.)
    country_name TEXT NOT NULL,              -- Full country name
    region TEXT,                             -- Geographic region (North America, Asia, Europe, etc.)
    
    -- Export metrics in CAD
    exports_cad NUMERIC(15, 2) NOT NULL,     -- Export value in millions CAD
    share_of_total_cad NUMERIC(5, 2),        -- Percentage of total Canadian exports
    rank_cad INTEGER,                        -- Ranking by export value
    
    -- Export metrics in USD
    exports_usd NUMERIC(15, 2),              -- Export value in millions USD
    share_of_total_usd NUMERIC(5, 2),        -- Percentage of total Canadian exports
    rank_usd INTEGER,                        -- Ranking by export value (USD)
    
    -- Growth metrics
    yoy_change_cad NUMERIC(10, 2),           -- Year-over-year change in CAD (millions)
    yoy_growth_rate NUMERIC(6, 2),           -- Year-over-year growth rate (%)
    mom_change_cad NUMERIC(10, 2),           -- Month-over-month change in CAD (millions)
    mom_growth_rate NUMERIC(6, 2),           -- Month-over-month growth rate (%)
    
    -- Currency conversion
    exchange_rate NUMERIC(10, 6),            -- CAD to USD exchange rate
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,      -- Additional data (source, notes, etc.)
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE(period, country_code, period_type)
);

-- Indexes for performance
CREATE INDEX idx_top_markets_period ON tdaas.top_export_markets(period_date DESC);
CREATE INDEX idx_top_markets_country ON tdaas.top_export_markets(country_code);
CREATE INDEX idx_top_markets_rank ON tdaas.top_export_markets(rank_cad);
CREATE INDEX idx_top_markets_period_type ON tdaas.top_export_markets(period_type);
CREATE INDEX idx_top_markets_composite ON tdaas.top_export_markets(period_date DESC, rank_cad);

-- Comments
COMMENT ON SCHEMA tdaas IS 'Trade Data as a Service - all TDaaS related tables and objects';
COMMENT ON TABLE tdaas.top_export_markets IS 'Canada export data by destination country - monthly and annual aggregates';
COMMENT ON COLUMN tdaas.top_export_markets.period IS 'Period identifier (YYYY-MM for monthly, YYYY for annual)';
COMMENT ON COLUMN tdaas.top_export_markets.country_code IS 'ISO 3166-1 alpha-2 country code';
COMMENT ON COLUMN tdaas.top_export_markets.exports_cad IS 'Export value in millions of Canadian dollars';
COMMENT ON COLUMN tdaas.top_export_markets.share_of_total_cad IS 'Percentage share of total Canadian exports';
COMMENT ON COLUMN tdaas.top_export_markets.rank_cad IS 'Country ranking by export value (1 = highest)';

-- Verification query
SELECT 
    'Schema created: ' || schema_name as status
FROM information_schema.schemata 
WHERE schema_name = 'tdaas'
UNION ALL
SELECT 
    'Table created: tdaas.' || table_name as status
FROM information_schema.tables 
WHERE table_schema = 'tdaas' AND table_name = 'top_export_markets';
