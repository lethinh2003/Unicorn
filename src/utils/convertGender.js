export const convertUserGender = (gender) => {
  if (gender === "male") {
    return "Nam";
  }
  if (gender === "female") {
    return "Nữ";
  }
  if (gender === "others") {
    return "Khác";
  }
  return null;
};
