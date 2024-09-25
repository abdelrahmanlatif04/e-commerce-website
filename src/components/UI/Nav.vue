<template>
  <nav
    class="smooth h-fit w-full fixed sm:relative smooth z-50 grade-bg bottom-0 sm:top-0 shadow-lg"
  >
    <div
      class="flex justify-around items-center w-full h-full font-semibold tracking-widest p-3 max-w-[400px] sm:max-w-[800px] mx-auto"
    >
      <router-link
        v-for="link in links"
        :key="link"
        :to="link"
        class="flex justify-start gap-3 h-6 items-center hover:opacity-50 smooth overflow-hidden invert"
        ><img :src="`/${link.name}.png`" class="h-full" />
        <p class="hidden sm:block text-lg">{{ link.meta.title }}</p>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    links() {
      return this.$router.options.routes.slice(0, 4);
    },
  },
};
</script>

<style scoped>
.active {
  filter: invert(0.2);
}
</style>
