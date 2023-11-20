import USER_STATUSES from "@/configs/config.users.statuses";

export const convertUserStatus = (status) => {
  switch (status) {
    case USER_STATUSES.TRUE:
      return "Hoạt động";
    case USER_STATUSES.FALSE:
      return "Bị ẩn";
    default:
      return "";
  }
};
