import { useEffect, useState } from "react";
import { QrReader } from 'react-qr-reader';
import { BrowserQRCodeReader } from '@zxing/library';
const codeReader = new BrowserQRCodeReader();




export default function Scan(){
  const [data, setData] = useState('No result');
  const scanQRCode = async () => {
    try {
      const selectedDeviceId = await codeReader.getVideoInputDevices().then((videoInputDevices) => videoInputDevices[0].deviceId); // You can choose the desired video input device here
  
      const result = await codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'videoElementId');
      console.log('QR Code Result:', result.text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(scanQRCode, []);

  return <div>
  <video id="videoElementId" width="320" height="240" autoPlay></video>
</div>;

  // return (
  //   <>   
  //     <QrReader
  //       onScan={(result, error) => {
  //         if (!!result) {
  //           setData(result?.text);
  //         }
  //         if (!!error) {
  //           console.info(error);
  //         }
  //       }}
  //       constraints={{
  //           facingMode: 'environment'
  //       }}
  //       style={{ width: '100%' }}
  //     />
  //     <p>{data}</p>
  //   </>
  // );
}