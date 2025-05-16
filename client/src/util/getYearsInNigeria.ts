// Calculate how many years the member is in Nigeria
export const yearsInNigeria = (dateOfEntry: Date | undefined) => {
  if (!dateOfEntry) return 0;
  const thisYear = new Date().getFullYear();
  const yearOfEntry = new Date(`${dateOfEntry}`).getFullYear();
  const yearsInNigeria = thisYear - yearOfEntry;
  return yearsInNigeria;
};
