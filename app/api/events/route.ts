import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/database";
import { categoriesTable, eventsTable, usersTable } from "@/drizzle/schema";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { EventWithUserAndCategory } from "@/lib/type";


export async function GET(
   req: NextRequest
) {
    try {
        const selectParams = req.nextUrl.searchParams.get('select');
        const categoryParams = req.nextUrl.searchParams.get('category');
        const provinsiParams = req.nextUrl.searchParams.get('provinsi');
        const kabupatenParams = req.nextUrl.searchParams.get('kabupaten');
        const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

        const conditions = [];
        let orderConditions = asc(eventsTable.startDate); // default order condition
        let zone = '';

        if (selectParams) {
            if (selectParams == 'nearby'){
                conditions.push(sql`${eventsTable.startDate} >= ${currentDate}`)
                orderConditions = asc(eventsTable.startDate);
            } else if (selectParams == 'new') {
                orderConditions = desc(eventsTable.createdAt);
            }
        }

        if (categoryParams && categoryParams !== '0') {
            conditions.push(eq(eventsTable.categoryId, Number(categoryParams)));
        }

        if (provinsiParams) {
            if (kabupatenParams) {
                zone = `${kabupatenParams}, ${provinsiParams}` ;
                conditions.push(like(eventsTable.location, zone));
            } else {
                zone = zone + provinsiParams;
                conditions.push(like(eventsTable.location, `%${zone}%`));
            }
        }

        const rawData = await db
        .select()
        .from(eventsTable)
        .innerJoin(usersTable, eq(eventsTable.userId, usersTable.id))
        .innerJoin(categoriesTable, eq(eventsTable.categoryId, categoriesTable.id))
        .where(and(...conditions))
        .orderBy(orderConditions!)
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
    } catch (e) {
        return NextResponse.json({
            status: 500,
            message: e,
        });
    }
    
  }