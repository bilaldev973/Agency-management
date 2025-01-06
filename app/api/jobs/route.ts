import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function GET() {
  try {
    console.log('Fetching jobs from Firestore...');
    const jobsRef = adminDb.collection('jobs');
    const snapshot = await jobsRef
      .where('createdAt', '>', Timestamp.fromMillis(Date.now() - 60 * 24 * 60 * 60 * 1000))
      .orderBy('createdAt', 'desc')
      .get();

    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`Successfully fetched ${jobs.length} jobs`);
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const job = await request.json();
    const jobsRef = adminDb.collection('jobs');
    
    const newJob = {
      ...job,
      createdAt: Timestamp.now()
    };
    
    console.log('Creating new job:', newJob);
    const docRef = await jobsRef.add(newJob);
    console.log('Job created successfully with ID:', docRef.id);
    
    return NextResponse.json({ id: docRef.id, ...newJob });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log('Deleting job with ID:', id);
    await adminDb.collection('jobs').doc(id).delete();
    console.log('Job deleted successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}