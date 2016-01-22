/**
 * 创建情景颜色类
 * @param _global
 * @param attrName
 * @param classPrefix
 * @param scenes
 * @returns {{}}
 * 用法:
 * helper.createStyleClassColorAttr(global,'backgroundColor',['btn', 'panel'])
 * 返回:
 * {btnPrimary:{backgroundColor:_global.primaryColor,......,panelError:{backgroundColor:_global.errorColor}}
 *
 */
export function createStyleClassColorAttr(_global,
                                          attrName = 'color',
                                          classPrefix = ['text'],
                                          scenes = ['Default', 'Primary', 'Muted', 'Info', 'Warnning', 'Danger', 'Success', 'Error']) {

  const classNames = {};
  classPrefix.map(
    (pre)=> {
      scenes.map(
        (scene)=> {
          let _attr = {};
          let sceneColor = scene.toLowerCase() + 'Color';
          _attr[attrName] = _global[sceneColor];
          classNames[pre + scene] = _attr;
        }
      );
    }
  );

  return classNames;

}

/**
 * test1
 * @returns {*}
 */
export function test1() {
  return this.name;
}
