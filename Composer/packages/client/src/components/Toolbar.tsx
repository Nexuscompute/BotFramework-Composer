// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useMemo } from 'react';
import formatMessage from 'format-message';
import { ActionButton, CommandButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps, IIconProps } from 'office-ui-fabric-react/lib';
import { EditorExtension, mergePluginConfigs, PluginConfig } from '@bfc/extension-client';
import { useRecoilValue } from 'recoil';

import plugins from '../plugins';
import { currentProjectIdState, schemasState } from '../recoilModel';
import { useShell } from '../shell/useShell';
import { colors } from '../constants';

// -------------------- Styles -------------------- //

export const headerSub = css`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray30};
`;

export const leftActions = css`
  position: relative;
  display: flex;
  align-items: stretch;
  height: 44px;
`;

export const rightActions = css`
  position: relative;
  height: 44px;
  margin-right: 20px;
`;

export const actionButton = css`
  font-size: 16px;
  margin-top: 2px;
  margin-left: 15px;
`;

// -------------------- IToolbarItem -------------------- //

export type IToolbarItem = {
  type: string;
  element?: React.ReactElement;
  text?: string;
  buttonProps?: {
    iconProps?: IIconProps;
    onClick?: () => void;
  };
  menuProps?: IContextualMenuProps;
  align?: string;
  dataTestid?: string;
  disabled?: boolean;
};

// -------------------- Toolbar -------------------- //

const renderItemList = (item: IToolbarItem, index: number) => {
  if (item.type === 'element') {
    return <Fragment key={index}>{item.element}</Fragment>;
  } else if (item.type === 'action') {
    return (
      <ActionButton
        key={index}
        css={actionButton}
        {...item.buttonProps}
        data-testid={item.dataTestid}
        disabled={item.disabled}
      >
        {item.text}
      </ActionButton>
    );
  } else if (item.type === 'dropdown') {
    return (
      <CommandButton
        key={index}
        css={actionButton}
        data-testid={item.dataTestid}
        disabled={item.disabled}
        iconProps={item.buttonProps?.iconProps}
        menuProps={item.menuProps}
        text={item.text}
      />
    );
  } else {
    return null;
  }
};

type ToolbarProps = {
  toolbarItems?: Array<IToolbarItem>;
};

// support ActionButton or React Elements, the display order is array index.
// action = {type:action/element, text, align, element, buttonProps: use
// fabric-ui IButtonProps interface}
export const Toolbar = (props: ToolbarProps) => {
  const { toolbarItems = [], ...rest } = props;
  const projectId = useRecoilValue(currentProjectIdState);
  const schemas = useRecoilValue(schemasState(projectId));
  const shellForPropertyEditor = useShell('DesignPage', projectId);

  const pluginConfig: PluginConfig = useMemo(() => {
    const sdkUISchema = schemas?.ui?.content ?? {};
    const userUISchema = schemas?.uiOverrides?.content ?? {};
    return mergePluginConfigs({ uiSchema: sdkUISchema }, plugins, { uiSchema: userUISchema });
  }, [schemas?.ui?.content, schemas?.uiOverrides?.content]);

  const left: IToolbarItem[] = [];
  const right: IToolbarItem[] = [];

  for (const item of toolbarItems) {
    switch (item.align) {
      case 'left':
        left.push(item);
        break;
      case 'right':
        right.push(item);
    }
  }

  return (
    <EditorExtension plugins={pluginConfig} projectId={projectId} shell={shellForPropertyEditor}>
      <div aria-label={formatMessage('toolbar')} css={headerSub} role="region" {...rest}>
        <div css={leftActions}>{left.map(renderItemList)} </div>
        <div css={rightActions}>{right.map(renderItemList)}</div>
      </div>
    </EditorExtension>
  );
};
