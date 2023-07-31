<script setup>
import Call from "@src/components/views/HomeView/Sidebar/Calls/Call.vue";

const props = defineProps({
  calls:{default:undefined},
  chatStatus: String,
  delayLoading: String,
  openInfoModal: Function
});
</script>

<template>
  <div>
    <Call
      v-for="call in props.calls"
      :call="call"
      :open-info-modal="props.openInfoModal"
    />
  </div>
</template>
