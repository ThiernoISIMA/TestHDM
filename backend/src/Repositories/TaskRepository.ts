import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      // @todo IMPLEMENT HERE USING PRISMA API
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput, // cast explicite pour la création
      });
    }
    // @todo IMPLEMENT HERE USING PRISMA API
    // Pour la mise à jour, on extrait l'id et on enlève ce champ du reste des données
    const { id, ...updateData } = data as Prisma.TaskUpdateInput & {
      id: number;
    };
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }
  //Nouvelle fonctionnalité ajoutée
  async search(dto: { name?: string; date?: string }): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = {};

    if (dto.name) {
      where.name = {
        contains: dto.name,
      };
    }

    if (dto.date) {
      // On suppose que la date est fournie au format "YYYY-MM-DD"
      const startDate = new Date(dto.date);
      const endDate = new Date(dto.date);
      endDate.setDate(endDate.getDate() + 1);
      where.createdAt = {
        gte: startDate,
        lt: endDate,
      };
    }

    return this.prisma.task.findMany({ where });
  }
}
