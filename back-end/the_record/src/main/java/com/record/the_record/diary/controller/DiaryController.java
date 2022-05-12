package com.record.the_record.diary.controller;

import com.record.the_record.diary.dto.DiaryDetailDto;
import com.record.the_record.diary.dto.DiaryDto;
import com.record.the_record.diary.dto.DiaryTitleDto;
import com.record.the_record.diary.service.DiaryService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    @ApiOperation(value = "일기 저장")
    @PostMapping()
    public ResponseEntity<String> diaryAdd(@RequestBody @ApiParam(value = "저장할 일기 정보")DiaryDto diaryDto) {
        diaryService.addDiary(diaryDto);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "전체 일기 조회 (10개씩 보여주기)")
    @GetMapping("/{user-pk}/{page}")
    public ResponseEntity<List<DiaryDetailDto>> diaryList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk,
                                                          @PathVariable @ApiParam(value = "페이지 번호, 0부터 시작")int page) {
        return ResponseEntity.ok().body(diaryService.findDiaryList(userPk, page));
    }

    @ApiOperation(value = "해당 폴더에 존재하는 일기 조회")
    @GetMapping("/{user-pk}/folder/{folder-id}")
    public ResponseEntity<List<DiaryTitleDto>> diaryTitleList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk,
                                                              @PathVariable("folder-id") @ApiParam(value = "폴더 번호")Long folderId) {
        return ResponseEntity.ok().body(diaryService.findDiaryTitleList(userPk, folderId));
    }

    @ApiOperation(value = "해당 날짜에 존재하는 일기 조회")
    @GetMapping("/{user-pk}/date/{date}")
    public ResponseEntity<List<DiaryDetailDto>> diaryDateList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk,
                                                              @PathVariable @ApiParam(value = "날짜")String date) {
        return ResponseEntity.ok().body(diaryService.findDiaryDateList(userPk, date));
    }

    @ApiOperation(value = "일기 상세정보 조회")
    @GetMapping("/{diary-id}")
    public ResponseEntity<DiaryDetailDto> diaryDetails(@PathVariable("diary-id") @ApiParam(value = "사진 번호")Long diaryId) {
        return ResponseEntity.ok().body(diaryService.findDiaryDetail(diaryId));
    }

}
