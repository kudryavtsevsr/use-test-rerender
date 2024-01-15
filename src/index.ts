import {useEffect, useRef} from 'react';

export const TEST_RERENDER_ATTRIBUTE_NAME = 'data-test-render';

export type TestRerenderHook = { bind: {[TEST_RERENDER_ATTRIBUTE_NAME]: number} | {}}

export function useTestRerender(): TestRerenderHook

export function useTestRerender() {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  if (!['development', 'test'].includes(process.env.NODE_ENV)) {
    return {
      bind: {}
    };
  }

  return {
    bind: {
      [TEST_RERENDER_ATTRIBUTE_NAME]: renderCount.current
    }
  };
}
