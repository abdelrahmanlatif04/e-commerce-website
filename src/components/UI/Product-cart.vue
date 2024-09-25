<template>
  <div
    class="bg-white mx-auto max-w-sm relative px-4 py-2 m-4 rounded-lg shadow-md"
  >
    <div class="flex flex-col items-center justify-between h-full w-full gap-2">
      <div class="relative">
        <img
          :src="product.image"
          class="w-full aspect-square object-contain p-14 border-b"
        />

        <div
          class="absolute right-0 bottom-3 h-7 flex items-center bg-blue-500 text-white p-1 rounded-md"
        >
          <img src="/star.png" class="h-5/6" />
          <p class="font-semibold text-lg ml-1 mr-2">
            {{ product.rating.rate }}
          </p>
          <p class="text-sm">({{ product.rating.count }})</p>
        </div>
      </div>

      <h2 class="text-xl font-semibold text-center">{{ product.title }}</h2>

      <p class="self-start text-gray-500 text-lg">{{ product.price }}$</p>

      <router-link
        :to="`/product/${product.id}`"
        class="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded border-[2.5px] border-blue-500 hover:bg-transparent hover:text-blue-500 smooth font-semibold"
        >View Details</router-link
      >
    </div>
    <div class="hidden h-full w-full">
      <p>{{ product.description.slice(0, 100) }}. . .</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>
