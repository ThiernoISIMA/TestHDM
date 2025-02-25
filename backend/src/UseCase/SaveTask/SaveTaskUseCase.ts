import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository'; // Vérifiez le chemin selon votre structure

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validation du DTO
    if (!dto.name || typeof dto.name !== 'string') {
      throw new BadRequestException("Le nom de la tâche est obligatoire et doit être une chaîne de caractères.");
    }
    if (dto.id !== null && dto.id !== undefined && typeof dto.id !== 'number') {
      throw new BadRequestException("L'identifiant de la tâche doit être un nombre ou null.");
    }

    try {
      return await this.taskRepository.save(dto);
    } catch (error) {
      throw new InternalServerErrorException("Une erreur est survenue lors de l'enregistrement de la tâche.");
    }
  }
}
