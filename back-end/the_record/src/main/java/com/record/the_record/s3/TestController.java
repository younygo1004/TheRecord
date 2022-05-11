package com.record.the_record.s3;

import com.record.the_record.s3.dto.FileDetailDto;
import com.record.the_record.s3.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/puload")
public class TestController {

    private final FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<FileDetailDto> post(@RequestPart("file")MultipartFile multipartFile) {
        return ResponseEntity.ok().body(fileUploadService.save(multipartFile, 4L));
    }
}
