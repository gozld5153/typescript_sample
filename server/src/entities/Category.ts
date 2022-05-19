import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category", { schema: "sr_virtube" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "category_name", nullable: true, length: 45 })
  categoryName: string | null;
}
