import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const students=sqliteTable('students',{id:text('id').primaryKey(),data:text('data').notNull(),version:integer('version').notNull().default(1),updatedAt:text('updated_at').notNull()});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),value:text('value').notNull()});

export const consultations=sqliteTable('consultations',{id:text('id').primaryKey(),studentId:text('student_id').notNull(),data:text('data').notNull()});
