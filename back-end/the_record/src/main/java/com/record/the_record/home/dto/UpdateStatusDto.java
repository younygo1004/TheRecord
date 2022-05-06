package com.record.the_record.home.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class UpdateStatusDto {

    @ApiModelProperty("일기 업데이트 개수")
    private int diaryCurrentMonthCnt;
    @ApiModelProperty("일기 전체 개수")
    private int diaryAllCount;
    @ApiModelProperty("인생네컷 업데이트 개수")
    private int albumCurrentMonthCnt;
    @ApiModelProperty("인생네컷 전체 개수")
    private int albumAllCount;

}
