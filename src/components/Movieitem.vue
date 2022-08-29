<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div> {{ movie.imdbID }} </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({})
    // 기본적으로 객체 데이터나, 배열 데이터 같은 참조형 데이터는 가변할 수 있다.
    } // 왜 함수로 반환하는지 다시 파악해야 함
  }
}
</script>