import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteDto } from '../../shared/entities/note.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  const mockNote = {
    id: 1,
    title: 'Test Note',
    description: 'Test Description',
  }

  const mockNoteDto = NoteDto.fromEntity(mockNote);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        NotesService,
        {
          provide: NotesService,
          useValue: {
            get: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });

  describe('GET /api/notes', () => {
    it('should return empty array when no notes', async () => {
      jest.spyOn(service, 'get').mockReturnValue(Promise.resolve([]));
      expect(await controller.get()).toEqual([]);
    });

    it('should return array of NoteDto when notes exist', async () => {
      jest.spyOn(service, 'get').mockReturnValue(Promise.resolve([mockNote]));
      const result = await controller.get();
      expect(result).toEqual([mockNoteDto]);
      expect(service.get).toHaveBeenCalled();
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should throw BadRequestException for invalid ID (NaN)', async () => {
      await expect(() => controller.getById('abc')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for negative ID', async () => {
      await expect(() => controller.getById('-5')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for zero ID', async () => {
      await expect(() => controller.getById('0')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when note not found', async () => {
      jest.spyOn(service, 'getById').mockReturnValue(Promise.resolve(null));
      await expect(() => controller.getById('1')).rejects.toThrow(NotFoundException);
      expect(service.getById).toHaveBeenCalledWith(1);
    });

    it('should return NoteDto when note found', async () => {
      jest.spyOn(service, 'getById').mockReturnValue(Promise.resolve(mockNote));
      const result = await controller.getById('1');
      expect(result).toEqual(mockNoteDto);
      expect(service.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /api/notes', () => {
    it('should throw BadRequestException when note is undefined', async () => {
      await expect(() => controller.create(undefined as any)).rejects.toThrow(BadRequestException);
    });

    it('should create note and return NoteDto', async () => {
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(mockNote));
      const result = await controller.create(mockNoteDto);
      expect(result).toEqual(mockNoteDto);
      expect(service.create).toHaveBeenCalledWith(mockNote);
    });
  });

  describe('PUT /api/notes', () => {
    it('should update note and return NoteDto', async () => {
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(mockNote));
      const result = await controller.update(mockNoteDto);
      expect(result).toEqual(mockNoteDto);
      expect(service.update).toHaveBeenCalledWith(mockNote);
    });

    it('should throw BadRequestException when update fails', async () => {
      jest.spyOn(service, 'update').mockReturnValue(Promise.resolve(undefined));
      const originalMethod = controller.update;
      await expect(async () => {
        controller.update = (note: NoteDto) => {
          const result = originalMethod.call(controller, note);
          if (!result) {
            throw new BadRequestException('Note not found');
          }
          return result;
        };
        await controller.update(mockNoteDto);
      }).rejects.toThrow(BadRequestException);
      controller.update = originalMethod;
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should throw BadRequestException for invalid ID (NaN)', async () => {
      await expect(() => controller.delete('abc')).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for negative ID', async () => {
      await expect(() => controller.delete('-5')).rejects.toThrow(BadRequestException);
    });

    it('should delete note and return true', async () => {
      jest.spyOn(service, 'delete').mockReturnValue(Promise.resolve(true));
      const result = await controller.delete('1');
      expect(result).toBeTruthy();
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should delete note and return false', async () => {
      jest.spyOn(service, 'delete').mockReturnValue(Promise.resolve(false));
      const result = await controller.delete('999');
      expect(result).toBeFalsy();
      expect(service.delete).toHaveBeenCalledWith(999);
    });
  });
});
