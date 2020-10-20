// import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
// import { VariableSizeGrid as Grid } from 'react-window';
// import ResizeObserver from 'rc-resize-observer';
// import classNames from 'classnames';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
// // import { Table } from 'antd';

// // These item sizes are arbitrary.
// // Yours should be based on the content of the item.
// const columnWidths = new Array(1000)
//   .fill(true)
//   .map(() => 75 + Math.round(Math.random() * 50));
// const rowHeights = new Array(1000)
//   .fill(true)
//   .map(() => 25 + Math.round(Math.random() * 50));
 
// const Cell = ({ columnIndex, rowIndex, style }) => (
//   <div style={style}>
//     Item {rowIndex},{columnIndex}
//   </div>
// );
 
// export function VirtualTable(props: any) {
//   const { columns, scroll } = props;
//   const [tableWidth, setTableWidth] = useState(0);
//   const widthColumnCount = columns.filter(({ width }: any) => !width).length;
//   const mergedColumns = columns.map((column: any) => {
//     if (column.width) {
//       return column;
//     }

//     return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
//   });
//   const gridRef = useRef();
//   const [connectObject] = useState(() => {
//     const obj = {};
//     Object.defineProperty(obj, 'scrollLeft', {
//       get: () => null,
//       set: (scrollLeft) => {
//         if (gridRef.current) {
//           (gridRef as any).current.scrollTo({
//             scrollLeft,
//           });
//         }
//       },
//     });
//     return obj;
//   });

//   const resetVirtualGrid = () => {
//     (gridRef as any).current.resetAfterIndices({
//       columnIndex: 0,
//       shouldForceUpdate: false,
//     });
//   };

//   useEffect(() => resetVirtualGrid, [tableWidth]);

//   const renderVirtualList = (rawData: any, { scrollbarSize, ref, onScroll }: any) => {
//     ref.current = connectObject;
//     const totalHeight = rawData.length * 54;
//     return (
//       <Grid
//         ref={gridRef as any}
//         className="virtual-grid"
//         columnCount={mergedColumns.length}
//         columnWidth={(index) => {
//           const { width } = mergedColumns[index];
//           return totalHeight > scroll.y && index === mergedColumns.length - 1
//             ? width - scrollbarSize - 1
//             : width;
//         }}
//         height={scroll.y}
//         rowCount={rawData.length}
//         rowHeight={() => 54}
//         width={tableWidth}
//         onScroll={({ scrollLeft }) => {
//           onScroll({
//             scrollLeft,
//           });
//         }}
//       >
//         {({ columnIndex, rowIndex, style }) => (
//           <div
//             className={classNames('virtual-table-cell', {
//               'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
//             })}
//             style={style}
//           >
//             {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
//           </div>
//         )}
//       </Grid>
//     );
//   };

//   return (
//     <ResizeObserver
//       onResize={({ width }: any) => {
//         setTableWidth(width);
//       }}
//     >
//       <TableContainer>
//         <Table
//           {...props}
//         >
//           {/* <TableHead>
//             <TableRow>
//               {columns.map((column: any) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align ? column.align as any : 'right'}
//                   style={{ minWidth: column.minWidth ? column.minWidth : 100 }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead> */}

//           <TableBody>
//             <Grid
//               ref={gridRef as any}
//               className="virtual-grid"
//               columnCount={mergedColumns.length}
//               columnWidth={(index) => {
//                 const { width } = mergedColumns[index];
//                 return totalHeight > scroll.y && index === mergedColumns.length - 1
//                   ? width - scrollbarSize - 1
//                   : width;
//               }}
//               height={scroll.y}
//               rowCount={rawData.length}
//               rowHeight={() => 54}
//               width={tableWidth}
//               onScroll={({ scrollLeft }) => {
//                 onScroll({
//                   scrollLeft,
//                 });
//               }}
//             >
//               {({ columnIndex, rowIndex, style }) => (
//                 <div
//                   className={classNames('virtual-table-cell', {
//                     'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
//                   })}
//                   style={style}
//                 >
//                   {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
//                 </div>
//               )}
//             </Grid>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </ResizeObserver>
//   );
// } // Usage

// const columns = [
//   {
//     title: 'A',
//     dataIndex: 'key',
//     width: 150,
//   },
//   {
//     title: 'B',
//     dataIndex: 'key',
//   },
//   {
//     title: 'C',
//     dataIndex: 'key',
//   },
//   {
//     title: 'D',
//     dataIndex: 'key',
//   },
//   {
//     title: 'E',
//     dataIndex: 'key',
//     width: 200,
//   },
//   {
//     title: 'F',
//     dataIndex: 'key',
//     width: 100,
//   },
// ];
// const data = Array.from(
//   {
//     length: 100000,
//   },
//   (_, key) => ({
//     key,
//   }),
// );
// // ReactDOM.render(
// //   <VirtualTable
// //     columns={columns}
// //     dataSource={data}
// //     scroll={{
// //       y: 300,
// //       x: '100vw',
// //     }}
// //   />,
// //   document.getElementById('container'),
// // );
// node_modules
import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';

// These item sizes are arbitrary.
// Yours should be based on the content of the item.
const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const Cell = ({ columnIndex, rowIndex, style }: any) => (
  <div style={style}>
    Item {rowIndex},{columnIndex}
  </div>
);
 
export function LogsSearchTable(props: any) {
  const [tableWidth, setTableWidth] = useState(0);
  return (
    <div style={{ width: '100%' }}>
    <ResizeObserver
      onResize={({ width }: any) => {
        console.log('resize')
        setTableWidth(width);
      }}
    >
      <Grid
        columnCount={1000}
        columnWidth={index => columnWidths[index]}
        height={150}
        rowCount={1000}
        rowHeight={index => rowHeights[index]}
        width={tableWidth}
      >
        {Cell}
      </Grid>
    </ResizeObserver>
    </div>
  );
}