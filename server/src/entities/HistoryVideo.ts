import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AnimaitonGenerate } from "./AnimaitonGenerate";
import { FtVod } from "./FtVod";
import { UserInfo } from "./UserInfo";

@Index("fk_history_video_animaiton_generate1_idx", ["animaitonGenerateId"], {})
@Index("fk_history_video_ft_vod1_idx", ["ftVodId"], {})
@Index("fk_history_video_user_info1_idx", ["userInfoId"], {})
@Entity("history_video", { schema: "sr_virtube" })
export class HistoryVideo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_info_id" })
  userInfoId: number;

  @Column("int", { name: "ft_vod_id", nullable: true })
  ftVodId: number | null;

  @Column("int", { name: "animaiton_generate_id", nullable: true })
  animaitonGenerateId: number | null;

  @ManyToOne(
    () => AnimaitonGenerate,
    (animaitonGenerate) => animaitonGenerate.historyVideos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "animaiton_generate_id", referencedColumnName: "id" }])
  animaitonGenerate: AnimaitonGenerate;

  @ManyToOne(() => FtVod, (ftVod) => ftVod.historyVideos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ft_vod_id", referencedColumnName: "id" }])
  ftVod: FtVod;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.historyVideos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_info_id", referencedColumnName: "id" }])
  userInfo: UserInfo;
}
