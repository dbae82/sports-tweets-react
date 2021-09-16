import { selector } from 'recoil';
import { userState } from './atoms';

export const loggedInState = selector({
    key: 'loggedInState',
    get: ({ get }) => {
        const user = get(userState);
        return user ? true : false;
    }
});