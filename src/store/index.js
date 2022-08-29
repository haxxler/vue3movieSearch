import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
  modules: {
    movie,  // 데이터의 이름과 속성의 이름이 같으면 데이터 명을 생략할 수 있음
    about
  }
})