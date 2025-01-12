import { NextResponse } from 'next/server';
import { createFolder, uploadFile, findFolder } from '@/lib/google-drive';

const PARENT_FOLDER_NAME = 'UmerJobApplications';

// Explicitly define the HTTP methods we support
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('Received application submission request');
  try {
    const formData = await request.formData();
    console.log(formData,"thisnis inside applications");
    
    // Extract and log form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const experience = formData.get('experience') as string;
    const department = formData.get('department') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const jobId = formData.get('jobId') as string;
    const resume = formData.get('resume') as File;

    console.log('Received application for:', { jobTitle, name, email });

    // Validate required fields
    if (!name || !email || !phone || !jobTitle || !jobId || !resume || !experience || !department) {
      console.error('Missing required fields:', {
        name: !!name,
        email: !!email,
        phone: !!phone,
        jobTitle: !!jobTitle,
        jobId: !!jobId,
        resume: !!resume,
        experience: !!experience,
        department: !!department
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume file size must be less than 5MB' },
        { status: 400 }
      );
    }

    console.log('Creating folder structure in Google Drive');
    
    // Find or create parent folder
    let parentFolderId = await findFolder(PARENT_FOLDER_NAME);
    if (!parentFolderId) {
      parentFolderId = await createFolder(PARENT_FOLDER_NAME);
    }

    // Create job-specific folder
    const jobFolderName = `${jobTitle}_${jobId}`;
    let jobFolderId = await findFolder(jobFolderName, parentFolderId);
    if (!jobFolderId) {
      jobFolderId = await createFolder(jobFolderName, parentFolderId);
    }

    // Create applicant folder
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const applicantFolderName = `${name}_${timestamp}`;
    const applicantFolderId = await createFolder(applicantFolderName, jobFolderId);

    console.log('Uploading resume file');
    // Upload resume
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const resumeFileName = `${name}_Resume_${resume.name}`;
    await uploadFile(
      resumeFileName,
      resume.type,
      resumeBuffer,
      applicantFolderId
    );

    console.log('Creating application metadata file');
    // Create metadata file
    const metadata = {
      name,
      email,
      phone,
      experience,
      department,
      coverLetter: coverLetter || '',
      jobTitle,
      jobId,
      submissionDate: new Date().toISOString(),
    };

    const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    await uploadFile(
      'application_details.json',
      'application/json',
      metadataBuffer,
      applicantFolderId
    );

    console.log('Application submitted successfully');
    return NextResponse.json({ 
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit application', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}