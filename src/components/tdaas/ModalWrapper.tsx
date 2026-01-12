// ModalWrapper.tsx
// Wrapper component to handle modal state from window events
// This bridges Astro's static HTML with React's dynamic modals

import React, { useState, useEffect } from 'react';
import TradeBalanceModalContent from './TradeBalanceModal';
import TopMarketsModalContent from './TopMarketsModal';

export default function ModalWrapper() {
  const [tradeBalanceOpen, setTradeBalanceOpen] = useState(false);
  const [topMarketsOpen, setTopMarketsOpen] = useState(false);

  useEffect(() => {
    // Listen for modal open events from Astro page
    const handleOpenTradeBalance = () => setTradeBalanceOpen(true);
    const handleOpenTopMarkets = () => setTopMarketsOpen(true);

    window.addEventListener('openTradeBalanceModal', handleOpenTradeBalance);
    window.addEventListener('openTopMarketsModal', handleOpenTopMarkets);

    return () => {
      window.removeEventListener('openTradeBalanceModal', handleOpenTradeBalance);
      window.removeEventListener('openTopMarketsModal', handleOpenTopMarkets);
    };
  }, []);

  return (
    <>
      <TradeBalanceModalContent 
        isOpen={tradeBalanceOpen} 
        onClose={() => setTradeBalanceOpen(false)} 
      />
      <TopMarketsModalContent 
        isOpen={topMarketsOpen} 
        onClose={() => setTopMarketsOpen(false)} 
      />
    </>
  );
}
