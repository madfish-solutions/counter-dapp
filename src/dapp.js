import React from 'react';
import constate from 'constate';
import { ThanosWallet } from '@thanos-wallet/dapp';

export const [
  DAppProvider,
  useWallet,
  useTezos,
  useReady,
  useConnect,
] = constate(
  useDApp,
  (v) => v.wallet,
  (v) => v.tezos,
  (v) => v.ready,
  (v) => v.connect
);

function useDApp({ appName }) {
  const [wallet, setWallet] = React.useState(null);
  const [tezos, setTezos] = React.useState(null);
  const ready = Boolean(tezos);

  React.useEffect(() => {
    return ThanosWallet.onAvailabilityChange((available) => {
      setWallet(available ? new ThanosWallet(appName) : null);
    });
  }, [setWallet, appName]);

  const connect = React.useCallback(
    async (network, opts) => {
      try {
        if (!wallet) {
          throw new Error('Thanos Wallet not available');
        }
        await wallet.connect(network, opts);
        setTezos(wallet.toTezos());
      } catch (err) {
        alert(`Failed to connect ThanosWallet: ${err.message}`);
      }
    },
    [wallet, setTezos]
  );

  return {
    wallet,
    tezos,
    ready,
    connect,
  };
}

export function useOnBlock(tezos, callback) {
  const blockHashRef = React.useRef();

  React.useEffect(() => {
    let sub;
    spawnSub();
    return () => sub.close();

    function spawnSub() {
      sub = tezos.stream.subscribe('head');

      sub.on('data', (hash) => {
        if (blockHashRef.current && blockHashRef.current !== hash) {
          callback(hash);
        }
        blockHashRef.current = hash;
      });
      sub.on('error', (err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
        sub.close();
        spawnSub();
      });
    }
  }, [tezos, callback]);
}
