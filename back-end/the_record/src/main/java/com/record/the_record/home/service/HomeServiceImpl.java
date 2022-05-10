package com.record.the_record.home.service;

import com.record.the_record.entity.Diary;
import com.record.the_record.entity.Photo;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import com.record.the_record.home.dto.RecentDiaryDto;
import com.record.the_record.diary.repository.DiaryRepository;
import com.record.the_record.home.dto.RecentPhotoDto;
import com.record.the_record.home.dto.UpdateStatusDto;
import com.record.the_record.photo.repository.PhotoRepository;
import com.record.the_record.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final PhotoRepository photoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<RecentDiaryDto> findRecentDiaryList(Long userPk) {

        User user = userRepository.findById(userPk).orElseThrow(null);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");
        List<Diary> recentDiaryList = diaryRepository.findTop4ByUserAndVisibleStatusOrderByRecordDtDesc(user, visibleStatus);
        List<RecentDiaryDto> recentDiaryDtoList = new ArrayList<>();

        for (Diary diary : recentDiaryList) {
            recentDiaryDtoList.add(RecentDiaryDto.builder()
                    .diaryId(diary.getId())
                    .title(diary.getTitle())
                    .recordDt(diary.getRecordDt())
                    .build());
        }

        return recentDiaryDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecentPhotoDto> findRecentPhotoList(Long userPk) {

        User user = userRepository.findById(userPk).orElseThrow(null);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");
        List<Photo> recentPhotoList = photoRepository.findTop3ByUserAndVisibleStatusOrderByRecordDtDesc(user, visibleStatus);
        List<RecentPhotoDto> recentPhotoDtoList = new ArrayList<>();

        for (Photo photo : recentPhotoList) {
            recentPhotoDtoList.add(RecentPhotoDto.builder()
                    .photoId(photo.getId())
                    .title(photo.getTitle())
                    .recordDt(photo.getRecordDt())
                    .mediaUrl(photo.getMediaUrl())
                    .build());
        }

        return recentPhotoDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public UpdateStatusDto findUpdateStatus(Long userPk) {

        User user = userRepository.findById(userPk).orElseThrow(null);
        UpdateStatusDto updateStatusDto = new UpdateStatusDto();
        LocalDateTime currentDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0));
        LocalDateTime startDate = currentDate.withDayOfMonth(1);
        LocalDateTime endDate = currentDate.withDayOfMonth(LocalDate.now().lengthOfMonth());

        Long diaryCurrentMonthCnt = diaryRepository.countByUserAndRecordDtBetween(user, startDate, endDate);
        Long diaryAllCount = diaryRepository.countByUser(user);
        Long photoCurrentMonthCnt = photoRepository.countByUserAndRecordDtBetween(user, startDate, endDate);
        Long photoAllCount = photoRepository.countByUser(user);

        updateStatusDto.setDiaryCurrentMonthCnt(diaryCurrentMonthCnt);
        updateStatusDto.setDiaryAllCount(diaryAllCount);
        updateStatusDto.setPhotoCurrentMonthCnt(photoCurrentMonthCnt);
        updateStatusDto.setPhotoAllCount(photoAllCount);

        return updateStatusDto;
    }
}
