-- Migration: Add exchange_rate column to trade_balance table
-- This column is needed for the updated API that supports CAD/USD conversion

-- Add exchange_rate column
ALTER TABLE tdaas.trade_balance 
ADD COLUMN IF NOT EXISTS exchange_rate NUMERIC(10, 6);

-- Update existing rows with historical exchange rates
-- These are approximate monthly averages for CAD to USD
UPDATE tdaas.trade_balance 
SET exchange_rate = CASE 
    WHEN period_date >= '2024-01-01' THEN 1.3650
    WHEN period_date >= '2023-01-01' THEN 1.3497
    WHEN period_date >= '2022-01-01' THEN 1.3013
    WHEN period_date >= '2021-01-01' THEN 1.2535
    WHEN period_date >= '2020-01-01' THEN 1.3415
    ELSE 1.35
END
WHERE exchange_rate IS NULL;

-- Recalculate USD values if they're incorrect or missing
UPDATE tdaas.trade_balance
SET 
    exports_usd = ROUND(exports_cad / exchange_rate, 2),
    imports_usd = ROUND(imports_cad / exchange_rate, 2),
    balance_usd = ROUND(balance_cad / exchange_rate, 2)
WHERE exchange_rate IS NOT NULL;

-- Add comment
COMMENT ON COLUMN tdaas.trade_balance.exchange_rate IS 'CAD to USD exchange rate for the period';

-- Verify the update
SELECT 
    period,
    exports_cad,
    exports_usd,
    exchange_rate,
    CASE 
        WHEN exchange_rate IS NULL THEN '❌ Missing'
        ELSE '✅ OK'
    END as status
FROM tdaas.trade_balance
ORDER BY period_date DESC
LIMIT 5;
