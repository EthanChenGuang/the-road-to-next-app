export const getActivePath = (path: string, paths: string[]) => {
  // For account paths, match any path that starts with /account to /account/profile
  if (path.startsWith('/account')) {
    const accountIndex = paths.findIndex(p => p.startsWith('/account'));
    if (accountIndex !== -1) {
      return { active: paths[accountIndex], activeIndex: accountIndex };
    }
  }
  
  // For exact matches
  const exactIndex = paths.indexOf(path);
  if (exactIndex !== -1) {
    return { active: path, activeIndex: exactIndex };
  }
  
  // No match found
  return { active: null, activeIndex: -1 };
};