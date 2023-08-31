import { Cesium } from 'umi';

export default class Camera {
  viewer: Cesium.Viewer;
  
  constructor(
    viewer: Cesium.Viewer
  ) {
    this.viewer = viewer
  }
}