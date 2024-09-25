<template>
  <form @submit.prevent="search" class="bg-slate-600 py-2">
    <div
      class="relative h-10 w-[90%] sm:w-1/2 mx-auto rounded-lg overflow-hidden"
    >
      <input
        type="text"
        class="h-full w-full p-2 pr-12 text-lg tracking-wider focus:outline-none"
        v-model="word"
      />
      <button
        type="submit"
        class="h-full aspect-square bg-[#fa0] absolute right-0 hover:opacity-60 smooth"
      >
        <img src="/search.png" class="invert w-10/12 mx-auto" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      word: null,
    };
  },
  methods: {
    search() {
      this.$emit("searchProducts", this.word);
    },
  },
};
</script>

<style></style>
