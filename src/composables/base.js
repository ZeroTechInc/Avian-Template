import axios from "axios";
import moment from "moment";

/**
 * Determine if the given date is in the future.
 */
export function useDateInTheFuture(date) {
  return moment().diff(moment(date + " Z"), "minutes") < 0;
}

/**
 * Show the time ago format for the given time.
 */
export function useTimeAgo(time) {
  return moment(time + " Z")
    .utc()
    .local()
    .fromNow();
}

/**
 * Show the time in local time.
 */
export function useLocalTime(time) {
  return moment(time + " Z")
    .utc()
    .local()
    .format("MMMM Do YYYY, h:mm:ss A");
}

/**
 * Create an instance of axios.
 */
export function useHttp() {
  const instance = axios.create();

  //   instance.defaults.baseURL = "/";

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      switch (error.response.status) {
        case 500:
          //   Bus.$emit("httpError", error.response.data.message);
          break;

        case 401:
          window.location.href = "/logout";
          break;
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
