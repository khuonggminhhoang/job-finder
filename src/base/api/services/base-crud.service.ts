import { BaseEntity } from '@/base/model/model.entity';
import { DeleteService } from '@/base/api/services/delete.service';

export class BaseCrudService<E extends BaseEntity> extends DeleteService<E> {}
