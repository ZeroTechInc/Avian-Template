<script setup>
import { inject, onMounted, ref } from "vue";

import useStore from "@src/store/store";

import Message from "@src/components/views/HomeView/Chat/ChatMiddle/Message/Message.vue";
import TimelineDivider from "@src/components/views/HomeView/Chat/ChatMiddle/TimelineDivider.vue";

const props = defineProps({
  handleSelectMessage: Function,
  handleDeselectMessage: Function,
  selectedMessages:{default:undefined},
});

const store = useStore();

const container= ref(null);

const activeConversation = inject("activeConversation");

// checks whether the previous message was sent by the same user.
const isFollowUp = (index, previousIndex) => {
  if (previousIndex < 0) {
    return false;
  } else {
    let previousSender = activeConversation.messages[previousIndex].sender.id;
    let currentSender = activeConversation.messages[index].sender.id;
    return previousSender === currentSender;
  }
};

// checks whether the message is sent by the authenticated user.
const isSelf = (message) => {
  return Boolean(store.user && message.sender.id === store.user.id);
};

// checks wether the new message has been sent in a new day or not.
const renderDivider = (index, previousIndex) => {
  if (index === 3) {
    return true;
  } else {
    return false;
  }
};

// scroll messages to bottom.
onMounted(() => {
  (container.value).scrollTop = (
    container.value
  ).scrollHeight;
});
</script>

<template>
  <div
    ref="container"
    class="grow px-5 py-5 flex flex-col overflow-y-scroll scrollbar-hidden"
  >
    <div
      v-if="store.status !== 'loading'"
      v-for="(message, index) in activeConversation.messages"
      :key="index"
    >
      <TimelineDivider v-if="renderDivider(index, index - 1)" />

      <Message
        :message="message"
        :self="isSelf(message)"
        :follow-up="isFollowUp(index, index - 1)"
        :divider="renderDivider(index, index - 1)"
        :selected="props.selectedMessages.includes(message.id)"
        :handle-select-message="handleSelectMessage"
        :handle-deselect-message="handleDeselectMessage"
      />
    </div>
  </div>
</template>
