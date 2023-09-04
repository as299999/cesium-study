import * as Cesium from 'cesium';

export const getPosition = (position: Cesium.Cartesian3) => {
    // 把 x, y, z 转换为 经纬度
    let positionCartographic = Cesium.Cartographic.fromCartesian(
        position,
        Cesium.Ellipsoid.WGS84
    )

    return {
        // 将弧度转换为度数。
        longitude: Cesium.Math.toDegrees(positionCartographic.longitude),
        latitude: Cesium.Math.toDegrees(positionCartographic.latitude),
        height:positionCartographic.height || 0
    }
}