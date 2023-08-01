<script setup>
import { ref } from "vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import { RouterLink,useRouter } from "vue-router";
import  useAuthStore  from "@src/store/auth";



const router = useRouter();
const authStore = useAuthStore();


const showPassword = ref(false);
const data = ref({email:'', password:''});
const error = ref(null);
const buttonText = ref('Sign in');
const isLoading = ref(false);

const submit= () => {

    if(!data.value.password.length || !data.value.email.length) {
        error.value = 'fill the input first!';
        return;
    }
    error.value = null;
    buttonText.value = 'waiting...';
    isLoading.value = true;

    authStore.isAuthenticated = true;
    router.push({ path: '/' });

}
</script>

<template>
  <div
    class="p-5 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center"
  >
    <div class="w-full md:px-[26%] xs:px-[10%]">
      <!--header-->
      <div class="mb-6 flex flex-col">
        <img
          src="@src/assets/vectors/logo-gradient.svg"
          class="w-[22px] h-[18px] mb-4 opacity-70"
          alt="bird logo"
        />
        <Typography variant="heading-2" class="mb-4">Welcome back</Typography>
        <Typography variant="body-3" class="text-opacity-75 font-light">
          Create an account a start messaging now!
        </Typography>
      </div>

      <!--form-->
      <div class="mb-6">
        <TextInput label="Email" placeholder="Enter your email" class="mb-5" @valueChanged="(value) => data.email = value" :value="data.email"/>
        <span v-show="error" class="text-xs text-opacity-75 font-light !text-red-600">
          {{error}}
     </span>
        <TextInput @valueChanged="(value) => data.password = value" :value="data.password"
          label="Password"
          placeholder="Enter your password"
          :type="showPassword ? 'text' : 'password'"
          class="pr-[40px]"
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
      </div>

      <!--local controls-->
      <div class="mb-6">
        <Button class="w-full mb-4" :disabled="isLoading" @click="submit">{{buttonText}}</Button>
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
      <div>
        <Button variant="outlined" class="w-full mb-5">
          <span class="flex">
            <img
              src="@src/assets/vectors/google-logo.svg"
              class="mr-3"
              alt="google logo"
            />
            Sign in with google
          </span>
        </Button>

        <!--bottom text-->
        <div class="flex justify-center">
          <Typography variant="body-2"
            >Don’t have an account ?
            <RouterLink
              to="/access/sign-up/"
              class="text-indigo-400 opacity-100"
            >
              Sign up
            </RouterLink>
          </Typography>
        </div>
      </div>
    </div>
  </div>
</template>
