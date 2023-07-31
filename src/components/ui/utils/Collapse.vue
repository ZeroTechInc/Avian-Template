<script setup>
import CollapseTransition from "@src/components/ui/transitions/CollapseTransition.vue";

const props = defineProps({
  collapsed: Boolean,
});
</script>

<template>
  <!--collapsed region-->
  <CollapseTransition>
    <div
      v-if="!props.collapsed"
      class="w-full flex flex-col px-5"
      :aria-hidden="props.collapsed"
    >
      <slot></slot>
    </div>
  </CollapseTransition>
</template>
