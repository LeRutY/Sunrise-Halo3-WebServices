import {
  Controller,
  Get,
  NotFoundException,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { Response } from 'express';

@ApiTags('Alpha Upload Server')
@Controller('/upload_server/storage')
export class PimpsController {
  @Get('/alpha_motd.txt')
  async getManifest(@Res({ passthrough: true }) res: Response) {
    return await this.sendLocalFile(`alpha_motd.txt`, res);
  }

  private async sendLocalFile(path: string, res: Response) {
    path = join(process.cwd(), `public/storage/pimps/`, path);

    const stats = await stat(path);

    if (!stats.isFile()) throw new NotFoundException();

    res.set('Content-Length', stats.size.toString());
    res.set('Cache-Control', 'no-cache');
    return new StreamableFile(createReadStream(path));
  }
}
