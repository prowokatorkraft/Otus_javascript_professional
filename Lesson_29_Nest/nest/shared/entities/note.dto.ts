import { IsNumber, IsString, IsOptional, IsDefined, MinLength, MaxLength } from 'class-validator';
import {Note} from "./note";

export class NoteDto {
  @IsOptional({ groups: ['create'] })
  @IsDefined({ groups: ['update'] })
  @IsNumber()
  id?: number;

  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(20, { message: 'Title must be less than 21 characters long' })
  title: string;

  @IsString()
  @MaxLength(2000, { message: 'Title must be less than 2001 characters long' })
  description: string;

  static fromEntity(note: Note): NoteDto {
    const dto = new NoteDto();
    dto.id = note.id;
    dto.title = note.title;
    dto.description = note.description;
    return dto;
  }

  static fromEntities(notes: Note[]): NoteDto[] {
    return notes.map(note => NoteDto.fromEntity(note));
  }

  static toEntity(note: NoteDto): Note {
    const node = new Note();
    node.id = note.id ?? 0;
    node.title = note.title;
    node.description = note.description;
    return node;
  }

  static toEntities(notes: NoteDto[]): Note[] {
    return notes.map(note => NoteDto.toEntity(note));
  }
}