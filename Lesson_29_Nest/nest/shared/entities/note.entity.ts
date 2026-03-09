import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notes.notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 2000 })
  description: string;
}