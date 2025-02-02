import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/database";
import { categoriesTable, eventsTable, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { EventWithUserAndCategory } from "@/lib/type";


export async function GET() {

    try {
        const rawData = await db
        .select()
        .from(eventsTable)
        .innerJoin(usersTable, eq(eventsTable.userId, usersTable.id))
        .innerJoin(categoriesTable, eq(eventsTable.categoryId, categoriesTable.id))
        .limit(10)
        
        const data: EventWithUserAndCategory[] = rawData.map((item) => ({
            id: item.events.id,
            name: item.events.name,
            description: item.events.description,
            startDate: item.events.startDate,
            endDate: item.events.endDate,
            imageUrl: item.events.imageUrl,
            isOnline: item.events.isOnline,
            location: item.events.location,
            userId: item.events.userId,
            categoryId: item.events.categoryId,
            user: {
                id: item.users.id,
                name: item.users.name,
                email: item.users.email,
            },
            category: {
                id: item.categories.id,
                name: item.categories.name,
            },
        } satisfies EventWithUserAndCategory));

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        });
    }
    
  }