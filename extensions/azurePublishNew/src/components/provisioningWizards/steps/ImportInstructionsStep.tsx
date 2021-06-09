// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from 'react';
import formatMessage from 'format-message';
import { Text } from 'office-ui-fabric-react/lib/Text';
import styled from '@emotion/styled';
import { FluentTheme } from '@uifabric/fluent-theme';
import { Link, Stack } from 'office-ui-fabric-react';

const Content = styled(Stack)`
  padding: 0px 20px;
`;

const Title = styled(Text)`
  font-size: ${FluentTheme.fonts.xLarge.fontSize};
  margin: 8px 0;
`;

const Summary = styled.div`
  margin: 8px 0;
`;

const ResourceTitle = styled(Stack)`
  margin: 4px 0;
`;

const Details = styled(Stack)`
  margin: 10px 0;
`;

const LearnMoreLink = styled(Link)`
  user-select: none;
  font-size: 14px;
`;

export const ImportInstructionsStep = () => {
  return (
    <Content>
      <Title>{formatMessage('Use existing resources')}</Title>
      <Summary>
        {formatMessage.rich(
          '<text>Select this option if you have access to existing Azure resources and their associated values.</text>',
          {
            text: ({ children }) => <Text key="instruction_0">{children}</Text>,
          }
        )}
      </Summary>
      <Summary>
        {formatMessage.rich(
          '<text>Copy and paste the JSON file containing the values of your existing Azure resources, from the Azure portal. This file includes values for some or all of the following:</text>',
          {
            text: ({ children }) => <Text key="instruction_1">{children}</Text>,
          }
        )}
      </Summary>

      <Details>
        <ResourceTitle>
          <Text>- {formatMessage('Microsoft Application Registration')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Azure Hosting')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Microsoft Bot Channels Registration')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Azure Cosmos DB')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Application Insights')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Azure Blob Storage')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Microsoft Language Understanding (LUIS)')}</Text>
        </ResourceTitle>
        <ResourceTitle>
          <Text>- {formatMessage('Microsoft QnA Maker')}</Text>
        </ResourceTitle>
      </Details>
      <LearnMoreLink href="https://aka.ms/composer-getstarted-importpublishing" target="_blank">
        {formatMessage('Learn More')}
      </LearnMoreLink>
    </Content>
  );
};
