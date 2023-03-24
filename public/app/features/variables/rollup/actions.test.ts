import { reduxTester } from '../../../../test/core/redux/reduxTester';
import { variableAdapters } from '../adapters';
import { getRootReducer, RootReducerType } from '../state/helpers';
import { toKeyedAction } from '../state/keyedVariablesReducer';
import { addVariable, setCurrentVariableValue } from '../state/sharedReducer';
import { RollupVariableModel, initialVariableModelState, VariableOption } from '../types';
import { toKeyedVariableIdentifier, toVariablePayload } from '../utils';

import { updateRollupVariableOptions } from './actions';
import { createRollupVariableAdapter } from './adapter';
import { createRollupOptionsFromQuery } from './reducer';

describe('rollup actions', () => {
  variableAdapters.setInit(() => [createRollupVariableAdapter()]);

  describe('when updateRollupVariableOptions is dispatched', () => {
    it('then correct actions are dispatched', async () => {
      const option: VariableOption = {
        value: 'A',
        text: 'A',
        selected: false,
      };

      const variable: RollupVariableModel = {
        ...initialVariableModelState,
        id: '0',
        rootStateKey: 'key',
        index: 0,
        type: 'rollup',
        name: 'Rollup',
        current: {
          value: '',
          text: '',
          selected: false,
        },
        options: [],
        query: 'A',
      };

      const tester = await reduxTester<RootReducerType>()
        .givenRootReducer(getRootReducer())
        .whenActionIsDispatched(
          toKeyedAction('key', addVariable(toVariablePayload(variable, { global: false, index: 0, model: variable })))
        )
        .whenAsyncActionIsDispatched(updateRollupVariableOptions(toKeyedVariableIdentifier(variable)), true);

      tester.thenDispatchedActionsShouldEqual(
        toKeyedAction('key', createRollupOptionsFromQuery(toVariablePayload(variable))),
        toKeyedAction('key', setCurrentVariableValue(toVariablePayload(variable, { option })))
      );
    });
  });
});
