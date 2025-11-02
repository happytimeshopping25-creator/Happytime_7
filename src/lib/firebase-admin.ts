import * as admin from 'firebase-admin';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseAdminConfig = {
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId: projectId, // Use environment variable
};

if (!admin.apps.length) {
    admin.initializeApp(firebaseAdminConfig);
}

export const adminDb = admin.database();