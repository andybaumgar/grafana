import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getInstanceState } from '../state/selectors';
import { initialVariablesState, VariablePayload, VariablesState } from '../state/types';
import { RollupVariableModel, initialVariableModelState, VariableHide, VariableOption } from '../types';

export const initialRollupVariableModelState: RollupVariableModel = {
  ...initialVariableModelState,
  type: 'rollup',
  hide: VariableHide.hideVariable,
  query: '',
  current: {} as VariableOption,
  options: [],
};

export const rollupVariableSlice = createSlice({
  name: 'templating/rollup',
  initialState: initialVariablesState,
  reducers: {
    createRollupOptionsFromQuery: (state: VariablesState, action: PayloadAction<VariablePayload>) => {
      const instanceState = getInstanceState(state, action.payload.id);
      if (instanceState.type !== 'rollup') {
        return;
      }

      instanceState.options = [
        { text: instanceState.query.trim(), value: instanceState.query.trim(), selected: false },
      ];
    },
  },
});

export const rollupVariableReducer = rollupVariableSlice.reducer;

export const { createRollupOptionsFromQuery } = rollupVariableSlice.actions;
