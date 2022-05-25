// 该文件创建了Vue的构造函数，设置Vue实例的成员
// 即：在Vue的原型对象上添加了成员
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 这里没有使用Class的原因：
// 因为下面方法分别给Vue原型注册方法和属性
// 如果使用class，整个实现代码会很长
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 以下方法分别给Vue原型注册了方法或属性
// 注册 vm 的 _init方法（在Vue的原型上注册）
initMixin(Vue)
// 注册 vm 的 $data/$props/$set/$delete/$watch（在Vue的原型上注册）
stateMixin(Vue)
// 初始化事件相关方法
// $on/$once/$off/$emit
eventsMixin(Vue)
// _update/$forceUpdate/$destroy
lifecycleMixin(Vue)
// 混入render
// $nextTick/_render
renderMixin(Vue)

export default Vue
