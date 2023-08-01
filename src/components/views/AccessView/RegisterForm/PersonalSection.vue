<script setup>
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
import { ref } from "vue";

const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(['active-section-change']);
const personalData = ref(modelValue);
const error = ref(null);

const submit = () => {

    if(!personalData.value.email.length) {
        error.value = 'Email is required';
        return;
    }

    if(!personalData.value.first_name.length) {
        error.value = 'First name is missing';
        return;
    }
    if(!personalData.value.last_name.length) {
        error.value = 'Last name is missing';
        return;
    }
    emit('active-section-change', {
            sectionName: 'password-section',
            animationName: 'slide-left',
          })
}
</script>

<template>
  <div>
    <!--form-->
    <div class="mb-5">
      <TextInput label="Email" placeholder="Enter your email" class="mb-5" @valueChanged="(value) => personalData.email = value" :value="personalData.email"/>
        <span v-show="error" class="text-xs text-opacity-75 font-light !text-red-600">
          {{error}}
     </span>
        <TextInput @valueChanged="(value) => personalData.first_name = value" :value="personalData.first_name"
        label="First Name"
        placeholder="Enter your first name"
        class="mb-5"
      />
      <TextInput @valueChanged="(value) => personalData.last_name = value" :value="personalData.last_name"
        label="Last Name"
        placeholder="Enter your last name"
        class="mb-5"
      />
    </div>

    <!--local controls-->
    <div class="mb-6">
      <Button
        class="w-full mb-4"
        @click="submit"
        >Next</Button
      >
    </div>

    <!--divider-->
    <div class="mb-6 flex items-center">
      <span
        class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
      ></span>
      <Typography variant="body-3" class="px-4 text-opacity-75 font-light"
        >or</Typography
      >
      <span
        class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
      ></span>
    </div>

    <!--oauth controls-->
    <Button variant="outlined" class="w-full mb-5">
      <span class="flex">
        <img
          src="@src/assets/vectors/google-logo.svg"
          class="mr-3"
          alt="google-logo"
        />
        Sign in with google
      </span>
    </Button>
  </div>
</template>
