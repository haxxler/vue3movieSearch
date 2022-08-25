export default {
  // index.js의 modules에 명시헤서 별개의 개념으로 활용할 수 있음
  namespaced: true,
  // data
  state: function() {
    return {
      movies: []
    }
  },
  // computed
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },
  // methods
  // mutations에서만 데이터를 변경하는 것이 허용된다.
  mutations: {
    resetMovies(state) {
      state.movies = []
    }
  },
  // actions는 비동기로 동작함
  actions: {
    searchMovies(context) {
      context.state
      context.getters
    }
  }
}