-- Migration: Move trade_balance to tdaas schema
-- Purpose: Consolidate all TDaaS tables under tdaas schema for better organization
-- Note: Run this AFTER creating tdaas schema

-- Create tdaas schema if it doesn't exist (safe to run multiple times)
CREATE SCHEMA IF NOT EXISTS tdaas;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA tdaas TO neondb_owner;
GRANT ALL ON SCHEMA tdaas TO neondb_owner;

-- Option 1: Move existing table (if you want to preserve data)
-- This will move the table from public to tdaas schema
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'trade_balance'
    ) THEN
        -- Move the table
        ALTER TABLE public.trade_balance SET SCHEMA tdaas;
        
        -- Update comments to reference new location
        COMMENT ON TABLE tdaas.trade_balance IS 'Canada trade balance data - monthly imports, exports, and balance';
        
        RAISE NOTICE 'Table moved from public.trade_balance to tdaas.trade_balance';
    ELSE
        RAISE NOTICE 'Table public.trade_balance does not exist - skipping move';
    END IF;
END $$;

-- Option 2: Create fresh in tdaas schema (if starting fresh)
-- Uncomment the following if you want to create from scratch instead of moving

/*
DROP TABLE IF EXISTS tdaas.trade_balance CASCADE;

CREATE TABLE tdaas.trade_balance (
    id SERIAL PRIMARY KEY,
    period TEXT NOT NULL UNIQUE,
    period_date DATE NOT NULL,
    exports_cad NUMERIC(12, 2) NOT NULL,
    imports_cad NUMERIC(12, 2) NOT NULL,
    balance_cad NUMERIC(12, 2) NOT NULL,
    exports_usd NUMERIC(12, 2),
    imports_usd NUMERIC(12, 2),
    balance_usd NUMERIC(12, 2),
    balance_type TEXT NOT NULL,
    exchange_rate NUMERIC(10, 6),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate indexes
CREATE INDEX idx_trade_balance_period_date ON tdaas.trade_balance(period_date DESC);
CREATE INDEX idx_trade_balance_type ON tdaas.trade_balance(balance_type);

-- Add comments
COMMENT ON TABLE tdaas.trade_balance IS 'Canada trade balance data - monthly imports, exports, and balance';
*/

-- Verification
SELECT 
    table_schema,
    table_name,
    (SELECT COUNT(*) FROM tdaas.trade_balance) as row_count
FROM information_schema.tables 
WHERE table_name = 'trade_balance'
ORDER BY table_schema;
