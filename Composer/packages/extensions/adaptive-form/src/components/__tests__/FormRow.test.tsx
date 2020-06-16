// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { render } from '@bfc/test-utils';

import { FormRow, FormRowProps, _getRowProps } from '../FormRow';

jest.mock('../SchemaField', () => ({ SchemaField: () => <div data-testid="SchemaField" /> }));

const fieldChangeMock = jest.fn();
const field: FormRowProps = {
  onChange: jest.fn().mockReturnValue(fieldChangeMock),
  row: '',
  definitions: {},
  depth: 0,
  id: 'test',
  name: 'row',
  schema: {
    properties: {
      single: {
        type: 'string',
      },
      row1: { type: 'boolean' },
      row2: { type: 'number' },
    },
  },
  value: {
    single: 'single value',
  },
  uiOptions: {},
};

describe('<FormRow />', () => {
  describe('when row is an array', () => {
    it('renders a schema field for each row', () => {
      const { getAllByTestId } = render(<FormRow {...field} row={['row1', 'row2']} />);
      expect(getAllByTestId('SchemaField')).toHaveLength(2);
    });
  });

  describe('when row is single field', () => {
    it('renders a single schema field', () => {
      const { getAllByTestId } = render(<FormRow {...field} row="single" />);
      expect(getAllByTestId('SchemaField')).toHaveLength(1);
    });
  });
});

describe('_getRowProps', () => {
  it('computes a new id and name', () => {
    expect(_getRowProps(field, 'single').id).toEqual('test.single');
    expect(_getRowProps(field, 'single').name).toEqual('single');
  });

  it('resets label unless it is false', () => {
    expect(_getRowProps({ ...field, label: false }, 'single').label).toBe(false);
    expect(_getRowProps({ ...field, label: 'row label' }, 'single').label).toBe(undefined);
  });

  it('resolves prop schemas', () => {
    expect(_getRowProps(field, 'single').schema).toEqual({ type: 'string' });
    expect(_getRowProps(field, 'doesnotexist').schema).toEqual({});
  });

  it('gets the correct rawErrors', () => {
    expect(_getRowProps({ ...field, rawErrors: { single: 'single errors' } }, 'single').rawErrors).toEqual(
      'single errors'
    );
  });

  it('determines if the field is required', () => {
    expect(_getRowProps({ ...field, schema: { ...field.schema, required: ['single'] } }, 'single').required).toBe(true);
  });

  it('gets the correct value', () => {
    expect(_getRowProps(field, 'single').value).toEqual('single value');
  });

  it('binds the onChange to the field', () => {
    expect(_getRowProps(field, 'single').onChange).toEqual(fieldChangeMock);
    expect(field.onChange).toHaveBeenCalledWith('single');
  });
});
