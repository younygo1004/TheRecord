package com.record.the_record.photo.repository;

import com.record.the_record.entity.Photo;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findTop3ByUserAndVisibleStatusOrderByRecordDtDesc(User user, VisibleStatus visibleStatus);
    Long countByUser(User user);
    Long countByUserAndRecordDtBetween(User user, LocalDateTime startDate, LocalDateTime endDate);

}
