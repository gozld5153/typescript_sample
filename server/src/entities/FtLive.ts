import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Face } from "./Face";
import { UserInfo } from "./UserInfo";

@Index("fk_ft_live_face1_idx", ["faceId"], {})
@Index("fk_ft_live_user_info1_idx", ["userInfoId"], {})
@Entity("ft_live", { schema: "sr_virtube" })
export class FtLive {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_info_id" })
  userInfoId: number;

  @Column("int", { name: "face_id", nullable: true })
  faceId: number | null;

  @Column("int", { name: "viewer_num", nullable: true })
  viewerNum: number | null;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title: string | null;

  @Column("text", { name: "contents", nullable: true })
  contents: string | null;

  @Column("varchar", { name: "ft_live_url", nullable: true, length: 100 })
  ftLiveUrl: string | null;

  @Column("datetime", { name: "created_time", nullable: true })
  createdTime: Date | null;

  @Column("datetime", { name: "modified_time", nullable: true })
  modifiedTime: Date | null;

  @ManyToOne(() => Face, (face) => face.ftLives, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "face_id", referencedColumnName: "id" }])
  face: Face;

  @ManyToOne(() => UserInfo, (userInfo) => userInfo.ftLives, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_info_id", referencedColumnName: "id" }])
  userInfo: UserInfo;
}
