import {ERRPR_CODE} from '@shared/enums/enum';
import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('error_template', {schema: 'knockknock'})
export class ErrorTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'error_code',
    type: 'enum',
    nullable: false,
    comment: '에러 코드',
    enum: ERRPR_CODE,
    default: ERRPR_CODE.DEFAULT,
  })
  errorCode: ERRPR_CODE;

  @Column({
    name: 'error_message',
    type: 'text',
    nullable: false,
    comment: '에러 메세지',
  })
  errorMessage: string;

  @Column({
    name: 'status_code',
    type: 'int',
    nullable: false,
    comment: '에러 메세지',
  })
  statusCode: number;

  @Column({
    name: 'mod_date',
    type: 'timestamp',
    nullable: false,
    comment: '수정 날짜',
  })
  modDate: Date;

  @BeforeInsert()
  beforeInsert() {
    this.modDate = new Date();
  }
}
