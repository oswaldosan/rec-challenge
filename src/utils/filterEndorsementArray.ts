function endorsementArrayCleanup(endorsements: number[]): number[] {
  const dupArray = endorsements.filter(
    (x) => endorsements.indexOf(x) != endorsements.lastIndexOf(x)
  );
  const uniq = [...new Set(dupArray)];
  return uniq;
}

export default endorsementArrayCleanup;
