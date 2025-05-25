import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  Client = new Client();
  account;
  constructor() {
    this.Client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.account = new Account(this.Client);
  }
  async createAccount(email, password, name) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        console.log('Account created successfully:', user);
      } else {
        return user;
      }
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }
  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (session) {
        console.log('Login successful:', session);
        return session;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      if (user) {
        console.log('Current user:', user);
        return user;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      const response = await this.account.deleteSessions('current');
      if (response) {
        console.log('Logout successful:', response);
        return response;
      }
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  async deleteAccount() {
    try {
      const response = await this.account.delete();
      if (response) {
        console.log('Account deleted successfully:', response);
        return response;
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;
