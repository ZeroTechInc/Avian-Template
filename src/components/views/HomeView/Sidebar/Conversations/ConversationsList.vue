<script setup>
import Conversation from "./Conversation.vue";

const props = defineProps({
  filteredConversations:{default:undefined},
  handleConversationChange: Function,
  activeId:{type:Number,default:undefined}
});
</script>

<template>
  <div>
    <Conversation
      v-for="conversation in filteredConversations"
      :conversation="conversation"
      :key="conversation.id"
      role="listitem"
      :handle-conversation-change="props.handleConversationChange"
      :is-active="activeId === conversation.id"
    />
  </div>
</template>
