import {NoteDto} from "./note.dto";
import { Note as NoteFromEntity } from "../../shared/entities/note.entity";

export class Note {
  id: number;
  title: string;
  description: string;

  static fromEntity(note: NoteFromEntity): Note {
    const dto = new Note();
    dto.id = note.id ?? 0;
    dto.title = note.title;
    dto.description = note.description;
    return dto;
  }

  static fromEntities(notes: NoteFromEntity[]): Note[] {
    return notes.map(note => Note.fromEntity(note));
  }

  static toEntity(note: Note): NoteFromEntity {
    const node = new NoteFromEntity();
    node.id = note.id ?? 0;
    node.title = note.title;
    node.description = note.description;
    return node;
  }

  static toEntities(notes: Note[]): NoteFromEntity[] {
    return notes.map(note => NoteDto.toEntity(note));
  }
}