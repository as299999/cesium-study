import { useEffect, useState } from 'react';
import { Viewer, Cartesian3, Ellipsoid, Math } from 'cesium';
import * as dat from 'dat.gui';
import styles from './index.less';

import Camera from './Camera';
import Model from './Model';


const cameraParams = {
  position: {
    height: 4000,
    longitude: 113.318977,
    latitude: 23.114155,
  },
  headingPitchRoll: {
    heading: 360,
    pitch: -89.897722,
    roll: 0,
  },
}

const HomePage = () => {

  useEffect(() => {
    const viewer = new Viewer('cesiumContainer', {});

    const gui = new dat.GUI({
      name: 'Cesium GUI',
      width: 450,
      autoPlace: true,
      closed: false
    })
    gui.domElement.style = 'position:absolute;top:10px;left:10px;';

    const camera = new Camera(viewer, gui, cameraParams);
    // const model = new Model(viewer, gui, '', {})
    


    
    // listen_value.onChange((value) => {
    //   console.log(cameraParams)
    // })
    
    

  }, [])

  return (
    <div className={styles.container}>
      <div id="cesiumContainer" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

export default HomePage;