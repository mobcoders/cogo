import { NextResponse } from 'next/server';
import { createPotentialDestination } from '@/lib/action';

export async function POST(request: Request) {
  const { tripId, city, country, photoUrl, activities } = await request.json();

  try {
    const createdDestination = await createPotentialDestination(
      tripId,
      city,
      country,
      photoUrl,
      activities
    );
    return NextResponse.json(createdDestination, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}
