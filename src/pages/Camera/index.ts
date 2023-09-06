import { Viewer, Camera, Cartesian3, Math, Ellipsoid } from 'cesium';
import { getPosition } from '@/utils/getPosition';


interface CameraParamsType {
  // degrees 摄像机观看方向
  direction?: {
    longitude?: number;
    latitude?: number;
    height?: number;
  };
  // degrees 摄像机所在位置
  position?: {
    longitude?: number;
    latitude?: number;
    height?: number;
  };
  // degrees
  headingPitchRoll?: {
    heading?: number;
    pitch?: number;
    roll?: number;
  };
}

const defaultParams = {
  direction: {
    height: -6373460.407714644,
    longitude: -76.0446209963375,
    latitude: -27.977613191730875,
  },
  position: {
    height: 26887007.08254164,
    longitude: 103.95537900366243,
    latitude: 27.66741874243775,
  },
  headingPitchRoll: {
    heading: 360,
    pitch: -89.97713228469502,
    roll: 0,
  },
};

export default class CameraClass {
  viewer: Viewer;
  camera: Camera;
  cameraParams: CameraParamsType;
  constructor (
    viewer: Viewer,
    gui: dat.GUI,
    cameraParams?: CameraParamsType,
  ) {
    this.viewer = viewer;
    this.camera = viewer.scene.camera;
    this.cameraParams = { ...defaultParams, ...cameraParams };
    this.setInit(gui);
    this.getInfo();
  }

  // 设置初始化
  setInit(gui: dat.GUI) {
    this.setView(this.cameraParams);
    this.setGui(gui, this.cameraParams);
  }

  // 获取信息
  getInfo () {
    let { heading, pitch, roll, position, direction } = this.camera;
    
    return {
      position: getPosition(position),
      direction: getPosition(direction),
      headingPitchRoll: {
        // 将弧度转换为度数。
        heading: Math.toDegrees(heading),
        pitch: Math.toDegrees(pitch),
        roll: Math.toDegrees(roll),
      }
    }
  }

  // 设置相机参数
  setView(cameraParams: any) {
    this.camera.setView({
      destination: Cartesian3.fromDegrees(
        cameraParams.position.longitude,
        cameraParams.position.latitude,
        cameraParams.position.height,
        Ellipsoid.WGS84
      ),
      orientation: {
        // 将度数转换为弧度。
        heading: Math.toRadians(cameraParams.headingPitchRoll.heading),
        pitch: Math.toRadians(cameraParams.headingPitchRoll.pitch),
        roll: Math.toRadians(cameraParams.headingPitchRoll.roll)
      }
    })
  }

  // 移动相机
  setFly(cameraParams: any) {
    this.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        cameraParams.position.longitude,
        cameraParams.position.latitude,
        cameraParams.position.height,
        Ellipsoid.WGS84
      ),
      orientation: {
        // 将度数转换为弧度。
        heading: Math.toRadians(cameraParams.headingPitchRoll.heading),
        pitch: Math.toRadians(cameraParams.headingPitchRoll.pitch),
        roll: Math.toRadians(cameraParams.headingPitchRoll.roll)
      }
    })
  }
  
  // 设置gui
  setGui(gui: dat.GUI, cameraParams: any) {
    let cameraFolder = gui.addFolder('Camera 摄像机');
    cameraFolder.open();

    cameraFolder
      .add(cameraParams.position, 'longitude')
      .name('longitude [经度]')
      .min(-360)
      .max(360)
      .step(0.000001)
      .onChange(() => {
        this.setView(cameraParams)
      })

    cameraFolder
      .add(cameraParams.position, 'latitude')
      .name('latitude [纬度]')
      .min(-360)
      .max(360)
      .step(0.000001)
      .onChange(() => {
        this.setView(cameraParams)
      })

    cameraFolder
      .add(cameraParams.position, 'height')
      .name('height [高度]')
      .min(1000)
      .max(10000000)
      .step(1)
      .onChange(() => {
        this.setView(cameraParams)
      })

    cameraFolder
      .add(cameraParams.headingPitchRoll, 'heading')
      .name('heading [朝向度]')
      .min(-360)
      .max(360)
      .step(0.000001)
      .onChange(() => {
        this.setView(cameraParams)
      })

    cameraFolder
      .add(cameraParams.headingPitchRoll, 'pitch')
      .name('pitch [倾斜度]')
      .min(-360)
      .max(360)
      .step(0.000001)
      .onChange(() => {
        this.setView(cameraParams)
      })

    cameraFolder
      .add(cameraParams.headingPitchRoll, 'roll')
      .name('roll [翻转度]')
      .min(-360)
      .max(360)
      .step(0.000001)
      .onChange(() => {
        this.setView(cameraParams)
      })


  }
}