import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Props {
  rows: any;
  columns: GridColDef[];
}

export const DataTable = (props: Props) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  );
};
