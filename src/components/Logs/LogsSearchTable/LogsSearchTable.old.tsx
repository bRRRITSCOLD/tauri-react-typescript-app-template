// import React, { useState } from "react";
// import { AutoSizer, Column, Table } from "react-virtualized";
// import Draggable from "react-draggable";
// import { Paper, TableRow } from "@material-ui/core";
// import { Height } from "@material-ui/icons";
// import { v4 as uuid } from 'uuid';

// // const TOTAL_WIDTH = 500;

// // export function LogsSearchTable(props: any) {
// //   const [state, setState] = useState({
// //     widths: {
// //       level: 0.33,
// //       date: 0.33,
// //       message: 0.33
// //     }
// //   });

// //   function  resizeRow({ dataKey, deltaX }: any) {
// //     const prevWidths = state.widths;
// //     const percentDelta = deltaX / TOTAL_WIDTH;

// //     // This is me being lazy :)
// //     const nextDataKey = dataKey === "name" ? "location" : "description";

// //     setState({
// //       ...state,
// //       widths: {
// //         ...prevWidths,
// //         [dataKey]: (prevWidths as any)[dataKey] + percentDelta,
// //         [nextDataKey]: (prevWidths as any)[nextDataKey] - percentDelta
// //       }
// //     });
// //   }

// //   function headerRenderer({
// //     columnData,
// //     dataKey,
// //     disableSort,
// //     label,
// //     sortBy,
// //     sortDirection
// //   }: any) {
// //     return (
// //       <React.Fragment key={dataKey}>
// //         <div className="ReactVirtualized__Table__headerTruncatedText">
// //           {label}
// //         </div>
// //         <Draggable
// //           axis="x"
// //           defaultClassName="DragHandle"
// //           defaultClassNameDragging="DragHandleActive"
// //           onDrag={(event: any, { deltaX }: any) =>
// //             resizeRow({
// //               dataKey,
// //               deltaX
// //             })
// //           }
// //           position={{ x: 0 } as any}
// //           // zIndex={999}
// //         >
// //           <span className="DragHandleIcon">⋮</span>
// //         </Draggable>
// //       </React.Fragment>
// //     );
// //   };
  
// //   return (
// //     <AutoSizer>
// //       {({width, height}) => (
// //         <Table
// //           width={width}
// //           height={height}
// //           headerHeight={20}
// //           rowHeight={30}
// //           rowCount={props.logEntries.length}
// //           rowGetter={({ index }: any) => props.logEntries[index]}
// //           headerRowRenderer={({
// //             className,
// //             columns,
// //             style,
// //             scrollbarWidth,
// //             height,
// //             width,
// //           }) => {
// //             console.log('headers', columns);
// //             return (
// //               <div>
// //                 {columns.map((column) => {
// //                 console.log(column);
// //                   return (
// //                       <React.Fragment key={uuid()}>
// //                         <div className="ReactVirtualized__Table__headerTruncatedText">
// //                           {column}
// //                         </div>
// //                         <Draggable
// //                           axis="x"
// //                           defaultClassName="DragHandle"
// //                           defaultClassNameDragging="DragHandleActive"
// //                           onDrag={(event: any, { deltaX }: any) =>
// //                             resizeRow({
// //                               dataKey: column,
// //                               deltaX
// //                             })
// //                           }
// //                           position={{ x: 0 } as any}
// //                           // zIndex={999}
// //                         >
// //                           <span className="DragHandleIcon">⋮</span>
// //                         </Draggable>
// //                       </React.Fragment>
// //                   )
// //                 })}
// //               </div>
// //             )
// //           }}
// //         >
// //         </Table>
// //       )}
// //     </AutoSizer>
// //   );
// // }

// const list = new Array(200).fill(0).map((_, index) => ({
//   index,
//   label: `Row ${index}`
// }));

// const rowGetter = ({ index }: any) => list[index];

// // This is a custom header row rendered
// // You should used all of the specified params,
// // But you can also add your own decorated behavior.
// const headerRowRenderer = ({
//   className,
//   columns,
//   style
// }: any) => (
//   <div
//     className={className}
//     // role='row'
//     style={{ ...style, display: 'flex' }}
//   >
//     {columns}
//   </div>
// )

// // This is a custom header example for a single cell
// // You have access to all of the named params,
// // But you don't necessarily need to use them all.
// const headerRenderer = ({
//   columnData,
//   dataKey,
//   disableSort,
//   label,
//   sortBy,
//   sortDirection
// }: any) => (
//   <div>#</div>
// )

// export function LogsSearchTable(props: any) {
  
//   return (
//     <AutoSizer>
//       {({width , height}) => {

//         return (
//           <Table
//     width={width}
//     component="Paper"
//     height={height}
//     headerHeight={20}
//     rowHeight={30}
//     style={{ overflowX: 'auto' }}
//     rowCount={props.logEntries.length}
//     rowGetter={({index}) => props.logEntries[index]}
//     rowStyle={{ display: 'flex', justifyContent: 'space-evenly' }}
//     headerStyle={{ display: 'flex', justifyContent: 'space-evenly' }}
//     >
//     <Column label="Date" dataKey="date" width={100} />
//     <Column label="Level" dataKey="level" width={100} />
//     <Column label="Hash" dataKey="hash" width={100} />
//     <Column width={200} label="Message" dataKey="message" />
//   </Table>
//         )
//       }}
//     </AutoSizer>
//   )
// }

export {};

