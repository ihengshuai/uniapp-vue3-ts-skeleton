import type { IGlobalAppDataOpts } from "@/typings/common/app-data";

export function useGlobalAppData() {
  const globalAppData: IGlobalAppDataOpts = getApp<IGlobalAppDataOpts>().globalData!;

  // 全局初始化数据占位
  // 需要的数据需定义到app-data.d.ts中
  setGlobaApplData({
    appTitle: "uni-app",
  });

  function setGlobaApplData(data: IGlobalAppDataOpts) {
    Object.assign(globalAppData, data);
  }

  return {
    globalAppData,
    setGlobaApplData,
  };
}
