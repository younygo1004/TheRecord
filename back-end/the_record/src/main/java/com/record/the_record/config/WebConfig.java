package com.record.the_record.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Deprecated
public class WebConfig implements WebMvcConfigurer {

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .exposedHeaders("X-AUTH-TOKEN")
//                .allowCredentials(true)
//                .allowedOrigins("https://the-record.co.kr", "http://localhost:3000")
//                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");;
//    }

}
