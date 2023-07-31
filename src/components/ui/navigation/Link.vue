<script setup>
import Typography from "@src/components/ui/data-display/Typography.vue";

const props = defineProps({
  variant:{type:String,default:''},
  noColor:{type:Boolean,default:undefined},
  href: String,
});
</script>

<template>
  <a :href="props.href">
    <Typography :variant="props.variant" :no-color="props.noColor">
      <slot></slot>
    </Typography>
  </a>
</template>
