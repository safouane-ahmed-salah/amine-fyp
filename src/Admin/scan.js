import { useState } from "react";
// import { QrReader } from 'react-qr-reader';
import QrReader from 'react-qr-scanner';

export default function Scan(){
const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        // onScan={(result, error) => {
        //   if (!!result) {
        //     setData(result?.text);
        //   }

        //   if (!!error) {
        //     console.info(error);
        //   }
        // }}
        // constraints={{
        //     facingMode: 'environment'
        // }}
        style={{
            height: 240,
            width: 320,
        }}
        delay={100}
        // style={{ width: '100%' }}
        onScan={setData}
      />
      <p>{data}</p>
    </>
  );
}