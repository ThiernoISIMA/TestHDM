import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import SaveTaskUseCase from './SaveTask/SaveTaskUseCase';
import SearchTasksUseCase from './SearchTasks/SearchTasksUseCase';

type UseCases = GetAllTasksUseCase | DeleteTask | SaveTaskUseCase | SearchTasksUseCase;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
