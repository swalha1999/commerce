import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { todo } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Test basic database connection
    const result = await db.execute(sql`SELECT 1 as connected`);
    
    // Test table access
    const tableExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'todo'
      )
    `);
    
    // Count records in todo table
    const todoCount = await db.select({ count: sql<number>`count(*)` }).from(todo);
    
    // Get database version
    const version = await db.execute(sql`SELECT version()`);
    
    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        version: version.rows[0]?.version || 'Unknown',
        tableExists: tableExists.rows[0]?.exists || false,
        todoCount: Number(todoCount[0]?.count) || 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}