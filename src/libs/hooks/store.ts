// node_modules
import { createTypedHooks } from 'easy-peasy';

// stores
import { StoreInterface } from '../../stores';

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<StoreInterface>();

// 👇 export the typed hooks

const { useStoreActions } = typedHooks;
const { useStoreDispatch } = typedHooks;
const { useStoreState } = typedHooks;

export {
  useStoreActions,
  useStoreDispatch,
  useStoreState,
};
