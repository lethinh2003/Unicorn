import USER_GENDERS from "@/configs/config.users.genders";

export const convertUserGender = (gender) => {
  switch (gender) {
    case USER_GENDERS.MALE:
      return "Nam";
    case USER_GENDERS.FEMALE:
      return "Nữ";
    case USER_GENDERS.OTHERS:
      return "Chưa xác định";
    default:
      return "";
  }
};
