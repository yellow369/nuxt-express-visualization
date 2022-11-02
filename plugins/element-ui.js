import Vue from 'vue'

// 全局引入
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(Element, { locale })

// 按需引入
import {Button, Upload, Carousel, CarouselItem, Table, TableColumn} from 'element-ui'
Vue.use(Button)
Vue.use(Upload)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Table)
Vue.use(TableColumn)