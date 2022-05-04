package com.record.the_record.diary.repository;

import com.record.the_record.entity.Diary;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary,Long> {

    List<Diary> findTop4ByUserAndVisibleStatusOrderByRecordDtDesc(User user, VisibleStatus visibleStatus);


}
