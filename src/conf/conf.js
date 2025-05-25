const Conf = {
  // The base URL for the API
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  // The project ID for the Appwrite project
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  // The database ID for the Appwrite database
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  // The collection ID for the Appwrite collection
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  // The bucket ID for the Appwrite bucket
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default Conf
