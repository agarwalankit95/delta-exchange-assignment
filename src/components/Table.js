import React from "react";
import { FixedSizeList as List } from "react-window";

import TableRow from './TableRow.js';

const Table = ({error, productList, listUpdated}) => {
  return (
    <>
      <div className="table sticky">
        <div className="tr">
          <div className="th">Symbol</div>
          <div className="th">Description</div>
          <div className="th">Underlying Asset</div>
          <div className="th">Mark Price</div>
        </div>
        {error && (
          <div className="tr">Something went wrong!! Please refresh page.</div>
        )}
        {!error && productList.length === 0 && (
          <div className="tr">Fetching Products...</div>
        )}
      </div>
      {!error && productList.length > 0 && (
        <List
          height={882}
          itemCount={productList.length}
          itemData={{productList, listUpdated}}
          itemSize={50}
          width={1649}
        >
          {TableRow}
        </List>
      )}
    </>
  );
};

export default Table;