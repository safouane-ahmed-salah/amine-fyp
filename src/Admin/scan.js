import { useState } from "react";
import { QrReader } from 'react-qr-reader';

export default function Scan(){
const [data, setData] = useState('No result');

  return (
    <>   
      <QrReader
        onScan={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{
            facingMode: 'environment'
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
}