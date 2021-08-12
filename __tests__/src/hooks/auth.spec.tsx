import nock from 'nock';
import faker from 'faker/locale/pt_BR';
import { renderHook, act } from '@testing-library/react-hooks';

import { AuthProvider } from '@/contexts/auth';
import { useAuth } from '@/hooks';
import { startAsync } from 'expo-auth-session';

const userMock = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  picture: faker.internet.avatar(),
});

describe('Auth Hook', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should be able to sign in with Google account', async () => {
    // nock('https://www.googleapis.com/oauth2/v2')
    //   .get('/userinfo')
    //   .reply(200, {
    //     ...userMock(),
    //   });
    // const { result } = renderHook(() => useAuth(), {
    //   wrapper: AuthProvider,
    // });
    // await act(() => result.current.signInWithGoogle());
    // expect(result.current.user).toHaveProperty('id');
  });

  it('should not be able to sign in with Google account when user cancel', async () => {
    // const { result } = renderHook(() => useAuth(), {
    //   wrapper: AuthProvider,
    // });
    // await act(() => result.current.signInWithGoogle());
    // expect(result.current.user.id).toBeTruthy();
  });
});
