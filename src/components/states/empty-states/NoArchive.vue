<script setup>
import { InboxIcon } from "@heroicons/vue/24/outline";
import Typography from "@src/components/ui/data-display/Typography.vue";
</script>

<template>
  <div class="w-full p-5 flex">
    <!--icon-->
    <div>
      <div
        class="w-7 h-7 mr-4 flex justify-center items-center rounded-full bg-gray-50 dark:bg-gray-700 transition duration-500"
      >
        <InboxIcon
          class="w-5 h-5 text-gray-500 dark:text-white dark:opacity-70"
        />
      </div>
    </div>

    <!--content-->
    <div>
      <Typography variant="heading-2" class="mb-3"
        >No archived conversations</Typography
      >

      <Typography variant="body-2" class="flex">
        select archive from the conversation context menu to save one.
      </Typography>
    </div>
  </div>
</template>
