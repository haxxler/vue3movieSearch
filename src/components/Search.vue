<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <input 
      v-model="title"
      class="form-control"
      type="text" 
      placeholder="Search for Movie, Series & more" 
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name ==='year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
      <button 
        class="btn btn-primary" 
        @click="apply">
        Apply
      </button>
    </div>
  </div>
</template>


<script>
export default{
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters:[
        {
          name:'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (()=>{
            const years = [];
            const thisYear = new Date().getFullYear() // 2021
            for (let i = thisYear; i >= 1985; i -=1) {
              years.push(i);
            }
            return years
          })()
        }
      ]
    }
  },
  methods: { 
   async apply() { // 비동기로 동작하므로 async, await 붙여줄 것
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>