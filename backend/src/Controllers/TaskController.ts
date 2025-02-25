import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SearchTaskDto from '../UseCase/SearchTasks/SearchTaskDto';
import SearchTasksUseCase from '../UseCase/SearchTasks/SearchTasksUseCase';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
    // Affectation de l'id provenant du paramètre à l'objet dto
    dto.id = Number(id);
    // Appel du use case pour la mise à jour de la tâche
    const useCase =
      await this.useCaseFactory.create<SaveTaskUseCase>(SaveTaskUseCase);
    return useCase.handle(dto);
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }

  @Get('/tasks/search')
  async search(@Query() dto: SearchTaskDto) {
    const useCase = (await this.useCaseFactory.create(
      SearchTasksUseCase,
    )) as unknown as SearchTasksUseCase;
    return useCase.handle(dto);
  }
}
