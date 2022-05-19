import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subscript_count", { schema: "sr_virtube" })
export class SubscriptCount {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "user_id", nullable: true, length: 50 })
  userId: string | null;

  @Column("int", { name: "subscription_count", nullable: true })
  subscriptionCount: number | null;
}
