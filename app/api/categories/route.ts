import { categoriesTable } from "@/drizzle/schema";
import { db } from "@/lib/database";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const result = await db.select().from(categoriesTable);
        return NextResponse.json(result);
    }catch(e){
        return NextResponse.json({
            status: 500,
            message: e,
        });
    }

}