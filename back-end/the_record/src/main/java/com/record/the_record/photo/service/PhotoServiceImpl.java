package com.record.the_record.photo.service;

import com.record.the_record.entity.Photo;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import com.record.the_record.photo.dto.PhotoDto;
import com.record.the_record.photo.dto.PhotoDetailDto;
import com.record.the_record.photo.dto.PhotoTitleDto;
import com.record.the_record.photo.repository.PhotoRepository;
import com.record.the_record.user.repository.UserRepository;
import com.record.the_record.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService{

    private final PhotoRepository photoRepository;

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    @Transactional
    public Photo addPhoto(PhotoDto photoDto) {

        VisibleStatus getVisible = VisibleStatus.valueOf(photoDto.getVisible());
        Long userPk = userService.currentUser();
        User user = userRepository.findByPk(userPk);

        Photo photo = Photo.builder()
                .title(photoDto.getTitle())
                .visibleStatus(getVisible)
                .mediaUrl(photoDto.getMediaUrl())
                .recordDt(LocalDateTime.now())
                .user(user)
                .build();

        return photoRepository.save(photo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PhotoTitleDto> findPhotoTitleList(Long userPk) {
        // 자신의 홈페이지인지 판별 후 전제공개+비공개 / 전체공개 나눠서 보여주기!
        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");

        List<Photo> photoList;
        List<PhotoTitleDto> photoDtoList = new ArrayList<>();

        if(loginUser != userPk) {
            photoList = photoRepository.findByUserAndVisibleStatusOrderByRecordDtDesc(host, visibleStatus);
        } else {
            photoList = photoRepository.findByUser_PkOrderByRecordDtDesc(userPk);
        }

        for (Photo photo : photoList) {
            photoDtoList.add(PhotoTitleDto.builder()
                    .photoId(photo.getId())
                    .title(photo.getTitle())
                    .recordDt(String.valueOf(photo.getRecordDt()).substring(0,10))
                    .visible(String.valueOf(photo.getVisibleStatus()))
                    .build());
        }
        return photoDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PhotoDetailDto> findPhotoList(Long userPk, int page) {
        int size = 3;

        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");
        Pageable pageable = PageRequest.of(page, size);

        Page<Photo> photoList;
        List<PhotoDetailDto> photoDtoList = new ArrayList<>();

        if(loginUser != userPk) {
            photoList = photoRepository.findByUserAndVisibleStatusOrderByRecordDtDesc(pageable, host, visibleStatus);
        } else {
            photoList = photoRepository.findByUser_PkOrderByRecordDtDesc(pageable, userPk);
        }

        for (Photo photo : photoList) {
            photoDtoList.add(PhotoDetailDto.builder()
                    .photoId(photo.getId())
                    .title(photo.getTitle())
                    .mediaUrl(photo.getMediaUrl())
                    .recordDt(String.valueOf(photo.getRecordDt()).substring(0,10))
                    .visible(String.valueOf(photo.getVisibleStatus()))
                    .build());
        }
        return photoDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public Integer findPhotoTotalPage(Long userPk) {
        Integer totalPage = 0;

        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");

        if(loginUser != userPk) {
            totalPage = photoRepository.countByUserAndVisibleStatus(host, visibleStatus);
        } else {
            totalPage = photoRepository.countByUser_Pk(userPk);
        }

        if((totalPage%3) == 0) {
            totalPage = (totalPage/3) - 1;
        } else {
            totalPage = (int) Math.ceil(totalPage/3);
        }

        return totalPage;
    }

    @Override
    public PhotoDetailDto findPhotoDetail(Long photoId) {

        Photo photo = photoRepository.findOneById(photoId);

        PhotoDetailDto photoDetailDto = PhotoDetailDto.builder()
                .photoId(photo.getId())
                .title(photo.getTitle())
                .mediaUrl(photo.getMediaUrl())
                .recordDt(String.valueOf(photo.getRecordDt()).substring(0,10))
                .visible(String.valueOf(photo.getVisibleStatus()))
                .build();

        return photoDetailDto;
    }

    @Override
    public void modifyPhoto(PhotoDetailDto photoDetailDto) {

        Photo photo = photoRepository.findOneById(photoDetailDto.getPhotoId());
        photo.updatePhoto(photoDetailDto.getTitle(), VisibleStatus.valueOf(photoDetailDto.getVisible()));

        photoRepository.save(photo);
    }

    @Override
    public void removePhoto(Long photoId) {
        Photo photo = photoRepository.findOneById(photoId);
        photoRepository.delete(photo);
    }

}
