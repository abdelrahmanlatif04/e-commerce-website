<template>
  <div class="wrapper grid place-content-center h-[90vh]">
    <img
      src="/reload.png"
      class="w-20 smooth"
      :class="isLoading ? 'rolling' : 'hover:opacity-40  cursor-pointer'"
      @click="reload()"
    />
  </div>
</template>

<script>
export default {
  methods: {
    reload() {
      if (!this.isLoading) {
        this.$emit("reload");
      }
    },
  },
  props: {
    isLoading: {
      default: true,
      type: String,
    },
  },
};
</script>

<style scoped>
.rolling {
  animation: 1s infinite linear rotate;
  @apply filter grayscale;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
