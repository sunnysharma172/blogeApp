import conf from '../conf.js';
import { Client, Databases, Storage,Query, ID } from 'appwrite';

export class Service {
    Client = new Client();
    Databases ;
    bucket;
    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID

        this.Databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost(title, content, slug,featuredImage,status, userId) {
       try {
        return await this.Databases.createDocument(
           conf.appwriteDatabaseId,
           conf.appwriteCollectionId,
           slug,
           {
               title: title,
               content: content,
               slug: slug,
               featuredImage: featuredImage,
               status: status,
               userId: userId
           }
        );
       } catch (error) {
           console.error('Error creating post:', error);
           throw error;
       }
    }

    async updatePost(slug,{title, content, featuredImage,status}) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title: title,
                    content: content,
                    slug: slug,
                    featuredImage: featuredImage,
                    status: status,
                    userId: userId
                }
            );
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }

    async getPost(queries = [Query.equal("status","active")]) {
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                
            );
        } catch (error) {
            console.error('Error getting post:', error);
            throw error;
        }
    }

    async uploadFile(file) {
    try {
        const response = await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
        return false;
    }
}

    async getFilePreview(fileId) {
       return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
       )
    }

    async deleteFile(fileId) {
        try {
            const response = await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return response;
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }
    
}

const service = new Service();
export default service;