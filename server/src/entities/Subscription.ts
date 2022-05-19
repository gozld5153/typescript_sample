import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";

@Index("fk_subscription_user_info1_idx", ["userInfoId"], {})
@Index("fk_subscription_user_info1_idx1", ["subId"], {})
@Entity("subscription", { schema: "sr_virtube" })
export class Subscription {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_info_id" })
  userInfoId: number;

  @Column("int", { name: "sub_id" })
  subId: number;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.subscriptions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_info_id", referencedColumnName: "id" }])
  userInfo: UserInfo;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.subscriptions2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sub_id", referencedColumnName: "id" }])
  sub: UserInfo;
}
