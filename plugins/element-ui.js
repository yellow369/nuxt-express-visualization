import Vue from 'vue'

// 全局引入
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(Element, { locale })

// 按需引入
import {Button, Upload} from 'element-ui'
Vue.use(Button)
Vue.use(Upload)