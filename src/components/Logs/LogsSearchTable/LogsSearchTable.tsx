import * as React from "react";
// import { useStyletron, withStyle } from "baseui";
// import {
//   StyledTable,
//   StyledHead,
//   StyledHeadCell,
//   StyledRow,
//   StyledCell
// } from "baseui/table";
// import { Checkbox } from "baseui/checkbox";

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import { Table, TableHead, TableCell, TableRow, Checkbox, withStyles, TableBody } from "@material-ui/core";

const rows = [
  [
    "eastern_north_carolina_652_x",
    652,
    "100 Broadway st. New York City, New York"
  ],
  ["modesto_229_x", 229, "100 Market st. San Francisco, California"]
];

const headers = ["id", "city_id", "city_slug"];

const WIDTH = 1500;

const cache = new CellMeasurerCache({
  defaultHeight: 36,
  // fixedHeight: true
});

// const IDHeader = withStyles(StyledHeadCell, { width: "20px" });
// const IDCell = withStyles(StyledCell, { maxWidth: "20px" });

export function LogsSearchTable(props: any) {
  // const [css] = useStyletron();
  return (
    <div style={{ height: "100%", overflowX: 'auto' }}>
      <Table
      style={{ height: '100%'}}
        // role="grid"
        // aria-colcount={headers.length + 1}
        // aria-rowcount={rows.length}
      >
        <TableHead style={{ width: `${WIDTH}px` }}>
          <div role="columnheader" style={{ width: "40px" }} key={"header_checkbox"}>
            <Checkbox
              id="header_checkbox"
              // checked={!!rows.length && checked.length === rows.length}
              // onChange={({ target: { checked } }) =>
              //   onSelect(null, checked, true)
              // }
            />
          </div>
          {headers.map(header => (
            <TableCell role="columnheader" key={header}>
              {header}
            </TableCell>
          ))}
        </TableHead>

        <TableBody style={{ height: "100%", width: '100%' }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={1000}
                width={WIDTH}
                rowCount={rows.length}
                rowHeight={cache.rowHeight}
                deferredMeasurementCache={cache}
                rowRenderer={({ index, key, parent, style }) => {
                  console.log('row render')
                  return (
                    <CellMeasurer
                      cache={cache}
                      columnIndex={0}
                      key={key}
                      parent={parent}
                      rowIndex={index}
                    >
                      <TableRow role="row" key={key} style={style}>
                        <TableCell
                          role="gridcell"
                          style={{ width: "40px" }}
                          key={"header_checkbox"}
                        >
                          <Checkbox
                          // id={`item_${index}_checkbox`}
                          // checked={checked.includes(index)}
                          // onChange={({ target: { checked } }) =>
                          //   onSelect(index, checked)
                          // }
                          />
                        </TableCell>
                        {headers.map((header, i) => (
                          <TableCell role="gridcell" key={header}>
                            {rows[index][i]}
                          </TableCell>
                        ))}
                      </TableRow>
                    </CellMeasurer>
                  )
                }}
              />
            )}
          </AutoSizer>
        </TableBody>
      </Table>
    </div>
  );
};
