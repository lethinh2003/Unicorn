const ENDPOINT = "https://provinces.open-api.vn/api";
export const getListProvinces = async () => {
  try {
    const res = await fetch(`${ENDPOINT}/?depth=1`);
    const results = await res.json();
    return results;
  } catch (err) {
    console.log("Get provinces error", err);
    throw err;
  }
};
export const getListDistricts = async ({ provinceCode }) => {
  try {
    let res = await fetch(`${ENDPOINT}/p/${provinceCode}?depth=2`);
    res = await res.json();

    const results = res?.districts || [];

    return results;
  } catch (err) {
    console.log("Get districs error", err);
    throw err;
  }
};
export const getListWards = async ({ districtCode }) => {
  try {
    let res = await fetch(`${ENDPOINT}/d/${districtCode}?depth=2`);
    res = await res.json();
    const results = res?.wards || [];
    return results;
  } catch (err) {
    console.log("Get wards error", err);
    throw err;
  }
};
