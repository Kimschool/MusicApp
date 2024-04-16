package com.cha.youtubemusic.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") // 허용할 오리진을 설정
                .allowedMethods("GET", "POST") // 허용할 HTTP 메서드를 설정
                .allowCredentials(true); // 인증 정보를 허용할지 여부를 설정
    }
}
