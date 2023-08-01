<script setup>
import { ref } from "vue";
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Button from "@src/components/ui/inputs/Button.vue";

const { modelValue } = defineProps(["modelValue"]);
const personalData = ref(modelValue);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const error = ref(null);
const buttonText = ref('Sign up');
const isLoading = ref(false);

const submit = () => {

    if(!personalData.value.password.length) {
        error.value = 'Password is Required!';
        return;
    }
    if(personalData.value.password.length < 8) {
        error.value = 'Password is short!';
        return;
    }

    if(personalData.value.password != personalData.value.confirm_password) {
        error.value = 'Password Not Matched!';
        return;
    }

    error.value = null;
    buttonText.value = 'waiting...';
    isLoading.value = true;
}

</script>

<template>

  <div>
    <div class="mb-5">
      <!--form-->
      <TextInput @valueChanged="(value) => personalData.password = value" :value="personalData.password"
        label="Password"
        placeholder="Enter your password"
        :type="showPassword ? 'text' : 'password'"
        class="pr-[40px] mb-5"
      >
        <template v-slot:endAdornment>
          <IconButton
            title="toggle password visibility"
            aria-label="toggle password visibility"
            class="m-[8px] p-2"
            @click="showPassword = !showPassword"
          >
            <EyeSlashIcon
              v-if="showPassword"
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
            <EyeIcon
              v-else
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
          </IconButton>
        </template>
      </TextInput>
      <span v-show="error" class="text-xs text-opacity-75 font-light !text-red-600">
          {{error}}
     </span>
      <TextInput @valueChanged="(value) => personalData.confirm_password = value" :value="personalData.confirm_password"
        label="Confirm Password"
        placeholder="Enter your password"
        :type="showPasswordConfirm ? 'text' : 'password'"
      >
        <template v-slot:endAdornment>
          <IconButton
            title="toggle password visibility"
            aria-label="toggle password visibility"
            class="m-[8px] p-2"
            @click="showPasswordConfirm = !showPasswordConfirm"
          >
            <EyeSlashIcon
              v-if="showPasswordConfirm"
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
            <EyeIcon
              v-else
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
          </IconButton>
        </template>
      </TextInput>
    </div>

    <!--controls-->
    <div class="mb-5">
      <Button class="w-full mb-4"
      :disabled="isLoading"
        @click="submit"
        >{{buttonText}}</Button>
      <Button
        :disabled="isLoading"
        variant="outlined"
        class="w-full"
        @click="
          $emit('active-section-change', {
            sectionName: 'personal-section',
            animationName: 'slide-right',
          })
        "
      >
        Back
      </Button>
    </div>
  </div>
</template>
