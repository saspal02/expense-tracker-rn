// services/UserService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService {
  async getCurrentUser() {
    const SERVER_BASE_URL = "http://10.0.2.2:8000";
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await fetch(`${SERVER_BASE_URL}/user/v1/getUser`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return await response.json(); 
  }
}

export default UserService;
