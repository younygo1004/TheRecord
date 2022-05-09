package com.record.the_record.photo.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class PhotoTitle {

    @ApiModelProperty("인생네컷 번호")
    private Long photoId;
    @ApiModelProperty("인생네컷 제목")
    private String title;
    @ApiModelProperty("인생네컷 공개여부")
    private String visible;
    @ApiModelProperty("인생네컷 촬영 날짜")
    private LocalDateTime recordDt;

}
