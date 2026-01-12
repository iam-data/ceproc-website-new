import React, { useState, useEffect } from 'react';
import TradeBalanceModal from './TradeBalanceModal';
import TopMarketsModal from './TopMarketsModal';

export default function ModalManager() {
  const [tradeBalanceOpen, setTradeBalanceOpen] = useState(false);
  const [topMarketsOpen, setTopMarketsOpen] = useState(false);

  useEffect(() => {
    const handleOpenTradeBalance = () => {
      console.log('ModalManager: Opening Trade Balance Modal');
      setTradeBalanceOpen(true);
    };

    const handleOpenTopMarkets = () => {
      console.log('ModalManager: Opening Top Markets Modal');
      setTopMarketsOpen(true);
    };

    window.addEventListener('openTradeBalanceModal', handleOpenTradeBalance);
    window.addEventListener('openTopMarketsModal', handleOpenTopMarkets);

    console.log('ModalManager: Event listeners registered');

    return () => {
      window.removeEventListener('openTradeBalanceModal', handleOpenTradeBalance);
      window.removeEventListener('openTopMarketsModal', handleOpenTopMarkets);
    };
  }, []);

  return (
    <>
      <TradeBalanceModal 
        isOpen={tradeBalanceOpen} 
        onClose={() => setTradeBalanceOpen(false)} 
      />
      <TopMarketsModal 
        isOpen={topMarketsOpen} 
        onClose={() => setTopMarketsOpen(false)} 
      />
    </>
  );
}
