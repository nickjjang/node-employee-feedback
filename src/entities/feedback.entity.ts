import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { Review } from './review.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  completed: boolean;

  @ManyToOne(() => Review, (review) => review.feedbacks)
  review: Review;

  @Column({ nullable: true })
  reviewId?: number;

  @ManyToOne(() => Employee)
  giver: Employee;

  @Column({ nullable: true })
  giverId?: number;

  @ManyToOne(() => Employee)
  receiver: Employee;

  @Column({ nullable: true })
  receiverId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
