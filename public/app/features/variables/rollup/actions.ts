import { ThunkResult } from 'app/types';

import { validateVariableSelectionState } from '../state/actions';
import { toKeyedAction } from '../state/keyedVariablesReducer';
import { KeyedVariableIdentifier } from '../state/types';
import { toVariablePayload } from '../utils';

import { createRollupOptionsFromQuery } from './reducer';

export const updateRollupVariableOptions = (identifier: KeyedVariableIdentifier): ThunkResult<void> => {
  return async (dispatch) => {
    const { rootStateKey } = identifier;
    await dispatch(toKeyedAction(rootStateKey, createRollupOptionsFromQuery(toVariablePayload(identifier))));
    await dispatch(validateVariableSelectionState(identifier));
  };
};
