import { db } from "@/lib/database";
import { categoriesTable, eventsTable, usersTable } from "@/drizzle/schema";
import { v4 as uuidv4 } from 'uuid';


const seed = async () => {
    try {
        const user: typeof usersTable.$inferInsert = {
            id: uuidv4(),
            name: 'John',
            email: 'r8Fb8@example.com',
            password: 'password',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await db.insert(usersTable).values(user);

        const categories: typeof categoriesTable.$inferInsert[] = [{
            name: 'Musik Festival',
        }, {
            name: 'Seminar',
        }, {
            name: 'Workshop',
        }, {
            name: 'Kompetisi',
        }, {
            name: 'Pameran',
        }]

        await db.insert(categoriesTable).values(categories);

        const events: typeof eventsTable.$inferInsert = {
            id: uuidv4(),
            name: 'Musik Festival',
            description: 'Musik Festival di Jakarta',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            imageUrl: 'https://example.com/festival.jpg',
            isOnline: true,
            location: 'Jakarta',
            userId: user.id,
            categoryId: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

        await db.insert(eventsTable).values(events);

        console.log("Seeder berhasil dijalankan!");
      } catch (error) {
        console.error("Gagal menjalankan seeder:", error);
      }
}

seed();