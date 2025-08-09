/**
 * Simple wrapper around localStorage to bandle NASA app data.
 */
export const storageService = {
  getCurrentDisplayedDate() {
    const value = localStorage.getItem('currentDisplayedDate');
    return value ? JSON.parse(value) : null;
  },

  setCurrentDisplayedDate(date) {
    localStorage.setItem('currentDisplayedDate', JSON.stringify(date));
  },

  getData() {
    const text = localStorage.getItem('data');
    return text ? JSON.parse(text) : null;
  },

  setData(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
};
