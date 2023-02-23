import { MaxLength } from 'class-validator';
import { BoxEntity } from 'src/box/entities/box.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'BOOKMARK',
})
export class BookmarkEntity extends CommonEntity {
  @MaxLength(15, { message: '북마크는 최대 15글자입니다.' })
  @Column({ type: 'varchar', nullable: false })
  bookmarkName: string;

  @MaxLength(2083, { message: 'URL의 최대 길이는 2083입니다.' })
  @Column({ type: 'varchar', nullable: false })
  URL: string;

  // relations

  @ManyToOne(() => BoxEntity, (box) => box.bookmarks, {
    onDelete: 'CASCADE',
    // Box가 삭제되면 Bookmark도 삭제된다.
  })
  @JoinColumn([
    // foreign key 정보들
    {
      name: 'box_id',
      // db에 저장되는 필드 이름
      referencedColumnName: 'id',
      // BOX의 id
    },
  ])
  box: BoxEntity;
}