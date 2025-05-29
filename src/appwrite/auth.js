import { use } from "react";
import Conf from "../conf/conf";
import { Client, Account } from "appwrite";
export  class AuthService {
    Client = new Client()
    account;

    constructor() {
        this.Client
            .setEndpoint(Conf.appwriteUrl)
            .setProject(Conf.appwriteProjectId);
        this.account = new Account(this.Client);
    }
    async createAccount({ email, password, name }) {
        try {
          const userAccount = await this.account.create(ID.unique(), email, password, name);
          if (userAccount) {
            return this.login({ email, password });
          }
          else{
            return userAccount;
          }
        } catch (error) {
            
        }
    }

    async login ({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
            
        }

    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Failed to get current user:", error);
            throw error;
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions("current");
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }



}

const authService = new AuthService();

export default authService;