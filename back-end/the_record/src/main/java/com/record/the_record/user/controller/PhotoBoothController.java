package com.record.the_record.user.controller;

import com.record.the_record.user.dto.PhotoBoothDto;
import com.record.the_record.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/photobooth")
@RequiredArgsConstructor
public class PhotoBoothController {

    private final UserService userService;

    @ApiOperation(value = "포토부스 생성")
    @PutMapping()
    public ResponseEntity<String> photoBoothAdd(@RequestBody @ApiParam(value = "방장 정보")PhotoBoothDto photoBoothDto) {
        userService.addPhotoBooth(photoBoothDto);
        return ResponseEntity.ok().body("success");
    }

}
