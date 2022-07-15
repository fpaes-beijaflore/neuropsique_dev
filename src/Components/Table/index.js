import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import React from 'react';

function TableComp({ rows, columns }) {
  console.log({ rows, columns });

  return (
    <div>
      <Grid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    </div>
  );
}

export default TableComp;
