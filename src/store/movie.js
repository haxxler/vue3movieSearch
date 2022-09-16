import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'


export default {
  // index.js의 modules에 명시헤서 별개의 개념으로 활용할 수 있음
  namespaced: true,
  
  // ---- data ----
  // state: function() {
  // state() {
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false
  }),
  // ---- computed ----
  // getters: { 계산된 상태를 만들어 내는 것
  //   movieIds(state) {
  //     return state.movies.map(m => m.imdbID)
  //   }
  // },
  getters: { },
  // ---- methods ----
  // mutations에서만 데이터를 변경하는 것이 허용된다.
  // 즉 movie.js의 state에 있는 데이터들은 mutations에서만 변경할 수 있음
  
  // 객체의 요소는 항상 '키: 값'의 구조를 갖는다는 것을 염두에 둘 것!!
  mutations: {  // 객체데이터를 반환하는 구조를 가져야 
    
    // updateState: function(state, payload) {
    updateState(state, payload) {
      //['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      })
    },

    // resetMovies: function(state) {
    resetMovies(state) { // 데이터 불변성에서 문제가 생기지 않는다.
      state.movies = []
    }
  }, // mutations에서는 기본적으로 store의 데이터를 변경시켜주는 용도의 
  // 메소드만 선언하고 나머지는 전부 actions에서 처리
  // actions는 비동기로 동작함
  actions: { // actions에서는 기본적으로 async를 지원한다.
    // searchMovies(context) {
    //   context.state
    //   context.getters
    //   context.commit
    // }
    async searchMovies({state, commit}, payload) {
      if(state.loading) return;
    
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
       // searchMovies가 payload를 입력으로 받고 payload는 
       // title, type, number, year를 전달 
       // 입력인자는 ...전개연산자 사용해서 전달한다.
       // const {title, type, year, page} = payload;
        const res = await _fetchMovies({
          ...payload,
          page: 1
        });

        const { Search, totalResults} = res.data;
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
         // message: 'Hello World!',
         // loading: true
        })
        console.log(totalResults)  // 310/10 => 31
        console.log(typeof totalResults) // string

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

       // 추가 요청 !!
        if (pageLength >1) {
          for (let page = 2; page <= pageLength; page+=1){
            if (page > payload.number / 10) break;
            const res = await _fetchMovies({
              ...payload,
             //page: page,
              page
            });
            const { Search } = res.data;
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }  
      } catch(message) {
        commit('updateState', {
          movies: [],
          message: message
        }) 
      } finally {
        commit('updateState', {
          loading: false
        })
      }

    }
  }
}

// 함수명 앞에 _(언더스코어)는 내부에서만 사용한다는 의미
function _fetchMovies(payload) {
  const {title, type, year, page} = payload;
  const OMDB_API_KEY = '5e7c7a82';
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve,reject) => {
    axios.get(url) // axios.get이 반환하는 값을 생각할 것 !!!
    .then(res => {
      if (res.data.Error) {
        reject(res.data.Error);
      }
      resolve(res)
    })
    .catch(err => reject(err.message))
  })

}