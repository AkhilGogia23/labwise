export const routes = {
  home: "home",
    searchresults: "searchresults",
    auth:"auth",
  tests: "tests",
    labs: "labs",   
    labDetails: (id: number) => `labs/${id}`,
    offers: "offers",
    profile: "profile",
    checkout: "checkout"
};