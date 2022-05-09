package com.record.the_record.photo.service;

import com.record.the_record.entity.Photo;
import com.record.the_record.photo.dto.PhotoDto;
import com.record.the_record.photo.dto.PhotoListDto;
import com.record.the_record.photo.dto.PhotoTitle;

import java.util.List;

public interface PhotoService {

    Photo addPhoto(PhotoDto photoDto);
    List<PhotoTitle> findPhotoTitleList(Long userPk);
    List<PhotoListDto> findPhotoList(Long userPk, int page);
    Integer findPhotoTotalPage(Long userPk);
}
