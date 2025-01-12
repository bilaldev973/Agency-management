import { google } from 'googleapis';
import { Readable } from 'stream';

// in the my drive folder created
const ROOT_FOLDER_ID = "11GpS4k002viWZg6JwLQa7lUrAzPmGf6v"
// Initialize Google Drive API with proper error handling
const initializeDrive = () => {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Drive credentials');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Failed to initialize Google Drive:', error);
    throw error;
  }
};

export async function createFolder(folderName: string, parentFolderId?: any) {
  const drive = initializeDrive();
  try {
    console.log(`Creating folder: ${folderName}`);
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [ROOT_FOLDER_ID],
    };

    const folder = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });

    const folderId = folder.data.id;
    console.log(`Folder created with ID: ${folderId}`);

    // Share the folder with your personal account
    await drive.permissions.create({
      fileId: folderId!, 
      requestBody: {
        type: 'user',
        role: 'writer',
        emailAddress: process.env.DRIVE_DATA_SHARE_EMAIL,
      },
    });

    console.log(`Folder shared with personal account: ${folderId}`);
    return folderId;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
}



export async function uploadFile(
  fileName: string,
  mimeType: string,
  content: Buffer,
  folderId: any
) {
  const drive = initializeDrive();
  try {
    console.log(`Uploading file: ${fileName} to folder: ${folderId}`);
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: Readable.from(content),
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id',
    });

    const fileId = file.data.id;
    console.log(`File uploaded with ID: ${fileId}`);

    // Share the file with your personal account
    await drive.permissions.create({
      fileId: fileId!, // Ensure fileId is not null
      requestBody: {
        type: 'user',
        role: 'writer',
        emailAddress: 'bilalnazirdeveloper@gmail.com', // Replace with your email
      },
    });

    console.log(`File shared with personal account: ${fileId}`);
    return fileId;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}


export async function findFolder(folderName: string, parentFolderId?: any) {
  const drive = initializeDrive();
  try {
    console.log(`Searching for folder: ${folderName}`);
    const query = [
      `mimeType='application/vnd.google-apps.folder'`,
      `name='${folderName}'`,
    ];
    
    if (parentFolderId) {
      query.push(`'${parentFolderId}' in parents`);
    }

    const response = await drive.files.list({
      q: query.join(' and '),
      fields: 'files(id)',
      spaces: 'drive',
    });

    const folderId = response.data.files?.[0]?.id;
    console.log(`Found folder with ID: ${folderId}`);
    return folderId;
  } catch (error) {
    console.error('Error finding folder:', error);
    throw error;
  }
}
