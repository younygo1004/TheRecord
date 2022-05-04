package com.record.the_record.home.service;

import com.record.the_record.home.dto.RecentDiaryDto;
import com.record.the_record.home.dto.RecentPhotoDto;
import com.record.the_record.home.dto.UpdateStatusDto;

import java.util.List;

public interface HomeService {

    public List<RecentDiaryDto> findRecentDiaryList(Long user_pk);
    public List<RecentPhotoDto> findRecentPhotoList(Long user_pk);
    public UpdateStatusDto findUpdateStatus(Long user_pk);

}
