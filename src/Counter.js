import React from 'react';
import './Counter.css';

import usePromise from 'react-promise-suspense';
import { useTezos, useOnBlock } from './tezos';

const fetchContract = (tezos, address) => tezos.wallet.at(address);

function Counter({ contractAddress }) {
  const tezos = useTezos();
  const counter = usePromise(fetchContract, [tezos, contractAddress]);
  const [storage, setStorage] = React.useState(null);

  const loadStorage = React.useCallback(async () => {
    const storage = await counter.storage();
    setStorage(storage.toString());
  }, [setStorage, counter]);

  // Load initial
  React.useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  // Reload when new block
  useOnBlock(tezos, loadStorage);

  const increment = React.useCallback(
    (value) => counter.methods.increment(value).send(),
    [counter]
  );

  const decrement = React.useCallback(
    (value) => counter.methods.decrement(value).send(),
    [counter]
  );

  /**
   * UI
   */

  const [volume, setVolume] = React.useState(1);
  const [operation, setOperation] = React.useState(null);

  const processOperation = React.useCallback(
    async (factory) => {
      try {
        const op = await factory();
        setOperation(op);
      } catch (err) {
        alert(err.message);
      }
    },
    [setOperation]
  );

  const handleVolumeFieldChange = React.useCallback(
    (evt) => {
      setVolume(+evt.target.value);
    },
    [setVolume]
  );

  const handleIncrementClick = React.useCallback(
    () => processOperation(() => increment(volume)),
    [processOperation, increment, volume]
  );

  const handleDecrementClick = React.useCallback(
    () => processOperation(() => decrement(volume)),
    [processOperation, decrement, volume]
  );

  const count = storage;

  return (
    <div>
      <p>Count: {count}</p>

      <div>
        <input
          type="number"
          value={volume}
          onChange={handleVolumeFieldChange}
        />

        <button type="button" onClick={handleIncrementClick}>
          Increment
        </button>

        <button type="button" onClick={handleDecrementClick}>
          Decrement
        </button>
      </div>

      {operation && <p>Operation hash: {operation.opHash}</p>}
    </div>
  );
}

export default Counter;
