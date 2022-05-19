import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserInfo } from "./UserInfo";
import { Voice } from "./Voice";
import { HistoryVideo } from "./HistoryVideo";
import { SaveVideo } from "./SaveVideo";

@Index("fk_animaiton_generate_user_info1_idx", ["userInfoId"], {})
@Index("fk_animaiton_generate_voice1_idx", ["voiceId"], {})
@Entity("animaiton_generate", { schema: "sr_virtube" })
export class AnimaitonGenerate {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_info_id" })
  userInfoId: number;

  @Column("int", { name: "voice_id", nullable: true })
  voiceId: number | null;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title: string | null;

  @Column("text", { name: "contents", nullable: true })
  contents: string | null;

  @Column("varchar", { name: "ag_url", nullable: true, length: 100 })
  agUrl: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 100 })
  image: string | null;

  @Column("datetime", { name: "created_time", nullable: true })
  createdTime: Date | null;

  @Column("datetime", { name: "modified_time", nullable: true })
  modifiedTime: Date | null;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.animaitonGenerates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_info_id", referencedColumnName: "id" }])
  userInfo: UserInfo;

  @ManyToOne(() => Voice, (voice) => voice.animaitonGenerates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "voice_id", referencedColumnName: "id" }])
  voice: Voice;

  @OneToMany(
    () => HistoryVideo,
    (historyVideo) => historyVideo.animaitonGenerate
  )
  historyVideos: HistoryVideo[];

  @OneToMany(() => SaveVideo, (saveVideo) => saveVideo.animaitonGenerate)
  saveVideos: SaveVideo[];
}
