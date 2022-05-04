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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final PhotoRepository photoRepository;

    @Override
    public List<RecentDiaryDto> findRecentDiaryList(Long user_pk) {

        User user = userRepository.findById(user_pk).orElseThrow(null);
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
    public List<RecentPhotoDto> findRecentPhotoList(Long user_pk) {

        User user = userRepository.findById(user_pk).orElseThrow(null);
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
    public UpdateStatusDto findUpdateStatus(Long user_pk) {
        return null;
    }
}
