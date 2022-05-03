package com.record.the_record.entity;

import com.record.the_record.entity.enums.Category;
import com.record.the_record.entity.enums.VisibleStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diary {
    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "user_pk")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JoinColumn(name = "folder_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Folder folder;

    @Enumerated
    private Category category;

    private String mediaUrl;

    @Lob
    private String content;

    private String title;

    private LocalDateTime recordDt;

    @Enumerated
    private VisibleStatus visibleStatus;
}
