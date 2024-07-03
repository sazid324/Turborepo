export const apiLinks = Object.freeze({
  REGION_API: "https://bdapi.vercel.app/api/v.1/division",
  CITY_API: (id: number | string) =>
    `https://bdapi.vercel.app/api/v.1/district/${id}`,
});
