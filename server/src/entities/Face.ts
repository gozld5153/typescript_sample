import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FtLive } from "./FtLive";
import { FtVod } from "./FtVod";

@Entity("face", { schema: "sr_virtube" })
export class Face {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "face_name", nullable: true, length: 45 })
  faceName: string | null;

  @Column("varchar", { name: "face_gender", nullable: true, length: 5 })
  faceGender: string | null;

  @OneToMany(() => FtLive, (ftLive) => ftLive.face)
  ftLives: FtLive[];

  @OneToMany(() => FtVod, (ftVod) => ftVod.face)
  ftVods: FtVod[];
}
