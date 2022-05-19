import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnimaitonGenerate } from "./AnimaitonGenerate";
import { FtLive } from "./FtLive";
import { FtVod } from "./FtVod";
import { HistoryVideo } from "./HistoryVideo";
import { SaveVideo } from "./SaveVideo";
import { Subscription } from "./Subscription";

@Entity("user_info", { schema: "sr_virtube" })
export class UserInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "is_login", nullable: true, length: 5 })
  isLogin: string | null;

  @Column("varchar", { name: "is_live", nullable: true, length: 5 })
  isLive: string | null;

  @Column("varchar", { name: "profile_image", nullable: true, length: 255 })
  profileImage: string | null;

  @Column("datetime", { name: "created_time", nullable: true })
  createdTime: Date | null;

  @Column("datetime", { name: "modified_time", nullable: true })
  modifiedTime: Date | null;

  @Column("varchar", { name: "user_id", nullable: true, length: 50 })
  userId: string | null;

  @Column("varchar", { name: "sns_id", nullable: true, length: 50 })
  snsId: string | null;

  @Column("varchar", { name: "sns_type", nullable: true, length: 20 })
  snsType: string | null;

  @Column("varchar", { name: "color", nullable: true, length: 10 })
  color: string | null;

  @Column("varchar", { name: "my_char", nullable: true, length: 255 })
  myChar: string | null;

  @Column("datetime", { name: "live_end_time", nullable: true })
  liveEndTime: Date | null;

  @OneToMany(
    () => AnimaitonGenerate,
    (animaitonGenerate) => animaitonGenerate.userInfo
  )
  animaitonGenerates: AnimaitonGenerate[];

  @OneToMany(() => FtLive, (ftLive) => ftLive.userInfo)
  ftLives: FtLive[];

  @OneToMany(() => FtVod, (ftVod) => ftVod.userInfo)
  ftVods: FtVod[];

  @OneToMany(() => HistoryVideo, (historyVideo) => historyVideo.userInfo)
  historyVideos: HistoryVideo[];

  @OneToMany(() => SaveVideo, (saveVideo) => saveVideo.userInfo)
  saveVideos: SaveVideo[];

  @OneToMany(() => Subscription, (subscription) => subscription.userInfo)
  subscriptions: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.sub)
  subscriptions2: Subscription[];
}
