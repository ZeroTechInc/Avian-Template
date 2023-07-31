import { defineStore } from "pinia";
import { computed, ref } from "vue";

import defaults from "@src/store/defaults";

const useStore = defineStore("chat", () => {
  // local storage
  const storage = JSON.parse(localStorage.getItem("chat") || "{}");

  // app status refs
  const status = ref("idle");

  // app data refs
  // data refs
  const user = ref(defaults.user);
  const conversations = ref(defaults.conversations || []);
  const notifications = ref(defaults.notifications || []);
  const archivedConversations = ref(defaults.archive || []);
  const calls = ref(defaults.calls || []);
  const settings = ref(storage.settings || defaults.defaultSettings);
  const activeCall = ref(defaults.activeCall);
  const recentEmoji = ref(storage.recentEmoji || []);
  const emojiSkinTone = ref(storage.emojiSkinTone || "neutral");

  // ui refs
  const activeSidebarComponent = ref(
    storage.activeSidebarComponent || "messages"
  );
  const delayLoading = ref(true);
  const activeConversationId = ref(6 || null);
  const conversationOpen = ref(storage.conversationOpen);
  const callMinimized = ref(false);
  const openVoiceCall = ref(false);

  // contacts grouped alphabetically.
  const contactGroups = computed(() => {
    if (user.value) {
      let sortedContacts = [...user.value.contacts];

      sortedContacts.sort();

      let groups = [];
      let currentLetter = "";
      let groupNames = [];

      // create an array of letter for every different sort level.
      for (let contact of sortedContacts) {
        // if the first letter is different create a new group.
        if (contact.firstName[0].toUpperCase() !== currentLetter) {
          currentLetter = contact.firstName[0].toUpperCase();
          groupNames.push(currentLetter);
        }
      }

      // create an array that groups contact names based on the first letter;
      for (let groupName of groupNames) {
        let group = { letter: groupName, contacts: [] };
        for (let contact of sortedContacts) {
          if (contact.firstName[0].toUpperCase() === groupName) {
            group.contacts.push(contact);
          }
        }
        groups.push(group);
      }

      return groups;
    }
  });

  const getStatus = computed(() => status);

  return {
    // status refs
    status,
    getStatus,

    // data refs
    user,
    conversations,
    contactGroups,
    notifications,
    archivedConversations,
    calls,
    settings,
    activeCall,
    recentEmoji,
    emojiSkinTone,

    // ui refs
    activeSidebarComponent,
    delayLoading,
    activeConversationId,
    conversationOpen,
    callMinimized,
    openVoiceCall,
  };
});

export default useStore;
