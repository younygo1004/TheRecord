package com.record.the_record.diary.service;

import com.record.the_record.diary.dto.DiaryDetailDto;
import com.record.the_record.diary.dto.DiaryDto;
import com.record.the_record.diary.dto.DiaryTitleDto;
import com.record.the_record.entity.Diary;

import java.util.List;

public interface DiaryService {

    Diary addDiary(DiaryDto diaryDto);
    List<DiaryDetailDto> findDiaryList(Long userPk, int page);
    List<DiaryTitleDto> findDiaryTitleList(Long userPk, Long folderId);
    List<DiaryDetailDto> findDiaryDateList(Long userPk, String date);
    DiaryDetailDto findDiaryDetail(Long diaryId);

}
