import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "../../shared/entities/note";
import { Note as NoteFromEntity } from "../../shared/entities/note.entity";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteFromEntity)
    private notesRepository: Repository<NoteFromEntity>,
  ) {}

  async get(): Promise<Note[]> {
    const notes = await this.notesRepository.find();
    return (notes?.length ?? 0) > 0 ? Note.fromEntities(notes) : [];
  }

  async getById(id: number): Promise<Note | null> {
    const note = await this.notesRepository.findOneBy({ id });
    return note ? Note.fromEntity(note) : null;
  }

  async create(note: Note): Promise<Note> {
    const newNote: NoteFromEntity = {
      id: 0,
      title: note.title,
      description: note.description
    };
    const result = await this.notesRepository.save(newNote);
    return Note.fromEntity(result);
  }

  async update(note: Note): Promise<Note | undefined> {
    const oldNote = await this.notesRepository.findOneBy({ id: note.id });
    if (oldNote) {
      oldNote.title = note.title;
      oldNote.description = note.description;

      return await this.notesRepository.save(oldNote);
    }
    return undefined;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.notesRepository.delete(id);
    return (result?.affected ?? 0) > 0;
  }
}
