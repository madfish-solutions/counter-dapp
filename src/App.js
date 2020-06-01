import React from 'react';

import { TezosProvider, useReady, useWallet, useConnect } from './tezos';
import Counter from './Counter';

const APP_NAME = 'Counter dApp';
const NETWORK = 'carthagenet';
const COUNTER_ADDRESS = 'KT1DjYkruvfujfKw6nLYafArqKufcwHuKXvT';

function App() {
  return (
    <TezosProvider appName={APP_NAME}>
      <React.Suspense fallback={null}>
        <PageRouter />
      </React.Suspense>
    </TezosProvider>
  );
}

export default App;

function PageRouter() {
  const wallet = useWallet();
  const ready = useReady();
  const connect = useConnect();

  const handleConnect = React.useCallback(async () => {
    try {
      await connect(NETWORK);
    } catch (err) {
      alert(err.message);
    }
  }, [connect]);

  return (
    <div style={{ padding: '1rem' }}>
      {wallet ? (
        <>
          {ready ? (
            <Counter contractAddress={COUNTER_ADDRESS} />
          ) : (
            <button onClick={handleConnect}>Connect to ThanosWallet</button>
          )}
        </>
      ) : (
        <p>
          Thanos Wallet not available. Install on{' '}
          <a
            href="https://thanoswallet.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://thanoswallet.com
          </a>
        </p>
      )}
    </div>
  );
}
