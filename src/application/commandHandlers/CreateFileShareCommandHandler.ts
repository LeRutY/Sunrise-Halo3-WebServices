import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import FileShare from 'src/domain/aggregates/FileShare';
import IFileShareRepository, {
  IFileShareRepositorySymbol,
} from 'src/domain/repositories/IFileShareRepository';
import { CreateFileShareCommand } from '../commands/CreateFileShareCommand';

@CommandHandler(CreateFileShareCommand)
export class CreateFileShareCommandHandler
  implements ICommandHandler<CreateFileShareCommand>
{
  constructor(
    @Inject(IFileShareRepositorySymbol)
    private repository: IFileShareRepository,
  ) {}

  async execute(command: CreateFileShareCommand) {
    return this.repository.save(
      FileShare.create({
        ownerId: command.shareID,
        slots: [],
        quotaBytes: 26214400,
        quotaSlots: 6,
        visibleSlots: 6,
      }),
    );
  }
}
