package com.record.the_record.home.controller;

import com.record.the_record.home.dto.RecentDiaryDto;
import com.record.the_record.home.dto.RecentPhotoDto;
import com.record.the_record.home.dto.UpdateStatusDto;
import com.record.the_record.home.service.HomeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/home/user")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @ApiOperation(value = "최신 일기 조회")
    @GetMapping("/{user_pk}/diary")
    public ResponseEntity<List<RecentDiaryDto>> recentDiaryList(@PathVariable @ApiParam(value = "유저 번호")Long user_pk) {
        return ResponseEntity.ok().body(homeService.findRecentDiaryList(user_pk));
    }

    @ApiOperation(value = "최신 인생네컷 조회")
    @GetMapping("/{user_pk}/photo")
    public ResponseEntity<List<RecentPhotoDto>> recentPhotoList(@PathVariable @ApiParam(value = "유저 번호")Long user_pk) {
        return ResponseEntity.ok().body(homeService.findRecentPhotoList(user_pk));
    }

    // 이번달 업데이트 현황 조회
    @ApiOperation(value = "이번달 업데이트 현황 조회")
    @GetMapping("/{user_pk}/month")
    public ResponseEntity<UpdateStatusDto> updateStatusDetails(@PathVariable @ApiParam(value = "유저 번호")Long user_pk) {
        return null;
    }

}