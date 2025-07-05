
type GetKeys = 
  | 'Authorization'
  | 'access_token'
  | 'refresh_token';

type SetKeys =
  | 'Authorization'
  | 'access_token'
  | 'refresh_token';

const LocalStorage = {
  // setFlag(key: SetFlagKeys) {
  //   this.set(key, 'true');
  // },

  // isFlagSet(key: GetFlagKeys) {
  //   return this.get(key) === 'true';
  // },

  get(key: GetKeys) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  },

  set(key: SetKeys, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {}
  },

  remove(key: SetKeys) {
    try {
      localStorage.removeItem(key);
    } catch (err) {}
  },
};

/* eslint-disable import/no-default-export */
export default LocalStorage;
