import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
