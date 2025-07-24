import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export async function POST(req: NextRequest) {
    // 1. Check if the user is authenticated and get their data
    const currentUser = await getCurrentUser();

    // 2. Handle Unauthorized users (no valid token)
    if (!currentUser) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // 3. Handle incorrect role (Forbidden)
    if (currentUser.role !== "jobseeker") {
        return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    // 4. If authentication and authorization pass, proceed with the main logic
    try {
        const data = await req.json();

        const newJob = await prisma.application.create({
            data: {
                name: data.jobDetails.jobName,
                description: data.jobDetails.jobDescription,
                tags: data.jobDetails.categories,

                skillLevel: data.workloadEstimation.skillLevel,
                workload: data.workloadEstimation.workload,
                dailyDuration: data.workloadEstimation.dailyDuration,

                rateType: data.wages.rateType,
                minRate: parseFloat(data.wages.minRate),
                maxRate: parseFloat(data.wages.maxRate),
                seeker: { connect: { id: currentUser.id,} }, // Link the job to the logged-in user
                location: [currentUser.city, currentUser.province].filter(Boolean).join(', ')
            },
        });

        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error("Failed to create job:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to create job" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
