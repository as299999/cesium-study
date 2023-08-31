import { useEffect, useState } from 'react';
import { Viewer, Cartesian3, Ellipsoid, Math } from 'cesium';
import * as dat from 'dat.gui';
import styles from './index.less';


const cameraParams = {
  position: {
    height: 55871,
    longitude: 113.976006,
    latitude: 22.475603
  },
  headingPitchRoll: {
    heading: 360,
    pitch: -89.897722,
    roll: 0
  }
}

const HomePage = () => {

  useEffect(() => {
    const viewer = new Viewer('cesiumContainer', {});
    const camera = viewer.scene.camera;

    // 设置相机信息
    camera.setView({
      destination: Cartesian3.fromDegrees(
        cameraParams.position.longitude,
        cameraParams.position.latitude,
        cameraParams.position.height
        ,Ellipsoid.WGS84),
      orientation: {
        heading: Math.toRadians(cameraParams.headingPitchRoll.heading),
        pitch: Math.toRadians(cameraParams.headingPitchRoll.pitch),
        roll: Math.toRadians(cameraParams.headingPitchRoll.roll)
      }
    })

    const gui = new dat.GUI({
      name: 'Cesium GUI',
      width: 450,
      autoPlace: true,
      closed: false
    })
    gui.domElement.style = 'position:absolute;top:10px;left:10px;';

    let cameraFolder = gui.addFolder('Camera');
    cameraFolder.open();

    let listen_value = cameraFolder
      .add(cameraParams.position, 'longitude')
      .name('longitude [经度]')
      .min(-360)
      .max(360)
      .step(0.000001)
    
    listen_value.onChange((value) => {
      console.log(cameraParams)
    })
    
    

  }, [])

  return (
    <div className={styles.container}>
      <div id="cesiumContainer"></div>
    </div>
  );
}

export default HomePage;