import { useEffect, useState } from "react";
import { BrowserQRCodeReader } from '@zxing/library';
const codeReader = new BrowserQRCodeReader();

// console.log(Instascan);

export default function QrReader({updateData}){
  const scanQRCode = async () => {
    try {
      // const selectedDeviceId = await codeReader.getVideoInputDevices().then((videoInputDevices) => videoInputDevices[0].deviceId); // You can choose the desired video input device here
      const videoInputDevices = await codeReader.getVideoInputDevices();
      console.log('videoInputDevices', videoInputDevices);
      const rearCamera = videoInputDevices.find((device) => device.label.toLocaleLowerCase().includes('back'));
      console.log('rearCamera', rearCamera);
      const selectedDeviceId = rearCamera ? rearCamera.deviceId : videoInputDevices[0].deviceId;

      const result = await codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'videoElementId');
      const data = JSON.parse(result.text);
      updateData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() =>{ scanQRCode(); }, []);

  return <div>
  <video id="videoElementId" width="100%" autoPlay></video>
</div>;
}