import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import $ from 'jquery';
import dt from 'datatables.net';
import { SearchInput } from '@patternfly/react-core';
import { TextInput } from '@patternfly/react-core';
import { ToggleGroup, ToggleGroupItem, ToggleGroupItemProps } from '@patternfly/react-core';
import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import '@patternfly/react-core/dist/styles/base.css';

$.DataTable = dt;

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const columnNames = {
  name: 'Repositories',
  branches: 'Branches',
  prs: 'Pull requests',
  workspaces: 'Workspaces',
  lastCommit: 'Last commit',
};

const repositories: Repository[] = [
  { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
  { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
  { name: 'one - 3', branches: 'two - 3', prs: 'three - 3', workspaces: 'four - 3', lastCommit: 'five - 3' },
];

const data = [
  ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$3,120'],
  ['Garrett Winters', 'Director', 'Edinburgh', '8422', '2011/07/25', '$5,300'],
];

type ExampleType = 'default' | 'compact' | 'compactBorderless';

const Dashboard: React.FunctionComponent = () => {
  const ref = React.useRef(null);
  const apiRef = React.useRef<any>(null);

  const [value, setValue] = React.useState('');

  const onChange = (value: string) => {
    console.log(apiRef.current, value);
    apiRef.current?.search(value).draw();
    setValue(value);
  };

  const [exampleChoice, setExampleChoice] = React.useState<ExampleType>('compact');

  const onExampleTypeChange: ToggleGroupItemProps['onChange'] = (_isSelected, event) => {
    const id = event.currentTarget.id;
    setExampleChoice(id as ExampleType);
  };

  React.useEffect(() => {
    apiRef.current = $(ref.current).DataTable({
      paging: true,
      searching: true,
      data: repositories,
      columns: [
        { data: 'name' },
        { data: 'branches' },
        { data: 'prs' },
        { data: 'workspaces' },
        { data: 'lastCommit' },
      ],
    });

    return () => {
      apiRef.current.destroy();
    };
  }, []);

  React.useEffect(() => {
    console.log(apiRef.current);
  }, [exampleChoice]);

  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        Datatable
      </Title>
      <div style={{ padding: '16px', backgroundColor: 'white', marginRight: '48px' }}>
        <div style={{ paddingBottom: '16px' }}>
          <ToggleGroup aria-label="Default with single selectable">
            <ToggleGroupItem
              text="Default"
              buttonId="default"
              isSelected={exampleChoice === 'default'}
              onChange={onExampleTypeChange}
            />
            <ToggleGroupItem
              text="Compact"
              buttonId="compact"
              isSelected={exampleChoice === 'compact'}
              onChange={onExampleTypeChange}
            />
            <ToggleGroupItem
              text="Compact borderless"
              buttonId="compactBorderless"
              isSelected={exampleChoice === 'compactBorderless'}
              onChange={onExampleTypeChange}
            />
          </ToggleGroup>
        </div>
        <TextInput placeholder="Search table" value={value} type="text" onChange={onChange} />

        <table
          ref={ref}
          className={`pf-c-table pf-m-grid-md ${exampleChoice != 'default' ? 'pf-m-compact' : ''} ${
            exampleChoice !== 'compactBorderless' ? 'pf-m-no-border-rows' : ''
          }`}
          role="grid"
          aria-label="This is a simple table example"
          id="table-basic"
          style={{ width: '100%' }}
        >
          {/*    <TableComposable
          ref={ref}
          variant={exampleChoice !== 'default' ? 'compact' : undefined}
          borders={exampleChoice !== 'compactBorderless'}
          style={{ width: '100%' }}
        > */}
          <caption>Simple table using composable components</caption>
          <thead>
            <tr role="row">
              <th role="columnheader" scope="col">
                {columnNames.name}
              </th>
              <th role="columnheader" scope="col">
                {columnNames.branches}
              </th>
              <th role="columnheader" scope="col">
                {columnNames.prs}
              </th>
              <th role="columnheader" scope="col">
                {columnNames.workspaces}
              </th>
              <th role="columnheader" scope="col">
                {columnNames.lastCommit}
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup"></tbody>
        </table>
      </div>

      <div style={{ padding: '16px', backgroundColor: 'white', marginRight: '48px' }}>
        <React.Fragment>
          <ToggleGroup aria-label="Default with single selectable">
            <ToggleGroupItem
              text="Default"
              buttonId="default"
              isSelected={exampleChoice === 'default'}
              onChange={onExampleTypeChange}
            />
            <ToggleGroupItem
              text="Compact"
              buttonId="compact"
              isSelected={exampleChoice === 'compact'}
              onChange={onExampleTypeChange}
            />
            <ToggleGroupItem
              text="Compact borderless"
              buttonId="compactBorderless"
              isSelected={exampleChoice === 'compactBorderless'}
              onChange={onExampleTypeChange}
            />
          </ToggleGroup>
          <TableComposable
            aria-label="Simple table"
            variant={exampleChoice !== 'default' ? 'compact' : undefined}
            borders={exampleChoice !== 'compactBorderless'}
          >
            <Caption>Simple table using composable components</Caption>
            <Thead>
              <Tr>
                <Th>{columnNames.name}</Th>
                <Th>{columnNames.branches}</Th>
                <Th>{columnNames.prs}</Th>
                <Th>{columnNames.workspaces}</Th>
                <Th>{columnNames.lastCommit}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {repositories.map((repo) => (
                <Tr key={repo.name}>
                  <Td dataLabel={columnNames.name}>{repo.name}</Td>
                  <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                  <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                  <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                  <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </React.Fragment>
      </div>
    </PageSection>
  );
};

export { Dashboard };
