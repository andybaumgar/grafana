import { cloneDeep } from 'lodash';

import { dispatch } from '../../../store/store';
import { VariableAdapter } from '../adapters';
import { optionPickerFactory } from '../pickers';
import { setOptionAsCurrent, setOptionFromUrl } from '../state/actions';
import { RollupVariableModel } from '../types';
import { toKeyedVariableIdentifier } from '../utils';

import { RollupVariableEditor } from './RollupVariableEditor';
import { updateRollupVariableOptions } from './actions';
import { rollupVariableReducer, initialRollupVariableModelState } from './reducer';

export const createRollupVariableAdapter = (): VariableAdapter<RollupVariableModel> => {
  return {
    id: 'rollup',
    description: 'Define a rollup autoselect variable, useful for metric prefixes based on zoom level and time since now',
    name: 'Rollup',
    initialState: initialRollupVariableModelState,
    reducer: rollupVariableReducer,
    picker: optionPickerFactory<RollupVariableModel>(),
    editor: RollupVariableEditor,
    dependsOn: () => {
      return false;
    },
    setValue: async (variable, option, emitChanges = false) => {
      await dispatch(setOptionAsCurrent(toKeyedVariableIdentifier(variable), option, emitChanges));
    },
    setValueFromUrl: async (variable, urlValue) => {
      await dispatch(setOptionFromUrl(toKeyedVariableIdentifier(variable), urlValue));
    },
    updateOptions: async (variable) => {
      await dispatch(updateRollupVariableOptions(toKeyedVariableIdentifier(variable)));
    },
    getSaveModel: (variable) => {
      const { index, id, state, global, current, options, rootStateKey, ...rest } = cloneDeep(variable);
      return rest;
    },
    getValueForUrl: (variable) => {
      return variable.current.value;
    },
    beforeAdding: (model) => {
      const { current, options, query, ...rest } = cloneDeep(model);
      const option = { selected: true, text: query, value: query };

      return { ...rest, current: option, options: [option], query };
    },
  };
};
