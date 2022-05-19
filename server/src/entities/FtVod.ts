import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Face } from "./Face";
import { UserInfo } from "./UserInfo";
import { HistoryVideo } from "./HistoryVideo";
import { SaveVideo } from "./SaveVideo";

@Index("fk_ft_vod_face1_idx", ["faceId"], {})
@Index("fk_ft_vod_user_info1_idx", ["userInfoId"], {})
@Entity("ft_vod", { schema: "sr_virtube" })
export class FtVod {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_info_id" })
  userInfoId: number;

  @Column("int", { name: "face_id", nullable: true })
  faceId: number | null;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title: string | null;

  @Column("text", { name: "contents", nullable: true })
  contents: string | null;

  @Column("varchar", { name: "ft_vod_url", nullable: true, length: 100 })
  ftVodUrl: string | null;

  @Column("datetime", { name: "created_time", nullable: true })
  createdTime: Date | null;

  @Column("datetime", { name: "modified_time", nullable: true })
  modifiedTime: Date | null;

  @ManyToOne(() => Face, (face) => face.ftVods, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "face_id", referencedColumnName: "id" }])
  face: Face;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.ftVods, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_info_id", referencedColumnName: "id" }])
  userInfo: UserInfo;

  @OneToMany(() => HistoryVideo, (historyVideo) => historyVideo.ftVod)
  historyVideos: HistoryVideo[];

  @OneToMany(() => SaveVideo, (saveVideo) => saveVideo.ftVod)
  saveVideos: SaveVideo[];
}
