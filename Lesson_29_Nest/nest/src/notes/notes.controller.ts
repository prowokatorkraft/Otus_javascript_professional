import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  BadRequestException,
  HttpCode, HttpStatus, NotFoundException
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from "../../shared/entities/note.dto";

@Controller('/api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async get(): Promise<NoteDto[]> {
    const notes = await this.notesService.get();
    if (!notes) {
      return [];
    }
    return NoteDto.fromEntities(notes);
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<NoteDto> {
    const numericId = +id;
    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Invalid ID: must be a positive number');
    }
    const note = await this.notesService.getById(numericId);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return NoteDto.fromEntity(note);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe({ groups: ['create'] })) note: NoteDto): Promise<NoteDto> {
    if (!note) {
      throw new BadRequestException('Note not found');
    }
    const result = await this.notesService.create(NoteDto.toEntity(note));
    return NoteDto.fromEntity(result);
  }

  @Put()
  async update(@Body(new ValidationPipe({ groups: ['update'] })) note: NoteDto): Promise<NoteDto | null> {
    const result = await this.notesService.update(NoteDto.toEntity(note));
    if (result){
      return NoteDto.fromEntity(result);
    }
    throw new BadRequestException('Note not found');
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const numericId = +id;
    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Invalid ID: must be a positive number');
    }
    return await this.notesService.delete(+id);
  }
}
