export const isKnown = (val: any) => {
  if (val === null || val === undefined) return 'Unknown';
  if (Array.isArray(val) && val.length === 0) return 'Unknown';
  if (typeof val === 'object' && Object.keys(val).length === 0)
    return 'Unknown';
  if (typeof val === 'string' && val.trim().length === 0) return 'Unknown';
  return val;
};

export const isPublic = (val: any) => (val ? 'Public' : 'Private');
