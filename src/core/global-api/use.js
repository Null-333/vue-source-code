/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 这里的this指向Vue的构造函数
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    // 将Vue构造函数存储到第一个参数
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      // 如果plugin是一个对象必须有install方法，这里会调用
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 如果直接传入的function，直接调用
      plugin.apply(null, args)
    }
    // 将该插件存储到this._installedPlugins中，可判断是否重复定义
    installedPlugins.push(plugin)
    return this
  }
}
