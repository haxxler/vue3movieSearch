import { createApp } from 'vue'
import App from './App'
// 특정한 폴더의 index.js 파일은 경로에서 생략가능하다.
// 폴더에서 기본적으로 사용하는 js 파일은 index.js로 네이밍하는 것을 권장함
// import router from './routes/index.js' 
// import store from './store/index.js'
import router from './routes'
import store from './store'

createApp(App)
  .use(router)
  .use(store) // .use 메소드는 특정한 플러그인 라이브러리를 뷰에 연결할 때 사용하는 메소드
  .mount('#app')