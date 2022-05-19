import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notices", { schema: "sr_virtube" })
export class Notices {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title: string | null;

  @Column("longtext", { name: "contents", nullable: true })
  contents: string | null;

  @Column("varchar", { name: "writer", nullable: true, length: 45 })
  writer: string | null;

  @Column("datetime", { name: "created_time", nullable: true })
  createdTime: Date | null;

  @Column("datetime", { name: "modified_time", nullable: true })
  modifiedTime: Date | null;
}
