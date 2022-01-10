import React from "react";
import Table from './Table';

const App = () => {
  const [productList, updateProductList] = React.useState([]);
  const [checkUpdate, setCheckUpdate] = React.useState(false);
  const productFetchError = false;
  const fetchProducts = () => {
    fetch("https://api.delta.exchange/v2/products")
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          updateProductList(data.result);
          
          let socket = new WebSocket("wss://production-esocket.delta.exchange");
          
          socket.onopen = function(e) {
            console.log("Connection established");
            console.log("Subscribing to channel");
            socket.send(JSON.stringify({
              "type": "subscribe",
              "payload": {
                "channels": [
                  {
                    "name": "v2/ticker",
                    "symbols": data.result.map(obj => obj.symbol)
                  }
                ]
              }
            }));
          };
          
          socket.onmessage = function(event) {
            const markPriceData = JSON.parse(event.data);
            if (markPriceData.type === "v2/ticker") {
              updateProductList(productList => {
                const productIndex = productList.findIndex(product => product.symbol === markPriceData.symbol);
                productList[productIndex]['mark_price'] = markPriceData.mark_price;
                return productList;
              });
              setCheckUpdate(checkUpdate => !checkUpdate);
            }
          };
          
          socket.onclose = function(event) {
            if (event.wasClean) {
              console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
              console.log('[close] Connection died');
            }
          };
          
          socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
          };
        } else {
          productFetchError = true;
        }
      });
  };
  
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return <Table error={productFetchError} productList={productList} listUpdated={checkUpdate} />;
};

export default App;