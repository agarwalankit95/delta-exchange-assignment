import React from "react";

const TableRow = ({ data, index, style }) => {
  const {productList} = data;
  if (productList[index].mark_price === undefined) {
    productList[index]['mark_price'] = 'Fetching price...';
  }

  return (
    // inline style has to be used because of react-window package, it's a mandatory step
    <div style={{...style, "max-width": "100%"}} key={index}>
      <div className="table">
        <div className="tr">
          <div className="td">{productList[index].symbol}</div>
          <div className="td">{productList[index].description}</div>
          <div className="td">{productList[index].underlying_asset.symbol}</div>
          <div className="td">{productList[index].mark_price}</div>
        </div>
      </div>
    </div>
  )
};

export default TableRow;