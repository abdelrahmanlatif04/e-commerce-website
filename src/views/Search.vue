<template>
  <inputField @searchProducts="searchByWord" />
  <products :word="word" />
</template>

<script>
import inputField from "../components/search/input.vue";
import Products from "../components/search/Products.vue";
export default {
  data() {
    return {
      word: null,
    };
  },
  methods: {
    searchByWord(e) {
      this.word = e;
    },
  },
  components: { inputField, Products },
};
</script>
