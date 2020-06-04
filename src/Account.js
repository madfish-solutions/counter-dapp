import React from 'react';

import { useTezos, useAccountPkh, useConnect, useOnBlock } from './dapp';

const NETWORK = 'carthagenet';

function Account() {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();
  const connect = useConnect();
  const [balance, setBalance] = React.useState(null);

  const accountPkhPreview = React.useMemo(() => {
    const ln = accountPkh.length;
    return `${accountPkh.slice(0, 7)}...${accountPkh.slice(ln - 4, ln)}`;
  }, [accountPkh]);

  const loadBalance = React.useCallback(async () => {
    const bal = await tezos.tz.getBalance(accountPkh);
    setBalance(tezos.format('mutez', 'tz', bal).toString());
  }, [tezos, accountPkh, setBalance]);

  // Load initial
  React.useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  // Reload when new block
  useOnBlock(tezos, loadBalance);

  /**
   * UI
   */

  const handleNewConnect = React.useCallback(() => {
    connect(NETWORK, { forcePermission: true });
  }, [connect]);

  return (
    <div
      style={{
        padding: '1rem',
        margin: '1rem auto',
        maxWidth: '960px',
        minHeight: '100px',
      }}
      className="nes-container with-title is-centered"
    >
      <p className="title">Account</p>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <span class="nes-text is-primary" style={{ marginLeft: '1rem' }}>
          {balance} XTZ
        </span>
        <div style={{ flex: 1 }} />
        <span class="nes-text">{accountPkhPreview}</span>
        <button
          type="button"
          class="nes-btn is-primary"
          style={{ marginLeft: '1rem' }}
          onClick={handleNewConnect}
        >
          Change account
        </button>
      </div>
    </div>
  );
}

export default Account;
