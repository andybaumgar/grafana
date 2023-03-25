import React, { FormEvent, PureComponent } from 'react';

import { selectors } from '@grafana/e2e-selectors';

import { VariableLegend } from '../editor/VariableLegend';
import { VariableTextField } from '../editor/VariableTextField';
import { VariableEditorProps } from '../editor/types';
import { RollupVariableModel } from '../types';

export interface Props extends VariableEditorProps<RollupVariableModel> {}

export class RollupVariableEditor extends PureComponent<Props> {
  onChange = (event: FormEvent<HTMLInputElement>) => {
    this.props.onPropChange({
      propName: 'query',
      propValue: event.currentTarget.value,
    });
  };

  onBlur = (event: FormEvent<HTMLInputElement>) => {
    this.props.onPropChange({
      propName: 'query',
      propValue: event.currentTarget.value,
      updateOptions: true,
    });
  };

  render() {
    return (
      <>
        <VariableLegend>Rollup options</VariableLegend>
        <VariableTextField
          value={this.props.variable.query}
          name="Value"
          placeholder="your metric prefix"
          onChange={this.onChange}
          onBlur={this.onBlur}
          testId={selectors.pages.Dashboard.Settings.Variables.Edit.RollupVariable.rollupOptionsQueryInputV2}
          width={30}
        />
      </>
    );
  }
}
