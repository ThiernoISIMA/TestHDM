// src/UseCase/SearchTasks/SearchTasksUseCase.ts
import { Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import { Task } from '@prisma/client';
import SearchTaskDto from './SearchTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SearchTasksUseCase
  implements UseCase<Promise<Task[]>, [SearchTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SearchTaskDto): Promise<Task[]> {
    // Vous pouvez ajouter ici des validations supplémentaires si besoin
    return this.taskRepository.search(dto);
  }
}
