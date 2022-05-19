import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnimaitonGenerate } from "./AnimaitonGenerate";

@Entity("voice", { schema: "sr_virtube" })
export class Voice {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "voice_name", nullable: true, length: 45 })
  voiceName: string | null;

  @Column("varchar", { name: "voice_gender", nullable: true, length: 5 })
  voiceGender: string | null;

  @OneToMany(
    () => AnimaitonGenerate,
    (animaitonGenerate) => animaitonGenerate.voice
  )
  animaitonGenerates: AnimaitonGenerate[];
}
