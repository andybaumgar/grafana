import { cloneDeep } from 'lodash';

import { reducerTester } from '../../../../test/core/redux/reducerTester';
import { getVariableTestContext } from '../state/helpers';
import { VariablesState } from '../state/types';
import { RollupVariableModel } from '../types';
import { toVariablePayload } from '../utils';

import { createRollupVariableAdapter } from './adapter';
import { rollupVariableReducer, createRollupOptionsFromQuery } from './reducer';

describe('rollupVariableReducer', () => {
  const adapter = createRollupVariableAdapter();

  describe('when createRollupOptionsFromQuery is dispatched', () => {
    it('then state should be correct', () => {
      const query = 'ABC';
      const id = '0';
      const { initialState } = getVariableTestContext(adapter, { id, query });
      const payload = toVariablePayload({ id: '0', type: 'rollup' });

      reducerTester<VariablesState>()
        .givenReducer(rollupVariableReducer, cloneDeep(initialState))
        .whenActionIsDispatched(createRollupOptionsFromQuery(payload))
        .thenStateShouldEqual({
          [id]: {
            ...initialState[id],
            options: [
              {
                text: query,
                value: query,
                selected: false,
              },
            ],
          } as RollupVariableModel,
        });
    });
  });

  describe('when createRollupOptionsFromQuery is dispatched and query contains spaces', () => {
    it('then state should be correct', () => {
      const query = '  ABC  ';
      const id = '0';
      const { initialState } = getVariableTestContext(adapter, { id, query });
      const payload = toVariablePayload({ id: '0', type: 'rollup' });

      reducerTester<VariablesState>()
        .givenReducer(rollupVariableReducer, cloneDeep(initialState))
        .whenActionIsDispatched(createRollupOptionsFromQuery(payload))
        .thenStateShouldEqual({
          [id]: {
            ...initialState[id],
            options: [
              {
                text: query.trim(),
                value: query.trim(),
                selected: false,
              },
            ],
          } as RollupVariableModel,
        });
    });
  });
});
