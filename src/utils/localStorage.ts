export const saveLikesToLocalStorage = (likedMap: Record<string, boolean>) => {
    localStorage.setItem('likedCards', JSON.stringify(likedMap));
  };
  
export const loadLikesFromLocalStorage = (): Record<string, boolean> => {
    const data = localStorage.getItem('likedCards');
    return data ? JSON.parse(data) : {};
  };
  