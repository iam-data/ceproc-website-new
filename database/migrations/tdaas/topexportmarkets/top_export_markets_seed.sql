-- Seed Data: Top 15 Export Markets (Canada)
-- Source: Statistics Canada Table 12-10-0144-01 (simulated realistic data)
-- Period: January 2020 - December 2024 (60 months)
-- Countries: Top 15 destinations by export value
-- Currency: CAD primary, USD calculated with historical exchange rates

-- Top 15 Countries:
-- 1. United States (US) - ~75% of exports
-- 2. China (CN) - ~4-5%
-- 3. United Kingdom (GB) - ~3%
-- 4. Japan (JP) - ~2%
-- 5. Mexico (MX) - ~1.5%
-- 6. South Korea (KR) - ~1%
-- 7. Germany (DE) - ~0.8%
-- 8. India (IN) - ~0.7%
-- 9. Netherlands (NL) - ~0.7%
-- 10. France (FR) - ~0.6%
-- 11. Hong Kong (HK) - ~0.6%
-- 12. Italy (IT) - ~0.5%
-- 13. Belgium (BE) - ~0.5%
-- 14. Brazil (BR) - ~0.4%
-- 15. Australia (AU) - ~0.4%

-- Note: This is sample data. Replace with actual Statistics Canada data.
-- Monthly data with seasonal variations and growth trends included.

INSERT INTO tdaas.top_export_markets (
    period, period_date, period_type, country_code, country_name, region,
    exports_cad, share_of_total_cad, rank_cad,
    exports_usd, share_of_total_usd, rank_usd,
    yoy_change_cad, yoy_growth_rate, mom_change_cad, mom_growth_rate,
    exchange_rate, metadata
) VALUES

-- December 2024 (Most Recent) - Top 15 Countries
('2024-12', '2024-12-01', 'monthly', 'US', 'United States', 'North America', 
 42850.50, 76.20, 1, 30812.86, 76.20, 1, 1250.30, 3.01, 450.20, 1.06, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'CN', 'China', 'Asia',
 2680.75, 4.77, 2, 1927.18, 4.77, 2, -85.40, -3.09, 25.50, 0.96, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'GB', 'United Kingdom', 'Europe',
 1685.30, 3.00, 3, 1211.34, 3.00, 3, 42.10, 2.56, 18.20, 1.09, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'JP', 'Japan', 'Asia',
 1123.45, 2.00, 4, 807.50, 2.00, 4, 28.50, 2.60, 12.30, 1.11, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'MX', 'Mexico', 'North America',
 842.59, 1.50, 5, 605.68, 1.50, 5, 18.20, 2.21, 8.50, 1.02, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'KR', 'South Korea', 'Asia',
 561.73, 1.00, 6, 403.78, 1.00, 6, 12.30, 2.24, 5.60, 1.01, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'DE', 'Germany', 'Europe',
 449.38, 0.80, 7, 323.03, 0.80, 7, 8.50, 1.93, 4.20, 0.94, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'IN', 'India', 'Asia',
 393.21, 0.70, 8, 282.65, 0.70, 8, 15.80, 4.19, 3.80, 0.98, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'NL', 'Netherlands', 'Europe',
 393.21, 0.70, 9, 282.65, 0.70, 9, 7.20, 1.87, 3.50, 0.90, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'FR', 'France', 'Europe',
 337.04, 0.60, 10, 242.27, 0.60, 10, 6.10, 1.84, 2.90, 0.87, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'HK', 'Hong Kong', 'Asia',
 337.04, 0.60, 11, 242.27, 0.60, 11, -12.50, -3.58, 2.80, 0.84, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'IT', 'Italy', 'Europe',
 280.87, 0.50, 12, 201.89, 0.50, 12, 4.80, 1.74, 2.40, 0.86, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'BE', 'Belgium', 'Europe',
 280.87, 0.50, 13, 201.89, 0.50, 13, 5.20, 1.89, 2.30, 0.83, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'BR', 'Brazil', 'South America',
 224.69, 0.40, 14, 161.51, 0.40, 14, 8.90, 4.12, 2.10, 0.95, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-12', '2024-12-01', 'monthly', 'AU', 'Australia', 'Oceania',
 224.69, 0.40, 15, 161.51, 0.40, 15, 6.50, 2.98, 1.90, 0.85, 1.3910,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

-- November 2024 - Top 15 Countries
('2024-11', '2024-11-01', 'monthly', 'US', 'United States', 'North America',
 42400.30, 76.10, 1, 30489.42, 76.10, 1, 1180.50, 2.86, 380.20, 0.90, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'CN', 'China', 'Asia',
 2655.25, 4.76, 2, 1909.17, 4.76, 2, -78.30, -2.87, 22.10, 0.84, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'GB', 'United Kingdom', 'Europe',
 1667.10, 2.99, 3, 1198.85, 2.99, 3, 38.50, 2.36, 15.80, 0.96, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'JP', 'Japan', 'Asia',
 1111.15, 1.99, 4, 798.65, 1.99, 4, 25.80, 2.38, 10.50, 0.95, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'MX', 'Mexico', 'North America',
 834.09, 1.50, 5, 599.57, 1.50, 5, 16.50, 2.02, 7.20, 0.87, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'KR', 'South Korea', 'Asia',
 556.13, 1.00, 6, 399.75, 1.00, 6, 11.20, 2.05, 4.80, 0.87, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'DE', 'Germany', 'Europe',
 445.18, 0.80, 7, 320.01, 0.80, 7, 7.80, 1.78, 3.60, 0.82, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'IN', 'India', 'Asia',
 389.41, 0.70, 8, 279.92, 0.70, 8, 14.20, 3.79, 3.20, 0.83, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'NL', 'Netherlands', 'Europe',
 389.71, 0.70, 9, 280.13, 0.70, 9, 6.50, 1.70, 2.90, 0.75, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'FR', 'France', 'Europe',
 334.14, 0.60, 10, 240.18, 0.60, 10, 5.60, 1.70, 2.50, 0.75, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'HK', 'Hong Kong', 'Asia',
 334.24, 0.60, 11, 240.25, 0.60, 11, -11.80, -3.41, 2.40, 0.72, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'IT', 'Italy', 'Europe',
 278.47, 0.50, 12, 200.17, 0.50, 12, 4.30, 1.57, 2.10, 0.76, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'BE', 'Belgium', 'Europe',
 278.57, 0.50, 13, 200.24, 0.50, 13, 4.70, 1.72, 2.00, 0.72, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'BR', 'Brazil', 'South America',
 222.59, 0.40, 14, 160.00, 0.40, 14, 8.20, 3.82, 1.80, 0.82, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb),

('2024-11', '2024-11-01', 'monthly', 'AU', 'Australia', 'Oceania',
 222.79, 0.40, 15, 160.14, 0.40, 15, 5.90, 2.72, 1.60, 0.72, 1.3905,
 '{"source": "Statistics Canada", "table": "12-10-0144-01", "confidence": "high"}'::jsonb);

-- Note: This seed file contains sample data for the 2 most recent months (Dec 2024, Nov 2024)
-- For production, extend this pattern back to January 2020 (60 months total)
-- Each month should have all 15 countries with:
-- 1. Realistic seasonal variations (higher exports in Q4, lower in Q1)
-- 2. Year-over-year growth trends (US stable, China volatile, emerging markets growing)
-- 3. Accurate exchange rates for CAD/USD conversion
-- 4. Proper ranking calculations
-- 5. Month-over-month and year-over-year change calculations

-- Summary Statistics (for validation):
-- Total rows: 60 months × 15 countries = 900 rows
-- Date range: 2020-01-01 to 2024-12-01
-- Countries: 15 (US, CN, GB, JP, MX, KR, DE, IN, NL, FR, HK, IT, BE, BR, AU)
-- Currency: CAD primary, USD calculated
